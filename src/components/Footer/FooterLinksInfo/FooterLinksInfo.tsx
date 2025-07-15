'use client';

import LightMainLogo from '@/public/assets/images/icons/footer_logo_dark.svg';
import LinkedInIcon from '@/public/assets/images/icons/linkedin.svg';
import useMediaQuery from '@/src/utils/useMediaQuery';
import Link from 'next/link';
import { AddressInfo } from './AddressInfo';

export const FooterLinksInfo = () => {
  const isMobile = useMediaQuery('<laptop-big');
  return (
    <div className='flex w-full flex-col justify-between'>
      <div className='flex flex-col text-white'>
        <div className='flex items-center justify-between'>
          <Link aria-label='Go to the main page' href='/'>
            <LightMainLogo className='h-[54px] w-[auto] tablet:h-[80px] desktop:h-[71px]' />
          </Link>
          {isMobile && (
            <Link
              target='_blank'
              rel='noopener'
              href='https://www.linkedin.com/company/thebrightbyte/'
            >
              <LinkedInIcon className='h-[32px] w-[auto]' />
            </Link>
          )}
        </div>
        <div className='mt-[24px] grid w-full grid-cols-1 tablet:mt-[40px] laptop:mt-[80px] laptop:grid-cols-2'>
          <Link
            href='mailto:access@thebrightbyte.com'
            className='flex h-full w-full items-center font-proxima text-[18px] font-bold text-white tablet:text-[20px] laptop:order-last laptop:justify-end desktop:text-[26px]'
          >
            access@thebrightbyte.com
          </Link>
          <AddressInfo />
        </div>
      </div>
      {!isMobile && (
        <div className='ml-auto flex items-start laptop:items-end'>
          <Link
            target='_blank'
            rel='noopener'
            href='https://www.linkedin.com/company/thebrightbyte/'
          >
            <LinkedInIcon className='h-[32px] w-[auto]' />
          </Link>
        </div>
      )}
    </div>
  );
};
