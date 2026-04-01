import classNames from 'classnames';
import { HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

export const Tag = ({
  children,
  selected,
  className,
  onClick,
  ...rest
}: Omit<HTMLAttributes<HTMLButtonElement>, 'children' | 'onClick'> & {
  selected?: boolean;
  children: string;
  onClick?: (tag: string) => void;
}) => (
  <button
    className={twMerge(
      classNames(
        `duration-250 flex h-[38px] items-center justify-center text-nowrap rounded-[2px] border border-[1px] border-solid border-white px-[10px] font-inter font-bold uppercase opacity-80 transition-all`,
        className,
        { 'bg-white text-text-dark opacity-100': selected },
      ),
    )}
    onClick={() => onClick && onClick(children)}
    {...rest}
  >
    {children}
  </button>
);
