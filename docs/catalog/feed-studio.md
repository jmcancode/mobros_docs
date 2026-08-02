---
title: Feed Studio
sidebar_position: 6
description: Merchandising the app's Search feed — spotlight, rails, boost rules, pins and hides.
---

# Feed Studio

:::info[Requires the Feed Studio feature]
See [Locked features](../getting-started/locked-features.md).
:::

> Compose what shoppers see on the Search screen. Changes go live the moment you
> publish.

Four levers, one preview, one **Publish** button. Nothing is typed by hand —
products come from a searchable picker, categories from a dropdown of your real
games with product counts, tags from autocomplete.

A status pill next to the title reads **Unpublished changes** while you're
editing, or **Published `{time}`** once you've pushed.

## 1. Spotlight

> One hero at the top of the feed. Pick the product — no handle to type.

Toggle it on, then:

| Field | Notes |
| --- | --- |
| **Product** | **Choose product** opens the picker. Picking one also fills the Title if it's empty |
| **Kicker** | Defaults to *This week's drop* |
| **Title** | Optional — *Falls back to product name* |
| **Subtitle** | e.g. *Limited allocation* |

## 2. Curated rails

Horizontal strips of products above the main grid, ordered top to bottom. Each
rail has a title, a source, a max item count, an enable toggle, reorder arrows,
and a delete button.

| Source type | What it pulls |
| --- | --- |
| **Category** | Everything in one game category — the dropdown shows counts, e.g. `Pokémon (142)` |
| **Tag** | Everything carrying a tag, with autocomplete |
| **New arrivals** | Automatic — no value to set |
| **Hand-picked** | Exactly the products you choose, drag to reorder |

**Max items** is 1–30, default 12.

Two behaviours to know: changing a rail's source type **clears its value**, and
picking a product into a rail **forces that rail to Hand-picked**.

## 3. Boost rules

> Weights the grid (0–3). Re-ranks only — never hides in-stock demand.

| Rule | What it does | Default |
| --- | --- | --- |
| **Discount depth** | Push bigger markdowns higher | 2 |
| **Newness** | Fresh arrivals rise | 2 |
| **Margin** | Favour high-margin SKUs — reads cost and sell price from Product Pricing | 0 |
| **Overstock age** | Move aging stock — reads days held from Product Pricing | 0 |
| **Demote low stock** | Sink items under N left to the tail | 3 |
| **Hide sold-out** | Remove zero-stock items from browse | on |

Margin and overstock age read the same numbers the
[Product Pricing](./product-pricing.md) table shows, so the ranking inputs and
the pricing screen never disagree.

## 4. Pinned & hidden

*Overrides everything.* Pins sit at the top of the grid in the order you set;
hidden products don't appear at all. Both use the product picker.

## The preview

A phone mock on the right labelled **Live preview · browse**, mirroring the
customer's idle Search screen: search bar, spotlight, one strip per *enabled*
rail, then the full grid.

## Publishing

Everything you do is **local until you press Publish**. The button is disabled
until something changes.

:::danger[Two people editing at once will overwrite each other]
Feed Studio loads the config once and replaces the whole document on publish.
There's no merge and no warning — the last publish wins. Agree who's driving
before you both open it.
:::
