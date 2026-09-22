import { HTMLAttributes, PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

/** One page measure for every Revanta section. */
export const RevantaContainer = ({
  children,
  className,
  ...rest
}: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) => (
  <div
    className={twMerge(
      'mx-auto w-full max-w-[1600px] px-[16px] tablet:px-[20px] desktop:px-[40px]',
      className,
    )}
    {...rest}
  >
    {children}
  </div>
);

/** Light content section of the Revanta pages. */
export const RevantaSection = ({
  children,
  className,
  ...rest
}: PropsWithChildren<HTMLAttributes<HTMLElement>>) => (
  <section
    className={twMerge(
      'relative bg-white py-[40px] text-revanta-ink tablet:py-[60px] desktop:py-[70px]',
      className,
    )}
    {...rest}
  >
    {children}
  </section>
);

export const H2_CLASS =
  'font-inter text-[31px] font-light leading-[1.1] tracking-[-0.02em] text-revanta-ink tablet:text-[40px] desktop:text-[49px]';

export const EYEBROW_CLASS =
  'font-inter text-[13px] font-semibold uppercase tracking-[0.08em] text-revanta-ink/40';

export const EMBLEM_GLOW_CLASS =
  '[filter:drop-shadow(0_0_12px_rgba(59,91,246,0.75))_drop-shadow(0_0_30px_rgba(59,91,246,0.4))]';
