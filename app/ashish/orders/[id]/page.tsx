'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Save, Printer, Truck, CheckCircle2, Clock, MapPin, Mail, Phone } from 'lucide-react';
import { useAdminContext } from '@/lib/context/admin-context';
import { formatPrice, formatDate } from '@/lib/utils';
import { OrderStatus } from '@/types/order';
import { AdminPageHeader } from '@/components/admin/ui/AdminPageHeader';
import { AdminCard } from '@/components/admin/ui/AdminCard';
import { AdminBadge } from '@/components/admin/ui/AdminBadge';
import { AdminToast } from '@/components/admin/ui/AdminToast';

export default function AdminOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { orders, updateOrderStatus } = useAdminContext();
  const order = orders.find((o) => o.id === id) || orders[0];

  const [currentStatus, setCurrentStatus] = useState<OrderStatus>(order?.orderStatus || 'Processing');
  const [trackingNumber, setTrackingNumber] = useState(order?.trackingNumber || 'AKTRK987654321');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (order) {
      updateOrderStatus(order.id, currentStatus);
      setToastMessage(`Updated order ${order.orderNumber} status to ${currentStatus}.`);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (!order) {
    return (
      <div className="p-12 text-center text-xs text-text-muted max-w-[1440px] mx-auto">
        Order not found. <Link href="/ashish/orders" className="text-blue-brand font-bold underline">Return to orders</Link>
      </div>
    );
  }

  const timelineSteps = [
    { label: 'Order Placed', date: formatDate(order.createdAt), done: true },
    { label: 'Payment Confirmed', date: formatDate(order.createdAt), done: true },
    { label: 'Packed in Warehouse', date: 'In Progress', done: currentStatus !== 'Pending' && currentStatus !== 'Processing' },
    { label: 'Dispatched with Courier', date: trackingNumber, done: currentStatus === 'Shipped' || currentStatus === 'Out for Delivery' || currentStatus === 'Delivered' },
    { label: 'Delivered to Customer', date: 'Expected Delivery', done: currentStatus === 'Delivered' },
  ];

  return (
    <div className="flex flex-col gap-6 max-w-[1440px] mx-auto">
      {toastMessage && (
        <AdminToast message={toastMessage} onClose={() => setToastMessage(null)} />
      )}

      {/* PAGE HEADER */}
      <AdminPageHeader
        title={`Order ${order.orderNumber}`}
        description={`Customer: ${order.customerName} • Placed on ${formatDate(order.createdAt)}`}
        breadcrumbs={[
          { label: 'Sales', href: '/ashish/orders' },
          { label: 'Orders', href: '/ashish/orders' },
          { label: order.orderNumber },
        ]}
        primaryAction={
          <button
            onClick={handlePrint}
            className="h-9 px-3.5 bg-white border border-border text-navy-900 rounded-[7px] text-xs font-semibold hover:bg-slate-50 transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <Printer className="h-4 w-4 text-blue-brand" />
            <span>Print Tax Invoice</span>
          </button>
        }
      />

      {/* UPDATE STATUS FORM */}
      <AdminCard title="Update Order Fulfillment Status">
        <form onSubmit={handleUpdate} className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-xs">
          <div className="flex flex-col gap-1.5 flex-1">
            <label className="font-semibold text-navy-900">Fulfillment Status</label>
            <select
              value={currentStatus}
              onChange={(e) => setCurrentStatus(e.target.value as OrderStatus)}
              className="h-9 px-3 bg-surface-bg border border-border rounded-[7px] font-bold text-navy-900 focus:outline-none focus:border-blue-brand"
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
          </div>

          <div className="flex flex-col gap-1.5 flex-1">
            <label className="font-semibold text-navy-900">Carrier Tracking Number</label>
            <input
              type="text"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              className="h-9 px-3 bg-surface-bg border border-border rounded-[7px] font-mono text-navy-900 focus:outline-none focus:border-blue-brand"
            />
          </div>

          <button
            type="submit"
            className="h-9 px-4 bg-navy-900 text-white rounded-[7px] font-semibold hover:bg-navy-800 transition-colors flex items-center gap-1.5 flex-shrink-0"
          >
            <Save className="h-4 w-4 text-orange-brand" />
            <span>Save Order Status</span>
          </button>
        </form>
      </AdminCard>

      {/* ORDER WORKSPACE GRID: LEFT (68%) / RIGHT (32%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN: ORDERED ITEMS BREAKDOWN */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <AdminCard title="Ordered Items Breakdown" noPadding>
            <div className="divide-y divide-border">
              {order.items.map((item) => (
                <div key={item.id} className="p-4 flex items-center justify-between text-xs hover:bg-slate-50/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="relative h-12 w-12 bg-surface-bg border border-border rounded-[6px] overflow-hidden flex-shrink-0">
                      <Image
                        src={item.productImage || '/assets/products/prod-rotary-hammer.svg'}
                        alt={item.productName}
                        fill
                        className="object-contain p-1"
                      />
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="font-bold text-navy-900">{item.productName}</span>
                      <span className="text-[11px] text-text-muted">Quantity: {item.quantity} × {formatPrice(item.price)}</span>
                    </div>
                  </div>
                  <span className="font-bold text-navy-900 text-sm">{formatPrice(item.total)}</span>
                </div>
              ))}
            </div>

            <div className="p-4 bg-surface-bg border-t border-border flex flex-col gap-1.5 text-xs text-right ml-auto max-w-xs w-full">
              <div className="flex justify-between text-text-secondary"><span>Subtotal:</span><span>{formatPrice(order.subtotal)}</span></div>
              <div className="flex justify-between text-text-secondary"><span>Shipping Fee:</span><span>{formatPrice(order.shippingFee)}</span></div>
              <div className="flex justify-between text-text-secondary"><span>GST Tax (18%):</span><span>{formatPrice(order.tax)}</span></div>
              <div className="flex justify-between text-sm font-bold text-navy-900 pt-2 border-t border-border"><span>Grand Total:</span><span>{formatPrice(order.total)}</span></div>
            </div>
          </AdminCard>

          {/* VERTICAL FULFILLMENT TIMELINE */}
          <AdminCard title="Fulfillment Timeline">
            <div className="flex flex-col gap-4 text-xs pl-2 relative">
              {timelineSteps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-3 relative pb-3 border-l-2 border-slate-200 pl-4 last:border-l-0">
                  <span
                    className={`absolute -left-[9px] top-0.5 h-4 w-4 rounded-full flex items-center justify-center text-[10px] ${
                      step.done ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-500'
                    }`}
                  >
                    ✓
                  </span>
                  <div className="flex flex-col gap-0.5">
                    <span className={`font-semibold ${step.done ? 'text-navy-900' : 'text-text-muted'}`}>
                      {step.label}
                    </span>
                    <span className="text-[11px] text-text-muted font-mono">{step.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </AdminCard>
        </div>

        {/* RIGHT COLUMN: SHIPPING & CUSTOMER DETAILS */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <AdminCard title="Customer Information">
            <div className="flex flex-col gap-3 text-xs leading-relaxed">
              <div className="flex items-center gap-2 text-navy-900 font-bold">
                <span className="h-7 w-7 rounded-full bg-blue-50 text-blue-brand flex items-center justify-center font-bold text-xs">
                  {order.customerName.charAt(0)}
                </span>
                <span>{order.customerName}</span>
              </div>
              <div className="flex items-center gap-2 text-text-secondary">
                <Mail className="h-3.5 w-3.5 text-slate-400" />
                <span>{order.customerEmail}</span>
              </div>
              <div className="flex items-center gap-2 text-text-secondary font-mono">
                <Phone className="h-3.5 w-3.5 text-slate-400" />
                <span>{order.shippingAddress.phone}</span>
              </div>
            </div>
          </AdminCard>

          <AdminCard title="Shipping Address">
            <div className="text-xs text-text-secondary leading-relaxed flex flex-col gap-1">
              <p className="font-bold text-navy-900">{order.shippingAddress.fullName}</p>
              <p>{order.shippingAddress.street}</p>
              <p>{order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.postalCode}</p>
            </div>
          </AdminCard>
        </div>
      </div>
    </div>
  );
}
