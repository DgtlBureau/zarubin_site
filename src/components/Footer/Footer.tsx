import LightMainLogo from '@/public/assets/images/icons/light_logo.svg';
import { menuListLayer } from '@/src/utils/menuListLayer';
import Link from 'next/link';
import { Container } from '../shared/Container/Container';

export const Footer = () => {
  return (
    <footer className='w-full bg-main-bg py-[40px] text-[14px] leading-[1.2] tablet:py-[60px] desktop:text-[18px] desktop:leading-[1.1]'>
      <Container className='flex flex-col gap-[40px] tablet:gap-[40px] desktop:gap-[88px]'>
        <div className='flex w-full flex-col gap-[60px] desktop:flex-row desktop:items-center desktop:justify-between'>
          <ul className='flex-col gap-[20px] tablet:flex-row tablet:gap-[44px]'>
            {menuListLayer.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.link}
                  className='whitespace-nowrap border-main-blue font-proxima text-[16px] leading-[1.87] text-white hover:border-b-[2px]'
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className='flex flex-col items-start gap-[12px]'>
            <Link href='/'>
              <LightMainLogo className='h-[54px] w-[auto] tablet:h-[71px] desktop:h-[60px]' />
            </Link>
            <Link
              href='mailto:access@thebrightbyte.com'
              className='font-proxima text-[26px] font-bold text-white'
            >
              access@thebrightbyte.com
            </Link>
          </div>
        </div>
        <div className='w-full border-t-[2px] border-dark'>
          <span className='mb-[40px] block h-[2px] w-full bg-dark' />
          <ul className='flex flex-col gap-[20px] tablet:flex-row tablet:justify-between'>
            <li>
              <Link
                href='/policy'
                className='font-proxima text-[16px] leading-[1.1] text-white opacity-50 desktop:text-[26px]'
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <span className='font-proxima text-[16px] leading-[1.1] text-white opacity-50 desktop:text-[26px]'>
                &copy; Bright Byte
              </span>
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  );
};
