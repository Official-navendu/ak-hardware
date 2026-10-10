'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Product } from '@/types/product';
import { MOCK_PRODUCTS } from '@/lib/data/mock-products';
import { MOCK_ORDERS } from '@/lib/data/mock-orders';
import { Order } from '@/types/order';

export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  companyGst?: string;
  role: string;
  memberTier: string;
  memberProgress: number;
  totalSpent: number;
}

export interface SavedAddress {
  id: string;
  fullName: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  isDefault: boolean;
}

interface UserContextType {
  user: UserProfile;
  addresses: SavedAddress[];
  recentlyViewed: Product[];
  orders: Order[];
  isLoggedIn: boolean;
  updateProfile: (data: Partial<UserProfile>) => void;
  changePassword: (currentPass: string, newPass: string) => boolean;
  addAddress: (data: Omit<SavedAddress, 'id'>) => void;
  updateAddress: (id: string, data: Partial<SavedAddress>) => void;
  deleteAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  addRecentlyViewed: (product: Product) => void;
  clearRecentlyViewed: () => void;
  logout: () => void;
  login: () => void;
}

const DEFAULT_USER: UserProfile = {
  firstName: 'Rajesh',
  lastName: 'Sharma',
  email: 'rajesh.sharma@example.com',
  phone: '7484034410',
  companyGst: '10GBVPP8578J1ZO',
  role: 'customer',
  memberTier: 'Silver Member',
  memberProgress: 70,
  totalSpent: 35000,
};

const DEFAULT_ADDRESSES: SavedAddress[] = [
  {
    id: 'addr-1',
    fullName: 'Rajesh Sharma',
    phone: '7484034410',
    street: 'Dhiranpatti Chowk, Markan - Muzaffarpur Rd, near Shyam Nandan Sahaye College',
    city: 'Muzaffarpur',
    state: 'Bihar',
    postalCode: '842005',
    isDefault: true,
  },
  {
    id: 'addr-2',
    fullName: 'AK Construction Office',
    phone: '7484034410',
    street: 'AK Hardware Warehouse, Industrial Area Phase II',
    city: 'Muzaffarpur',
    state: 'Bihar',
    postalCode: '842001',
    isDefault: false,
  },
];

const STORAGE_USER_KEY = 'ak_hardware_user_profile_v1';
const STORAGE_ADDRESS_KEY = 'ak_hardware_user_addresses_v1';
const STORAGE_RECENT_KEY = 'ak_hardware_recently_viewed_v1';
const STORAGE_ORDERS_KEY = 'ak_hardware_user_orders_v1';
const STORAGE_LOGGED_IN_KEY = 'ak_hardware_user_logged_in_v1';

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile>(DEFAULT_USER);
  const [addresses, setAddresses] = useState<SavedAddress[]>(DEFAULT_ADDRESSES);
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load state from localStorage on mount
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem(STORAGE_USER_KEY);
      const savedAddresses = localStorage.getItem(STORAGE_ADDRESS_KEY);
      const savedRecent = localStorage.getItem(STORAGE_RECENT_KEY);
      const savedOrders = localStorage.getItem(STORAGE_ORDERS_KEY);
      const savedLoggedIn = localStorage.getItem(STORAGE_LOGGED_IN_KEY);

      if (savedUser) setUser(JSON.parse(savedUser));
      if (savedAddresses) setAddresses(JSON.parse(savedAddresses));
      if (savedRecent) setRecentlyViewed(JSON.parse(savedRecent));
      else setRecentlyViewed(MOCK_PRODUCTS.slice(0, 4));

      if (savedOrders) setOrders(JSON.parse(savedOrders));
      if (savedLoggedIn !== null) setIsLoggedIn(JSON.parse(savedLoggedIn));
    } catch (e) {
      console.error('Failed to load user state from localStorage', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(user));
      localStorage.setItem(STORAGE_ADDRESS_KEY, JSON.stringify(addresses));
      localStorage.setItem(STORAGE_RECENT_KEY, JSON.stringify(recentlyViewed));
      localStorage.setItem(STORAGE_ORDERS_KEY, JSON.stringify(orders));
      localStorage.setItem(STORAGE_LOGGED_IN_KEY, JSON.stringify(isLoggedIn));
    } catch (e) {
      console.error('Failed to save user state to localStorage', e);
    }
  }, [user, addresses, recentlyViewed, orders, isLoggedIn, isLoaded]);

  const updateProfile = (data: Partial<UserProfile>) => {
    setUser((prev) => ({ ...prev, ...data }));
  };

  const changePassword = (_currentPass: string, _newPass: string): boolean => {
    // Demo password change logic
    return true;
  };

  const addAddress = (data: Omit<SavedAddress, 'id'>) => {
    const newAddress: SavedAddress = {
      ...data,
      id: `addr-${Date.now()}`,
    };
    setAddresses((prev) => {
      let updated = [...prev];
      if (newAddress.isDefault || updated.length === 0) {
        updated = updated.map((a) => ({ ...a, isDefault: false }));
        newAddress.isDefault = true;
      }
      return [...updated, newAddress];
    });
  };

  const updateAddress = (id: string, data: Partial<SavedAddress>) => {
    setAddresses((prev) => {
      let updated = prev.map((a) => (a.id === id ? { ...a, ...data } : a));
      if (data.isDefault) {
        updated = updated.map((a) => (a.id === id ? { ...a, isDefault: true } : { ...a, isDefault: false }));
      }
      return updated;
    });
  };

  const deleteAddress = (id: string) => {
    setAddresses((prev) => {
      const target = prev.find((a) => a.id === id);
      const filtered = prev.filter((a) => a.id !== id);
      if (target?.isDefault && filtered.length > 0) {
        filtered[0].isDefault = true;
      }
      return filtered;
    });
  };

  const setDefaultAddress = (id: string) => {
    setAddresses((prev) => prev.map((a) => ({ ...a, isDefault: a.id === id })));
  };

  const addRecentlyViewed = (product: Product) => {
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((p) => p.id !== product.id);
      return [product, ...filtered].slice(0, 10);
    });
  };

  const clearRecentlyViewed = () => {
    setRecentlyViewed([]);
  };

  const logout = () => {
    setIsLoggedIn(false);
    try {
      localStorage.removeItem(STORAGE_LOGGED_IN_KEY);
    } catch (e) {
      console.error('Failed to clear logged in key', e);
    }
    router.push('/login');
  };

  const login = () => {
    setIsLoggedIn(true);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        addresses,
        recentlyViewed,
        orders,
        isLoggedIn,
        updateProfile,
        changePassword,
        addAddress,
        updateAddress,
        deleteAddress,
        setDefaultAddress,
        addRecentlyViewed,
        clearRecentlyViewed,
        logout,
        login,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
