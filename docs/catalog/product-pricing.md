---
title: Product Pricing
sidebar_position: 1
description: The inventory grid and margin engine — target margins, health grades, sync, import and export.
---

# Product Inventory & Pricing

The spreadsheet. Every inventory line in one grid, with a live margin engine on
top.

> Set a target gross margin. The dashboard tells you the sell price required per
> item, flags lines below threshold, and tracks portfolio health.

This screen absorbed the old Inventory Ledger — per-unit capabilities (variants,
SKU and QR, stock by channel, unit editing) now live in the
[row expansion](./variants-sku-qr.md). The old `/inventory-ledger` link
redirects here.

:::tip[Deciding prices? Use Reprice]
[Reprice](./reprice.md) checks every variant (Rip Live and Shipped Sealed
separately) against TCGplayer, Scrydex and eBay, applies each item's markup and
the minimum margin, and queues only what is off target for approval. This grid
stays for inventory work.
:::

## The margin model

Everything on this screen comes from a handful of numbers per row:

| Input | Where it comes from |
| --- | --- |
| **Qty** | How many you hold |
| **Cost** | What you paid, each |
| **Price** | Market price, synced from TCGPlayer |
| **Final Sell** | Your override. If set, it wins over market for every calculation |

From those:

```
effective    = Final Sell if set, otherwise market price
profit       = (effective × qty) − (cost × qty)
margin       = profit ÷ (effective × qty)      ← percent of revenue
target sell  = cost ÷ (1 − target margin)
headroom     = (effective − target sell) ÷ target sell
days held    = today − the row's date
```

Prices are never rounded to price points — no `.99` rule, no nickel rounding.
Money displays to two decimals; percentages to one.

### Health grades

| Grade | Rule |
| --- | --- |
| **✓ Healthy** | Effective price is at least 15% above target sell |
| **Tight** | Above target sell, but within that 15% buffer |
| **Below** | Below target sell — you'd clear the sale but miss the margin |
| **Underwater** | Below what you paid |
| **—** | No cost or no price recorded |

### Target margin

Top of the toolbar: a **Target margin** slider (5–80%) with a paired number box.
Default is **30%**. Everything on the page — target sell, headroom, health,
the margin-gap KPI — recalculates live as you drag it.

This is a session setting. It isn't saved.

## The KPI cards

| Card | What it means |
| --- | --- |
| **Cost basis** | Total cash tied up, plus cost per unit |
| **Market value** *(or* **Plan revenue** *)* | Total at market — relabels when you've set any sell-price override |
| **Unrealized P/L** *(or* **Plan P/L** *)* | Profit if you sold everything at the effective price |
| **Target revenue (30%)** | What a full sellout needs to make to hit your target margin |
| **Margin gap** | Target revenue minus plan revenue — how far short you are |
| **Inventory health** | The healthy / tight / below / underwater split |
| **Capital at risk** | Cost sitting in underwater lines |
| **Concentration** | Biggest line as a share of total market value. Over 30% means one SKU drives the portfolio |
| **Avg days held** | Mean age, plus how many lines are stale (over 180 days) |

Hover any card for the worked formula.

:::caution[Two quirks in the totals]
**Rows with a blank TCG_ID are excluded from every KPI.** They still show in the
grid and still count in the row-level maths, but they contribute nothing to Cost
basis, Market value, or anything else up top. If your totals look low, check for
unmapped rows.

**Hidden rows still count in the totals.** Hiding is a view filter, not an
exclusion — the button's own tooltip says so.
:::

## Finding things

Search: *Search name, set, source, TCG_ID, notes…* — also matches style and
series.

The **Filters** panel adds:

- **Status** — processed, not processed, back stock
- **Health** — Healthy, Tight, Below, Underwater, Unset
- **Style** and **Source** — chips built from your actual data
- **Margin @ Mkt %** — a min/max range
- **Days held** — a min/max range
- **Quick filters** — Unpriced, Stale (>180d), Underwater, Missing from Shopify

:::note["Clear all" misses one]
**Clear all** doesn't clear the **Missing from Shopify** quick filter, even
though the filter badge counts it. Un-click that chip by hand.
:::

The **hidden** toggle switches between hiding hidden rows and showing them. The
count line reads `Showing X of Y (N hidden)`.

## The grid

Columns, left to right: checkbox, **Image**, **Title**, **TCG_ID**, **SKU**,
**Vendor**, **Type**, **Qty**, **Cost**, **Price**, **Date**, **Days**,
**Source**, **Status**, **Set**, **Total Cost**, **Total Price**, **P/L**,
**Margin @ Price**, **Target Sell (30%)**, **Final Sell**, **Headroom**,
**Health**, actions.

Most headers sort — click to toggle direction. Health sorts by severity, worst
first.

Editable cells commit **on blur or Enter**. **Escape** reverts the cell.

A couple of columns behave less obviously:

- **Days** is editable. Typing `30` back-dates the row to 30 days ago.
- **Final Sell** shows the computed target sell as its placeholder, so you can
  see what you'd need before you type.
- **TCG_ID** has a refresh button (pull this product from Shopify) and, once the
  ID looks like a TCGPlayer product ID, a sync button (pull the market price).

Pagination sits at the bottom: `Rows 1–50 of 812`, page controls, and a
**Rows / page** select (25 / 50 / 100 / 250 / 500). Your choice is remembered.

## Working in bulk

Selecting rows reveals: **Select page**, **Select all filtered**,
**Bulk edit**, **Hide**, **Unhide**, **Delete**, **Clear**.

**Bulk edit** exists mainly for graded slabs, where TCGPlayer can't auto-fill a
price. It's checkbox-gated:

> Check the fields you want to apply. Unchecked fields are left untouched.

Fields you can apply: Status, Style, Set, Source, Cost, Market price, Sell price
override, Notes (replaces).

:::warning[Bulk delete has no undo]
Deleting a **single** row shows a toast with an **Undo** button for about six
seconds. Bulk delete just asks *Delete N selected row(s)? This cannot be
undone.* and means it.
:::

## Syncing prices

| Button | What it does |
| --- | --- |
| **Refresh all** | Re-pulls the whole catalog from Shopify. Progress shows as `Syncing 12/340` |
| **Refresh selected (N)** | Same, for the rows you ticked |
| **Sync now** | Kicks off a full catalog sync |
| **Market Pricing** | Opens TCGPlayer search to attach a product ID and pull market price |
| **Browse** | Import individual items from Shopify |

`Last synced …` next to the buttons tells you when the last one finished. If it
failed, it reads **Sync failed** with the reason instead, and you get an alert.

If a refresh is already running when you press **Refresh all**, the page
attaches to the running job rather than erroring.

A row whose product no longer exists in Shopify gets a **⚠ missing** badge and
shows **Removed from Shopify**.

## Market Pricing search

Search Pokémon products by name (minimum two characters). Results show the
thumbnail, name, set, rarity, card number, product ID and market price, with an
**Add** button.

Opened from a row's magnifier, it sets the TCG_ID on that row and only fills
descriptive fields that are still blank — it won't overwrite a name or set you
typed. Opened from the toolbar, it fills the first row with an empty TCG_ID, or
appends a new one.

## Browse (import from Shopify)

Pick a source, filter by name, tick items, **Load more** for the next page, then
**Import N items**. What gets mapped:

- **TCG_ID** — never inferred from the SKU. The shop's SKUs are sequential
  numbers that happen to be other cards' TCGplayer ids, so set it with the
  row's magnifier
- **Type** — Shopify's product type
- **Qty** — sum of variant inventory
- **Cost** — the variant's cost field, or zero
- **Market price** — deliberately left blank. TCG sync is the only source of
  market price
- **Shopify's price** — stored as your **sell-price override**, not as market
- **Set, Source, Notes** — never inferred. Those are yours to curate

## Import and export

**Export CSV** writes `inventory-pricing-YYYY-MM-DD.csv` with 27 columns
covering every input and every computed figure. It exports **all** rows, not
just the ones currently filtered or visible.

**Import CSV / XLSX** reads a fixed set of columns: date, source (or store),
status, item name, tcg_id, style, set, series, quantity, notes, and
price_paid_each.

:::caution[The import doesn't bring prices]
Only **cost** is imported. Market price and sell price are ignored — market
comes from TCG sync, and sell price is a deliberate decision, not spreadsheet
data.

The import caps at **1500 rows**; anything past that is skipped and reported.
:::

Date handling: `YYYY-MM-DD`, Excel serial numbers, or anything a browser can
parse. Unparseable dates fall back to today. Status normalises loosely —
anything containing "back" becomes back stock, anything containing "not" becomes
not processed.

## Game rows

A row whose **Type** is `game` gets a trophy button that expands pack-composition
economics: **Packs in pool**, **Bags you can make**, **Cost / bag**,
**Sell @ 30%**, **Max revenue**, and a per-source pack table.

If the row isn't linked to a game yet, you get a picker. Linking uses that
game's own plan and target margin, not the page's slider. See
[Games](../community/games.md).
