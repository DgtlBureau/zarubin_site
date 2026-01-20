import { cn } from '@/src/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

const badgeVariants = cva(
  'inline-flex items-center rounded-[4px] font-inter font-bold uppercase transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-main-orange text-text-dark',
        secondary: 'bg-white text-text-dark',
        outline: 'border border-white/30 bg-white/30 text-white',
        muted: 'bg-gray-200 text-text-dark',
        destructive: 'bg-main-red text-white',
      },
      size: {
        default: 'px-[10px] py-[4px] text-[10px]',
        sm: 'px-[6px] py-[3px] text-[9px]',
        lg: 'px-[12px] py-[5px] text-[11px]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(badgeVariants({ variant, size, className }))}
        {...props}
      />
    );
  }
);
Badge.displayName = 'Badge';

export { Badge, badgeVariants };
