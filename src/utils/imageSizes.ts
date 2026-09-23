/**
 * `sizes` helpers for next/image. The browser picks the srcset candidate from
 * `sizes` x devicePixelRatio, so `sizes` must never be smaller than the width
 * the bitmap is actually drawn at, or the image gets blurrier.
 */

/** One layout range, active from `minWidth` (viewport px) up to the next one. */
export interface CoverBox {
  minWidth: number;
  /** Box width as a fraction of the viewport width (1 = 100vw). */
  vw?: number;
  /** Box width in px (instead of `vw`). */
  px?: number;
  /** Largest box height in px within this range... */
  height?: number;
  /** ...or the box's width / height ratio, for aspect-ratio boxes. */
  boxAspect?: number;
}

const px = (value: number) => `${Math.ceil(value)}px`;
const media = (minWidth: number, value: string) =>
  minWidth > 0 ? `(min-width: ${Math.ceil(minWidth)}px) ${value}` : value;

/**
 * `sizes` for an `object-fit: cover` image. When the box is taller than the
 * image's aspect ratio, cover scales the bitmap wider than the box
 * (drawn width = max(box width, box height x aspect ratio)), so a plain
 * `100vw` would under-fetch on phones. Emits media-query ranges only (no CSS
 * math functions) for the widest browser support.
 */
export function coverSizes(
  aspectRatio: number | undefined,
  boxes: CoverBox[],
): string {
  // Unknown ratio (remote image): assume it matches the box
  const ratio = aspectRatio ?? 0;
  const sorted = [...boxes].sort((a, b) => b.minWidth - a.minWidth);
  const entries: string[] = [];

  sorted.forEach((box, index) => {
    const upper =
      index === 0 ? Number.POSITIVE_INFINITY : sorted[index - 1].minWidth;

    if (box.boxAspect !== undefined) {
      // Box scales with its width, so cover grows it by a constant factor
      const factor = Math.max(1, ratio / box.boxAspect);
      const value =
        box.px !== undefined
          ? px(box.px * factor)
          : `${Math.ceil((box.vw ?? 1) * factor * 100)}vw`;
      entries.push(media(box.minWidth, value));
      return;
    }

    const scaledWidth = (box.height ?? 0) * ratio;
    if (box.px !== undefined) {
      entries.push(media(box.minWidth, px(Math.max(box.px, scaledWidth))));
      return;
    }
    const fraction = box.vw ?? 1;
    const vwValue = `${Math.round(fraction * 100)}vw`;
    // Viewport width from which the box width wins over the cover scaling
    const crossover = scaledWidth / fraction;
    if (crossover <= box.minWidth) {
      entries.push(media(box.minWidth, vwValue));
    } else if (crossover >= upper) {
      entries.push(media(box.minWidth, px(scaledWidth)));
    } else {
      entries.push(
        media(crossover, vwValue),
        media(box.minWidth, px(scaledWidth)),
      );
    }
  });
  return entries.join(', ');
}

/** Aspect ratio (width / height) of a static import or known dimensions. */
export const aspectOf = (image: { width: number; height: number }) =>
  image.width / image.height;

type Column = Pick<CoverBox, 'minWidth' | 'vw' | 'px'>;

/** Attach one box shape (aspect ratio or height) to every column range. */
export const withBox = (
  columns: readonly Column[],
  box: Pick<CoverBox, 'boxAspect' | 'height'>,
): CoverBox[] => columns.map((column) => ({ ...column, ...box }));

/**
 * Card grids used by cases, featured cases, expertise and product cards:
 * 1 column below tablet, 2 columns in the fixed 768px tablet container,
 * 2 fluid columns from laptop, 3 columns from desktop.
 */
export const CARD_GRID_COLUMNS: readonly Column[] = [
  { minWidth: 0, vw: 1 },
  { minWidth: 768, px: 360 },
  { minWidth: 1200, vw: 0.5 },
  { minWidth: 1440, vw: 0.34 },
];

/**
 * Article cards (ui-kit ArticleCard): envelope over all its placements
 * (home insights slider, cases insights slider, related articles, mobile menu).
 */
export const ARTICLE_CARD_COLUMNS: readonly Column[] = [
  { minWidth: 0, vw: 1 },
  { minWidth: 768, vw: 0.66 },
  { minWidth: 1200, vw: 0.5 },
  { minWidth: 1440, vw: 0.34 },
];

/** 16:9 thumbnail boxes (`aspect-[16/9]`). */
export const WIDESCREEN = 16 / 9;
/** 16:10 thumbnail boxes (`aspect-[16/10]`). */
export const WIDE = 16 / 10;
