import React from 'react';
import { AlertCircle, CheckCircle2, Info, AlertTriangle, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { IconButton } from './IconButton';

export interface AlertProps {
  type?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  message: string;
  onClose?: () => void;
  className?: string;
}

export const Alert: React.FC<AlertProps> = ({
  type = 'info',
  title,
  message,
  onClose,
  className,
}) => {
  const styles = {
    info: {
      bg: 'bg-blue-50 border-blue-200 text-blue-900',
      icon: <Info className="h-5 w-5 text-blue-600 flex-shrink-0" />,
    },
    success: {
      bg: 'bg-emerald-50 border-emerald-200 text-emerald-900',
      icon: <CheckCircle2 className="h-5 w-5 text-accent-green flex-shrink-0" />,
    },
    warning: {
      bg: 'bg-amber-50 border-amber-200 text-amber-900',
      icon: <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0" />,
    },
    error: {
      bg: 'bg-red-50 border-red-200 text-red-900',
      icon: <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />,
    },
  };

  const current = styles[type];

  return (
    <div
      className={cn(
        'flex items-start justify-between p-4 rounded-brand border text-sm',
        current.bg,
        className
      )}
      role="alert"
    >
      <div className="flex items-start gap-3">
        {current.icon}
        <div className="flex flex-col">
          {title && <span className="font-bold mb-0.5">{title}</span>}
          <span className="leading-relaxed">{message}</span>
        </div>
      </div>
      {onClose && (
        <IconButton
          icon={<X className="h-4 w-4" />}
          ariaLabel="Dismiss alert"
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="ml-4 -mr-1 -mt-1"
        />
      )}
    </div>
  );
};
