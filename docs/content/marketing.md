---
title: Marketing
sidebar_position: 1.5
description: The calendar, board and budget where every post, ad and Shopify send is planned, approved, tracked and paid for.
---

# Marketing

:::info[Requires the Marketing Suite feature]
See [Locked features](../getting-started/locked-features.md).
:::

> Posts, ads and sends in one plan.

Marketing is where the shop plans every push it makes: Instagram and TikTok
posts, Meta, TikTok and Google ads, Shop Campaigns and Shopify Email. Each push
is one **item**, and the same items show in three views: **Calendar**,
**Board** and **Budget**. Instagram posts publish themselves. For everything
else the screen reminds the right person at go time, then keeps track of what
went out, what it cost and what it sold.

It lives at **Content > Marketing** in the sidebar. Each item opens on its own
screen.

## Who can open it

Marketing needs the **Marketing** tab. By default Admin, General Manager, Shop
Manager and Stream Manager have it (see [Who can see what](../reference/role-matrix.md)),
and it can be changed in [Roles & Access](../administration/roles-and-access.md).

Anyone with the tab can create and edit items, send them for review, and mark
them posted or done. Approving an item into **Scheduled** takes the Admin or
General Manager role itself. It isn't a tab, so it can't be granted in Roles &
Access.

Until the shop has the Marketing Suite, **Marketing** is missing from the
sidebar for everyone, Admins included, and the address shows the locked
preview. No items can be created until then, so nothing is reminded, published
or synced.

:::caution[Ticking Marketing for another role isn't enough]
The calendar, the board and creative uploads are also limited to Admin, General
Manager, Shop Manager and Stream Manager. Someone in any other role who is given
the tab can open the screen, but it can't load items (**Marketing items can't be
read yet**) and their uploads fail. Give them one of those four roles instead.
:::

## Channels

Seven channels in four groups. The channel decides how the item sits on the
calendar, what it needs before it can be scheduled, and what happens at go
time.

| Channel | Group | Shape | At go time | Tracked link and Shopify sync |
| --- | --- | --- | --- | --- |
| **Instagram post** | Social posts | Post: date and time | Publishes itself | Yes |
| **TikTok post** | Social posts | Post: date and time | Push to the assignee, then **Mark posted** | Yes |
| **Meta ad** | Social ads | Flight: start and end dates, budget | Goes **Live** on its start date, **Done** after its end date | Yes |
| **TikTok ad** | Social ads | Flight | Same as Meta ad | Yes |
| **Google Ads** | Google Ads | Flight | Same as Meta ad | Yes |
| **Shop Campaign** | Shopify | Flight | Same as Meta ad | No, Shopify tracks it |
| **Shopify Email** | Shopify | Send: date and time | Push to the assignee, then **Mark posted** | No, Shopify tracks it |

The four flight channels are the paid ones: they carry a budget and appear on
the Budget view. Shop Campaign and Shopify Email are Shopify's own, so they get
no tracked link and aren't pushed to Shopify Marketing, which would count them
twice.

The copy field is called **Caption** on posts, **Ad copy** on flights and
**Subject and preview** on Shopify Email.

What each needs before it can be scheduled:

| Channel | Needs |
| --- | --- |
| Every channel | A start time |
| **Instagram post** | A caption of up to 2,200 characters, at least one image or video, and a start time that hasn't passed |
| **TikTok post** | A caption no longer than 2,200 characters, if it has one |
| Flights | An end date on or after the start, if there is an end date |

## Creating an item

Use **New item** at the top right, the **+** on a calendar day (or click an
empty part of the day), or the **+** on the board's **Ideas** column.

| Field | Notes |
| --- | --- |
| **Title** | Required, up to 140 characters |
| **Channel** | Grouped as above. Remembers the last one you picked |
| **Date** (**Starts** for a flight) | Optional. Starting from a calendar day fills it in |
| **Time (ET)** | Posts and sends, once a date is set. Defaults to 12 PM |

With no date the item goes into **Ideas**; with a date it goes into **In
progress**. A flight given a start date runs seven days by default. **Create**
opens the item screen for everything else.

From the calendar, **New item** fills in the day the calendar is on (today,
unless you've paged away). Clear the date if it's only an idea.

## Stages

| Stage | Means | How it gets there |
| --- | --- | --- |
| **Ideas** | Not dated or not started | Created without a date |
| **In progress** | Being worked on | **Start working on it**, or created with a date |
| **Review** | Waiting for an approver | **Send for review**. Admins get a **Ready for review** push |
| **Scheduled** | Approved and locked in | **Approve and schedule**, Admin or GM only |
| **Live** | Out in the world | Automatic for Instagram and flights; **Mark posted** for the rest |
| **Done** | Finished | Automatic (see [At go time](#at-go-time)), or **Mark done** |

Only the move into **Scheduled** is checked. **Approve and schedule** stays
greyed out until the checklist under **Next step** is empty, and anyone else
who tries is told *Only an Admin or GM can approve and schedule. Move it to
Review instead.* Non-approvers see *An Admin or GM approves it into Scheduled.*
The approver's name shows as **Approved by** on the item.

Once an item is **Scheduled**:

- The title, copy, creative, dates, landing page and budget can only be changed
  by an Admin or GM, and their changes are checked against the list again.
  Everyone else sees *Scheduled items are locked. Ask an Admin or GM to
  unschedule it for changes.* Notes, campaign, products and assignee stay
  editable.
- The channel is locked from Scheduled on. Move it back to **In progress** to
  change it.
- **Unschedule** (Admin or GM) sends it back to **Review** and pulls a queued
  Instagram post.

Moving an item back to **Ideas**, **In progress** or **Review** clears its
approval, so it has to be approved again. **Back to In progress** is on items in
Review; **Move back to Live** is on items in Done.

## The calendar

The calendar opens on this month. **Month** and **Week** switch the range, the
arrows step back and forward, and **Today** comes back. Every time is shop time,
Eastern, wherever you are; the legend says **Times are ET**.

- **Posts and sends** sit in their day with a stage dot, the time and the
  channel icon. Month view shows three per day, then **+N more**, which opens
  that week in Week view. Week view shows each one in full with the assignee's
  initials.
- **Flights** are bars across the days they run, with the budget (for example
  `$50/day`).
- **Dates to plan around** run along the top of each week. See
  [Dates to plan around](#dates-to-plan-around).

The filter chips **All**, **Social posts**, **Social ads**, **Google Ads** and
**Shopify** narrow the calendar and the board. The view and range you're on are
kept in the page address, so a link to them opens the same place.

Click anything to open it. Drag to reschedule: a post keeps its time and changes
day, and a flight moves as a whole and keeps its length. **Live** and **Done**
items can't be dragged. Only an Admin or GM can move a **Scheduled** item, and
a Scheduled Instagram post can't be moved into the past. A refused move snaps
back with the reason in a message.

On a phone the calendar is a list of the days that have something on them. A
flight or a multi-day date is listed once, on its first day, with its end date.

## The board

Six columns, **Ideas** to **Done**, each with a count. It shows everything
unfinished plus what finished in the last 30 days. A card shows the channel, the
title, when it runs (**No date yet** if undated) and the assignee's initials.
Click a card to open it, or drag it to another column to move it.

For Admins and GMs, each card in **Review** shows either **Approve and
schedule**, which schedules it in one click, or how much is left, such as *2
things left before it can be scheduled*.

### Warnings on a card

A warning triangle on a card or calendar entry means something needs a look.
Hover it for the reasons; a number shows when there are several. Warnings don't
block anything.

| Warning | Meaning |
| --- | --- |
| **Publish failed** | Instagram refused the post. The reason follows |
| **Waiting on the publisher** | An Instagram post 15 minutes past its time that hasn't been picked up |
| **Overdue. Post it and mark posted** | A TikTok post or Shopify Email over an hour past its time, not marked posted |
| **Shopify sync failed** | See [Shopify Marketing](#shopify-marketing) |
| **No budget set** | A paid flight in Review, Scheduled or Live with no budget |
| **Overlaps "..." on ...** | Two Scheduled or Live paid flights pushing the same product on overlapping days |
| **Within 2 hours of "..." on ...** | Two posts on the same channel less than two hours apart |

## The item screen

There's no Save button. Text saves when you leave the field and pickers save as
you choose; the top right shows **Saving…** and then **Saved** with how long
ago. A teammate's edits show up live but never overwrite what you're typing.
**Marketing** at the top left goes back.

The main column:

| Section | What it's for |
| --- | --- |
| Title | At the top. Up to 140 characters |
| **Channel** | See [Channels](#channels). Locked from Scheduled on |
| **Campaign** | For ads, name it exactly as the campaign is named in the ad platform, so imported reports match it to this item |
| **Caption**, **Ad copy** or **Subject and preview** | The words that go out. Posts count against the 2,200 character limit |
| **Creative** | Images and videos, up to 10 |
| **Products it pushes** | Up to 10 products from the catalog (**Add**). The first one sets the default landing page, and two ads pushing the same product at once get flagged |
| **Landing page** | Where the link sends people. Must be an `https://` link. Left blank, it's the first product's page on the storefront, or the storefront home with no product |
| **Tracked link** | The landing page with tracking added, and **Copy** |
| **Notes** | Internal notes |

The side column:

| Card | What it's for |
| --- | --- |
| **Next step** | The stage buttons, the publish status, and the checklist of what's left before it can be scheduled |
| **Date** and **Time (ET)**, or **Starts** and **Ends** | When it goes out, or when a flight runs: from the start of its start day to the end of its end day. A flight with no end date runs until someone marks it done |
| **Budget** | Paid channels only. **Daily** or **Lifetime**, and an amount. Counts toward **Booked** on the Budget view |
| **Assignee** | Who owns it. On a TikTok post or Shopify Email, the person who gets the push at go time |
| **Results** | Appears once it's Live. See [Results](#results) |
| **Shopify Marketing** | Sync status and **Sync now**. Not shown for Shop Campaign or Shopify Email |
| **Delete item** | Click twice (**Click again to delete**). Pulls a queued Instagram post and removes it from Shopify. It can't be brought back from the screen |

The **Assignee** list shows people with the Employee, Shop Manager, General
Manager or Admin role. A Stream Manager without one of those can't be picked.

**Creative.** Drop files on the box or click **Add**: JPG or PNG up to 10 MB,
MP4 or MOV up to 300 MB, ten at most. For Instagram that's one image, one Reel,
or 2 to 10 files for a carousel. On other channels it's where the team keeps
the files so everyone works from the same ones.

**Tracked link.** Instagram posts, TikTok posts and the Meta, TikTok and Google
ads get a tracked link: the landing page with tags naming the channel (for
example `utm_source=instagram`) and this item. Use it in the post, bio or ad,
and orders that come through it are credited to the item. Shop Campaign and
Shopify Email show *Shopify tags ... links itself* instead.

:::note[Copy the link after it's scheduled]
Until an item is Scheduled, its tracked link changes when you rename the item or
its campaign. From Scheduled on it's locked in, so links already out keep
working.
:::

## At go time

The backend checks for due items every minute.

| Channel | What happens |
| --- | --- |
| **Instagram post** | Publishes itself. **Next step** shows **Queued to publish**, **Publishing**, **Instagram is processing the video** for Reels, then **Published** with **View the post**. The item moves to **Live** |
| **TikTok post**, **Shopify Email** | Reads **Reminder set for go time** while Scheduled. At its time the assignee gets a push, *Go time: TikTok post*, telling them to post it and tap Mark posted. The status becomes **Due now. Post it, then mark posted** |
| **Meta ad**, **TikTok ad**, **Google Ads**, **Shop Campaign** | Reads **Runs in** and the platform. Moves to **Live** (**Running**) on its start date and to **Done** (**Ended**) after its end date |

:::caution[Scheduling an ad doesn't launch it]
Ads run in Ads Manager, Google Ads or Shopify on their own schedule. Marketing
plans and tracks them; it never starts, pauses or stops one. Set the ad up on
its platform as well.
:::

**Mark posted.** After posting a TikTok or sending the email by hand, press
**Mark posted**, add the **Link to the post (optional)** (it must start with
`https://`), and press **Mark posted** again. The item moves to **Live** with
the status **Posted**. If the item has no assignee, or the push to them can't be
sent, the push goes to the Admins.

**When Instagram fails.** **Publish failed** shows the reason. Errors that may
clear on their own are retried, three tries in all, and a video Instagram is
still processing after 30 minutes fails. To try again, an Admin or GM fixes the
problem and sets a new time: saving a change to a Scheduled Instagram post
queues it again. If it was posted another way, **I posted it by hand** marks it Live and
pulls it from the queue. **Waiting on the publisher** means the publisher isn't
running; tell a developer. While Instagram is publishing, edits are refused for
a minute (*Instagram is publishing this right now. Try again in a minute.*).

:::caution[Check Instagram before re-posting]
If the reason reads *The publisher stopped partway through. Check Instagram
before posting it again.*, the post may already be up. It isn't retried.
:::

**Done.** Posts and sends move to **Done** seven days after going live, flights
after their end date. **Mark done** closes either sooner.

## Shopify Marketing

Items with a tracked link are pushed to Shopify's Marketing section, so their
traffic and sales show in Shopify's own reports. An item is first sent when it's
Scheduled, then after every change, when it goes live and when it's done.
Spend from imported reports goes with it, and deleting the item removes it from
Shopify.

| Badge | Meaning |
| --- | --- |
| **Syncs once scheduled** | Not sent yet |
| **Synced to Shopify** | Up to date, with **Last synced** and when |
| **Shopify sync failed** | Shopify refused it. The reason shows under the badge |
| **Needs the write_marketing_events scope** | The shop's Shopify app isn't allowed to write marketing activity yet. A developer has to add it |
| **Removed from Shopify** | The item was deleted |

**Sync now** (from Scheduled on) sends it again. A failed sync never stops the
item saving or going out.

## Results

Once an item is **Live** or **Done**, **Results** shows:

- **Orders from the link** and **Revenue from the link**: Shopify orders traced
  to this item's tracked link, placed from its start to two weeks after it
  ended, 60 days at most.
- For ads with a matched report: **Spent (report)** and **Clicks (report)**.

An order is traced first by the tags the website carries through checkout,
which is the most reliable, and failing that by Shopify's record of the
customer's last visit, then first visit. The mobile app doesn't carry the tags
through yet, so orders placed in the app are usually not credited. Shop
Campaign and Shopify Email results are in Shopify's Marketing reports.

## Budget

**Budget** covers one month of the four paid channels. The arrows change month.

Across the top: **Planned**, **Booked on the calendar**, **Spent**,
**Projected** (marked when it's over plan), **Platform-reported revenue** and
**ROAS**.

| Column | What it is |
| --- | --- |
| **Planned** | What you mean to spend this month. Type it in; it saves when you leave the box (**Budget saved**) |
| **Booked** | What the calendar's flights commit this month. A daily budget counts each day of the flight in the month. A lifetime budget is spread evenly over the flight's days. With no end date, a daily budget counts to month end and a lifetime one lands in its start month |
| **Spent** | From imported reports |
| **Projected** | Spend so far, run out to month end at the same daily rate, from the last day the reports cover. For a past month, the spend |
| **Revenue** | The conversion value the platform reports, from the imports |
| **ROAS** | Revenue divided by spend, or **No spend** |
| **Report** | **Import**, or **Imported** and how long ago |

Under each channel a bar shows spend against plan with a marker for the
projection, and **Projected over by** an amount when the projection beats the
plan. **Booked** counts every dated flight with a budget, whatever its stage.

:::note[Two different revenue numbers]
**Revenue** here is what the ad platforms report. **Revenue from the link** on
an item comes from Shopify orders. Expect them to differ.
:::

### Importing an ad report

Spend comes from each platform's own export; Marketing doesn't connect to the ad
accounts. **Import a report**, or **Import** on a channel's row, opens **Import
an ad report**.

1. Pick the **Channel**. The hint says where to export from:
   - **Google Ads**: *Campaigns, add the Day segment, then Download as CSV.*
   - **Meta ad**: *Ads Manager: Reports, Breakdown by Day, Export as CSV.*
   - **TikTok ad**: *TikTok Ads Manager: Reporting, group by Day, Export as CSV or XLSX.*
   - **Shop Campaign**: *Shopify: Marketing, Shop Campaigns, export the campaign report with a daily breakdown.*
2. **Choose a CSV or XLSX export**. Only the first sheet of a workbook is read.
3. Check the preview. Nothing is saved yet. It shows **Days**, **Rows**,
   **Spend** and **Conv. value**, which columns it read, how many total or blank
   rows it skipped, any warnings, and each campaign in the file with *matches*
   and the item's title, or *no calendar item with this name*.
4. **Import** and the row count saves it.

- A campaign matches an item on the same channel when its name equals the item's
  **Campaign**, its title, or the campaign in its tracked link, ignoring case.
- Importing the same days again replaces them, so a corrected export doesn't
  count twice.
- Files over 900 KB are refused (*That report is over 900 KB. Export a shorter
  date range.*), and up to 20,000 rows are read.
- A file with no cost column is refused. One with no conversion value column
  imports with revenue and ROAS at 0, and one with no campaign column can't be
  matched to items. The preview warns about both.
- Matched items send their spend to Shopify on their next sync.

## Dates to plan around

The top of each calendar week carries the dates everything else is planned
around. Hover one for its kind and details.

| Kind | Where it comes from | Changed in |
| --- | --- | --- |
| Set releases | New sets for Pokémon, One Piece, Magic and Riftbound, pulled from Scrydex | Can't be changed |
| Card shows | [Shows](./shows.md), across the show's dates, with venue and city | Shows |
| Giveaways | [Giveaways](../community/giveaways.md), on the draw day | Giveaways |
| Your own dates | **Add a date** | Click it on the calendar |

**Add a date** asks for the kind (**Set release**, **Pre-order window** or
**Event**), **Title**, **Starts**, **Ends**, **Game** (**Any game** or one of
the four) and **Notes**, then **Save**. Click one of your own dates to change it
(**Edit date**) or **Remove** it (click twice).

If a source can't be reached the legend says **Some dates couldn't load**;
hover it to see which. A show or giveaway added after you opened Marketing shows
up once you reload the page.

## Related

- [Locked features](../getting-started/locked-features.md): how the Marketing
  Suite gets turned on
- [Roles & Access](../administration/roles-and-access.md): granting the
  **Marketing** tab
- [Who can see what](../reference/role-matrix.md): the default roles
- [Shows](./shows.md) and [Giveaways](../community/giveaways.md): the dates on
  the calendar
