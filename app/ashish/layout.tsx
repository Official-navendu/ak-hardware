'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { AdminProvider } from '@/lib/context/admin-context';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/ashish/login';

  return (
    <AdminProvider>
      <head>
        <meta name="robots" content="noindex, nofollow" />
      </head>
      {isLoginPage ? (
        <main className="min-h-screen bg-surface-bg">{children}</main>
      ) : (
        <div className="min-h-screen flex bg-surface-secondary font-sans">
          <AdminSidebar />
          <div className="flex-1 flex flex-col min-w-0 pl-[248px]">
            <AdminHeader />
            <main className="flex-1 p-6 sm:p-8">{children}</main>
          </div>
        </div>
      )}
    </AdminProvider>
  );
}
