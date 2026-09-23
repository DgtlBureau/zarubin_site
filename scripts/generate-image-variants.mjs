#!/usr/bin/env node
// Post-build step for the static export: generates the resized WebP files that
// the next/image custom loader (src/lib/imageVariants/exportImageLoader.ts)
// references in srcset. Runs after `NEXT_OUTPUT_EXPORT=true next build`.
//
// Discovery (everything is read from out/, nothing is committed to the repo):
//   1. every `/_img/<w>/<path>` URL found in exported HTML / RSC payloads / JS;
//   2. every local raster path (`/assets/...png`, `/_next/static/media/...webp`)
//      mentioned in those files. These cover images that are rendered only on
//      the client (e.g. hero slides 2+, hover swaps, media-query menus), whose
//      srcset never reaches the HTML. For them all widths are generated.
//
// Width handling: a variant never upscales. Widths >= the source width get the
// "full" variant (the original bytes for WebP sources, a WebP re-encode for
// PNG/JPEG), so every srcset candidate exists.
//
// Encoded files are cached by content hash in .next/cache/image-variants
// (restored by the CI cache step), so repeated CI builds only encode new images.

import { createHash } from 'node:crypto';
import { existsSync } from 'node:fs';
import {
  copyFile,
  mkdir,
  readdir,
  readFile,
  rename,
  rm,
  stat,
  writeFile,
} from 'node:fs/promises';
import { availableParallelism } from 'node:os';
import path from 'node:path';
import sharp from 'sharp';
import {
  ALL_IMAGE_WIDTHS,
  VARIANT_PREFIX,
  parseVariantPath,
  toVariantPath,
} from '../src/lib/imageVariants/imageVariants.mjs';

const ROOT = process.cwd();
const OUT_DIR = path.resolve(ROOT, process.env.IMAGE_VARIANTS_OUT_DIR || 'out');
const CACHE_DIR = path.resolve(
  ROOT,
  process.env.IMAGE_VARIANTS_CACHE_DIR || '.next/cache/image-variants',
);
const VARIANT_DIR = path.join(OUT_DIR, VARIANT_PREFIX);

// Resized variants: visually lossless at the displayed size. Bump
// ENCODER_VERSION whenever encoder settings change to invalidate the cache.
const RESIZED_WEBP = { quality: 82, smartSubsample: true, effort: 4 };
const FULL_SIZE_WEBP = { quality: 90, smartSubsample: true, effort: 4 };
const ENCODER_VERSION = 'v1';

const TEXT_EXT = new Set(['.html', '.txt', '.js', '.json', '.css']);
const VARIANT_REF_RE = new RegExp(
  `${VARIANT_PREFIX.replace('/', '\\/')}\\/\\d+\\/[^"'\\s,)\\\\<>]+?\\.webp`,
  'g',
);
const RASTER_REF_RE =
  /\/(?:assets|_next\/static\/media|playbook)\/[^"'\s,)\\<>?#]+?\.(?:png|jpe?g|webp)/gi;

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (full !== VARIANT_DIR) yield* walk(full);
    } else {
      yield full;
    }
  }
}

const decodeHtml = (s) => s.replace(/&amp;/g, '&');
const outFile = (urlPath) => path.join(OUT_DIR, decodeURI(urlPath));

/** @returns {Promise<Map<string, Set<number>>>} source url path -> widths */
async function collectRequests() {
  const requests = new Map();
  const add = (src, widths) => {
    const set = requests.get(src) ?? new Set();
    widths.forEach((w) => set.add(w));
    requests.set(src, set);
  };
  const unresolved = new Set();

  for await (const file of walk(OUT_DIR)) {
    if (!TEXT_EXT.has(path.extname(file))) continue;
    const text = await readFile(file, 'utf8');

    for (const ref of text.match(VARIANT_REF_RE) ?? []) {
      const parsed = parseVariantPath(decodeHtml(ref));
      const src = parsed?.sources.find((s) => existsSync(outFile(s)));
      if (!parsed || !src) {
        unresolved.add(ref);
        continue;
      }
      add(src, [parsed.width]);
    }
    for (const ref of text.match(RASTER_REF_RE) ?? []) {
      const src = decodeHtml(ref);
      if (existsSync(outFile(src))) add(src, ALL_IMAGE_WIDTHS);
    }
  }

  if (unresolved.size) {
    // A srcset URL without a source file would 404 in production.
    throw new Error(
      `Variant URLs without a source image:\n  ${[...unresolved].join('\n  ')}`,
    );
  }
  return requests;
}

const hasNonSrgbProfile = (icc) =>
  Boolean(icc) && !icc.includes(Buffer.from('sRGB'));

/**
 * Produces (or restores from cache) the variant file for one source + target
 * and returns the cache path.
 */
async function encode({ input, hash, meta, width, isFull, usedCacheFiles }) {
  const isWebp = meta.format === 'webp';
  const key = `${hash}-${isFull ? 'full' : width}-${ENCODER_VERSION}.webp`;
  const cached = path.join(CACHE_DIR, key);
  usedCacheFiles.add(key);
  if (existsSync(cached)) return cached;

  // Write to a temp file and rename: identical sources (same hash) may be
  // processed concurrently, and a reader must never see a partial file.
  const tmp = `${cached}.${process.pid}.${Math.random().toString(36).slice(2)}.tmp`;
  // Animated sources and WebP originals at full size are served byte-for-byte.
  if ((isFull && isWebp) || (meta.pages ?? 1) > 1) {
    await writeFile(tmp, input);
  } else {
    let pipeline = sharp(input).rotate();
    if (hasNonSrgbProfile(meta.icc)) pipeline = pipeline.keepIccProfile();
    if (!isFull)
      pipeline = pipeline.resize({ width, withoutEnlargement: true });
    await pipeline.webp(isFull ? FULL_SIZE_WEBP : RESIZED_WEBP).toFile(tmp);
  }
  await rename(tmp, cached);
  return cached;
}

async function processSource(src, widths, usedCacheFiles, stats) {
  const input = await readFile(outFile(src));
  const hash = createHash('sha1').update(input).digest('hex');
  const meta = await sharp(input).metadata();
  const sourceWidth = meta.width ?? Number.POSITIVE_INFINITY;

  for (const width of [...widths].sort((a, b) => a - b)) {
    const isFull = width >= sourceWidth;
    const cached = await encode({
      input,
      hash,
      meta,
      width,
      isFull,
      usedCacheFiles,
    });
    const target = outFile(toVariantPath(src, width));
    await mkdir(path.dirname(target), { recursive: true });
    await copyFile(cached, target);
    // Read the size before touching the shared counter (no lost updates
    // across concurrent lanes)
    const { size } = await stat(target);
    stats.files += 1;
    stats.bytes += size;
  }
}

async function runPool(items, limit, worker) {
  let next = 0;
  const lanes = Array.from(
    { length: Math.min(limit, items.length) },
    async () => {
      while (next < items.length) await worker(items[next++]);
    },
  );
  await Promise.all(lanes);
}

async function pruneCache(usedCacheFiles) {
  for (const name of await readdir(CACHE_DIR)) {
    if (!usedCacheFiles.has(name)) await rm(path.join(CACHE_DIR, name));
  }
}

async function main() {
  if (!existsSync(OUT_DIR)) {
    throw new Error(`${OUT_DIR} not found. Run the static export build first.`);
  }
  const started = Date.now();
  await rm(VARIANT_DIR, { recursive: true, force: true });
  await mkdir(CACHE_DIR, { recursive: true });

  const requests = await collectRequests();
  const usedCacheFiles = new Set();
  const stats = { files: 0, bytes: 0 };
  sharp.concurrency(1); // parallelism comes from the pool below
  await runPool([...requests], availableParallelism(), ([src, widths]) =>
    processSource(src, widths, usedCacheFiles, stats),
  );
  await pruneCache(usedCacheFiles);

  const mb = (stats.bytes / 1024 / 1024).toFixed(1);
  const seconds = ((Date.now() - started) / 1000).toFixed(1);
  console.log(
    `[image-variants] ${requests.size} source images -> ${stats.files} files (${mb} MB) in ${seconds}s`,
  );
}

main().catch((error) => {
  console.error('[image-variants]', error);
  process.exit(1);
});
