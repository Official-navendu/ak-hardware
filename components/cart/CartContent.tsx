'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ShoppingCart,
  ArrowLeft,
  Plus,
  Minus,
  Trash2,
  Heart,
  ArrowRight,
  Tag,
  CheckCircle2,
  ShieldCheck,
  Truck,
  RotateCcw,
  Lock,
  FileCheck,
  Check,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useCart } from '@/lib/context/cart-context';
import { useWishlist } from '@/lib/context/wishlist-context';
import { formatPrice, calculateDiscount } from '@/lib/utils';
import { MOCK_PRODUCTS } from '@/lib/data/mock-products';
import { createWhatsAppLink } from '@/lib/data/site-config';
import { WhatsAppIcon } from '@/components/whatsapp/FloatingWhatsApp';

export function CartContent() {
  const {
    items,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
    discount,
    shipping,
    grandTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
  } = useCart();

  const { addToWishlist } = useWishlist();
  const [couponCode, setCouponCode] = useState('');
  const [couponMessage, setCouponMessage] = useState<{ success: boolean; message: string } | null>(null);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.trim()) {
      const res = applyCoupon(couponCode);
      setCouponMessage(res);
    }
  };

  const recommendedProducts = MOCK_PRODUCTS.slice(0, 4);

  return (
    <div className="flex flex-col gap-8">
      {/* HEADER BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-[#E8F1FD] text-[#1B4E9B] rounded-xl">
            <ShoppingCart className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-[#0C1E38] tracking-tight">
              Your Cart ({items.length} Items)
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Review your items, selected size variants, apply contractor coupons, and checkout.
            </p>
          </div>
        </div>

        <Link
          href="/shop"
          className="text-xs font-bold text-[#1B4E9B] hover:underline flex items-center gap-1.5 whitespace-nowrap"
        >
          <ArrowLeft className="h-4 w-4" /> Continue Shopping
        </Link>
      </div>

      {items.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* MAIN LEFT COLUMN: CART ITEMS & RECOMMENDATIONS */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            {/* ITEM CONTROLS */}
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs flex items-center justify-between text-xs">
              <span className="font-bold text-[#0C1E38]">
                Shopping Cart Items ({items.length})
              </span>

              <button
                type="button"
                onClick={clearCart}
                className="font-bold text-red-600 hover:underline flex items-center gap-1 text-[11px]"
              >
                <Trash2 className="h-3.5 w-3.5" /> Clear Cart
              </button>
            </div>

            {/* CART ITEM LIST */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xs divide-y divide-slate-100">
              {items.map((item) => {
                const p = item.product;
                const v = item.selectedVariant;
                const price = v ? (v.salePrice ?? v.price) : (p.salePrice ?? p.price);
                const originalPrice = v ? v.price : p.price;
                const discountPct = calculateDiscount(originalPrice, price);

                return (
                  <div key={item.id} className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="relative h-20 w-20 bg-slate-50 border border-slate-200 rounded-xl flex-shrink-0 overflow-hidden p-1">
                        <Image
                          src={p.images[0] || '/assets/products/prod-rotary-hammer.svg'}
                          alt={p.name}
                          fill
                          className="object-contain p-1"
                        />
                      </div>

                      <div className="flex flex-col min-w-0 flex-1 gap-0.5">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold text-[#1B4E9B] uppercase">{p.brand}</span>
                          {v && (
                            <span className="bg-[#FFF0EC] text-[#FA3A08] text-[10px] font-extrabold px-2 py-0.5 rounded-md border border-[#FA3A08]/20">
                              Variant: {v.name}
                            </span>
                          )}
                          {discountPct > 0 && (
                            <span className="bg-[#EAFBF0] text-[#00A23A] text-[10px] font-bold px-1.5 py-0.5 rounded">
                              {discountPct}% OFF
                            </span>
                          )}
                        </div>

                        <Link href={`/products/${p.slug}`} className="font-bold text-xs sm:text-sm text-[#0C1E38] hover:text-[#1B4E9B] line-clamp-2">
                          {p.name} {v ? `(${v.name})` : ''}
                        </Link>
                        
                        <span className="text-[10px] text-slate-400 font-mono">SKU: {v?.sku || p.sku}</span>

                        {/* SECONDARY ACTIONS */}
                        <div className="flex items-center gap-4 mt-2 text-[11px]">
                          <button
                            type="button"
                            onClick={() => {
                              addToWishlist(p.id);
                              removeFromCart(item.id);
                            }}
                            className="font-semibold text-[#1B4E9B] hover:underline flex items-center gap-1"
                          >
                            <Heart className="h-3.5 w-3.5" /> Move to Wishlist
                          </button>
                          <button
                            type="button"
                            onClick={() => removeFromCart(item.id)}
                            className="font-semibold text-red-600 hover:underline flex items-center gap-1"
                          >
                            <Trash2 className="h-3.5 w-3.5" /> Remove
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* QUANTITY CONTROL & SUBTOTAL */}
                    <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                      <div className="flex items-center border border-slate-200 rounded-lg bg-white overflow-hidden shadow-2xs">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1.5 text-slate-500 hover:text-[#0C1E38] transition-colors"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-8 text-center font-bold text-xs text-[#0C1E38]">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1.5 text-slate-500 hover:text-[#0C1E38] transition-colors"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      <div className="flex flex-col items-end min-w-[90px]">
                        <span className="text-sm font-extrabold text-[#0C1E38]">
                          {formatPrice(price * item.quantity)}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {formatPrice(price)} each
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* RECOMMENDED PRODUCTS */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs mt-2">
              <h3 className="font-extrabold text-[#0C1E38] text-sm mb-4">Frequently Bought Together</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {recommendedProducts.map((p) => (
                  <div key={p.id} className="border border-slate-100 rounded-xl p-3 flex flex-col justify-between bg-[#FAFCFF]">
                    <div className="relative aspect-square w-full bg-white rounded-lg p-2 mb-2">
                      <Image src={p.images[0]} alt={p.name} fill className="object-contain" />
                    </div>
                    <span className="font-bold text-xs text-[#0C1E38] truncate">{p.name}</span>
                    <span className="font-extrabold text-[#FA3A08] text-xs mt-1">{formatPrice(p.salePrice ?? p.price)}</span>
                    <button
                      type="button"
                      onClick={() => useCart().addToCart(p, 1)}
                      className="mt-2 w-full bg-[#1B4E9B] hover:bg-[#0C1E38] text-white font-bold text-[11px] py-1.5 rounded-lg transition-colors"
                    >
                      Add Item
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR: ORDER SUMMARY */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs flex flex-col gap-5 sticky top-24">
              <h2 className="text-lg font-black text-[#0C1E38] border-b border-slate-100 pb-3">
                Order Summary
              </h2>

              {/* COUPON INPUT */}
              <form onSubmit={handleApplyCoupon} className="flex flex-col gap-2">
                <label className="text-xs font-bold text-slate-700">Have a Contractor Promo Code?</label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Try AK10 or TRADE15"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="text-xs"
                  />
                  <Button type="submit" variant="outline" className="text-xs font-bold whitespace-nowrap">
                    Apply
                  </Button>
                </div>

                {couponMessage && (
                  <span className={`text-[11px] font-bold ${couponMessage.success ? 'text-emerald-600' : 'text-red-600'}`}>
                    {couponMessage.message}
                  </span>
                )}
                {appliedCoupon && (
                  <div className="flex items-center justify-between text-xs bg-emerald-50 text-emerald-700 p-2 rounded-lg border border-emerald-200">
                    <span>Coupon <strong>{appliedCoupon.code}</strong> applied ({appliedCoupon.discountPercent}%)</span>
                    <button type="button" onClick={removeCoupon} className="text-red-600 font-bold hover:underline">Remove</button>
                  </div>
                )}
              </form>

              {/* PRICE CALCULATIONS */}
              <div className="flex flex-col gap-2.5 text-xs pt-3 border-t border-slate-100">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal ({items.length} items)</span>
                  <span className="font-bold text-[#0C1E38]">{formatPrice(subtotal)}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>Contractor Discount</span>
                    <span>-{formatPrice(discount)}</span>
                  </div>
                )}

                <div className="flex justify-between text-slate-600">
                  <span>Estimated Shipping</span>
                  <span className="font-bold text-[#00A23A]">
                    {shipping === 0 ? 'FREE' : formatPrice(shipping)}
                  </span>
                </div>

                <div className="flex justify-between text-slate-600">
                  <span>GST / Tax (18%)</span>
                  <span className="font-bold text-[#0C1E38]">{formatPrice(useCart().estimatedTax)}</span>
                </div>

                <div className="border-t border-slate-200 pt-3 mt-1 flex justify-between items-baseline">
                  <span className="text-sm font-black text-[#0C1E38]">Grand Total</span>
                  <span className="text-xl font-black text-[#FA3A08]">{formatPrice(grandTotal)}</span>
                </div>
              </div>

              {/* CHECKOUT CTA */}
              <Link href="/checkout" className="w-full">
                <Button className="w-full h-12 text-sm font-bold bg-[#FA3A08] hover:bg-[#E03000] text-white rounded-xl shadow-xs flex items-center justify-center gap-2">
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>

              {/* TRUST BADGES */}
              <div className="flex flex-col gap-2 pt-2 border-t border-slate-100 text-[11px] text-slate-500">
                <span className="flex items-center gap-2">
                  <Lock className="h-3.5 w-3.5 text-[#1B4E9B]" /> 256-bit Encrypted Secure Checkout
                </span>
                <span className="flex items-center gap-2">
                  <Truck className="h-3.5 w-3.5 text-[#00A23A]" /> 24-48 Hr Express Delivery in Bihar
                </span>
                <span className="flex items-center gap-2">
                  <RotateCcw className="h-3.5 w-3.5 text-[#FA3A08]" /> 7-Day Easy Replacement Guarantee
                </span>
              </div>

              {/* WHATSAPP CART HELP SHORTCUT */}
              <div className="bg-[#F0FDF4] border border-[#25D366]/30 p-3.5 rounded-xl flex flex-col gap-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#128C7E]">
                  <WhatsAppIcon className="h-4 w-4 text-[#25D366]" />
                  <span>Need Help With Your Cart?</span>
                </div>
                <p className="text-[11px] text-slate-600">
                  Have questions about products, bulk discounts, or delivery? Chat directly with support.
                </p>
                <a
                  href={createWhatsAppLink('Hi AK Hardware, I need help with my cart and products.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-bold text-xs py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <WhatsAppIcon className="h-3.5 w-3.5" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* EMPTY CART STATE */
        <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center flex flex-col items-center justify-center gap-4 max-w-md mx-auto shadow-2xs">
          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
            <ShoppingCart className="h-8 w-8" />
          </div>
          <h2 className="text-xl font-extrabold text-[#0C1E38]">Your Cart is Currently Empty</h2>
          <p className="text-xs text-slate-500 max-w-xs">
            Looks like you haven&apos;t added any products or size variants to your shopping cart yet.
          </p>
          <Link href="/shop">
            <Button className="bg-[#FA3A08] hover:bg-[#E03000] text-white font-bold text-xs px-6 py-2.5 rounded-xl">
              Start Shopping
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
