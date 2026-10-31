---
title: Hit Feed
sidebar_position: 3
description: Moderating the customer feed of card pulls.
---

# Hit Feed

:::caution[Not currently in the sidebar]
The **Hit Feed** nav item is switched off, so you'll need the URL (`/hit-feed`).
The screen, the role grant and the moderation endpoints all still work — only
the nav entry is hidden.
:::

:::info[Requires the Hit Feed feature]
See [Locked features](../getting-started/locked-features.md).
:::

> Customer hit feed — review posts and remove anything that violates community
> guidelines. Removing a post hides it from the app and notifies the author via
> push; it stays here under Removed and can be restored.

## The four states

| State | Meaning |
| --- | --- |
| **Needs Review** | Someone reported this and it hasn't been cleared since |
| **Clean** | Never reported |
| **Closed** | Reviewed and cleared |
| **Removed** | Soft-deleted. Hidden from the app, restorable |

Filter pills across the top with live counts: **All**, **Needs Review**,
**Clean**, **Closed**, **Removed**. The page opens on **Needs Review** — the
queue that needs you.

## What a post shows

The card name or title, the author, category and grade, a red flag badge with
the report count if it's been reported, the status badge, a reaction count, an
image carousel, the description, and the moderation reason if one was set.

**Reactions** are display-only counts: 🔥 Fire, ❤️ Heart, 😮 Wow, 👏 Clap,
💯 Hundred.

## Reading the reports

Posts with reports get a **Reports & comments (n)** panel, open by default.
Reports show in red with the reason and any details; comments show below in a
scrollable list.

Read the reports before you act. "Reported" with no details is often a
disagreement, not a violation.

## Your four actions

| Action | Available on | What it does |
| --- | --- | --- |
| **Close** | Needs Review | Clears it. Says "I looked, it's fine" |
| **Reopen** | Closed | Puts it back in the queue |
| **Restore** | Removed | Un-removes it and puts it back in Needs Review |
| **Remove** | Anything | Hides it from the app and pushes the author |

A **Clean** post gets only **Remove** — there's nothing to clear.

:::note[Closing a re-reported post keeps it in the queue]
If a post picks up new reports after you closed it, closing again won't stick —
it stays in Needs Review because the new reports haven't been reviewed.
:::

## Removing a post

The modal spells out what happens:

> Removing **`{card}`** by **`{author}`** hides it from the app and sends the author
> a push notification. It moves to the Removed tab here, where it can be
> restored.

- **Reason (optional — shown to the author)** — write one. A silent removal
  generates a support ticket; an explained one usually doesn't.
- **Also block this user from posting** — *For repeat or severe offenders. They
  keep normal app access but can no longer post to the Hit Feed.*

The button reads **Remove post** or **Remove & block** depending on the
checkbox.

Blocking is for patterns, not single incidents. It doesn't affect the customer's
ability to shop, earn points, or open tickets — only their ability to post.
