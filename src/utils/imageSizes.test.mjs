// Imports TypeScript directly: needs Node >= 22.18 (type stripping).
import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { coverSizes } from './imageSizes.ts';

describe('coverSizes', () => {
  it('uses vw when the box is wider than the scaled image', () => {
    assert.equal(
      coverSizes(3, [{ minWidth: 0, vw: 1, height: 100 }]),
      '(min-width: 300px) 100vw, 300px',
    );
  });

  it('uses px when cover scaling dominates the whole range', () => {
    assert.equal(
      coverSizes(2, [
        { minWidth: 0, vw: 1, height: 540 },
        { minWidth: 768, vw: 1, height: 660 },
      ]),
      '(min-width: 1320px) 100vw, (min-width: 768px) 1320px, 1080px',
    );
  });

  it('handles fixed-width boxes and fractions', () => {
    assert.equal(
      coverSizes(1, [
        { minWidth: 0, vw: 0.5, height: 100 },
        { minWidth: 1200, px: 380, height: 400 },
      ]),
      '(min-width: 1200px) 400px, (min-width: 200px) 50vw, 100px',
    );
  });

  it('scales aspect-ratio boxes by the cover factor', () => {
    const boxes = [
      { minWidth: 0, vw: 1, boxAspect: 16 / 9 },
      { minWidth: 1200, px: 400, boxAspect: 16 / 9 },
    ];
    assert.equal(coverSizes(1.5, boxes), '(min-width: 1200px) 400px, 100vw');
    assert.equal(coverSizes(32 / 9, boxes), '(min-width: 1200px) 800px, 200vw');
    assert.equal(
      coverSizes(undefined, boxes),
      '(min-width: 1200px) 400px, 100vw',
    );
  });
});
