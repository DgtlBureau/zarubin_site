'use client';

import { useEffect, useRef } from 'react';

export default function TestPage() {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const handler = (event: MessageEvent) => {
      if (event.data.iframeHeight && iframeRef.current) {
        iframeRef.current.style.height = event.data.iframeHeight + 'px';
      }
    };

    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, []);

  return (
    <div className='flex h-fit w-full items-center justify-center p-4'>
      <iframe
        ref={iframeRef}
        src='https://my.hcadmiral.pro/faq-iframe'
        className='w-1/2'
        scrolling='no'
        style={{ border: 'none', overflow: 'hidden' }}
      />
    </div>
  );
}
