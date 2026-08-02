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

In-store / active sell session tracking.

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

### `settings/{docId}`

App-wide singletons. **Each document is effectively its own type — don't infer
one from another.**

| Document | Contents |
| --- | --- |
| `accessMatrix` | `{ roles: { isGM: [...tabKeys] } }` — role → tab overrides |
| `buyRatesV2` | Buy rate categories, each `{ base, max }` as fractions |
| `conditionMultipliers` | Per-category condition ladders, as fractions |
| `feed` | The whole Feed Studio config — spotlight, rails, boost, pins, hides |
| `sellRequestAutomations` | Acknowledgment copy, SLA thresholds, customer timeouts |
| `home` | Main stream channel state |
| `streamSports` | Sports stream channel state |
| `streamCardHouse` | Card House stream channel state |

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
