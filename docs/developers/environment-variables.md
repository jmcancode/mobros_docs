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

# PostHog — server-side analytics and log capture
POSTHOG_API_KEY=phc_your_project_token
POSTHOG_HOST=https://your-posthog-host

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

# Comma-separated accounts allowed to open API Keys, Integrations and Roles & Access
VITE_SETTINGS_ADMIN_UIDS=

# The single account allowed to open the Activation page
VITE_ENTITLEMENT_OWNER_UID=

# The MCP server's REST base, including /api. Powers Professor Oak, the weak
# point scan, Settings > Integrations, and the app-store fallback
VITE_MCP_URL=https://your-mcp-server.herokuapp.com/api

# This documentation site, for the sidebar's Docs button
VITE_DOCS_URL=

# App Check (reCAPTCHA Enterprise). App Check stays off until this is set
VITE_RECAPTCHA_ENTERPRISE_SITE_KEY=
# Dev builds only. Never commit one
VITE_APPCHECK_DEBUG_TOKEN=

# The shop's time zone for the Marketing calendar. Default America/New_York
VITE_SHOP_TZ=
```

mobrostc.app (`web/mobros-hub`) reads the same two App Check variables.

File precedence: `.env.local` beats `.env.production` beats `.env`.

:::warning[`.env.production` is committed, on purpose]
`VITE_API_URL` and `VITE_MCP_URL` are pinned in
`web/admin-dashboard/.env.production`. Neither host is a secret, and pinning them
guarantees a production build hits Heroku regardless of a local `.env.local`
pointing at localhost — which is exactly what happens otherwise, and every
Professor Oak call fails against `localhost:3001`.

A production build with `VITE_MCP_URL` unset logs an explicit console error
rather than failing quietly.
:::

`VITE_SETTINGS_ADMIN_UIDS` overrides a hardcoded fallback list in
`src/config/accessMatrix.js`. Setting it in the environment is strongly
preferred to editing that list — see
[Access control](./access-control.md#the-uid-allowlist).

### Backend switches added in October

| Variable | What it does |
| --- | --- |
| `ADMIN_CLIENT_ID`, `ADMIN_CLIENT_SECRET` | The Shopify Admin API app the backend signs in with (client credentials). The secret is also the fallback webhook HMAC key and the fallback signing secret for welcome gift and promo codes |
| `SHOPIFY_STORE_DOMAIN` | The production shop's `*.myshopify.com` domain |
| `SHOPIFY_WEBHOOK_SECRET` | Checked first for webhook HMAC. Webhooks registered through the API sign with the app secret instead, so keep `ADMIN_CLIENT_SECRET` set too |
| `WELCOME_GIFT_SECRET`, `PROMO_CODE_SECRET` | Optional. Decouple the gift and promo code signing from `ADMIN_CLIENT_SECRET` |
| `MOBROS_MCP_URL` | The MCP server, for the routes the backend calls there |
| `HOME_TABS_SYNC_DISABLED=1` | Stops the 15-minute collection tab sync. `POST /api/home-tabs/sync` still works |
| `MARKETING_SWEEP_DISABLED=1` | Stops the Marketing Suite go-time sweep |
| `MARKETING_TZ` | Shop time zone for marketing days. Default `America/New_York` |
| `ADMIN_DASHBOARD_URL`, `STOREFRONT_PUBLIC_URL` | Links written into Shopify Marketing activities and tracked URLs |
| `BAGS_SWEEP_DISABLED=1` | Stops the Bags sweep (draw retries, auto-ship, order edits, seed rotation) |
| `BAGS_CRON_SECRET` | Lets Heroku Scheduler call `POST /api/bags/cron/sweep` with `X-Cron-Secret` |
| `BAGS_PUBLICATION_NAME` | Which sales channel bag products go on (case-insensitive match). Default `headless` |
| `LIVE_ACTIVITIES_ENABLED=true` | Turns on the iOS Live Activity fan-out. Leave unset until app 1.2.0 is in the App Store. Needs the APNs `.p8` key in Firebase Cloud Messaging |

## MCP server (`mobros_mcp/.env`)

Its own Heroku app, with its own config. `.env.example` in that repo is the
authoritative list; the groups are:

```bash
# Firebase Admin — one of these three
FIREBASE_SERVICE_ACCOUNT_JSON=
FIREBASE_SERVICE_ACCOUNT_PATH=
FIREBASE_SERVICE_ACCOUNT=

# Where this server is reachable (OAuth discovery depends on it)
SERVER_BASE_URL=
OAUTH_ISSUER=
MCP_CONNECTOR_TOKEN=

# Encrypts uploaded provider credentials at rest. Without it, Settings >
# Integrations disables its Upload buttons.
MCP_CREDENTIALS_KEY=

# The main backend, for the routes the MCP server proxies rather than reimplements
MOBROS_BACKEND_URL=

# The Brain's reasoning router. Unset or BRAIN_LLM_ENABLED=0 and the keyword
# router answers instead, which the UI says out loud.
ANTHROPIC_API_KEY=
BRAIN_LLM_ENABLED=

# Shopify, Scrydex, Pokémon TCG
SHOPIFY_ADMIN_ACCESS_TOKEN=
SHOPIFY_API_CLIENT_ID=
SHOPIFY_API_CLIENT_SECRET=
SCRYDEX_API_KEY=
SCRYDEX_TEAM_ID=
POKEMON_TCG_API_KEY=

# Live providers. Preferably uploaded via Settings > Integrations instead —
# anything uploaded there takes precedence over these.
EBAY_CLIENT_ID=
EBAY_CLIENT_SECRET=
EBAY_SOLD_ENABLED=

CORS_ORIGINS=
LOG_LEVEL=
PORT=3001
```

:::caution[Pointing the MCP server at the production shop]
Set `SHOPIFY_STORE_DOMAIN` to the production `*.myshopify.com` domain with
`SHOPIFY_API_CLIENT_ID` and `SHOPIFY_API_CLIENT_SECRET`, and **remove**
`SHOPIFY_ADMIN_API_TOKEN` and `SHOPIFY_SHOP_DOMAIN`. A static token wins over
client credentials, so a leftover dev token gets sent to the live shop and
every call fails with 401. Check `/health/detailed` afterwards, then run one
read tool such as `check_inventory`, because the health check doesn't call
Shopify on that path.
:::

| Variable | What it does |
| --- | --- |
| `MCP_CONNECTOR_TOKEN` | Shared with the backend for the `/internal` routes. Must match on both apps |
| `ANTHROPIC_API_KEY` | Without it Professor Oak's router falls back to keywords |
| `MARKETING_PUBLISHER_ENABLED=1` | Starts the Instagram publisher (every 60 seconds) |
| `MCP_CRON_SECRET` | Lets Heroku Scheduler call `POST /api/jobs/marketing/publish-due` with `X-Cron-Secret` |

:::note[Credentials uploaded in the dashboard beat these]
The App Store Connect, Google Play, Search Console, Instagram, TikTok and eBay
credentials can live either in this environment or in the encrypted store behind
[Settings → Integrations](../administration/integrations.md). The uploaded copy
wins; the environment is the fallback, and the Integrations page labels a
provider **Using server env** when that's what's in play.
:::

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
| `MCP_CREDENTIALS_KEY` | **Secret.** It decrypts every stored provider credential |
| `ANTHROPIC_API_KEY` | **Secret.** Usage-billed |
| `POSTHOG_API_KEY` | A project write token. Not a secret in the usual sense, but don't publish it |
| Firebase web config | Public by design. Firestore rules are the real protection |
| Firebase Admin SDK credentials | **Secret** |
| Shopify tokens | **Secret** |
| Stripe secret key | **Secret** |
| Mux, Shippo, Redis credentials | **Secret** |

The UID allowlists are public — they're a convenience gate on the client. The
backend enforces the same rules independently, which is what actually protects
those endpoints.
