'use client';

import { useEffect, useState } from 'react';

export const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const localConsent = localStorage.getItem('cookie_consent');
    const sessionConsent = sessionStorage.getItem('cookie_consent');

    if (!localConsent && !sessionConsent) {
      setVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie_consent', 'true');
    setVisible(false);

    const script = document.createElement('script');
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-FXGP2J4QFD';
    script.async = true;
    document.head.appendChild(script);

    const inlineScript = document.createElement('script');
    inlineScript.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-FXGP2J4QFD');
    `;
    document.head.appendChild(inlineScript);
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
          <p className='mb-3 font-proxima text-sm text-white/80'>
            This site uses cookies to improve your experience.
          </p>
          <div className='flex gap-2'>
            <button
              type='button'
              onClick={acceptCookies}
              className='rounded-lg bg-main-orange px-4 py-1.5 font-proxima text-xs font-semibold text-text-dark transition-all hover:bg-main-orange-hover'
            >
              Accept
            </button>
            <button
              type='button'
              onClick={rejectCookies}
              className='rounded-lg border border-white/20 px-4 py-1.5 font-proxima text-xs font-medium text-white/70 transition-all hover:bg-white/5'
            >
              Decline
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
