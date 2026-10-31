---
title: Reprice
sidebar_position: 0.5
description: The reprice queue. Every variant priced off target against TCGplayer, Scrydex and eBay, checked against the right card, approved or dismissed in bulk.
---

# Reprice

> Every variant priced off target by more than 3%, against TCGplayer, Scrydex
> and eBay. Only prices matched to the right card can be approved.

Reprice is where prices get decided. A **scrub** checks every in-stock item in
the catalog against market, works out what each variant should cost, and queues
only the ones that are off. Staff approve them (the new price goes to Shopify)
or dismiss them (the price stays). Nothing changes in Shopify without an
approval.

Every queued price is one of two kinds:

- **Ready**: matched to the right card, and the change is backed by the market.
  These can be approved.
- **Check match**: the engine isn't sure it found the right card, its sources
  disagree, or the change is too big for the sources behind it. These **can't
  be approved** anywhere, and typing a Check match row's suggested price in by
  hand is refused too. Open the item to fix its match, or dismiss it.

It lives at **Catalog > Reprice** in the sidebar and as the **Reprice** mode
inside [Professor Oak](../operations/professor-oak.md). Anyone who can open
Product Pricing can see it.

## Is it the right card?

A market price is only as good as the match behind it. A Red Lava /5 and the
base card share a number and a photo, and a raw card and its PSA 10 share a
name, but they sell for very different amounts. So before any source's price
is used, its own name and card number are compared with the item's title.

**What has to agree.** One of these disagreeing makes it a different item, and
its price isn't used:

- The card number (GG11/GG70, TG04/TG30, SWSH261, OP07-051, 199/165) and the
  game.
- The name, including the words that make it a different card: Pikachu V is
  not Pikachu, Charizard VMAX is not Charizard, Dark Charizard is not
  Charizard, Mega Charizard X is not Mega Charizard Y. The same goes for ex,
  GX, VSTAR, Radiant and Shining.
- The grade. PSA 10 is not a PSA 9, and neither is a raw card. BGS 10 Black
  Label, BGS 10 Pristine and a plain BGS 10 are three different grades.
- The print run (/5 is not /10).
- The printing: reverse holo, 1st Edition, manga, jumbo, and the language
  (Japanese, French, German and so on are not the English card). On One Piece,
  Alt Art and Parallel are the same thing, and a Manga is its own parallel.
- For sealed, the kind of product (a booster box is not an ETB), how many (a
  case, a display, or a set of 5 is not one), and Pokémon Center exclusives
  (not the regular one).

**TCGplayer.** Each product is matched to a TCGplayer product once, and the
match is saved:

- The engine searches TCGplayer for the card's name and number. It saves a
  match on its own only when exactly **one** TCGplayer product has the same
  name and card number **and** the title says which set it's from: a set total
  that matches (the /165 in 199/165, the GG70 in GG11/GG70), a promo or One
  Piece code (SWSH261, OP07-051), or the set's name.
- A number on its own (#26, #023) is shared by a card in nearly every set, so a
  title without the set total or set name never gets a match on its own. The
  item lists what the search found so a person can pick. Adding the set total
  to the product title fixes it for good.
- Several fit (the same card in two sets, say): nothing is saved, and the item
  lists them so a person can pick.
- None fit: nothing is saved, and the closest results are listed with why each
  isn't it.
- A match a person picked is never replaced by a search, even one that was
  already running when the pick was saved. A searched match is redone if the
  product's title changes.
- TCGplayer prices raw cards, so it never prices a slab.

**eBay.** Every listing is checked the same way, one by one. A listing has to
carry the card number and **every** word of the card's name (the TCGplayer
product's name once the item is matched), and can't add a V, ex, Mega, X or Y
the card doesn't have. One shared word is never enough: *Mew ex* and
*Charizard ex* share "ex". At least 3 listings have to pass.

eBay asking prices are what sellers want, not what cards sold for. They count
only alongside a confirmed source, and only when they're within 25% of it.
Further off, they're set aside (the row is flagged **eBay set aside**) and the
price comes from the confirmed source alone: a listing that slipped through,
or a market that moved, is not a reason to move the price.

**Scrydex.** Products created from the catalog keep the source they were made
from, which a person confirmed at the time.

## Ready or Check match

The bigger the change, the more evidence it needs.

| The evidence | What the price can do |
| --- | --- |
| No source confirmed as this card | **Check match**, whatever the change |
| Two sources more than 25% apart | **Check match**, whatever the change: we don't know which one is right |
| One confirmed source | Ready for a cut under 50% or a raise under 100% |
| Two sources that agree within 25% | Ready for any change |
| Only eBay asking prices | No price at all |

A Check match row says why in one line, for example *"A 99.9% cut on one
source. It needs a second source that agrees within 25%."*

**What to do with a Check match row.** Open the item (click its title) and look
at **Market match**. If the match is wrong, pick the right TCGplayer product or
paste its link, then run a new scrub: the next one prices it on the new match.
If the price really should move that much, tell an admin. If you're not sure,
leave it. Nothing in Check match can reach Shopify, from the queue or by typing
its suggested price in.

## What's left out

- **MoBros games** (Pack Sacks, Banger Bags, Hunters Hoard): nobody else sells
  them. Their contents are checked on the game instead; see
  [Games](../community/games.md#contents-at-market).
- **Sports and non-sport cards** (Topps, Panini, Bowman, Upper Deck, Marvel,
  Disney): TCGplayer and Scrydex don't carry them, and eBay asking prices alone
  aren't enough. They come back once eBay sold prices are switched on.
- **Catch-all listings** such as *Pokemon - Singles* or *Sports - Singles*: one
  product used to sell many different cards has no one market price.
- **Products archived in Shopify**: not for sale.

The scrub's notes say how many of each were left out.

## How a price is worked out

Each product gets one market price. Each of its variants (for example
**Rip Live** and **Shipped Sealed**) then gets its own price.

1. **Market.** The median of the sources confirmed as this card, plus eBay
   asking prices when at least 3 listings are this exact card and they sit
   within 25% of the confirmed sources.
2. **Markup.** The variant's own markup if it has one, otherwise the product's,
   otherwise the item type rule, otherwise the default. Type rules and the
   default are set on [Pricing Rules](../administration/pricing-rules.md);
   product and variant markups are set on the item. Raw cards (product type
   *TCG/CCG* or *Singles*, or tagged *Raw*) use the **Singles** rule.
3. **Base.** Market × (1 + markup).
4. **Variant price.** Base × (1 + spread %) + spread $, using the spread for
   that variant's option (Rip Live, Shipped Sealed). The product's own spread
   wins over the global one. A variant with its own markup gets no spread: its
   markup already prices how it is sold.
5. **Floor.** Cost ÷ (1 − minimum margin). The product's own minimum if set,
   otherwise the global one, **35%** unless changed. With no cost on file the
   margin can't be checked, so the floor is the market price instead: a
   negative spread can never take a variant under what it sells for elsewhere.
6. **Suggested.** The higher of the variant price and the floor, rounded by the
   rounding rule. A floor-set price rounds up to the cent so the margin is never
   short.
7. **Queued** when suggested and current differ by more than 3%, as Ready or
   Check match. The gap is compared before it is rounded for display, so 3.04%
   is queued even though it shows as 3%.

```text
floor     = cost ÷ (1 − minimum margin)      or the market, when there is no cost
suggested = max( market × (1 + markup) × (1 + spread %) + spread $ ,  floor )
```

**Worked example.** Market $60, sealed markup 20%, cost $40, minimum margin
35%, Shipped Sealed spread +$6.

| Step | Rip Live | Shipped Sealed |
| --- | --- | --- |
| Market | $60.00 | $60.00 |
| Base (+20%) | $72.00 | $72.00 |
| Spread | none | +$6.00 |
| Floor ($40 ÷ 0.65) | $61.54 | $61.54 |
| Suggested | $72.00 | $78.00 |

If two inventory lines mirror the same Shopify product (an old import plus the
sync's own line), only the line the sync maintains is priced. The other is
listed as a duplicate so it can be archived.

## Running a scrub

**Run scrub** checks about 2,000 items in batches of 100, in the background.
The bar shows progress, and the queue fills as it goes. The first scrub after
this change is slower: it searches TCGplayer for every card that has no match
yet. Later scrubs reuse the saved matches. One scrub runs at a time, even if
the button is clicked twice. If the server restarts mid-way, the scrub picks up
where it stopped within a few minutes, and only one server works it at a time.
Rows already approved or dismissed are never reset.

eBay has a daily allowance. If it runs low, the rest of the scrub is priced
without eBay and the status line says so. If TCGplayer's search keeps failing
(5 in a row), the scrub stops searching for new matches, says so, and prices
the rest with the matches it already has.

The line above the scrub shows the Shopify catalog sync, because the scrub
prices what the sync mirrored. A failed sync says **Shopify sync failed** with
the reason; **Sync now** starts a new one.

Scrubs run when someone starts one. A schedule waits until agents are
approved.

## The queue

**Ready** and **Check match** are separate views, each with its count. Products
are listed biggest gap first, with their variants grouped under them, and the
TCGplayer product each was matched to under its title. Each variant shows its
store price, the suggested price, the difference, the margin over cost at the
suggested price, and any flags. Check match rows say why under the prices.

| Flag | Meaning |
| --- | --- |
| **Below floor** | The store price is under cost plus the minimum margin |
| **Underwater** | Market plus markup lands under the floor, so the floor set the price |
| **Sources disagree** | The confirmed sources sit more than 25% apart, so the row is Check match |
| **eBay set aside** | eBay asking prices were more than 25% from the confirmed source and weren't used |
| **Held at market** | No cost on file, and the spread would have priced it under market |
| **Skipped** | An approval skipped this row because its Shopify price changed after the preview |

Filter by change (raise or lower), flag, item type or title.

## Approving and dismissing

Tick variants, or a whole product, then use the bar at the bottom. **Approve**
only appears in Ready; in Check match the only action is **Dismiss**.

- **Approve** shows every price change against the live Shopify price before
  anything is written, with a warning on any move of 30% or more. Confirming
  writes them, one Shopify call per product. A variant whose price changed in
  Shopify after the preview is skipped, not overwritten, and stays in the queue.
  So is a row that was dismissed, re-matched, locked or moved to Check match
  while the dialog was open.
  Up to 100 at a time.
- A queued row can be days old, so **Approve** checks each one again first:
  - A row that isn't Ready is skipped and stays in the queue. So is any row
    queued before match checks existed (October 31, 2026): run a new scrub.
  - A row whose market match was changed after the scrub (someone picked
    another TCGplayer product, marked it not on TCGplayer, or sent it back to
    automatic) is skipped: its price came from the old match. Run a new scrub.
  - A variant whose Shopify price changed since the scrub is skipped. Scrub
    again to re-check it. The size of each change is always measured against
    the live Shopify price, not the copy the scrub saw.
  - A product or variant locked since the scrub is skipped.
  - The price is worked out again with the markup rules as they are now. If a
    markup or spread changed, the new price is used, and the preview shows the
    old suggestion beside it. If the new price is now too big a change for the
    evidence behind it, the row is skipped. A row the new rules put within 3% is
    closed as dismissed instead of written.
  - A row with no variant id on a product sold several ways is skipped rather
    than written to whichever variant Shopify lists first. **Sync now**, then
    scrub again.

  Skipped rows are listed under the preview with the reason.
- **Dismiss** takes rows out of the queue without changing their price, with an
  optional note.

Every applied price is logged with who approved it and when.

Approving and dismissing need the **Approve pricing** grant: Admin and GM have
it by default, and the admin can grant it to other roles in
[Roles & Access](../administration/roles-and-access.md). Without it the queue is
read only. The server checks the grant, and Ready versus Check match, again on
every write, so hiding the buttons is not the only guard.

### Changing one price through Professor Oak

Asking Professor Oak to set or refresh a single price follows the same rules as
the queue:

- It needs the Approve pricing grant.
- A refresh uses the queue's calculation, and refuses a locked item, a game, a
  left-out item, and anything the queue would put in Check match. It says why.
- A product sold several ways needs the variant named.
- Confirming writes exactly the previewed price. If the Shopify price changed
  after the preview, nothing is written.
- The change is logged like any other.

An explicit price you type is your call, so it is allowed, with a warning when
it's under the minimum margin floor. The one exception: a price at or near a
Check match row's suggestion for that variant (within 2%, or 50 cents on cheap
cards) is refused, because typing it in would approve the row without its
match check. Fix the match and scrub again instead.

## An item's own pricing

Click a product's title to open it.

**Market match** comes first: each source, what it matched the item to, and
whether it was used. A green tick is a confirmed match, an amber question mark
is a name that matches with a card number that couldn't be confirmed, and a red
cross is a different item that wasn't used.

With the Approve pricing grant you can fix the TCGplayer match here:

- **Use this** on one of the TCGplayer products the search found.
- **Paste** a TCGplayer product link or number and **Check** it. The product is
  compared with the item's title first, and one that's plainly a different card
  is refused with the reason.
- **Not on TCGplayer** stops the search for this item.
- **Back to automatic matching** forgets a match a person picked.

Every pick asks you to confirm before it's saved, and is logged. Saving moves
the product's queued rows to Check match, since they were priced on the old
match; the next scrub prices it on the new one.

The variants table shows each variant's store price, cost, markup and where it
comes from, spread, floor and suggested price at today's market, marked
**Check match** when it couldn't be approved.

With the Approve pricing grant you can also set, for this item only:

- **A variant's own markup.** Replaces the spread for that variant.
- **The product's markup**, minimum margin, and its own spread per option.
- **Locks.** A locked product or variant is still checked but never suggested.

Each field saves when you leave it. Blank inherits again. The last applied
prices are listed at the bottom.

## Related

- [Pricing Rules](../administration/pricing-rules.md): type markups, the
  default, rounding, minimum margin and the variant spread
- [Product Pricing](./product-pricing.md): the inventory grid
- [Roles & Access](../administration/roles-and-access.md): the Approve pricing
  grant
