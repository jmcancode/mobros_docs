---
title: Integrations
sidebar_position: 3
description: The app store, search, social and eBay keys the MCP server reads, and how to upload them.
---

# Settings → Integrations

:::warning[Gated by account, not by role]
Like API Keys and [Roles & Access](./roles-and-access.md), this tab is restricted
to an explicit [allowlist of accounts](../developers/access-control.md#the-uid-allowlist).
**Not even a general Admin sees it** unless their account is on that list — and
the MCP server separately requires an active admin record of its own before it
will accept anything.
:::

> Keys the MCP server uses for app store, search, social and eBay data. They are
> stored encrypted on the server and never shown again after upload; only a hint
> is kept. Anything not uploaded falls back to the server's environment.

These credentials belong to the **MCP server**, not the main backend. They're
what makes [Professor Oak](../operations/professor-oak.md) and the
[App Stores zone](../operations/dashboard.md#app-stores) able to read real
numbers instead of showing *not connected*.

## The providers

| Provider | What it unlocks | What you upload |
| --- | --- | --- |
| **App Store Connect** | iOS installs, impressions, conversion, reviews | Key ID, Issuer ID, the `.p8` private key, App Apple ID |
| **Google Play** | Android installs, reviews | Service account `.json`, package name, reports bucket *(optional, needed for metrics)* |
| **Google Search Console** | Search impressions and clicks | Service account `.json`, the property |
| **Instagram** | Social reach and engagement | Long-lived access token, Instagram user ID |
| **TikTok** | Stream and video performance | Access token, **or** client key + client secret + refresh token |
| **eBay** | Comparable sold and active prices | App ID, Cert ID, and *Sold prices enabled* |

Each row carries a **How to get these** expander with the short version of the
setup — where in Apple's or Google's console to click, which scopes to grant,
which email to invite.

## Status

Every row shows one of four states:

| Pill | Meaning |
| --- | --- |
| **Connected** | Everything required is set, and the last test passed |
| **Using server env** | Nothing uploaded here — the server's own environment variables are supplying it |
| **Incomplete** | Some required fields are set and some aren't |
| **Not connected** | Nothing set anywhere |

Under the pill, the fields that *are* set are listed with a hint rather than a
value — the last four characters, a key fingerprint, a service account email, or
the ID itself. Then *Uploaded `{date}` by `{who}`* and the result of the last test.

## Uploading

**Upload** opens the fields for that provider.

- Inputs are **never pre-filled**. A field left blank keeps whatever is already
  stored — the placeholder says *Leave empty to keep the current value*.
- File fields take the key file itself (`.p8` for Apple, `.json` for a Google
  service account). There's a size ceiling appropriate to a key file.
- Apple's `.p8` filename carries the Key ID. Upload `AuthKey_2X9R4HXF34.p8` and
  the **Key ID** field fills itself in.
- **Save** needs at least one field — *Nothing to save. Fill in at least one
  field.*

**Test connection** calls the provider for real and records the result on the
row. **Remove** deletes what was uploaded, after confirming: *Remove the
uploaded `{provider}` credentials? The server's env vars, if any, apply again.*

:::caution[Uploads can be switched off at the server]
If the MCP server has no credential encryption key configured, the **Upload**
buttons are disabled and a banner explains it. Testing still works; only storing
new credentials is blocked. That's a developer fix on the MCP server, not
something to work around here.
:::

## What never comes back

A secret is write-only. The page sends a credential up and gets per-field status
and a hint back — never the value. There is no "show key" button, because the
server genuinely cannot answer that question.

## Related

- [Dashboard → App Stores](../operations/dashboard.md#app-stores) — the zone
  these keys feed
- [Professor Oak](../operations/professor-oak.md) — the tools behind the same
  data
- [Access control](../developers/access-control.md#the-uid-allowlist) — how the
  account allowlist works
