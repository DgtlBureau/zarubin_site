'use client';

import { NextPrevBtn } from '@/src/ui-kit/NextPrevBtn/NextPrevBtn';
import { MenuItems } from '@/src/utils/enums';
import { sectionsTitle } from '@/src/utils/sectionsTitle/sectionsTitle';
import { Post } from '@/src/utils/types';
import useMediaQuery from '@/src/utils/useMediaQuery';
import { useState } from 'react';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { Container } from '../../shared/Container/Container';
import { Section } from '../../shared/Section/Section';
import { NewInsightsCard } from './NewInsightsCard/NewInsightsCard';

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
            <div className='flex flex-col gap-[15px]'>
              <h2 className='desktop-light::text-[50px] font-unbound text-[28px] font-bold uppercase text-main-bg tablet:text-[40px] desktop:text-[45px]'>
                {MenuItems.PLAYBOOK.toLowerCase()}
              </h2>
              <p className='font-proxima text-[18px] font-bold leading-[1.1] text-light-gray tablet:text-[20px] desktop:leading-[1]'>
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
                <NewInsightsCard
                  title={post.title}
                  description={post.description}
                  tag={post.tag}
                  slug={post.slug}
                  subCategory={post.subCategory}
                  image={post.image}
                  downloadLink={post.downloadLink}
                  date={post.date}
                  category={post.category}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </Container>
      </div>
    </Section>
  );
};
