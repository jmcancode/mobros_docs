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
npm run clear     # clear the cache — see below
```

### If the dev server shows errors that make no sense

Docusaurus caches its module graph in `.docusaurus/`, and that cache does **not**
notice two things: a newly installed dependency, and a newly added swizzle under
`src/theme/`. Pull a branch that adds either and the running dev server will
insist on nonsense — `Module not found: Can't resolve 'turndown'` for a package
that's sitting right there in `node_modules`, or
`No NavbarItem component found for type "custom-signOut"` for a component that
exists.

Stop the server and:

```bash
npm install       # if package.json changed
npm run clear     # always, after pulling a swizzle or a new dep
npm start
```

That fixes it. Reach for this before debugging the code — the error messages
point confidently at the wrong thing.

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
src/theme/Root/            The sign-in gate (below)
src/components/SignInScreen/   What you see until you're signed in
src/lib/firebase.js        Lazy Firebase init, shared by the gate
src/components/CopyForAI/  The "Copy for AI" button
src/theme/DocItem/Content/ Wrapper that puts the button above each page title
src/theme/NavbarItem/      Registers the "Sign out" navbar item
```

## The "Copy for AI" button

Every page has one. It copies the page wrapped in a prompt preamble so staff can
paste it into ChatGPT / Claude / Gemini and ask in plain English. The text ends
with `MY QUESTION:` so their cursor lands in the right place — and the preamble
tells the assistant what to do if they paste and hit send without typing, which
is the most common way this goes wrong.

The markdown is built from the rendered article in the browser, via Turndown.
An earlier version pre-generated `/llm/<page>.md` files plus a `/llms-full.txt`
containing the whole manual — but those sat on the CDN unauthenticated, which
made the sign-in gate pointless. Reading the DOM keeps the feature and removes
the corpus. Side benefit: what gets copied always matches what's on screen.

To change the instructions the assistant receives, edit `buildPrompt()` in
`src/components/CopyForAI/index.js`.

## This site is private

`src/theme/Root` gates the whole app behind Google sign-in and a `roles.isAdmin`
check against the same Firestore record the dashboard reads.

It needs three values — put them in `.env` locally (gitignored, loaded by
dotenv) and in Netlify's environment for production:

```bash
VITE_FIREBASE_API_KEY=
VITE_AUTH_DOMAIN=
VITE_PROJECT_ID=
```

Plus `mobrostc.info` added under Firebase Console → Authentication → Settings →
Authorized domains, or Google sign-in fails with `auth/unauthorized-domain`.
**Full setup: `docs/developers/deploying.md` → "The sign-in gate".**

Leave the env unset and `npm start` skips the gate so you can write docs without
credentials — the navbar shows **Gate off (dev)** so you can tell. A production
build with no config fails rather than shipping broken.

Be clear-eyed about what it is: a client-side gate on a static site. The page
HTML on the CDN is a near-empty shell — the app renders client-side, so `curl`
on a page URL returns the sign-in screen — but the content is compiled into the
JS chunks under `/assets/js/`, which are fetchable by anyone who bothers.
Closing that gap needs a metered edge function, which was a deliberate no.

So: no credentials, no customer data, no real UIDs in these pages.

## Adding a page

1. Create the Markdown file under the right `docs/` folder with `title`,
   `sidebar_position` and `description` front matter.
2. Register it in `sidebars.js`. Pages are **not** auto-discovered.

`onBrokenLinks` is set to `throw`, so a bad internal link fails the build. That
is on purpose.

Full conventions: `docs/developers/editing-these-docs.md`.

## Deploying

Push to `main`. This is its own repo (`jmcancode/mobros_docs`), so Netlify's
Base directory is empty and `netlify.toml` supplies everything else.

The three `VITE_*` values from `.env` must also be set in **Netlify → Site
configuration → Environment variables** — they're read at build time, and a
build without them fails on purpose rather than deploying a broken site.

## Moving the domain

If the docs move to a subdomain, change both:

1. `url` in `docusaurus.config.js`
2. `DOCS_URL` in `web/admin-dashboard/src/components/Layout.jsx`
