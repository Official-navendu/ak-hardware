'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  Layers,
  Warehouse,
  ShoppingCart,
  Users,
  FileText,
  Image as MediaIcon,
  Tag,
  Star,
  Mail,
  Settings,
  ExternalLink,
  LogOut,
  User,
} from 'lucide-react';
import { useAdminContext } from '@/lib/context/admin-context';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: string | number;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

export function AdminSidebar() {
  const pathname = usePathname();
  const { products, orders, blogPosts, reviews } = useAdminContext();

  const lowStockCount = products.filter((p) => p.stock <= (p.lowStockThreshold || 5)).length;

  const navGroups: NavGroup[] = [
    {
      title: 'OVERVIEW',
      items: [
        { label: 'Dashboard', href: '/ashish', icon: <LayoutDashboard className="h-[17px] w-[17px]" /> },
      ],
    },
    {
      title: 'CATALOG',
      items: [
        { label: 'Products', href: '/ashish/products', icon: <Package className="h-[17px] w-[17px]" />, badge: products.length },
        { label: 'Categories', href: '/ashish/categories', icon: <Layers className="h-[17px] w-[17px]" /> },
        { label: 'Inventory', href: '/ashish/inventory', icon: <Warehouse className="h-[17px] w-[17px]" />, badge: lowStockCount > 0 ? `${lowStockCount} Low` : undefined },
      ],
    },
    {
      title: 'SALES',
      items: [
        { label: 'Orders', href: '/ashish/orders', icon: <ShoppingCart className="h-[17px] w-[17px]" />, badge: orders.length },
        { label: 'Customers', href: '/ashish/customers', icon: <Users className="h-[17px] w-[17px]" /> },
      ],
    },
    {
      title: 'CONTENT',
      items: [
        { label: 'Blog', href: '/ashish/blog', icon: <FileText className="h-[17px] w-[17px]" />, badge: blogPosts.length },
        { label: 'Media', href: '/ashish/media', icon: <MediaIcon className="h-[17px] w-[17px]" /> },
      ],
    },
    {
      title: 'MARKETING',
      items: [
        { label: 'Coupons', href: '/ashish/coupons', icon: <Tag className="h-[17px] w-[17px]" /> },
        { label: 'Reviews', href: '/ashish/reviews', icon: <Star className="h-[17px] w-[17px]" />, badge: reviews.length },
        { label: 'Newsletter', href: '/ashish/newsletter', icon: <Mail className="h-[17px] w-[17px]" /> },
      ],
    },
    {
      title: 'SYSTEM',
      items: [
        { label: 'Settings', href: '/ashish/settings', icon: <Settings className="h-[17px] w-[17px]" /> },
      ],
    },
  ];

  return (
    <aside className="w-[248px] bg-[#012157] text-white flex flex-col h-screen fixed top-0 left-0 flex-shrink-0 z-30 select-none border-r border-white/10">
      {/* BRAND / LOGO HEADER - WHITE BOX (72px HEIGHT, NO OPS BADGE, SIGNIFICANTLY LARGER LOGO) */}
      <div className="h-[72px] px-4 bg-white border-b border-[#E5E7EB] flex items-center justify-center flex-shrink-0">
        <Link href="/ashish" className="flex items-center justify-center w-full">
          <div className="relative h-[54px] w-[155px]">
            <Image
              src="/assets/brand/ak-hardware-logo.png"
              alt="AK Hardware"
              fill
              className="object-contain"
              priority
            />
          </div>
        </Link>
      </div>

      {/* NAVIGATION STATIC FIT AREA - NO SCROLLBAR, COMPACT SPACING */}
      <nav className="flex-1 px-3 py-2.5 space-y-2 overflow-hidden">
        {navGroups.map((group, gIdx) => (
          <div key={gIdx} className="space-y-0.5">
            <div className="px-2.5 text-[10px] font-bold text-slate-400/80 tracking-wider uppercase mb-0.5">
              {group.title}
            </div>
            {group.items.map((item) => {
              const isActive =
                item.href === '/ashish'
                  ? pathname === '/ashish'
                  : pathname === item.href || pathname.startsWith(`${item.href}/`);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative flex items-center justify-between px-2.5 h-[38px] rounded-[6px] text-[13px] font-medium transition-colors ${
                    isActive
                      ? 'bg-white/[0.08] text-white font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  {/* LEFT ORANGE INDICATOR FOR ACTIVE STATE */}
                  {isActive && (
                    <span className="absolute left-0 top-[10px] h-[18px] w-[3px] bg-[#FA3A08] rounded-r" />
                  )}

                  <div className="flex items-center gap-2.5 min-w-0 pl-1">
                    <span className={isActive ? 'text-white' : 'text-slate-400'}>
                      {item.icon}
                    </span>
                    <span className="truncate">{item.label}</span>
                  </div>

                  {item.badge !== undefined && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 font-mono font-bold rounded flex-shrink-0 ${
                        typeof item.badge === 'string' && item.badge.includes('Low')
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-white/10 text-slate-300'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* SIDEBAR FOOTER ACTIONS - FIXED BOTTOM ANCHORED AREA */}
      <div className="p-3 border-t border-white/10 flex flex-col gap-1.5 text-xs flex-shrink-0">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-2.5 h-8 text-slate-300 hover:text-white hover:bg-white/[0.04] rounded-[6px] font-medium transition-colors"
        >
          <div className="flex items-center gap-2">
            <ExternalLink className="h-3.5 w-3.5 text-amber-400" />
            <span className="text-[12px]">View Storefront</span>
          </div>
          <span className="text-[10px] font-mono text-slate-400">↗</span>
        </Link>

        <div className="flex items-center justify-between px-2.5 h-9 text-slate-300">
          <div className="flex items-center gap-2 min-w-0">
            <div className="h-7 w-7 rounded-full bg-blue-brand text-white font-bold text-[11px] flex items-center justify-center flex-shrink-0">
              AK
            </div>
            <div className="flex flex-col min-w-0 text-left">
              <span className="text-xs font-bold text-white truncate">Ashish Kumar</span>
              <span className="text-[11px] text-slate-400 truncate">Super Admin</span>
            </div>
          </div>

          <Link
            href="/ashish/login"
            className="p-1 text-slate-400 hover:text-red-400 rounded hover:bg-white/10 transition-colors"
            title="Logout Admin"
          >
            <LogOut className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </aside>
  );
}
