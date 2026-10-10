'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, Eye, Search, Filter } from 'lucide-react';
import { useAdminContext } from '@/lib/context/admin-context';
import { formatPrice, formatDate } from '@/lib/utils';
import { OrderStatus } from '@/types/order';
import { AdminPageHeader } from '@/components/admin/ui/AdminPageHeader';
import { AdminCard } from '@/components/admin/ui/AdminCard';
import { AdminBadge } from '@/components/admin/ui/AdminBadge';
import { AdminActionMenu } from '@/components/admin/ui/AdminActionMenu';
import { AdminToast } from '@/components/admin/ui/AdminToast';

export default function AdminOrdersPage() {
  const { orders, updateOrderStatus } = useAdminContext();
  const [statusFilter, setStatusFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const filtered = orders.filter((o) => {
    if (statusFilter !== 'All' && o.orderStatus.toLowerCase() !== statusFilter.toLowerCase()) {
      return false;
    }
    if (search) {
      const q = search.toLowerCase();
      if (!o.orderNumber.toLowerCase().includes(q) && !o.customerName.toLowerCase().includes(q)) {
        return false;
      }
    }
    return true;
  });

  const getBadgeVariant = (status: OrderStatus) => {
    switch (status) {
      case 'Processing':
        return 'processing';
      case 'Shipped':
      case 'Out for Delivery':
        return 'shipped';
      case 'Delivered':
        return 'delivered';
      case 'Cancelled':
        return 'cancelled';
      default:
        return 'default';
    }
  };

  const handleStatusSelect = (orderId: string, orderNumber: string, status: OrderStatus) => {
    updateOrderStatus(orderId, status);
    setToastMessage(`Order ${orderNumber} status updated to ${status}.`);
  };

  return (
    <div className="flex flex-col gap-6 max-w-[1440px] mx-auto">
      {toastMessage && (
        <AdminToast message={toastMessage} onClose={() => setToastMessage(null)} />
      )}

      {/* PAGE HEADER */}
      <AdminPageHeader
        title="Orders"
        description="Review incoming trade and retail customer purchases, status timeline, and fulfillment dispatch."
        breadcrumbs={[{ label: 'Sales', href: '/ashish/orders' }, { label: 'Orders' }]}
      />

      {/* FILTER TABS & SEARCH BAR */}
      <AdminCard noPadding>
        <div className="p-4 flex flex-wrap items-center justify-between gap-4 border-b border-border bg-white">
          <div className="flex items-center gap-3 flex-1 min-w-[240px] max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search by order number or customer..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-9 pl-9 pr-3 bg-surface-bg border border-border rounded-[7px] text-xs text-navy-900 placeholder:text-text-muted focus:outline-none focus:border-blue-brand"
              />
            </div>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto custom-scrollbar pb-1 sm:pb-0">
            {['All', 'Pending', 'Processing', 'Packed', 'Shipped', 'Out for Delivery', 'Delivered', 'Cancelled'].map((tab) => (
              <button
                key={tab}
                onClick={() => setStatusFilter(tab)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-[6px] transition-colors whitespace-nowrap ${
                  statusFilter === tab
                    ? 'bg-navy-900 text-white'
                    : 'bg-surface-bg text-text-secondary border border-border hover:bg-slate-100'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* HIGH DENSITY ORDERS TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-border text-text-muted uppercase text-[11px] tracking-wider bg-surface-bg">
                <th className="py-3 px-4">Order Number</th>
                <th className="py-3 px-4">Customer Name</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Total Amount</th>
                <th className="py-3 px-4">Payment</th>
                <th className="py-3 px-4">Fulfillment Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((ord) => (
                <tr key={ord.id} className="hover:bg-slate-50/80 transition-colors h-[54px]">
                  <td className="py-2.5 px-4 font-mono font-bold text-navy-900">{ord.orderNumber}</td>
                  <td className="py-2.5 px-4 font-medium text-navy-900">{ord.customerName}</td>
                  <td className="py-2.5 px-4 text-text-muted">{formatDate(ord.createdAt)}</td>
                  <td className="py-2.5 px-4 font-bold text-navy-900">{formatPrice(ord.total)}</td>
                  <td className="py-2.5 px-4">
                    <AdminBadge variant={ord.paymentStatus === 'Paid' ? 'delivered' : 'warning'} size="sm">
                      {ord.paymentStatus}
                    </AdminBadge>
                  </td>
                  <td className="py-2.5 px-4">
                    <select
                      value={ord.orderStatus}
                      onChange={(e) => handleStatusSelect(ord.id, ord.orderNumber, e.target.value as OrderStatus)}
                      className="h-8 px-2 bg-surface-bg border border-border rounded-[6px] text-xs font-semibold text-navy-900 focus:outline-none focus:border-blue-brand"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Processing">Processing</option>
                      <option value="Packed">Packed</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Out for Delivery">Out for Delivery</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="py-2.5 px-4 text-right">
                    <AdminActionMenu
                      items={[
                        {
                          label: 'View Order Workspace',
                          icon: <Eye className="h-3.5 w-3.5 text-blue-brand" />,
                          onClick: () => {
                            window.location.href = `/ashish/orders/${ord.id}`;
                          },
                        },
                      ]}
                    />
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-text-muted text-xs">
                    No orders match the current filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </AdminCard>
    </div>
  );
}
