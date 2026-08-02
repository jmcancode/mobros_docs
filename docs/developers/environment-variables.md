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

No environment variables. The production URL is set in `docusaurus.config.js`.
If the site moves to a subdomain, change `url` there — and update the **Docs**
link in the dashboard's `src/components/Layout.jsx`.

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
