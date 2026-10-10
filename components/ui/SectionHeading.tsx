import React from 'react';
import { cn } from '@/lib/utils';
import { Badge } from './Badge';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  badge?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
  action?: React.ReactNode;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  subtitle,
  badge,
  align = 'left',
  className,
  action,
}) => {
  const alignmentClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  };

  return (
    <div className={cn('flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 sm:mb-8', className)}>
      <div className={cn('flex flex-col', alignmentClasses[align])}>
        {badge && (
          <Badge variant="navy" className="mb-2 uppercase tracking-wider text-[10px] font-semibold bg-navy-900 text-white px-2.5 py-0.5">
            {badge}
          </Badge>
        )}
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-navy-900 tracking-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-1.5 text-xs sm:text-sm text-text-muted font-normal max-w-2xl">
            {subtitle}
          </p>
        )}
      </div>
      {action && <div className="mt-2 md:mt-0 flex-shrink-0">{action}</div>}
    </div>
  );
};
