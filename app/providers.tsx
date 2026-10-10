'use client';

import React from 'react';
import { CartProvider } from '@/lib/context/cart-context';
import { WishlistProvider } from '@/lib/context/wishlist-context';
import { ToastProvider } from '@/lib/context/toast-context';
import { UserProvider } from '@/lib/context/user-context';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <UserProvider>
        <CartProvider>
          <WishlistProvider>{children}</WishlistProvider>
        </CartProvider>
      </UserProvider>
    </ToastProvider>
  );
}
