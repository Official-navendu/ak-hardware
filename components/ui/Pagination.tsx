import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './Button';
import { cn } from '@/lib/utils';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className,
}) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className={cn('flex items-center justify-center gap-1.5 py-4', className)}>
      <Button
        variant="secondary"
        size="sm"
        disabled={currentPage <= 1}
        onClick={() => onPageChange?.(currentPage - 1)}
        leftIcon={<ChevronLeft className="h-4 w-4" />}
      >
        Prev
      </Button>

      {pages.map((page) => {
        const isCurrent = page === currentPage;
        return (
          <button
            key={page}
            onClick={() => onPageChange?.(page)}
            className={cn(
              'h-8 w-8 text-xs font-semibold rounded-brand transition-colors flex items-center justify-center',
              isCurrent
                ? 'bg-blue-brand text-white shadow-sm'
                : 'bg-white text-text-secondary border border-border hover:bg-surface-secondary'
            )}
          >
            {page}
          </button>
        );
      })}

      <Button
        variant="secondary"
        size="sm"
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange?.(currentPage + 1)}
        rightIcon={<ChevronRight className="h-4 w-4" />}
      >
        Next
      </Button>
    </div>
  );
};
