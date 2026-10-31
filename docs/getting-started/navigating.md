---
title: Navigating the dashboard
sidebar_position: 2
description: The sidebar, its sections, badges, and the layout conventions every screen shares.
---

# Navigating the dashboard

Every screen sits behind the same shell: a sidebar on the left, your content on
the right. Learn the shell once and the rest is just screens.

## The sidebar

The header is the **Sup Nurds** logo over *Command Center*. Below it, navigation
is grouped into sections:

| Section | Items |
| --- | --- |
| *(ungrouped, top)* | **Analytics**, **Professor Oak** |
| **Content** | **Notifications**, **Marketing** |
| **Marketing** | **Promotions** |
| **Operations** | **Sell Requests**, **Tickets**, **Intake Processing** |
| **Catalog** | **Buy Rates**, **Reprice**, **Product Pricing**, **Feed Studio** |
| **Community** | **Customers**, **Rewards**, **Giveaways**, **Bags** |
| **Admin** | **Settings**, **Activation** |

A section with no visible items disappears entirely — so your sidebar will be
shorter than the table above unless you're an admin. See
[What you can see](./what-you-can-see.md).

**Activation** is pinned to the developer account alone and won't appear for
anyone else, whatever their role.

**Marketing** and **Intake Processing** also need the shop to have paid for
them. Until it has, they stay out of the sidebar for everyone. See
[Locked features](./locked-features.md).

:::note[Screens with no sidebar entry]
**Shipping**, **Hit Feed** and **Games** are built, documented and reachable
by URL, but they're currently switched off in the sidebar. So are Analytics
*(the separate one)*, Orders, Products, Grading, Shows, App Layout and
Marketplace. A missing
nav item isn't the same as a revoked tab — see
[the role matrix](../reference/role-matrix.md#screens-that-arent-in-the-sidebar).
:::

### Badges and signals

- **Number badges** on **Sell Requests** and **Tickets** are live counts of
  pending sells and open tickets. They update on their own.
- **`new!` tags** mark recently shipped screens. They're a nudge, not a
  permission — the tag fades once the feature isn't new anymore.
- **A red "Live on TikTok" pill** appears under the header whenever any of the
  three stream channels is broadcasting. Details in [Live breaks](../content/live-breaks.md).
- **Professor Oak** carries a red count when the weak point scan has open
  high-severity findings. See [Professor Oak](../operations/professor-oak.md).

### Collapsing the sidebar

The small chevron button on the sidebar's right edge collapses it to icons only.
Your choice is remembered in the browser, per device. Hovering a collapsed icon
shows its label. Collapsed, the logo is replaced by a plain **M** — the full mark
needs more width than the rail has.

On a narrow screen the sidebar becomes a slide-over: tap the hamburger in the
mobile header to open it, tap anywhere outside to close.

## Conventions shared across screens

**Nothing saves until you save it.** Product Pricing, Rewards, Feed Studio,
Shipping, Automations, and Roles & Access all hold edits locally and write them
on an explicit save. There is generally no "unsaved changes" prompt if you
navigate away.

A few screens deliberately break that rule because each change is a single
decision. They all say so on screen:

- [Pricing Rules](../administration/pricing-rules.md) saves every field when
  you leave it.
- [Claude Access](../administration/claude-access.md) saves each change as you
  make it.
- The Welcome Gift switch on the [Dashboard](../operations/dashboard.md) and on
  [Promotions](../content/promotions.md) settings saves the moment you flip it.
- The [Bags](../community/bags.md) launch switch and
  [Sessions](../administration/sessions.md) act as soon as you confirm.

**Expandable rows.** Sell Requests, Tickets, Uploads, Product Pricing, Shows and
Intake Processing all use a chevron to expand a row into a detail panel. Only
one panel is open at a time on Product Pricing; the others allow several.

**Status pills.** Colour is consistent: green means done or healthy, yellow
means attention, red means overdue or losing money, grey means nothing set yet.
The full list of every status value in the app is in the
[status reference](../reference/statuses.md).

**Search boxes** are always case-insensitive substring matches over a fixed set
of fields, listed per screen. They never search everything.

**Timers.** Rows on Sell Requests and Tickets carry an SLA timer that turns
amber at "warn" and red at "overdue". Thresholds are configurable — see
[Automations](../operations/automations.md).

## Where the docs live

The **Docs** button sits in the sidebar footer, just above your account and
**Sign Out**. It opens this site in a new tab.

It's in the footer rather than a nav section on purpose — sections disappear
when you have no items in them, and help needs to be reachable by every role.
