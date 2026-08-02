---
title: Add a product
sidebar_position: 5
description: Creating a channel- and SEO-ready product on the store.
---

# Add product

> Create a channel- and SEO-ready product on the store. Required fields are
> marked *.

Reached from Product Pricing. The submit button won't enable until every
required field is valid, so if it's greyed out, something above it is wrong.

## The form

### Identity

- **Title** *(required)* — a live hint shows the URL handle it derives
- **Description** — basic HTML allowed

### Media

**Images** *(required)*. Drag and drop, or click to browse. Multiple files are
fine. Each gets a thumbnail with a remove button.

If an upload fails with a permissions message, storage rules need to allow
writes — that's a developer fix, not something you can work around.

### Organization

**Vendor** *(required)*, **App category** *(required)*, **Variant type**
*(required)*, and optional comma-separated **Extra tags**.

The app category matters more than it looks: *without it the product lands in
the wrong section* of the mobile app.

### Variant type drives the rest of the form

| Variant type | Fields that appear |
| --- | --- |
| `sealed-only` | Sealed price, Sealed qty |
| `live-only` | Live price, Live qty |
| `live+sealed` | Both sets |

The dropdown shows whatever the store's product schema returns, so the exact
wording may differ from the raw values above. A description of the selected type
appears underneath the picker.

Only the visible price fields are required, and only the visible ones get sent.

### Pricing

**Sealed price** and/or **Live price** (conditionally required), plus optional
**Compare-at** and **Cost per item**.

A compare-at price *below* the sell price gets a warning — the discount badge
won't show.

### Inventory

**Sealed qty** / **Live qty**, optional **Barcode** (UPC/EAN) and
**Weight (lb)**.

The SKU generates itself from the handle — `POKEMON-TCG-DESTINED-SEAL` and
similar.

### SEO

- **Page title** — keep it under 70 characters or Google truncates it
- **Meta description** — keep it under 160 characters. **Required if you're
  publishing as Active**
- **URL handle** — auto-derived from the title until you edit it, then it sticks

### Status & channels

**Draft** keeps it unpublished. **Active** publishes to every sales channel on
the store.

## Validation you'll actually hit

| Message | Fix |
| --- | --- |
| *Remove the (SEALED) prefix — it hurts SEO.* | Take it out of the title; the variant type already says it |
| *Pick an app category — without it the product lands in the wrong section.* | Choose one |
| *Add at least one image — required for channels + SEO.* | Upload one |
| *A meta description is required to publish (SEO).* | Write one, or save as Draft instead |
| *Fix the highlighted fields before submitting.* | Something above is invalid — errors appear inline after your first submit attempt |

## After you submit

The banner reads `Created "{title}" · published to N channel(s)` or
`· saved as draft`, the form clears, and you're taken back to inventory after a
moment.

Errors coming back from Shopify are mapped onto the individual fields that
caused them.

:::warning This form targets the dev store
The create request currently hardcodes the dev store. Products created here
won't land on production until that's changed — flag it to a developer before
using this screen for real inventory.
:::
