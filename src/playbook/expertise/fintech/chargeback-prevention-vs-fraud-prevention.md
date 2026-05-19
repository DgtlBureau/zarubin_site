---
title: 'Chargeback Prevention is Not Fraud Prevention: Stop Buying the Wrong Tool'
description: 'High-risk merchants lose more money to chargebacks than to fraud, and most are protecting against the wrong threat. Here is how to tell them apart and what to buy.'
image: '/assets/images/info/chargeback-prevention-vs-fraud-prevention.webp'
date: '05-05-2026'
readingTime: '10 min'
category: 'Expertise'
subCategory: 'Fintech'
tag: 'chargeback prevention vs fraud prevention, high risk merchant chargebacks, casino chargeback rate, friendly fraud, Visa CMP, Ethoca alerts, payment risk management, fintech compliance'
authorName: 'Daniella Mitchell'
authorImage: '/assets/images/author/daniella_mitchell.jpg'
faq:
  - question: 'Is chargeback prevention the same as fraud prevention?'
    answer: 'No. Fraud prevention targets stolen cards and fake identities at the moment of authorisation. Chargeback prevention targets the longer process by which a real or fake cardholder disputes a transaction with their bank weeks later. The two threats overlap, but they are caught by different products at different points in the lifecycle, and most merchants buy one when they need the other.'
  - question: 'What is the difference between Visa CMP and Mastercard CMP thresholds?'
    answer: 'Visa Compelling Evidence and Visa Acquirer Monitoring Programme (VAMP) replaced VFMP and VDMP as of April 2025, with a 0.9% chargeback ratio threshold and 1.5% fraud ratio. Mastercard Excessive Chargeback Programme (ECM) sits at 1.5% chargeback ratio with a parallel Excessive Fraud Merchant programme. Crossing either threshold for two consecutive months puts the merchant at risk of fines and PSP termination.'
  - question: 'What is friendly fraud and why is it the dominant casino chargeback type?'
    answer: 'Friendly fraud is when a real cardholder disputes a transaction they actually authorised, usually after the entertainment is consumed. In iGaming, the player loses, regrets the deposit, and tells the bank "this was not me" or "I did not authorise gambling". On every transactional signal it looks identical to a legitimate purchase, which is why fraud-prevention tools at the authorisation step rarely catch it.'
  - question: 'What does an alert-based chargeback intervention actually do?'
    answer: 'Networks like Ethoca (Mastercard) and Verifi (Visa, with RDR and CDRN) notify the merchant when a cardholder initiates a dispute, before it becomes a formal chargeback. The merchant has a short window (typically 24-72 hours) to refund the transaction directly. The refund is recorded as a normal credit, not a chargeback, which keeps the chargeback ratio clean and avoids the network fines.'
---

# Chargeback Prevention is Not Fraud Prevention: Stop Buying the Wrong Tool

*A casino client called me in February. Their fraud spend had gone up 40% year on year, their fraud catch rate looked solid in the dashboard, and they were one month away from being placed on Visa's monitoring programme for excessive chargebacks. They had bought the wrong tool.*

This is more common than you would expect. The terms get used interchangeably in vendor pitches, the categories overlap on a Venn diagram, and the budget owner usually does not have time to draw the diagram. So here is the diagram, and what to do with it.

## Fraud and chargebacks are not the same problem

Fraud is a card-not-present transaction made with a stolen card or a fake identity. The signal is at authorisation: did the issuer approve, did 3DS clear, did the cardholder match the card. The merchant either accepts the risk and keeps the money, or declines and loses the sale.

A chargeback is the bank-side reversal of a settled transaction, initiated by the cardholder days or weeks after the fact. The signal is post-settlement: a dispute code, an evidence packet, an issuer's decision. The money is already gone, plus a $25-$100 chargeback fee per case, plus the operational cost of fighting it.

In iGaming and other high-risk verticals, most chargebacks are not stolen cards. They are friendly fraud. The cardholder is real, the transaction was real, the customer played and lost, and now the customer has decided that "I did not authorise this gambling charge" is a faster path to recovery than self-control. On every authorisation signal that real-time fraud tools score, this transaction looks pristine.

Here is the practical implication. If you bought a fraud tool to fix a chargeback problem, you bought the wrong tool. The auth-time score did not flag the transaction because there was nothing to flag.

## The chargeback ratio is an existential metric

Card networks do not care about your fraud catch rate. They care about your chargeback ratio.

| Network | Programme | Chargeback threshold | Fraud threshold |
|---------|-----------|---------------------|-----------------|
| Visa | VAMP (replaced VFMP/VDMP April 2025) | 0.9% chargeback ratio | 1.5% fraud ratio |
| Mastercard | ECM, EFM | 1.5% chargeback ratio | 0.5% fraud ratio |

Two consecutive months above threshold and your acquirer starts the conversation about fines. Three to six months and they are looking for a way to terminate you. A high-risk merchant terminated by their PSP loses processing entirely until they find a replacement, and the replacement is more expensive, more restrictive, and aware of why the previous PSP let you go.

Fraud spend without chargeback ratio management is pouring petrol on a fire. The fire is not the fraud rate. The fire is the chargeback rate, and the network thresholds do not care which type of dispute drove it.

## Three intervention points, three different products

There are three distinct moments at which you can act on a high-risk transaction, and each is a different product category. Most merchants do not realise this and end up with two of the three covered, badly, by overlapping vendors.

**Pre-transaction prevention.** Score the transaction at authorisation. Decline, challenge, or approve. Sift, Kount, Signifyd, Riskified, Forter sit here. Strong against carders, weak against friendly fraud, because friendly fraud has no auth-time signal.

**Alert-based intervention.** The cardholder has filed a dispute with the issuer, but it has not crossed the line into a formal chargeback yet. Ethoca (Mastercard) and Verifi (Visa, with RDR and CDRN) push the alert to the merchant. The merchant refunds the transaction inside the alert window, the cardholder gets their money back through the merchant rather than the bank, and the dispute closes without a chargeback recorded. This single intervention saves the chargeback ratio, the fee, and the operational cost.

**Post-chargeback representment.** The chargeback is filed. The merchant has 7-30 days (depending on reason code and network) to submit compelling evidence: terms-of-service signature, IP and device match, login and gameplay logs, communication trail. Vendors here include Chargebacks911, Midigator (now Equifax), Justt. Win rates of 30-65% depending on quality of evidence packs.

These are different products solving different problems at different costs. A fraud-prevention tool with "chargeback management" tacked on is usually strong in one and thin in the other two.

## The attacker mix is more varied than the marketing suggests

Most fraud tools are built on the assumption that the attacker is a carder testing stolen cards. Carders matter, certainly. They are not the majority of the chargeback volume.

A typical iGaming merchant chargeback breakdown, from the books I have audited:

- Carder fraud (stolen cards, account takeovers): 40-60%
- Friendly fraud (real player, deposit regret): 15-30%
- Bonus abuse (multi-account, collusion, ring-play): 10-20%
- AML and money-laundering disputes: 3-8%
- Genuine merchant errors and system disputes: rest

Each category needs a different intervention. Carder fraud responds to auth-time scoring and persistent device identity. Friendly fraud responds to alert-based intervention and gameplay-log evidence. Bonus abuse needs graph analysis across accounts. AML needs identity verification and transaction monitoring tied to KYC obligations under AML6 and the EU AML Authority regime that came into force in 2025.

An "all-in-one fraud platform" tends to be strong against the first category and weak against the other three. That is not a flaw in any one product. It is a structural fact about how fraud platforms are built and which fraud type generated their training data.

## The economics are the cleanest in fintech

Of all the spend categories in a high-risk merchant's risk budget, chargeback prevention has the cleanest ROI. The maths is simple.

For a casino merchant processing €5M per month with a 1.2% chargeback ratio, that is €60,000 per month in disputed transactions. Add the fee at €40 average per chargeback, the operational handling cost at roughly €50 per case, and the inflated MID rates that come with sitting near a network threshold, and the fully-loaded cost is closer to €100,000 per month.

A solid alert-based intervention layer typically catches 35-55% of dispute volume before it becomes a chargeback. At 45% catch, that is €45,000 per month recovered, against a vendor cost of roughly €15-20 per resolved alert (so €10,000-15,000 monthly at this volume). Net: €30,000-35,000 per month, plus the chargeback ratio drops below the network threshold, which is the part that matters more than the cash.

The pricing model usually charges a percentage of saved chargebacks rather than a flat subscription. That structure aligns the vendor with the merchant: they only earn when they prevent. Finance teams find that easier to approve than a flat $50,000 annual contract for a fraud platform whose contribution they cannot directly measure.

## The combined stack catches more than either alone

Pre-transaction scoring catches carders. Alert-based intervention catches friendly fraud and dispute regret. Stack them and you catch 60-80% of total chargeback volume. Run either alone and you cap out around 30-45%.

The integration is straightforward in 2026: most pre-transaction vendors expose webhooks and most alert networks expose REST APIs. The harder problem is feedback. The pre-transaction tool must learn from confirmed chargebacks, which means the merchant must label outcomes and feed them back. Without that loop, the model decays. Ask any vendor how they ingest your confirmed chargeback data, and how often the model retrains. If the answer is vague, the model decays.

## What to ask before signing

Six questions for any chargeback or fraud vendor pitch. Print them.

1. Which alert feeds do you ingest: Ethoca, Verifi RDR, Verifi CDRN, Order Insight? All four, or only two?
2. Pricing model: per-transaction, flat subscription, or percentage of saved chargebacks? If the answer is the first or second, why?
3. How does your tool affect my chargeback ratio specifically? Show me a customer case where ratio dropped below the network threshold.
4. What is the feedback API? How do I push my confirmed chargeback labels back, and how often does your model retrain on my data?
5. What is your representment win rate by reason code (10.4 fraud, 13.1 product not received, 13.5 misrepresentation)? Vendors that quote a single overall win rate are hiding distribution.
6. Are you certified by Visa and Mastercard for the specific programme you claim to address? Ethoca and Verifi have formal merchant participation lists. Ask to be on the list.

## Bottom line

If you are paying for a fraud tool but you are still on a CMP watchlist, you bought the wrong layer. Fraud prevention catches stolen cards. Chargeback prevention catches disputes. The two products overlap on the Venn diagram, but the merchant who confuses them ends up with chargeback ratios that fraud spend never fixed.

Chargeback prevention sits inside a broader anti-fraud architecture that has roughly seven layers, and the order in which you build them matters more than which vendor you choose at any one layer. I wrote the full stack and the maturity timeline separately: [the seven layers of real fraud detection](/playbook/expertise/fraud-detection-7-layers-stack). If you want the engineering view of why session-data fraud tools rarely move the needle on either fraud or chargebacks, [start here](/playbook/expertise/3ds-browser-data-fraud-detection).

Look at your last six months of disputes. Pull the reason code distribution. If 10.4 dominates, you have a carder problem and a pre-transaction gap. If 13.x dominates, you have a friendly-fraud problem and an alert-layer gap. The split tells you what to buy. Until then, every fraud product is a guess.
