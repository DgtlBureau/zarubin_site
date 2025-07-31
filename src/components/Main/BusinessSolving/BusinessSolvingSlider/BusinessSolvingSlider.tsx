'use client';

import imageOne from '@/public/assets/images/main/bussiness_1.webp';
import imageTwo from '@/public/assets/images/main/bussines_2.webp';
import { Container } from '@/src/components/shared/Container/Container';
import { NextPrevBtn } from '@/src/ui-kit/NextPrevBtn/NextPrevBtn';
import { MenuItems } from '@/src/utils/enums';
import { Case } from '@/src/utils/getCaseMetadata';
import useMediaQuery from '@/src/utils/useMediaQuery';
import { useState } from 'react';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { BusinessSolvingCard } from '../BusinessSolvingCard/BusinessSolvingCard';

interface IData {
  data: Case[];
}

export const BusinessSolvingSlider = ({ data }: IData) => {
  const [swiper, setSwiper] = useState<SwiperClass | null>();

  const mobile = useMediaQuery('<tablet');
  const tablet = useMediaQuery('<laptop');
  const isStilTablet = useMediaQuery('>mobile');
  const isTablet = tablet === isStilTablet;

  const sliceData = [...data].slice(0, 4);

  const nextSlide = () => {
    if (swiper) swiper.slideNext();
  };
  const prevSlide = () => {
    if (swiper) swiper.slidePrev();
  };

  return (
    <div className='flex flex-col gap-[40px]'>
      <Container className='desktop-hard:px-[80px]'>
        <div className='flex items-start justify-between'>
          <h2 className='font-unbound text-[45px] font-bold uppercase leading-[1] tablet:text-[50px] tablet:leading-[1.3] desktop:text-[70px] desktop:leading-[1.1]'>
            Solving business problems
          </h2>
          <div className='hidden items-center gap-[16px] tablet:flex'>
            <NextPrevBtn nextPage={nextSlide} prevPage={prevSlide} />
          </div>
        </div>
      </Container>
      <Container className='max-w-full desktop-hard:px-[80px]'>
        <Swiper
          spaceBetween={mobile ? 20 : 40}
          slidesPerView={mobile ? 1.1 : isTablet ? 1 : 2}
          onSwiper={setSwiper}
          wrapperClass='items-stretch'
        >
          {sliceData.map((item, idx) => (
            <SwiperSlide className='!h-auto' key={item.slug}>
              <BusinessSolvingCard
                title={item.title}
                industries={item.industries}
                tag={item.tag}
                description={item.description}
                link={`${MenuItems.CASES.toLowerCase()}/${item.slug}`}
                image={idx % 2 !== 0 ? imageTwo : imageOne}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </div>
  );
};
