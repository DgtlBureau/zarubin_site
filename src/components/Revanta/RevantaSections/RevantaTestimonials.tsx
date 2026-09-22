'use client';

import { REVANTA_TESTIMONIALS } from '@/src/data/revanta/testimonials';
import { useRef } from 'react';

const ARROW =
  'flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full border border-revanta-ink/15 text-revanta-ink transition-colors duration-200 hover:border-revanta-accent hover:bg-revanta-accent hover:text-white';

/**
 * Club testimonials, one at a time: club mark, quote, name and role.
 * Native horizontal scroll with snap, so swipe, keyboard and reduced motion work
 * without a carousel library.
 */
export const RevantaTestimonials = () => {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollByPage = (direction: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;
    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    track.scrollBy({
      left: direction * track.clientWidth,
      behavior: reduced ? 'auto' : 'smooth',
    });
  };

  return (
    <section className='bg-white py-[48px] tablet:py-[72px] desktop:py-[90px]'>
      <div className='mx-auto w-full max-w-[1480px] px-[16px] tablet:px-[40px]'>
        <div
          className='flex items-center gap-[12px] tablet:gap-[24px]'
          role='region'
          aria-roledescription='carousel'
          aria-label='Client testimonials'
        >
          <button
            type='button'
            onClick={() => scrollByPage(-1)}
            aria-label='Previous testimonial'
            className={ARROW}
          >
            <svg
              width='16'
              height='16'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              aria-hidden
            >
              <path d='m15 18-6-6 6-6' />
            </svg>
          </button>

          <div
            ref={trackRef}
            tabIndex={0}
            className='flex flex-1 snap-x snap-mandatory overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
          >
            {REVANTA_TESTIMONIALS.map((item) => (
              <figure
                key={item.name}
                className='m-0 flex w-full shrink-0 snap-center flex-col items-center px-[8px] text-center tablet:px-[24px]'
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.logo}
                  alt=''
                  aria-hidden
                  loading='lazy'
                  className='h-[56px] w-auto max-w-[150px] object-contain tablet:h-[64px]'
                />
                <blockquote className='mt-[28px] max-w-[46ch] text-pretty font-inter text-[22px] font-light leading-[1.35] tracking-[-0.01em] text-revanta-ink tablet:mt-[36px] tablet:text-[28px] desktop:text-[32px]'>
                  “{item.quote}”
                </blockquote>
                <figcaption className='mt-[24px] flex flex-col items-center gap-[6px] tablet:mt-[32px]'>
                  <span className='font-inter text-[14px] font-semibold uppercase tracking-[0.08em] text-revanta-ink'>
                    {item.name}
                  </span>
                  <span className='font-inter text-[16px] leading-[1.4] text-revanta-ink/50 tablet:text-[17px]'>
                    {item.role}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>

          <button
            type='button'
            onClick={() => scrollByPage(1)}
            aria-label='Next testimonial'
            className={ARROW}
          >
            <svg
              width='16'
              height='16'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              aria-hidden
            >
              <path d='m9 18 6-6-6-6' />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};
