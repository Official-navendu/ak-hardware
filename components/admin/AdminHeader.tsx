'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Search,
  ExternalLink,
  Bell,
  ChevronRight,
  Package,
  ShoppingCart,
  Users,
  FileText,
  X,
  AlertTriangle,
  LogOut,
  User,
} from 'lucide-react';
import { useAdminContext } from '@/lib/context/admin-context';

export function AdminHeader() {
  const pathname = usePathname();
  const {
    products,
    orders,
    customers,
    blogPosts,
    notifications,
    unreadNotificationCount,
    markNotificationRead,
    markAllNotificationsRead,
  } = useAdminContext();

  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Handle outside click & ⌘ K / Escape keyboard shortcuts
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setShowDropdown(false);
        setShowNotifications(false);
        setShowProfileMenu(false);
      }
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        const searchInput = searchRef.current?.querySelector('input');
        if (searchInput) {
          searchInput.focus();
          setShowDropdown(true);
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Compute breadcrumbs from pathname
  const getBreadcrumbs = () => {
    const parts = pathname.split('/').filter(Boolean);
    if (parts.length <= 1) {
      return [{ label: 'Dashboard', href: '/ashish', isLast: true }];
    }

    const items = [{ label: 'Dashboard', href: '/ashish', isLast: false }];
    let currentPath = '/ashish';

    for (let i = 1; i < parts.length; i++) {
      const part = parts[i];
      currentPath += `/${part}`;
      const capitalized = part.charAt(0).toUpperCase() + part.slice(1);
      const isLast = i === parts.length - 1;
      items.push({
        label: part === 'new' ? 'Create' : capitalized,
        href: currentPath,
        isLast,
      });
    }
    return items;
  };

  const breadcrumbs = getBreadcrumbs();

  const matchingProducts = searchQuery.trim()
    ? products
        .filter(
          (p) =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.sku.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, 3)
    : [];

  const matchingOrders = searchQuery.trim()
    ? orders
        .filter(
          (o) =>
            o.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
            o.customerName.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, 3)
    : [];

  const matchingCustomers = searchQuery.trim()
    ? customers
        .filter(
          (c) =>
            c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.email.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, 3)
    : [];

  const matchingBlogs = searchQuery.trim()
    ? blogPosts
        .filter((b) => b.title.toLowerCase().includes(searchQuery.toLowerCase()))
        .slice(0, 3)
    : [];

  const hasResults =
    matchingProducts.length > 0 ||
    matchingOrders.length > 0 ||
    matchingCustomers.length > 0 ||
    matchingBlogs.length > 0;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'ORDER_RECEIVED':
        return <ShoppingCart className="h-4 w-4 text-blue-brand flex-shrink-0" />;
      case 'PRODUCT_OUT_OF_STOCK':
        return <AlertTriangle className="h-4 w-4 text-red-600 flex-shrink-0" />;
      case 'PRODUCT_LOW_STOCK':
        return <AlertTriangle className="h-4 w-4 text-amber-600 flex-shrink-0" />;
      case 'NEW_REVIEW':
        return <FileText className="h-4 w-4 text-emerald-600 flex-shrink-0" />;
      default:
        return <Package className="h-4 w-4 text-blue-brand flex-shrink-0" />;
    }
  };

  return (
    <header className="h-[64px] bg-white border-b border-[#E5E7EB] px-6 flex items-center justify-between sticky top-0 z-20 shadow-[0_1px_2px_rgba(15,23,42,0.02)]">
      {/* BREADCRUMB NAVIGATION */}
      <nav className="flex items-center gap-1.5 text-xs text-text-muted font-medium">
        {breadcrumbs.map((crumb, idx) => (
          <React.Fragment key={idx}>
            {idx > 0 && <ChevronRight className="h-3.5 w-3.5 text-slate-400 flex-shrink-0" />}
            {!crumb.isLast ? (
              <Link href={crumb.href} className="hover:text-navy-900 transition-colors">
                {crumb.label}
              </Link>
            ) : (
              <span className="font-semibold text-navy-900">{crumb.label}</span>
            )}
          </React.Fragment>
        ))}
      </nav>

      {/* CENTER GLOBAL SEARCH (360px DESKTOP) */}
      <div ref={searchRef} className="relative w-72 md:w-[360px] hidden sm:block">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400 pointer-events-none" />
        <input
          type="text"
          placeholder="Search products, orders, customers..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setShowDropdown(true);
          }}
          onFocus={() => setShowDropdown(true)}
          className="w-full h-9 pl-9 pr-16 bg-surface-bg border border-border rounded-[8px] text-xs text-navy-900 placeholder:text-text-muted focus:outline-none focus:border-blue-brand focus:ring-2 focus:ring-blue-brand/10 transition-all"
        />
        {searchQuery ? (
          <button
            onClick={() => {
              setSearchQuery('');
              setShowDropdown(false);
            }}
            className="absolute right-3 top-2.5 text-text-muted hover:text-navy-900"
          >
            <X className="h-4 w-4" />
          </button>
        ) : (
          <kbd className="absolute right-2.5 top-2 px-1.5 py-0.5 text-[10px] font-mono font-bold bg-white border border-border rounded text-text-muted shadow-xs pointer-events-none">
            ⌘ K
          </kbd>
        )}

        {/* SEARCH RESULTS DROPDOWN */}
        {showDropdown && searchQuery.trim().length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-[#E5E7EB] rounded-[8px] shadow-[0_4px_16px_rgba(15,23,42,0.1)] max-h-96 overflow-y-auto z-50 divide-y divide-border">
            {!hasResults && (
              <div className="p-4 text-xs text-center text-text-muted">
                No matching results found for &quot;{searchQuery}&quot;
              </div>
            )}

            {matchingProducts.length > 0 && (
              <div className="p-2">
                <div className="px-2 py-1 text-[10px] font-bold text-text-muted uppercase tracking-wider flex items-center gap-1">
                  <Package className="h-3 w-3" /> Products
                </div>
                {matchingProducts.map((p) => (
                  <Link
                    key={p.id}
                    href={`/ashish/products/${p.id}`}
                    onClick={() => setShowDropdown(false)}
                    className="flex items-center justify-between px-2.5 py-1.5 hover:bg-slate-50 rounded text-xs transition-colors"
                  >
                    <span className="font-semibold text-navy-900 truncate">{p.name}</span>
                    <span className="font-mono text-[10px] text-text-muted">{p.sku}</span>
                  </Link>
                ))}
              </div>
            )}

            {matchingOrders.length > 0 && (
              <div className="p-2">
                <div className="px-2 py-1 text-[10px] font-bold text-text-muted uppercase tracking-wider flex items-center gap-1">
                  <ShoppingCart className="h-3 w-3" /> Orders
                </div>
                {matchingOrders.map((o) => (
                  <Link
                    key={o.id}
                    href={`/ashish/orders/${o.id}`}
                    onClick={() => setShowDropdown(false)}
                    className="flex items-center justify-between px-2.5 py-1.5 hover:bg-slate-50 rounded text-xs transition-colors"
                  >
                    <span className="font-bold font-mono text-navy-900">{o.orderNumber}</span>
                    <span className="text-[11px] text-text-secondary">{o.customerName}</span>
                  </Link>
                ))}
              </div>
            )}

            {matchingCustomers.length > 0 && (
              <div className="p-2">
                <div className="px-2 py-1 text-[10px] font-bold text-text-muted uppercase tracking-wider flex items-center gap-1">
                  <Users className="h-3 w-3" /> Customers
                </div>
                {matchingCustomers.map((c) => (
                  <Link
                    key={c.id}
                    href="/ashish/customers"
                    onClick={() => setShowDropdown(false)}
                    className="flex items-center justify-between px-2.5 py-1.5 hover:bg-slate-50 rounded text-xs transition-colors"
                  >
                    <span className="font-semibold text-navy-900">{c.name}</span>
                    <span className="text-[10px] text-text-muted">{c.email}</span>
                  </Link>
                ))}
              </div>
            )}

            {matchingBlogs.length > 0 && (
              <div className="p-2">
                <div className="px-2 py-1 text-[10px] font-bold text-text-muted uppercase tracking-wider flex items-center gap-1">
                  <FileText className="h-3 w-3" /> Blog Articles
                </div>
                {matchingBlogs.map((b) => (
                  <Link
                    key={b.id}
                    href={`/ashish/blog/${b.id}`}
                    onClick={() => setShowDropdown(false)}
                    className="flex items-center justify-between px-2.5 py-1.5 hover:bg-slate-50 rounded text-xs transition-colors"
                  >
                    <span className="font-semibold text-navy-900 truncate">{b.title}</span>
                    <span className="text-[10px] text-blue-brand font-medium">{b.category}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* RIGHT UTILITY ACTIONS */}
      <div className="flex items-center gap-3">
        <Link
          href="/"
          target="_blank"
          className="hidden md:inline-flex items-center gap-1.5 px-3 h-8 bg-surface-bg border border-border rounded-[6px] text-xs font-semibold text-navy-900 hover:bg-slate-100 transition-colors"
        >
          <ExternalLink className="h-3.5 w-3.5 text-blue-brand" />
          <span>View Store</span>
        </Link>

        {/* NOTIFICATION BELL & POP OVER DROPDOWN */}
        <div ref={notifRef} className="relative">
          <button
            type="button"
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 text-text-muted hover:text-navy-900 rounded-[6px] hover:bg-slate-100 transition-colors relative"
            title="Notifications"
          >
            <Bell className="h-4 w-4" />
            {unreadNotificationCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 h-4 w-4 bg-[#FA3A08] text-white text-[9px] font-bold rounded-full flex items-center justify-center border border-white">
                {unreadNotificationCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-full mt-2 w-96 bg-white border border-[#E5E7EB] rounded-[12px] shadow-[0_8px_30px_rgba(15,23,42,0.12)] p-0 z-50 flex flex-col overflow-hidden max-h-[480px]">
              {/* NOTIFICATION HEADER */}
              <div className="px-4 py-3 border-b border-[#E5E7EB] flex items-center justify-between bg-surface-bg">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-navy-900 text-xs">Notifications</span>
                  {unreadNotificationCount > 0 && (
                    <span className="text-[10px] font-bold font-mono text-[#FA3A08] bg-[#FA3A08]/10 px-2 py-0.5 rounded-full border border-[#FA3A08]/20">
                      {unreadNotificationCount} unread
                    </span>
                  )}
                </div>
                {unreadNotificationCount > 0 && (
                  <button
                    type="button"
                    onClick={markAllNotificationsRead}
                    className="text-[11px] font-semibold text-blue-brand hover:underline"
                  >
                    Mark all as read
                  </button>
                )}
              </div>

              {/* NOTIFICATION LIST */}
              <div className="flex-1 overflow-y-auto divide-y divide-border">
                {notifications.length === 0 ? (
                  <div className="p-8 text-center flex flex-col items-center justify-center gap-1 text-xs text-text-muted">
                    <span className="font-semibold text-navy-900">You&apos;re all caught up</span>
                    <span>No new notifications.</span>
                  </div>
                ) : (
                  notifications.map((notif) => (
                    <Link
                      key={notif.id}
                      href={notif.link}
                      onClick={() => {
                        markNotificationRead(notif.id);
                        setShowNotifications(false);
                      }}
                      className={`p-3 text-xs flex items-start gap-3 transition-colors hover:bg-slate-50 ${
                        !notif.read ? 'bg-blue-50/40' : 'bg-white'
                      }`}
                    >
                      <div className="p-2 bg-surface-bg border border-border rounded-[6px] mt-0.5">
                        {getNotificationIcon(notif.type)}
                      </div>
                      <div className="flex flex-col min-w-0 flex-1 gap-0.5">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-bold text-navy-900 truncate">{notif.title}</span>
                          <span className="text-[10px] text-text-muted font-mono flex-shrink-0">{notif.time}</span>
                        </div>
                        <p className="text-[11px] text-text-muted leading-relaxed line-clamp-2">
                          {notif.description}
                        </p>
                      </div>
                      {!notif.read && (
                        <span className="h-2 w-2 rounded-full bg-[#FA3A08] flex-shrink-0 mt-1.5" />
                      )}
                    </Link>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* ADMIN PROFILE AVATAR DROPDOWN */}
        <div ref={profileRef} className="relative pl-2 border-l border-border">
          <button
            type="button"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2 focus:outline-none"
          >
            <div className="h-8 w-8 rounded-full bg-navy-900 text-white font-bold text-xs flex items-center justify-center border border-navy-800 shadow-xs">
              AK
            </div>
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 top-full mt-2 w-52 bg-white border border-[#E5E7EB] rounded-[10px] shadow-[0_4px_20px_rgba(15,23,42,0.12)] py-1.5 z-50 text-xs">
              <div className="px-3.5 py-2.5 border-b border-border flex flex-col">
                <span className="font-bold text-navy-900">Ashish Kumar</span>
                <span className="text-[10px] text-text-muted font-mono">admin@akhardware.com</span>
                <span className="text-[10px] font-bold text-blue-brand bg-blue-50 px-1.5 py-0.5 rounded w-fit mt-1">
                  Super Admin
                </span>
              </div>
              <Link
                href="/ashish/settings"
                onClick={() => setShowProfileMenu(false)}
                className="px-3.5 py-2 text-text-secondary hover:text-navy-900 hover:bg-slate-50 flex items-center gap-2 font-medium"
              >
                <User className="h-3.5 w-3.5" />
                <span>Admin Profile</span>
              </Link>
              <Link
                href="/"
                target="_blank"
                onClick={() => setShowProfileMenu(false)}
                className="px-3.5 py-2 text-text-secondary hover:text-navy-900 hover:bg-slate-50 flex items-center gap-2 font-medium"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                <span>View Store</span>
              </Link>
              <div className="my-1 border-t border-border" />
              <Link
                href="/ashish/login"
                onClick={() => setShowProfileMenu(false)}
                className="px-3.5 py-2 text-red-700 hover:bg-red-50 flex items-center gap-2 font-medium"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span>Logout</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
