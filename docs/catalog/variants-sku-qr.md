---
title: Variants, SKUs & QR codes
sidebar_position: 2
description: The row expansion on Product Pricing — per-unit identity, stock by channel, and moving stock around.
---

# Variants, SKUs & QR codes

Expand any row in [Product Pricing](./product-pricing.md) with the chevron to
open the variant panel. This is where the old Inventory Ledger went: per-variant
identity, SKU and QR code, stock by channel, and moves between channels.

The panel header tells you what it found — either *None tracked in the ledger —
showing Shopify values only* or `3 of 5 tracked in the ledger`.

## Tracked vs untracked

A variant may or may not have a physical unit record behind it. Both are normal:

- **Tracked** — the ledger knows this unit. You get the SKU tools, the QR code,
  channel counts, and moves.
- **Not tracked** — you get Shopify's numbers and a `not tracked` badge. This is
  a normal state, not an error.

One more wrinkle: several variants can resolve to **one** physical unit — the
same sealed box sold as "Rip Live" and as "Shipped Sealed". The ledger treats
them as one pool.

## Per-variant row

Title (or `Default`), the selected options, the SKU chip, quantity, price,
channel chips, and three buttons.

### SKU

Prefers the ledger's SKU, falls back to Shopify's.

| State | What you get |
| --- | --- |
| No SKU | A **Generate SKU** button — *Compose a SKU from this card's set, number and condition* |
| Has a SKU | Click the chip to copy it; the pencil regenerates from current card details |

Confirmation reads `SKU generated: <sku> · pushed to Shopify`.

### QR code

The **Show QR code** button opens a panel with the code, the unit's internal ID,
and the full URL it encodes.

:::tip[Regenerating a SKU never invalidates a printed sticker]
The QR always encodes the **internal ID**, not the SKU. Reprint labels only when
a unit is new, never because you changed its SKU.
:::

Actions in the panel:

- **Copy link**
- **SVG** — downloads the code as a vector file
- **Print label** — opens a print-ready popup with the QR, the internal ID, the
  SKU and the card name. If nothing happens, your browser blocked the popup.

## Channels

Three kinds of channel show up as chips:

| Channel | What it means |
| --- | --- |
| **Warehouse** | Unlisted stock on hand. Always present, even at zero — it's the default home |
| *(a shop name)* | Listed on that storefront. One chip per active listing |
| **Trade show** *(or the show's name)* | Checked out to a show |

## Moving stock

Pick **From**, **To**, a **Qty** and a **Reason**, then **Move**. The panel
writes a plain-English preview of what will happen before you commit:

| Move | Preview |
| --- | --- |
| Warehouse → a shop | *Adds 3 to MoBros on Shopify.* |
| A shop → Warehouse | *Removes 3 from MoBros on Shopify.* |
| Shop → shop | *Moves 3 from A to B — two inventory writes, one per shop's own token.* |
| Anything → a show | *Checks this unit out to `{show}` and de-lists it from every shop.* |
| A show → anywhere | *Checks the show back in — every unit at `{show}` returns to the warehouse.* |

Show moves are whole-unit operations, so the **Qty** box disables and reads
`all`.

Errors you might hit: *Pick two different channels.*, *Quantity must be at least
1.*, *Only N available in `{channel}`.*, *This unit is already checked out to a
show.*

:::danger[Shop-to-shop transfers are not atomic]
Each leg runs against its own shop's credentials. If the second leg fails you'll
see: *Removed 3 from A, but adding to B failed: `{reason}`. Re-add 3 there
manually.* You have to finish the move by hand.
:::

:::warning[Check-in is show-wide]
There's no per-unit check-in. Checking one unit back in from a show returns
**every unit at that show** to the warehouse. The confirmation says so — read
it.
:::

### Multi-format pools

When one physical unit is sold under several formats, a move enforces the
resulting quantity across all of them at once. Without that, Shopify would
happily oversell the pool through a sibling format.

## Drift

If Shopify and the ledger disagree on stock for a listing, a banner appears:

> Shopify and the ledger disagree on stock for this listing

…showing `ledger <expected> · Shopify <actual>` per shop, with two buttons:
**Accept Shopify** (take Shopify's number as truth) and **Enforce ledger** (push
the ledger's number back to Shopify).

Pick based on which side you trust for that listing. If someone just sold one at
the counter without recording it, Shopify is right. If a sync glitched,
the ledger is.
