---
title: Dashboard
sidebar_position: 1
description: The live overview screen — what each tile measures and where the number comes from.
---

# Dashboard

The landing screen. Every tile is backed by a live subscription, so the numbers
move on their own — this page is designed to sit open on a shop monitor all day.
An internal clock ticks every minute so age-based figures don't go stale.

It's called **Analytics** in the sidebar and the page header reads **Analytics**
/ *Live store operations and Shopify performance in one place.*

The page is laid out in zones: **Needs attention**, **Promotions**,
**Performance** (Shopify), **App Stores**, then **Position**.

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

## Promotions

### Welcome gift

> New customers pick one free gift with their first order.

One switch, and it saves the moment you flip it — there's no Save button,
because there's only one decision on the card.

The pill reports what **customers actually experience**, not what the switch
says:

| Pill | Meaning |
| --- | --- |
| **Live** | On, and customers can claim a gift right now |
| **Off** | Switched off |
| **Needs attention** | Switched on, but something is stopping it working |

When those two disagree, the card spells out why:

| Issue | What it means |
| --- | --- |
| *The Shopify app can't create discounts yet…* | A developer needs to add the discount permission |
| *Shopify has no "`{handle}`" collection on the headless channel.* | Create it and add the gift products |
| *Every gift is out of stock, so customers won't see the offer.* | Restock, or add products to the collection |
| *Couldn't reach Shopify to check the gifts.* | Try again in a moment |

Below the switch, the gift collection reads back: thumbnails of what's on offer
with their values, **In stock**, and **Claimed**.

:::note[What's on offer is edited in Shopify, not here]
The card shows the gift collection back to you rather than offering a second
place to edit it. To change the gifts, edit that collection in Shopify.
:::

This zone is shown only to roles holding the **Giveaways** tab. It gives
product away, so it's gated more tightly than the rest of the page, and the
backend enforces the same gate.

The same card also sits on [Promotions](../content/promotions.md) settings,
for staff with the **Promotions** tab. That screen adds the fields this one
doesn't have, such as which collection the gifts come from and how new an
account has to be. The welcome gift invite also counts as one of the pop-ups a
customer can see in a session, so it never stacks with a promo.

## App Stores

Acquisition and reviews from **App Store Connect** and **Google Play**, in their
own zone with its own **7 / 30 / 90 days** filter and its own refresh. Gated on
the same *sales figures* grant as the Shopify **Performance** zone — install and
conversion numbers are business performance data too.

Per store: **Impressions**, **Product page views**, **Installs**,
**Page-view rate**, **Conversion rate**, plus an installs-per-day trend with a
table view. Then a **Reviews** card with rating and unreplied filters.

Each store loads independently, so Apple being slow never blanks Google, and
neither can blank the Shopify half of the page.

| State | Meaning |
| --- | --- |
| *`{Store}` metrics are not connected* | No credentials uploaded — see [Settings → Integrations](../administration/integrations.md) |
| *`{Owner}` is preparing reports* | Apple or Google hasn't generated the report yet. Normal on a new connection |
| *No data for this period* | Connected, nothing to show in the window |
| *Couldn't load `{store}`* | An upstream error; the message says which |

:::note[A metric a store doesn't report reads as "Not available"]
Google doesn't report impressions, so that tile says *Not available from Google*
rather than **0**. Anything else the server couldn't fill in shows as a quiet
note under the store rather than being rounded to zero.
:::

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
