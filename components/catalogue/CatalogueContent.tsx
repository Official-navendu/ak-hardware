'use client';

import React, { useState } from 'react';
import {
  FileText,
  Download,
  Eye,
  Phone,
  ArrowRight,
  ShieldCheck,
  Paintbrush,
  Sparkles,
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { InnerPageHero } from '@/components/layout/InnerPageHero';
import { PaintVisualizer } from '@/components/catalogue/PaintVisualizer';
import { PaintShadeLibrary } from '@/components/catalogue/PaintShadeLibrary';
import { PDFDocumentItem } from '@/lib/utils/pdf-discovery';
import { SITE_CONFIG, WHATSAPP_CONFIG, createWhatsAppLink } from '@/lib/data/site-config';
import { WhatsAppIcon } from '@/components/whatsapp/FloatingWhatsApp';

interface CatalogueContentProps {
  discoveredPdfs: PDFDocumentItem[];
}

export const CatalogueContent: React.FC<CatalogueContentProps> = ({
  discoveredPdfs,
}) => {
  const [selectedHex, setSelectedHex] = useState<string>('#014A94');
  const [selectedColorName, setSelectedColorName] = useState<string>('AK Royal Blue');

  // Handle applying a shade from the Shade Library to the Visualizer
  const handleApplyColorToVisualizer = (hex: string, name: string) => {
    setSelectedHex(hex);
    setSelectedColorName(name);

    // Scroll smoothly to visualizer workspace
    const visualizerEl = document.getElementById('visualizer-workspace');
    if (visualizerEl) {
      visualizerEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[#F7F8FA] min-h-screen pb-16 font-sans">
      
      {/* 1. PAINT CATALOGUE HERO */}
      <InnerPageHero
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Paint Catalogue' },
        ]}
        eyebrow="AK HARDWARE PAINT COLLECTION"
        title="Explore Our Paint Catalogue"
        description="Browse official paint PDF brochures, explore shade cards & designer colour combinations, and test shades directly on your home walls."
        primaryCta={{
          label: 'Customize Your Home',
          href: '#visualizer',
        }}
        secondaryCta={{
          label: 'Paint PDF Catalogues',
          href: '#pdf-catalogues',
        }}
        imageSrc="/assets/hero/catalogue.png"
        imageAlt="AK Hardware Paint Catalogue & Shade Cards"
        imageObjectFit="cover"
      />

      <Container className="pt-10 flex flex-col gap-14">

        {/* 2. CUSTOMIZE YOUR HOME (UNIFIED SECTION CONTAINING VISUALIZER & SHADE LIBRARY) */}
        <section id="visualizer" className="scroll-mt-24 flex flex-col gap-10">
          {/* VISUALIZER INTERACTIVE WORKSPACE */}
          <div id="visualizer-workspace">
            <PaintVisualizer
              selectedHex={selectedHex}
              selectedColorName={selectedColorName}
            />
          </div>

          {/* COMPLETE PAINT SHADE LIBRARY (CONTAINED INSIDE CUSTOMIZE YOUR HOME) */}
          <div id="shade-library">
            <PaintShadeLibrary
              onApplyColorToVisualizer={handleApplyColorToVisualizer}
              selectedHex={selectedHex}
            />
          </div>
        </section>

        {/* 3. ONE UNIFIED PDF SECTION — PAINT SHADE CARDS & PDF CATALOGUES */}
        <section id="pdf-catalogues" className="scroll-mt-24 flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-200 pb-4">
            <div>
              <span className="text-[11px] font-bold text-[#014A94] uppercase tracking-wider block mb-1">
                OFFICIAL DOWNLOADABLE DOCUMENTS
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight">
                Paint Shade Cards &amp; PDF Catalogues
              </h2>
            </div>
            <span className="text-xs font-semibold text-slate-500">
              Available PDF Documents ({discoveredPdfs.length})
            </span>
          </div>

          {discoveredPdfs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {discoveredPdfs.map((pdf) => (
                <div
                  key={pdf.id}
                  className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs flex flex-col justify-between hover:shadow-md transition-shadow group"
                >
                  <div className="flex flex-col gap-3">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center flex-shrink-0 border border-red-100 group-hover:scale-105 transition-transform">
                        <FileText className="h-5 w-5" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-sm font-extrabold text-[#111827] truncate group-hover:text-[#014A94] transition-colors">
                          {pdf.title}
                        </span>
                        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium mt-0.5">
                          <span className="uppercase font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded text-[10px]">
                            PDF
                          </span>
                          <span>{pdf.fileSize}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 font-normal leading-relaxed">
                      Official paint product brochure, color combinations and shade reference guide.
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between gap-2">
                    <a
                      href={pdf.publicUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 h-9 bg-slate-100 hover:bg-slate-200 text-[#012157] font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      <span>View PDF</span>
                    </a>
                    <a
                      href={pdf.publicUrl}
                      download
                      className="flex-1 h-9 bg-[#FA3A08] hover:bg-[#d92e00] text-white font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
                    >
                      <Download className="h-3.5 w-3.5" />
                      <span>Download</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white border border-slate-200/90 rounded-2xl p-10 text-center flex flex-col items-center justify-center gap-3 shadow-2xs">
              <FileText className="h-8 w-8 text-slate-400" />
              <h3 className="text-base font-extrabold text-[#111827]">
                No downloadable PDF documents found
              </h3>
              <p className="text-xs text-slate-500 max-w-sm">
                PDF shade cards placed in public/assets/pdf/ will appear here automatically.
              </p>
            </div>
          )}
        </section>

        {/* 4. COMPACT CTA TO CONTACT AK HARDWARE ABOUT PAINT PRODUCTS */}
        <section
          id="contact-cta"
          className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex flex-col gap-1.5 max-w-xl text-center md:text-left">
            <span className="text-[11px] font-bold text-[#FA3A08] uppercase tracking-wider">
              NEED HELP CHOOSING THE RIGHT PAINT?
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#111827]">
              Get Personalized Paint &amp; Waterproofing Advice
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
              Our paint specialists at AK Hardware can help you choose between interior emulsions, damp-stop primers, and weather-guard exterior finishes based on your wall requirements.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 justify-center">
            <a
              href={createWhatsAppLink('Hi AK Hardware, I need expert advice for choosing paint for my project.')}
              target="_blank"
              rel="noopener noreferrer"
              className="h-11 px-5 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold text-xs rounded-xl inline-flex items-center gap-2 transition-colors shadow-2xs"
            >
              <WhatsAppIcon className="h-4 w-4" />
              <span>Chat on WhatsApp</span>
            </a>

            <a
              href={SITE_CONFIG.telLink}
              className="h-11 px-5 bg-[#012157] hover:bg-[#01183D] text-white font-bold text-xs rounded-xl inline-flex items-center gap-2 transition-colors shadow-2xs"
            >
              <Phone className="h-4 w-4" />
              <span>Call ({SITE_CONFIG.phone})</span>
            </a>
          </div>
        </section>

      </Container>
    </div>
  );
};
