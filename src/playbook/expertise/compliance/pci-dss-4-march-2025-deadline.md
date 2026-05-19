---
title: 'PCI DSS 4.0: What Changed at the March 2025 Deadline'
description: 'PCI DSS 4.0.1 went live 31 March 2025. MFA expansion, e-skimming controls 6.4.3 and 11.6.1, customised approach. What teams who missed it must fix.'
image: '/assets/images/info/rupixen-Q59HmzK38eQ-unsplash.webp'
date: '01-05-2026'
readingTime: '11 min'
category: 'Expertise'
subCategory: 'Compliance'
tag: 'PCI DSS 4.0.1, PCI DSS, MFA, e-skimming, customised approach, payment security, fintech compliance, compliance, regulated industries, audit trail'
authorName: 'Daniella Mitchell'
authorImage: '/assets/images/author/daniella_mitchell.jpg'
faq:
  - question: 'What is the difference between PCI DSS 4.0 and 4.0.1?'
    answer: '4.0 was published in March 2022. 4.0.1 was published in June 2024 as a limited revision — clarifications and errata only, no new requirements. 4.0.1 supersedes 4.0. If your QSA is still scoping you against 4.0 unmodified, ask why.'
  - question: 'Who has to comply with requirements 6.4.3 and 11.6.1?'
    answer: 'Any merchant or service provider whose payment page is rendered in a customer browser. That is most e-commerce and a surprising number of "we use a redirect" merchants who still load analytics or chat widgets on the redirect target. Read the SAQ A and SAQ A-EP applicability notes carefully — the bar is lower than people assume.'
  - question: 'Can I use the customised approach for SAQ A?'
    answer: 'No. SAQ-eligible merchants must use the defined approach. Customised approach is reserved for entities undergoing full Report on Compliance (RoC) assessments with a QSA. If your acquirer accepts a SAQ from you, customised approach is off the table.'
  - question: 'What are the fines for non-compliance after 31 March 2025?'
    answer: 'Card brands do not publish fine schedules. Public estimates put non-compliance fines at $5,000 to $100,000 per month, levied via your acquirer. The bigger cost is account data compromise — fines and forensic investigations that can run from $5,000 to over $500,000 per incident, plus card replacement at $3 to $5 per card. The British Airways £20M ICO fine after the 2018 Magecart attack is the case study most regulators reference now.'
  - question: 'Do all employees with CDE access need MFA now?'
    answer: 'Yes. Requirement 8.4.2 expanded MFA from administrative and remote access to all non-console access into the cardholder data environment. That includes regular users on the internal network. The grandfathering window closed 31 March 2025.'
---

# PCI DSS 4.0: What Changed at the March 2025 Deadline

*A retail client called me in mid-April 2025 — about two weeks after the future-dated PCI DSS 4.0.1 requirements went live. They had just failed an interim review on requirement 6.4.3. The QSA asked for an inventory of every JavaScript file loaded on their checkout page. The team produced a list of seventeen scripts. The actual count, after we ran a fresh audit through the browser DevTools, was forty-one. The other twenty-four had been added by a tag manager that the marketing team owned and engineering had no visibility into.*

*That is the version of this story I see most often. The new controls are not technically hard. They are organisationally hard.*

The future-dated PCI DSS 4.0.1 requirements became mandatory on 31 March 2025. By the time you are reading this, the grandfathering window has been closed for roughly a year. The teams that prepared in 2024 are fine. The teams that did not are fielding awkward questions from their acquirers, dealing with QSA findings, and trying to retrofit controls under audit pressure. This article is for the latter group.

## Where we are: 4.0, 4.0.1, and the deadlines that already passed

A quick refresher because the timeline has moved twice and people still confuse it.

[PCI DSS 4.0](https://www.pcisecuritystandards.org/document_library/) was published on 31 March 2022. PCI DSS 3.2.1 was retired on 31 March 2024 — that was the date by which all assessments needed to be against 4.0. Then in June 2024 the PCI Security Standards Council published [4.0.1](https://blog.pcisecuritystandards.org/now-available-pci-dss-v4-0-1), a limited revision that supersedes 4.0. No new requirements, just clarifications, errata, and adjustments to applicability — particularly for SAQ A and SAQ A-EP merchants.

The version of the standard that introduced ~64 new requirements split them into two waves. Wave one — requirements that were "best practice" until 31 March 2024 — has been mandatory for two years now. Wave two — requirements marked "best practice until 31 March 2025" — became mandatory on 1 April 2025.

If you are scoping fresh, just assess against 4.0.1 with the full requirement set. If you are mid-cycle on a 4.0 RoC, ask your QSA whether the migration to 4.0.1 is happening at the next assessment or now.

## What became mandatory on 1 April 2025

The list is long. These are the ones that show up in actual audit findings most often, in rough order of "how often does this trip teams up."

**Requirement 6.4.3 — payment page script inventory and integrity.** Every script loaded in a customer browser on a payment page must be inventoried, justified, and integrity-protected. Script means *every* script — your code, your tag manager output, analytics, A/B testing tools, chat widgets, fraud detection scripts. Each one needs a documented business reason, an owner, and an integrity assurance mechanism (SRI, CSP with strict script-src, or an equivalent runtime monitoring system).

This is the requirement most teams fail. Marketing tag managers are usually outside engineering visibility. Customer support adds chat widgets without a security review. Analytics teams change vendors without telling anyone. The first audit run almost always finds 2-3x more scripts than engineering thinks are there.

**Requirement 11.6.1 — change and tamper detection on payment pages.** A mechanism that detects unauthorised modification of HTTP headers or script content on payment pages, with alerting. Minimum frequency: weekly. The implication is that a static SRI hash plus a CSP report-uri is not enough on its own — you need active monitoring that catches changes between baselines, not just at request time.

You can satisfy this with a self-built solution (headless browser snapshot + diff + alert pipeline, run weekly via cron, alert SOC on diff). For most teams, a SaaS — Feroot PaymentGuard, Akamai Page Integrity Manager, Jscrambler Webpage Integrity, HUMAN Code Defender — is the lower-friction path. Pick whichever your QSA has seen before. It will save weeks of "is this control acceptable" back and forth.

**Requirement 8.4.2 — MFA for all non-console CDE access.** This is the one teams often mis-read. In 4.0 the MFA requirement only applied to administrative access and remote access to the CDE. In 4.0.1 it applies to *all* non-console access into the CDE, regardless of role. A regular user logging into a CDE-resident application from inside the office network needs MFA now. Not "the access requires VPN, the VPN has MFA, therefore covered" — the application itself needs an MFA challenge or you need a strict equivalence argument that the QSA accepts.

In practice, this often means putting an SSO with MFA in front of internal CDE apps that previously trusted the corporate network. SAML or OIDC into Okta, Microsoft Entra, or your IdP of choice. The implementation is straightforward. The internal pushback from "we have always logged in this way" is what eats the timeline.

**Requirement 8.3.6 — password length minimum 12 characters.** Up from 7. Alphanumeric. Applies if MFA does not cover the account. Trivial to implement on new systems, painful on legacy applications that hardcode the policy.

**Requirement 5.4.1 — anti-phishing controls.** Process and technology level. DMARC enforcement on outbound mail (`p=quarantine` or `p=reject`), inbound filtering for spoofed sender domains, user-facing controls — banners on external mail, click-through warnings on suspicious links, an actual phishing reporting mechanism that goes somewhere. The QSAs I work with want to see all three layers, not just one.

**Requirement 12.3.1 — targeted risk analysis (TRA).** Documented analysis for any periodic control where the requirement allows flexibility. If you do quarterly access reviews instead of monthly, you need a TRA explaining why quarterly is appropriate. If your tamper detection runs weekly instead of real-time, you need a TRA. The TRA itself is a one or two page document. Doing one for each flexible control is the work.

There is more — vulnerability management cadence, encryption inventory, role-based access reviews. But if you have these six locked down, you have addressed the bulk of the new audit risk.

## The customised approach: when it helps and when it does not

PCI DSS 4.0 introduced a second compliance pathway alongside the classic defined approach. The customised approach lets an entity describe how they meet a requirement's *Customised Approach Objective* through means other than the prescribed control, then validates that approach through a Targeted Risk Analysis and a QSA assessment.

This is genuinely useful for entities with mature security programs that already have controls more sophisticated than what PCI prescribes. A bank that runs continuous attack surface monitoring with millisecond-grade detection does not need to do quarterly external ASV scans the same way a small SaaS does. The customised approach lets them document the equivalent control and pass.

It is not useful, and not allowed, for SAQ-eligible merchants. If your acquirer accepts a self-assessment questionnaire from you, customised approach is off the table. The customised approach is exclusive to full Report on Compliance assessments. Most merchants reading this are SAQ-eligible. Plan for the defined approach.

If you are doing a RoC and have a real argument for an alternative control, the customised approach is worth the engagement with your QSA. Budget for it — a customised approach validation typically adds 20-30% to the assessment effort because of the TRA review and the bespoke procedure design. The trade-off is paying once and avoiding awkward annual remediation against a control that does not fit your environment.

## Closing 6.4.3 and 11.6.1 in 90 days

If you missed the March 2025 deadline and are looking at e-skimming exposure right now, here is the fastest practical path. Roughly 90 days end-to-end if you have engineering and a security owner.

**Week 1-2: inventory.** Run a fresh script audit. Browser DevTools network tab on every payment page, export to CSV. Then run it again on a different network, a different browser, and from a mobile user agent — tag managers serve different scripts to different segments. You will find more than you expect. Match every script to an owner, a business reason, and a domain.

**Week 3-4: prune.** For each script, the owner has 48 hours to justify it on the payment page. No justification, the script comes off. This is the single highest-impact security action you will take all year — fewer scripts means fewer vectors. Resist the urge to negotiate. Marketing will survive without their fifth analytics tool on checkout.

**Week 5-6: integrity controls.** Apply SRI hashes for every static script you control. Roll out a strict Content Security Policy with `script-src` using nonces or hashes, plus `report-uri` to a collector. Block the long tail of inline scripts that violate the policy. Plan for breakage — you will find inline scripts you forgot existed. Iterate on the policy until you have zero violations on the payment page.

**Week 7-10: tamper detection.** Pick a tool. Self-built or SaaS, both are valid. If self-built: a Puppeteer or Playwright job that snapshots the rendered DOM and outbound network requests on the payment page weekly, compares to a baseline, and alerts on diff. If SaaS: pick from the list above and integrate. Document the targeted risk analysis for the chosen frequency.

**Week 11-12: documentation.** Write the script inventory document, the integrity control description, the TRA, the incident response playbook for tamper alerts. Name owners. Get the security lead's sign-off. Hand to the QSA.

This is the unglamorous version. The flashy version is "buy a SaaS and ship in two weeks." That works if your script inventory is already clean. It does not work if you have forty-one scripts on checkout and nobody knows what half of them do — which, to be honest, is most of the teams I see.

## What the regulators are actually doing

The card brands have not announced a coordinated enforcement push. What is happening instead is that QSAs have shifted their assessment focus toward the new requirements, and acquirers are pushing harder on attestation gaps. Two visible patterns:

First, tougher line on script inventory completeness. QSAs that previously accepted a list of "primary scripts" now want the full DOM-rendered list including third-party tag manager output. Inventories that were fine in 2024 fail in 2025.

Second, tighter scrutiny on remote access MFA. The expansion to all non-console CDE access is being verified through walkthroughs — the QSA logs in as a hypothetical user and sees whether MFA prompts. Excuses about VPN coverage are not landing the way they did before.

Behind the scenes, the [Verizon Data Breach Investigations Report 2024](https://www.verizon.com/business/resources/reports/dbir/) confirmed that web application attacks remain the top vector for retail breaches, and Magecart-style e-skimming continues to be a primary technique. The standard is responding to a real and current attack pattern. The compliance is not theatre. For the upstream story on how those attackers reach payment pages in the first place, see our breakdown of [supply chain attacks from XZ to npm and PyPI](/playbook/expertise/supply-chain-attacks-xz-npm-pypi).

## The actual takeaway

PCI DSS 4.0.1 is a more demanding standard than 4.0 was, and it is a much more demanding standard than 3.2.1. The controls that bite teams most are not the technically hard ones — they are the ones that require visibility across organisational boundaries. Engineering does not own the tag manager. Marketing does not own the SOC. Customer support does not own the chat widget vendor. The new requirements force someone to reconcile across all of them.

If you are in the *we missed the deadline* camp, do not panic and do not try to do everything at once. Run the script audit first. Fix MFA second. Add tamper detection third. Document a customised approach only if you are doing a full RoC and have a real argument.

The retail client from the opening? They got the script inventory down from forty-one to eleven, applied SRI and a strict CSP, deployed a tamper monitoring SaaS, and passed their next assessment in August 2025. Three months of focused work. Not pleasant, but not existential either.

Most compliance work is like that. Boring, methodical, and eventually done.

Start with the inventory. For the logging side that QSAs increasingly ask about, see our [AI audit trail architecture guide](/playbook/expertise/ai-audit-trail-architecture-compliance). Or browse the full [compliance playbook](/playbook/expertise?sub-category=compliance) for adjacent regimes.
