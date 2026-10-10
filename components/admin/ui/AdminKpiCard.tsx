'use client';

import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface AdminKpiCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  periodText?: string;
  icon?: React.ReactNode;
}

export function AdminKpiCard({
  title,
  value,
  change,
  changeType = 'positive',
  periodText = 'Compared to last month',
  icon,
}: AdminKpiCardProps) {
  return (
    <div className="bg-white border border-border rounded-[10px] p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] flex flex-col justify-between gap-3">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-medium text-text-muted">{title}</span>
        {icon && <span className="text-text-muted">{icon}</span>}
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-2xl font-bold text-navy-900 tracking-tight">{value}</span>

        {change && (
          <div className="flex items-center gap-1.5 text-xs">
            <span
              className={`font-semibold inline-flex items-center gap-0.5 ${
                changeType === 'positive'
                  ? 'text-emerald-700'
                  : changeType === 'negative'
                  ? 'text-red-700'
                  : 'text-text-muted'
              }`}
            >
              {changeType === 'positive' && <ArrowUpRight className="h-3.5 w-3.5" />}
              {changeType === 'negative' && <ArrowDownRight className="h-3.5 w-3.5" />}
              {change}
            </span>
            <span className="text-text-muted text-[11px] truncate">{periodText}</span>
          </div>
        )}
      </div>
    </div>
  );
}
