# Project: The BrightByte

**Name:** The BrightByte
**Domain:** thebrightbyte.com
**Repository:** github.com/DgtlBureau/zarubin_site
**Stack:** Next.js 14, TypeScript, Tailwind CSS, Formik, Resend, Telegram Bot
**Last Updated:** 2026-01-20

---

## 1. What We Are

The BrightByte is a boutique consultancy that builds **AI systems for regulated industries** - FinTech, HealthTech, LawTech, RegTech. We combine deep AI expertise with practical compliance knowledge.

### Core Services
1. **AI Agents Development** - Custom agentic AI for business automation
2. **LLM Fine-Tuning** - Domain-specific language models
3. **RAG Systems** - Retrieval-augmented generation for enterprise data
4. **Compliance Automation** - SOC 2, GDPR, HIPAA-ready systems

### Lead Magnet
**Regfo Tool** (`/regfo`) - Free SOC 2 & GDPR Compliance Assessment. 25 questions, instant gap analysis, PDF report.

---

## 2. Positioning

### Brand Promise
**"We build AI systems that pass compliance audits."**

### Unique Value
| What Others Do | What We Do |
|----------------|------------|
| Build AI, hope it passes audit | Build AI with audit requirements in spec |
| Big 4 prices ($50-100K/month) | Big 4 quality at boutique rates |
| 6-month engagements | Ship in weeks, iterate monthly |
| Separate compliance consultant | Compliance built into engineering |

### Target Audience

**Primary:** CTOs and IT Directors at regulated companies (50-500 employees)
- Processing sensitive data (PII, financial, health records)
- VC-backed startups preparing for enterprise sales
- Need SOC 2 / GDPR compliance before next funding round

**Secondary:** Technical founders at Seed/Series A
- Building MVP but thinking about compliance early
- Can't afford full-time compliance staff

**Tertiary:** Sports & Entertainment organizations
- Fan engagement platforms, CRM systems, digital transformation

---

## 3. Site Structure

### Main Pages
| URL | Purpose | Priority |
|-----|---------|----------|
| `/` | Homepage - hero, services, cases, testimonials | HIGH |
| `/regfo` | Compliance Assessment Tool - lead magnet | HIGH |
| `/cases` | Portfolio - case studies by industry | HIGH |
| `/playbook` | Content hub - insights & expertise articles | MEDIUM |
| `/brief` | Project brief form - lead capture | HIGH |
| `/career` | Careers page | LOW |
| `/policy` | Privacy policy | LOW |

### Content Sources
- **Articles:** `src/playbook/insights/` and `src/playbook/expertise/` (Markdown)
- **Cases:** `src/cases/` (Markdown)
- **Hero Slides:** `src/main/banner_slides/` (Markdown)

---

## 4. User Flows

### Flow A: Organic Lead (Primary)
```
Search "SOC 2 AI" → Land on Regfo → Complete Assessment → View Results
                                                              ↓
                           Email Capture ← Download PDF → Schedule Call → Brief → Contract
```

### Flow B: Content Discovery
```
Search/Referral → Playbook Article → Related Cases → Contact Form → Consultation
```

### Flow C: Direct Inquiry
```
Referral → Homepage → Browse Cases → Brief Form → Proposal → Contract
```

---

## 5. Key Features

### Regfo Assessment Tool
- **Quick Assessment:** 5 questions → preview score
- **Full Assessment:** 20 more questions → detailed gap analysis
- **Results:** Compliance score gauge, category breakdown, days-to-audit estimate
- **PDF Report:** Client-side generation (jspdf + html2canvas)
- **Storage:** localStorage only (no backend)

### Contact Forms
- **Contact Form:** Name, email, phone, message → Email (Resend) + Telegram
- **Brief Form:** Multi-step wizard → detailed project information

### Content System
- Markdown files with frontmatter (title, description, date, category, tags)
- Images in `.webp` format, 16:9 ratio
- Auto-generated sitemap via next-sitemap

---

## 6. Business Rules

### BR-001: Form Validation
- Email: required, valid format
- Name: required, min 2 characters
- Message: required, min 10 characters
- Phone: optional, international format if provided

### BR-002: Regfo Scoring
- Each answer: 0, 33, 66, or 100 points
- Risk levels: low (66-100), medium (33-65), high (1-32), critical (0)
- Overall score: weighted average across categories
- Days-to-audit: `(100 - score) * multiplier`

### BR-003: Content Format
- Date format: `DD-MM-YYYY`
- Required fields for articles: title, description, image, date, category
- Required fields for cases: title, industries[], instruments[], bannerImage

---

## 7. Brand Voice

### Attributes
- **Direct:** No fluff. "Your AI will fail SOC 2 audit" not "potential compliance considerations"
- **Competent:** Specific, not generic. Numbers, not adjectives.
- **Practical:** Results over theory. "Cut response time by 50%"
- **Human:** Real language. "We've seen this. Here's what works."
- **Confident:** "We'll get you audit-ready in 90 days"

### Avoid
- AI cliches: "revolutionary", "cutting-edge", "game-changing", "seamless"
- Hedge words: "potentially", "may help", "could"
- Corporate jargon: "leverage", "synergy", "resources"

---

## 8. Known Issues (From Audit)

### P0 - Critical
1. **Telegram token exposed** in client code (security risk)
2. **No form validation** - invalid data submits, no error feedback
3. **Brief page missing SEO metadata**
4. **Regfo not in sitemap**

### P1 - High
1. Case studies have no CTA at end
2. Regfo results page has no next step
3. No email capture for PDF download
4. Silent error handling in forms

### P2 - Medium
1. Homepage hero rotates 4 messages (confusing)
2. Duplicate components (NewHero/Hero, NewFeedback/Feedback)
3. No analytics events for funnel tracking

---

## 9. Acceptance Criteria (Key Features)

### Contact Form
- [ ] Valid submission shows success notification
- [ ] Invalid submission shows field-level errors
- [ ] Network failure preserves data and allows retry
- [ ] Button disabled during submission

### Regfo Assessment
- [ ] 5 questions → preview results with score
- [ ] Continue to full → questions 6-25
- [ ] Complete → full results page with gap analysis
- [ ] Download PDF → formatted compliance report
- [ ] Results page shows CTA for consultation

### Case Studies
- [ ] Filter by industry/technology tags
- [ ] Detail page shows all metadata
- [ ] End of page has CTA to Brief

---

## 10. Agent Instructions

### For IT Agent
- Follow SOLID principles
- Reuse existing components (check `src/components/`)
- Use Tailwind + shadcn for styling
- Write tests for new functionality
- Move secrets to server-side (never expose in client)
- Read BA requirements before implementing

### For QA Agent
- Verify against acceptance criteria above
- Check both happy path and edge cases
- Test on mobile and desktop
- Document bugs with reproduction steps
- Maintain test cases in `.agents/test-cases.md`

### For CMO Agent
- Write in brand voice (direct, specific, human)
- Focus on benefits, not features
- No AI cliches or hedge words
- Every piece should drive action
- Think: "What will the user feel when they see this?"

### For BA Agent
- Define acceptance criteria BEFORE implementation
- Include edge cases
- Document business rules
- Provide enough detail for IT to build and QA to test

### For PM Agent
- Coordinate agents: CMO → BA → IT → QA
- Verify output against acceptance criteria
- Each agent runs ONCE per task
- Report results clearly to user

---

## 11. File Outputs

Each agent writes to `.agents/` folder:
- `ba-output.md` - Requirements and acceptance criteria
- `it-output.md` - Implementation report
- `qa-output.md` - Test results and bugs
- `cmo-output.md` - Marketing analysis and copy
- `pm-output.md` - Coordination summary
- `handoff.md` - Context for next agent
- `test-cases.md` - QA test cases

---

## 12. Quick Reference

### Commands
```bash
npm run dev          # Start dev server (localhost:3000)
npm run build        # Production build
npm run lint         # Run ESLint
npm run knip         # Find unused code
```

### Key Files
- `src/utils/pageMetadata.ts` - SEO metadata config
- `src/utils/organizationSchema.ts` - JSON-LD schema
- `next-sitemap.config.mjs` - Sitemap configuration
- `app/api/send/route.ts` - Contact form API
- `app/regfo/` - Assessment tool pages

### Environment Variables
```
RESEND_API_KEY=...       # Email service
TELEGRAM_BOT_TOKEN=...   # Telegram notifications (MOVE TO SERVER!)
TELEGRAM_CHAT_ID=...     # Telegram chat ID
```

---

*This document is the source of truth for all agents working on this project.*
