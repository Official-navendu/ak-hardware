'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';

export interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  content: React.ReactNode;
  badge?: string | number;
}

export interface TabsProps {
  tabs: TabItem[];
  defaultTabId?: string;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({ tabs, defaultTabId, className }) => {
  const [activeId, setActiveId] = useState(defaultTabId || tabs[0]?.id);
  const activeTab = tabs.find((t) => t.id === activeId) || tabs[0];

  return (
    <div className={cn('w-full flex flex-col', className)}>
      <div className="flex border-b border-border gap-2 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => {
          const isActive = tab.id === activeId;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveId(tab.id)}
              className={cn(
                'flex items-center gap-2 px-4 py-3 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap select-none',
                isActive
                  ? 'border-blue-brand text-blue-brand bg-white'
                  : 'border-transparent text-text-muted hover:text-navy-900 hover:border-slate-300'
              )}
            >
              {tab.icon && <span className="h-4 w-4">{tab.icon}</span>}
              <span>{tab.label}</span>
              {typeof tab.badge !== 'undefined' && (
                <span
                  className={cn(
                    'text-[10px] px-1.5 py-0.5 rounded-full font-bold',
                    isActive ? 'bg-blue-brand text-white' : 'bg-surface-secondary text-text-muted'
                  )}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
      <div className="py-5">{activeTab?.content}</div>
    </div>
  );
};
