import { useEffect, useRef } from 'react';

/** Used where requestIdleCallback is missing (Safari). */
const IDLE_FALLBACK_DELAY_MS = 2000;

/**
 * Runs `callback` once, after the window `load` event and the next idle
 * period. For work that must not compete with the first render (secondary
 * images, below-the-fold chunks, third-party widgets).
 */
export const useAfterLoadIdle = (callback: () => void) => {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useEffect(() => {
    let idleId: number | undefined;
    let timeoutId: number | undefined;

    const run = () => callbackRef.current();
    const schedule = () => {
      if (typeof window.requestIdleCallback === 'function') {
        idleId = window.requestIdleCallback(run);
      } else {
        timeoutId = window.setTimeout(run, IDLE_FALLBACK_DELAY_MS);
      }
    };

    if (document.readyState === 'complete') schedule();
    else window.addEventListener('load', schedule, { once: true });

    return () => {
      window.removeEventListener('load', schedule);
      if (idleId !== undefined) window.cancelIdleCallback?.(idleId);
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    };
  }, []);
};
