'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, ShoppingCart, Trash2, ArrowRight } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useUser } from '@/lib/context/user-context';
import { useCart } from '@/lib/context/cart-context';
import { useWishlist } from '@/lib/context/wishlist-context';
import { useToast } from '@/lib/context/toast-context';
import { formatPrice } from '@/lib/utils';
import { ProductCard } from '@/components/products/ProductCard';

export default function RecentlyViewedPage() {
  const { recentlyViewed, clearRecentlyViewed } = useUser();
  const { addToCart } = useCart();
  const toast = useToast();

  const handleClear = () => {
    clearRecentlyViewed();
    toast.info('Recently viewed history cleared');
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-border rounded-brand p-5 shadow-subtle">
        <SectionHeading
          title="Recently Viewed Products"
          subtitle="Hardware items and supplies you recently inspected."
          badge="Recently Viewed"
        />
        {recentlyViewed.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            className="text-red-600 hover:bg-red-50 flex items-center gap-1.5"
            onClick={handleClear}
          >
            <Trash2 className="h-4 w-4" /> Clear History
          </Button>
        )}
      </div>

      {recentlyViewed.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center py-14 px-4 bg-white rounded-brand border border-dashed border-slate-200 shadow-subtle">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mb-3">
            <Clock className="h-6 w-6 text-[#014A94]" />
          </div>
          <h3 className="font-bold text-[#0C1E38] text-sm">No recently viewed products</h3>
          <p className="text-xs text-slate-500 max-w-sm mt-1 mb-4">
            Items you browse across the shop catalog will automatically appear here.
          </p>
          <Link href="/shop">
            <Button variant="primary" size="sm" rightIcon={<ArrowRight className="h-3.5 w-3.5" />}>
              Explore Hardware Shop
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {recentlyViewed.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
