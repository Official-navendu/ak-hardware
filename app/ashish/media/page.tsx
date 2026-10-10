'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Upload, Copy, CheckCircle2, Eye } from 'lucide-react';
import { AdminPageHeader } from '@/components/admin/ui/AdminPageHeader';
import { AdminCard } from '@/components/admin/ui/AdminCard';
import { AdminToast } from '@/components/admin/ui/AdminToast';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';

export default function AdminMediaPage() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [previewAsset, setPreviewAsset] = useState<{ name: string; path: string; type: string } | null>(null);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const assets = [
    { name: 'ak-hardware-logo.png', path: '/assets/brand/ak-hardware-logo.png', type: 'Brand Logo' },
    { name: 'ak-hardware-mark.jpg', path: '/assets/brand/ak-hardware-mark.jpg', type: 'Brand Mark' },
    { name: 'hero-hardware.svg', path: '/assets/hero/hero-hardware.svg', type: 'Hero Graphics' },
    { name: 'sanitary.svg', path: '/assets/categories/sanitary.svg', type: 'Category Icon' },
    { name: 'power-tools.svg', path: '/assets/categories/power-tools.svg', type: 'Category Icon' },
    { name: 'fasteners.svg', path: '/assets/categories/fasteners.svg', type: 'Category Icon' },
    { name: 'prod-rotary-hammer.svg', path: '/assets/products/prod-rotary-hammer.svg', type: 'Product Asset' },
    { name: 'prod-angle-grinder.svg', path: '/assets/products/prod-angle-grinder.svg', type: 'Product Asset' },
    { name: 'prod-ball-valve.svg', path: '/assets/products/prod-ball-valve.svg', type: 'Product Asset' },
  ];

  const handleCopyPath = (path: string, index: number) => {
    navigator.clipboard.writeText(path);
    setCopiedIndex(index);
    setToastMessage(`Copied path: ${path}`);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setToastMessage('Asset uploaded successfully to local media directory.');
    setUploadModalOpen(false);
  };

  return (
    <div className="flex flex-col gap-6 max-w-[1440px] mx-auto">
      {toastMessage && (
        <AdminToast message={toastMessage} onClose={() => setToastMessage(null)} />
      )}

      {/* PAGE HEADER */}
      <AdminPageHeader
        title="Media Library"
        description="Local brand assets, category vector icons, and product photography library."
        breadcrumbs={[{ label: 'Content', href: '/ashish/blog' }, { label: 'Media' }]}
        primaryAction={
          <button
            onClick={() => setUploadModalOpen(true)}
            className="h-9 px-3.5 bg-navy-900 text-white rounded-[7px] text-xs font-semibold hover:bg-navy-800 transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <Upload className="h-4 w-4 text-orange-brand" />
            <span>Upload Asset</span>
          </button>
        }
      />

      {/* MEDIA GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {assets.map((ast, i) => (
          <div key={i} className="bg-white border border-border rounded-[10px] p-3 flex flex-col gap-2 shadow-[0_1px_2px_rgba(15,23,42,0.04)] group">
            <div className="relative aspect-[4/3] w-full bg-surface-bg rounded-[6px] border border-border overflow-hidden">
              <Image src={ast.path} alt={ast.name} fill className="object-contain p-2" />
              <div className="absolute inset-0 bg-navy-900/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-2">
                <button
                  onClick={() => setPreviewAsset(ast)}
                  className="p-1.5 bg-white text-navy-900 rounded-[6px] hover:bg-slate-100 transition-colors"
                  title="Preview Asset"
                >
                  <Eye className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleCopyPath(ast.path, i)}
                  className="p-1.5 bg-white text-navy-900 rounded-[6px] hover:bg-slate-100 transition-colors"
                  title="Copy Path"
                >
                  <Copy className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="flex flex-col text-xs">
              <span className="font-semibold text-navy-900 truncate" title={ast.name}>{ast.name}</span>
              <div className="flex items-center justify-between text-[10px] text-text-muted mt-0.5">
                <span>{ast.type}</span>
                {copiedIndex === i && <span className="text-emerald-700 font-semibold flex items-center gap-0.5"><CheckCircle2 className="h-3 w-3" /> Copied</span>}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* PREVIEW MODAL */}
      <Modal
        isOpen={!!previewAsset}
        onClose={() => setPreviewAsset(null)}
        title={`Media Preview: ${previewAsset?.name}`}
        footer={
          <div className="flex justify-end">
            <button
              onClick={() => setPreviewAsset(null)}
              className="px-3.5 h-9 bg-white border border-border text-navy-900 rounded-[6px] text-xs font-semibold hover:bg-slate-50 transition-colors"
            >
              Close
            </button>
          </div>
        }
      >
        <div className="flex flex-col items-center gap-4 text-xs">
          <div className="relative h-64 w-full bg-surface-bg border border-border rounded-[8px] overflow-hidden">
            {previewAsset && (
              <Image src={previewAsset.path} alt={previewAsset.name} fill className="object-contain p-4" />
            )}
          </div>
          <div className="w-full font-mono bg-surface-bg p-2.5 rounded border border-border text-navy-900 truncate text-[11px]">
            Path: {previewAsset?.path}
          </div>
        </div>
      </Modal>

      {/* UPLOAD MODAL */}
      <Modal
        isOpen={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        title="Upload Media Asset"
        footer={
          <div className="flex gap-2 justify-end">
            <button
              onClick={() => setUploadModalOpen(false)}
              className="px-3.5 h-9 bg-white border border-border text-navy-900 rounded-[6px] text-xs font-semibold hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleUploadSubmit}
              className="px-3.5 h-9 bg-navy-900 text-white rounded-[6px] text-xs font-semibold hover:bg-navy-800 transition-colors"
            >
              Upload Asset
            </button>
          </div>
        }
      >
        <form onSubmit={handleUploadSubmit} className="flex flex-col gap-4 text-xs">
          <Input label="Asset File Name" placeholder="e.g. prod-rotary-hammer-kit.png" required />
          <div className="border-2 border-dashed border-border rounded-[8px] p-8 text-center flex flex-col items-center gap-2 bg-surface-bg">
            <Upload className="h-8 w-8 text-slate-400" />
            <span className="font-semibold text-navy-900">Drag &amp; drop media files here</span>
            <span className="text-[10px] text-text-muted">Supports PNG, JPG, SVG, WebP up to 10MB</span>
          </div>
        </form>
      </Modal>
    </div>
  );
}
