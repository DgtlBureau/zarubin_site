'use client';

import { NextPrevBtn } from '@/src/ui-kit/NextPrevBtn/NextPrevBtn';
import { VacanciesData } from '@/src/utils/DataLayers/VacanciesData';
import useMediaQuery from '@/src/utils/useMediaQuery';
import { useState } from 'react';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { Tag } from '../../shared/Tag/Tag';
import styles from './Vacanices.module.css';
import { VacanciesCard } from './VacanicesCard/VacanciesCard';

export const Vacancies = ({
  withFilter = true,
  cardLink = false,
  withRowsBtn = true,
  isSwipe = true,
}) => {
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
        <h2 className='section-headings font-unbound font-bold uppercase leading-[1] tablet:leading-[1.3] desktop:leading-[1.1]'>
          Active vacancies
        </h2>
        {withRowsBtn && (
          <div className='hidden items-center gap-[16px] tablet:flex'>
            <NextPrevBtn
              nextPage={() => swiper?.slideNext()}
              prevPage={() => swiper?.slidePrev()}
            />
          </div>
        )}
      </div>
      <div>
        {withFilter && (
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
        )}
      </div>
      {!isSwipe ? (
        <div className={`max-w-full gap-[20px] ${styles.vacanciesGrid}`}>
          {filteredVacanicesData.map((item) => (
            <div key={item.id} className='vacancy-card'>
              <VacanciesCard
                title={item.title}
                tags={item.tags}
                description={item.description}
                link={item.link}
                cardLink={cardLink}
              />
            </div>
          ))}
        </div>
      ) : (
        <Swiper
          spaceBetween={20}
          slidesPerView={tablet ? 1 : 2}
          onSwiper={setSwiper}
          className='max-w-full'
          wrapperClass={`items-stretch `}
        >
          {filteredVacanicesData.map((item) => (
            <SwiperSlide key={item.id} className='!h-auto'>
              <VacanciesCard
                title={item.title}
                tags={item.tags}
                description={item.description}
                link={item.link}
                cardLink={cardLink}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};
