---
title: Locked features
sidebar_position: 4
description: Why some screens show a blurred preview, and how they get unlocked.
---

# Locked features

Some parts of the dashboard are purchased separately from the base build. Until
the shop has paid for one — or it's on an active trial — the screen renders a
blurred wireframe of the real thing with a lock chip reading
**Pending activation**, the feature's name and tagline, a *What it does* and
*Why it matters* block, and a link reading **Activate this feature →**.

The panel also carries a rotating showcase of the other available features,
labelled **Also available**.

## This is not a permissions problem

A locked screen looks nothing like the "Unauthorized" page you get from a role
gate — and importantly, **there is no admin bypass**. An owner with every role
in the system still sees the lock panel until the feature is activated.

| What you see | Which gate | How to fix it |
| --- | --- | --- |
| Plain *Unauthorized* page | Role | Get the tab granted in [Roles & Access](../administration/roles-and-access.md) |
| Blurred preview + lock chip | Entitlement | Purchase or trial it via [Billing](../administration/billing.md) |
| The screen isn't in the sidebar at all | Either | Both gates hide nav items — check role first, then activation |

## Which screens are gated

| Screen | Feature |
| --- | --- |
| [Intake Processing](../operations/intake-processing.md) | Card Scanner |
| [Shipping](../operations/shipping.md) | First Customer Free-Shipping Automation |
| [Product Pricing](../catalog/product-pricing.md) *(the Add product route)* | Multi-Store Inventory |
| [Hit Feed](../content/hit-feed.md) | Hit Feed |
| [Feed Studio](../catalog/feed-studio.md) | Feed Studio |

## How a feature gets unlocked

Two paths, both covered in [Administration](../administration/billing.md):

- **Purchase.** Any admin can go to **Settings → Billing**, tick the features
  they want, and pay by card. Each one activates the moment payment clears.
- **Trial.** The developer account can start a trial on any feature from the
  [Activation](../administration/activation.md) page. A trial turns the feature
  on but it stays owed — it still counts toward the outstanding balance.

Activation is picked up the next time you open the gated screen, so you may need
to navigate away and back.

:::note If billing is unreachable
When the dashboard can't reach the billing service it locks everything and adds
the line *Couldn't reach the billing service — showing locked.* This is
intentional fail-closed behaviour, not a sign your features were revoked. It
clears itself once the service is back.
:::

## The catalog

| Feature | What it does |
| --- | --- |
| **Live Shopping** | In-app live streaming with a pinned buyable product, chat, giveaways, and automatic replays. |
| **Hit Feed** | A social feed where customers post their best pulls, with moderation built in. |
| **Auto-Restock Alerts** | Customers subscribe to sold-out products and get a push the moment you restock. |
| **Multi-Store Inventory** | Real-time inventory sync across stores with variant lookup, drift detection and audit logging. |
| **Card Scanner** | Photograph a card, get an identification and live market pricing. |
| **Feed Studio** | Drag-and-arrange console for the app's Search feed. |
| **First Customer Free-Shipping Automation** | Free shipping on the first customer purchase of the day. |
| **High-Value Order Verification** | Flags large or unusual orders for review before they ship. |
| **Marketing Notifications** | Automated birthday and promo pushes. |
| **Auto-Response on Collections** | Instantly acknowledges collection and sell-to-us submissions. |
| **Push Timer + Admin Assignment** | SLA timers and assignment on support requests, with escalation. |
| **Prize Wheel on Login** | Spin-to-win wheel when customers open the app. |

Each carries its own one-time build price and, where applicable, an ongoing
monthly running cost — both shown on the [Billing](../administration/billing.md)
page.
