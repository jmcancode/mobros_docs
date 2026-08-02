---
title: Notifications
sidebar_position: 1
description: Sending push notifications, targeting audiences, deep links, webhooks and history.
---

# Notifications

> Send push notifications and manage live breaks

Three tabs: **Send**, **History**, and **Webhooks**. Going live is covered
separately in [Live breaks](./live-breaks.md).

:::note There is no scheduling
Every send is immediate. There is no send-later, and there are no saved message
templates — the **Notification Type** list sets a category, not prewritten copy.
:::

## Composing a push

### Target Audience

| Option | Who gets it |
| --- | --- |
| **All Users** | Everyone |
| **VIP Members** | VIP tier only |
| **Specific User** | One person, chosen by search |

### TCG Filter

Only appears for **All Users**. Chips for **All TCGs**, **Pokémon**,
**One Piece**, **Lorcana**, **Yu-Gi-Oh!**, **Magic: The Gathering**, and
**Sports Cards**.

> Only notify fans of this game. Leave as "All TCGs" to reach everyone.

### Recipient

For **Specific User**, a search box — *Search by name or email…* — needing at
least two characters. Results show the display name, a **VIP** badge where
relevant, and the email.

A red **No token** badge means that person has no device registered for pushes.
You can still send, but you'll be asked to confirm: *… has no FCM token — push
will not deliver. Send anyway?*

### Notification Type

**System / General**, **Order Update**, **Live Break**, **New Arrivals**,
**Exclusive Deal**, **Restock Alert**, **Price Drop**, **Social Activity**,
**Mo'Rewards**.

The type matters — customers can turn individual categories off in their
notification preferences.

### Attach Product

Appears only for **Restock Alert**, **New Arrivals** and **Price Drop**. Search
the catalog and pick one.

> Tapping the notification opens this product in the app.

Switching to any other notification type clears the attachment.

### WhatNot Link

Optional, any type. Must be a real `whatnot.com` URL — an invalid one shows
*Enter a valid whatnot.com link, or clear the field.* and disables the send
button.

:::caution WhatNot beats the product link
If you set both, the app warns you: *WhatNot link takes precedence — tapping the
push opens WhatNot, not the attached product.* Pick one.
:::

### Title and message

**Notification Title** is capped at **80** characters, **Message** at **160**,
both with live counters.

### Discord

If you have Discord webhooks configured, a row of buttons lets you mirror the
push into one of them. **None** is the default.

### Sending

**Send Push Notification**. On success you get *Sent — N delivered*, plus
`· Discord posted ✓` or `· Discord failed` if you mirrored it.

The form clears the title, message and WhatNot link, and resets the recipient,
product and webhook selections.

## History

The last 50 sends. Each row shows a green or red status dot, the title, the
body, and badges for the type, the target (with the TCG filter appended), a
**WhatNot** badge where relevant, and the delivered count.

## Webhooks

> Forward notifications to external channels like Discord or Slack.

**Add Webhook** takes:

| Field | |
| --- | --- |
| **Name** | e.g. *Discord #announcements*, max 60 characters |
| **Webhook URL** | The Discord or Slack endpoint |
| **Platform** | **Discord** or **Shippo API** |
| **Notification Types** | **All Types**, or pick specific ones |

> Select which notification types forward to this webhook. "All Types" catches
> everything.

Each row can be edited, enabled or disabled, sent a test message, or deleted
(*Delete webhook "{name}"? This cannot be undone.*).

Only **enabled Discord** webhooks appear in the Send tab's Discord picker.
