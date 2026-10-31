---
title: Billing
sidebar_position: 4
description: Why there's no Billing tab any more, and where feature activation happens instead.
---

# Billing

:::danger[The Billing screen has been pulled from the dashboard]
There is no **Billing** tab in the Settings hub. `/billing` and
`/settings/billing` both redirect to **Settings**. The page still exists in the
codebase, unreferenced — it was taken out of the hub, not deleted.

Nothing on this page describes a screen you can currently open.
:::

## So how does a feature get switched on?

Two ways, and neither of them is self-serve any more.

| Path | Who |
| --- | --- |
| **Activation** | The developer account only. Grants a feature, or starts and ends a trial |
| **Stripe payment** | Arranged off-dashboard. A feature activates when Stripe confirms the payment |

**Activation** is in the sidebar under **Admin**, and it's pinned to a single
account — not a role. An Admin, a GM, even the shop owner won't see it unless
they *are* that account. It used to be open to any admin; it isn't.

A feature marked **Held for discovery** can't be switched on from Activation at
all. The grant control and the trial toggle are both disabled, and the server
refuses the request, so there's no way to switch one on by accident before the
commercial conversation has happened.

## What's on the price list

The catalog, what each feature does, and which screens it unlocks are all in
[Locked features](../getting-started/locked-features.md). That page is still
current — it describes the lock panel you actually see on a gated screen.

What the catalog *costs* is now a two-track question — lease or own, with setup,
monthly and maintenance components derived from each feature's build price — and
those terms live with the quote rather than on a dashboard screen. Ask rather
than guessing from an old number.

## If a feature shows locked after it was paid for

The entitlement check re-runs when you open a gated screen, not on a timer.
Navigate away and back.

If every feature shows locked at once, that's the fail-closed path — the
dashboard couldn't reach the billing service and locked everything rather than
leaking it. The locked panel adds *Couldn't reach the billing service — showing
locked.* It clears itself once the service is back.

## Related

- [Locked features](../getting-started/locked-features.md) — what a locked
  screen looks like, and the full feature catalog
- [Roles & Access](./roles-and-access.md) — the other gate, and why a screen can
  be hidden even when it's paid for
