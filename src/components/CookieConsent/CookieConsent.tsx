'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const GA_ID = 'G-FXGP2J4QFD';
const GA_SCRIPT_ID = 'ga-gtag';

const loadGoogleAnalytics = () => {
  if (document.getElementById(GA_SCRIPT_ID)) return;

  const script = document.createElement('script');
  script.id = GA_SCRIPT_ID;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  script.async = true;
  document.head.appendChild(script);

  const inlineScript = document.createElement('script');
  inlineScript.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GA_ID}');
  `;
  document.head.appendChild(inlineScript);
};

export const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const localConsent = localStorage.getItem('cookie_consent');
    const sessionConsent = sessionStorage.getItem('cookie_consent');

    if (localConsent === 'true') {
      loadGoogleAnalytics();
      return;
    }

    if (!localConsent && !sessionConsent) {
      setVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie_consent', 'true');
    setVisible(false);
    loadGoogleAnalytics();
  };

  const rejectCookies = () => {
    sessionStorage.setItem('cookie_consent', 'rejected');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className='fixed bottom-4 left-4 z-50 max-w-[320px] rounded-2xl border border-white/10 bg-header-bg/95 p-4 shadow-2xl backdrop-blur-xl'>
      <div className='flex items-start gap-3'>
        <span className='text-2xl'>🍪</span>
        <div className='flex-1'>
          <p className='mb-3 font-inter text-sm text-white/80'>
            This site uses cookies to improve your experience.{' '}
            <Link
              href='/policy'
              className='text-white underline underline-offset-2 hover:text-white/60'
            >
              Privacy Policy
            </Link>
          </p>
          <div className='flex gap-2'>
            <button
              type='button'
              onClick={acceptCookies}
              className='rounded-lg bg-main-orange px-4 py-1.5 font-inter text-xs font-semibold text-text-dark transition-all hover:bg-main-orange-hover'
            >
              Accept
            </button>
            <button
              type='button'
              onClick={rejectCookies}
              className='rounded-lg border border-white/20 px-4 py-1.5 font-inter text-xs font-medium text-white/70 transition-all hover:bg-white/5'
            >
              Decline
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
