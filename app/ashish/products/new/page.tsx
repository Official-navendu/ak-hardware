'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Save, Upload, Package } from 'lucide-react';
import { OFFICIAL_CATEGORIES } from '@/lib/data/mock-categories';
import { useAdminContext } from '@/lib/context/admin-context';
import { AdminPageHeader } from '@/components/admin/ui/AdminPageHeader';
import { AdminCard } from '@/components/admin/ui/AdminCard';
import { AdminToast } from '@/components/admin/ui/AdminToast';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Checkbox } from '@/components/ui/Checkbox';
import { Product } from '@/types/product';

export default function AdminNewProductPage() {
  const router = useRouter();
  const { products, addProduct } = useAdminContext();
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [duplicateMatch, setDuplicateMatch] = useState<{ type: 'sku' | 'name'; product: Product } | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    category: OFFICIAL_CATEGORIES[0]?.name || 'Power Tools',
    brand: 'AK Industrial',
    description: '',
    shortDescription: '',
    price: 4999,
    salePrice: 4299,
    stock: 25,
    lowStockThreshold: 5,
    status: 'active' as 'active' | 'draft',
    isFeatured: true,
    isPopular: true,
    isTrending: false,
    images: ['/assets/products/prod-rotary-hammer.svg'],
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

  const saveProductRecord = () => {
    const now = new Date().toISOString();
    addProduct({
      name: formData.name,
      slug: formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      sku: formData.sku || `AK-SKU-${Date.now().toString().slice(-4)}`,
      category: formData.category,
      brand: formData.brand,
      description: formData.description || formData.shortDescription || 'High quality hardware equipment by AK Hardware.',
      shortDescription: formData.shortDescription || formData.name,
      price: Number(formData.price),
      salePrice: formData.salePrice ? Number(formData.salePrice) : undefined,
      images: formData.images.length > 0 ? formData.images : ['/assets/products/prod-rotary-hammer.svg'],
      stock: Number(formData.stock),
      lowStockThreshold: Number(formData.lowStockThreshold),
      status: formData.status,
      rating: 4.8,
      reviewCount: 0,
      featured: formData.isFeatured,
      popular: formData.isPopular,
      trending: formData.isTrending,
      createdAt: now,
      updatedAt: now,
    });

    setToastMessage(`Product "${formData.name}" created successfully.`);
    setTimeout(() => {
      router.push('/ashish/products');
    }, 1000);
  };

  const handleSubmit = (e: React.FormEvent, skipCheck: boolean = false) => {
    if (e) e.preventDefault();
    if (!formData.name.trim()) return;

    if (!skipCheck) {
      const inputSku = formData.sku.trim().toLowerCase();
      const inputName = formData.name.trim().toLowerCase();

      // Check for SKU duplicate match
      if (inputSku) {
        const skuMatch = products.find((p) => p.sku.trim().toLowerCase() === inputSku);
        if (skuMatch) {
          setDuplicateMatch({ type: 'sku', product: skuMatch });
          return;
        }
      }

      // Check for exact/normalized product name duplicate match
      const nameMatch = products.find((p) => p.name.trim().toLowerCase() === inputName);
      if (nameMatch) {
        setDuplicateMatch({ type: 'name', product: nameMatch });
        return;
      }
    }

    saveProductRecord();
  };

  return (
    <div className="flex flex-col gap-6 max-w-[1440px] mx-auto">
      {toastMessage && (
        <AdminToast message={toastMessage} onClose={() => setToastMessage(null)} />
      )}

      {/* PAGE HEADER */}
      <AdminPageHeader
        title="Add Hardware SKU"
        description="Create a new product entry in the AK Hardware store catalog."
        breadcrumbs={[
          { label: 'Catalog', href: '/ashish/products' },
          { label: 'Products', href: '/ashish/products' },
          { label: 'New Product' },
        ]}
      />

      {/* 2-COLUMN CMS LAYOUT: LEFT (68%) / RIGHT (32%) */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN (68%): MAIN CONTENT & MEDIA */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <AdminCard title="Product Information" description="Basic identification and details">
            <div className="flex flex-col gap-4 text-xs">
              <Input
                label="Product Title"
                placeholder="e.g. 20V Cordless Rotary Hammer Drill"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <Textarea
                label="Short Excerpt Summary"
                placeholder="Brief summary snippet for product cards and search snippets..."
                value={formData.shortDescription}
                onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                rows={2}
              />
              <Textarea
                label="Full Detailed Specifications & Description"
                placeholder="Complete technical specifications, site usage, material quality, and warranty information..."
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
                <span>Save Hardware Product</span>
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
                placeholder="e.g. AK-HD-20V"
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
                placeholder="AK Industrial"
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

      {/* DUPLICATE PRODUCT WARNING MODAL */}
      <Modal
        isOpen={!!duplicateMatch}
        onClose={() => setDuplicateMatch(null)}
        title="Potential Duplicate Product Detected"
        footer={
          <div className="flex gap-2 justify-end">
            <button
              onClick={() => setDuplicateMatch(null)}
              className="px-3.5 h-9 bg-white border border-border text-navy-900 rounded-[6px] text-xs font-semibold hover:bg-slate-50 transition-colors"
            >
              Cancel &amp; Edit Form
            </button>
            <button
              onClick={() => {
                setDuplicateMatch(null);
                saveProductRecord();
              }}
              className="px-3.5 h-9 bg-[#FA3A08] text-white rounded-[6px] text-xs font-semibold hover:bg-[#d92e00] transition-colors"
            >
              Proceed &amp; Create Entry
            </button>
          </div>
        }
      >
        <div className="flex flex-col gap-3 text-xs text-navy-900">
          <p className="leading-relaxed">
            Warning: A product with matching <strong className="font-bold">{duplicateMatch?.type.toUpperCase()}</strong> already exists in the store catalog:
          </p>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-amber-900 flex flex-col gap-1">
            <span className="font-bold text-sm">{duplicateMatch?.product.name}</span>
            <span className="font-mono text-[11px] text-amber-800">SKU: {duplicateMatch?.product.sku} | Category: {duplicateMatch?.product.category}</span>
            <span className="text-[11px] text-amber-800">Price: ₹{duplicateMatch?.product.price} | Stock: {duplicateMatch?.product.stock} units</span>
          </div>
          <p className="text-text-muted leading-relaxed">
            If this item is a variant (size, color, weight) of an existing product, consider adding variants directly to the existing product instead of creating a duplicate root record.
          </p>
        </div>
      </Modal>
    </div>
  );
}
