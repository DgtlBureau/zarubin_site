'use client';

import { cn } from '@/src/lib/utils';
import { motion } from 'framer-motion';
import { PropsWithChildren } from 'react';

/**
 * Fade-up wrapper. Default: plays once when scrolled into view (framer-motion).
 * `showOnLoad` (above-the-fold content): the same fade-up as a CSS animation
 * that plays from first paint, so the content does not stay hidden until
 * hydration.
 */
export const ScrollAnimationWrapper = ({
  children,
  showOnLoad,
  className,
}: PropsWithChildren<{ showOnLoad?: boolean; className?: string }>) => {
  if (showOnLoad) {
    return (
      <div
        className={cn(
          'animate-fade-up-onload motion-reduce:animate-none',
          className,
        )}
      >
        {children}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
