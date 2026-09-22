'use client';

import { motion } from 'framer-motion';
import { PropsWithChildren } from 'react';

/** Fade-in-up on scroll into view, plays once. `delay` staggers grids. */
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
  const animationProps = onLoad
    ? { initial: { opacity: 0 }, animate: { opacity: 1 } }
    : {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.2 },
      };

  return (
    <motion.div
      {...animationProps}
      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
