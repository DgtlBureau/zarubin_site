---
title: 'Workflow Capture: How to Get Your Best Employee''s Brain Into an Agent'
description: 'Your best person makes decisions nobody documented. Workflow capture is the new discipline that gets that expertise into an AI agent — before they leave.'
image: '/assets/images/info/ai-audit-trail-architecture.webp'
date: '18-05-2026'
readingTime: '8 min'
category: 'Expertise'
subCategory: 'AI Engineering'
tag: 'workflow capture, AI agents, vertical AI agent, forward-deployed engineer, human-in-the-loop, agent training, institutional knowledge, AI labor'
authorName: 'Vitaliy Zarubin'
authorImage: '/assets/images/author/avatar.png'
faq:
  - question: 'How is workflow capture different from business process management or BPM?'
    answer: 'BPM optimized for documentation: pretty Visio diagrams, RACI matrices, slide decks. The deliverable was the diagram. Workflow capture optimizes for replicability by an AI agent. The deliverable is a structured rule set, an edge case log, and a human-in-the-loop SLA that connects to real software via MCP. The agent gets trained or constrained by the artifacts. You still draw flowcharts, you just stop pretending the flowchart is the work.'
  - question: 'Can we run workflow capture in-house instead of hiring a vendor?'
    answer: 'Yes, if you have a senior product person or engineer with patience for shadowing and rigor for decomposition. Three things you need: permission from the top performer to be observed without judgment, a real recording stack (screen plus voice plus action log, not just Notion), and the discipline to ask "what did you just do" instead of "what do you usually do." Not a black art. Just a discipline most teams have not built yet.'
  - question: 'How long should workflow capture take?'
    answer: 'Two weeks for a single-role agent (SDR, support triage, claims pre-screen). Longer if the workflow spans multiple roles or systems. If a vendor is promising you a deployed agent in two weeks total with no capture phase, they are either selling you a generic template or they will eat their margin fixing your edge cases for the next six months. Both are bad outcomes.'
  - question: 'What if our top performer does not want to be observed?'
    answer: 'They are not stupid. They know what the project is for. If they believe the agent is replacing them, you will get the marketing version of their job and nothing useful. Two options that work: give them the agent supervisor role at a pay bump, or accept that workflow capture has to start somewhere else first. Forcing the issue produces a bad capture and a worse agent.'
---

# Workflow Capture: How to Get Your Best Employee's Brain Into an Agent

*A claims manager at a regional insurer once told me her job was "knowing which forms never to trust on Wednesdays." She was half joking. The other half was the most expensive piece of institutional knowledge in the company, and it lived in exactly one head. When we started building an agent to take over the routine 70% of her work, the first six weeks were not about the agent. They were about her.*

Workflow capture is the part of every AI agent project nobody warns you about. It is the part that decides whether the agent actually does the job or just looks like it does the job in a demo. Right now, in 2026, almost nobody is teaching it properly. There are conferences (one so far) and a small number of consultants who charge a lot to do the work. The people who need to learn it most are not the consultants. It is the company adopting the agent.

I will walk through how we do this. Not as a branded methodology, because that is not a thing yet and probably should not be. Just the actual steps, in the order we run them.

## Why this is a separate discipline now

For two decades, the discipline that lived in this space was business process management. BPM. Flowcharts, swim lanes, RACI matrices. A consulting firm would interview your team, draw a beautiful Visio diagram, charge $250K, and the diagram would be wrong by month three because the actual work had moved on.

BPM optimized for documentation. Workflow capture optimizes for replicability by an AI agent. Different deliverable, different process. The Visio diagram is not the artifact. The artifact is a structured set of decision rules, training examples, and edge case logs that an AI agent can be trained on or constrained by.

Three things make this a 2026 discipline and not a 2010 one. A model that can finally do the work given the rules: until this generation no amount of capture helped, because the executor was not capable. MCP and similar protocols, which let an agent call real tools instead of generating descriptions of calling tools — so workflow capture is now connected to actual software endpoints, not slides. And outcome-based pricing on the vendor side, which means the people building agents have a direct financial reason to capture the workflow correctly. If we miss the 40% your best rep does differently, we eat the loss.

## The interview that actually works

The dirtiest secret of this whole job: you cannot ask your best person how they do their job and get a useful answer. They will give you the version they tell new hires. That version is wrong. Not because they are lying, but because the actual decisions happen in milliseconds and they have stopped noticing the decisions.

We learned this the hard way on an early project, a recruiting screen agent that looked great in the demo and missed obvious passes in production. The recruiter we interviewed gave us a clean rubric. Then we sat next to her for two days. She used the rubric for maybe 30% of the calls. The other 70% she was doing something else entirely.

So we changed the format. Workflow capture now starts with shadowing, not interviews. Days one and two, a forward-deployed engineer sits next to the operator with a screen recorder and a transcript app. We ask one question and only when the operator pauses: *what just happened in your head?* Everything else, we observe. By day three we have 50 to 100 micro-decisions logged, half of which the operator did not consciously make.

That document is the real spec. The clean rubric the operator gave in the kickoff meeting is the marketing version. The real one is the gold.

## Decomposition: from observed behavior to encoded rule

Once we have the log, the next pass is decomposition. Each observed decision gets broken into three pieces. The trigger: what input or signal made the operator look at this. The check: what information they consulted, sometimes from sources nobody documented. The output: what they did, including the cases where the right output was "did nothing on purpose."

This is where most teams skip steps. The "did nothing on purpose" decisions are the most valuable in the dataset, because they are what the agent will get catastrophically wrong if you do not encode them. Your best rep skips 30% of leads on signals nobody wrote down. If your agent does not skip those, your reply rates crater and your domain reputation gets cooked. Ask me how I know.

Decomposition produces three buckets of rules. Deterministic rules: things you can write as if/then. The agent should always handle these without an LLM call. Faster, cheaper, more reliable. About 60% of a typical workflow ends up here, sometimes more. Judgment calls: ambiguous signals where the operator weighs context. The agent uses an LLM here, but with structured prompting and access to the same context the human had. About 30%. Escalations: the cases where the right answer is "ask a human." Not 10%. Often less. The whole point of capture is to know which 10%.

## The edge case log and why it never closes

Two weeks of observation does not catch every edge case. Nothing does. So the third artifact of workflow capture is an edge case log that stays open for the life of the agent.

We start populating it during shadowing. Every weird thing the operator does, every "oh, this is unusual, let me check with X," every exception handled in the channel chat — into the log. By the time we ship in week six, the log has 80 to 150 entries. After three months in production, usually around 400.

The log is not a bug list. It is the training data and constraint set for the agent. We treat additions to it as a first-class engineering activity. If the supervisor adds a new exception in March, the agent gets the new rule in March. Not next quarter.

That continuous edge-case ingestion is, by the way, the thing your off-the-shelf vendor cannot do for you, because they do not have a human watching your specific workflow. It is also why a properly-supervised custom agent gets better month over month instead of staying frozen at launch quality.

## Where workflow capture fails

I want to be honest about when this does not work, because the rest of this article makes it sound clean.

When there is no top performer. If the team is uniformly mediocre, you are capturing mediocre. The agent will be mediocre. Sometimes that is fine and worth it for cost reasons. Often it is not.

When the operator does not want to be captured. Pay them well, give them the agent supervisor role, or do not start. People know what the project is for, and forcing the issue produces a bad capture and a worse agent.

When the workflow is genuinely chaotic. Some processes are too inconsistent to encode. We have killed three projects this year in week two for this reason. The honest answer in that case is the company needs to fix the process first, with humans, before automating it.

## What the deliverable looks like at the end of week two

Concretely, this is what a workflow capture phase produces. A shadowing log, raw notes plus video. A decomposed rule set in a structured format the agent can ingest. An edge case log with initial 80 to 150 entries. A first cut of the human-in-the-loop SLA: which decisions escalate, to whom, with what response time. And a pricing decision: outcome-based or fixed fee, depending on whether we believe the agent will hit the agreed metric.

That last item is where the rubber meets the road for us. If after two weeks of capture we cannot in good conscience promise an outcome, we will not quote outcome-based pricing. Honesty about that is the whole reason this works at all.

## What to do with this if you are not hiring us

Not every team should outsource workflow capture. Some should learn it. If you have a senior product person or engineer with the patience for shadowing and the rigor for decomposition, run it yourselves. The three setup pieces you need are at the top of the FAQ. The rest is reps.

If a team is already building you an agent and they skipped or rushed this phase, stop them. The build will not deliver. You will pay for it twice: once for the broken first version, again for the rebuild after launch fails.

## Want to capture your own workflow?

We run workflow capture as a standalone two-week engagement, fixed fee. At the end of it you decide whether to keep building with us or take the artifacts to your in-house team. Either way, the capture is what determines the outcome.

[Book a discovery call](/#contacts)
