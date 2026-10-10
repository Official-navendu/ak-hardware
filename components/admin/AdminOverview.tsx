'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Plus,
  FileSpreadsheet,
  TrendingUp,
  ShoppingCart,
  Users,
  DollarSign,
  AlertTriangle,
  ChevronRight,
  Eye,
  CheckCircle2,
  Smartphone,
  Laptop,
} from 'lucide-react';
import { useAdminContext } from '@/lib/context/admin-context';
import { formatPrice } from '@/lib/utils';
import { AdminPageHeader } from '@/components/admin/ui/AdminPageHeader';
import { AdminKpiCard } from '@/components/admin/ui/AdminKpiCard';
import { AdminCard } from '@/components/admin/ui/AdminCard';
import { AdminBadge } from '@/components/admin/ui/AdminBadge';
import { AdminActionMenu } from '@/components/admin/ui/AdminActionMenu';
import { AdminToast } from '@/components/admin/ui/AdminToast';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';

type Period = '24H' | '3D' | '7D' | '30D' | '90D';

const PERIOD_CONFIG: Record<Period, {
  multiplier: number;
  labels: string[];
  path: string;
  fillPath: string;
  points: { cx: number; cy: number; label: string; sales: number; orders: number }[];
}> = {
  '24H': {
    multiplier: 0.08,
    labels: ['00:00 - 06:00', '06:00 - 12:00', '12:00 - 18:00', '18:00 - 24:00'],
    path: 'M 0,110 Q 60,95 120,70 T 240,45 T 360,60 T 480,25',
    fillPath: 'M 0,110 Q 60,95 120,70 T 240,45 T 360,60 T 480,25 L 480,130 L 0,130 Z',
    points: [
      { cx: 120, cy: 70, label: '06:00 AM', sales: 4200, orders: 3 },
      { cx: 240, cy: 45, label: '12:00 PM', sales: 12800, orders: 11 },
      { cx: 360, cy: 60, label: '06:00 PM', sales: 9400, orders: 8 },
      { cx: 480, cy: 25, label: '11:59 PM', sales: 18500, orders: 16 },
    ],
  },
  '3D': {
    multiplier: 0.18,
    labels: ['Day 1 (Mon)', 'Day 2 (Tue)', 'Day 3 (Wed)', 'Today (Thu)'],
    path: 'M 0,105 Q 60,85 120,60 T 240,50 T 360,35 T 480,20',
    fillPath: 'M 0,105 Q 60,85 120,60 T 240,50 T 360,35 T 480,20 L 480,130 L 0,130 Z',
    points: [
      { cx: 120, cy: 60, label: 'Mon', sales: 14200, orders: 15 },
      { cx: 240, cy: 50, label: 'Tue', sales: 19500, orders: 21 },
      { cx: 360, cy: 35, label: 'Wed', sales: 26400, orders: 28 },
      { cx: 480, cy: 20, label: 'Thu (Today)', sales: 34200, orders: 38 },
    ],
  },
  '7D': {
    multiplier: 0.35,
    labels: ['Days 1-2', 'Days 3-4', 'Days 5-6', 'Today'],
    path: 'M 0,100 Q 60,80 120,65 T 240,40 T 360,55 T 480,18',
    fillPath: 'M 0,100 Q 60,80 120,65 T 240,40 T 360,55 T 480,18 L 480,130 L 0,130 Z',
    points: [
      { cx: 120, cy: 65, label: 'Days 1-2', sales: 32400, orders: 36 },
      { cx: 240, cy: 40, label: 'Days 3-4', sales: 48200, orders: 54 },
      { cx: 360, cy: 55, label: 'Days 5-6', sales: 39100, orders: 42 },
      { cx: 480, cy: 18, label: 'Today', sales: 58900, orders: 67 },
    ],
  },
  '30D': {
    multiplier: 1.0,
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    path: 'M 0,90 Q 60,70 120,55 T 240,35 T 360,45 T 480,15',
    fillPath: 'M 0,90 Q 60,70 120,55 T 240,35 T 360,45 T 480,15 L 480,130 L 0,130 Z',
    points: [
      { cx: 120, cy: 55, label: 'Week 1', sales: 112000, orders: 135 },
      { cx: 240, cy: 35, label: 'Week 2', sales: 148000, orders: 172 },
      { cx: 360, cy: 45, label: 'Week 3', sales: 129000, orders: 154 },
      { cx: 480, cy: 15, label: 'Week 4', sales: 189000, orders: 218 },
    ],
  },
  '90D': {
    multiplier: 2.8,
    labels: ['Month 1', 'Month 2', 'Month 3 (Current)', 'Forecast Q4'],
    path: 'M 0,85 Q 60,60 120,45 T 240,25 T 360,35 T 480,10',
    fillPath: 'M 0,85 Q 60,60 120,45 T 240,25 T 360,35 T 480,10 L 480,130 L 0,130 Z',
    points: [
      { cx: 120, cy: 45, label: 'Month 1', sales: 312000, orders: 380 },
      { cx: 240, cy: 25, label: 'Month 2', sales: 445000, orders: 520 },
      { cx: 360, cy: 35, label: 'Month 3', sales: 410000, orders: 490 },
      { cx: 480, cy: 10, label: 'Forecast Q4', sales: 620000, orders: 740 },
    ],
  },
};

export function AdminOverview() {
  const { products, orders, customers, adjustProductStock } = useAdminContext();

  const [period, setPeriod] = useState<Period>('30D');
  const [hoverPoint, setHoverPoint] = useState<{ label: string; sales: number; orders: number } | null>(null);
  const [restockProduct, setRestockProduct] = useState<{ id: string; name: string; stock: number } | null>(null);
  const [restockQty, setRestockQty] = useState(25);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const lowStockItems = products.filter((p) => p.stock <= (p.lowStockThreshold || 5));
  const topSelling = products.slice(0, 5);

  const config = PERIOD_CONFIG[period];
  const totalSalesVal = Math.round(orders.reduce((sum, o) => sum + o.total, 124560) * config.multiplier);
  const totalOrdersCount = Math.round((orders.length + 320) * config.multiplier);
  const totalCustomersCount = Math.round((customers.length + 1240) * (period === '90D' ? 1.5 : 1.0));
  const avgOrderVal = Math.round(totalSalesVal / (totalOrdersCount || 1));

  const handleRestockSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (restockProduct) {
      adjustProductStock(restockProduct.id, restockQty, 'Restock from Dashboard Overview');
      setToastMessage(`Restocked ${restockQty} units for ${restockProduct.name}`);
      setRestockProduct(null);
    }
  };

  const handleExportReport = () => {
    setToastMessage('Operations summary report generated & exported.');
  };

  // Dynamic order breakdown from actual context orders state
  const totalRealOrdersCount = orders.length || 1;
  const deliveredCount = orders.filter((o) => o.orderStatus === 'Delivered').length;
  const processingCount = orders.filter((o) => o.orderStatus === 'Processing' || o.orderStatus === 'Pending').length;
  const shippedCount = orders.filter((o) => o.orderStatus === 'Shipped').length;
  const cancelledCount = orders.filter((o) => o.orderStatus === 'Cancelled').length;

  const delPct = Math.round((deliveredCount / totalRealOrdersCount) * 100);
  const procPct = Math.round((processingCount / totalRealOrdersCount) * 100);
  const shipPct = Math.round((shippedCount / totalRealOrdersCount) * 100);
  const cancPct = Math.max(0, 100 - delPct - procPct - shipPct);

  return (
    <div className="flex flex-col gap-6 max-w-[1440px] mx-auto">
      {toastMessage && (
        <AdminToast message={toastMessage} onClose={() => setToastMessage(null)} />
      )}

      {/* PAGE HEADER */}
      <AdminPageHeader
        title="Operations Dashboard"
        description="Real-time sales velocity, fulfillment queues, inventory alerts, and customer activity."
        primaryAction={
          <Link href="/ashish/products/new">
            <button className="h-9 px-3.5 bg-navy-900 text-white rounded-[7px] text-xs font-semibold hover:bg-navy-800 transition-colors flex items-center gap-1.5 shadow-xs">
              <Plus className="h-4 w-4 text-orange-brand" />
              <span>Add Product</span>
            </button>
          </Link>
        }
        secondaryActions={
          <button
            onClick={handleExportReport}
            className="h-9 px-3 bg-white border border-border text-navy-900 rounded-[7px] text-xs font-semibold hover:bg-slate-50 transition-colors flex items-center gap-1.5"
          >
            <FileSpreadsheet className="h-3.5 w-3.5 text-text-muted" />
            <span>Export Report</span>
          </button>
        }
      />

      {/* 4 RESTRAINED KPI CARDS WITH CONTROLLED COLOR INDICATORS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <AdminKpiCard
          title="Total Sales"
          value={formatPrice(totalSalesVal)}
          change="+14.2%"
          changeType="positive"
          periodText={`vs previous ${period}`}
          icon={<div className="p-1.5 bg-blue-50 text-[#014A94] rounded"><TrendingUp className="h-4 w-4" /></div>}
        />
        <AdminKpiCard
          title="Total Orders"
          value={totalOrdersCount.toLocaleString()}
          change="+8.5%"
          changeType="positive"
          periodText={`vs previous ${period}`}
          icon={<div className="p-1.5 bg-orange-50 text-[#FA3A08] rounded"><ShoppingCart className="h-4 w-4" /></div>}
        />
        <AdminKpiCard
          title="Total Customers"
          value={totalCustomersCount.toLocaleString()}
          change="+18.0%"
          changeType="positive"
          periodText={`vs previous ${period}`}
          icon={<div className="p-1.5 bg-emerald-50 text-[#00A23A] rounded"><Users className="h-4 w-4" /></div>}
        />
        <AdminKpiCard
          title="Average Order Value"
          value={formatPrice(avgOrderVal)}
          change="+4.1%"
          changeType="positive"
          periodText={`vs previous ${period}`}
          icon={<div className="p-1.5 bg-slate-100 text-[#012157] rounded"><DollarSign className="h-4 w-4" /></div>}
        />
      </div>

      {/* DASHBOARD MAIN GRID: LEFT (68%) / RIGHT (32%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN: SALES CHART & RECENT ORDERS */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* SALES OVERVIEW CHART */}
          <AdminCard
            title="Sales Velocity Overview"
            description={`Revenue breakdown trajectory (${period} period)`}
            action={
              <div className="flex items-center gap-1 bg-surface-bg border border-border p-0.5 rounded-[6px]">
                {(['24H', '3D', '7D', '30D', '90D'] as const).map((p) => (
                  <button
                    key={p}
                    onClick={() => {
                      setPeriod(p);
                      setHoverPoint(null);
                    }}
                    className={`px-2.5 py-1 text-[11px] font-mono font-bold rounded-[4px] transition-colors ${
                      period === p
                        ? 'bg-navy-900 text-white'
                        : 'text-text-muted hover:text-navy-900'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            }
          >
            <div className="relative w-full h-56 bg-surface-bg border border-border rounded-[8px] p-4 flex flex-col justify-end">
              {/* HOVER TOOLTIP DISPLAY */}
              {hoverPoint && (
                <div className="absolute top-3 right-4 bg-white border border-[#E5E7EB] shadow-md rounded-[8px] px-3 py-1.5 text-xs flex items-center gap-3 z-10 animate-in fade-in duration-150">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-text-muted uppercase font-bold">{hoverPoint.label}</span>
                    <span className="font-bold text-navy-900">{formatPrice(hoverPoint.sales)}</span>
                  </div>
                  <div className="h-6 w-[1px] bg-border" />
                  <div className="flex flex-col">
                    <span className="text-[10px] text-text-muted uppercase font-bold">Orders</span>
                    <span className="font-bold text-blue-brand">{hoverPoint.orders} orders</span>
                  </div>
                </div>
              )}

              <svg className="w-full h-40" viewBox="0 0 500 130" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#014A94" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#014A94" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path d={config.fillPath} fill="url(#salesGrad)" />
                <path d={config.path} fill="none" stroke="#014A94" strokeWidth="2.5" />

                {config.points.map((pt, i) => (
                  <g key={i} className="cursor-pointer" onMouseEnter={() => setHoverPoint(pt)} onMouseLeave={() => setHoverPoint(null)}>
                    <circle cx={pt.cx} cy={pt.cy} r={i === config.points.length - 1 ? 5 : 4} fill={i === config.points.length - 1 ? '#FA3A08' : '#014A94'} className="transition-transform hover:scale-125" />
                  </g>
                ))}
              </svg>

              <div className="flex justify-between text-[11px] text-text-muted font-mono pt-2 border-t border-border">
                {config.labels.map((lbl, idx) => (
                  <span key={idx} className="truncate px-1">{lbl}</span>
                ))}
              </div>
            </div>
          </AdminCard>

          {/* RECENT ORDERS TABLE */}
          <AdminCard
            title="Recent Fulfillment Orders"
            description="Latest store purchases requiring processing"
            noPadding
            action={
              <Link href="/ashish/orders" className="text-xs font-semibold text-blue-brand hover:underline flex items-center gap-1">
                View All Orders <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            }
          >
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-border text-text-muted uppercase text-[11px] tracking-wider bg-surface-bg">
                    <th className="py-3 px-4">Order ID</th>
                    <th className="py-3 px-4">Customer</th>
                    <th className="py-3 px-4">Items</th>
                    <th className="py-3 px-4">Total</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {orders.slice(0, 5).map((ord) => (
                    <tr key={ord.id} className="hover:bg-slate-50/80 transition-colors h-[52px]">
                      <td className="py-3 px-4 font-mono font-bold text-navy-900">{ord.orderNumber}</td>
                      <td className="py-3 px-4 font-medium text-navy-900">{ord.customerName}</td>
                      <td className="py-3 px-4 text-text-muted">{ord.items.length} pcs</td>
                      <td className="py-3 px-4 font-bold text-navy-900">{formatPrice(ord.total)}</td>
                      <td className="py-3 px-4">
                        <AdminBadge
                          variant={
                            ord.orderStatus === 'Shipped' || ord.orderStatus === 'Delivered'
                              ? 'shipped'
                              : ord.orderStatus === 'Processing'
                              ? 'processing'
                              : 'default'
                          }
                          size="sm"
                        >
                          {ord.orderStatus}
                        </AdminBadge>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <AdminActionMenu
                          items={[
                            {
                              label: 'View Order Details',
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
                </tbody>
              </table>
            </div>
          </AdminCard>
        </div>

        {/* RIGHT COLUMN: ORDER STATUS & LOW STOCK */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* ORDER STATUS BREAKDOWN (DERIVED FROM CONTEXT ORDERS DATA) */}
          <AdminCard title="Order Fulfillment Status" description="Current distribution across processing pipeline">
            <div className="flex flex-col items-center justify-center py-2 gap-4">
              <div className="relative h-36 w-36 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#F1F5F9"
                    strokeWidth="3.5"
                  />
                  {/* DELIVERED (GREEN #00A23A) */}
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#00A23A"
                    strokeWidth="3.5"
                    strokeDasharray={`${delPct}, 100`}
                  />
                  {/* PROCESSING (ROYAL BLUE #014A94) */}
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#014A94"
                    strokeWidth="3.5"
                    strokeDasharray={`${procPct}, 100`}
                    strokeDashoffset={`-${delPct}`}
                  />
                  {/* SHIPPED (ORANGE #FA3A08) */}
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#FA3A08"
                    strokeWidth="3.5"
                    strokeDasharray={`${shipPct}, 100`}
                    strokeDashoffset={`-${delPct + procPct}`}
                  />
                  {/* CANCELLED (GRAY #9CA3AF) */}
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#9CA3AF"
                    strokeWidth="3.5"
                    strokeDasharray={`${cancPct}, 100`}
                    strokeDashoffset={`-${delPct + procPct + shipPct}`}
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center text-center">
                  <span className="text-xl font-bold text-navy-900">{orders.length}</span>
                  <span className="text-[10px] text-text-muted font-medium">Total Orders</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs w-full pt-2 border-t border-border">
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-[#00A23A]" />
                  <span className="text-text-secondary">Delivered ({delPct}%)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-[#014A94]" />
                  <span className="text-text-secondary">Processing ({procPct}%)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-[#FA3A08]" />
                  <span className="text-text-secondary">Shipped ({shipPct}%)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-[#9CA3AF]" />
                  <span className="text-text-secondary">Cancelled ({cancPct}%)</span>
                </div>
              </div>
            </div>
          </AdminCard>

          {/* LOW STOCK ALERTS */}
          <AdminCard
            title="Low Stock Alerts"
            description="Items below warehouse warning threshold"
            action={
              <span className="text-xs font-mono font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                ● {lowStockItems.length} Low Stock
              </span>
            }
          >
            <div className="flex flex-col gap-2 max-h-64 overflow-y-auto">
              {lowStockItems.map((prod) => (
                <div key={prod.id} className="p-2.5 bg-surface-bg border border-border rounded-[6px] flex items-center justify-between text-xs">
                  <div className="flex flex-col min-w-0 pr-2">
                    <span className="font-semibold text-navy-900 truncate">{prod.name}</span>
                    <span className="text-[11px] text-amber-800 font-mono">Stock: {prod.stock} units</span>
                  </div>
                  <button
                    onClick={() => setRestockProduct({ id: prod.id, name: prod.name, stock: prod.stock })}
                    className="h-7 px-2.5 bg-white border border-border text-navy-900 rounded-[6px] text-[11px] font-semibold hover:bg-slate-100 transition-colors flex-shrink-0"
                  >
                    Restock
                  </button>
                </div>
              ))}
              {lowStockItems.length === 0 && (
                <p className="text-xs text-text-muted py-4 text-center">All hardware inventory is sufficiently stocked.</p>
              )}
            </div>
          </AdminCard>
        </div>
      </div>

      {/* BOTTOM ROW: TOP SELLING & CUSTOMER TRAFFIC */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6">
          <AdminCard title="Top Selling Hardware SKUs" description="Highest sales volume items this period" noPadding>
            <div className="divide-y divide-border">
              {topSelling.map((item, idx) => (
                <div key={item.id} className="flex items-center justify-between p-3 hover:bg-slate-50/80 transition-colors text-xs">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="font-mono font-bold text-navy-900 text-xs w-4">#{idx + 1}</span>
                    <div className="relative h-9 w-9 bg-white border border-border rounded overflow-hidden flex-shrink-0">
                      <Image src={item.images[0] || '/assets/products/prod-rotary-hammer.svg'} alt={item.name} fill className="object-contain p-1" />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="font-semibold text-navy-900 truncate">{item.name}</span>
                      <span className="text-[10px] text-text-muted font-mono">SKU: {item.sku}</span>
                    </div>
                  </div>
                  <div className="flex flex-col text-right flex-shrink-0 pl-2">
                    <span className="font-bold text-navy-900">{formatPrice(item.salePrice ?? item.price)}</span>
                    <span className="text-[10px] text-emerald-700 font-semibold">120+ sold</span>
                  </div>
                </div>
              ))}
            </div>
          </AdminCard>
        </div>

        <div className="lg:col-span-6">
          <AdminCard title="Customer Traffic & Device Mix" description="Contractor vs retail platform analytics">
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-surface-bg border border-border rounded-[6px] flex flex-col gap-2">
                  <span className="text-xs font-semibold text-navy-900 flex items-center gap-1.5">
                    <Laptop className="h-4 w-4 text-blue-brand" /> Desktop Traffic (65%)
                  </span>
                  <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-brand" style={{ width: '65%' }} />
                  </div>
                  <span className="text-[11px] text-text-muted">High bulk trade contractor orders</span>
                </div>

                <div className="p-3 bg-surface-bg border border-border rounded-[6px] flex flex-col gap-2">
                  <span className="text-xs font-semibold text-navy-900 flex items-center gap-1.5">
                    <Smartphone className="h-4 w-4 text-orange-brand" /> Mobile Traffic (35%)
                  </span>
                  <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-orange-brand" style={{ width: '35%' }} />
                  </div>
                  <span className="text-[11px] text-text-muted">On-site field contractor purchases</span>
                </div>
              </div>

              <div className="p-3 bg-surface-bg border border-border rounded-[6px] text-xs flex flex-col gap-1">
                <span className="font-semibold text-navy-900">Traffic Source Acquisition</span>
                <p className="text-[11px] text-text-muted">
                  62% Direct / Organic Search • 22% B2B Contractor Trade Referrals • 16% Social &amp; Ads
                </p>
              </div>
            </div>
          </AdminCard>
        </div>
      </div>

      {/* RESTOCK MODAL */}
      <Modal
        isOpen={!!restockProduct}
        onClose={() => setRestockProduct(null)}
        title={`Restock Inventory: ${restockProduct?.name}`}
        footer={
          <div className="flex gap-2 justify-end">
            <button
              onClick={() => setRestockProduct(null)}
              className="px-3.5 h-9 bg-white border border-border text-navy-900 rounded-[6px] text-xs font-semibold hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleRestockSubmit}
              className="px-3.5 h-9 bg-navy-900 text-white rounded-[6px] text-xs font-semibold hover:bg-navy-800 transition-colors"
            >
              Confirm Restock
            </button>
          </div>
        }
      >
        <form onSubmit={handleRestockSubmit} className="flex flex-col gap-4 text-xs">
          <p className="text-text-muted">
            Current available stock: <span className="font-bold text-navy-900">{restockProduct?.stock} units</span>
          </p>
          <Input
            label="Additional Quantity to Add"
            type="number"
            min={1}
            value={restockQty}
            onChange={(e) => setRestockQty(Number(e.target.value))}
            required
          />
        </form>
      </Modal>
    </div>
  );
}
