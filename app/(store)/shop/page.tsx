'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ChevronRight,
  ChevronLeft,
  Search,
  Star,
  SlidersHorizontal,
  LayoutGrid,
  List,
  RotateCcw,
  Truck,
  RotateCcw as ReturnIcon,
  ShieldCheck,
  CreditCard,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { InnerPageHero } from '@/components/layout/InnerPageHero';
import { ProductCard } from '@/components/products/ProductCard';
import { MOCK_PRODUCTS } from '@/lib/data/mock-products';
import { OFFICIAL_CATEGORIES } from '@/lib/data/mock-categories';

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedBrand, setSelectedBrand] = useState<string>('All');
  const [brandSearch, setBrandSearch] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<number>(50000);
  const [minRating, setMinRating] = useState<number>(0);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('best-selling');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState<boolean>(false);

  const categories = OFFICIAL_CATEGORIES.map((cat) => ({
    name: cat.name,
    count: cat.productCount,
    slug: cat.slug,
  }));

  const brandOptions = [
    { name: 'Havells', count: 24 },
    { name: 'Jaquar', count: 18 },
    { name: 'Asian Paints', count: 32 },
    { name: 'Supreme', count: 26 },
    { name: 'Astral', count: 20 },
    { name: 'Bosch', count: 15 },
    { name: 'Stanley', count: 12 },
    { name: 'Berger', count: 10 },
  ];

  const filteredBrands = brandOptions.filter((b) =>
    b.name.toLowerCase().includes(brandSearch.toLowerCase())
  );

  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter((p) => {
      if (selectedCategory !== 'All' && p.category.toLowerCase() !== selectedCategory.toLowerCase()) {
        return false;
      }
      if (selectedBrand !== 'All' && p.brand !== selectedBrand) {
        return false;
      }
      const price = p.salePrice ?? p.price;
      if (price > maxPrice) return false;
      if (minRating > 0 && p.rating < minRating) return false;
      if (inStockOnly && p.stock <= 0) return false;
      return true;
    }).sort((a, b) => {
      const priceA = a.salePrice ?? a.price;
      const priceB = b.salePrice ?? b.price;
      if (sortBy === 'price-low') return priceA - priceB;
      if (sortBy === 'price-high') return priceB - priceA;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // default best-selling
    });
  }, [selectedCategory, selectedBrand, maxPrice, minRating, inStockOnly, sortBy]);

  const resetFilters = () => {
    setSelectedCategory('All');
    setSelectedBrand('All');
    setBrandSearch('');
    setMaxPrice(50000);
    setMinRating(0);
    setInStockOnly(false);
    setSortBy('best-selling');
    setCurrentPage(1);
  };

  return (
    <div className="bg-[#F7F8FA] min-h-screen pb-14">
      {/* 1. SHOP HERO HEADER (OPEN EDITORIAL COMPOSITION) */}
      <InnerPageHero
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Shop' },
        ]}
        eyebrow="SHOP AK HARDWARE"
        title="Everything for Your Next Project"
        description="Explore sanitary products, pipes & fittings, hardware tools, tiles, paints and electrical essentials — all in one place."
        primaryCta={{
          label: 'Shop All Products',
          href: '#products',
        }}
        secondaryCta={{
          label: 'Explore Categories',
          href: '/categories',
        }}
        imageSrc="/assets/hero/shop.png"
        imageAlt="AK Hardware Product Collection"
        imageObjectFit="cover"
      />

      {/* MAIN CONTAINER */}
      <Container id="products" className="pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* SIDEBAR FILTERS (LEFT COLUMN) */}
          <aside className="hidden lg:flex flex-col gap-6">
            
            {/* CATEGORIES FILTER CARD */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs">
              <h3 className="font-extrabold text-[#0C1E38] text-sm mb-4 border-b border-slate-100 pb-3">
                Categories
              </h3>
              <div className="flex flex-col gap-1.5">
                <button
                  type="button"
                  onClick={() => setSelectedCategory('All')}
                  className={`flex items-center justify-between text-xs py-2 px-3 rounded-lg transition-colors font-semibold ${
                    selectedCategory === 'All'
                      ? 'bg-[#1B4E9B] text-white'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>All Products</span>
                  <span>({MOCK_PRODUCTS.length})</span>
                </button>
                {categories.map((cat) => {
                  const isActive = selectedCategory === cat.name;
                  return (
                    <button
                      key={cat.name}
                      type="button"
                      onClick={() => setSelectedCategory(cat.name)}
                      className={`flex items-center justify-between text-xs py-2 px-3 rounded-lg transition-colors text-left ${
                        isActive
                          ? 'bg-[#1B4E9B] text-white font-bold'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-[#0C1E38]'
                      }`}
                    >
                      <span>{cat.name}</span>
                      <div className="flex items-center gap-1">
                        <span className="text-[11px] opacity-75">({cat.count})</span>
                        <ChevronRight className="h-3 w-3 opacity-60" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* PRICE RANGE FILTER */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs">
              <h3 className="font-extrabold text-[#0C1E38] text-sm mb-4 border-b border-slate-100 pb-3">
                Price Range
              </h3>
              <div className="flex flex-col gap-3">
                <input
                  type="range"
                  min="0"
                  max="50000"
                  step="500"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#FA3A08] cursor-pointer"
                />
                <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                  <span>₹0</span>
                  <span className="text-[#FA3A08] font-bold">₹{maxPrice.toLocaleString()}+</span>
                </div>
              </div>
            </div>



            {/* AVAILABILITY */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs">
              <h3 className="font-extrabold text-[#0C1E38] text-sm mb-3 border-b border-slate-100 pb-3">
                Availability
              </h3>
              <div className="flex flex-col gap-2 text-xs text-slate-700">
                <label className="flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={inStockOnly}
                      onChange={(e) => setInStockOnly(e.target.checked)}
                      className="rounded text-[#FA3A08] focus:ring-0"
                    />
                    <span>In Stock</span>
                  </div>
                  <span className="text-[11px] text-slate-400">(250)</span>
                </label>
                <label className="flex items-center justify-between cursor-pointer opacity-60">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" disabled className="rounded" />
                    <span>Out of Stock</span>
                  </div>
                  <span className="text-[11px]"> (15)</span>
                </label>
              </div>
            </div>

            {/* COMPACT SIDEBAR OFFERS PANEL */}
            <div className="bg-gradient-to-br from-[#012157] to-[#014A94] text-white rounded-2xl p-5 shadow-sm relative overflow-hidden">
              <div className="flex items-center gap-1.5 text-[10px] font-extrabold text-[#FA3A08] bg-white px-2.5 py-0.5 rounded-md uppercase tracking-wider mb-2.5 w-fit">
                <Sparkles className="h-3 w-3" />
                <span>SPECIAL OFFERS</span>
              </div>
              <h4 className="font-extrabold text-sm text-white mb-1">
                Contractor Trade Discount
              </h4>
              <p className="text-xs text-slate-200 leading-relaxed font-normal mb-3">
                Get flat <span className="font-bold text-[#FFB800]">15% OFF</span> on wholesale orders over ₹10,000 using code <span className="font-mono text-[#FFB800] font-bold">AKVIP15</span>.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1 text-xs font-bold text-white hover:text-[#FFB800] transition-colors"
              >
                <span>Enquire Trade Pricing</span>
                <ArrowRight className="h-3.5 w-3.5 text-[#FA3A08]" />
              </Link>
            </div>

            {/* FILTER BUTTONS */}
            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={() => setCurrentPage(1)}
                className="w-full bg-[#FA3A08] hover:bg-[#E03000] text-white font-bold text-xs py-2.5 rounded-lg transition-colors shadow-2xs"
              >
                Apply Filters
              </button>
              <button
                type="button"
                onClick={resetFilters}
                className="text-xs text-slate-500 hover:text-[#FA3A08] font-semibold text-center flex items-center justify-center gap-1 py-1"
              >
                <RotateCcw className="h-3 w-3" />
                <span>Clear All</span>
              </button>
            </div>

          </aside>

          {/* MAIN PRODUCTS COLUMN (RIGHT SIDE) */}
          <main className="lg:col-span-3 flex flex-col gap-6">
            
            {/* DUAL PROMOTIONAL BANNERS AT TOP OF PRODUCTS COLUMN */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#0F223D] text-white rounded-xl p-5 flex items-center justify-between overflow-hidden shadow-2xs">
                <div className="max-w-[65%]">
                  <h4 className="text-lg font-extrabold text-white leading-tight">
                    Up to 30% Off
                  </h4>
                  <p className="text-sm font-bold text-blue-200">on Sanitary Products</p>
                  <p className="text-[11px] text-slate-300 mt-1 mb-3">Premium brands for modern bathrooms</p>
                  <Link href="/category/sanitary-items" className="bg-white text-[#0F223D] font-bold text-[11px] px-3.5 py-1.5 rounded inline-flex items-center gap-1 hover:bg-slate-100">
                    <span>Shop Now</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
                <div className="relative w-24 h-24 flex-shrink-0">
                  <Image src="/assets/categories/sanitary-3d.jpg" alt="Sanitary Offer" fill className="object-contain" />
                </div>
              </div>

              <div className="bg-[#FA3A08] text-white rounded-xl p-5 flex items-center justify-between overflow-hidden shadow-2xs">
                <div className="max-w-[65%]">
                  <h4 className="text-lg font-extrabold text-white leading-tight">
                    Special Offer
                  </h4>
                  <p className="text-sm font-bold text-amber-100">on Power Tools</p>
                  <p className="text-[11px] text-white/90 mt-1 mb-3">Top brands at the best prices.</p>
                  <Link href="/category/hardware-tools" className="bg-white text-[#FA3A08] font-bold text-[11px] px-3.5 py-1.5 rounded inline-flex items-center gap-1 hover:bg-slate-100">
                    <span>Shop Now</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
                <div className="relative w-24 h-24 flex-shrink-0">
                  <Image src="/assets/categories/tools-3d.jpg" alt="Tools Offer" fill className="object-contain" />
                </div>
              </div>
            </div>

            {/* HEADER CONTROLS BAR */}
            <div className="bg-white border border-slate-200/80 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4 shadow-2xs">
              <div className="text-xs text-slate-600 font-medium">
                Showing <span className="font-bold text-[#0C1E38]">1-12</span> of <span className="font-bold text-[#0C1E38]">{filteredProducts.length}</span> products
              </div>

              <div className="flex items-center gap-4">
                {/* SORT BY DROPDOWN */}
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-slate-500">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="h-8 bg-slate-50 border border-slate-200 rounded-md px-2.5 font-semibold text-[#0C1E38] focus:outline-none focus:border-[#1B4E9B]"
                  >
                    <option value="best-selling">Best Selling</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                </div>

                {/* VIEW MODE TOGGLE */}
                <div className="flex border border-slate-200 rounded-md overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 transition-colors ${viewMode === 'grid' ? 'bg-[#012157] text-white' : 'bg-white text-slate-500'}`}
                    aria-label="Grid view"
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 transition-colors ${viewMode === 'list' ? 'bg-[#012157] text-white' : 'bg-white text-slate-500'}`}
                    aria-label="List view"
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* 4-COLUMN PRODUCT GRID (OR LIST) */}
            {filteredProducts.length > 0 ? (
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4'
                    : 'flex flex-col gap-4'
                }
              >
                {filteredProducts.slice(0, 12).map((prod) => (
                  <ProductCard key={prod.id} product={prod} />
                ))}
              </div>
            ) : (
              <div className="bg-white border border-slate-200/80 rounded-2xl p-12 text-center flex flex-col items-center gap-3">
                <p className="text-sm font-semibold text-slate-600">No products matched your selected filters.</p>
                <button
                  onClick={resetFilters}
                  className="bg-[#FA3A08] text-white font-bold text-xs px-5 py-2 rounded-md"
                >
                  Reset All Filters
                </button>
              </div>
            )}

            {/* PAGINATION BAR */}
            <div className="bg-white border border-slate-200/80 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4 shadow-2xs">
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="w-8 h-8 rounded border border-slate-200 text-slate-600 flex items-center justify-center hover:bg-slate-50 disabled:opacity-40 text-xs"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentPage(1)}
                  className={`w-8 h-8 rounded text-xs font-bold ${
                    currentPage === 1 ? 'bg-[#012157] text-white' : 'border border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  1
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentPage(2)}
                  className={`w-8 h-8 rounded text-xs font-bold ${
                    currentPage === 2 ? 'bg-[#012157] text-white' : 'border border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  2
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentPage(3)}
                  className={`w-8 h-8 rounded text-xs font-bold ${
                    currentPage === 3 ? 'bg-[#012157] text-white' : 'border border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  3
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentPage(4)}
                  className={`w-8 h-8 rounded text-xs font-bold ${
                    currentPage === 4 ? 'bg-[#012157] text-white' : 'border border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  4
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentPage(5)}
                  className={`w-8 h-8 rounded text-xs font-bold ${
                    currentPage === 5 ? 'bg-[#012157] text-white' : 'border border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  5
                </button>
                <span className="text-xs text-slate-400 px-1">...</span>
                <button
                  type="button"
                  onClick={() => setCurrentPage(22)}
                  className="w-8 h-8 rounded border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50"
                >
                  22
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentPage((p) => p + 1)}
                  className="w-8 h-8 rounded border border-slate-200 text-slate-600 flex items-center justify-center hover:bg-slate-50 text-xs"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                <span>Show</span>
                <select className="h-8 bg-slate-50 border border-slate-200 rounded px-2 text-xs font-semibold text-[#0C1E38]">
                  <option value="12">12 per page</option>
                  <option value="24">24 per page</option>
                  <option value="48">48 per page</option>
                </select>
              </div>
            </div>

          </main>
        </div>

        {/* TRUST FEATURES STRIP AT BOTTOM */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12 pt-8 border-t border-slate-200/80">
          <div className="bg-white border border-slate-100 rounded-xl p-4 flex items-center gap-3 shadow-2xs">
            <div className="w-10 h-10 rounded-full bg-[#EBF3FE] text-[#1B4E9B] flex items-center justify-center flex-shrink-0">
              <Truck className="h-5 w-5" />
            </div>
            <div>
              <h5 className="font-extrabold text-[#0C1E38] text-xs">Free Shipping</h5>
              <p className="text-[11px] text-slate-500 font-normal">On Orders Over ₹999</p>
            </div>
          </div>

          <div className="bg-white border border-slate-100 rounded-xl p-4 flex items-center gap-3 shadow-2xs">
            <div className="w-10 h-10 rounded-full bg-[#EBF3FE] text-[#1B4E9B] flex items-center justify-center flex-shrink-0">
              <ReturnIcon className="h-5 w-5" />
            </div>
            <div>
              <h5 className="font-extrabold text-[#0C1E38] text-xs">Easy Returns</h5>
              <p className="text-[11px] text-slate-500 font-normal">Hassle Free Returns</p>
            </div>
          </div>

          <div className="bg-white border border-slate-100 rounded-xl p-4 flex items-center gap-3 shadow-2xs">
            <div className="w-10 h-10 rounded-full bg-[#EBF3FE] text-[#1B4E9B] flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h5 className="font-extrabold text-[#0C1E38] text-xs">100% Genuine Products</h5>
              <p className="text-[11px] text-slate-500 font-normal">From Trusted Brands</p>
            </div>
          </div>

          <div className="bg-white border border-slate-100 rounded-xl p-4 flex items-center gap-3 shadow-2xs">
            <div className="w-10 h-10 rounded-full bg-[#EBF3FE] text-[#1B4E9B] flex items-center justify-center flex-shrink-0">
              <CreditCard className="h-5 w-5" />
            </div>
            <div>
              <h5 className="font-extrabold text-[#0C1E38] text-xs">Secure Payments</h5>
              <p className="text-[11px] text-slate-500 font-normal">Multiple Payment Options</p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
