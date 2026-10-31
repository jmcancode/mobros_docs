---
title: Roles & Access
sidebar_position: 1
description: The grid editor that decides which staff role can open which screen, and the roster of who holds what.
---

# Settings → Roles & Access

:::warning[Gated by account, not by role]
This screen is restricted to an explicit allowlist of accounts. **Not even a
general Admin sees it** unless their account is on that list — deliberately, so
control over who-can-see-what doesn't ride on a role anyone can be granted.

If you need access, a developer adds your account to the allowlist. See
[Access control](../developers/access-control.md).
:::

> Check the tabs each role may open. A staff member sees the union of all their
> roles' tabs. **Admin** always sees everything and can't be restricted here.

## The grid

**Rows** are the nine assignable staff roles — General Manager, Shop Manager,
Accountant, Front of House, Back of House, Stream Manager, Streamer, Moderator,
Employee. A fixed, uneditable **Admin** row sits above them with every box
ticked.

**Columns** are every screen in the app, grouped under **Insights**,
**Operations**, **Catalog**, **Community**, **Content**, **Marketing** and
**Settings**. Hover a column header to see its route.

Each row header shows the role name, a count of tabs granted, and a one-line
description of what that role is for.

### Locked columns

Four columns show a padlock or a crossed-circle instead of a checkbox, because
the matrix genuinely can't govern them. Hover for the reason:

| Column | Tooltip |
| --- | --- |
| **Roles & Access**, **API Keys**, **Integrations** | *Controlled by the settings UID allowlist — no role or admin bypass, so the matrix can't grant this* |
| **Billing** | *Pinned to a hard-coded UID list — no role or admin bypass, so the matrix can't grant this* |
| Retired tabs | *Retired — the route redirects to Settings, so a grant here does nothing* |

A checkbox that does nothing is worse than no checkbox on an access-audit
surface, which is why these render locked — including on the Admin row, since
Admin doesn't bypass an account allowlist either.

### Approve pricing

**Approve pricing**, under Catalog, is not a screen. It decides who can approve
or dismiss prices in the [Reprice](../catalog/reprice.md) queue and change an
item's own markup. GM has it by default; Admin always does. Tick it for any
other role that should approve prices. The pricing server checks it again on
every write, so a role without it cannot approve from anywhere.

## Quick set

Each row has three shortcuts:

| Button | What it does |
| --- | --- |
| **All** | Grant every tab **the matrix can actually grant** — not the locked columns |
| **None** | Revoke everything |
| **Default** | Reset this row to the shipped default |

**Reset all to defaults** in the toolbar does the same for every row at once.

## Saving

The toolbar shows **Unsaved changes** while you're editing, otherwise
*Last updated `{time}` · `{who}`* or **Using default access** if nothing has been
customised yet.

**Save matrix** writes it. Because every signed-in dashboard subscribes to this
record, the change takes effect **app-wide almost immediately** — people's
sidebars change under them.

:::caution[An override replaces, it doesn't merge]
Saving writes each role's complete tab list, and records which screens the
grid showed at the time. There's no per-cell layering for those screens: what
you saved is the answer, so an untick stays an untick.

A screen that ships **after** a role was saved is different. That role gets the
screen's default (for example, Shop Manager gets **Bags**, **Marketing** and
**Promotions**) until someone saves the grid again. Saving then records your
choice for the new screen like any other. If you don't want a role to have a
new screen, untick it and save.
:::

If a save fails you'll see *Failed to save. Your account may not have
permission.*

### Read-only mode

If the dashboard can't **read** the saved matrix, the page refuses to save over
data it can't see. You'll get **Read-only — can't see saved overrides** in the
toolbar, a banner reading *Saving is disabled*, and the buttons greyed out.

The grid below still shows the built-in defaults, because that's what the app
falls back to while the read is broken — but it is **not** necessarily what's
stored. Saving in that state would have written nine roles' defaults over
whatever was really there, so it's blocked rather than risked.

## Who has access

Under the grid, a roster answering the question the grid can't: *who is holding
those roles right now, and what does that add up to for them?*

- **Role holders float to the top** and are never paginated.
- Everyone else is paginated 25 at a time, so this doesn't become a dump of the
  whole customer base.
- **Search** and a **role filter** apply to both halves.

Expanding a row shows the tabs that person's roles resolve to — computed against
**the matrix currently on screen, unsaved edits included**. That's the point:
you can see the blast radius of a change before you press Save.

Role toggles on a row write immediately, one role at a time, so two people
editing different roles on the same person can't clobber each other.

## Customer & integration roles

At the bottom, chips for **VIP**, **Verified** and **Shopify User**:

> These are attributes, not staff roles — they grant no dashboard tabs and
> aren't part of the matrix.

## Related

- [What you can see](../getting-started/what-you-can-see.md) — the staff-facing
  view of the same system
- [The default matrix](../reference/role-matrix.md) — what each role gets out of
  the box
- [Customer Detail → Roles & permissions](../community/customer-detail.md#roles--permissions)
  — assigning roles to an individual person
