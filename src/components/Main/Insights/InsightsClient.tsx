'use client';

import { ArticleCard } from '@/src/ui-kit/ArticleCard/ArticleCard';
import { NextPrevBtn } from '@/src/ui-kit/NextPrevBtn/NextPrevBtn';
import { MenuItems } from '@/src/utils/enums';
import { Post } from '@/src/utils/types';
import useMediaQuery from '@/src/utils/useMediaQuery';
import { useState } from 'react';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { Container } from '../../shared/Container/Container';

interface Props {
  posts: Post[];
}

export const InsightsClient = ({ posts }: Props) => {
  const [swiper, setSwiper] = useState<SwiperClass | null>(null);

  const mobile = useMediaQuery('<tablet');
  const tablet = useMediaQuery('<laptop');
  const isStilTablet = useMediaQuery('>mobile');
  const isTablet = tablet === isStilTablet;

  return (
    <div className='h-600 relative z-10 flex flex-col gap-[40px] pb-20'>
      <Container className='desktop-hard:px-[80px]'>
        <div className='flex items-center justify-between'>
          <h2 className='font-proxima text-[14px] font-semibold uppercase tracking-[0.1em] text-text-dark tablet:text-[15px]'>
            Insights
          </h2>
          <div className='hidden tablet:block'>
            <NextPrevBtn
              nextPage={() => swiper?.slideNext()}
              prevPage={() => swiper?.slidePrev()}
            />
          </div>
        </div>
      </Container>
      <Container className='flex max-w-full p-0 pl-[10px] tablet:p-0 tablet:pl-[40px] laptop:px-[40px] desktop-big:px-[80px]'>
        <Swiper
          spaceBetween={mobile ? 20 : 40}
          slidesPerView={mobile ? 1.13 : isTablet ? 1.56 : 3}
          onSwiper={setSwiper}
        >
          {posts.slice(0, 6).map((post, idx) => (
            <SwiperSlide key={idx}>
              <ArticleCard
                href={`/${MenuItems.PLAYBOOK.toLowerCase()}/insights/${post.slug}`}
                title={post.title}
                description={post.description}
                tag={post.tag}
                image={post.image}
                downloadLink={post.downloadLink}
                showDownloadLink={post.subCategory === 'Research'}
                size='md'
                showTagsOverlay={false}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </div>
  );
};
