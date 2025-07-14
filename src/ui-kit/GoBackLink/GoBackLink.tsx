'use client';

import Back from '@/public/assets/images/icons/back.svg';
import { MenuItems } from '@/src/utils/enums';
import { useRouter } from 'next/navigation';

export const GoBackLink = () => {
  const router = useRouter();

  return (
    <div className='absolute flex !h-full min-h-screen w-fit items-end'>
      <button
        onClick={() => router.push(`/${MenuItems.PLAYBOOK.toLowerCase()}`)}
        className='sticky bottom-4 left-0 z-[5] h-fit w-fit items-center gap-[10px] font-proxima text-[20px] font-bold text-text-dark desktop:flex'
      >
        <Back className='w-[24px]' />
        Back
      </button>
    </div>
  );
};
