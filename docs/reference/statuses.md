---
title: Status reference
sidebar_position: 2
description: Every status value in the app, per queue, with what stops the clock.
---

# Status reference

## The three payout stages

Every sell queue runs the same shape, worded in its own terms:

| Stage | Item Submissions | Collection Uploads | Home Visits |
| --- | --- | --- | --- |
| Awaiting delivery — we said yes, goods not here | `Approved` | `Priced` | `Scheduled` |
| Awaiting payment — goods here, seller unpaid | `Received` | `Received` | `Collected` |
| Done | `Paid` | `Paid` | `Paid` |

**Paid** is the finish line everywhere. `Completed` remains terminal on uploads
and home visits as legacy vocabulary — it meant "done" before the payout stages
existed, and demoting it now would resurrect closed requests into the live
queue.

## Item Submissions

| Status | Terminal? | Clock |
| --- | --- | --- |
| Pending | no | Your SLA runs |
| In Review | no | Your SLA runs |
| Waiting on Customer | no | **Paused.** Customer timeout runs |
| Approved · Awaiting Delivery | no | **Paused.** Customer timeout runs — they still have to ship |
| Received · Unpaid | no | **Your SLA runs.** The goods are here; we owe money |
| Paid | **yes** | Stopped |
| Rejected | **yes** | Stopped |
| Declined *(legacy)* | **yes** | Stopped |
| Cancelled | **yes** | Stopped |
| Timed Out | **yes** | Stopped |
| No Show | **yes** | Stopped |

Counts as an accepted outcome: Approved, Received, Paid. As rejected: Rejected,
Declined. Cancelled, Timed Out and No Show are drop-offs — neither.

## Collection Uploads

| Status | Terminal? | Clock |
| --- | --- | --- |
| Pending Review | no | Your SLA runs |
| In Review | no | Your SLA runs |
| Priced | no | **Paused.** Customer timeout runs |
| Waiting on Customer | no | **Paused.** Customer timeout runs |
| Received · Unpaid | no | **Your SLA runs** |
| Paid | **yes** | Stopped |
| Completed *(legacy)* | **yes** | Stopped |
| Declined | **yes** | Stopped |
| Cancelled | **yes** | Stopped |
| Timed Out | **yes** | Stopped |
| No Show | **yes** | Stopped |

Accepted: Completed, Received, Paid. Rejected: Declined.

## Home Visits

| Status | Terminal? | Clock |
| --- | --- | --- |
| Pending | no | Your SLA runs |
| Contacted | no | Your SLA runs |
| Scheduled | no | **Paused.** Customer timeout runs |
| Waiting on Customer | no | **Paused.** Customer timeout runs |
| Confirmed *(legacy)* | no | Counts as accepted |
| Collected · Unpaid | no | **Your SLA runs** |
| Paid | **yes** | Stopped |
| Completed *(legacy)* | **yes** | Stopped. No longer offerable — see [Sell Requests](../operations/sell-requests.md#home-visits) |
| Declined *(legacy)* | no | Counts as rejected |
| Cancelled | **yes** | Stopped |
| Timed Out | **yes** | Stopped |
| No Show | **yes** | Stopped |

Accepted: Completed, Confirmed, Collected, Paid.

## Support Tickets

| Status | Terminal? | Clock | Thread |
| --- | --- | --- | --- |
| Open | no | Your SLA runs | Open |
| In Progress | no | Your SLA runs | Open |
| Waiting Customer | no | **Paused.** Customer timeout runs | Open |
| Resolved | **yes** | Stopped | **Locked** |
| Closed | **yes** | Stopped | **Locked** |
| Timed Out | **yes** | Stopped | Open |

## Default SLA thresholds

| Queue | Warn | Overdue | Remind | Close |
| --- | --- | --- | --- | --- |
| Item Submissions | 24 h | 48 h | 72 h | 168 h |
| Collection Uploads | 24 h | 48 h | 72 h | 168 h |
| Home Visits | 12 h | 24 h | 24 h | 72 h |
| Support Tickets | 8 h | 24 h | 48 h | 120 h |

All sixteen values are editable in
[Automations](../operations/automations.md).

## Payment methods

Preset so payouts stay aggregatable, the same reasoning as the cancellation
reasons below:

Cash · Store Credit · PayPal · Zelle · Venmo · Check · Other

A method is required to record a payout. Payouts written before the method
picker existed are reported as **unrecorded** rather than attributed to a
method nobody chose.

## Cancellation reasons

Shared across every Cancel dialog:

Customer changed mind · Price disagreement · Customer unresponsive · Sold
elsewhere · Condition didn't match · Out of service area · Duplicate request ·
Other

A note is optional except on **Other**.

## Hit Feed moderation

| Status | Meaning |
| --- | --- |
| Needs Review | Reported and not cleared since |
| Clean | Never reported |
| Closed | Reviewed and cleared |
| Removed | Soft-deleted, restorable |

## Games

Two independent axes:

| Axis | Values |
| --- | --- |
| Status | draft → active → completed → archived |
| Publish | Dev ⇄ Live |

## Giveaways

Coming Soon → Live → Ended. Entirely manual — the draw date doesn't flip
anything.

## Inventory health

| Grade | Rule |
| --- | --- |
| ✓ Healthy | Effective price at least 15% above target sell |
| Tight | Above target sell, within the 15% buffer |
| Below | Below target sell |
| Underwater | Below cost |
| — | No cost or no price recorded |

## Product Pricing status

processed · not processed · back stock

## Card conditions

| Code | | Default multiplier |
| --- | --- | --- |
| NM | Near Mint | 100% |
| LP | Lightly Played | 85% |
| MP | Moderately Played | 70% |
| HP | Heavily Played | 55% |
| DMG | Damaged | 35% |

Plus **Sealed**, **Graded** and **Mint** as options on Shows want-lists.
