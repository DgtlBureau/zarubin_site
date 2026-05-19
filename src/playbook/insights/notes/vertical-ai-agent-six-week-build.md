---
title: 'AI SDR at $80K vs Human at $120K: The Six-Week Vertical Agent Build'
description: 'CFOs are asking why a custom vertical AI agent costs less than a human SDR. Here is the six-week build, the math behind FTE-replacement pricing, and where it breaks.'
image: '/assets/images/info/ai-audit-trail-architecture.webp'
date: '18-05-2026'
readingTime: '9 min'
category: 'Insights'
subCategory: 'Notes'
tag: 'vertical AI agent, AI SDR, service-as-software, outcome-based pricing, MCP, custom AI agents, AI labor, workflow capture'
authorName: 'Vitaliy Zarubin'
authorImage: '/assets/images/author/avatar.png'
faq:
  - question: 'What does a custom vertical AI agent actually cost compared to a vendor like 11x or Decagon?'
    answer: 'A custom build for a mid-market SDR or support role lands at $60-90K to ship, plus $3-6K a month in compute and supervision. Year-one all-in is roughly $80K. Vendor seat math for comparable scope runs $150-250K a year on a multi-year contract. After year one the spread widens because the build is amortized. The catch: vendor onboarding is two weeks, ours is six. You trade speed for fit and ownership.'
  - question: 'Why does workflow capture take two full weeks?'
    answer: 'Because that is where the actual product gets defined. A forward-deployed engineer sits with your top performer, records decision-making in the live workflow, and harvests the rules nobody wrote down. Skipping workflow capture means encoding the average behavior of your worst rep instead of the judgment of your best one. We have walked away from three deals in six months where the workflow was too inconsistent to capture. Better to know in week two than month four.'
  - question: 'How does a reverse pilot work and can you really refund the build fee?'
    answer: 'Ninety days, agreed outcome metric (qualified meetings, closed tickets, processed claims). If the agent misses the number at day 90, we refund the build fee minus hosting costs and the client keeps the codebase. We have run nine, refunded one. The math works for us because we only offer reverse pilots after workflow capture tells us the number is achievable. If it is not, we quote fixed-fee instead or walk.'
  - question: 'Will this actually replace our team?'
    answer: 'Some headcount conversion is real. Roles do not get backfilled, planned hires get paused. The better outcome we have seen: existing reps move into agent supervision and outcome-ownership roles, sometimes at a pay bump for fewer hours. If you cannot have that conversation honestly with your team, do not buy this from anyone. The agents work too well to pretend otherwise.'
---

# AI SDR at $80K vs Human at $120K: The Six-Week Vertical Agent Build

*Last quarter a CFO emailed me at 11pm. Subject line: "Are we paying 120k for someone an agent can replace?" The attachment was a vendor deck quoting $200k a year for an AI SDR seat. He wanted a second opinion. By the time we got on a call the next morning, his head of sales had already forwarded three competing decks and one Reddit thread questioning all of them. That conversation became the template for this article.*

Most mid-market CFOs are running this math themselves now. They see a sales line item, they see a vendor pitch, they smell something off. Usually they are right to smell it. The math works, just not the way the vendor presents it.

## The $80K vs $120K math that started everything

A loaded SDR in the US runs $110-140K depending on geography. Base, commission, benefits, manager time, software stack, the empty-chair months between hires. Call it $120K to be polite.

A vertical AI agent quoted by a SaaS 2.0 vendor for the same role runs $150-250K a year, depending on volume and seat math. The vendor will tell you it replaces three SDRs, so the per-FTE math drops to $50-80K. That part is sometimes true. Sometimes it is not. The number that sticks in CFO heads is the headline price, not the FTE-replacement pricing buried on slide 14.

Custom-built, the same agent costs $60-90K to ship plus a monthly compute and supervision bill of $3-6K. All-in for year one lands around $80K. After year one it gets cheaper because the build is amortized. After three years the spread is closer to $40K per replaced FTE.

That is the spreadsheet a CFO loves and a vendor hates.

## Why off-the-shelf vertical AI agents stall in the mid-market

I will skip the obvious points (vendor lock-in, data residency, the fact that your sales process is not the median sales process the vendor trained on). Those are real. They are also boring. The interesting failure is more specific.

Off-the-shelf vertical AI agents are built for a hypothetical median customer. Your workflow is not the median. Your CRM is half-configured. Your ICP definition is a Notion doc the founder wrote two years ago and three people edit in different tabs. Your domain rules ("we never email anyone at a company with a current open support ticket") live in one person's head. A generic agent captures none of that. You end up paying $200K a year to retrain a vendor's CSM on your exception list, which means service-as-software in reverse: you became their last-mile human.

When we walk into mid-market deals, this is the pattern we see. The off-the-shelf product gets to about 60% of the job. The remaining 40% is what makes your company itself, and that 40% never makes it into the vendor's roadmap.

A custom vertical AI agent, built around your workflow, hits 90% on week six. Not magic. We just encode the 40% on purpose instead of pretending it does not exist.

## What six weeks of building actually looks like

People keep asking me what we do in those six weeks, so I am laying it out. Most agencies will not show this, because it makes the work look uncomfortably finite. It is.

**Week one and two: workflow capture.** This is the dirtiest, most underrated part of the entire job. A forward-deployed engineer (FDE) sits with your top performer, your sales ops lead, and your CRM. We record screen sessions of the human doing the task. We harvest every decision point: why did you skip this lead, why did you write that subject line, what made you pause. New discipline, by the way. It has a name now (workflow capture) and conferences (one so far, mostly bad). The work itself is genuinely hard. Skip this step and your agent will learn the average behavior of your worst rep, not the judgment of your best one.

**Week three and four: MCP integrations and the agent loop.** Model Context Protocol is the standard that finally killed custom integration code. We wire the agent into your CRM, your inbox, your enrichment provider, your meeting scheduler, your data warehouse. Each one is an MCP server. The agent calls them as tools, the same way a human calls a teammate on Slack. The agent loop is where most of the technical risk lives. We make it deterministic where we can, probabilistic where we must. Compliance teams sleep better when this is documented in a real architecture doc instead of a vendor's marketing PDF.

**Week five: human-in-the-loop SLA design.** Not every decision should be the agent's call. We define which actions auto-execute, which need a one-click human approve, and which always escalate. A human-in-the-loop SLA is a written promise: any action with a customer-visible blast radius above X requires a named reviewer within Y minutes. This is the part that lets you sell the agent to your compliance officer and your VP of sales in the same meeting.

**Week six: ship and stabilize.** FDE on-site or on-call for the full week. We watch the first 200 agent decisions like a hawk. We fix the obvious failures, document the weird ones, retrain on the edge cases. Some edge cases will not get solved in week six, and that is fine. The agent does not need to be perfect, it needs to be net positive against its cost-per-task baseline.

That is the shape. Some projects take eight weeks instead of six. Some we kill in week two when workflow capture reveals the process is too inconsistent to encode. Better to know in week two than month four.

## What outcome-based pricing actually means when we run the contract

This is the part that scares everyone, so I will be concrete.

For an SDR agent, the unit we price on is a qualified meeting booked. We agree on the definition with the sales leader. It cannot be vague, and it has to be measurable in the CRM. Pricing example from a real deal last quarter, anonymized: $180 per qualified meeting, capped at $9K a month. The client's blended cost per qualified meeting with humans was around $400. Their agent ROI math wrote itself.

This is what people now call outcome-based pricing or pay-per-outcome, and yes it is a flavor of service-as-software. The harder part is on our side: we have to be confident enough in the agent to bet our margin on it. That is why we will not quote outcome-based pricing without workflow capture first. Without it, we are guessing. With it, we know.

Some clients prefer fixed fee. About a third of our work still runs that way: a build fee plus a small monthly ops retainer. The other two-thirds are now outcome-priced. Three years ago that number was zero.

## The reverse pilot, and why we run one

Selling AI labor to a skeptical buyer has a baseline problem: nobody trusts the demo. Demos lie. So we run a reverse pilot.

Ninety days. Agreed metric. If the agent has not hit the agreed outcome by day 90, we refund the build fee minus actual hosting costs. The client keeps the codebase. We eat the loss.

We have run nine of these. We have refunded one (a legal intake agent where workflow capture missed an attorney-review step that should have killed the project earlier). The other eight converted to annual contracts. The math on this is fine for us because we only offer reverse pilots after workflow capture says we will hit the number. We have walked away from three deals in the last six months because the workflow was not stable enough to commit. That part is not glamorous, and it is the most important quality control we have.

## Where vertical AI agents are a bad idea

I should say what this does not work for. Three places this model fails.

High-stakes legal work where every output carries malpractice consequences. The cost of last-mile humans dominates the agent ROI math. You end up with a digital labor product that just shifts work to a partner-track attorney, who is the most expensive labor in the firm. Bad math.

Clinical decision support in healthcare. FDA pathway, IRB review, malpractice liability. Build it if you must, but the timeline is twelve months, not six weeks, and the pricing is regulated medical device economics, not outcome-based. Different game entirely.

Anything where the workflow is genuinely unstable. If your top three sales reps disagree on basic qualification criteria, workflow capture will fail and the agent will inherit the disagreement. We have learned to spot this in week one and walk. Not fixable on our side.

Outside those three categories, this works. Mid-market sales, customer support triage, claims pre-screening, accounts payable invoice matching, recruiting top-of-funnel sourcing, regulated intake forms with a compliance gate. We have shipped or are shipping all of them.

## What this actually changes for headcount

The math at the top of this article is the easy part. The harder conversation is what happens to the team.

Real headcount conversion happens. Roles do not get backfilled. Hires planned for Q3 get paused. Sometimes the existing team gets repositioned to higher-leverage work. Their words, not mine: one client's former SDRs now work as agent supervisors at a 30% pay bump, doing fewer hours, owning more outcomes. That last version is the best one. It does not always happen.

We tell clients up front: if you cannot have an honest conversation with your team about what this changes, do not buy this from us or anyone else. The agents work too well to pretend otherwise.

## Want to find out if this fits your niche?

Book a 30-minute call. We will tell you whether your workflow is stable enough to encode, whether the outcome math works at your volume, and whether we should even quote a build. About half the calls end with "not yet, here is what to fix first." That is fine. We would rather lose the deal than ship an agent that misses the number.

[Book a discovery call](/#contacts)
