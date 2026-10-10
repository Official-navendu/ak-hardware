import React from 'react';
import { cn } from '@/lib/utils';

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string | React.ReactNode;
  description?: string;
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ className, label, description, id, disabled, ...props }, ref) => {
    const radioId = id || (typeof label === 'string' ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <label
        htmlFor={radioId}
        className={cn(
          'inline-flex items-start gap-2.5 cursor-pointer select-none group',
          disabled && 'cursor-not-allowed opacity-60',
          className
        )}
      >
        <div className="relative flex items-center mt-0.5">
          <input
            id={radioId}
            type="radio"
            ref={ref}
            disabled={disabled}
            className="peer sr-only"
            {...props}
          />
          <div
            className={cn(
              'h-4 w-4 rounded-full border border-border bg-white transition-colors flex items-center justify-center',
              'peer-checked:border-blue-brand',
              'peer-focus-visible:ring-2 peer-focus-visible:ring-blue-brand peer-focus-visible:ring-offset-1',
              'group-hover:border-blue-brand'
            )}
          >
            <div className="h-2 w-2 rounded-full bg-blue-brand opacity-0 peer-checked:opacity-100 transition-opacity" />
          </div>
        </div>
        {(label || description) && (
          <div className="flex flex-col">
            {label && <span className="text-sm font-medium text-text-primary">{label}</span>}
            {description && <span className="text-xs text-text-muted">{description}</span>}
          </div>
        )}
      </label>
    );
  }
);

Radio.displayName = 'Radio';
