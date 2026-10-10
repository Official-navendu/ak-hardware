import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/ui/Container';
import { AccountSidebar } from '@/components/account/AccountSidebar';

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-surface-bg">
      <Header />
      <main className="flex-1 py-6 sm:py-8">
        <Container className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
          <div className="lg:col-span-3">
            <AccountSidebar />
          </div>
          <div className="lg:col-span-9">{children}</div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
