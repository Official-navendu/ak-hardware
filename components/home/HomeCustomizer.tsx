'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Sparkles,
  Upload,
  Palette,
  Eye,
  ArrowRight,
  Sliders,
} from 'lucide-react';
import { Container } from '@/components/ui/Container';

interface ColorOption {
  hex: string;
  name: string;
  category: string;
}

const PRESET_COLORS: ColorOption[] = [
  { hex: '#012157', name: 'Deep Navy', category: 'Blues' },
  { hex: '#FA3A08', name: 'AK Terracotta', category: 'Earthy' },
  { hex: '#F7E9CE', name: 'Warm Cream', category: 'Whites' },
  { hex: '#4A7C59', name: 'Sage Green', category: 'Greens' },
  { hex: '#014A94', name: 'AK Royal Blue', category: 'Blues' },
  { hex: '#808A87', name: 'Slate Grey', category: 'Greys' },
];

export const HomeCustomizer: React.FC = () => {
  const [selectedColor, setSelectedColor] = useState<ColorOption>(PRESET_COLORS[0]);
  const [customPhoto, setCustomPhoto] = useState<string | null>(null);
  const [showBeforeAfter, setShowBeforeAfter] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState<number>(1);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setCustomPhoto(event.target.result as string);
          setActiveStep(3);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section className="py-10 sm:py-14 bg-white overflow-hidden">
      <Container>
        {/* PREMIUM ELEVATED FEATURE CARD WRAPPER WITH BRAND PALETTE */}
        <div className="relative bg-gradient-to-br from-[#011B40] via-[#012157] to-[#011433] rounded-[28px] sm:rounded-[36px] text-white p-6 sm:p-10 lg:p-14 shadow-2xl overflow-hidden border border-[#013A80]/60">
          
          {/* DECORATIVE AMBIENT BRAND LIGHTING ACCENTS */}
          <div className="absolute -bottom-28 -left-28 w-96 h-96 bg-[#FA3A08]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -top-28 -right-28 w-[450px] h-[450px] bg-[#0088E8]/20 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center relative z-10">
            
            {/* LEFT COLUMN — EDITORIAL CONTENT & STEPS */}
            <div className="lg:col-span-6 flex flex-col items-start">
              
              {/* EYEBROW BADGE WITH ORANGE ACCENT */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FA3A08]/15 border border-[#FA3A08]/30 text-[#FF5426] text-[11px] font-bold uppercase tracking-wider mb-4 shadow-sm">
                <Sparkles className="h-3.5 w-3.5 fill-[#FA3A08] text-[#FA3A08]" />
                <span>CUSTOMIZE YOUR HOME</span>
              </div>

              {/* MAIN HEADING */}
              <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-white tracking-tight leading-[1.12] mb-4">
                See Your Home <br className="hidden sm:inline" />
                in a <span className="text-[#FA3A08]">New Colour</span>
              </h2>

              {/* SUBTEXT */}
              <p className="text-sm sm:text-base text-slate-200 font-normal leading-relaxed mb-8 max-w-xl">
                Upload a photo of your home, explore different paint shades and preview how your walls could look before choosing your colours.
              </p>

              {/* 3 FEATURE STEPS (HORIZONTAL CARDS WITH HIGH CONTRAST) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-8 w-full">
                {/* STEP 1: UPLOAD PHOTO */}
                <div
                  onClick={() => {
                    setActiveStep(1);
                    fileInputRef.current?.click();
                  }}
                  className={`bg-white/10 hover:bg-white/15 backdrop-blur-md p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col gap-2 shadow-xs ${
                    activeStep === 1 ? 'border-[#FA3A08] bg-white/20 ring-2 ring-[#FA3A08]/30' : 'border-white/15'
                  }`}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handlePhotoUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  <div className="w-9 h-9 rounded-xl bg-[#FA3A08]/20 border border-[#FA3A08]/40 flex items-center justify-center text-[#FA3A08]">
                    <Upload className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-white">1. Upload Photo</h3>
                    <p className="text-[11px] text-slate-300 font-normal mt-0.5 leading-snug">
                      Use your own interior or exterior wall photo.
                    </p>
                  </div>
                </div>

                {/* STEP 2: SELECT SHADES */}
                <div
                  onClick={() => setActiveStep(2)}
                  className={`bg-white/10 hover:bg-white/15 backdrop-blur-md p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col gap-2 shadow-xs ${
                    activeStep === 2 ? 'border-[#0088E8] bg-white/20 ring-2 ring-[#0088E8]/30' : 'border-white/15'
                  }`}
                >
                  <div className="w-9 h-9 rounded-xl bg-[#0088E8]/20 border border-[#0088E8]/40 flex items-center justify-center text-[#0088E8]">
                    <Palette className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-white">2. Select Shades</h3>
                    <p className="text-[11px] text-slate-300 font-normal mt-0.5 leading-snug">
                      Explore complete official paint shade cards.
                    </p>
                  </div>
                </div>

                {/* STEP 3: LIVE PREVIEW */}
                <div
                  onClick={() => {
                    setActiveStep(3);
                    setShowBeforeAfter(!showBeforeAfter);
                  }}
                  className={`bg-white/10 hover:bg-white/15 backdrop-blur-md p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col gap-2 shadow-xs ${
                    activeStep === 3 ? 'border-[#00A23A] bg-white/20 ring-2 ring-[#00A23A]/30' : 'border-white/15'
                  }`}
                >
                  <div className="w-9 h-9 rounded-xl bg-[#00A23A]/20 border border-[#00A23A]/40 flex items-center justify-center text-[#00A23A]">
                    <Eye className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-white">3. Live Preview</h3>
                    <p className="text-[11px] text-slate-300 font-normal mt-0.5 leading-snug">
                      Instantly visualize color combinations.
                    </p>
                  </div>
                </div>
              </div>

              {/* PRIMARY CTA BUTTON */}
              <Link
                href="/catalogue"
                className="h-12 px-8 bg-[#FA3A08] hover:bg-[#d92e00] text-white text-xs sm:text-sm font-extrabold rounded-full transition-all duration-200 inline-flex items-center justify-center gap-2.5 shadow-lg shadow-[#FA3A08]/30 group hover:scale-[1.02] active:scale-95"
              >
                <span>Customize Your Home</span>
                <ArrowRight className="h-4.5 w-4.5 group-hover:translate-x-1 transition-transform" />
              </Link>

            </div>

            {/* RIGHT COLUMN — ARCH-SHAPED INTERACTIVE PREVIEW DISPLAY */}
            <div className="lg:col-span-6 relative flex items-center justify-center">
              
              {/* FLOATING COLOR SWATCH PALETTE CARD (TOP LEFT OVERLAY) */}
              <div className="absolute -top-4 -left-2 sm:left-4 z-20 bg-white text-[#012157] p-3 rounded-2xl border border-white/40 shadow-2xl flex items-center gap-3 animate-fade-in max-w-[250px]">
                {/* VERTICAL COLOR STRIPES */}
                <div className="flex items-center gap-1">
                  {PRESET_COLORS.slice(0, 4).map((col) => (
                    <button
                      key={col.hex}
                      onClick={() => setSelectedColor(col)}
                      title={`Select ${col.name}`}
                      className={`w-3.5 h-10 rounded-md transition-transform duration-200 hover:scale-110 relative ${
                        selectedColor.hex === col.hex ? 'ring-2 ring-[#FA3A08] scale-105' : ''
                      }`}
                      style={{ backgroundColor: col.hex }}
                    />
                  ))}
                </div>

                {/* MINI ROOM PREVIEW THUMBNAIL */}
                <div className="relative w-12 h-10 rounded-lg overflow-hidden border border-slate-200 bg-slate-100 flex-shrink-0">
                  <Image
                    src={customPhoto || '/assets/living room.png'}
                    alt="Mini preview"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>

                {/* ACTIVE COLOR LABEL */}
                <div className="hidden sm:flex flex-col text-left">
                  <span className="text-[10px] font-bold text-[#012157] line-clamp-1">{selectedColor.name}</span>
                  <span className="text-[9px] text-slate-500 uppercase tracking-wider">{selectedColor.category}</span>
                </div>
              </div>

              {/* CURVED WHITE ARROW ILLUSTRATION */}
              <div className="absolute top-12 left-36 z-20 pointer-events-none hidden sm:block">
                <svg width="48" height="48" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M10 10 C 25 10, 35 25, 40 35 M 40 35 L 32 32 M 40 35 L 36 27"
                    stroke="#FFFFFF"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              {/* ARCH-SHAPED MAIN PREVIEW FRAME */}
              <div className="relative w-full max-w-[480px] aspect-[4/4.5] sm:aspect-[4/4.2] rounded-t-[160px] sm:rounded-t-[200px] lg:rounded-t-[220px] rounded-b-[32px] overflow-hidden shadow-2xl border-4 border-white/90 bg-[#011433] flex flex-col justify-end">
                
                {/* ROOM PHOTO / COLOR WALL DISPLAY */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src={customPhoto || '/assets/living room.png'}
                    alt="Room preview wall"
                    fill
                    className="object-cover"
                    unoptimized
                  />

                  {/* DYNAMIC COLOR OVERLAY TINT */}
                  {!showBeforeAfter && (
                    <div
                      className="absolute inset-0 opacity-40 mix-blend-multiply transition-colors duration-500"
                      style={{ backgroundColor: selectedColor.hex }}
                    />
                  )}

                  {/* BEFORE-AND-AFTER COMPARISON SPLIT OVERLAY */}
                  {showBeforeAfter && (
                    <div className="absolute inset-0 z-10 flex">
                      <div className="w-1/2 h-full overflow-hidden border-r-2 border-white relative bg-slate-900/10">
                        <span className="absolute top-4 left-4 text-[10px] font-extrabold uppercase tracking-wider text-white bg-black/60 backdrop-blur px-2.5 py-1 rounded-md">
                          Original
                        </span>
                      </div>
                      <div className="w-1/2 h-full relative">
                        <div
                          className="absolute inset-0 opacity-50 mix-blend-multiply"
                          style={{ backgroundColor: selectedColor.hex }}
                        />
                        <span className="absolute top-4 right-4 text-[10px] font-extrabold uppercase tracking-wider text-white bg-[#FA3A08] backdrop-blur px-2.5 py-1 rounded-md">
                          Painted
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* OVERLAY HARDWARE & PAINT PROPS (BERGER PAINT CAN & TOOLS) */}
                <div className="relative z-10 p-4 sm:p-6 bg-gradient-to-t from-black/85 via-black/40 to-transparent flex items-end justify-between gap-4">
                  <div className="flex items-center gap-3">
                    {/* BERGER BRAND BADGE / PAINT ICON */}
                    <div className="w-10 h-10 rounded-xl bg-white p-1 flex items-center justify-center shadow-md border border-slate-100 flex-shrink-0">
                      <Image
                        src="/assets/brands/berger-paints.png"
                        alt="Berger Paints"
                        width={32}
                        height={32}
                        className="object-contain"
                        unoptimized
                      />
                    </div>
                    
                    <div className="flex flex-col text-white">
                      <span className="text-xs font-extrabold tracking-tight">Berger Paints Visualizer</span>
                      <span className="text-[11px] text-slate-200">Selected: {selectedColor.name}</span>
                    </div>
                  </div>

                  {/* QUICK TOGGLE BUTTONS */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setShowBeforeAfter(!showBeforeAfter)}
                      className="h-8 px-3 rounded-lg bg-white/20 hover:bg-white/30 text-white text-[11px] font-bold backdrop-blur transition-colors inline-flex items-center gap-1.5"
                    >
                      <Sliders className="h-3.5 w-3.5" />
                      <span>{showBeforeAfter ? 'Single View' : 'Compare'}</span>
                    </button>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>
      </Container>
    </section>
  );
};
