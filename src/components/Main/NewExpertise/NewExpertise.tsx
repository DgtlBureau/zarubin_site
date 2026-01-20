'use client';

import { sectionsTitle } from '@/src/utils/sectionsTitle/sectionsTitle';
import Link from 'next/link';
import { NextLinePreposition } from '../../NextLinePreposition/NextLinePreposition';
import { Container } from '../../shared/Container/Container';
import { Section } from '../../shared/Section/Section';
import { ExpertiseCard } from './ExpertiseCard/ExpertiseCard';

interface IData {
  data: {
    title: string;
    description: string;
    logo: string;
    link?: string | undefined;
    linkTitle?: string | undefined;
    type?: string | undefined;
    image: string | undefined | null;
  }[];
}

export const NewExpertise = ({ data }: IData) => {
  if (!data) return null;

  const cardsData = data?.filter((item) => item.type === 'card');
  const mainCard = data?.find((item) => item.type === 'main');

  return (
    <Section light className='pt-[30px] tablet:pt-[40px]'>
      <Container>
        <NextLinePreposition
          text={`${sectionsTitle['main']['expertise'].title}`}
          tag={'h2'}
          className={
            'z-50 font-inter text-[13px] font-semibold uppercase tracking-[0.1em] text-text-dark/50 tablet:text-[14px]'
          }
        />
        <p className='mt-[8px] font-inter text-[14px] leading-[1.5] text-text-dark/60 tablet:text-[15px]'>
          {`${sectionsTitle['main']['expertise'].descripton}`}
        </p>
        <div className='mt-[40px] grid grid-cols-1 gap-[20px] tablet:grid-cols-2 desktop:grid-cols-3 desktop:gap-[40px]'>
          {cardsData.map((item, idx) => (
            <ExpertiseCard data={item} key={idx} idx={idx} />
          ))}
          <div
            className={`expertise-item flex flex-1 flex-col items-start gap-[57px] rounded-[5px] p-[30px] tablet:col-span-2 tablet:min-h-[186px] desktop:order-first`}
          >
            <div
              className={`z-20 mt-auto flex w-full flex-col gap-[20px] tablet:flex-row tablet:justify-between tablet:gap-0 laptop:items-end`}
            >
              <h3 className='font-inter text-[15px] font-medium leading-[1.4] text-white tablet:max-w-[400px] tablet:text-[16px] laptop:max-w-[550px]'>
                {mainCard?.title}
              </h3>
              <Link
                href={`/${mainCard?.link}`}
                className='h-fit w-fit whitespace-nowrap rounded-[8px] bg-main-orange p-[10px_16px] font-inter text-[13px] font-semibold leading-[1.3] text-text-dark duration-300 hover:bg-main-orange-hover tablet:p-[12px_20px] tablet:text-[14px]'
              >
                {mainCard?.linkTitle}
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};
