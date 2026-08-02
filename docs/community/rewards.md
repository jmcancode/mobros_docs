---
title: Rewards
sidebar_position: 3
description: The Mo'Rewards program config — earning, tiers, redemption options and milestones.
---

# Rewards

The single config screen for the whole Mo'Rewards program.

:::danger Saving is immediate and global
There is no draft, no staging, no schedule. The banner says it outright:
**Config saved — live immediately for all customers.** Every change you make
applies to every member the moment you press **Save config**.
:::

The header shows the config version and who last edited it.

## Before you save: Projected impact

While you have unsaved changes, a **Projected impact** panel appears. It
revalues your entire live customer base under the edited config — tier
multipliers included — and shows:

| Card | What it tells you |
| --- | --- |
| **Effective credit / point** | What a point is now worth, with `was $X` for comparison |
| **Projected liability** | What you'd owe if everyone redeemed |
| **Liability vs revenue** | Against the 4% target |
| **Earn generosity** | Share of revenue you're returning as points |

Under target, it turns green: *This config holds liability at X% of revenue —
within the 4% target.*

Over target, it turns amber and tells you exactly what to do:

> Over the 4% target. To reach it, bring effective credit/point down to ≤ $X
> (now $Y) — lower redemption credit values, raise point costs, or disable the
> most generous option.

This panel disappears once you save. **Read it before you commit.**

## Mo'Rewards Health

The same live health snapshot that appears on
[Customers](./customers.md#morewards-health) — liability outstanding, liability
vs revenue, burn rate, dormancy, engagement, average active balance. Full
concentration and activity breakdowns live on the Customers page.

## Program status

One master switch: **Active — earning & redeeming enabled** or **Disabled —
master kill switch ON**.

## Earning

| Field | |
| --- | --- |
| **Points per dollar** | The base earn rate |
| **Minimum order subtotal (USD)** | Orders below this earn nothing |
| **Signup bonus (points)** | Granted once on account creation |

## Daily cap

| Field | |
| --- | --- |
| **Reset mode** | **Midnight (customer local time)** or **Rolling 24 hours** |
| **Fallback timezone** | Used when a customer's timezone is unknown |

The per-tier daily redeem caps themselves are set on each tier card below.

## Tiers

Tiers can be **edited but not added or removed** from this screen. Each card
shows its immutable ID and lets you set:

- **Display name**
- **Min points (threshold)** — where the tier starts
- **Daily redeem cap (points)**
- **Redemption rate multiplier** — how much more a point is worth at this tier
- **Color**

:::caution Nothing validates your tier ladder
There's no check that thresholds are in order, no check against overlapping
tiers, and no check against a zero multiplier. Read the ladder top to bottom
before saving.
:::

## Redemption options

A table of what points buy. Each row: **Enabled**, **ID**, **Points**,
**Base credit (Rare)**, **Sort**, and a delete button.

> Base credit is the Rare-tier value; higher tiers multiply it by their
> redemption rate (e.g. $5.00 base → $8.00 at a 1.6× tier).

:::warning The most generous option sets the point value everywhere
The "point value" figure used in liability maths across the whole dashboard is
derived from your **most generous enabled** redemption option. Disabling one
option can move liability numbers on Customers, Rewards, and elsewhere.
:::

## Guaranteed milestones

Spending milestones shown to customers. Each row: **Label**, **Description**,
**Order threshold (USD)**, **Icon**.

## A note on deletion

Removing a redemption option or a milestone happens instantly in the form, with
no confirmation. It's only reversible by pressing **Reload** *before* you save.
