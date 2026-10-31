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

**Store Credit Issued** is a button — the whole card is the target, and it opens
the store credit ledger below.

## The store credit ledger

Click **Store Credit Issued** and you get three tabs. The first answers *where
is this money*, which is what people actually open it for; the other two answer
*where did it come from*.

| Tab | What it lists |
| --- | --- |
| **Who holds it** | Every customer holding a balance right now |
| **Shopify credit** | Every issuance, reclaim and redemption behind the card total |
| **Buy-list trade credit** | A **separate** balance that is *not* counted on the card |

### Who holds it

Figures: **Balance outstanding**, **Customers holding it**, **Dormant 90d+** and
**Largest single**.

**Dormant 90d+** is the useful one — balances untouched for 90 days or more are
the ones worth chasing first. Filter by **Last active**, or set a minimum
balance, then export.

Turn any filter on and the figures relabel themselves — **Balance in view**,
**Customers in view** — rather than showing an all-time number next to a
filtered list.

### Shopify credit

Figures: **Issued all time**, **Reclaimed by staff**, a third tile that is
either **Spent at checkout** or **Not in this ledger**, and **Balance
outstanding**.

:::note[The card is a balance; the ledger is a list of issuances]
Those two legitimately differ, and the strip spells out the gap rather than
leaving you to wonder which number is broken:

- `issued − reclaimed = net`, but a different figure sits on the books.
- **Gap in our favour** → that's credit customers already spent at checkout.
  Shopify settles it against its own account without writing a row here.
- **Gap the other way** → balance no row explains. It was set directly in
  Shopify or predates this ledger, so it has no date, reason or author.
:::

If the history is too large to scan in one go, the figures say **Issued
(partial)** and warn that they cover only the entries loaded — a full history
needs the Firestore index deployed. Nothing is labelled "all time" over a
partial scan.

### Buy-list trade credit

Figures: **Issued**, **Unclaimed**, **Lifetime earned**, **Balance
outstanding**. **Unclaimed** is credit owed to people who traded in but have no
account yet, so it sits in escrow.

### Filters, export and navigation

Both ledger tabs filter by **date range**, by **employee**, and by **kind** —
the kind chips are faceted off the current date range, so their counts describe
the period you're looking at and toggling one never changes the others'
numbers under you.

Long lists render a window at a time with a **load more**; a filter change
reopens the window. **Export** downloads the current tab as CSV. Clicking a row
opens that [customer's record](./customer-detail.md).

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

:::note[The 2,000-event ceiling]
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

:::note[Sorting by name uses first name only]
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

The reason is **required for every movement, in both directions and for both
kinds** — points and store credit, adding and removing:

| | |
| --- | --- |
| *A reason is required for point adjustments* | Points, either direction |
| *A reason is required to issue store credit* | Credit, adding |
| *A reason is required to remove store credit* | Credit, removing |

It's the Reason column in the store credit ledger, and *Admin issued $5.00*
explains nothing to whoever reads it later.

:::note[Adding credit sends the customer a push]
Every time credit is added, from here, Customer Detail or Claude, the customer
gets a push: *Store credit added. $10.00 in store credit was added to your
account. Your balance is $25.00.* Tapping it opens their Store credit screen in
the app. **Your reason is never shown to them.** Removing credit sends nothing.
:::

:::caution[Store credit needs a linked Shopify account]
If the customer has no Shopify account you'll see *No Shopify account linked.
Store credit requires the customer to have completed a Shopify checkout.* and
the button is disabled. Points still work fine.
:::

For anything more involved — bonus points, tier floors, or the full ledger — use
[Customer Detail](./customer-detail.md).
