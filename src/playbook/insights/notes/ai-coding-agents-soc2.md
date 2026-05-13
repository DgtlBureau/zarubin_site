---
title: 'AI Coding Agents and SOC 2: A Field Guide'
description: 'Rolling out Cursor, Claude Code, or Copilot under SOC 2? The controls auditors actually ask about and the rollout patterns that survive Type II.'
image: '/assets/images/info/lukas-zischke-xuAGP8r6jOI-unsplash.webp'
date: '27-04-2026'
readingTime: '11 min'
category: 'Insights'
subCategory: 'Notes'
tag: 'AI coding agents, SOC 2 compliance, AI-SDLC, secure software development, regulated industries, AI governance'
authorName: 'Daniella Mitchell'
authorImage: '/assets/images/author/daniella_mitchell.jpg'
faq:
  - question: 'Does using Cursor or Claude Code break SOC 2?'
    answer: 'No, but it expands the scope of three controls: change management (CC8.1), logical access (CC6.1), and data classification (CC3.2). Auditors will ask how prompts are logged, who reviewed AI-generated code before merge, and whether customer data ever reached a model provider. Have answers ready before the kickoff meeting.'
  - question: 'Which AI coding tools are SOC 2 friendly out of the box?'
    answer: 'None of them. Vendor SOC 2 reports cover the vendors infrastructure, not your usage. You still need internal controls for prompt logging, code review, and data egress. Anthropic, OpenAI, and Cursor all publish their own attestations, which you will reference, but those documents do not absolve your team of the in-scope controls.'
  - question: 'Do AI-generated commits need a human reviewer to satisfy SOC 2?'
    answer: 'CC8.1 requires segregation of duties for production changes. A human who is not the AI must approve the merge. Marking commits as AI-assisted in the trailer (Co-authored-by) and requiring a named reviewer in the PR template covers this cleanly. Auto-merge bots that approve their own AI suggestions fail the control.'
  - question: 'How do we keep customer data out of model providers?'
    answer: 'Three layers: a pre-commit hook that scans for PII patterns and blocks the prompt, an org-level proxy that rewrites or rejects payloads, and a contract clause with the model vendor confirming zero retention plus no training on submitted content. Anthropic and OpenAI both offer this on their enterprise tiers. Verify the contract, do not assume the default.'
---

# AI Coding Agents and SOC 2: A Field Guide

*Last month I sat in on an audit prep call where a Series C fintech was three weeks from their first SOC 2 Type II. The CTO mentioned that the team had standardized on Cursor in January. The auditor went very quiet. Then she asked a question nobody had a written answer to: when an engineer pastes a stack trace into the AI, where does that stack trace go?*

*That single question added six weeks to the audit.*

The premise of this article is simple. AI coding agents are now in the toolchain of most engineering orgs I work with, including the regulated ones. SOC 2 did not anticipate them. Auditors are catching up fast, and the controls they are asking about are not theoretical. So if you run engineering at a bank, an insurer, a biotech, or any company with paying customers in regulated verticals, this is the field guide I wish someone had handed me.

A note on tone: I am not going to pretend AI in the SDLC is risky in the abstract. It is risky in the specifics. Most of those specifics map cleanly onto controls you already have, if you know where to look.

## The three SOC 2 controls that suddenly matter

There is no SOC 2 control that says *thou shalt not use AI*. There are three controls that quietly grew teeth the moment your team adopted a coding agent.

**CC8.1 (Change Management).** Every production code change needs documented authorization, testing, and segregation of duties under the [AICPA Trust Services Criteria](https://www.aicpa-cima.com/resources/landing/system-and-organization-controls-soc-suite-of-services). A human who is not the change author has to approve the merge. When that author is partially an AI, the question becomes: who is responsible? The answer auditors want is *the human who hit accept*. That person must be named, traceable, and not the same person who wrote the prompt.

**CC6.1 (Logical Access).** This is the one most teams miss. If your AI agent can call tools (read files, query the database, hit your staging API), the agent is now a privileged identity. It needs an account, a credential, a scope, and an audit log. A Cursor instance with `MCP` servers wired into your production read replica is not a developer convenience. It is a service account with engineering-level access and no MFA. Treat it accordingly.

**CC3.2 (Data Classification).** What data are your engineers pasting into prompts? If the answer includes anything classified as customer data, PHI, or PCI scope, you have a data egress event every time someone hits enter. The control does not require zero leakage. It requires that you know what is being sent, and to whom, and that it matches your data handling policy.

That is the whole list. Three controls. The rest of SOC 2 is largely unaffected by AI in the SDLC, which is the part nobody tells you.

## What auditors actually ask

I have been on the prep side of about a dozen SOC 2 reviews where AI tooling came up in the past year. The question patterns are converging. Here is what a Big Four AI-aware auditor will hand you:

1. *List every AI coding tool used by engineering, with vendor name, contract type, and attestation date.*
2. *Show me the data egress policy that governs prompt content.*
3. *Pull a sample of 10 production commits and identify which were AI-assisted.*
4. *Show the review record for each AI-assisted commit, including reviewer identity.*
5. *Demonstrate that customer data classified as confidential or above did not enter a third-party model in the audit window.*

Number five is the killer. You cannot prove a negative without telemetry. Most teams do not have that telemetry, and that is what I want to talk about.

## The rollout pattern that passes

There is a sequence I recommend, and it is boring on purpose. Boring is what passes audit.

**Step 1: pick one tool.** Not three. One. The audit cost of two AI coding tools is roughly twice that of one, because every control evidence package gets duplicated. Pick Cursor or Claude Code or Copilot Enterprise, write the policy around that one tool, and revisit in a year. I have watched teams lose two weeks of audit prep because three engineers were quietly trialing a fourth tool nobody declared.

**Step 2: contract before deployment.** Get the enterprise tier. Confirm in writing: zero data retention, no training on inputs, SOC 2 Type II from the vendor, named DPO contact for incidents. The default consumer or pro tiers usually allow training on inputs unless you opt out, and the opt-out is not always honored at the API level. Read the actual MSA, not the marketing page. Anthropic's posture is documented at [trust.anthropic.com](https://trust.anthropic.com/), and Cursor's enterprise security page lives [here](https://www.cursor.com/security). For Copilot, the relevant policy is in the [GitHub Copilot Business plan documentation](https://github.com/features/copilot/plans).

**Step 3: route through a proxy.** Every prompt and every completion flows through an internal gateway. Could be LiteLLM, could be a thin FastAPI wrapper, could be Cloudflare AI Gateway. The point is logs. Without a proxy you are taking the vendors word that nothing leaked, which is exactly what your auditor will refuse to do.

**Step 4: scan the payload.** A regex-based PII filter at the proxy layer catches 80% of accidents. Card numbers, SSNs, common PHI patterns, internal hostname formats. Reject the prompt and return a clear error to the engineer. Yes, it will block legitimate requests sometimes. That is the point. The engineer learns, the policy becomes muscle memory.

**Step 5: tag the commits.** Every PR template gets a checkbox: *this change includes AI-assisted code (yes/no)*. Trailer in the commit message: `AI-Assisted: Cursor 0.45 / claude-3.7-sonnet`. The trailer is what your audit query greps for. Without it, sampling becomes guesswork, and auditors do not love guesswork.

**Step 6: name a reviewer who is not the prompter.** This is the segregation of duties piece. The CODEOWNERS file enforces it for sensitive paths. For the rest of the codebase, a PR template field that requires a named human reviewer is enough. Auto-approval bots are out. I cannot stress this enough.

That is the rollout. Six steps. Most teams skip steps 3, 4, and 5, then try to retrofit them six weeks before audit. It does not go well.

## What blows up in production

A few war stories, because the abstract version of this never quite lands.

A biotech Series B I worked with had standardized on the Cursor pro tier, not the enterprise tier. A senior engineer pasted a deidentified clinical dataset into the chat to debug a transformation. Deidentified by their internal definition, but containing full ZIP codes and dates of birth, which under [HIPAA Safe Harbor](https://www.hhs.gov/hipaa/for-professionals/privacy/special-topics/de-identification/index.html) is still PHI. That single paste triggered a breach disclosure obligation. The fix was a six-figure remediation and a delayed funding round. The vendor was not at fault. The deployment was.

A fintech in the Visa scope let Cursor index the full repository, including a `.env.staging` file with a live test card token. The token left their environment. Visa noticed. The fix was a credential rotation, a forensics report, and a very awkward call with their acquirer. Again, the tool did exactly what it was sold to do.

A pharma R&D group connected Claude Code to an MCP server that exposed their internal Confluence. A clever prompt injection in a public Confluence page (left by a contractor two years prior) caused the agent to exfiltrate internal study protocols to an attacker-controlled domain. This one was theoretical until it was not. The MCP threat model is real, and it is underbaked. (We covered the broader logging design for this case in our deep dive on [AI agent audit trail architecture](/playbook/expertise/ai-audit-trail-architecture-compliance).)

The pattern in all three: the tool worked correctly. The control gap was the deployment.

## The thing I want CTOs to internalize

Your engineers are going to use AI coding tools. If you ban them, half the team will use the consumer tier on a personal device, which is the worst possible outcome for compliance. The question is how visibly the rollout happens, and how well you can prove it later.

A sanctioned, proxied, logged deployment of one tool, with the six-step rollout above, is genuinely auditable. I have walked clients through SOC 2 Type II with this setup and the auditor commentary was, in one case, *the strongest AI governance evidence we have seen in 2026*. The reason for that quote is not that we did anything brilliant. The reason is that the bar is currently quite low, and clearing it is mostly a matter of writing things down.

The companies that are going to lose this cycle are the ones who pretend the tools are not in use, the ones who buy three tools instead of one, and the ones who confuse the vendor SOC 2 report with their own.

If you want help mapping your existing SOC 2 controls onto an AI-SDLC rollout, this is exactly the work my team does. We have done it for fintechs in PCI scope, biotechs under HIPAA, and a couple of insurers under [DORA](/playbook/expertise/dora-compliance-ai-fintech). The control matrix is similar across verticals; the data classification rules are not. For a broader baseline of the security controls we expect any vendor in this space to have in place, see our [top 10 information security practices](/playbook/insights/top-10-information-security-practices). Get in touch and we can walk through your specific scope.

---

*Daniella Mitchell leads compliance engineering at The BrightByte. She has prepared 14 organizations for SOC 2 Type II audits, including 4 in the past year where AI coding tooling was in scope.*
