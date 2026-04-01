import Link from 'next/link';
import { NextLinePreposition } from '../../NextLinePreposition/NextLinePreposition';

export const TitleContent = () => {
  return (
    <div className='z-[5] flex flex-col gap-[12px] tablet:gap-[24px] desktop:gap-[30px]'>
      <NextLinePreposition
        tag='h1'
        text='Business solutions and expertise'
        className='z-[5] break-words font-unbound text-[28px] font-bold uppercase leading-[1.14] tablet:text-[60px] tablet:leading-[1.1] desktop:text-[80px] desktop:font-black desktop-hard:text-[100px]'
      />
      <p className='z-[5] font-inter text-[28px] font-bold leading-[1.14] text-[#D1D1D1] tablet:text-[36px] tablet:leading-[1.1] desktop-hard:text-[40px]'>
        Digital business transformation
      </p>
      <Link
        href='/insights'
        className='z-[5] w-fit rounded-[6px] bg-[#7CFFCD] px-[32px] py-[13px] font-inter text-[20px] font-bold leading-[1] text-text-dark shadow-button transition-all duration-200 ease-in-out hover:scale-[0.99] hover:bg-[#a6ffdd] hover:shadow-none '
      >
        Go to Insights
      </Link>
    </div>
  );
};
