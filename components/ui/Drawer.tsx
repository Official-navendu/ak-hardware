'use client';

import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { IconButton } from './IconButton';

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  position?: 'left' | 'right';
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  title,
  position = 'right',
  children,
  footer,
  className,
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

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-navy-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className={cn(
          'fixed inset-y-0 flex max-w-full bg-white shadow-2xl transition-transform duration-300 ease-in-out',
          position === 'right' ? 'right-0 w-screen max-w-md' : 'left-0 w-screen max-w-md',
          className
        )}
      >
        <div className="flex flex-col w-full h-full bg-white">
          <div className="flex items-center justify-between p-5 border-b border-border bg-surface-bg">
            <h3 className="text-lg font-bold text-navy-900">{title || 'Menu'}</h3>
            <IconButton
              icon={<X className="h-5 w-5" />}
              ariaLabel="Close drawer"
              variant="ghost"
              onClick={onClose}
            />
          </div>
          <div className="flex-1 p-5 overflow-y-auto">{children}</div>
          {footer && <div className="p-4 bg-surface-secondary border-t border-border">{footer}</div>}
        </div>
      </div>
    </div>
  );
};
