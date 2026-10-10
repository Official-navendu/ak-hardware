import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  showHome?: boolean;
  className?: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  showHome = true,
  className,
}) => {
  return (
    <nav aria-label="Breadcrumb" className={cn('flex items-center text-xs text-text-muted', className)}>
      <ol className="flex items-center gap-1.5 flex-wrap">
        {showHome && (
          <li className="flex items-center gap-1.5">
            <Link
              href="/"
              className="flex items-center text-text-muted hover:text-blue-brand transition-colors"
            >
              <Home className="h-3.5 w-3.5" />
              <span className="sr-only">Home</span>
            </Link>
            <ChevronRight className="h-3 w-3 text-slate-400" />
          </li>
        )}
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center gap-1.5">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="hover:text-blue-brand transition-colors font-medium text-text-secondary"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="font-semibold text-navy-900 truncate max-w-[200px]" aria-current="page">
                  {item.label}
                </span>
              )}
              {!isLast && <ChevronRight className="h-3 w-3 text-slate-400" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
