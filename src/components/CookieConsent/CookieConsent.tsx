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
    <div className='z-20 flex flex-col items-center gap-[12px] bg-white p-[20px_20px] tablet:gap-[20px] laptop:flex-row desktop:justify-between desktop:p-[20px_80px]'>
      <p className='text-[12px] text-text-dark desktop:text-[14px] desktop-big:text-[16px]'>
        {
          'By clicking “Accept”, you agree to the storing of cookies on your device to enhance site navigation, analyze site usage, and assist in our marketing efforts.'
        }
      </p>
      <div className='flex flex-row gap-[12px]'>
        <button
          type='button'
          onClick={rejectCookies}
          className='h-[36px] w-[160px] rounded-[6px] font-proxima text-[18px] font-bold text-main-orange text-main-orange duration-300 hover:bg-main-orange hover:text-text-dark tablet:h-[46px] tablet:w-[220px] desktop-big:h-[54px] desktop-big:w-[263px] desktop-big:text-[24px]'
        >
          Cancel
        </button>
        <button
          type='button'
          onClick={acceptCookies}
          className='h-[36px] w-[160px] rounded-[6px] bg-main-orange font-proxima text-[18px] font-bold text-text-dark hover:bg-main-orange-hover tablet:h-[46px] tablet:w-[220px] desktop-big:h-[54px] desktop-big:w-[263px] desktop-big:text-[24px]'
        >
          Accept
        </button>
      </div>
    </div>
  );
};
