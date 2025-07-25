'use client';

import Back from '@/public/assets/images/icons/back.svg';
import { MenuItems } from '@/src/utils/enums';
import useMediaQuery from '@/src/utils/useMediaQuery';
import { useRouter } from 'next/navigation';

export const GoBackLink = () => {
  const router = useRouter();

  const isMobile = useMediaQuery('>=laptop');

  if (!isMobile) {
    return null;
  }

  return (
    <div className='sticky left-0 top-[70%] flex w-fit'>
      <button
        onClick={() => router.push(`/${MenuItems.PLAYBOOK.toLowerCase()}`)}
        className=' z-[5] h-fit w-fit items-center gap-[10px] font-proxima text-[20px] font-bold text-text-dark desktop:flex'
      >
        <Back className='w-[24px]' />
        Back
      </button>
    </div>
  );
};
