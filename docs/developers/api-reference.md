---
title: API reference
sidebar_position: 2
description: The backend endpoints the admin dashboard calls, grouped by area.
---

# API reference

Every path below is relative to `VITE_API_URL`, which includes the `/api`
suffix. Requests carry a Firebase ID token in an `Authorization: Bearer` header
when a user is signed in.

A `401` on any request signs the user out and redirects to `/login`. There's no
token-refresh retry.

## Billing & entitlements

| Method | Path | Purpose |
| --- | --- | --- |
| `GET` | `/billing/features` | The entitlement map — `{ featureKey: paid }`. Read on every mount of a gated screen |
| `GET` | `/billing/catalog` | Full catalog with prices, paid/trial state, and the outstanding total |
| `POST` | `/billing/override` | Owner-only. Start/end a trial, or mark a feature paid |
| `POST` | `/billing/checkout` | Creates a Stripe checkout session for the selected features |

## Sell requests

| Method | Path | Purpose |
| --- | --- | --- |
| `GET` | `/sell/home-visits` | List home visit requests. One-shot, not live |
| `PATCH` | `/sell/home-visits/:id/status` | Change status. Routed through the backend because it pushes the customer |
| `POST` | `/sell/submissions/:id/messages` | Post a message, optionally with a counter offer |
| `POST` | `/sell/collections/:id/messages` | Post a message on a collection upload, optionally with a lump-sum offer |

Submission and upload **status** changes are direct Firestore writes, not REST
calls.

## Support tickets

| Method | Path | Purpose |
| --- | --- | --- |
| `PATCH` | `/support/tickets/:id/status` | Change status |
| `PATCH` | `/support/tickets/:id` | Update the ticket (used for internal notes) |
| `POST` | `/support/tickets/:id/responses` | Post a reply |
| `DELETE` | `/support/tickets/:id` | Hard delete |

## Notifications

| Method | Path | Purpose |
| --- | --- | --- |
| `POST` | `/notify/manual` | The general-purpose send. Also used for assignment pings and buy-rate announcements |
| `POST` | `/notify/admin/notify-restock` | Notify everyone waiting on a restocked product |
| `POST` | `/notifications/admin/live-break` | Legacy go-live path for the main channel, kept for its audit logging |
| `GET` | `/notifications/admin/logs?limit=50` | Send history |
| `GET` | `/notifications/admin/users/search?q=&limit=` | Recipient search |
| `GET` `POST` | `/notifications/admin/webhooks` | List and create webhooks |
| `PATCH` `DELETE` | `/notifications/admin/webhooks/:id` | Update and delete |
| `POST` | `/notifications/admin/webhooks/:id/test` | Send a test message |

### The `/notify/manual` payload

```json
{
  "title": "New Pokémon Products Just Dropped! ✨",
  "body": "…",
  "type": "new_arrivals",
  "target": "all",
  "uid": "…",
  "tcgFilter": "pokemon",
  "webhookId": "…",
  "whatnotUrl": "https://whatnot.com/live/…",
  "route": "mobros://product/some-handle",
  "product": { "id": "", "numericId": "", "handle": "", "title": "", "image": "", "price": "" }
}
```

:::warning Backend contract
`route` and `product` must be forwarded into the FCM `data` payload for deep
links to work. Dropping them silently breaks product-linked pushes with no
visible error on either side.
:::

Deep link format: `mobros://product/{handle}`, falling back to
`mobros://product/id/{numericId}` when there's no handle.

## Hit Feed

| Method | Path | Purpose |
| --- | --- | --- |
| `GET` | `/feed/admin/posts` | List posts |
| `GET` | `/feed/admin/posts/:id/comments` | Reports and comments for one post |
| `PATCH` | `/feed/admin/posts/:id/moderate` | Set moderation status |
| `DELETE` | `/feed/admin/posts/:id` | Soft-remove, with an optional reason in the body |
| `POST` | `/feed/admin/users/:uid/block` | Block a user from posting |

The server's returned `moderationStatus` wins over the requested one — closing a
since-re-reported post keeps it in the queue.

## Inventory & pricing

| Method | Path | Purpose |
| --- | --- | --- |
| `POST` | `/inventory/refresh-all` | Start a full catalog refresh. Returns a job ID. **409 means one is already running** — attach to it rather than erroring |
| `GET` | `/inventory/sync/:jobId` | Poll job status |
| `POST` | `/inventory/products/:externalId/refresh` | Refresh one product. A 404 means it's gone from Shopify |
| `GET` | `/inventory/external/sources` | Importable sources |
| `GET` | `/inventory/external?source=&q=&cursor=&limit=50` | Browse importable items |
| `GET` | `/tcg/search?q=&productLine=pokemon&size=25` | TCGPlayer product search |
| `POST` | `/tcg/details/batch` | Batch market prices. Chunk at 100 IDs per request; 429 means back off |
| `POST` | `/resolve/variants` | Hydrate a row's variants into ledger units |

## Rewards

| Method | Path | Purpose |
| --- | --- | --- |
| `GET` `PUT` | `/rewards/admin/config` | Program config. `version`, `updatedAt` and `updatedBy` are server-owned and stripped from a PUT body |
| `GET` | `/rewards/admin/user/:uid/balance` | Points and credit |
| `GET` | `/rewards/admin/user/:uid/history?limit=100` | Ledger |
| `GET` | `/rewards/admin/user/:uid/shopify-balance` | Store credit from Shopify |
| `POST` | `/rewards/admin/adjust` | `{ userId, points: ±N, reason }` |
| `POST` | `/rewards/admin/bonus` | Bonus points with a source |
| `POST` | `/rewards/admin/store-credit` | Credit |
| `POST` | `/rewards/admin/store-credit/debit` | Debit |
| `POST` | `/rewards/admin/tier` | Set or clear a tier floor |

## Shopify

| Method | Path | Purpose |
| --- | --- | --- |
| `GET` | `/shopify/products` | Catalog, used by the Feed Studio pickers |
| `GET` | `/shopify/products/search?q=&limit=` | Product search for notification attachments |
| `GET` | `/shopify/games` | Category labels |
| `GET` | `/shopify/bulk/schema` | Vendors, app categories, variant types, statuses for the create-product form |
| `POST` | `/admin/shopify/products` | Create and publish a product |

## Shows

`GET /shows` · `POST /shows` · `PATCH /shows/:id` · `DELETE /shows/:id` ·
`POST /shows/import`

## Shipping automation

`GET /admin/shipping-automation/config` · `PUT /admin/shipping-automation/config`

The PUT sends only the `freeShip` object.

## Ledger (Intake Processing and variant moves)

Wrapped by `services/ledger.api.js`:

`buyBatches` · `processingQueue` · `markProcessed` · `markProcessedBulk` ·
`resolveVariants` · `listShows` · `assignSku` · `adjustShopInventory` ·
`checkoutToShow` · `checkinFromShow` · `resolveDrift`

Every ledger write carries an idempotency event ID (`pp-adj-…`, `pp-xfer-out-…`,
`pp-xfer-in-…` plus a UUID) so a retried request can't double-apply.
