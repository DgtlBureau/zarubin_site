'use client';

import SearchImage from '@/public/assets/images/icons/search.svg';
import { MenuItems } from '@/src/utils/enums';
import { Post } from '@/src/utils/types';
import useMediaQuery from '@/src/utils/useMediaQuery';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useMemo, useState } from 'react';
import { PlaybookCategory } from '../PlaybookCategory/PlaybookCategory';
import { PlaybookCategoryDropDown } from '../PlaybookCategoryDropDown/PlaybookCategoryDropDown';

const normalizeSubCategory = (value: string | null | undefined): string => {
  if (!value) return '';
  // Normalize common variations (e.g., 'It Service' -> 'IT Service')
  return value
    .split(' ')
    .map((word) => {
      const lower = word.toLowerCase();
      // Handle known acronyms that should be uppercase
      if (lower === 'it') return 'IT';
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
};

const getUniqueArticlesSubCategory = (array: Post[], word: string) => {
  const category = array.filter((item) => item.category.toLowerCase() === word);
  const subCategory = category.map((item) => normalizeSubCategory(item.subCategory));
  // Deduplicate using case-insensitive comparison
  const seen = new Map<string, string>();
  subCategory.forEach((value) => {
    const key = value.toLowerCase();
    if (!seen.has(key)) {
      seen.set(key, value);
    }
  });
  const uniqueSubCategory = Array.from(seen.values());

  return {
    category: word,
    subCategory: uniqueSubCategory,
  };
};

interface ICategory {
  category: Post[];
}

export const CategoryComponent = ({ category }: ICategory) => {
  const isLaptop = useMediaQuery('>=laptop-big');
  const router = useRouter();
  const pathname = usePathname();
  const [inputValue, setInputValue] = useState('');
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search-query');

  const expertiseCategory = useMemo(
    () => getUniqueArticlesSubCategory(category, 'expertise'),
    [category],
  );
  const insightsCategory = useMemo(
    () => getUniqueArticlesSubCategory(category, 'insights'),
    [category],
  );

  const articlesCategory = [expertiseCategory, insightsCategory];

  useEffect(() => {
    const query = new URLSearchParams();
    if (inputValue === '') {
      query.set('search-query', '');
      return;
    }
    query.set('search-query', inputValue);
    router.push(`/${MenuItems.PLAYBOOK.toLowerCase()}?${query.toString()}`);
  }, [inputValue, router]);

  useEffect(() => {
    if (!searchQuery) {
      setInputValue('');
      return;
    }
    setInputValue(searchQuery);
  }, [pathname, searchQuery]);

  return (
    <div className='flex w-full flex-col gap-[12px] tablet:flex-row tablet:items-end tablet:gap-[64px] laptop-big:w-[30%] laptop-big:flex-col laptop-big:items-start laptop-big:gap-[10px]'>
      <div className='relative w-full laptop-big:w-full'>
        <input
          placeholder='Search article'
          value={inputValue}
          className='w-full border-b-[1px] border-main-blue py-[10px] text-[12px] outline-none tablet:text-[16px]'
          onChange={(e) => setInputValue(e.target.value)}
        />
        <SearchImage className='absolute right-0 top-[50%] w-[16px] translate-y-[-50%] fill-main-blue' />
      </div>
      <div className='flex flex-col items-start'>
        {articlesCategory && articlesCategory.length !== 0 && (
          <>
            {isLaptop ? (
              <div>
                <Suspense fallback={<div>Loading category....</div>}>
                  <PlaybookCategory category={articlesCategory} />
                </Suspense>
              </div>
            ) : (
              <Suspense fallback={<div>Loading category....</div>}>
                <PlaybookCategoryDropDown categories={articlesCategory} />
              </Suspense>
            )}
          </>
        )}
      </div>
    </div>
  );
};
