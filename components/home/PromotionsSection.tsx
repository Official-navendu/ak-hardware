'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';

export const PromotionsSection: React.FC = () => {
  return (
    <section className="py-6 sm:py-10 bg-white border-b border-slate-100">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* LEFT IMAGE — SANITARY ITEMS CATEGORY */}
          <Link
            href="/categories/sanitary-items"
            aria-label="Sanitary Items"
            className="block w-full relative aspect-[1.33/1] rounded-xl sm:rounded-2xl overflow-hidden border border-[#E5E7EB] shadow-2xs hover:shadow-md transition-all duration-300 group cursor-pointer"
          >
            <Image
              src="/assets/promotions/promo-sanitary.jpg"
              alt="Sanitary Items"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-center group-hover:scale-[1.015] transition-transform duration-300"
            />
          </Link>

          {/* RIGHT IMAGE — SHOP */}
          <Link
            href="/shop"
            aria-label="Shop AK Hardware"
            className="block w-full relative aspect-[1.33/1] rounded-xl sm:rounded-2xl overflow-hidden border border-[#E5E7EB] shadow-2xs hover:shadow-md transition-all duration-300 group cursor-pointer"
          >
            <Image
              src="/assets/promotions/promo-paints-pipes.jpg"
              alt="Shop AK Hardware"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-center group-hover:scale-[1.015] transition-transform duration-300"
            />
          </Link>
        </div>
      </Container>
    </section>
  );
};
