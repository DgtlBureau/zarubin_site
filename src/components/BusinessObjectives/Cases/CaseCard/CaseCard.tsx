'use client';

import defaultLogo from '@/public/assets/images/case/svg/default-case-logo.svg';
import { NextLinePreposition } from '@/src/components/NextLinePreposition/NextLinePreposition';
import { MenuItems } from '@/src/utils/enums';
import { Case } from '@/src/utils/getCaseMetadata';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import styles from './CasesCard.module.css';

export const CaseCard = ({ data }: { data: Case }) => {
  const [logo, setLogo] = useState(data.logo);

  const handleMouseEnter = () => {
    if (!data.logo_hover) return;
    setLogo(data.logo_hover);
  };

  const handleMouseLeave = () => {
    setLogo(data.logo);
  };

  return (
    <Link
      href={`/${MenuItems.CASES.toLowerCase()}/${data.slug}`}
      className={styles.mainContainer}
      style={{
        backgroundImage: `url(${data.bannerImage})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={`${styles.contentContainer} relative z-30 flex h-full w-full flex-col justify-between`}
      >
        <div className='flex flex-col gap-[19px]'>
          <div className='flex items-center justify-between'>
            <div className='h-[35px] w-[auto]'>
              <Image
                src={logo ? logo : defaultLogo}
                alt={`${data.tag} logo`}
                height={35}
                width={120}
                className='h-full w-[auto]'
              />
            </div>
            <span
              className={`${styles.tag} inline-flex items-center justify-center self-stretch rounded-[5px] p-[10px] text-center font-proxima text-[16px] font-bold uppercase leading-[18px] text-white backdrop-blur-[20px] desktop-big:text-[21px]`}
            >
              {data.tag}
            </span>
          </div>
          <NextLinePreposition
            tag='h2'
            text={data.title}
            className='font-unbound text-[22px] font-bold uppercase leading-[1.15] text-white desktop-big:text-[38px]'
          />
        </div>
        <div className='flex flex-col gap-[8px]'>
          {data.industries.map((item, idx) => (
            <span
              key={idx}
              className='w-fit rounded-sm bg-white p-2.5 font-unbound text-[16px] font-bold uppercase leading-7 text-slate-900 desktop-big:text-[24px]'
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
};
