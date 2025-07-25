'use client';

import { useState } from 'react';
import { IPostAnchorProps } from './PostAnchors';

export const AnchorList = ({ data, mainAnchorData }: IPostAnchorProps) => {
  const [activeAnchor, setActiveAnchor] = useState('title');
  const handleSetHush = (value: string) => {
    setActiveAnchor(value);
    window.location.hash = `#${value}`;
  };

  return (
    <div className='shadow-anchor h-fit max-w-[320px] rounded-[8px] bg-white p-[20px] text-black'>
      <ul className='flex flex-col gap-[12px]'>
        <li className='flex items-center gap-[12px]'>
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
