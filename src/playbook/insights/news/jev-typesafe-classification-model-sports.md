---
title: 'Jev by TypeSafe: What a Classification Model Can Do in Sports'
description: 'Jev returns typed decisions with probabilities in 70–500 ms at a fraction of LLM cost. Where it fits in a sports club: fan inbox routing, moderation, churn scoring.'
image: '/assets/images/main/heroSlide/hero-stands-hd.webp'
date: '22-09-2026'
readingTime: '5 min'
category: 'Insights'
subCategory: 'News'
tag: 'Jev, TypeSafe, System One model, AI classification, AI in sports, fan engagement AI, content moderation, sports CRM'
authorName: 'Vitaliy Zarubin'
authorImage: '/assets/images/author/avatar.png'
faq:
  - question: 'What is Jev?'
    answer: 'Jev is a classification model from TypeSafe, announced on September 15, 2026. It takes text plus a set of typed questions (a choice, a score or a yes/no) and returns answers with probabilities in one pass, in 70–500 ms. It does not generate text, and it is in early access behind a waitlist.'
  - question: 'How much does Jev cost compared to an LLM?'
    answer: 'TypeSafe lists $0.042 per million input tokens, with output not metered, which works out to about $0.0004 per case. DataCamp puts that at roughly 1/48 of the input price of GPT-5.6 Terra.'
  - question: 'Is Jev more accurate than an LLM?'
    answer: 'Not by default. In an independent phishing benchmark a single yes/no question gave 62.6% against 81.3% for Claude Haiku 4.5. Split into five narrow questions and combined with a small regression, Jev reached 95.0% against 93.2%. The gain comes from how you break the task down.'
  - question: 'Where can a sports club use Jev?'
    answer: 'On repeated decisions with a known set of answers: routing messages in the fan inbox, moderating comments in a club app during a game, scoring season-ticket holders for renewal risk, and checking registration forms for missing documents.'
  - question: 'What should I watch out for?'
    answer: 'Jev returns a probability without an explanation, and an independent study found it confidently wrong on questions that need knowledge outside the input. Keep a human review for low-confidence answers and log every input and output so decisions can be audited.'
---

TypeSafe announced Jev on September 15, and a week later it is all over developer feeds. People keep asking me what the fuss is about. Jev only classifies. You send it text and a list of typed questions, and it sends back answers with probabilities. It cannot write an email, a summary or a line of code.

## What Jev does

A developer describes each question as a type: a choice from a fixed list, a score on a scale, or a yes/no. Jev answers all of them in one pass in 70 to 500 milliseconds. The answer can only be one of the values in the schema, so there is no malformed JSON and no invented category. [TypeSafe lists](https://www.datacamp.com/blog/system-one-models-jev) $0.042 per million input tokens and does not charge for output, about $0.0004 per case.

Until recently this job sat in if/else rules. Then teams moved it to LLMs and paid for it twice: in tokens spent on reasoning the task did not need, and in output formats that drifted. You write "answer only with one of these five labels", and on the thousandth call the model adds a sentence of explanation and the parser breaks. Jev removes that failure because it has no free text to drift into.

The hype has a second reason. For three years progress meant bigger models with better benchmarks. Jev shows that a narrow model aimed at one kind of work can beat them on cost and speed. The idea itself is not new: Gemini Flash with reasoning turned off gets you close, and fine-tuning a small model for classification is the same approach. TypeSafe packaged it as a typed API, and that is why developers noticed.

## Where it fits in a sports club

A club makes the same small decisions thousands of times a season, and the possible answers are known in advance, which is the kind of work Jev is built for.

**The fan inbox.** Emails and chat messages to a club fall into a handful of buckets: ticket refunds, season-pass changes, parking, merch orders, complaints. Jev can pick the bucket and a priority for each message, and the message goes straight to the right person. On game days, when volume peaks, each message is sorted in about 100 milliseconds for a fraction of a cent, so the people at the desk spend their time answering instead of sorting.

**Moderation in the club app.** Comments and chat during a live game need a decision before the post appears. Toxicity, spam and self-harm checks come first in [early write-ups about Jev](https://www.cloudraft.io/blog/top-use-cases-of-jev-typesafe-ai-model), with typical moderation around 100 milliseconds.

**Renewal risk for season-ticket holders.** If the fan profile in the CRM is turned into a short text (games attended, purchases, last contact, complaints), Jev can return a churn score for every holder every night. The marketing team gets a ranked list before renewal time. A sports CRM such as [Revanta](/revanta/sports-crm) already holds the attendance and purchase history this needs.

**Registration and documents for youth clubs.** For clubs and academies, Jev can check each registration form for a missing waiver, a wrong age group or an incomplete medical note, and send only the flagged forms to a person.

**Guardrails for AI assistants.** If a club runs a ticketing chatbot, Jev can check each planned action before it runs: "is this a refund above the limit?", "does this request come from the account owner?". That keeps the expensive model for the conversation and the cheap one for the checks.

## Where it falls short

The first independent tests show where Jev struggles. On a [phishing benchmark](https://www.beri.net/article/typesafe-jev-typed-decision-model-calibration-decomposition-shadow-eval) of 2,000 emails, one question "is this phishing?" gave Jev 62.6% against 81.3% for Claude Haiku 4.5. When the same task was split into five narrow questions about links and senders and combined with a logistic regression, Jev reached 95.0% against Haiku's 93.2%. The accuracy comes from the question design, so plan to spend time on it.

The same review found Jev overconfident on questions that need knowledge outside the input: it was right 44.7% of the time while giving its answers an average probability of 0.74. For a club that means Jev should only judge what is in the text you send, such as a message, a form or a profile, and anything below a confidence threshold goes to a person.

Jev also gives no reason for a decision. For moderation that is fine. For anything a member might dispute, like a refused refund or a flagged registration, you need to log the input, the question and the probability, so you can explain the decision later. It is the same audit trail discipline we apply to [AI in regulated industries](/playbook/expertise/ai-audit-trail-architecture-compliance).

## What comes next

I expect Anthropic, OpenAI and Google to ship their own typed classification modes within months, because the demand is obvious and their small models can already do most of it. For a club the model choice matters less than the list of decisions it makes by hand every week. Write that list down, pick the ones with a fixed set of answers, and start with the one that has the most volume.
