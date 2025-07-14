import LinkArrowIcon from '@/public/assets/images/icons/link_arrow.svg';
import solutionBg from '@/public/assets/images/main/hero-solutions-bg.webp';
import { MenuItems } from '@/src/utils/enums';
import Image from 'next/image';
import Link from 'next/link';

export const SuccessCard = () => {
  return (
    <div className='relative z-[5] overflow-hidden rounded-[5px] bg-gradient-to-br from-[#000A25] to-[#000A25]/60 bg-cover p-[20px]'>
      <h2 className='font-unbound text-[24px] font-bold uppercase leading-[1.16]'>
        Success {MenuItems.CASES}
      </h2>
      <p className='mt-[12px] font-proxima text-[20px] leading-[1.2] opacity-80'>{`The stories of solving our client's cases`}</p>
      <Link
        href={`/${MenuItems.CASES.toLowerCase()}`}
        className='mt-[40px] flex h-[30px] w-fit items-center justify-center gap-[10px] rounded-[6px] bg-main-blue px-[10px] font-proxima text-[18px] font-bold leading-[1.33] hover:bg-main-blue-hover tablet:h-[50px]'
      >
        Go to {MenuItems.CASES.toLowerCase()}
        <LinkArrowIcon className='h-[18px] w-[18px]' />
      </Link>
      <Image
        src={solutionBg}
        fill
        sizes='(min-width: 1440px) 539px, (min-width: 1200px) 100vw, (min-width: 790px) 100vw'
        alt='solution'
        className='absolute inset-0 z-[-1] w-full object-cover'
        quality={80}
        priority
      />
    </div>
  );
};
