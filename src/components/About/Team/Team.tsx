'use client';

import { NextPrevBtn } from '@/src/ui-kit/NextPrevBtn/NextPrevBtn';
import { TeamData } from '@/src/utils/DataLayers/TeamData';
import useMediaQuery from '@/src/utils/useMediaQuery';
import Image from 'next/image';
import { useState } from 'react';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Container } from '../../shared/Container/Container';
import styles from './Team.module.css';

export const Team = () => {
  const [swiper, setSwiper] = useState<SwiperClass | null>(null);
  const mediaQuery = useMediaQuery('<desktop');
  return (
    <div className='flex flex-col gap-[40px] desktop:flex-row desktop:justify-between desktop:gap-[auto]'>
      <div className='flex items-center justify-between desktop:flex-col desktop:items-start'>
        <div className='flex flex-col gap-[4px] desktop:gap-[32px]'>
          <h2 className='font-unbound text-[45px] font-bold uppercase leading-[1] tablet:text-[50px] desktop:text-[70px] desktop:leading-[1.1]'>
            Team
          </h2>
          <p className='text-stroke flex gap-[10px] whitespace-nowrap font-unbound text-[40px] font-bold uppercase leading-[1.1] desktop:text-[50px]'>
            20+ <span className='hidden tablet:block'>PEOPLE</span>
          </p>
        </div>
        <div className={styles.joinWrapper}>
          <p className='font-unbound text-[18px] font-bold uppercase leading-[1.1]'>
            Join our team
          </p>
        </div>
      </div>
      <div className='flex flex-col gap-[60px] desktop:w-[900px] desktop-light:w-[1100px] desktop-big:w-[1200px]'>
        <div className='hidden items-end justify-end desktop:flex'>
          <NextPrevBtn
            nextPage={() => swiper?.slideNext()}
            prevPage={() => swiper?.slidePrev()}
          />
        </div>
        <Container className={styles.swiperWrapper}>
          <Swiper
            spaceBetween={mediaQuery ? 20 : 41}
            slidesPerView='auto'
            onSwiper={setSwiper}
            className={styles.mainSwiper}
          >
            {TeamData.map((post, idx) => (
              <SwiperSlide key={idx} className={styles.item}>
                <div className={styles.imageBox}>
                  <Image
                    src={post.image}
                    width={306}
                    height={307}
                    alt={post.name}
                    quality={100}
                    className={styles.image}
                  />
                </div>
                <h3 className='mt-[12px] font-unbound text-[24px] font-bold uppercase leading-[1.16] desktop:mt-[20px] desktop:text-[28px]'>
                  {post.name}
                </h3>
                <p className='mt-[8px] font-proxima text-[20px] leading-[1.2] desktop:mt-[12px] desktop:text-[24px]'>
                  {post.job}
                </p>
              </SwiperSlide>
            ))}
          </Swiper>
        </Container>
      </div>
    </div>
  );
};