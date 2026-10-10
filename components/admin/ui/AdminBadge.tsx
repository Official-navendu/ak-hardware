'use client';

import React from 'react';

export type AdminBadgeVariant =
  | 'default'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'warning'
  | 'navy'
  | 'neutral';

interface AdminBadgeProps {
  children: React.ReactNode;
  variant?: AdminBadgeVariant;
  size?: 'sm' | 'md';
  dot?: boolean;
  className?: string;
}

export function AdminBadge({
  children,
  variant = 'default',
  size = 'md',
  dot = false,
  className = '',
}: AdminBadgeProps) {
  const variantStyles: Record<AdminBadgeVariant, string> = {
    default: 'bg-slate-100 text-slate-700 border-slate-200',
    neutral: 'bg-slate-100 text-slate-700 border-slate-200',
    processing: 'bg-amber-50 text-amber-800 border-amber-200',
    shipped: 'bg-blue-50 text-blue-800 border-blue-200',
    delivered: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    cancelled: 'bg-red-50 text-red-800 border-red-200',
    warning: 'bg-amber-50 text-amber-800 border-amber-200',
    navy: 'bg-navy-900 text-white border-navy-900',
  };

  const dotColors: Record<AdminBadgeVariant, string> = {
    default: 'bg-slate-500',
    neutral: 'bg-slate-500',
    processing: 'bg-amber-600',
    shipped: 'bg-blue-600',
    delivered: 'bg-emerald-600',
    cancelled: 'bg-red-600',
    warning: 'bg-amber-600',
    navy: 'bg-orange-brand',
  };

  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5 font-medium',
    md: 'text-xs px-2.5 py-1 font-semibold',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 border rounded-[6px] ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {dot && <span className={`h-1.5 w-1.5 rounded-full ${dotColors[variant]}`} />}
      <span>{children}</span>
    </span>
  );
}
