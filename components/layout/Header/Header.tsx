'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import {
  Search,
  User,
  Heart,
  ShoppingCart,
  Menu,
  ChevronDown,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
} from 'lucide-react';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { CategoriesDropdown } from '@/components/layout/CategoriesDropdown';
import { MobileMenu } from '@/components/layout/MobileMenu';
import { useCart } from '@/lib/context/cart-context';
import { useWishlist } from '@/lib/context/wishlist-context';
import { formatPrice } from '@/lib/utils';
import { MOCK_PRODUCTS } from '@/lib/data/mock-products';
import { Logo } from '@/components/ui/Logo';
import { Container } from '@/components/ui/Container';
import { Drawer } from '@/components/ui/Drawer';
import { Button } from '@/components/ui/Button';

export const Header: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const {
    items,
    itemCount,
    subtotal,
    updateQuantity,
    removeFromCart,
    drawerOpen,
    setDrawerOpen,
  } = useCart();
  const { wishlistCount } = useWishlist();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const categoriesDropdownRef = useRef<HTMLDivElement>(null);

  // Filter products for interactive search dropdown
  const filteredProducts = searchQuery.trim()
    ? MOCK_PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.brand.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchFocused(false);
      }
      if (
        categoriesDropdownRef.current &&
        !categoriesDropdownRef.current.contains(e.target as Node)
      ) {
        setCategoriesDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchFocused(false);
      router.push(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const isActiveRoute = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  return (
    <header className="w-full bg-white sticky top-0 z-40">
      {/* 1. ANNOUNCEMENT BAR */}
      <AnnouncementBar />

      {/* 2. MAIN HEADER BAR */}
      <div
        className={`w-full bg-white border-b border-[#E5E7EB] transition-shadow duration-200 ${
          scrolled ? 'shadow-md shadow-slate-200/50' : 'shadow-2xs'
        }`}
      >
        <Container className="h-[64px] lg:h-auto py-0 lg:py-3 flex items-center justify-between gap-3">
          
          {/* LOGO & HAMBURGER AREA */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Open mobile menu"
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg hover:bg-slate-100 text-[#0C1E38] transition-colors"
            >
              <Menu className="h-[22px] w-[22px]" />
            </button>

            <Logo size="md" href="/" />
          </div>

          {/* MAIN DESKTOP NAVIGATION (SHOP, ABOUT, CATEGORIES, CONTACT, BLOGS ONLY) */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-xs font-semibold text-[#0C1E38]">
            <Link
              href="/shop"
              className={`py-1.5 transition-colors relative duration-150 hover:text-[#014A94] ${
                isActiveRoute('/shop')
                  ? 'text-[#014A94] font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#FA3A08]'
                  : 'text-[#0C1E38]'
              }`}
            >
              Shop
            </Link>

            <Link
              href="/about"
              className={`py-1.5 transition-colors relative duration-150 hover:text-[#014A94] ${
                isActiveRoute('/about')
                  ? 'text-[#014A94] font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#FA3A08]'
                  : 'text-[#0C1E38]'
              }`}
            >
              About
            </Link>

            {/* CATEGORIES DROPDOWN */}
            <div className="relative" ref={categoriesDropdownRef}>
              <button
                type="button"
                onClick={() => setCategoriesDropdownOpen(!categoriesDropdownOpen)}
                onMouseEnter={() => setCategoriesDropdownOpen(true)}
                className={`flex items-center gap-1.5 py-1.5 transition-colors duration-150 hover:text-[#014A94] focus:outline-none ${
                  isActiveRoute('/categories') || categoriesDropdownOpen
                    ? 'text-[#014A94] font-bold'
                    : 'text-[#0C1E38]'
                }`}
              >
                <span>Categories</span>
                <ChevronDown
                  className={`h-3.5 w-3.5 text-slate-500 transition-transform duration-200 ${
                    categoriesDropdownOpen ? 'rotate-180 text-[#014A94]' : ''
                  }`}
                />
              </button>

              <CategoriesDropdown
                isOpen={categoriesDropdownOpen}
                onClose={() => setCategoriesDropdownOpen(false)}
                onMouseEnter={() => setCategoriesDropdownOpen(true)}
                onMouseLeave={() => setCategoriesDropdownOpen(false)}
              />
            </div>

            <Link
              href="/catalogue"
              className={`py-1.5 transition-colors relative duration-150 hover:text-[#014A94] ${
                isActiveRoute('/catalogue')
                  ? 'text-[#014A94] font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#FA3A08]'
                  : 'text-[#0C1E38]'
              }`}
            >
              Catalogue
            </Link>

            <Link
              href="/our-partners"
              className={`py-1.5 transition-colors relative duration-150 hover:text-[#014A94] ${
                isActiveRoute('/our-partners')
                  ? 'text-[#014A94] font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#FA3A08]'
                  : 'text-[#0C1E38]'
              }`}
            >
              Our Partners
            </Link>

            <Link
              href="/contact"
              className={`py-1.5 transition-colors relative duration-150 hover:text-[#014A94] ${
                isActiveRoute('/contact')
                  ? 'text-[#014A94] font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#FA3A08]'
                  : 'text-[#0C1E38]'
              }`}
            >
              Contact
            </Link>

            <Link
              href="/blog"
              className={`py-1.5 transition-colors relative duration-150 hover:text-[#014A94] ${
                isActiveRoute('/blog')
                  ? 'text-[#014A94] font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#FA3A08]'
                  : 'text-[#0C1E38]'
              }`}
            >
              Blogs
            </Link>
          </nav>

          {/* SEARCH BAR & USER ACTIONS */}
          <div className="flex items-center gap-3 sm:gap-4">
            
            {/* DESKTOP PREMIUM SEARCH BAR */}
            <div className="hidden lg:block relative w-72 xl:w-96" ref={searchRef}>
              <form
                onSubmit={handleSearchSubmit}
                className="relative flex items-center w-full bg-[#F8FAFC] border border-[#E5E7EB] rounded-md overflow-hidden focus-within:border-[#014A94] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#014A94]/15 transition-all shadow-2xs group"
              >
                <div className="pl-3.5 pr-2 text-slate-400 group-focus-within:text-[#014A94] transition-colors flex items-center">
                  <Search className="h-[19px] w-[19px]" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setSearchFocused(true);
                  }}
                  onFocus={() => setSearchFocused(true)}
                  placeholder="Search products..."
                  className="w-full h-10 bg-transparent text-sm text-[#111827] placeholder-slate-400 focus:outline-none font-normal"
                />
                <button
                  type="submit"
                  aria-label="Submit search"
                  className="h-10 px-4 bg-[#FA3A08] hover:bg-[#d92e00] text-white text-xs font-bold flex items-center justify-center transition-colors flex-shrink-0"
                >
                  <span>Search</span>
                </button>
              </form>

              {/* LIVE SEARCH RESULTS DROPDOWN */}
              {searchFocused && searchQuery.trim().length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200/90 rounded-2xl shadow-xl p-3 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 px-1">
                    Matching Products ({filteredProducts.length})
                  </div>
                  {filteredProducts.length > 0 ? (
                    <div className="flex flex-col gap-1.5">
                      {filteredProducts.map((prod) => (
                        <Link
                          key={prod.id}
                          href={`/products/${prod.slug}`}
                          onClick={() => setSearchFocused(false)}
                          className="flex items-center gap-3 p-1.5 hover:bg-slate-50 rounded-xl transition-colors"
                        >
                          <div className="relative h-9 w-9 flex-shrink-0 bg-white rounded-lg border border-slate-200 overflow-hidden">
                            <Image
                              src={prod.images[0]}
                              alt={prod.name}
                              fill
                              className="object-contain p-1"
                            />
                          </div>
                          <div className="flex-1 flex flex-col min-w-0 text-xs">
                            <span className="font-semibold text-[#0C1E38] truncate">
                              {prod.name}
                            </span>
                            <span className="text-[10px] text-slate-500 font-normal">
                              {prod.category}
                            </span>
                          </div>
                          <span className="font-bold text-[#014A94] text-xs">
                            {formatPrice(prod.salePrice ?? prod.price)}
                          </span>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="p-3 text-center text-xs text-slate-400 font-normal">
                      No matching products found.
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* ACCOUNT ICON */}
            <Link
              href="/account"
              aria-label="Account"
              title="Customer Account"
              className="flex items-center gap-1.5 p-2 text-[#0C1E38] hover:text-[#014A94] hover:bg-slate-100/80 rounded-lg transition-colors"
            >
              <User className="h-5 w-5" />
              <span className="text-xs font-semibold hidden xl:inline">Account</span>
            </Link>

            {/* WISHLIST ICON */}
            <Link
              href="/account/wishlist"
              aria-label="Wishlist"
              title="Saved Wishlist"
              className="min-w-[44px] min-h-[44px] flex items-center justify-center p-2 text-[#0C1E38] hover:text-[#014A94] hover:bg-slate-100/80 rounded-lg transition-colors relative"
            >
              <Heart className="h-[21px] w-[21px]" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 bg-[#FA3A08] text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center border border-white">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* CART ICON */}
            <button
              type="button"
              aria-label="Cart"
              title="Shopping Cart"
              onClick={() => setDrawerOpen(true)}
              className="min-w-[44px] min-h-[44px] flex items-center gap-2 p-2 text-[#0C1E38] hover:text-[#014A94] hover:bg-slate-100/80 rounded-lg transition-colors relative"
            >
              <div className="relative flex items-center justify-center">
                <ShoppingCart className="h-[21px] w-[21px] text-[#0C1E38]" />
                {itemCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-[#FA3A08] text-white text-[10px] font-bold h-4.5 w-4.5 rounded-full flex items-center justify-center border-2 border-white">
                    {itemCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline-block text-xs font-bold text-[#0C1E38] pl-0.5">
                {formatPrice(subtotal)}
              </span>
            </button>

          </div>
        </Container>
      </div>

      {/* MOBILE RECTANGULAR PREMIUM SEARCH BAR */}
      <div className="lg:hidden px-4 py-2 bg-slate-50 border-b border-slate-200/80">
        <form
          onSubmit={handleSearchSubmit}
          className="relative flex items-center w-full bg-white border border-slate-300 rounded-md overflow-hidden focus-within:border-[#014A94] shadow-2xs"
        >
          <div className="pl-3 pr-1.5 text-slate-400">
            <Search className="h-4 w-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products..."
            className="w-full h-9 bg-transparent text-xs text-[#0C1E38] placeholder-slate-400 focus:outline-none"
          />
          <button
            type="submit"
            aria-label="Search"
            className="h-9 px-3 bg-[#FA3A08] hover:bg-[#d92e00] text-white text-xs font-bold transition-colors"
          >
            Search
          </button>
        </form>
      </div>

      {/* MOBILE DRAWER */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      {/* CART DRAWER */}
      <Drawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title={`Your Shopping Cart (${itemCount})`}
        position="right"
        footer={
          items.length > 0 ? (
            <div className="flex flex-col gap-3">
              <div className="flex justify-between font-extrabold text-[#0C1E38] text-base">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <p className="text-[11px] text-slate-500 font-normal">Taxes &amp; shipping calculated at checkout.</p>
              <div className="grid grid-cols-2 gap-2 mt-1">
                <Link href="/cart" onClick={() => setDrawerOpen(false)}>
                  <Button variant="secondary" fullWidth size="md">
                    View Cart
                  </Button>
                </Link>
                <Link href="/checkout" onClick={() => setDrawerOpen(false)}>
                  <Button variant="accent" fullWidth size="md" rightIcon={<ArrowRight className="h-4 w-4" />}>
                    Checkout
                  </Button>
                </Link>
              </div>
            </div>
          ) : null
        }
      >
        <div className="flex flex-col gap-4 py-2">
          {items.length === 0 ? (
            <div className="py-12 text-center flex flex-col items-center gap-3">
              <ShoppingCart className="h-12 w-12 text-slate-300" />
              <p className="text-sm text-slate-500 font-medium">Your cart is currently empty.</p>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  setDrawerOpen(false);
                  router.push('/shop');
                }}
              >
                Browse Shop Catalog
              </Button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.product.id}
                className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200/80"
              >
                <div className="relative h-14 w-14 flex-shrink-0 bg-white rounded-lg border border-slate-200 overflow-hidden">
                  <Image
                    src={item.product.images[0]}
                    alt={item.product.name}
                    fill
                    className="object-contain p-1"
                  />
                </div>
                <div className="flex-1 flex flex-col min-w-0">
                  <span className="font-semibold text-[#0C1E38] text-xs truncate">
                    {item.product.name}
                  </span>
                  <span className="text-xs font-bold text-[#014A94] mt-0.5">
                    {formatPrice(item.product.salePrice ?? item.product.price)}
                  </span>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="p-1 text-slate-500 hover:text-[#0C1E38] bg-white border border-slate-200 rounded"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="text-xs font-bold w-6 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="p-1 text-slate-500 hover:text-[#0C1E38] bg-white border border-slate-200 rounded"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.product.id)}
                  className="p-1.5 text-slate-400 hover:text-[#FA3A08] transition-colors"
                  aria-label="Remove item"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))
          )}
        </div>
      </Drawer>
    </header>
  );
};
