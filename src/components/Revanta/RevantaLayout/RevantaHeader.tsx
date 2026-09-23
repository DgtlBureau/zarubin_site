'use client';

import { REVANTA_PRODUCTS, revantaHref } from '@/src/data/revanta/routes';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { RevantaContainer } from '../ui/layout';
import { RevantaBrand } from '../ui/RevantaBrand';

/**
 * Revanta's own header: transparent over the dark hero, turns into a solid
 * navy bar once the page is scrolled. Product nav on wide screens, a burger
 * menu below 1280px.
 */
export const RevantaHeader = () => {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 w-full border-b transition-all duration-300 ${
        solid
          ? 'border-white/10 bg-revanta-ink/90 backdrop-blur-md'
          : 'border-transparent bg-transparent'
      }`}
    >
      <RevantaContainer className='relative flex h-[76px] items-center tablet:h-[100px]'>
        <div className='shrink-0 tablet:pl-[24px]'>
          <RevantaBrand />
        </div>

        <nav aria-label='Revanta products' className='mx-auto w-fit'>
          <ul className='hidden justify-center gap-[36px] laptop-big:flex desktop:gap-[44px]'>
            {REVANTA_PRODUCTS.map((p) => {
              const href = revantaHref(p.slug);
              const active = pathname?.replace(/\/$/, '') === href;
              return (
                <li key={p.slug}>
                  <Link
                    href={href}
                    aria-current={active ? 'page' : undefined}
                    className='group relative font-inter text-[17px] leading-[1.87] text-white desktop:text-[18px]'
                  >
                    {p.name}
                    <span
                      className={`absolute bottom-0 left-0 h-[2px] bg-revanta-accent transition-all duration-200 group-hover:w-full ${
                        active ? 'w-full' : 'w-0'
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className='ml-auto flex shrink-0 items-center gap-[12px] pr-[4px] laptop-big:ml-0'>
          <button
            type='button'
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls='revanta-mobile-menu'
            onClick={() => setOpen((v) => !v)}
            className='flex h-[44px] w-[44px] items-center justify-center rounded-full border border-white/20 text-white laptop-big:hidden'
          >
            {open ? (
              <X className='h-[20px] w-[20px]' aria-hidden='true' />
            ) : (
              <Menu className='h-[20px] w-[20px]' aria-hidden='true' />
            )}
          </button>
        </div>
      </RevantaContainer>

      {open && (
        <div
          id='revanta-mobile-menu'
          className='border-t border-white/10 bg-revanta-ink laptop-big:hidden'
        >
          <RevantaContainer className='py-[16px]'>
            <ul className='flex flex-col'>
              {REVANTA_PRODUCTS.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={revantaHref(p.slug)}
                    onClick={() => setOpen(false)}
                    className='flex flex-col border-b border-white/10 py-[14px]'
                  >
                    <span className='font-inter text-[18px] text-white'>
                      {p.name}
                    </span>
                    <span className='mt-[2px] font-inter text-[14px] text-white/50'>
                      {p.slogan}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <a
              href='#contact'
              data-umami-event='book-demo'
              data-umami-event-place='mobile-menu'
              onClick={() => setOpen(false)}
              className='mt-[18px] inline-flex w-fit rounded-full bg-white px-[24px] py-[12px] font-inter text-[16px] font-medium text-revanta-ink'
            >
              Book a demo
            </a>
          </RevantaContainer>
        </div>
      )}
    </header>
  );
};
