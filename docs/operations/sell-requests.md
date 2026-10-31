---
title: Sell Requests
sidebar_position: 2
description: Item submissions, home visits, and collection uploads — pricing, negotiating, and closing them out.
---

# Sell Requests

Every way a customer offers to sell to the shop lands here: single cards
submitted from the app, in-person home-visit requests, and large collection
uploads. You price them, negotiate, assign them, take the goods in, pay the
seller, and close them out.

:::info[The finish line is "Paid", not "Approved"]
A sell request runs **Pending → In Review → Approved → Received → Paid**. Each
queue words the middle step in its own terms — cards are *received* in the mail,
a home visit is *collected* at the door — but it's the same stage, and **Paid**
is the only true end.

Saying yes isn't finishing. Taking the cards in isn't finishing either; that's
the point at which the shop owes somebody money.
:::

Three sub-views, switched with the toggle under the header:

| Button | What's in it |
| --- | --- |
| **Item Submissions** | One card at a time, submitted from the app |
| **Home Visits** | In-person pickup requests for high-value collections |
| **Uploads** | Spreadsheets and collection links |

The **Automations** button, top right, opens the
[SLA and acknowledgment editor](./automations.md).

## The command bar

Three rows of tiles above the queues. Every tile carries an **info** button
spelling out exactly which statuses it counts, so there's never a question of
what a number means.

### Row 1 · Live — what the team owes right now

| Tile | Counts |
| --- | --- |
| **Open requests** | Everything still in play across all three queues — anything not yet paid, rejected, cancelled, timed out or no-show |
| **Overdue · SLA breach** | Open requests past their queue's breach window. Customer-wait requests excluded |
| **Awaiting first response** | Still in their opening status with no assignee — nobody has touched them |
| **On customer** | Approved, priced, scheduled or waiting-customer. Your clock is paused; theirs is running |
| **Avg age · open** | Mean time since creation across open requests. Not time-to-close |
| **Pipeline value** | What the open queue is worth if every request lands |
| **Per-queue breakdown** | Open count per queue, with a purple badge for customer-wait and a red one for overdue |

### Row 2 · Money out — the payout ledger

| Tile | Counts |
| --- | --- |
| **Pending delivery** | We said yes, the goods haven't arrived. Approved items, priced uploads, scheduled visits. Nothing is owed yet |
| **Pending payment** | Goods are in the building and the seller isn't paid. **This is money owed right now**, and it goes loud when it isn't zero |
| **Paid out** | Everything actually paid, all time, split by method underneath |

**Paid out** uses the recorded payout amount where there is one, falling back to
the agreed offer. A payout recorded before the method picker existed is bucketed
as *unrecorded* rather than silently attributed to a method nobody chose.

### Row 3 · Outcomes — what's been decided

| Tile | Counts |
| --- | --- |
| **Accepted value** | Every request we said yes to, all time — approved, received and paid alike |
| **Rejected value** | Rejected items and declined uploads and visits. Drop-offs excluded |
| **Accepted / rejected by type** | Which product types win and lose, busiest first. Item submissions only |

:::note[Rows 2 and 3 overlap on purpose]
A request counts as **accepted** the moment you say yes, and stays counted
through received and paid. So **Accepted value** is the commitment and
**Paid out** is what has actually left the drawer — reading them together is the
point. Row 1 is the one that excludes finished requests, so it never
double-counts against either.
:::

---

## Item Submissions

Live — other people's changes appear without a refresh.

### Statuses

| Status | Meaning |
| --- | --- |
| **Pending** | Just arrived, nobody has touched it |
| **In Review** | Someone is working it |
| **Waiting on Customer** | Ball is in their court; your clock pauses |
| **Approved · Awaiting Delivery** | Offer accepted — waiting for them to ship |
| **Received · Unpaid** | The cards are physically here. **We owe the seller money** |
| **Paid** | Payout recorded. Terminal |
| **Rejected** | You passed |
| **Cancelled** | Closed with a reason |
| **Timed Out** | Aged out without a customer response |
| **No Show** | They never followed through |
| **Declined** | Legacy value written by the mobile admin app. Displays, but you can't set it here. |

The badge carries the full label; the filter tabs use the short form
(**Approved**, **Received**) so the row doesn't crowd.

:::warning[Two stages people mistake for the end]
**Approved** stays open — you're waiting on the customer to ship, and it can
still age into **Timed Out**. **Received** stays open too, and this one matters
more: the customer has done their part, so your SLA clock starts running again
and an unpaid pile shows up as **overdue**. It is not parked in a quiet
"customer's problem" bucket.
:::

### Filtering and search

Tabs across the top: **All**, then one per status, each with a live count. A
divider splits them: everything before it is the deal progressing, everything
after is a way it stopped.

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
- **Save**
- One **Status** menu for the whole lifecycle

### The status menu

A request has exactly one status, so one control sets it. The menu groups the
options the way you think about them:

| Group | Options |
| --- | --- |
| **Pipeline** | In review · Approved · Awaiting delivery · Rejected |
| **Fulfilment** | Received · Unpaid · Paid · Complete… |
| **Didn't pan out** | Waiting on customer · No show · Timed out · Cancel… |

An option ending in **…** opens a dialog instead of writing straight away —
**Paid** needs an amount and a method, **Cancel** needs a reason.

Arrow keys walk the list and open on whatever the current status is. Options
that can't be picked say why on hover.

:::note[Some transitions need an offer first]
**In review**, **Approved** and **Rejected** quote a number, so they're disabled
until the offer is valid — *Enter a valid offer amount first*. The "didn't pan
out" options deliberately work without one, so you can always clear a stale row
nobody ever priced.
:::

### Recording a payout

Choosing **Paid · Complete** opens **Record payment**:

| Field | |
| --- | --- |
| **Amount paid** | Prefilled with the agreed offer. The caret lands here, so the common case is one keystroke away |
| **Method** | Cash · Store Credit · PayPal · Zelle · Venmo · Check · Other |
| **Paid on** | Defaults to today. Can't be in the future |
| **Reference** | Optional — *Check #, transaction ID…* |

A method is **required**; a payout with no method isn't aggregatable, which is
the whole reason the dialog exists.

If the amount differs from the offer, the dialog flags it live —
`−$12.00 vs offer (−8.0%)`. That's not an error. Settling slightly off the quote
because the condition came back worse at the counter is legitimate; it just
shouldn't happen silently. Once recorded, the row shows a receipt: the amount,
the method, the date, who recorded it, the reference, and the variance against
the offer.

The dialog stays open and disabled while the write runs, so a slow network can't
produce two payout records.

### Shipping and tracking

When a customer accepts an offer they ship the whole list at once, so tracking
lives on the session rather than the individual card. The customer group shows
it inline: an **Accepted · not shipped** or **Shipped** badge, the carrier and
tracking number as a link (USPS, UPS and FedEx are recognised from the number's
shape), the ship date, or *Waiting for the customer to ship* /
*No tracking number added* when there's nothing to link to.

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

The thread locks once the submission is genuinely finished — paid, rejected,
declined, cancelled, timed out, or no-show. It stays **open on Approved and on
Received**, because those are exactly the moments you're chasing a shipment or
arranging a payout.

---

## Home Visits

Requests for someone to come look at a collection in person.

:::note[Not live]
Home Visits loads once and doesn't subscribe. Use the **Refresh** button to see
someone else's changes.
:::

### Statuses

**Pending**, **Contacted**, **Scheduled**, **Waiting on Customer**,
**Collected · Unpaid**, **No Show**, **Timed Out** — each a button in the
**Update Status** row, plus **Cancel…** and **Mark Paid** for their dialogs.

A home visit ends the same way every other sell request does: goods in, seller
paid. **Collected** is this queue's word for *received* — the cards are in your
hands at the door — and **Paid** closes it.

:::caution[Completed is no longer offerable]
**Completed** is terminal, so a visit closed that way leaves the queue having
never been marked collected or paid. No payout record, invisible to every money
tile. It still renders on historical records, but the route now is
**Collected → Mark Paid**.
:::

**Confirmed** and **Declined** are legacy values that display but can't be set
here.

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
**Waiting on Customer**, **Received · Unpaid**, **Paid**, **Declined**,
**No Show**, **Timed Out**, **Cancelled**.

**Received** and **Paid** mean exactly what they mean on item submissions.
**Completed** is kept only for uploads closed before those two stages existed.

The **Update Status** row has a button for each offerable status, plus
**Cancel…** and **Mark Paid** for their dialogs.

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

Upload threads lock on the queue's real terminal set — paid, completed,
declined, cancelled, timed out or no-show. (They used to lock on Completed or
Declined alone, which left the composer open on paid, cancelled and timed-out
uploads.)

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
- **Taking the goods in restarts your clock.** `Received` and `Collected` are
  *not* customer-wait statuses. Once the cards are in your hands the ball is
  back in your court, so an unpaid pile shows as overdue rather than parked.
- **A finished request stops its clock where it finished.** "Resolved in" on a
  closed row is measured to the moment it closed, not to now.
