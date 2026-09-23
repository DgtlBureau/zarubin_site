import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
  isResizableSrc,
  parseVariantPath,
  toVariantPath,
} from './imageVariants.mjs';

describe('toVariantPath', () => {
  it('keeps WebP paths as-is under the width folder', () => {
    assert.equal(
      toVariantPath('/assets/images/a.webp', 640),
      '/_img/640/assets/images/a.webp',
    );
  });

  it('appends .webp to non-WebP sources to avoid collisions', () => {
    assert.equal(
      toVariantPath('/assets/a.png', 828),
      '/_img/828/assets/a.png.webp',
    );
    assert.equal(
      toVariantPath('/assets/a.jpg', 828),
      '/_img/828/assets/a.jpg.webp',
    );
  });

  it('drops query strings and encodes unsafe characters once', () => {
    assert.equal(
      toVariantPath('/assets/a b.webp?v=2', 128),
      '/_img/128/assets/a%20b.webp',
    );
    assert.equal(
      toVariantPath('/assets/a%20b.webp', 128),
      '/_img/128/assets/a%20b.webp',
    );
  });
});

describe('parseVariantPath', () => {
  it('round-trips toVariantPath', () => {
    for (const src of [
      '/assets/a.webp',
      '/_next/static/media/x.1a2b.png',
      '/assets/a b.jpeg',
    ]) {
      const parsed = parseVariantPath(toVariantPath(src, 1080));
      assert.equal(parsed?.width, 1080);
      assert.equal(parsed?.sources[0], src);
    }
  });

  it('rejects foreign paths', () => {
    assert.equal(parseVariantPath('/assets/a.webp'), null);
    assert.equal(parseVariantPath('/_img/abc/a.webp'), null);
  });
});

// exportImageLoader.ts is `isResizableSrc(src) ? toVariantPath(src, width) : src`;
// tested through these helpers so the suite runs on Node 20 without a TS loader.
describe('isResizableSrc', () => {
  it('passes SVG, GIF and remote images through unchanged', () => {
    for (const src of [
      '/a.svg',
      '/a.gif',
      'https://i.imgur.com/a.png',
      '//cdn/a.png',
      'data:image/png;base64,x',
    ]) {
      assert.equal(isResizableSrc(src), false);
    }
  });

  it('accepts local rasters, including static imports', () => {
    for (const src of [
      '/_next/static/media/hero.abc.webp',
      '/assets/a.PNG',
      '/assets/a.jpeg?x=1',
    ]) {
      assert.equal(isResizableSrc(src), true);
    }
  });
});
