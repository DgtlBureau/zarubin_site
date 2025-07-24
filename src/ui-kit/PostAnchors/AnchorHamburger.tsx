'use client';

import AnchorHamburgerIcon from '@/public/assets/images/icons/anchor-hamburger.svg';
import { useState } from 'react';
import { AnchorList } from './AnchorList';
import { IPostAnchorProps } from './PostAnchors';
import useMediaQuery from '@/src/utils/useMediaQuery';

export const AnchorHamburger = ({ data, mainAnchorData }: IPostAnchorProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const isDesctop = useMediaQuery('>=desktop');

  if (isDesctop) {
    return null;
  }

  return (
    <div className='sticky bottom-[50px] flex w-fit flex-col gap-[20px]'>
      {isOpen && <AnchorList data={data} mainAnchorData={mainAnchorData} />}
      <div className='w-fit overflow-hidden rounded-[8px] bg-white'>
        <button
          type='button'
          onClick={() => setIsOpen(!isOpen)}
          className={`${isOpen ? 'bg-hamburger-anchor' : 'bg-white'} p-[20px] text-white`}
        >
          <AnchorHamburgerIcon />
        </button>
      </div>
    </div>
  );
};
