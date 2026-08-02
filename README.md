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
  administration/          Roles & Access, Billing, Activation
  developers/              Architecture, setup, env, data model, API, access
                           control, deploying
  reference/               Glossary, status reference, role matrix
docusaurus.config.js       Site config, navbar, footer
sidebars.js                Two sidebars — staff and developer
netlify.toml               Build, headers, redirects
src/css/custom.css         Theme, matched to the dashboard palette
```

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
# mobros_docs
