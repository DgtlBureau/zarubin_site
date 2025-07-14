'use client';

import { MenuItems } from '@/src/utils/enums';
import { underscopeReverter } from '@/src/utils/formatter/underscopeFormatter';
import { usePathname, useSearchParams } from 'next/navigation';

export const PlaybookHeading = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const subCategory = searchParams.get('sub-category');
  const tag = searchParams.get('tag');

  const pathnameArr = pathname.split('/').filter((item) => item !== '');
  const pathTitle =
    pathnameArr.length < 2
      ? `${MenuItems.PLAYBOOK.toLowerCase()}`
      : pathnameArr[1];

  return (
    <div>
      <h2 className='w-full text-center font-unbound text-[24px] uppercase leading-[1.16] tablet:text-[45px] tablet:leading-[1] laptop-big:text-start laptop-big:text-[45px]'>
        {pathTitle}{' '}
        <span className='text-[18px] leading-[1.3] text-main-blue tablet:text-[20px] tablet:leading-[1.2]'>
          {subCategory && `/ ${underscopeReverter(subCategory)}`}
        </span>{' '}
        <span className='text-[18px] leading-[1.3] text-main-blue tablet:text-[20px] tablet:leading-[1.2]'>
          {tag && `/ ${underscopeReverter(tag)}`}
        </span>
      </h2>
    </div>
  );
};
