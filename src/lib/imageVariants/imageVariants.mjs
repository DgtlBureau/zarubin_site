// Shared contract between the next/image custom loader (browser + SSR) and the
// post-build generator (scripts/generate-image-variants.mjs).
//
// GitHub Pages is a static host, so the Next.js Image Optimization API is not
// available. Instead, the loader points every srcset candidate at a
// pre-generated WebP file and the generator creates exactly those files in
// out/ after `next build`. Plain JS (not TS) so that next.config.mjs and the
// Node build script can import it without a transpiler.

/** URL prefix of all generated variants inside the export output. */
export const VARIANT_PREFIX = '/_img';

/**
 * Widths used by next/image to build srcset. `deviceSizes` serve fill /
 * vw-based images, `imageSizes` serve small fixed-size images (avatars,
 * logos, thumbnails). Together they are the full set of files generated per
 * source image, so keep the lists short.
 */
// 2560/3840 only matter for sources wider than 1920px on 2x desktop screens;
// for smaller sources they are copies of the full-size file.
export const IMAGE_DEVICE_SIZES = [640, 828, 1080, 1280, 1920, 2560, 3840];
export const IMAGE_SIZES = [128, 256, 384];
export const ALL_IMAGE_WIDTHS = [...IMAGE_SIZES, ...IMAGE_DEVICE_SIZES];

/** Raster formats we can resize. SVG, GIF (animation) and AVIF pass through. */
const RESIZABLE_RE = /\.(png|jpe?g|webp)$/i;

/**
 * @param {string} src image src as given to next/image (path or URL)
 * @returns {boolean} whether a local variant exists for this src
 */
export function isResizableSrc(src) {
  const path = src.split(/[?#]/, 1)[0];
  return (
    path.startsWith('/') && !path.startsWith('//') && RESIZABLE_RE.test(path)
  );
}

/**
 * Maps a source image + target width to the variant URL.
 * `/assets/a/b.webp` -> `/_img/640/assets/a/b.webp`
 * `/assets/a/b.png`  -> `/_img/640/assets/a/b.png.webp`
 * The original extension is kept for non-WebP sources so that `b.png` and
 * `b.jpg` next to each other never collide.
 *
 * @param {string} src
 * @param {number} width
 * @returns {string}
 */
export function toVariantPath(src, width) {
  const path = src.split(/[?#]/, 1)[0];
  const suffix = /\.webp$/i.test(path) ? '' : '.webp';
  return `${VARIANT_PREFIX}/${width}${encodeURI(decodeURI(path))}${suffix}`;
}

/**
 * Inverse of toVariantPath. Returns candidate source paths (decoded, most
 * likely first) because `/x.png.webp` may come from `/x.png` or from a real
 * file called `/x.png.webp`; the generator picks the one that exists.
 *
 * @param {string} variantPath
 * @returns {{ width: number, sources: string[] } | null}
 */
export function parseVariantPath(variantPath) {
  const prefix = `${VARIANT_PREFIX}/`;
  if (!variantPath.startsWith(prefix)) return null;
  const match = /^(\d+)(\/.+\.webp)$/.exec(variantPath.slice(prefix.length));
  if (!match) return null;
  const width = Number(match[1]);
  const path = decodeURI(match[2]);
  const sources = [path];
  const inner = path.slice(0, -'.webp'.length);
  if (RESIZABLE_RE.test(inner)) sources.unshift(inner);
  return { width, sources };
}
