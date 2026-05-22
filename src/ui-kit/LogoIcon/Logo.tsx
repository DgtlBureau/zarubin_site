import Link from 'next/link';

import LightLogoIcon from '@/public/assets/images/icons/logo_dark.svg';

export const Logo = () => {
  return (
    <Link aria-label='Go to the main page' href='/'>
      <LightLogoIcon className='h-[36px] w-[auto] desktop:h-[41px]' />
    </Link>
  );
};
