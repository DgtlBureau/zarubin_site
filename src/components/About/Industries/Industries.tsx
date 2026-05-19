'use client';

import carImage from '@/public/assets/images/about/car.webp';
import retailImage from '@/public/assets/images/about/cart.webp';
import retailImageActive from '@/public/assets/images/about/cart_active.webp';
import carImageActive from '@/public/assets/images/about/car_active.webp';
import mediaImage from '@/public/assets/images/about/cup.webp';
import mediaImageActive from '@/public/assets/images/about/cup_active.webp';
import serviceImage from '@/public/assets/images/about/lamp.webp';
import serviceImageActive from '@/public/assets/images/about/lamp_active.webp';
import sportImage from '@/public/assets/images/about/sport.webp';
import sportImageActive from '@/public/assets/images/about/sport_active.webp';
import { StaticImageData } from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import styles from './Industries.module.css';
import { IndustriesCard } from './IndustriesCard/IndustriesCard';
import { Welcome } from './Welcome/Welcome';

export interface IIndustries {
  id: number;
  title: string;
  description: string;
  link: string;
  image: StaticImageData;
  activeImage: StaticImageData;
}

const INDUSTRIES: IIndustries[] = [
  {
    id: 1,
    title: 'Car',
    description: 'digital products for Retail',
    link: '/expertise',
    image: carImage,
    activeImage: carImageActive,
  },
  {
    id: 2,
    title: 'Service',
    description: 'digital products for Service improvement',
    link: '/expertise',
    image: serviceImage,
    activeImage: serviceImageActive,
  },
  {
    id: 3,
    title: 'Media',
    description: 'digital products for Car industry',
    link: '/expertise',
    image: mediaImage,
    activeImage: mediaImageActive,
  },
  {
    id: 4,
    title: 'Retail',
    description: 'digital products for MEDIA & Entertainment',
    link: '/expertise',
    image: retailImage,
    activeImage: retailImageActive,
  },
  {
    id: 5,
    title: 'Sports',
    description: 'digital products for sports business',
    link: '/expertise',
    image: sportImage,
    activeImage: sportImageActive,
  },
];

export const Industries = () => {
  const [activeId, setActiveId] = useState<null | number>(null);
  return (
    <div className='flex flex-col gap-[40px] tablet:gap-[20px]'>
      <div className='flex flex-col desktop:flex-row desktop:items-center desktop:gap-[60px] desktop:px-[80px] desktop-hard:gap-[256px]'>
        <div>
          <h2 className='font-unbound text-[45px] font-bold uppercase leading-[1] tablet:text-[50px] tablet:leading-[1.3] desktop:text-[70px]'>
            Industries
          </h2>
          <p className='mt-[12px] font-inter text-[20px] leading-[1.2] tablet:text-[24px] desktop:mt-[24px] desktop:w-[532px]'>
            Our expertise covers all industries. We have the most experience in
            the sports, FMCG, E-commerce industries
          </p>
          <Link
            href='/expertise'
            className={`${styles.allIndustries} mt-[156px] hidden w-[240px] p-[54px_0_29px_27px] desktop:block`}
          >
            <p className='font-unbound text-[24px] font-bold uppercase leading-[1.16] '>
              All industries
            </p>
          </Link>
        </div>
        <div
          className={`${''} relative mb-[500px] mt-[40px] h-fit laptop:mb-[650px] desktop:mt-[60px] desktop:w-fit desktop-hard:mb-[900px]`}
        >
          {INDUSTRIES.map((item) => (
            <IndustriesCard
              key={item.id}
              data={item}
              activeId={activeId}
              setActiveId={setActiveId}
            />
          ))}
        </div>
      </div>
      <Welcome />
    </div>
  );
};
