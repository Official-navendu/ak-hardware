'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { X, ShoppingCart, Zap, Heart, CheckCircle2, AlertCircle, Minus, Plus, ExternalLink } from 'lucide-react';
import { Product, ProductVariant } from '@/types/product';
import { formatPrice, calculateDiscount } from '@/lib/utils';
import { useCart } from '@/lib/context/cart-context';
import { useWishlist } from '@/lib/context/wishlist-context';

export interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  isOpen,
  onClose,
}) => {
  const router = useRouter();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(undefined);

  // Reset modal internal state when product changes
  useEffect(() => {
    if (product) {
      setQuantity(1);
      setSelectedImageIndex(0);
      setSelectedVariant(
        product.variants && product.variants.length > 0
          ? (product.variants.find((v) => v.isDefault) || product.variants[0])
          : undefined
      );
    }
  }, [product]);

  // Handle ESC key listener & body scroll lock
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;

  const isWishlisted = isInWishlist(product.id);
  const activePrice = selectedVariant
    ? (selectedVariant.salePrice ?? selectedVariant.price)
    : (product.salePrice ?? product.price);
  const activeOriginalPrice = selectedVariant ? selectedVariant.price : product.price;
  const discountPercent = calculateDiscount(activeOriginalPrice, activePrice);
  const isOutOfStock = product.stock === 0;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart(product, quantity, selectedVariant);
  };

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    addToCart(product, quantity, selectedVariant);
    onClose();
    router.push('/checkout');
  };

  return (
    <div
      aria-modal="true"
      role="dialog"
      aria-labelledby="quickview-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/65 backdrop-blur-xs transition-opacity overflow-y-auto animate-fade-in"
      onClick={onClose}
    >
      {/* MODAL CONTAINER */}
      <div
        className="relative w-full max-w-4xl bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* CLOSE BUTTON */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close quick view"
          className="absolute top-3.5 right-3.5 z-20 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 flex items-center justify-center transition-colors shadow-2xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FA3A08]"
        >
          <X className="h-5 w-5" />
        </button>

        {/* MODAL BODY GRID */}
        <div className="overflow-y-auto p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start">
          {/* LEFT COLUMN: IMAGE GALLERY (~45% / 5 cols) */}
          <div className="md:col-span-5 flex flex-col gap-3">
            <div className="relative aspect-square w-full bg-[#F8F9FB] border border-slate-200/90 rounded-xl overflow-hidden p-4">
              <Image
                src={product.images[selectedImageIndex] || product.images[0] || '/assets/products/prod-rotary-hammer.svg'}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-contain p-2"
                priority
              />
              {discountPercent > 0 && (
                <span className="absolute top-3 left-3 bg-[#FA3A08] text-white font-extrabold text-[11px] px-2.5 py-0.5 rounded-md shadow-2xs">
                  {discountPercent}% OFF
                </span>
              )}
            </div>

            {/* THUMBNAILS IF MULTIPLE */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-14 h-14 rounded-lg bg-[#F8F9FB] border overflow-hidden flex-shrink-0 transition-all ${
                      selectedImageIndex === idx
                        ? 'border-[#FA3A08] ring-1 ring-[#FA3A08]'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <Image src={img} alt="" fill className="object-contain p-1" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: PRODUCT DETAILS & ACTIONS (~55% / 7 cols) */}
          <div className="md:col-span-7 flex flex-col gap-4">
            <div>
              {product.category && (
                <span className="inline-block text-[11px] font-bold text-[#014A94] uppercase tracking-wider bg-blue-50 border border-blue-100 px-2.5 py-0.5 rounded-md mb-2">
                  {product.category}
                </span>
              )}
              <h2 id="quickview-title" className="text-xl sm:text-2xl font-extrabold text-[#111827] leading-tight mb-1">
                {product.name}
              </h2>
              {product.brand && (
                <span className="text-xs text-slate-500 font-medium">Brand: {product.brand}</span>
              )}
            </div>

            {/* VARIANT SELECTOR IN QUICK VIEW */}
            {product.variants && product.variants.length > 0 && (
              <div className="flex flex-col gap-2 pt-1 border-t border-slate-100">
                <div className="flex items-center justify-between text-xs font-bold text-[#0C1E38]">
                  <span>Select Size / Pack Variant:</span>
                  <span className="text-[#FA3A08] font-bold">{selectedVariant?.name}</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {product.variants.map((v) => {
                    const isSel = (selectedVariant?.id === v.id) || (!selectedVariant && v.isDefault);
                    return (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => setSelectedVariant(v)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border cursor-pointer ${
                          isSel
                            ? 'bg-[#0C1E38] text-white border-[#0C1E38]'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        {v.name} - {formatPrice(v.salePrice ?? v.price)}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* PRICING HIERARCHY */}
            <div className="flex items-baseline gap-3 pt-1 border-t border-slate-100">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#111827]">
                {formatPrice(activePrice)}
              </span>
              {(selectedVariant?.salePrice || (!selectedVariant && product.salePrice)) && (
                <span className="text-sm text-slate-400 line-through font-normal">
                  {formatPrice(activeOriginalPrice)}
                </span>
              )}
            </div>

            {/* STOCK STATUS */}
            <div className="flex items-center gap-2 text-xs font-semibold">
              {isOutOfStock ? (
                <span className="flex items-center gap-1.5 text-red-600 bg-red-50 px-2.5 py-1 rounded-md border border-red-100">
                  <AlertCircle className="h-4 w-4" />
                  <span>Out of Stock</span>
                </span>
              ) : (
                <span className="flex items-center gap-1.5 text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span>In Stock (SKU: {selectedVariant?.sku || product.sku})</span>
                </span>
              )}
            </div>

            {/* DESCRIPTION */}
            {(product.shortDescription || product.description) && (
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal bg-slate-50 p-3 rounded-xl border border-slate-100">
                {product.shortDescription || product.description}
              </p>
            )}

            {/* QUANTITY SELECTOR */}
            {!isOutOfStock && (
              <div className="flex items-center gap-3 pt-1">
                <span className="text-xs font-bold text-slate-700">Quantity:</span>
                <div className="flex items-center border border-slate-300 rounded-lg bg-white overflow-hidden shadow-2xs">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    aria-label="Decrease quantity"
                    className="p-2 text-slate-600 hover:bg-slate-100 transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-10 text-center font-bold text-sm text-[#111827]">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    aria-label="Increase quantity"
                    className="p-2 text-slate-600 hover:bg-slate-100 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {/* BOTTOM ACTIONS */}
            <div className="flex flex-col sm:flex-row items-stretch gap-3 pt-2">
              <button
                type="button"
                disabled={isOutOfStock}
                onClick={handleAddToCart}
                className={`flex-1 h-12 font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2 shadow-2xs active:scale-[0.98] ${
                  isOutOfStock
                    ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
                    : 'bg-[#012157] hover:bg-[#014A94] text-white'
                }`}
              >
                <ShoppingCart className="h-4 w-4" />
                <span>{isOutOfStock ? 'Out of Stock' : `Add ${selectedVariant ? selectedVariant.name : ''} to Cart`}</span>
              </button>

              <button
                type="button"
                disabled={isOutOfStock}
                onClick={handleBuyNow}
                className={`flex-1 h-12 font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2 shadow-2xs active:scale-[0.98] ${
                  isOutOfStock
                    ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
                    : 'bg-[#FA3A08] hover:bg-[#d92e00] text-white'
                }`}
              >
                <Zap className="h-4 w-4" />
                <span>{isOutOfStock ? 'Out of Stock' : 'Buy Now'}</span>
              </button>

              <button
                type="button"
                onClick={() => toggleWishlist(product)}
                aria-label={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
                className="h-12 w-12 rounded-xl border border-slate-200 flex items-center justify-center text-slate-600 hover:text-[#FA3A08] hover:border-[#FA3A08] transition-colors flex-shrink-0"
              >
                <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-[#FA3A08] text-[#FA3A08]' : ''}`} />
              </button>
            </div>

            {/* FULL DETAILS LINK */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <Link
                href={`/products/${product.slug}`}
                onClick={onClose}
                className="inline-flex items-center gap-1.5 text-[#014A94] font-bold hover:underline"
              >
                <span>View Full Product Specifications</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
