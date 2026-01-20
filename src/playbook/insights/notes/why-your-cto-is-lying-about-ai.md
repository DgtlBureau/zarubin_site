---
title: 'Why Your CTO Is Lying About AI (And How to Check)'
description: 'Learn how to audit AI projects in 15 minutes. Spot red flags, know real costs, and stop overpaying for AI wrappers disguised as innovation.'
image: '/assets/images/info/ben-hagemann-lw0R_ginBlw-unsplash.webp'
date: '20-01-2026'
readingTime: '12 min'
category: 'Insights'
subCategory: 'Notes'
tag: 'AI implementation cost, AI audit, AI consulting, CTO, AI project red flags, enterprise AI'
authorName: 'Vitaliy Zarubin'
authorImage: '/assets/images/author/avatar.png'
faq:
  - question: 'What percentage of AI projects fail?'
    answer: 'According to RAND Corporation, over 80% of AI projects fail—twice the rate of non-AI technology projects. Gartner predicts 30% of generative AI projects will be abandoned after proof of concept by end of 2025.'
  - question: 'How much should an AI chatbot or wrapper cost?'
    answer: 'A simple API wrapper or chatbot should cost $15,000-30,000 one-time, plus $500-2,000/month in API costs. If quoted $80,000+ for basic functionality, you are likely overpaying.'
  - question: 'How do I audit an AI project proposal?'
    answer: 'Ask 10 key questions: request a working prototype, ask for accuracy targets vs baseline, understand data ownership, review model architecture, check fallback procedures, get detailed cost breakdowns, verify timeline milestones, request reference customers, review termination terms, and speak directly with technical leads.'
  - question: 'What are red flags in AI project proposals?'
    answer: 'Key red flags include: no working prototype after 4+ weeks, vague accuracy targets, defensive responses about proprietary technology, no data governance plan, inability to break down costs, vague timelines, no reference customers in your industry, and resistance to letting you speak with technical leads.'
  - question: 'What is an AI wrapper project?'
    answer: 'A wrapper is when a vendor builds a thin interface around OpenAI or Claude API, adds a custom logo, and calls it proprietary AI technology. They charge $80,000-150,000 for something that costs $15,000-30,000 to build.'
---

Your CTO just walked out of the boardroom. The 47-slide deck is still glowing on the projector. There's talk of "proprietary AI," "machine learning pipelines," and a budget request that could fund a small country. Everyone's nodding. The CEO looks impressed. You're already mentally signing the check.

Stop.

He's probably bullshitting you.

I've spent the last three years auditing AI projects for enterprise clients. Of the 23 projects I've examined in detail, 19 were unnecessary, overpriced, or fundamentally wrong for the problem they claimed to solve. That's an 83% failure rate before a single line of code even shipped. Gartner backs this up: they predict 30% of generative AI projects will be abandoned after proof of concept by the end of 2025. RAND Corporation puts the overall AI project failure rate at over 80%—twice that of non-AI technology projects.

The AI gold rush has created an epidemic of expensive solutions searching for problems. Here's how to spot the bullshit before it drains your budget.

## The AI Bullshit Taxonomy

After years of audits, I've identified four distinct species of AI project failures. Learn to recognize them.

### Type 1: The Wrapper

This is the most common scam in enterprise AI. Your vendor builds a thin interface around OpenAI's API or Anthropic's Claude, slaps a custom logo on it, and calls it "proprietary AI technology." They charge you $150,000 for something that costs them $500/month in API fees.

The tell? Ask to see the model architecture. If they can't produce training documentation, if they get defensive about "trade secrets," or if the response times mysteriously match ChatGPT's latency—you've got a wrapper.

**Real cost:** The underlying API costs $1-15 per million tokens. A competent developer can build a wrapper interface in 2-3 weeks.

### Type 2: The Overkill

Your CTO wants machine learning to solve a problem that a well-designed Excel formula could handle. I've seen companies spend $200,000 on "AI-powered" invoice categorization when a simple rules-based system would achieve 95% of the results at 5% of the cost. Another client wanted "predictive analytics" for inventory management—turns out their actual need was a spreadsheet with conditional formatting.

The test is simple: Can you describe the decision logic in plain English? If a human can explain the rules ("if invoice contains 'marketing' and amount is over $1,000, route to Marketing Department"), you don't need AI. You need a competent business analyst and maybe a week of development time.

**The overkill premium:** Companies pay 10-20x more for "AI-powered" solutions that could be replaced by deterministic code.

### Type 3: The Vaporware

The roadmap is ambitious. The demo is stunning. The delivery date keeps slipping. This is vaporware dressed in machine learning buzzwords.

Watch for these patterns: live demos always use the same pre-selected examples, there's no path to production, and every question about timeline gets answered with "we're working through some technical challenges."

MIT's 2025 State of AI in Business study found that 95% of enterprise AI pilots fail to deliver measurable ROI. Many of those failures were vaporware that never should have been funded.

### Type 4: The Blind Spot

The project sounds legitimate. The technology might even work. But nobody's thought about where the data comes from, how it's secured, or what happens when the model makes a mistake.

Questions about training data get vague answers. There's no data governance plan. GDPR, CCPA, and industry compliance requirements are "phase two concerns." This isn't just bad project management—it's a liability time bomb.

According to Gartner, 63% of organizations either don't have or aren't sure if they have the right data management practices for AI. That statistic should terrify anyone signing off on an AI budget.

### The Cost Reality Check

| What They Quote | What It Actually Costs | What You're Paying For |
|----------------|----------------------|----------------------|
| $80,000-150,000 | $15,000-30,000 | Simple API wrapper |
| $250,000-500,000 | $60,000-120,000 | Custom ML model |
| $100,000-200,000 | $25,000-50,000 | RAG system |
| $50,000/month | $5,000-15,000/month | Ongoing AI operations |

The markup isn't accidental. It's the AI premium—and it's based on your confusion, not their costs.

## The 15-Minute AI Audit

Print this. Bring it to your next AI project meeting. Ask these questions and compare the answers to the benchmarks below.

### Question 1: What specific business metric will this improve, and by how much?

**Good Answer:** "We expect to reduce customer service response time from 4 hours to 15 minutes, saving approximately $340,000 annually in staffing costs."

**Red Flag:** "It will improve efficiency and customer experience." (No numbers, no specifics.)

### Question 2: Why does this require AI instead of rule-based automation?

**Good Answer:** "The inputs are unstructured text in 14 languages with significant variation. Rules can't capture the semantic nuance required."

**Red Flag:** "AI is more modern/powerful/intelligent." (Buzzwords without technical justification.)

### Question 3: What's your training data, and who owns it?

**Good Answer:** "We have 2.3 million labeled customer interactions from the past 3 years. We own it outright under our ToS."

**Red Flag:** "We'll use synthetic data" or "The vendor handles that." (No data = no legitimate AI project.)

### Question 4: Can I see the model architecture documentation?

**Good Answer:** Produces a technical document showing model type, training approach, and performance benchmarks.

**Red Flag:** "That's proprietary" or redirects to marketing materials. (They're hiding that it's a wrapper.)

### Question 5: What's the fallback when the AI is wrong?

**Good Answer:** "Human review queue for confidence scores below 0.85. Escalation path documented. Error rate target is under 3%."

**Red Flag:** "The AI is highly accurate" with no error handling discussion. (They haven't thought past the demo.)

### Question 6: What are the ongoing API or compute costs?

**Good Answer:** "Based on projected volume, approximately $2,400/month for inference, scaling linearly with usage."

**Red Flag:** "Included in the platform fee" or can't break down the components. (They're hiding margin or don't understand their own costs.)

### Question 7: How long until production, and what are the milestones?

**Good Answer:** "12 weeks. Milestone 1: data pipeline (week 4). Milestone 2: model validation (week 8). Milestone 3: integration testing (week 11)."

**Red Flag:** Vague timeline with "agile" as the methodology explanation. (No concrete plan = no accountability.)

### Question 8: Who are your reference customers using this exact solution?

**Good Answer:** Provides 2-3 named companies in your industry with contact information for reference calls.

**Red Flag:** NDAs prevent disclosure, or references are from unrelated industries. (They don't have relevant success stories.)

### Question 9: What happens if we terminate the contract?

**Good Answer:** "Full data export within 30 days. Model weights transfer if using custom training. 90-day transition support included."

**Red Flag:** Vague data portability terms or complete vendor lock-in. (They're planning on trapping you.)

### Question 10: Can I speak directly with the technical lead building this?

**Good Answer:** "Absolutely. Here's their calendar link."

**Red Flag:** "Our account manager handles all communications." (They don't want you asking hard questions.)

**Scoring:** Count the red flags. 0-2 is normal friction. 3-5 requires deeper due diligence. 6+ means walk away or demand a complete project restructure.

## What AI Should Actually Cost in 2025

Let's cut through the pricing fog with actual market rates. These figures are based on current developer rates, infrastructure costs, and reasonable margins.

### Simple API Wrapper (Chatbot, Content Generator, Basic Automation)

**You should pay:** $15,000-30,000 one-time, plus $500-2,000/month in API costs

**What you're getting:** A custom interface on top of OpenAI, Claude, or similar LLM. Custom prompt engineering. Basic integration with your systems. UI/UX appropriate to your use case.

**If they're quoting $80,000+:** They're either gold-plating the solution or taking you for a ride.

### Custom ML Model (Prediction, Classification, Anomaly Detection)

**You should pay:** $60,000-120,000 for development, plus infrastructure

**What you're getting:** Actual model development trained on your data. Data pipeline engineering. Model validation and testing. Deployment infrastructure. Basic monitoring.

**If they're quoting $250,000+:** Unless you need cutting-edge research or highly specialized domain expertise, you're overpaying.

### RAG System (Document Q&A, Knowledge Base, Enterprise Search)

**You should pay:** $25,000-50,000 for implementation, plus $1,000-5,000/month for operations

**What you're getting:** Document processing pipeline. Vector database setup. Retrieval optimization. LLM integration. User interface.

**If they're quoting $100,000+:** They're either overcomplicating the architecture or padding the scope.

### The Real Cost Formula

Here's how to sanity-check any AI project quote:

**Real Cost = (Developer Rate x Estimated Hours) + (API/Compute Costs x 3) + 20% Buffer**

Current senior AI developer rates range from $120-200/hour in North America, $50-80/hour in Eastern Europe, and $30-60/hour in qualified Asian markets. A 3x multiplier on API costs accounts for development, testing, and traffic spikes. The 20% buffer handles scope creep and integration surprises.

For example: A RAG system requiring 200 development hours at $150/hour, with $800/month projected API costs:

(200 x $150) + ($800 x 3 x 12 months for year one) + 20% = $30,000 + $28,800 + $11,760 = **$70,560 total first-year cost**

If someone quotes you $180,000 for this same project, they're adding $110,000 in pure margin.

## When Your CTO Is Actually Right

I've been harsh on AI project inflation, but legitimate cases exist. Here's when the expensive custom approach makes sense.

### You Have Unique Proprietary Data at Scale

If you're sitting on 10+ million labeled examples that no one else has access to, custom model development might create genuine competitive advantage. A financial services firm with decades of proprietary trading data. A healthcare system with millions of anonymized patient outcomes. This data can train models that APIs can't replicate.

The key word is "labeled." Raw data isn't enough. If you need to spend $500,000 labeling data before training begins, the ROI calculation changes dramatically.

### AI Is Your Core Product

If you're selling an AI-powered product to customers—not using AI as internal tooling—the economics shift. Your model quality directly impacts revenue. Differentiation from commodity APIs matters. In this case, custom development and higher investment often make sense.

The distinction is critical: using AI to improve internal operations is a cost center. Selling AI capabilities to customers is a revenue driver. Budget accordingly.

### Regulatory or Privacy Requirements Demand On-Premise

Some industries can't send data to third-party APIs. Healthcare with PHI. Financial services with transaction data. Government contracts with security clearances. If compliance requires on-premise inference, you'll pay premium prices for that capability.

### Scale Justifies Custom Infrastructure

Processing 100+ million requests daily changes the math. At that volume, API costs become astronomical, and custom model deployment on your own infrastructure can actually cost less. But most companies never hit this threshold. Be honest about your actual volume, not your aspirational projections.

### The Honest Conversation

A good CTO facing a legitimate complex AI challenge will say: "This is genuinely hard. Here's why off-the-shelf won't work. Here's our data advantage. Here's the realistic timeline and budget, including what we don't know yet."

A bullshitting CTO will make it sound easier than it is, promise faster timelines than realistic, and get defensive when questioned on details.

## What to Do Tomorrow

You've read this far. Here's your action plan for the next 48 hours.

**Schedule the audit.** Block 30 minutes with your CTO or AI vendor this week. Use the 15-minute checklist above. Count the red flags. Don't announce you're auditing—just say you want to "better understand the technical approach." This single meeting will tell you whether your current or proposed AI project is legitimate.

**Request documentation.** Ask for the model architecture document, the data governance plan, the cost breakdown, and the project milestone schedule. Legitimate projects have these. Bullshit projects don't.

**Get a second opinion.** Find an independent technical advisor—not the vendor's "partner"—to review the proposal. Budget $5,000-15,000 for a proper technical audit. It's cheap insurance against a $200,000 mistake.

**Restructure the payment terms.** Never pay more than 30% upfront. Tie remaining payments to demonstrated milestones. Include performance benchmarks with teeth. Make the final payment contingent on production deployment.

**Build the kill switch.** Every AI project contract should include clear termination terms, data portability guarantees, and transition support. If your vendor resists these clauses, they're planning to hold you hostage.

**Set a review date.** Put a 90-day checkpoint on your calendar. At that point, measure actual results against projected outcomes. If the project hasn't delivered measurable value by then, invoke your termination clause. Sunk cost fallacy kills more AI projects than technical failure.

## The Bottom Line

Your CTO might be lying about AI. Or they might be misinformed, seduced by vendor hype, or simply out of their depth in a fast-moving field. The distinction matters less than the outcome: you're about to spend serious money on something you don't understand.

That ends today.

The questions are simple. The cost benchmarks are public. The red flags are identifiable. You don't need a PhD in machine learning to separate legitimate AI projects from expensive theater.

What you need is the willingness to ask uncomfortable questions and the backbone to walk away when the answers don't add up.

The AI vendors won't like this article. Your CTO might not either. But your budget will thank you—and so will the projects that actually deserve the investment.

Start the audit. Ask the questions. Demand the proof.

The bullshit stops when you decide it does.
