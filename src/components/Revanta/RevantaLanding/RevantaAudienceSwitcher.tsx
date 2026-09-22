'use client';

import { REVANTA_PRODUCTS, revantaHref } from '@/src/data/revanta/routes';
import { RevantaProductKey } from '@/src/data/revanta/routes';
import Link from 'next/link';
import { useRef, useState } from 'react';

export interface AudiencePanel {
  tab: string;
  product: RevantaProductKey;
  title: string;
  text: string;
  points: string[];
}

/**
 * "Who it suits" tabs on the hub: one tab per segment, the panel shows what
 * that segment runs in Revanta and links to the product page. Tablist pattern
 * with arrow-key navigation.
 */
export const RevantaAudienceSwitcher = ({
  panels,
}: {
  panels: AudiencePanel[];
}) => {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const current = panels[active];
  const product = REVANTA_PRODUCTS.find((p) => p.key === current.product)!;

  const onKeyDown = (e: React.KeyboardEvent) => {
    const last = panels.length - 1;
    let next: number | null = null;
    if (e.key === 'ArrowRight') next = active === last ? 0 : active + 1;
    if (e.key === 'ArrowLeft') next = active === 0 ? last : active - 1;
    if (e.key === 'Home') next = 0;
    if (e.key === 'End') next = last;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <div className='flex flex-col gap-[28px] tablet:gap-[36px]'>
      <div
        role='tablist'
        aria-label='Who Revanta suits'
        onKeyDown={onKeyDown}
        className='flex flex-wrap gap-[10px]'
      >
        {panels.map((panel, idx) => (
          <button
            key={panel.product}
            ref={(el) => {
              tabRefs.current[idx] = el;
            }}
            type='button'
            role='tab'
            id={`audience-tab-${panel.product}`}
            aria-selected={idx === active}
            aria-controls={`audience-panel-${panel.product}`}
            tabIndex={idx === active ? 0 : -1}
            onClick={() => setActive(idx)}
            className={`rounded-full border px-[18px] py-[9px] font-inter text-[15px] transition-colors duration-200 tablet:text-[16px] ${
              idx === active
                ? 'border-revanta-blue bg-revanta-blue text-white'
                : 'border-revanta-ink/15 text-revanta-ink/60 hover:border-revanta-ink/40 hover:text-revanta-ink'
            }`}
          >
            {panel.tab}
          </button>
        ))}
      </div>

      <div
        role='tabpanel'
        id={`audience-panel-${current.product}`}
        aria-labelledby={`audience-tab-${current.product}`}
        className='grid grid-cols-1 gap-[24px] rounded-[12px] border border-revanta-ink/[0.08] bg-white p-[28px] tablet:grid-cols-[1.2fr_1fr] tablet:gap-[48px] tablet:p-[40px]'
      >
        <div>
          <span className='font-inter text-[13px] font-semibold uppercase tracking-[0.08em] text-revanta-accent'>
            {product.name}
          </span>
          <h3 className='mt-[10px] font-inter text-[24px] font-medium leading-[1.2] text-revanta-ink tablet:text-[28px]'>
            {current.title}
          </h3>
          <p className='mt-[16px] max-w-[560px] font-inter text-[18px] leading-[1.5] text-revanta-ink/60'>
            {current.text}
          </p>
          <Link
            href={revantaHref(product.slug)}
            className='mt-[20px] inline-block font-inter text-[16px] font-medium text-revanta-ink underline decoration-revanta-ink/20 underline-offset-[6px] transition-colors hover:text-revanta-accent hover:decoration-revanta-accent'
          >
            Explore {product.name} →
          </Link>
        </div>
        <ul className='flex flex-col justify-center gap-[14px]'>
          {current.points.map((point) => (
            <li
              key={point}
              className='flex items-center gap-[12px] font-inter text-[17px] text-revanta-ink/75'
            >
              <span
                aria-hidden='true'
                className='flex h-[24px] w-[24px] shrink-0 items-center justify-center rounded-full bg-revanta-blue/10 text-[13px] text-revanta-blue'
              >
                ✓
              </span>
              {point}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
