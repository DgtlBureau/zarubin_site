import { cn } from '@/src/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

const inputVariants = cva(
  'flex w-full font-proxima text-[14px] leading-[1.8] outline-none transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        glass:
          'rounded-[6px] border border-white/30 bg-white/10 p-[8px_16px] text-white placeholder:text-white/60 focus:border-white/60 focus:bg-white/20',
        underline:
          'border-b border-blue-600 bg-transparent pb-2 text-white placeholder:text-gray-500/50 focus:bg-blue-950',
        solid:
          'rounded-[6px] border border-input bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-ring focus:ring-1 focus:ring-ring',
        dark:
          'border-b border-blue-600 bg-[--second-blue] pb-2 text-white placeholder:text-white/50 focus:bg-[--second-blue]',
      },
      inputSize: {
        default: 'text-[14px] tablet:text-[14px]',
        sm: 'text-[12px] tablet:text-[13px]',
        lg: 'text-base mobile-big:text-2xl',
      },
    },
    defaultVariants: {
      variant: 'glass',
      inputSize: 'default',
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, inputSize, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ variant, inputSize, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input, inputVariants };
