---
title: Editing these docs
sidebar_position: 2
description: Adding a page, changing the sidebar, and the conventions this site follows.
---

# Editing these docs

The site lives at `web/docs-site` and is a standard Docusaurus classic install.

```bash
cd web/docs-site
npm install
npm start -- --port 3100
```

Port 3100 because Docusaurus defaults to 3000 and the backend wants that.

## Adding a page

1. Create a Markdown file under `docs/`, in the folder matching its section.
2. Give it front matter:

   ```md
   ---
   title: Intake Processing
   sidebar_position: 5
   description: One sentence — this becomes the meta description and search snippet.
   ---
   ```

3. Add its path to the right sidebar in `sidebars.js`. Pages are **not**
   auto-discovered — the sidebars are explicit lists, so a page you forget to
   register is reachable by URL but invisible in navigation.

## The two sidebars

`sidebars.js` exports `staffSidebar` and `developerSidebar`. Reference pages are
defined once as `referenceCategory` and appended to both.

Pick by audience, not by topic. "How do I refund shipping" is staff; "how does
the shipping config document get written" is developer.

## Conventions

**Quote the real UI.** If a button says `Mark all processed`, write
`Mark all processed` in backticks — not "the bulk process button". Someone
searching the docs is usually searching for the exact words on their screen.

**Lead with what it's for.** Every screen page opens with a plain-language
sentence about why the screen exists, before any table of fields.

**Admonitions carry weight — use them sparingly.**

| Type | For |
| --- | --- |
| `:::tip` | A shortcut or a better way |
| `:::note` | A quirk worth knowing, no consequence |
| `:::caution` | Something that will surprise you |
| `:::warning` | Something that will cost you time |
| `:::danger` | Something irreversible or that moves money |

A page with five warnings has none.

**Say what fails silently.** A surprising amount of this app swallows errors.
Where a screen fails quietly, say so — that's often the single most useful
sentence on the page.

**Don't invent.** If you don't know whether a field is customer-visible, write
that you don't know and flag it, rather than guessing. There are already a few
of these on the site, deliberately.

## Links

Internal links are relative file paths including the `.md` extension:

```md
See [Automations](../operations/automations.md) for the thresholds.
```

`onBrokenLinks` is set to `throw`, so a bad link **fails the build**. This is
deliberate — a docs site full of dead links stops being trusted. If a deploy
preview doesn't come up, check the log for the broken link first.

## Styling

`src/css/custom.css` carries the theme, matched to the dashboard's palette.
Light mode uses a darkened amber for links because the dashboard's `#eab308`
doesn't clear contrast requirements on white.

Don't add per-page CSS. If something needs a new style, add it to `custom.css`
so the site stays one system.

## Building

```bash
npm run build      # fails on broken links
npm run serve      # check the built output
npm run clear      # when the dev server serves something stale
```

## Deploying

Push to `main`. Netlify builds from `web/docs-site` and publishes `build/`. See
[Deploying](./deploying.md).
