---
title: Architecture
sidebar_position: 1
description: How the backend, mobile app, dashboard and external services fit together.
---

# Architecture

```
┌──────────────────────────────────────────────────────────────────────┐
│                        EXTERNAL SERVICES                             │
│  Firebase (Auth/Firestore/Storage) · Shopify · Mux · Shippo ·        │
│  Stripe · Redis · TCGPlayer                                          │
└─────────────────────────────┬────────────────────────────────────────┘
                              │
                  ┌───────────▼────────────┐
                  │   Express API server   │
                  │        (Heroku)        │
                  │  /api/shopify          │
                  │  /api/sell             │
                  │  /api/pricing          │
                  │  /api/scan             │
                  │  /api/notifications    │
                  │  /api/rewards          │
                  │  /api/billing          │
                  │  /api/mux              │
                  │  /api/admin/*          │
                  │  /broadcast (WS)       │
                  └────┬──────┬──────┬─────┘
                       │      │      │
        ┌──────────────┘      │      └──────────────┐
        │                     │                     │
┌───────▼────────┐   ┌────────▼────────┐   ┌────────▼──────────┐
│  Mobile app    │   │  Admin mobile   │   │  Admin dashboard  │
│  (customer)    │   │   (in-app)      │   │  (Vite + React)   │
│  React Native  │   │  React Native   │   │ web/admin-dashboard│
└────────────────┘   └─────────────────┘   └───────────────────┘
```

## The backend

Node + Express on Heroku. The single gateway between every client and every
external service — **no client talks to Shopify, Mux, Shippo or Stripe
directly.**

Two auth middlewares:

- `verifyToken` — confirms a valid Firebase session
- `verifyAdmin` — additionally requires the admin role on the user record

Plus `verifyStaff` and `roleGuard(...)` for the newer role-aware routes.

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
| `/api/admin/*` | Chargebacks, integrations, shipping automation, ledger | Token + Admin |
| `/broadcast` (WS) | Live break signalling | Token + Admin |

### Real-time

The `/broadcast` WebSocket path handles live break streaming. The server is an
auth gate and lifecycle manager only — **it does not relay media**. The mobile
broadcaster posts a WebRTC SDP offer directly to Mux via WHIP; Mux delivers HLS.

## The admin dashboard

Vite + React SPA. Talks to the backend through an Axios instance that attaches a
Firebase ID token on every request and signs the user out on any 401.

It also talks to **Firestore directly** for a set of live-subscription concerns
where a REST round-trip would be worse: the access matrix, stream state,
automations config, sell submissions, uploads, tickets, giveaways, games,
inventory lines, restock requests and chargeback reports.

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

## The two gates

Independent, and both fail closed:

1. **Entitlements** — what the shop has paid for. Checked client-side by
   `FeatureGate` and re-checked server-side on the sensitive routes.
2. **Roles** — what a staff member may open. Checked by `ProtectedRoute` against
   an editable role → tab matrix.

Details in [Access control](./access-control.md).
