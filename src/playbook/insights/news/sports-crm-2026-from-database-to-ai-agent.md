---
title: 'Sports CRM in 2026: When the Database Starts Deciding'
description: 'Hockey clubs are shifting from CRM-as-database to CRM-as-agent. What a next-gen sports platform must do in 2026, and how Virazh delivers it.'
image: '/assets/images/info/carolina-hurricanes-stadium-series.webp'
imageSource: 'Photo: 1995hoo, 2023 NHL Stadium Series (Capitals vs. Hurricanes, Carter-Finley Stadium), Wikimedia Commons, CC BY-SA 4.0'
date: '14-06-2026'
readingTime: '7 min'
category: 'Insights'
subCategory: 'News'
tag: 'sports CRM, hockey CRM, fan engagement, sports marketing AI, loyalty, ticketing, dynamic pricing, Virazh, KHL, Stanley Cup 2026'
authorName: 'Vitaliy Zarubin'
authorImage: '/assets/images/author/avatar.png'
faq:
  - question: 'What is the difference between an old sports CRM and a next-generation one?'
    answer: 'An old CRM stores profiles, ticket history, and loyalty tiers, and waits for a marketer to query it. A next-generation system reads the same data and acts: it scores churn risk, writes the personal message, prices the seat, and increasingly decides the next best action per fan on its own. The data is similar. What changed is that the software now does the work instead of holding it.'
  - question: 'Do we need a data science team to use AI in fan engagement?'
    answer: 'No, not for the first wins. The analytical and generative layers (churn scoring, personal emails, dynamic pricing) now run on open-source models and APIs that a platform sets up for you. You need a clean ticketing and loyalty base, not a team of ML engineers. The fully autonomous agent layer does need mature data and trust, which is why it comes last, not first.'
  - question: 'What can a Russian club actually deploy today given sanctions?'
    answer: 'Everything in the analytical and generative layers, using Russian infrastructure. Virazh integrates with Я.Билеты and Infotech for ticketing, 1С-Bitrix for the store, Яндекс Плюс for co-brand loyalty, and 1С for inventory and finance. No Western SaaS you cannot pay for or get support on. SaaS deployment takes about two weeks.'
  - question: 'How fast does a system like this pay for itself?'
    answer: 'The fastest return is usually churn prevention on season tickets. On a 5,000-seat base, holding an extra 15% of renewals is 750 households you keep. Multiply by your average season-ticket price and the model typically covers its cost inside a month. Dynamic pricing and personal offers stack on top of that.'
---


Tonight the Carolina Hurricanes can lift the Stanley Cup. Game 6 in Vegas, the series at 3-2, and Raleigh has not been this close since 2006.

Most people miss one thing about that team. Carolina is the analytics club of the NHL. Tom Dundon bought the franchise and ran it like a quant fund: shot-quality models, deployment data, expected goals on everything. The edge on the ice came from treating data as the product.

Now look at the business side of most clubs, including some with championship rosters. The CRM is a parking lot. Names, emails, a few ticket purchases, and a marketer who exports the whole thing to a spreadsheet every Monday. The team plays like it is 2026. The marketing department works like it is 2012.

That gap is now a software gap. And it closed faster than anyone expected.

## The economics flipped

Until recently, writing one personal email, cutting one custom video, or building one offer for a single fan cost more than that fan would ever pay back in a season. So marketing ran on blanket promo codes and segments of five to ten thousand people. You blasted everyone with "10% off" and hoped.

Then the price of generating a personal message dropped 50 to 100 times between 2023 and 2025. What used to need a team of ML engineers and a custom model now assembles on an API in a month. The base unit of marketing work became the token, and that changes the math on everything else.

By the way, this is the same shift that hit my own field. A RAG system that needed a research grant in 2020 is a weekend project now. Sports marketing just got the same gift, a year or two later.

## The CRM stops being a filing cabinet

In practice, the shift looks like this. Until 2024 a sports CRM was storage: profiles, history, maybe a loyalty tier. You queried it. It did nothing on its own.

Now clubs run agent models on top of the same data. Salesforce Agentforce at the Indiana Pacers reads a single fan profile, watches behavior over the last 24 hours, and decides what to send that person right now. The marketer sets a goal, say "lift season-ticket renewals," and the system picks the action for each individual. The Pacers case logged more than a million profiles handled with one-to-one decisions in real time, and the marketing team cut manual segmentation work by five times.

The CRM became an employee that works around the clock on every fan. That is the category change. Everything else is detail.

## Three waves, and the order matters

Three kinds of AI live in club marketing at once, and clubs keep confusing them.

**Analytical AI** is the mature one. Forecasts, churn scoring, clustering, anomaly detection. It has shipped quietly since 2018. A churn model flags the season-ticket holder who will not renew four to eight weeks out, while there is still time to call. On a 5,000-seat base, holding an extra 15% of renewals is 750 households you did not lose. Run that against your average season-ticket price and the model pays for itself in a month.

**Generative AI** went mass-market in 2023. Text, images, video, voice. One marketer does the work of three copywriters: a different email for the family with young kids, the student, the twenty-year veteran ("you have been with us since 2014, 47 games"). Formula 1 on Agentforce got +22% email opens right after the switch. Wembley put in a ticketing-and-support chatbot and booked $1.5 million in extra revenue over eight months, a 2,335% return. That number is not a typo, and yes, I went and checked the source twice.

**Agentic AI** is the frontier, 2025 into 2026. The system does not just predict or write. It decides and acts. That is the Pacers example, and it is the hardest to deploy, because it needs a clean data core and a team that trusts it.

The order is fixed: analytics first, then generation, then agents. Each layer stands on the one below. Run it backwards and you get an expensive agent making confident decisions on garbage data. I have watched a club try. It was not pretty.

## What a next-generation club system has to do

Strip the hype and the checklist is short.

A single core. Tickets and access control, loyalty, the store, the website CMS, and messaging all reading from one profile. If your ticketing lives in one tool and your email in another and they sync once a night, you do not have a fan profile. You have four half-fans.

Communication built in. Email, SMS, and push with trigger chains, not a separate sending tool you bolt on. The trigger fires off live match data and the fan's behavior, and stops the second they buy.

ML trained on your data. Churn, propensity to buy, dynamic pricing. Real Madrid's dynamic pricing pulled +29% matchday revenue in the first season. The Golden Knights, the team Carolina is playing tonight, sit in a league where this is already table stakes.

An assistant a human can actually use. The kind that says "your MAY25 promo converted at 4.2%, want to A/B test a new one?" and then runs the campaign when you say yes. A dashboard nobody opens does not count.

## Where Virazh fits

This is the system we built. Virazh is our sports platform, and it is the Russian answer to the stack above, in production right now.

One core: ticketing and access (БПС+СКД), loyalty with tiers and points, base segmentation, email/SMS/push with trigger chains, an online store synced to 1С, a full website CMS, and C-level dashboards. The marketing assistant trains an ML model on your data and comes back with recommendations: dynamic pricing, when to open sales, how to enrich the base. Set a goal, get actions.

The integrations are the part that matters for a Russian club today. Я.Билеты and Infotech for ticketing, 1С-Bitrix for the store, Яндекс Плюс for co-brand loyalty, 1С for inventory and finance. SaaS deployment takes about two weeks. Pricing runs 85,000 ₽/mo for the CRM core, 135,000 for the full Tribune build with the AI assistant and store, and 295,000 for the works, with a mobile app and custom C-level reporting.

Now the honest part about those three waves. Our analytical and generative layers are live today. The agentic layer, the self-driving "next best action" agent, is where we are building now (RAG, the second iteration of AI responses). I would rather tell you that than sell you a Pacers demo we cannot yet match. Anyone promising a fully autonomous marketing agent for a 5,000-fan club today is selling a slide.

We have run this for KHL and RPL clubs already: HC Torpedo, HC Admiral, Krylia Sovetov. Torpedo's digital platform handles more than 100,000 fans.

## The closer

Carolina built a contender by deciding its data was worth treating as a first-class asset. Most clubs already own the same asset on the business side. Every ticket scan, every store purchase, every email open, sitting unused in a CRM nobody loves. The clubs that turn that pile into action this season will spend the next one wondering why they waited. The ones who keep exporting to spreadsheets will keep blasting "10% off" at people who would have paid full price.

Whoever lifts the Cup tonight, the scoreboard that matters off the ice is renewal rate. And that one you can actually move.

Want to see what your data can do? [Book a call.](https://thebrightbyte.com/brief) We will look at your base, your ticketing, and your channels, and name the two or three moves that pay back fastest this quarter.

## Sources

- [Pacers Sports & Entertainment × Salesforce Agentforce](https://www.salesforce.com/customer-stories/pacers-sports-entertainment/)
- [Formula 1 × Salesforce Agentforce](https://www.salesforce.com/news/press-releases/2026/03/03/formula-1-agentforce-to-grow-fan-connection/)
- [Wembley × chatbot ROI](https://www.text.com/blog/sports-ai/)
- [Real Madrid dynamic ticket pricing](https://www.callplaybook.com/reports/top-5-ai-marketing-strategies-for-dynamic-ticket-pricing)
- [Golden State Warriors × Google Cloud](https://cloud.google.com/customers/golden-state-warriors)
- [2026 Stanley Cup Final schedule and results, NHL.com](https://www.nhl.com/news/2026-stanley-cup-final-schedule-television-results)
