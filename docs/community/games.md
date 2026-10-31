---
title: Games
sidebar_position: 4
description: Building and running repacks and floor-guaranteed break games out of real inventory.
---

# Games

> Build repacks & floor-guaranteed games from inventory. Track prizes, spots,
> and live margin.

You plan the economics, pull packs and prizes from real inventory, sell spots,
award prizes, and close out with a realised profit and loss.

## The list

Stat strip: **Active**, **Drafts**, **Completed**, and **Projected revenue
(active)** — buy-in × total spots, summed across active games.

Filter tabs: **active** (the default view), **draft**, **completed**,
**archived**, **All**.

Each card shows the status, a **Live** or **Dev** badge, the game type, a margin
pill, the name, and the buy-in, spots sold, projected revenue and floor.

The margin pill is green at or above your target, amber if positive but short,
red if you're losing money.

## Two independent lifecycles

This trips people up, so it's worth being explicit.

| Lifecycle | Values | What it controls |
| --- | --- | --- |
| **Status** | draft → active → completed → archived | The economics (projected vs realised) and whether the game is editable |
| **Publish** | Dev ⇄ Live | Whether the leaderboard card shows in the mobile app |

They're completely separate. A draft can be pushed **Live**, and an **active**
game can sit in Dev. **Push live** / **Pull to dev** controls the second one;
**Activate** / **Mark complete** / **Archive** control the first.

## Creating a game

**New game** asks for:

| Field | |
| --- | --- |
| **Name** *(required)* | Create is disabled until you fill it |
| **Type** | Defaults to pack sack. Only pack-sack games get a floor |
| **Buy-in ($)** | Per spot |
| **Total spots** | |
| **Floor ($, optional)** | Pack-sack only, e.g. *700 (Hunters Hoard)* |
| **Description** | Notes for staff |

**Create draft** drops you straight into the detail view.

There's no template picker. To reuse a setup, open an existing game and use
**Clone**.

## The action bar

**Back to games** · **Push live** / **Pull to dev** · **Activate** · **Mark
complete** · **Archive** · **Clone** · **Export** · **Settings** · delete.

**Activate is disabled until the game has at least one prize.**

Confirmations worth reading before you click:

- Push live → *Push "X" live? Its leaderboard card will appear in the app for
  all users.*
- Complete → *Mark this game complete? Realized P/L is locked in.* No undo.
- Delete → *Delete "X"? Unawarded prize quantities will be returned to
  inventory. This cannot be undone.*

**Clone** creates a new draft but **does not navigate you to it** — go back to
the list to find it.

## Activating

The **Activate game** modal has a **Send push notification to all users**
checkbox, **checked by default**, with a body prefilled as
`{Name} is live — buy-in $X.` capped at 160 characters. The push goes out titled
`🎮 {Name} is live`.

If the push fails the game still activates — you'll see *Game activated, but the
push notification failed.*

## Economics

Cards for **Projected revenue** (becomes **Revenue** once complete), **Prize
cost basis**, **Projected margin** / **Realized margin**, **Prize pool**
(chase and slab counts, plus how many are awarded), and — when a floor is set —
**Floor compliance**.

If the floor isn't met you get a warning telling you the average market value
per spot and what the floor is: *Add more high-value prizes before activating.*

## Contents at market

**Check market** values every pack, slab and prize in the game at TCGplayer and
Scrydex market, and compares it with what the game takes in (buy-in × total
spots). Only a market confirmed as the right card counts (see
[Reprice](../catalog/reprice.md#is-it-the-right-card)). An item without one,
which today includes every slab, is counted at its store price instead and
shows as *at store*.

- *Takes in $X for $Y of contents (+Z%)* means the game is priced above its
  contents.
- **Priced below market** in red means the game takes in less than its contents
  are worth: raise the buy-in or change the prizes before activating.

Each item is listed with its market value and its store price. Hand-entered
prizes count at the value typed in. Items with no confirmed market price are
called out, and an item with no price at all means the total understates the
game. The prize's own
"market value" field is the store price when it was added, so it is not a
market check by itself.

Games are left out of [Reprice](../catalog/reprice.md); this is where their
contents get checked.

## The profit calculator

Collapsible planning tool. It uses its own target margin, saved onto the game
with **Save plan** — this is the number the linked row in
[Product Pricing](../catalog/product-pricing.md#game-rows) uses too.

Config: **Packs per sack** (default 5), the buy-in and spots (mirrored,
read-only), and a **Target margin** slider defaulting to 30%.

Summary: **Packs needed** (with a short/extra/exact read-out), **Avg pack
value**, **Prize pool cost**, **Revenue**, and **Margin**.

Two recommendations sit below: the max average pack value to break even, and the
max to hit your target margin.

### Pack mix

A table of pack values and counts — defaults are $8, $15, $25 and $40 at zero
each. **Add price tier** for another.

### Extras

Chases, slabs and cash bonuses as separate line items, each with a cost.

### Sack value range

Once the mix has packs: **Worst case**, **Average**, **Best case**, each
computed as packs per sack × the min/avg/max pack value. With a floor set, you
either get *Every sack clears the $X floor.* or a warning telling you the
worst-case sack falls short and what to do about it.

## Pack pool

The base packs that fill every sack — everything with the *pack* tier.

Stats: **Packs in pool**, **Cost basis**, **Market value**, **Cost per sack**,
**Margin at $X buy-in**.

Recommendations include a **Use as buy-in** button that writes the recommended
price straight onto the game.

Below that, a **Sources** list showing which inventory lines the packs came
from.

## Prize manifest

Everything that *isn't* a base pack — the chases and slabs. Each row shows its
tier (editable inline), item, quantity, cost, market value, and an **Award**
button.

Two ways to add:

- **Add from inventory** — a searchable picker filtered by TCG/series and tags.
  Only lines with stock appear, and you can't request more than is available.
  Adding decrements the inventory line.
- **Manual prize** — for off-platform prizes: cash, slabs you don't hold in
  inventory, and so on. The hint says it: *Items in your Product Pricing
  inventory should use the "Add from inventory" picker instead.*

Removing an inventory-backed prize returns the quantity to stock.

## Spots

**Add spot** takes a buyer name, an optional email, and notes. Nothing is
validated — a completely blank spot can be created, so be tidy.

Removing a spot asks *Remove spot for `{name}`?*

## Awarding

The **Award** button on a prize row asks who won it. If spots exist you pick
from a dropdown; if not, you type a name.

:::caution[Awards are recorded by name, not by ID]
The winner is stored as text. Renaming a spot breaks the link, and two buyers
with the same name are indistinguishable. Use emails or distinct names.
:::

## Export

**Export** downloads a CSV with a summary block, the full prize list with
awarded-to, and the full spot list.

## Errors

Most failures on this screen surface as browser alert dialogs. If you see one,
read it — it usually names the exact problem.
