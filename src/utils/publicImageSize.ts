import { isResizableSrc } from '@/src/lib/imageVariants/imageVariants.mjs';
import fs from 'fs';
import { imageSize } from 'image-size';
import path from 'path';

// Server-only (reads /public at build time). Lets components that render
// string-path images compute `sizes` from the real aspect ratio.

export type ImageDimensions = { width: number; height: number };
export type ImageDimensionsMap = Record<string, ImageDimensions>;

const cache = new Map<string, ImageDimensions | null>();

/** Pixel size of a local raster under /public (EXIF rotation applied), or null. */
export function getPublicImageSize(
  src: string | null | undefined,
): ImageDimensions | null {
  if (!src || !isResizableSrc(src)) return null;
  const cached = cache.get(src);
  if (cached !== undefined) return cached;

  let size: ImageDimensions | null = null;
  try {
    const file = path.join(
      process.cwd(),
      'public',
      decodeURI(src.split(/[?#]/, 1)[0]),
    );
    const { width, height, orientation } = imageSize(fs.readFileSync(file));
    // EXIF orientations 5-8 are rotated by 90 degrees when displayed
    const rotated = orientation !== undefined && orientation >= 5;
    size = rotated ? { width: height, height: width } : { width, height };
  } catch {
    size = null;
  }
  cache.set(src, size);
  return size;
}

/** width / height of a local raster, or undefined when unknown (remote, missing). */
export function getPublicImageAspect(
  src: string | null | undefined,
): number | undefined {
  const size = getPublicImageSize(src);
  return size ? size.width / size.height : undefined;
}

// `![alt](/path.webp "title")` and raw `<img src='/path.png'>` in markdown
const MARKDOWN_IMAGE_SRC_RE =
  /!\[[^\]]*\]\(\s*<?([^)\s>]+)|<img[^>]*\ssrc=['"]([^'"]+)['"]/g;

/** Pixel sizes of every local raster image referenced by a markdown document. */
export function getMarkdownImageDimensions(
  markdown: string,
): ImageDimensionsMap {
  const map: ImageDimensionsMap = {};
  for (const match of markdown.matchAll(MARKDOWN_IMAGE_SRC_RE)) {
    const src = match[1] ?? match[2];
    const size = getPublicImageSize(src);
    if (src && size) map[src] = size;
  }
  return map;
}
