'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, ProductVariant } from '@/types/product';
import { CartItem } from '@/types/cart';
import { STORE_CONFIG } from '@/lib/config';

interface CouponState {
  code: string;
  discountPercent: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number, variant?: ProductVariant) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  subtotal: number;
  discount: number;
  shipping: number;
  estimatedTax: number;
  grandTotal: number;
  itemCount: number;
  appliedCoupon: CouponState | null;
  drawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'ak_hardware_cart_v1';
const COUPON_STORAGE_KEY = 'ak_hardware_coupon_v1';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [appliedCoupon, setAppliedCoupon] = useState<CouponState | null>(null);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load cart from localStorage
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(LOCAL_STORAGE_KEY);
      const savedCoupon = localStorage.getItem(COUPON_STORAGE_KEY);
      if (savedCart) setItems(JSON.parse(savedCart));
      if (savedCoupon) setAppliedCoupon(JSON.parse(savedCoupon));
    } catch (e) {
      console.error('Failed to load cart from localStorage', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
      if (appliedCoupon) {
        localStorage.setItem(COUPON_STORAGE_KEY, JSON.stringify(appliedCoupon));
      } else {
        localStorage.removeItem(COUPON_STORAGE_KEY);
      }
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [items, appliedCoupon, isLoaded]);

  const addToCart = (product: Product, quantity: number = 1, variant?: ProductVariant) => {
    setItems((prevItems) => {
      const activeVariant = variant || (product.variants && product.variants.length > 0 ? product.variants[0] : undefined);
      const cartItemId = activeVariant ? `cart-${product.id}-${activeVariant.id}` : `cart-${product.id}`;

      const existing = prevItems.find((i) => i.id === cartItemId);
      if (existing) {
        return prevItems.map((i) =>
          i.id === cartItemId
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }
      return [
        ...prevItems,
        {
          id: cartItemId,
          product,
          quantity,
          selectedVariant: activeVariant,
        },
      ];
    });
    setDrawerOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setItems((prevItems) => prevItems.filter((i) => i.id !== cartItemId && i.product.id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setItems((prevItems) =>
      prevItems.map((i) => (i.id === cartItemId || i.product.id === cartItemId ? { ...i, quantity } : i))
    );
  };

  const clearCart = () => {
    setItems([]);
    setAppliedCoupon(null);
  };

  const applyCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'AK10' || cleanCode === 'BUILD10') {
      const coupon = { code: cleanCode, discountPercent: 10 };
      setAppliedCoupon(coupon);
      return { success: true, message: '10% promotional coupon applied!' };
    }
    if (cleanCode === 'AKPRO' || cleanCode === 'TRADE15') {
      const coupon = { code: cleanCode, discountPercent: 15 };
      setAppliedCoupon(coupon);
      return { success: true, message: '15% contractor discount applied!' };
    }
    return { success: false, message: 'Invalid coupon code. Try AK10 or TRADE15' };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  const subtotal = items.reduce((sum, item) => {
    const price = item.selectedVariant
      ? (item.selectedVariant.salePrice ?? item.selectedVariant.price)
      : (item.product.salePrice ?? item.product.price);
    return sum + price * item.quantity;
  }, 0);

  const discount = appliedCoupon
    ? Math.round((subtotal * appliedCoupon.discountPercent) / 100)
    : 0;

  const afterDiscount = Math.max(0, subtotal - discount);

  const shipping =
    subtotal === 0
      ? 0
      : afterDiscount >= STORE_CONFIG.freeShippingThreshold
      ? 0
      : STORE_CONFIG.defaultShippingCharge;

  const estimatedTax = Math.round(afterDiscount * STORE_CONFIG.estimatedTaxRate);

  const grandTotal = afterDiscount + shipping + estimatedTax;

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        applyCoupon,
        removeCoupon,
        subtotal,
        discount,
        shipping,
        estimatedTax,
        grandTotal,
        itemCount,
        appliedCoupon,
        drawerOpen,
        setDrawerOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
