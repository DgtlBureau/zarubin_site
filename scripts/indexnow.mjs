#!/usr/bin/env node
/**
 * Submit site URLs to IndexNow (Bing, Yandex, Seznam, Naver and others share submissions).
 * Reads the live sitemap, so run it after a deploy. The key file lives in public/<KEY>.txt.
 *
 * Usage: node scripts/indexnow.mjs            -> all URLs from sitemap.xml
 *        node scripts/indexnow.mjs /revanta ... -> only the given paths
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HOST = 'thebrightbyte.com';
const ORIGIN = `https://${HOST}`;
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const keyFile = fs
  .readdirSync(path.join(ROOT, 'public'))
  .find((f) => /^[a-f0-9]{32}\.txt$/.test(f));
if (!keyFile) throw new Error('IndexNow key file public/<32 hex>.txt not found');
const key = keyFile.replace('.txt', '');

async function sitemapUrls() {
  const xml = await (await fetch(`${ORIGIN}/sitemap.xml`)).text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
}

const args = process.argv.slice(2);
const urlList = args.length
  ? args.map((p) => (p.startsWith('http') ? p : `${ORIGIN}${p}`))
  : await sitemapUrls();

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({
    host: HOST,
    key,
    keyLocation: `${ORIGIN}/${keyFile}`,
    urlList: urlList.slice(0, 10000),
  }),
});

console.log(`IndexNow: ${res.status} ${res.statusText}, ${urlList.length} URLs`);
if (res.status >= 400) process.exit(1);
