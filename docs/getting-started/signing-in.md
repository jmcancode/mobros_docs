---
title: Signing in
sidebar_position: 1
description: Google sign-in, the admin check, and what to do when you're locked out.
---

# Signing in

The dashboard is at **[admin.mobrostc.info](https://admin.mobrostc.info)**.
Sign-in is **Google only** — there is no email-and-password option and no other
provider.

## The flow

1. Open the dashboard. If you aren't signed in, you land on the login card,
   which reads **MoBros Admin** / *Sign in with your MoBros Google account*.
2. Click **Sign in with Google**. A Google account chooser always appears, even
   if you're already signed into Google in that browser.
3. The dashboard looks you up in the user directory and checks your access flag.
4. On success you land on the [Dashboard](../operations/dashboard.md).

The account chooser is deliberate. Without it, the popup silently reuses
whichever Google account the browser is already signed into — which is how
people with two Google accounts get rejected with no idea why.

## "No admin access for …"

If you see:

> No admin access for `you@example.com`. If you have admin on another Google
> account, sign in with that one.

…then the account you picked doesn't carry the admin flag. Two things to try,
in order:

1. **Sign in with your other Google account.** This is the common case — a
   personal Gmail got picked instead of the work account, or vice versa.
2. **Ask an admin to check your record.** Your access flag lives on your user
   record and is edited from
   [Customer Detail → Roles & permissions](../community/customer-detail.md#roles--permissions).

:::warning Login is stricter than the rest of the app
The route guards inside the dashboard are written to admit any staff role, but
the **login screen itself currently requires the Admin flag**. In practice that
means non-admin staff can't get past sign-in yet, even if their role would give
them tabs once inside. If you're rolling out a new staff role, expect to grant
Admin as well until that gap closes.
:::

## Other sign-in errors

| What you see | What it means |
| --- | --- |
| Nothing happens after clicking | You closed the Google popup. Click the button again. |
| *Sign-in failed. Please try again.* | Something else went wrong — usually a blocked popup or a network hiccup. Allow popups for the site and retry. |

## Getting signed out

You'll be signed out and returned to the login page automatically if your
session expires — any request that comes back unauthorised triggers an immediate
sign-out. This is normal after leaving the tab open overnight; just sign in
again.

To sign out on purpose, use **Sign Out** at the bottom of the sidebar.

## Signing in to this documentation site

These docs are staff-only too, and they use the same Google account. The first
time you open them you'll get a **Sign in with Google** card — pick the same
account you use for the dashboard and you're in.

A few differences worth knowing:

- The docs accept **any staff role**, not just Admin. If the dashboard lets you
  in, the docs will.
- Your docs session lasts about half a day and ends when you close your
  browser. On a shared shop machine, closing the browser signs you out.
- There's a **Sign out** link in the top right of the docs if you need to
  switch accounts or hand the machine to someone else.

If sign-in is rejected here but works on the dashboard, it's the same fix: check
which Google account the chooser picked.
