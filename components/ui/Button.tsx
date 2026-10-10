import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center font-semibold rounded-brand transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-brand disabled:opacity-60 disabled:cursor-not-allowed disabled:pointer-events-none select-none',
  {
    variants: {
      variant: {
        primary:
          'bg-blue-brand text-white hover:bg-navy-800 active:bg-navy-900 shadow-sm',
        secondary:
          'bg-white text-navy-900 border border-border hover:bg-surface-secondary active:bg-slate-200 shadow-sm',
        accent:
          'bg-orange-brand text-white hover:bg-red-700 active:bg-red-800 shadow-sm',
        dark:
          'bg-navy-900 text-white hover:bg-navy-800 active:bg-navy-950 shadow-sm',
        ghost:
          'bg-transparent text-text-secondary hover:bg-surface-secondary hover:text-navy-900',
        outline:
          'bg-transparent text-blue-brand border border-blue-brand hover:bg-blue-50',
      },
      size: {
        sm: 'h-8 px-3 text-xs gap-1.5',
        md: 'h-10 px-4 text-sm gap-2',
        lg: 'h-12 px-6 text-base gap-2.5',
      },
      fullWidth: {
        true: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      fullWidth: false,
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      loading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, fullWidth }), className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <Loader2 className="h-4 w-4 animate-spin text-current" />}
        {!loading && leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
        <span>{children}</span>
        {!loading && rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
