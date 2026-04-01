'use client';

import React, { useEffect, useRef, useState } from 'react';

interface ICategoryProps {
  categories: ICategory[];
  onClick: (value: string) => void;
  setSelectedSubCategory: (value: string) => void;
  setSelectedTag: (value: string) => void;
  setCurrentPage: (value: number) => void;
  selectetCategory: string;
  selectetSubCategory: string;
}

interface ICategory {
  category: string;
  subCategory: (string | null | undefined)[];
}

export const CategoryDropDown = ({
  categories,
  onClick,
  setSelectedSubCategory,
  setSelectedTag,
  setCurrentPage,
  selectetCategory,
  selectetSubCategory,
}: ICategoryProps) => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const categoryContainer = useRef<HTMLDivElement | null>(null);

  const handleCategoryClick = (categortName: string) => {
    onClick(categortName);
    setSelectedSubCategory('');
    setSelectedTag('');
    setCurrentPage(1);
    setIsCategoryOpen(false);
  };

  const handleSubCategoryClick = (
    categortName: string,
    subCategoryName: string,
  ) => {
    onClick(categortName);
    setSelectedSubCategory(subCategoryName.toLowerCase());
    setSelectedTag('');
    setCurrentPage(1);
    setIsCategoryOpen(false);
  };

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
        className='flex appearance-none items-center gap-[8px] font-inter text-[12px] leading-[1.6] outline-none'
      >
        Categories:{' '}
        {selectetCategory && !selectetSubCategory ? (
          <span className='font-bold capitalize leading-[1.3] text-main-blue'>
            {selectetCategory}
          </span>
        ) : selectetCategory && selectetSubCategory ? (
          <span className='font-bold capitalize leading-[1.3] text-main-blue'>
            {selectetSubCategory}
          </span>
        ) : (
          ''
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
          className={`flex flex-col gap-[10px] overflow-hidden p-[4px] font-inter capitalize`}
        >
          <li className={`relative`}>
            <button
              name='all'
              type='button'
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                const target = e.target as HTMLButtonElement;
                handleCategoryClick(target.name);
              }}
              className={`w-full rounded-[8px] p-[12px_16px] text-left text-[14px] capitalize leading-[1.4] text-[#525760] hover:bg-[#f5f5f6] ${selectetCategory.trim().toLowerCase() === 'all' ? 'bg-[#f5f5f6] font-bold' : ''}`}
            >
              all
            </button>
            <span className='absolute bottom-[-5px] block h-[2px] w-full translate-y-[50%] bg-main-disabled' />
          </li>
          {categories.map((item) => (
            <li
              key={item.category}
              className={`relative flex flex-col gap-[4px]`}
            >
              <button
                type='button'
                name={item.category}
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  const target = e.target as HTMLButtonElement;
                  handleCategoryClick(target.name);
                }}
                className={`relative w-full rounded-[8px] p-[12px_16px] text-left text-[14px] capitalize leading-[1.4] text-[#525760] hover:bg-[#f5f5f6] ${selectetCategory.trim().toLowerCase() === item.category.trim().toLowerCase() ? 'bg-[#f5f5f6] font-bold' : ''} `}
              >
                {item.category}
              </button>
              <ul>
                {item.subCategory.map((el) => (
                  <li key={el} className={`flex flex-col gap-[2px]`}>
                    <button
                      type='button'
                      name={el ? el : ''}
                      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                        const target = e.target as HTMLButtonElement;
                        handleSubCategoryClick(item.category, target.name);
                      }}
                      className={`w-full rounded-[8px] p-[12px_26px] text-left text-[14px] capitalize leading-[1.4] text-[#525760] hover:bg-[#f5f5f6] ${selectetSubCategory.trim().toLowerCase() === el?.trim().toLowerCase() ? 'bg-[#f5f5f6] font-bold' : ''}`}
                    >
                      {el}
                    </button>
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
