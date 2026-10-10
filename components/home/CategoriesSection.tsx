'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  LayoutGrid,
  Bath,
  Workflow,
  Wrench,
  Grid,
  Paintbrush,
  Zap,
} from 'lucide-react';
import { Container } from '@/components/ui/Container';

interface CategoryCardItem {
  id: string;
  name: string;
  slug: string;
  image: string;
  borderColor: string;
  footerBg: string;
  badgeBg: string;
  badgeIcon: React.ReactNode;
  arrowBg: string;
  arrowColor: string;
}

const CATEGORY_ITEMS: CategoryCardItem[] = [
  {
    id: 'sanitary-items',
    name: 'Sanitary Items',
    slug: 'sanitary-items',
    image: '/assets/hero/sanitary.png',
    borderColor: 'border-[#D0E2FB]',
    footerBg: 'bg-[#F2F6FC]',
    badgeBg: 'bg-[#014A94]',
    badgeIcon: <Bath className="h-4 w-4 text-white" />,
    arrowBg: 'bg-[#DDE9F8]',
    arrowColor: 'text-[#014A94]',
  },
  {
    id: 'pipes-fittings',
    name: 'Pipes & Fittings',
    slug: 'pipes-fittings',
    image: '/assets/hero/pipes.png',
    borderColor: 'border-[#D1EBE1]',
    footerBg: 'bg-[#F0F9F5]',
    badgeBg: 'bg-[#059669]',
    badgeIcon: <Workflow className="h-4 w-4 text-white" />,
    arrowBg: 'bg-[#D6F0E5]',
    arrowColor: 'text-[#059669]',
  },
  {
    id: 'hardware-tools',
    name: 'Hardware Tools',
    slug: 'hardware-tools',
    image: '/assets/hero/hardware-tools.png',
    borderColor: 'border-[#FDE3C4]',
    footerBg: 'bg-[#FFF8F0]',
    badgeBg: 'bg-[#FA3A08]',
    badgeIcon: <Wrench className="h-4 w-4 text-white" />,
    arrowBg: 'bg-[#FFEAD1]',
    arrowColor: 'text-[#FA3A08]',
  },
  {
    id: 'tiles',
    name: 'Tiles',
    slug: 'tiles',
    image: '/assets/hero/tiles.png',
    borderColor: 'border-[#E5E2DF]',
    footerBg: 'bg-[#F9F8F6]',
    badgeBg: 'bg-[#8C7A6B]',
    badgeIcon: <Grid className="h-4 w-4 text-white" />,
    arrowBg: 'bg-[#EBE7E3]',
    arrowColor: 'text-[#8C7A6B]',
  },
  {
    id: 'paint',
    name: 'Paint',
    slug: 'paint',
    image: '/assets/hero/paint.png',
    borderColor: 'border-[#FCDCDC]',
    footerBg: 'bg-[#FFF5F5]',
    badgeBg: 'bg-[#E11D48]',
    badgeIcon: <Paintbrush className="h-4 w-4 text-white" />,
    arrowBg: 'bg-[#FCE2E2]',
    arrowColor: 'text-[#E11D48]',
  },
  {
    id: 'electrical-items',
    name: 'Electrical Items',
    slug: 'electrical-items',
    image: '/assets/hero/electrical-items.png',
    borderColor: 'border-[#E9D8FD]',
    footerBg: 'bg-[#F9F5FF]',
    badgeBg: 'bg-[#7C3AED]',
    badgeIcon: <Zap className="h-4 w-4 text-white" />,
    arrowBg: 'bg-[#E9D5FF]',
    arrowColor: 'text-[#7C3AED]',
  },
];

export const CategoriesSection: React.FC = () => {
  return (
    <section id="categories" className="relative py-12 sm:py-16 bg-white overflow-hidden">
      {/* SOFT ORANGE AMBIENT GLOW IN TOP RIGHT CORNER */}
      <div className="absolute top-0 right-0 w-[420px] h-[420px] bg-gradient-to-b from-[#FFF2EE] via-[#FFF8F5] to-transparent rounded-full blur-3xl pointer-events-none opacity-80" />

      <Container className="relative z-10">
        {/* HEADER ROW */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-10">
          <div>
            {/* EYEBROW BADGE WITH GRID ICON */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF2EE] border border-[#FDE3D9] text-[#012157] text-[11px] font-bold uppercase tracking-wider mb-2.5">
              <LayoutGrid className="h-3.5 w-3.5 text-[#FA3A08]" />
              <span>SHOP BY CATEGORY</span>
            </div>

            {/* HEADING */}
            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-black text-[#012157] tracking-tight leading-tight">
              Our <span className="text-[#FA3A08]">Categories</span>
            </h2>

            {/* SUBTEXT */}
            <p className="text-xs sm:text-sm text-slate-500 font-normal mt-1.5 max-w-xl">
              Explore our wide range of products for every need
            </p>
          </div>

          {/* TOP RIGHT CONTROLS: PAGINATION ARROWS & PRIMARY BUTTON */}
          <div className="flex items-center gap-3 self-start md:self-end">
            <div className="hidden sm:flex items-center gap-2 mr-1">
              <button
                type="button"
                aria-label="Previous category"
                className="w-10 h-10 rounded-full border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-600 transition-colors shadow-xs"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label="Next category"
                className="w-10 h-10 rounded-full border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-600 transition-colors shadow-xs"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            <Link
              href="/categories"
              className="h-11 px-6 bg-[#FA3A08] hover:bg-[#d92e00] text-white text-xs sm:text-sm font-bold rounded-full transition-all flex items-center gap-2 shadow-md shadow-[#FA3A08]/20 group"
            >
              <span>View All Categories</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>

        {/* 6-COLUMN GRID OF CATEGORIES */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 sm:gap-5">
          {CATEGORY_ITEMS.map((cat) => (
            <Link
              key={cat.id}
              href={`/categories/${cat.slug}`}
              className={`group relative flex flex-col rounded-[24px] overflow-hidden border ${cat.borderColor} bg-white shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FA3A08]`}
            >
              {/* CATEGORY IMAGE CONTAINER */}
              <div className="relative w-full aspect-[4/4.5] sm:aspect-[4/4.8] bg-slate-100 overflow-hidden">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 16vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  unoptimized
                />
              </div>

              {/* CARD FOOTER CONTAINER WITH CUSTOM CATEGORY COLOR SCHEME */}
              <div
                className={`p-3.5 sm:p-4 flex items-center justify-between gap-2 rounded-b-[24px] ${cat.footerBg} border-t border-black/5`}
              >
                {/* LEFT CIRCLE ICON BADGE */}
                <div
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full ${cat.badgeBg} flex items-center justify-center flex-shrink-0 shadow-xs group-hover:scale-110 transition-transform duration-300`}
                >
                  {cat.badgeIcon}
                </div>

                {/* CATEGORY TITLE */}
                <h3 className="text-xs sm:text-sm font-bold text-[#012157] leading-tight flex-1 text-left line-clamp-1">
                  {cat.name}
                </h3>

                {/* RIGHT CIRCLE ARROW BUTTON */}
                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full ${cat.arrowBg} ${cat.arrowColor} flex items-center justify-center flex-shrink-0 transition-colors duration-300 group-hover:bg-[#FA3A08] group-hover:text-white`}
                >
                  <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
};
