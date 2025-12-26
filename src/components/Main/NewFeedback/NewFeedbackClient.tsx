'use client';

import { NextPrevBtn } from '@/src/ui-kit/NextPrevBtn/NextPrevBtn';
import { sectionsTitle } from '@/src/utils/sectionsTitle/sectionsTitle';
import { IFeedback } from '@/src/utils/types';
import { DateTime } from 'luxon';
import dynamic from 'next/dynamic';
import { Suspense, useMemo, useState } from 'react';
import { SwiperClass } from 'swiper/react';
import { Container } from '../../shared/Container/Container';

interface Props {
  feedback: IFeedback[];
}

const LazyFeedbackSwiper = dynamic(
  () => import('./NewFeedbackSwiper/NewFeedbackSwiper'),
);

export const NewFeedbackClient = ({ feedback }: Props) => {
  const [swiper, setSwiper] = useState<SwiperClass | null>(null);

  const sortedFeedbacks = useMemo(() => {
    return [...feedback].sort((a, b) => {
      const dateA = a.date ? DateTime.fromFormat(a.date, 'dd.MM.yyyy') : null;
      const dateB = b.date ? DateTime.fromFormat(b.date, 'dd.MM.yyyy') : null;

      if (!dateA && !dateB) return 0;
      if (!dateA) return 1;
      if (!dateB) return -1;

      return dateB.toMillis() - dateA.toMillis();
    });
  }, [feedback]);

  return (
    <div className='flex flex-col gap-[30px] overflow-hidden'>
      <Container className='w-full'>
        <div className='relative flex w-full items-start justify-between desktop:items-center'>
          <div className='flex flex-col gap-[16px]'>
            <h2 className='section-headings font-unbound font-bold uppercase  leading-[1.25] tablet:leading-[1.2] desktop:leading-[1.1]'>
              {`${sectionsTitle['main']['feedback'].title}`}
            </h2>
            <p className='font-proxima text-[18px] font-bold leading-[1.1] text-light-gray tablet:text-[20px] tablet:leading-[1.2] desktop:leading-[1]'>
              {`${sectionsTitle['main']['feedback'].descripton}`}
            </p>
          </div>

          <div className=''>
            <NextPrevBtn
              nextPage={() => swiper?.slideNext()}
              prevPage={() => swiper?.slidePrev()}
              bg='dark'
            />
          </div>
        </div>
      </Container>
      <Suspense fallback={<div></div>}>
        <Container className='overflow-visible'>
          <LazyFeedbackSwiper
            setSwiper={setSwiper}
            feedback={sortedFeedbacks}
          />
        </Container>
      </Suspense>
    </div>
  );
};
