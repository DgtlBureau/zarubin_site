---
title: 'AI Regulatory Workspace for Biotech'
name: 'Regfo'
description: 'Regulatory intelligence platform that reads FDA, ICH, and CFTC guidelines, scores preclinical study packages against compliance requirements, and tells you exactly where the gaps are.'
industries: ['Compliant AI', 'RAG Systems', 'FDA Compliance', 'Pharma AI']
type: 'Biotech / Pharma'
tag: 'Regfo'
instruments: ['claude', 'react', 'next', 'python']
logo: '/assets/images/case/svg/default-case-logo.svg'
bannerImage: '/assets/images/case/banner/regfo-case.png'
images:
  [
    '/assets/images/case/regfo-chat.png',
    '/assets/images/case/regfo-compliance-report.png',
    '/assets/images/case/regfo-onboarding.png',
  ]
date: '01-04-2026'
metriks: '1,000+ compliance rules · FDA, ICH & CFTC · Minutes instead of weeks'
link: 'https://regfo.com'
---

## About

Regfo is our own product. We built it because we got tired of watching biotech teams spend weeks manually cross-referencing FDA guidance documents with their study data — and still missing things.

The platform ingests preclinical study reports, parses them against FDA, ICH, and CFTC requirements, and produces a compliance score from 0 to 100. Not a vague "you're mostly fine" — a structured breakdown by study category: toxicology, pharmacodynamics, immunotoxicity, carcinogenicity. Each gap gets flagged with the specific regulatory reference it violates.

24 ICH guidelines parsed. 1,054 compliance rules encoded. 46+ data points extracted per study. That's what the system works with on every analysis run.

## Problem

Regulatory affairs teams at biotech companies preparing IND (Investigational New Drug) submissions face the same grind. You have a stack of preclinical studies — toxicology, pharmacokinetics, pharmacodynamics — and you need to verify each one meets FDA expectations for your drug type and development phase.

The typical process: a senior regulatory specialist opens the FDA guidance PDF, opens the study report, and starts reading both side by side. For weeks. They build spreadsheets. They miss things — not because they're bad at their job, but because no human can hold 1,054 requirements in working memory while reading a 200-page tox report.

When gaps surface late — during a pre-IND meeting or, worse, after submission — the cost is months of delay and sometimes millions in additional studies.

## Scope of Work

**AI Chat Assistant** is built on Claude API with RAG over the full FDA/ICH document library. Regulatory specialists ask questions in plain language:

- "What studies do I need for Phase 1?"
- "What are the FDA requirements for reproductive toxicology?"
- "How does this differ for biologics vs small molecules?"

The assistant pulls answers from the actual guidance documents, cites specific sections, and knows the difference between a Phase 1 small molecule program and a Phase 3 biologic. It won't guess when it doesn't have a source.

**Compliance Report** is where the real value sits. Upload your study package, and the system:

- scores overall compliance (0-100) against applicable FDA/ICH requirements,
- breaks down study coverage by category — toxicology, immunotoxicity, pharmacodynamics, pharmacokinetics,
- identifies specific gaps with regulatory references,
- recommends concrete next steps for each gap found.

One report replaces what used to take a regulatory team 2-3 weeks of manual review. And it catches gaps that manual review tends to miss — the ones buried in cross-references between ICH S6(R1) and regional FDA guidance.

**Onboarding Wizard** configures the analysis for your specific program. You select:

- drug type (small molecule, biologic, cell therapy, gene therapy, vaccine, peptide),
- therapeutic indication,
- development phase.

The system then loads the right regulatory framework for your exact situation. A small molecule oncology program in Phase 2 has different requirements than a gene therapy rare disease program in Phase 1 — Regfo knows the difference and adjusts what it checks.

The platform runs on Next.js with a Python/FastAPI backend. Claude API handles the document analysis and question answering. Vector search (embeddings over the regulatory corpus) enables fast, contextual retrieval. The entire system is designed for sensitive pharmaceutical data — no training on user documents, audit logs on every query.
