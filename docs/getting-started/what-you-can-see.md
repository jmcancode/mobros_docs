---
title: What you can see
sidebar_position: 3
description: How roles decide which screens appear in your sidebar.
---

# What you can see

Your sidebar is built from your roles. A staff member sees the **union** of
every tab granted to every role they hold — so someone who is both Front of
House and Moderator sees both sets.

Absence of a grant is never a grant. If a role isn't explicitly given a tab, it
doesn't get it, and there's no state where an ungranted screen shows up by
accident.

## The roles

Ten of the thirteen roles are **staff roles** — they can open the dashboard and
be granted tabs.

| Role | What it's for |
| --- | --- |
| **Admin** | Full access to every tab and setting. Bypasses the matrix entirely. |
| **General Manager** | Store-wide management — everything except API keys and role editing. |
| **Shop Manager** | Day-to-day operations, catalog, community and content. |
| **Accountant** | Financial views: analytics, orders and rewards. |
| **Front of House** | Sales floor and customer-facing: intake, tickets, customers, pricing. |
| **Back of House** | Fulfillment and receiving: inventory, shipping, products, grading. |
| **Stream Manager** | Live shows, hit feed, giveaways and content. |
| **Streamer** | On-air talent: show schedule and hit feed. |
| **Moderator** | Community moderation: tickets, hit feed, customers. |
| **Employee** | Baseline staff access. |

The other three are **customer attributes**, not permissions. They grant no
dashboard tabs at all:

| Attribute | Meaning |
| --- | --- |
| **VIP** | Customer loyalty tier. |
| **Verified** | ID-verified customer badge. |
| **Shopify User** | Linked to a Shopify customer record. |

## What each role gets by default

The full default grid is in the [role matrix reference](../reference/role-matrix.md).
The short version:

- **Employee** — Analytics, Tickets, Sell Requests. That's it.
- **Front of House** — the above, plus Customers, Buy Rates, Product Pricing,
  Rewards, Intake Processing.
- **Back of House** — Analytics, Shipping, Products, Grading, Product Pricing,
  Orders, Intake Processing.
- **Accountant** — Analytics, Professor Oak, sales figures, Orders, Rewards, Buy
  Rates, Product Pricing.
- **Shop Manager** — everything operational, catalog, community and content,
  plus Professor Oak and Pricing Rules.
- **GM** — every tab the matrix can grant.
- **Admin** — everything the matrix governs.

These are only defaults. An admin can rewrite the whole grid live from
[Settings → Roles & Access](../administration/roles-and-access.md), and a saved
override **replaces** that role's tab list rather than adding to it.

## Four tabs nobody gets by role

**API Keys**, **Integrations** and **Roles & Access** are gated by an explicit
list of user accounts, not by role. Not even a general Admin sees them unless
their account is on that list. This is deliberate: the first two hold secrets and
the third controls who-can-see-what, so none of them ride on a role anyone can be
granted.

**Billing** is a fourth case. It's pinned to a hard-coded list of accounts *and*
the screen has been pulled from the Settings hub entirely — see
[Billing](../administration/billing.md).

All four show as locked cells in the Roles & Access grid rather than as
checkboxes, because a tick there would do nothing.

## Asking the server what it thinks

Occasionally the sidebar and the data disagree — the grid says you have
Notifications and the page still 403s. That means the dashboard and the API have
resolved the matrix differently, which a developer can confirm in one request.
See [Access control](../developers/access-control.md#backend-guards).

## "Unauthorized"

If you follow a link or bookmark to a screen you don't have, you land on a plain
page reading *Unauthorized — You don't have permission to access this page.*
That's the role gate, not a bug. Ask a manager to grant the tab, or check
whether you're signed in with the right account.

If instead you see a blurred preview with a lock chip, that's the *other* gate —
see [Locked features](./locked-features.md).
