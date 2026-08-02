# MoBros docs site

The documentation site for the MoBros admin dashboard. Built with
[Docusaurus](https://docusaurus.io/), deployed to Netlify, served at
**https://mobrostc.info**.

The **Docs** entry in the admin dashboard's sidebar links here.

## Running it locally

```bash
npm install
npm start -- --port 3100
```

Port 3100 because Docusaurus defaults to 3000 and the backend wants that.

```bash
npm run build     # static build into build/ — fails on broken links
npm run serve     # serve the build
npm run clear     # clear the cache when the dev server serves something stale
```

## Layout

```
docs/
  intro.md                 Start here
  getting-started/         Signing in, navigation, the two gates
  operations/              Dashboard, Sell Requests, Tickets, Automations,
                           Intake Processing, Shipping
  catalog/                 Product Pricing, variants/SKU/QR, Buy Rates,
                           Condition Multipliers, Add product, Feed Studio
  community/               Customers, Customer Detail, Rewards, Games, Giveaways
  content/                 Notifications, Live breaks, Hit Feed, Shows
  administration/          Roles & Access, Billing
  developers/              Architecture, setup, env, data model, API, access
                           control, deploying
  reference/               Glossary, status reference, role matrix
docusaurus.config.js       Site config, navbar, footer
sidebars.js                Two sidebars — staff and developer
netlify.toml               Build, headers, redirects
src/css/custom.css         Theme, matched to the dashboard palette
plugins/llm-export.js      Generates the LLM-friendly copies (below)
src/components/CopyForAI/  The "Copy for AI" button
src/theme/DocItem/Content/ Wrapper that puts the button above each page title
netlify/edge-functions/    gate.ts — the staff sign-in wall (below)
```

## This site is private

`netlify/edge-functions/gate.ts` runs at the edge on every request. No session,
no content — including `/llms-full.txt` and every `/llm/*.md` file. Sign-in is
Google, checked against the same Firestore roles the dashboard uses via
`GET /api/docs-auth/me` on the backend.

It needs five environment variables set in Netlify and one Firebase authorised
domain. **Setup: `docs/developers/deploying.md` → "The sign-in gate".**

`npm start` runs ungated — edge functions only run under `netlify dev` or on
Netlify. Handy locally, worth remembering before you assume the gate is broken.

To sanity-check a deploy:

```bash
curl -si https://mobrostc.info/llms-full.txt | head -1   # expect 401
```

## The "Copy for AI" feature

Every page has a **Copy for AI** button. It copies that page's markdown wrapped
in a prompt preamble, so a staff member can paste it into ChatGPT / Claude /
Gemini and ask a question without knowing anything about prompting. The copied
text ends with `My question:` so their cursor lands in the right place.

`plugins/llm-export.js` generates three things into `static/` on every build
and every dev-server start:

| Path | What it is |
| --- | --- |
| `/llm/<permalink>.md` | One prompt-wrapped file per page — what the button fetches |
| `/llms.txt` | An index of every page, per the llms.txt convention |
| `/llms-full.txt` | The entire manual in one file, for large-context models |

All of it is gitignored — it's build output, regenerated from `docs/`.

**The one thing that can break it:** the plugin derives each page's URL the same
way Docusaurus does for this site — `routeBasePath: '/'`, so a file's route is
its path under `docs/` minus the extension, unless front matter sets a `slug`.
Change `routeBasePath` and the button starts 404ing. If that happens, the fix is
in `permalinkFor()` in the plugin.

To edit the instructions the assistant receives, change `buildPrompt()` in the
same file.

## Adding a page

1. Create the Markdown file under the right `docs/` folder with `title`,
   `sidebar_position` and `description` front matter.
2. Register it in `sidebars.js`. Pages are **not** auto-discovered.

`onBrokenLinks` is set to `throw`, so a bad internal link fails the build. That
is on purpose.

Full conventions: `docs/developers/editing-these-docs.md`.

## Deploying

Push to `main`. Netlify builds from base directory `web/docs-site` and publishes
`build/`. Settings live in `netlify.toml`, so nothing needs typing into the UI
beyond the base directory.

## Moving the domain

If the docs move to a subdomain, change both:

1. `url` in `docusaurus.config.js`
2. `DOCS_URL` in `web/admin-dashboard/src/components/Layout.jsx`
