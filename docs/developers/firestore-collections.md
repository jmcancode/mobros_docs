---
title: Firestore collections
sidebar_position: 1
description: The data model — collections, subcollections, ordering fields and invariants.
---

# Firestore collections

:::tip[Schema lives in the writers]
There is no schema file. For any collection, open the code that writes to it and
read the object passed to `setDoc` / `updateDoc` / `addDoc`. That's the field
set, and it's the only thing that's authoritative.
:::

## Top-level collections

### `users/{uid}`

Customer and staff accounts. The document ID is the Firebase Auth UID.

Holds the `roles` map (thirteen booleans), profile fields, notification
preferences, favorite categories, ID verification state, device info, and a
`rewards` block.

**Written by:** `pages/CustomerDetail.jsx`
**Read by:** `context/AuthContext.js` (live subscription on the signed-in
user's roles), `pages/Login.jsx`, `hooks/useAssignableEmployees.js`

**Subcollection:** `pointsLedger`

### `users/{uid}/pointsLedger/{entryId}`

Per-user rewards ledger. Point deltas, source, description, `createdAt`.

Read per-user on Customer Detail, and via a **collection-group query** on
Customers for the program-wide activity rollup. That cross-user scan needs a
composite index — if the rollup errors, the console carries the link to create
it.

### `customerTickets/{ticketId}`

Support tickets. Ordered `createdAt desc`.

**Subcollection:** `messages`

### `sellSubmissions/{submissionId}`

Single-card sell-to-us requests. Ordered `createdAt desc`.

Status writes also set `lastStatusAt` and `statusHistory.{status}`, and **delete**
`slaWarnedAt`, `slaBreachedAt` and `timeoutRemindedAt` — that's what restarts the
SLA clock and re-arms the customer reminder.

A paid request also carries a `payment` map —
`{ amount, method, paidAt, reference, recordedBy }` — written identically by all
three sell queues so payouts stay aggregatable. On submissions and uploads
`recordedBy` is client-asserted (same trust model as `cancelledBy`); home visits
go through the backend, which ignores it and re-derives identity from the
verified token.

**Subcollection:** `messages`

### `collectionUploads/{uploadId}`

Spreadsheet and link collection submissions. Ordered `createdAt desc`. Same SLA
field pattern as `sellSubmissions`.

**Subcollection:** `messages`

### `homeVisitRequests/{id}`

In-person pickup requests. Status changes go through the backend (because each
one pushes the customer); **assignment is written directly from the client**
because no REST endpoint exists for it.

### `sellSessions/{sessionId}`

In-store / active sell session tracking, and the **parent** of a batch of item
submissions. Tracking lives here, not on the items: the customer accepts the
offer and ships the whole list at once, so `status`, `trackingNumber` and
`shippedAt` are session-level fields the Sell Requests page reads back per
customer group.

### `giveaways/{giveawayId}`

Promotional giveaways. Ordered `endsAt desc` — a malformed `endsAt` sorts oddly.

### `games/{gameId}`

Break and repack game definitions. Ordered `updatedAt desc`.

**Subcollections:** `prizes`, `spots`

- `games/{id}/prizes/{prizeId}` — carries `inventoryLineId`, a foreign key into
  `inventoryLines`. Created and deleted **transactionally** with the inventory
  mutation. Preserve that atomicity.
- `games/{id}/spots/{spotId}` — sold spots.

### `gameOutcomes/{gameId}`

A snapshot written on completion, before any destructive game operation, so
reporting survives if the game and its prizes are later deleted. Document ID
matches the originating game.

### `inventoryLines/{lineId}`

The rows behind [Product Pricing](../catalog/product-pricing.md). Quantity,
cost, market price, sell-price override, date, style, set, source, notes, plus a
`variants[]` array mirrored from Shopify.

Reservation and consumption state is mutated transactionally alongside game
prize operations.

### `inventoryUnits/{internalId}`

The authoritative physical unit records — SKU, QR code, cost basis, ask price,
per-channel counts, show assignment.

:::warning[Admin-locked]
Security rules restrict this collection to admins. The staff who actually work
these units (Front of House, Back of House) aren't admins, so **client-side
reads return nothing**. Everything touching `inventoryUnits` goes through the
backend ledger service, which uses the Admin SDK behind a staff-wide role guard.

This is why [Intake Processing](../operations/intake-processing.md) polls
instead of subscribing.
:::

Reached from a variant GID through the `variantIndex` collection.

### `products/{productId}`

Shopify product cache and mirror.

### `restockRequests/{id}`

Out-of-stock products with waiting customers. Carries `subscriberCount`,
maintained by the backend from a `subscribers` subcollection. Deleted directly
from the client by the Dashboard's remove button.

### `chargebackReports/{id}`

Generated dispute evidence. Ordered `generatedAt desc`.

### `syncJobs/{jobId}`

Shopify sync job status. **`syncJobs/latest`** is a singleton pointer to the
most recent job, written by both the backend cron and the manual **Sync now**
button. Per-job documents are subscribed by ID while a sync runs.

### `brainLayouts/{uid}`

One document per operator: their [Professor Oak](../operations/professor-oak.md)
map — card order, which cards are switched off, cards they built themselves.
Owner-read, owner-write.

Stores **ids and endpoint names only**, never a copy of the capability map — the
MCP server stays canonical and this document is a view over it. Normalization
happens on read, so a stale layout referencing a tool that no longer exists
degrades rather than breaking.

Writes are debounced: dragging a card fires a move on every frame the pointer
crosses a boundary, and only the layout the operator stopped on should reach
Firestore. Every path also flushes on unmount.

### `welcomeGifts/{uid}`

One record per customer: their welcome-gift code and whether it's been redeemed.
**Backend-only** — locked to `if false` in the rules. Clients read
`GET /api/shopify/welcome-gift` instead.

### `mcpCredentials/{provider}`

The MCP server's encrypted provider credentials, written from
[Settings → Integrations](../administration/integrations.md). **Secret** —
`if false` for every client; MCP Admin SDK only. Values are encrypted at rest
under `MCP_CREDENTIALS_KEY` and never read back out, only replaced.

### `mcpAdmins/{uid}`

Who the **MCP server** considers an admin. Entirely separate from the dashboard's
`roles` map and from the role → tab matrix: a staff member with every dashboard
tab is still a plain customer to the MCP server unless they have an active
document here.

### `settings/{docId}`

App-wide singletons. **Each document is effectively its own type — don't infer
one from another.**

| Document | Contents |
| --- | --- |
| `accessMatrix` | `{ roles: { isGM: [...tabKeys] }, savedKeys }`: role → tab overrides. `savedKeys` lists the tab keys the grid showed at save time; a key missing from it takes the role's default (see [Access control](./access-control.md)) |
| `buyRatesV2` | Buy rate categories, each `{ base, max }` as fractions |
| `conditionMultipliers` | Per-category condition ladders, as fractions |
| `feed` | The whole Feed Studio config — spotlight, rails, boost, pins, hides |
| `sellRequestAutomations` | Acknowledgment copy, SLA thresholds, customer timeouts |
| `markupRules` | `{ rules: { [itemType]: pct }, default, roundTo, minMarginPct, variantAdjustments: { [option]: { pct, flat } }, updatedAt, updatedBy }`. `minMarginPct` missing means 35. See [Pricing Rules](../administration/pricing-rules.md) |
| `repriceScrub` | `{ runId, at }`: the one-scrub-at-a-time lock. MCP server only |
| `welcomeGift` | The Welcome Gift promo: `enabled`, `giftCollectionHandle`, `newAccountWindowHours`, `accountsCreatedAfter` |
| `homeTabs` | Home tabs for the app and mobrostc.app, edited in Feed Studio. Per tab: optional `banner` (photo or video) and, for collection tabs, `content.source { kind: 'collection', handle, syncedAt, count }`. Top level: `bannerVideoAutoplay`. The backend writes `productIds` for collection tabs every 15 minutes |
| `bagsLayout` | How the app's Bags tab is arranged (Feed Studio → Bags). Readable by the Bags team, and by customers once Bags is live |
| `promos` | Promo modal master switch and session rules: `enabled` (missing = off), `maxPerSession`, `quietSeconds`, `skipPaths`, `skipScreens`, `timeZone`, `codePrefix` |
| `sessionCutoff` | `{ everyone, customers, staff }`: forced sign-out cutoffs. A session whose sign-in time is before the cutoff for that account is stale. Backend only, so every sign-out is logged and revokes tokens |
| `home` | Main stream channel state |
| `streamSports` | Sports stream channel state |
| `streamCardHouse` | Card House stream channel state |

`markupRules` is written with **dotted-path updates** (`rules.slabs`), so saving
one item type can't overwrite another someone else just saved. The first save
creates the document with every default filled in, so the stored rules are never
half a set. Percentages are stored as percentages — `35` means 35%, same as the
MCP server expects.

The stream state documents now carry a `whatnotUrl` alongside `tiktokUrl`; ending
a break clears both. See [Live breaks](../content/live-breaks.md).

### Bags

| Collection | Contents | Client access |
| --- | --- | --- |
| `bagSettings/global` | `launch.mode`: `off` (default, also when missing), `dev` or `live`; plus `creditPct`, `decisionWindowHours`, `dailySpendLimit`, `shippingRate` | Read by any signed-in user |
| `bagThemes/{themeId}` | A bag line: name, game, art, sort order | Bags team; everyone signed in once live |
| `bagTiers/{tierId}` | A priced tier and its template | Bags team; customers see `live` and `paused` tiers once live |
| `bagTiers/{tierId}/slabs/{slabId}` | The slabs loaded into a tier | Bags team only |
| `bagPulls/{pullId}` | One rip: who, which slab, the customer's choice (`pending`, `ship`, `credit`), ship status and credit amount | Bags team, and the owner (`uid`) |

Server only, no client access at all: `bagTiers/{tierId}/private/seed` (the
live draw seed; the tier shows only its sha256 until it's retired into
`pastSeeds`), `bagSlabIndex/{internalId}` (which pool a ledger unit is in),
`bagOrders/{orderId}` (one per paid order holding bags: `received`, `drawn`,
`short`, `finalized`) and `bagJobs/sweep` (the sweep lease).

All writes go through the backend. "Bags team" is the `bags` tab in the access
matrix. See [Bags](../community/bags.md).

### Promo modals

| Collection | Contents | Client access |
| --- | --- | --- |
| `promoModals/{id}` | One modal: preset, event, conditions, schedule, content, offer, frequency, `stats { seen, dismissed, clicked, claimed }` | Read and write for the `promotions` tab |
| `promoState/{uid}` | Per customer: what they've seen this period, and queued server events (`purchase_completed`, `tier_upgraded`) | None |
| `promoClaims/{uid}_{modalId}_{periodKey}` | An issued code or points award, and whether it was redeemed | None |

Customers never read these directly. They get matching modals from
`GET /api/promos/active`. The full contract is `backend/BANNERS_PROMOS_CONTRACT.md`.

### Marketing Suite

| Collection | Contents |
| --- | --- |
| `marketingItems/{id}` | One post, ad flight or send: channel, stage, dates, assets, UTM, budget, assignee, approval, publish and Shopify sync status. Readable by the `marketing` tab |
| `scheduledPosts/{id}` | Instagram posts queued for the MCP server's publisher |
| `marketingBudgets/{YYYY-MM}` | Planned dollars per channel |
| `marketingActuals/{rowId}` | One row per channel, day and campaign from a CSV import |
| `marketingImports/{id}`, `marketingJobs/{id}` | Import dry runs and the go-time sweep's lease |
| `marketingAnchors/{id}` | Manual set releases, pre-order windows and events |

Everything but `marketingItems` is server only. The full contract is
`backend/MARKETING_SUITE.md`.

### Repricing (MCP server)

| Collection | Contents |
| --- | --- |
| `pricingRules/{productNumber}` | Per product: `markupPct`, `minMarginPct`, `variantAdjustments`, `variants { [variantNumber]: { markupPct, locked } }`, `locked`. Change log in `pricingRules/{id}/changes` |
| `repriceRuns/{runId}` | A scrub run, with the claiming `workerId` and heartbeat |
| `repriceRuns/{runId}/rows/{variantNumber}` | The reprice queue for that run. Each row has `state` (`ready` or `check`), `checkCode` (`unconfirmed`, `disagree`, `one_source`, `link_changed`), `checkReason`, the `evidence` the write path re-checks against the live Shopify price, the `link` it was priced on (a different link at write time holds the row), and what each source `matches` |
| `marketLinks/{productNumber}` | Which TCGplayer product a Shopify product is: `status` (`linked`, `ambiguous`, `no_match`, `none`), `method` (`search` or `manual`), `tcgplayer { productId, productName, setName, number, productLineName }`, up to 5 `candidates`, the `title` it was decided on. Change log in `marketLinks/{id}/changes`. MCP server only |
| `priceChanges/{id}` | Every price the queue, a bulk update or a single update wrote; `via` names the tool |

All written by the MCP server with the Admin SDK. No client reads them directly.

### Sessions and Live Activities

| Collection | Contents |
| --- | --- |
| `sessionSignOuts/{runId}` | One forced sign-out: scope, who ran it, progress, revoked / skipped / failed counts, Claude connections cut |
| `liveActivityDevices/{tokenHash}` | An iPhone's push-to-start token for the **On Air** Live Activity |
| `liveActivitySessions/{channel_liveStartedAtMs}` | One live run per channel, with `tokens/{tokenHash}` for each running activity |

All server only.

### `shippingAutomationConfig/config`

The free-shipping rule: enabled, day start hour, timezone, eligible channels,
and the refund switch.

### `appLayout/{screen}` + `appLayout/{screen}/sections/{sectionId}`

Configurable layout for app screens. Screen names are the parent document IDs;
sections are ordered children.

### `serverSecrets/integrations`

Integration API keys. **No security rule matches this path**, so the default-deny
posture locks it to the Admin SDK. Don't add a rule for it.

## Ordering fields that need indexes

| Collection | Order |
| --- | --- |
| `customerTickets`, `sellSubmissions`, `collectionUploads` | `createdAt desc` |
| `games` | `updatedAt desc` |
| `giveaways` | `endsAt desc` |
| `chargebackReports` | `generatedAt desc` |
| `pointsLedger` (collection group) | `createdAt desc` with a range filter |

## Cross-collection invariants

- `games/*/prizes.inventoryLineId` → `inventoryLines/{id}`, mutated
  transactionally. Adding a prize decrements the line; removing one or deleting
  the game returns the unawarded quantity.
- `gameOutcomes/{gameId}` is written **before** destructive game operations.
- A variant GID resolves to an `inventoryUnits` record through `variantIndex`.
  The mapping is deliberately not one-to-one — several variants can share one
  physical pool.

## Rules note

The access matrix read is currently the one gap worth knowing about. Under the
hardened ruleset, letting the dashboard read saved overrides needs an `isStaff()`
helper and one line in the `settings` match block:

```
allow get: if docId == 'accessMatrix' && isStaff();
```

Until that ships, overrides simply aren't read back and the code defaults apply
— which fails closed, so nothing breaks.
