'use client';

import React, { useState, useRef, useEffect } from 'react';
import { X, ArrowRight, MessageSquare, ChevronRight } from 'lucide-react';
import {
  WHATSAPP_CONFIG,
  WHATSAPP_QUICK_MESSAGES,
  createWhatsAppLink,
} from '@/lib/data/site-config';

export const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = 'h-6 w-6' }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347z" />
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.119.55 4.11 1.517 5.84L0 24l6.329-1.492A11.947 11.947 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.802 0-3.52-.477-5.02-1.309l-.36-.197-3.73.88.995-3.633-.23-.374A9.957 9.957 0 012 12c0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10z" />
  </svg>
);

export const FloatingWhatsApp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on Outside Click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen]);

  // Close on Escape Key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleOpenShortcut = (messageText: string) => {
    const link = createWhatsAppLink(messageText);
    window.open(link, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

  const handleDirectChat = () => {
    const link = createWhatsAppLink();
    window.open(link, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

  return (
    <div
      ref={containerRef}
      className="fixed bottom-[18px] right-[18px] md:bottom-[24px] md:right-[24px] z-50 flex flex-col items-end"
    >
      {/* QUICK CHAT POPOVER PANEL */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Chat with AK Hardware on WhatsApp"
          className="fixed inset-x-4 bottom-20 sm:absolute sm:inset-auto sm:bottom-16 sm:right-0 w-auto sm:w-[360px] max-h-[75vh] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col z-50 animate-in fade-in slide-in-from-bottom-3 duration-200"
        >
          {/* HEADER BAR */}
          <div className="bg-[#25D366] text-white p-4 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white flex-shrink-0">
                <WhatsAppIcon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold leading-tight">WhatsApp Support</h3>
                <p className="text-[11px] text-white/90 font-medium">Chat with AK Hardware</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-full bg-black/10 hover:bg-black/20 text-white flex items-center justify-center transition-colors"
              aria-label="Close WhatsApp chat panel"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* POPOVER BODY */}
          <div className="p-4 sm:p-5 overflow-y-auto max-h-[calc(75vh-70px)] flex flex-col gap-3.5 bg-slate-50/50">
            <div className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs">
              <p className="text-xs text-slate-700 font-semibold leading-relaxed">
                👋 How can we help you today? Select a shortcut to start chatting on WhatsApp:
              </p>
            </div>

            {/* QUICK MESSAGE SHORTCUTS */}
            <div className="flex flex-col gap-2">
              {WHATSAPP_QUICK_MESSAGES.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleOpenShortcut(item.message)}
                  className="w-full text-left bg-white border border-slate-200 hover:border-[#25D366] hover:bg-[#F0FDF4] p-3 rounded-xl flex items-center justify-between group transition-all duration-150 shadow-2xs"
                >
                  <span className="text-xs font-bold text-[#111827] group-hover:text-[#128C7E]">
                    {item.label}
                  </span>
                  <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-[#25D366] group-hover:translate-x-0.5 transition-transform flex-shrink-0" />
                </button>
              ))}
            </div>

            {/* DIRECT CHAT BUTTON */}
            <div className="pt-2 border-t border-slate-200/80 flex flex-col gap-2">
              <button
                type="button"
                onClick={handleDirectChat}
                className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-bold text-xs py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <WhatsAppIcon className="h-4 w-4" />
                <span>Chat on WhatsApp Directly</span>
              </button>
              <p className="text-[10px] text-center text-slate-400 font-medium">
                Store Hotline: {WHATSAPP_CONFIG.displayPhone}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* FLOATING TRIGGER BUTTON */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Chat with AK Hardware on WhatsApp"
        aria-expanded={isOpen}
        className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#25D366] hover:bg-[#128C7E] text-white shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <WhatsAppIcon className="h-6 w-6 md:h-7 md:w-7" />
        )}
      </button>
    </div>
  );
};
