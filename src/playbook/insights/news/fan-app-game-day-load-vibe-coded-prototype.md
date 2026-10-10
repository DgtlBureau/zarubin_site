---
title: 'Hockey Fan App on Game Day: Why Vibe-Coded Prototypes Break'
description: 'A vibe-coded hockey fan app with a sports CRM and a fan reward system works in the demo and fails after the first goal. What to keep and what to rebuild.'
image: '/assets/images/info/rbc-center-game-day-2006.webp'
imageSource: 'Photo: jay cuthrell, Washington Capitals at Carolina Hurricanes, RBC Center, Raleigh, April 3, 2006, Wikimedia Commons, CC BY-SA 2.0'
date: '09-10-2026'
readingTime: '9 min'
category: 'Insights'
subCategory: 'News'
tag: 'hockey fan app, sports CRM, fan reward system, game day, live sports data, real-time architecture, vibe coding, AI-generated prototype, sports app development, load testing, hockey'
authorName: 'Vitaliy Zarubin'
authorImage: '/assets/images/author/avatar.png'
faq:
  - question: 'How much traffic does a hockey fan app get on game day?'
    answer: 'A full NHL arena holds about 18,700 people. If half of them open the app in the thirty seconds after a goal, that is roughly 300 app opens per second, and each open fires five to ten requests, so the backend sees 1,500 to 3,000 requests per second for half a minute. Fans watching on TV or a stream react several seconds to a minute later, and there are more of them than people in the building. The system has to be sized for the thirty seconds after a goal.'
  - question: 'Can a vibe-coded prototype be used as the production fan app?'
    answer: 'The screens usually can, and the backend usually has to be rebuilt. AI code generators default to patterns that work for ten users: polling every second, a direct database read per request, one server, no cache, no queue. Those patterns fail when the whole building opens the app at once. We keep the UI and the prompt history as the specification and rebuild the data path.'
  - question: 'What is the most expensive thing to break on game day?'
    answer: 'Ticket scanning at the gates. If the live score lags by ten seconds, fans complain. If 18,000 people cannot get through the doors, the game starts with empty seats and the club pays in refunds and reputation. The ticket has to validate without the network, with a code that changes every few seconds so a screenshot cannot be reused, and scanners that share each scan with each other.'
  - question: 'Does a hockey fan app need its own CRM and reward system backend?'
    answer: 'It needs one, and it does not have to be new. The app should read tickets, fan profiles and reward points from the club sports CRM through a cache, and write to it through a queue. Clubs that use Revanta connect the app to it instead of building a new database.'
---

The photo above is from April 2006, the season Carolina won the Cup. In the stands almost nobody is holding a phone. Twenty years later the same building holds the same 18,700 people, and most of them walk in with a device that expects the club to talk to it: the ticket, the score, the replay, the beer order, the push notification when the home team scores.

That change is what makes a hockey fan app a hard engineering problem. It is also the part that gets lost when a club arrives with a vibe-coded prototype that already shows tickets, the live score and a fan reward system, and asks for it to be live by the home opener.

## The vibe-coded prototype that works on a Tuesday

This happens more and more often. A club, or a marketing agency working for the club, builds a fan app in a weekend with an AI coding tool. It has the schedule, the live score, a reward system with points for attendance, a feed, and a login that reads the fan profile from the club CRM. It runs on a phone, it looks good, the president has seen it. Then it comes to us with a simple request: polish it and ship it before the home opener.

I like these prototypes. They are usually the clearest requirements document a club has given us. In January I wrote about [a club and an agency that ended up in arbitration](/playbook/insights/sports-club-website-disaster-court) because nobody wrote down what the website was supposed to do. A vibe-coded prototype solves most of that problem, and I wrote a separate [guide on buying from an agency that works this way](/playbook/expertise/vibe-coding-agency-buyers-guide).

The problem is in the part nobody sees in the demo. When we open the code, the backend almost always looks the same, because the tools generate what works fastest for the person sitting in front of them:

- The app asks the server for the score every second, for every user.
- Every request reads the database directly, and the CRM behind it, for the profile and the reward balance. No cache, no snapshot.
- Everything runs on one server, often one container, or on a serverless platform that opens a new database connection for every request.
- Push notifications go out in a loop, one by one, from the same process that serves the API.
- The ticket QR code is fetched from the server at the moment the fan reaches the gate.
- Secret keys for the stats provider and the payment service are in the app bundle.

For ten users in a demo this design works fine, and ten users is the only load it has ever been tested at.

## What game day does to a hockey fan app

Game day traffic has little to do with averages. It is a series of spikes, and the spikes are synchronized by the game itself.

Take the arena at capacity, about 18,700 people. The home team scores. Within thirty seconds a large share of the building pulls out a phone to check the replay, the scorer, the time. Say half of them open the app. That is roughly 300 app opens per second, and each open typically fires five to ten requests: the score, the feed, the user profile, the wallet, the ads. Without polling, the backend sees 1,500 to 3,000 requests per second for half a minute, after a long stretch of light traffic. With the prototype's polling, the quiet stretch does not exist. Every phone with the app open asks for the score once a second, which can already mean thousands of requests per second before anyone scores.

Fans watching on TV or a stream see the goal several seconds to a minute later, so their spike comes after the one in the building and lasts longer. There can be far more of them than the 18,700 in the arena.

Then intermission. Everyone checks the score, orders food through the app, looks at the reward points, and does it in the same fifteen minutes. Then the final horn, when the app gets the last spike of the night and the same people start looking up parking and the schedule for the next game.

There is also a limit that has nothing to do with the club's servers. Eighteen thousand phones in one building share a handful of cell towers and the arena Wi-Fi, and both slow down at exactly these moments. A request that takes 200 milliseconds on a Tuesday can take ten seconds or fail in the third period. Every screen has to work on a slow, unreliable connection, and every failed request that the app retries automatically adds load at the worst moment.

This prototype design handles game day badly, in a predictable order. The polling multiplies by every open app into a constant base load that the single server can barely handle before the goal. The goal spike then lands on everything the prototype calls directly. The CRM and the stats provider have request limits and start refusing calls first, so reward balances and the score go blank. Then the database runs out of connections, because the hosting opens a new one for every request. Once the API is slow, the push loop in the same process slows too. Sending one notification at a time to 18,000 fans takes many minutes, so the goal alert arrives long after the goal. The fan at the gate whose phone is still waiting for the QR code is the one who misses the start of the game, and that is the failure the next section is about.

## The gates are the expensive failure

I want to separate those failures by cost, because they are not equal.

A score that lags ten seconds is annoying. Fans complain on social media and forget by the second period. A push notification that arrives late costs the club attention and rarely costs it money.

Ticket scanning is different. If the app cannot show a ticket because the server is busy serving score requests, people stand at the doors. The game starts with empty seats, the club refunds, and the next time the fan prints a PDF instead of trusting the app. This is why the ticket cannot depend on the live backend at all.

The ticket is stored on the device the day before. The code on screen changes every few seconds, generated from a secret stored with the ticket, so a screenshot stops working almost at once and the app does not need the network to show a valid code. The scanners at the gates check the code locally and share each scan with each other over the arena's own network, so the same ticket cannot get in through two doors. They also pull ticket transfers and refunds until the doors open, and again during the game for late arrivals. Offline validation keeps the line moving, and it creates a fraud risk that the design has to handle. The scanning path and the live score path should not share a server, a database or a deploy.

## How we build the data path behind the app

We have built fan apps with ticketing, CRM and loyalty for professional hockey clubs, including [Torpedo](/cases/torpedo). The UI from the prototype stays. The data path gets rebuilt around one principle: the number of people in the building must not change the number of times anything expensive happens.

**One source of truth for the live score.** The score comes from the league or the stats provider as a feed. One process reads that feed and writes the current state to a cache. Nobody else talks to the provider. The 18,000 phones never touch it, and the provider never rate-limits the club in the second period.

**Fan-out instead of polling.** The phones hold an open connection, through WebSockets or server-sent events, and get the update pushed when the score changes. The server does one write per event and the connection layer fans it out. A phone only holds that connection while the app is open on screen, because the operating system closes it when the fan puts the phone away. So each goal brings thousands of new connections at once, each one asking for the current score first, which is another reason that score is kept in the cache. When the arena network drops for a moment, every phone tries to reconnect in the same second, so the app waits a random delay of a few seconds before reconnecting and the reconnections spread out.

**Edge cache for public data only.** Data that is the same for everyone, such as the score, the game clock and the public feed, is cached at the CDN edge for one to two seconds. The CDN is also set to send only one request to the origin when many identical requests arrive at once and to make the rest wait for that answer. With both in place, a thousand simultaneous requests for the score become one. Anything personal, such as the profile, the wallet or the reward balance, is never cached at the edge, because a mistake there shows one fan's data to another.

**Queues for writes.** Reward points for the check-in and profile edits go into a queue, and the sports CRM and the fan reward system receive them in batches instead of one write per fan at the moment of the goal. In our own builds this is how the app talks to [Revanta](/revanta/loyalty): check-ins and points arrive in batches, and the fan profile is served from a snapshot. Food orders are split in two. The payment approval happens right away, because the fan needs to know the order is real, and the kitchen ticket and the CRM update go through the queue. Every request carries a unique ID created on the phone, so when a slow network makes the app send the same order twice, the server recognizes the copy and processes it once.

**Push through a topic.** Push notifications leave the API process entirely. The club sends one message to a topic that all subscribed fans follow, and Apple and Google handle delivery to each phone. Their delivery is not instant either, and for fans watching a delayed stream a fast alert can give the goal away before they see it, so the timing is a product decision as well as a technical one.

**The ticket path is offline-first.** The rotating code is stored on the device the day before, and the scanning service is deployed and monitored separately from the live score.

**A load test that replays a game.** A flat test at some number of requests per second proves little. We script a game: a quiet first period, bursts at every goal, a flood at intermission, a spike at the horn. The test simulates thousands of separate phones on a slow, lossy network, because one fast load machine never shows the reconnects and retries. The same script runs before every home opener, because the app changed over the summer and so did the set of integrations behind it.

**Secret keys off the device.** The stats provider key, the payment secret and the push signing key move to the server, and the app talks to the club backend only. Public keys that are meant to be in the app stay there. Load has nothing to do with this item. A secret key in the bundle can be pulled out of the app in an afternoon by anyone who downloads it.

## What the vibe-coded prototype is still good for

The club spent a weekend on the prototype and got something valuable: a clickable, agreed-upon specification. We keep three things from it. The screens, because the club's management has already approved them. The prompt history, because it records the decisions and the order they were made in. And the list of integrations the prototype tried to call, because that is the integration plan.

The data path gets rebuilt, and the club should plan for that from the start.

## Where I am less sure

Cost. A real-time stack sized for a goal in the third period is idle for most of the week. Serverless and autoscaling help with the bill, but functions that scale up from zero at puck drop add latency at the exact moment latency matters, so some capacity has to be warm before the game, and that capacity is paid for whether the game is a blowout or a shootout. We size it per club from the schedule and the attendance, and I do not have a general rule for it yet.

The other open question is how far the prototype tools will move. The tools produce these patterns by default, and they can be told to do otherwise. If the next generation of coding tools starts producing a cache layer and a queue by default, this article gets shorter. For now, the club that shows up with a working prototype and a home opener in six weeks should budget for the backend to be rebuilt and use the prototype as the written brief for that work.

If you have a prototype and a date, [send it to us](https://thebrightbyte.com/brief) with the schedule. We will tell you which parts survive and what a game-day replay test would show. For ticketing, the sports CRM and the fan reward system, the app does not need a backend written from scratch. Revanta is the platform we built for hockey clubs, and the fan app reads [tickets](/revanta/ticketing) and [fan profiles and points](/revanta/loyalty) from it.
