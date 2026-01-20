import { cn } from '@/src/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

const textareaVariants = cva(
  'flex w-full resize-none font-proxima text-[14px] leading-[1.8] outline-none transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        glass:
          'rounded-[6px] border border-white/30 bg-white/10 p-[8px_16px] text-white placeholder:text-white/60 focus:border-white/60 focus:bg-white/20',
        underline:
          'border-b border-blue-600 bg-transparent pb-2 text-white placeholder:text-gray-500/50 focus:bg-blue-950',
        solid:
          'min-h-[80px] rounded-[6px] border border-input bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-ring focus:ring-1 focus:ring-ring',
        dark:
          'border-b border-blue-600 bg-[--second-blue] pb-2 text-white placeholder:text-white/50 focus:bg-[--second-blue]',
      },
      textareaSize: {
        default: 'text-[14px] tablet:text-[14px]',
        sm: 'text-[12px] tablet:text-[13px]',
        lg: 'text-base mobile-big:text-2xl',
      },
    },
    defaultVariants: {
      variant: 'glass',
      textareaSize: 'default',
    },
  }
);

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant, textareaSize, ...props }, ref) => {
    return (
      <textarea
        className={cn(textareaVariants({ variant, textareaSize, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = 'Textarea';

export { Textarea, textareaVariants };
