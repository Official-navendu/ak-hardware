'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { ProductCard } from '@/components/products/ProductCard';
import { MOCK_PRODUCTS } from '@/lib/data/mock-products';

export const FeaturedProducts: React.FC = () => {
  // Top 12 featured products cleanly displayed in a 4-column grid (3 rows of 4)
  const featuredProducts = MOCK_PRODUCTS.slice(0, 12);

  return (
    <section id="featured-products" className="py-12 sm:py-16 bg-[#FAFCFF] border-b border-slate-100">
      <Container>
        {/* HEADER & BEST SELLERS BADGE */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-[#E8F1FD] text-[#014A94] text-[11px] font-extrabold px-3 py-1 rounded-md border border-[#D0E2FB] uppercase tracking-wider mb-2.5">
              <Sparkles className="h-3.5 w-3.5 text-[#FA3A08]" />
              <span>BEST SELLERS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0C1E38] tracking-tight">
              Featured Products
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-normal mt-1 max-w-xl">
              Handpicked top-rated hardware supplies, tools, sanitaryware, paints &amp; electrical items.
            </p>
          </div>

          {/* VIEW ALL LINK */}
          <div className="flex items-center gap-3">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 hover:border-[#014A94] text-xs font-bold text-[#0C1E38] hover:text-[#014A94] rounded-lg shadow-2xs transition-all duration-150"
            >
              <span>View All Products</span>
              <ArrowRight className="h-3.5 w-3.5 text-[#FA3A08]" />
            </Link>
          </div>
        </div>

        {/* 12 FEATURED PRODUCTS GRID (4 PRODUCTS PER ROW) */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 lg:gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Container>
    </section>
  );
};
