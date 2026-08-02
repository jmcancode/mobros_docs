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
| **Accountant** | Financial views: analytics, orders, billing and rewards. |
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

- **Employee** — Dashboard, Tickets, Sell Requests. That's it.
- **Front of House** — the above, plus Customers, Buy Rates, Product Pricing,
  Rewards, Intake Processing.
- **Back of House** — Dashboard, Shipping, Products, Grading, Product Pricing,
  Orders, Intake Processing.
- **Shop Manager** — everything operational, catalog, community and content.
- **GM** — everything except the two security-sensitive settings tabs.
- **Admin** — everything.

These are only defaults. An admin can rewrite the whole grid live from
[Settings → Roles & Access](../administration/roles-and-access.md), and a saved
override **replaces** that role's tab list rather than adding to it.

## Two tabs nobody gets by role

**API Keys** and **Roles & Access** are gated by an explicit list of user
accounts, not by role. Not even a general Admin sees them unless their account
is on that list. This is deliberate: those two screens hold secrets and control
who-can-see-what, so they don't ride on a role anyone can be granted.

## "Unauthorized"

If you follow a link or bookmark to a screen you don't have, you land on a plain
page reading *Unauthorized — You don't have permission to access this page.*
That's the role gate, not a bug. Ask a manager to grant the tab, or check
whether you're signed in with the right account.

If instead you see a blurred preview with a lock chip, that's the *other* gate —
see [Locked features](./locked-features.md).
