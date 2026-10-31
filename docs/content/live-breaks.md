---
title: Live breaks
sidebar_position: 2
description: Going live on the three stream channels, updating the title mid-stream, and ending a break.
---

# Live breaks

Found under **Notifications → Live Break**. Three independent channels, each
with its own live state and its own push copy.

| Channel | What it is | Push title when you go live |
| --- | --- | --- |
| **Live Break** | Main MoBros stream | `🔴 We're Live!` |
| **Stream Sports** | Sports cards stream | `🏈 Sports Cards Live!` |
| **Card House** | Card House stream | `🏠 Card House Live!` |

When any channel is live, a red pill appears in the sidebar of every screen, and
the [Dashboard](../operations/dashboard.md) pills light up.

## Going live

While offline, the status bar reads **Offline** / *No live break active*.

| Field | Notes |
| --- | --- |
| **Stream Title** *(required)* | Max 80 characters. At least 3 to enable the button |
| **TikTok URL** | *Users who tap the notification will open your TikTok stream* |
| **WhatNot URL** | Optional. Must be a real `whatnot.com` link, otherwise the hint turns red and Go Live stays disabled. A link pasted without `https://` is fixed for you |
| **Post to Discord** | Pick any number of webhooks — *Announces the stream in every selected channel when you go live* |

**Go Live & Notify All Users** confirms first:

> Go live on `{channel}` and notify ALL users? This sends a push notification to
> every user.

This is a push to your **entire** user base. There's no audience filter here.

:::tip[Streaming on TikTok and WhatNot at once]
Fill in both links. Customers get a button for each platform on the app's Home
banner, on the Sports and Card House cards, and on the website. Tapping the
push itself opens WhatNot.
:::

For the two secondary channels, a failed push doesn't block going live — the
banner still appears in the app.

## While you're live

The status bar shows **LIVE NOW**, elapsed time, and *Live banner is showing in
the app*.

**Live Title (editable — updates on the app in real time)** — changing it
updates the in-app banner immediately.

Below it, a checkbox: **Send a fresh push to users with the new title**, on by
default. Uncheck it to change the title silently — useful when you're just
fixing a typo.

The Discord picker is disabled when the push checkbox is off: *Turn the push on
above to also post the update to Discord.* There's no webhook-only send.

**Update Title & Notify** is only enabled when the title has actually changed.
If the break has a WhatNot link, the title-update push opens WhatNot too.

The stream links show under the title, labeled **TikTok ·** and **WhatNot ·**.

## Ending a break

**End Break** confirms *End `{channel}`? The live banner will be removed from the
app.*

It clears the live state and both stream links. **No push is sent** when a break
ends — customers just stop seeing the banner.

## Lock Screen and Dynamic Island

On iPhones running app version 1.2.0 or later (iOS 17.2 and up), a live break
also shows on the Lock Screen and in the Dynamic Island for customers who
have break reminders turned on. Nothing extra to do from here:

| You do | iPhones see |
| --- | --- |
| **Go Live** | The **On Air** card: the stream title, a running timer and a **Watch on WhatNot** button |
| **Update Title & Notify**, or a changed link | The card updates in place |
| **End Break** | The card reads **Ended** with the run time, then clears after 15 minutes |

Tapping the card or its button opens the app, which hands off to the WhatNot or
TikTok stream.

:::note[Switched off until the app update is out]
The server side ships switched off. It gets turned on once 1.2.0 is live in the
App Store, so until then going live works exactly as before.
:::

## Live state is shared

All three channels' live state is subscribed app-wide, so going live from one
browser updates the sidebar pill and the Dashboard for everyone else
immediately, and the mobile app at the same time.
