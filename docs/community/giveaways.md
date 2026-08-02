---
title: Giveaways
sidebar_position: 5
description: Publishing prize drops to the mobile app's giveaway feed.
---

# Giveaways

> Drops shown in the mobile app's giveaway feed

:::danger This is a content editor, not a drawing engine
The dashboard does **not** pick winners, does **not** count entries, and does
**not** notify anyone. You run the draw yourself, then come here and type the
winner's handle in. **Total Participants** is a number you type, not a live
count.
:::

## The list

Stat cards: **Total**, **Live**, **Coming Soon**, **Ended**. Filter tabs for
each, with counts.

Cards are ordered by draw date, newest first, and update live. Each shows the
prize image, status badge, title, prize name, value, draw date, entry count and
a fixed **1 entry / account**. Ended giveaways with a winner show the handle.

## The editor

| Field | Notes |
| --- | --- |
| **Title** *(required)* | e.g. *Black Bolt Mythic Drop* |
| **Status** | Coming Soon / Live / Ended |
| **Prize Name** *(required)* | e.g. *PSA 10 Charizard* |
| **Prize Value ($)** *(required)* | Must be zero or more |
| **Prize Image** *(required)* | Upload a file or paste a URL. Images must be under 10MB |
| **Draw Date / Ends At** *(required)* | Date and time |
| **Winner Handle (if ended)** | Typed in after you run the draw |
| **Description** | *Short pitch shown on the giveaway detail page* |
| **Shipping Note** | e.g. *Ships free in the US within 7 days of draw* |
| **Official Rules** | Numbered rows, **Add rule** for another. Blank rows are dropped on save |
| **Sponsor Name** | Defaults to *MoBros* |
| **Total Participants** | Typed manually. Blank saves as 0 |

## Compliance — read this before you change anything

The editor carries a fixed block headed **Apple Guideline 5.3**:

> Every registered account receives exactly one entry. Purchases, points, and
> tiers cannot influence odds.

And the disclaimer the app shows entrants:

> No purchase necessary to enter or win. Must be a registered account holder to
> participate. {Sponsor} is the sole sponsor of this giveaway. Apple Inc. is not
> a sponsor and is not involved in this promotion in any capacity.

Weighted or tiered entries based on points or spending were deliberately
removed, because they reclassify the app as a lottery. Don't try to reintroduce
them by running a parallel scheme off-platform and describing it in the rules
field.

## Lifecycle

**Coming Soon → Live → Ended**, entirely manual. The status is a dropdown you
change, and the draw date does **not** flip anything automatically. If a
giveaway is over, someone has to come here and mark it Ended.

Deleting asks *Delete "{title}"? This cannot be undone.*

:::note A missing draw date sorts oddly
The list is ordered by the ends-at date. A record with a missing or malformed
draw date can sort strangely or fall off the top of the list.
:::
