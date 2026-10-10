'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { AnimatedHeroImage } from '@/components/ui/AnimatedHeroImage';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface InnerPageHeroProps {
  breadcrumbs?: BreadcrumbItem[];
  eyebrow?: string;
  title: React.ReactNode;
  description: string;
  primaryCta?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  secondaryCta?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  imageSrc: string;
  imageAlt: string;
  imageObjectFit?: 'cover' | 'contain';
  reverseLayout?: boolean;
}

export const InnerPageHero: React.FC<InnerPageHeroProps> = ({
  breadcrumbs,
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
  imageSrc,
  imageAlt,
  imageObjectFit = 'cover',
  reverseLayout = false,
}) => {
  return (
    <section className="relative bg-[#F7F8FA] border-b border-slate-200/60 py-10 md:py-14 overflow-hidden">
      {/* VISIBLE FINE GRAIN PAPER BACKGROUND TEXTURE */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.085] mix-blend-multiply z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0.0039 0 0 0 0 0.1294 0 0 0 0 0.3412 0 0 0 1 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '180px 180px',
        }}
        aria-hidden="true"
      />

      <Container className="relative z-10 max-w-[1360px] px-6 md:px-12">
        {/* BREADCRUMBS */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-6 font-medium">
            {breadcrumbs.map((crumb, idx) => (
              <React.Fragment key={crumb.label + idx}>
                {idx > 0 && <ChevronRight className="h-3.5 w-3.5 text-slate-400" />}
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="hover:text-[#014A94] transition-colors"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="font-semibold text-[#111827]">{crumb.label}</span>
                )}
              </React.Fragment>
            ))}
          </div>
        )}

        {/* EDITORIAL SPLIT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[380px] md:min-h-[440px]">
          
          {/* TEXT CONTENT COLUMN */}
          <div
            className={`lg:col-span-6 flex flex-col items-start ${
              reverseLayout ? 'lg:order-2' : 'lg:order-1'
            }`}
          >
            {eyebrow && (
              <span className="text-[11px] font-bold text-[#014A94] uppercase tracking-[0.1em] mb-3">
                {eyebrow}
              </span>
            )}

            <h1 className="text-3xl sm:text-4xl lg:text-[48px] font-extrabold text-[#111827] tracking-tight leading-[1.08] mb-4">
              {title}
            </h1>

            <p className="text-base sm:text-lg text-slate-600 font-normal leading-[1.6] mb-8 max-w-[540px]">
              {description}
            </p>

            {/* ACTION BUTTONS */}
            {(primaryCta || secondaryCta) && (
              <div className="flex flex-wrap items-center gap-4 text-sm font-semibold">
                {primaryCta && (
                  primaryCta.href ? (
                    <Link
                      href={primaryCta.href}
                      className="h-11 md:h-12 px-6 bg-[#FA3A08] hover:bg-[#d92f00] text-white rounded-[7px] font-semibold transition-colors shadow-xs inline-flex items-center gap-2"
                    >
                      <span>{primaryCta.label}</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  ) : (
                    <button
                      type="button"
                      onClick={primaryCta.onClick}
                      className="h-11 md:h-12 px-6 bg-[#FA3A08] hover:bg-[#d92f00] text-white rounded-[7px] font-semibold transition-colors shadow-xs inline-flex items-center gap-2"
                    >
                      <span>{primaryCta.label}</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  )
                )}

                {secondaryCta && (
                  secondaryCta.href ? (
                    <Link
                      href={secondaryCta.href}
                      className="h-11 md:h-12 px-6 bg-white border border-[#012157] text-[#012157] hover:bg-slate-50 rounded-[7px] font-semibold transition-colors inline-flex items-center gap-2"
                    >
                      <span>{secondaryCta.label}</span>
                    </Link>
                  ) : (
                    <button
                      type="button"
                      onClick={secondaryCta.onClick}
                      className="h-11 md:h-12 px-6 bg-white border border-[#012157] text-[#012157] hover:bg-slate-50 rounded-[7px] font-semibold transition-colors inline-flex items-center gap-2"
                    >
                      <span>{secondaryCta.label}</span>
                    </button>
                  )
                )}
              </div>
            )}
          </div>

          {/* EDITORIAL IMAGE COLUMN WITH STYLISH ROUNDED CORNERS & ANIMATED BRAND BORDER */}
          <div
            className={`lg:col-span-6 w-full ${
              reverseLayout ? 'lg:order-1' : 'lg:order-2'
            }`}
          >
            <AnimatedHeroImage className="w-full h-[300px] sm:h-[380px] lg:h-[440px]">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                priority
                className={
                  imageObjectFit === 'contain'
                    ? 'object-contain object-center'
                    : 'object-cover object-center'
                }
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </AnimatedHeroImage>
          </div>

        </div>
      </Container>
    </section>
  );
};
