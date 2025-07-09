import Arrow from '@/public/assets/images/icons/link_arrow.svg';
import TriangeIcon from '@/public/assets/images/icons/triangle.svg';
import { NextLinePreposition } from '@/src/components/NextLinePreposition/NextLinePreposition';
import { MenuItems } from '@/src/utils/enums';
import Link from 'next/link';

interface Props {
  title: string;
  link: string;
  data: Data[];
}

interface Data {
  id: number;
  title: string;
}

export const IndustriesCard = ({ title, data, link }: Props) => {
  const btnTitle = title.split(' ')[0];
  const moreThanFour = data.length > 4;

  return (
    <div className='z-20 flex h-full flex-col justify-between gap-[40px]'>
      <div className='z-20 flex flex-col gap-[40px]'>
        <NextLinePreposition
          tag='h2'
          text={title}
          className='break-words font-unbound text-[32px] font-bold uppercase leading-[1] text-text-dark mobile-big:text-[45px] tablet:w-[75%] tablet:text-[50px] laptop:w-[60%] desktop:w-[80%] desktop:text-[80px] desktop-hard:text-[100px]'
        />
        <ul
          className={`flex flex-col gap-x-[40px] gap-y-[20px] ${moreThanFour && 'tablet:inline-grid tablet:grid-cols-[min-content,min-content]'}`}
        >
          {data.map((item) => (
            <li key={item.id} className='flex items-center gap-[20px]'>
              <TriangeIcon className='h-[18px] w-[18px]' />
              <p className='relative text-nowrap font-proxima text-[20px] leading-[1.2] text-text-dark desktop:text-[28px]'>
                {item.title}
              </p>
            </li>
          ))}
        </ul>
      </div>
      <Link
        href={link}
        className='ml-[5px] flex w-fit items-center justify-center gap-[10px] rounded-[5px] bg-main-blue p-[13px_15px] font-proxima text-[20px] font-bold text-white transition hover:bg-main-blue-hover tablet:mt-[92px] tablet:h-[112px] tablet:min-w-[407px] tablet:text-[40px] desktop:mt-[20px]'
      >
        {`${btnTitle} ${MenuItems.CASES.toLowerCase()}`}
        <Arrow className='h-[24px] w-[24px] tablet:h-[auto] tablet:w-[44px]' />
      </Link>
    </div>
  );
};
