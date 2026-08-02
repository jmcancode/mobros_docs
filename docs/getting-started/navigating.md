---
title: Navigating the dashboard
sidebar_position: 2
description: The sidebar, its sections, badges, and the layout conventions every screen shares.
---

# Navigating the dashboard

Every screen sits behind the same shell: a sidebar on the left, your content on
the right. Learn the shell once and the rest is just screens.

## The sidebar

The header reads **Sup, Smart Nerds!** / *Command Center*. Below it, navigation
is grouped into sections:

| Section | Items |
| --- | --- |
| *(ungrouped, top)* | **Dashboard** |
| **Operations** | **Sell Requests**, **Tickets**, **Intake Processing**, **Shipping** |
| **Catalog** | **Buy Rates**, **Product Pricing**, **Feed Studio** |
| **Community** | **Customers**, **Rewards**, **Games**, **Giveaways** |
| **Content** | **Notifications**, **Hit Feed** |
| **Admin** | **Settings** |

A section with no visible items disappears entirely — so your sidebar will be
shorter than the table above unless you're an admin. See
[What you can see](./what-you-can-see.md).

### Badges and signals

- **Number badges** on **Sell Requests** and **Tickets** are live counts of
  pending sells and open tickets. They update on their own.
- **`new!` tags** mark recently shipped screens. They're a nudge, not a
  permission — the tag fades once the feature isn't new anymore.
- **A red "Live on TikTok" pill** appears under the header whenever any of the
  three stream channels is broadcasting. Details in [Live breaks](../content/live-breaks.md).

### Collapsing the sidebar

The small chevron button on the sidebar's right edge collapses it to icons only.
Your choice is remembered in the browser, per device. Hovering a collapsed icon
shows its label.

On a narrow screen the sidebar becomes a slide-over: tap the hamburger in the
mobile header to open it, tap anywhere outside to close.

## Conventions shared across screens

**Nothing saves until you save it.** Product Pricing, Rewards, Feed Studio,
Shipping, Automations, and Roles & Access all hold edits locally and write them
on an explicit save. There is generally no "unsaved changes" prompt if you
navigate away.

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
