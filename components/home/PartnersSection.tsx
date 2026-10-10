'use client';

import React from 'react';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';

export const PartnersSection: React.FC = () => {
  return (
    <section className="bg-[#F7F8FA] py-6 lg:py-8 border-b border-[#E5E7EB]">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-6 lg:gap-8">
          {/* LEFT SIDE — 30% HEADING CONTENT */}
          <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left">
            <span className="text-[11px] font-bold text-[#6B7280] uppercase tracking-[0.2em] mb-1.5">
              OUR PARTNERS
            </span>
            <h2 className="text-xl sm:text-2xl lg:text-[26px] font-extrabold text-[#111827] tracking-tight leading-snug">
              Trusted Products &amp; Brands
            </h2>
          </div>

          {/* RIGHT SIDE — 70% STRIP IMAGE */}
          <div className="lg:col-span-8 flex items-center justify-center lg:justify-end w-full">
            <Image
              src="/assets/brands/partners-strip.png"
              alt="AK Hardware Trusted Partner Brands"
              width={1200}
              height={160}
              className="w-full h-auto max-w-full object-contain drop-shadow-2xs"
              priority={false}
            />
          </div>
        </div>
      </Container>
    </section>
  );
};
