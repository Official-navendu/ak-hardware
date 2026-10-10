'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ChevronRight, Sparkles, Layers } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { InnerPageHero } from '@/components/layout/InnerPageHero';
import { OFFICIAL_CATEGORIES, PAINT_SUBCATEGORIES } from '@/lib/data/mock-categories';

export default function CategoriesPage() {
  return (
    <div className="bg-[#F7F8FA] min-h-screen pb-16 font-sans">
      {/* SECTION A: COMPACT PAGE HERO */}
      <InnerPageHero
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Categories' },
        ]}
        eyebrow="EXPLORE OUR RANGE"
        title="Find Everything You Need"
        description="Explore our complete range of hardware, home improvement and building essentials, organized to help you find the right category."
        imageSrc="/assets/hero/categories.png"
        imageAlt="AK Hardware All Categories Showcase"
        imageObjectFit="cover"
      />

      <Container className="pt-10 flex flex-col gap-14">
        {/* SECTION B: MAIN CATEGORIES GRID (BALANCED 3x2 EDITORIAL GRID) */}
        <section className="scroll-mt-6">
          <div className="flex flex-col items-center text-center mb-10 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-1.5 bg-[#E8F1FD] text-[#014A94] text-[11px] font-extrabold px-3.5 py-1 rounded-md border border-[#D0E2FB] uppercase tracking-wider mb-2.5">
              <Layers className="h-3.5 w-3.5 text-[#FA3A08]" />
              <span>SHOP BY CATEGORY</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0C1E38] tracking-tight mb-2">
              Explore Our Six Core Categories
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
              Browse our six essential categories and discover the right solutions for your home or project.
            </p>
          </div>

          {/* BALANCED 3x2 CATEGORY CARDS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {OFFICIAL_CATEGORIES.map((cat, idx) => (
              <Link
                key={cat.slug}
                href={`/categories/${cat.slug}`}
                className="group bg-white border border-slate-200/90 hover:border-[#014A94]/60 rounded-3xl overflow-hidden shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between focus:outline-none focus:ring-2 focus:ring-[#014A94] focus:ring-offset-2"
              >
                <div>
                  {/* LARGE HIGH-IMPACT IMAGE AREA */}
                  <div className="relative w-full h-56 sm:h-60 bg-[#F8FAFC] overflow-hidden border-b border-slate-100">
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#012157]/70 via-black/15 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300" />
                    
                    {/* NUMBER BADGE */}
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-white/50 shadow-2xs flex items-center gap-1.5">
                      <span className="text-[11px] font-black text-[#014A94]">
                        0{idx + 1}
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FA3A08]" />
                    </div>

                    {/* OVERLAY TITLE */}
                    <div className="absolute bottom-4 left-5 right-5 text-white">
                      <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight drop-shadow-xs group-hover:text-[#60A5FA] transition-colors">
                        {cat.name}
                      </h3>
                    </div>
                  </div>

                  {/* CONTENT AREA */}
                  <div className="p-6">
                    <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                      {cat.description}
                    </p>
                  </div>
                </div>

                {/* CARD FOOTER CTA */}
                <div className="px-6 pb-6 pt-3 flex items-center justify-between border-t border-slate-100 mt-auto">
                  <span className="text-xs font-extrabold text-[#014A94] group-hover:text-[#FA3A08] transition-colors flex items-center gap-1">
                    Explore Category
                  </span>
                  <div className="w-9 h-9 rounded-full bg-[#F4F7FB] text-[#014A94] group-hover:bg-[#FA3A08] group-hover:text-white flex items-center justify-center transition-all duration-300 shadow-2xs group-hover:translate-x-1 flex-shrink-0">
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* SECTION C: PAINT SUBCATEGORY NAVIGATION */}
        <section className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-2xs">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 border-b border-slate-100 pb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-[#FFF2EE] text-[#FA3A08] text-[11px] font-extrabold px-3 py-1 rounded-md border border-[#FFDACF] uppercase tracking-wider mb-2">
                <Sparkles className="h-3.5 w-3.5 text-[#FA3A08]" />
                <span>PAINT COLLECTION</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-[#0C1E38] tracking-tight">
                Explore Paint Categories
              </h2>
              <p className="text-xs text-slate-500 font-normal mt-1">
                Browse dedicated interior, exterior, and wood paint finishes under our Paint collection.
              </p>
            </div>

            <Link
              href="/categories/paint"
              className="text-xs font-extrabold text-[#014A94] hover:text-[#FA3A08] transition-colors flex items-center gap-1.5 self-start sm:self-auto"
            >
              <span>View All Paint Products</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {PAINT_SUBCATEGORIES.map((sub) => (
              <Link
                key={sub.slug}
                href={`/categories/paint/${sub.slug}`}
                className="group bg-[#F7F8FA] hover:bg-white border border-slate-200/80 hover:border-[#014A94]/40 p-5 rounded-2xl transition-all duration-200 flex flex-col justify-between hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#014A94]"
              >
                <div>
                  <div className="relative w-full h-32 rounded-xl bg-white overflow-hidden border border-slate-100 mb-4">
                    <Image
                      src={sub.image}
                      alt={sub.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2.5 left-2.5 bg-[#012157]/80 text-white text-[10px] font-bold px-2 py-0.5 rounded-md backdrop-blur-2xs">
                      Paint Subcategory
                    </div>
                  </div>

                  <h3 className="font-extrabold text-[#0C1E38] text-base group-hover:text-[#014A94] transition-colors mb-1.5">
                    {sub.name}
                  </h3>

                  <p className="text-xs text-slate-600 font-normal leading-relaxed mb-4">
                    {sub.description}
                  </p>
                </div>

                <div className="flex items-center text-xs font-bold text-[#014A94] group-hover:text-[#FA3A08] transition-colors gap-1 pt-2 border-t border-slate-200/60">
                  <span>Browse Subcategory</span>
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform duration-200" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* SECTION D: COMPACT CLOSING CTA */}
        <section className="bg-[#012157] text-white rounded-3xl p-8 sm:p-10 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-bl-full pointer-events-none" />
          
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
            <div className="max-w-xl">
              <span className="inline-block text-[10px] font-black tracking-widest text-[#60A5FA] uppercase mb-1">
                NEED ASSISTANCE?
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-2">
                Need Help Finding the Right Category?
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed">
                Explore our full product catalog or contact our expert team for guidance on your project requirements.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              <Link
                href="/shop"
                className="w-full sm:w-auto bg-[#FA3A08] hover:bg-[#d92e00] text-white font-extrabold text-xs px-6 py-3.5 rounded-xl inline-flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg"
              >
                <span>Browse All Products</span>
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/contact"
                className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-extrabold text-xs px-6 py-3.5 rounded-xl inline-flex items-center justify-center gap-2 transition-all border border-white/20"
              >
                <span>Contact Us</span>
              </Link>
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
}


