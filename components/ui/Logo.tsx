import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface LogoProps {
  variant?: 'full' | 'mark';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  href?: string;
  onClick?: () => void;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'full',
  size = 'md',
  className,
  href = '/',
  onClick,
}) => {
  const dimensions = {
    full: {
      sm: { width: 150, height: 48 },
      md: { width: 210, height: 68 },
      lg: { width: 270, height: 86 },
    },
    mark: {
      sm: { width: 36, height: 36 },
      md: { width: 48, height: 48 },
      lg: { width: 64, height: 64 },
    },
  };

  const { width, height } = dimensions[variant][size];
  const src =
    variant === 'full'
      ? '/assets/brand/ak-hardware-logo.png'
      : '/assets/brand/ak-hardware-mark.jpg';

  const logoContent = (
    <div
      className={cn(
        'relative inline-flex items-center select-none transition-opacity hover:opacity-95',
        className
      )}
    >
      <Image
        src={src}
        alt="AK Hardware Logo - Har Kaam, Ek Hi Naam"
        width={width}
        height={height}
        priority
        className={cn(
          'h-auto w-auto object-contain',
          size === 'sm' && 'max-h-10',
          size === 'md' && 'max-h-14 sm:max-h-16',
          size === 'lg' && 'max-h-20 sm:max-h-24'
        )}
      />
    </div>
  );

  if (href) {
    return (
      <Link
        href={href}
        onClick={onClick}
        className="focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-brand rounded-sm inline-flex items-center"
      >
        {logoContent}
      </Link>
    );
  }

  return logoContent;
};
