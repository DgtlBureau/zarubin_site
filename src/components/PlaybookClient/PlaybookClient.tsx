'use client';

import SearchImage from '@/public/assets/images/icons/search.svg';
import { underscopeReverter } from '@/src/utils/formatter/underscopeFormatter';
import { Post } from '@/src/utils/types';
import useMediaQuery from '@/src/utils/useMediaQuery';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { Pagination } from '../Pagination/Pagination';
import { PlaybookCard } from './PlaybookCard/PlaybookCard';
import { PlaybookCategory } from './PlaybookCategory/PlaybookCategory';
import { PlaybookCategoryDropDown } from './PlaybookCategoryDropDown/PlaybookCategoryDropDown';

interface IArticle {
  data: Post[];
  category: Post[];
}

const postsPerPage = 8;

const getUniqueArticlesSubCategory = (array: Post[], word: string) => {
  const category = array.filter((item) => item.category.toLowerCase() === word);
  const subCategory = category.map((item) => item.subCategory);
  const uniqueSubCategory = subCategory.filter(
    (value, idx, arr) => arr.indexOf(value) === idx,
  );

  return {
    category: word,
    subCategory: uniqueSubCategory,
  };
};

export const PlaybookClient = ({ data, category }: IArticle) => {
  const [filteredData, setFilteredData] = useState(data);
  const [hasData, setHasData] = useState(true);
  const [inputValue, setInputValue] = useState('');

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const subCategory = searchParams.get('subCategory');
  const tag = searchParams.get('tag');

  const pathnameArr = pathname.split('/').filter((item) => item !== '');
  const pathTitle = pathnameArr.length < 2 ? 'all playbook' : pathnameArr[1];

  const [currentPage, setCurrentPage] = useState(1);
  const isLaptop = useMediaQuery('>=laptop-big');

  const isPaginationVisible = filteredData.length > postsPerPage;

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = filteredData.slice(firstPostIndex, lastPostIndex);

  const paginate = (postNumber: number) => {
    setCurrentPage(postNumber);
  };

  const nextPage = () => {
    if (currentPage >= filteredData.length / postsPerPage) return;
    setCurrentPage((prev) => prev + 1);
  };

  const prevPage = () => {
    if (currentPage <= 1) return;
    setCurrentPage((prev) => prev - 1);
  };

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
    const newFilteredData = data.filter((item) =>
      item.title.toLowerCase().includes(inputValue.toLowerCase()),
    );
    if (newFilteredData.length === 0) {
      setHasData(false);
    } else {
      setFilteredData(newFilteredData);
      setHasData(true);
    }
  }, [inputValue, data]);

  useEffect(() => {
    const subCategoryFilteredData = data.filter((item) => {
      if (!subCategory) return item;
      return (
        item.subCategory?.toLowerCase() ===
        underscopeReverter(subCategory).toLowerCase()
      );
    });

    const tagFilteredData = subCategoryFilteredData.filter((item) => {
      if (!tag) return item;
      if (!item.tag) return false;
      return item.tag
        .toLowerCase()
        .includes(underscopeReverter(tag).toLowerCase());
    });

    setFilteredData(tagFilteredData);
  }, [data, subCategory, tag]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ behavior: 'smooth', top: 0 });
    }
  }, [currentPage]);

  return (
    <div className='w-full px-[10px] py-[30px] tablet:px-[40px] laptop-big:py-[60px] desktop:px-[75px]'>
      <h2 className='w-full text-center font-unbound text-[24px] uppercase leading-[1.16] tablet:text-[45px] tablet:leading-[1] laptop-big:text-start laptop-big:text-[45px]'>
        {pathTitle}{' '}
        <span className='text-[18px] leading-[1.3] text-main-blue tablet:text-[20px] tablet:leading-[1.2]'>
          {subCategory && `/ ${underscopeReverter(subCategory)}`}
        </span>{' '}
        <span className='text-[18px] leading-[1.3] text-main-blue tablet:text-[20px] tablet:leading-[1.2]'>
          {tag && `/ ${underscopeReverter(tag)}`}
        </span>
      </h2>

      <div className='mt-[24px] flex flex-col gap-[24px] tablet:mt-[40px] tablet:gap-[40px]  laptop-big:mt-[80px] laptop-big:flex-row laptop-big:gap-[30px]'>
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
                    <PlaybookCategory category={articlesCategory} />
                  </div>
                ) : (
                  <PlaybookCategoryDropDown categories={articlesCategory} />
                )}
              </>
            )}
          </div>
        </div>
        <div className='flex w-full items-center'>
          {hasData ? (
            <ul>
              {currentPosts.map((item) => (
                <li
                  key={item.slug}
                  className='border-b-[1px] border-main-disabled p-[40px_0] first:pt-0'
                >
                  <PlaybookCard data={item} />
                </li>
              ))}
            </ul>
          ) : (
            <p className='ml-[80px] font-unbound text-[28px] text-text-dark'>
              Sorry, there is no data for your request
            </p>
          )}
        </div>
      </div>
      <div className='mt-[40px]'>
        {isPaginationVisible && hasData && (
          <Pagination
            currentPage={currentPage}
            postsPerPage={postsPerPage}
            postLength={filteredData.length}
            paginate={paginate}
            prevPage={prevPage}
            nextPage={nextPage}
          />
        )}
      </div>
    </div>
  );
};
