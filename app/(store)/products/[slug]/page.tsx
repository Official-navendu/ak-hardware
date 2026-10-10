'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  ChevronRight,
  ChevronLeft,
  Star,
  Heart,
  ShoppingCart,
  Zap,
  ShieldCheck,
  RotateCcw,
  Truck,
  Lock,
  Minus,
  Plus,
  CheckCircle2,
  Maximize2,
  Droplets,
  Sparkles,
  Settings,
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { ProductCard } from '@/components/products/ProductCard';
import { ProductTabs } from '@/components/products/ProductTabs';
import { MOCK_PRODUCTS } from '@/lib/data/mock-products';
import { useCart } from '@/lib/context/cart-context';
import { useWishlist } from '@/lib/context/wishlist-context';
import { formatPrice } from '@/lib/utils';
import { createWhatsAppLink } from '@/lib/data/site-config';
import { WhatsAppIcon } from '@/components/whatsapp/FloatingWhatsApp';
import { ProductVariant } from '@/types/product';

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const product =
    MOCK_PRODUCTS.find((p) => p.slug === slug) || MOCK_PRODUCTS[0];

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(() => 
    product.variants && product.variants.length > 0
      ? (product.variants.find((v) => v.isDefault) || product.variants[0])
      : undefined
  );
  const [activeTab, setActiveTab] = useState<'description' | 'specifications' | 'reviews' | 'shipping'>('description');

  const isWishlisted = isInWishlist(product.id);
  const images = product.images.length > 0 ? product.images : ['/assets/products/prod-sanitary-toilet.svg'];

  const moreFromBrand = MOCK_PRODUCTS.filter(
    (p) => p.brand === product.brand && p.id !== product.id
  ).slice(0, 4);

  const relatedProducts = MOCK_PRODUCTS.filter(
    (p) => p.id !== product.id
  ).slice(0, 6);

  return (
    <div className="bg-[#F7F8FA] min-h-screen pb-14">
      {/* 1. BREADCRUMB */}
      <div className="bg-white border-b border-slate-200/80 py-3">
        <Container>
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Link href="/" className="hover:text-[#1B4E9B]">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/shop" className="hover:text-[#1B4E9B]">Shop</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href={`/category/${product.category.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`} className="hover:text-[#1B4E9B]">
              {product.category}
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="font-semibold text-[#0C1E38] truncate max-w-xs">{product.name}</span>
          </div>
        </Container>
      </div>

      {/* 2. MAIN PRODUCT SECTION */}
      <div className="py-8">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT: IMAGE GALLERY (5 COLS) */}
            <div className="lg:col-span-6 flex flex-col gap-4">
              <div className="flex gap-4">
                {/* THUMBNAILS LIST */}
                <div className="flex flex-col gap-3 flex-shrink-0">
                  {[...Array(5)].map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedImage(idx % images.length)}
                      className={`relative w-16 h-16 rounded-lg border-2 bg-white overflow-hidden p-1 transition-all ${
                        selectedImage === (idx % images.length)
                          ? 'border-[#FA3A08] shadow-2xs'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <Image
                        src={images[idx % images.length]}
                        alt={`${product.name} thumbnail ${idx}`}
                        fill
                        className="object-contain p-1"
                      />
                    </button>
                  ))}
                </div>

                {/* MAIN IMAGE DISPLAY AREA */}
                <div className="relative flex-1 aspect-square bg-white rounded-2xl border border-slate-200/80 p-6 flex items-center justify-center overflow-hidden shadow-2xs group">
                  {/* BADGES */}
                  <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                    <span className="bg-[#00A23A] text-white font-bold text-xs px-2.5 py-1 rounded">
                      20% OFF
                    </span>
                  </div>

                  {/* WISHLIST BUTTON */}
                  <button
                    type="button"
                    onClick={() => toggleWishlist(product)}
                    className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white border border-slate-200 text-slate-500 hover:text-[#FA3A08] flex items-center justify-center shadow-2xs transition-colors"
                  >
                    <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-[#FA3A08] text-[#FA3A08]' : ''}`} />
                  </button>

                  <Image
                    src={images[selectedImage % images.length]}
                    alt={product.name}
                    fill
                    className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* ARROW CONTROLS */}
                  <button
                    type="button"
                    onClick={() => setSelectedImage((prev) => (prev - 1 + images.length) % images.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 border border-slate-200 text-slate-700 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedImage((prev) => (prev + 1) % images.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 border border-slate-200 text-slate-700 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>

                  <button
                    type="button"
                    className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-white/90 border border-slate-200 text-slate-700 flex items-center justify-center text-xs"
                  >
                    <Maximize2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* 4 FEATURE PILLS BELOW GALLERY */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="bg-white border border-slate-200/80 rounded-xl p-2.5 flex flex-col items-center text-center">
                  <ShieldCheck className="h-4 w-4 text-[#1B4E9B] mb-1" />
                  <span className="text-[11px] font-bold text-[#0C1E38]">Premium Quality</span>
                </div>
                <div className="bg-white border border-slate-200/80 rounded-xl p-2.5 flex flex-col items-center text-center">
                  <Settings className="h-4 w-4 text-[#1B4E9B] mb-1" />
                  <span className="text-[11px] font-bold text-[#0C1E38]">Easy Installation</span>
                </div>
                <div className="bg-white border border-slate-200/80 rounded-xl p-2.5 flex flex-col items-center text-center">
                  <Droplets className="h-4 w-4 text-[#1B4E9B] mb-1" />
                  <span className="text-[11px] font-bold text-[#0C1E38]">Water Saving</span>
                </div>
                <div className="bg-white border border-slate-200/80 rounded-xl p-2.5 flex flex-col items-center text-center">
                  <Sparkles className="h-4 w-4 text-[#1B4E9B] mb-1" />
                  <span className="text-[11px] font-bold text-[#0C1E38]">Modern Design</span>
                </div>
              </div>
            </div>

            {/* RIGHT: BUY BOX & PRODUCT DETAILS (6 COLS) */}
            <div className="lg:col-span-6 bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 flex flex-col gap-6 shadow-2xs">
              
              {/* TOP TAGS & IN STOCK */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="bg-[#E8F1FD] text-[#1B4E9B] text-xs font-bold px-3 py-1 rounded-full border border-[#D0E2FB]">
                  {product.brand}
                </span>

                <div className="flex items-center gap-4 text-xs font-semibold">
                  <span className="inline-flex items-center gap-1 text-[#00A23A] bg-[#EAFBF0] px-2.5 py-0.5 rounded-full">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>In Stock</span>
                  </span>
                  <span className="text-slate-400">SKU: {product.sku}</span>
                </div>
              </div>

              {/* TITLE & RATING */}
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0C1E38] leading-tight mb-2">
                  {product.name}
                </h1>
                
                <div className="flex items-center gap-3 text-xs">
                  <div className="flex text-amber-400 gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <span className="font-extrabold text-[#0C1E38]">{product.rating}</span>
                  <span className="text-slate-500">({product.reviewCount} reviews)</span>
                  <span className="text-slate-300">|</span>
                  <span className="text-slate-500">SKU: {product.sku}</span>
                </div>
              </div>

              {/* SHORT DESCRIPTION */}
              <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                {product.shortDescription}
              </p>

              {/* DYNAMIC CHECKLIST */}
              <div className="flex flex-col gap-2 pt-1 border-t border-slate-100">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#0C1E38]">
                  <CheckCircle2 className="h-4 w-4 text-[#00A23A]" />
                  <span>100% Original {product.brand} factory certified product</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-[#0C1E38]">
                  <CheckCircle2 className="h-4 w-4 text-[#00A23A]" />
                  <span>Available in factory sealed pack ({product.attributes?.find((a) => a.name.toLowerCase() === 'quantity' || a.name.toLowerCase() === 'size')?.value || 'Standard Pack'})</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-[#0C1E38]">
                  <CheckCircle2 className="h-4 w-4 text-[#00A23A]" />
                  <span>Fast 24-48 hr doorstep delivery across Bihar</span>
                </div>
              </div>

              {/* VARIANT SELECTOR SECTION */}
              {product.variants && product.variants.length > 0 && (
                <div className="flex flex-col gap-2.5 pt-3 border-t border-slate-100">
                  <div className="flex items-center justify-between text-xs font-bold text-[#0C1E38]">
                    <span>Select Size / Pack Quantity:</span>
                    <span className="text-[#FA3A08] font-bold bg-[#FFF0EC] px-2 py-0.5 rx-md rounded">
                      {selectedVariant?.name || 'Default Pack'}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.map((v) => {
                      const isSelected = (selectedVariant?.id === v.id) || (!selectedVariant && v.isDefault);
                      const displayVPrice = v.salePrice ?? v.price;
                      return (
                        <button
                          key={v.id}
                          type="button"
                          onClick={() => setSelectedVariant(v)}
                          className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border cursor-pointer ${
                            isSelected
                              ? 'bg-[#0C1E38] text-white border-[#0C1E38] shadow-xs scale-[1.02]'
                              : 'bg-white text-slate-700 border-slate-200 hover:border-slate-400 hover:bg-slate-50'
                          }`}
                        >
                          <span>{v.name}</span>
                          <span
                            className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                              isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-[#FA3A08]'
                            }`}
                          >
                            {formatPrice(displayVPrice)}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* PRICING DISPLAY */}
              <div className="bg-[#FAFCFF] border border-slate-100 p-4 rounded-xl flex flex-col gap-1">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-extrabold text-[#0C1E38]">
                    {formatPrice(
                      selectedVariant
                        ? (selectedVariant.salePrice ?? selectedVariant.price)
                        : (product.salePrice ?? product.price)
                    )}
                  </span>
                  {(selectedVariant?.salePrice || (!selectedVariant && product.salePrice)) && (
                    <span className="text-base text-slate-400 line-through">
                      {formatPrice(selectedVariant ? selectedVariant.price : product.price)}
                    </span>
                  )}
                  <span className="bg-[#FFF0EC] text-[#FA3A08] font-bold text-xs px-2 py-0.5 rounded">
                    Special Offer
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Inclusive of all taxes | SKU: <strong className="text-slate-700">{selectedVariant?.sku || product.sku}</strong>
                </p>
              </div>

              {/* QUANTITY & ACTIONS */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  {/* QUANTITY SELECTOR */}
                  <div className="flex items-center border border-slate-200 rounded-md overflow-hidden bg-white">
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="p-2 text-slate-600 hover:bg-slate-50"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-10 text-center font-bold text-xs text-[#0C1E38]">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => q + 1)}
                      className="p-2 text-slate-600 hover:bg-slate-50"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>

                  {/* ADD TO CART */}
                  <button
                    type="button"
                    onClick={() => addToCart(product, quantity, selectedVariant)}
                    className="flex-1 bg-[#FA3A08] hover:bg-[#E03000] text-white font-bold text-xs py-3 px-6 rounded-md transition-colors flex items-center justify-center gap-2 shadow-2xs"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    <span>Add {selectedVariant ? selectedVariant.name : ''} to Cart</span>
                  </button>

                  {/* BUY NOW */}
                  <button
                    type="button"
                    onClick={() => {
                      addToCart(product, quantity, selectedVariant);
                    }}
                    className="bg-[#E8F1FD] hover:bg-[#D0E2FB] text-[#1B4E9B] font-bold text-xs py-3 px-6 rounded-md transition-colors flex items-center justify-center gap-2"
                  >
                    <Zap className="h-4 w-4 fill-current" />
                    <span>Buy Now</span>
                  </button>
                </div>

                {/* ASK ABOUT THIS PRODUCT ON WHATSAPP */}
                <a
                  href={createWhatsAppLink(
                    `Hi AK Hardware, I am interested in ${product.name}. Please share more details about this product.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-bold text-xs py-3 px-5 rounded-md transition-colors flex items-center justify-center gap-2 shadow-2xs cursor-pointer"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  <span>Ask About This Product on WhatsApp</span>
                </a>

                {/* TRUST BADGES ROW */}
                <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium pt-2 border-t border-slate-100">
                  <span className="flex items-center gap-1.5">
                    <Lock className="h-3.5 w-3.5 text-[#1B4E9B]" />
                    <span>Secure Payment</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <RotateCcw className="h-3.5 w-3.5 text-[#1B4E9B]" />
                    <span>Easy Returns</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Truck className="h-3.5 w-3.5 text-[#1B4E9B]" />
                    <span>Fast Delivery</span>
                  </span>
                </div>
              </div>

            </div>

          </div>
        </Container>
      </div>

      {/* 3. PRODUCT INFORMATION TABS SECTION */}
      <section className="py-10 bg-white border-y border-slate-200/80">
        <Container>
          <ProductTabs
            product={product}
            moreFromBrand={moreFromBrand}
            onAddToCart={addToCart}
          />
        </Container>
      </section>

      {/* 4. RELATED PRODUCTS CAROUSEL */}
      <section className="py-12 bg-[#F7F8FA]">
        <Container>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl font-extrabold text-[#0C1E38]">Related Products</h2>
              <p className="text-xs text-slate-500">You may also like these products</p>
            </div>

            <div className="flex items-center gap-2">
              <button type="button" aria-label="Previous related products" className="w-8 h-8 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:bg-slate-50">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button type="button" aria-label="Next related products" className="w-8 h-8 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:bg-slate-50">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
