---
title: Customer Detail
sidebar_position: 2
description: One customer's full record — profile, roles, verification, rewards and device info.
---

# Customer Detail

Everything about one member. Reached by clicking a row on
[Customers](./customers.md).

Top bar: **Back to customers**, **Reload**, and **Save changes** — the last one
disabled until you've changed something.

## Identity and contact

First name, last name, display name, username, avatar URL, bio, date of birth,
email, phone, and the Shopify customer ID.

Blank text fields save as empty. Profile edits write directly when you press
**Save changes**.

## Roles & permissions

Thirteen toggles. Ten are staff roles that open the dashboard; three are
customer attributes that grant nothing.

Full descriptions of each are in
[What you can see](../getting-started/what-you-can-see.md).

:::warning Turning on a staff role grants dashboard access
Any of the ten staff toggles lets that person into the Command Center. Grant
deliberately.

Two things that *don't* happen: flipping **Admin** here does not expose the
**API Keys** or **Roles & Access** settings tabs — those are gated by an
explicit account allowlist, not by role.
:::

:::note Concurrent edits clobber each other
Saving writes the whole roles map at once. If two people edit the same customer
simultaneously, the second save wins outright.
:::

## Identity verification

An admin-only card for running ID checks. Status runs **Not requested →
Requested → Submitted → Approved / Rejected**, with an audit trail of who
requested it and when.

| Button | When |
| --- | --- |
| **Request ID Verification** | Nothing requested yet, or previously rejected |
| **Resend Request** | Already requested, nothing submitted |
| **Review Submission** | They've uploaded |

**Requesting** asks for an internal-only reason and tells the customer:
*The customer will be notified to upload a selfie and their state ID.*

**Reviewing** shows both images — **Selfie** and **State ID** — with
**Approve** and **Reject**. Rejecting requires a reason, and that reason is
**shown to the customer**, so write it accordingly.

Approving also sets the customer's **Verified** badge.

If the push notification fails, the decision still saves — you'll get
*Saved, but failed to notify customer — they'll see the prompt on next app
open.*

## Notification preferences

Eight in-app toggles (push, order updates, price drops, restock alerts, new
arrivals, exclusive deals, break reminders, social activity), plus **Email
marketing** and **SMS marketing**.

## Favorite categories

Chips for the standard games and sports. Anything else the customer has picked
up appears under **Custom:** — click to remove. **Add custom category…** adds
one; entries are lowercased and de-duplicated.

## Rewards

The tier badge, a progress bar to the next tier (or **Top tier reached**), the
daily redemption bar if a cap applies, and a stats grid: points, store credit,
lifetime points, lifetime cash spent, total redeemed, orders, amount spent,
redemption rate, last earned, last redeemed.

**Sync Shopify credit** pulls their store credit balance from Shopify.

### The Manage panel

**Manage** opens four modes:

| Mode | What it does |
| --- | --- |
| **Adjust** | Add or remove points |
| **Bonus** | Award bonus points with a source — Manual, Signup, Birthday, Promo, or Migration — and an optional description |
| **Credit** | Add or remove store credit |
| **Tier** | Set a tier floor |

A **tier floor** grants that tier's benefits without granting points. The hint
on screen explains it: *A floor grants that tier's benefits; it never lowers a
tier the customer already earns, and can be cleared anytime.*

A **Reason (audit trail)** is required for point adjustments, store credit
removals, and tier changes.

## Rewards activity

The full points ledger, up to 100 entries. Each row shows the description, when
it happened, the source, the related order, and the signed amount. Store credit
entries appear here too.

## Device & activity

Read-only. Last login, device brand and model, OS, device ID, push platform,
last known location, account timestamps, and the customer's granted permissions
(notifications, camera, location, photos, tracking).

Useful when a customer says pushes aren't arriving — check whether notifications
are `granted` and whether there's a recent push platform timestamp.
