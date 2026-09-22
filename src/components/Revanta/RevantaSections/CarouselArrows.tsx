'use client';

import { ArrowLeft, ArrowRight } from 'lucide-react';

/** Prev/next buttons that scroll a horizontal strip by ~80% of its width. */
export const CarouselArrows = ({
  targetId,
  className = '',
}: {
  targetId: string;
  className?: string;
}) => {
  const scroll = (dir: 1 | -1) => {
    const el = document.getElementById(targetId);
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' });
  };

  const btn =
    'flex h-[48px] w-[48px] items-center justify-center rounded-full border border-revanta-ink/15 text-revanta-ink transition-colors hover:border-revanta-ink hover:bg-revanta-ink hover:text-white';

  return (
    <div className={`items-center gap-[10px] ${className}`}>
      <button
        type='button'
        aria-label='Previous'
        aria-controls={targetId}
        onClick={() => scroll(-1)}
        className={btn}
      >
        <ArrowLeft className='h-[18px] w-[18px]' aria-hidden='true' />
      </button>
      <button
        type='button'
        aria-label='Next'
        aria-controls={targetId}
        onClick={() => scroll(1)}
        className={btn}
      >
        <ArrowRight className='h-[18px] w-[18px]' aria-hidden='true' />
      </button>
    </div>
  );
};
