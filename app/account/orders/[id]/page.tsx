import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Package, Truck, CheckCircle2, Clock, MapPin, CreditCard, ArrowLeft } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { MOCK_ORDERS } from '@/lib/data/mock-orders';
import { formatPrice, formatDate } from '@/lib/utils';
import { OrderStatus } from '@/types/order';

export default async function AccountOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const order = MOCK_ORDERS.find((o) => o.id === id) || MOCK_ORDERS[0];

  const stages: OrderStatus[] = [
    'Pending',
    'Confirmed',
    'Processing',
    'Packed',
    'Shipped',
    'Out for Delivery',
    'Delivered',
  ];

  const currentStageIndex = stages.indexOf(order.orderStatus);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <Link href="/account/orders" className="text-xs font-bold text-blue-brand hover:underline flex items-center gap-1">
          <ArrowLeft className="h-4 w-4" /> Back to Orders
        </Link>
        <Badge variant="navy" size="sm">
          DEMO ORDER DETAIL
        </Badge>
      </div>

      <SectionHeading
        title={`Order ${order.orderNumber}`}
        subtitle={`Placed on ${formatDate(order.createdAt)} • Payment Mode: ${order.paymentMethod}`}
      />

      {/* 7-STAGE VISUAL TIMELINE */}
      <div className="bg-white border border-border rounded-brand-lg p-6 shadow-subtle flex flex-col gap-4">
        <h4 className="font-extrabold text-navy-900 text-sm border-b border-border pb-3 flex items-center gap-2">
          <Truck className="h-4 w-4 text-blue-brand" />
          <span>Shipment Tracking Timeline</span>
          {order.trackingNumber && (
            <span className="ml-auto text-xs font-mono text-text-muted">Tracking #: {order.trackingNumber}</span>
          )}
        </h4>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 pt-2">
          {stages.map((stage, idx) => {
            const isCompleted = idx <= currentStageIndex;
            const isCurrent = idx === currentStageIndex;
            return (
              <div key={stage} className="flex flex-col items-center text-center gap-1.5 relative">
                <div
                  className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                    isCurrent
                      ? 'bg-orange-brand text-white ring-4 ring-orange-100 shadow-sm'
                      : isCompleted
                      ? 'bg-blue-brand text-white'
                      : 'bg-slate-100 text-slate-400 border border-border'
                  }`}
                >
                  {isCompleted ? <CheckCircle2 className="h-4 w-4" /> : idx + 1}
                </div>
                <span className={`text-[10px] font-bold ${isCurrent ? 'text-orange-brand font-black' : isCompleted ? 'text-navy-900' : 'text-slate-400'}`}>
                  {stage}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ORDER ITEMS & ADDRESS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white border border-border rounded-brand-lg p-6 shadow-subtle flex flex-col gap-4">
          <h4 className="font-extrabold text-navy-900 text-sm border-b border-border pb-3">
            Ordered Items
          </h4>
          <div className="divide-y divide-border">
            {order.items.map((item) => (
              <div key={item.id} className="py-3 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="relative h-14 w-14 bg-surface-bg border border-border rounded overflow-hidden flex-shrink-0">
                    <Image src={item.productImage} alt={item.productName} fill className="object-contain p-1" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-navy-900 text-xs line-clamp-1">{item.productName}</span>
                    <span className="text-[11px] text-text-muted">Quantity: {item.quantity}</span>
                  </div>
                </div>
                <span className="font-extrabold text-navy-900 text-xs">{formatPrice(item.total)}</span>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-border flex flex-col gap-1 text-xs text-right ml-auto max-w-xs w-full">
            <div className="flex justify-between"><span>Subtotal:</span><span>{formatPrice(order.subtotal)}</span></div>
            <div className="flex justify-between"><span>Shipping:</span><span>{formatPrice(order.shippingFee)}</span></div>
            <div className="flex justify-between"><span>Tax:</span><span>{formatPrice(order.tax)}</span></div>
            <div className="flex justify-between text-sm font-black text-navy-900 pt-2 border-t border-border"><span>Total:</span><span>{formatPrice(order.total)}</span></div>
          </div>
        </div>

        <div className="bg-white border border-border rounded-brand-lg p-6 shadow-subtle flex flex-col gap-4">
          <h4 className="font-extrabold text-navy-900 text-sm border-b border-border pb-3 flex items-center gap-2">
            <MapPin className="h-4 w-4 text-blue-brand" />
            <span>Shipping Address</span>
          </h4>
          <div className="text-xs text-text-secondary leading-relaxed">
            <p className="font-bold text-navy-900">{order.shippingAddress.fullName}</p>
            <p>{order.shippingAddress.street}</p>
            <p>{order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.postalCode}</p>
            <p className="mt-2 font-mono">Phone: {order.shippingAddress.phone}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
