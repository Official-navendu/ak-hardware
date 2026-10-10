'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Plus, Search, Filter, Edit, Trash2, Eye, RefreshCw } from 'lucide-react';
import { useAdminContext } from '@/lib/context/admin-context';
import { formatPrice } from '@/lib/utils';
import { Product } from '@/types/product';
import { AdminPageHeader } from '@/components/admin/ui/AdminPageHeader';
import { AdminCard } from '@/components/admin/ui/AdminCard';
import { AdminBadge } from '@/components/admin/ui/AdminBadge';
import { AdminActionMenu } from '@/components/admin/ui/AdminActionMenu';
import { AdminToast } from '@/components/admin/ui/AdminToast';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';

export default function AdminProductsPage() {
  const { products, deleteProduct, adjustProductStock, addProduct } = useAdminContext();

  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [stockFilter, setStockFilter] = useState<'All' | 'Low' | 'InStock'>('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const [deleteCandidate, setDeleteCandidate] = useState<Product | null>(null);
  const [stockModalProd, setStockModalProd] = useState<Product | null>(null);
  const [stockAddQty, setStockAddQty] = useState(10);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const filtered = products.filter((p) => {
    if (search) {
      const q = search.toLowerCase();
      if (!p.name.toLowerCase().includes(q) && !p.sku.toLowerCase().includes(q)) {
        return false;
      }
    }
    if (categoryFilter !== 'All' && p.category.toLowerCase() !== categoryFilter.toLowerCase()) {
      return false;
    }
    if (stockFilter === 'Low' && p.stock > (p.lowStockThreshold || 5)) return false;
    if (stockFilter === 'InStock' && p.stock <= 0) return false;
    if (statusFilter !== 'All' && p.status !== statusFilter) return false;
    return true;
  });

  const handleDeleteConfirm = () => {
    if (deleteCandidate) {
      deleteProduct(deleteCandidate.id);
      setToastMessage(`Product ${deleteCandidate.name} deleted successfully.`);
      setDeleteCandidate(null);
    }
  };

  const handleStockSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (stockModalProd) {
      adjustProductStock(stockModalProd.id, stockAddQty);
      setToastMessage(`Updated stock by ${stockAddQty} units for ${stockModalProd.name}.`);
      setStockModalProd(null);
    }
  };

  const handleDuplicate = (prod: Product) => {
    const now = new Date().toISOString();
    addProduct({
      name: `${prod.name} (Copy)`,
      slug: `${prod.slug}-copy`,
      sku: `${prod.sku}-COPY`,
      category: prod.category,
      brand: prod.brand,
      description: prod.description,
      shortDescription: prod.shortDescription,
      price: prod.price,
      salePrice: prod.salePrice,
      images: prod.images,
      stock: prod.stock,
      lowStockThreshold: prod.lowStockThreshold,
      status: 'active',
      rating: prod.rating,
      reviewCount: 0,
      featured: false,
      popular: false,
      trending: false,
      createdAt: now,
      updatedAt: now,
    });
    setToastMessage(`Duplicated product entry: ${prod.name}`);
  };

  return (
    <div className="flex flex-col gap-6 max-w-[1440px] mx-auto">
      {toastMessage && (
        <AdminToast message={toastMessage} onClose={() => setToastMessage(null)} />
      )}

      {/* PAGE HEADER */}
      <AdminPageHeader
        title="Products"
        description="Manage your hardware catalog, SKUs, pricing, and available inventory."
        breadcrumbs={[{ label: 'Catalog', href: '/ashish/products' }, { label: 'Products' }]}
        primaryAction={
          <Link href="/ashish/products/new">
            <button className="h-9 px-3.5 bg-navy-900 text-white rounded-[7px] text-xs font-semibold hover:bg-navy-800 transition-colors flex items-center gap-1.5 shadow-xs">
              <Plus className="h-4 w-4 text-orange-brand" />
              <span>Add Product</span>
            </button>
          </Link>
        }
      />

      {/* SEARCH & CONTROLS BAR */}
      <AdminCard noPadding>
        <div className="p-4 flex flex-wrap items-center justify-between gap-4 border-b border-border bg-white">
          <div className="flex items-center gap-3 flex-1 min-w-[240px] max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Filter by product name or SKU..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-9 pl-9 pr-3 bg-surface-bg border border-border rounded-[7px] text-xs text-navy-900 placeholder:text-text-muted focus:outline-none focus:border-blue-brand"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="h-9 px-3 bg-surface-bg border border-border rounded-[7px] text-xs font-medium text-navy-900 focus:outline-none focus:border-blue-brand"
            >
              <option value="All">All Categories</option>
              <option value="Power Tools">Power Tools</option>
              <option value="Hand Tools">Hand Tools</option>
              <option value="Pipes & Fittings">Pipes &amp; Fittings</option>
              <option value="Sanitaryware">Sanitaryware</option>
              <option value="Electrical">Electrical</option>
              <option value="Fasteners">Fasteners</option>
            </select>

            <select
              value={stockFilter}
              onChange={(e) => setStockFilter(e.target.value as any)}
              className="h-9 px-3 bg-surface-bg border border-border rounded-[7px] text-xs font-medium text-navy-900 focus:outline-none focus:border-blue-brand"
            >
              <option value="All">All Stock Levels</option>
              <option value="Low">Low Stock Alerts</option>
              <option value="InStock">In Stock</option>
            </select>

            <span className="text-xs font-mono font-medium text-text-muted pl-2 border-l border-border">
              {filtered.length} of {products.length} SKUs
            </span>
          </div>
        </div>

        {/* HIGH DENSITY TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-border text-text-muted uppercase text-[11px] tracking-wider bg-surface-bg">
                <th className="py-3 px-4 w-12">Media</th>
                <th className="py-3 px-4">Product Name</th>
                <th className="py-3 px-4">SKU</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4">Stock</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((prod) => {
                const isLow = prod.stock <= (prod.lowStockThreshold || 5);
                return (
                  <tr key={prod.id} className="hover:bg-slate-50/80 transition-colors h-[54px]">
                    <td className="py-2 px-4">
                      <div className="relative h-9 w-9 bg-surface-bg border border-border rounded-[6px] overflow-hidden flex-shrink-0">
                        <Image
                          src={prod.images[0] || '/assets/products/prod-rotary-hammer.svg'}
                          alt={prod.name}
                          fill
                          className="object-contain p-1"
                        />
                      </div>
                    </td>
                    <td className="py-2 px-4 font-semibold text-navy-900 max-w-xs truncate">{prod.name}</td>
                    <td className="py-2 px-4 font-mono text-text-muted text-[11px]">{prod.sku}</td>
                    <td className="py-2 px-4 font-medium text-text-secondary">{prod.category}</td>
                    <td className="py-2 px-4 font-bold text-navy-900">
                      {formatPrice(prod.salePrice ?? prod.price)}
                    </td>
                    <td className="py-2 px-4">
                      <div className="flex items-center gap-1.5">
                        {isLow ? (
                          <AdminBadge variant="warning" size="sm">
                            {prod.stock} Low
                          </AdminBadge>
                        ) : (
                          <AdminBadge variant="delivered" size="sm">
                            {prod.stock} units
                          </AdminBadge>
                        )}
                        <button
                          onClick={() => setStockModalProd(prod)}
                          className="p-1 text-text-muted hover:text-navy-900 rounded hover:bg-slate-100"
                          title="Adjust Stock"
                        >
                          <RefreshCw className="h-3 w-3" />
                        </button>
                      </div>
                    </td>
                    <td className="py-2 px-4">
                      <AdminBadge variant={prod.status === 'active' ? 'shipped' : 'default'} size="sm">
                        {prod.status === 'active' ? 'Active' : 'Draft'}
                      </AdminBadge>
                    </td>
                    <td className="py-2 px-4 text-right">
                      <AdminActionMenu
                        items={[
                          {
                            label: 'Edit SKU',
                            icon: <Edit className="h-3.5 w-3.5" />,
                            onClick: () => {
                              window.location.href = `/ashish/products/${prod.id}`;
                            },
                          },
                          {
                            label: 'Duplicate',
                            icon: <RefreshCw className="h-3.5 w-3.5" />,
                            onClick: () => handleDuplicate(prod),
                          },
                          {
                            label: 'Delete',
                            variant: 'danger',
                            icon: <Trash2 className="h-3.5 w-3.5 text-red-600" />,
                            onClick: () => setDeleteCandidate(prod),
                          },
                        ]}
                      />
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-text-muted text-xs">
                    No hardware products match the current filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </AdminCard>

      {/* DELETE CONFIRMATION MODAL */}
      <Modal
        isOpen={!!deleteCandidate}
        onClose={() => setDeleteCandidate(null)}
        title="Delete Product SKU"
        footer={
          <div className="flex gap-2 justify-end">
            <button
              onClick={() => setDeleteCandidate(null)}
              className="px-3.5 h-9 bg-white border border-border text-navy-900 rounded-[6px] text-xs font-semibold hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteConfirm}
              className="px-3.5 h-9 bg-red-600 text-white rounded-[6px] text-xs font-semibold hover:bg-red-700 transition-colors"
            >
              Confirm Delete
            </button>
          </div>
        }
      >
        <p className="text-xs text-navy-900 leading-relaxed">
          Are you sure you want to permanently remove <strong className="font-bold">{deleteCandidate?.name}</strong> (SKU: {deleteCandidate?.sku}) from the store catalog?
        </p>
      </Modal>

      {/* STOCK ADJUSTMENT MODAL */}
      <Modal
        isOpen={!!stockModalProd}
        onClose={() => setStockModalProd(null)}
        title={`Adjust Stock: ${stockModalProd?.name}`}
        footer={
          <div className="flex gap-2 justify-end">
            <button
              onClick={() => setStockModalProd(null)}
              className="px-3.5 h-9 bg-white border border-border text-navy-900 rounded-[6px] text-xs font-semibold hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleStockSubmit}
              className="px-3.5 h-9 bg-navy-900 text-white rounded-[6px] text-xs font-semibold hover:bg-navy-800 transition-colors"
            >
              Update Stock
            </button>
          </div>
        }
      >
        <form onSubmit={handleStockSubmit} className="flex flex-col gap-4 text-xs">
          <p className="text-text-muted">
            Current available stock: <span className="font-bold text-navy-900">{stockModalProd?.stock} units</span>
          </p>
          <Input
            label="Quantity to Add (+) or Subtract (-)"
            type="number"
            value={stockAddQty}
            onChange={(e) => setStockAddQty(Number(e.target.value))}
            required
          />
        </form>
      </Modal>
    </div>
  );
}
