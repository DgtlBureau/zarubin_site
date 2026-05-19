#!/usr/bin/env node
/**
 * Generate meta-refresh stub HTML files for each redirect in src/data/redirects.json.
 *
 * Context: this site deploys as a Next.js static export to GitHub Pages, which
 * does not honor next.config.mjs redirects(). To preserve SEO equity from old
 * URLs, we write a static <source>.html stub at each redirect source path.
 * Flat .html (not <source>/index.html) — GH Pages 301s directory paths to add
 * a trailing slash, which combined with HTTPS enforcement loops infinitely.
 *
 * Stub contents:
 *  - <meta http-equiv="refresh" content="0; url=DESTINATION">
 *  - <link rel="canonical" href="DESTINATION">
 *  - JS fallback: window.location.replace(DESTINATION)
 *  - Visible <a> link as the last resort
 *
 * Idempotent. Skips with a warning if a real Next-generated page already exists
 * at the source path (collision protection).
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'out');
const REDIRECTS_PATH = path.join(ROOT, 'src', 'data', 'redirects.json');
const SITE_ORIGIN = 'https://thebrightbyte.com';

function buildStubHtml(destination) {
  const absoluteUrl = destination.startsWith('http')
    ? destination
    : `${SITE_ORIGIN}${destination}`;
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Redirecting…</title>
<meta name="robots" content="noindex">
<meta http-equiv="refresh" content="0; url=${destination}">
<link rel="canonical" href="${absoluteUrl}">
<script>window.location.replace(${JSON.stringify(destination)});</script>
</head>
<body>
<p>Redirecting to <a href="${destination}">${destination}</a></p>
</body>
</html>
`;
}

function isStub(content) {
  return (
    typeof content === 'string' &&
    content.includes('http-equiv="refresh"') &&
    content.includes('Redirecting')
  );
}

function main() {
  if (!fs.existsSync(OUT_DIR)) {
    console.error(
      `[redirect-stubs] out/ not found at ${OUT_DIR}. Run \`next build\` first.`,
    );
    process.exit(1);
  }
  const redirects = JSON.parse(fs.readFileSync(REDIRECTS_PATH, 'utf8'));

  let written = 0;
  let skippedExisting = 0;
  let skippedCollision = 0;

  for (const { source, destination } of redirects) {
    // source is an absolute path like /playbook/expertise/foo.
    // Write as a flat .html file (out/playbook/expertise/foo.html), NOT as a
    // directory with index.html. GH Pages 301s /foo -> /foo/ for directory
    // index.html, which combined with HTTPS enforcement loops infinitely.
    const relative = source.replace(/^\/+/, '');
    const file = path.join(OUT_DIR, `${relative}.html`);
    const dir = path.dirname(file);
    const orphanDir = path.join(OUT_DIR, relative);
    const orphanIndex = path.join(orphanDir, 'index.html');

    // Also check for and clean up legacy <source>/index.html stubs from prior builds.
    if (fs.existsSync(orphanIndex)) {
      const existing = fs.readFileSync(orphanIndex, 'utf8');
      if (isStub(existing)) {
        fs.rmSync(orphanDir, { recursive: true, force: true });
      } else {
        console.warn(
          `[redirect-stubs] SKIP collision: real page exists at ${path.relative(ROOT, orphanIndex)} (source: ${source})`,
        );
        skippedCollision += 1;
        continue;
      }
    }

    if (fs.existsSync(file)) {
      const existing = fs.readFileSync(file, 'utf8');
      if (isStub(existing)) {
        skippedExisting += 1;
        continue;
      }
      console.warn(
        `[redirect-stubs] SKIP collision: real page exists at ${path.relative(ROOT, file)} (source: ${source})`,
      );
      skippedCollision += 1;
      continue;
    }

    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(file, buildStubHtml(destination), 'utf8');
    console.log(
      `[redirect-stubs] WROTE ${source} -> ${destination}`,
    );
    written += 1;
  }

  console.log(
    `[redirect-stubs] done. written=${written} skipped_existing=${skippedExisting} skipped_collision=${skippedCollision} total=${redirects.length}`,
  );
}

main();
