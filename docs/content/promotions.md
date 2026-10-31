---
title: Promotions
sidebar_position: 1.75
description: Promo modals, the pop-ups customers see on the website and in the app, with who sees them, what they offer, and the settings and welcome gift they share.
---

# Promotions

> Pop-ups that show on the web and in the app when the moment fits.

A promo modal is a pop-up with an optional picture or video, a headline, a line
or two of text and one button. You choose the moment it can appear (a visit
starts, a cart sits, an order goes through), who it's for, and what it gives
them: nothing, a discount code, rewards points or the welcome gift.

It lives at **Marketing > Promotions** in the sidebar. Every modal opens on its
own screen, and **Settings** (top right of the list) holds the rules all of
them follow, plus the welcome gift.

:::note[Customers see nothing until the master switch is on]
Promo modals ship switched off. Until someone turns on **Show promo modals** in
[Settings](#settings), no customer sees any modal, however each one is set. The
list shows a banner while it's off.
:::

## Where customers see them

| Where | How it appears |
| --- | --- |
| Website (mobrostc.app), 640px wide or more | A card in the middle of the screen |
| Website on a phone or narrow window | A sheet from the bottom |
| The app (iOS and Android) | A sheet from the bottom |

Media sits on top at 16:9, then the headline, the body, the yellow button and
the dismiss button as plain text, with a close **X** in the corner. The website
shows the headline in capitals and the body on two lines. The app shows the
headline as you typed it and allows up to four lines of body.

Customers only ever see one modal at a time, and never:

- in the first **Quiet seconds** of a visit
- while sign-in, checkout or another pop-up is open
- on the web pages or app screens listed in Settings
- once they've had **Modals per visit** pop-ups this visit (the welcome gift
  invite counts as one)

A visit is one browser tab on the website. In the app it's opening the app
fresh, or coming back to it after 30 minutes or more in the background.

## The list

Every modal is one row:

| Column | Shows |
| --- | --- |
| **Name** | The modal's name, with its offer underneath (for example *15% off code*, *100 points*, *Welcome gift*, *No offer*) |
| **When** | The moment in words, like *When a visit starts* or *3 seconds after they open the Raw Cards tab* |
| **Platforms** | Web, iOS and Android, or the ones it's limited to |
| **Status** | **Live**, **Scheduled**, **Off** or **Ended** (see [Schedule](#schedule)) |
| **Seen** | How many times it has been shown |
| **Claimed** | How many codes or points were claimed. A dash when the offer has nothing to claim |

Live modals come first, then scheduled, off and ended. Within each, higher
priority comes first, then name. Click a row to open it.

If the page says promo modals *can't be read yet*, the database rules for this
screen haven't been deployed. Ask a developer.

## Starting a new modal

**New modal** opens a picker of nine starting points: *Pick a starting point.
Everything is editable, and it starts turned off.* Picking one creates the
modal and opens it.

| Preset | When | Who | Offer | How often |
| --- | --- | --- | --- | --- |
| **New customer** | A visit starts | Account age 24 hours or less, no orders placed | Welcome gift | Once per customer |
| **New visitor** | A visit starts | Not signed in | Welcome gift (the button opens sign-up) | Once per customer |
| **Birthday** | A visit starts | Signed in, birthday within 3 days | 15% off code, good for 7 days | Once a year |
| **Win-back** | A visit starts | Last order 60 or more days ago | 10% off code, good for 14 days | Once a month |
| **Tier reached** | They move up a rewards tier | New tier is Legendary or God Mode | None | Each time it happens |
| **Screen or page view** | 3 seconds after they open a tab, product, page or screen you pick | Everyone | None | Once per customer |
| **Cart idle** | Their cart sits 10 minutes without a checkout | Everyone | None | Once a day |
| **Exit intent** | Heading for the top of the window after 10 seconds on the page (web only) | Not signed in | None | Once per customer |
| **After purchase** | 2 seconds after a signed-in customer places an order | Signed-in customers (the event only fires for them) | None | Every order |

Each preset comes with starting copy (for example *Happy birthday from MoBros*
with a **Get my code** button) and a button that just closes the modal. Every
preset starts at priority 50 on all three platforms, except **Exit intent**,
which is web only. **Screen or page view** has no headline yet and nothing
picked to open, so fill those in before it can be turned on.

Codes from the presets don't stack with the welcome gift. See
[Offer](#offer).

## The modal screen

The top of the screen holds the modal's name (click it to rename, up to 80
characters), its status, the preset it came from, its [counts](#counts), and
**Duplicate** and **Delete**.

There's no Save button. Every change saves itself a moment after you stop
typing, and the corner reads **Saving…**, then **Saved**. If it reads *Not
saved. It tries again on your next edit.*, make another change to retry. *Not
saved. Your account can't edit this yet.* means your role can't write promo
modals (see [Who can open it](#who-can-open-it)).

- **Duplicate** makes a copy named after this one plus *copy*, turned off, with
  its counts at zero, and opens it.
- **Delete** asks first, then removes the modal and its counts for good.
  Customers stop seeing it within about a minute.

:::caution[Edits to a live modal go live]
There's no draft. An edit to a live modal saves within a second and reaches
customers within about a minute (someone already mid-visit may not see it until
their next one). To rework a live modal, **Duplicate** it, edit the copy, then
turn the copy on and the original off.

If someone else saves the same modal while you have it open, you'll see
*Someone else changed this modal after you opened it.* Your next edit replaces
their version, so reload first.
:::

The sections below run in the order a customer meets the modal. The
[live preview](#live-preview) sits beside them.

## When

*The moment that can show this modal.* Pick an **Event**. Changing the event
resets its settings to the defaults below.

| Event | Setting | What to know |
| --- | --- | --- |
| **A visit starts** | None | Once per visit, after the quiet seconds set in Settings |
| **They open a tab, product, page or screen** | **They open**, **Wait (seconds)** (default 3) | See below |
| **Their cart sits untouched** | **Minutes without a change** (default 10) | Needs at least one item in the cart and no checkout started, while the site or app is open. Any cart change starts the count again |
| **They go to leave the site (web only)** | **Seconds on the page first** (default 10) | Computers with a mouse only: fires when the pointer leaves through the top of the window. Never on phones or in the app |
| **They place an order** | **Wait (seconds)** (default 2) | Signed-in customers only. The server matches the order to their account, so it can show a few seconds after checkout, or on their next visit within 14 days |
| **They move up a rewards tier** | None | Add a **Rewards tier** rule in Who to pick which tiers |

For **They open a tab, product, page or screen**, choose what **They open**:

| Option | You fill in |
| --- | --- |
| **A Home or shop tab** | Pick from the published Home tabs (**Choose a tab**). If they can't be read, a **Tab id** box appears instead |
| **A product** | **Product handle**, the last part of the product's web address |
| **A web page (web only)** | **Path starts with**, like `/shop`. Any page whose path starts with it matches |
| **An app screen (app only)** | **App screen name**, which has to match the app's screen name exactly |

## Who

*Leave it empty to show it to everyone who hits the moment above.* **Add a
rule** adds a row; the **X** removes it. With more than one rule, **All of
these must match**.

| Rule | Comparisons | What it checks |
| --- | --- | --- |
| **Signed in** | **is** Yes or No | Whether they're signed in |
| **Platform** | **is one of** Web, iOS, Android | Where they are. [Platforms](#platforms) usually does this job |
| **Cart subtotal ($)** | **is at least**, **is at most** | Their cart right now, not counting the welcome gift. Checked on their device |
| **Account age (hours)** | **is at least**, **is at most** | Hours since they made their account |
| **Orders placed** | **is**, **is at least**, **is at most** | Orders on their Shopify customer record |
| **Days since last order** | **is at least**, **is at most** | Days since their last Shopify order |
| **Shopify customer tag** | **has**, **doesn't have** | Tags on their Shopify customer. Capitals don't matter |
| **Rewards tier** | **is one of** Rare, Legendary, God Mode | Their current tier (see [Rewards](../community/rewards.md#tiers)) |
| **Points balance** | **is at least**, **is at most** | Their current rewards balance |
| **Days to their birthday** | **is at most** | Days before or after their birthday, counted across New Year. Uses the date of birth the customer saved in their account settings on the website or app. Feb 29 counts as Feb 28 in other years |
| **Can claim the welcome gift** | **is** Yes or No | Whether the welcome gift would be offered to them right now |

Only **Signed in**, **Platform** and **Cart subtotal ($)** can match a guest.
Every other rule is about an account, so it never matches someone signed out.

A rule with nothing to check is false. A customer with no orders never matches
**Days since last order**, and one with no date of birth never matches **Days
to their birthday**, whatever the number.

Orders, last order and tags come from Shopify and are refreshed at most once a
day per customer, and again right after they place an order. A tag you add in
Shopify can take up to 24 hours to count.

## Content

| Field | Notes |
| --- | --- |
| **Media on top, 16:9** | **None**, **Image** or **Video** |
| **Image** (or **Poster image** for a video) | 16:9. JPG, PNG or WebP up to 1.5 MB |
| **Video** | MP4 up to 10 MB. Plays muted, on loop. Needs a poster image as well |
| **Headline** | Up to 48 characters |
| **Body** | Up to 140 characters, no line breaks. *Two short lines at most.* |
| **Button label** | Up to 24 characters |
| **Button goes to** | **Nowhere, it just closes**, **A Home tab**, **A product** or **A link**. A link has to start with `https://` |
| **Dismiss label** | Up to 24 characters. Defaults to *Not now* |

What the button does depends on the offer, and the hint under it says so:

- **None**: it goes where **Button goes to** says.
- **Discount code** or **Points**: signed out, it opens sign-in, and the modal
  comes back afterwards to finish. Signed in, it claims the offer right in the
  modal, then reads **Shop now** and goes where **Button goes to** says.
- **Welcome gift**: signed out, it opens sign-up. Signed in, it opens the gift
  picker. **Button goes to** isn't used.

## Offer

Pick **None**, **Discount code**, **Points** or **Welcome gift**.

| Offer | What the customer gets |
| --- | --- |
| **None** | *Nothing to claim. The modal is a message with a button.* |
| **Discount code** | Their own one-time Shopify code, made when they claim it |
| **Points** | **Points** added to their rewards balance when they claim. They're awarded as bonus points, source Birthday for the Birthday preset and Promo otherwise, and show under **Rewards activity** on [Customer Detail](../community/customer-detail.md#rewards-activity) |
| **Welcome gift** | The welcome gift as it's set in [Settings](#welcome-gift). Nothing is claimed in the modal, so **Claimed** stays at zero |

A discount code has:

| Field | Notes |
| --- | --- |
| **Discount** | **Percent off** or **Dollars off** |
| **Percent off** / **Dollars off** | The amount. Percent is a whole number up to 100 |
| **Minimum subtotal ($)** | *0 means no minimum.* |
| **Days valid** | *Counted from when they claim it.* |
| **Stacks with the welcome gift** | *Off: when the cart holds the welcome gift, this code isn't added at checkout.* |

Codes look like `MB-7K2Q9XRT`, with the prefix set in Settings. Each one works
once, on the whole order, and combines with shipping discounts but not with
other order discounts. With **Stacks with the welcome gift** on, it also
combines with product discounts in Shopify; with it off, it doesn't.

A customer can claim each modal's offer once per [frequency](#frequency)
period. After they claim, that modal doesn't show to them again until the next
period.

### How a code reaches checkout

1. The customer presses the button while signed in. The modal shows their code
   with **Copy**, the discount, the expiry date and *Applied at checkout
   automatically.*
2. When they next check out signed in, on the website or in the app, the newest
   code they've claimed that hasn't expired or been used is added for them. One
   code goes on each checkout.
3. When the order comes in, the code is marked as used.

When the cart holds the welcome gift:

- **Stacks with the welcome gift** off: the code isn't added. It stays valid for
  a later order until it expires.
- **Stacks with the welcome gift** on: the code is added. If the gift would no
  longer come free with it, checkout drops the code and keeps the gift. A promo
  code never costs a customer their gift.

Turning a modal off, or deleting it, doesn't cancel codes customers have
already claimed. They keep working until they expire.

:::caution[A Welcome gift offer doesn't check the gift itself]
A modal with the **Welcome gift** offer keeps showing while the gift is off,
sold out or already used. For signed-in customers, add the rule **Can claim
the welcome gift** **is** Yes so the modal hides itself in those cases. That
rule never matches guests, so don't add it to a guest modal like **New
visitor**: turn that one off when the gift goes off.
:::

## Frequency

The line under the heading says it in words, like *Once per customer.* or *Up
to 3 times a day, at least 2 days apart.*

| Field | Notes |
| --- | --- |
| **At most (times)** | How many times one customer can see it per period |
| **Per** | **Ever**, **Each year**, **Each month**, **Each day** or **Each time it happens** |
| **Days between showings** | A gap between showings on top of the count. 0 means no gap |

A showing counts the moment the modal appears. For signed-in customers the
count follows their account across the website and the app. For guests it's
kept in that browser or on that phone, so another device or cleared site data
starts it again.

Days, months and years start at midnight in the **Shop time zone** set in
Settings.

**Each time it happens** only means something for **They place an order**
(each order) and **They move up a rewards tier** (each new tier). On any other
event it behaves like **Ever**.

## Schedule

*Eastern Time. Leave both empty to run until you turn it off.*

- **Starts**: empty reads *Right away*.
- **Ends**: empty reads *No end date*.

If your computer isn't set to Eastern, the hint under each date shows your own
time as well. The schedule is always Eastern, whatever the **Shop time zone**
in Settings says. The **X** next to a date clears it.

| Status | Meaning |
| --- | --- |
| **Live** | On, and inside its schedule |
| **Scheduled** | On, but its start is still ahead |
| **Ended** | On, but its end has passed |
| **Off** | Turned off |

## Priority

*0 to 100. When two modals fit the same moment, the higher number shows. Ties
go by name.* New modals start at 50.

## Platforms

Tick **Web**, **iOS** and **Android**, at least one. An exit intent modal says
*Exit intent only happens on the web, so iOS and Android never show this one.*

## Turning it on

The **Enabled** switch at the bottom turns the modal on. It stays greyed out
until everything is ready, and lists what's missing under *Fix these before you
turn it on:*

- *Add a headline.*
- *Give the button a label.*
- *Pick at least one platform.*
- *Choose what they open in When.*
- *Upload the image, or set media to None.* (or the video)
- *Add a poster image for the video.*
- *Choose where the button goes.*
- *The button's link needs to start with https://*
- *Give the code a value.*
- *Set how many points they get.*
- *It ends before it starts.*
- *Remove the rule this page doesn't recognize. The server skips the modal
  while it's there.*

Turning it off is never blocked. Editing a modal that's already on isn't
blocked either: if a change leaves something on the list, the switch stays on
and reads *On, but it needs these fixed before customers see it the way you
mean:*. Customers see the gap, so fix it straight away.

When it's on and complete it reads *On. Customers who match see it while it's
in its schedule and promo modals are on in Settings.*

## Live preview

Beside the form, **Live preview** draws the modal as you edit it, twice:
**App and small screens** (a phone sheet) and **Desktop web** (the centered
card). Empty fields show placeholders like *Your headline*.

For a code or points offer, switch between **Before claim** and **After
claim**. After claim shows a sample code using your code prefix, the discount
and an expiry date counted from today, or the points, like *100 points added*, with the button
reading **Shop now**.

The preview shows the headline in capitals, as the website does. The app shows
it as typed.

## Counts

The modal screen shows four counts, updated live:

| Count | Goes up when |
| --- | --- |
| **seen** | The modal is shown, to anyone, guests included |
| **dismissed** | Someone closes it without pressing the button |
| **clicked** | Someone presses the button |
| **claimed** | A customer claims the code or points, once per customer per period. Code and points offers only |

These count showings, not people: one customer seeing a modal three times adds
three to **seen**. Deleting a modal deletes its counts.

## Settings

**Settings** on the list opens **Promotion settings**: *The rules every promo
modal follows, and the welcome gift.* Both sections save themselves a moment
after each change.

### Promo modals

| Setting | Default | Notes |
| --- | --- | --- |
| **Show promo modals** | Off | *The master switch. While it's off, customers see none of them, whatever each one is set to.* It also stops anyone claiming a code or points |
| **Modals per visit** | 1 | 1 to 10. *The welcome gift invite counts as one.* |
| **Quiet seconds** | 3 | *Nothing pops up in the first seconds of a visit.* |
| **Never on these web pages** | `/legal`, `/brand` | *Any page whose path starts with one of these.* A missing leading slash is added for you |
| **Never on these app screens** | None | *App route names, matched exactly.* |
| **Shop time zone** | Eastern | *Decides when a day, month or year starts for Frequency and birthdays.* Doesn't change the schedule, which is always Eastern |
| **Code prefix** | MB | 2 to 6 letters or numbers. *Codes look like MB-7K2Q9XRT.* Only new codes use a new prefix; codes already claimed keep working |

Add a web page or app screen by typing it and pressing Enter or **Add**;
remove one with its **X**.

### Welcome gift

*New customers pick one free gift with their first order. Promo modals can
offer it with the Welcome gift offer.*

The card at the top is the same welcome gift switch as on the
[Dashboard](../operations/dashboard.md#welcome-gift), with the same **Live**,
**Off** and **Needs attention** pill and the same messages. It saves the moment
you flip it, and the server checks Shopify first. It can't be turned on while
the Shopify app is missing the discount permission. Turning it off is never
blocked.

Under it, **Who can claim it**:

| Field | Default | Notes |
| --- | --- | --- |
| **Gift collection handle** | `welcome-gifts` | *The Shopify collection the gifts come from.* Lowercase letters, numbers and dashes. The card re-reads the collection after you change it |
| **New account window (hours)** | 24 | *How long after making an account they can still claim it.* |
| **Only accounts made after** | Empty | Eastern Time. Empty means *Any account, however old.* |

The **New customer** preset's rule (account age 24 hours or less) matches the
default window. If you change the window, change that rule to match.

What's on offer is edited in Shopify, in the gift collection, not here.

## Who can open it

Promotions is the **Promotions** column in
[Roles & Access](../administration/roles-and-access.md). By default Admin,
General Manager and Shop Manager have it, the same roles as
[Feed Studio](../catalog/feed-studio.md).

The welcome gift switch has two homes. On the Dashboard it shows to roles with
the **Giveaways** tab; on Promotion settings it works for roles with
**Promotions**.

:::caution[Granting Promotions to another role isn't enough on its own]
The screen opens for any role ticked in Roles & Access, but the database only
lets Admin, General Manager and Shop Manager read and save promo modals, promo
settings and the welcome gift fields. Anyone else gets *can't be read yet* or
*Not saved. Your account can't edit this yet.* Ask a developer before granting
it more widely.
:::

## What fails closed

When something can't be checked, the modal stays hidden rather than showing to
the wrong people:

- If the master switch is missing or unreadable, it counts as off.
- A modal the server can't read cleanly (an unknown event, rule, offer or
  frequency) is skipped. A rule this page doesn't recognize shows in grey with
  *This page doesn't know this rule, so the server skips the modal while it's
  here.* Remove it to bring the modal back.
- A code worth nothing or a points offer of 0 points is skipped.
- A rule whose fact is missing is false: no date of birth, no orders, or
  Shopify not answering.
- Account rules never match guests.
- Claiming checks everything again on the server: the master switch, the
  schedule, the rules, and that nothing has been claimed this period. Order and
  tier offers can only be claimed for an order or tier the customer really has.
- If the promo code lookup fails at checkout, checkout carries on without the
  code. A promo is never the reason a checkout fails.

## Related

- [Dashboard](../operations/dashboard.md#welcome-gift): the welcome gift card
  and what its messages mean
- [Feed Studio](../catalog/feed-studio.md): the Home tabs a modal can open on
  or send people to
- [Rewards](../community/rewards.md#tiers): the tiers behind the tier rule and
  event
- [Customer Detail](../community/customer-detail.md): a customer's points
  history, including points from promo modals
- [Roles & Access](../administration/roles-and-access.md) and
  [Who can see what](../reference/role-matrix.md): the Promotions tab
