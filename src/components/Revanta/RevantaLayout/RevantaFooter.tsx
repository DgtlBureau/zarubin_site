import {
  REVANTA_BASE,
  REVANTA_LINKEDIN,
  REVANTA_PRODUCTS,
  revantaHref,
} from '@/src/data/revanta/routes';
import Link from 'next/link';
import { RevantaContainer } from '../ui/layout';
import { RevantaBrand } from '../ui/RevantaBrand';

const EMAIL = 'access@thebrightbyte.com';

const COLUMN_LABEL =
  'font-inter text-[13px] font-semibold uppercase tracking-[0.08em] text-white/40';
const LINK =
  'font-inter text-[16px] leading-[1.4] text-white/60 transition-colors duration-200 hover:text-white';

export const RevantaFooter = () => (
  <footer className='w-full bg-revanta-ink py-[56px] tablet:py-[64px] desktop:py-[72px]'>
    <RevantaContainer>
      <div className='grid grid-cols-1 gap-[44px] tablet:grid-cols-2 laptop:grid-cols-[1.5fr_1fr_1fr] laptop:gap-[48px]'>
        <div className='max-w-[360px]'>
          <RevantaBrand />
          <p className='mt-[22px] font-inter text-[17px] font-light leading-[1.6] text-white/55'>
            Sports club software by{' '}
            <Link href='/' className='text-white/80 hover:text-white'>
              The BrightByte
            </Link>
          </p>
          <a
            href={`mailto:${EMAIL}`}
            className='mt-[22px] inline-block font-inter text-[17px] text-white transition-colors duration-200 hover:text-white/60'
          >
            {EMAIL}
          </a>
        </div>

        <div>
          <span className={COLUMN_LABEL}>Products</span>
          <ul className='mt-[20px] flex flex-col gap-[14px]'>
            <li>
              <Link href={REVANTA_BASE} className={LINK}>
                Revanta
              </Link>
            </li>
            {REVANTA_PRODUCTS.map((p) => (
              <li key={p.slug}>
                <Link href={revantaHref(p.slug)} className={LINK}>
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <span className={COLUMN_LABEL}>Contacts</span>
          <ul className='mt-[20px] flex flex-col gap-[14px]'>
            <li>
              <a href={`mailto:${EMAIL}`} className={LINK}>
                {EMAIL}
              </a>
            </li>
            <li>
              <a
                href={REVANTA_LINKEDIN}
                target='_blank'
                rel='noopener noreferrer'
                className={LINK}
              >
                LinkedIn
              </a>
            </li>
          </ul>
          <div className='mt-[22px] flex items-center gap-[10px]'>
            <a
              href={REVANTA_LINKEDIN}
              target='_blank'
              rel='noopener noreferrer'
              aria-label='Revanta on LinkedIn'
              className='flex h-[44px] w-[44px] items-center justify-center rounded-full bg-white text-revanta-ink transition-opacity duration-200 hover:opacity-70'
            >
              <svg
                viewBox='0 0 24 24'
                fill='currentColor'
                className='h-[19px] w-[19px]'
                aria-hidden='true'
              >
                <path d='M4.98 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.64h.05c.53-.95 1.83-1.95 3.76-1.95 4.02 0 4.76 2.5 4.76 5.76V21h-4v-5.6c0-1.34-.03-3.06-1.9-3.06-1.9 0-2.19 1.45-2.19 2.96V21h-4V9Z' />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className='mt-[44px] flex flex-col gap-[12px] border-t border-white/10 pt-[22px] tablet:flex-row tablet:items-center tablet:justify-between'>
        <span className='font-inter text-[15px] leading-[1.3] text-white/40'>
          The BrightByte Capital LLC © 2026. All rights reserved.
        </span>
        <Link
          href='/policy'
          className='w-fit font-inter text-[15px] leading-[1.3] text-white/40 transition-colors duration-200 hover:text-white'
        >
          Privacy Policy
        </Link>
      </div>
    </RevantaContainer>
  </footer>
);
