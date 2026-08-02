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
| **Roles** | May this person open it? | `ProtectedRoute` + the access matrix |

## Roles

### The registry

`src/config/accessMatrix.js` is the single client-side source of truth. It holds:

- `ROLE_METADATA` — thirteen roles, each flagged `staff: true` or `false`. The
  ten staff roles mirror `backend/lib/user-roles.js`; keep them in sync. A role
  that exists on the server but not here simply grants nothing on the client.
- `TABS` — every gate-able destination, with a `key`, `label`, `section` and
  `path`. Routes that exist but aren't in the sidebar (Analytics, Orders,
  Products, Grading, Shows, App Layout) are still listed so they can be gated.
- `DEFAULT_ACCESS_MATRIX` — role → tab key arrays, seeding a fresh install.

### Resolution

```
effectiveMatrix(overrides)  →  defaults, with any stored override REPLACING
                               a role's whole array (per-role, not per-cell)
tabsForRoles(roles, matrix) →  union of every held staff role's tabs;
                               Admin short-circuits to everything
canAccessTab(roles, m, key) →  membership test
```

Overrides live in `settings/accessMatrix` as `{ roles: { isGM: [...] } }`.
`AuthContext` subscribes to that document, so a save from
[Roles & Access](../administration/roles-and-access.md) propagates to every
signed-in dashboard almost immediately.

If the read is denied by security rules, `matrixOverrides` stays null and the
code defaults apply. Restrictive, never permissive.

### `ProtectedRoute`

Props: `adminOnly`, `staffOnly`, `settingsAdmin`, `tab`. Checked cheapest-first:

1. Not signed in → `/login`
2. `adminOnly` and not admin → `/unauthorized`
3. `settingsAdmin` and not on the UID allowlist → `/unauthorized`
4. `staffOnly` or a `tab` set, and neither admin nor staff → `/unauthorized`
5. `tab` set and not granted → `/unauthorized`

### The UID allowlist

`settings-keys` and `settings-roles` are gated by an explicit account list, not
the matrix. **Admin does not bypass it** — `canAccessTab` returns the allowlist
check alone for those two keys.

Set `VITE_SETTINGS_ADMIN_UIDS` (comma-separated). If unset, a hardcoded fallback
list in `accessMatrix.js` applies. Prefer the environment variable — the
hardcoded list is a bootstrap convenience, not a configuration mechanism.

### Backend guards

`verifyAdmin` is still the guard on most data routes, so a non-admin staff
member can *see* their granted tabs but gets 403s on the data behind them. The
migration path is `verifyToken` + a per-route-group `roleGuard`:

| Route group | Suggested guard |
| --- | --- |
| `/api/sell/*` | `roleGuard('isShopManager','isFrontHouse','isEmployee')` |
| Support tickets | `roleGuard('isShopManager','isFrontHouse','isModerator','isEmployee')` |
| `/api/admin/shopify/*` | `roleGuard('isShopManager','isBackHouse')` |
| `/api/admin/shipping-automation` | `roleGuard('isShopManager','isBackHouse')` |
| Grading | `roleGuard('isShopManager','isBackHouse')` |
| `/api/admin/games`, streams | `roleGuard('isStreamManager','isStreamer')` |
| Analytics, billing | `roleGuard('isAccountant')` |
| `/api/admin/integrations`, activation | keep `verifyAdmin` |

Admin passes every `roleGuard` automatically. Do this one group at a time,
testing each with a non-admin account.

:::note[Login is currently stricter than the routes]
`Login.jsx` requires `roles.isAdmin === true` before it lets anyone through,
even though `ProtectedRoute` is written to admit any staff role. Until that's
relaxed, non-admin staff can't reach the dashboard at all. Worth fixing before
the backend guard migration lands, or the migration can't be tested.
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
gate (`src/theme/Root` over there) signs the reader in with Google and then
reads the same `users/{uid}` document to check `roles.isAdmin` — exactly what
`Login.jsx` does here. Revoking someone's dashboard access revokes their docs
access at the same time.

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
6. Add the matching backend guard.

Skipping step 6 gives you a screen that renders and then 403s, which is worse
than one that's hidden.
