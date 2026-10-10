'use client';

import React from 'react';
import Link from 'next/link';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Facebook,
  Instagram,
  Youtube,
  Linkedin,
} from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { Container } from '@/components/ui/Container';
import { PaymentMethods } from '@/components/layout/PaymentMethods';
import { SITE_CONFIG, WHATSAPP_CONFIG, createWhatsAppLink } from '@/lib/data/site-config';
import { WhatsAppIcon } from '@/components/whatsapp/FloatingWhatsApp';

const FOOTER_CATEGORIES = [
  { label: 'Sanitary Items', href: '/category/sanitary-items' },
  { label: 'Pipes & Fittings', href: '/category/pipes-fittings' },
  { label: 'Hardware Tools', href: '/category/hardware-tools' },
  { label: 'Tiles', href: '/category/tiles' },
  { label: 'Paint', href: '/category/paint' },
  { label: 'Electrical Items', href: '/category/electrical-items' },
];

const FOOTER_POLICY_LINKS = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms & Conditions', href: '/terms' },
  { label: 'Shipping Policy', href: '/shipping-policy' },
  { label: 'Return Policy', href: '/refund-policy' },
  { label: 'Shopping Cart', href: '/cart' },
];

const FOOTER_QUICK_NAV = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Hardware Shop', href: '/shop' },
  { label: 'Paint Catalogue', href: '/catalogue' },
  { label: 'Our Partners', href: '/our-partners' },
  { label: 'Blog & Guides', href: '/blog' },
  { label: 'Contact Us', href: '/contact' },
];

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-[#01183D] text-white pt-10 pb-6 sm:pt-12 sm:pb-8 mt-auto border-t border-[#012866] overflow-hidden">
      <Container className="relative z-10 flex flex-col gap-8">
        {/* FIVE COLUMNS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-6 pb-8 border-b border-white/10">
          
          {/* COLUMN 1 — BRAND */}
          <div className="flex flex-col gap-3.5">
            <Logo size="md" href="/" />

            <p className="text-xs text-white/70 leading-relaxed font-normal max-w-xs">
              {SITE_CONFIG.description}
            </p>

            <div className="flex items-center gap-2.5 pt-1">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 hover:bg-[#FA3A08] hover:border-[#FA3A08] text-white/80 hover:text-white flex items-center justify-center transition-all duration-200 text-xs"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 hover:bg-[#FA3A08] hover:border-[#FA3A08] text-white/80 hover:text-white flex items-center justify-center transition-all duration-200 text-xs"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 hover:bg-[#FA3A08] hover:border-[#FA3A08] text-white/80 hover:text-white flex items-center justify-center transition-all duration-200 text-xs"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 hover:bg-[#FA3A08] hover:border-[#FA3A08] text-white/80 hover:text-white flex items-center justify-center transition-all duration-200 text-xs"
              >
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* COLUMN 2 — QUICK LINKS */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider pb-1">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-2 text-xs text-white/70 font-normal">
              {FOOTER_QUICK_NAV.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="hover:text-[#FA3A08] transition-colors duration-200 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 3 — CATEGORIES */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider pb-1">
              Categories
            </h4>
            <ul className="flex flex-col gap-2 text-xs text-white/70 font-normal">
              {FOOTER_CATEGORIES.map((cat) => (
                <li key={cat.href}>
                  <Link
                    href={cat.href}
                    className="hover:text-[#FA3A08] transition-colors duration-200 inline-block"
                  >
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 4 — POLICY */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider pb-1">
              Policy
            </h4>
            <ul className="flex flex-col gap-2 text-xs text-white/70 font-normal">
              {FOOTER_POLICY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-[#FA3A08] transition-colors duration-200 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 5 — OFFICIAL CONTACT DETAILS */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider pb-1">
              Contact Us
            </h4>
            <div className="flex flex-col gap-2.5 text-xs text-white/70 font-normal">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-[#FA3A08] flex-shrink-0 mt-0.5" />
                <span className="leading-snug">{SITE_CONFIG.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-[#FA3A08] flex-shrink-0" />
                <a href={SITE_CONFIG.telLink} className="hover:text-[#FA3A08] font-bold transition-colors">
                  {SITE_CONFIG.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <WhatsAppIcon className="h-4 w-4 text-[#25D366] flex-shrink-0" />
                <a
                  href={createWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#25D366] font-bold transition-colors"
                >
                  WhatsApp: {WHATSAPP_CONFIG.displayPhone}
                </a>
              </div>
              <div className="flex items-start gap-2">
                <Mail className="h-4 w-4 text-[#FA3A08] flex-shrink-0 mt-0.5" />
                <div className="flex flex-col gap-0.5">
                  <a href="mailto:akhardware@gmail.com" className="hover:text-[#FA3A08] transition-colors">
                    akhardware@gmail.com
                  </a>
                  <a href="mailto:info@akhardware.com" className="hover:text-[#FA3A08] transition-colors">
                    info@akhardware.com
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-[#FA3A08] flex-shrink-0" />
                <span>{SITE_CONFIG.workingHours}</span>
              </div>
            </div>
          </div>

        </div>

        {/* BOTTOM BAR: COPYRIGHT & PAYMENT STRIP (NO SECURE PAYMENTS TEXT) */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60 font-normal">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-center sm:text-left">
            <p>© 2026 AK Hardware. All rights reserved.</p>
            <span className="hidden sm:inline text-white/30">•</span>
            <span className="text-white/50 text-[11px]">GST No: 10GBVPP8578J1ZO</span>
          </div>

          <PaymentMethods />
        </div>

      </Container>
    </footer>
  );
};
