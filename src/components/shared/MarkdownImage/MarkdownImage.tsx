import type { ImageDimensionsMap } from '@/src/utils/publicImageSize';
import { getImageProps } from 'next/image';
import type { MarkdownToJSX } from 'markdown-to-jsx';
import type { ComponentPropsWithoutRef } from 'react';

/** Markdown images may take at most 90% of the column width. */
const COLUMN_SHARE = 0.9;

interface MarkdownImageProps extends ComponentPropsWithoutRef<'img'> {
  /** Pixel sizes of local images, from getMarkdownImageDimensions(). */
  dimensions: ImageDimensionsMap;
  /** Largest CSS width the image can take in this layout (px). */
  maxRenderedWidth: number;
  /** CSS max-height applied to markdown images in this layout (px). */
  maxRenderedHeight: number;
}

/**
 * markdown-to-jsx override for <img>: local images get srcset/sizes from the
 * next/image loader, width/height (aspect-ratio reservation) and lazy loading.
 *
 * Rendering is kept identical to the plain intrinsic-size <img> it replaces
 * (`.markdown img { max-width: 90%; max-height: 650px }`), whose drawn width
 * is min(file width, 90% of the column, 650px x aspect ratio):
 * - inline width = file width + exact aspect-ratio, height auto (the
 *   stylesheet's 90% max-width applies; the 650px max-height becomes a
 *   max-width when it can bind), so the box is reserved before loading;
 * - `sizes` never falls below that drawn width (90vw, capped at its maximum).
 * Raw HTML images with their own classes (e.g. the idea-marking lamp icon)
 * are sized by those classes, so they stay plain <img> tags.
 */
export function MarkdownImage({
  src,
  alt = '',
  dimensions,
  maxRenderedWidth,
  maxRenderedHeight,
  className,
  style,
  ...rest
}: MarkdownImageProps) {
  const size = typeof src === 'string' ? dimensions[src] : undefined;

  if (typeof src !== 'string' || !size || className) {
    return (
      // Remote, unknown-size or class-sized image: keep the plain tag.
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        className={className}
        style={style}
        loading='lazy'
        decoding='async'
        {...rest}
      />
    );
  }

  const heightCap = Math.floor((maxRenderedHeight * size.width) / size.height);
  const maxDrawnWidth = Math.min(size.width, maxRenderedWidth, heightCap);
  const {
    props: { srcSet, sizes, src: fallbackSrc, width, height },
  } = getImageProps({
    src,
    alt,
    width: size.width,
    height: size.height,
    // 90vw bounds 90% of the column on narrow screens; the cap applies
    // once 90vw exceeds the largest possible drawn width.
    sizes: `(min-width: ${Math.ceil(maxDrawnWidth / COLUMN_SHARE)}px) ${maxDrawnWidth}px, 90vw`,
  });
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      {...rest}
      src={fallbackSrc}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      width={width}
      height={height}
      style={{
        ...style,
        width: size.width,
        height: 'auto',
        // Exact file ratio: the srcset variant's rounded size must not leak in
        aspectRatio: `${size.width} / ${size.height}`,
        // The stylesheet's max-height would distort a fixed-width box, so
        // express it as a width cap when it can bind.
        ...(heightCap < maxRenderedWidth && {
          maxWidth: `min(${COLUMN_SHARE * 100}%, ${heightCap}px)`,
        }),
      }}
      loading='lazy'
      decoding='async'
    />
  );
}

/**
 * Article body column: max-w-[869px], markdown images capped at 90% of it
 * (`.markdown img { max-width: 90% }` in Post.module.css).
 */
const ARTICLE_IMAGE_MAX_WIDTH = Math.ceil(869 * COLUMN_SHARE);
/** `.markdown img { max-height: 650px }` in Post.module.css. */
const ARTICLE_IMAGE_MAX_HEIGHT = 650;

/** markdown-to-jsx options for playbook article bodies. */
export const articleMarkdownOptions = (
  dimensions: ImageDimensionsMap,
): MarkdownToJSX.Options => ({
  overrides: {
    img: {
      component: MarkdownImage,
      props: {
        dimensions,
        maxRenderedWidth: ARTICLE_IMAGE_MAX_WIDTH,
        maxRenderedHeight: ARTICLE_IMAGE_MAX_HEIGHT,
      },
    },
  },
});
