---
title: Local setup
sidebar_position: 2
description: Getting the backend, dashboard, mobile app and docs site running locally.
---

# Local setup

## Prerequisites

- **Node 20 or newer** (the docs site requires it; the dashboard is happy on 22)
- npm
- A Firebase service account with access to the project
- For mobile: Xcode and/or Android Studio, and CocoaPods

## Backend

```bash
cd backend
npm install
cp .env.example .env    # then fill it in — see Environment variables
npm run dev
```

Serves on `http://localhost:3000`. The dashboard expects `/api` under that.

## Admin dashboard

```bash
cd web/admin-dashboard
npm install
npm run dev
```

Vite serves on `http://localhost:5173`. Sign in with an account that carries
**any staff role** — email and password, Google, or Apple. See
[Signing in](../getting-started/signing-in.md).

Other scripts:

```bash
npm run build      # production build into dist/
npm run preview    # serve the build locally
npm run lint       # eslint
```

### Pointing at a backend

`.env.local` overrides `.env`. To work against your local API:

```bash
VITE_API_URL=http://localhost:3000/api
```

Leaving it unset falls back to exactly that, so local dev usually needs no
configuration at all. A **production** build with no `VITE_API_URL` logs a loud
console error, because every call would hit localhost and fail.

The same applies to `VITE_MCP_URL`, which defaults to
`http://localhost:3001/api` — so Professor Oak, the weak point scan and
Settings → Integrations all need the MCP server running locally, or that variable
pointed at the deployed one.

## MCP server

```bash
cd mobros_mcp
cp .env.example .env     # fill in SHOPIFY_*, SCRYDEX_API_KEY, …
npm install
npm start
```

Serves on `http://localhost:3001`. Two things it needs beyond `.env`:

- **Firebase**: a `serviceAccountKey.js` in the repo root (gitignored), or one of
  the `FIREBASE_SERVICE_ACCOUNT*` variables.
- **OAuth keys**: `oauth-private.pem` and `oauth-public.pem`, already generated
  in the repo.

There's a one-time Firestore seed to run before the first start, and an
`mcpAdmins/{uid}` document for every account that should be an admin there —
dashboard roles mean nothing to this server.

:::note[Claude Desktop can't reach localhost]
To test the MCP protocol surface rather than the REST one, tunnel through ngrok,
set `SERVER_BASE_URL` to the `https://…ngrok.app` URL, restart, and point Claude
Desktop's config at `<that URL>/mcp`. OAuth discovery does the rest. The repo's
`README.md` has the exact steps.
:::

## Docs site

```bash
cd web/docs-site
npm install
npm start          # http://localhost:3000 — clashes with the backend, see below
```

Docusaurus defaults to port 3000, which the backend also wants. Run it on
another port:

```bash
npm start -- --port 3100
```

Other scripts:

```bash
npm run build      # static build into build/
npm run serve      # serve the build locally
npm run clear      # clear the Docusaurus cache when something's stale
```

## Mobile

```bash
cd mobile
npm install
cd ios && pod install && cd ..
npm run ios        # or npm run android
```

The app reads `SERVER_BASE_URL` from `.env`. On an iOS simulator `localhost`
works; on a physical device or Android emulator you need your machine's LAN IP.

## Working across two filesystems

The dashboard and the docs site are separate npm projects with separate
`node_modules`. Installing in one does nothing for the other — a fresh clone
needs `npm install` in each.

## Common problems

| Symptom | Cause |
| --- | --- |
| Dashboard loads but every API call 401s | Not signed in, or signed in with an account lacking the admin role |
| Dashboard loads but every API call fails to connect | Backend isn't running, or `VITE_API_URL` points somewhere wrong |
| Screens show the locked preview panel locally | `/api/billing/features` isn't reachable — entitlements fail closed |
| Sidebar is nearly empty | Your account holds no staff roles, or the access matrix is restrictive |
| Docs site build fails on a link | `onBrokenLinks` is set to `throw`. Fix the link — the message names the file |
