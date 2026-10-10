'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Heart,
  ShoppingCart,
  Trash2,
  Star,
  ArrowRight,
  Truck,
  ShieldCheck,
  RotateCcw,
  Lock,
  ChevronDown,
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useCart } from '@/lib/context/cart-context';
import { useWishlist } from '@/lib/context/wishlist-context';
import { formatPrice } from '@/lib/utils';
import { MOCK_PRODUCTS } from '@/lib/data/mock-products';
import { Product } from '@/types/product';

// SPECIFIED 5 WISHLIST PRODUCTS FROM REFERENCE
const WISHLIST_MOCK_ITEMS: (Product & { originalPrice: number; discountPercent: number })[] = [
  {
    ...MOCK_PRODUCTS[0], // Jaquar Wall Hung Closet
    name: 'Jaquar Wall Hung Closet with Soft Close Seat Cover',
    price: 11999,
    salePrice: 8999,
    originalPrice: 11999,
    discountPercent: 25,
    rating: 4.8,
  },
  {
    ...MOCK_PRODUCTS[1], // Havells/Jaquar Basin Mixer Tap
    name: 'Jaquar Basin Mixer Tap Single Lever',
    brand: 'Jaquar',
    price: 3499,
    salePrice: 2499,
    originalPrice: 3499,
    discountPercent: 29,
    rating: 4.7,
  },
  {
    ...MOCK_PRODUCTS[4], // Bosch Drill
    name: 'Bosch GSB 450 Drill Machine (450W) with Accessories',
    price: 5499,
    salePrice: 3999,
    originalPrice: 5499,
    discountPercent: 27,
    rating: 4.9,
  },
  {
    ...MOCK_PRODUCTS[2], // Astral uPVC Pipe
    name: 'Astral uPVC Pipe 1 Inch (SCH 40)',
    price: 650,
    salePrice: 450,
    originalPrice: 650,
    discountPercent: 31,
    rating: 4.6,
  },
  {
    ...MOCK_PRODUCTS[3], // Asian Paints Royale
    name: 'Asian Paints Royale 4L Luxury Emulsion',
    price: 1799,
    salePrice: 1299,
    originalPrice: 1799,
    discountPercent: 28,
    rating: 4.8,
  },
];

export function WishlistContent() {
  const { addToCart } = useCart();
  const { removeFromWishlist } = useWishlist();
  const [items, setItems] = useState(WISHLIST_MOCK_ITEMS);
  const [sortBy, setSortBy] = useState('newest');

  const handleRemove = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    removeFromWishlist(id);
  };

  return (
    <div className="flex flex-col gap-8">
      {/* HEADER ROW */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-border rounded-brand p-5 shadow-subtle">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-orange-brand/10 text-orange-brand rounded-brand">
            <Heart className="h-6 w-6 fill-orange-brand" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-navy-900 tracking-tight">My Wishlist</h1>
              <span className="text-xs font-bold text-orange-brand bg-orange-brand/10 px-2 py-0.5 rounded-full">
                {items.length} Items Saved
              </span>
            </div>
            <p className="text-xs text-text-muted mt-0.5">
              Saved hardware tools and materials for future procurement.
            </p>
          </div>
        </div>

        {/* SORT DROPDOWN */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-text-muted">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-xs font-bold bg-surface-bg border border-border rounded px-3 py-1.5 text-navy-900 focus:outline-none focus:border-blue-brand"
          >
            <option value="newest">Newest First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="discount">Highest Discount</option>
          </select>
        </div>
      </div>

      {/* TWO COLUMN GRID: ITEMS LIST & SIDEBAR */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT MAIN GRID OF WISHLIST ITEMS */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          {items.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {items.map((prod) => (
                <div
                  key={prod.id}
                  className="bg-white border border-border rounded-brand p-4 shadow-subtle flex flex-col justify-between gap-4 hover:shadow-card transition-shadow relative group"
                >
                  {/* BADGES & REMOVE ACTION */}
                  <div className="flex items-center justify-between">
                    <span className="bg-orange-brand text-white text-[10px] font-extrabold px-2 py-0.5 rounded">
                      {prod.discountPercent}% OFF
                    </span>
                    <button
                      onClick={() => handleRemove(prod.id)}
                      className="p-1.5 text-slate-400 hover:text-red-600 transition-colors"
                      title="Remove from wishlist"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  {/* THUMBNAIL & INFO */}
                  <div className="flex items-start gap-4">
                    <div className="relative h-24 w-24 bg-surface-bg border border-border rounded flex-shrink-0 overflow-hidden">
                      <Image
                        src={prod.images[0]}
                        alt={prod.name}
                        fill
                        className="object-contain p-2"
                      />
                    </div>

                    <div className="flex flex-col min-w-0 flex-1 gap-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-blue-brand uppercase">{prod.brand}</span>
                        <div className="flex items-center gap-1 text-[11px] font-bold text-amber-600">
                          <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                          <span>{prod.rating}</span>
                        </div>
                      </div>

                      <Link
                        href={`/products/${prod.slug}`}
                        className="font-bold text-xs text-navy-900 hover:text-blue-brand line-clamp-2 transition-colors"
                      >
                        {prod.name}
                      </Link>

                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-sm font-extrabold text-navy-900">
                          {formatPrice(prod.salePrice ?? prod.price)}
                        </span>
                        <span className="text-[11px] text-text-muted line-through">
                          {formatPrice(prod.originalPrice)}
                        </span>
                      </div>

                      <span className="text-[10px] font-bold text-accent-green mt-0.5">
                        ● In Stock (Ready for Dispatch)
                      </span>
                    </div>
                  </div>

                  {/* ACTIONS */}
                  <div className="pt-3 border-t border-border flex items-center gap-2">
                    <Link href={`/products/${prod.slug}`} className="flex-1">
                      <Button variant="secondary" size="sm" className="w-full text-xs">
                        View Details
                      </Button>
                    </Link>
                    <Button
                      variant="accent"
                      size="sm"
                      className="flex-1 text-xs"
                      onClick={() => addToCart(prod, 1)}
                      leftIcon={<ShoppingCart className="h-3.5 w-3.5" />}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white border border-border rounded-brand p-12 text-center flex flex-col items-center gap-3">
              <Heart className="h-12 w-12 text-slate-300 stroke-1" />
              <h3 className="font-extrabold text-navy-900 text-base">Your wishlist is empty</h3>
              <p className="text-xs text-text-muted max-w-sm">
                Save hardware products while browsing to compare prices and order anytime.
              </p>
              <Link href="/shop" className="mt-2">
                <Button variant="accent" size="md">
                  Explore Hardware Shop
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* RIGHT PROMOTIONAL SIDEBAR CARD */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-gradient-to-br from-navy-900 to-blue-900 text-white border border-navy-800 rounded-brand p-6 shadow-subtle flex flex-col gap-4">
            <div className="p-3 bg-white/10 rounded-full w-fit">
              <Heart className="h-6 w-6 text-amber-400 fill-amber-400" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-white tracking-tight">Save Your Favorite Products</h3>
              <p className="text-xs text-slate-300 leading-relaxed mt-1">
                Build your project procurement list and order anytime with guaranteed contractor pricing and fast site delivery.
              </p>
            </div>
            <Link href="/shop" className="mt-2">
              <Button variant="accent" fullWidth size="md" rightIcon={<ArrowRight className="h-4 w-4" />}>
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* BOTTOM TRUST FEATURE SECTION */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-border">
        <div className="bg-white border border-border rounded-brand p-4 flex items-center gap-3 shadow-subtle">
          <div className="p-2.5 bg-blue-50 text-blue-brand rounded flex-shrink-0">
            <Truck className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-navy-900 text-xs">Free Shipping</span>
            <span className="text-[11px] text-text-muted">On hardware orders above ₹5,000</span>
          </div>
        </div>

        <div className="bg-white border border-border rounded-brand p-4 flex items-center gap-3 shadow-subtle">
          <div className="p-2.5 bg-emerald-50 text-accent-green rounded flex-shrink-0">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-navy-900 text-xs">100% Genuine Products</span>
            <span className="text-[11px] text-text-muted">Sourced directly from top brands</span>
          </div>
        </div>

        <div className="bg-white border border-border rounded-brand p-4 flex items-center gap-3 shadow-subtle">
          <div className="p-2.5 bg-purple-50 text-purple-600 rounded flex-shrink-0">
            <RotateCcw className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-navy-900 text-xs">Easy Returns</span>
            <span className="text-[11px] text-text-muted">7-Day hassle-free replacement</span>
          </div>
        </div>

        <div className="bg-white border border-border rounded-brand p-4 flex items-center gap-3 shadow-subtle">
          <div className="p-2.5 bg-amber-50 text-amber-600 rounded flex-shrink-0">
            <Lock className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-navy-900 text-xs">Secure Payment</span>
            <span className="text-[11px] text-text-muted">256-bit encrypted checkout</span>
          </div>
        </div>
      </div>
    </div>
  );
}
