'use client';

import {
    underscopeFormatter,
    underscopeReverter
} from '@/src/utils/formatter/underscopeFormatter';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

interface ICategoryProps {
  categories: ICategory[];
}

interface ICategory {
  category: string;
  subCategory: (string | null | undefined)[];
}

export const PlaybookCategoryDropDown = ({ categories }: ICategoryProps) => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const categoryContainer = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();
  const searcParams = useSearchParams();

  const pathnameArr = pathname.split('/').filter((item) => item !== '');

  const subCategory = searcParams.get('subCategory');

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        categoryContainer.current &&
        !categoryContainer.current.contains(event.target as Node)
      ) {
        setIsCategoryOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={categoryContainer}
      className='relative w-full whitespace-nowrap outline-none'
    >
      <button
        type='button'
        name='categoriesBtn'
        onClick={() => setIsCategoryOpen(!isCategoryOpen)}
        className='flex appearance-none items-center gap-[8px] font-proxima text-[12px] leading-[1.6] outline-none'
      >
        Categories:{' '}
        {pathname && pathnameArr.length === 1 ? (
          <span className='font-bold capitalize leading-[1.3] text-main-blue'>
            all
          </span>
        ) : pathnameArr.length === 2 && !subCategory ? (
          <span className='font-bold capitalize leading-[1.3] text-main-blue'>
            {pathnameArr[1]}
          </span>
        ) : (
          <span className='font-bold capitalize leading-[1.3] text-main-blue'>
            {underscopeReverter(subCategory)}
          </span>
        )}
      </button>
      <div
        className={`absolute left-[70px] z-[20] min-w-[171px] overflow-hidden rounded-[12px] bg-white transition-all duration-300 ease-in-out tablet:left-[auto] tablet:right-0`}
        style={{
          boxShadow: '0px 11.11px 44.46px 0px rgba(12, 16, 24, 0.12)',
          top: `${categoryContainer.current ? categoryContainer.current.offsetHeight + 11 + 'px' : '0'}`,
          maxHeight: isCategoryOpen ? '500px' : '0px',
        }}
      >
        <ul
          className={`flex flex-col gap-[10px] overflow-hidden p-[4px] font-proxima capitalize`}
        >
          <li className={`relative`}>
            <Link
              href='/playbook'
              className={`block w-full rounded-[8px] p-[12px_16px] text-left text-[14px] capitalize leading-[1.4] text-[#525760] hover:bg-[#f5f5f6] ${pathnameArr.length === 1 ? 'bg-[#f5f5f6] font-bold' : ''}`}
            >
              all
            </Link>
            <span className='absolute bottom-[-5px] block h-[2px] w-full translate-y-[50%] bg-main-disabled' />
          </li>
          {categories.map((item) => (
            <li
              key={item.category}
              className={`relative flex flex-col gap-[4px]`}
            >
              <Link
                href={`/playbook/${item.category}${item.subCategory.length > 1 ? '' : `?subCategory=${underscopeFormatter(item.subCategory[0]).toLowerCase()}`}&page=1`}
                className={`relative w-full rounded-[8px] p-[12px_16px] text-left text-[14px] capitalize leading-[1.4] text-[#525760] hover:bg-[#f5f5f6] ${pathnameArr.includes(item.category.trim().toLowerCase()) ? 'bg-[#f5f5f6] font-bold' : ''} `}
              >
                {item.category}
              </Link>
              <ul>
                {item.subCategory.map((el) => (
                  <li key={el} className={`flex flex-col gap-[2px]`}>
                    <Link
                      href={`/playbook/${item.category}?subCategory=${underscopeFormatter(el).toLowerCase()}`}
                      className={`w-full rounded-[8px] p-[12px_26px] text-left text-[14px] capitalize leading-[1.4] text-[#525760] hover:bg-[#f5f5f6] ${el && subCategory && underscopeReverter(subCategory).toLowerCase() === el.trim().toLowerCase() ? 'bg-[#f5f5f6] font-bold' : ''}`}
                    >
                      {el}
                    </Link>
                  </li>
                ))}
              </ul>
              <span className='absolute bottom-[-5px] left-0 block h-[2px] w-full translate-y-[50%] bg-main-disabled' />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
