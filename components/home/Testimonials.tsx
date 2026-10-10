'use client';

import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, CheckCircle2 } from 'lucide-react';
import { Container } from '@/components/ui/Container';

export const Testimonials: React.FC = () => {
  const reviews = [
    {
      id: 'rev-1',
      quote:
        'Great quality hardware products and fast delivery! AK Hardware has everything I need for my home renovation project.',
      name: 'Rohit Sharma',
      location: 'Ghaziabad, UP',
      role: 'Homeowner',
      initials: 'RS',
      rating: 5,
      category: 'Sanitary & Hardware',
    },
    {
      id: 'rev-2',
      quote:
        'Best prices and 100% genuine products. The CPVC pipes and fittings quality is top notch. Highly recommended for contractors!',
      name: 'Priya Mehta',
      location: 'Noida, UP',
      role: 'Interior Designer',
      initials: 'PM',
      rating: 5,
      category: 'Pipes & Fittings',
    },
    {
      id: 'rev-3',
      quote:
        'Excellent customer service and wide variety of tools under one roof. My go-to hardware store for construction supplies.',
      name: 'Amit Verma',
      location: 'Gurgaon, HR',
      role: 'Civil Contractor',
      initials: 'AV',
      rating: 5,
      category: 'Hardware Tools',
    },
    {
      id: 'rev-4',
      quote:
        'Extremely durable power tools and prompt doorstep delivery. Saved a lot of time on our site installation work.',
      name: 'Vikram Singh',
      location: 'Delhi NCR',
      role: 'Site Engineer',
      initials: 'VS',
      rating: 5,
      category: 'Electrical & Power Tools',
    },
    {
      id: 'rev-5',
      quote:
        'Superb paint range and premium finish tiles. The team gave expert guidance on quantities required.',
      name: 'Sneha Kapoor',
      location: 'Faridabad, HR',
      role: 'Architect',
      initials: 'SK',
      rating: 5,
      category: 'Tiles & Paint',
    },
  ];

  // Carousel slider index state
  const [activeSlide, setActiveSlide] = useState(0);

  const handleNext = () => {
    setActiveSlide((prev) => (prev + 1) % reviews.length);
  };

  const handlePrev = () => {
    setActiveSlide((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <section className="py-14 sm:py-18 bg-[#F7F8FA] border-b border-slate-100 overflow-hidden">
      <Container>
        {/* HEADER & CONTROLS ROW */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-[#E8F1FD] text-[#014A94] text-[11px] font-extrabold px-3 py-1 rounded-md border border-[#D0E2FB] uppercase tracking-wider mb-2.5">
              <span>CUSTOMER REVIEWS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0C1E38] tracking-tight">
              What Our Customers Say
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-normal mt-1 max-w-lg">
              Trusted by 15,000+ homeowners, contractors, architects, and builders across India.
            </p>
          </div>

          {/* CIRCULAR PREV / NEXT NAVIGATION CONTROLS */}
          <div className="flex items-center gap-2.5 self-start sm:self-end">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous customer review"
              className="w-10 h-10 rounded-full border border-slate-200 bg-white text-[#0C1E38] hover:bg-[#014A94] hover:text-white hover:border-[#014A94] flex items-center justify-center transition-all duration-200 shadow-2xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FA3A08]"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next customer review"
              className="w-10 h-10 rounded-full border border-slate-200 bg-white text-[#0C1E38] hover:bg-[#014A94] hover:text-white hover:border-[#014A94] flex items-center justify-center transition-all duration-200 shadow-2xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FA3A08]"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* TESTIMONIAL SLIDER CARDS GRID WITH NAVY/ORANGE/WHITE HOVER SYSTEM */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[0, 1, 2].map((offset) => {
            const reviewIndex = (activeSlide + offset) % reviews.length;
            const rev = reviews[reviewIndex];

            return (
              <div
                key={rev.id + '-' + offset}
                tabIndex={0}
                className={`bg-white hover:bg-[#012157] border border-slate-200/90 hover:border-[#FA3A08] rounded-2xl p-6 flex flex-col justify-between shadow-2xs hover:shadow-md transition-all duration-300 ease-in-out relative group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FA3A08] ${
                  offset === 2 ? 'hidden lg:flex' : offset === 1 ? 'hidden md:flex' : 'flex'
                }`}
              >
                <div>
                  {/* QUOTE ICON + RATING STARS */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex text-[#F9970A] gap-1">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                    <Quote className="h-6 w-6 text-slate-200 group-hover:text-white/20 transition-colors duration-300" />
                  </div>

                  {/* REVIEW COMMENT (WHITE ON HOVER) */}
                  <p className="text-xs sm:text-sm text-slate-700 group-hover:text-slate-100 leading-relaxed font-normal mb-6 min-h-[72px] transition-colors duration-300">
                    &quot;{rev.quote}&quot;
                  </p>
                </div>

                {/* AUTHOR FOOTER */}
                <div className="pt-4 border-t border-slate-100 group-hover:border-white/10 flex items-center justify-between gap-3 transition-colors duration-300">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#012157] group-hover:bg-[#FA3A08] text-white font-black text-xs flex items-center justify-center flex-shrink-0 border-2 border-white shadow-2xs transition-colors duration-300">
                      {rev.initials}
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-[#0C1E38] group-hover:text-white text-xs sm:text-sm transition-colors duration-300">
                          {rev.name}
                        </span>
                        <CheckCircle2 className="h-3.5 w-3.5 text-[#00A23A] group-hover:text-emerald-400 transition-colors duration-300" />
                      </div>
                      <span className="text-[11px] text-slate-500 group-hover:text-slate-300 font-normal transition-colors duration-300">
                        {rev.role} • {rev.location}
                      </span>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold text-[#014A94] group-hover:text-white bg-[#E8F1FD] group-hover:bg-[#FA3A08] px-2 py-0.5 rounded-full border border-[#D0E2FB] group-hover:border-[#FA3A08] transition-colors duration-300">
                    {rev.category}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* PAGINATION DOTS */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {reviews.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FA3A08] ${
                activeSlide === i ? 'w-8 bg-[#014A94]' : 'w-2 bg-slate-300 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};
