'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

const CAROUSEL_SLIDES = [
  {
    id: 'slide-1',
    src: '/assets/hero/carousel-1.png',
    alt: 'Muzaffarpur Hardware & Building Materials Banner',
  },
  {
    id: 'slide-2',
    src: '/assets/hero/carousel-2.png',
    alt: 'Berger & Asian Paints Collection Banner',
  },
  {
    id: 'slide-3',
    src: '/assets/hero/carousel-3.png',
    alt: 'Sanitaryware & Bathroom Solutions Banner',
  },
  {
    id: 'slide-4',
    src: '/assets/hero/carousel-4.png',
    alt: 'Heavy Duty Pipes & Plumbing Systems Banner',
  },
];

export const Hero: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + CAROUSEL_SLIDES.length) % CAROUSEL_SLIDES.length);
  }, []);

  // Autoplay functionality (4.5s interval for desktop)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      handleNext();
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused, handleNext]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const isSwipeLeft = distance > 40;
    const isSwipeRight = distance < -40;

    if (isSwipeLeft) {
      handleNext();
    } else if (isSwipeRight) {
      handlePrev();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <>
      {/* 1. DESKTOP HERO CAROUSEL (UNCHANGED FOR DESKTOP VIEWPORTS) */}
      <section
        className="hidden lg:block relative w-full overflow-hidden bg-white border-b border-slate-200/80"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* CAROUSEL SLIDES TRACK */}
        <div
          className="flex transition-transform duration-500 ease-in-out w-full"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {CAROUSEL_SLIDES.map((slide, idx) => (
            <div key={slide.id} className="w-full flex-shrink-0 relative bg-[#0C1E38]">
              <Link
                href="/shop"
                className="block w-full relative aspect-[16/9] sm:aspect-[1.85/1] md:aspect-[1.95/1] lg:aspect-[2/1] max-h-[580px] overflow-hidden group cursor-pointer bg-[#0C1E38]"
              >
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  priority={idx === 0}
                  sizes="100vw"
                  className="object-contain object-center group-hover:scale-[1.005] transition-transform duration-500"
                />
              </Link>
            </div>
          ))}
        </div>

        {/* PREVIOUS BUTTON */}
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous Slide"
          className="absolute left-3 sm:left-6 md:left-8 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/85 hover:bg-white text-[#0C1E38] shadow-lg flex items-center justify-center transition-all duration-200 focus:outline-none opacity-85 hover:opacity-100 hover:scale-105"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* NEXT BUTTON */}
        <button
          type="button"
          onClick={handleNext}
          aria-label="Next Slide"
          className="absolute right-3 sm:right-6 md:right-8 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/85 hover:bg-white text-[#0C1E38] shadow-lg flex items-center justify-center transition-all duration-200 focus:outline-none opacity-85 hover:opacity-100 hover:scale-105"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* PAGINATION DOTS */}
        <div className="absolute bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-black/35 backdrop-blur-md px-3.5 py-1.5 rounded-full">
          {CAROUSEL_SLIDES.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Slide ${idx + 1}`}
              className={`transition-all duration-300 rounded-full focus:outline-none ${
                currentIndex === idx
                  ? 'w-7 sm:w-8 h-2 bg-[#FA3A08]'
                  : 'w-2 h-2 bg-white/70 hover:bg-white'
              }`}
            />
          ))}
        </div>
      </section>

      {/* 2. MOBILE HOMEPAGE HERO (OPTIMIZED RESPONSIVE COMPOSITION FOR MOBILE) */}
      <section className="lg:hidden relative bg-[#F7F8FA] border-b border-slate-200/80 py-7 px-5 sm:px-6 overflow-hidden">
        {/* SUBTLE FINE GRAIN BACKGROUND TEXTURE */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.085] mix-blend-multiply z-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0.0039 0 0 0 0 0.1294 0 0 0 0 0.3412 0 0 0 1 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            backgroundSize: '180px 180px',
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 flex flex-col gap-4.5 max-w-lg mx-auto">
          {/* EYEBROW */}
          <span className="text-[11px] font-bold text-[#014A94] uppercase tracking-[0.1em]">
            HAR KAAM, EK HI NAAM • MUZAFFARPUR
          </span>

          {/* HEADING */}
          <h1 className="text-[32px] sm:text-[36px] font-extrabold text-[#111827] tracking-tight leading-[1.12]">
            Your Trusted Hardware Store in Muzaffarpur
          </h1>

          {/* SUPPORTING TEXT */}
          <p className="text-sm sm:text-base text-slate-600 font-normal leading-[1.55] max-w-full">
            Sanitaryware, Paints, Pipes &amp; Fittings, Tools, Tiles &amp; Electrical Supplies — Delivered to Your Doorstep.
          </p>

          {/* CTAS */}
          <div className="flex flex-col sm:flex-row gap-3 pt-1">
            <Link
              href="/shop"
              className="h-[46px] px-6 bg-[#FA3A08] hover:bg-[#d92f00] text-white font-semibold text-xs rounded-[7px] inline-flex items-center justify-center gap-2 transition-colors shadow-2xs"
            >
              <span>Shop Hardware Catalog</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/categories"
              className="h-[46px] px-6 bg-white border border-[#012157] text-[#012157] hover:bg-slate-50 font-semibold text-xs rounded-[7px] inline-flex items-center justify-center transition-colors"
            >
              <span>Explore Categories</span>
            </Link>
          </div>

          {/* HERO VISUAL / IMAGE (OPEN EDITORIAL TREATMENT, NO CARD WRAPPER) */}
          <div className="relative w-full h-[260px] sm:h-[300px] rounded-xl overflow-hidden mt-1 shadow-2xs">
            <Image
              src="/assets/hero/carousel-1.png"
              alt="AK Hardware Products Showcase"
              fill
              priority
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>
    </>
  );
};
