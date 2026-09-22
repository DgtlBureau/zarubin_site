'use client';

import { REVANTA_BASE } from '@/src/data/revanta/routes';
import { usePathname } from 'next/navigation';
import { PropsWithChildren } from 'react';

/**
 * Hides the site-wide BrightByte chrome (header, footer) on /revanta pages:
 * Revanta renders its own header and footer from app/revanta/layout.tsx.
 */
export const HideOnRevanta = ({ children }: PropsWithChildren) => {
  const pathname = usePathname() ?? '';
  const isRevanta =
    pathname === REVANTA_BASE || pathname.startsWith(`${REVANTA_BASE}/`);
  return isRevanta ? null : <>{children}</>;
};
