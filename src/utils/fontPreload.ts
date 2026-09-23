import { preload } from 'react-dom';

/** Unbounded faces declared in app/globals.css (@font-face). Keep in sync. */
export const UNBOUNDED_FONT_FILES = {
  600: '/fonts/unbounded/Unbounded-SemiBold.woff2',
  700: '/fonts/unbounded/Unbounded-Bold.woff2',
  900: '/fonts/unbounded/Unbounded-Black.woff2',
} as const;

export type UnboundedWeight = keyof typeof UNBOUNDED_FONT_FILES;

/**
 * Preloads one Unbounded face for the current page only. Call it from the
 * component that renders Unbounded above the fold (e.g. a page H1), so pages
 * that do not show it above the fold do not pay for the download. `media`
 * lets responsive weights (font-bold -> desktop:font-black) preload only the
 * face the viewport will actually use.
 */
export const preloadUnbounded = (weight: UnboundedWeight, media?: string) => {
  preload(UNBOUNDED_FONT_FILES[weight], {
    as: 'font',
    type: 'font/woff2',
    crossOrigin: 'anonymous',
    media,
  });
};

/** Page H1 style `font-bold desktop:font-black` (desktop = 1440px in tailwind.config.ts). */
export const preloadUnboundedPageHeading = () => {
  preloadUnbounded(700, '(max-width: 1439.98px)');
  preloadUnbounded(900, '(min-width: 1440px)');
};
