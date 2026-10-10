'use client';

import React from 'react';
import Image from 'next/image';
import { ShieldCheck, Tag, LayoutGrid, Truck, Headphones } from 'lucide-react';
import { Container } from '@/components/ui/Container';

export const WhyChooseUs: React.FC = () => {
  const benefits = [
    {
      icon: <LayoutGrid className="h-5 w-5 text-[#014A94] group-hover:text-white transition-colors duration-300" />,
      title: 'Wide Selection',
      desc: '10,000+ quality hardware & building products under one roof.',
    },
    {
      icon: <Tag className="h-5 w-5 text-[#014A94] group-hover:text-white transition-colors duration-300" />,
      title: 'Best Prices',
      desc: 'Competitive wholesale & retail rates with daily offers.',
    },
    {
      icon: <ShieldCheck className="h-5 w-5 text-[#014A94] group-hover:text-white transition-colors duration-300" />,
      title: '100% Genuine',
      desc: 'Directly sourced authentic items from verified brands.',
    },
    {
      icon: <Truck className="h-5 w-5 text-[#014A94] group-hover:text-white transition-colors duration-300" />,
      title: 'Fast Doorstep Delivery',
      desc: 'Reliable and safe transport for heavy supplies across India.',
    },
    {
      icon: <Headphones className="h-5 w-5 text-[#014A94] group-hover:text-white transition-colors duration-300" />,
      title: 'Expert Support',
      desc: 'Dedicated technical assistance for contractors & homeowners.',
    },
  ];

  return (
    <section className="py-14 sm:py-20 bg-white border-b border-slate-100 overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* LEFT COLUMN (~42% -> 5 cols out of 12) */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <span className="inline-flex items-center bg-[#E8F1FD] text-[#014A94] text-[11px] font-extrabold px-3 py-1 rounded-md border border-[#D0E2FB] uppercase tracking-wider mb-3">
              WHY AK HARDWARE
            </span>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0C1E38] tracking-tight leading-tight mb-3">
              Why Choose AK Hardware
            </h2>

            <p className="text-sm text-slate-600 font-normal leading-relaxed mb-8">
              Your trusted partner for all hardware and building material needs.
            </p>

            {/* BENEFITS LIST CARDS WITH NAVY/ORANGE/WHITE HOVER SYSTEM */}
            <div className="flex flex-col gap-4.5 w-full">
              {benefits.map((b, i) => (
                <div
                  key={i}
                  tabIndex={0}
                  className="group flex items-start gap-3.5 p-3 sm:p-3.5 rounded-xl border border-slate-100 bg-[#FAFCFF] hover:bg-[#012157] hover:border-[#FA3A08] transition-all duration-300 ease-in-out cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FA3A08]"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#E8F1FD] group-hover:bg-[#FA3A08] flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors duration-300">
                    {b.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-[#0C1E38] group-hover:text-white text-xs sm:text-sm transition-colors duration-300">
                      {b.title}
                    </h3>
                    <p className="text-xs text-slate-500 group-hover:text-slate-200 font-normal leading-snug mt-0.5 transition-colors duration-300">
                      {b.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN (~58% -> 7 cols out of 12) */}
          <div className="lg:col-span-7 relative">
            <div className="relative w-full h-[360px] sm:h-[460px] lg:h-[540px] rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-lg overflow-hidden bg-slate-100">
              <Image
                src="/assets/why-choose-us.png"
                alt="Why Choose AK Hardware - Professional Hardware & Building Supplies"
                fill
                className="object-cover object-center transform hover:scale-102 transition-transform duration-500"
                sizes="(max-width: 1024px) 100vw, 58vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C1E38]/40 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-md flex items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-bold text-[#014A94] uppercase tracking-wider block">
                    Established Trust
                  </span>
                  <p className="text-xs font-semibold text-[#0C1E38] mt-0.5">
                    Serving 15,000+ Happy Customers &amp; Builders
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#FA3A08] text-white font-black text-xs flex items-center justify-center flex-shrink-0">
                  AK
                </div>
              </div>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
};
