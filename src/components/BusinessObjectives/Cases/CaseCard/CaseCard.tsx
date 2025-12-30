'use client';

import defaultLogo from '@/public/assets/images/case/svg/default-case-logo.svg';
import { NextLinePreposition } from '@/src/components/NextLinePreposition/NextLinePreposition';
import { MenuItems } from '@/src/utils/enums';
import { Case } from '@/src/utils/getCaseMetadata';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import styles from './CasesCard.module.css';
import { CaseTag } from './CaseTag/CaseTag';

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
            <p className='font-unbound text-[22px] font-bold leading-[1.15] text-white'>
              {data.name}
            </p>
            <div className='h-[50px] w-[auto]'>
              <Image
                src={logo ? logo : defaultLogo}
                alt={`${data.tag} logo`}
                height={50}
                width={120}
                className='h-full w-[auto]'
              />
            </div>
          </div>
          <NextLinePreposition
            tag='h2'
            text={data.title}
            className='font-unbound text-[18px] font-bold leading-[1.15] text-gray-400'
          />
          <p className='leading-1 font-proxima text-[16px]'>
            {data.description}
          </p>
        </div>
        <ul className='flex flex-wrap gap-[8px]'>
          {data.industries.map((item, idx) => (
            <li key={idx} className='relative w-fit'>
              <CaseTag tag={item} />
            </li>
          ))}
        </ul>
      </div>
    </Link>
  );
};
