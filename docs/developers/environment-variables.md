---
title: Environment variables
sidebar_position: 3
description: Every environment variable, per project.
---

# Environment variables

:::danger[Never commit secrets]
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

Three values, the Firebase web config for the sign-in gate. Locally they come
from `web/docs-site/.env` (loaded by dotenv, gitignored); in production they
come from Netlify's environment.

```bash
VITE_FIREBASE_API_KEY=
VITE_AUTH_DOMAIN=
VITE_PROJECT_ID=
```

The `VITE_` prefix means nothing to Docusaurus — it's kept because the rest of
the MoBros codebase is Vite, so a `.env` copied from the dashboard works
unchanged. Note the second and third have no `FIREBASE` in them; that's the
dashboard's spelling, and matching it beats being tidy.

A build fails if **any** of the three is missing, and the error names which —
an apiKey without an authDomain passes a naive check and then breaks at
sign-in, which is a much worse place to find out.

There are no secrets here. All three are public by design — they identify the
Firebase project rather than authorising anything, and they ship in the bundle
regardless. Firestore security rules are what actually protect data. The other
Firebase values you'll see in a console snippet (`storageBucket`, `appId`,
`measurementId`, …) aren't needed; auth and Firestore only want these three.

**A production build with no config fails the build**, rather than deploying a
site that shows every visitor an error screen.

Leave them unset locally and `npm start` skips the gate entirely, so you can
write docs without credentials — the navbar says **Gate off (dev)** so it's
obvious. That bypass only applies to development builds; see
[Deploying → The sign-in gate](./deploying.md#the-sign-in-gate).

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
