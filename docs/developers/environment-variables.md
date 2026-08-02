---
title: Environment variables
sidebar_position: 3
description: Every environment variable, per project.
---

# Environment variables

:::danger Never commit secrets
`.env` files are gitignored for a reason. Service account JSON, Stripe secret
keys and Shopify access tokens have all leaked from repos before. If one gets
committed, rotate it rather than just deleting the file.
:::

## Backend (`backend/.env`)

```bash
# Firebase Admin SDK
FIREBASE_PROJECT_ID=
FIREBASE_PRIVATE_KEY=
FIREBASE_CLIENT_EMAIL=

# Shopify
SHOPIFY_STORE_URL=
SHOPIFY_ACCESS_TOKEN=
SHOPIFY_STOREFRONT_TOKEN=

# Mux — live streaming
MUX_TOKEN_ID=
MUX_TOKEN_SECRET=

# Redis — rate limiting and caching
REDIS_URL=

# Shippo — shipping labels
SHIPPO_API_KEY=

# Stripe — feature purchases
BBOY_STRIPE_SECRET_KEY=

# Who may use the Activation page and the billing override endpoint
ENTITLEMENT_OWNER_UID=

# Email, used for chargeback report delivery
GMAIL_USER=
GMAIL_APP_PASSWORD=

PORT=3000
```

`FIREBASE_PRIVATE_KEY` contains literal `\n` sequences in most hosting
environments. If auth fails with a PEM parsing error, that's why — the key needs
its newlines restored before being handed to the Admin SDK.

## Admin dashboard (`web/admin-dashboard/.env`)

Vite only exposes variables prefixed `VITE_`. Everything here ends up in the
**client bundle** — treat all of it as public.

```bash
# Backend API base, including the /api suffix
VITE_API_URL=https://your-backend.herokuapp.com/api

# Firebase web config — public by design, protected by security rules
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=

# Comma-separated accounts allowed to open API Keys and Roles & Access
VITE_SETTINGS_ADMIN_UIDS=

# The single account allowed to open the Activation page
VITE_ENTITLEMENT_OWNER_UID=
```

File precedence: `.env.local` beats `.env.production` beats `.env`.

`VITE_SETTINGS_ADMIN_UIDS` overrides a hardcoded fallback list in
`src/config/accessMatrix.js`. Setting it in the environment is strongly
preferred to editing that list — see
[Access control](./access-control.md#the-uid-allowlist).

## Mobile (`mobile/.env`)

Read via `react-native-dotenv`.

```bash
SERVER_BASE_URL=https://your-backend.herokuapp.com
```

## Docs site (`web/docs-site`)

Set in **Netlify → Site configuration → Environment variables**, not in a file.
These are read by the edge gate at request time, so changing one takes effect on
the next request — no rebuild needed.

```bash
# Signs the session cookie. Any long random string; rotating it signs
# everyone out. Generate with: openssl rand -base64 48
DOCS_SESSION_SECRET=

# Backend base including /api — where the gate sends the ID token to check roles
DOCS_API_URL=https://your-backend.herokuapp.com/api

# Same public Firebase web config the dashboard uses
DOCS_FIREBASE_API_KEY=
DOCS_FIREBASE_AUTH_DOMAIN=
DOCS_FIREBASE_PROJECT_ID=

# Optional. Set the same value here and on the backend so only the gate can
# call /api/docs-auth/me.
DOCS_GATE_SECRET=
```

:::danger DOCS_SESSION_SECRET is a real secret
Anyone holding it can forge a session cookie and read the whole site. It is the
one value here that isn't already public. Never put it in the repo, and rotate
it if it's ever exposed — rotation is free, it just signs everyone out.
:::

The gate **fails closed**: if any of the first four are missing it serves a 503
to everyone rather than letting requests through. That's deliberate — a gate
that opens when its config is missing is worse than no gate, because everyone
assumes it's working.

Full setup, including the Firebase authorised-domain step, is in
[Deploying](./deploying.md#the-sign-in-gate).

The production URL is set in `docusaurus.config.js`. If the site moves to a
subdomain, three things change together: `url` there, `DOCS_URL` in the
dashboard's `src/components/Layout.jsx`, and the authorised domain in Firebase.

## What's public vs secret

| Variable family | Public? |
| --- | --- |
| Anything `VITE_*` | **Public.** It ships in the bundle |
| Firebase web config | Public by design. Firestore rules are the real protection |
| Firebase Admin SDK credentials | **Secret** |
| Shopify tokens | **Secret** |
| Stripe secret key | **Secret** |
| Mux, Shippo, Redis credentials | **Secret** |

The UID allowlists are public — they're a convenience gate on the client. The
backend enforces the same rules independently, which is what actually protects
those endpoints.
