import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface LoadingStateProps {
  label?: string;
  fullPage?: boolean;
  className?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  label = 'Loading AK Hardware components...',
  fullPage = false,
  className,
}) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-3 p-8 text-center',
        fullPage && 'fixed inset-0 z-50 bg-white/80 backdrop-blur-sm',
        className
      )}
    >
      <Loader2 className="h-8 w-8 text-blue-brand animate-spin" />
      <span className="text-xs font-semibold text-text-muted">{label}</span>
    </div>
  );
};
