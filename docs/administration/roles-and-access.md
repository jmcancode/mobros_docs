---
title: Roles & Access
sidebar_position: 1
description: The grid editor that decides which staff role can open which screen.
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

**Columns** are every screen in the app, grouped under **Overview**,
**Operations**, **Catalog**, **Community**, **Content**, **Insights** and
**Settings**. Hover a column header to see its route.

Each row header shows the role name, a count of tabs granted, and a one-line
description of what that role is for.

## Quick set

Each row has three shortcuts:

| Button | What it does |
| --- | --- |
| **All** | Grant every tab to this role |
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
Saving writes each role's complete tab list. There's no per-cell layering: if a
new screen ships later, roles you've customised won't pick it up automatically.
Come back and grant it.
:::

If a save fails you'll see *Failed to save. Your account may not have
permission.*

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
