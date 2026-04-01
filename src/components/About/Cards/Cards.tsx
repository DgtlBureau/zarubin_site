import { CardsData } from '@/src/utils/DataLayers/CardsData';
import classNames from 'classnames';
import Image from 'next/image';
import styles from './Cards.module.css';

export const Cards = () => {
  return (
    <div className='flex w-full flex-col gap-[20px] desktop:flex-row desktop:gap-[40px]'>
      {CardsData.map((item) => (
        <div key={item.id} className={styles.cardWrapper}>
          <h3 className='z-[5] w-fit rounded-[2px] bg-white p-[10px] font-unbound text-[22px] font-bold uppercase leading-[1] text-text-dark'>
            {item.tag}
          </h3>
          <p className='z-[5] mt-[8px] font-inter text-[20px] leading-[1.2]'>
            {item.title}
          </p>
          <Image
            src={item.image}
            width={320}
            height={270}
            alt={item.tag}
            quality={80}
            className={classNames(
              styles.image,
              item.id % 2 == 0 ? styles.teamImage : styles.tvImage,
            )}
          />
        </div>
      ))}
    </div>
  );
};
