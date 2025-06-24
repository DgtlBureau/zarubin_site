'use client';

import { useEffect, useState } from 'react';

export const ReadingProgressBar = () => {
  const [scrollTop, setScrollTop] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const winScroll =
        document.documentElement.scrollTop || document.body.scrollTop;
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      const scrolled = (winScroll / height) * 100;
      setScrollTop(scrolled);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className='fixed left-0 top-[100px] z-50 h-1 w-full bg-none'>
      <div
        className='h-full bg-orange-light transition-all duration-150'
        style={{ width: `${scrollTop}%` }}
      />
    </div>
  );
};
