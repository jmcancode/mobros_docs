---
id: intro
title: Start here
sidebar_label: Start here
sidebar_position: 1
slug: /
description: What the MoBros admin dashboard is, who it's for, and where to go next.
---

# MoBros Admin

The MoBros admin dashboard — the **Command Center** — is the desktop web app the
shop runs on. Everything a customer does in the mobile app arrives here: cards
they want to sell, support tickets they file, points they earn, breaks they
watch. Everything the shop pushes back out — pricing, notifications, games,
giveaways, the app's home feed — starts here too.

It lives at **[admin.mobrostc.info](https://admin.mobrostc.info)** and you sign
in with your MoBros Google account.

## Pick your path

| If you… | Start with |
| --- | --- |
| Work a shift and need to get something done today | [Signing in](./getting-started/signing-in.md), then [Navigating the dashboard](./getting-started/navigating.md) |
| Manage the shop and set policy | [Roles & Access](./administration/roles-and-access.md), [Buy Rates](./catalog/buy-rates.md), [Rewards](./community/rewards.md) |
| Own the business and pay the bills | [Billing](./administration/billing.md), [Dashboard](./operations/dashboard.md) |
| Build, deploy, or debug it | [Developer docs](./developers/index.md) |

## How the dashboard is organised

The sidebar groups every screen into five sections, and this documentation
follows the same shape so you can read it the way you use it.

| Sidebar section | Screens | Documentation |
| --- | --- | --- |
| *(top)* | Dashboard | [Daily operations](./operations/dashboard.md) |
| **Operations** | Sell Requests, Tickets, Intake Processing, Shipping | [Daily operations](./operations/sell-requests.md) |
| **Catalog** | Buy Rates, Product Pricing, Feed Studio | [Catalog & pricing](./catalog/product-pricing.md) |
| **Community** | Customers, Rewards, Games, Giveaways | [Community](./community/customers.md) |
| **Content** | Notifications, Hit Feed | [Content & marketing](./content/notifications.md) |
| **Admin** | Settings | [Administration](./administration/roles-and-access.md) |

## Two things decide what you see

The dashboard hides screens for two completely separate reasons, and it helps
enormously to know which one is biting you.

1. **Your role.** A Streamer sees Shows and Hit Feed; an Accountant sees
   Analytics and Billing. See [What you can see](./getting-started/what-you-can-see.md).
2. **What the shop has activated.** Some features are purchased separately —
   the Card Scanner, Hit Feed, Feed Studio. Until they're paid for or on trial,
   the screen shows a preview panel instead of the real thing. See
   [Locked features](./getting-started/locked-features.md).

Both fail closed. If something isn't granted, you don't get it — there is no
state where an ungranted screen accidentally appears.

## In a hurry? Ask instead of reading

Every page has a **Copy for AI** button in the top right. Press it, paste into
ChatGPT, Claude or Gemini, and ask your question in plain English — it comes
with instructions attached, so you don't need to know anything about prompts.

See [Ask an AI for help](./getting-started/ask-an-ai.md).

## Three habits worth building

- **Nothing saves until you press Save.** Most editors on this dashboard hold
  your changes locally and write them when you click the save button. Navigating
  away loses them, usually silently.
- **Changing a status restarts the clock.** On Sell Requests and Uploads, every
  status change resets the SLA timer and re-arms the customer reminder. Bouncing
  a request between statuses is not free.
- **Some writes are immediate and global.** Rewards config, Buy Rates, and
  Feed Studio publishes go live for every customer the moment you save. There is
  no draft or staging state on those screens.

:::tip[Found something wrong in these docs?]
The dashboard changes fast. If a screen doesn't match what's written here, the
screen is right and this page is stale — flag it so it can be fixed.
:::
