'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { ProductCard } from '@/components/products/ProductCard';
import { MOCK_PRODUCTS } from '@/lib/data/mock-products';
import { OFFICIAL_CATEGORIES } from '@/lib/data/mock-categories';

export const CategoryShowcase: React.FC = () => {
  const [activeTabSlug, setActiveTabSlug] = useState<string>('pipes');

  const activeCategory = OFFICIAL_CATEGORIES.find((c) => c.slug === activeTabSlug) || OFFICIAL_CATEGORIES[1];

  // Filter products for active category
  let categoryProducts = MOCK_PRODUCTS.filter(
    (p) =>
      p.category.toLowerCase().includes(activeCategory.name.toLowerCase().split(' ')[0]) ||
      p.category.toLowerCase().includes(activeCategory.slug.toLowerCase()) ||
      (activeCategory.slug === 'pipes' && p.category.toLowerCase().includes('pipe')) ||
      (activeCategory.slug === 'sanitary-items' && p.category.toLowerCase().includes('sanitary')) ||
      (activeCategory.slug === 'hardware-tools' && p.category.toLowerCase().includes('tool')) ||
      (activeCategory.slug === 'electrical-items' && p.category.toLowerCase().includes('electr')) ||
      (activeCategory.slug === 'paint' && p.category.toLowerCase().includes('paint')) ||
      (activeCategory.slug === 'tiles' && (p.category.toLowerCase().includes('tile') || p.category.toLowerCase().includes('building')))
  );

  // Fallback to ensure exactly 5 products are shown in the 5-column grid
  if (categoryProducts.length < 5) {
    const extraProducts = MOCK_PRODUCTS.filter((p) => !categoryProducts.some((cp) => cp.id === p.id));
    categoryProducts = [...categoryProducts, ...extraProducts].slice(0, 5);
  } else {
    categoryProducts = categoryProducts.slice(0, 5);
  }

  return (
    <section className="py-10 sm:py-14 bg-white border-b border-slate-100">
      <Container>
        {/* HEADER ROW */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <span className="inline-flex items-center bg-[#E8F1FD] text-[#1B4E9B] text-[11px] font-semibold px-3 py-0.5 rounded-full border border-[#D0E2FB] uppercase tracking-wider mb-2">
              DEPARTMENT SHOWCASE
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0C1E38] tracking-tight">
              Department Showcase
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-normal mt-1">
              Discover our complete range of high quality products
            </p>
          </div>

          <Link
            href={`/category/${activeCategory.slug}`}
            className="text-xs font-semibold text-[#1B4E9B] hover:text-[#10346B] inline-flex items-center gap-1 hover:underline self-start sm:self-end"
          >
            <span>View All Departments</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        {/* PILL TABS SELECTION */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
          {OFFICIAL_CATEGORIES.map((cat) => {
            const isActive = cat.slug === activeTabSlug;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveTabSlug(cat.slug)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 border ${
                  isActive
                    ? 'bg-[#1B4E9B] text-white border-[#1B4E9B] shadow-2xs'
                    : 'bg-[#F4F7FB] text-slate-700 border-slate-200/80 hover:bg-slate-100'
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* 5-COLUMN PRODUCT GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-5">
          {categoryProducts.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </Container>
    </section>
  );
};
