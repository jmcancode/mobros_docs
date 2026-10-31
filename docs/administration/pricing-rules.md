---
title: Pricing Rules
sidebar_position: 2
description: The markup over market applied to each item type, the rounding, the margin floor and the spread between variants.
---

# Settings → Pricing Rules

> Markup over market
>
> The store price is the market price plus this markup, then rounded. Changes
> save when you leave a field.

One screen decides what the shop charges over market. The pricing tools read
this, so a change here changes what every price check and bulk reprice considers
correct.

## Markup by item type

Five types, each with its own percentage and a worked example on the right
(`$100 market → $135`):

| Type | What's in it | Shipped default |
| --- | --- | --- |
| **Games** | Pack Sacks, Banger Bags, Hunters Hoard, breaks | 35% |
| **Slabs** | PSA, BGS, CGC, SGC graded cards | 10% |
| **Sealed** | Packs, boxes, ETBs, bundles, tins | 5% |
| **Singles** | Raw single cards | 20% |
| **Accessories** | Sleeves, binders, deck boxes, supplies | *(uses the default)* |
| **Default** | Anything without its own markup | 30% |

Leave a type **blank** and it falls back to the default — the row then reads
*Uses default* next to its description. Clearing a row is how you un-set it;
there's no separate delete.

Valid range is **0 to 300%**. Anything outside it shows *0 to 300%* under the
field and is **not written**.

## Rounding

Four options, applied after the markup: **To the cent**, **Nearest .99**,
**Nearest .50**, **Nearest dollar**. The examples beside each item type update to
match, so you can see the result rather than imagining it.

Rounding is to the *nearest*, not forced up — `Nearest .99` on a $100.40 result
gives $99.99, not $100.99.

## Minimum margin

*Where cost is known, never price under this margin.* **35%** by default.
Leave it blank to use the default; **0** means only "never under cost". Capped
at 95%.

The example beside it shows the floor for $100 of cost (35%: never under
$153.85). Cost isn't recorded on everything, so this is a floor where it can be
applied, not a guarantee across the catalog. Where there is no cost, the floor
is the market price instead, so a negative spread can't price a variant under
what it sells for elsewhere. A single product can carry its own minimum from
[Reprice](../catalog/reprice.md).

## Variant spread

How far apart the ways of selling one product sit. Each option gets a percent
and a dollar amount, applied to the base price (market plus markup) of every
variant with that option:

| Option | Typical use |
| --- | --- |
| **Rip Live** | Opened on stream |
| **Shipped Sealed** | Shipped unopened, so it can carry shipping |

**Rip Live** and **Shipped Sealed** are always listed; any other option that has
a spread saved is listed too. Use a negative number to sit below the base. Blank
both fields to remove an option's spread. The example shows what $100 of base
becomes.

A product can carry its own spread, and a single variant its own markup, from
[Reprice](../catalog/reprice.md). A variant with its own markup gets no spread.

## Saving

:::note[There is no Save button]
Every field saves when you leave it — click away, or press **Enter**. The row
shows **Saving**, then **Saved**, then settles. **Escape** abandons what you
typed and puts the stored value back.
:::

Each field writes on its own, so saving one row can't overwrite a row someone
else just saved. If a save fails the row reads **Not saved** and keeps your
value on screen — the stored number is unchanged.

Until the first change there's nothing stored at all, and the screen says so:
*No rules are saved yet, so these defaults apply until the first change.*

## The price check

> Reprice compares every variant's store price to market with these rules and
> queues what is off by more than 3% for approval. It runs when someone starts a
> scrub from the Reprice view; a schedule waits until agents are approved.

The full formula, with a worked example, is on [Reprice](../catalog/reprice.md#how-a-price-is-worked-out).

## Who sees it

Granted by the role matrix like any other tab — Admin, GM and Shop Manager have
it by default. Unlike [Integrations](./integrations.md) and
[Roles & Access](./roles-and-access.md), it is **not** account-allowlisted.

## Related

- [Buy Rates](../catalog/buy-rates.md) — what the shop pays *in*, the other half
  of the spread
- [Reprice](../catalog/reprice.md) — the queue these rules fill, and each item's
  own markup
- [Product Pricing](../catalog/product-pricing.md) — the inventory grid
- [Professor Oak](../operations/professor-oak.md) — the tools that read these
  rules
