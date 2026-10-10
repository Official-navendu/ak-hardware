import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const iconButtonVariants = cva(
  'relative inline-flex items-center justify-center rounded-brand transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-brand disabled:opacity-50 disabled:cursor-not-allowed select-none',
  {
    variants: {
      variant: {
        primary: 'bg-blue-brand text-white hover:bg-navy-800',
        secondary: 'bg-white text-text-secondary border border-border hover:bg-surface-secondary hover:text-navy-900',
        accent: 'bg-orange-brand text-white hover:bg-red-700',
        dark: 'bg-navy-900 text-white hover:bg-navy-800',
        ghost: 'bg-transparent text-text-secondary hover:bg-surface-secondary hover:text-navy-900',
      },
      size: {
        sm: 'h-8 w-8 text-xs',
        md: 'h-10 w-10 text-sm',
        lg: 'h-12 w-12 text-base',
      },
    },
    defaultVariants: {
      variant: 'secondary',
      size: 'md',
    },
  }
);

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButtonVariants> {
  icon: React.ReactNode;
  ariaLabel: string;
  badgeCount?: number;
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, variant, size, icon, ariaLabel, badgeCount, ...props }, ref) => {
    return (
      <button
        ref={ref}
        aria-label={ariaLabel}
        className={cn(iconButtonVariants({ variant, size }), className)}
        {...props}
      >
        {icon}
        {typeof badgeCount === 'number' && badgeCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-orange-brand text-white text-[10px] font-bold h-4 min-w-[16px] px-1 rounded-full flex items-center justify-center border-2 border-white">
            {badgeCount > 99 ? '99+' : badgeCount}
          </span>
        )}
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';
