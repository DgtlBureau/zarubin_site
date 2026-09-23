'use client';

import { REVANTA_IMAGES } from '@/src/data/revanta/routes';
import { RevantaFeature } from '@/src/data/revanta/types';
import { X } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { RevantaIcon } from '../RevantaIcons';
import { Reveal } from '../ui/Reveal';

const LABEL_CLASS =
  'font-inter text-[13px] font-semibold uppercase tracking-[0.08em]';

const NODE_CLASS =
  'flex h-[52px] w-[52px] items-center justify-center rounded-[14px] border bg-white';

/**
 * Левый круг — «сегодня»: те же работы, но в разных системах. Узлы сбиты с
 * кольца, кольцо рваное, на разрывах стоят красные крестики, в центре написано,
 * что это другая система. Ничего не крутится.
 */
const BrokenSystem = ({ items }: { items: RevantaFeature[] }) => (
  <div className='relative mx-auto aspect-square w-full max-w-[500px] rounded-[12px] bg-white/[0.03]'>
    <span
      aria-hidden='true'
      className='absolute inset-[15%] rounded-full border border-dashed border-white/20'
    />

    {/* Связи нарисованы по той же геометрии, что и узлы: линия идёт от узла к
        центру, но уходит вбок и обрывается на полпути — там и стоит крестик.
        Раньше это были случайные дуги, и они читались как мусор. */}
    <svg
      aria-hidden='true'
      className='absolute inset-0 h-full w-full'
      viewBox='0 0 100 100'
      fill='none'
    >
      {items.map((feature, idx) => {
        const step = 360 / items.length;
        const drift = [-9, 7, -5, 10, -8, 6, -11, 4, 8][idx % 9];
        const from = ((step * idx + drift - 90) * Math.PI) / 180;
        /* Линия уходит мимо центра: на 7° вбок и обрывается на трети радиуса. */
        const to = from + (idx % 2 ? 0.12 : -0.12);
        const x1 = 50 + Math.cos(from) * 31;
        const y1 = 50 + Math.sin(from) * 31;
        const x2 = 50 + Math.cos(to) * 25;
        const y2 = 50 + Math.sin(to) * 25;
        return (
          <line
            key={`link-${feature.title}`}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke='#FF7A6B'
            strokeOpacity='0.55'
            strokeWidth='0.5'
            strokeDasharray='2 2'
          />
        );
      })}
    </svg>

    <div className='absolute inset-[29%] flex flex-col items-center justify-center rounded-full border border-white/10 bg-white/[0.06] px-[18px] text-center'>
      <span className={`${LABEL_CLASS} text-white/45`}>Today</span>
      <p className='mt-[10px] font-inter text-[18px] font-medium leading-[1.25] text-white/80'>
        A different system for every job
      </p>
      <p className='mt-[8px] font-inter text-[14px] leading-[1.45] text-white/45'>
        Nothing is connected
      </p>
    </div>

    {items.map((feature, idx) => {
      const step = 360 / items.length;
      /* Разброс детерминированный: иначе вёрстка прыгает между рендерами. */
      const drift = [-9, 7, -5, 10, -8, 6, -11, 4, 8][idx % 9];
      const angle = step * idx + drift;
      return (
        <div
          key={feature.title}
          className='absolute inset-0'
          style={{ transform: `rotate(${angle}deg)` }}
        >
          <div
            className='absolute left-1/2 top-[15%]'
            style={{ transform: 'translate(-50%, -50%)' }}
          >
            <div style={{ transform: `rotate(${-angle}deg)` }}>
              <span
                className={`${NODE_CLASS} border-white/10 bg-white/[0.06] text-white/70`}
              >
                {feature.icon && <RevantaIcon name={feature.icon} />}
              </span>
            </div>
          </div>
        </div>
      );
    })}

    {/* Крестик стоит там, где связь обрывается, а не между узлами. */}
    {items.map((feature, idx) => {
      const step = 360 / items.length;
      const drift = [-9, 7, -5, 10, -8, 6, -11, 4, 8][idx % 9];
      const angle = step * idx + drift + (idx % 2 ? 7 : -7);
      return (
        <div
          key={`x-${feature.title}`}
          className='absolute inset-0'
          style={{ transform: `rotate(${angle}deg)` }}
        >
          <div
            className='absolute left-1/2 top-[25%]'
            style={{ transform: 'translate(-50%, -50%)' }}
          >
            <div style={{ transform: `rotate(${-angle}deg)` }}>
              <span className='flex h-[20px] w-[20px] items-center justify-center rounded-full bg-[#0c1f5a]'>
                <X
                  className='h-[13px] w-[13px] text-[#FF7A6B]'
                  strokeWidth={2.6}
                  aria-hidden='true'
                />
              </span>
            </div>
          </div>
        </div>
      );
    })}
  </div>
);

/**
 * Правый круг — Revanta: знак продукта в центре, работы идут по кольцу.
 *
 * Кольцо едет по часовой стрелке, узлы крутятся в обратную сторону с тем же
 * периодом — иначе значки встают вверх ногами. Наведение останавливает кольцо
 * и показывает название и описание в центре. При prefers-reduced-motion
 * вращения нет.
 */
const LiveSystem = ({
  items,
  productName,
}: {
  items: RevantaFeature[];
  productName: string;
}) => {
  const [active, setActive] = useState<number | null>(null);
  const current = active === null ? null : items[active];

  return (
    <div
      className='group relative mx-auto aspect-square w-full max-w-[500px] rounded-[12px] bg-white/[0.04]'
      onMouseLeave={() => setActive(null)}
    >
      <div
        aria-hidden='true'
        className='absolute inset-[48px] rounded-full'
        style={{
          background:
            'radial-gradient(circle, rgba(120,160,255,0.28) 0%, rgba(90,130,230,0.16) 30%, rgba(59,91,246,0.04) 55%, rgba(59,91,246,0) 75%)',
        }}
      />
      <svg
        aria-hidden='true'
        className='absolute inset-[54px] h-auto w-auto overflow-visible'
        viewBox='0 0 392 392'
        fill='none'
      >
        {/* Спицы показывают, что все работы сходятся в одну базу клуба. */}
        {items.map((feature, idx) => {
          const angle = ((Math.PI * 2) / items.length) * idx - Math.PI / 2;
          const x = 196 + Math.cos(angle) * 146;
          const y = 196 + Math.sin(angle) * 146;

          return (
            <line
              key={`line-${feature.title}`}
              x1='196'
              y1='196'
              x2={x}
              y2={y}
              stroke='#8FB0FF'
              strokeOpacity='0.35'
              strokeWidth='1'
            />
          );
        })}
      </svg>
      <span
        aria-hidden='true'
        className='absolute inset-[13%] rounded-full border border-white/25'
      />
      <span
        aria-hidden='true'
        className='absolute inset-[20%] animate-orbit-ring rounded-full border border-dashed border-white/15 motion-reduce:animate-none'
        style={active !== null ? { animationPlayState: 'paused' } : undefined}
      />

      <div className='absolute inset-[25%] z-10 flex flex-col items-center justify-center rounded-full border border-white/20 bg-[#0e2465] px-[22px] text-center shadow-[0_22px_70px_rgba(6,16,48,0.55)]'>
        <Image
          src={`${REVANTA_IMAGES}/emblem-white.webp`}
          alt=''
          width={1002}
          height={632}
          sizes='100px'
          className='h-[32px] w-auto'
        />
        {current ? (
          <p className='mt-[12px] font-inter text-[18px] font-medium leading-[1.25] text-white'>
            {current.title}
          </p>
        ) : (
          /* Имя продукта — знаком, а не набранным словом: «Revanta» рисуется
             логотипом, под ним остаётся название ветки. */
          <>
            <Image
              src={`${REVANTA_IMAGES}/wordmark-white.webp`}
              alt='Revanta'
              width={1611}
              height={235}
              sizes='140px'
              className='mt-[14px] h-[18px] w-auto'
            />
            <p className='mt-[8px] font-inter text-[17px] font-medium leading-[1.2] text-white'>
              {productName.replace(/^Revanta\s*/, '')}
            </p>
          </>
        )}
        <p className='mt-[8px] font-inter text-[14px] leading-[1.45] text-white/60'>
          {current ? current.text : `${items.length} jobs on one club base`}
        </p>
      </div>

      <div
        className='absolute inset-0 animate-orbit-ring motion-reduce:animate-none'
        style={active !== null ? { animationPlayState: 'paused' } : undefined}
      >
        {items.map((feature, idx) => {
          const angle = (360 / items.length) * idx;
          const on = active === idx;
          return (
            /* Три слоя: поворот на место, статический разворот обратно и
               анимация, которая держит значок прямым. Одним элементом не
               обойтись — анимация перезаписала бы inline-трансформацию. */
            <div
              key={feature.title}
              className='absolute inset-0'
              style={{ transform: `rotate(${angle}deg)` }}
            >
              <div
                className='absolute left-1/2 top-[15%]'
                style={{ transform: 'translate(-50%, -50%)' }}
              >
                <div style={{ transform: `rotate(${-angle}deg)` }}>
                  <div
                    className='relative animate-orbit-item motion-reduce:animate-none'
                    style={
                      active !== null
                        ? { animationPlayState: 'paused' }
                        : undefined
                    }
                  >
                    <button
                      type='button'
                      onMouseEnter={() => setActive(idx)}
                      onFocus={() => setActive(idx)}
                      aria-label={feature.title}
                      className={`${NODE_CLASS} transition-all duration-200 ${
                        on
                          ? 'scale-[1.08] border-white/40 bg-white/[0.16] text-white'
                          : 'border-white/15 bg-white/[0.08] text-white/80 hover:border-white/35 hover:bg-white/[0.14]'
                      } text-revanta-accent`}
                    >
                      {feature.icon && <RevantaIcon name={feature.icon} />}
                    </button>
                    <span
                      className={`pointer-events-none absolute left-1/2 w-max max-w-[120px] -translate-x-1/2 rounded-full border border-white/15 bg-[#0e2465] px-[9px] py-[5px] text-center font-inter text-[11px] font-medium leading-[1.15] text-white shadow-[0_10px_22px_rgba(6,16,48,0.5)] transition-opacity duration-200 ${
                        angle > 100 && angle < 260
                          ? 'bottom-full mb-[8px]'
                          : 'top-full mt-[8px]'
                      } ${on ? 'opacity-100' : 'opacity-0'}`}
                    >
                      {feature.title}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/**
 * «Было / стало» кругами: слева разрозненные системы с разрывами, справа
 * Revanta с работами на одном кольце. Живёт только на широком экране — на
 * узком остаются две текстовые карточки.
 */
export const RevantaFeatureOrbit = ({
  heading,
  items,
  productName,
  before,
  after,
  headingClassName,
}: {
  heading: string;
  items: RevantaFeature[];
  productName: string;
  before: string;
  after: string;
  headingClassName?: string;
}) => (
  <div
    className='relative w-full overflow-hidden px-[40px] py-[72px]'
    style={{
      background: 'linear-gradient(160deg,#12296b 0%,#0c1f5a 55%,#081640 100%)',
    }}
  >
    <span
      aria-hidden='true'
      className='pointer-events-none absolute inset-0'
      style={{
        background:
          'radial-gradient(45% 60% at 8% 30%, rgba(90,130,230,0.35), transparent 70%)',
      }}
    />
    <div className='relative mx-auto w-full max-w-[1400px]'>
      <Reveal className='w-full'>
        <h2 className={headingClassName}>{heading}</h2>
      </Reveal>

      <Reveal className='mt-[44px] w-full'>
        <div className='grid grid-cols-2 gap-[24px]'>
          {/* Карточка = круг и текст под ним: раньше абзацы висели отдельно и
            не читались как часть того же блока. */}
          <div className='flex flex-col rounded-[14px] border border-white/10 bg-white/[0.04] p-[20px]'>
            <div className='flex items-center gap-[10px] pb-[16px]'>
              <span className={`${LABEL_CLASS} text-white/45`}>
                Disconnected
              </span>
              <span className='rounded-full border border-white/10 bg-white/[0.06] px-[10px] py-[5px] font-inter text-[13px] font-medium leading-none text-white/55'>
                {items.length} systems
              </span>
            </div>
            <BrokenSystem items={items} />
            <p className='mt-[20px] font-inter text-[17px] leading-[1.55] text-white/55'>
              {before}
            </p>
          </div>

          <div className='flex flex-col rounded-[14px] border border-white/25 bg-white/[0.07] p-[20px]'>
            <div className='flex items-center gap-[10px] pb-[16px]'>
              <span className={`${LABEL_CLASS} text-[#9DB6FF]`}>
                Connected base
              </span>
              <span className='rounded-full border border-white/20 bg-white/[0.10] px-[10px] py-[5px] font-inter text-[13px] font-semibold leading-none text-white'>
                {items.length} jobs
              </span>
            </div>
            <LiveSystem items={items} productName={productName} />
            <p className='mt-[20px] font-inter text-[17px] leading-[1.55] text-white/85'>
              {after}
            </p>
          </div>
        </div>
      </Reveal>
    </div>
  </div>
);
