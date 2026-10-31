---
title: Signing in
sidebar_position: 1
description: The three sign-in methods, the staff check, and what to do when you're locked out.
---

# Signing in

The dashboard is at **[admin.mobrostc.info](https://admin.mobrostc.info)**. The
login card reads **Command Center** / *Staff sign-in. Access is granted by a
MoBros admin.*

There are three ways in, and they all land in the same place:

| Method | How |
| --- | --- |
| **Email and password** | Fill in **Email** and **Password**, then **Sign in** |
| **Google** | **Continue with Google**. An account chooser always appears, even if you're already signed into Google in that browser |
| **Apple** | **Continue with Apple** |

:::note[There's no sign-up]
The dashboard is invite-only. None of these methods creates an account — an
admin sets your access up first, and then you sign in. If you've never been
granted anything, signing in won't give you anything either.
:::

The Google account chooser is deliberate. Without it, the popup silently reuses
whichever Google account the browser is already signed into — which is how
people with two Google accounts get rejected with no idea why.

## Forgotten password

Type your email address into the **Email** field, then press **Reset password**.
You'll see *If `{your email}` has an account, a reset link is on its way.*

That wording is the same whether or not the address exists, on purpose — a
different answer for a real address would tell a stranger which emails have
accounts.

If you press it with the field empty you get *Enter your email address first,
then choose Reset password.*

## "No dashboard access for …"

If you see:

> No dashboard access for `you@example.com`. If your staff access is on a
> different account or sign-in method, use that one.

…then that account authenticated fine but carries **no staff role**. You were
signed back out immediately.

Two things to try, in order:

1. **Try your other account, or another method.** This is the common case — a
   personal Gmail got picked instead of the work account, or you have a password
   account and your roles are on the Google one.
2. **Ask an admin to check your record.** Your roles live on your user record
   and are edited from
   [Customer Detail → Roles & permissions](../community/customer-detail.md#roles--permissions)
   or from the **Who has access** roster on
   [Roles & Access](../administration/roles-and-access.md).

**Any** staff role gets you in — you don't need Admin. What you can *see* once
you're inside is a separate question, answered by
[What you can see](./what-you-can-see.md). Customer attributes (VIP, Verified,
Shopify User) are not staff roles and grant nothing.

## Other sign-in errors

| What you see | What it means |
| --- | --- |
| *Email or password is incorrect.* | Either the address has no account or the password is wrong — the message is the same for both, deliberately |
| *Enter your password.* | The password field was empty |
| *That doesn't look like a valid email address.* | Typo in the address |
| *Too many attempts. Wait a few minutes, or reset your password.* | Rate-limited after repeated failures |
| *This account has been disabled. Contact an admin.* | The account was switched off |
| *Your browser blocked the sign-in popup…* | Allow popups for the site, then retry Google or Apple |
| *That email already uses a different sign-in method.* | Use the method you originally set up |
| *Network problem — check your connection and try again.* | Connectivity |
| Nothing happens after clicking | You closed the Google or Apple popup. Click the button again |

Everything disables while a sign-in is in flight, so a second click can't race
the first.

## Getting signed out

You'll be signed out and returned to the login page automatically if your
session expires — any request that comes back unauthorised triggers an immediate
sign-out. This is normal after leaving the tab open overnight; just sign in
again.

To sign out on purpose, use **Sign Out** at the bottom of the sidebar.

## Signing in to this documentation site

These docs are staff-only too, and they use a **Google** sign-in — the same
Google account you'd use on the dashboard. The first time you open them you'll
get a **Sign in with Google** card.

:::caution[The docs gate is stricter than the dashboard]
The dashboard admits any staff role. This documentation site still requires the
**Admin** flag. So a Shop Manager who can sign into the dashboard may be
rejected here. If that's you, ask for the docs gate to be widened — it's a
one-line change on the docs site, listed in
[Access control](../developers/access-control.md#a-third-surface-the-docs-site).
:::

There's a **Sign out** link in the top right if you need to switch accounts or
hand a shared machine to someone else.
