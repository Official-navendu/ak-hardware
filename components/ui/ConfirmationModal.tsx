'use client';

import React, { useEffect } from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  isDanger?: boolean;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  isDanger = true,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="fixed inset-0"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirmation-modal-title"
        className="relative bg-white border border-border rounded-xl shadow-xl max-w-md w-full p-6 flex flex-col gap-4 z-10 animate-in zoom-in-95 duration-200"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-4 right-4 text-text-muted hover:text-navy-900 p-1 rounded-brand hover:bg-surface-secondary transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex items-start gap-3.5">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${isDanger ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-blue-50 text-[#014A94] border border-blue-100'}`}>
            <AlertTriangle className="h-5 w-5" />
          </div>
          <div className="flex flex-col gap-1 pr-4">
            <h3 id="confirmation-modal-title" className="font-extrabold text-navy-900 text-base">
              {title}
            </h3>
            <p className="text-xs text-text-muted leading-relaxed">
              {description}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-border-light mt-1">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={onClose}
          >
            {cancelText}
          </Button>
          <Button
            type="button"
            variant="primary"
            size="sm"
            className={isDanger ? 'bg-red-600 hover:bg-red-700 text-white border-transparent' : ''}
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
};
