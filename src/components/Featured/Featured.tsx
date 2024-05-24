'use client';

import Arrow from '@/public/assets/images/icons/arrow.svg';
import { contentTrimming } from '@/src/utils/contentTrimming';
import { Post } from '@/src/utils/types';
import Link from 'next/link';
import { useState } from 'react';
import { SmallBlogCard } from '../BlogCard/SmallBlogCard';

interface Props {
  slug?: string;
  posts: Post[];
}

export const Featured = ({ slug, posts }: Props) => {
  const visiblePost = posts.findIndex((item) => item.slug === slug);

  const [currentPage, setCurrentPage] = useState(
    visiblePost + 1 >= posts.length ? 1 : visiblePost + 1,
  );
  const [postsPerPage] = useState(2);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = posts.slice(firstPostIndex, lastPostIndex);

  const nextPage = () => {
    if (currentPage >= posts.length / postsPerPage) return;
    setCurrentPage((prev) => prev + 1);
  };

  const prevPage = () => {
    if (currentPage <= 1) return;
    setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className='flex flex-col gap-[40px] border border-t-4 border-text-dark'>
      <div className='relative flex items-center justify-between border-4 border-text-dark before:w-full before:absolute before:top-0 before:left-0 before:h-[1px] before:bg-text-gray'>
        <p className='font-unbound font-bold text-[24px] uppercase '>
          Featured
        </p>
        <div className='flex items-center gap-[16px]'>
          <button
            type='button'
            className='w-[50px] h-[50px] flex items-center justify-center rounded-[6px] bg-main-blue'
            onClick={prevPage}
          >
            <Arrow className='rotate-[180deg] fill-white' />
          </button>
          <button
            type='button'
            className='w-[50px] h-[50px] flex items-center justify-center rounded-[6px] bg-main-blue'
            onClick={nextPage}
          >
            <Arrow className='fill-white' />
          </button>
        </div>
      </div>
      <div className='flex flex-col gap-[20px] tablet:flex-row'>
        {currentPosts.map((item) => (
          <Link key={item.slug} href={`/${item.slug}`}>
            <SmallBlogCard
              tag={item.tag ? item.tag : ''}
              title={item.title}
              description={contentTrimming(item.description, 90)}
              date={item.date}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};