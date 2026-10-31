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

:::note[Two servers, two base URLs]
Most of this page is the main Express backend (`VITE_API_URL`). The
[MCP server](#the-mcp-server) is a separate Heroku app on its own base URL
(`VITE_MCP_URL`) with its own error envelope. Both accept the same Firebase ID
token.
:::

Route groups that have been migrated to `requireTab` are guarded by the role →
tab matrix rather than by `verifyAdmin`; see
[Access control → Backend guards](./access-control.md#backend-guards).

## Access

| Method | Path | Purpose |
| --- | --- | --- |
| `GET` | `/whoami` | The server's own view of the caller's roles, resolved tabs and matrix source |
| `GET` | `/whoami?tab=notifications` | …plus a yes/no on one tab |
| `GET` | `/whoami?uid=<uid>` | Another user. **Admin only** |

Read `matrix.source` first — `"defaults"` means the process hasn't loaded
`settings/accessMatrix`, so grants made in the Roles & Access grid are invisible
to it.

## Billing & entitlements

| Method | Path | Purpose |
| --- | --- | --- |
| `GET` | `/billing/features` | The entitlement map — `{ featureKey: paid }`. Read on every mount of a gated screen |
| `GET` | `/billing/catalog` | Full catalog with prices, paid/trial state, and the outstanding total |
| `POST` | `/billing/override` | Owner-only. Start/end a trial, or mark a feature paid |
| `POST` | `/billing/checkout` | Creates a Stripe checkout session for the selected features |

## App stores

Mounted at `/admin/app-stores` behind `requireTab("analytics")` — the same gate
as the Shopify analytics on the same page. Read-only; no response ever contains a
credential.

| Method | Path | Purpose |
| --- | --- | --- |
| `GET` | `/admin/app-stores/metrics?store=apple\|google&days=1..365&include_daily&fresh` | Shaped for the dashboard zone |
| `GET` | `/admin/app-stores/reviews?store=&max_rating=&min_rating=&unreplied_only=&limit=1..200&fresh` | Reviews |
| `GET` | `/admin/app-stores/provider/metrics?store=&days=&fresh` | Raw per-store reports, for the MCP server |
| `GET` | `/admin/app-stores/provider/reviews?store=&unreplied_only=&max_rating=&fresh` | Raw per-store reviews |
| `GET` | `/admin/app-stores/diagnose` | For *"the store shows numbers and we show none"* |

:::warning[Branch on `reason`, never on the message]
A failure the service understands returns
`error: { type: "app_stores", message, reason, retryable, details }` with
`reason` one of `not_configured`, `reports_pending`, `no_data`, `unavailable` —
or `null` for an upstream Apple/Google failure.

Both callers fall back to the MCP server's own adapter when this server can't
answer (unreachable, a 5xx that isn't type `app_stores`, or reason
`not_configured`), so those three meanings have to stay stable.
:::

## Welcome gift

| Method | Path | Purpose |
| --- | --- | --- |
| `GET` | `/shopify/welcome-gift` | Is the offer on, can this visitor claim it, which gifts. Public; richer with a token |
| `GET` | `/admin/welcome-gift` | The dashboard card: config, state, issues, collection, gifts, claimed |
| `PUT` | `/admin/welcome-gift` | Body `{ enabled: boolean }`. Returns the same shape |

The admin pair accepts the `giveaways` **or** `promotions` tab, so the same
switch works from the Dashboard and from Promotions settings. The gift itself is
claimed through `POST /shopify/checkout` by flagging a line with `gift: true`,
not by a dedicated endpoint.

## Promo modals and Home tabs

| Method | Path | Purpose |
| --- | --- | --- |
| `GET` | `/promos/active?platform=web\|ios\|android` | Settings and the modals this visitor qualifies for. Optional auth; signed-in customers are filtered by the server, guests track frequency locally. Returns no modals while `settings/promos.enabled` is off |
| `POST` | `/promos/:id/events` | `{ type: 'seen' \| 'dismissed' \| 'clicked', eventId?, platform }`. Bumps the modal's stats |
| `POST` | `/promos/:id/claim` | Auth required. Issues the code (Shopify `discountCodeBasicCreate`, single use) or awards the points. Idempotent per period. `403 not_eligible`, `409 no_claimable_offer` |
| `POST` | `/home-tabs/sync` | `feed-studio` tab. Re-reads every collection-sourced Home tab from Shopify and writes its products |

`POST /shopify/checkout` attaches the newest unexpired code a signed-in customer
claimed, unless it doesn't stack with a welcome gift in the cart. The
`orders/create` webhook marks claims redeemed and queues `purchase_completed`.
Full contract: `backend/BANNERS_PROMOS_CONTRACT.md`.

## Bags

Staff routes sit behind `requireTab("bags")`. Errors are `{ ok: false, error, issue? }`.

| Method | Path | Purpose |
| --- | --- | --- |
| `PUT` | `/admin/bags/launch` | Sets `bagSettings/global.launch.mode` to `off` or `dev`; `live` needs the Admin role |
| `POST` | `/admin/bags/tiers` | `{ game, level, price, poolMax, themeId \| themeName }`. Draft tier, private seed, and its Shopify bag product on the headless channel only |
| `PATCH` | `/admin/bags/tiers/:tierId` | Any of `price`, `poolMax`, `floorValue`, `targetAvgPct`, `driftPct`, `creditPct` (null clears), `autoPause`. Price goes to Shopify first |
| `POST` | `/admin/bags/tiers/:tierId/status` | `{ status: 'live' \| 'paused' }`. `409 { issue: 'out_of_band' \| 'no_product' }` |
| `GET` | `/admin/bags/tiers/:tierId/candidates?min&max&q` | Graded ledger units listed in Shopify, not sold, not at a show, not in a pool |
| `POST` | `/admin/bags/tiers/:tierId/slabs` | `{ action: 'add' \| 'remove', internalIds }`, up to 100. Adding unpublishes the product from every channel; removing republishes where it was |
| `POST` | `/admin/bags/pulls/:pullId/resolve` | Admin only. `{ outcome: 'credited' \| 'ship' }` for a sell-back Shopify didn't confirm. Moves no money |
| `POST` | `/admin/bags/sweep` | Admin only. Runs the sweep now |
| `POST` | `/bags/pulls/:pullId/decision` | Customer, `verifyToken`. `{ choice: 'ship' \| 'credit' }`; the caller must own the pull |
| `POST` | `/bags/cron/sweep` | `X-Cron-Secret: BAGS_CRON_SECRET` |

`POST /shopify/checkout` refuses a cart holding a bag variant with
`403 BAGS_CLOSED` and a `reason`: `off`, `sign_in_required` and `not_live` from
the launch switch, then `tier_closed` (the tier isn't live), `id_required` (not
ID-verified; the Bags team is exempt in dev) and `daily_limit` (over
`bagSettings/global.dailySpendLimit`, $500 by default, over a rolling 24 hours).
A bag cart carries the buyer's uid as the hidden `_mb_bag_uid` attribute.

**The draw.** The `orders/paid` webhook writes `bagOrders/{orderId}` *before*
it acks (a failed write answers 500 so Shopify retries), then draws each bag
line in one transaction: `HMAC-SHA256(seed, "orderId:lineItemId:n") mod count`
over the drawable slab ids sorted, slab to `reserved`, pull to `pending` with a
`decideBy`. Pull ids are `orderId_lineItemId_n`, so retries are no-ops.

**Store credit** claims the pull (`crediting`), calls Shopify, then records it
and puts the slab back in the pool. Only an error proving the credit never ran
(a Shopify userError, a GraphQL error, a 4xx) returns the pull to `pending`. A
timeout or 5xx might have landed, so the pull stays `crediting` with
`needsReview` and admins get a push; it is never paid again automatically. An
admin resolves it with `/admin/bags/pulls/:pullId/resolve`. Shipping isn't
refunded. Pulls don't carry the slab's cost (customers can read their own
pulls); the dashboard reads cost from the staff-only slab docs.

**Inventory.** The bag variant's Shopify quantity is set outright only when a
tier goes live, pauses, or after a cancel or refund. Every other change (slab
added or removed, sold back, settings) moves it by the change in drawable
slabs, so a sale landing in between is never written over. A failed write is
kept on the tier and the sweep retries it.

**Cancels and refunds.** `orders/cancelled` voids every pull on the order;
`refunds/create` voids as many pulls on a refunded bag line as were refunded.
A voided pull's slab goes back in the pool. A pull already sold back for credit
or being packed is flagged for a person instead.

**Ledger.** A pooled slab's ledger unit carries `bagHold: { tierId }`. Each
draw checks the drawn unit is still `listed`; one sold or at a show is held out
of the draw (`out_of_draw`, `outReason: not_on_sale`) and the bag drawn again.

**The sweep** runs every minute on one dyno (lease in `bagJobs/sweep`): draws
orders still `received`, ships pending pulls past `decideBy`, adds shipped
slabs to decided orders with an order edit (100% off, no email, skipping
slabs already on the order), flags stuck credits, and rotates seeds older than
a day into the tier's public `pastSeeds`.

## Marketing Suite

All under `/admin/marketing`, behind `verifyToken`, `requireTab("marketing")`
and `requirePaid("feat_marketingSuite")`. Without the entitlement every route
answers `402`.

| Method | Path | Purpose |
| --- | --- | --- |
| `GET` | `/meta` | Channel and stage registry |
| `POST` | `/items` | Create an item |
| `PATCH` | `/items/:id` | Update fields or move stage. Scheduled needs an Admin or GM approver |
| `DELETE` | `/items/:id` | Archive (and mark the Shopify activity deleted) |
| `POST` | `/items/:id/posted` | Mark a manual post or send as posted |
| `POST` | `/items/:id/sync` | Retry the Shopify Marketing sync |
| `GET` | `/anchors` | Shows, giveaways, set releases and manual anchors |
| `POST` `PATCH` `DELETE` | `/anchors(/:id)` | Manual anchors |
| `GET` | `/attribution` | Orders and revenue per item and campaign |
| `GET` `PUT` | `/budget/:month` | Planned vs booked vs actual, with pacing |
| `POST` | `/actuals/preview`, `/actuals/import` | CSV import, dry run first |

A go-time sweep runs every 60 seconds on one dyno at a time. Full contract:
`backend/MARKETING_SUITE.md`.

## Sessions (forced sign-out)

| Method | Path | Purpose |
| --- | --- | --- |
| `GET` | `/admin/sessions` | Cutoffs per scope, account counts, recent runs |
| `POST` | `/admin/sessions/sign-out` | `{ scope: 'everyone' \| 'customers' \| 'staff', disconnectClaude }`. Admin role only. Stamps `settings/sessionCutoff`, then revokes refresh tokens in the background |

Every API request checks the caller's sign-in time against the cutoff for their
account, and the app, mobrostc.app and the dashboard sign themselves out on a
listener. The rule lives in `backend/lib/session-cutoff.js` and is mirrored in
the mobile app, mobrostc.app, the dashboard and the MCP server.

## Live Activities

| Method | Path | Purpose |
| --- | --- | --- |
| `POST` | `/live-activities/tokens` | Signed in. The app registers its push-to-start and update tokens |

The server watches the three stream channel docs and starts, updates and ends
the iOS **On Air** activity itself. It stays off until `LIVE_ACTIVITIES_ENABLED`
is set. Details: `backend/LIVE_ACTIVITIES.md`.

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
| `POST` | `/notifications/admin/live-break` | Go-live for the main channel, kept for its audit logging. Body `{ id, title, tiktokUrl, whatnotUrl, thumbnailUrl }` |
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

:::warning[Backend contract]
`route` and `product` must be forwarded into the FCM `data` payload for deep
links to work. Dropping them silently breaks product-linked pushes with no
visible error on either side.
:::

Deep link format: `mobros://product/{handle}`, falling back to
`mobros://product/id/{numericId}` when there's no handle.

`whatnotUrl` is validated the same way on every path that forwards it to a
device (`/notify/manual` and `/notifications/admin/live-break`): only
`whatnot.com` or a subdomain is accepted, a missing scheme is filled in as
`https://`, and anything else is a `400` — *whatnotUrl must be a valid
whatnot.com link*.

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
| `POST` | `/rewards/admin/store-credit` | Credit. Sends the customer a "Store credit added" push |
| `POST` | `/rewards/admin/store-credit/debit` | Debit |
| `GET` | `/store-credit/balance` | The customer's own wallets: `balance` (Shopify store credit, live with a mirror fallback, `balanceSource` says which), `tradeBalance` (counter trade-in credit), and one merged `ledger`. Never summed |
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

## The MCP server

A **separate Heroku app** on its own base URL (`VITE_MCP_URL`, which also
includes `/api`). It accepts either an MCP OAuth access token or an admin's
Firebase ID token; scope checks happen inside each tool's own wrapper on the
server, not in the client.

| Method | Path | Purpose |
| --- | --- | --- |
| `GET` | `/tools` | The tool catalog |
| `POST` | `/tools/:name` | Run one tool. Body is the tool's input |
| `POST` | `/brain/ask` | Natural-language question → routed tool calls |
| `GET` | `/brain/capabilities` | The canonical capability map |
| `GET` | `/integrations` | Per-provider credential status. **Never returns a secret** |
| `PUT` | `/integrations/:provider` | Upload credentials. Body `{ fields }` |
| `POST` | `/integrations/:provider/test` | Test the connection for real |
| `DELETE` | `/integrations/:provider` | Remove the uploaded credentials |
| `GET` | `/access` | Everyone on the Claude Access list, plus the area catalog |
| `GET` | `/access/candidates?q=` | Accounts that can be added |
| `PUT` | `/access/:uid` | `{ active, scopes? }`. Omitting `scopes` means every admin scope |
| `POST` | `/access/:uid/disconnect` | End that person's live Claude connections |
| `DELETE` | `/access/:uid` | Remove them (the doc stays, `active: false`) and end their connections |

### The tool envelope

Every tool returns one of three shapes:

```json
{ "status": "success", "data": {} }
{ "status": "confirmation_required", "confirmation_token": "…", "preview": {} }
{ "status": "error", "error": { "code": "", "message": "", "details": {}, "retryable": false } }
```

:::caution[The Brain page reads a bundled copy, not this endpoint]
`src/data/brainAreas.js` in the dashboard is **generated** from the MCP server's
`src/brain/capabilities.js` by `mobros_mcp/scripts/generate-brain-areas.js`, and
that bundled copy is what the Brain page currently draws. Regenerate it when the
server's areas or endpoints change — hand-editing it, or changing the server
without regenerating, drifts the map away from the router that has to answer it.
:::

The client's `callTool` unwraps success to `data` and throws otherwise, so
callers get the tool's own error code rather than an axios status.
`INSUFFICIENT_SCOPE` and `NOT_IMPLEMENTED` are the two a UI usually wants to
handle separately.

:::warning[Read tools never return `confirmation_required`; write tools do]
A write tool returns a preview and a confirmation token instead of performing the
write. Use `callToolRaw` and branch on `status` yourself — `callTool` will throw
on anything that isn't success. Nothing on the Brain page auto-runs a
confirmation-gated tool.
:::

### Access

Two gates, both required:

- The dashboard's `settings-integrations` tab — a UID allowlist.
- An active `mcpAdmins/{uid}` document on the MCP server.

Uploaded credentials are encrypted at rest under `MCP_CREDENTIALS_KEY`. Without
that key set, the server refuses uploads and the Integrations page disables its
Upload buttons.

`/access` is gated on the caller's own `mcpAdmins` doc: it must be active and
hold `admin:access:read` (GET) or `admin:access:write` (the rest). Requests made
with an MCP OAuth token are refused, so nothing said to Claude can add or remove
people. You can't deactivate yourself or remove your own access management, and
a change that would leave nobody able to manage access is refused. The
dashboard screen is [Claude Access](../administration/claude-access.md).

Approving prices needs more than an `mcpAdmins` doc: the approver-only write
tools also check the `pricing-approve` grant in the access matrix
(`src/auth/pricing-permission.js`).
