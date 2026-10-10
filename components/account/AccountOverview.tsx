'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Package,
  Heart,
  MapPin,
  ShoppingCart,
  ChevronRight,
  UserCheck,
  Tag,
  Copy,
  Check,
  Clock,
  ArrowRight,
  RefreshCw,
  Plus,
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useUser } from '@/lib/context/user-context';
import { useWishlist } from '@/lib/context/wishlist-context';
import { useCart } from '@/lib/context/cart-context';
import { useToast } from '@/lib/context/toast-context';
import { formatPrice, formatDate } from '@/lib/utils';
import { MOCK_PRODUCTS } from '@/lib/data/mock-products';

export function AccountOverview() {
  const { user, orders, addresses, recentlyViewed } = useUser();
  const { wishlistIds, wishlistCount } = useWishlist();
  const { itemCount, addToCart } = useCart();
  const toast = useToast();

  const [copied, setCopied] = useState(false);
  const [trackId, setTrackId] = useState('');
  const [trackResult, setTrackResult] = useState<string | null>(null);

  const fullName = `${user.firstName} ${user.lastName}`.trim();

  const handleCopyCode = () => {
    navigator.clipboard.writeText('AKVIP15');
    setCopied(true);
    toast.success('Coupon code AKVIP15 copied!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTrackOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackId.trim()) {
      toast.warning('Please enter an order ID to track');
      return;
    }
    setTrackResult(`Order #${trackId.toUpperCase()}: Status - In-Transit (Estimated Delivery: Tomorrow by 5 PM)`);
    toast.info(`Shipment status found for #${trackId.toUpperCase()}`);
  };

  const handleReorder = (orderId: string) => {
    const targetOrder = orders.find((o) => o.id === orderId);
    if (!targetOrder) return;

    let addedCount = 0;
    targetOrder.items.forEach((item) => {
      const prod = MOCK_PRODUCTS.find((p) => p.id === item.productId) || MOCK_PRODUCTS[0];
      addToCart(prod, item.quantity);
      addedCount += item.quantity;
    });

    toast.success(`Reordered ${addedCount} item(s) to cart!`);
  };

  // Get wishlist products
  const wishlistProducts = MOCK_PRODUCTS.filter((p) => wishlistIds.includes(p.id)).slice(0, 3);

  return (
    <div className="flex flex-col gap-6">
      {/* 1. TOP GREETING & TRACK ORDER WIDGET */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white border border-border rounded-brand p-5 shadow-subtle">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-[#014A94] uppercase tracking-wider">Customer Portal</span>
            <Badge variant="primary" size="sm">{user.memberTier}</Badge>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-[#0C1E38] tracking-tight">
            Welcome back, {fullName}
          </h1>
          <p className="text-xs text-text-muted mt-0.5">
            Manage your orders, wishlist, addresses and account details.
          </p>
        </div>

        {/* TRACK SHIPMENT FORM */}
        <form onSubmit={handleTrackOrder} className="flex flex-col gap-1.5 w-full lg:w-80">
          <label className="text-[11px] font-bold text-navy-900 flex items-center gap-1">
            <Clock className="h-3.5 w-3.5 text-blue-brand" /> Track Your Hardware Order
          </label>
          <div className="flex gap-1.5">
            <input
              type="text"
              placeholder="e.g. AK-94821"
              value={trackId}
              onChange={(e) => setTrackId(e.target.value)}
              className="text-xs h-9 px-3 rounded-lg border border-border focus:outline-none focus:border-[#014A94] flex-1 min-w-0"
            />
            <Button type="submit" variant="accent" size="sm" className="whitespace-nowrap h-9 text-xs">
              Track
            </Button>
          </div>
          {trackResult && (
            <p className="text-[11px] text-emerald-800 font-semibold mt-1 p-2 bg-emerald-50 rounded border border-emerald-200 animate-in fade-in">
              {trackResult}
            </p>
          )}
        </form>
      </div>

      {/* 2. QUICK STATS (CLICKABLE CARDS BASED ON REAL DATA) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Link
          href="/account/orders"
          className="bg-white border border-border rounded-brand p-4 shadow-subtle hover:border-[#014A94] hover:shadow-md transition-all flex flex-col gap-1 group"
        >
          <div className="flex items-center justify-between text-text-muted">
            <span className="text-[11px] font-bold uppercase tracking-wider group-hover:text-[#014A94]">Total Orders</span>
            <Package className="h-4 w-4 text-[#014A94]" />
          </div>
          <span className="text-2xl font-black text-[#0C1E38]">{orders.length}</span>
          <span className="text-[10px] font-semibold text-[#014A94] flex items-center gap-0.5">
            View Order History <ChevronRight className="h-3 w-3" />
          </span>
        </Link>

        <Link
          href="/account/wishlist"
          className="bg-white border border-border rounded-brand p-4 shadow-subtle hover:border-[#FA3A08] hover:shadow-md transition-all flex flex-col gap-1 group"
        >
          <div className="flex items-center justify-between text-text-muted">
            <span className="text-[11px] font-bold uppercase tracking-wider group-hover:text-[#FA3A08]">Wishlist Items</span>
            <Heart className="h-4 w-4 text-[#FA3A08]" />
          </div>
          <span className="text-2xl font-black text-[#0C1E38]">{wishlistCount}</span>
          <span className="text-[10px] font-semibold text-[#FA3A08] flex items-center gap-0.5">
            View Wishlist <ChevronRight className="h-3 w-3" />
          </span>
        </Link>

        <Link
          href="/cart"
          className="bg-white border border-border rounded-brand p-4 shadow-subtle hover:border-[#014A94] hover:shadow-md transition-all flex flex-col gap-1 group"
        >
          <div className="flex items-center justify-between text-text-muted">
            <span className="text-[11px] font-bold uppercase tracking-wider group-hover:text-[#014A94]">Cart Items</span>
            <ShoppingCart className="h-4 w-4 text-[#014A94]" />
          </div>
          <span className="text-2xl font-black text-[#0C1E38]">{itemCount}</span>
          <span className="text-[10px] font-semibold text-[#014A94] flex items-center gap-0.5">
            Go to Cart <ChevronRight className="h-3 w-3" />
          </span>
        </Link>

        <Link
          href="/account/addresses"
          className="bg-white border border-border rounded-brand p-4 shadow-subtle hover:border-purple-600 hover:shadow-md transition-all flex flex-col gap-1 group"
        >
          <div className="flex items-center justify-between text-text-muted">
            <span className="text-[11px] font-bold uppercase tracking-wider group-hover:text-purple-600">Saved Addresses</span>
            <MapPin className="h-4 w-4 text-purple-600" />
          </div>
          <span className="text-2xl font-black text-[#0C1E38]">{addresses.length}</span>
          <span className="text-[10px] font-semibold text-purple-600 flex items-center gap-0.5">
            Manage Addresses <ChevronRight className="h-3 w-3" />
          </span>
        </Link>
      </div>

      {/* 3. TWO COLUMN CONTENT AREA */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT MAIN COLUMN */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          {/* PROFILE OVERVIEW CARD & QUICK ACTIONS */}
          <div className="bg-white border border-border rounded-brand p-5 shadow-subtle flex flex-col gap-4">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <div className="flex items-center gap-2">
                <UserCheck className="h-4 w-4 text-[#014A94]" />
                <h3 className="font-bold text-[#0C1E38] text-sm">Account Overview</h3>
              </div>
              <Link href="/account/details">
                <Button variant="ghost" size="sm" className="text-xs">
                  Edit Profile
                </Button>
              </Link>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex flex-col gap-1">
                <span className="text-xs text-text-muted font-medium">Contact Details</span>
                <span className="text-sm font-bold text-[#0C1E38]">{fullName}</span>
                <span className="text-xs text-text-secondary">{user.email} • {user.phone}</span>
                {user.companyGst && (
                  <span className="text-[11px] text-slate-500 font-mono mt-0.5">GSTIN: {user.companyGst}</span>
                )}
              </div>

              {/* MEMBER PROGRESS TIER */}
              <div className="bg-[#FAFCFF] border border-border rounded-xl p-3 flex flex-col gap-1.5 sm:w-64">
                <div className="flex items-center justify-between text-[11px] font-bold">
                  <span className="text-[#0C1E38]">{user.memberTier}</span>
                  <span className="text-[#014A94]">{user.memberProgress}% to Gold</span>
                </div>
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: `${user.memberProgress}%` }} />
                </div>
                <span className="text-[10px] text-text-muted">Spent {formatPrice(user.totalSpent)} / ₹50,000 for Gold Tier</span>
              </div>
            </div>

            {/* QUICK ACTIONS BAR */}
            <div className="pt-3 border-t border-border flex flex-wrap gap-2">
              <Link href="/shop">
                <Button variant="secondary" size="sm" className="text-xs">
                  Shop Products
                </Button>
              </Link>
              <Link href="/account/wishlist">
                <Button variant="secondary" size="sm" className="text-xs">
                  View Wishlist ({wishlistCount})
                </Button>
              </Link>
              <Link href="/account/addresses">
                <Button variant="secondary" size="sm" className="text-xs">
                  Manage Addresses ({addresses.length})
                </Button>
              </Link>
              <Link href="/account/details">
                <Button variant="secondary" size="sm" className="text-xs">
                  Edit Profile
                </Button>
              </Link>
            </div>
          </div>

          {/* RECENT ORDERS TABLE / CARDS */}
          <div className="bg-white border border-border rounded-brand p-5 shadow-subtle flex flex-col gap-4">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <div className="flex items-center gap-2">
                <Package className="h-4 w-4 text-[#014A94]" />
                <h3 className="font-bold text-[#0C1E38] text-sm">Recent Orders</h3>
              </div>
              <Link href="/account/orders" className="text-xs font-bold text-[#014A94] hover:underline flex items-center gap-1">
                View All Orders <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {orders.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-center py-8 px-4 bg-[#FAFCFF] rounded-xl border border-dashed border-slate-200">
                <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mb-3">
                  <Package className="h-6 w-6" />
                </div>
                <h4 className="font-bold text-[#0C1E38] text-sm">No orders yet</h4>
                <p className="text-xs text-slate-500 max-w-sm mt-1 mb-4">
                  Your orders will appear here after you place your first hardware order.
                </p>
                <Link href="/shop">
                  <Button variant="primary" size="sm" rightIcon={<ArrowRight className="h-3.5 w-3.5" />}>
                    Start Shopping
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="border-b border-border text-text-muted uppercase tracking-wider bg-surface-bg">
                      <th className="p-2.5">Order ID</th>
                      <th className="p-2.5">Items</th>
                      <th className="p-2.5">Date</th>
                      <th className="p-2.5">Total</th>
                      <th className="p-2.5">Status</th>
                      <th className="p-2.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {orders.slice(0, 4).map((ord) => {
                      const itemsSummary = ord.items.map((i) => i.productName).join(', ');
                      return (
                        <tr key={ord.id} className="hover:bg-surface-secondary/50 transition-colors">
                          <td className="p-2.5 font-mono font-bold text-[#0C1E38]">{ord.orderNumber}</td>
                          <td className="p-2.5 text-text-secondary max-w-[160px] truncate" title={itemsSummary}>
                            {itemsSummary}
                          </td>
                          <td className="p-2.5 text-text-muted whitespace-nowrap">{formatDate(ord.createdAt)}</td>
                          <td className="p-2.5 font-bold text-[#0C1E38]">{formatPrice(ord.total)}</td>
                          <td className="p-2.5">
                            <Badge
                              variant={
                                ord.orderStatus === 'Delivered'
                                  ? 'success'
                                  : ord.orderStatus === 'Shipped'
                                  ? 'primary'
                                  : 'warning'
                              }
                            >
                              {ord.orderStatus}
                            </Badge>
                          </td>
                          <td className="p-2.5 text-right whitespace-nowrap">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                type="button"
                                onClick={() => handleReorder(ord.id)}
                                title="Reorder items"
                                className="p-1.5 text-slate-500 hover:text-[#014A94] hover:bg-blue-50 rounded transition-colors"
                              >
                                <RefreshCw className="h-3.5 w-3.5" />
                              </button>
                              <Link href={`/account/orders/${ord.id}`}>
                                <Button variant="ghost" size="sm" className="text-xs h-7 px-2">
                                  Details
                                </Button>
                              </Link>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT SIDEBAR COLUMN */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          {/* WISHLIST SUMMARY PREVIEW */}
          <div className="bg-white border border-border rounded-brand p-5 shadow-subtle flex flex-col gap-3">
            <div className="flex items-center justify-between pb-2 border-b border-border">
              <h3 className="font-bold text-[#0C1E38] text-sm flex items-center gap-1.5">
                <Heart className="h-4 w-4 text-[#FA3A08]" /> Wishlist ({wishlistCount})
              </h3>
              <Link href="/account/wishlist" className="text-xs font-bold text-[#014A94] hover:underline">
                View All
              </Link>
            </div>

            {wishlistProducts.length === 0 ? (
              <div className="flex flex-col items-center text-center py-5 px-3 bg-[#FAFCFF] rounded-lg border border-dashed border-slate-200">
                <p className="text-xs text-slate-500 mb-2">Your wishlist is empty.</p>
                <Link href="/shop">
                  <Button variant="secondary" size="sm" className="text-xs">
                    Explore Products
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-2.5">
                {wishlistProducts.map((prod) => (
                  <div key={prod.id} className="flex items-center gap-2.5 p-2 bg-surface-bg border border-border rounded-lg text-xs">
                    <div className="relative h-10 w-10 bg-white border border-border rounded flex-shrink-0 overflow-hidden">
                      <Image src={prod.images[0]} alt={prod.name} fill className="object-contain p-0.5" />
                    </div>
                    <div className="flex flex-col min-w-0 flex-1">
                      <span className="font-bold text-[#0C1E38] truncate">{prod.name}</span>
                      <span className="font-extrabold text-[#014A94]">{formatPrice(prod.salePrice ?? prod.price)}</span>
                    </div>
                    <Button
                      variant="accent"
                      size="sm"
                      className="h-7 text-[10px] px-2 flex-shrink-0"
                      onClick={() => {
                        addToCart(prod, 1);
                        toast.success('Added to cart!');
                      }}
                    >
                      + Cart
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* SAVED ADDRESSES MINI GRID */}
          <div className="bg-white border border-border rounded-brand p-5 shadow-subtle flex flex-col gap-3">
            <div className="flex items-center justify-between pb-2 border-b border-border">
              <h3 className="font-bold text-[#0C1E38] text-sm flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-purple-600" /> Saved Addresses ({addresses.length})
              </h3>
              <Link href="/account/addresses" className="text-xs font-bold text-[#014A94] hover:underline">
                Manage
              </Link>
            </div>

            {addresses.length === 0 ? (
              <div className="flex flex-col items-center text-center py-5 px-3 bg-[#FAFCFF] rounded-lg border border-dashed border-slate-200">
                <p className="text-xs text-slate-500 mb-2">No saved addresses.</p>
                <Link href="/account/addresses">
                  <Button variant="secondary" size="sm" className="text-xs" leftIcon={<Plus className="h-3.5 w-3.5" />}>
                    Add Address
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-2.5">
                {addresses.slice(0, 2).map((addr) => (
                  <div key={addr.id} className="p-3 bg-surface-bg border border-border rounded-lg text-xs flex flex-col gap-1">
                    <div className="flex items-center justify-between font-bold text-[#0C1E38]">
                      <span>{addr.fullName}</span>
                      {addr.isDefault && (
                        <span className="text-[10px] bg-blue-100 text-[#014A94] px-1.5 py-0.2 rounded font-extrabold">Default</span>
                      )}
                    </div>
                    <p className="text-text-muted leading-tight text-[11px] line-clamp-2">
                      {addr.street}, {addr.city}, {addr.state} - {addr.postalCode}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* RECENTLY VIEWED PRODUCTS */}
          <div className="bg-white border border-border rounded-brand p-5 shadow-subtle flex flex-col gap-3">
            <div className="flex items-center justify-between pb-2 border-b border-border">
              <h3 className="font-bold text-[#0C1E38] text-sm flex items-center gap-1.5">
                <ShoppingCart className="h-4 w-4 text-[#014A94]" /> Recently Viewed
              </h3>
              <Link href="/account/recently-viewed" className="text-xs font-bold text-[#014A94] hover:underline">
                View All
              </Link>
            </div>

            {recentlyViewed.length === 0 ? (
              <div className="flex flex-col items-center text-center py-5 px-3 bg-[#FAFCFF] rounded-lg border border-dashed border-slate-200">
                <p className="text-xs text-slate-500 mb-2">No recently viewed products.</p>
                <Link href="/shop">
                  <Button variant="secondary" size="sm" className="text-xs">
                    Explore Shop
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-2.5">
                {recentlyViewed.slice(0, 3).map((prod) => (
                  <div key={prod.id} className="flex items-center gap-2.5 p-2 bg-surface-bg border border-border rounded-lg text-xs">
                    <div className="relative h-10 w-10 bg-white border border-border rounded flex-shrink-0 overflow-hidden">
                      <Image src={prod.images[0]} alt={prod.name} fill className="object-contain p-0.5" />
                    </div>
                    <div className="flex flex-col min-w-0 flex-1">
                      <span className="font-bold text-[#0C1E38] truncate">{prod.name}</span>
                      <span className="font-extrabold text-[#014A94]">{formatPrice(prod.salePrice ?? prod.price)}</span>
                    </div>
                    <Button
                      variant="accent"
                      size="sm"
                      className="h-7 text-[10px] px-2 flex-shrink-0"
                      onClick={() => {
                        addToCart(prod, 1);
                        toast.success('Added to cart!');
                      }}
                    >
                      + Cart
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* SPECIAL OFFERS PROMO CARD */}
          <div className="bg-amber-50 border border-amber-200 rounded-brand p-4 flex flex-col gap-2">
            <div className="flex items-center gap-1.5 text-amber-900 font-bold text-xs">
              <Tag className="h-4 w-4 text-[#FA3A08]" /> Contractor Coupon Code
            </div>
            <p className="text-xs text-amber-900 leading-snug">
              Get <strong>15% OFF</strong> on hardware &amp; bulk supplies using code:
            </p>
            <div className="flex items-center justify-between p-2 bg-white border border-amber-300 rounded-lg mt-0.5">
              <span className="font-mono font-bold text-[#0C1E38] text-xs">AKVIP15</span>
              <button
                type="button"
                onClick={handleCopyCode}
                className="text-xs font-bold text-[#FA3A08] hover:underline flex items-center gap-1"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? 'Copied!' : 'Copy Code'}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
