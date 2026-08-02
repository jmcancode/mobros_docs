---
title: Buy Rates
sidebar_position: 3
description: The base and max percentage of market you offer, per category.
---

# Buy Rates

> Base & max % of market value to offer. Final price is negotiated in person or
> over message.

One card per buy category, each holding a **base** and a **max** percentage. The
card body reads like *Offer **60%–80%** of market · negotiate from there*.

Colour tells you at a glance how generous a category is — green at 90% max and
up, yellow from 75%, red below that.

The [Condition Multipliers](./condition-multipliers.md) table sits at the bottom
of this same page.

## The numbers up top

**Categories** (how many), **Avg Max**, **Highest Max**, **Lowest Base**.

## Adding a category

**Add Category** asks for:

| Field | Notes |
| --- | --- |
| **Category Name** | e.g. `vintage-singles`. A live preview shows the key it derives — lowercased, spaces become hyphens |
| **Base (%)** | Defaults to 60 |
| **Max (%)** | Defaults to 80 |

## Editing a rate

The pencil on a card turns it into two inputs. **Enter** confirms, **Escape**
cancels.

Both values must be numbers greater than 0 and no more than 100, and **base must
be less than or equal to max**.

:::caution[Invalid input fails silently]
If a value is out of range or base is above max, the save just… doesn't happen.
No error appears. If a card refuses to save, check those two rules first.
:::

:::note[If saving fails entirely]
Buy Rates writes into an existing settings record and doesn't create one. On a
brand-new install you may see *Failed to save rate.* until that record exists —
a developer needs to seed it once.
:::

Removing a category asks *Remove "`{Name}`" from buy rates?*

## The notify prompt

**Every successful rate change pops a Notify Customers modal 300 ms later.**
This is automatic, not something you opt into.

The modal shows `{Category} · new range: 60%–80%` and gives you one message box,
capped at **160 characters** with a live counter. You need at least 5 characters
to send.

- **Skip** dismisses it. Nothing is sent.
- **Send to All Users** pushes to everyone, titled
  `💰 Buy Rate Update — {Category Name}`, and then tells you how many were
  delivered.

:::tip[Skip is a perfectly good answer]
You'll adjust rates far more often than customers need to hear about it. Only
send when the change is worth a push to your entire user base.
:::
