---
title: "Why We Won't Ship You 10 Apps a Month"
description: "Vibe coding agencies promise ten apps a month at $4K each. Here is what they cost in fintech CVEs, breaches, and lost banking deals."
image: '/assets/images/info/bob-van-aubel-xEcYf8S1MTg-unsplash.webp'
date: '04-05-2026'
readingTime: '10 min'
category: 'Insights'
subCategory: 'Notes'
tag: 'Vibe coding, AI-native agency, fintech security, software craft, vibe coding risks'
authorName: 'Daniella Mitchell'
authorImage: '/assets/images/author/daniella_mitchell.jpg'
faq:
  - question: 'Are you saying vibe coding does not work?'
    answer: 'It works. For prototypes, weekend tools, internal dashboards, and marketing pages, it is genuinely the fastest way to ship value. The argument in this piece is narrower: the same model walks into fintech and healthtech sales calls promising the same throughput, and that is where the math collapses. The speed gain is real and small. The downside, in regulated work, is real and large.'
  - question: 'What is the actual security risk with AI-generated code?'
    answer: 'Veracode 2025 measured 45% of AI-generated code as containing an OWASP Top 10 vulnerability at first commit. CodeRabbit reported a 2.74x higher rate of exploitable issues in AI-authored pull requests. The Cloud Security Alliance Vibe Security Radar tracked CVE growth from 6 in January 2026 to 35 in March, a 5.8x jump in 90 days. The pattern is consistent across studies.'
  - question: 'How does this differ for fintech vs other industries?'
    answer: 'Three reasons. PCI DSS 4.0.1 controls (script inventory, integrity, MFA on all CDE access) are not part of vibe-coding pipelines. DORA Article 28 makes the financial entity liable for vendor failures, so "we used Lovable" is not a shield. And the cost of a breach is not just the payout, it is a permanent asterisk on the company name in underwriting databases that you do not get back.'
  - question: 'What does thebrightbyte do that vibe coding agencies do not?'
    answer: 'Threat model on day one. RLS policies committed to migrations, not toggled in a dashboard. Audit logs sized to the regulatory retention window. Code review by humans with industry experience. CI gates that fail builds on missing CSP, dependency confusion, and egress to non-allowlisted domains. None of this is exotic. It is just slow and expensive to do correctly, which is why most $4K-per-app shops skip it.'
  - question: 'When is a vibe coding agency the right choice?'
    answer: 'Internal tools where breach impact is low. Marketing landing pages. Founder-mode prototypes for product discovery. Anything you would be comfortable rebuilding from scratch in three months if it failed. The agency model fits perfectly there. The trouble starts when the same shop pitches the same throughput for a customer-facing fintech app. Match the vendor to the failure mode.'
---

# Why We Won't Ship You 10 Apps a Month

*A fintech CTO sent me a Slack message at 11pm last week. He had been pitched by an AI-native dev shop that promised ten apps a month at $4K per app, "production-ready" delivery in two weeks. Their landing page had video testimonials, a Notion-style portfolio, and a Cal.com link. He wanted to know if the math worked. I asked him one question back: did the agency mention RLS, audit trails, or evidence of pen testing? He sent a screenshot of their pricing page. None of those words appeared anywhere.*

*Three days later he forwarded me a CVE notification.*

This is the kind of conversation I have been having every other week since the start of 2025. Andrej Karpathy [coined the term "vibe coding"](https://x.com/karpathy/status/1886192184808149383) in February 2025, and within nine months a wave of AI-native dev studios had productized it. Cursor in the IDE, Lovable in the browser, Bolt for the prototype, Cal.com for the close. The whole stack fits on a one-page proposal.

I am not here to argue the practice does not work. It does, beautifully, for the right kind of project. The person who hires three vibe coders to ship a weekend tool, an internal dashboard, or a marketing landing page gets exactly what they paid for, and the outcome is fine. The trouble starts when this same model walks into a fintech meeting and pitches the same throughput numbers.

So let me put a stake in the ground for thebrightbyte and the kind of buyers we work with. The shop that sells you ten apps a month is selling a different product than we are. We ship one app at a time, and we ship it slowly enough to be defensible in front of an auditor. The argument follows.

## What the data actually says

Veracode's [2025 State of Software Security](https://www.veracode.com/state-of-software-security-report) found that 45% of AI-generated code contains an OWASP Top 10 vulnerability at first commit. CodeRabbit independently reported a 2.74x higher rate of exploitable issues in pull requests authored predominantly by AI. The Cloud Security Alliance's Vibe Security Radar tracked CVE growth in vibe-coded apps from 6 in January 2026 to 35 in March, a 5.8x jump in 90 days.

Those are aggregate numbers. The named cases are worse.

In late 2025 a vulnerability in Lovable (CVE-2025-48757) exposed at least 170 production applications because the platform shipped Supabase schemas without Row Level Security enabled by default. Tea App leaked 72,000 user photographs and 1.1 million private messages after a misconfigured storage bucket. Moltbook, a vibe-coded notes service, exposed 1.5 million authentication tokens in the same quarter. The pattern in every post-mortem is the same: someone shipped fast, the boilerplate had a quiet default, the auditor never came.

A vibe-coded fintech in January 2026 [shipped a user list to the frontend bundle](https://stackoverflow.blog/2026/01/02/a-new-worst-coder-has-entered-the-chat-vibe-coding-without-code-knowledge/), where an attacker scraped Stripe keys from environment variables that had been inadvertently inlined into the JS bundle. The attacker refunded every customer in the database. By the time the founder noticed, his card processor had a six-figure clawback queued and a hold on incoming settlements.

To be blunt about it, the speed advantage is not what the marketing says. It is real, but it accounts for maybe 5–15% of the total project cost. The remaining 85% is the part vibe coding does poorly. Threat modeling. Schema design that holds up in production for two years. Logging that satisfies an FFIEC examiner. Database migrations that do not lock the table on Black Friday. The painful, boring, irreplaceable middle of the work.

## Where the trend is now

There is a thing I keep noticing. The indie hackers who built this movement, the ones who shipped 12 startups in 12 months and posted MRR screenshots, are quietly going dark. Marc Lou, Pieter Levels, the whole front of the build-in-public scene, they are posting less. Indie Hackers ran [a piece in February 2025](https://www.indiehackers.com/post/lifestyle/is-this-the-end-of-build-in-public-heres-why-top-indie-hackers-are-suddenly-disappearing-IhSJQBnXNuNwSuNTuz4t) about the disappearance. The reason is not that the founders failed. The reason is that the public MRR became a beacon for copycats and lawsuits. Build in public worked when there was no one watching. Now everyone is watching, including the FTC and the relevant data protection authority.

That is also the trajectory of the vibe coding agency model. The first wave got attention. The second wave is getting CVEs. The third wave is going to get sued. (This is a separate topic, but the DORA Article 28 liability transfer for ICT third-party risk is going to land like a brick on shops that did not document their controls. That conversation is for another article.)

## Why fintech specifically gets burned worse

Three reasons.

First, the cardholder data environment under PCI DSS 4.0.1, since 31 March 2025, requires inventoried scripts on every payment page, integrity assurance, weekly tamper detection, MFA on all non-console access into the CDE. None of these are checks a vibe-coding pipeline runs by default. None of them are line items on a $4K-per-app price sheet. When the QSA shows up, the merchant either pays the audit cost or pays the breach cost. There is no third option.

Second, regulators have stopped accepting "we used a vendor" as a liability shield. [DORA Article 28](https://www.eiopa.europa.eu/digital-operational-resilience-act-dora_en), in force since 17 January 2025, makes ICT third-party risk the financial entity's problem. If your vibe-coded MVP processes payments and your vendor's Lovable instance leaks Supabase tokens, the European supervisor calls *you*, not Lovable.

Third, and this is the one most founders miss, the cost of a fintech breach is not a one-time payout. It is a permanent asterisk on the company name in the underwriting database. I have watched a Series A founder lose a Plaid relationship over a $40K vibe-coded prototype that exposed bank credentials in a postMessage event. The Plaid relationship cost more than the entire build budget. The founder did not get it back.

## What we ship instead

There is a thing I want to name, because it explains why the work feels different. We ship one app for the price of three. We do not apologize for that. The extra two apps' worth of budget goes into:

A documented threat model on day one, not a ticket on the backlog. A schema review that includes the auditor in the room. Row level security policies for every Supabase or Postgres table that touches customer data. An audit log with retention sized to the regulatory window, not the convenience window. Code review by a human who has worked in the regulated industry the customer operates in. CI gates that fail builds on missing CSP headers, on egress to non-allowlisted domains, on dependency confusion attacks.

If that sounds like the antithesis of a one-page Notion proposal, it is. It also looks different on the customer's audit. We have been through eight SOC 2 Type II audits with our customers in the last fourteen months. We have not had a single finding that came from our code. The CTO who messaged me at 11pm has been a customer for two years. He is on his second SOC 2 now. The vibe-coded MVP he was tempted to buy is, last I checked, not.

## What this means if you are buying

I want to give you something useful before you go. There is a checklist that separates the good shops from the marketing-only ones, and I am [publishing it as a separate post](/playbook/insights/vibe-coding-agency-buyers-guide), because it is its own beast. The short version, before you sign anything: ask the vendor for the exact CVE list of their five most recent shipped projects. Ask for the threat model artifact. Ask who reviewed the auth flow and what their compliance background is. If you get marketing-deck answers to any of those three, walk.

There are good vibe coding agencies. They will not flinch at those questions. The bad ones will tell you their AI has it covered. That is the tell.

We will not ship you ten apps a month. The shop that promises that is selling a different product, and you should buy it for the projects where it fits. For your fintech, your insurer, your healthtech, your anything-with-an-auditor, buy the slow shop. The cost difference reverses inside the first incident.

That CTO from the Slack message? He bought us instead. We shipped one app in eleven weeks. It passed his SOC 2 in February. His pricing page now reads: *"Built to audit. Not to a deadline."*

I would have written it differently. He didn't ask.
