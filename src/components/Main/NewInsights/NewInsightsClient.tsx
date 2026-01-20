'use client';

import { ArticleCard } from '@/src/ui-kit/ArticleCard/ArticleCard';
import { NextPrevBtn } from '@/src/ui-kit/NextPrevBtn/NextPrevBtn';
import { MenuItems } from '@/src/utils/enums';
import { sectionsTitle } from '@/src/utils/sectionsTitle/sectionsTitle';
import { Post } from '@/src/utils/types';
import useMediaQuery from '@/src/utils/useMediaQuery';
import { useState } from 'react';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { Container } from '../../shared/Container/Container';
import { Section } from '../../shared/Section/Section';

interface Props {
  posts: Post[];
}

export const NewInsightsClient = ({ posts }: Props) => {
  const [swiper, setSwiper] = useState<SwiperClass | null>(null);

  const mobile = useMediaQuery('<tablet');
  const tablet = useMediaQuery('<laptop');
  const isStilTablet = useMediaQuery('>mobile');
  const isTablet = tablet === isStilTablet;

  return (
    <Section light>
      <div className='h-600 relative z-10 flex flex-col gap-[40px] pb-20'>
        <Container className=''>
          <div className='flex items-start justify-between desktop:items-center'>
            <div className='flex flex-col gap-[12px]'>
              <h2 className='font-proxima text-[13px] font-semibold uppercase tracking-[0.1em] text-text-muted tablet:text-[14px]'>
                {MenuItems.PLAYBOOK.toLowerCase()}
              </h2>
              <p className='font-proxima text-[14px] leading-[1.5] text-light-gray tablet:text-[15px]'>
                {`${sectionsTitle['main']['insights'].descripton}`}
              </p>
            </div>
            <div className=''>
              <NextPrevBtn
                nextPage={() => swiper?.slideNext()}
                prevPage={() => swiper?.slidePrev()}
                bg='light'
              />
            </div>
          </div>
        </Container>
        <Container className='flex max-w-full pr-0 tablet:pr-0'>
          <Swiper
            spaceBetween={mobile || isTablet ? 10 : 20}
            slidesPerView={mobile ? 1 : isTablet ? 1.56 : 3}
            onSwiper={setSwiper}
          >
            {posts.map((post, idx) => (
              <SwiperSlide key={idx}>
                <ArticleCard
                  href={`/${MenuItems.PLAYBOOK.toLowerCase()}/${post.category?.toLowerCase()}/${post.slug}`}
                  title={post.title}
                  description={post.description}
                  tag={post.tag}
                  image={post.image}
                  date={post.date}
                  downloadLink={post.downloadLink}
                  showDownloadLink={post.subCategory === 'Research'}
                  size='sm'
                  showTagsOverlay={true}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </Container>
      </div>
    </Section>
  );
};
