/**
 * "Copy for AI" — one button, top-right of every doc page.
 *
 * Fetches the prompt-wrapped markdown that plugins/llm-export.js generated for
 * this page and puts it on the clipboard, so a staff member can paste it into
 * whichever assistant they already use and ask their question in plain English.
 *
 * The copied text ends with "My question:" so the paste leaves them with a
 * cursor in the right place. That one detail is most of why this works for
 * people who don't write prompts.
 */

import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import useBaseUrl from '@docusaurus/useBaseUrl';
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

export default function CopyForAI() {
  const {metadata} = useDoc();
  const [state, setState] = useState('idle'); // idle | working | done | error
  const timer = useRef(null);

  const permalink = metadata.permalink === '/' ? '/index' : metadata.permalink;
  const source = useBaseUrl(`/llm${permalink}.md`);

  useEffect(() => () => clearTimeout(timer.current), []);

  const onClick = useCallback(async () => {
    clearTimeout(timer.current);

    // An expired session means the page is stale too — reloading lands on the
    // sign-in wall, which is the honest thing to show rather than a bare
    // "copy failed" the reader can't act on.
    if (state === 'expired') {
      window.location.reload();
      return;
    }

    setState('working');

    try {
      const res = await fetch(source);

      if (res.status === 401 || res.status === 403) {
        setState('expired');
        return; // No auto-reset: this one needs a deliberate click.
      }
      if (!res.ok) throw new Error(`${res.status} fetching ${source}`);

      await copyText(await res.text());
      setState('done');
    } catch (err) {
      console.error('[CopyForAI]', err);
      setState('error');
    }

    timer.current = setTimeout(() => setState('idle'), RESET_MS);
  }, [source, state]);

  const label = {
    idle: 'Copy for AI',
    working: 'Copying…',
    // "…then ask" earns its width: the common failure is pasting and hitting
    // send with no question typed.
    done: 'Copied — paste, then ask',
    error: 'Copy failed',
    expired: 'Session expired — sign in',
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
            : state === 'expired'
              ? 'Your session expired. Activate to sign in again.'
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

  if (state === 'error' || state === 'expired') {
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
