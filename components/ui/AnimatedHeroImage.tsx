'use client';

import React from 'react';

interface AnimatedHeroImageProps {
  children: React.ReactNode;
  className?: string;
}

export const AnimatedHeroImage: React.FC<AnimatedHeroImageProps> = ({
  children,
  className = '',
}) => {
  return (
    <div
      className={`relative p-[3.5px] overflow-hidden group shadow-lg transition-all duration-300 ${className}`}
      style={{
        borderRadius: '32px 10px 42px 10px',
      }}
    >
      {/* HIGH-CONTRAST CONTINUOUSLY ANIMATED BRAND GRADIENT BORDER */}
      <div
        className="absolute inset-[-150%] m-auto aspect-square w-[350%] h-[350%] opacity-100 pointer-events-none z-0 animate-hero-border"
        style={{
          background: `conic-gradient(from 0deg, #012157 0%, #013A80 18%, #0088E8 35%, #00C8FF 44%, #FA3A08 52%, #FFB800 58%, #0088E8 72%, #013A80 88%, #012157 100%)`,
        }}
        aria-hidden="true"
      />

      {/* INNER ASYMMETRIC MASK CONTAINER CLIPPING HERO IMAGE */}
      <div
        className="relative w-full h-full overflow-hidden bg-[#012157] z-10"
        style={{
          borderRadius: '28.5px 6.5px 38.5px 6.5px',
        }}
      >
        {children}
      </div>
    </div>
  );
};
