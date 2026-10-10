'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import { Container } from '@/components/ui/Container';

export const HomeCTA: React.FC = () => {
  return (
    <section className="py-10 sm:py-12 bg-white">
      <Container>
        <div className="bg-[#01183D] text-white rounded-2xl p-6 sm:p-10 lg:p-12 border border-[#01317A]/40 shadow-xl relative overflow-hidden">
          {/* SUBTLE BRAND GRADIENT OVERLAY */}
          <div className="absolute inset-0 bg-radial from-[#014A94]/20 via-transparent to-transparent pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 lg:gap-10">
            {/* LEFT CONTENT COLUMN */}
            <div className="flex flex-col items-start max-w-3xl">
              <span className="inline-flex items-center gap-1.5 bg-[#FA3A08]/15 text-[#FA3A08] text-[11px] font-extrabold px-3 py-1 rounded-md border border-[#FA3A08]/30 uppercase tracking-widest mb-3">
                <ShoppingBag className="h-3.5 w-3.5" />
                <span>SHOP AK HARDWARE</span>
              </span>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight mb-2.5">
                Everything You Need for Your Next Project
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed">
                Explore quality hardware, tools, sanitary products, pipes, tiles, paints and electrical essentials — all in one place.
              </p>
            </div>

            {/* RIGHT BUTTONS COLUMN */}
            <div className="flex flex-col sm:flex-row lg:flex-row items-stretch sm:items-center gap-3 flex-shrink-0">
              <Link
                href="/shop"
                className="bg-[#FA3A08] hover:bg-[#d92e00] text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl transition-all duration-200 inline-flex items-center justify-center gap-2 shadow-2xs active:scale-[0.98]"
              >
                <span>Shop All Products</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/categories"
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold text-xs sm:text-sm px-6 py-3 rounded-xl transition-all duration-200 inline-flex items-center justify-center active:scale-[0.98]"
              >
                <span>Explore Categories</span>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
