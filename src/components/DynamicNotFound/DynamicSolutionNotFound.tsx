import { MenuItems } from '@/src/utils/enums';
import Link from 'next/link';

export const DynamicSolutionNotFound = ({ slug }: { slug: string }) => {
  return (
    <div className='container mx-auto flex flex-col gap-[10px] text-center'>
      <h1 className='text-[46px] font-bold'>
        Page <span className='text-main-blue'>{slug}</span> Not Found
      </h1>
      <p className='text-[18px] tablet:text-[20px] desktop:text-[24px]'>
        The page you are looking for does not exist.
      </p>
      <p className='text-[18px] tablet:text-[24px] desktop:text-[28px]'>
        Back to{' '}
        <Link
          className='underline hover:text-main-blue'
          href={`/${MenuItems.CASES.toLowerCase()}`}
        >
          {MenuItems.CASES.toLowerCase()}
        </Link>
      </p>
      <p className='text-[18px] tablet:text-[24px] desktop:text-[28px]'>
        Back to{' '}
        <Link className='underline hover:text-main-blue' href={'/'}>
          main
        </Link>
      </p>
    </div>
  );
};
