# SEO Tags & AI Keywords Implementation Plan

## Overview

This plan restructures the tag system to focus on enterprise AI/consulting capabilities while reducing tag noise. The goal is to appear for searches like "AI development company", "RAG implementation", "compliance automation", etc.

---

## Part 1: New Tag Taxonomy

### Current Tags (16 tags - too fragmented)
```
Automotive, Mobile development, AI & Data Science, FinTech, Web development,
IT Consulting, HVAC, API Development, OpsTech, CRM, Retail, Service,
Hospitality, SmartTV, Sports, API Integrations
```

### New Tags (8 focused tags)

| Tag | SEO Keywords Embedded | Description |
|-----|----------------------|-------------|
| **AI Development** | AI development, LLM integration, RAG systems, fine-tuning, AI agents | Custom AI solutions, LLM/RAG implementations |
| **CRM & Loyalty** | CRM implementation, loyalty programs, customer engagement | CRM systems, fan engagement, loyalty platforms |
| **API & Integrations** | API architecture, system integrations, microservices | Backend systems, API development, integrations |
| **Workflow Automation** | AI workflow, process automation, AI agents, orchestration | Business process automation with AI |
| **Compliance & Security** | AI compliance, regulatory AI, AI security, cybersecurity | Compliance automation, security implementations |
| **ERP & Operations** | ERP systems, operations tech, workforce management | Enterprise operations, workforce systems |
| **FinTech** | payment systems, fintech development, PCI DSS | Payment gateways, financial platforms |
| **Mobile & Web** | mobile development, web applications, cross-platform | App development (when AI is not primary focus) |

---

## Part 2: Case-to-Tag Mapping

### Mapping Each Case to New Tags

| Case | Current Industries | New Tags | AI Focus |
|------|-------------------|----------|----------|
| **PersoniWay** | HVAC, API Development, AI & Data Science | `AI Development`, `Workflow Automation` | RAG, AI agents, voice recognition |
| **NIS** | OpsTech, IT Consulting | `Workflow Automation`, `ERP & Operations` | Process optimization with AI |
| **OAZIS** | OpsTech, CRM, Mobile development, AI & Data Science | `ERP & Operations`, `Workflow Automation` | Workforce management |
| **Jedipay** | FinTech, Web development, IT Consulting, AI & Data Science | `FinTech`, `API & Integrations`, `Compliance & Security` | PCI DSS compliance |
| **Grid Capital** | FinTech, Web development, AI & Data Science | `FinTech`, `API & Integrations` | Investment platform |
| **Avangard** | Sports, CRM, Mobile development, AI & Data Science | `CRM & Loyalty`, `AI Development` | Sports analytics AI |
| **FCDM** | Sports, Web development, API Development, AI & Data Science | `CRM & Loyalty`, `API & Integrations` | High-load backend |
| **Norilsk** | Sports, Web development, API Development | `CRM & Loyalty`, `Mobile & Web` | Fan engagement |
| **Torpedo** | Sports, Web development, API Integrations | `CRM & Loyalty`, `API & Integrations` | Sports CRM |
| **T-Bank** | Sports, CRM, Mobile development, AI & Data Science | `CRM & Loyalty`, `Mobile & Web` | Street football platform |
| **Stocks Soccer** | Sports, Web development, API Development | `API & Integrations`, `Mobile & Web` | Fantasy sports |
| **TV-Start** | Sports, SmartTV, Mobile development | `Mobile & Web`, `API & Integrations` | Cross-platform streaming |
| **Lux Today** | Service, Hospitality, Web development, IT Consulting | `Mobile & Web`, `Workflow Automation` | Startup MVP |
| **Nashe Zoloto** | Retail, Mobile development, AI & Data Science | `Mobile & Web`, `AI Development` | AR/retail app |
| **Kama** | Automotive, Mobile development, AI & Data Science | `Mobile & Web`, `AI Development` | Automotive app |

---

## Part 3: AI-Specific Keywords to Add Site-Wide

### Primary AI Keywords (use in titles, H1s, meta descriptions)

```
AI development company
AI consulting services
Custom AI solutions
LLM integration services
RAG system development
AI agent development
```

### Secondary AI Keywords (use in body content, tags)

```
Fine-tuning services
AI workflow automation
AI security consulting
Compliance AI solutions
Regulatory AI automation
AI cybersecurity
Enterprise AI implementation
AI orchestration
Vector database integration
Prompt engineering
```

### Long-tail Keywords (use in articles, case studies)

```
How to implement RAG systems
AI compliance automation for enterprises
Custom LLM fine-tuning vs API
AI agent orchestration best practices
Building AI workflows with Claude
RAG vs fine-tuning when to use
AI security audit checklist
```

---

## Part 4: Implementation Details

### Step 1: Update Case Files

Each case file in `src/cases/*.md` needs `industries` array updated:

**Example - PersoniWay (before):**
```yaml
industries: ['HVAC', 'API Development', 'AI & Data Science']
```

**Example - PersoniWay (after):**
```yaml
industries: ['AI Development', 'Workflow Automation']
```

### Step 2: Update pageMetadata.ts

Add AI keywords to all page metadata:

```typescript
// src/utils/pageMetadata.ts
export const pageMetadata = {
  main: {
    title: 'The BrightByte | AI Development & Custom Software Consulting | Raleigh, NC',
    description: 'The BrightByte builds custom AI solutions, RAG systems, and enterprise software. LLM integration, AI agents, compliance automation.',
    keywords: [
      'AI development company',
      'AI consulting services',
      'LLM integration',
      'RAG system development',
      'Custom AI solutions',
      'AI agent development',
      'Compliance AI',
      'Enterprise software consulting',
      'The BrightByte',
    ],
  },
  // ... other pages
}
```

### Step 3: Create Tag Constants File (Optional but Recommended)

Create centralized tag definitions for consistency:

```typescript
// src/utils/tags.ts
export const CASE_TAGS = {
  AI_DEVELOPMENT: 'AI Development',
  CRM_LOYALTY: 'CRM & Loyalty',
  API_INTEGRATIONS: 'API & Integrations',
  WORKFLOW_AUTOMATION: 'Workflow Automation',
  COMPLIANCE_SECURITY: 'Compliance & Security',
  ERP_OPERATIONS: 'ERP & Operations',
  FINTECH: 'FinTech',
  MOBILE_WEB: 'Mobile & Web',
} as const;

export const AI_KEYWORDS = [
  'RAG systems',
  'LLM integration',
  'AI agents',
  'Fine-tuning',
  'AI workflow',
  'Compliance AI',
  'AI security',
] as const;
```

---

## Part 5: Files to Modify

### Case Files (15 files)
```
src/cases/personiway.md    → industries: ['AI Development', 'Workflow Automation']
src/cases/nis.md           → industries: ['Workflow Automation', 'ERP & Operations']
src/cases/oazis.md         → industries: ['ERP & Operations', 'Workflow Automation']
src/cases/jedipay.md       → industries: ['FinTech', 'API & Integrations', 'Compliance & Security']
src/cases/grid_capital.md  → industries: ['FinTech', 'API & Integrations']
src/cases/avangard.md      → industries: ['CRM & Loyalty', 'AI Development']
src/cases/fcdm.md          → industries: ['CRM & Loyalty', 'API & Integrations']
src/cases/norilsk.md       → industries: ['CRM & Loyalty', 'Mobile & Web']
src/cases/torpedo.md       → industries: ['CRM & Loyalty', 'API & Integrations']
src/cases/t_bank.md        → industries: ['CRM & Loyalty', 'Mobile & Web']
src/cases/stocks_soccer.md → industries: ['API & Integrations', 'Mobile & Web']
src/cases/tv-start.md      → industries: ['Mobile & Web', 'API & Integrations']
src/cases/lux_today.md     → industries: ['Mobile & Web', 'Workflow Automation']
src/cases/nashe_zoloto.md  → industries: ['Mobile & Web', 'AI Development']
src/cases/kama.md          → industries: ['Mobile & Web', 'AI Development']
```

### Metadata & SEO Files
```
src/utils/pageMetadata.ts  → Update all keywords
app/page.tsx               → Add generateMetadata + Organization schema
```

### New Files to Create
```
src/utils/tags.ts          → Centralized tag constants (optional)
src/utils/organizationSchema.ts → Organization JSON-LD
```

---

## Part 6: Tag Display Order on /cases

When tags render on the cases page, they should appear in this priority order:

1. AI Development (most prominent)
2. Workflow Automation
3. Compliance & Security
4. API & Integrations
5. CRM & Loyalty
6. ERP & Operations
7. FinTech
8. Mobile & Web

This ensures AI-first positioning in the visual hierarchy.

---

## Part 7: SEO Impact Projection

### Before (Current Tags)
- Fragmented across 16 niche categories
- "Sports" appears 8 times (53% of cases)
- "AI & Data Science" is generic, low search value
- No compliance/security/workflow differentiation

### After (New Tags)
- 8 focused enterprise categories
- "AI Development" highlighted in 5 cases (33%)
- Specific AI terms (RAG, LLM, compliance) throughout
- Clear consulting positioning

### Expected Keyword Gains
| Keyword | Current Ranking | Expected After |
|---------|----------------|----------------|
| "AI development company" | Not ranking | Page 2-3 |
| "RAG implementation services" | Not ranking | Page 3-5 |
| "Compliance AI solutions" | Not ranking | Page 2-4 |
| "CRM implementation" | Low | Improved |
| "API integration consulting" | Low | Improved |

---

## Part 8: Execution Checklist

- [ ] Update `src/cases/personiway.md` industries
- [ ] Update `src/cases/nis.md` industries
- [ ] Update `src/cases/oazis.md` industries
- [ ] Update `src/cases/jedipay.md` industries
- [ ] Update `src/cases/grid_capital.md` industries
- [ ] Update `src/cases/avangard.md` industries
- [ ] Update `src/cases/fcdm.md` industries
- [ ] Update `src/cases/norilsk.md` industries
- [ ] Update `src/cases/torpedo.md` industries
- [ ] Update `src/cases/t_bank.md` industries
- [ ] Update `src/cases/stocks_soccer.md` industries
- [ ] Update `src/cases/tv-start.md` industries
- [ ] Update `src/cases/lux_today.md` industries
- [ ] Update `src/cases/nashe_zoloto.md` industries
- [ ] Update `src/cases/kama.md` industries
- [ ] Update `src/utils/pageMetadata.ts` with AI keywords
- [ ] Add `generateMetadata()` to `app/page.tsx`
- [ ] Create `src/utils/organizationSchema.ts`
- [ ] Add Organization schema to homepage
- [ ] Create `src/utils/tags.ts` (optional)
- [ ] Test filtering on /cases page
- [ ] Verify build passes

---

## Summary

**Tag reduction:** 16 → 8 tags
**AI keyword additions:** 15+ new AI-specific terms
**Focus shift:** From "sports software" to "AI consultancy with vertical expertise"

Ready to execute on your command.
