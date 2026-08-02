---
title: Shows
sidebar_position: 4
description: The calendar of physical card shows — venues, budgets, and the public want-list.
---

# Show Management

> Track events, budgets, and sales performance

The calendar of physical card shows MoBros attends: where, when, what booth,
what it costs, and what you're looking to buy while you're there.

:::note This is not about live streams
Despite the name, Shows manages in-person events. Live streaming is under
[Notifications → Live Break](./live-breaks.md).
:::

## The numbers up top

**Upcoming Shows**, **Total Shows**, **Total Budget** (table + travel +
inventory across every show), **Total Spent** (including other expenses).

## Status is computed, not set

You don't pick a status. It's derived from the start and end dates:

| Status | When |
| --- | --- |
| **Upcoming** | The show hasn't started |
| **Happening Now** | Today falls between start and end |
| **Past** | The end date has passed |

Filters: **All Shows**, **Upcoming** (the default), **Past**. Today's shows
appear under All.

## A show card

The name, city and state, the display date, and the status badge. A star marks a
featured show. Quick stats show **Budget**, **Spent** and **Remaining** —
remaining goes red when you're over.

Expanding gives you **Venue Details**, a **Budget Breakdown** (spent against
budget per line for table, travel and inventory), the **Looking to Buy** list,
and the customer-facing **Notes**.

Private notes are stored but not shown in the expanded view.

## Adding a show

| Group | Fields |
| --- | --- |
| **Basic Information** | Show Name *(required)*, Venue, City, State, Booth Number, Latitude, Longitude |
| **Date & Time** | Display Date (free text, e.g. `Feb 15-16, 2025`), Start Date *(required)*, End Date *(required)*, Start Time, End Time |
| **Links** | Ticket URL, Event URL |
| **Budget** | Table, Travel, Inventory |
| **Expenses** | Table Cost, Travel Cost, Inventory Cost, Other Expenses |
| **Notes** | Show Notes (for customers), Private Notes (internal only) |

The latitude and longitude power directions in the app — worth filling in.

The **Display Date** is what customers actually see, so write it the way you'd
say it out loud. The start and end dates drive the status computation.

## Looking to Buy

The public want-list for that show. Added one item at a time:

| Field | Options |
| --- | --- |
| **Product Name** *(required)* | |
| **Set** | |
| **Type** | Single Card, Elite Trainer Box, Booster Box, Ultra Premium Collection, Sealed Product, Graded Card, Sticker Pack, Binder, Accessories |
| **Condition** | Sealed, Graded, Mint, Near Mint *(default)*, Lightly Played, Moderately Played, Heavily Played, Damaged |
| **Grader** | None, PSA, BGS (Beckett), CGC, SGC, ACE Grading |
| **Grade Value** | e.g. 10, 9.5, 9 |
| **Price** *(required)* | What you'll pay |
| **Quantity** | |
| **Image URL**, **Notes** | |

**Add to Looking to Buy List** needs at least a name and a price.

## Bulk import

**Download Template** gives you an Excel file with the right columns and two
sample rows showing how multiple want-list entries attach to one show.

**Import Excel** accepts `.xlsx`, `.xls` and `.csv`, and groups rows by show
name. The want-list columns are prefixed `Buy:` — `Buy: Card Name`, `Buy: Set`,
`Buy: Price`, and so on.

Start from the template rather than building a sheet from scratch; the column
names have to match.
