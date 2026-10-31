---
title: Feed Studio
sidebar_position: 6
description: Merchandising the app's Search feed, Home tabs and Bags tab. Home tabs also make up the shop on the website.
---

# Feed Studio

:::info[Requires the Feed Studio feature]
See [Locked features](../getting-started/locked-features.md).
:::

Feed Studio sets what customers see on three screens of the MoBros app: the
Search feed, the tabs across the top of Home, and the Bags tab. The Home tabs
are also the shop on the website. It lives at **Catalog > Feed Studio** in the
sidebar. Which roles can open it is on
[Who can see what](../reference/role-matrix.md).

## The screen switch

The header has three buttons: **Search**, **Home** and **Bags**. Each screen
edits its own settings and has its own **Publish** button, which publishes that
screen only.

- The address follows the screen: `/feed-studio?screen=home` and
  `/feed-studio?screen=bags` open those screens directly. **Arrange the app
  tab** on the [Bags](../community/bags.md) page opens the Bags screen.
- Unpublished edits survive switching screens. A dot on a button means that
  screen has unpublished changes.
- Leaving Feed Studio or reloading the page drops unpublished edits on all
  three screens, with no warning.

The status pill next to the title is for the screen you're on: **Unpublished
changes** while you edit, **Published `{time}`** after you publish. Home and
Bags also show **Not loaded** when the published settings couldn't be read,
and Publish stays off until they can be.

## Search

> Compose what shoppers see on the Search screen. Changes go live the moment
> you publish.

This is the feed customers see on Search before they type anything. Four
levers, one preview, one **Publish** button. Products come from a searchable
picker, categories from a dropdown of your real games with product counts, tags
from autocomplete.

### Spotlight

One hero at the top of the feed. Turn it on with the toggle, then:

| Field | Notes |
| --- | --- |
| **Product** | **Choose product** opens the picker. Picking one turns the spotlight on and fills the title if it's empty. **Change** swaps it |
| **Kicker** | Defaults to *This week's drop* |
| **Title (optional)** | *Falls back to product name* |
| **Subtitle** | e.g. *Limited allocation* |

### Curated rails

Horizontal strips of products above the main grid, top to bottom. **Add rail**
adds one called *New Rail*. Each rail has a title, a source, a max item count,
up and down arrows, an eye button (**Disable** or **Enable**) and **Delete
rail**.

| Source type | What it pulls |
| --- | --- |
| **Category** | Everything in one game category. The dropdown shows counts, e.g. `Pokémon (142)` |
| **Tag** | Everything carrying a tag, with autocomplete |
| **New arrivals** | Automatic, no value to set |
| **Hand-picked** | Exactly the products you choose with **Pick products**, drag to reorder |

Max items is 1 to 30, default 12. In the app a rail shows in-stock products
only and skips hidden ones.

Two behaviours to know: changing a rail's source type **clears its value**, and
picking a product into a rail **forces that rail to Hand-picked**.

### Boost rules

Weights the main grid from 0 to 3. Boost re-ranks; the only thing it removes is
sold-out items, when **Hide sold-out** is on.

| Rule | What it does | Starts at |
| --- | --- | --- |
| **Discount depth** | Pushes bigger markdowns higher | 2 |
| **Newness** | Fresh arrivals rise (tagged *new*) | 2 |
| **Margin** | Meant to favour high-margin SKUs | 0 |
| **Overstock age** | Meant to move aging stock | 0 |
| **Demote low stock** | Sinks items with fewer than N left toward the end, just above sold out | 3 |
| **Hide sold-out** | Removes zero-stock items from browse | on |

**Margin** and **Overstock age** say they read from
[Product Pricing](./product-pricing.md), but the app's Search ranking doesn't
use either weight yet, so setting them changes nothing customers see.

The toggle in the panel header turns Boost rules off and greys out every rule.
In the app, Hide sold-out then stops applying, while Demote low stock keeps
whatever value it had. Sold-out items always sit at the end of the grid.

### Pinned & hidden

Overrides everything. **Pin product** adds to *Pinned to top · drag to
reorder*: pins sit at the top of the grid in the order you set. **Hide
product** adds to *Hidden from feed*.

The hidden list reaches past Search. Hidden products also stay out of every
Home tab, in the app and on the website.

### The preview

A phone mock on the right labelled **Live preview** *browse*, mirroring the
customer's idle Search screen: search bar, spotlight, one strip per *enabled*
rail, then the grid. It shows the layout with blank cards, not real products.

### Publishing Search

Everything you do is **local until you press Publish**. The button is off until
something changes.

:::danger[Search has no conflict check]
The Search screen loads the feed once and replaces the whole thing on publish.
There's no merge and no warning: the last publish wins, including over a change
Professor Oak made in the meantime. Agree who's driving before two people open
it. Home and Bags do check (see below).
:::

## Home

> Choose what shoppers see on Home. Changes go live when you publish.

Home in the app opens on a row of tabs, each a grid of products. This screen
sets the shop's tabs: which exist, the order customers start with, and what
each one holds. The same tabs make up the shop at `mobrostc.app/shop`. To link
to one tab, open it there and copy the address, which ends in `?tab=` and the
tab's ID.

Customers can make Home their own. In the app's Edit tabs screen they can move
or hide any tab, except a Featured one while it runs, and **+ Customize** lets
them build tabs of their own from the same filters this screen uses. Their own
tabs always come first. **Reset to MoBros default** in Edit tabs puts the
shop's order back.

:::note[Your order is a starting order]
Reordering here moves tabs for customers who haven't arranged Home themselves.
Anyone who has keeps their order, and a tab they've never seen lands after the
last shop tab they already have.
:::

### Messages at the top

| Message starts | What it means |
| --- | --- |
| *Home tabs haven't been published yet* | Nothing has been published from here. The list is Live Rips plus one tab per game, turned on only for games set to Show on Home, which is what customers see today. Publish to take it over |
| *Added since the last publish* | A game was added since the last publish, so its tab was added (game tabs start on only if the game is set to Show on Home). Live Rips comes back turned off if it was missing. Publish to save them |
| *Couldn't read the published Home tabs* | Publish stays off so nothing gets overwritten. **Try again** reloads |
| *The published Home tabs doc has no tab list* | The stored settings are damaged. The list starts from the defaults and publishing replaces them |
| *Couldn't load the catalog* | Counts and the preview are empty |

### The tab list

The **Home tabs** panel lists every tab in starting order. Each row shows the
name, a status, the kind with a short summary (for example *Shop tab · Featured
· Nov 27 to Dec 1*), and a warning icon if the tab would stop a publish.

| Kind | Name | Products | Delete |
| --- | --- | --- | --- |
| **Built-in** (Live Rips) | Always *Live Rips* | Fixed rule: every Live Rip in stock, meaning anything tagged or categorized "live rip" | No, turn it off instead |
| **Game tab** | The game's label | Filters, locked to that game | No, turn it off instead. A game that's turned off hides its tab |
| **Shop tab** | Yours, up to 24 characters | **Filters**, **Hand-picked** or **Shopify collection** | **Delete tab** |

| Status | Meaning |
| --- | --- |
| **Live** | On, and inside its schedule |
| **Scheduled** | On, and starts later |
| **Off** | Turned off with the eye button, or its game is turned off |
| **Ended** | Its end time has passed |

- **Reorder** by dragging a row, or focus its grip and use the up and down
  arrow keys. A Featured tab is locked right after Live Rips.
- **Turn a tab on or off** with the eye button. Off tabs stay in the list;
  customers don't see them.
- **Add a shop tab** with **New shop tab**. Type a name (*Name it, like Black
  Friday*) and press **Add**; Esc or **Cancel** backs out. It goes at the end
  of the list and starts on Filters.
- **Delete a shop tab** with **Delete tab** in its **Tab** panel. It comes off
  Home for everyone when you publish.

A shop tab's ID is made from its first name and never changes, so renaming a
tab doesn't break links or banner buttons that point to it.

**Home settings**, under the list, has one switch: **Autoplay banner videos**.
Off shows every video banner's poster image instead, on every tab. Customers
with Reduce Motion on always get the poster. It publishes with the rest of
Home.

### Tab

Click a row to edit that tab. The first panel:

| Field | Notes |
| --- | --- |
| **Name on the tab** | Shop tabs only, up to 24 characters. Live Rips and game tabs show their fixed name |
| **Featured** | Shop tabs only (see below) |
| **Starts** / **Ends** | The tab's **Schedule**, in Eastern Time. Empty start means *Right away*, empty end means *No end date* |

Any tab can have a schedule, Live Rips and game tabs included. A scheduled tab
is hidden until it starts and removed when it ends. In its last 3 days
customers see when it ends on the tab, for example *Ends Tue 11:59 PM*. Times
are typed and shown in Eastern Time; if your computer is in another time zone,
the field also shows *Your time*. An end before the start stops the publish.

**Featured** puts one shop tab right after Live Rips for everyone, and
customers can't move or hide it while it runs. Only one tab can be Featured, so
turning it on for one tab turns it off on the other (the description says
which). For a sale, give a Featured tab a schedule: it's locked in place for
the run and comes off Home when it ends.

### Products

Live Rips has a fixed rule. Game tabs use filters with their game locked on.
Shop tabs choose a source:

| Source | What the tab shows | Order |
| --- | --- | --- |
| **Filters** | Every product matching the filters | The **Sort** in the Order panel |
| **Hand-picked** | Exactly the products you pick | Your order, sold out last |
| **Shopify collection** | What's in one Shopify collection, kept in sync | The collection's order, sold out last |

Switching a tab away from **Shopify collection** unhooks it from the
collection.

**Filters** has four groups. Each chip shows how many products it would match,
and the line *{n} products match right now* follows as you change them. They
are the same filters customers use in **+ Customize**.

- **Game**: a chip per game. None picked means every game.
- **How you buy**: **All**, **Shipped Sealed**, **Live Rip** or **Live Stream**.
- **Price**: **Min price**, **Max price**, and **In stock only** (on for a new
  tab).
- **Tags** (*matches any*): the 10 most used first; **Show all {n} tags** opens
  the rest with a search box.

**Hand-picked**: **Pick products** opens the picker, and picking a product
that's already in the list takes it out. Drag rows to reorder. The count line
flags products that are sold out or no longer in the catalog.

**Shopify collection**: see [Collection tabs and Raw Cards](#collection-tabs-and-raw-cards).

### Banner

Art across the top of the tab, under the tab row and above the spotlight, with
the words on it as live text. Turn it on with the **Banner** toggle. Any tab
can have one.

| Field | Notes |
| --- | --- |
| **Photo** or **Video** | One still image, or a video that plays muted, on loop, with no controls |
| **Video** | Video banners only. MP4, up to 10 MB and 15 seconds |
| **Photo** (**Poster image** on a video banner) | Needed for the banner to show. 2:1, at least 1200 x 600, JPG, PNG or WebP up to 1.5 MB. A poster shows while the video loads and whenever it doesn't play |
| **Wide art for desktop (optional)** | 3:1, at least 1800 x 600, same file types and size. The website uses it from 900px wide; without it, desktop crops the photo |
| **Alt text** | What the art shows, for screen readers |
| **Headline** | Up to 40 characters |
| **Subline** | Up to 80 characters |
| **Button goes to** | **No button**, **A Home tab**, **A product** or **A link** |
| **Button label** | Up to 24 characters. Needed unless it's **No button** |
| **Tab**, **Product** or **Link** | Where the button goes. A link needs a full `https://` address; it opens in a new browser tab on the web and in the browser from the app |
| **Banner starts** / **Banner ends** | The banner's own schedule, in Eastern Time. Empty start means *Whenever the tab is up* |

**Upload** (or drop a file on the row) checks the file first and says in plain
words what's wrong with it. **Replace** swaps a file and the X removes it.
Uploading doesn't publish anything: the banner goes live with **Publish** like
the rest of the tab.

Customers see the banner only when it's on, has a photo or poster, and is
inside its own schedule. With a button, the whole banner can be pressed; with
**No button**, it can't. A video banner shows just its poster when there's no
video yet, when **Autoplay banner videos** is off, or when the customer has
Reduce Motion on.

The two frames at the bottom, **App and phones, 2:1** and **Desktop web, 3:1**,
show both crops with the words on them. Publish stops if the banner ends before
it starts, or if the button has no label, nowhere to go, or a link that isn't a
web address. The other warnings on the card (no photo yet, a destination tab
that's gone) don't stop it.

For pop-up offers rather than tab art, see
[Promotions](../content/promotions.md).

### Spotlight

Like Search's, but per tab: one hero card at the top of this tab, with
**Product** (**Choose product**), **Kicker**, **Title (optional)** and
**Subtitle**. Turned on with no product, or one that's no longer in the
catalog, it stays off for customers. The spotlight product is taken out of the
grid so it doesn't show twice.

### Pinned and hidden

This tab only. **Pin product** adds to *Pinned to the top, in this order*;
**Hide product** adds to *Hidden from this tab*. A product can't be both in one
tab, so pinning a hidden product unhides it, and the other way round.

Pins show even when the filters would leave them out, except a sold-out pin in
an in-stock-only tab. Products hidden on the Search screen stay hidden here
too.

### Order

| Setting | Notes |
| --- | --- |
| **Sort** | **Newest first**, **Price, low to high**, **Price, high to low** or **Name, A to Z**. Hand-picked and collection tabs keep their own order instead |
| **Boost** | Off on a new tab. Re-ranks after pins using the weights below |
| **Discount depth**, **Newness** | 0 to 3. Newness can't go under 2 on Home. It counts products tagged new or published in the last 14 days |
| **Margin**, **Overstock age** | Shown, but the app doesn't rank on them yet |
| **Hide sold out** | Sits under Boost. Leaves zero-stock items out of the tab, pins included, while Boost is on |
| **Demote low stock** | Sinks items with fewer than this many left to just above sold out. 0 turns it off. Works with Boost off |

Customers get pins first in pin order, then everything else with sold out at
the end and low stock just above it, then boost when it's on, then the sort or
your own order.

### Collection tabs and Raw Cards

A **Shopify collection** tab shows what's in one Shopify collection and follows
it. Its product list is read-only here. To change what's in the tab, edit the
collection in Shopify.

The backend reads the collection from the Shopify storefront and writes the
list into the tab:

- every 15 minutes,
- right after a Home publish that has a collection tab, and
- when you press **Sync now**, which re-reads every collection tab, not only
  the one open.

It keeps the collection's order, takes up to 1,000 products, and leaves out
anything not available for sale unless the tab's **Hide sold out** is off. That
switch lives under Boost in the Order panel, but the sync follows it whether
Boost is on or not. A sync never shows as an unpublished change or trips the
conflict check, and publishing keeps whatever the sync last wrote.

The line under the collection picker:

| It says | It means |
| --- | --- |
| *{n} products from the collection* | How many products the last sync put in the tab, after leaving out sold-out ones |
| *Last synced {day, date, time} ET* | When the list last changed, or someone last pressed **Sync now**. The 15-minute run only writes when something changed, so an older time is normal |
| *Not synced yet* | The collection was just picked, or the tab hasn't been published with it yet |
| *Shopify has no collection with that handle on the storefront* | The storefront can't see that collection. The count drops to 0 but customers keep the last list |

**Sync now** works once the tab is published with its collection; before that
it says *Publish first. The sync reads the published tabs.* If the sync right
after a publish fails, a message says collection tabs keep their last list
until the next 15-minute run.

To set up **Raw Cards** (or any collection tab):

1. In Shopify, put the products in a collection the storefront can see.
2. In Feed Studio, open **Home**, press **New shop tab**, name it *Raw Cards*
   and press **Add**.
3. In **Products**, choose **Shopify collection**, then pick the collection
   from the list (up to 100 collections, A to Z).
4. Add anything else it needs: a banner, a spotlight, pins, **Featured**, a
   schedule.
5. Drag it to where it should start in the row, then **Publish**.
6. The sync runs straight after. Check the count and *Last synced* line, and
   press **Sync now** if it still says *Not synced yet*.

From then on the tab follows the collection by itself.

### The preview

**Live preview** on the right is a phone showing the open tab: the customer's
tab row (with **+ Customize**), the item count, the *Ends* line, the banner,
the spotlight and the first four products with prices, ranked the way the app
ranks them.

The label says which moment it shows: *Right now*, *When it starts* for a
scheduled tab, or *Before it ended* for an ended one. A tab customers wouldn't
see at that moment (it's off, or its game is) shows dashed in the row. The
**Pinned** tag on cards is for you; customers just see the order.

### Publishing Home

**Publish** writes the whole Home setup, **Autoplay banner videos** included,
and the app and website pick it up straight away. It's off until something
changes, and off while the published tabs can't be read.

Before writing, Publish checks every tab. If one has a problem, that tab opens
and the reason shows at the top, for example *Black Friday: Give this tab a
name.*

:::warning[If someone else published first]
Publish checks whether Home was published from somewhere else (another person,
or Professor Oak) since you opened the page, and asks: *Home tabs were
published from somewhere else after this page loaded. Publish yours anyway and
replace that version?* **OK** replaces their version with yours, whole.
**Cancel** keeps your edits on screen, but seeing theirs means reloading, which
drops your edits. Note what you changed, cancel, reload, and make your changes
again.
:::

[Professor Oak](../operations/professor-oak.md) can also read and change Home
tabs from Claude, for people whose
[Claude Access](../administration/claude-access.md) lets them change the feed
and home tabs: add, edit, delete,
reorder, feature, and turn tabs on or off. It leaves banners, collection
sources and **Autoplay banner videos** as they are; those are set only here.

## Bags

> Arrange the Bags tab: order, badges, the hero and chase cards. Changes go
> live when you publish.

This screen sets what fills the app's Bags tab, not the tab's layout: the order
of **Featured bags**, which are hidden, the badge on each, the hero and the
chase cards. Bags themselves (themes, levels, pools, prices and the launch
switch) are set up on the [Bags](../community/bags.md) page, which **Add or
edit bags on the Bags page** opens. The rip card, store credit and My pulls
count stay each customer's own.

Messages at the top:

- *Nothing has been published here yet*: the list is the tab as customers get
  it today, with bags in their Bags page order, NEW where the theme is marked
  new, and the hero on Auto.
- *Bags is Off* or *Bags is in Dev*: from the launch switch on the Bags page.
  Off means nobody sees the tab; Dev means only the Bags team does.
- *Couldn't read the bags*: arranging them needs the Bags tab for your role in
  [Roles & Access](../administration/roles-and-access.md).
- *Couldn't read the published Bags layout*, or a layout newer than the
  dashboard writes: Publish stays off.

### Featured bags

Every bag theme from the Bags page, top to bottom. Drag to reorder, or focus a
grip and use the arrow keys. The eye hides a bag from the list without pausing
its sales. Each row shows **Live**, **Paused**, **Not on sale** or **Hidden**,
a star on the hero, the game, the lowest price and the badge.

Customers see a bag on the list only while it has a level on sale (live or
paused). A bag with none can still be placed; it takes its spot when a level
goes live.

Click a bag to open it:

- **Show in Featured bags**: off keeps it on sale but takes it off the list and
  the chase cards. The hero can still point to it.
- **Badge on its row**: **None**, **NEW**, **HOT** or **LAST CALL**. A bag new
  to the list starts with NEW if its theme is marked new on the Bags page.
- **Make this the hero** sets the hero to this bag.
- **Levels and pools on the Bags page** opens it there.

### Hero

| Mode | What customers see |
| --- | --- |
| **Auto** | The first bag in the Featured order, skipping hidden ones, with a launch price running. No launch running, no hero |
| **Pick a bag** | The bag chosen in **Bag**, with optional **Kicker** (24 characters), **Title** (40) and **Subtitle** (60). Empty lines use the grey defaults, which a running launch price fills in |
| **Off** | No hero. The tab opens on Featured bags |

A picked bag with no live level shows the Auto hero until one goes live, and
the screen warns when that's happening.

### Chase cards

The top slabs from the live levels of the bags on the Featured list, with
hidden bags left out. Turn them on or off with the toggle.

- **Order**: **Highest value** first, or **Bag order** (bag by bag in the
  Featured order).
- **How many**: 1 to 12, 8 to start.

### Preview and publishing

**Live preview** shows the Bags tab as the app builds it: hero, Featured bags
with badges, then chase cards. The label says who sees it right now:
*Customers*, *Bags team*, or *Nobody, Bags is Off*. Under it, a count of bags
on the tab, hidden, and waiting for a level on sale.

**Publish** works like Home's: off until something changes, off while the
layout or bags can't be read, and it asks before replacing a layout published
from somewhere else after you opened the page. Professor Oak can change the
Bags layout too.
