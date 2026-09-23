'use client';

import { mainBanners } from '@/src/utils/DataLayers/MainBanners';
import { MenuItems } from '@/src/utils/enums';
import { useAfterLoadIdle } from '@/src/utils/useAfterLoadIdle';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Autoplay, EffectFade } from 'swiper/modules';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { Container } from '../../shared/Container/Container';
import { Section } from '../../shared/Section/Section';

export const NewHero = () => {
  const [swiper, setSwiper] = useState<SwiperClass | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  // Fade slides are stacked in the viewport, so `loading=lazy` cannot defer
  // them. Slides 2+ get their image only after the page is idle (well before
  // the first 7 s autoplay) or on the first slide change, whichever is first.
  const [restSlidesReady, setRestSlidesReady] = useState(false);
  useAfterLoadIdle(() => setRestSlidesReady(true));

  useEffect(() => {
    if (swiper) {
      const handleSlideChange = () => {
        setRestSlidesReady(true);
        setActiveIndex(swiper.realIndex);
      };
      swiper.on('slideChange', handleSlideChange);
      return () => swiper.off('slideChange', handleSlideChange);
    }
  }, [swiper]);

  return (
    <Section
      light
      className='relative -mt-[100px] bg-black p-0 tablet:p-0 desktop:p-0'
    >
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect='fade'
        fadeEffect={{ crossFade: false }}
        slidesPerView={1}
        onSwiper={setSwiper}
        autoplay={{ delay: 7000, disableOnInteraction: false }}
        speed={1500}
        loop={true}
      >
        {mainBanners.map((hero, index) => (
          <SwiperSlide key={hero.id}>
            <div className='relative h-[540px] overflow-hidden mobile-big:h-[560px] tablet:h-[660px] desktop:h-screen desktop:max-h-[960px] desktop:min-h-[700px]'>
              {(index === 0 || restSlidesReady) && (
                <Image
                  src={hero.image}
                  fill
                  sizes='100vw'
                  priority={index === 0}
                  fetchPriority={index === 0 ? 'high' : undefined}
                  alt={hero.title}
                  className='hero-media object-cover object-center'
                />
              )}
              <div className='absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30' />
              <div className='absolute inset-x-0 top-0 h-[180px] bg-gradient-to-b from-black/60 to-transparent' />

              <Container className='relative z-10 flex h-full w-full flex-col justify-end pb-[48px] tablet:pb-[72px] desktop:pb-[96px]'>
                {hero.tag && (
                  <span className='mb-[18px] w-fit rounded-full border border-white/20 bg-white/10 px-[16px] py-[7px] font-inter text-[13px] font-medium text-white/90 backdrop-blur-sm tablet:text-[15px]'>
                    {hero.tag}
                  </span>
                )}
                <h2 className='max-w-[90%] font-inter text-[36px] font-semibold leading-[1.08] tracking-[-0.02em] text-white mobile-big:max-w-[560px] mobile-big:text-[44px] tablet:max-w-[760px] tablet:text-[60px] desktop:max-w-[960px] desktop:text-[76px]'>
                  {hero.title}
                </h2>
                {hero?.description && (
                  <p className='mt-[16px] max-w-[90%] font-inter text-[17px] leading-[1.5] text-white/75 mobile-big:max-w-[520px] tablet:mt-[20px] tablet:max-w-[640px] tablet:text-[20px]'>
                    {hero.description}
                  </p>
                )}
                <Link
                  href={hero.link || `/${MenuItems.CASES.toLowerCase()}`}
                  className='mt-[28px] w-fit rounded-[8px] bg-white px-[24px] py-[13px] font-inter text-[15px] font-semibold text-gray-900 transition-all duration-200 hover:bg-white/90 tablet:mt-[36px] tablet:px-[30px] tablet:py-[15px] tablet:text-[17px]'
                >
                  {hero.linkName || MenuItems.CASES}
                </Link>

                {/* Dots below button, aligned left */}
                <div className='mt-[28px] flex gap-[8px]'>
                  {mainBanners.map((_, idx) => (
                    <button
                      key={idx}
                      type='button'
                      aria-label={`Show slide ${idx + 1} of ${mainBanners.length}`}
                      onClick={() => swiper?.slideTo(idx)}
                      className={`h-[8px] rounded-full transition-all duration-300 ${
                        idx === activeIndex
                          ? 'w-[32px] bg-white'
                          : 'w-[8px] bg-white/40 hover:bg-white/60'
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
