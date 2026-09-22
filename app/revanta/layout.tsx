import { CookieConsent } from '@/src/components/CookieConsent/CookieConsent';
import { RevantaFooter } from '@/src/components/Revanta/RevantaLayout/RevantaFooter';
import { RevantaHeader } from '@/src/components/Revanta/RevantaLayout/RevantaHeader';
import React from 'react';

// Revanta pages carry their own header and footer; the BrightByte ones are
// hidden for /revanta paths by HideOnRevanta in the root layout. The site
// footer also hosts CookieConsent, so it is rendered here instead.
export default function RevantaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <RevantaHeader />
      <div className='flex flex-col overflow-x-clip bg-white'>{children}</div>
      <RevantaFooter />
      <CookieConsent />
    </>
  );
}
