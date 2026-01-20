'use client';

import Arrow from '@/public/assets/images/icons/arrow.svg';
import { ArticleCard } from '@/src/ui-kit/ArticleCard/ArticleCard';
import { Post } from '@/src/utils/types';
import useMediaQuery from '@/src/utils/useMediaQuery';
import { useState } from 'react';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';

interface Props {
  slug?: string;
  posts: Post[];
}

export const Featured = ({ slug, posts }: Props) => {
  const [swiper, setSwiper] = useState<SwiperClass | null>(null);

  const isMobile = useMediaQuery('<tablet');

  return (
    <div className='flex flex-col gap-[40px] border-t-[1px] border-text-dark'>
      <div className='relative flex items-center justify-between border-text-dark pt-[20px] before:absolute before:left-0 before:top-0 before:h-[1px] before:w-full before:bg-text-gray'>
        {slug && (
          <p className='font-proxima text-[14px] font-semibold uppercase tracking-[0.05em] text-text-dark tablet:text-[15px]'>
            Featured
          </p>
        )}
        <div className='flex items-center gap-[16px]'>
          <button
            type='button'
            className='flex h-[44px] w-[44px] items-center justify-center rounded-[6px] bg-main-blue hover:bg-main-blue-hover'
            onClick={() => swiper?.slidePrev()}
          >
            <Arrow className='rotate-[180deg] fill-white' />
          </button>
          <button
            type='button'
            className='flex h-[44px] w-[44px] items-center justify-center rounded-[6px] bg-main-blue hover:bg-main-blue-hover'
            onClick={() => swiper?.slideNext()}
          >
            <Arrow className='fill-white' />
          </button>
        </div>
      </div>
      <Swiper
        onSwiper={setSwiper}
        slidesPerView={isMobile ? 1 : 2}
        spaceBetween={24}
        className='max-w-full'
        wrapperClass='items-stretch'
      >
        {posts
          .filter((post) => post.slug !== slug)
          .map((item) => (
            <SwiperSlide key={item.slug} className='!h-auto'>
              <ArticleCard
                href={item.slug}
                tag={item.tag || ''}
                title={item.title}
                description={item.description}
                date={item.date}
                image={item.image}
                size='md'
                showTagsOverlay={true}
              />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};
