---
title: Billing
sidebar_position: 2
description: Buying features by card, and what each one costs to run.
---

# Settings → Billing

> Turn on the features you want and pay securely by card. Each one activates the
> moment payment clears — no back-and-forth.

Self-serve. Any admin can use it.

## The cards

One card per available feature, each showing:

- The feature title and a one-line tagline
- **What** it does
- **Why** it matters to the shop
- **Monthly** — the ongoing running cost, or *None — no added running cost.*
- The one-time build price, captioned **one-time build**
- A checkbox — or an **Active** badge if it's already paid for

A feature that's currently on trial shows a yellow **Trialing · still due**
badge. A trial turns the feature on but doesn't clear the bill.

If everything is paid for, the grid is replaced with
*🎉 All delivered features are active.*

## Ongoing costs

The total bar at the bottom shows both numbers, and they're different things:

- **`Pay $X`** — the one-time build cost of what you've selected
- **`+ ~$X/mo ongoing`** — what those features add to your monthly running cost

Worth knowing before you tick everything: **Live Shopping** is $250/mo flat
(streaming allowance, dedicated stream server, replay storage), **Hit Feed** is
about $50/mo in image storage and push volume, and the **Card Scanner** is
usage-billed — 50,000 scan tokens a month included, then $0.035 per token.

Most other features are *None — reuses your existing infrastructure.*

## Paying

**Pay $X** hands you off to Stripe's hosted checkout. Nothing on this screen
touches your card details.

When you come back:

- `?paid=1` → *Payment received — your selected features are now active. Thank
  you!*
- `?canceled=1` → *Checkout was canceled — nothing was charged.*

Features activate automatically when Stripe confirms payment. If a screen still
shows locked immediately afterwards, navigate away and back — the entitlement
check re-runs when you open a gated screen.

## Errors

| Message | Meaning |
| --- | --- |
| *Can't reach the server…* | The backend is down |
| *That feature isn't available for purchase yet.* | It's built but not on the price list |
| *Payments aren't set up yet — please check back shortly.* | Stripe isn't configured on the backend |

## Related

- [Locked features](../getting-started/locked-features.md) — what a locked
  screen looks like and why
- [Roles & Access](./roles-and-access.md) — the other gate, and why a screen can
  be hidden even when it's paid for
