---
title: Sell Requests
sidebar_position: 2
description: Item submissions, home visits, and collection uploads — pricing, negotiating, and closing them out.
---

# Sell Requests

Every way a customer offers to sell to the shop lands here: single cards
submitted from the app, in-person home-visit requests, and large collection
uploads. You price them, negotiate, assign them, and close them out.

Three sub-views, switched with the toggle under the header:

| Button | What's in it |
| --- | --- |
| **Item Submissions** | One card at a time, submitted from the app |
| **Home Visits** | In-person pickup requests for high-value collections |
| **Uploads** | Spreadsheets and collection links |

The **Automations** button, top right, opens the
[SLA and acknowledgment editor](./automations.md).

---

## Item Submissions

Live — other people's changes appear without a refresh.

### Statuses

| Status | Meaning |
| --- | --- |
| **Pending** | Just arrived, nobody has touched it |
| **In Review** | Someone is working it |
| **Waiting on Customer** | Ball is in their court; your clock pauses |
| **Approved** | You've made an offer they accepted — waiting for them to ship |
| **Rejected** | You passed |
| **Cancelled** | Closed with a reason |
| **Timed Out** | Aged out without a customer response |
| **No Show** | They never followed through |
| **Declined** | Legacy value written by the mobile admin app. Displays, but you can't set it here. |

:::warning "Approved" is not finished
An approved submission stays open, because you're now waiting on the customer to
actually ship the cards. It can still age into **Timed Out**. Don't treat
Approved as a closed state.
:::

### Filtering and search

Tabs across the top: **All**, then one per status, each with a live count.

Search placeholder: *Search by name, email, set…* — matches the item name,
customer email, card set, and category.

### How rows are grouped

Submissions are grouped **per customer**, with the most recently active customer
first. The group header shows counts (`{n} open`, `{n} on customer`,
`{n} rejected`, `{n} stalled`), the total market value and total offered, and
who it's assigned to.

### Assignment

The **Assigned To** picker sits at the top of each customer group. Assigning
applies to **every submission in that group** at once, and pushes a notification
to the person you assigned it to (*📋 Assigned: Sell Request*).

Only Admin, GM and Shop Manager can change assignment. Everyone else sees the
picker disabled with *Only shop managers can change assignment*.

A group only displays an assignee if all its submissions share the same one —
mismatched legacy data shows as unassigned.

### Working a submission

Expand a row for **Card Details** (name, type, set, card number, condition,
category, price source), **Pricing** (market price, current offer, buy rate as a
percentage of market, plus tappable images), and **Submission** metadata.

The review panel gives you:

- **Adjust Offer** — a dollar amount, with a live `{x}% of market` badge
- **Review Notes** — *Notes visible to the customer*
- **Save**, **In Review**, **Approve**, **Reject**
- A secondary row headed **Didn't pan out**: **Waiting on Customer**,
  **No Show**, **Timed Out**, **Cancel…**

**Save**, **In Review**, **Approve** and **Reject** all require a valid offer of
zero or more. If those buttons are dead, that's why. The "didn't pan out"
actions deliberately work without an offer so you can clear stale rows nobody
ever priced.

### Cancelling

**Cancel…** opens a dialog asking for a reason:

| Reason | |
| --- | --- |
| Customer changed mind | Sold elsewhere |
| Price disagreement | Condition didn't match |
| Customer unresponsive | Out of service area |
| Duplicate request | Other |

A note is optional except on **Other**, where it's required. The cancellation
reason and note appear on the row afterwards.

### The negotiation thread

The right-hand column is a live message thread with the customer. You can attach
a counter offer to any message — it renders in the bubble as `Counter offer: $X`
and shows a `{x}% of market` badge as you type.

**Enter** sends, **Shift+Enter** adds a newline. Admin messages are attributed
to **MoBros Support**.

The thread locks once the submission is genuinely finished — rejected, declined,
cancelled, timed out, or no-show. It stays **open on Approved**, because that's
exactly when you're chasing the shipment.

---

## Home Visits

Requests for someone to come look at a collection in person.

:::note Not live
Home Visits loads once and doesn't subscribe. Use the **Refresh** button to see
someone else's changes.
:::

### Statuses

**Pending**, **Contacted**, **Scheduled**, **Waiting on Customer**,
**Completed**, **No Show**, **Timed Out**, **Cancelled** — each a button in the
**Update Status** row, plus **Cancel…** for the dialog. **Confirmed** and
**Declined** are legacy values that display but can't be set here.

Status changes route through the backend, because each transition sends the
customer a push.

### Search and detail

Search: *Search by email, address, type…*

Expanding a row gives you **Contact** (email, phone, address), **Collection**
(estimated value and quantity, types, description, photo) and **Visit**
(preferred date and time, timestamps, admin notes).

Collection types are Pokémon, One Piece, Magic, Yu-Gi-Oh!, Sports, Sealed,
Graded, and Mixed.

### Errors

A failed load shows *Couldn't load home visit requests. Check your connection
and retry.* with a **Retry** button. A failed status change shows
*Couldn't update status — try again.*

---

## Uploads

Spreadsheets and collection links customers submit for bulk review. Live, like
Item Submissions.

### Statuses

**Pending Review** (the starting state), **In Review**, **Priced**,
**Waiting on Customer**, **Completed**, **Declined**, **No Show**,
**Timed Out**, **Cancelled**.

The **Update Status** row has a button for each except Pending Review, plus
**Cancel…**.

### Search and detail

Search: *Search by email, file, link…*

Expanding gives you **Submission** (email, phone, source, assignee, timestamps),
**File** (name, type, row count, parsed count, estimated total value, and a
**Download file** link) and **Collection Link** (the link, admin notes, and any
parser warnings as yellow chips).

### The customer thread

Same mechanics as submissions, with one difference: the offer field is a
**lump-sum offer for the whole lot**, and the badge reads `{x}% of est.` against
the estimated total rather than a per-card market price.

:::caution Upload threads lock differently
An upload thread only locks on **Completed** or **Declined**. Cancelled, timed
out and no-show uploads stay writable — unlike submissions, where all of those
lock. If a thread you expected to be closed is still open, this is why.
:::

---

## Things that catch people out

- **A status change resets the SLA clock.** It rewrites the last-status
  timestamp and clears the warn, breach and reminder flags. Bouncing a request
  between statuses restarts its timer and re-arms the customer nudge.
- **Waiting on Customer pauses your clock and starts theirs.** No warn or breach
  push fires, the row doesn't count as overdue, and the customer timeout begins.
  See [Automations](./automations.md) for the windows.
- **Assignment notifications are best-effort.** If the push fails, the
  assignment still stands.
