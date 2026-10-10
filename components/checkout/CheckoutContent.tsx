'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  MapPin,
  CreditCard,
  CheckCircle2,
  Lock,
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  Headphones,
  Check,
  Edit2,
  Building2,
  Home as HomeIcon,
  ChevronRight,
  HelpCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { useCart } from '@/lib/context/cart-context';
import { formatPrice } from '@/lib/utils';

export function CheckoutContent() {
  const router = useRouter();
  const { clearCart } = useCart();

  // FORM STATES MATCHING REFERENCE
  const [addressType, setAddressType] = useState<'home' | 'office' | 'other'>('home');
  const [fullName, setFullName] = useState('Rohit Sharma');
  const [phone, setPhone] = useState('7484034410');
  const [pincode, setPincode] = useState('842005');
  const [stateName, setStateName] = useState('Bihar');
  const [city, setCity] = useState('Muzaffarpur');
  const [addressLine1, setAddressLine1] = useState('Dhiranpatti Chowk, Markan - Muzaffarpur Rd');
  const [addressLine2, setAddressLine2] = useState('near Shyam Nandan Sahaye College, Narayanpur Anant, Sherpur');
  const [saveAddress, setSaveAddress] = useState(true);

  // PAYMENT METHOD STATE
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'netbanking' | 'wallets' | 'cod'>('card');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      clearCart();
      router.push('/order-success');
    }, 600);
  };

  return (
    <div className="flex flex-col gap-8">
      {/* CHECKOUT HEADER ROW WITH PROGRESS STEPS */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white border border-border rounded-brand p-5 shadow-subtle">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            <span className="text-navy-900">Check</span>
            <span className="text-orange-brand">out</span>
          </h1>
          <p className="text-xs text-text-muted mt-0.5">
            Complete your order in a few simple steps.
          </p>
        </div>

        {/* STEP PROGRESS INDICATOR */}
        <div className="flex items-center gap-2 sm:gap-4 text-xs font-semibold overflow-x-auto pb-1 lg:pb-0">
          <div className="flex items-center gap-2 text-blue-brand bg-blue-50 px-3 py-1.5 rounded-full font-bold whitespace-nowrap">
            <span className="h-5 w-5 rounded-full bg-blue-brand text-white flex items-center justify-center text-[10px]">
              1
            </span>
            <div className="flex flex-col">
              <span className="leading-tight">Shipping</span>
              <span className="text-[9px] font-normal text-text-muted">Delivery address</span>
            </div>
          </div>

          <ChevronRight className="h-4 w-4 text-slate-300 flex-shrink-0" />

          <div className="flex items-center gap-2 text-text-muted px-2 whitespace-nowrap">
            <span className="h-5 w-5 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-[10px] font-bold">
              2
            </span>
            <div className="flex flex-col">
              <span className="leading-tight text-navy-900 font-bold">Payment</span>
              <span className="text-[9px] font-normal text-text-muted">Choose payment method</span>
            </div>
          </div>

          <ChevronRight className="h-4 w-4 text-slate-300 flex-shrink-0" />

          <div className="flex items-center gap-2 text-text-muted px-2 whitespace-nowrap">
            <span className="h-5 w-5 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-[10px] font-bold">
              3
            </span>
            <div className="flex flex-col">
              <span className="leading-tight text-navy-900 font-bold">Review</span>
              <span className="text-[9px] font-normal text-text-muted">Confirm your order</span>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT COLUMN: 3 NUMBERED SECTIONS */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* SECTION 1: (1) SHIPPING ADDRESS */}
          <div className="bg-white border border-border rounded-brand p-6 shadow-subtle flex flex-col gap-5">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <div className="flex items-center gap-3">
                <span className="h-7 w-7 rounded-full bg-blue-brand text-white font-bold text-xs flex items-center justify-center">
                  1
                </span>
                <div>
                  <h3 className="font-bold text-navy-900 text-base">Shipping Address</h3>
                  <p className="text-xs text-text-muted">Enter your delivery address</p>
                </div>
              </div>
              <span className="text-xs font-medium text-text-muted">
                Already have an account?{' '}
                <Link href="/account" className="font-bold text-blue-brand hover:underline">
                  Login
                </Link>
              </span>
            </div>

            {/* ADDRESS TYPE TABS */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setAddressType('home')}
                className={`flex items-center gap-2 px-4 py-2 rounded text-xs font-bold transition-all border ${
                  addressType === 'home'
                    ? 'border-orange-brand bg-orange-brand/10 text-orange-brand'
                    : 'border-border bg-surface-bg text-text-secondary hover:bg-surface-secondary'
                }`}
              >
                <HomeIcon className="h-4 w-4" /> Home
              </button>

              <button
                type="button"
                onClick={() => setAddressType('office')}
                className={`flex items-center gap-2 px-4 py-2 rounded text-xs font-bold transition-all border ${
                  addressType === 'office'
                    ? 'border-orange-brand bg-orange-brand/10 text-orange-brand'
                    : 'border-border bg-surface-bg text-text-secondary hover:bg-surface-secondary'
                }`}
              >
                <Building2 className="h-4 w-4" /> Office
              </button>

              <button
                type="button"
                onClick={() => setAddressType('other')}
                className={`flex items-center gap-2 px-4 py-2 rounded text-xs font-bold transition-all border ${
                  addressType === 'other'
                    ? 'border-orange-brand bg-orange-brand/10 text-orange-brand'
                    : 'border-border bg-surface-bg text-text-secondary hover:bg-surface-secondary'
                }`}
              >
                <MapPin className="h-4 w-4" /> Other
              </button>
            </div>

            {/* ADDRESS FORM GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-navy-900">
                  Full Name <span className="text-orange-brand">*</span>
                </label>
                <Input
                  required
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="text-xs h-9"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-navy-900">
                  Phone Number <span className="text-orange-brand">*</span>
                </label>
                <div className="flex gap-2">
                  <span className="px-3 py-2 bg-surface-bg border border-border rounded text-xs font-bold text-navy-900 flex items-center">
                    +91 ▾
                  </span>
                  <Input
                    required
                    type="tel"
                    placeholder="Enter 10 digit mobile number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="text-xs h-9"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-navy-900">
                  Pincode <span className="text-orange-brand">*</span>
                </label>
                <div className="flex gap-2">
                  <Input
                    required
                    placeholder="Enter pincode"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="text-xs h-9"
                  />
                  <Button type="button" variant="primary" size="sm" className="h-9 text-xs px-3">
                    Check
                  </Button>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-navy-900">
                  State <span className="text-orange-brand">*</span>
                </label>
                <select
                  required
                  value={stateName}
                  onChange={(e) => setStateName(e.target.value)}
                  className="text-xs font-semibold bg-white border border-border rounded px-3 h-9 text-navy-900 focus:outline-none focus:border-blue-brand"
                >
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                  <option value="Bihar">Bihar</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Haryana">Haryana</option>
                  <option value="Maharashtra">Maharashtra</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-navy-900">
                  City <span className="text-orange-brand">*</span>
                </label>
                <Input
                  required
                  placeholder="Enter city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="text-xs h-9"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-navy-900">
                  Address Line 1 <span className="text-orange-brand">*</span>
                </label>
                <Input
                  required
                  placeholder="House no, building, street"
                  value={addressLine1}
                  onChange={(e) => setAddressLine1(e.target.value)}
                  className="text-xs h-9"
                />
              </div>

              <div className="sm:col-span-2 flex flex-col gap-1.5">
                <label className="text-xs font-bold text-navy-900">Address Line 2 (Optional)</label>
                <Input
                  placeholder="Apartment, landmark, etc."
                  value={addressLine2}
                  onChange={(e) => setAddressLine2(e.target.value)}
                  className="text-xs h-9"
                />
              </div>
            </div>

            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-navy-900 pt-1">
              <input
                type="checkbox"
                checked={saveAddress}
                onChange={(e) => setSaveAddress(e.target.checked)}
                className="rounded border-border text-orange-brand focus:ring-orange-brand"
              />
              <span>Save this address for future orders</span>
            </label>
          </div>

          {/* SECTION 2: (2) PAYMENT METHOD */}
          <div className="bg-white border border-border rounded-brand p-6 shadow-subtle flex flex-col gap-5">
            <div className="flex items-center gap-3 pb-3 border-b border-border">
              <span className="h-7 w-7 rounded-full bg-blue-brand text-white font-bold text-xs flex items-center justify-center">
                2
              </span>
              <div>
                <h3 className="font-bold text-navy-900 text-base">Payment Method</h3>
                <p className="text-xs text-text-muted">Choose how you want to pay</p>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {/* CARD OPTION */}
              <label
                className={`p-4 border rounded cursor-pointer flex items-start gap-3 transition-all ${
                  paymentMethod === 'card'
                    ? 'border-orange-brand bg-orange-50/30 ring-1 ring-orange-brand/50'
                    : 'border-border bg-white hover:bg-surface-bg'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'card'}
                  onChange={() => setPaymentMethod('card')}
                  className="mt-1 text-orange-brand focus:ring-orange-brand"
                />
                <div className="flex flex-col min-w-0 flex-1 gap-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-navy-900 text-xs sm:text-sm">Credit / Debit Card</span>
                    <span className="text-[10px] font-bold text-blue-brand font-mono">VISA • Mastercard • RuPay</span>
                  </div>
                  <p className="text-[11px] text-text-muted">Pay securely with Visa, Mastercard, Rupay</p>
                </div>
              </label>

              {/* UPI OPTION */}
              <label
                className={`p-4 border rounded cursor-pointer flex items-start gap-3 transition-all ${
                  paymentMethod === 'upi'
                    ? 'border-orange-brand bg-orange-50/30 ring-1 ring-orange-brand/50'
                    : 'border-border bg-white hover:bg-surface-bg'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'upi'}
                  onChange={() => setPaymentMethod('upi')}
                  className="mt-1 text-orange-brand focus:ring-orange-brand"
                />
                <div className="flex flex-col min-w-0 flex-1 gap-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-navy-900 text-xs sm:text-sm">UPI</span>
                    <span className="text-[10px] font-bold text-purple-700 font-mono">G Pay • PhonePe • Paytm</span>
                  </div>
                  <p className="text-[11px] text-text-muted">Pay using Google Pay, PhonePe, Paytm or any UPI app</p>
                </div>
              </label>

              {/* NET BANKING */}
              <label
                className={`p-4 border rounded cursor-pointer flex items-start gap-3 transition-all ${
                  paymentMethod === 'netbanking'
                    ? 'border-orange-brand bg-orange-50/30 ring-1 ring-orange-brand/50'
                    : 'border-border bg-white hover:bg-surface-bg'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'netbanking'}
                  onChange={() => setPaymentMethod('netbanking')}
                  className="mt-1 text-orange-brand focus:ring-orange-brand"
                />
                <div className="flex flex-col min-w-0 flex-1 gap-1">
                  <span className="font-bold text-navy-900 text-xs sm:text-sm">Net Banking</span>
                  <p className="text-[11px] text-text-muted">Pay directly from your bank account</p>
                </div>
              </label>

              {/* WALLETS */}
              <label
                className={`p-4 border rounded cursor-pointer flex items-start gap-3 transition-all ${
                  paymentMethod === 'wallets'
                    ? 'border-orange-brand bg-orange-50/30 ring-1 ring-orange-brand/50'
                    : 'border-border bg-white hover:bg-surface-bg'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'wallets'}
                  onChange={() => setPaymentMethod('wallets')}
                  className="mt-1 text-orange-brand focus:ring-orange-brand"
                />
                <div className="flex flex-col min-w-0 flex-1 gap-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-navy-900 text-xs sm:text-sm">Wallets</span>
                    <span className="text-[10px] font-bold text-amber-700 font-mono">Amazon Pay • Mobikwik</span>
                  </div>
                  <p className="text-[11px] text-text-muted">Pay using Amazon Pay, Mobikwik, etc.</p>
                </div>
              </label>

              {/* COD */}
              <label
                className={`p-4 border rounded cursor-pointer flex items-start gap-3 transition-all ${
                  paymentMethod === 'cod'
                    ? 'border-orange-brand bg-orange-50/30 ring-1 ring-orange-brand/50'
                    : 'border-border bg-white hover:bg-surface-bg'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'cod'}
                  onChange={() => setPaymentMethod('cod')}
                  className="mt-1 text-orange-brand focus:ring-orange-brand"
                />
                <div className="flex flex-col min-w-0 flex-1 gap-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-navy-900 text-xs sm:text-sm">Cash on Delivery</span>
                    <span className="bg-emerald-100 text-accent-green text-[10px] font-extrabold px-1.5 py-0.2 rounded">
                      COD
                    </span>
                  </div>
                  <p className="text-[11px] text-text-muted">Pay at your doorstep (Available for eligible pincodes)</p>
                </div>
              </label>
            </div>
          </div>

          {/* SECTION 3: (3) REVIEW YOUR ORDER */}
          <div className="bg-white border border-border rounded-brand p-6 shadow-subtle flex flex-col gap-5">
            <div className="flex items-center gap-3 pb-3 border-b border-border">
              <span className="h-7 w-7 rounded-full bg-blue-brand text-white font-bold text-xs flex items-center justify-center">
                3
              </span>
              <div>
                <h3 className="font-bold text-navy-900 text-base">Review Your Order</h3>
                <p className="text-xs text-text-muted">Please review your details before placing the order.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* SHIPPING REVIEW CARD */}
              <div className="p-4 bg-surface-bg border border-border rounded flex flex-col gap-2">
                <div className="flex items-center justify-between font-bold text-xs text-navy-900">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="h-4 w-4 text-blue-brand" /> Shipping Address
                  </span>
                  <button type="button" className="text-blue-brand hover:underline flex items-center gap-1">
                    <Edit2 className="h-3 w-3" /> Edit
                  </button>
                </div>
                <div className="text-[11px] text-text-secondary leading-relaxed pt-1">
                  <span className="font-bold text-navy-900 block">{fullName}</span>
                  <span>{addressLine1}, {addressLine2}</span>
                  <span className="block">{city}, {stateName} {pincode}</span>
                  <span className="block font-mono mt-1 text-text-muted">+91 {phone}</span>
                </div>
              </div>

              {/* PAYMENT REVIEW CARD */}
              <div className="p-4 bg-surface-bg border border-border rounded flex flex-col gap-2">
                <div className="flex items-center justify-between font-bold text-xs text-navy-900">
                  <span className="flex items-center gap-1.5">
                    <CreditCard className="h-4 w-4 text-blue-brand" /> Payment Method
                  </span>
                  <button type="button" className="text-blue-brand hover:underline flex items-center gap-1">
                    <Edit2 className="h-3 w-3" /> Edit
                  </button>
                </div>
                <div className="text-[11px] text-text-secondary leading-relaxed pt-1">
                  <span className="font-bold text-navy-900 uppercase block">
                    {paymentMethod === 'card' && 'Credit / Debit Card'}
                    {paymentMethod === 'upi' && 'UPI (Google Pay / PhonePe / Paytm)'}
                    {paymentMethod === 'netbanking' && 'Net Banking'}
                    {paymentMethod === 'wallets' && 'Wallets (Amazon Pay)'}
                    {paymentMethod === 'cod' && 'Cash on Delivery (COD)'}
                  </span>
                  <span className="text-text-muted">Pay securely with 256-bit encryption</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: ORDER SUMMARY SIDEBAR */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-white border border-border rounded-brand p-6 shadow-subtle flex flex-col gap-5 sticky top-20">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <h3 className="font-extrabold text-navy-900 text-base">Order Summary (3 Items)</h3>
              <Link href="/cart" className="text-xs font-bold text-blue-brand hover:underline">
                Edit Cart
              </Link>
            </div>

            {/* PRODUCT ITEMS LIST MATCHING REFERENCE */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between text-xs pb-3 border-b border-border">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative h-12 w-12 bg-surface-bg border border-border rounded flex-shrink-0 overflow-hidden">
                    <Image
                      src="/assets/products/prod-sanitary-toilet.svg"
                      alt="Jaquar Closet"
                      fill
                      className="object-contain p-1"
                    />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-bold text-navy-900 truncate">Jaquar Wall Hung Closet</span>
                    <span className="text-[10px] text-text-muted">Qty: 1</span>
                  </div>
                </div>
                <div className="flex flex-col text-right flex-shrink-0">
                  <span className="font-bold text-navy-900">₹8,999</span>
                  <span className="text-[10px] text-text-muted line-through">₹11,999</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pb-3 border-b border-border">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative h-12 w-12 bg-surface-bg border border-border rounded flex-shrink-0 overflow-hidden">
                    <Image
                      src="/assets/products/prod-bathroom-faucet.svg"
                      alt="Jaquar Mixer Tap"
                      fill
                      className="object-contain p-1"
                    />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-bold text-navy-900 truncate">Jaquar Basin Mixer Tap</span>
                    <span className="text-[10px] text-text-muted">Qty: 1</span>
                  </div>
                </div>
                <div className="flex flex-col text-right flex-shrink-0">
                  <span className="font-bold text-navy-900">₹2,499</span>
                  <span className="text-[10px] text-text-muted line-through">₹3,499</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pb-3 border-b border-border">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative h-12 w-12 bg-surface-bg border border-border rounded flex-shrink-0 overflow-hidden">
                    <Image
                      src="/assets/products/prod-rotary-hammer.svg"
                      alt="Bosch Drill"
                      fill
                      className="object-contain p-1"
                    />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-bold text-navy-900 truncate">Bosch GSB 450 Drill Machine</span>
                    <span className="text-[10px] text-text-muted">Qty: 1</span>
                  </div>
                </div>
                <div className="flex flex-col text-right flex-shrink-0">
                  <span className="font-bold text-navy-900">₹3,999</span>
                  <span className="text-[10px] text-text-muted line-through">₹5,499</span>
                </div>
              </div>
            </div>

            {/* BREAKDOWN */}
            <div className="flex flex-col gap-2.5 pt-2 text-xs sm:text-sm">
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

              <div className="text-[11px] text-accent-green font-semibold flex items-center gap-1">
                <Truck className="h-3.5 w-3.5" /> Free shipping on orders over ₹999
              </div>

              <div className="flex items-baseline justify-between pt-3 border-t border-border">
                <span className="text-base font-black text-navy-900">Total Amount</span>
                <div className="flex flex-col text-right">
                  <span className="text-xl font-black text-navy-900">₹12,998</span>
                  <span className="text-[11px] font-bold text-accent-green">You save ₹2,499 (16%)</span>
                </div>
              </div>
            </div>

            {/* PLACE ORDER BUTTON */}
            <Button
              type="submit"
              variant="accent"
              fullWidth
              size="lg"
              loading={isSubmitting}
              leftIcon={<Lock className="h-4 w-4" />}
              rightIcon={<ArrowRight className="h-4 w-4" />}
              className="font-bold text-sm py-3.5 mt-1"
            >
              Place Order Now
            </Button>

            <p className="text-[10px] text-text-muted text-center leading-tight">
              By placing your order, you agree to our{' '}
              <Link href="/terms" className="underline hover:text-navy-900">
                Terms &amp; Conditions
              </Link>{' '}
              and{' '}
              <Link href="/privacy-policy" className="underline hover:text-navy-900">
                Privacy Policy
              </Link>
              .
            </p>

            {/* SHOP WITH CONFIDENCE GRID */}
            <div className="pt-4 border-t border-border flex flex-col gap-3">
              <span className="text-xs font-bold text-navy-900 text-center">Shop with Confidence</span>
              <div className="grid grid-cols-2 gap-2 text-center text-[10px]">
                <div className="p-2 bg-surface-bg border border-border rounded flex flex-col items-center gap-1">
                  <ShieldCheck className="h-4 w-4 text-blue-brand" />
                  <span className="font-bold text-navy-900">100% Genuine</span>
                  <span className="text-text-muted">Products</span>
                </div>

                <div className="p-2 bg-surface-bg border border-border rounded flex flex-col items-center gap-1">
                  <RotateCcw className="h-4 w-4 text-orange-brand" />
                  <span className="font-bold text-navy-900">Easy Returns</span>
                  <span className="text-text-muted">7 Days</span>
                </div>

                <div className="p-2 bg-surface-bg border border-border rounded flex flex-col items-center gap-1">
                  <Lock className="h-4 w-4 text-accent-green" />
                  <span className="font-bold text-navy-900">Secure</span>
                  <span className="text-text-muted">Payments</span>
                </div>

                <div className="p-2 bg-surface-bg border border-border rounded flex flex-col items-center gap-1">
                  <Truck className="h-4 w-4 text-purple-600" />
                  <span className="font-bold text-navy-900">Fast Delivery</span>
                  <span className="text-text-muted">Pan India</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>

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
