import author from '@/public/assets/images/main/author.webp';
import Image from 'next/image';
import { PropsWithChildren, ReactNode } from 'react';

export const ContractFormTemplate = ({
  title,
  children,
}: PropsWithChildren<{ title: ReactNode }>) => {
  return (
    <div className='flex flex-col gap-[72px] desktop:flex-row'>
      <div className='flex flex-col justify-between gap-[40px]'>
        {title}
        <div className='flex flex-col gap-[40px] desktop-big:flex-row desktop-big:items-center'>
          <div className='inline-flex items-center justify-start gap-6'>
            <Image
              className='h-[119px] w-[119px] rounded-full border-2 border-blue-600'
              src={author}
              alt='fonuder'
            />
            <div className='flex max-w-full flex-col gap-1 laptop:max-w-[291px]'>
              <div className='font-inter text-[22px] font-bold leading-9 text-slate-900'>
                Vitaly Z.
              </div>
              <div className='font-inter text-[16px] font-normal leading-[29.77px] text-slate-900'>
                «The road arises under the steps of walking»
              </div>
              <div className='inline font-inter text-[18px] font-bold leading-9 text-slate-900 laptop:hidden'>
                access@thebrightbyte.com
              </div>
            </div>
          </div>
          <div className='hidden font-inter text-[18px] font-bold leading-9 text-slate-900 laptop:inline'>
            access@thebrightbyte.com
          </div>
        </div>
      </div>
      <div className='w-full shrink-0 desktop:w-[710px]'>{children}</div>
    </div>
  );
};
