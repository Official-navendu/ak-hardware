'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface AdminPageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  primaryAction?: React.ReactNode;
  secondaryActions?: React.ReactNode;
}

export function AdminPageHeader({
  title,
  description,
  breadcrumbs,
  primaryAction,
  secondaryActions,
}: AdminPageHeaderProps) {
  return (
    <div className="flex flex-col gap-3 pb-5 border-b border-border mb-6">
      {/* BREADCRUMBS */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="flex items-center gap-1.5 text-xs text-text-muted">
          <Link href="/ashish" className="hover:text-navy-900 transition-colors">
            Admin
          </Link>
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={idx}>
              <ChevronRight className="h-3.5 w-3.5 text-slate-400 flex-shrink-0" />
              {crumb.href ? (
                <Link href={crumb.href} className="hover:text-navy-900 transition-colors">
                  {crumb.label}
                </Link>
              ) : (
                <span className="font-semibold text-navy-900">{crumb.label}</span>
              )}
            </React.Fragment>
          ))}
        </nav>
      )}

      {/* MAIN TITLE & ACTIONS ROW */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-0.5">
          <h1 className="text-2xl sm:text-[26px] font-bold text-navy-900 tracking-tight leading-tight">
            {title}
          </h1>
          {description && (
            <p className="text-xs sm:text-sm text-text-muted max-w-2xl leading-relaxed">
              {description}
            </p>
          )}
        </div>

        {(primaryAction || secondaryActions) && (
          <div className="flex items-center gap-2.5 flex-shrink-0">
            {secondaryActions}
            {primaryAction}
          </div>
        )}
      </div>
    </div>
  );
}
