---
title: Automations
sidebar_position: 4
description: SLA timers, customer timeouts, and the acknowledgment messages sellers receive.
---

# Automations

Reached from the **Automations** button on
[Sell Requests](./sell-requests.md). Three things live here:

1. The message a seller gets the instant they submit something.
2. The SLA timers that nudge your team before a request goes stale.
3. The customer timeout that closes a request nobody responded to.

Saving is immediate and live everywhere — the timers on Sell Requests and
Tickets pick up the new numbers straight away.

:::warning[If it says "showing defaults"]
When the config can't be loaded you'll see *Couldn't load automations. Showing
defaults.* and the editor fills with the shipped defaults. **Don't save from
that state** — you'll overwrite whatever the real config was with the defaults.
Reload the page first.
:::

## The four queues

Everything below is configured per queue:

- **Item Submissions**
- **Collection Uploads**
- **Home Visits**
- **Support Tickets**

## 1. Customer acknowledgment

*Sent to the seller the instant a new request comes in.*

A master **Enabled** toggle, then one card per submission kind:

| Card | When it fires | Tokens you can insert |
| --- | --- | --- |
| **Sell List** | Multiple cards submitted together | `{name}` `{email}` `{count}` `{value}` |
| **Single Item** | One card submitted on its own | `{name}` `{email}` `{itemName}` |
| **Collection Upload** | Spreadsheet or collection link | `{name}` `{email}` `{count}` `{value}` |
| **Home Visit** | In-person pickup request | `{name}` `{email}` `{type}` `{value}` |

Each card has a **Title** (max 120 characters) and a **Message** (max 400), plus
clickable token chips that insert at your cursor. A live iOS-style push preview
sits alongside, filled with sample data, and a **Test** button sends the real
thing to your device.

If a customer has no name on file, `{name}` renders as `there`.

### The shipped defaults

| Kind | Title | Body |
| --- | --- | --- |
| Sell List | `We got your cards! 📦` | *Thanks `{name}` — we received your `{count}`-item sell list (est. `{value}`). Our team will review it and send offers shortly.* |
| Single Item | `Submission received ✅` | *Thanks `{name}` — we got `{itemName}` and will review it and send you an offer soon.* |
| Collection | `Collection received 📚` | *Thanks `{name}` — your collection of `{count}` items (est. `{value}`) is in our queue. We'll review it and reach out shortly.* |
| Home Visit | `Home visit request received 🏠` | *Thanks `{name}` — we got your home visit request for your `{type}` collection (est. `{value}`). Our team will reach out to coordinate.* |

## 2. SLA watch

*Row timers turn amber at "warn", red at "overdue". Overdue fires a push to the
assignee and admins.*

**Alert recipients** — either **Assignee + admins** or **All admins**.
Unassigned items always fall back to all admins regardless.

Two hour values per queue. Defaults:

| Queue | Warn after | Overdue at |
| --- | --- | --- |
| Item Submissions | 24 h | 48 h |
| Collection Uploads | 24 h | 48 h |
| Home Visits | 12 h | 24 h |
| Support Tickets | 8 h | 24 h |

Values clamp between 1 hour and 2160 hours (90 days). If you set overdue below
warn you'll see *Overdue should be ≥ warn* — it's advisory and won't block a
save, but the timer won't behave sensibly.

**A request waiting on the customer is never counted as overdue.** That delay
isn't yours.

## 3. Customer timeout

*While a request waits on the customer the SLA clock is paused and this one runs
instead. One reminder goes out, then the request closes itself as "Timed Out".*

Each queue card lists which statuses it governs:

| Queue | Applies to | Remind at | Close after |
| --- | --- | --- | --- |
| Item Submissions | `approved`, `waiting-customer` | 72 h | 168 h (7 d) |
| Collection Uploads | `priced`, `waiting-customer` | 72 h | 168 h (7 d) |
| Home Visits | `scheduled`, `waiting-customer` | 24 h | 72 h (3 d) |
| Support Tickets | `waiting-customer` | 48 h | 120 h (5 d) |

Same 1–2160 hour clamp. Setting the reminder at or after the close time shows
*Reminder must land before the close* — again advisory, not blocking.

:::note[Received and Collected are not customer-wait]
Once the goods are in the building the delay is **ours**, so `received`
(submissions and uploads) and `collected` (home visits) deliberately sit outside
this list. The staff SLA clock runs on them, and an unpaid pile surfaces as
overdue rather than sitting quietly in a "waiting on them" bucket. See
[Sell Requests](./sell-requests.md) and the
[status reference](../reference/statuses.md#the-three-payout-stages).
:::

### When a lot closes at once

Each auto-closed request normally sends its own push to the admins and the
assignee. Past a handful in a single sweep — a first run after the scheduler was
down, say — they collapse into **one summary push per queue** instead, so a
backlog can't fire a hundred notifications at every admin.

### The reminder message

*Sent once, at "remind at", so the timeout is never a surprise.*

Default title `Still want to sell? ⏳`, body:

> Hey `{name}` — your `{queue}` request is still waiting on you. It'll close
> automatically in `{remaining}` if we don't hear back.

Tokens: `{name}` `{email}` `{queue}` `{remaining}`. Unlike the acknowledgment
cards, these are shown for reference but aren't clickable — type them.

## Saving

A sticky bar at the bottom reads **Unsaved changes**, **All changes saved**, or
**Saved — live everywhere**. **Reset** reverts to the last saved state;
**Save changes** writes it.
