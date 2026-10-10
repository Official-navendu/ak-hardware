'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingCart, Zap, Copy, Check, X } from 'lucide-react';
import { Product } from '@/types/product';
import { formatPrice, calculateDiscount } from '@/lib/utils';
import { useCart } from '@/lib/context/cart-context';
import { useWishlist } from '@/lib/context/wishlist-context';
import { QuickViewModal } from '@/components/products/QuickViewModal';

// EXACT WISHLIST SVG FROM USER REFERENCE (HEART + PLUS)
const ReferenceWishlistIcon: React.FC<{ isWishlisted?: boolean }> = ({ isWishlisted }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="transition-colors duration-200">
    <path
      d="M21.196 11.4057C21.3096 11.1653 22.4159 8.76955 21.1429 6.31952C21.0141 6.06366 19.7866 3.7842 17.271 3.49733C15.2327 3.26473 13.1489 4.46649 11.9896 6.56762C10.5727 4.2649 8.16313 3.11742 6.02635 3.62138C4.3139 4.03231 3.0485 5.43565 2.54083 6.84674C1.22239 10.483 4.73822 14.5612 6.06424 16.0964C8.0722 18.4224 10.3226 19.7559 11.9821 20.5312C12.467 20.3064 12.9898 20.0273 13.5278 19.6784C13.846 19.4768 14.134 19.2675 14.4068 19.0659"
      stroke={isWishlisted ? '#FA3A08' : '#333333'}
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill={isWishlisted ? '#FA3A08' : 'none'}
    />
    <path
      d="M18.0938 12V19.3125"
      stroke={isWishlisted ? '#FA3A08' : '#333333'}
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14.4375 15.6562H21.75"
      stroke={isWishlisted ? '#FA3A08' : '#333333'}
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// EXACT SHARE SVG FROM USER REFERENCE (PAPER-PLANE / FLYING ARROW)
const ReferenceShareIcon: React.FC = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M10.125 13.875L15 9"
      stroke="#333333"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M20.9716 3.95434C21.0078 3.82605 21.0091 3.69044 20.9754 3.56147C20.9417 3.4325 20.8743 3.31484 20.78 3.22059C20.6858 3.12633 20.5681 3.0589 20.4392 3.02524C20.3102 2.99157 20.1746 2.99288 20.0463 3.02903L2.04629 8.48716C1.89934 8.52863 1.76854 8.61397 1.67139 8.73177C1.57424 8.84958 1.51536 8.99422 1.50262 9.14639C1.48988 9.29855 1.52388 9.45098 1.6001 9.58329C1.67631 9.71561 1.79109 9.82151 1.9291 9.88684L10.1257 13.875L14.1138 22.0706C14.1791 22.2086 14.285 22.3234 14.4173 22.3996C14.5497 22.4758 14.7021 22.5098 14.8542 22.4971C15.0064 22.4843 15.1511 22.4255 15.2689 22.3283C15.3867 22.2312 15.472 22.1004 15.5135 21.9534L20.9716 3.95434Z"
      stroke="#333333"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// QUICK VIEW EYE SVG WITH MATCHING CHARACTERISTICS
const ReferenceEyeIcon: React.FC = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z"
      stroke="#333333"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle
      cx="12"
      cy="12"
      r="3"
      stroke="#333333"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export interface ProductCardProps {
  product: Product;
  showRating?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
}) => {
  const router = useRouter();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  const isWishlisted = isInWishlist(product.id);
  const discountPercent = calculateDiscount(product.price, product.salePrice);
  const displayPrice = product.salePrice ?? product.price;
  const isOutOfStock = product.stock === 0;

  // Handle outside click to close share popover
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsShareOpen(false);
      }
    };
    if (isShareOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isShareOpen]);

  const getProductUrl = () => {
    if (typeof window !== 'undefined') {
      return `${window.location.origin}/products/${product.slug}`;
    }
    return `/products/${product.slug}`;
  };

  const handleShareClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const url = getProductUrl();

    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: `Check out ${product.name} on AK Hardware!`,
          url: url,
        });
        return;
      } catch {
        // User cancelled or share failed, fallback to popover
      }
    }
    setIsShareOpen((prev) => !prev);
  };

  const handleCopyLink = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const url = getProductUrl();
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shareOnWhatsApp = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const url = encodeURIComponent(getProductUrl());
    const text = encodeURIComponent(`Check out ${product.name} on AK Hardware: `);
    window.open(`https://api.whatsapp.com/send?text=${text}${url}`, '_blank');
  };

  const shareOnFacebook = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const url = encodeURIComponent(getProductUrl());
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isOutOfStock) {
      addToCart(product, 1);
    }
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isOutOfStock) {
      addToCart(product, 1);
      router.push('/checkout');
    }
  };

  return (
    <>
      <div className="group relative flex flex-col h-full bg-white border border-slate-200 rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-200 hover:shadow-md hover:border-slate-300">
        {/* TOP OVERLAY: DISCOUNT BADGE (TOP-LEFT) & VERTICAL ACTION STACK (TOP-RIGHT: EXACT REFERENCE BUTTONS) */}
        <div className="absolute top-2.5 left-2.5 right-2.5 z-10 flex items-start justify-between pointer-events-none">
          {/* TOP-LEFT DISCOUNT BADGE */}
          <div>
            {discountPercent > 0 && (
              <span className="pointer-events-auto bg-white/95 text-[#FA3A08] border border-[#FA3A08]/30 font-extrabold text-[10px] sm:text-[11px] px-2 py-0.5 rounded-md shadow-2xs">
                {discountPercent}% OFF
              </span>
            )}
          </div>

          {/* RIGHT SIDE VERTICAL ACTION STACK (EXACT 32x32 RAD 8px TRANSPARENT WHITE CONTAINERS FROM REFERENCE) */}
          <div className="pointer-events-auto relative flex flex-col gap-[8px]" ref={popoverRef}>
            {/* 1. WISHLIST BUTTON (EXACT SVG DATA) */}
            <button
              type="button"
              aria-label={isWishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
              aria-pressed={isWishlisted}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleWishlist(product);
              }}
              className="w-[32px] h-[32px] rounded-[8px] border-0 bg-[rgba(255,255,255,0.88)] hover:bg-white flex items-center justify-center transition-all duration-200 cursor-pointer shadow-2xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FA3A08]"
            >
              <ReferenceWishlistIcon isWishlisted={isWishlisted} />
            </button>

            {/* 2. SHARE BUTTON (EXACT SVG DATA) */}
            <button
              type="button"
              aria-label={`Share ${product.name}`}
              onClick={handleShareClick}
              className="w-[32px] h-[32px] rounded-[8px] border-0 bg-[rgba(255,255,255,0.88)] hover:bg-white flex items-center justify-center transition-all duration-200 cursor-pointer shadow-2xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FA3A08]"
            >
              <ReferenceShareIcon />
            </button>

            {/* 3. QUICK VIEW BUTTON (MATCHING CONTAINER & EYE ICON) */}
            <button
              type="button"
              aria-label={`Quick view ${product.name}`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsQuickViewOpen(true);
              }}
              className="w-[32px] h-[32px] rounded-[8px] border-0 bg-[rgba(255,255,255,0.88)] hover:bg-white flex items-center justify-center transition-all duration-200 cursor-pointer shadow-2xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FA3A08]"
            >
              <ReferenceEyeIcon />
            </button>

            {/* SHARE FALLBACK POPOVER */}
            {isShareOpen && (
              <div className="absolute top-10 right-0 z-50 w-56 bg-white border border-slate-200 rounded-xl shadow-xl p-3 flex flex-col gap-2 text-xs">
                <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                  <span className="font-bold text-[#111827]">Share Product</span>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setIsShareOpen(false);
                    }}
                    aria-label="Close share menu"
                    className="text-slate-400 hover:text-slate-600"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>

                {/* COPY LINK */}
                <button
                  onClick={handleCopyLink}
                  className="flex items-center justify-between p-2 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 font-medium transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Copy className="h-3.5 w-3.5 text-slate-500" />
                    {copied ? 'Link Copied!' : 'Copy Link'}
                  </span>
                  {copied && <Check className="h-3.5 w-3.5 text-emerald-600" />}
                </button>

                {/* SOCIAL SHARES */}
                <div className="grid grid-cols-2 gap-1.5 pt-1">
                  <button
                    onClick={shareOnWhatsApp}
                    className="p-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-semibold text-center transition-colors"
                  >
                    WhatsApp
                  </button>
                  <button
                    onClick={shareOnFacebook}
                    className="p-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold text-center transition-colors"
                  >
                    Facebook
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* PRODUCT IMAGE CONTAINER */}
        <Link
          href={`/products/${product.slug}`}
          className="relative block aspect-[4/3] w-full bg-[#F8F9FB] overflow-hidden p-3 sm:p-4"
        >
          <Image
            src={product.images[0] || '/assets/products/prod-rotary-hammer.svg'}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-contain p-2 group-hover:scale-[1.04] transition-transform duration-300"
          />
        </Link>

        {/* CARD CONTENT BODY */}
        <div className="flex flex-col flex-1 p-3.5 sm:p-4">
          {/* OPTIONAL CATEGORY TAG */}
          {product.category && (
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1 truncate">
              {product.category}
            </span>
          )}

          {/* PRODUCT TITLE (MAX 2 LINES) */}
          <Link
            href={`/products/${product.slug}`}
            className="font-semibold text-xs sm:text-sm text-[#111827] line-clamp-2 hover:text-[#014A94] transition-colors mb-2 leading-snug min-h-[2.4rem] sm:min-h-[2.6rem]"
          >
            {product.name}
          </Link>

          {/* PRICING STRUCTURE */}
          <div className="flex items-baseline gap-2 flex-wrap mb-3.5">
            <span className="text-base sm:text-lg font-extrabold text-[#111827]">
              {formatPrice(displayPrice)}
            </span>
            {product.salePrice && (
              <span className="text-xs text-slate-400 line-through font-normal">
                {formatPrice(product.price)}
              </span>
            )}
            {discountPercent > 0 && (
              <span className="text-[10px] sm:text-xs font-extrabold text-[#FA3A08] ml-auto">
                {discountPercent}% OFF
              </span>
            )}
          </div>

          {/* SIDE-BY-SIDE BOTTOM ACTION BUTTONS: [ ADD TO CART ] [ BUY NOW ] */}
          <div className="grid grid-cols-2 gap-2 mt-auto">
            {/* ADD TO CART */}
            <button
              type="button"
              disabled={isOutOfStock}
              onClick={handleAddToCart}
              className={`h-10 sm:h-10 font-semibold text-xs sm:text-xs rounded-lg sm:rounded-xl transition-all duration-200 flex items-center justify-center gap-1.5 shadow-2xs active:scale-[0.98] ${
                isOutOfStock
                  ? 'bg-slate-200 text-slate-500 cursor-not-allowed border border-slate-300'
                  : 'bg-[#012157] hover:bg-[#014A94] text-white'
              }`}
            >
              <ShoppingCart className="h-3.5 w-3.5" />
              <span className="truncate">{isOutOfStock ? 'Out of Stock' : 'Add to Cart'}</span>
            </button>

            {/* BUY NOW */}
            <button
              type="button"
              disabled={isOutOfStock}
              onClick={handleBuyNow}
              className={`h-10 sm:h-10 font-semibold text-xs sm:text-xs rounded-lg sm:rounded-xl transition-all duration-200 flex items-center justify-center gap-1.5 shadow-2xs active:scale-[0.98] ${
                isOutOfStock
                  ? 'bg-slate-200 text-slate-500 cursor-not-allowed border border-slate-300'
                  : 'bg-[#FA3A08] hover:bg-[#d92e00] text-white'
              }`}
            >
              <Zap className="h-3.5 w-3.5" />
              <span className="truncate">{isOutOfStock ? 'Out of Stock' : 'Buy Now'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* QUICK VIEW MODAL */}
      <QuickViewModal
        product={product}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
      />
    </>
  );
};
