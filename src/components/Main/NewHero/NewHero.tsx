'use client';

import { mainBanners } from '@/src/utils/DataLayers/MainBanners';
import { MenuItems } from '@/src/utils/enums';
import { DateTime } from 'luxon';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { Container } from '../../shared/Container/Container';
import { Section } from '../../shared/Section/Section';

export const NewHero = () => {
  const [swiper, setSwiper] = useState<SwiperClass | null>(null);
  const [slideIndex, setActiveSlideIndex] = useState<number>(0);

  const sortedBanners = useMemo(() => {
    return [...mainBanners].sort((a, b) => {
      const dateA = DateTime.fromFormat(a.date, 'dd-MM-yyyy');
      const dateB = DateTime.fromFormat(b.date, 'dd-MM-yyyy');
      return dateB.toMillis() - dateA.toMillis();
    });
  }, []);

  useEffect(() => {
    if (swiper) {
      const handleSlideChange = () => {
        setActiveSlideIndex(swiper.realIndex);
      };
      swiper.on('slideChange', handleSlideChange);
      return () => {
        swiper.off('slideChange', handleSlideChange);
      };
    }
  }, [swiper]);

  return (
    <Section
      light
      className={`relative bg-black p-0 pb-[40px] tablet:p-0 tablet:pb-[40px] desktop:p-0 desktop:pb-[60px]`}
    >
      <Swiper
        modules={[Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        onSwiper={setSwiper}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
      >
        {sortedBanners?.map((item) => (
          <SwiperSlide key={item.title}>
            <div
              className={`gradient-box h-[380px] duration-500 tablet:h-[465px] desktop:h-[589px] ${slideIndex === 0 || slideIndex % 2 === 0 ? 'after:left-0' : 'after:right-0'} after:duration-500`}
            >
              <Image
                src={item.image}
                fill
                objectFit='cover'
                objectPosition='center'
                alt=''
                className='-z-10 grayscale'
              />
              <Container className='flex h-full w-full flex-col justify-end pt-[40px] text-text-dark tablet:pt-[50px] desktop:z-50 desktop:pt-[67px]'>
                <h2 className='z-50 font-unbound text-[28px] font-bold uppercase leading-[1.16] tablet:text-[50px] tablet:leading-[1.1] desktop:text-[60px]'>
                  {item.title}
                </h2>
                {item?.description && (
                  <p className='z-50 font-proxima text-[20px] font-bold'>
                    {item.description}
                  </p>
                )}
              </Container>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <Container className='mt-[20px] flex flex-col items-start justify-between gap-[35px] tablet:mt-[30px] tablet:flex-row tablet:items-center desktop:mt-[40px]'>
        <Link
          href={
            sortedBanners[slideIndex].link
              ? sortedBanners[slideIndex].link
              : `/${MenuItems.CASES.toLowerCase()}`
          }
          className='z-30 rounded-[6px] bg-main-orange p-[5px_31px] font-proxima text-[20px] font-bold leading-[2] text-text-dark duration-300 hover:bg-main-orange-hover'
        >
          {sortedBanners[slideIndex].linkName
            ? sortedBanners[slideIndex].linkName
            : `/${MenuItems.CASES.toLowerCase()}`}
        </Link>
        <div className='z-30 flex w-full gap-[20px] tablet:max-w-[402px] desktop:max-w-[482px]'>
          {sortedBanners?.map((_, idx) => (
            <button
              key={idx}
              type='button'
              onClick={() => swiper?.slideTo(idx)}
              className='h-[3px] w-full bg-main-silver'
            >
              <span
                className={`block h-full bg-main-orange ${idx === slideIndex ? 'w-full transition-[width] duration-[3000ms] ease-linear' : 'w-0'}`}
              />
            </button>
          ))}
        </div>
      </Container>
    </Section>
  );
};
