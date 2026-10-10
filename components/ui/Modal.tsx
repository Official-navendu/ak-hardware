'use client';

import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { IconButton } from './IconButton';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  size = 'md',
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className={cn(
          'w-full bg-white rounded-brand-lg shadow-dropdown border border-border flex flex-col max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-200',
          sizeClasses[size]
        )}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between p-5 border-b border-border">
          <div>
            {title && <h3 className="text-lg font-bold text-navy-900">{title}</h3>}
            {description && <p className="text-xs text-text-muted mt-0.5">{description}</p>}
          </div>
          <IconButton
            icon={<X className="h-5 w-5" />}
            ariaLabel="Close modal"
            variant="ghost"
            onClick={onClose}
          />
        </div>
        <div className="p-5 overflow-y-auto flex-1">{children}</div>
        {footer && <div className="p-4 bg-surface-secondary border-t border-border flex justify-end gap-3">{footer}</div>}
      </div>
    </div>
  );
};
