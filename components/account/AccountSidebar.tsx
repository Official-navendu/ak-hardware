'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  Heart,
  MapPin,
  ShieldCheck,
  ShoppingCart,
  Clock,
  LogOut,
  ChevronRight,
  Menu,
  X,
  Truck,
} from 'lucide-react';
import { useUser } from '@/lib/context/user-context';
import { useWishlist } from '@/lib/context/wishlist-context';
import { useCart } from '@/lib/context/cart-context';
import { useToast } from '@/lib/context/toast-context';
import { ConfirmationModal } from '@/components/ui/ConfirmationModal';

interface SidebarItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: number;
}

export function AccountSidebar() {
  const pathname = usePathname();
  const { user, orders, addresses, recentlyViewed, logout } = useUser();
  const { wishlistCount } = useWishlist();
  const { itemCount } = useCart();
  const toast = useToast();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  const initials = `${user.firstName?.[0] || 'A'}${user.lastName?.[0] || 'K'}`;
  const fullName = `${user.firstName} ${user.lastName}`.trim();

  const links: SidebarItem[] = [
    { label: 'Overview', href: '/account', icon: <LayoutDashboard className="h-4 w-4" /> },
    { label: 'My Orders', href: '/account/orders', icon: <Package className="h-4 w-4" />, badge: orders.length },
    { label: 'Wishlist', href: '/account/wishlist', icon: <Heart className="h-4 w-4" />, badge: wishlistCount },
    { label: 'Addresses', href: '/account/addresses', icon: <MapPin className="h-4 w-4" />, badge: addresses.length },
    { label: 'Account Details', href: '/account/details', icon: <ShieldCheck className="h-4 w-4" /> },
    { label: 'Cart', href: '/cart', icon: <ShoppingCart className="h-4 w-4" />, badge: itemCount },
    { label: 'Recently Viewed', href: '/account/recently-viewed', icon: <Clock className="h-4 w-4" />, badge: recentlyViewed.length },
  ];

  const handleLogoutConfirm = () => {
    toast.success('Signed out successfully');
    logout();
  };

  return (
    <>
      {/* MOBILE COMPACT NAVIGATION HEADER & HORIZONTAL STRIP (VISIBLE BELOW LG) */}
      <div className="lg:hidden flex flex-col gap-3 bg-white border border-border rounded-brand p-3.5 shadow-subtle mb-4">
        {/* MOBILE USER SUMMARY HEADER */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-full bg-[#012157] text-white font-black text-xs flex items-center justify-center flex-shrink-0">
              {initials}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-extrabold text-[#0C1E38] text-xs truncate">{fullName}</span>
              <span className="text-[10px] text-text-muted truncate">{user.email}</span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-surface-bg border border-border text-navy-900 flex items-center gap-1.5 text-xs font-bold"
            aria-label="Toggle Account Menu"
          >
            {mobileMenuOpen ? <X className="h-4 w-4 text-red-600" /> : <Menu className="h-4 w-4 text-blue-brand" />}
            <span>Menu</span>
          </button>
        </div>

        {/* MOBILE HORIZONTAL PILL NAV STRIP */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1">
          {links.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/account' && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold whitespace-nowrap min-h-[38px] transition-colors ${
                  isActive
                    ? 'bg-[#012157] text-white'
                    : 'bg-surface-bg text-text-secondary border border-border hover:bg-slate-100'
                }`}
              >
                <span>{link.icon}</span>
                <span>{link.label}</span>
                {link.badge !== undefined && link.badge > 0 && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                      isActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* EXPANDABLE MOBILE MENU ACCORDION FOR FULL LINKS & LOGOUT */}
        {mobileMenuOpen && (
          <div className="pt-3 border-t border-border flex flex-col gap-1 animate-in fade-in duration-150">
            {links.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/account' && pathname.startsWith(link.href));
              return (
                <Link
                  key={`mobile-dropdown-${link.href}`}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold min-h-[40px] transition-colors ${
                    isActive ? 'bg-[#E8F1FD] text-[#012157] font-extrabold' : 'text-text-secondary hover:bg-surface-secondary'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={isActive ? 'text-[#014A94]' : 'text-slate-400'}>{link.icon}</span>
                    <span>{link.label}</span>
                  </div>
                  {link.badge !== undefined && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-slate-100 text-slate-600">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                setLogoutModalOpen(true);
              }}
              className="flex items-center gap-2.5 px-3 py-2.5 text-xs font-bold text-red-600 hover:bg-red-50 rounded-lg transition-colors mt-1 text-left min-h-[40px]"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>

      {/* DESKTOP SIDEBAR CONTAINER (VISIBLE LG AND UP) */}
      <div className="hidden lg:flex flex-col gap-6">
        <div className="bg-white border border-border rounded-brand p-4 shadow-subtle flex flex-col gap-4">
          {/* USER PROFILE CARD */}
          <div className="pb-3 border-b border-border flex items-center gap-3">
            <div className="h-11 w-11 rounded-full bg-[#012157] text-white font-extrabold text-sm flex items-center justify-center flex-shrink-0 shadow-2xs">
              {initials}
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-[#0C1E38] text-sm truncate">{fullName}</span>
                <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded">
                  {user.memberTier}
                </span>
              </div>
              <span className="text-[11px] text-text-muted truncate">{user.email}</span>
            </div>
          </div>

          {/* DESKTOP NAVIGATION LINKS */}
          <nav className="flex flex-col gap-1">
            {links.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/account' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-[#E8F1FD] text-[#012157] font-extrabold shadow-2xs'
                      : 'text-text-secondary hover:text-[#0C1E38] hover:bg-surface-secondary'
                  }`}
                >
                  {/* ACTIVE ORANGE ACCENT INDICATOR BAR */}
                  {isActive && (
                    <span className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-[#FA3A08] rounded-r" />
                  )}

                  <div className="flex items-center gap-2.5">
                    <span className={isActive ? 'text-[#014A94]' : 'text-slate-400'}>{link.icon}</span>
                    <span>{link.label}</span>
                  </div>

                  {link.badge !== undefined && (
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-md font-bold transition-colors ${
                        isActive ? 'bg-[#014A94] text-white' : 'bg-surface-secondary text-text-muted'
                      }`}
                    >
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}

            <button
              type="button"
              onClick={() => setLogoutModalOpen(true)}
              className="flex items-center gap-2.5 px-3 py-2.5 text-xs font-bold text-red-600 hover:bg-red-50 rounded-lg transition-colors mt-2 text-left"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </nav>
        </div>

        {/* SIDEBAR PROMO CARD */}
        <div className="bg-gradient-to-br from-[#012157] to-[#014A94] text-white rounded-brand p-4 shadow-subtle flex flex-col gap-2">
          <div className="flex items-center gap-2 text-amber-400">
            <Truck className="h-4 w-4" />
            <span className="text-xs font-bold uppercase tracking-wider">Site Delivery Service</span>
          </div>
          <p className="text-xs text-slate-200 leading-snug">
            Free Express Shipping on hardware &amp; construction supplies above ₹2,499.
          </p>
          <Link href="/shop" className="text-[11px] font-bold text-amber-400 hover:underline flex items-center gap-1 mt-1">
            Browse Hardware Shop <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      {/* LOGOUT CONFIRMATION MODAL */}
      <ConfirmationModal
        isOpen={logoutModalOpen}
        onClose={() => setLogoutModalOpen(false)}
        onConfirm={handleLogoutConfirm}
        title="Sign Out of AK Hardware?"
        description="Are you sure you want to sign out of your customer account? Your cart items will remain saved."
        confirmText="Sign Out"
        cancelText="Cancel"
        isDanger={true}
      />
    </>
  );
}
