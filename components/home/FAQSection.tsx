'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Plus, Minus, HelpCircle } from 'lucide-react';
import { Container } from '@/components/ui/Container';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What payment methods do you accept?',
      a: 'We accept Credit/Debit Cards, Net Banking, UPI (Google Pay, PhonePe, Paytm), and Cash on Delivery for eligible orders.',
    },
    {
      q: 'Do you offer cash on delivery?',
      a: 'Yes, Cash on Delivery is available across most pincodes in India for orders up to ₹10,000.',
    },
    {
      q: 'How long does delivery take?',
      a: 'Standard delivery takes 3 to 5 business days depending on your location. Metro cities enjoy 24 to 48 hour delivery.',
    },
    {
      q: 'Can I return or exchange a product?',
      a: 'Yes! We offer a 7-day hassle-free return policy for unused items in original packaging.',
    },
    {
      q: 'Do you provide bulk discounts?',
      a: 'Yes, special trade pricing and bulk discounts are available for contractors and large construction orders.',
    },
    {
      q: 'How can I track my order?',
      a: 'Registered users can view real-time tracking in their customer Account dashboard anytime.',
    },
  ];

  return (
    <section id="faq" className="py-14 sm:py-20 bg-white border-b border-slate-100 overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* LEFT COLUMN (~45% -> 5 cols out of 12) */}
          <div className="lg:col-span-5 relative">
            <div className="relative w-full h-[340px] sm:h-[440px] lg:h-[500px] rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-lg overflow-hidden bg-slate-100">
              <Image
                src="/assets/faq-showcase.jpg"
                alt="AK Hardware Support & Frequently Asked Questions Showcase"
                fill
                className="object-cover object-center transform hover:scale-102 transition-transform duration-500"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C1E38]/50 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-md flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#014A94] text-white flex items-center justify-center flex-shrink-0">
                  <HelpCircle className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#0C1E38] block">
                    Need Immediate Assistance?
                  </span>
                  <p className="text-[11px] text-slate-500 font-normal">
                    Call our hardware support hotline at <a href="tel:+917484034410" className="font-bold text-[#0C1E38] hover:underline">7484034410</a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN (~55% -> 7 cols out of 12) */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <span className="inline-flex items-center bg-[#E8F1FD] text-[#014A94] text-[11px] font-extrabold px-3 py-1 rounded-md border border-[#D0E2FB] uppercase tracking-wider mb-2.5">
              GOT QUESTIONS?
            </span>

            <h2 className="text-2xl sm:text-3xl font-black text-[#0C1E38] tracking-tight mb-1.5">
              Frequently Asked Questions
            </h2>

            <p className="text-xs sm:text-sm text-slate-500 font-normal leading-relaxed mb-6">
              Find answers to common questions about our products and services.
            </p>

            {/* ACCORDION ROWS WITH NAVY/ORANGE/WHITE HOVER SYSTEM */}
            <div className="flex flex-col gap-3 w-full">
              {faqs.map((faq, idx) => {
                const isOpen = openIndex === idx;
                return (
                  <div
                    key={idx}
                    className={`group bg-white hover:bg-[#012157] border rounded-xl overflow-hidden transition-all duration-300 ease-in-out ${
                      isOpen
                        ? 'border-[#014A94] shadow-2xs'
                        : 'border-slate-200/80 hover:border-[#FA3A08]'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? null : idx)}
                      className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-[#0C1E38] group-hover:text-white transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FA3A08]"
                    >
                      <span>{faq.q}</span>
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
                          isOpen
                            ? 'bg-[#014A94] group-hover:bg-[#FA3A08] text-white'
                            : 'bg-slate-100 group-hover:bg-[#FA3A08] text-slate-600 group-hover:text-white'
                        }`}
                      >
                        {isOpen ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                      </div>
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-4 text-xs text-slate-600 group-hover:text-slate-200 leading-relaxed font-normal border-t border-slate-100 group-hover:border-white/10 pt-3 bg-slate-50/50 group-hover:bg-transparent transition-colors duration-300">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
};
