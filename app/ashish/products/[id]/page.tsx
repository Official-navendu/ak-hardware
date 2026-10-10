'use client';

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Save, Trash2, ExternalLink, Upload } from 'lucide-react';
import { OFFICIAL_CATEGORIES } from '@/lib/data/mock-categories';
import { useAdminContext } from '@/lib/context/admin-context';
import { AdminPageHeader } from '@/components/admin/ui/AdminPageHeader';
import { AdminCard } from '@/components/admin/ui/AdminCard';
import { AdminToast } from '@/components/admin/ui/AdminToast';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Checkbox } from '@/components/ui/Checkbox';
import { Modal } from '@/components/ui/Modal';

export default function AdminEditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { products, updateProduct, deleteProduct } = useAdminContext();
  const product = products.find((p) => p.id === id) || products[0];

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: product?.name || '',
    sku: product?.sku || '',
    category: product?.category || OFFICIAL_CATEGORIES[0]?.name,
    brand: product?.brand || 'AK Industrial',
    description: product?.description || '',
    shortDescription: product?.shortDescription || '',
    price: product?.price || 0,
    salePrice: product?.salePrice || 0,
    stock: product?.stock || 0,
    lowStockThreshold: product?.lowStockThreshold || 5,
    status: (product?.status || 'active') as 'active' | 'draft',
    isFeatured: product?.featured ?? true,
    isPopular: product?.popular ?? true,
    isTrending: product?.trending ?? false,
    images: product?.images?.length ? product.images : ['/assets/products/prod-rotary-hammer.svg'],
  });

  const [newAssetUrl, setNewAssetUrl] = useState('/assets/products/prod-angle-grinder.svg');

  const handleAddImage = () => {
    if (newAssetUrl && !formData.images.includes(newAssetUrl)) {
      setFormData((prev) => ({ ...prev, images: [...prev.images, newAssetUrl] }));
    }
  };

  const handleSetMainImage = (index: number) => {
    if (index === 0) return;
    const updated = [...formData.images];
    const [selected] = updated.splice(index, 1);
    updated.unshift(selected);
    setFormData((prev) => ({ ...prev, images: updated }));
  };

  const handleRemoveImage = (index: number) => {
    if (formData.images.length <= 1) return;
    const updated = formData.images.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, images: updated }));
  };

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        sku: product.sku,
        category: product.category,
        brand: product.brand,
        description: product.description,
        shortDescription: product.shortDescription,
        price: product.price,
        salePrice: product.salePrice || 0,
        stock: product.stock,
        lowStockThreshold: product.lowStockThreshold || 5,
        status: (product.status || 'active') as 'active' | 'draft',
        isFeatured: product.featured ?? true,
        isPopular: product.popular ?? true,
        isTrending: product.trending ?? false,
        images: product.images?.length ? product.images : ['/assets/products/prod-rotary-hammer.svg'],
      });
    }
  }, [product]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (product) {
      updateProduct(product.id, {
        name: formData.name,
        sku: formData.sku,
        category: formData.category,
        brand: formData.brand,
        description: formData.description,
        shortDescription: formData.shortDescription,
        price: Number(formData.price),
        salePrice: formData.salePrice ? Number(formData.salePrice) : undefined,
        images: formData.images,
        stock: Number(formData.stock),
        lowStockThreshold: Number(formData.lowStockThreshold),
        status: formData.status,
        featured: formData.isFeatured,
        popular: formData.isPopular,
        trending: formData.isTrending,
        updatedAt: new Date().toISOString(),
      });

      setToastMessage(`Product "${formData.name}" updated successfully.`);
      setTimeout(() => {
        router.push('/ashish/products');
      }, 1000);
    }
  };

  const handleDelete = () => {
    if (product) {
      deleteProduct(product.id);
      setToastMessage(`Product ${product.name} deleted.`);
      setTimeout(() => {
        router.push('/ashish/products');
      }, 1000);
    }
  };

  if (!product) {
    return (
      <div className="p-12 text-center text-xs text-text-muted max-w-[1440px] mx-auto">
        Product not found in catalog. <Link href="/ashish/products" className="text-blue-brand font-bold underline">Return to catalog</Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 max-w-[1440px] mx-auto">
      {toastMessage && (
        <AdminToast message={toastMessage} onClose={() => setToastMessage(null)} />
      )}

      {/* PAGE HEADER */}
      <AdminPageHeader
        title={`Edit Product: ${product.name}`}
        description={`SKU: ${product.sku} • Internal ID: ${product.id}`}
        breadcrumbs={[
          { label: 'Catalog', href: '/ashish/products' },
          { label: 'Products', href: '/ashish/products' },
          { label: product.name },
        ]}
        secondaryActions={
          <button
            type="button"
            onClick={() => setDeleteModalOpen(true)}
            className="h-9 px-3 bg-white border border-red-200 text-red-600 rounded-[7px] text-xs font-semibold hover:bg-red-50 transition-colors flex items-center gap-1.5"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span>Delete SKU</span>
          </button>
        }
      />

      {/* 2-COLUMN CMS LAYOUT: LEFT (68%) / RIGHT (32%) */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN (68%): MAIN CONTENT & MEDIA */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <AdminCard title="Product Details" description="Basic identification and specification parameters">
            <div className="flex flex-col gap-4 text-xs">
              <Input
                label="Product Title"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <Textarea
                label="Short Excerpt Summary"
                value={formData.shortDescription}
                onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                rows={2}
              />
              <Textarea
                label="Full Specifications & Details"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={6}
              />
            </div>
          </AdminCard>

          <AdminCard title="Product Media & Gallery" description="Manage primary image and gallery photos">
            <div className="flex flex-col gap-4 text-xs">
              {/* IMAGE GALLERY GRID */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {formData.images.map((img, idx) => (
                  <div key={idx} className="relative group border border-border rounded-[8px] p-2 bg-white flex flex-col items-center gap-2">
                    <div className="relative h-24 w-full bg-surface-bg rounded-[6px] overflow-hidden">
                      <Image src={img} alt={`Asset ${idx}`} fill className="object-contain p-2" />
                    </div>
                    {idx === 0 ? (
                      <span className="text-[10px] font-mono font-bold bg-navy-900 text-white px-2 py-0.5 rounded">
                        MAIN IMAGE
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono text-text-muted">
                        Gallery #{idx}
                      </span>
                    )}

                    <div className="flex items-center gap-1 w-full pt-1 border-t border-border">
                      {idx !== 0 && (
                        <button
                          type="button"
                          onClick={() => handleSetMainImage(idx)}
                          className="flex-1 py-1 text-[10px] font-semibold bg-surface-bg text-blue-brand hover:bg-blue-brand hover:text-white rounded transition-colors"
                        >
                          Set Main
                        </button>
                      )}
                      {formData.images.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(idx)}
                          className="px-2 py-1 text-[10px] font-semibold bg-surface-bg text-red-600 hover:bg-red-600 hover:text-white rounded transition-colors"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* ADD NEW IMAGE SELECTOR */}
              <div className="flex flex-col sm:flex-row items-center gap-2 pt-3 border-t border-border">
                <div className="flex-1 w-full">
                  <Input
                    placeholder="Enter asset image URL or path"
                    value={newAssetUrl}
                    onChange={(e) => setNewAssetUrl(e.target.value)}
                  />
                </div>
                <button
                  type="button"
                  onClick={handleAddImage}
                  className="w-full sm:w-auto h-9 px-4 bg-navy-900 text-white rounded-[7px] font-semibold hover:bg-navy-800 transition-colors flex items-center justify-center gap-1 flex-shrink-0"
                >
                  <Upload className="h-3.5 w-3.5 text-orange-brand" />
                  <span>+ Add Image</span>
                </button>
              </div>
            </div>
          </AdminCard>
        </div>

        {/* RIGHT COLUMN (32%): PUBLISH, PRICING, INVENTORY & ORGANIZATION */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* PUBLISHING STATUS CARD */}
          <AdminCard title="Publishing Status">
            <div className="flex flex-col gap-4 text-xs">
              <div className="flex flex-col gap-1.5">
                <label className="font-semibold text-navy-900">Catalog Visibility</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  className="h-9 px-3 bg-surface-bg border border-border rounded-[7px] font-semibold text-navy-900 focus:outline-none focus:border-blue-brand"
                >
                  <option value="active">Active (Visible in Storefront)</option>
                  <option value="draft">Draft (Hidden in Admin Only)</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full h-10 bg-navy-900 text-white rounded-[7px] font-semibold hover:bg-navy-800 transition-colors flex items-center justify-center gap-2 shadow-xs mt-2"
              >
                <Save className="h-4 w-4 text-orange-brand" />
                <span>Save Changes</span>
              </button>
            </div>
          </AdminCard>

          {/* PRICING CARD */}
          <AdminCard title="Pricing & Offers">
            <div className="flex flex-col gap-4 text-xs">
              <Input
                label="Regular Price (₹)"
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                required
              />
              <Input
                label="Sale Offer Price (₹)"
                type="number"
                value={formData.salePrice}
                onChange={(e) => setFormData({ ...formData, salePrice: Number(e.target.value) })}
              />
            </div>
          </AdminCard>

          {/* INVENTORY CARD */}
          <AdminCard title="Inventory Tracking">
            <div className="flex flex-col gap-4 text-xs">
              <Input
                label="Model SKU"
                value={formData.sku}
                onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                required
              />
              <Input
                label="Available Stock Quantity"
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                required
              />
              <Input
                label="Low Stock Warning Threshold"
                type="number"
                value={formData.lowStockThreshold}
                onChange={(e) => setFormData({ ...formData, lowStockThreshold: Number(e.target.value) })}
                required
              />
            </div>
          </AdminCard>

          {/* ORGANIZATION CARD */}
          <AdminCard title="Catalog Placement">
            <div className="flex flex-col gap-4 text-xs">
              <div className="flex flex-col gap-1.5">
                <label className="font-semibold text-navy-900">Department Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="h-9 px-3 bg-surface-bg border border-border rounded-[7px] font-medium text-navy-900 focus:outline-none focus:border-blue-brand"
                >
                  {OFFICIAL_CATEGORIES.map((c) => (
                    <option key={c.name} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <Input
                label="Manufacturer Brand"
                value={formData.brand}
                onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                required
              />

              <div className="flex flex-col gap-2 pt-2 border-t border-border">
                <Checkbox
                  label="Featured Product on Homepage"
                  checked={formData.isFeatured}
                  onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                />
                <Checkbox
                  label="Popular Item Badge"
                  checked={formData.isPopular}
                  onChange={(e) => setFormData({ ...formData, isPopular: e.target.checked })}
                />
                <Checkbox
                  label="Trending Product"
                  checked={formData.isTrending}
                  onChange={(e) => setFormData({ ...formData, isTrending: e.target.checked })}
                />
              </div>
            </div>
          </AdminCard>
        </div>
      </form>

      {/* DELETE MODAL */}
      <Modal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Delete Product SKU"
        footer={
          <div className="flex gap-2 justify-end">
            <button
              type="button"
              onClick={() => setDeleteModalOpen(false)}
              className="px-3.5 h-9 bg-white border border-border text-navy-900 rounded-[6px] text-xs font-semibold hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="px-3.5 h-9 bg-red-600 text-white rounded-[6px] text-xs font-semibold hover:bg-red-700 transition-colors"
            >
              Confirm Delete
            </button>
          </div>
        }
      >
        <p className="text-xs text-navy-900 leading-relaxed">
          Are you sure you want to permanently delete <strong className="font-bold">{product.name}</strong> (SKU: {product.sku})?
        </p>
      </Modal>
    </div>
  );
}
