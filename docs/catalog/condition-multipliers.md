---
title: Condition Multipliers
sidebar_position: 4
description: The haircut off Near Mint applied to raw cards, per category.
---

# Condition Multipliers

Lives at the bottom of the [Buy Rates](./buy-rates.md) page. The formula is
stated right on the screen:

> Applied to the NM market price: **offer = market × buy rate × condition %**.
> NM is the anchor; played grades are your haircut off NM. Graded cards ignore
> this — the grade already encodes condition.

## The grades

| Grade | | Default |
| --- | --- | --- |
| **NM** | Near Mint | 100% |
| **LP** | Lightly Played | 85% |
| **MP** | Moderately Played | 70% |
| **HP** | Heavily Played | 55% |
| **DMG** | Damaged | 35% |

## Worked example

A card with a $100 NM market price, in a category with a 70% buy rate, in
Moderately Played condition:

```
$100 × 0.70 × 0.70 = $49
```

That's your starting offer. Negotiation from there is the same as any other buy.

## Setting it up

If the table hasn't been seeded yet you'll see:

> Condition multipliers are not set up yet. Seeding turns on condition-aware raw
> pricing (defaults: NM 100 · LP 85 · MP 70 · HP 55 · DMG 35). You can fine-tune
> every value afterward.

**Seed defaults** creates four categories at once — `default`,
`pokemon-singles`, `raw-singles`, and `one-piece` — each on the full ladder.

## Editing

The table gives you a percentage box per grade per category (0–100, whole
numbers). Save is disabled until the row is dirty and every value is valid.
**Enter** in any cell saves that row; a saved row flashes briefly.

**Add Category** creates a new one on the default ladder. Removing one asks
*Remove "{Name}" condition multipliers?*

## Which category applies

Each buy category can have its own ladder. `default` is the fallback for
anything without a specific one — so you can be harsher on played Pokémon
singles than on played One Piece without touching everything else.
