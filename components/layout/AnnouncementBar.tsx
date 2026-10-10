'use client';

import React from 'react';
import { Container } from '@/components/ui/Container';
import { SITE_CONFIG } from '@/lib/data/site-config';

export const AnnouncementBar: React.FC = () => {
  return (
    <div className="w-full bg-[#012157] text-white text-[12px] py-1.5 border-b border-[#011438] select-none">
      <Container className="flex items-center justify-between gap-4">
        {/* LEFT / CENTER: GST NUMBER */}
        <div className="flex items-center gap-2 font-medium tracking-wide text-slate-100">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#FA3A08]"></span>
          <span className="font-semibold">{SITE_CONFIG.announcementText}</span>
        </div>

        {/* RIGHT SIDE: PROMO MESSAGE */}
        <div className="hidden sm:flex items-center gap-2 text-slate-300 font-medium">
          <span>{SITE_CONFIG.announcementPromo}</span>
        </div>
      </Container>
    </div>
  );
};
