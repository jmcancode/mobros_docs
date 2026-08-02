---
title: Dashboard
sidebar_position: 1
description: The live overview screen — what each tile measures and where the number comes from.
---

# Dashboard

The landing screen. Every tile is backed by a live subscription, so the numbers
move on their own — this page is designed to sit open on a shop monitor all day.
An internal clock ticks every minute so age-based figures don't go stale.

Header: **Dashboard** / *MoBros Admin Overview*.

## Stream pills

Top right, three pills — **Live Break**, **Stream Sports**, **Card House**. A
live channel shows a dot and its current title; an idle one reads **Offline**.
Clicking any pill takes you to [Notifications](../content/notifications.md),
where you go live and end breaks.

## The six tiles

| Tile | The number | The sub-line | Goes to |
| --- | --- | --- | --- |
| **Inventory Market Value** | Market price × quantity, summed across every inventory line | `{n} lines · cost {total cost}` | Product Pricing |
| **Unrealized P/L** | Market value minus cost basis | `{margin} margin at market` | Product Pricing |
| **Tickets Overdue** | Open tickets past the SLA breach window | `of {n} open · oldest {duration}` | Tickets |
| **Sells Overdue** | Sell submissions past the SLA breach window | `of {n} pending · oldest {duration}` | Sell Requests |
| **Members** | Total customer count | `{n} active in 30d · {pct} burn` | Customers |
| **Restock Demand** | Price × everyone waiting, across every out-of-stock product | `{n} waiting on {n} products` | The restock panel below |

Some tiles add a coloured flag line when there's something to act on:

- **Unrealized P/L** flags `{n} lines below cost · {$} at risk` in red.
- **Tickets Overdue** and **Sells Overdue** flag `{n} waiting on customer` in
  amber — those are excluded from the overdue count on purpose.
- **Restock Demand** flags `Most wanted: {product} · {n} waiting`.

### Definitions worth pinning down

- **Overdue** excludes anything waiting on the customer. That delay isn't ours,
  so it doesn't count against the team. The breach windows come from
  [Automations](./automations.md) — the same source Tickets and Sell Requests
  use, so "overdue" means one thing everywhere.
- **Active in 30d** means the customer earned points at some point in the last
  30 days.
- **Burn** is lifetime points earned minus current balance, over lifetime points
  — how much of what you've issued has actually been spent.
- **Restock Demand** is an upper bound on the opportunity, not a conversion
  forecast. Nobody is going to buy all of it.

## Restock requests

A live list of out-of-stock products customers have subscribed to, sorted by
subscriber count.

- **Notify** sends the restock push to everyone waiting on that product.
- **Remove** deletes the request entirely, after a confirm reading
  *Remove "`{name}`" from the restock list? This will delete the request and
  cannot be undone.* There is no undo.

## Chargeback reports

A live list of generated dispute-evidence reports, newest first. This panel is
read-only from the Dashboard.

## What's new

A dismissible panel highlighting recently shipped features. It only shows for a
short allowlist of accounts, so most staff never see it.
