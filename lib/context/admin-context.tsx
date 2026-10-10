'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '@/types/product';
import { Order, OrderStatus } from '@/types/order';
import { BlogPost } from '@/types/blog';
import { Category } from '@/types/category';
import { Review } from '@/types/review';
import { MOCK_PRODUCTS } from '@/lib/data/mock-products';
import { MOCK_ORDERS } from '@/lib/data/mock-orders';
import { MOCK_BLOG_POSTS } from '@/lib/data/mock-blog';
import { MOCK_CATEGORIES } from '@/lib/data/mock-categories';
import { MOCK_REVIEWS } from '@/lib/data/mock-reviews';
import { MOCK_USERS } from '@/lib/data/mock-users';
import { STORE_CONFIG } from '@/lib/config';

export interface Coupon {
  id: string;
  code: string;
  discount: string;
  limit: string;
  expiry: string;
  status: 'Active' | 'Expired' | 'Disabled';
}

export interface Subscriber {
  email: string;
  date: string;
  status: 'Subscribed' | 'Unsubscribed';
}

export interface AdminNotification {
  id: string;
  type: 'ORDER_RECEIVED' | 'PRODUCT_OUT_OF_STOCK' | 'PRODUCT_LOW_STOCK' | 'NEW_REVIEW' | 'ORDER_STATUS_CHANGED' | 'CUSTOMER_REGISTERED' | 'BLOG_ACTIVITY';
  title: string;
  description: string;
  time: string;
  link: string;
  read: boolean;
}

interface AdminContextType {
  products: Product[];
  categories: Category[];
  orders: Order[];
  customers: typeof MOCK_USERS;
  coupons: Coupon[];
  reviews: Review[];
  blogPosts: BlogPost[];
  subscribers: Subscriber[];
  settings: typeof STORE_CONFIG;
  notifications: AdminNotification[];
  unreadNotificationCount: number;

  // Actions
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;

  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  adjustProductStock: (id: string, delta: number, reason?: string) => void;

  addCategory: (category: { name: string; slug: string; description?: string; icon?: string }) => void;
  updateCategory: (id: string, category: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  addSubcategory: (parentId: string, subcategory: { name: string; slug: string; description?: string; image?: string; isActive?: boolean }) => void;
  updateSubcategory: (parentId: string, subcategoryId: string, subcategory: Partial<import('@/types/category').Subcategory>) => void;
  deleteSubcategory: (parentId: string, subcategoryId: string) => void;

  updateOrderStatus: (id: string, status: OrderStatus) => void;

  addCoupon: (coupon: { code: string; discount: string; limit?: string; expiry: string }) => void;
  toggleCouponStatus: (id: string) => void;
  deleteCoupon: (id: string) => void;

  updateReviewStatus: (id: string, status: 'published' | 'rejected') => void;
  deleteReview: (id: string) => void;

  addBlogPost: (post: Omit<BlogPost, 'id' | 'publishedAt'>) => void;
  updateBlogPost: (id: string, post: Partial<BlogPost>) => void;
  deleteBlogPost: (id: string) => void;
  toggleBlogPostPublished: (id: string) => void;

  removeSubscriber: (email: string) => void;
  updateSettings: (newSettings: Partial<typeof STORE_CONFIG>) => void;
}

const DEFAULT_COUPONS: Coupon[] = [
  { id: 'c-1', code: 'AK10', discount: '10%', limit: '500 uses', status: 'Active', expiry: '2026-12-31' },
  { id: 'c-2', code: 'TRADE15', discount: '15%', limit: 'Contractor Trade Only', status: 'Active', expiry: '2026-12-31' },
  { id: 'c-3', code: 'WELCOME5', discount: '5%', limit: 'First Order', status: 'Active', expiry: '2026-12-31' },
];

const DEFAULT_SUBSCRIBERS: Subscriber[] = [
  { email: 'contractor.vikram@example.com', date: '2026-09-20', status: 'Subscribed' },
  { email: 'rajesh.sharma@example.com', date: '2026-09-22', status: 'Subscribed' },
  { email: 'mehta.engineers@example.com', date: '2026-09-24', status: 'Subscribed' },
  { email: 'sunil.kumar@example.com', date: '2026-09-28', status: 'Subscribed' },
];

const AdminContext = createContext<AdminContextType | undefined>(undefined);

const REMOVED_DUPLICATE_IDS = new Set([
  'prod-004', 'prod-008', 'prod-017', 'prod-024',
  'prod-026', 'prod-027', 'prod-028', 'prod-029', 'prod-030', 'prod-031', 'prod-032',
  'prod-034', 'prod-035', 'prod-036',
  'prod-038', 'prod-039', 'prod-040',
]);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('akh_admin_products');
      if (saved) {
        try {
          const parsed: Product[] = JSON.parse(saved);
          return parsed.filter((p) => !REMOVED_DUPLICATE_IDS.has(p.id));
        } catch (e) {
          console.error(e);
        }
      }
    }
    return MOCK_PRODUCTS;
  });

  const [categories, setCategories] = useState<Category[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('akh_admin_categories');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error(e);
        }
      }
    }
    return MOCK_CATEGORIES;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('akh_admin_orders');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error(e);
        }
      }
    }
    return MOCK_ORDERS;
  });

  const [coupons, setCoupons] = useState<Coupon[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('akh_admin_coupons');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error(e);
        }
      }
    }
    return DEFAULT_COUPONS;
  });

  const [reviews, setReviews] = useState<Review[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('akh_admin_reviews');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error(e);
        }
      }
    }
    return MOCK_REVIEWS;
  });

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('akh_admin_blog_posts');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error(e);
        }
      }
    }
    return MOCK_BLOG_POSTS;
  });

  const [subscribers, setSubscribers] = useState<Subscriber[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('akh_admin_subscribers');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error(e);
        }
      }
    }
    return DEFAULT_SUBSCRIBERS;
  });

  const [settings, setSettings] = useState<typeof STORE_CONFIG>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('akh_admin_settings');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error(e);
        }
      }
    }
    return STORE_CONFIG;
  });

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem('akh_admin_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('akh_admin_categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('akh_admin_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('akh_admin_coupons', JSON.stringify(coupons));
  }, [coupons]);

  useEffect(() => {
    localStorage.setItem('akh_admin_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('akh_admin_blog_posts', JSON.stringify(blogPosts));
  }, [blogPosts]);

  useEffect(() => {
    localStorage.setItem('akh_admin_subscribers', JSON.stringify(subscribers));
  }, [subscribers]);

  useEffect(() => {
    localStorage.setItem('akh_admin_settings', JSON.stringify(settings));
  }, [settings]);

  const [readNotificationIds, setReadNotificationIds] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('akh_admin_read_notifications');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error(e);
        }
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('akh_admin_read_notifications', JSON.stringify(readNotificationIds));
  }, [readNotificationIds]);

  const markNotificationRead = (id: string) => {
    setReadNotificationIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  const notifications: AdminNotification[] = [
    ...orders.slice(0, 4).map((o) => ({
      id: `notif-ord-${o.id}`,
      type: 'ORDER_RECEIVED' as const,
      title: 'New Order Received',
      description: `Order #${o.orderNumber} placed by ${o.customerName} (₹${o.total.toLocaleString()}).`,
      time: '10 min ago',
      link: `/ashish/orders/${o.id}`,
      read: readNotificationIds.includes(`notif-ord-${o.id}`),
    })),
    ...products.filter((p) => p.stock === 0).map((p) => ({
      id: `notif-oos-${p.id}`,
      type: 'PRODUCT_OUT_OF_STOCK' as const,
      title: 'Product Out of Stock',
      description: `${p.name} (SKU: ${p.sku}) is currently out of stock.`,
      time: '25 min ago',
      link: '/ashish/inventory',
      read: readNotificationIds.includes(`notif-oos-${p.id}`),
    })),
    ...products.filter((p) => p.stock > 0 && p.stock <= (p.lowStockThreshold || 5)).map((p) => ({
      id: `notif-low-${p.id}`,
      type: 'PRODUCT_LOW_STOCK' as const,
      title: 'Low Stock Alert',
      description: `${p.name} has only ${p.stock} units remaining in warehouse.`,
      time: '1 hr ago',
      link: '/ashish/inventory',
      read: readNotificationIds.includes(`notif-low-${p.id}`),
    })),
    ...reviews.slice(0, 2).map((r) => ({
      id: `notif-rev-${r.id}`,
      type: 'NEW_REVIEW' as const,
      title: 'New Customer Review',
      description: `${r.userName} left a ${r.rating}★ review: "${r.comment.slice(0, 35)}..."`,
      time: '2 hrs ago',
      link: '/ashish/reviews',
      read: readNotificationIds.includes(`notif-rev-${r.id}`),
    })),
  ];

  const unreadNotificationCount = notifications.filter((n) => !n.read).length;

  const markAllNotificationsRead = () => {
    setReadNotificationIds(notifications.map((n) => n.id));
  };

  // Actions
  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...product,
      id: `prod-${Date.now()}`,
    };
    setProducts((prev) => [newProduct, ...prev]);
  };

  const updateProduct = (id: string, updatedFields: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updatedFields } : p))
    );
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const adjustProductStock = (id: string, delta: number) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, stock: Math.max(0, p.stock + delta) } : p
      )
    );
  };

  const addCategory = (category: { name: string; slug: string; description?: string; icon?: string }) => {
    const newCategory: Category = {
      id: `cat-${Date.now()}`,
      name: category.name,
      slug: category.slug,
      description: category.description || '',
      image: category.icon || '/assets/categories/hardware.svg',
      productCount: 0,
      subcategories: [],
    };
    setCategories((prev) => [...prev, newCategory]);
  };

  const updateCategory = (id: string, updatedFields: Partial<Category>) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updatedFields } : c))
    );
  };

  const deleteCategory = (id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
  };

  const addSubcategory = (
    parentId: string,
    subcategory: { name: string; slug: string; description?: string; image?: string; isActive?: boolean }
  ) => {
    setCategories((prev) =>
      prev.map((c) => {
        if (c.id === parentId || c.slug === parentId) {
          const newSub = {
            id: `sub-${Date.now()}`,
            name: subcategory.name,
            slug: subcategory.slug,
            parentId: c.id,
            description: subcategory.description || '',
            image: subcategory.image || c.image,
            isActive: subcategory.isActive ?? true,
            productCount: 0,
          };
          return {
            ...c,
            subcategories: [...(c.subcategories || []), newSub],
          };
        }
        return c;
      })
    );
  };

  const updateSubcategory = (
    parentId: string,
    subcategoryId: string,
    updatedFields: Partial<import('@/types/category').Subcategory>
  ) => {
    setCategories((prev) =>
      prev.map((c) => {
        if (c.id === parentId || c.slug === parentId) {
          return {
            ...c,
            subcategories: (c.subcategories || []).map((sub) =>
              sub.id === subcategoryId ? { ...sub, ...updatedFields } : sub
            ),
          };
        }
        return c;
      })
    );
  };

  const deleteSubcategory = (parentId: string, subcategoryId: string) => {
    setCategories((prev) =>
      prev.map((c) => {
        if (c.id === parentId || c.slug === parentId) {
          return {
            ...c,
            subcategories: (c.subcategories || []).filter((sub) => sub.id !== subcategoryId),
          };
        }
        return c;
      })
    );
  };

  const updateOrderStatus = (id: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, orderStatus: status } : o))
    );
  };

  const addCoupon = (coupon: { code: string; discount: string; limit?: string; expiry: string }) => {
    const newCoupon: Coupon = {
      id: `c-${Date.now()}`,
      code: coupon.code.toUpperCase(),
      discount: coupon.discount,
      limit: coupon.limit || 'Unlimited',
      expiry: coupon.expiry,
      status: 'Active',
    };
    setCoupons((prev) => [newCoupon, ...prev]);
  };

  const toggleCouponStatus = (id: string) => {
    setCoupons((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, status: c.status === 'Active' ? 'Disabled' : 'Active' }
          : c
      )
    );
  };

  const deleteCoupon = (id: string) => {
    setCoupons((prev) => prev.filter((c) => c.id !== id));
  };

  const updateReviewStatus = (id: string, status: 'published' | 'rejected') => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );
  };

  const deleteReview = (id: string) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
  };

  const addBlogPost = (post: Omit<BlogPost, 'id' | 'publishedAt'>) => {
    const newPost: BlogPost = {
      ...post,
      id: `blog-${Date.now()}`,
      publishedAt: new Date().toISOString(),
    };
    setBlogPosts((prev) => [newPost, ...prev]);
  };

  const updateBlogPost = (id: string, updatedFields: Partial<BlogPost>) => {
    setBlogPosts((prev) =>
      prev.map((b) => (b.id === id ? { ...b, ...updatedFields } : b))
    );
  };

  const deleteBlogPost = (id: string) => {
    setBlogPosts((prev) => prev.filter((b) => b.id !== id));
  };

  const toggleBlogPostPublished = (id: string) => {
    setBlogPosts((prev) =>
      prev.map((b) => (b.id === id ? { ...b, published: !b.published } : b))
    );
  };

  const removeSubscriber = (email: string) => {
    setSubscribers((prev) => prev.filter((s) => s.email !== email));
  };

  const updateSettings = (newSettings: Partial<typeof STORE_CONFIG>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  return (
    <AdminContext.Provider
      value={{
        products,
        categories,
        orders,
        customers: MOCK_USERS,
        coupons,
        reviews,
        blogPosts,
        subscribers,
        settings,
        notifications,
        unreadNotificationCount,
        markNotificationRead,
        markAllNotificationsRead,
        addProduct,
        updateProduct,
        deleteProduct,
        adjustProductStock,
        addCategory,
        updateCategory,
        deleteCategory,
        addSubcategory,
        updateSubcategory,
        deleteSubcategory,
        updateOrderStatus,
        addCoupon,
        toggleCouponStatus,
        deleteCoupon,
        updateReviewStatus,
        deleteReview,
        addBlogPost,
        updateBlogPost,
        deleteBlogPost,
        toggleBlogPostPublished,
        removeSubscriber,
        updateSettings,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdminContext() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdminContext must be used within an AdminProvider');
  }
  return context;
}
