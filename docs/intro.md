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
| Manage the shop and set policy | [Roles & Access](./administration/roles-and-access.md), [Buy Rates](./catalog/buy-rates.md), [Pricing Rules](./administration/pricing-rules.md), [Rewards](./community/rewards.md) |
| Own the business and want to know how it's doing | [Dashboard](./operations/dashboard.md), [Professor Oak](./operations/professor-oak.md) |
| Build, deploy, or debug it | [Developer docs](./developers/index.md) |

## How the dashboard is organised

The sidebar groups every screen into sections, and this documentation follows
the same shape so you can read it the way you use it.

| Sidebar section | Screens | Documentation |
| --- | --- | --- |
| *(top)* | Analytics, Professor Oak | [Daily operations](./operations/dashboard.md) |
| **Content** | Notifications, Marketing | [Content & marketing](./content/notifications.md) |
| **Marketing** | Promotions | [Promotions](./content/promotions.md) |
| **Operations** | Sell Requests, Tickets, Intake Processing | [Daily operations](./operations/sell-requests.md) |
| **Catalog** | Buy Rates, Reprice, Product Pricing, Feed Studio | [Catalog & pricing](./catalog/reprice.md) |
| **Community** | Customers, Rewards, Giveaways, Bags | [Community](./community/customers.md) |
| **Admin** | Settings, Activation | [Administration](./administration/roles-and-access.md) |

**Settings** holds these sub-tabs: [Pricing Rules](./administration/pricing-rules.md),
[Integrations](./administration/integrations.md),
[Roles & Access](./administration/roles-and-access.md), and for Admins
[Sessions](./administration/sessions.md) and
[Claude Access](./administration/claude-access.md). Integrations and Roles &
Access only show for a short list of accounts.

Some screens are documented here but currently have no sidebar entry: Shipping,
Hit Feed and Games among them. They're reachable by URL, and the
[role matrix](./reference/role-matrix.md#screens-that-arent-in-the-sidebar)
lists them.

## Two things decide what you see

The dashboard hides screens for two completely separate reasons, and it helps
enormously to know which one is biting you.

1. **Your role.** A Streamer sees Shows and Hit Feed; an Accountant sees
   Analytics and Billing. See [What you can see](./getting-started/what-you-can-see.md).
2. **What the shop has activated.** Some features are purchased separately —
   the Card Scanner, Hit Feed, Feed Studio. Until they're paid for or on trial,
   the screen shows a preview panel instead of the real thing. See
   [Locked features](./getting-started/locked-features.md).

A handful of screens sit behind a third thing entirely: an explicit list of
accounts, which no role or admin flag overrides. That's Roles & Access, API
Keys, Integrations and Billing — see
[What you can see](./getting-started/what-you-can-see.md).

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
- **Some writes are immediate and global.** Rewards config, Buy Rates, Pricing
  Rules and Feed Studio publishes go live for every customer the moment you
  save. There is no draft or staging state on those screens.
- **A sell request isn't done until it's Paid.** Approved means they still have
  to ship; Received means the goods are here and the shop owes money. See
  [Sell Requests](./operations/sell-requests.md).

:::tip[Found something wrong in these docs?]
The dashboard changes fast. If a screen doesn't match what's written here, the
screen is right and this page is stale — flag it so it can be fixed.
:::
