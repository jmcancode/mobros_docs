---
title: Architecture
sidebar_position: 1
description: How the backend, mobile app, dashboard and external services fit together.
---

# Architecture

```
┌──────────────────────────────────────────────────────────────────────────┐
│                          EXTERNAL SERVICES                               │
│  Firebase (Auth/Firestore/Storage) · Shopify · Mux · Shippo · Stripe ·   │
│  Redis · TCGPlayer · Scrydex · App Store Connect · Google Play ·         │
│  Search Console · Instagram · TikTok · eBay · PostHog                    │
└──────────────┬──────────────────────────────────────────┬────────────────┘
               │                                          │
   ┌───────────▼────────────┐                 ┌───────────▼────────────┐
   │   Express API server   │◄────────────────►│      MCP server        │
   │        (Heroku)        │   app-stores,    │       (Heroku)         │
   │  /api/shopify          │   fallback both  │  /api/tools/:name      │
   │  /api/sell             │   directions     │  /api/brain/*          │
   │  /api/pricing          │                  │  /api/integrations     │
   │  /api/scan             │                  │  /mcp  (OAuth, for     │
   │  /api/notifications    │                  │        Claude et al.)  │
   │  /api/rewards          │                  └───────────┬────────────┘
   │  /api/billing          │                              │
   │  /api/whoami           │                              │
   │  /api/admin/*          │                              │
   │  /broadcast (WS)       │                              │
   └────┬──────┬──────┬─────┘                              │
        │      │      │                                    │
   ┌────┘      │      └───────────────┬─────────────────────┘
   │           │                      │
┌──▼─────────┐ │ ┌────────────────┐ ┌─▼─────────────────┐
│ Mobile app │ │ │  Admin mobile  │ │  Admin dashboard  │
│ (customer) │ │ │   (in-app)     │ │  (Vite + React)   │
│React Native│ │ │  React Native  │ │web/admin-dashboard│
└────────────┘ │ └────────────────┘ └───────────────────┘
               │
         ┌─────▼──────┐
         │ mobros-hub │
         │ (marketing │
         │  + store)  │
         └────────────┘
```

## The backend

Node + Express on Heroku. The single gateway between every client and every
external service — **no client talks to Shopify, Mux, Shippo or Stripe
directly.**

Auth middlewares, in rough order of how much they ask:

- `verifyToken` — confirms a valid Firebase session. Also carries the ID token's
  `signInProvider` through on `req.user`
- `verifyStaff` — additionally requires any internal staff role
- `verifyAdmin` — additionally requires the admin role
- `requireTab("…")` — requires that the **role → tab matrix** grants this tab.
  The server mirrors the dashboard's matrix in `lib/access-matrix.js` and
  subscribes to the same `settings/accessMatrix` overrides

`requireTab` is the direction of travel; `verifyAdmin` is what most routes still
use. See [Access control](./access-control.md#backend-guards).

### Route groups

| Prefix | Purpose | Auth |
| --- | --- | --- |
| `/api/shopify/products` | Catalog, home feed | Public |
| `/api/shopify/checkout` | Cart and checkout | Public |
| `/api/shopify/sync-customer` | Links a Firebase user to a Shopify customer | Token |
| `/api/shopify/bulk` | Bulk product management | Token + Admin |
| `/api/rewards` | Loyalty points | Public / Admin for the `/admin` subtree |
| `/api/sell/*` | Sell-to-us sessions, submissions, collections, home visits | Mixed |
| `/api/pricing` | Card pricing lookups | Public |
| `/api/scan` | Camera card recognition | Public |
| `/api/mux` | Live stream management | Token + Admin |
| `/api/notifications` | Push sending, webhooks, logs | Mixed |
| `/api/billing` | Entitlements, overrides, Stripe checkout | Token (+ owner UID for overrides) |
| `/api/admin/*` | Chargebacks, shipping automation, ledger | Token + Admin |
| `/api/admin/app-stores` | App Store Connect + Google Play analytics | Token + `requireTab("analytics")` |
| `/api/admin/welcome-gift` | The Welcome Gift switch and its status | Token + `requireTab("giveaways")` or `requireTab("promotions")` |
| `/api/promos` | Promo modals for the app and mobrostc.app | Optional token; `/claim` needs one |
| `/api/home-tabs/sync` | Re-sync collection-sourced Home tabs | Token + `requireTab("feed-studio")` |
| `/api/admin/marketing` | Marketing Suite | Token + `requireTab("marketing")` + `requirePaid("feat_marketingSuite")` |
| `/api/admin/bags` | Bags: launch switch, tiers, slabs, live/pause | Token + `requireTab("bags")` |
| `/api/bags` | Bags: a customer's ship-or-credit choice; the cron sweep | Token / `X-Cron-Secret` |
| `/api/admin/sessions` | Forced sign-out | Token + Admin role |
| `/api/live-activities/tokens` | iOS Live Activity token registration | Token |
| `/api/whoami` | The server's own view of a caller's access | Token |
| `/broadcast` (WS) | Live break signalling | Token + Admin |

### Real-time

The `/broadcast` WebSocket path handles live break streaming. The server is an
auth gate and lifecycle manager only — **it does not relay media**. The mobile
broadcaster posts a WebRTC SDP offer directly to Mux via WHIP; Mux delivers HLS.

### Background jobs in the web dyno

| Job | When | Notes |
| --- | --- | --- |
| Home tabs sync | Every 15 minutes, on cache bust and on demand | Redis lock so dynos don't double-run. Off with `HOME_TABS_SYNC_DISABLED=1` |
| Marketing go-time sweep | Every 60 seconds | One dyno at a time via a Firestore lease. Off with `MARKETING_SWEEP_DISABLED=1` |
| Bags sweep | Every 60 seconds | Draw retries, auto-ship at the deadline, order edits, stuck credits, seed rotation. One dyno via a Firestore lease. Off with `BAGS_SWEEP_DISABLED=1` |
| Live Activity watcher | Listens on the three stream channel docs | Off until `LIVE_ACTIVITIES_ENABLED` is set |
| Forced sign-out runs | When an admin starts one | Revokes refresh tokens in the background and resumes after a restart |

Every authenticated request also checks the caller's sign-in time against
`settings/sessionCutoff`, so a forced sign-out takes effect on the API at once.

## The MCP server

`mobros_mcp/`, a separate Heroku app. It exposes shop operations as **tools** —
grouped into sixteen areas of the business — over two surfaces:

- **`/mcp`** — the MCP protocol endpoint, OAuth-discovered. This is what Claude
  and other MCP clients connect to.
- **`/api/…`** — a plain REST surface the dashboard uses:
  `/api/tools/:name`, `/api/brain/*`, `/api/integrations`, `/api/access`.

Every tool carries two independent flags: `write` (it changes the shop) and
`needsApproval` (it cannot run without someone confirming). A write tool returns
a preview and a confirmation token rather than performing the write.

It has its own identity model. `mcpAdmins/{uid}` decides who is an admin there,
and scopes (`admin:analytics:read` and friends) decide what any caller may run —
**separate from the dashboard's role matrix**. A staff member with every
dashboard tab can still be refused a tool for want of a scope. Both are managed
from [Settings → Claude Access](../administration/claude-access.md). Price
approvals are the one exception that also reads the role matrix
(`pricing-approve`).

It also runs the reprice scrub (one run at a time, resumed by another dyno if
one dies) and, when `MARKETING_PUBLISHER_ENABLED=1`, the Instagram publisher for
the Marketing Suite.

It reads live provider credentials — App Store Connect, Google Play, Search
Console, Instagram, TikTok, eBay — from its own encrypted store, managed from
[Settings → Integrations](../administration/integrations.md). Anything not
uploaded falls back to the server's environment variables.

The backend and the MCP server fall back to **each other** on app-store data: the
dashboard asks the backend first, and the backend's own adapter defers to the MCP
server when it can't answer. Keep the `reason` codes stable in both directions.

## The admin dashboard

Vite + React SPA. Talks to the backend through an Axios instance that attaches a
Firebase ID token on every request and signs the user out on any 401.

It also talks to **Firestore directly** for a set of live-subscription concerns
where a REST round-trip would be worse: the access matrix, stream state,
automations config, sell submissions, uploads, tickets, giveaways, games,
inventory lines, restock requests, chargeback reports, markup rules and
per-operator Brain layouts.

Firestore runs with a **persistent local cache** (IndexedDB, multi-tab), so the
big listeners hydrate instantly on every load after the first rather than
re-downloading the whole collection.

It talks to the **MCP server** directly too, on its own base URL — the Brain
page, the weak point scan, Integrations, and the app-store fallback.

Anything requiring the Admin SDK — notably `inventoryUnits`, which is
admin-locked in the security rules — goes through the backend instead. That's
why [Intake Processing](../operations/intake-processing.md) polls a REST service
rather than subscribing.

## The mobile app

React Native, one build for customers and admins. Admin screens unlock from the
Profile tab when the user's record carries the admin role.

```
RootNavigation
  ├── AuthStack        unauthenticated
  └── AppStack         authenticated
        ├── HomeStack      Home, ProductDetails, Cart, LiveBreak
        ├── ProductStack   Inventory, ProductDetails, Cart
        └── ProfileStack   Profile, Orders, SellToUs, Settings,
                           Rewards, Tickets, Notifications,
                           + Admin screens when admin
```

## Service responsibilities

| Service | Used by | For |
| --- | --- | --- |
| **Firebase Auth** | All clients | Sign-in, token issuance |
| **Firestore** | All clients + backend | Users, sell requests, tickets, settings, games, inventory lines |
| **Firebase Storage** | Mobile + dashboard | Card photos, product images, giveaway art |
| **Firebase Messaging** | Mobile | Push notifications |
| **Shopify** | Backend only | Catalog, cart, checkout, customer sync, inventory writes |
| **Mux** | Backend + mobile | Stream provisioning (server), playback (mobile) |
| **Stripe** | Backend only | Feature purchases |
| **Redis** | Backend only | Rate limiting, caching |
| **Shippo** | Backend only | Shipping labels |
| **TCGPlayer** | Backend only | Market pricing |
| **Scrydex** | MCP server + backend | Card data and pricing |
| **App Store Connect / Google Play** | MCP server, proxied by the backend | Install, conversion and review data |
| **Search Console / Instagram / TikTok / eBay** | MCP server only | Search, social and comparable-price data |
| **PostHog** | Backend + mobros-hub | Product analytics and server-side logs |
| **Anthropic** | MCP server only | The Brain's reasoning router |

## The two gates

Independent, and both fail closed:

1. **Entitlements** — what the shop has paid for. Checked client-side by
   `FeatureGate` and re-checked server-side on the sensitive routes.
2. **Roles** — what a staff member may open. Checked by `ProtectedRoute` against
   an editable role → tab matrix, and by `requireTab` on the API using a mirror
   of the same matrix.

A few surfaces sit above the matrix entirely, on explicit UID allowlists no role
or admin flag overrides: Roles & Access, API Keys, Integrations, Billing, and the
owner-only Activation page. The MCP server adds a third, independent model —
`mcpAdmins` plus scopes.

Details in [Access control](./access-control.md).
