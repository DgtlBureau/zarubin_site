import { cn } from '@/src/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

const cardVariants = cva('rounded-[5px] transition-all duration-300', {
  variants: {
    variant: {
      default: 'bg-white p-[10px] mobile-big:p-[20px] tablet:p-[40px]',
      dark: 'border border-[--dark-blue]/20 bg-[--second-blue] p-[20px] mobile-big:p-[40px]',
      feedback:
        'flex h-full flex-col justify-between gap-[10px] rounded-t-[5px] bg-white px-[10px] py-[20px] mobile-big:px-[20px] mobile-big:py-[20px] tablet:p-[40px]',
      case: 'relative min-h-[423px] overflow-hidden bg-cover bg-center bg-no-repeat p-[20px] desktop:p-[40px]',
      glass:
        'rounded-[12px] bg-gradient-to-br from-[#1e40af] to-[#6366f1] px-[20px] py-[24px] mobile-big:px-[30px] mobile-big:py-[30px]',
      muted: 'bg-card-bg p-[16px] tablet:p-[20px]',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ variant, className }))}
      {...props}
    />
  )
);
Card.displayName = 'Card';

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5', className)}
    {...props}
  />
));
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      'font-proxima text-[22px] font-bold leading-[1.25] mobile-big:text-[32px] mobile-big:leading-[1.14]',
      className
    )}
    {...props}
  />
));
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('font-proxima text-[14px] leading-[1.4] tablet:text-[16px]', className)}
    {...props}
  />
));
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('', className)} {...props} />
));
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center', className)}
    {...props}
  />
));
CardFooter.displayName = 'CardFooter';

export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, cardVariants };
