---
title: Support Tickets
sidebar_position: 3
description: The customer support inbox — statuses, replies, assignment, and SLA.
---

# Support Tickets

Every ticket a customer files from the app, with the full reply thread. Live —
new tickets and other people's replies appear without a refresh.

Header: **Support Tickets** / *`{n}` total tickets*.

## Statuses

| Status | Meaning |
| --- | --- |
| **Open** | New, unclaimed |
| **In Progress** | Someone is on it |
| **Waiting Customer** | Ball is in their court; your clock pauses, theirs starts |
| **Resolved** | Answered; thread locks |
| **Closed** | Done; thread locks |
| **Timed Out** | A waiting-customer ticket aged out unanswered |

**Timed Out** is normally written automatically by the customer-timeout sweep,
but you can also set it by hand — every status is a button.

## Finding a ticket

Filter tabs across the top: **All**, Open, In Progress, Waiting Customer,
Resolved, Closed, Timed Out — each with a count.

Search: *Search by ticket #, subject, email…*

Tickets are always sorted newest first. There is no sort control and no bulk
actions on this screen.

## The list

Columns: **Ticket**, **Category**, **Customer**, **Status**, **Priority**,
**Created**, **Replies**, **Assignee**.

**Category** (Shipping, TikTok Order, Return, Refund, Discord, Product, Other)
and **Priority** (Low, Medium, High, Urgent) are set by the customer when they
file. Neither can be changed from this screen.

## Working a ticket

Expand a row for **Customer** details, any **Attachments** (thumbnails, open in
a new tab), a **Timeline** (created, updated, resolved, closed), assignment, and
the status buttons.

### Assignment

The **Assigned To** picker. Only Admin, GM and Shop Manager can change it;
everyone else sees *Only shop managers can change assignment*. Assigning pushes
a notification to that person (*🎫 Assigned: Support Ticket*).

### Replying

The **Message Thread** shows the customer's original description as the first
bubble, then every reply. Admin replies are attributed to **MoBros Support**.
Each message can carry its own attachments.

**Enter** sends, **Shift+Enter** adds a newline.

The thread locks on **Resolved** and **Closed** only. A **Timed Out** ticket is
finished for SLA purposes but its thread stays open.

### Notes

A **Notes to Customer** box with **Save Notes**.

:::caution[Check before you rely on this field]
The section is labelled *Notes to Customer* and the placeholder reads *Notes for
the Customers*, but it saves into the record's **internal notes** field. Confirm
with engineering whether the customer actually sees this before you put anything
in it you wouldn't want them reading — or anything you'd expect them to read.
:::

### Deleting

**Delete Ticket** asks *Delete this ticket? This cannot be undone.* and then
does exactly that. There's no soft delete and no undo.

## SLA

Tickets warn at **8 hours** and go overdue at **24 hours** by default. A ticket
in **Waiting Customer** pauses your clock and starts a **120-hour** customer
window, with a reminder at **48 hours**. All four numbers are configurable in
[Automations](./automations.md).

:::caution[Failures are quiet]
Status changes, note saves, assignment and delete all fail silently — you'll see
no error, the screen just won't change. Only the reply box surfaces an error
when a send fails. If a status button appears to do nothing, refresh and check
whether it actually took.
:::
