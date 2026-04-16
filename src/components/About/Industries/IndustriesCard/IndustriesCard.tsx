'use client';

import Arrow from '@/public/assets/images/icons/link_arrow.svg';
import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { IIndustries } from '../Industries';
import styles from './IndustriesCard.module.css';

interface Data {
  data: IIndustries;
  activeId: number | null;
  setActiveId: (id: number | null) => void;
}

export const IndustriesCard = ({ data, activeId, setActiveId }: Data) => {
  const { description, title, link, id, image, activeImage } = data;
  const topValue = id === 1 ? 0 : (id - 1) * 60;

  const handleClick = () => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <div
      className={classNames(styles.mainContainer, {
        [styles.active]: activeId === id,
      })}
      style={{
        top: `${topValue}px`,
        zIndex: id,
        // Mobile: left 0, Desktop: offset left by topValue
        // Using CSS custom property to avoid SSR/client mismatch
        ['--card-left-offset' as string]: `${topValue}px`,
      }}
      onClick={handleClick}
    >
      <div className={styles.contentWrapper}>
        <div className='flex justify-between'>
          <p className='font-unbound text-[18px] font-bold uppercase leading-[1.1] tablet:text-[24px]'>
            {description}
          </p>
          <Link href={link}>
            <Arrow className='h-[32px] w-[32px]' />
          </Link>
        </div>
        <h2 className='z-10 font-unbound text-[45px] font-bold uppercase leading-[1] tablet:text-[50px] desktop:text-[80px] desktop-hard:text-[100px]'>
          {title}
        </h2>
        <div className='absolute bottom-0 right-0 z-0 h-3/4 w-[70%] opacity-[80%] tablet:block desktop:right-[-20%] desktop:w-[90%] desktop:max-w-[900px]'>
          <Image
            src={activeId === id ? activeImage : image}
            alt={`${data.title} image`}
            fill
            priority
            className='object-contain object-right desktop:object-bottom'
          />
        </div>
      </div>
    </div>
  );
};
