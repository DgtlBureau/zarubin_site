import { REVANTA_IMAGES } from '@/src/data/revanta/routes';
import Image from 'next/image';

type Size = 'lg' | 'md' | 'sm';

const EMBLEM: Record<Size, string> = {
  sm: 'h-[26px] w-auto',
  md: 'h-[32px] w-auto tablet:h-[38px]',
  lg: 'h-[44px] w-auto tablet:h-[62px] desktop:h-[78px]',
};
const WORDMARK: Record<Size, string> = {
  sm: 'h-auto w-[110px]',
  md: 'h-auto w-[136px] tablet:w-[164px]',
  lg: 'h-auto w-[190px] tablet:w-[270px] desktop:w-[340px]',
};
// Rendered CSS widths of the classes above (emblem is 1002x632), for `sizes`
const EMBLEM_SIZES: Record<Size, string> = {
  sm: '42px',
  md: '(min-width: 768px) 61px, 51px',
  lg: '(min-width: 1440px) 124px, (min-width: 768px) 99px, 70px',
};
const WORDMARK_SIZES: Record<Size, string> = {
  sm: '110px',
  md: '(min-width: 768px) 164px, 136px',
  lg: '(min-width: 1440px) 340px, (min-width: 768px) 270px, 190px',
};
const GAP: Record<Size, string> = {
  sm: 'gap-[8px] px-[12px]',
  md: 'gap-[11px] px-[18px]',
  lg: 'gap-[14px] px-[24px] tablet:gap-[20px] desktop:gap-[24px]',
};
const LABEL: Record<Size, string> = {
  sm: 'text-[10px] tracking-[0.14em] px-[9px] py-[3px]',
  md: 'text-[11px] tracking-[0.14em] px-[11px] py-[4px] tablet:text-[12px]',
  lg: 'text-[13px] tracking-[0.16em] px-[16px] py-[7px] tablet:text-[15px]',
};

/**
 * Emblem + wordmark + product label over a product cover. The dimming and the
 * blue corner frame are always on; the mark itself reveals on hover of the
 * parent `group` link (pure CSS), or stays visible with `reveal='always'`.
 */
export const RevantaLockup = ({
  size = 'md',
  label,
  reveal = 'hover',
}: {
  size?: Size;
  label?: string;
  reveal?: 'hover' | 'always';
}) => {
  const on = (rest: string, hover: string, done: string) =>
    reveal === 'hover' ? `${rest} ${hover}` : done;

  return (
    <div aria-hidden='true' className='pointer-events-none absolute inset-0'>
      <div
        className={`absolute inset-0 transition-colors duration-500 motion-reduce:transition-none ${on(
          'bg-black/20',
          'group-hover:bg-black/45',
          'bg-black/45',
        )}`}
      />
      <div className='absolute inset-0'>
        <Image
          src={`${REVANTA_IMAGES}/frame-gradient.webp`}
          alt=''
          fill
          sizes='(max-width: 768px) 100vw, 50vw'
          className='object-cover'
        />
      </div>
      <div className='absolute inset-0 flex flex-col items-center justify-center gap-[10px] px-[16px]'>
        <div className={`flex items-center justify-center ${GAP[size]}`}>
          <span
            className={`block shrink-0 transition-all duration-500 ease-out motion-reduce:transition-none ${on(
              'scale-[0.92] opacity-0',
              'group-hover:scale-100 group-hover:opacity-100',
              'scale-100 opacity-100',
            )}`}
          >
            <Image
              src={`${REVANTA_IMAGES}/emblem-white.webp`}
              alt=''
              width={1002}
              height={632}
              sizes={EMBLEM_SIZES[size]}
              className={EMBLEM[size]}
            />
          </span>
          <span
            className={`block shrink-0 overflow-hidden transition-[clip-path] delay-100 duration-700 ease-out motion-reduce:transition-none ${on(
              '[clip-path:inset(0_100%_0_0)]',
              'group-hover:[clip-path:inset(0_0%_0_0)]',
              '[clip-path:inset(0_0%_0_0)]',
            )}`}
          >
            <Image
              src={`${REVANTA_IMAGES}/wordmark-white.webp`}
              alt=''
              width={1611}
              height={235}
              sizes={WORDMARK_SIZES[size]}
              className={WORDMARK[size]}
            />
          </span>
        </div>
        {label && (
          <span
            className={`max-w-full rounded-full border border-white/25 bg-white/10 text-center font-inter font-semibold uppercase leading-[1.25] text-white backdrop-blur-[2px] transition-all delay-300 duration-500 ease-out motion-reduce:transition-none ${LABEL[size]} ${on(
              'translate-y-[6px] opacity-0',
              'group-hover:translate-y-0 group-hover:opacity-100',
              'translate-y-0 opacity-100',
            )}`}
          >
            {label}
          </span>
        )}
      </div>
    </div>
  );
};
