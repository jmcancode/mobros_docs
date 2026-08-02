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

The docs site lives in its own repo — `jmcancode/mobros_docs` — so Netlify's
repo root is the project root and **Base directory stays empty**. `netlify.toml`
carries the build settings, so there's nothing to type into the UI.

(The dashboard and hub are different: they sit inside the `mobros` monorepo, so
their Netlify sites *do* need a Base directory. Don't copy their setup here.)

### Creating the site

1. **Add new site → Import an existing project**, and pick `mobros_docs`.
2. Leave **Base directory** empty.
3. Netlify reads `netlify.toml` and fills in the rest:
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

The docs site is staff-only. `src/theme/Root` wraps the whole app: it signs the
reader in with Google, reads their `users/{uid}` document, and renders the docs
only if `roles.isAdmin` is true. Same project, same account, same check as the
dashboard's `Login.jsx` — so revoking dashboard access revokes docs access.

:::caution[Be clear-eyed about what this protects]
This is a client-side gate on a static site. It stops a casual visitor and means
the URL can be shared without handing over the manual. It is **not** a
server-side wall.

Two things narrow the gap. The whole app renders client-side, so the HTML files
on the CDN are near-empty shells — `curl` on any page URL returns the sign-in
screen, not the content. And the site no longer publishes the plain-text copies
of every page that used to back the Copy for AI button; that feature now builds
its text from the rendered page instead.

What remains: the page content is compiled into the JavaScript chunks under
`/assets/js/`, which are publicly fetchable. Someone who knows what they're
doing can pull the route manifest and read them. Closing that needs a check that
runs before Netlify serves the file — a metered edge function, which was a
deliberate no.

**Write the docs on that basis.** No credentials, no customer data, no real
UIDs. Business process and UI labels: fine.
:::

#### Setting it up

**1. Set three build-time environment variables** in Netlify (Site
configuration → Environment variables) — the same public Firebase web config
the dashboard uses:

```bash
VITE_FIREBASE_API_KEY=
VITE_AUTH_DOMAIN=
VITE_PROJECT_ID=
```

These are read at build time and baked into the bundle, so **changing one needs
a redeploy**, not just a restart. A production build with no config fails
loudly rather than shipping a broken site.

For local work, put the same three in `web/docs-site/.env` — it's gitignored and
loaded automatically.

**2. Authorise the domain in Firebase.** Firebase Console → Authentication →
Settings → **Authorized domains** → add `mobrostc.info`.

:::warning[This is the step that gets missed]
Skip it and sign-in fails with `auth/unauthorized-domain`. The screen says so
explicitly, but only after someone has already tried and been confused. Do it
before you tell anyone the site is live. Add the Netlify `*.netlify.app` domain
too if you want deploy previews to be signable-in.
:::

**3. Check Firestore rules allow a signed-in user to read their own record.**
The dashboard's login already relies on this, so it almost certainly works —
but if the gate shows *Couldn't read your account permissions*, that's the
cause.

**4. Deploy and test in a private window.** You should get the sign-in card.

#### Operating it

| Task | How |
| --- | --- |
| Revoke someone | Remove `roles.isAdmin` — same as revoking dashboard access. Takes effect on their next page load |
| Widen access to all staff | Add the other staff role keys to `ALLOWED_ROLES` in `src/theme/Root/index.js`. One line |
| Sign out on this machine | The **Sign out** link, top right |

**Local development runs ungated.** `npm start` with no Firebase env vars set
skips the gate so you can write docs without credentials. That bypass is scoped
to `NODE_ENV === 'development'`, so a production build can never take it — but
it does mean "it let me straight in locally" is expected, not a bug.

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

:::warning[Don't skip VITE_API_URL]
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
