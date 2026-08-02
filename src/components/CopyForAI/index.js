/**
 * "Copy for AI" — one button, top-right of every doc page.
 *
 * Copies the page wrapped in a prompt preamble, so a staff member can paste it
 * into ChatGPT / Claude / Gemini and ask a question without knowing anything
 * about prompting. The copied text ends with `MY QUESTION:` so the paste leaves
 * their cursor in the right place — that one detail is most of why this works
 * for people who don't write prompts.
 *
 * The text is built from the rendered article, in the browser, at click time.
 * The earlier version fetched a pre-generated `/llm/<page>.md` file, which was
 * simpler — but those files (and `/llms-full.txt`, the entire manual in one
 * request) sat on the CDN unauthenticated. Now that the site is behind a
 * client-side sign-in gate, publishing a tidy plain-text copy of everything at
 * a guessable URL would have made the gate pointless. Reading the DOM keeps the
 * feature and removes the corpus.
 *
 * Side benefit: what gets copied is always exactly what's on screen.
 */

import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './styles.module.css';

const RESET_MS = 2600;

/** Clipboard API needs a secure context. Fall back for plain-http previews. */
async function copyText(text) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const el = document.createElement('textarea');
  el.value = text;
  el.setAttribute('readonly', '');
  el.style.position = 'fixed';
  el.style.opacity = '0';
  document.body.appendChild(el);
  el.select();
  try {
    if (!document.execCommand('copy')) throw new Error('copy rejected');
  } finally {
    document.body.removeChild(el);
  }
}

/** Turndown is ~30KB — load it on first click, not on every page view. */
async function articleToMarkdown(article) {
  const [{default: TurndownService}, {gfm}] = await Promise.all([
    import('turndown'),
    import('turndown-plugin-gfm'),
  ]);

  const turndown = new TurndownService({
    headingStyle: 'atx',
    codeBlockStyle: 'fenced',
    bulletListMarker: '-',
    emDelimiter: '*',
  });
  // Tables carry most of the real information in these docs — GFM keeps them.
  turndown.use(gfm);

  // Chrome for the reader, noise for a model.
  turndown.remove(['script', 'style']);
  turndown.addRule('stripUiChrome', {
    filter: (node) =>
      node.classList?.contains('theme-doc-toc-mobile') ||
      node.classList?.contains('pagination-nav') ||
      node.classList?.contains('theme-doc-breadcrumbs') ||
      node.classList?.contains('hash-link') ||
      node.getAttribute?.('aria-hidden') === 'true',
    replacement: () => '',
  });

  // Admonitions carry the warnings that matter most ("bulk delete has no undo",
  // "no confirmation on the refund toggle"). Flatten each to a labelled
  // blockquote so both the severity and the body survive the trip — a model
  // reading plain prose has no way to tell a danger callout from an aside.
  turndown.addRule('admonition', {
    filter: (node) =>
      node.nodeName === 'DIV' &&
      /(^|\s)theme-admonition(\s|$)/.test(node.className || ''),
    replacement: (_content, node) => {
      const type = /theme-admonition-(\w+)/.exec(node.className || '')?.[1];
      const heading = node
        .querySelector('[class*="admonitionHeading"]')
        ?.textContent?.trim();
      const content = node.querySelector('[class*="admonitionContent"]');

      const label = [type?.toUpperCase(), heading].filter(Boolean).join(' — ');
      // Recurse so tables and lists inside a callout keep their structure.
      const body = turndown.turndown(content?.innerHTML || node.innerHTML);

      return `\n\n> **${label || 'NOTE'}**\n>\n${body
        .split('\n')
        .map((line) => (line ? `> ${line}` : '>'))
        .join('\n')}\n\n`;
    },
  });

  return turndown
    .turndown(article.innerHTML)
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function buildPrompt({title, url, body}) {
  return `You are helping a member of staff at MoBros TCG, a trading card game
shop, use their admin dashboard (they call it the Command Center).

Below is the official documentation for the screen they are asking about:
"${title}".

Answer their question using only this documentation. Quote the exact button and
field names it uses, so they can find them on screen. If the documentation
doesn't cover what they asked, say so plainly and suggest who to ask — don't
guess at buttons, numbers, or behaviour that isn't described here.

Keep answers short and practical. They are mid-task.

Source: ${url}

=== BEGIN DOCUMENTATION ===

${body}

=== END DOCUMENTATION ===

Their question follows.

IMPORTANT: if nothing follows the line below, they pasted this and pressed send
before typing anything. Do not tell them their question is missing or ask them
to resend — that is a dead end and they will assume the tool is broken. Instead,
open with one sentence on what this screen is for, then offer four specific
questions you could answer about it, drawn from the documentation above. Then
wait for them.

MY QUESTION:
`;
}

export default function CopyForAI() {
  const {metadata} = useDoc();
  const {siteConfig} = useDocusaurusContext();
  const [state, setState] = useState('idle'); // idle | working | done | error
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const onClick = useCallback(async () => {
    clearTimeout(timer.current);
    setState('working');

    try {
      const article = document.querySelector('article .markdown');
      if (!article) throw new Error('article not found in the DOM');

      const body = await articleToMarkdown(article);
      const origin = siteConfig.url?.replace(/\/$/, '') || '';

      await copyText(
        buildPrompt({
          title: metadata.title,
          url: `${origin}${metadata.permalink === '/' ? '' : metadata.permalink}`,
          body,
        }),
      );
      setState('done');
    } catch (err) {
      console.error('[CopyForAI]', err);
      setState('error');
    }

    timer.current = setTimeout(() => setState('idle'), RESET_MS);
  }, [metadata, siteConfig]);

  const label = {
    idle: 'Copy for AI',
    working: 'Copying…',
    // "…then ask" earns its width: the common failure is pasting and hitting
    // send with no question typed.
    done: 'Copied — paste, then ask',
    error: 'Copy failed',
  }[state];

  return (
    <div className={styles.bar}>
      <button
        type="button"
        className={styles.button}
        data-state={state}
        onClick={onClick}
        disabled={state === 'working'}
        title="Copies this page plus instructions. Paste it into ChatGPT, Claude or Gemini, then type your question."
      >
        <Icon state={state} />
        <span>{label}</span>
      </button>

      {/* Announced to screen readers without moving focus. */}
      <span className={styles.srOnly} role="status" aria-live="polite">
        {state === 'done'
          ? 'Page copied to clipboard'
          : state === 'error'
            ? 'Copy failed'
            : ''}
      </span>
    </div>
  );
}

function Icon({state}) {
  const common = {
    width: 15,
    height: 15,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  };

  if (state === 'done') {
    return (
      <svg {...common}>
        <path d="M20 6 9 17l-5-5" />
      </svg>
    );
  }

  if (state === 'error') {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 8v4M12 16h.01" />
      </svg>
    );
  }

  // Sparkles — the conventional "hand this to an assistant" mark.
  return (
    <svg {...common}>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4" />
      <path d="M6.3 6.3 8.5 8.5M15.5 15.5l2.2 2.2M17.7 6.3 15.5 8.5M8.5 15.5l-2.2 2.2" />
    </svg>
  );
}
