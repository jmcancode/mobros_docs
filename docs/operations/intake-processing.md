---
title: Intake Processing
sidebar_position: 5
description: The back-house queue for cards already bought at the counter.
---

# Intake Processing

:::info Requires the Card Scanner feature
This screen is hidden until the Card Scanner feature is activated. See
[Locked features](../getting-started/locked-features.md).
:::

Cards that have already been bought at the counter. The money is out of the
till, the cards are already in inventory — this is where a human sleeves, checks,
prices and boxes them, then records that it's done.

The page states it plainly:

> Cards bought at the counter, waiting to be sleeved, priced and boxed. Marking
> them processed queues them for listing — it doesn't list them on Shopify, you
> still do that yourself.

## The numbers up top

| Stat | What it counts |
| --- | --- |
| **Cards waiting** | Every card across every buy still needing processing |
| **Paid out** | Total handed over the counter for those buys |
| **Buys** | How many separate buy batches are loaded |

## Batches

A batch is one buy — the Tuesday morning stack from one customer, usually one
physical box. Each row shows:

- the card count
- either **All processed** (green) or **{n} to process** (yellow)
- **Commit failed** in red if the buy didn't post cleanly
- the bin or box chip, if one was assigned
- date, age, and who took the buy
- the amount paid, and `{rate}% of {market value}` — with `· credit` appended
  when the customer took store credit

## Working a batch

Expand a batch to see its cards. Each row shows the card name, set, number and
condition, its SKU (or **no SKU**), and its cost against market.

| Control | What it does |
| --- | --- |
| **Select all** | Ticks every card currently loaded for that batch |
| **Queue for listing** | On by default. Adds processed cards to the listing worklist |
| **Mark all processed** | With nothing ticked, processes **every loaded card** in the batch |
| **Mark {n} processed** | With a selection, processes just those |
| ✓ button on a row | Processes that one card |

### What "processed" actually does

- It marks the card as handled. It does **not** change the card's inventory
  status — that stays on-hand. Processing and location are separate things.
- **Queue for listing** adds it to the listing worklist. It does **not** create
  or touch a Shopify listing. You still build the listing yourself, as a
  deliberate separate step.

## Things that catch people out

- **There's no confirmation on the bulk action.** *Mark all processed* with
  nothing selected processes the whole loaded batch immediately.
- **Queue for listing is one page-level setting**, shared across every batch,
  and it resets to on when you reload. Turn it off for one batch and it stays
  off for the next until you refresh.
- **Nothing here is live.** Two people working the same box won't see each
  other's progress until someone hits **Refresh**.
- **There are limits.** The batch list caps at 50 buys and each batch's card
  list at 200 cards.
- There are no statuses, timers, or SLAs on this screen. A card is either
  processed or it isn't.

## Errors

An error banner appears at the top with a **Dismiss** button. The three you'll
see are *Could not load buy batches*, *Could not load cards*, and *Could not
mark processed*.

Empty states: **Nothing bought yet** / *Buy lists approved on the counter app
show up here.* for no batches, and *Nothing left to process in this buy.* for a
finished one.
