import type { ImageLoaderProps } from 'next/image';
import { isResizableSrc, toVariantPath } from './imageVariants.mjs';

/**
 * next/image loader for the static export (GitHub Pages). Enabled only when
 * next.config sets `images.loaderFile` (NEXT_OUTPUT_EXPORT=true). Resizable
 * local rasters resolve to pre-generated WebP variants; everything else
 * (SVG, GIF, remote URLs) is served as-is.
 *
 * `quality` is intentionally ignored: variants are encoded once per width
 * with a single high quality setting (see scripts/generate-image-variants.mjs).
 */
export default function exportImageLoader({ src, width }: ImageLoaderProps) {
  return isResizableSrc(src) ? toVariantPath(src, width) : src;
}
