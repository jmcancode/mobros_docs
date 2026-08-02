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

### The sign-in gate

The docs site is private. `netlify/edge-functions/gate.ts` runs at the edge on
every request and refuses anything without a valid staff session.

**Why at the edge and not in the app.** This is a static site. A login screen
inside React would protect the rendered pages and nothing else — `/llms-full.txt`
and every `/llm/*.md` file would still be one `curl` away, and those contain the
entire manual in plain text. Enforcing before Netlify serves the byte is the only
version of this that's real.

**How a sign-in goes:**

1. No session cookie → the edge function returns the sign-in page itself. It's
   inline HTML with no dependency on site assets, because allowlisting
   `/assets/*` would leak everything (Docusaurus bundles page text into JS
   chunks).
2. The page runs Google sign-in and POSTs the Firebase ID token to
   `/_gate/session`.
3. The gate forwards that token to `GET /api/docs-auth/me` on the backend, which
   verifies it with the Admin SDK and checks the Firestore `roles` map — the same
   source of truth the dashboard uses. Grant someone a staff role and their docs
   access follows; there's no second list.
4. On success the gate mints its own HMAC-signed cookie. Every later request is
   verified locally at the edge, so there's no backend round-trip per asset.

The bar is **any staff role**, not Admin — see
[`verifyStaff`](./access-control.md#backend-guards).

#### Setting it up

**1. Deploy the backend.** `backend/routes/docs-auth.routes.js` is mounted in
`index.js` at `/api/docs-auth`. Nothing works until this is live.

**2. Generate a session secret.**

```bash
openssl rand -base64 48
```

**3. Set the Netlify environment variables** (Site configuration →
Environment variables). Full list in
[Environment variables](./environment-variables.md#docs-site-webdocs-site):
`DOCS_SESSION_SECRET`, `DOCS_API_URL`, `DOCS_FIREBASE_API_KEY`,
`DOCS_FIREBASE_AUTH_DOMAIN`, `DOCS_FIREBASE_PROJECT_ID`, and optionally
`DOCS_GATE_SECRET`.

**4. Authorise the domain in Firebase.** Firebase Console → Authentication →
Settings → **Authorized domains** → add `mobrostc.info`.

:::warning This is the step that gets missed
Skip it and sign-in fails with `auth/unauthorized-domain` — the page says so
explicitly, but only after someone has already tried and been confused. Do it
before you tell anyone the site is live. Add the Netlify `*.netlify.app` domain
too if you want deploy previews to be signable-in.
:::

**5. Deploy and test in a private window.** You should get the sign-in card, not
the docs. Then check the parts people forget:

```bash
curl -si https://mobrostc.info/llms-full.txt | head -1   # expect 401
curl -si https://mobrostc.info/llm/intro.md   | head -1   # expect 401
```

If either returns 200, the gate isn't running — check that Netlify picked up the
edge function (it looks in `<base>/netlify/edge-functions`, so
`web/docs-site/netlify/edge-functions`).

#### Operating it

| Task | How |
| --- | --- |
| Sign everyone out | Change `DOCS_SESSION_SECRET`. Takes effect immediately, no rebuild |
| Revoke one person | Remove their staff roles — same as revoking dashboard access. Their current session lasts until it expires (≤12h) |
| Sign out on this machine | The **Sign out** link, top right. Sessions also end when the browser closes |
| Change session length | `SESSION_HOURS` in `gate.ts` |

**Deploy previews are gated too** — same build, same edge function. A preview URL
is not a way around the wall.

**Invocation cost:** the gate runs on `/*`, so it fires for every asset request,
not just page views. That's necessary — the JS chunks contain the content — but
it means edge function invocations scale with traffic. Fine for a shop team;
worth knowing if the audience ever grows.

**Local development runs ungated.** `npm start` doesn't run edge functions. Use
`netlify dev` if you need to exercise the gate locally.

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
