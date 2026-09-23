'use client';

import { cn } from '@/src/lib/utils';
import { motion } from 'framer-motion';
import { PropsWithChildren } from 'react';

/**
 * Fade-in-up on scroll into view, plays once. `delay` staggers grids.
 * `onLoad` (above-the-fold content) is a CSS fade that plays from first paint,
 * so the content does not stay hidden until hydration.
 */
export const Reveal = ({
  children,
  onLoad,
  className,
  delay = 0,
}: PropsWithChildren<{
  onLoad?: boolean;
  className?: string;
  delay?: number;
}>) => {
  if (onLoad) {
    return (
      <div
        className={cn(
          'animate-reveal-fade motion-reduce:animate-none',
          className,
        )}
        style={delay ? { animationDelay: `${delay}s` } : undefined}
      >
        {children}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
