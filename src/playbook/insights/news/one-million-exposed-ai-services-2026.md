---
title: 'A Million Exposed AI Services, and a Third of Ollama Has No Password'
description: 'Intruder scanned a million AI services in May 2026. 31% of Ollama servers answered with no auth, plus open agent workflows in finance and government.'
image: '/assets/images/info/exposed-ai-services-server-room.webp'
imageSource: 'Photo: Unsplash. Reporting: Intruder research, via The Hacker News (May 2026)'
date: '28-05-2026'
readingTime: '5 min'
category: 'Insights'
subCategory: 'News'
tag: 'AI security, exposed services, Ollama, infrastructure security, AI agents, infosec 2026, compliance'
authorName: 'Vitaliy Zarubin'
authorImage: '/assets/images/author/avatar.png'
faq:
  - question: 'How many exposed AI services were found?'
    answer: 'Intruder pulled more than two million hosts from certificate transparency logs and scanned around a million AI-related services. They queried over 5,200 public Ollama API servers with a test prompt, and 31% answered with no authentication at all.'
  - question: 'What was the most dangerous thing they found?'
    answer: 'Open agent and workflow platforms (n8n, Flowise) across 90-plus instances in government, marketing, and finance. Those platforms hold credentials and touch internal systems, and they do what they are told. Add hardcoded API keys sitting in plaintext and 518 open proxies wrapping frontier models from Anthropic, Deepseek, Moonshot, Google, and OpenAI.'
  - question: 'Is running Ollama on the internet always unsafe?'
    answer: 'No, not if you put authentication in front of it and restrict access. The problem is that the default ships with no auth because it assumes you are on localhost. People open a port to test and forget, and the default becomes the production state.'
  - question: 'I am in a regulated industry. Why does this matter for compliance?'
    answer: 'An exposed model proxy holding production credentials is an audit finding under SOC 2 or DORA, not just a security gap. "We did not know it was public" has never once worked as a control.'
---


Intruder's research team pulled two million hosts out of certificate transparency logs, scanned about a million of the AI-related services, and found the picture you would expect if nobody was looking. Which, mostly, nobody was.

The headline number: they queried more than 5,200 public Ollama API servers with a test prompt, and 31% answered. No authentication. No key. Just a model sitting on the open internet, happy to run inference for anyone who finds the port. The report went up May 5 on The Hacker News, and it reads less like a breach disclosure and more like a weather report. Grim, ambient, entirely predictable.

I have seen this movie. So has anyone who was around for the great MongoDB-without-a-password era, or the open Elasticsearch clusters, or the S3 buckets set to public because the tutorial said so. Same plot. New cast.

## What is actually sitting out there

Not just chatbots, though there are plenty. The scary part is the connected stuff.

Intruder found 518 instances wrapping frontier models from Anthropic, Deepseek, Moonshot, Google, and OpenAI — which means somebody is paying for those API calls, and the proxy in front of them is wide open. Free inference for strangers, on your invoice. They found agent and workflow platforms, n8n and Flowise, with open workflows and chatbot access across more than 90 instances in government, marketing, and finance. They found hardcoded API keys sitting in plaintext, exposed credential lists inside the management platforms, applications running as root, insecure Docker setups, and sandboxes weak enough to allow code interpretation.

Read that list again. None of it is novel. It is every infrastructure mistake from the last fifteen years, redeployed with a shinier logo.

The finance and government instances are the ones that should make you nervous. An open n8n workflow is not a toy. It has credentials, it touches internal systems, and it will happily do what an attacker tells it, because doing what it is told is the entire point of the product.

## Why this keeps happening

Speed, mostly. A team gets told to "add AI" by a deadline, finds a one-line Docker command that spins up Ollama or Flowise, runs it, sees the demo work, and ships. The default configuration has no auth because the default assumes you are on localhost. Then someone opens a port so a colleague can test, forgets about it, and now it has been on the public internet for four months with a frontier model attached.

Nobody decided to expose it. That is the thing about this whole category. There is no villain, just a missing checklist and a deadline that won.

## What to do this week

Find your own exposure before someone else's scanner does it for you. This is a half-day, maybe less.

List every AI service your team has stood up. Ollama, vLLM, n8n, Flowise, LangServe, any vector database, any model proxy. Shadow deployments count double, because those are the ones nobody is patching. Then, for each one, answer three questions. Is it reachable from the public internet? Does it require authentication? Does it hold credentials or touch internal systems? Any service that comes back yes, no, yes is a P0 and you fix it today.

Put authentication in front of everything, even the internal toys. Localhost-only is a fine default right up until the day it is not, and you will not get a warning on that day.

Rotate any key that has been sitting in a config file on an exposed host. Assume it is already in someone's collection. The hardcoded-credentials finding in this report is not theoretical, it is the most common way these deployments get monetized by strangers.

And run an external scan against your own perimeter, the same way an attacker would. Vendors sell that, sure, but you can do a rough version with your own tooling. The point is to see your AI surface from the outside, because the outside is where the problem lives.

If you operate in a regulated space, fintech or health or anything touching DORA or SOC 2, an exposed model proxy holding production credentials is not just a security gap. It is a finding waiting to land in your next audit, and the explanation that you did not know it was public will not save you.

## The closer

The exposed-database era took about five years to clean up, and we cleaned it up by shipping secure defaults and making "scan your own perimeter" a normal thing teams do. AI infrastructure is at year one of that same curve. The teams that run the audit this quarter will look slightly paranoid and sleep fine. The 31% who left the door open are, statistically, about to find out who else found it.

## Sources

- [The Hacker News: We Scanned 1 Million Exposed AI Services (May 5, 2026)](https://thehackernews.com/2026/05/we-scanned-1-million-exposed-ai.html)
- [Darktrace: State of AI Cybersecurity 2026](https://www.darktrace.com/blog/state-of-ai-cybersecurity-2026-92-of-security-professionals-concerned-about-the-impact-of-ai-agents)
