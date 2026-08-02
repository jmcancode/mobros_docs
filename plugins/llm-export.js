/**
 * mobros-llm-export
 *
 * Emits an LLM-friendly copy of every doc page so staff can hand a screen's
 * documentation to ChatGPT / Claude / Gemini and just ask their question.
 *
 * Three outputs, written into `static/` (and therefore served in both `npm
 * start` and the production build):
 *
 *   /llm/<permalink>.md   one file per page — the page body wrapped in a
 *                         prompt preamble. This is what the "Copy for AI"
 *                         button on each page fetches.
 *   /llms.txt             an index of every page, for tools that follow the
 *                         llms.txt convention.
 *   /llms-full.txt        the entire manual in one file, for pasting into a
 *                         large-context model.
 *
 * Everything it writes is gitignored — this is build output, not source.
 *
 * Why generate rather than fetch the rendered HTML: the markdown is what an
 * LLM actually wants. Stripping tags out of the built page client-side loses
 * the table structure, which is where most of the real information lives.
 *
 * Permalinks are derived the same way Docusaurus derives them for this site:
 * `routeBasePath` is '/', so a file's route is its path under `docs/` minus
 * the extension, unless front matter sets an explicit `slug`. If either of
 * those ever changes, this needs to change with it — the build check in
 * `npm run build` will surface a mismatch as a 404 on the button.
 */

import fs from 'node:fs';
import path from 'node:path';

// Friendly section names for the llms.txt index, keyed by top-level folder.
const SECTION_LABELS = {
  '.': 'Start here',
  'getting-started': 'Getting started',
  operations: 'Daily operations',
  catalog: 'Catalog & pricing',
  community: 'Community',
  content: 'Content & marketing',
  administration: 'Administration',
  developers: 'Developers',
  reference: 'Reference',
};

const SECTION_ORDER = Object.keys(SECTION_LABELS);

/**
 * Minimal front-matter reader. Deliberately not gray-matter: that's a
 * transitive dependency of Docusaurus, not one we declare, and the front
 * matter on this site is three flat string fields.
 */
function splitFrontMatter(raw) {
  if (!raw.startsWith('---')) return {data: {}, body: raw};
  const end = raw.indexOf('\n---', 3);
  if (end === -1) return {data: {}, body: raw};

  const block = raw.slice(4, end);
  const body = raw.slice(end + 4).replace(/^\r?\n/, '');
  const data = {};

  for (const line of block.split('\n')) {
    const match = /^([A-Za-z_][\w-]*):\s*(.*)$/.exec(line);
    if (!match) continue;
    let value = match[2].trim();
    // Strip matching surrounding quotes, if any.
    if (
      (value.startsWith('"') && value.endsWith('"') && value.length > 1) ||
      (value.startsWith("'") && value.endsWith("'") && value.length > 1)
    ) {
      value = value.slice(1, -1);
    }
    data[match[1]] = value;
  }

  return {data, body};
}

function walkMarkdown(dir, base = dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...walkMarkdown(full, base));
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      out.push(path.relative(base, full));
    }
  }
  return out.sort();
}

function permalinkFor(relPath, frontMatter) {
  if (frontMatter.slug) {
    return frontMatter.slug.startsWith('/')
      ? frontMatter.slug
      : `/${frontMatter.slug}`;
  }
  const withoutExt = relPath.replace(/\.md$/, '');
  return `/${withoutExt.split(path.sep).join('/')}`;
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

${body.trim()}

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

/** Only touch the disk when content actually changed — writing unconditionally
 *  makes the dev server's file watcher rebuild in a loop. */
function writeIfChanged(file, contents) {
  try {
    if (fs.readFileSync(file, 'utf8') === contents) return false;
  } catch {
    // Doesn't exist yet — fall through and write it.
  }
  fs.mkdirSync(path.dirname(file), {recursive: true});
  fs.writeFileSync(file, contents, 'utf8');
  return true;
}

/** Remove generated files whose source page no longer exists. */
function pruneOrphans(root, keep) {
  if (!fs.existsSync(root)) return;
  const stack = [root];
  const dirs = [];

  while (stack.length) {
    const dir = stack.pop();
    dirs.push(dir);
    for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) stack.push(full);
      else if (!keep.has(full)) fs.rmSync(full);
    }
  }

  // Deepest first, so a directory is empty by the time we reach it.
  for (const dir of dirs.reverse()) {
    if (dir !== root && fs.readdirSync(dir).length === 0) fs.rmdirSync(dir);
  }
}

export default function llmExport(context) {
  const {siteDir, siteConfig} = context;
  const docsDir = path.join(siteDir, 'docs');
  const staticDir = path.join(siteDir, 'static');
  const llmDir = path.join(staticDir, 'llm');
  const origin = String(siteConfig.url || '').replace(/\/$/, '');

  return {
    name: 'mobros-llm-export',

    async loadContent() {
      if (!fs.existsSync(docsDir)) return;

      const pages = [];

      for (const relPath of walkMarkdown(docsDir)) {
        const raw = fs.readFileSync(path.join(docsDir, relPath), 'utf8');
        const {data, body} = splitFrontMatter(raw);
        const permalink = permalinkFor(relPath, data);
        const heading = /^#\s+(.+)$/m.exec(body);

        pages.push({
          relPath,
          permalink,
          url: `${origin}${permalink === '/' ? '' : permalink}`,
          title: data.title || heading?.[1] || relPath,
          description: data.description || '',
          section: path.dirname(relPath),
          body,
        });
      }

      // ── One prompt-wrapped file per page ──────────────────────────────
      const written = new Set();

      for (const page of pages) {
        const target = path.join(
          llmDir,
          `${page.permalink === '/' ? '/index' : page.permalink}.md`,
        );
        writeIfChanged(target, buildPrompt(page));
        written.add(target);
      }

      pruneOrphans(llmDir, written);

      // ── llms.txt — the index ──────────────────────────────────────────
      const bySection = new Map();
      for (const page of pages) {
        if (!bySection.has(page.section)) bySection.set(page.section, []);
        bySection.get(page.section).push(page);
      }

      const orderedSections = [...bySection.keys()].sort(
        (a, b) =>
          (SECTION_ORDER.indexOf(a) + 1 || 99) -
          (SECTION_ORDER.indexOf(b) + 1 || 99),
      );

      const index = [
        `# ${siteConfig.title}`,
        '',
        `> ${siteConfig.tagline}`,
        '',
        'Documentation for the MoBros TCG admin dashboard — the web app the',
        'shop runs on. Every page below is also available as a prompt-wrapped',
        'markdown file at the same path under /llm/, e.g.',
        `${origin}/llm/operations/sell-requests.md`,
        '',
        `The whole manual in one file: ${origin}/llms-full.txt`,
        '',
      ];

      for (const section of orderedSections) {
        index.push(`## ${SECTION_LABELS[section] || section}`, '');
        for (const page of bySection.get(section)) {
          index.push(
            `- [${page.title}](${page.url})` +
              (page.description ? `: ${page.description}` : ''),
          );
        }
        index.push('');
      }

      writeIfChanged(path.join(staticDir, 'llms.txt'), index.join('\n'));

      // ── llms-full.txt — everything, in sidebar-ish order ───────────────
      const full = [
        `# ${siteConfig.title}`,
        '',
        `> ${siteConfig.tagline}`,
        '',
        'The complete documentation for the MoBros TCG admin dashboard, in one',
        'file. Each page is delimited by a level-1 heading and its source URL.',
        '',
      ];

      for (const section of orderedSections) {
        for (const page of bySection.get(section)) {
          full.push(
            '---',
            '',
            `<!-- ${page.url} -->`,
            '',
            page.body.trim(),
            '',
          );
        }
      }

      writeIfChanged(path.join(staticDir, 'llms-full.txt'), full.join('\n'));
    },
  };
}
