'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Target,
  Eye,
  Shield,
  Users,
  CheckCircle2,
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { InnerPageHero } from '@/components/layout/InnerPageHero';
import { WhyChooseUs } from '@/components/home/WhyChooseUs';
import { PartnersSection } from '@/components/home/PartnersSection';
import { HomeCTA } from '@/components/home/HomeCTA';

export default function AboutPage() {

  return (
    <div className="bg-[#F7F8FA] min-h-screen">
      {/* 1. ABOUT HERO HEADER (EDITORIAL SPLIT - LEFT IMAGE, RIGHT CONTENT) */}
      <InnerPageHero
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'About Us' },
        ]}
        eyebrow="ABOUT AK HARDWARE"
        title="Built Around Better Hardware"
        description="Your trusted partner for high-quality hardware, sanitaryware, pipes, tools, paints and building materials. We make it easy for homeowners, builders and professionals to get everything they need, all in one place."
        primaryCta={{
          label: 'Explore Our Products',
          href: '/shop',
        }}
        imageSrc="/assets/hero/about.png"
        imageAlt="AK Hardware Store & Warehouse"
        imageObjectFit="cover"
      />

      {/* 2. OUR STORY SECTION */}
      <section className="py-12 sm:py-16 bg-white border-b border-slate-100">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* LEFT IMAGE: STORE BUILDING & PRODUCTS */}
            <div className="lg:col-span-5 relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-slate-200/90 group">
              <Image
                src="/assets/story.png"
                alt="AK Hardware Products & Inventory Showcase"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-60 pointer-events-none" />
            </div>

            {/* CENTER TEXT CONTENT */}
            <div className="lg:col-span-4 flex flex-col items-start gap-4">
              <span className="inline-flex items-center bg-[#E8F1FD] text-[#014A94] text-[11px] font-extrabold px-3 py-1 rounded-md border border-[#D0E2FB] uppercase tracking-wider">
                OUR STORY
              </span>

              <h2 className="text-2xl sm:text-3xl font-black text-[#0C1E38] tracking-tight leading-snug">
                From a Local Store to Your Trusted Partner
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                AK Hardware started with a simple mission — to provide high-quality hardware and building materials at the best prices, with a focus on trust, service and customer satisfaction.
              </p>

              <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                What began as a local store has now grown into a one-stop destination for homeowners, contractors and businesses. We continuously expand our product range, partner with top brands and improve our services to serve you better every day.
              </p>

              <Link
                href="/shop"
                className="bg-[#FA3A08] hover:bg-[#d92e00] text-white font-bold text-xs px-5 py-2.5 rounded-xl inline-flex items-center gap-2 transition-colors shadow-2xs mt-2"
              >
                <span>Explore Products</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {/* RIGHT STATS GRID */}
            <div className="lg:col-span-3 flex flex-col gap-4">
              <div className="bg-[#F4F7FB] border border-slate-100 p-4 rounded-xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white text-[#014A94] flex items-center justify-center font-bold shadow-2xs text-sm">
                  5+
                </div>
                <div>
                  <h4 className="font-extrabold text-[#0C1E38] text-sm">5+</h4>
                  <p className="text-[11px] text-slate-500 font-normal">Years of Experience</p>
                </div>
              </div>

              <div className="bg-[#F4F7FB] border border-slate-100 p-4 rounded-xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white text-[#014A94] flex items-center justify-center font-bold shadow-2xs">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-[#0C1E38] text-sm">15,000+</h4>
                  <p className="text-[11px] text-slate-500 font-normal">Happy Customers</p>
                </div>
              </div>

              <div className="bg-[#F4F7FB] border border-slate-100 p-4 rounded-xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white text-[#014A94] flex items-center justify-center font-bold shadow-2xs text-lg">
                  📦
                </div>
                <div>
                  <h4 className="font-extrabold text-[#0C1E38] text-sm">10,000+</h4>
                  <p className="text-[11px] text-slate-500 font-normal">Products Available</p>
                </div>
              </div>

              <div className="bg-[#F4F7FB] border border-slate-100 p-4 rounded-xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white text-[#014A94] flex items-center justify-center font-bold shadow-2xs text-lg">
                  🏷
                </div>
                <div>
                  <h4 className="font-extrabold text-[#0C1E38] text-sm">50+</h4>
                  <p className="text-[11px] text-slate-500 font-normal">Trusted Brands</p>
                </div>
              </div>
            </div>

          </div>
        </Container>
      </section>

      {/* 3. OUR MISSION, VISION & VALUES SECTION (DETAILED SQUARE CARDS GRID) */}
      <section className="py-14 sm:py-20 bg-[#FAFCFF] border-b border-slate-100">
        <Container>
          <div className="flex flex-col items-center text-center mb-12 max-w-2xl mx-auto">
            <span className="inline-flex items-center bg-[#E8F1FD] text-[#014A94] text-[11px] font-extrabold px-3 py-1 rounded-md border border-[#D0E2FB] uppercase tracking-wider mb-3">
              FOUNDATIONAL GUIDING PRINCIPLES
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0C1E38] tracking-tight mb-3">
              Our Mission, Vision &amp; <span className="text-[#FA3A08]">Core Values</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-normal leading-relaxed">
              Discover the principles that drive AK Hardware to deliver exceptional products, dependable service, and continuous value for every project.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            
            {/* CARD 1 — MISSION (DEEP NAVY SQUARE CARD) */}
            <div className="bg-[#012157] text-white rounded-2xl p-6 sm:p-8 flex flex-col justify-between border border-[#013586] shadow-xl hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full pointer-events-none transition-all duration-500 group-hover:scale-110" />
              
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-white/10 text-white flex items-center justify-center border border-white/20 shadow-inner">
                    <Target className="h-7 w-7 text-white" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#60A5FA] bg-white/10 px-2.5 py-1 rounded-md border border-white/10">
                    OUR MISSION
                  </span>
                </div>

                <h3 className="font-extrabold text-white text-xl mb-3 tracking-tight">
                  Empower Building &amp; Living
                </h3>

                <p className="text-xs sm:text-sm text-slate-200 font-normal leading-relaxed mb-6 border-b border-white/10 pb-5">
                  To provide homeowners, contractors, and builders across India with 100% genuine hardware, plumbing, sanitaryware, paints, and tools at fair wholesale pricing with dependable doorstep delivery.
                </p>

                {/* DETAILED SQUARE BULLET POINTS */}
                <div className="space-y-3">
                  <div className="flex items-start gap-3 bg-white/5 p-3 rounded-xl border border-white/10">
                    <CheckCircle2 className="h-4 w-4 text-[#60A5FA] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-white">100% Genuine Inventory</h4>
                      <p className="text-[11px] text-slate-300 font-normal mt-0.5 leading-snug">Direct sourcing from Asian Paints, Berger, Astral, Supreme &amp; Jaquar.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-white/5 p-3 rounded-xl border border-white/10">
                    <CheckCircle2 className="h-4 w-4 text-[#60A5FA] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-white">Wholesale Trade Pricing</h4>
                      <p className="text-[11px] text-slate-300 font-normal mt-0.5 leading-snug">Honest rates for contractors &amp; transparent retail pricing for home projects.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-white/5 p-3 rounded-xl border border-white/10">
                    <CheckCircle2 className="h-4 w-4 text-[#60A5FA] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-white">Fast Site Fulfillment</h4>
                      <p className="text-[11px] text-slate-300 font-normal mt-0.5 leading-snug">Prompt dispatch ensuring zero construction delays for your project.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CARD 2 — VISION (ROYAL BLUE ACCENTED WHITE SQUARE CARD) */}
            <div className="bg-white border border-slate-200 text-[#0C1E38] rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-lg hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#E8F1FD]/60 rounded-bl-full pointer-events-none transition-all duration-500 group-hover:scale-110" />
              
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-[#E8F1FD] text-[#014A94] flex items-center justify-center border border-[#D0E2FB] shadow-2xs">
                    <Eye className="h-7 w-7" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#014A94] bg-[#E8F1FD] px-2.5 py-1 rounded-md border border-[#D0E2FB]">
                    OUR VISION
                  </span>
                </div>

                <h3 className="font-extrabold text-[#0C1E38] text-xl mb-3 tracking-tight">
                  India&apos;s Preferred Hardware Destination
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed mb-6 border-b border-slate-100 pb-5">
                  To set the gold standard in hardware retail and distribution by integrating modern digital tools, AI paint visualization, and streamlined supply chains for every Indian home and construction site.
                </p>

                {/* DETAILED SQUARE BULLET POINTS */}
                <div className="space-y-3">
                  <div className="flex items-start gap-3 bg-[#F8FAFC] p-3 rounded-xl border border-slate-200/80">
                    <CheckCircle2 className="h-4 w-4 text-[#014A94] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-[#0C1E38]">Omnichannel Innovation</h4>
                      <p className="text-[11px] text-slate-500 font-normal mt-0.5 leading-snug">Blending local in-store expertise with interactive web catalogue tools.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-[#F8FAFC] p-3 rounded-xl border border-slate-200/80">
                    <CheckCircle2 className="h-4 w-4 text-[#014A94] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-[#0C1E38]">Building Stronger Communities</h4>
                      <p className="text-[11px] text-slate-500 font-normal mt-0.5 leading-snug">Supporting 15,000+ happy clients with safe, durable building supplies.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-[#F8FAFC] p-3 rounded-xl border border-slate-200/80">
                    <CheckCircle2 className="h-4 w-4 text-[#014A94] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-[#0C1E38]">Eco &amp; Water Efficiency</h4>
                      <p className="text-[11px] text-slate-500 font-normal mt-0.5 leading-snug">Promoting lead-free paints, water-saving faucets &amp; durable CPVC pipes.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CARD 3 — VALUES (ORANGE GRADIENT SQUARE CARD) */}
            <div className="bg-gradient-to-br from-[#FA3A08] via-[#F97316] to-[#EA580C] text-white rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-xl hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-full pointer-events-none transition-all duration-500 group-hover:scale-110" />
              
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-white/20 text-white flex items-center justify-center border border-white/30 shadow-inner">
                    <Shield className="h-7 w-7 text-white" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-white bg-white/20 px-2.5 py-1 rounded-md border border-white/30">
                    OUR VALUES
                  </span>
                </div>

                <h3 className="font-extrabold text-white text-xl mb-3 tracking-tight">
                  Uncompromising Standards &amp; Trust
                </h3>

                <p className="text-xs sm:text-sm text-slate-100 font-normal leading-relaxed mb-6 border-b border-white/20 pb-5">
                  Our business is built upon bedrock values — unwavering integrity, strict product verification, customer-first service, and deep commitment to quality craftsmanship.
                </p>

                {/* DETAILED SQUARE BULLET POINTS */}
                <div className="space-y-3">
                  <div className="flex items-start gap-3 bg-white/10 p-3 rounded-xl border border-white/20">
                    <CheckCircle2 className="h-4 w-4 text-white shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-white">Strict Quality Guarantee</h4>
                      <p className="text-[11px] text-slate-100 font-normal mt-0.5 leading-snug">Every product undergoes rigorous specs &amp; durability assessment.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-white/10 p-3 rounded-xl border border-white/20">
                    <CheckCircle2 className="h-4 w-4 text-white shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-white">Customer-First Ethos</h4>
                      <p className="text-[11px] text-slate-100 font-normal mt-0.5 leading-snug">Dedicated advisory &amp; quick resolution for every buyer request.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-white/10 p-3 rounded-xl border border-white/20">
                    <CheckCircle2 className="h-4 w-4 text-white shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-white">Long-term Partnership</h4>
                      <p className="text-[11px] text-slate-100 font-normal mt-0.5 leading-snug">Fostering lifelong trust with tradesmen, contractors, and families.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </Container>
      </section>

      {/* 4. WHY AK HARDWARE */}
      <WhyChooseUs />

      {/* 5. OUR PARTNERS */}
      <PartnersSection />

      {/* 6. HOME CTA */}
      <HomeCTA />
    </div>
  );
}
