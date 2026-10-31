---
title: Ask an AI for help
sidebar_position: 5
description: Copy any page into ChatGPT, Claude or Gemini and ask your question in plain English.
---

# Ask an AI for help

Reading a whole page to find one answer is slow. Every page on this site has a
**Copy for AI** button in the top right — press it, paste into whichever
assistant you already use, and type your question like you'd ask a coworker.

:::note[This is about the docs, not about the shop's data]
Pasting a page gets you answers about **how a screen works**. For questions about
what's actually happening in the shop — *how did we do this month*, *what should
I be reordering* — that's [Professor Oak](../operations/professor-oak.md) and the
tools behind it, which read live data.
:::

## How to use it

1. Open the page for the screen you're stuck on. If you're on **Sell Requests**
   in the dashboard, open [Sell Requests](../operations/sell-requests.md) here.
2. Press **Copy for AI**. The button changes to *Copied — paste, then ask*.
3. Open ChatGPT, Claude, Gemini, Copilot — whatever you already have.
4. Paste (`⌘V` on a Mac, `Ctrl+V` on Windows).
5. **Type your question at the bottom, then send.**

:::tip[Step 5 is the one people miss]
The paste is long, so it's easy to hit send as soon as it lands. Type your
question first — the paste ends with `MY QUESTION:` and your cursor is already
in the right place.

Send it blank and the assistant will offer you a few things it can answer about
that screen, so it's recoverable. But you'll get there faster by just asking.
:::

You don't need to know anything about writing prompts. The instructions are
already in what you pasted.

## What actually got copied

The whole page, plus a short instruction telling the assistant to answer only
from this documentation, to use the real button names so you can find them on
screen, and to say "that's not covered" rather than invent an answer.

That last part matters. Ask an assistant about MoBros with no context and it
will happily make up a plausible-sounding button that doesn't exist. Giving it
the page first is the difference between a useful answer and a confident wrong
one.

## Questions worth asking

Real ones, from real confusion:

> A submission has been sitting on Approved for four days. Is that a problem?

> I want to change what we pay for played Pokémon singles but not sealed. Where
> do I do that and what do I need to be careful about?

> What's the difference between marking a card processed and listing it?

> Someone reported a post in the Hit Feed. Walk me through what to do.

> We're 6% liability against revenue. Is that bad, and what would bring it
> down?

Follow-up questions work too — the assistant still has the page, so you can
just keep asking.

## When one page isn't enough

Some questions cross screens: *"a customer bought a game spot and now wants to
sell us cards — what happens on our side?"*

For those, copy each page you need in turn and paste them one after another
before asking. Most assistants handle three or four pages comfortably.

:::note[Give it the text, not the link]
This site is behind staff sign-in, so an assistant can't open a page for you —
it isn't signed in, and it never will be. Pasting a link gets you a made-up
answer based on the URL.

Copy and paste the text. That's what the button is for.
:::

## What it can't do

The assistant is reading documentation. It is not connected to the dashboard.

- It **cannot see your data** — your inventory, your customers, your queue.
- It **cannot do anything for you**. It can tell you which button to press; it
  can't press it.
- It only knows what's written here. If a screen changed and this site hasn't
  caught up, the assistant will confidently repeat the stale version.

Anything involving real money — refunds, rate changes, marking a game complete
— check with a manager rather than an assistant.

:::caution[Don't paste customer information into it]
Copying a page is fine, it's public documentation. Typing a customer's name,
email, address or order details into a public AI tool is not. Describe the
situation without the identifying details: *"a customer's submission"*, not
*"Jane Smith's submission, jane@…"*.
:::

## If the button doesn't work

Press it once more — the first press occasionally fires before the page has
finished loading.

Still failing? Select the page text with your mouse and copy it the normal way.
That works fine; you'll just be pasting the page without the instruction block,
so add a line like *"answer using only the documentation below"* yourself.

If you're seeing the sign-in screen instead of the page, your session ended —
sign in again and carry on.
