import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center font-semibold rounded-full transition-colors select-none',
  {
    variants: {
      variant: {
        default: 'bg-surface-secondary text-text-secondary border border-border',
        navy: 'bg-navy-900 text-white',
        primary: 'bg-blue-brand/10 text-blue-brand border border-blue-brand/20',
        accent: 'bg-orange-brand/10 text-orange-brand border border-orange-brand/20',
        success: 'bg-accent-green/10 text-accent-green border border-accent-green/20',
        warning: 'bg-amber-500/10 text-amber-700 border border-amber-500/20',
        danger: 'bg-red-500/10 text-red-600 border border-red-500/20',
        outline: 'bg-transparent text-text-secondary border border-border',
      },
      size: {
        sm: 'text-[10px] px-2 py-0.5 leading-none',
        md: 'text-xs px-2.5 py-1 leading-none',
        lg: 'text-sm px-3 py-1.5 leading-none',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant,
  size,
  icon,
  children,
  ...props
}) => {
  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props}>
      {icon && <span className="mr-1 flex-shrink-0">{icon}</span>}
      <span>{children}</span>
    </div>
  );
};
