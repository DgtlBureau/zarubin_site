---
title: "What to Ask a Vibe Coding Agency Before You Sign"
description: "A buyer's checklist for hiring an AI-native dev shop. Ten questions that filter the bad ones, plus the contract clauses that save you when things break."
image: '/assets/images/info/leon-seibert-9i5eqBarv-k-unsplash.webp'
date: '04-05-2026'
readingTime: '11 min'
category: 'Insights'
subCategory: 'Notes'
tag: 'Vibe coding agency, due diligence, vendor risk, threat modeling, SOC 2, contract clauses'
authorName: 'Daniella Mitchell'
authorImage: '/assets/images/author/daniella_mitchell.jpg'
faq:
  - question: 'What is a vibe coding agency?'
    answer: 'A dev shop that builds production apps primarily through AI coding tools like Cursor, Claude Code, Lovable, Bolt, and v0. The term comes from Andrej Karpathy, who coined "vibe coding" in February 2025. The agency variant productized it across 2025 and 2026, typically pricing MVPs at $5,000 to $15,000 with two-to-three week delivery.'
  - question: 'How much should an MVP from a vibe coding agency cost?'
    answer: 'Market range is $5,000 to $15,000 for narrow-scope MVPs, $20,000 to $80,000 for traditional agency builds with AI acceleration. Agencies pricing below $5,000 are almost always cutting controls you cannot see in the demo. Agencies pricing above $80,000 are either selling consulting or are a traditional shop with AI in the marketing copy.'
  - question: 'What is the single most important question to ask?'
    answer: 'Show me the threat model from your last shipped project. A real shop has one. A bad shop will offer to "do one for you" or claim it lives in a senior engineer head. The follow-up that catches the rest is "what was the most recent CVE filed against code you shipped, and what changed afterward."'
  - question: 'Should I let the agency host my code on their platform?'
    answer: 'Read the platform terms before you sign. Many vibe-coding shops work inside Lovable, Bolt, or similar tenants where artifacts and prompts are retained on the platform infrastructure. Your IP transfer is incomplete unless source, secrets, and data egress to model providers all stop on contract end. Get that in writing, with a verified deletion certificate clause.'
  - question: 'How do I check if their security claims are real?'
    answer: 'Get read-access to one existing repository before you sign. Inspect the auth flow, the migrations folder for RLS policies, the dependency tree against npm or pip-audit, the CI workflow for security gates, and the error tracking integration. The aesthetic to look for is competence under pressure, not pretty code.'
---

# What to Ask a Vibe Coding Agency Before You Sign

*A founder I advise sent me a 23-question due diligence sheet last month. She had three vibe-coding agencies in her pipeline, all of them quoting between $8K and $14K for an MVP, all of them promising delivery within three weeks. Her sheet was thorough on the wrong things. It asked about hourly rates, team headcount, and whether they used Cursor or Claude. None of the questions on it would have told her if she was about to inherit a CVE.*

*She rewrote the sheet. We went through it together. This is what she ended up with, generalized for anyone in the same spot.*

The vibe-coding agency model has its place. Prototypes, MVPs, internal tools, weekend products, marketing pages: there is real value in shipping a working thing in two weeks for $10K, and I am not going to spend an article arguing otherwise. The trouble is that the same one-page proposal arrives in fintech, healthtech, and B2B SaaS inboxes every week, and most buyers do not have the vocabulary to separate a competent shop from a wrapper around Lovable.

So I am putting the questions on paper. Use them as is or strip out what does not apply.

## Before the call: red flags on their site

Spend ten minutes on the agency's portfolio before you book the discovery call. The signs that save you from the bad ones are mostly in plain sight.

If the portfolio has fifteen projects and zero CVE history mentioned anywhere on the site, in case studies, on a security page, or in a blog post, the agency has either shipped flawless code or never looked. The latter is more common. A shop that has been in production for two years and never disclosed a single security finding is a shop that does not run security reviews.

If the case studies are all logo grids and no architecture, ask yourself why. Architecture is the thing buyers actually consume. Logo grids are the thing buyers brag about. The ratio tells you which kind of customer the agency is built for.

If the pricing page leads with throughput claims (*"we ship 10 apps a month"*, *"MVP in 14 days"*, *"guaranteed delivery"*), this is not a deal-breaker on its own, but understand what you are buying. Throughput-led pricing optimizes for the median project. Yours is not the median. Your project is the one with PII, payments, or audit obligations, and it costs the agency more to ship correctly than the throughput price implies. They will either eat the margin and skip controls, or surprise-bill you. Both outcomes are bad.

## Discovery call: ten questions that filter the bad shops

Run these ten in the first call. If you get marketing answers to more than two, end the call politely and move on.

**1. Show me the threat model from your last shipped project.** This is the strongest filter. A real shop has one. A bad shop will offer to *"do one for you"* or claim it lives in someone's head.

**2. What was the most recent CVE filed against code you shipped?** Phrased like that. Avoid asking *"have you ever had a security incident,"* which is too easy to dodge. The follow-up is *"and what did you change after."*

**3. How do you handle Row Level Security in Supabase or equivalent?** If they use Supabase, Lovable, Bolt, or any other LLM-aware platform, this is the single highest-impact technical question you can ask. RLS off by default is a recurring root cause in the [Cloud Security Alliance Vibe Security Radar](https://labs.cloudsecurityalliance.org/research/csa-research-note-ai-generated-code-vulnerability-surge-2026/) tracker, including the Lovable disclosure (CVE-2025-48757). The right answer is *"we have a default-on policy, here are the migrations."*

**4. Walk me through your CI gates.** A competent shop runs at least secret scanning, dependency vulnerability scanning, license scanning, SAST, and an SBOM generation step. If they say *"GitHub does that for us,"* they are using Dependabot and calling it a security program.

**5. What is your incident response time?** Phrased specifically: *"if a vulnerability drops in a dependency at 2am UTC on Saturday, what happens in the next four hours?"*

The right answer is detailed and rehearsed. A named on-call engineer pages within fifteen minutes, the runbook lives in the same repo as the code, severity classification happens before patching starts, and there is a written communication template for letting customers know what is going on. The bad shops, almost without exception, give a version of *"we'd handle it"* and then go quiet. I have asked this question to maybe forty agencies. Two answered well. One of those is a friend, so the real number is one. If you find a shop that runs an actual postmortem culture, you have found a unicorn, and you should pay them whatever they ask.

**6. Who reviews AI-generated code before it merges?** The answer should be a named human, not an AI gate. If they say *"Cursor's review is enough"* or *"we trust the model,"* walk.

**7. Show me a customer audit you have supported.** SOC 2, ISO 27001, HIPAA, PCI DSS, any one. If the answer is none, they have not been tested. If the answer is several, ask for the auditor's name as a reference. The good ones will give it.

**8. What is your code retention and IP transfer policy?** Many vibe-coding shops use platforms (Lovable, Bolt) that retain artifacts on their infrastructure. If your code lives in someone else's tenant, your IP transfer is incomplete. Ask for a written commitment that source, secrets, and data egress to model providers all stop on contract end.

**9. What does your typical project look like at month six?** They are pitching you on month one. The shape of month six tells you whether the shop maintains what they ship or vanishes after the deposit clears. The good shops have ongoing retainers, monitoring, and named successors. The bad ones have a Calendly link and a Stripe page.

**10. What would make you turn down our project?** Almost everyone fails this question. The shop that says *"we don't take regulated work without a QSA in the loop"* or *"we won't take payments work for under $50K"* is the shop you want. The one that says *"we can do anything"* is the shop that should not.

## Technical due diligence: what to actually inspect

If they pass the discovery call, get them to grant read-access to one existing repository before you sign. A shop that refuses has something to hide. A shop that says yes deserves an hour of your senior engineer's time.

Look at:

- **The auth flow code path.** Is the session token validated server-side on every privileged endpoint, or is there a place where the frontend trusts itself?
- **The migrations folder.** Are RLS policies committed in there, or did someone enable them in the dashboard and never persist?
- **The dependency tree.** Run `npm audit` or `pip-audit` against the lockfile they show you. If there are known criticals open longer than 14 days, the update cadence is broken.
- **The CI workflow.** Is there a security gate, or is the pipeline just *"test, build, deploy"*?
- **Error tracking integration.** No Sentry, no Datadog, no Honeybadger? They have not shipped a real production system, or they are letting yours run blind.

You will not understand all of this. That is fine. The right question for your senior engineer is *"would you trust this team with the keys to your prod database for two years,"* not *"is this code good."* The aesthetic you are looking for is competence under pressure.

## Contracting: clauses that save you when things go wrong

Three clauses you should not negotiate away, even at the cost of a small rate increase:

**Indemnification for security findings caused by their work**, with a defined cap and a defined exclusion list. A shop that refuses to indemnify is a shop that does not stand behind its work. A shop that indemnifies up to the contract value is normal. A shop that indemnifies up to a multiple is unusual and worth paying for in regulated work.

**A defined breach notification SLA, in hours**, separate from any contractual general notice clause. If their CVE drops at 9am, you need to know by 1pm so your DPO can run their own clock against DORA, GDPR, or PCI obligations. Most agency standard forms do not include this. Ask for it explicitly.

**A clean source and data egress termination clause.** When the contract ends (and it will end), what happens to the source code, the customer data on the agency's machines, the prompts and logs sitting in their model provider's retention window? *"Best effort deletion"* is not enough. You want *"verified deletion certificate within 30 days."*

## How to walk away gracefully

If the shop is wrong for you after all this, leave them better than you found them. Tell them why. The good ones will use the feedback. The bad ones will be confused and email you their throughput numbers a third time. Either way, the time was not wasted, because the next agency in your pipeline gets a sharper version of the same conversation. There is also [the longer argument for slow shops](/playbook/insights/why-we-wont-ship-you-10-apps-a-month) if you want to give a stakeholder the case for paying more.

For what it's worth, the founder I advised picked the most expensive of her three options. It was the shop that scored worst on price and best on every question above. Her MVP shipped four weeks later than the cheapest quote. It also passed her seed-round technical due diligence in fourteen days, where the cheapest agency's previous client took five months and a re-architecture.

That is the math the throughput-led pricing model hides. Done well, slow ends up cheaper.

If you want a printable version of this checklist, [send a note to our team](https://thebrightbyte.com/career) and we will mail you the PDF. We use it on inbound calls. You should too.
