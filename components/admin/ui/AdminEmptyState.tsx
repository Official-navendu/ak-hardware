'use client';

import React from 'react';

interface AdminEmptyStateProps {
  title: string;
  description: string;
  action?: React.ReactNode;
}

export function AdminEmptyState({ title, description, action }: AdminEmptyStateProps) {
  return (
    <div className="py-12 px-4 text-center flex flex-col items-center justify-center gap-3 bg-white border border-border rounded-[10px]">
      <div className="flex flex-col gap-1 max-w-sm">
        <h4 className="font-bold text-navy-900 text-sm">{title}</h4>
        <p className="text-xs text-text-muted leading-relaxed">{description}</p>
      </div>
      {action && <div className="mt-1">{action}</div>}
    </div>
  );
}
