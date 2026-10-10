'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Package, ChevronRight, RefreshCw, ArrowRight } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useUser } from '@/lib/context/user-context';
import { useCart } from '@/lib/context/cart-context';
import { useToast } from '@/lib/context/toast-context';
import { formatPrice, formatDate } from '@/lib/utils';
import { MOCK_PRODUCTS } from '@/lib/data/mock-products';

export default function AccountOrdersPage() {
  const { orders } = useUser();
  const { addToCart } = useCart();
  const toast = useToast();

  const [filter, setFilter] = useState('All');

  const filteredOrders =
    filter === 'All'
      ? orders
      : orders.filter((o) => o.orderStatus.toLowerCase() === filter.toLowerCase());

  const handleReorder = (orderId: string) => {
    const targetOrder = orders.find((o) => o.id === orderId);
    if (!targetOrder) return;

    let addedCount = 0;
    targetOrder.items.forEach((item) => {
      const prod = MOCK_PRODUCTS.find((p) => p.id === item.productId) || MOCK_PRODUCTS[0];
      addToCart(prod, item.quantity);
      addedCount += item.quantity;
    });

    toast.success(`Added ${addedCount} item(s) to cart!`);
  };

  return (
    <div className="flex flex-col gap-6">
      <SectionHeading
        title="Order History &amp; Tracking"
        subtitle="Track shipment progress, reorder supplies, and view full details for all hardware orders."
        badge="Orders"
      />

      {/* FILTER TABS */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar border-b border-border pb-3">
        {['All', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setFilter(tab)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              filter === tab
                ? 'bg-[#012157] text-white font-bold'
                : 'bg-white text-text-secondary border border-border hover:bg-surface-secondary'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ORDERS LIST */}
      {filteredOrders.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center py-12 px-4 bg-white rounded-brand border border-dashed border-slate-200 shadow-subtle">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mb-3">
            <Package className="h-6 w-6 text-[#014A94]" />
          </div>
          <h3 className="font-bold text-[#0C1E38] text-sm">No {filter !== 'All' ? filter.toLowerCase() : ''} orders found</h3>
          <p className="text-xs text-slate-500 max-w-sm mt-1 mb-4">
            {filter === 'All'
              ? 'Your order history will appear here once you place an order.'
              : `There are currently no orders in "${filter}" status.`}
          </p>
          <Link href="/shop">
            <Button variant="primary" size="sm" rightIcon={<ArrowRight className="h-3.5 w-3.5" />}>
              Start Shopping
            </Button>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {filteredOrders.map((ord) => (
            <div
              key={ord.id}
              className="bg-white border border-border rounded-brand-lg p-5 flex flex-col gap-4 shadow-subtle hover:border-slate-300 transition-colors"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-border-light">
                <div className="flex items-center gap-3">
                  <span className="font-extrabold text-[#0C1E38] text-sm font-mono">{ord.orderNumber}</span>
                  <span className="text-xs text-text-muted">Placed on {formatDate(ord.createdAt)}</span>
                </div>
                <Badge
                  variant={
                    ord.orderStatus === 'Delivered'
                      ? 'success'
                      : ord.orderStatus === 'Shipped'
                      ? 'primary'
                      : 'warning'
                  }
                >
                  {ord.orderStatus}
                </Badge>
              </div>

              {/* ORDER ITEMS SNIPPET */}
              <div className="flex flex-col gap-2">
                {ord.items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#0C1E38] line-clamp-1">
                      {item.productName} <span className="text-text-muted font-normal">(x{item.quantity})</span>
                    </span>
                    <span className="font-extrabold text-[#0C1E38] ml-2">{formatPrice(item.total)}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-border-light mt-1">
                <span className="text-xs text-text-muted">
                  Total: <strong className="text-[#0C1E38] text-sm font-black">{formatPrice(ord.total)}</strong>
                </span>
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    leftIcon={<RefreshCw className="h-3.5 w-3.5" />}
                    onClick={() => handleReorder(ord.id)}
                  >
                    Reorder
                  </Button>
                  <Link href={`/account/orders/${ord.id}`}>
                    <Button variant="outline" size="sm" rightIcon={<ChevronRight className="h-4 w-4" />}>
                      View Tracking
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
