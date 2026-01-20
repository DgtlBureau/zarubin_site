'use client';

import { mainBanners } from '@/src/utils/DataLayers/MainBanners';
import { MenuItems } from '@/src/utils/enums';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { Container } from '../../shared/Container/Container';
import { Section } from '../../shared/Section/Section';

export const NewHero = () => {
  const [swiper, setSwiper] = useState<SwiperClass | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (swiper) {
      const handleSlideChange = () => setActiveIndex(swiper.realIndex);
      swiper.on('slideChange', handleSlideChange);
      return () => swiper.off('slideChange', handleSlideChange);
    }
  }, [swiper]);

  return (
    <Section light className='relative bg-black p-0 tablet:p-0 desktop:p-0'>
      <Swiper
        modules={[Autoplay]}
        slidesPerView={1}
        onSwiper={setSwiper}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        speed={600}
        loop={true}
      >
        {mainBanners.map((hero, index) => (
          <SwiperSlide key={hero.id}>
            <div className='relative h-[280px] mobile-big:h-[260px] tablet:h-[340px] desktop:h-[380px]'>
              <Image
                src={hero.image}
                fill
                sizes='100vw'
                priority={index === 0}
                alt={hero.title}
                className='object-cover object-center'
              />
              <div className='absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30' />

              <Container className='relative z-10 flex h-full w-full flex-col justify-center'>
                {hero.tag && (
                  <span className='mb-[12px] w-fit rounded-full border border-white/20 bg-white/10 px-[12px] py-[5px] font-inter text-[10px] font-medium text-white/90 backdrop-blur-sm tablet:text-[11px]'>
                    {hero.tag}
                  </span>
                )}
                <h1 className='max-w-[90%] font-inter text-[22px] font-semibold leading-[1.2] tracking-[-0.02em] text-white mobile-big:max-w-[500px] mobile-big:text-[24px] tablet:max-w-[600px] tablet:text-[32px] desktop:max-w-[700px] desktop:text-[38px]'>
                  {hero.title}
                </h1>
                {hero?.description && (
                  <p className='mt-[10px] max-w-[90%] font-inter text-[13px] leading-[1.5] text-white/70 mobile-big:max-w-[400px] tablet:mt-[12px] tablet:max-w-[480px] tablet:text-[14px]'>
                    {hero.description}
                  </p>
                )}
                <Link
                  href={hero.link || `/${MenuItems.CASES.toLowerCase()}`}
                  className='mt-[18px] w-fit rounded-[6px] bg-white px-[16px] py-[8px] font-inter text-[12px] font-semibold text-gray-900 transition-all duration-200 hover:bg-white/90 tablet:mt-[20px] tablet:px-[20px] tablet:py-[10px] tablet:text-[13px]'
                >
                  {hero.linkName || MenuItems.CASES}
                </Link>

                {/* Dots below button, aligned left */}
                <div className='mt-[14px] flex gap-[6px]'>
                  {mainBanners.map((_, idx) => (
                    <button
                      key={idx}
                      type='button'
                      onClick={() => swiper?.slideTo(idx)}
                      className={`h-[6px] rounded-full transition-all duration-300 ${
                        idx === activeIndex
                          ? 'w-[20px] bg-white'
                          : 'w-[6px] bg-white/40 hover:bg-white/60'
                      }`}
                    />
                  ))}
                </div>
              </Container>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </Section>
  );
};
