---
title: Who can see what
sidebar_label: Role matrix
sidebar_position: 3
description: The default role-to-screen grid shipped with the dashboard.
---

# Who can see what

The defaults below seed a fresh install. They can be rewritten live from
[Settings → Roles & Access](../administration/roles-and-access.md), and a saved
override **replaces** a role's whole list rather than adding to it.

A staff member sees the **union** of every role they hold. **Admin sees
everything** and bypasses the grid entirely.

## The default grid

| Screen | GM | Shop Mgr | Acct | Front | Back | Stream Mgr | Streamer | Mod | Employee |
| --- | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: |
| Dashboard | ● | ● | ● | ● | ● | ● | ● | ● | ● |
| **Operations** | | | | | | | | | |
| Sell Requests | ● | ● | | ● | | | | | ● |
| Tickets | ● | ● | | ● | | | | ● | ● |
| Intake Processing | ● | ● | | ● | ● | | | | |
| Shipping | ● | ● | | | ● | | | | |
| Grading | ● | ● | | | ● | | | | |
| Orders | ● | ● | ● | | ● | | | | |
| **Catalog** | | | | | | | | | |
| Buy Rates | ● | ● | ● | ● | | | | | |
| Product Pricing | ● | ● | ● | ● | ● | | | | |
| Feed Studio | ● | ● | | | | | | | |
| Products | ● | ● | | | ● | | | | |
| **Community** | | | | | | | | | |
| Customers | ● | ● | | ● | | ● | | ● | |
| Rewards | ● | ● | ● | ● | | | | | |
| Games | ● | ● | | | | ● | | | |
| Giveaways | ● | ● | | | | ● | | | |
| **Content** | | | | | | | | | |
| Notifications | ● | ● | | | | ● | | | |
| Hit Feed | ● | ● | | | | ● | ● | ● | |
| Shows | ● | ● | | | | ● | ● | | |
| App Layout | ● | ● | | | | ● | | | |
| **Insights** | | | | | | | | | |
| Analytics | ● | ● | ● | | | | | | |
| **Settings** | | | | | | | | | |
| Billing | ● | | ● | | | | | | |
| Shopify Stores † | ● | | | | | | | | |
| Buy Rate Config † | ● | ● | | | | | | | |
| Roles & Access | | | | | | | | | |
| API Keys | | | | | | | | | |

† Currently disabled in the Settings hub, so nobody sees the tab regardless of
the grant. **Shopify Stores** is turned off pending launch; **Buy Rate Config**
was folded into the [Buy Rates](../catalog/buy-rates.md) nav tab. Both still
appear as columns in the Roles & Access grid so the grant survives if they come
back.

## The two exceptions

**Roles & Access** and **API Keys** are blank for every role on purpose. They're
gated by an explicit account allowlist — **not even Admin sees them** unless
their account is on the list. See
[Access control](../developers/access-control.md#the-uid-allowlist).

## Screens that aren't in the sidebar

Analytics, Orders, Products, Grading, Shows and App Layout have routes and can
be granted, but no sidebar entry. You reach them by URL.

Marketplace, Shopify Stores, Buy Rate Config and API Keys are built but
currently switched off — the first is hidden pending a decision, and the other
three are disabled in the Settings hub (see the † note above; API Keys is
waiting on a backend endpoint).

## Entitlements are a separate axis

A granted tab still won't render if the shop hasn't activated the feature behind
it. Intake Processing, Shipping, Hit Feed and Feed Studio all sit behind a
purchase as well as a role. See
[Locked features](../getting-started/locked-features.md).
