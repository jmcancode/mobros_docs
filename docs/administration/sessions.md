---
title: Sessions
sidebar_position: 3
description: Sign everyone, every customer or every staff member out of the app, mobrostc.app and the dashboard at once.
---

# Settings → Sessions

> Choose who has to sign in again. They're signed out of the app,
> mobrostc.app and this dashboard.

Sessions is the emergency exit. Use it after a staff member leaves, after a
password or account scare, or when a release needs everyone on fresh sign-ins.
It lives under **Settings → Sessions**.

:::warning[Admins only]
Only accounts with the **Admin** role see this tab. It isn't in the
[Roles & Access](./roles-and-access.md) grid, so it can't be granted to
anyone else, and the server checks the Admin role again on every sign-out.
:::

## Choosing who

The page lists three choices. Each row shows how many accounts it covers and
when it was last used (**Never** if it hasn't been).

| Choice | Who signs out | You too? |
| --- | --- | --- |
| **Everyone** | Customers and staff | Yes |
| **Customers only** | Every account without a staff role. Your team stays signed in. | No |
| **Staff only** | Everyone with a staff role | Yes |

Pick a row, then press the red button. It reads **Sign out everyone**,
**Sign out all customers** or **Sign out all staff** to match.

### Also disconnect Claude

When you pick **Everyone** or **Staff only**, a box appears: **Also disconnect
Claude**. Tick it to cut every Claude connection to the shop as well. The team
then has to reconnect the MoBros connector in Claude before they can use it
again. Who is allowed to connect at all is set on
[Claude Access](./claude-access.md); this only ends the connections that are
open now.

Leave it unticked for a customer-only sign-out. Claude connections are staff
only, so there's nothing to cut.

## The confirm step

A confirm box spells out what will happen before anything does:

- how many accounts will have to sign in again
- **Open apps and browsers sign out right away.**
- **Older app versions sign out within an hour.**
- **Claude connections to the shop are cut.** (only when ticked)
- **You'll be signed out too.** (Everyone and Staff only)

**Cancel** has focus, so pressing Enter by accident does nothing. Press the
red button in the box to go ahead.

## How fast it works

| Where | When the person is signed out |
| --- | --- |
| The current app, mobrostc.app, this dashboard | Within a second or two |
| Any request to the shop's API | Refused straight away |
| App versions from before this feature | Within about an hour |

A sign-out only ends sessions. Points, credit, orders and account settings
are all still there when the person signs back in.

If you signed yourself out, the dashboard sends you to the sign-in page with
a note saying why. Sign back in as normal.

## Recent sign-outs

Under the button is a list of recent runs: the choice, who started it and
when. A run that is still going shows **Signing out 1,200 of 4,800** and
updates every few seconds. When it finishes the row shows:

- how many accounts were signed out
- **signed back in**: people who had already signed in again before the run
  reached them. They're skipped on purpose, so nobody gets signed out twice.
- **failed**: accounts that couldn't be signed out. Hover the row for the
  reason.
- **Claude connections**: how many were cut, if you ticked the box
- **Stopped early** or **Claude not disconnected** if something went wrong

If a deploy or restart interrupts a run, it picks up where it left off.

## When to run it

Run a big sign-out when the shop is quiet. Signing out everyone in the middle
of a live break throws the stream team and every viewer back to the sign-in
screen. Check the live channels in [Professor Oak](../operations/professor-oak.md)
first, and prefer overnight.
