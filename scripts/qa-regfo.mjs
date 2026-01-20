#!/usr/bin/env node
/**
 * QA Tests for RegFO functionality
 * Run with: node scripts/qa-regfo.mjs
 */

const BASE_URL = process.env.BASE_URL || 'http://localhost:3001';

const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m',
};

const log = {
  pass: (msg) => console.log(`${colors.green}✓${colors.reset} ${msg}`),
  fail: (msg) => console.log(`${colors.red}✗${colors.reset} ${msg}`),
  info: (msg) => console.log(`${colors.blue}ℹ${colors.reset} ${msg}`),
  section: (msg) => console.log(`\n${colors.bold}${colors.yellow}▶ ${msg}${colors.reset}`),
};

let passed = 0;
let failed = 0;

async function test(name, fn) {
  try {
    await fn();
    log.pass(name);
    passed++;
  } catch (error) {
    log.fail(`${name}: ${error.message}`);
    failed++;
  }
}

async function fetchPage(path) {
  const response = await fetch(`${BASE_URL}${path}`);
  const html = await response.text();
  return { response, html };
}

// ============================================
// PAGE LOAD TESTS
// ============================================
async function testPageLoads() {
  log.section('Page Load Tests');

  await test('RegFO landing page loads (200)', async () => {
    const { response } = await fetchPage('/regfo');
    if (response.status !== 200) throw new Error(`Status: ${response.status}`);
  });

  await test('RegFO assessment page loads (200)', async () => {
    const { response } = await fetchPage('/regfo/assessment');
    if (response.status !== 200) throw new Error(`Status: ${response.status}`);
  });

  await test('RegFO results page loads (200)', async () => {
    const { response } = await fetchPage('/regfo/results');
    if (response.status !== 200) throw new Error(`Status: ${response.status}`);
  });

  await test('Main page loads (200)', async () => {
    const { response } = await fetchPage('/');
    if (response.status !== 200) throw new Error(`Status: ${response.status}`);
  });
}

// ============================================
// NAVIGATION TESTS
// ============================================
async function testNavigation() {
  log.section('Navigation Tests');

  await test('Main page has SOC 2 Assessment nav link', async () => {
    const { html } = await fetchPage('/');
    if (!html.includes('SOC 2 Assessment')) {
      throw new Error('SOC 2 Assessment link not found in navigation');
    }
    if (!html.includes('href="/regfo"')) {
      throw new Error('Link to /regfo not found');
    }
  });

  await test('RegFO page has link to assessment', async () => {
    const { html } = await fetchPage('/regfo');
    if (!html.includes('href="/regfo/assessment"')) {
      throw new Error('Link to /regfo/assessment not found');
    }
  });

  await test('Assessment page has back link to regfo', async () => {
    const { html } = await fetchPage('/regfo/assessment');
    if (!html.includes('href="/regfo"')) {
      throw new Error('Back link to /regfo not found');
    }
  });
}

// ============================================
// CONTENT TESTS
// ============================================
async function testContent() {
  log.section('Content Tests');

  // RegFO Landing Page
  await test('RegFO landing has hero section with title', async () => {
    const { html } = await fetchPage('/regfo');
    if (!html.includes('SOC 2') || !html.includes('GDPR')) {
      throw new Error('Hero title missing SOC 2 or GDPR');
    }
  });

  await test('RegFO landing has "What Your Assessment Covers" section', async () => {
    const { html } = await fetchPage('/regfo');
    if (!html.includes('What Your Assessment Covers')) {
      throw new Error('Assessment covers section not found');
    }
  });

  await test('RegFO landing has "How It Works" section', async () => {
    const { html } = await fetchPage('/regfo');
    if (!html.includes('How It Works')) {
      throw new Error('How It Works section not found');
    }
  });

  await test('RegFO landing has Two-Stage Assessment section', async () => {
    const { html } = await fetchPage('/regfo');
    if (!html.includes('Two-Stage Assessment')) {
      throw new Error('Two-Stage Assessment section not found');
    }
  });

  // Assessment Page
  await test('Assessment page has question content', async () => {
    const { html } = await fetchPage('/regfo/assessment');
    if (!html.includes('Quick Assessment') && !html.includes('Question')) {
      throw new Error('Assessment question content not found');
    }
  });

  // Results Page
  await test('Results page has feedback form or no-results state', async () => {
    const { html } = await fetchPage('/regfo/results');
    // Either shows feedback form (with results) or no-results state (without localStorage data)
    const hasForm = html.includes('Your journey to compliance');
    const hasNoResults = html.includes('No Assessment Results');
    if (!hasForm && !hasNoResults) {
      throw new Error('Neither feedback form nor no-results state found');
    }
  });

  await test('Results page has PDF button or no-results state', async () => {
    const { html } = await fetchPage('/regfo/results');
    // Either shows PDF download (with results) or no-results state
    const hasDownload = html.includes('Download PDF') || html.includes('Download');
    const hasNoResults = html.includes('No Assessment Results');
    if (!hasDownload && !hasNoResults) {
      throw new Error('Neither PDF button nor no-results state found');
    }
  });

  await test('Results page source has feedback form component', async () => {
    const fs = await import('fs');
    const content = fs.readFileSync('./app/regfo/results/page.tsx', 'utf8');
    if (!content.includes('FeedbackForm')) {
      throw new Error('FeedbackForm component not found in source');
    }
  });
}

// ============================================
// FOOTER TESTS
// ============================================
async function testFooter() {
  log.section('Footer Tests');

  await test('Footer has Company Size section', async () => {
    const { html } = await fetchPage('/');
    if (!html.includes('Company Size')) {
      throw new Error('Company Size section not found in footer');
    }
  });

  await test('Footer has Startup link to /regfo', async () => {
    const { html } = await fetchPage('/');
    if (!html.includes('/regfo?size=startup')) {
      throw new Error('Startup link not found');
    }
  });

  await test('Footer has Mid-Market link to /regfo', async () => {
    const { html } = await fetchPage('/');
    if (!html.includes('/regfo?size=mid-market')) {
      throw new Error('Mid-Market link not found');
    }
  });

  await test('Footer has Enterprise link to /regfo', async () => {
    const { html } = await fetchPage('/');
    if (!html.includes('/regfo?size=enterprise')) {
      throw new Error('Enterprise link not found');
    }
  });

  await test('Footer has "All rights reserved"', async () => {
    const { html } = await fetchPage('/');
    if (!html.includes('All rights reserved')) {
      throw new Error('All rights reserved text not found');
    }
  });
}

// ============================================
// HERO BANNER TESTS
// ============================================
async function testHeroBanner() {
  log.section('Hero Banner Tests');

  await test('Main page has hero slider', async () => {
    const { html } = await fetchPage('/');
    if (!html.includes('swiper') && !html.includes('Swiper')) {
      throw new Error('Swiper/slider not found');
    }
  });

  await test('Banner #4 (Sports Tech) image path is .webp', async () => {
    // Check the source code directly
    const fs = await import('fs');
    const content = fs.readFileSync('./src/utils/DataLayers/MainBanners.ts', 'utf8');
    if (content.includes('nelson-ndongala-j9a3Y1Vd9hc-unsplash.jpg')) {
      throw new Error('Banner #4 still has .jpg extension');
    }
    if (!content.includes('nelson-ndongala-j9a3Y1Vd9hc-unsplash.webp')) {
      throw new Error('Banner #4 .webp path not found');
    }
  });

  await test('Banner #4 image file exists', async () => {
    const fs = await import('fs');
    const path = './public/assets/images/info/nelson-ndongala-j9a3Y1Vd9hc-unsplash.webp';
    if (!fs.existsSync(path)) {
      throw new Error(`Image file not found: ${path}`);
    }
  });
}

// ============================================
// TYPOGRAPHY TESTS
// ============================================
async function testTypography() {
  log.section('Typography Tests');

  await test('RegFO pages use typo-* classes', async () => {
    const { html } = await fetchPage('/regfo');
    const typoClasses = ['typo-h1', 'typo-h2', 'typo-h3', 'typo-body'];
    const found = typoClasses.some(cls => html.includes(cls));
    if (!found) {
      throw new Error('No typo-* classes found on regfo page');
    }
  });

  await test('Assessment page uses typo-* classes', async () => {
    const { html } = await fetchPage('/regfo/assessment');
    if (!html.includes('typo-')) {
      throw new Error('No typo-* classes found on assessment page');
    }
  });

  await test('Results page uses typo-* classes', async () => {
    const { html } = await fetchPage('/regfo/results');
    if (!html.includes('typo-')) {
      throw new Error('No typo-* classes found on results page');
    }
  });
}

// ============================================
// API ENDPOINT TESTS
// ============================================
async function testAPIEndpoints() {
  log.section('API Endpoint Tests');

  await test('Email API endpoint exists (/api/send)', async () => {
    // Just check if it responds (POST with empty body will fail but endpoint exists)
    try {
      const response = await fetch(`${BASE_URL}/api/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });
      // Any response means endpoint exists
      if (response.status === 404) {
        throw new Error('Endpoint not found (404)');
      }
    } catch (e) {
      if (e.message.includes('404')) throw e;
      // Other errors are OK - endpoint exists but request was invalid
    }
  });
}

// ============================================
// INTEGRATION TESTS (Source Code)
// ============================================
async function testSourceIntegration() {
  log.section('Source Code Integration Tests');

  const fs = await import('fs');

  await test('Results page imports sendEmail utility', async () => {
    const content = fs.readFileSync('./app/regfo/results/page.tsx', 'utf8');
    if (!content.includes("import { sendEmail }") && !content.includes("from '@/src/utils/sendEmail'")) {
      throw new Error('sendEmail import not found');
    }
  });

  await test('Results page calls sendEmail in form handler', async () => {
    const content = fs.readFileSync('./app/regfo/results/page.tsx', 'utf8');
    if (!content.includes('await sendEmail(')) {
      throw new Error('sendEmail() call not found');
    }
  });

  await test('Results page sends to Telegram', async () => {
    const content = fs.readFileSync('./app/regfo/results/page.tsx', 'utf8');
    if (!content.includes('api.telegram.org')) {
      throw new Error('Telegram integration not found');
    }
  });

  await test('MenuListLayer has SOC 2 Assessment item', async () => {
    const content = fs.readFileSync('./src/utils/menuListLayer.tsx', 'utf8');
    if (!content.includes('SOC2_ASSESSMENT') && !content.includes('SOC 2 Assessment')) {
      throw new Error('SOC 2 Assessment menu item not found');
    }
  });

  await test('MenuListLayer item has isHighlighted flag', async () => {
    const content = fs.readFileSync('./src/utils/menuListLayer.tsx', 'utf8');
    if (!content.includes('isHighlighted: true')) {
      throw new Error('isHighlighted flag not found');
    }
  });

  await test('MainList handles highlighted items with special styling', async () => {
    const content = fs.readFileSync('./src/components/NavList/MainList.tsx', 'utf8');
    if (!content.includes('isHighlighted')) {
      throw new Error('isHighlighted handling not found in MainList');
    }
  });

  await test('FooterLinks has Company Size section', async () => {
    const content = fs.readFileSync('./src/utils/footerLinks/footerLinks.tsx', 'utf8');
    if (!content.includes('Company Size')) {
      throw new Error('Company Size section not found');
    }
  });

  await test('RegFO layout exists and wraps content', async () => {
    const content = fs.readFileSync('./app/regfo/layout.tsx', 'utf8');
    if (!content.includes('children')) {
      throw new Error('Layout does not render children');
    }
  });

  await test('Results page has jsPDF for PDF generation (dynamic import)', async () => {
    const content = fs.readFileSync('./app/regfo/results/page.tsx', 'utf8');
    if (!content.includes("import('jspdf')")) {
      throw new Error('jsPDF dynamic import not found');
    }
  });
}

// ============================================
// RUN ALL TESTS
// ============================================
async function runAllTests() {
  console.log(`\n${colors.bold}🧪 RegFO QA Tests${colors.reset}`);
  console.log(`${colors.blue}Base URL: ${BASE_URL}${colors.reset}`);

  try {
    // Check if server is running
    await fetch(BASE_URL);
  } catch (e) {
    console.error(`\n${colors.red}Error: Server not running at ${BASE_URL}${colors.reset}`);
    console.log(`Start the dev server first: npm run dev\n`);
    process.exit(1);
  }

  await testPageLoads();
  await testNavigation();
  await testContent();
  await testFooter();
  await testHeroBanner();
  await testTypography();
  await testAPIEndpoints();
  await testSourceIntegration();

  // Summary
  console.log(`\n${colors.bold}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
  console.log(`${colors.bold}Summary${colors.reset}`);
  console.log(`${colors.green}Passed: ${passed}${colors.reset}`);
  console.log(`${colors.red}Failed: ${failed}${colors.reset}`);
  console.log(`${colors.bold}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}\n`);

  if (failed > 0) {
    process.exit(1);
  }
}

runAllTests();
