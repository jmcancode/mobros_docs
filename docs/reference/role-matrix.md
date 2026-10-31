---
title: Who can see what
sidebar_label: Role matrix
sidebar_position: 3
description: The default role-to-screen grid shipped with the dashboard.
---

# Who can see what

The defaults below seed a fresh install. They can be rewritten live from
[Settings → Roles & Access](../administration/roles-and-access.md), and a saved
override **replaces** a role's whole list rather than adding to it. The one
exception: a screen added after a role was last saved takes that role's
default until someone saves the grid again.

A staff member sees the **union** of every role they hold. **Admin sees
everything** and bypasses the grid entirely — except for the four columns the
grid can't govern at all (see below).

## The default grid

| Screen | GM | Shop Mgr | Acct | Front | Back | Stream Mgr | Streamer | Mod | Employee |
| --- | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: |
| **Insights** | | | | | | | | | |
| Analytics *(the dashboard)* | ● | ● | ● | ● | ● | ● | ● | ● | ● |
| Professor Oak | ● | ● | ● | | | | | | |
| Sales figures ‡ | ● | ● | ● | | | | | | |
| **Operations** | | | | | | | | | |
| Sell Requests | ● | ● | | ● | | | | | ● |
| Tickets | ● | ● | | ● | | | | ● | ● |
| Intake Processing | ● | ● | | ● | ● | | | | |
| Shipping | ● | ● | | | ● | | | | |
| Grading | ● | ● | | | ● | | | | |
| Orders | ● | ● | ● | | ● | | | | |
| **Catalog** | | | | | | | | | |
| Buy Rates | ● | ● | ● | ● | | | | | |
| Product Pricing *(and Reprice)* | ● | ● | ● | ● | ● | | | | |
| Approve pricing § | ● | | | | | | | | |
| Feed Studio | ● | ● | | | | | | | |
| Products | ● | ● | | | ● | | | | |
| **Community** | | | | | | | | | |
| Customers | ● | ● | | ● | | ● | | ● | |
| Rewards | ● | ● | ● | ● | | | | | |
| Games | ● | ● | | | | ● | | | |
| Bags | ● | ● | | | | ● | | | |
| Giveaways | ● | ● | | | | ● | | | |
| **Content** | | | | | | | | | |
| Notifications | ● | ● | | | | ● | | | |
| Marketing | ● | ● | | | | ● | | | |
| Hit Feed | ● | ● | | | | ● | ● | ● | |
| Shows | ● | ● | | | | ● | ● | | |
| App Layout | ● | ● | | | | ● | | | |
| **Marketing** | | | | | | | | | |
| Promotions | ● | ● | | | | | | | |
| **Settings** | | | | | | | | | |
| Pricing Rules | ● | ● | | | | | | | |
| Roles & Access † | | | | | | | | | |
| API Keys † | | | | | | | | | |
| Integrations † | | | | | | | | | |
| Billing † | | | | | | | | | |

**GM** is defined as *every tab the matrix can grant* — so a column added later
reaches GM automatically, and the four locked ones never do.

‡ **Sales figures** isn't a screen. It gates the Shopify **Performance** and
**App Stores** zones inside the main dashboard, so a Streamer or Moderator keeps
their overview without gaining sight of revenue.

§ **Approve pricing** isn't a screen either. It decides who can approve or
dismiss prices in [Reprice](../catalog/reprice.md) and set an item's markup,
in the dashboard and through Claude alike. Anyone who can open Product Pricing
can see Reprice; only GM approves by default.

† Blank for every role **on purpose** — see the next section.

## The four columns the matrix can't grant

These render as locked cells in the Roles & Access grid, with an icon and a
tooltip saying why, rather than as checkboxes that would do nothing.

| Column | Why it's locked |
| --- | --- |
| **Roles & Access** | Account allowlist. No role or admin bypass |
| **API Keys** | Account allowlist. No role or admin bypass |
| **Integrations** | Account allowlist. No role or admin bypass |
| **Billing** | Pinned to a hard-coded account list, and the screen has been pulled from the Settings hub anyway |

The first three are checked **before** the matrix and with no admin bypass, so a
tick in those columns would be a lie. See
[Access control](../developers/access-control.md#the-uid-allowlist).

## Admin-only screens outside the grid

[Sessions](../administration/sessions.md) and
[Claude Access](../administration/claude-access.md) have no column at all.
Only accounts with the **Admin** role see them, and the server checks again
on every change. Claude Access has a second gate of its own: your entry on
its list must include managing Claude access.

## Retired columns

| Column | What happened |
| --- | --- |
| **Billing** | Removed from the Settings hub. `/billing` and `/settings/billing` redirect to Settings — see [Billing](../administration/billing.md) |
| **Shopify Stores** | Turned off pending launch |
| **Buy Rate Config** | Folded into the [Buy Rates](../catalog/buy-rates.md) nav tab |
| **Weak Points** | Folded into [Professor Oak](../operations/professor-oak.md) as a view. `/weak-points` redirects |

They stay in the registry so an old stored grant still sanitizes cleanly, but
they render as locked — the route redirects, so a grant there does nothing.

## Screens that aren't in the sidebar

Orders, Products, Grading, Shows and App Layout have routes and can be granted,
but no sidebar entry. You reach them by URL.

**Shipping**, **Hit Feed** and **Games** are the newer additions to that list.
All three are fully built and documented, and all three are currently
commented out of the sidebar.
Marketplace is hidden pending a decision. API Keys is disabled in the Settings
hub waiting on a backend endpoint.

## Entitlements are a separate axis

A granted tab still won't render if the shop hasn't activated the feature behind
it. Intake Processing, Shipping, Hit Feed, Feed Studio and Marketing all sit
behind a purchase as well as a role. See
[Locked features](../getting-started/locked-features.md).

## Asking the server

If the grid says you have a tab and the page still 403s, the client and the API
have resolved the matrix differently. `GET /api/whoami` returns the **server's**
answer, including whether it has loaded the saved overrides at all — see
[Access control](../developers/access-control.md#backend-guards).
