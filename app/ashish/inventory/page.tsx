'use client';

import React, { useState } from 'react';
import { RefreshCw, Search } from 'lucide-react';
import { useAdminContext } from '@/lib/context/admin-context';
import { Product } from '@/types/product';
import { AdminPageHeader } from '@/components/admin/ui/AdminPageHeader';
import { AdminKpiCard } from '@/components/admin/ui/AdminKpiCard';
import { AdminCard } from '@/components/admin/ui/AdminCard';
import { AdminBadge } from '@/components/admin/ui/AdminBadge';
import { AdminToast } from '@/components/admin/ui/AdminToast';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';

export default function AdminInventoryPage() {
  const { products, adjustProductStock } = useAdminContext();

  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState<'All' | 'Low' | 'Out'>('All');
  const [selectedProd, setSelectedProd] = useState<Product | null>(null);
  const [adjustQty, setAdjustQty] = useState(25);
  const [reason, setReason] = useState('Supplier Shipment Received');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const lowStockCount = products.filter((p) => p.stock <= (p.lowStockThreshold || 5) && p.stock > 0).length;
  const outOfStockCount = products.filter((p) => p.stock <= 0).length;

  const filtered = products.filter((p) => {
    const isLow = p.stock <= (p.lowStockThreshold || 5) && p.stock > 0;
    const isOut = p.stock <= 0;

    if (filterType === 'Low' && !isLow) return false;
    if (filterType === 'Out' && !isOut) return false;

    if (search) {
      const q = search.toLowerCase();
      if (!p.name.toLowerCase().includes(q) && !p.sku.toLowerCase().includes(q)) {
        return false;
      }
    }
    return true;
  });

  const handleAdjustSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedProd) {
      adjustProductStock(selectedProd.id, adjustQty, reason);
      setToastMessage(`Adjusted stock by ${adjustQty} units for ${selectedProd.name}.`);
      setSelectedProd(null);
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-[1440px] mx-auto">
      {toastMessage && (
        <AdminToast message={toastMessage} onClose={() => setToastMessage(null)} />
      )}

      {/* PAGE HEADER */}
      <AdminPageHeader
        title="Inventory & Stock Tracking"
        description="Monitor warehouse stock levels, low-stock thresholds, and reorder alerts."
        breadcrumbs={[{ label: 'Catalog', href: '/ashish/products' }, { label: 'Inventory' }]}
      />

      {/* TOP KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <AdminKpiCard
          title="Total Hardware SKUs"
          value={products.length.toString()}
          periodText="Active catalog items"
        />
        <AdminKpiCard
          title="Low Stock Warning Alerts"
          value={lowStockCount.toString()}
          changeType={lowStockCount > 0 ? 'negative' : 'positive'}
          periodText="Below warning threshold"
        />
        <AdminKpiCard
          title="Out of Stock SKUs"
          value={outOfStockCount.toString()}
          changeType={outOfStockCount > 0 ? 'negative' : 'positive'}
          periodText="Reorder required immediately"
        />
      </div>

      {/* INVENTORY TABLE & CONTROLS */}
      <AdminCard noPadding>
        <div className="p-4 flex flex-wrap items-center justify-between gap-4 border-b border-border bg-white">
          <div className="flex items-center gap-3 flex-1 min-w-[240px] max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search SKU or product name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-9 pl-9 pr-3 bg-surface-bg border border-border rounded-[7px] text-xs text-navy-900 placeholder:text-text-muted focus:outline-none focus:border-blue-brand"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            {(['All', 'Low', 'Out'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setFilterType(tab)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-[6px] transition-colors ${
                  filterType === tab
                    ? 'bg-navy-900 text-white'
                    : 'bg-surface-bg text-text-secondary border border-border hover:bg-slate-100'
                }`}
              >
                {tab === 'Low' ? 'Low Stock' : tab === 'Out' ? 'Out of Stock' : 'All Inventory'}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-border text-text-muted uppercase text-[11px] tracking-wider bg-surface-bg">
                <th className="py-3 px-4">Product Name &amp; SKU</th>
                <th className="py-3 px-4">Department</th>
                <th className="py-3 px-4">Available Stock</th>
                <th className="py-3 px-4">Warning Threshold</th>
                <th className="py-3 px-4">Operational Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((prod) => {
                const isOut = prod.stock <= 0;
                const isLow = prod.stock <= (prod.lowStockThreshold || 5) && !isOut;

                return (
                  <tr key={prod.id} className="hover:bg-slate-50/80 transition-colors h-[54px]">
                    <td className="py-2.5 px-4">
                      <div className="font-semibold text-navy-900">{prod.name}</div>
                      <div className="font-mono text-[11px] text-text-muted">{prod.sku}</div>
                    </td>
                    <td className="py-2.5 px-4 font-medium text-text-secondary">{prod.category}</td>
                    <td className="py-2.5 px-4 font-bold text-navy-900 text-sm">{prod.stock} units</td>
                    <td className="py-2.5 px-4 text-text-muted">{prod.lowStockThreshold || 5} units</td>
                    <td className="py-2.5 px-4">
                      {isOut ? (
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-700">
                          <span className="h-2 w-2 rounded-full bg-red-600" /> Out of Stock
                        </span>
                      ) : isLow ? (
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700">
                          <span className="h-2 w-2 rounded-full bg-amber-500" /> Low Stock Warning
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                          <span className="h-2 w-2 rounded-full bg-emerald-600" /> In Stock
                        </span>
                      )}
                    </td>
                    <td className="py-2.5 px-4 text-right">
                      <button
                        onClick={() => {
                          setSelectedProd(prod);
                          setAdjustQty(25);
                        }}
                        className="h-8 px-3 bg-white border border-border text-navy-900 rounded-[6px] text-xs font-semibold hover:bg-slate-100 transition-colors inline-flex items-center gap-1.5"
                      >
                        <RefreshCw className="h-3.5 w-3.5 text-text-muted" />
                        <span>Adjust Stock</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-text-muted text-xs">
                    No items match the current inventory filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </AdminCard>

      {/* STOCK ADJUSTMENT MODAL */}
      <Modal
        isOpen={!!selectedProd}
        onClose={() => setSelectedProd(null)}
        title={`Adjust Stock: ${selectedProd?.name}`}
        footer={
          <div className="flex gap-2 justify-end">
            <button
              onClick={() => setSelectedProd(null)}
              className="px-3.5 h-9 bg-white border border-border text-navy-900 rounded-[6px] text-xs font-semibold hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleAdjustSubmit}
              className="px-3.5 h-9 bg-navy-900 text-white rounded-[6px] text-xs font-semibold hover:bg-navy-800 transition-colors"
            >
              Confirm Adjustment
            </button>
          </div>
        }
      >
        <form onSubmit={handleAdjustSubmit} className="flex flex-col gap-4 text-xs">
          <p className="text-text-muted">
            Current stock: <span className="font-bold text-navy-900">{selectedProd?.stock} units</span> (SKU: {selectedProd?.sku})
          </p>

          <Input
            label="Stock Change Quantity (+ to add, - to subtract)"
            type="number"
            value={adjustQty}
            onChange={(e) => setAdjustQty(Number(e.target.value))}
            required
          />

          <div className="flex flex-col gap-1.5">
            <label className="font-semibold text-navy-900">Reason for Stock Adjustment</label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="h-9 px-3 bg-surface-bg border border-border rounded-[7px] text-xs font-semibold text-navy-900 focus:outline-none focus:border-blue-brand"
            >
              <option value="Supplier Shipment Received">Supplier Shipment Received</option>
              <option value="Warehouse Inventory Audit">Warehouse Inventory Audit</option>
              <option value="Damaged Stock Removal">Damaged Stock Removal</option>
              <option value="Trade Order Return">Trade Order Return</option>
            </select>
          </div>
        </form>
      </Modal>
    </div>
  );
}
