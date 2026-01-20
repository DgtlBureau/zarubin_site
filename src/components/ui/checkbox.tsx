'use client';

import { cn } from '@/src/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

const checkboxVariants = cva(
  'peer relative h-[16px] w-[16px] shrink-0 cursor-pointer appearance-none rounded-[4px] border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        glass:
          'border-white/60 bg-white/10 checked:bg-white',
        default:
          'border-input bg-background checked:bg-primary checked:border-primary',
      },
    },
    defaultVariants: {
      variant: 'glass',
    },
  }
);

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'>,
    VariantProps<typeof checkboxVariants> {
  onCheckedChange?: (checked: boolean) => void;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, variant, onCheckedChange, checked, onChange, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e);
      onCheckedChange?.(e.target.checked);
    };

    return (
      <div className="relative inline-flex items-center">
        <input
          type="checkbox"
          className={cn(checkboxVariants({ variant, className }))}
          ref={ref}
          checked={checked}
          onChange={handleChange}
          {...props}
        />
        {checked && (
          <span className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[12px] font-bold text-[#1e40af]">
            &#10004;
          </span>
        )}
      </div>
    );
  }
);
Checkbox.displayName = 'Checkbox';

export { Checkbox };
