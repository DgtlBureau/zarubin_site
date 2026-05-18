---
title: 'The Pit Crew Model: How One Senior Engineer Runs Three Parallel Workstreams'
description: 'Pair programming was two humans at one workstation. The pit crew model is one senior engineer running multiple parallel workstreams with scoped tooling — and a named human reviewer on every merge.'
image: '/assets/images/info/ai-audit-trail-architecture.webp'
date: '18-05-2026'
readingTime: '8 min'
category: 'Insights'
subCategory: 'Notes'
tag: 'pit crew model, AI-assisted development, software delivery, parallel workstreams, SOC 2, change management, agentic coding, compliance-grade workflow'
authorName: 'Vitaliy Zarubin'
authorImage: '/assets/images/author/avatar.png'
faq:
  - question: 'How is the pit crew model different from vibe coding?'
    answer: 'Vibe coding, in the original Karpathy sense, is describing intent and accepting output with minimal review. Fine for prototypes, dangerous in production. The pit crew model is the opposite: the engineer specifies intent, reads every line of generated code, writes the tests, and a different named human reviews the PR. The accountability chain is identical to a pre-AI workflow. Only the typing speed changed.'
  - question: 'Does this break SOC 2 or DORA compliance?'
    answer: 'No, because every merge has a named human author and a named human reviewer, both traceable in git. CC8.1 segregation of duties is preserved. We mark AI-assisted authorship in the Co-authored-by trailer so the audit trail reflects reality. If your tooling allows auto-merge of AI-generated code without human approval, that fails the control — but that is not the pit crew model, that is something else.'
  - question: 'Why is three parallel streams the practical maximum?'
    answer: 'Cognitive load on review and integration. With two streams the engineer keeps full context on both. With three they can sustain it. At four the review quality degrades faster than the parallelism saves time, and bugs slip through. We have tested this enough times to call it a real ceiling. Pushing past it is a false economy.'
  - question: 'Can a junior engineer run this model?'
    answer: 'No, and we do not let them. The model amplifies whoever is at the center. A senior gets faster without losing quality. A junior gets faster while losing quality, because they have not built the review instincts yet to catch what tooling gets wrong. We pair juniors with seniors and grow them into pit crew work over six to twelve months. Skipping that ramp produces bad code at speed, which is the worst possible outcome.'
---

# The Pit Crew Model: How One Senior Engineer Runs Three Parallel Workstreams

*A founder asked me last month why our cycle time was three to four times faster than her previous agency, and what we were actually doing differently. The honest answer was uncomfortably specific. We had stopped working in pairs and started working in pit crews. One senior engineer on her project was running three coordinated workstreams at once, each one supported by tightly-scoped tooling, all converging on the same release. She thought I was describing chaos. It is the opposite of chaos.*

The pit crew model is the operating shape we have been refining for the last twelve months. It is the opposite of vibe coding, where someone turns AI loose to write code while a human prays. It is closer to how a Formula 1 race team works: the driver is one human, the pit crew is multiple specialists with sharp roles, and nothing leaves the garage without a named human signing off.

I want to lay out how this works in practice, because most of what I read about AI-assisted development right now is either breathless ("the future is here") or paranoid ("an AI will commit a security hole into your prod branch"). The reality is operationally specific, and honestly more boring than either narrative.

## What the model actually is

Pair programming, in the classical sense, is two humans at one workstation. One drives, one navigates. It works, and there is no reason to stop doing it for genuinely hard problems.

The pit crew model is one senior engineer running multiple parallel workstreams, each isolated in its own branch and worktree, each supported by scoped AI tooling that handles the parts a human would do slower without learning anything. The engineer is no longer the typist. They architect, review, integrate, and own every merge.

Three streams is our practical maximum. Two is more common. Four falls apart, because the cognitive load on review and integration starts costing more than the parallelism saves. There is no software answer to that constraint. It is just how attention works.

## What stays human, always

This is the part that matters for compliance, for code quality, and for the team's ability to ship without disaster.

Every PR is reviewed by a human who did not author the AI-assisted parts. The reviewer's name is in the merge commit. AI-assisted authorship is also in the merge commit, in the Co-authored-by trailer, because we want the audit trail to reflect reality. If a SOC 2 or DORA auditor asks who authored the change, the answer is on the commit. If they ask who approved it, the answer is on the commit. We do not invent new accountability shapes for AI work, we keep the old ones intact.

Architectural decisions stay human. We do not let tooling pick the database, the auth model, or the deployment topology. Those are senior engineer calls that depend on facts no model has access to: your customer contracts, your compliance scope, your team's strengths. Under a regulated framework like DORA, HIPAA, or PCI DSS, this is non-negotiable. CC8.1 segregation of duties did not get softer because the tooling got better. If anything it got stricter, because auditors now know to ask.

Code that touches money, PII, auth, or production data egress gets a second human review on top of the standard one. That is not new. It is just enforced.

## What the parallelism looks like on a Tuesday

Concrete example from last week. One of our seniors had three active workstreams for a fintech client.

Stream one was a new transaction-categorization endpoint, including the data model, the migration, the API surface, and integration tests. Roughly four days of work historically. He was on day two when I asked.

Stream two was a refactor of the legacy webhook handler everyone had been avoiding for six months. The refactor itself was straightforward, just tedious and risky.

Stream three was a documentation pass on the internal compliance runbook, which the client's auditor had flagged as out of date.

Each stream lived in its own git worktree with project-scoped tooling. He moved between them as natural pauses happened. A test suite running on stream one was 90 seconds of dead time, which is enough to make real progress on stream three's documentation. The integration tests on stream two ran while he reviewed the diff from stream one.

Every commit went through the same review process they always have. A teammate read them, asked questions, requested changes, approved or rejected. Nothing about the merge process changed. What changed was the throughput on the input side.

That is the whole trick. The output side stays a human bottleneck on purpose, because that is where quality and accountability live.

## Why this is not vibe coding

I want to be precise about this, because the term "vibe coding" has taken on a meaning that makes engineering leaders nervous, and they are right to be nervous. Vibe coding, in the original sense, is the practice of describing intent and accepting the output with minimal review. It works for prototypes and toy projects. It does not work for production software in regulated industries, which is most of what we ship.

The pit crew model inverts this. The intent comes from the engineer. The output gets read line by line. The tests get written by the engineer and run by the engineer before any AI-assisted code is committed. The reviewer is a human. The deployer is a human. The accountability chain is identical to a pre-AI workflow.

What is different is the speed of getting from "I know what I want to write" to "the first draft exists in my editor." That used to take hours of typing. Now it takes minutes. The hours that got freed up went into review, integration testing, and the things humans have always done better than machines.

If a team tells you they are doing pit crew but cannot show you human review on every PR, they are not doing pit crew. They are doing something else, and you should ask harder questions before letting them ship anything you care about.

## What it takes to actually run this

Three things have to be true.

The engineer has to be senior. This model amplifies whoever is at the center of it. A senior gets faster without losing quality. A junior gets faster while losing quality, because they have not yet built the review instincts to catch what tooling gets wrong. We do not put juniors at the center of a pit crew. We pair them with a senior and grow them into it over time.

The tooling has to be scoped. A model with full unconstrained access to your codebase is a liability. Project-scoped context, named reviewer requirements, branch protection, MCP servers with read/write distinctions properly separated, and audit logging on every tool call. We spend more setup time on this than most clients realize, and that setup is where compliance posture lives.

The team has to actually want this. Some engineers love it. Some do not. Forcing it on someone who is suspicious of the model produces slower work and worse code than just letting them work the old way. We let people opt in and out by project. Most opt in after the first one. Ask me how I know.

## What this changes for our pricing

We have not moved to outcome-based pricing for custom software work, the way we have for vertical AI agents. Software is too contingent on requirements drift to commit our margin on. What we have done is taken the time savings and either passed them to clients (faster delivery at the same price) or used them to deliver more scope per engagement. The economics for the client are visibly better. Ours are stable.

That feels like the honest version of bringing this into a services business. We get faster. The client gets faster. Nobody pretends a machine is doing the work, because a machine is not doing the work. A human is doing the work with sharper tools, under the same accountability they had before.

## Want to see it run on your project?

We bring this model into every engagement now, by default. It is not a separate offering. If you want to see what it looks like applied to your codebase, we will scope a two-week paid pilot, run it, and walk you through the diff at the end. You will see exactly who wrote what, who reviewed what, and what the audit trail looks like. That is the only honest way to evaluate a claim like this.

[Book a discovery call](/contact)
