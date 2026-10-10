'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  CheckCircle2,
  Truck,
  ArrowRight,
  FileText,
  Calendar,
  CreditCard,
  Package,
  ShieldCheck,
  RotateCcw,
  Headphones,
  Check,
  Clock,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/lib/context/cart-context';
import { MOCK_PRODUCTS } from '@/lib/data/mock-products';

export function OrderSuccessContent() {
  const { addToCart } = useCart();

  const recommendedItems = [
    {
      id: 'rec-1',
      name: 'Asian Paints Royale 4L',
      slug: 'asian-paints-royale-4l',
      image: '/assets/products/prod-paint-roller.svg',
      price: 1299,
      originalPrice: 1799,
      discountPercent: 28,
    },
    {
      id: 'rec-2',
      name: 'Astral uPVC Pipe 1 Inch',
      slug: 'astral-upvc-pipe-1-inch-3m',
      image: '/assets/products/prod-cpvc-pipe.svg',
      price: 450,
      originalPrice: 650,
      discountPercent: 31,
    },
    {
      id: 'rec-3',
      name: 'Jaquar Angle Cock',
      slug: 'jaquar-angle-cock',
      image: '/assets/products/prod-ball-valve.svg',
      price: 699,
      originalPrice: 999,
      discountPercent: 30,
    },
    {
      id: 'rec-4',
      name: 'Jaquar Wall Hung Closet',
      slug: 'jaquar-wall-hung-closet',
      image: '/assets/products/prod-sanitary-toilet.svg',
      price: 8999,
      originalPrice: 11999,
      discountPercent: 25,
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      {/* HERO SUCCESS BANNER MATCHING REFERENCE */}
      <div className="bg-white border border-border rounded-brand p-8 text-center flex flex-col items-center gap-4 shadow-subtle relative overflow-hidden">
        {/* DECORATIVE CONFETTI SPARKLES */}
        <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#00A23A_1px,transparent_1px)] [background-size:16px_16px]" />

        <div className="relative z-10 flex flex-col items-center gap-3">
          <div className="h-16 w-16 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg">
            <Check className="h-10 w-10 stroke-[3]" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-navy-900 tracking-tight">
            Order Placed <span className="text-accent-green">Successfully!</span>
          </h1>

          <p className="text-xs sm:text-sm text-text-muted max-w-lg leading-relaxed">
            Thank you for shopping with AK Hardware. Your order has been received and is being processed.
          </p>

          <span className="text-xs font-semibold text-text-secondary">
            A confirmation email has been sent to <strong className="text-navy-900">rohit@example.com</strong>
          </span>

          <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
            <Link href="/account/orders">
              <Button variant="accent" size="md" leftIcon={<Truck className="h-4 w-4" />}>
                Track Your Order
              </Button>
            </Link>
            <Link href="/shop">
              <Button variant="secondary" size="md" rightIcon={<ArrowRight className="h-4 w-4" />}>
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* 4 KEY ORDER DETAIL CARDS MATCHING REFERENCE */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* CARD 1: ORDER NUMBER */}
        <div className="bg-white border border-border rounded-brand p-4 shadow-subtle flex items-center gap-3">
          <div className="p-3 bg-blue-50 text-blue-brand rounded-brand flex-shrink-0">
            <FileText className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] font-bold text-text-muted">Order Number</span>
            <span className="text-base font-black text-navy-900 font-mono">#AKH12876</span>
          </div>
        </div>

        {/* CARD 2: ORDER DATE */}
        <div className="bg-white border border-border rounded-brand p-4 shadow-subtle flex items-center gap-3">
          <div className="p-3 bg-emerald-50 text-accent-green rounded-brand flex-shrink-0">
            <Calendar className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] font-bold text-text-muted">Order Date</span>
            <span className="text-xs font-bold text-navy-900">Sep 25, 2026</span>
            <span className="text-[10px] text-text-muted font-mono">10:42 AM</span>
          </div>
        </div>

        {/* CARD 3: ESTIMATED DELIVERY */}
        <div className="bg-white border border-border rounded-brand p-4 shadow-subtle flex items-center gap-3">
          <div className="p-3 bg-blue-50 text-blue-brand rounded-brand flex-shrink-0">
            <Truck className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] font-bold text-text-muted">Estimated Delivery</span>
            <span className="text-xs font-bold text-navy-900">Sep 28 - Oct 2, 2026</span>
            <span className="text-[10px] text-text-muted">3-5 business days</span>
          </div>
        </div>

        {/* CARD 4: PAYMENT METHOD */}
        <div className="bg-white border border-border rounded-brand p-4 shadow-subtle flex items-center gap-3">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-brand flex-shrink-0">
            <CreditCard className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] font-bold text-text-muted">Payment Method</span>
            <span className="text-xs font-bold text-navy-900">Online Payment</span>
            <span className="text-[10px] text-text-muted">Paid via Razorpay (UPI)</span>
          </div>
        </div>
      </div>

      {/* TWO COLUMN CONTENT AREA */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT MAIN COLUMN: ORDER ITEMS & RECOMMENDATIONS */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* ORDER ITEMS LIST */}
          <div className="bg-white border border-border rounded-brand p-6 shadow-subtle flex flex-col gap-4">
            <h3 className="font-bold text-navy-900 text-base pb-3 border-b border-border">
              Order Items (3)
            </h3>

            <div className="flex flex-col divide-y divide-border">
              {/* ITEM 1 */}
              <div className="py-3 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative h-14 w-14 bg-surface-bg border border-border rounded flex-shrink-0 overflow-hidden">
                    <Image
                      src="/assets/products/prod-sanitary-toilet.svg"
                      alt="Jaquar Closet"
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-bold text-xs sm:text-sm text-navy-900 truncate">
                      Jaquar Wall Hung Closet with Soft Close Seat Cover
                    </span>
                    <span className="text-[11px] text-text-muted">
                      Brand: Jaquar | SKU: JQ-WH-001
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-6 flex-shrink-0 text-xs">
                  <span className="text-text-muted font-bold">Qty: 1</span>
                  <div className="flex flex-col text-right">
                    <span className="font-extrabold text-navy-900">₹8,999</span>
                    <span className="text-[10px] text-text-muted line-through">₹11,999</span>
                  </div>
                </div>
              </div>

              {/* ITEM 2 */}
              <div className="py-3 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative h-14 w-14 bg-surface-bg border border-border rounded flex-shrink-0 overflow-hidden">
                    <Image
                      src="/assets/products/prod-bathroom-faucet.svg"
                      alt="Jaquar Tap"
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-bold text-xs sm:text-sm text-navy-900 truncate">
                      Jaquar Basin Mixer Tap Single Lever
                    </span>
                    <span className="text-[11px] text-text-muted">
                      Brand: Jaquar | SKU: JQ-BM-002
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-6 flex-shrink-0 text-xs">
                  <span className="text-text-muted font-bold">Qty: 1</span>
                  <div className="flex flex-col text-right">
                    <span className="font-extrabold text-navy-900">₹2,499</span>
                    <span className="text-[10px] text-text-muted line-through">₹3,499</span>
                  </div>
                </div>
              </div>

              {/* ITEM 3 */}
              <div className="py-3 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative h-14 w-14 bg-surface-bg border border-border rounded flex-shrink-0 overflow-hidden">
                    <Image
                      src="/assets/products/prod-rotary-hammer.svg"
                      alt="Bosch Drill"
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-bold text-xs sm:text-sm text-navy-900 truncate">
                      Bosch GSB 450 Drill Machine (450W) with Accessories
                    </span>
                    <span className="text-[11px] text-text-muted">
                      Brand: Bosch | SKU: BCH-GSB-450
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-6 flex-shrink-0 text-xs">
                  <span className="text-text-muted font-bold">Qty: 1</span>
                  <div className="flex flex-col text-right">
                    <span className="font-extrabold text-navy-900">₹3,999</span>
                    <span className="text-[10px] text-text-muted line-through">₹5,499</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* YOU MAY ALSO LIKE SECTION */}
          <div className="bg-white border border-border rounded-brand p-6 shadow-subtle flex flex-col gap-4">
            <div className="flex items-center justify-between pb-2 border-b border-border">
              <h3 className="font-bold text-navy-900 text-sm flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 text-amber-500" /> You May Also Like
              </h3>
              <Link href="/shop" className="text-xs font-bold text-blue-brand hover:underline flex items-center gap-1">
                View All <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {recommendedItems.map((prod) => (
                <div key={prod.id} className="p-3 bg-surface-bg border border-border rounded flex flex-col justify-between gap-2">
                  <div className="relative h-20 w-full bg-white border border-border rounded overflow-hidden">
                    <Image src={prod.image} alt={prod.name} fill className="object-contain p-2" />
                    <span className="absolute top-1 right-1 bg-orange-brand text-white text-[9px] font-extrabold px-1.5 py-0.2 rounded">
                      {prod.discountPercent}% OFF
                    </span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="font-bold text-xs text-navy-900 truncate">{prod.name}</span>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-xs font-extrabold text-navy-900">{formatPrice(prod.price)}</span>
                      <span className="text-[10px] text-text-muted line-through">{formatPrice(prod.originalPrice)}</span>
                    </div>
                  </div>
                  <Button
                    variant="accent"
                    size="sm"
                    className="w-full text-[11px] h-7 mt-1"
                    onClick={() => addToCart(MOCK_PRODUCTS[0], 1)}
                  >
                    Add to Cart
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: ORDER SUMMARY & TIMELINE */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* ORDER SUMMARY CARD */}
          <div className="bg-white border border-border rounded-brand p-6 shadow-subtle flex flex-col gap-4">
            <h3 className="font-extrabold text-navy-900 text-base pb-3 border-b border-border">
              Order Summary
            </h3>

            <div className="flex flex-col gap-2.5 text-xs sm:text-sm">
              <div className="flex justify-between text-text-secondary">
                <span>Subtotal (3 items)</span>
                <span className="font-bold text-navy-900">₹15,497</span>
              </div>

              <div className="flex justify-between text-accent-green font-semibold">
                <span>Discount</span>
                <span>- ₹2,499</span>
              </div>

              <div className="flex justify-between text-text-secondary">
                <span>Shipping Charges</span>
                <span className="font-bold text-accent-green">₹0</span>
              </div>

              {/* TOTAL PAID HIGHLIGHT BOX */}
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded flex flex-col gap-1 my-2">
                <div className="flex justify-between items-baseline">
                  <span className="font-extrabold text-navy-900 text-base">Total Paid</span>
                  <span className="font-black text-navy-900 text-xl">₹12,998</span>
                </div>
                <span className="text-xs font-bold text-accent-green">You saved ₹2,499 (16%)</span>
              </div>
            </div>
          </div>

          {/* WHAT'S NEXT TIMELINE CARD */}
          <div className="bg-white border border-border rounded-brand p-6 shadow-subtle flex flex-col gap-4">
            <h3 className="font-extrabold text-navy-900 text-base pb-3 border-b border-border">
              What&apos;s Next?
            </h3>

            <div className="flex flex-col gap-4 relative pl-4 border-l-2 border-border ml-2">
              {/* STEP 1: CONFIRMED */}
              <div className="relative flex flex-col gap-0.5">
                <span className="absolute -left-[23px] top-0 h-4 w-4 rounded-full bg-accent-green text-white flex items-center justify-center text-[10px]">
                  ✓
                </span>
                <div className="flex items-center justify-between text-xs font-bold text-navy-900">
                  <span>Order Confirmed</span>
                  <span className="text-[10px] text-text-muted">Sep 25, 2026</span>
                </div>
                <p className="text-[11px] text-text-muted">Your order has been received and verified.</p>
              </div>

              {/* STEP 2: PACKING */}
              <div className="relative flex flex-col gap-0.5">
                <span className="absolute -left-[23px] top-0 h-4 w-4 rounded-full bg-slate-200 border-2 border-white" />
                <div className="flex items-center justify-between text-xs font-bold text-navy-900">
                  <span>Preparing for Shipment</span>
                  <span className="text-[10px] text-text-muted">Expected Sep 26</span>
                </div>
                <p className="text-[11px] text-text-muted">We&apos;re packing your items in our warehouse.</p>
              </div>

              {/* STEP 3: DISPATCH */}
              <div className="relative flex flex-col gap-0.5">
                <span className="absolute -left-[23px] top-0 h-4 w-4 rounded-full bg-slate-200 border-2 border-white" />
                <div className="flex items-center justify-between text-xs font-bold text-navy-900">
                  <span>Out for Delivery</span>
                  <span className="text-[10px] text-text-muted">Expected Sep 28</span>
                </div>
                <p className="text-[11px] text-text-muted">Your order is on the way to your address.</p>
              </div>

              {/* STEP 4: DELIVERED */}
              <div className="relative flex flex-col gap-0.5">
                <span className="absolute -left-[23px] top-0 h-4 w-4 rounded-full bg-slate-200 border-2 border-white" />
                <div className="flex items-center justify-between text-xs font-bold text-navy-900">
                  <span>Delivered</span>
                  <span className="text-[10px] text-text-muted">Expected Oct 2</span>
                </div>
                <p className="text-[11px] text-text-muted">Your order will be delivered safely.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM FULL-WIDTH TRUST FEATURE BAR */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-border">
        <div className="bg-white border border-border rounded-brand p-4 flex items-center gap-3 shadow-subtle">
          <div className="p-2.5 bg-blue-50 text-blue-brand rounded flex-shrink-0">
            <Truck className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-navy-900 text-xs">Free Shipping</span>
            <span className="text-[11px] text-text-muted">On orders over ₹999</span>
          </div>
        </div>

        <div className="bg-white border border-border rounded-brand p-4 flex items-center gap-3 shadow-subtle">
          <div className="p-2.5 bg-emerald-50 text-accent-green rounded flex-shrink-0">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-navy-900 text-xs">100% Genuine Products</span>
            <span className="text-[11px] text-text-muted">Quality you can trust</span>
          </div>
        </div>

        <div className="bg-white border border-border rounded-brand p-4 flex items-center gap-3 shadow-subtle">
          <div className="p-2.5 bg-purple-50 text-purple-600 rounded flex-shrink-0">
            <RotateCcw className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-navy-900 text-xs">Easy Returns</span>
            <span className="text-[11px] text-text-muted">Hassle-free returns</span>
          </div>
        </div>

        <div className="bg-white border border-border rounded-brand p-4 flex items-center gap-3 shadow-subtle">
          <div className="p-2.5 bg-amber-50 text-amber-600 rounded flex-shrink-0">
            <Headphones className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-navy-900 text-xs">Dedicated Support</span>
            <span className="text-[11px] text-text-muted">We&apos;re here to help</span>
          </div>
        </div>
      </div>
    </div>
  );
}
