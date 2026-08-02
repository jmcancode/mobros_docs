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
| **Post to Discord** | Pick any number of webhooks — *Announces the stream in every selected channel when you go live* |

**Go Live & Notify All Users** confirms first:

> Go live on {channel} and notify ALL users? This sends a push notification to
> every user.

This is a push to your **entire** user base. There's no audience filter here.

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

## Ending a break

**End Break** confirms *End {channel}? The live banner will be removed from the
app.*

It clears the live state and the TikTok URL. **No push is sent** when a break
ends — customers just stop seeing the banner.

## Live state is shared

All three channels' live state is subscribed app-wide, so going live from one
browser updates the sidebar pill and the Dashboard for everyone else
immediately, and the mobile app at the same time.
