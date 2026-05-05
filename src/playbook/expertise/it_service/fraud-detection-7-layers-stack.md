---
title: 'The 7 Layers of Real Fraud Detection: A Practical Stack for High-Risk Merchants'
description: 'A practical framework for what to build, buy, and skip in fraud detection. Seven layers, what each catches, what each costs, and the realistic maturity timeline.'
image: '/assets/images/info/fraud-detection-7-layers-stack.webp'
date: '05-05-2026'
readingTime: '17 min'
category: 'Expertise'
subCategory: 'IT Service'
tag: 'fraud detection layers, fraud detection stack, anti-fraud architecture, persistent device identity, graph analysis fraud, fraud ML, high risk merchant, fintech fraud, casino fraud detection'
authorName: 'Daniella Mitchell'
authorImage: '/assets/images/author/daniella_mitchell.jpg'
faq:
  - question: 'How many layers does a real fraud detection system actually need?'
    answer: 'Seven, applied selectively to your fraud profile. Card-level signals, identity, persistent device identity, behavioural analytics, graph analysis, machine learning, and human review. Not every merchant needs all seven, but the catch rate ceiling for any single layer is roughly 30-50%, and reaching 90% catch requires at least five layers operating in concert.'
  - question: 'Why is graph analysis described as a hidden moat in fraud detection?'
    answer: 'Because graph analysis exposes relationships that no transactional or behavioural layer can see. Fifty accounts sharing five devices, payment cards routing through the same email cluster, players colluding via balance transfer, all show up as graph patterns and remain invisible to scoring engines that look at one transaction at a time. Graph analysis is also where the network effect of multi-merchant fraud platforms becomes structurally hard to replicate in-house.'
  - question: 'When does it make sense to add machine learning to a fraud stack?'
    answer: 'After 50,000 to 100,000 confirmed chargeback labels and at least 12 months of stable feedback loops. Before that volume, the model trains on noise and produces unreliable scores. ML works best as a meta-layer that combines the outputs of the preceding five layers, not as a primary detection mechanism on raw transaction data.'
  - question: 'What is a realistic catch rate for a fully built fraud stack?'
    answer: 'Industrial-grade platforms operating across multiple merchants and several years of labelled data run at 90-95% catch. Internal tools at a single merchant typically peak at 80-85% after 18-24 months of investment. The 100% catch rate is marketing copy. No production fraud system reaches it, and the few vendors that claim it are either narrowing the definition of fraud or hiding their false-positive rate.'
---

# The 7 Layers of Real Fraud Detection: A Practical Stack for High-Risk Merchants

*A founder of an iGaming operator told me last quarter that they had spent $400,000 on fraud tooling in two years and their chargeback ratio was higher than when they started. They had bought four products that all sat in the same layer, leaving four other layers untouched. This is the framework for what to build, what to buy, and what to skip, ordered by what actually catches fraud at scale.*

There is no silver-bullet fraud detector. There is a stack. Layered defence is not a buzzword from a vendor whitepaper, it is mathematics: each layer catches a portion of attacks, and the cumulative catch rate approaches 90% only when five or more layers operate together. One "AI-based system" alone tops out at 30-50%, regardless of how the marketing describes it.

Here are the seven layers, the order to build them, and the catch rate each contributes against three tiers of attacker sophistication.

## Layer 1: Card-level signals

The strongest, most consistently underused layer. Card data is what your acquirer ships per transaction, and the fields that matter are not in the browser block.

**What this layer needs:**

- Tokenised PAN hash, so you can build velocity tables without storing card numbers
- BIN intelligence: issuer name and country, card type (debit, credit, prepaid), product tier
- AVS and CVV result codes (specific codes, not collapsed to match/no-match)
- 3DS authentication outcome with ECI and CAVV presence
- Cross-merchant velocity from your acquirer's network if available
- External card-status feeds: MATCH list (Mastercard), Ethoca dispute alerts, Verifi alerts

Without this layer, every other layer scores against a partial view of the transaction. Most of the missed fraud I have audited at high-risk merchants traces back to acquirer feeds that ship the browser block but skip the card-level fields, and a fraud team that scored what they had instead of demanding what they needed.

**Catch rate contribution:** 25-35% against carders. Lower against friendly fraud (the card data looks legitimate because the cardholder is legitimate).

**Cost:** Low. Most of this is configuration and acquirer negotiation, not new tooling.

## Layer 2: Identity layer

Identity verification is not run on every transaction. The cost-vs-value tradeoff makes that uneconomic at scale, and the customer experience is hostile. Identity is applied at moments of doubt: high-value transactions, geo or BIN mismatches, first-time deposits above a threshold, withdrawal requests, post-incident re-verification.

**What this layer covers:**

- Email reputation (Emailage, Trulioo, SEON): how old the address is, how widely it appears in breach corpora, whether it links to known fraud
- Phone reputation: carrier check, SIM swap signals, recent porting events
- KYC document verification: passport, ID card, driving licence with liveness check (Onfido, Jumio, Veriff, Sumsub)
- Sanctions and PEP screening, particularly under MLD6 and the EU AML Authority regime active since 2025
- Address verification against utility-bill or bank-statement evidence

In iGaming specifically, the regulatory floor for identity is set by jurisdiction (UKGC, MGA, GRA, Curaçao, Ontario AGCO). The fraud-prevention floor is usually higher than the regulatory floor, because the regulator cares about the player being a real adult, while the fraud team cares about the player being who they say they are with a card that genuinely belongs to them.

**Catch rate contribution:** 10-15% against carders, 5-10% against bonus abuse and account takeover. Most of the value is in deterrence rather than per-transaction catch: if your KYC is harder than the merchant next door, the carders move next door.

**Cost:** Medium. KYC verification runs $0.30-$2.50 per check depending on depth and provider.

## Layer 3: Persistent device identity, not session fingerprint

This is the layer most often confused with the 3DS browser block. They are different things, and the difference is operational.

A 3DS session fingerprint dies when the cardholder closes the tab. A persistent device ID survives cookie clears, browser switches, and incognito mode, because it is computed from physical and rendering characteristics of the device that are stable across sessions: canvas rendering, WebGL rendering, audio context output, font enumeration, hardware concurrency, screen geometry, storage probes, network behaviour.

**What this layer requires:**

- A JavaScript SDK loaded on checkout and on the deposit/withdrawal flow. Vendors include FingerprintJS Pro, ThreatMetrix (LexisNexis), Sift Sciences, Iovation
- A device-ID datastore that links device IDs to accounts, cards, IPs, and historical fraud labels
- Inconsistency detection: when an antidetect browser tries to spoof the fingerprint, the inconsistencies between, say, a faked timezone and a real audio context are themselves a signal

This is the layer that catches the antidetect-browser attacker that defeats every session-data fraud product. The economics matter: spoofing all the signals a persistent device ID measures is meaningfully harder than spoofing the 3DS browser block, and the persistent device-ID layer is where the $200-a-month attacker stack starts to run out of road.

**Catch rate contribution:** 15-25% across all attacker tiers. Higher against repeat carders and account takeovers, lower against first-time friendly fraud.

**Cost:** Medium-high. Vendor pricing $0.05-$0.20 per scored event, scaling with monthly volume.

## Layer 4: Behavioural and game-pattern analytics

Real customers behave differently from carders, even when the carder has perfect identity documents and a synthetic device ID. The difference shows up in how they interact with the product.

**Signals that matter:**

- Keystroke dynamics: dwell time, flight time, rhythm consistency
- Mouse movement: trajectory smoothness, click precision, scroll patterns
- Form-fill behaviour: tab vs click, autofill use, time per field
- In-product rhythm: deposit-to-play interval, session length, bet size variance, win-rate distribution
- Cashout pattern: deposit, single bet, cashout (a classic carder signature) vs deposit, multi-session play, partial withdrawal (a real player signature)

Game-pattern analytics is where iGaming differs sharply from generic e-commerce fraud. A casino has rich behavioural data per session that a Shopify merchant does not. Use it. The Carder pattern is so distinct from real-player play that even a rules-engine threshold ("deposit, fewer than three bets, withdrawal request within ten minutes") catches a measurable fraction of fraud at zero ML cost.

I worked with one operator that flagged 18% of carder fraud with a single rule on time-from-deposit-to-cashout. They added the rule on a Tuesday afternoon. Their chargeback rate the following month was the lowest it had been in eight months.

**Catch rate contribution:** 10-20%, heavily dependent on product type. Casinos and poker rooms get more out of this layer than sportsbooks or e-commerce.

**Cost:** Low to medium if built in-house, higher with specialist vendors (BioCatch, NuData, Castle).

## Layer 5: Network and graph analysis

The hidden moat. Graph analysis exposes patterns that no per-transaction layer can see, because the patterns exist only at the relationship level: account to device to card to email to phone to IP, repeated across hundreds of accounts.

**What graph analysis catches:**

- Bonus rings: 50 accounts on 5 shared devices, all claiming sign-up bonuses, all withdrawing on the same week
- Chip dumping: 5 players at the same poker table consistently transferring balance to one of them, identified through graph proximity in win/loss flows
- Synthetic identity rings: clusters of accounts that share fragments of identity (one phone shared by three accounts, one email cluster reused across four cards)
- Money laundering patterns: deposit-deposit-withdrawal flows that route through unrelated-looking accounts but converge on a single beneficial owner

This layer is structurally hard to do in-house at a single merchant, because you only see your own data. A graph that includes 50 accounts all sharing one device is informative. A graph that includes those same 50 accounts plus their footprint at three other merchants is transformative. This is the network effect that makes Sift, Kount, Signifyd structurally hard to displace: not their algorithms, but their cross-merchant graph data.

**Catch rate contribution:** 10-15% additional, mostly in fraud categories that no other layer catches (bonus rings, money laundering, account takeover at scale).

**Cost:** High to build, medium to buy. Most internal teams underestimate the complexity. Graph data infrastructure is its own engineering discipline (Neo4j, TigerGraph, Memgraph, AWS Neptune), and the analytics talent is scarce.

## Layer 6: Machine learning on labelled data

ML belongs at the top of the stack, not the bottom. It works best as a stacking layer that combines the outputs of the preceding five layers into a single calibrated probability.

**Prerequisites that the marketing rarely mentions:**

- 50,000-100,000 confirmed fraud labels minimum. Below this volume, the model is mostly noise
- A stable feedback loop: confirmed chargeback labels flowing back into training data within 30-60 days
- Calibrated retraining: monthly or quarterly, with drift monitoring. Models decay
- Explainability: SHAP values or equivalent, so analysts can see why a transaction scored what it did, and so the regulatory audit (DORA, EU AI Act high-risk system requirements) has answers

ML on transaction-level features is fragile: the attacker stack changes faster than the retraining cycle. ML on layer-output features holds up better: the underlying signals (device persistence, graph clustering, behavioural rhythm) move slower than the attacker tools, so the model survives longer between retrainings.

The compliance overhead in 2026 is real. Under the EU AI Act, fraud-detection systems used in financial services qualify as high-risk in most configurations, which means documentation, technical files, post-market monitoring, and human oversight obligations. We covered the EU AI Act compliance map for AI agents [in a separate piece](/playbook/expertise/eu-ai-act-compliance-ai-agents); the same framework applies to fraud ML. Model documentation is no longer optional.

**Catch rate contribution:** 5-15% above the underlying layers. Smaller than most teams expect.

**Cost:** High. ML team, infrastructure, retraining pipeline, drift monitoring, audit documentation.

## Layer 7: Human in the loop

Every fraud system at scale has a review tier for medium-confidence transactions, typically scores in the 30-70 range out of 100. This is the layer where precision and recall trade against each other in real time.

**What the human layer does:**

- Review borderline transactions with full context: the graph, the device history, the behavioural pattern, the identity verification status
- Generate the labels that train the ML layer. Without high-quality analyst labels, the ML layer decays
- Spot novel attack patterns before they generate enough volume for any automated layer to learn them
- Manage the customer experience around false positives: a real customer who got declined needs a fast path back

A typical mid-size casino runs 3-8 fraud analysts per million transactions per month. The expensive part is not the headcount. It is the tooling: a good analyst with good tooling resolves 10x the cases of a good analyst with a SQL terminal.

**Catch rate contribution:** Hard to attribute directly, because the analyst layer is mostly improving the precision of layers 1-6. Indirectly responsible for 10-20% of confirmed fraud labels.

**Cost:** Headcount-bound. Scales linearly with volume.

## Layer-by-attacker catch rate

The honest version of the catch rate matrix:

| Layer | Carder (basic) | Carder (sophisticated, antidetect+proxy) | Friendly fraud |
|-------|---------------|------------------------------------------|----------------|
| 1. Card-level signals | 25-35% | 10-15% | 5% |
| 2. Identity | 10-15% | 5-10% | <5% |
| 3. Persistent device ID | 20-30% | 10-15% | <5% |
| 4. Behavioural | 10-20% | 10-15% | 5-10% |
| 5. Graph | 10-15% | 10-15% | 5-10% |
| 6. ML stacking | 5-15% above the rest | 5-15% above the rest | 5-10% above the rest |
| 7. Human review | precision improvement | precision improvement | 10-20% |

Sum the column for sophisticated carders and the realistic ceiling is 60-80% with all seven layers operating well. That ceiling, and not 100%, is what production fraud systems actually deliver.

## The real moat is the network effect

A single merchant sees its own transactions. A platform with 50 merchants sees the same card across all 50. The same device. The same email. The same identity fragments. The same behavioural rhythm.

This is not a feature. It is the structural reason Sift, Kount, Signifyd, Riskified, Forter exist as billion-dollar companies while internal-only fraud projects rarely scale past their first year. The architectural decision (platform with shared graph vs single-tenant tool) sets the ceiling on the day the project starts. A merchant choosing to build internally needs to be honest about that ceiling, or about whether the merchant's specific fraud profile (heavily friendly-fraud-driven, for example) makes the network advantage less load-bearing.

For a regulated entity under DORA, the build-vs-buy question also touches third-party ICT risk obligations. We mapped the implications [in the DORA compliance piece](/playbook/expertise/dora-compliance-ai-fintech). Buying a vendor concentrates risk in one provider and triggers exit-strategy obligations. Building in-house concentrates risk in the team and the codebase. Neither is free.

## Realistic maturity timeline

The investment timeline at a high-risk merchant building a fraud capability from scratch:

- **Months 1-3.** Card-level rules, reputation feeds, basic AVS/CVV/3DS scoring, alert-feed integration. Catch rate 30-50% against the lazy attacker tier.
- **Months 4-6.** Persistent device ID via JS-SDK, identity verification at high-friction moments, cross-merchant velocity if your acquirer supplies it. Catch rate 60-75%.
- **Year 1+.** ML stacking, behavioural analytics, graph analysis on internal data. Catch rate 80-90% against everything except the most sophisticated rings.
- **Year 2+.** Industrial-grade. Mature feedback loops, drift-aware retraining, full audit trail under DORA and EU AI Act, analyst tooling that scales. Catch rate plateau at 90-95%.

The 100% catch rate is a marketing artifact. Sift and Kount, with multi-merchant data and a decade of investment, run at 90-95%. A merchant claiming higher is either narrowing the definition of fraud or hiding the false-positive rate. Probably both.

## Bottom line

Most high-risk merchants do not need to build all seven layers. They need to know which two or three apply to their specific fraud profile, and they need to build those two or three properly before adding any others. The merchant whose disputes are 70% friendly fraud needs alert-based intervention and behavioural analytics, not a sixth fraud-scoring vendor. The merchant whose disputes are 70% carder fraud needs persistent device ID and card-level signals, not a graph-analytics platform sized for a fraud ring problem they do not have.

Map your fraud taxonomy first. Pull six months of dispute reason codes, segment by attacker type, and rank the categories by volume. Choose your layers second. The framework above is the menu. Your fraud profile is the order.

If you want the engineering view of what your acquirer should be sending you, [start here](/playbook/expertise/3ds-browser-data-fraud-detection). If you want the business view of why most merchants confuse fraud prevention with chargeback prevention and end up paying for the wrong layer, [read this one](/playbook/expertise/chargeback-prevention-vs-fraud-prevention).

Get the taxonomy right, and the stack writes itself.
