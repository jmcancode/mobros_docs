---
title: Claude Access
sidebar_position: 4
description: Choose who can connect Claude to the shop, and which areas each person can view or change.
---

# Settings → Claude Access

> People here can connect Claude to the shop. Each one signs in with their own
> MoBros account, gets only the areas you choose, and every action they take
> is logged.

Claude Access decides who on the team can use Claude with MoBros (the same
tools [Professor Oak](../operations/professor-oak.md) runs on), and what each
person can reach once connected. It lives under **Settings → Claude Access**.

:::warning[Two checks, not one]
The tab only shows for accounts with the **Admin** role. The real gate is the
MCP server itself: you can only change this list if your own entry on it
includes **Claude access** at **View and change**. An Admin who isn't on the
list sees the page but every change is refused.
:::

## The list

Each row is one person: their name, a **You** tag on your own row, what they
can reach (**Full access**, **3 areas**, **No areas yet** or **Off**) and their
connection status (**2 connections**, **Last Oct 30, 4:12 PM** or **Never
connected**). Click a row to open that person.

### Adding someone

Press **Add person**. Staff accounts are listed; type a full email to find
anyone else. Pick the person and they're added straight away.

New people **start with no areas**. They can connect, but Claude can't see or
change anything for them until you choose areas on the next screen.

## One person

Every change on this screen saves the moment you make it. A status line at the
top says **Saving**, then what changed.

### Can connect Claude

The main switch. Off means they can't use Claude with the shop at all.
Switching it off **ends their open connections straight away**, and keeps
their areas for when you switch them back on.

You can't switch yourself off. Ask another owner.

### What they can reach

Two choices:

- **Full access**: every area, including managing this page.
- **Choose areas**: set each area on its own.

Each area has three levels: **Off**, **View** and **View and change**. Areas
with nothing to change (Analytics, Finance, Diagnostics) only offer **Off** and **View**.

| Area | What it covers |
| --- | --- |
| Catalog and pricing | Products, prices, the reprice queue |
| Inventory | Stock levels and holds |
| Games | Game builds and prizes |
| Orders | Orders, refunds, returns |
| Customers | Customer profiles and history |
| Rewards and store credit | Points, tiers, credit |
| Support tickets | Ticket threads and replies |
| Buying (sell requests) | Sell requests and payouts |
| Giveaways | Giveaways and winners |
| Shows | The show schedule |
| Feed and home tabs | Feed Studio, Home tabs, the hit feed |
| Notifications and pushes | Customer pushes, broadcasts, live channels, webhooks |
| Marketing | The marketing calendar and posts |
| Social | Post scheduling, drop announcements, break recaps |
| Analytics | Sales, customer and stream numbers, weak points (View only) |
| Finance | Cash, P&L, sales tax, payouts (View only) |
| Shopify | Reserved. No tool uses it yet. |
| Settings | Pricing rules, shipping automation, integration keys |
| Agents | Reserved for scheduled agents. No tool uses it yet. |
| Diagnostics | Reserved. No tool uses it yet. |
| Claude access | This page |

Give people the smallest set that does their job. A front-of-house employee
might need **Customers** and **Support tickets** at **View**, nothing more.

:::note[Changing prices needs one more grant]
**Catalog and pricing** at **View and change** lets someone ask Claude to edit
products. Approving or dismissing reprices and setting an item's markup also
needs **Approve pricing** on [Roles & Access](./roles-and-access.md). Admins
and GMs have it by default.
:::

### Disconnect now and Remove access

- **Disconnect now** ends every open Claude connection for this person without
  changing their access. They can reconnect right away. Use it when a laptop
  is lost or shared.
- **Remove access** takes them off the list and ends their connections. You
  can add them again later.

Both ask you to confirm first.

You can't remove yourself, or take away your own **Claude access** area. A
change that would leave nobody able to manage this page is refused.

## How someone connects

Once someone is on the list, they add MoBros to Claude as a custom connector
(**Settings → Connectors → Add custom connector** in Claude) using the server
address their admin gives them, then sign in with their own MoBros email and
password. If the sign-in page refuses them, they aren't on this list yet, or
they're switched **Off**.

To cut every staff connection at once, use **Also disconnect Claude** on
[Sessions](./sessions.md).
