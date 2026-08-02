---
title: Glossary
sidebar_position: 1
description: The words this app uses and what they actually mean.
---

# Glossary

**Access matrix** — The editable grid mapping each staff role to the screens it
may open. Lives in Settings → Roles & Access.

**Batch (buy batch)** — One buy at the counter: one customer, one stack of
cards, usually one physical box. The unit of work on Intake Processing.

**Breach / overdue** — A request that has passed its SLA window without a
response. Requests waiting on the customer are never counted as breached.

**Burn rate** — Of all the reward points you've ever issued, the share that has
been spent. Healthy is 40–70%.

**Channel** — Three different things share this word:
1. **Stock channel** (Product Pricing) — Warehouse, a Shopify shop, or a trade
   show.
2. **Sales channel** (Shopify) — a storefront a product is published to.
3. **Stream channel** (Notifications) — Live Break, Stream Sports, or Card House.

**Condition multiplier** — The haircut off Near Mint applied to played raw
cards. Graded cards ignore it.

**Cost basis** — What you paid for a card, per unit.

**Days held / DIO** — How long a line has been in inventory. Over 180 days it's
flagged stale on Product Pricing.

**Dev / Live** — On Games, whether the leaderboard card appears in the mobile
app. Independent of the game's status.

**Drift** — Shopify and the ledger disagreeing about how much stock exists for a
listing.

**Effective price** — The sell-price override if one is set, otherwise the
market price. Every margin calculation uses this.

**Entitlement** — A feature the shop has paid for or is trialing. Distinct from
a role.

**Floor** — On a pack-sack game, the guaranteed minimum market value per spot.

**Handle** — A product's URL slug. Used for deep links into the app.

**Headroom** — How far above your target sell price the effective price sits.
Negative means you're below target.

**Hit** — A big pull. Also the prize tier for chase cards in a game.

**Internal ID** — The permanent identifier for a physical inventory unit. What
the QR code encodes, so a SKU change never invalidates a printed sticker.

**Ledger** — The physical-unit inventory system behind Product Pricing's row
expansion. Admin-locked in Firestore; reached through the backend.

**Liability** — The dollar value of unspent reward points. Target is 1–4% of
revenue.

**Line** — A row in Product Pricing. One product at one cost, in a quantity.

**Margin (gross)** — Profit as a percentage of **revenue**, not of cost. A 30%
target margin means a $70 card sells for $100.

**Markup** — Profit as a percentage of **cost**. Not the same as margin. A 30%
margin is a 43% markup.

**Pack sack** — A game type where customers buy a bag containing a fixed number
of packs, usually with a guaranteed floor value.

**Point value** — What one reward point is worth in dollars. Derived from your
most generous *enabled* redemption option.

**Rail** — A horizontal strip of products on the app's Search feed, configured
in Feed Studio.

**Role** — A permission flag on a staff member's record. Ten staff roles, three
customer attributes.

**SKU** — The stock-keeping code, composed from a card's set, number and
condition. Regenerating one doesn't affect the QR code.

**SLA** — The response-time target per queue. Two thresholds: warn (amber) and
overdue (red).

**Spot** — One purchased slot in a game.

**Spotlight** — The single hero product at the top of the app's Search feed.

**Stale** — A line held longer than 180 days on Product Pricing.

**Tier floor** — A rewards tier granted to a customer without granting the
points. Never lowers a tier they already earn.

**Timed out** — A request that closed itself after the customer didn't respond
within the timeout window.

**Underwater** — A line whose effective price is below what you paid.

**Whale risk** — Flagged when one customer holds 30% or more of all outstanding
reward points.
