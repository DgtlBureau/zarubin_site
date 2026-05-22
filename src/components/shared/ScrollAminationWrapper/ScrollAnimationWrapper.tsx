'use client';

import { motion } from 'framer-motion';
import { PropsWithChildren } from 'react';

export const ScrollAnimationWrapper = ({
  children,
  showOnLoad,
  className,
}: PropsWithChildren<{ showOnLoad?: boolean; className?: string }>) => {
  const animationProps = showOnLoad
    ? {
        initial: { opacity: 0, y: 40 },
        animate: { opacity: 1, y: 0 },
      }
    : {
        initial: { opacity: 0, y: 40 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.2 },
      };

  return (
    <motion.div
      {...animationProps}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
