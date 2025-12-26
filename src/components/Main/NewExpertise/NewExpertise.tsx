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
    <Section light>
      <Container>
        <NextLinePreposition
          text={`${sectionsTitle['main']['expertise'].title}`}
          tag={'h2'}
          className={
            'section-headings z-50 font-unbound font-bold uppercase leading-[1.25] text-main-bg'
          }
        />
        <p className='mt-[15px] font-proxima text-[18px] font-bold leading-[1.1] text-light-gray tablet:text-[20px]'>
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
              className={`z-20 mt-auto flex w-full flex-col gap-[24px] tablet:flex-row tablet:justify-between tablet:gap-0 laptop:items-end`}
            >
              <h3 className='font-unbound text-[18px] font-bold uppercase leading-[1.1] text-white tablet:max-w-[302px] laptop:max-w-[652px] desktop:text-[20px]'>
                {mainCard?.title}
              </h3>
              <Link
                href={`/${mainCard?.link}`}
                className='h-fit w-fit whitespace-nowrap rounded-[6px] bg-main-orange p-[8px_10px] font-proxima text-[20px] font-bold leading-[1.3] text-text-dark duration-300 hover:bg-main-orange-hover tablet:p-[16px_28px] tablet:text-[24px] tablet:leading-[1.16] desktop-big:p-[13px_32px] desktop-big:text-[36px]'
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
