---
title: Bags
sidebar_position: 6
description: Building priced bag tiers out of graded slabs, checking their live odds, and switching Bags on for the team or for customers.
---

# Bags

> Digital bags that resolve to a real slab and ship to the buyer. Build pools,
> watch the odds, keep every tier in band.

Bags are digital bags customers buy in the MoBros app. Each bag draws one real
graded slab at random from a pool the shop loads. The customer pays through the
app's normal Shopify checkout, rips the bag in the app, and then either ships
the slab or sells it back for store credit. Nothing is held in a vault: every
pull ships or goes back into the pool. Customers see each tier's live odds
before they buy. (If you hear them called packs, that is the old name.)

This screen is where staff build those pools. It lives at **Community > Bags**
in the sidebar. The overview lists every tier; clicking one opens its pool
screen, where slabs are loaded, odds are checked and the tier goes live.

How the app's Bags tab is arranged (the order of featured bags, badges, the
hero and the chase cards) is set in Feed Studio's Bags screen, not here; see
[Feed Studio](../catalog/feed-studio.md). **Arrange the app tab** in the header
goes there, and only shows for staff who can open Feed Studio.

:::note[Needs the October 31 backend]
Everything on this screen runs on the backend release from October 31, 2026.
Until that release is deployed, any action other than the launch switch
answers *The Bags backend isn't deployed yet.* and saves nothing. The Shopify
app also needs the publications and order edits permissions; see
[Deploying](../developers/deploying.md#shopify-scopes-and-webhooks).
:::

## The overview

The header has **Arrange the app tab** and **New bag tier**. Right under it
sits the [launch switch](#the-launch-switch), so the first thing on the page is
who can see Bags in the app.

The stat strip covers the last 7 days:

| Stat | What it is |
| --- | --- |
| **Bags sold · 7 days** | Bags bought from every tier |
| **Revenue · 7 days** | What customers paid for them |
| **Value pulled vs price** | Market value of the slabs pulled, as a share of revenue |
| **Margin on cost** | Revenue less what the pulls cost the shop, as a share of revenue |

A pull's cost is the store credit paid out when the customer sold it back,
otherwise the slab's cost. A pull the customer hasn't decided on yet counts at
the slab's cost, since it ships if they don't answer.

If a tier [paused itself](#auto-pause), an alert sits above the table:
*{Tier} paused itself*, with its average and its band, and a **Fix pool** link
that opens that tier.

When tiers cover more than one game, chips above the table filter it: **All
games**, then each game in use.

| Column | Shows |
| --- | --- |
| **Bag** | The tier name (theme and level, for example *Alt Art Alley · Rare*), the game and the bag price |
| **Status** | **Draft**, **Live** or **Paused** |
| **Pool** | Slabs in the pool against the pool size, with a fill bar |
| **Avg value vs price** | Average card value as a percent of the bag price, then **in band**, **below band**, **above band** or **no pool** |
| **Chases left** | Hit, Big hit and Grail slabs still in the draw |
| **Sold · 7d**, **Revenue · 7d**, **Margin** | That tier's share of the stat strip |

Paused rows are highlighted. Click any row to open the tier.

Value is each pool's average Scrydex graded price against the bag price.

## Two switches

Two separate controls decide whether a bag can be bought.

| Switch | Positions | Where | What it controls |
| --- | --- | --- | --- |
| **Launch switch** | Off, Dev, Live | Top of the overview | Whether Bags shows in the app at all, and to whom |
| **Tier status** | Draft, Live, Paused | Each tier's pool screen | Whether that one tier is on sale |

A tier can be **Live** while the launch switch is **Off**: it is ready, but
nobody can buy it. A customer can buy from a tier only when the launch switch is
**Live** and the tier is **Live**.

## The launch switch

Three positions. The card's title and text change to match:

| Position | Card title | In the app | Who can pick it |
| --- | --- | --- | --- |
| **Off** (the default) | **Off for everyone** | Nobody sees the Bags tab, your team included, and every bag checkout is refused | Anyone with the Bags tab |
| **Dev** | **Team only** | Staff whose role holds the Bags tab see it and can buy, to test end to end. Customers see nothing, and their bag checkouts are refused | Anyone with the Bags tab |
| **Live** | **Live for customers** | Every signed-in customer sees the tab and can buy from live tiers | Admin only |

In every position:

- This screen keeps working, so tiers can be built and pools loaded while Bags
  is hidden.
- A customer who still has a pull to rip or a box on the way keeps the Bags
  tab, so switching to Dev or Off never strands an order.
- A bag always needs a signed-in account. Guests never see the tab.

**Off** and **Dev** take one click with no confirm, because they are the stop
buttons. **Live** asks first. The **Take Bags live?** dialog says *Every
signed-in customer will see the Bags tab and can buy.*, tells you how many tiers
are live (or warns *No tier is live yet, so customers will see an empty Bags tab
until one is.*), and reminds you: *Make sure counsel has signed off on Bags
first.* **Go live** confirms; **Cancel** leaves it as it was.

For anyone but an admin, **Live** is greyed out and the card adds *Only an admin
can take Bags live.* The server checks this too. Once Bags is live, anyone with
the Bags tab can still switch it back to **Dev** or **Off**.

A line under the text records the last change, for example *Switched to Dev by
Alex Rivera, Oct 30, 7:02 PM.* Every open dashboard updates the moment anyone
flips the switch. If the save fails, the switch goes back to where it was and
shows the error.

A customer turned away at checkout sees *Bags aren't available right now.*
(Off), *Bags aren't open yet.* (Dev, not on the team) or *Sign in to rip bags.*
(signed out).

:::caution[Checkout can trail the switch by up to 30 seconds]
The app tab follows a flip within seconds, but each server remembers the
position for up to 30 seconds. A bag checkout started right after you switch to
**Off** can still go through in that window.
:::

## Creating a tier

**New bag tier** opens a dialog: *Starts as a draft. Nothing sells until you go
live.*

| Field | |
| --- | --- |
| **Game** | Pokémon (the default), One Piece, Magic: The Gathering or Riftbound |
| **Theme** | The themes already made for that game, or **New theme…**. A game with no themes yet starts on **New theme…** |
| **Theme name** | Only for a new theme, for example *Alt Art Alley*. **Create draft** stays disabled until it is filled in |
| **Level** | **Common**, **Uncommon** (the default), **Rare** or **Holo** |
| **Bag price** | Above $0. Picking a level fills in its starting price: Common $25, Uncommon $50, Rare $100, Holo $250. Once you type a price yourself, changing the level leaves it alone |
| **Pool size** | How many slabs the pool is built for: a whole number from 1 to 2,000, 200 by default |

The tier is named from its theme and level, for example *Alt Art Alley · Rare*.

**Create draft** makes the tier as a **Draft**, creates a Shopify product for
the bag with no stock, and opens the new tier's pool screen. The bag's Shopify
stock follows the slabs in the draw once the pool is loaded.

## Loading slabs

**Add from inventory** (top right of the pool screen, and in an empty pool)
opens a picker of graded slabs on hand: *Adding one takes it off sale everywhere
else.* It lists only slabs that aren't sold, aren't listed in a show and aren't
already in a pool. Values are Scrydex graded prices.

Narrow the list with **Value from**, **Value to** and **Card or cert** (a card
name or the last digits of a cert).

Each row shows the photo, card, set, grade, the last four digits of the cert,
the bucket the slab would land in at this tier's price, and its market value.
Tick as many as you want.

- A slab worth less than the floor shows **Under floor** and can't be ticked.
- A slab with no photo can be added, but reads *No photo, joins out of the
  draw*. It sits in the pool and is never drawn until it has a photo.

The footer previews the pool after the add: the count against the pool size,
the new average and whether it is in band. If the add takes the pool past its
size, it warns, for example *2 over the pool size. Raise it in Settings or add
fewer.*

**Add 3 slabs** (the count follows what you ticked) commits. Each slab added is
taken off every sales channel, so it can only leave through a bag, and the
bag's Shopify stock is updated.

:::note[No CSV import yet]
Slabs are loaded by picking them from inventory, one or many at a time. There
is no CSV upload on this screen yet.
:::

### Taking a slab out

The **×** at the end of a slab's row asks *Take {card} out of the pool? It goes
back on sale in the shop.* It only shows on slabs nobody has pulled.

## The pool screen

Open it by clicking a tier on the overview, or **Fix pool** on an alert. The
breadcrumb leads back to **Bags**.

The header shows the tier name, its status, the game and the price, with two
buttons: the status action and **Add from inventory**.

A slab is **in the draw** when it is in the pool, has a photo, is worth at least
the floor, and isn't mid-pull. Every slab in the draw is equally likely to be
pulled. Nothing is weighted.

### Status

| Status | Means | Button |
| --- | --- | --- |
| **Draft** | New. Customers never see it | **Go live** |
| **Live** | On sale | **Pause sales** |
| **Paused** | Customers can still see it while Bags is live, but can't buy. The app shows *Paused while the pool restocks* | **Resume sales** |

**Pause sales** takes effect at once with no confirm. **Go live** and **Resume
sales** stay disabled until the pool can back its odds, with a line under the
header saying why:

- *Go live opens once the pool has photographed slabs in the draw.*
- *Go live opens once the average card value is back between 95% and 105% of
  price.* (The percentages are the tier's own band.)

### Stats

| Stat | Shows |
| --- | --- |
| **Slabs in pool** | Slabs in the pool against the pool size. Below it, how many need a photo, or how many are in the draw |
| **Avg card value** | The average market value of the slabs in the draw, and that as a percent of the bag price. Below it, the band and whether the tier is in it |
| **Chases left** | Hit, Big hit and Grail slabs in the draw, then how many it is short of the template, or **on template**. Below it, *Top pull*: the most valuable slab in the draw |
| **Sold today** | Bags sold from this tier since midnight |

### Buckets

Every slab lands in a bucket by its market value as a multiple of the bag
price. A slab worth exactly a bucket's lower edge belongs to that bucket, so a
slab worth exactly the bag price is **Above price**. The template is the share
of a full pool each bucket should hold. Hit, Big hit and Grail are the chases.

| Bucket | Value | Template | $50 bag, 200-slab pool | Buy back at 90% |
| --- | --- | --- | --- | --- |
| **Base** | 0.5× to 0.7× price | 42% | $25 to $35, 84 slabs | $23 to $32 |
| **Near price** | 0.7× to 1× | 30% | $35 to $50, 60 slabs | $32 to $45 |
| **Above price** | 1× to 2× | 21% | $50 to $100, 42 slabs | $45 to $90 |
| **Hit** | 2× to 4× | 5% | $100 to $200, 10 slabs | $90 to $180 |
| **Big hit** | 4× to 8× | 1.5% | $200 to $400, 3 slabs | $180 to $360 |
| **Grail** | 8× and up | 0.5% | $400 and up, 1 slab | $360 and up |

Anything under half the bag price, or under the tier's floor card value, is
**Under floor** and stays out of the draw.

### Odds vs template

The card's hint says it: *Customers see live odds and the buy back before they
buy.*

| Column | Shows |
| --- | --- |
| **Bucket** | The value range and the bucket name |
| **Filled vs template** | A bar of how full the bucket is against its template |
| **Slabs** | Slabs from this bucket in the draw, against the template count (template share × pool size). Amber when a chase bucket is short |
| **Live odds** | Slabs in this bucket ÷ slabs in the draw. This is what customers see |
| **Buy back** | The store credit range for a pull from this bucket |

For example, with 150 slabs in the draw and 6 of them Hits, the live Hit odds
are 4.0%. Odds change with every slab added, taken out or pulled.

When chase buckets are short, a callout says so, for example *Short 2 hits and 1
big hit. Live chase odds sit under the template until they're added.* Its button
(for example **Find $100 to $400 slabs**) opens **Add from inventory** with that
value range filled in.

The line under the card gives the tier's buy back rate and floor, for example
*Buy back is store credit at 90% of market. Floor card value $25.*

### The value band

The average card value (slabs in the draw only) has to sit within the tier's
target, plus or minus its allowed drift. The defaults are 100% ± 5%, so on a $50
bag the average must stay between $47.50 and $52.50.

Out of band, the pool screen shows an alert, for example *Average card value is
92% of price, below band*, with what to do:

- Below band: *Add higher-value slabs, or take some base slabs out, to lift the
  average.*
- Above band: *Add base slabs, or take a chase out, to bring the average down.*

Sales move the average too. A pulled slab leaves the draw, so a chase pulled
from a live tier drops the average with nobody touching the pool. A slab sold
back for credit returns to the draw at full value.

### Auto-pause

When a tier is **Live**, **Auto-pause out of band** is on (the default) and the
average leaves the band, the tier pauses itself the moment the pool changes: a
pull, a sell-back, a slab added or taken out, or a setting saved. The pool
screen's alert adds *Sales pause on their own at the next pool check.* Admins
get a push when it happens.
Once it has paused, the overview shows *{Tier} paused itself* with **Fix pool**.

To reopen it, bring the average back into the band, then click **Resume
sales**. The overview alert is only for a tier that paused itself, not one
paused with **Pause sales**.

### The slab list

Filter chips **All**, **Chases**, **Needs photo** and **Deciding**, each with a
count, and a **Card or cert** search (card name, set or the last four of the
cert).

Columns: **Photo**, **Card** (with the set), **Grade**, **Cert** (last four
digits only), **Bucket**, **Market**, **Buy back**, **Cost**, **Status**.

| Status | Meaning | In the draw |
| --- | --- | --- |
| **Available** | Ready to be pulled | Yes |
| **Needs photo · out of draw** | No front photo yet | No |
| **Under floor · out of draw** | Worth less than the floor, or under half the bag price | No |
| **Out of draw** | Held out of the draw | No |
| **Pulled · deciding** | A customer pulled it and is choosing ship or credit | No |

Raising the bag price can push slabs to **Under floor**, since the buckets move
with the price. Once the customer picks ship (or the deadline passes), the slab
leaves the pool and the list. A slab taken out
with **×** leaves the list and goes back on sale in the shop.

## Tier settings

The **Settings** card sits beside the odds. There is no Save button: the status
in the corner reads *Saves as you go*, then *Saving…* and *Saved*. Each field
saves when you click out of it or press Enter. Escape puts back the saved value.
A value outside the allowed range shows its error and nothing is saved.

| Field | Default | Allowed |
| --- | --- | --- |
| **Bag price** | Set when the tier was created | Above $0 |
| **Pool size** | 200 | A whole number from 1 to 2,000 |
| **Floor card value** | Half the bag price | From $0 to just under the bag price |
| **Target avg value** | 100% | 50% to 150% |
| **Allowed drift** | ±5% | 0% to 25% |
| **Buy back as credit** | Blank, which uses the shop-wide rate (90% unless changed) | 50% to 100%, or blank |

- **Bag price.** Changing it re-buckets every slab. On a live tier it asks
  first: *This tier is live. Change the bag price to $60? Every slab re-buckets
  and the Shopify product updates right away.*
- **Pool size** sets the template counts in **Odds vs template**.
- **Floor card value.** Unless it has been set, it is half the bag price. A
  floor below half the price doesn't let cheaper slabs in, because anything under half the
  price is always **Under floor**. The floor can only raise the minimum.
- **Target avg value** and **Allowed drift** set the [value
  band](#the-value-band).
- **Buy back as credit** overrides the shop-wide rate for this tier. The blank
  field shows the shop-wide rate as a hint.

Below the fields:

- **Auto-pause out of band** (*Stops sales before odds go stale*), on by
  default. See [Auto-pause](#auto-pause).
- **Shopify product**: **Linked** once the tier's bag product exists in
  Shopify, otherwise **Not linked**.

:::caution[Turning auto-pause off]
A live tier then keeps selling after its average leaves the band. The pool
screen still warns you, but nothing stops sales.
:::

## After a rip: ship or store credit

When a customer rips a bag, the slab they pulled shows **Pulled · deciding** on
the tier's slab list. In the app they choose:

- **Ship it**, the default. The slab ships in their box. A pull nobody answers
  by the deadline ships.
- **Store credit**. Market value × the tier's buy back rate, to the cent, goes
  onto their account as store credit right away. The app asks them to confirm
  and it can't be undone. The slab goes back into the pool at full value and
  shows **Available** again.

The customer has until the box is packed, within a decision window that is 24
hours by default. The app tells them *Ships in your box unless you sell it back
before it's packed.*

Shipping isn't refunded, even when every pull on an order is sold back.

Once every pull on an order has been decided, the slabs that ship are added to
the Shopify order at $0, so whoever packs it sees exactly what goes in the box.
The order total doesn't change and the customer gets no email about it.

If an order is cancelled or a bag on it refunded in Shopify, those pulls are
voided and their slabs go back in the pool. A pull that was already sold back
for store credit, or is being packed, is left for a person to sort out, and
admins get a push.

If Shopify doesn't confirm a sell-back (a timeout, say), the customer sees *We
couldn't confirm your store credit* and the pull waits. Nothing is paid twice.
An admin checks the customer's store credit in Shopify and marks it credited or
shipping.

### When a pool runs short

Shopify only sells as many bags as the pool can draw, but two checkouts can
land at the same moment. If an order pays for more bags than the pool has left,
the extra bags get no pull and admins get a push: *A bag order came up short.*
Refund those bags in Shopify.

A customer's store credit balance is on their
[Customer Detail](./customer-detail.md#rewards).

## Who can use it

The screen needs the **Bags** tab. By default that is Admin, General Manager,
Shop Manager and Stream Manager. An admin can change it in
[Roles & Access](../administration/roles-and-access.md).

Taking Bags **Live** is admin only, whatever the grid says. General Managers
can switch to **Off** or **Dev** but not **Live**.

:::caution[The Bags tab is also the Dev test team]
While the launch switch is on **Dev**, everyone whose role holds the Bags tab
sees Bags in the app and can buy. Granting the tab to a role adds its staff to
the test team.
:::

## Not on this screen yet

- Prize boards (Banger Bags).
- A ship queue for bag orders.
- CSV import and import history.
- Launch offers for a new tier.
- The shop-wide buy back rate and the decision window. They have no screen;
  only a tier's own buy back rate can be changed here.

## Errors

| Message | What it means |
| --- | --- |
| *Couldn't load bag tiers. Your role can't read Bags yet, or the Firestore rules for Bags aren't deployed.* | The lists can't be read. The same message appears for *this pool* or *this tier* |
| *The Bags backend isn't deployed yet.* | The server doesn't have that action yet. Nothing was saved |
| *Couldn't reach the server. Check your connection.* | The request never reached the server |
| *Only an admin can take Bags live.* | Someone without the admin role tried to pick **Live** |

Anything else the server refuses shows its own reason in a red box at the top
of the pool screen. **×** dismisses it.

:::note[Granting the Bags tab to another role]
The database only lets the four default roles read Bags. If an admin grants the
tab to any other role, its staff can open the screen but get the *Couldn't load
bag tiers* message.
:::

## Related

- [Games](./games.md): repacks and pack sacks built from inventory
- [Customer Detail](./customer-detail.md): a customer's store credit and
  rewards
- [Feed Studio](../catalog/feed-studio.md): arranging the app's Bags tab
- [Roles & Access](../administration/roles-and-access.md): who holds the Bags
  tab
