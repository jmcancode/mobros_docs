---
title: Developer docs
sidebar_label: Overview
sidebar_position: 1
description: Where to start if you're building, deploying, or debugging MoBros.
---

# Developer docs

MoBros TCG is four codebases sharing one backend and one Firebase project.

| Path | What it is |
| --- | --- |
| `backend/` | Node + Express API on Heroku. The only thing that talks to Shopify, Mux, Shippo and Stripe |
| `mobile/` | React Native customer app. Admin screens are embedded in the same build |
| `web/admin-dashboard/` | Vite + React SPA — the Command Center |
| `web/mobros-hub/` | Vite marketing site |
| `web/docs-site/` | This documentation site |
| `mobros_mcp/` | MCP server exposing shop operations as tools |
| `firestore-rules/` | Security rules |

## Where to go

- **[Architecture](./architecture.md)** — how the pieces fit and what talks to
  what
- **[Local setup](./local-setup.md)** — getting all of it running on your machine
- **[Environment variables](./environment-variables.md)** — every variable, per
  project
- **[Firestore collections](./firestore-collections.md)** — the data model
- **[API reference](./api-reference.md)** — the endpoints the dashboard calls
- **[Access control](./access-control.md)** — roles, entitlements, and how both
  gates work
- **[Deploying](./deploying.md)** — Heroku, Netlify, and the docs site
- **[Editing these docs](./editing-these-docs.md)** — adding and changing pages

## Conventions worth absorbing early

**Everything fails closed.** Roles, entitlements, and security rules all default
to denying. If a read fails, the code falls back to the most restrictive state,
never the most permissive. Preserve that when you touch any of it.

**Schema lives in the writers.** There is no schema file for Firestore. For any
collection, open the code that writes to it and read the object passed to
`setDoc` / `updateDoc` / `addDoc`. That's the field set.

**No client talks to Shopify.** Every external service goes through the backend.
The dashboard's only direct external dependency is Firebase.

**Two axes gate the UI.** Entitlements (what the shop bought) and roles (what
the person can open) are independent systems. Adding a screen usually means
touching both.
