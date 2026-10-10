'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  X,
  Home,
  ShoppingBag,
  Info,
  Layers,
  PhoneCall,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Search,
  Heart,
  ShoppingCart,
  User,
  Droplets,
  Workflow,
  Wrench,
  LayoutGrid,
  Paintbrush,
  Zap,
  Palette,
  Award,
} from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { CATEGORIES_DATA } from '@/lib/data/categories';
import { useCart } from '@/lib/context/cart-context';
import { useWishlist } from '@/lib/context/wishlist-context';
import { useUser } from '@/lib/context/user-context';
import { WHATSAPP_CONFIG, createWhatsAppLink } from '@/lib/data/site-config';
import { WhatsAppIcon } from '@/components/whatsapp/FloatingWhatsApp';

const CATEGORY_ICON_MAP = {
  Droplets: Droplets,
  Workflow: Workflow,
  Wrench: Wrench,
  LayoutGrid: LayoutGrid,
  Paintbrush: Paintbrush,
  Zap: Zap,
};

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const { itemCount, setDrawerOpen } = useCart();
  const { wishlistCount } = useWishlist();
  const { isLoggedIn, user } = useUser();

  const [categoriesExpanded, setCategoriesExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle Escape Key Close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onClose();
      router.push(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* BACKDROP OVERLAY */}
      <div
        className="fixed inset-0 bg-[#012157]/35 backdrop-blur-[2px] transition-opacity duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* SIDE DRAWER */}
      <div
        role="dialog"
        aria-label="Mobile Navigation Menu"
        className="fixed top-0 left-0 h-[100svh] w-[85vw] max-w-[360px] bg-white border-r border-[#E5E7EB] shadow-2xl flex flex-col z-50 animate-in slide-in-from-left duration-200 ease-out"
      >
        {/* DRAWER HEADER */}
        <div className="h-[64px] min-h-[64px] px-4 border-b border-[#E5E7EB] flex items-center justify-between bg-white">
          <Logo size="md" href="/" onClick={onClose} />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="w-11 h-11 rounded-full hover:bg-slate-100 text-slate-700 flex items-center justify-center transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* DRAWER SCROLLABLE BODY */}
        <div className="flex-1 overflow-y-auto flex flex-col divide-y divide-slate-100">
          
          {/* SEARCH BAR */}
          <div className="p-3 bg-slate-50/70">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center w-full bg-white border border-slate-200 rounded-lg overflow-hidden shadow-2xs">
              <Search className="h-4 w-4 text-slate-400 ml-3 flex-shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products & tools..."
                className="w-full h-10 px-2.5 text-xs text-[#111827] placeholder-slate-400 focus:outline-none"
              />
              <button
                type="submit"
                className="h-10 px-3 bg-[#FA3A08] hover:bg-[#d92e00] text-white text-xs font-bold transition-colors flex-shrink-0"
              >
                Search
              </button>
            </form>
          </div>

          {/* PRIMARY NAVIGATION LINKS */}
          <div className="flex flex-col py-1">
            {/* HOME */}
            <Link
              href="/"
              onClick={onClose}
              className="h-[46px] px-4 text-[14px] font-medium text-[#111827] hover:bg-slate-50 flex items-center gap-3 transition-colors"
            >
              <Home className="h-[18px] w-[18px] text-[#014A94] flex-shrink-0" />
              <span>Home</span>
            </Link>

            {/* SHOP */}
            <Link
              href="/shop"
              onClick={onClose}
              className="h-[46px] px-4 text-[14px] font-medium text-[#111827] hover:bg-slate-50 flex items-center gap-3 transition-colors"
            >
              <ShoppingBag className="h-[18px] w-[18px] text-[#014A94] flex-shrink-0" />
              <span>Shop</span>
            </Link>

            {/* ABOUT */}
            <Link
              href="/about"
              onClick={onClose}
              className="h-[46px] px-4 text-[14px] font-medium text-[#111827] hover:bg-slate-50 flex items-center gap-3 transition-colors"
            >
              <Info className="h-[18px] w-[18px] text-[#014A94] flex-shrink-0" />
              <span>About</span>
            </Link>

            {/* CATEGORIES ACCORDION */}
            <div className="flex flex-col">
              <button
                type="button"
                onClick={() => setCategoriesExpanded((prev) => !prev)}
                className="h-[46px] px-4 text-[14px] font-medium text-[#111827] hover:bg-slate-50 flex items-center justify-between transition-colors w-full"
              >
                <div className="flex items-center gap-3">
                  <Layers className="h-[18px] w-[18px] text-[#014A94] flex-shrink-0" />
                  <span>Categories</span>
                </div>
                {categoriesExpanded ? (
                  <ChevronUp className="h-4 w-4 text-[#014A94]" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-slate-400" />
                )}
              </button>

              {/* EXPANDABLE CATEGORIES LIST */}
              {categoriesExpanded && (
                <div className="bg-slate-50/80 py-1 px-3 border-y border-slate-100 flex flex-col gap-0.5">
                  {CATEGORIES_DATA.map((cat) => {
                    const IconComp = CATEGORY_ICON_MAP[cat.iconName] || Wrench;
                    return (
                      <Link
                        key={cat.slug}
                        href={`/category/${cat.slug}`}
                        onClick={onClose}
                        className="h-[42px] px-3 rounded-lg text-xs font-semibold text-slate-700 hover:text-[#014A94] hover:bg-white flex items-center gap-2.5 transition-colors"
                      >
                        <IconComp className="h-4 w-4 text-[#014A94] flex-shrink-0" />
                        <span>{cat.name}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* CATALOGUE */}
            <Link
              href="/catalogue"
              onClick={onClose}
              className="h-[46px] px-4 text-[14px] font-medium text-[#111827] hover:bg-slate-50 flex items-center gap-3 transition-colors"
            >
              <Palette className="h-[18px] w-[18px] text-[#014A94] flex-shrink-0" />
              <span>Catalogue</span>
            </Link>

            {/* OUR PARTNERS */}
            <Link
              href="/our-partners"
              onClick={onClose}
              className="h-[46px] px-4 text-[14px] font-medium text-[#111827] hover:bg-slate-50 flex items-center gap-3 transition-colors"
            >
              <Award className="h-[18px] w-[18px] text-[#014A94] flex-shrink-0" />
              <span>Our Partners</span>
            </Link>

            {/* CONTACT */}
            <Link
              href="/contact"
              onClick={onClose}
              className="h-[46px] px-4 text-[14px] font-medium text-[#111827] hover:bg-slate-50 flex items-center gap-3 transition-colors"
            >
              <PhoneCall className="h-[18px] w-[18px] text-[#014A94] flex-shrink-0" />
              <span>Contact</span>
            </Link>

            {/* BLOGS */}
            <Link
              href="/blog"
              onClick={onClose}
              className="h-[46px] px-4 text-[14px] font-medium text-[#111827] hover:bg-slate-50 flex items-center gap-3 transition-colors"
            >
              <BookOpen className="h-[18px] w-[18px] text-[#014A94] flex-shrink-0" />
              <span>Blogs</span>
            </Link>
          </div>

          {/* DRAWER ACTIONS (WISHLIST, CART, ACCOUNT, ADMIN) */}
          <div className="flex flex-col py-2">
            <span className="px-4 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Account &amp; Activity
            </span>

            {/* WISHLIST LINK */}
            <Link
              href="/account/wishlist"
              onClick={onClose}
              className="h-[44px] px-4 text-xs font-semibold text-[#111827] hover:bg-slate-50 flex items-center justify-between transition-colors"
            >
              <div className="flex items-center gap-3">
                <Heart className="h-[18px] w-[18px] text-[#FA3A08] flex-shrink-0" />
                <span>Saved Wishlist</span>
              </div>
              {wishlistCount > 0 && (
                <span className="bg-[#FA3A08] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* CART LINK */}
            <button
              type="button"
              onClick={() => {
                onClose();
                setDrawerOpen(true);
              }}
              className="h-[44px] px-4 text-xs font-semibold text-[#111827] hover:bg-slate-50 flex items-center justify-between transition-colors w-full text-left"
            >
              <div className="flex items-center gap-3">
                <ShoppingCart className="h-[18px] w-[18px] text-[#014A94] flex-shrink-0" />
                <span>Shopping Cart</span>
              </div>
              {itemCount > 0 && (
                <span className="bg-[#014A94] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {itemCount}
                </span>
              )}
            </button>

            {/* ACCOUNT LINK */}
            <Link
              href={isLoggedIn ? '/account' : '/account'}
              onClick={onClose}
              className="h-[44px] px-4 text-xs font-semibold text-[#111827] hover:bg-slate-50 flex items-center justify-between transition-colors"
            >
              <div className="flex items-center gap-3">
                <User className="h-[18px] w-[18px] text-[#014A94] flex-shrink-0" />
                <span>
                  {isLoggedIn ? `Account (${user?.firstName || 'User'})` : 'Account'}
                </span>
              </div>
            </Link>
          </div>

          {/* BOTTOM DRAWER SUPPORT AREA */}
          <div className="mt-auto p-4 bg-slate-50 flex flex-col gap-2.5">
            <a
              href={createWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-bold text-xs py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-2xs"
            >
              <WhatsAppIcon className="h-4 w-4" />
              <span>WhatsApp Support ({WHATSAPP_CONFIG.displayPhone})</span>
            </a>
            <p className="text-[10px] text-center text-slate-500 font-medium">
              Hardware Hotline: <strong>{WHATSAPP_CONFIG.displayPhone}</strong>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};
