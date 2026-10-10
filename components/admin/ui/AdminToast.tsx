'use client';

import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

interface AdminToastProps {
  message: string;
  type?: ToastType;
  onClose: () => void;
  duration?: number;
}

export function AdminToast({
  message,
  type = 'success',
  onClose,
  duration = 3000,
}: AdminToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const icons = {
    success: <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0" />,
    error: <AlertCircle className="h-4 w-4 text-red-600 flex-shrink-0" />,
    info: <Info className="h-4 w-4 text-blue-brand flex-shrink-0" />,
  };

  return (
    <div className="fixed top-5 right-5 z-50 w-[340px] h-[48px] bg-white border border-border rounded-[8px] shadow-[0_4px_16px_rgba(15,23,42,0.1)] px-3.5 flex items-center justify-between gap-3 text-xs animate-in fade-in slide-in-from-top-2 duration-200">
      <div className="flex items-center gap-2.5 min-w-0">
        {icons[type]}
        <span className="font-semibold text-navy-900 truncate">{message}</span>
      </div>
      <button
        onClick={onClose}
        className="text-text-muted hover:text-navy-900 p-1 rounded hover:bg-slate-100 transition-colors"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
