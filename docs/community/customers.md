---
title: Customers
sidebar_position: 1
description: The member roster, the rewards health dashboard, and quick points adjustments.
---

# Customers

> Manage Mo'Rewards points and store credit

Every app member, with their points, tier, store credit and order count — plus a
program-level health dashboard for the loyalty program.

## The numbers up top

**Total Customers**, **Active Members** (anyone with points), **Points in
Circulation**, **Store Credit Issued**.

## Mo'Rewards Health

*Live snapshot of your points program.* On the right, the **point value** —
derived from your most generous enabled redemption option.

Four summary cards, always visible:

| Card | Healthy range |
| --- | --- |
| **Liability outstanding** | The dollar value of unspent points |
| **Liability vs revenue** | **1–4%**. Over 5% you're issuing faster than you're absorbing; under 1% the program is probably too stingy |
| **Burn rate** | **40–70%**. Low means redemption has stalled; high means you're issuing too generously |
| **Dormancy** | Median days since last earn. Over 60 days is a warning |

**More detail** expands into a fuller picture: average active balance, estimated
breakage, whale risk (flagged when one member holds 30% or more of all points),
total revenue, average buyer lifetime value, earn generosity, a Gini
concentration score with a top-1% / 5% / 10% / bottom-90% breakdown, and the
tier distribution.

### Recent activity

Inside the expanded view, a **Last 7 / 30 / 90 days** dropdown and a
**Load activity** button. This is deliberately manual — the query is expensive,
so it doesn't run unless you ask for it. Once loaded, the button becomes
**Refresh**.

:::note The 2,000-event ceiling
The activity rollup reads at most 2,000 events in the window. Past that you'll
see a note saying so, and the figures will understate reality — narrow to 7 days
for accuracy.
:::

## The roster

Search: *Search by name or email…* — matches email, first name, last name and
display name. It does **not** match phone, username, or user ID.

**Tier chips** filter to one tier. The tier names come from your live rewards
config.

Columns: **Customer**, **Points**, **Tier**, **Credit**, **Orders**, and an
**Adjust** button. Points, Credit and Orders sort; clicking a header sorts
descending first. Default sort is Points, descending.

Clicking anywhere else on a row opens that
[customer's full record](./customer-detail.md).

There are no bulk actions on this screen.

:::note Sorting by name uses first name only
A customer with only a display name and no first name sorts as blank.
:::

## The Adjust modal

A quick way to move points or credit without leaving the list. It shows the
customer's current points, store credit and lifetime points, plus their recent
ledger entries.

1. Pick **Points** or **Store Credit**
2. Pick **Add** or **Remove**
3. Enter the amount
4. Fill in **Reason (audit trail)**

The reason field is enforced for **point** adjustments — *A reason is required
for point adjustments.* Fill it in regardless; it's the only record of why a
balance moved.

:::caution Store credit needs a linked Shopify account
If the customer has no Shopify account you'll see *No Shopify account linked.
Store credit requires the customer to have completed a Shopify checkout.* and
the button is disabled. Points still work fine.
:::

For anything more involved — bonus points, tier floors, or the full ledger — use
[Customer Detail](./customer-detail.md).
