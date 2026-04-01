'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export const NotFound = () => {
  const router = useRouter();

  const pathname = usePathname();

  const handleBack = () => {
    router.back();
  };
  return (
    <div className='flex flex-col items-center justify-center gap-[10px] p-[0_10px] tablet:p-[0_20px] desktop:p-[0_40px]'>
      <h2 className='font-unbound text-[100px] font-bold tablet:text-[120px] desktop:text-[150px]'>
        404
      </h2>
      <h3 className='font-inter text-[18px] tablet:text-[24px] desktop:text-[28px]'>
        The page <span className='text-main-blue'>{pathname}</span> does not
        exist!
      </h3>
      <p className='text-[18px] tablet:text-[24px] desktop:text-[28px]'>
        Go to{' '}
        <button className='underline hover:text-main-blue' onClick={handleBack}>
          back
        </button>
      </p>
      <p className='text-[18px] tablet:text-[24px] desktop:text-[28px]'>
        Go to{' '}
        <Link className='underline hover:text-main-blue' href={'/'}>
          main page
        </Link>
      </p>
    </div>
  );
};
