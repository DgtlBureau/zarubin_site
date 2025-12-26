import classNames from 'classnames';
import { HTMLAttributes, PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

export const Section = ({
  children,
  className,
  light,
  ...rest
}: PropsWithChildren<HTMLAttributes<HTMLElement> & { light?: boolean }>) => {
  return (
    <section
      className={twMerge(
        classNames('relative py-[20px]', className, {
          'bg-white text-dark': light,
        }),
      )}
      {...rest}
    >
      {children}
    </section>
  );
};
