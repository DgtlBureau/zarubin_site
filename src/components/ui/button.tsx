import { cn } from '@/src/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[6px] font-proxima text-sm font-semibold transition-all duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default:
          'bg-main-blue text-white hover:bg-main-blue-hover hover:scale-[0.99]',
        orange:
          'border-2 border-main-orange bg-transparent text-main-orange hover:bg-main-orange hover:text-white',
        outline:
          'border border-white/30 bg-transparent text-white hover:border-white/60 hover:bg-white/10',
        ghost: 'bg-transparent text-white hover:bg-white/10',
        glass:
          'bg-white text-[#1e3a5f] hover:bg-white/90 disabled:bg-white/60 disabled:text-[#1e3a5f]/60 disabled:cursor-not-allowed',
        destructive:
          'bg-main-red text-white hover:bg-main-red/90',
        secondary:
          'bg-main-orange text-text-dark hover:bg-main-orange-hover',
        link: 'text-main-blue underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-[46px] px-[15px] py-[13px] text-[16px]',
        sm: 'h-[38px] px-[12px] py-[8px] text-[14px] rounded-[4px]',
        lg: 'h-[52px] px-[24px] py-[14px] text-[18px] rounded-[10px]',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
