'use client';

import { useState, useEffect } from 'react';
import { IPostAnchorProps } from './PostAnchors';

export const AnchorList = ({ data, mainAnchorData }: IPostAnchorProps) => {
  const [activeAnchor, setActiveAnchor] = useState('title');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveAnchor(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -66% 0px' }
    );

    // Observe the main title
    const mainElement = document.getElementById(mainAnchorData.anchor);
    if (mainElement) observer.observe(mainElement);

    // Observe all section headings
    data.forEach((item) => {
      const element = document.getElementById(item.anchor);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [data, mainAnchorData.anchor]);

  const handleSetHush = (value: string) => {
    setActiveAnchor(value);
    window.location.hash = `#${value}`;
  };

  return (
    <div className='h-fit max-w-[320px] rounded-[8px] bg-white p-[20px] text-black shadow-anchor'>
      <ul className='flex flex-col gap-[12px]'>
        <li key='title' className='flex items-center gap-[12px]'>
          {activeAnchor === mainAnchorData?.anchor && (
            <span className='mb-auto mt-auto block h-[2px] w-[18px] bg-main-blue' />
          )}
          <button
            type='button'
            onClick={() => handleSetHush(mainAnchorData?.anchor)}
            className={`${activeAnchor === mainAnchorData?.anchor ? 'font-bold' : 'font-regular text-anchor-gray hover:text-text-dark'} text-left font-proxima text-[16px] leading-[1.25] duration-300`}
          >
            {mainAnchorData.title}
          </button>
        </li>
        {data.map((item) => (
          <li key={item.anchor} className='flex items-center gap-[12px]'>
            {activeAnchor === item?.anchor && (
              <span className='block h-[2px] w-[18px] bg-main-blue' />
            )}
            <button
              type='button'
              onClick={() => handleSetHush(item.anchor)}
              className={`${activeAnchor === item?.anchor ? 'font-bold' : 'font-regular text-anchor-gray hover:text-text-dark'} text-left font-proxima text-[16px] leading-[1.25] duration-300`}
            >
              {item.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
