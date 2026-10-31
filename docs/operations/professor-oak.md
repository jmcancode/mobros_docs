---
title: Professor Oak
sidebar_position: 2
description: The capability map, the weak point scan, and the per-operator map you can rearrange.
---

# Professor Oak

Sitting right under Analytics in the sidebar, **Professor Oak** is the front
door to the shop's MCP server — the layer that exposes shop operations as tools
an AI can run.

The rest of the dashboard is organised around screens: you go to Product
Pricing to ask a pricing question. That stops working once there are more tools
than anyone can remember screens for. This page inverts it: it shows **what can
be asked and about what**, grouped by area of the business rather than by which
screen happens to hold the answer.

The header reads **Professor Oak** with a `{n} tools · {n} areas` count beside
it, then the view buttons.

| View | What it's for |
| --- | --- |
| **Capability map** | Every area of the business and what its tools cover |
| **Weak points** | The scan that answers *what is quietly going wrong* |
| **Reprice** | The reprice queue, the same one as [Reprice](../catalog/reprice.md). Shows for anyone who can open Product Pricing |
| **Customize** | Your own arrangement of the map |

:::info[Asking happens in Claude, not here]
The composer is switched off on this page. Professor Oak is informational in the
dashboard — it tells you what the tools cover and what needs attention, and the
questions themselves get asked in Claude through the MCP connector. The map
heading reads **Everything Professor Oak can do** while that's the case.
:::

The speaker button on the right opens **Audio**: **Sound cues** (a hum while it
works, a chime when it lands, a low tone on a fault) and **Speak answers**.
Both are forced off while any stream channel is live — *Stream is live. Sound
and voice are muted so nothing of ours ends up on the broadcast.*

## The capability map

A dial of the shop's sixteen areas: Analytics, Marketing, Finance, Inventory,
Catalog, Breaks & games, Customer service, Mo'Rewards, Social & content,
Giveaways, Buying, Shows, Hit feed, Notifications, Settings and Orders.

The map ships with the dashboard rather than being fetched live, so a brand-new
tool on the MCP server may not appear here until the dashboard is rebuilt. It's
still callable — the map is a view, not the gate.

Clicking an area opens it. The first tab, **Ask**, lists the questions that area
can answer — *Questions this area can answer. Ask them in Claude.* The rest of
the tabs are the area's endpoints, grouped by what they do to the shop:

| Group | Meaning |
| --- | --- |
| **Look up** | Pulls back what is already recorded |
| **Work it out** | Works out something nobody wrote down: a projection, a ranking, a scan |
| **Draft** | Writes copy for you to review. Changes nothing on its own |
| **Change something** | Touches the shop. Never runs without your approval |

:::note[The counts are yours, not the shop's]
The header counts come from the map **you** are looking at. Switching a card off
in Customize lowers them; it doesn't remove anything from the server.
:::

The map is drawn with WebGL. On a browser or machine that can't run it, the page
falls back to a plain grid of the same areas — same content, no dial.

## Weak points

Analytics answers *how did we do*. Weak points answers the harder question:
**what is quietly going wrong**. Every row is a named rule with a measured
value, the threshold it broke, and one action.

The view button carries a red count of open **high**-severity findings, so you
can see there's something to look at without opening the view.

Controls across the top: a **30d / 90d / 180d** window, **Thresholds**, and
**Rescan**.

Under that, a counts strip you can click to filter: **Total findings**, **High**,
**Medium**, and a static **Rules firing** showing `{fired}/{evaluated}`.

### The rules

| Rule | Fires when |
| --- | --- |
| **Break margin below floor** | An active game's margin is under the floor |
| **Games with no economics on file** | A game in the window carries no build cost or projected revenue |
| **Dead stock building** | Stock past the age threshold, above the value cutoff |
| **Points liability concentrating** | Points are held by too few people |
| **Repeat rate slipping** | Repeat purchase rate has dropped across recent cohorts |
| **Supply outruns the release window** | Days of supply sit outside the release horizon |
| **High-tier member had a bad order** | A refund landed against a top-tier member |

A rule that **didn't** fire is shown as clear, not hidden — *Every active game
clears the margin floor*, and so on. That's deliberate: a rule that silently
disappears reads as "fine" when it may mean "never ran". A rule that couldn't
read the data it needs says so rather than showing a green tick.

### Thresholds

**Thresholds** opens six editable lines, sent with the next scan: *Break margin
floor* (%), *Dead stock age* (days), *Dead stock value floor* ($), *Top-5% points
limit* (% of points), *Repeat rate drop* (pts), *Supply horizon* (days).

> Change a line and rescan. Anything left blank uses the server default shown as
> the placeholder.

Nothing is saved — the overrides apply to the scan you're running, so you can
see which rules are sensitive to where the line is drawn. **Reset to defaults**
clears them.

### The money map

A proportional breakdown headed **Where the money went** — bar widths encode
share of gross, so a leak that looks big is big. Gross profit is shown
alongside, with the margin percentage.

### When the scan can't run

| What you see | What it means |
| --- | --- |
| *Can't reach the MCP server* | The MCP server is down or unreachable. **Try again** |
| *The scan failed* | The server answered with an error — the message says which |
| *This account is missing `admin:analytics:read`* | Your MCP account isn't scoped for the scan. That's separate from your dashboard role |

A rescan holds the previous findings on screen at reduced opacity rather than
flashing a skeleton, so the numbers never blink out while you're reading them.

## Customize

**Your map** — the one place the page is per-person.

- **Reorder** cards by dragging.
- **Hide** a card from your map.
- **Choose tools** on a card, or switch them all off.
- **Build your own card** from any tools and example questions in the shop, with
  a colour of your choosing. There's a cap on how many you can add.

Your layout is stored against your account, not your browser, so it follows you
from the counter machine to a laptop and survives a cache clear.

If you switch every card off you get *Your map is empty* and a
**Switch some back on** button rather than an empty dial that looks like a
failed load.

:::caution[Hiding is not permission]
A hidden tool is out of your way, not out of your reach. The router may still
choose it, and what anyone may actually run is decided by MCP scopes — not by
what your map shows. Those scopes are set per person on
[Claude Access](../administration/claude-access.md).
:::

## Who sees it

The **Professor Oak** tab is granted by default to Admin, General Manager, Shop
Manager and Accountant. See [the role matrix](../reference/role-matrix.md).

`/weak-points` still works as a bookmark — it redirects to
`/brain?view=weak-points`.

## Related

- [Dashboard](./dashboard.md) — the *how did we do* half of the same picture
- [Settings → Integrations](../administration/integrations.md) — the provider
  keys the MCP server reads
- [Settings → Claude Access](../administration/claude-access.md) — who can
  connect Claude to the shop, and which areas each person reaches
- [Ask an AI for help](../getting-started/ask-an-ai.md) — using these docs with
  a chatbot, which is a different thing entirely
