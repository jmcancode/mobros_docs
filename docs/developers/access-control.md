---
title: Access control
sidebar_position: 3
description: The two independent gates — entitlements and roles — and how to add a screen behind either.
---

# Access control

Two independent systems decide whether a screen renders. Both fail closed.

| Gate | Question | Enforced by |
| --- | --- | --- |
| **Entitlements** | Has the shop paid for this? | `FeatureGate` + `useEntitlements` |
| **Roles** | May this person open it? | `ProtectedRoute` + the access matrix, client-side; `requireTab` server-side |

## Roles

### The registry

`src/config/accessMatrix.js` is the single client-side source of truth. It holds:

- `ROLE_METADATA` — thirteen roles, each flagged `staff: true` or `false`. The
  ten staff roles mirror `backend/lib/user-roles.js`; keep them in sync. A role
  that exists on the server but not here simply grants nothing on the client.
- `TABS` — every gate-able destination, with a `key`, `label`, `section` and
  `path`, plus optional `enabled: false`, `retired: true` and `zone: true`.
  Routes that exist but aren't in the sidebar (Orders, Products, Grading, Shows,
  App Layout, and currently Shipping and Hit Feed) are still listed so they can
  be gated.
- `DEFAULT_ACCESS_MATRIX` — role → tab key arrays, seeding a fresh install.
- `GRANTABLE_TAB_KEYS` and `tabLockReason()` — which of those the grid can
  actually set, and why not.

### Resolution

```
effectiveMatrix(overrides,  →  defaults, with any stored override REPLACING
                savedKeys)     a role's whole array (per-role, not per-cell),
                               except late keys (below)
tabsForRoles(roles, matrix) →  union of every held staff role's tabs;
                               Admin short-circuits to everything
canAccessTab(roles, m, key) →  membership test
```

Overrides live in `settings/accessMatrix` as `{ roles: { isGM: [...] }, savedKeys }`.

**Late keys.** Every save stamps `savedKeys`, the full tab registry at that
moment. A tab key that isn't in `savedKeys` was never shown to whoever saved,
so an overridden role gets that key's **default** instead of reading as
revoked. Keys the grid did show stay exactly as saved, so an untick is still
an untick. A save from before the stamp existed is read against the frozen
`LEGACY_SAVED_KEYS` list. Never edit that list; new keys need nothing there.
The same rule runs in `backend/lib/access-matrix.js` (`resolveOverrides`), the
mobile `src/config/accessMatrix.ts` (`applyLateKeys`) and, for
`pricing-approve` only, the MCP server's `src/auth/pricing-permission.js`.
`AuthContext` subscribes to that document, so a save from
[Roles & Access](../administration/roles-and-access.md) propagates to every
signed-in dashboard almost immediately.

If the read is denied by security rules, `matrixOverrides` stays null and the
code defaults apply. Restrictive, never permissive.

### `ProtectedRoute`

Props: `adminOnly`, `ownerOnly`, `staffOnly`, `settingsAdmin`, `tab`. Checked
cheapest-first:

1. Not signed in → `/login` (also where a forced sign-out lands, with a note
   saying why; see [Sessions](../administration/sessions.md))
2. `ownerOnly` and not the owner UID → `/unauthorized`
3. `adminOnly` and not admin → `/unauthorized`
4. `settingsAdmin` and not on the UID allowlist → `/unauthorized`
5. `staffOnly` or a `tab` set, and neither admin nor staff → `/unauthorized`
6. `tab` set and not granted → `/unauthorized`

### Three lock sources above the matrix

`tabLockReason(tabKey)` names why a tab can't be granted from the grid, and it's
the single place that knows:

| Reason | Tabs | Mechanism |
| --- | --- | --- |
| `"allowlist"` | `settings-keys`, `settings-integrations`, `settings-roles` | `SETTINGS_ADMIN_TAB_KEYS` + `VITE_SETTINGS_ADMIN_UIDS` |
| `"uid"` | `billing` | Hard-coded `BILLING_UIDS` in `accessMatrix.js` |
| `"retired"` | `billing`, `settings-shopify`, `settings-rates`, `weak-points` | The route redirects, so a grant is inert |

`GRANTABLE_TAB_KEYS` is `ALL_TAB_KEYS` minus everything with a lock reason, and
it's what the GM default and the grid's **All** button are both defined as. Add a
tab and GM gets it; lock a tab and GM doesn't.

The Roles & Access grid renders locked columns as a padlock or a crossed circle
with the reason on hover, **including on the Admin row** — Admin doesn't bypass
an allowlist either, so a tick there would be a lie.

### The UID allowlist

`settings-keys`, `settings-integrations` and `settings-roles` are gated by an
explicit account list, not the matrix. **Admin does not bypass it** —
`canAccessTab` returns the allowlist check alone for those three keys.

Set `VITE_SETTINGS_ADMIN_UIDS` (comma-separated). If unset, a hardcoded fallback
list in `accessMatrix.js` applies. Prefer the environment variable — the
hardcoded list is a bootstrap convenience, not a configuration mechanism.

Two more hard gates sit outside the matrix entirely:

- **`isBillingUid`** — a hard-coded list, no env override. `canAccessTab("billing")`
  returns it alone. The Billing route is a redirect now, so this is vestigial
  until the screen comes back.
- **`isOwnerUid` / `OWNER_UID`** — the Activation page and the billing override
  endpoint. Settable with `VITE_ENTITLEMENT_OWNER_UID`. The route is
  `ownerOnly`, the nav item checks the same UID, and the page checks it again.

:::note[Zone keys gate a region, not a route]
A tab marked `zone: true` — currently `analytics` — has no route of its own. It
gates a section inside another page: the Shopify **Performance** and
**App Stores** zones on `/dashboard`. It's still fully matrix-governed.
:::

### Backend guards

The API now enforces the **same matrix**, not a parallel approximation of it.
`backend/lib/access-matrix.js` mirrors `config/accessMatrix.js`: the same tab
keys, the same defaults, the same override semantics. Keep the two in sync — a
tab added on one side and not the other means the dashboard renders a screen the
API refuses, or the reverse.

```js
app.use("/api/notifications", verifyToken, requireTab("notifications"), routes);
```

`requireTab("customers")` means *any staff role the matrix grants the Customers
tab may call this*. It accepts an array too — `requireTab(["product-pricing",
"products"])` passes if the caller holds either. Admin bypasses the matrix, same
as on the client. Everything else is a 403.

One Firestore snapshot listener keeps `settings/accessMatrix` warm for the
process lifetime. Until the first snapshot arrives — or if the listener errors —
the **code defaults** apply. Restrictive, never permissive, but it does mean a
grant made in the grid can be invisible to a server that hasn't loaded the
overrides.

:::warning[The migration is half done]
Twelve route files use `requireTab`; seventeen still use `verifyAdmin`. On those,
a non-admin staff member can *see* their granted tabs and still get 403s on the
data behind them. Convert them one group at a time, testing each with a
non-admin account.
:::

`verifyToken` also now carries `signInProvider` off the ID token
(`"password"`, `"google.com"`, `"apple.com"`, …), so a denial log can say how the
caller got in, and a guard can apply provider-specific policy if one ever needs
to.

### `GET /api/whoami`

The server's own answer to *what access does this account have?*, computed by the
same `access-matrix.js` that `requireTab` enforces with.

| Call | Returns |
| --- | --- |
| `GET /api/whoami` | The caller's roles and resolved tabs |
| `GET /api/whoami?tab=notifications` | …plus a yes/no on one tab |
| `GET /api/whoami?uid=<uid>` | Another user. **Admin only** |

It exists because the client and the API resolve access independently, and when
they disagree there was previously no way to ask the server what it thought —
which is exactly the shape of *"the grid says I have Notifications but the page
403s"*.

**Read `matrix.source` first.** `"defaults"` means this process hasn't loaded
`settings/accessMatrix`, so every grant made in the grid is invisible to it.
`"overrides"` with an `updatedAt` matching the grid means the server is current,
and any remaining denial is about the caller's roles, not the matrix.

### Login

`Login.jsx` admits **any staff role** via `isStaff(roles)` — the earlier
admin-only restriction is gone. Three methods funnel through one gate
(`rejectIfNotStaff`), so adding a fourth provider is a button, not another copy
of the check.

The dashboard is invite-only: none of the three methods writes a `users/{uid}`
document. An account with no staff role authenticates, gets signed straight back
out, and leaves no trace in Firestore beyond the auth record.

:::caution[Don't copy mobros-hub's AuthContext here]
mobros-hub *does* create a `users` doc on first sign-in. That's correct for
customers and wrong for the dashboard.
:::

## Entitlements

### `useEntitlements`

Calls `GET /billing/features` on **every mount** and returns
`{ features, loading, status }` where `status` is `loading | ready | error`.

On any error it sets `features` to `{}` and `status` to `error` — a backend blip
locks features rather than leaking them. Re-fetching per mount means an
Activation toggle is picked up as soon as the user navigates to the gated
screen.

### `FeatureGate`

```jsx
<FeatureGate feature="feat_hitFeed" name="Hit Feed">
  <HitFeed />
</FeatureGate>
```

Three states, in order: loading → a blurred wireframe with
`aria-label="Checking activation"`; entitled → children; otherwise → the locked
panel.

**There is no admin bypass.** The only ways in are the owner Activation toggle
or a Stripe payment.

The locked panel reads its copy from `src/data/featureContent.js` — title,
tagline, what it does, why it matters, and the preview wireframe shape. Unknown
keys fall back to a generic shape and a generic line.

## A third surface: the docs site

The documentation site reuses this role system rather than inventing one. Its
gate (`src/theme/Root` over there) signs the reader in with Google and then reads
the same `users/{uid}` document. Revoking someone's dashboard access revokes
their docs access at the same time.

:::warning[The docs gate is now stricter than the dashboard]
`ALLOWED_ROLES = ['isAdmin']` in the docs site's `src/theme/Root/index.js` — it
still mirrors the *old* dashboard login. Since `Login.jsx` was widened to any
staff role, a Shop Manager can sign into the dashboard and be **rejected from
the docs**. To align them, add the rest of the staff keys from
`config/accessMatrix.js` to that array.
:::

It's a client-side check on a static site, so it is a deterrent rather than a
wall — see
[Deploying → The sign-in gate](./deploying.md#the-sign-in-gate) for what that
does and doesn't buy, and write the docs accordingly.

## Adding a new gated screen

1. Add a tab entry to `TABS` in `accessMatrix.js` with a key, label, section and
   path.
2. Grant it in `DEFAULT_ACCESS_MATRIX` for the roles that should have it out of
   the box.
3. Register the route in `App.jsx` inside a `<ProtectedRoute staffOnly tab="…">`.
4. If it's a paid feature, wrap the page in `<FeatureGate feature="…" name="…">`
   and add an entry to `featureContent.js` and the entitlement catalog.
5. Add a nav item in `Layout.jsx` carrying the same `tab` key — and a `feature`
   key too if it's entitlement-gated, so it doesn't flash in the sidebar before
   activation is confirmed.
6. Add the tab key to `ALL_TAB_KEYS` and the defaults in
   `backend/lib/access-matrix.js`, and guard the route group with
   `requireTab("…")`.

Skipping step 6 gives you a screen that renders and then 403s, which is worse
than one that's hidden. Getting it half-right — client grant, no server key — is
the failure `GET /api/whoami` exists to diagnose.
