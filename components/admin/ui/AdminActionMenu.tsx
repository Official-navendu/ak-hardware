'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MoreHorizontal, Eye, Edit2, Copy, Trash2 } from 'lucide-react';

export interface ActionMenuItem {
  label: string;
  onClick: () => void;
  icon?: React.ReactNode;
  variant?: 'default' | 'danger';
}

interface AdminActionMenuProps {
  items: ActionMenuItem[];
  align?: 'left' | 'right';
}

export function AdminActionMenu({ items, align = 'right' }: AdminActionMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div ref={menuRef} className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="p-1.5 rounded-[6px] text-text-muted hover:text-navy-900 hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-brand/20"
        title="More Actions"
        aria-label="More Actions"
      >
        <MoreHorizontal className="h-4 w-4" />
      </button>

      {isOpen && (
        <div
          className={`absolute ${
            align === 'right' ? 'right-0' : 'left-0'
          } top-full mt-1 w-40 bg-white border border-border rounded-[8px] shadow-[0_4px_12px_rgba(15,23,42,0.08)] py-1 z-50 text-xs`}
        >
          {items.map((item, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setIsOpen(false);
                item.onClick();
              }}
              className={`w-full text-left px-3 py-2 flex items-center gap-2 font-medium transition-colors ${
                item.variant === 'danger'
                  ? 'text-red-700 hover:bg-red-50'
                  : 'text-text-secondary hover:text-navy-900 hover:bg-slate-50'
              }`}
            >
              {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
