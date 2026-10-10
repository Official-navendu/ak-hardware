'use client';

import React from 'react';
import Link from 'next/link';
import {
  Droplets,
  Workflow,
  Wrench,
  LayoutGrid,
  Paintbrush,
  Zap,
  ArrowRight,
} from 'lucide-react';
import { CATEGORIES_DATA, CategoryItem } from '@/lib/data/categories';

const ICON_MAP = {
  Droplets: Droplets,
  Workflow: Workflow,
  Wrench: Wrench,
  LayoutGrid: LayoutGrid,
  Paintbrush: Paintbrush,
  Zap: Zap,
};

interface CategoriesDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export const CategoriesDropdown: React.FC<CategoriesDropdownProps> = ({
  isOpen,
  onClose,
  onMouseEnter,
  onMouseLeave,
}) => {
  if (!isOpen) return null;

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="absolute top-full left-0 mt-2 w-[480px] sm:w-[540px] bg-white border border-slate-200/90 rounded-2xl shadow-2xl p-4 sm:p-5 z-50 animate-in fade-in slide-in-from-top-2 duration-200"
    >
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
        <span className="text-xs font-bold text-[#0C1E38] uppercase tracking-wider">
          Product Categories
        </span>
        <Link
          href="/categories"
          onClick={onClose}
          className="text-xs font-bold text-[#FA3A08] hover:text-[#014A94] inline-flex items-center gap-1 transition-colors"
        >
          <span>View All Categories</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        {CATEGORIES_DATA.map((cat: CategoryItem) => {
          const IconComponent = ICON_MAP[cat.iconName] || Wrench;
          return (
            <Link
              key={cat.slug}
              href={`/categories/${cat.slug}`}
              onClick={onClose}
              className="group flex items-start gap-3 p-2.5 rounded-xl border border-transparent hover:border-slate-100 hover:bg-slate-50/80 transition-all duration-150"
            >
              <div className="w-9 h-9 rounded-xl bg-[#014A94]/10 text-[#014A94] group-hover:bg-[#FA3A08] group-hover:text-white transition-colors flex items-center justify-center flex-shrink-0 mt-0.5">
                <IconComponent className="h-4.5 w-4.5" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#0C1E38] group-hover:text-[#014A94] transition-colors truncate">
                    {cat.name}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 font-normal leading-snug line-clamp-1 mt-0.5">
                  {cat.subtitle}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
