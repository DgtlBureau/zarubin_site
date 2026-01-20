# QA Testing Guide - BrightByte Website

**Last Updated:** 2026-01-20
**Project:** BrightByte (zarubin_site)

---

## Quick Start

Run automated tests:
```bash
npm run dev -- -p 3001
node scripts/qa-regfo.mjs
```

---

## 1. RegFO Assessment Tool Testing

### 1.1 Page Load Tests

| Test | URL | Expected Result |
|------|-----|-----------------|
| Landing page loads | `/regfo` | 200 OK, hero visible |
| Assessment page loads | `/regfo/assessment` | 200 OK, first question visible |
| Results page (no data) | `/regfo/results` | 200 OK, "No Assessment Results" message |

### 1.2 Quick Assessment Flow (5 Questions)

**Steps:**
1. Navigate to `/regfo`
2. Click "Start Free Assessment"
3. Answer all 5 quick questions
4. Verify preview screen appears with:
   - Score gauge (circular)
   - Category breakdown bars
   - "Days to audit readiness" estimate
   - "Continue Full Assessment" button
   - "View Quick Results" button

**Expected:**
- Auto-advance after each answer selection
- Progress bar updates correctly
- Stage indicator shows "Quick (1-5)" highlighted

### 1.3 Full Assessment Flow (25 Questions)

**Steps:**
1. Complete quick assessment
2. Click "Continue Full Assessment"
3. Answer remaining 20 questions
4. Click "Complete Assessment"

**Expected:**
- Progress bar shows full assessment progress
- Stage indicator switches to "Full (6-25)"
- "Complete Assessment" button appears on last question

### 1.4 Results Page Testing

| Feature | Test Steps | Expected |
|---------|------------|----------|
| Score display | Complete assessment | Circular gauge shows percentage |
| Category breakdown | View results | All categories show with progress bars |
| Gap analysis | Complete with some "No" answers | Priority gaps listed with recommendations |
| PDF download | Click "Download PDF" | PDF file downloads (not print dialog) |
| Feedback form | Fill and submit | Shows success message, sends to Telegram |

### 1.5 Loading State

**Test:**
1. Complete quick assessment
2. Click "View Quick Results"

**Expected:**
- Loading overlay appears with animated indicator
- Shows "Preparing Your Results" text
- Bouncing dots animation visible
- Navigates to results page

---

## 2. Navigation Testing

### 2.1 Header Navigation

| Element | Expected Behavior |
|---------|-------------------|
| Logo | Links to `/` |
| "SOC 2 Assessment" button | Highlighted gradient style, links to `/regfo` |
| Other nav items | Standard styling, correct links |

### 2.2 Footer Testing

| Section | Expected |
|---------|----------|
| Company Size | Links to `/regfo?size=startup`, `mid-market`, `enterprise` |
| Copyright | "The BrightByte Capital LLC © 2026. All rights reserved." |

---

## 3. Form Testing

### 3.1 RegFO Feedback Form (Results Page)

**Location:** `/regfo/results` (bottom of page)

| Field | Validation | Test |
|-------|------------|------|
| Name | Required | Submit empty - should fail |
| Email | Required, email format | Submit invalid - should fail |
| Phone | Optional | Submit empty - should pass |
| Message | Required | Submit empty - should fail |

**Submission Test:**
1. Fill all required fields
2. Click "Schedule a Free Consultation"
3. Verify loading state
4. Verify success message appears
5. Check Telegram receives message

### 3.2 Main Page Contact Form

**Location:** Homepage footer section

- Should NOT be modified from original text
- Title: "WE ARE ALWAYS GLAD TO HAVE NEW PARTNERS AND AMBITIOUS TASKS"
- Fields: Name, E-mail, Phone, Request
- Privacy policy checkbox required

---

## 4. Visual/UI Testing

### 4.1 Score Gauge Component

**Locations:** `/regfo/assessment` (preview), `/regfo/results`

**Check:**
- Percentage text fits inside circle
- "Compliance" or "Preview" label visible
- Color changes based on score (green/yellow/orange/red)
- Animation on load

### 4.2 Typography

All RegFO pages should use:
- `typo-h1`, `typo-h2`, `typo-h3` for headings
- `typo-body`, `typo-body-sm` for text
- `font-proxima` consistent throughout

### 4.3 Responsive Testing

| Breakpoint | Test |
|------------|------|
| Mobile (< 640px) | Navigation collapses, forms stack |
| Tablet (768px) | Two-column layouts adjust |
| Desktop (1024px+) | Full layout visible |

---

## 5. Integration Testing

### 5.1 Telegram Integration

**Forms that send to Telegram:**
- Main contact form
- Brief form
- Career form (with CV upload)
- Comparison form
- RegFO feedback form

**Test:** Submit each form and verify message received in Telegram.

### 5.2 Email Integration

**API Endpoint:** `/api/send`

**Note:** May not work on GitHub Pages (static hosting). Test locally.

---

## 6. SEO Testing

### 6.1 Meta Tags

| Page | Required |
|------|----------|
| `/regfo` | Title, description, OpenGraph |
| `/regfo/assessment` | Inherits from layout |
| `/regfo/results` | Inherits from layout |
| `/brief` | Title, description, keywords, canonical |

### 6.2 Sitemap

Check `next-sitemap.config.mjs` includes:
- `/regfo`
- `/regfo/assessment`
- `/brief`

---

## 7. Automated Test Results

Run: `node scripts/qa-regfo.mjs`

### Expected Pass (36 tests):

**Page Load Tests (4)**
- RegFO landing page loads (200)
- RegFO assessment page loads (200)
- RegFO results page loads (200)
- Main page loads (200)

**Navigation Tests (3)**
- Main page has SOC 2 Assessment nav link
- RegFO page has link to assessment
- Assessment page has back link to regfo

**Content Tests (6)**
- RegFO landing has hero section with title
- RegFO landing has "What Your Assessment Covers" section
- RegFO landing has "How It Works" section
- RegFO landing has Two-Stage Assessment section
- Assessment page has question content
- Results page has feedback form or no-results state

**Footer Tests (5)**
- Footer has Company Size section
- Footer has Startup/Mid-Market/Enterprise links to /regfo

**Hero Banner Tests (3)**
- Main page has hero slider
- Banner #4 image path is .webp
- Banner #4 image file exists

**Typography Tests (3)**
- RegFO pages use typo-* classes

**API Endpoint Tests (1)**
- Email API endpoint exists

**Source Integration Tests (9)**
- Results page imports sendEmail utility
- Results page calls sendEmail in form handler
- Results page sends to Telegram
- MenuListLayer has SOC 2 Assessment item
- MainList handles highlighted items
- FooterLinks has Company Size section
- RegFO layout exists
- Results page has jsPDF for PDF generation

---

## 8. Known Issues

### Currently Accepted:
1. **Telegram token in client code** - Required for GitHub Pages static hosting
2. **Forms may fail silently** - Email API doesn't work on static hosting
3. **Skip validation** - Users can skip to results after 15/25 questions

### To Fix (P1):
1. Add form validation with error messages
2. Fix hydration mismatch on results page
3. Improve PDF text wrapping for long questions

---

## 9. Test Environment Setup

```bash
# Install dependencies
npm install

# Start dev server
npm run dev -- -p 3001

# Run QA tests
node scripts/qa-regfo.mjs

# Build for production
npm run build
```

---

## 10. Regression Checklist

Before deployment, verify:

- [ ] All 36 automated tests pass
- [ ] Quick assessment flow works end-to-end
- [ ] Full assessment flow works end-to-end
- [ ] PDF downloads correctly
- [ ] Feedback form submits to Telegram
- [ ] Loading animation displays on navigation
- [ ] Score gauges display without text overlap
- [ ] Navigation SOC 2 button is highlighted
- [ ] Footer company size links work
- [ ] Mobile responsive layout works
