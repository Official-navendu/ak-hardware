'use client';

import React from 'react';

interface AdminCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  title?: string;
  description?: string;
  action?: React.ReactNode;
  noPadding?: boolean;
}

export function AdminCard({
  children,
  className = '',
  title,
  description,
  action,
  noPadding = false,
  ...props
}: AdminCardProps) {
  return (
    <div
      className={`bg-white border border-border rounded-[10px] shadow-[0_1px_2px_rgba(15,23,42,0.04)] overflow-hidden ${className}`}
      {...props}
    >
      {(title || action) && (
        <div className="px-5 py-4 border-b border-border flex items-center justify-between gap-4">
          <div className="flex flex-col gap-0.5">
            {title && <h3 className="font-semibold text-navy-900 text-sm">{title}</h3>}
            {description && <p className="text-xs text-text-muted">{description}</p>}
          </div>
          {action && <div className="flex-shrink-0">{action}</div>}
        </div>
      )}
      <div className={noPadding ? '' : 'p-5'}>{children}</div>
    </div>
  );
}
