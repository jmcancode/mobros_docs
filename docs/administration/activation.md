---
title: Activation
sidebar_position: 3
description: The developer-only panel for trials, manual overrides, and pay links.
---

# Activation

:::warning Developer account only
This page is restricted to a single account — the developer's. The backend
enforces the same restriction independently, so it can't be reached by editing a
role. Everyone else sees only *This page is restricted to the developer
account.*

Shop staff want [Billing](./billing.md) instead.
:::

> Turn delivered features on or off, and generate a pay link to send MoBros.
> Only your account can see or use this page.

## Layout

At the top, **Outstanding (unpaid — includes trials)** with the total owed. Next
to it, a **Trial length** picker — **7 days**, **14 days** (default), **30
days**, **60 days**, or **No end date** — which applies to whichever trial you
start next.

Below, every feature grouped into **Features**, **Inventory** and **Shipping**.

## A feature row

The gradient bar, a checkbox for including it on a pay link, the title and
tagline, the quote reference, the price, the status, a trial button, and a paid
toggle.

Features tagged as a **building block** are internal pieces that activate with
their pipeline rather than being sold on their own.

## Status values

| Status | Meaning |
| --- | --- |
| **Active** | Paid for |
| **Trial · {n}d left** | On trial with an end date |
| **Trial · no end** | On trial with no expiry |
| **Trial ended** | The trial ran out; the feature is locked again |
| **Locked** | Not paid, not on trial |

## Actions

**Start trial** / **End trial** — turns the feature on for the shop without
clearing the bill. A trialing feature still counts toward Outstanding and still
appears on the pay link. This is the button for "let them see it before they
commit."

**Paid toggle** — marks a feature as paid manually, for anything settled outside
Stripe. Marking something paid clears any trial flag on it.

## Pay links

> All unpaid features are selected by default — one link, one payment. On
> payment, Stripe activates exactly what was purchased.

Tick what you want on the link, then **Generate pay link — $X**. Already-paid
features can't be selected — the checkbox is disabled with *Already paid — can't
be added to a pay link*, so the total can't be inflated by things that were
already settled.

The generated URL appears in a read-only field with a **Copy** button.

## Error messages

These are diagnostic on purpose:

| Message | What to check |
| --- | --- |
| *Can't reach the backend ({msg}). Is it running on :3000?* | The API server isn't up |
| *Access denied (403). This account isn't the configured owner uid.* | `ENTITLEMENT_OWNER_UID` doesn't match your account |
| *Not found (404). Restart the backend so /api/billing is mounted.* | The billing routes aren't mounted |
| *Billing isn't configured (503). Set BBOY_STRIPE_SECRET_KEY, then run the Stripe seed.* | Stripe keys are missing |
