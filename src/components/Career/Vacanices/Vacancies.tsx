'use client';

import { NextPrevBtn } from '@/src/ui-kit/NextPrevBtn/NextPrevBtn';
import { useState } from 'react';
import { VacanciesCard } from './VacanicesCard/VacanciesCard';
import { VacanciesData } from '@/src/utils/DataLayers/VacanciesData';
import { Tag } from '../../shared/Tag/Tag';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import useMediaQuery from '@/src/utils/useMediaQuery';

export const Vacancies = () => {
  const [swiper, setSwiper] = useState<SwiperClass | null>(null);

  const tablet = useMediaQuery('<desktop');

  const [selectedTag, setSelectedTag] = useState('All');

  const tags = new Set(VacanciesData.flatMap((item) => item.tags));

  const filteredVacanicesData = VacanciesData.filter(
    (item) => selectedTag === 'All' || item.tags.includes(selectedTag),
  );

  return (
    <div className='flex flex-col gap-[30px]'>
      <div className='flex items-start justify-between'>
        <h2 className='font-unbound text-[45px] font-bold uppercase leading-[1] tablet:text-[50px] tablet:leading-[1.3] desktop:text-[70px] desktop:leading-[1.1]'>
          Active vacancies
        </h2>
        <div className='hidden items-center gap-[16px] tablet:flex'>
          <NextPrevBtn
            nextPage={() => swiper?.slideNext()}
            prevPage={() => swiper?.slidePrev()}
          />
        </div>
      </div>
      <div>
        <div className='flex gap-[14px]'>
          <Tag selected={selectedTag === 'All'} onClick={setSelectedTag}>
            All
          </Tag>
          {[...tags].map((item) => (
            <Tag
              selected={selectedTag === item}
              key={item}
              onClick={setSelectedTag}
            >
              {item}
            </Tag>
          ))}
        </div>
      </div>
      <Swiper
        spaceBetween={20}
        slidesPerView={tablet ? 1 : 2}
        onSwiper={setSwiper}
        className='max-w-full'
        wrapperClass='items-stretch'
      >
        {filteredVacanicesData.map((item) => (
          <SwiperSlide key={item.id} className='!h-auto'>
            <VacanciesCard
              title={item.title}
              tags={item.tags}
              description={item.description}
              link={item.link}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
