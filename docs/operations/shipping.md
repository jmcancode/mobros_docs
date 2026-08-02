---
title: Shipping
sidebar_position: 6
description: The free-shipping-on-first-order-of-the-day rule.
---

# Shipping Automation

:::info[Requires the Free-Shipping Automation feature]
Hidden until activated, and the backend re-checks the entitlement at run time —
so the rule can't fire even if the page somehow renders. See
[Locked features](../getting-started/locked-features.md).
:::

One live rule: **free shipping on the first order of the day**. Changes take
effect immediately, with no deploy.

## Free shipping — first order of the day

*The first qualifying order each customer places after the day-start time gets
free shipping.*

A master toggle at the top of the card, then:

| Control | What it sets |
| --- | --- |
| **Day starts at** | The hour the "day" rolls over, `12:00 AM` through `11:00 PM` |
| **Timezone** | New York, Chicago, Denver, Phoenix, or Los Angeles |
| **Eligible channels** | **Mobile app**, **Web store**, **TikTok**, **In-store / POS** — tick any combination |

The hint under the channels reads: *Recommended: Mobile app + Web store only
(TikTok / in-store excluded).*

## The refund switch

Below the channels sits the control that actually moves money:

> **Actually refund the shipping charge** — moves real money. Off = detect & tag
> only (the order is flagged and the amount logged, but nothing is refunded).

This is **off by default**, and it's independent of the master toggle — you can
run the whole rule in detect-and-tag mode to see what it would have cost before
arming it.

:::danger[No confirmation on this one]
There's no "are you sure" prompt. Flip the refund toggle, press **Save changes**,
and real refunds start on the next qualifying order.
:::

## Saving

**Save changes** is disabled until something changes, shows **Saving…** while it
runs, and a **Saved** check afterwards. Nothing is written until you press it,
and navigating away loses your edits with no warning.

## Not on this screen

**Order tagging and tracking** — auto-tagging orders by channel, game and value,
and buying shipping labels automatically — is built but not switched on. It's
sold separately and is pending further work on the label side. Don't promise it
to anyone yet.

There is also no per-order view here. This screen is configuration only.
