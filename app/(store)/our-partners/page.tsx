import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck, ArrowRight, Award, PhoneCall, Building2 } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { InnerPageHero } from '@/components/layout/InnerPageHero';
import { createWhatsAppLink } from '@/lib/data/site-config';

interface BrandPartner {
  id: string;
  name: string;
  category: string;
  badge: string;
  description: string;
  logoSrc: string;
}

const BRAND_PARTNERS: BrandPartner[] = [
  {
    id: 'skipper-pipes',
    name: 'Skipper Pipes',
    category: 'Pipes & Plumbing',
    badge: 'Official Partner',
    description: 'Piping and plumbing solutions for residential and infrastructure applications.',
    logoSrc: '/assets/brands/skipper-pipes.png',
  },
  {
    id: 'berger-paints',
    name: 'Berger Paints',
    category: 'Paints & Coatings',
    badge: 'Official Dealer',
    description: 'Decorative paints and coatings for interior and exterior surfaces.',
    logoSrc: '/assets/brands/berger-paints.png',
  },
  {
    id: 'roff',
    name: 'ROFF',
    category: 'Tile Adhesives',
    badge: 'Official Partner',
    description: 'Tile-fixing adhesives, grouts, and stone-care solutions.',
    logoSrc: '/assets/brands/roff.png',
  },
  {
    id: 'ashirvad-pipes',
    name: 'Ashirvad Pipes',
    category: 'Plumbing Systems',
    badge: 'Authorized Stockist',
    description: 'Pipes and plumbing systems for water supply and drainage.',
    logoSrc: '/assets/brands/ashirvad-pipes.png',
  },
  {
    id: 'prince-pipes',
    name: 'Prince Pipes',
    category: 'Pipes & Fittings',
    badge: 'Authorized Stockist',
    description: 'Piping systems and fittings for plumbing and infrastructure.',
    logoSrc: '/assets/brands/prince-pipes.jpg',
  },
  {
    id: 'grafdoer',
    name: 'Grafdoer',
    category: 'Interior & Hardware',
    badge: 'Official Partner',
    description: 'Interior doors and associated architectural/interior solutions.',
    logoSrc: '/assets/brands/grafdoer.png',
  },
  {
    id: 'fevicol',
    name: 'Fevicol',
    category: 'Adhesives',
    badge: 'Official Partner',
    description: 'Adhesives and bonding solutions.',
    logoSrc: '/assets/brands/fevicol.png',
  },
  {
    id: 'sintex-tanks',
    name: 'Sintex Tanks',
    category: 'Water Storage',
    badge: 'Official Partner',
    description: 'Water-storage tanks and storage solutions.',
    logoSrc: '/assets/brands/sintex-tanks.png',
  },
];

export default function OurPartnersPage() {
  return (
    <div className="bg-[#F7F8FA] min-h-screen pb-16 font-sans">
      {/* 1. HERO SECTION */}
      <InnerPageHero
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Our Partners' },
        ]}
        eyebrow="AUTHORIZED DISTRIBUTOR NETWORK"
        title="Our Trusted Brand Partners"
        description="AK Hardware showcases India's trusted manufacturers across piping, paints, tile-fixing solutions, hardware & interior products, adhesives, and water storage."
        primaryCta={{
          label: 'Browse Brand Partners',
          href: '#brands-grid',
        }}
        secondaryCta={{
          label: 'Contact Trade Desk',
          href: '/contact',
        }}
        imageSrc="/assets/hero/our-partners.png"
        imageAlt="AK Hardware Official Brand Partners"
        imageObjectFit="cover"
      />

      {/* 2. BRANDS STRIP OVERVIEW */}
      <section className="py-8 bg-white border-b border-slate-200/80">
        <Container>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-[11px] font-extrabold text-[#014A94] uppercase tracking-wider">
                OFFICIAL PARTNERSHIP GUARANTEE
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-[#0C1E38] tracking-tight">
                Direct Manufacturer Sourcing &amp; 100% Genuine Supplies
              </h2>
            </div>
            <div className="flex items-center gap-6 text-xs font-semibold text-slate-700 flex-shrink-0">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-[#00A23A]" />
                <span>100% Genuine Products</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-[#FA3A08]" />
                <span>Manufacturer Warranty</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. EXACT EIGHT VERIFIED BRAND PARTNERS GRID */}
      <section id="brands-grid" className="py-12 sm:py-16">
        <Container>
          <div className="flex flex-col items-center text-center mb-10 max-w-2xl mx-auto">
            <span className="inline-flex items-center bg-[#E8F1FD] text-[#014A94] text-[11px] font-extrabold px-3 py-1 rounded-md border border-[#D0E2FB] uppercase tracking-wider mb-2">
              OFFICIAL PARTNERS
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0C1E38] tracking-tight mb-2">
              Our Trusted Brand Partners
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
              We partner with industry-leading manufacturers across piping, paints, tile adhesives, hardware, adhesives, and water storage.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {BRAND_PARTNERS.map((brand) => (
              <div
                key={brand.id}
                className="bg-white border border-slate-200/90 rounded-2xl p-5 flex flex-col justify-between shadow-2xs hover:shadow-xl hover:border-[#014A94]/60 transition-all duration-300 group"
              >
                <div>
                  {/* LOGO CONTAINER */}
                  <div className="relative w-full h-24 sm:h-28 bg-[#F8FAFC] border border-slate-100 rounded-xl p-4 flex items-center justify-center mb-4 overflow-hidden group-hover:bg-white transition-colors">
                    <Image
                      src={brand.logoSrc}
                      alt={`${brand.name} official logo`}
                      fill
                      className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* BADGE & NAME */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-bold text-[#014A94] bg-[#E8F1FD] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      {brand.category}
                    </span>
                    <span className="text-[9px] font-bold text-[#FA3A08] bg-orange-50 border border-orange-200/60 px-2 py-0.5 rounded-full">
                      {brand.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-extrabold text-[#0C1E38] group-hover:text-[#014A94] transition-colors mb-2">
                    {brand.name}
                  </h3>

                  {/* FACTUAL DESCRIPTION */}
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {brand.description}
                  </p>
                </div>

                {/* ACTION LINK */}
                <div className="pt-4 border-t border-slate-100 mt-4">
                  <Link
                    href={`/shop?q=${encodeURIComponent(brand.name)}`}
                    className="inline-flex items-center justify-between w-full text-xs font-bold text-[#014A94] group-hover:text-[#FA3A08] transition-colors"
                  >
                    <span>View {brand.name} Products</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 4. WHOLESALE & TRADE PARTNERSHIP CTA */}
      <section className="pt-6">
        <Container>
          <div className="bg-gradient-to-r from-[#012157] to-[#014A94] text-white rounded-3xl p-8 sm:p-12 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#FFB800] text-xs font-bold uppercase tracking-wider mb-3">
                <Building2 className="h-3.5 w-3.5" />
                <span>CONTRACTORS &amp; BULK SUPPLIES</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
                Need Bulk Supplies for your Construction Project?
              </h2>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                AK Hardware provides special trade discounts, batch test certificates, and direct site delivery for all official partner products.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto flex-shrink-0">
              <a
                href={createWhatsAppLink("Hi AK Hardware, I want to inquire about bulk trade pricing for contractor projects.")}
                target="_blank"
                rel="noopener noreferrer"
                className="h-11 px-6 bg-[#25D366] hover:bg-[#128C7E] text-white text-xs font-extrabold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-md"
              >
                <PhoneCall className="h-4 w-4" />
                <span>WhatsApp Trade Inquiry</span>
              </a>
              <Link
                href="/contact"
                className="h-11 px-6 bg-[#FA3A08] hover:bg-[#d92e00] text-white text-xs font-extrabold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-md"
              >
                <span>Contact Sales Desk</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

