---
title: 'EU Cyber Resilience Act 2027: What Software Vendors Must Do'
description: 'EU CRA hits 11 Dec 2027. Fines up to €15M, mandatory SBOMs, 24h vuln reports, CE marking. The compliance clock that nobody is taking seriously.'
image: '/assets/images/info/christian-lue-8Yw6tsB8tnc-unsplash.webp'
date: '01-05-2026'
readingTime: '10 min'
category: 'Insights'
subCategory: 'Notes'
tag: 'EU Cyber Resilience Act, CRA 2027, CE marking software, SBOM compliance, vulnerability disclosure, Regulation 2024/2847, NIS2, fintech compliance'
authorName: 'Daniella Mitchell'
authorImage: '/assets/images/author/daniella_mitchell.jpg'
faq:
  - question: 'When does the EU Cyber Resilience Act actually apply?'
    answer: 'It entered into force on 10 December 2024. Reporting obligations kick in on 11 September 2026 — that is when manufacturers must notify ENISA of actively exploited vulnerabilities within 24 hours. Full applicability lands on 11 December 2027. Most teams are budgeting as if 2027 is far away. It is not.'
  - question: 'Does the CRA apply to SaaS?'
    answer: 'Pure SaaS is out of scope — that lane is covered by NIS2. But if your SaaS is a "remote data processing solution" integral to a product with digital elements (a wearables backend, a smart-meter cloud, an IoT control plane), it is in scope. The carve-out is narrower than vendors like to assume.'
  - question: 'What are the CRA fines?'
    answer: 'Up to €15M or 2.5% of global annual turnover, whichever is higher, for breaches of Annex I essential requirements or vulnerability handling. The same ceiling as GDPR — applied to product cybersecurity for the first time in EU law.'
  - question: 'Does CRA apply to open source?'
    answer: 'Individual contributors and non-commercial FOSS projects are out of scope. Foundations like Apache or Linux Foundation may qualify as "open source software stewards" — a lighter regime with no administrative fines. The moment you commercialise — paid support, SaaS-on-top, enterprise editions — full obligations apply.'
  - question: 'Is an SBOM mandatory under the CRA?'
    answer: 'Yes. Manufacturers must produce a machine-readable SBOM covering at least top-level dependencies (Annex I, §2). CycloneDX or SPDX both satisfy the format requirement. Auditors will ask to see one before they ask anything else.'
---

# EU Cyber Resilience Act 2027: What Software Vendors Must Do

*Last quarter I sat in a kickoff with a Series B IoT vendor in Berlin. The CTO had a Notion page titled "CRA — Q3 2027" and a Jira epic with three tickets. None of them were started. I asked him about the September 2026 reporting deadline. He blinked. "Wait — there's a 2026 deadline?"*

*There is. Most of the room missed it.*

The EU Cyber Resilience Act (Regulation 2024/2847) is the first serious horizontal cybersecurity law in EU history. It hits any product with digital elements placed on the EU market — and the fines are GDPR-grade. The thing that should worry vendors is not the headline 2027 date. It is the staggered set of obligations that arrive earlier, almost quietly, and that auditors will absolutely use against you.

Here is what is actually in the law, what changes for engineering, and what to do this quarter — not next year.

## The CRA in 60 seconds

The regulation was [adopted on 23 October 2024 and entered into force on 10 December 2024](https://eur-lex.europa.eu/eli/reg/2024/2847/oj). It applies to **products with digital elements (PDE)** — basically any hardware or software placed on the EU market that connects to a device or network. Three dates matter:

- **11 June 2026** — notification of conformity assessment bodies (relevant if you need third-party assessment).
- **11 September 2026** — reporting obligations under Article 14. Actively exploited vulnerabilities must be reported to ENISA and the national CSIRT within 24 hours of awareness. Severe incidents follow the same clock.
- **11 December 2027** — full applicability. CE marking, SBOM, secure-by-default, the whole stack.

Fines top out at €15M or 2.5% of global annual turnover, whichever is higher. That ceiling applies to breaches of Annex I essential requirements or vulnerability handling. Lower tiers (€10M / 2%, €5M / 1%) cover other obligations and false statements to notified bodies.

That is the summary. Now the part that confuses everyone.

## Are you in scope?

Most of the legal energy in CRA implementation has gone into edge cases — and there are a lot of them. Three rules cover 90% of vendors.

**You are in scope if:** you place a product with digital elements on the EU market, regardless of where you are headquartered. A US firmware vendor selling smart locks in Berlin is in scope. A Korean IoT hub manufacturer with EU distributors is in scope. The placing-on-market trigger is the one that catches most non-EU vendors off guard.

**You are out of scope if:** your product is regulated under a sector-specific regime — medical devices (MDR), motor vehicles (Type-Approval), aviation (EASA). Pure SaaS is also out of scope, because services fall under NIS2.

**The murky middle:** "remote data processing solutions integral to a product." The European Commission [made it clear](https://digital-strategy.ec.europa.eu/en/policies/cra-summary) that backend services tied to a connected product are in scope as part of that product. So your IoT backend, your wearable cloud, your smart-meter SaaS layer — these come along for the ride. Pure B2B SaaS that does not power a device is still NIS2 territory.

Worth flagging: if you sell a hardware product *and* a SaaS that controls it, the SaaS half is now CRA-scoped via the integral-component clause. That is a non-obvious consequence and the one that hits hardware-software hybrids hardest.

## Important, Critical, or default? Annex III/IV decoded

Not every product faces the same conformity assessment. The regulation splits PDEs into four buckets, and the bucket you land in determines whether you can self-assess or need a notified body to sign off.

**Default class** (~90% of products): self-assessment. You declare conformity, sign the CE declaration, ship.

**Important Class I** (Annex III): password managers, VPNs, network management software, browsers, smart home assistants, identity management systems. Self-assessment is allowed *if* you apply a harmonised standard. Otherwise you need third-party assessment. The harmonised standards are still being drafted by ENISA and the European standardisation bodies — that is the part of the timeline most teams underestimate. If the standard does not land in time, third-party assessment becomes the only path.

**Important Class II** (Annex III): hypervisors, firewalls, tamper-resistant microprocessors, intrusion detection systems. Third-party conformity assessment is mandatory. No self-assessment route.

**Critical** (Annex IV): hardware devices with security boxes, smart meter gateways, smartcards. These may require European cybersecurity certification under delegated acts — the strictest tier, and the one most likely to involve scheme-specific testing.

If you build infrastructure software, network gear, or anything that touches authentication, you are probably in one of the upper tiers. Read Annex III and IV before you scope your roadmap. I have seen teams plan a six-month compliance sprint for what turned out to be a year-long third-party assessment.

## The four hard deliverables

Under the surface of all the legal text, there are exactly four things engineering needs to ship.

**1. Software Bill of Materials.** Machine-readable, covering at least top-level dependencies (Annex I, §2). CycloneDX and SPDX both satisfy the format. The hard part is not generating the SBOM — it is keeping it accurate across CI, release, and the inevitable patch builds. Use Syft or `cyclonedx-cli` in the build pipeline, attach the SBOM as a release artifact, sign it with cosign. If you cannot answer "what version of which library shipped in build 4.2.1" in under thirty seconds, you fail this control.

**2. Vulnerability handling and reporting.** A documented coordinated disclosure policy, a security contact, and a process that turns "we got a CVE report" into "we shipped a fix" inside the regulation's clocks. The reporting obligations from September 2026 are tight: 24h early warning to ENISA on actively exploited vulnerabilities, 72h follow-up, 14 days after fix for the final report. If your current vuln response runbook lives in a Slack channel and nobody owns it, that is a four-month project, not a four-week one.

**3. CE marking and Declaration of Conformity.** The administrative half. You write a technical file (security risk assessment, design choices, applied standards), you sign the EU Declaration of Conformity, you affix the CE mark. For self-assessed products this is paperwork. For third-party assessed products, this is paperwork *plus* a notified body engagement that itself takes months.

**4. Secure-by-default and security-by-design.** The squishiest of the four, because it is a set of essential requirements (Annex I, Part I). The list is long but not surprising — confidentiality, integrity, availability, minimised attack surface, no known exploitable vulnerabilities at shipping, secure update mechanism, default-on encryption. The trick is documenting how each design choice maps to which essential requirement. Auditors love a traceability matrix.

There is a fifth thing, which is not technically a deliverable but functions like one: the **5-year support period**. Default obligation is to provide security updates for the entire support period, which is at least five years from placing on market unless the product's expected lifetime is shorter. You ship in 2027? You owe security patches until 2032 at minimum. Plan capacity accordingly.

## CRA, NIS2, DORA, RED — how they stack for fintech vendors

Compliance teams keep asking me which regulation wins when they overlap. The answer is none of them — they stack.

If you are a fintech with any of: a hardware token, a connected ATM, an IoT device for retail payments, a SaaS that powers a connected product — you may end up in scope of:

- **CRA** for the product and its integral cloud component
- **NIS2** for your status as an essential or important entity
- **DORA** for your operational resilience as a financial entity (in force since [17 January 2025](https://www.eiopa.europa.eu/digital-operational-resilience-act-dora_en))
- **RED Delegated Act 2022/30** for the wireless aspects (applicable since 1 August 2025, eventually superseded by CRA)

Each has its own incident reporting clock. NIS2 wants 24h early warning. DORA wants 4h for major ICT-related incidents. CRA wants 24h for actively exploited vulns. They overlap, but they are not the same trigger. Build one incident response playbook with a routing table — do not try to merge the regulations into a single procedure.

Worth a separate mention: the open source carve-out. Individual contributors and non-commercial projects are out. Foundations may qualify as "open source software stewards" with a lighter regime. The moment money flows — paid support, enterprise editions, SaaS-on-top — full obligations apply. This is going to reshape how commercial OSS vendors structure their entities. Watch the [OpenSSF policy work](https://openssf.org/public-policy/eu-cyber-resilience-act/) on this. The implementing guidance is still being drafted.

## What to do this quarter

Forget the 2027 date for a second. The thing that should be on your roadmap right now is the **September 2026 reporting clock**. That is sixteen months out from the publication of this article. You need:

- A named security contact with an EU mailing address or representative.
- A coordinated vulnerability disclosure policy, published.
- A vuln triage process that can hit 24-hour early-warning notification without the team scrambling.
- A registered ENISA single reporting point relationship.

Then, parallel track, start the SBOM and CE-marking work. SBOM tooling first — it is the cheapest control, and every other control depends on knowing what you ship.

If you are in Important Class I or II, start the conformity assessment conversation now. Notified bodies have queues. The teams I see panicking in Q3 2027 are the ones that thought they could schedule a third-party assessment in Q2 2027 and ship in time. They cannot.

The CRA is not GDPR all over again. It is more specific, more technical, and the things it asks for are mostly things a competent engineering org should already have. The deadline is just the forcing function. The trap is treating it as a 2027 problem when most of the painful work has to land in 2026.

That kickoff in Berlin? We rewrote the Notion page that afternoon. Six tickets, owners, dates that work backwards from September 2026. Not Q3 2027.

Start there.
