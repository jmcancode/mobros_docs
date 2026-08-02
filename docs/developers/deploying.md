---
title: Deploying
sidebar_position: 1
description: Netlify setup for the docs site and the dashboard, plus Heroku for the backend.
---

# Deploying

Three deploy targets, three different stories.

| Project | Host | Trigger |
| --- | --- | --- |
| `backend/` | Heroku | Push to the deploy branch |
| `web/admin-dashboard/` | Netlify | Push to `main` |
| `web/docs-site/` | Netlify | Push to `main` |
| `web/mobros-hub/` | Netlify | Push to `main` |

## The docs site on Netlify

The repo is a monorepo with several deployable web projects, so each Netlify
site points at its own subdirectory. `web/docs-site/netlify.toml` already
carries the build settings — you shouldn't need to type them into the UI.

### Creating the site

1. **Add new site → Import an existing project**, and pick the MoBros repo.
2. Set **Base directory** to `web/docs-site`.
3. Netlify reads `netlify.toml` from that base directory and fills in the rest:
   - **Build command:** `npm run build`
   - **Publish directory:** `build`
   - **Node version:** 20
4. Deploy.

### What `netlify.toml` sets up

- **Build settings** — command, publish directory, and a pinned Node version so
  a Netlify default bump can't break the build.
- **A branch-deploy context** that skips the sitemap noise on preview builds.
- **Cache headers** — Docusaurus fingerprints its assets, so
  `/assets/*` is served immutable for a year. HTML is never cached, so a
  content change is live the moment the deploy finishes.
- **Security headers** — `X-Frame-Options`, `X-Content-Type-Options`,
  `Referrer-Policy`, and a `Permissions-Policy` turning off camera, mic and
  geolocation.
- **A 404 fallback.** Docusaurus is a fully static site with a real page per
  route, so there is deliberately **no SPA catch-all redirect** — a genuinely
  wrong URL should 404, not silently render the homepage.

### The custom domain

Point `mobrostc.info` at the docs site in **Domain management**. Netlify
provisions the certificate automatically.

If you move the docs to a subdomain instead, two things have to change together:

1. `url` in `web/docs-site/docusaurus.config.js`
2. `DOCS_URL` in `web/admin-dashboard/src/components/Layout.jsx`

### Deploy previews

Every pull request touching `web/docs-site` gets its own preview URL. Because
`onBrokenLinks` is set to `throw`, **a broken internal link fails the build** —
the preview simply won't come up, and the log names the offending file. That's
intentional.

## The admin dashboard on Netlify

Same pattern, base directory `web/admin-dashboard`, build `npm run build`,
publish `dist`.

Two things it needs that the docs site doesn't:

- **Environment variables.** Every `VITE_*` variable from
  [Environment variables](./environment-variables.md) has to be set in the
  Netlify UI. They're baked in at build time, so changing one requires a
  redeploy, not just a restart.
- **An SPA redirect.** React Router owns the routes, so every path must serve
  `index.html`:

  ```toml
  [[redirects]]
    from = "/*"
    to = "/index.html"
    status = 200
  ```

  Without it, a hard refresh on `/sell-requests` 404s.

:::warning Don't skip VITE_API_URL
A production build without it points every API call at localhost. The code logs
a console error when it detects this, but the site will look completely broken
to anyone who hits it.
:::

## The backend on Heroku

Config vars mirror `backend/.env`. `FIREBASE_PRIVATE_KEY` is the one that
regularly goes wrong — Heroku stores the literal `\n` sequences, and they have
to be turned back into newlines before the Admin SDK sees the key.

## Deploy checklist

- [ ] Backend deployed first, if the release includes API changes
- [ ] `VITE_API_URL` points at the right backend
- [ ] Firestore indexes created for any new ordered or collection-group query
- [ ] Security rules updated for any new collection
- [ ] Docs site builds clean — no broken links
- [ ] Docs updated for any screen whose behaviour changed
