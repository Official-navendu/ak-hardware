'use client';

import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { IconButton } from './IconButton';

export interface ToastProps {
  id: string;
  type?: 'success' | 'error' | 'info';
  title: string;
  description?: string;
  onDismiss?: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({
  id,
  type = 'success',
  title,
  description,
  onDismiss,
}) => {
  const icons = {
    success: <CheckCircle2 className="h-5 w-5 text-accent-green flex-shrink-0" />,
    error: <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />,
    info: <Info className="h-5 w-5 text-blue-brand flex-shrink-0" />,
  };

  return (
    <div className="flex items-start gap-3 p-4 bg-white border border-border shadow-dropdown rounded-brand max-w-sm w-full animate-in slide-in-from-bottom-5 duration-200">
      {icons[type]}
      <div className="flex-1">
        <h4 className="text-xs font-bold text-navy-900">{title}</h4>
        {description && <p className="text-[11px] text-text-muted mt-0.5">{description}</p>}
      </div>
      {onDismiss && (
        <IconButton
          icon={<X className="h-4 w-4" />}
          ariaLabel="Close toast"
          variant="ghost"
          size="sm"
          onClick={() => onDismiss(id)}
        />
      )}
    </div>
  );
};
