---
title: 'Why Browser Data Alone Will Not Catch Fraud: A Look Inside the 3DS Payload'
description: 'The 3DS browser block looks like a fingerprint and behaves like a public dataset. Here is what each field tells you, what it does not, and why session-data fraud scoring is theatre.'
image: '/assets/images/info/3ds-browser-data-fraud-detection.webp'
date: '05-05-2026'
readingTime: '12 min'
category: 'Expertise'
subCategory: 'IT Service'
tag: '3ds browser data fraud, session fingerprint fraud detection, browser data risk scoring, antidetect browsers, payment fraud, residential proxies, fintech fraud, acquirer payload'
authorName: 'Vitaliy Zarubin'
authorImage: '/assets/images/author/avatar.png'
faq:
  - question: 'Is the 3DS browser block enough to score fraud risk?'
    answer: 'On its own, no. The browser block tells you device class, plausible region, and bot signals. It does not tell you whether the cardholder is real. Card-level signals (BIN, AVS, CVV, 3DS result, decline history, cross-merchant velocity) carry far more weight, and persistent device identity from a JS-SDK on checkout adds the layer that browser data cannot.'
  - question: 'Can antidetect browsers really bypass standard fraud checks?'
    answer: 'Yes. Antidetect browsers like Multilogin, Dolphin, and Linken Sphere cost $80-150 per month and spoof user agent, canvas, WebGL, timezone, language, color depth, and screen size. Combined with residential proxies at $5-15 per GB, they neutralise four out of five session signals at well under $200 per month total.'
  - question: 'What should an acquirer send in the transaction payload?'
    answer: 'At minimum: BIN and last4, AVS result code, CVV result code, full 3DS result (status, ECI, CAVV presence), issuer-side decline history for the past 24 hours, cross-merchant velocity, and a tokenised PAN hash for downstream velocity layers. Anything thinner forces your fraud system to score with one eye closed.'
  - question: 'Why do geo cross-checks matter more than individual fields?'
    answer: 'Because attackers can fake any single field cheaply. Cross-correlating IP country, BIN country, timezone offset, and browser language exposes mismatches that no single field would surface. A real customer hits four-for-four. A carder running stolen UK credentials through a Czech proxy hits two-for-four, and that delta is the signal.'
---

# Why Browser Data Alone Will Not Catch Fraud: A Look Inside the 3DS Payload

*We pulled the actual payload an acquirer ships per transaction, and read it field by field. Most of what is positioned as AI-powered fraud detection is built on a public dataset that costs $200 a month to defeat.*

A casino client forwarded me a fraud-vendor pitch deck last month. Forty pages, "AI-powered behavioural analytics", three NHL team logos along the footer for reasons I never figured out. I asked one question before the call: what does the acquirer actually send you per transaction. They sent the JSON.

I cancelled the call.

```json
{
  "tx": {
    "amount": 250.00,
    "currency": "EUR",
    "card_bin": "445653",
    "card_last4": "8823"
  },
  "browser": {
    "user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ...",
    "accept_header": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "ip_address": "94.45.118.221",
    "language": "en-GB",
    "color_depth": 24,
    "screen_width": 1920,
    "screen_height": 1080,
    "timezone_offset": -60,
    "java_enabled": false
  },
  "session_id": "3ds-9a1f2e4c"
}
```

That is the payload. BIN, last4, amount, currency, and a browser block lifted straight from the EMVCo 3DS 2.x specification. Every fraud product downstream, every Sift competitor, every internal CTO weekend project, every "ML-powered risk engine" with a logo wall, works off the same eleven fields. You are not buying a moat. You are buying a wrapper around a public dataset.

Let me walk through what each field actually tells you, what it does not, and what to demand from your acquirer if you want a feed worth scoring.

## The browser block, field by field

Every field in that block has a precise diagnostic ceiling. Past that ceiling, you are pattern-matching noise.

| Field | What it tells you | What it does not |
|-------|-------------------|-------------------|
| User-agent | Device class, OS family, browser engine, automation flags (headless Chrome, PhantomJS, Selenium) | Anything an attacker has not already faked. Spoofing a UA is one HTTP header. Bot frameworks rotate them per request |
| IP address | Country, ASN, datacenter or residential range, reputation against threat-intel feeds (Spamhaus, IP2Proxy, MaxMind), velocity if you cache it yourself | Real location. Half the inbound IPs from organised carders in 2026 are residential proxies in the merchant's target country |
| Accept-Language | Plausible region, plausible browser locale, mismatch signal vs IP and BIN | Identity. A Romanian carder targeting UK merchants ships en-GB by default. So does a real Brit |
| Timezone offset | Cross-check signal against IP and language. Mismatch is informative. Match is neutral | Real timezone. Five seconds in DevTools, `Intl.DateTimeFormat().resolvedOptions().timeZone` returns whatever the script wants it to return |
| Color depth + screen size | Bot detection (1024x768 default = headless), device class (mobile vs desktop) | Anything else useful. Real phones and real laptops produce thousands of identical fingerprints. The "uniqueness" arguments from 2014 EFF papers do not survive contact with mass adoption of common screen sizes |
| Java enabled | Almost nothing in 2026. The field exists in the 3DS spec for backward compatibility | Java was killed in browsers around 2015. Always returns false. If you see true, you are probably looking at a malformed test transaction, not a fraud signal |

Read the table again. There is exactly one field on its own that produces a signal you can act on without correlation: the IP, and only because it cross-references against threat-intel feeds you ingest separately. Everything else is enrichment, not detection.

That distinction matters more than most teams admit. Enrichment is "this transaction looks plausible". Detection is "this transaction is fraudulent with confidence X". The browser block does the first. It does not do the second, and selling it as the second is where most of the industry's marketing budget goes.

## The geo cross-check is the only real trick

The one analytical move browser data supports better than most fraud teams realise is multi-axis geo correlation. You have four geo signals in the payload:

1. IP-derived country and ASN
2. Card BIN country, which is the issuer's country, not necessarily the cardholder's
3. Timezone offset, which maps to a region
4. Browser language

A real Spanish customer paying with a Spanish-issued card from a Madrid hotel produces ES-IP, ES-BIN, UTC+1 in winter, es-ES. Four-for-four. A carder running stolen UK credentials through a Czech residential proxy produces CZ-IP, GB-BIN, UTC+1, en-GB. Two-for-four, and one of the matches (UTC+1) is coincidence not signal.

Mismatches are strong. They are the cleanest signal in the entire browser block. Matches are not "clean", though, and this is where teams overinterpret. A four-for-four means one of two things: this is a real customer, or this is a sophisticated attacker who synced all four axes, which any decent antidetect setup does by default in 2026.

Cross-checks raise your floor. They do not raise your ceiling. To put a number on it: in the high-risk merchant data I have seen, geo cross-check rules add roughly 8-12% to a baseline catch rate. Useful, not transformative.

## The session ID is not what you think it is

Most teams treat `session_id` as if it were a device identifier. It is not. The 3DS session ID is generated per-challenge, lives for the lifetime of one authentication, and resets the moment the cardholder closes the tab. Two transactions from the same physical device fifteen minutes apart will produce two unrelated session IDs.

Persistent device identity is a different problem and a different layer. It requires a JavaScript SDK loaded on your checkout page (FingerprintJS Pro, ThreatMetrix, or rolling your own with canvas, WebGL, audio context, font enumeration, and storage probes). That SDK survives cookie clears, browser switches, and incognito mode in ways that the 3DS payload never will. Without it, every transaction is anonymous from a device perspective.

If your fraud product claims persistent device tracking but you are not loading a script on checkout, ask where the device ID comes from. The honest answer is "we hash a few headers and call it a fingerprint", and that hash is reset by clearing cookies or opening incognito.

## What $200 a month does to your stack

This is where the conversation usually gets uncomfortable. The commodity attacker toolkit in 2026 looks like this:

- **Antidetect browser** (Multilogin, Dolphin, Linken Sphere, GoLogin): $80-150 per month. Spoofs UA, canvas, WebGL, timezone, language, screen geometry, color depth. Generates fresh fingerprints per session, isolated profiles per stolen identity.
- **Residential proxies** (Bright Data, Soax, IPRoyal): $5-15 per GB. Real ISP IPs in the country of your choice, rotating or sticky, often with ASN matching the target customer demographic.
- **Stolen card details** on a mid-tier carder forum: $5-30 per card with 3DS bypass, more for verified balance, more again for premium tier products.

Under $200 a month for a solo operator. Less if shared across a fraud ring. Against a fraud product that scores on browser data alone, this stack hits roughly 80% approval rate. I have seen the merchant dashboards. So have you, if you are honest with the post-mortem.

Antidetect tools are not exotic. They are sold openly to e-commerce account managers running multi-shop arbitrage, to ad networks running platform-rotation campaigns, and to fraud rings. The fraud-prevention industry tends to pretend they do not exist because admitting they exist invalidates half the product positioning. That is a separate topic, and one I will not finish here.

## What actually moves the needle: the card

Card-level signals are dramatically stronger than session-level signals, and most teams underuse them. A non-exhaustive list of what your acquirer can ship, alongside or instead of the browser block:

- **BIN intelligence**: issuer name, country, card type (debit/credit/prepaid), product tier. A prepaid card from an issuer known for instant-issuance kiosks is a different risk class than a Citi Visa Signature, and rule engines that do not separate them are leaving money on the table.
- **AVS result**: address verification match code. Y, N, U, R, each carries a specific meaning. Most fraud teams reduce these to "match" and "no-match", which discards half the signal.
- **CVV result**: matched, not matched, not provided.
- **3DS authentication outcome**: Y (authenticated), A (attempted), N (failed), U (unavailable). Liability shift only on Y, which means N and A are scoring inputs, not approvals.
- **Card decline history**: how many times has this PAN been declined across the issuer's network in the last 24 hours. You do not see this unless your acquirer's network shares it. Most do not, by default. Ask anyway.
- **Cross-merchant velocity**: how often has this PAN paid across all merchants on the acquiring network in the last hour. Same caveat. Ethoca and Verifi feeds plug part of this gap downstream, but upstream visibility is the cleaner path.

Without those fields in the payload, no amount of session data covers the gap. You are scoring with one eye closed.

## What to demand from your acquirer

Print this list. Email it. If your acquirer hedges on three or more of these, switch acquirers, because every fraud product you stack on top of their feed inherits the upstream gap.

1. BIN, last4, expiration month
2. AVS result code (specific code, not "match"/"no-match")
3. CVV result code
4. Full 3DS result: status, ECI, CAVV presence
5. Issuer-side decline history for the past 24 hours
6. Network-level cross-merchant velocity, even bucketed (1, 2-5, 5+)
7. Card-country vs IP-country flag, computed acquirer-side
8. Tokenised PAN hash so you can build your own velocity layer downstream

That is what a real fraud feed looks like. Anything thinner is a session-data wrapper.

## Bottom line

Session fingerprinting is an enrichment layer. It is layer six of a real fraud stack, not the foundation. Vendors that position browser-data scoring as standalone "AI fraud detection" are selling theatre, and the theatre stops working the day a sophisticated attacker reads the same 3DS spec you read. Which they have. The spec is public.

If you want the rest of the stack, the ten layers that compound to a 90% catch rate at scale, I wrote that piece separately: [the seven layers of real fraud detection](/playbook/expertise/fraud-detection-7-layers-stack). If you are a high-risk merchant and your chargeback rate is climbing despite a fraud product you bought last quarter, the chargeback story is the one to read first: [chargeback prevention is not fraud prevention](/playbook/expertise/chargeback-prevention-vs-fraud-prevention).

If your acquirer payload looks like the JSON at the top of this article and nothing more, your fraud system is solving the wrong problem. Talk to us about what to instrument first.
