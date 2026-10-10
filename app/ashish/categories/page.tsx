'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Plus, Edit2, Trash2, Tag, Layers, CheckCircle2, XCircle } from 'lucide-react';
import { useAdminContext } from '@/lib/context/admin-context';
import { Category, Subcategory } from '@/types/category';
import { AdminPageHeader } from '@/components/admin/ui/AdminPageHeader';
import { AdminCard } from '@/components/admin/ui/AdminCard';
import { AdminBadge } from '@/components/admin/ui/AdminBadge';
import { AdminActionMenu } from '@/components/admin/ui/AdminActionMenu';
import { AdminToast } from '@/components/admin/ui/AdminToast';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';

export default function AdminCategoriesPage() {
  const {
    categories,
    addCategory,
    updateCategory,
    deleteCategory,
    addSubcategory,
    updateSubcategory,
    deleteSubcategory,
  } = useAdminContext();

  // Category Modal State
  const [catModalOpen, setCatModalOpen] = useState(false);
  const [editCategory, setEditCategory] = useState<Category | null>(null);
  const [deleteCandidate, setDeleteCandidate] = useState<Category | null>(null);

  // Subcategory Modal State
  const [subModalOpen, setSubModalOpen] = useState(false);
  const [selectedParentId, setSelectedParentId] = useState<string>('cat-paint');
  const [editSubcategory, setEditSubcategory] = useState<Subcategory | null>(null);
  const [deleteSubCandidate, setDeleteSubCandidate] = useState<{ parentId: string; sub: Subcategory } | null>(null);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form Fields
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [isActive, setIsActive] = useState(true);

  // Open Parent Category Modal
  const handleOpenAddCat = () => {
    setEditCategory(null);
    setName('');
    setSlug('');
    setDescription('');
    setCatModalOpen(true);
  };

  const handleOpenEditCat = (cat: Category) => {
    setEditCategory(cat);
    setName(cat.name);
    setSlug(cat.slug);
    setDescription(cat.description || '');
    setCatModalOpen(true);
  };

  const handleCatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    if (editCategory) {
      updateCategory(editCategory.id, {
        name,
        slug: slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        description,
      });
      setToastMessage(`Updated category: ${name}`);
    } else {
      addCategory({
        name,
        slug: slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        description,
      });
      setToastMessage(`Created category: ${name}`);
    }
    setCatModalOpen(false);
  };

  // Open Subcategory Modal
  const handleOpenAddSub = (parentId?: string) => {
    setEditSubcategory(null);
    setSelectedParentId(parentId || categories[0]?.id || 'cat-paint');
    setName('');
    setSlug('');
    setDescription('');
    setIsActive(true);
    setSubModalOpen(true);
  };

  const handleOpenEditSub = (parentId: string, sub: Subcategory) => {
    setEditSubcategory(sub);
    setSelectedParentId(parentId);
    setName(sub.name);
    setSlug(sub.slug);
    setDescription(sub.description || '');
    setIsActive(sub.isActive ?? true);
    setSubModalOpen(true);
  };

  const handleSubSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !selectedParentId) return;

    const generatedSlug = slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    if (editSubcategory) {
      updateSubcategory(selectedParentId, editSubcategory.id, {
        name,
        slug: generatedSlug,
        description,
        isActive,
      });
      setToastMessage(`Updated subcategory: ${name}`);
    } else {
      addSubcategory(selectedParentId, {
        name,
        slug: generatedSlug,
        description,
        isActive,
      });
      setToastMessage(`Added subcategory: ${name}`);
    }
    setSubModalOpen(false);
  };

  const handleDeleteCatConfirm = () => {
    if (deleteCandidate) {
      deleteCategory(deleteCandidate.id);
      setToastMessage(`Deleted category: ${deleteCandidate.name}`);
      setDeleteCandidate(null);
    }
  };

  const handleDeleteSubConfirm = () => {
    if (deleteSubCandidate) {
      deleteSubcategory(deleteSubCandidate.parentId, deleteSubCandidate.sub.id);
      setToastMessage(`Deleted subcategory: ${deleteSubCandidate.sub.name}`);
      setDeleteSubCandidate(null);
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-[1440px] mx-auto pb-12">
      {toastMessage && (
        <AdminToast message={toastMessage} onClose={() => setToastMessage(null)} />
      )}

      {/* PAGE HEADER */}
      <AdminPageHeader
        title="Categories & Subcategories"
        description="Manage top-level hardware departments and nested subcategories for the AK Hardware storefront."
        breadcrumbs={[{ label: 'Catalog', href: '/ashish/products' }, { label: 'Categories' }]}
        primaryAction={
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleOpenAddSub('cat-paint')}
              className="h-9 px-3 bg-[#014A94] text-white rounded-[7px] text-xs font-semibold hover:bg-blue-800 transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <Plus className="h-4 w-4" />
              <span>Add Subcategory</span>
            </button>
            <button
              onClick={handleOpenAddCat}
              className="h-9 px-3.5 bg-navy-900 text-white rounded-[7px] text-xs font-semibold hover:bg-navy-800 transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <Plus className="h-4 w-4 text-orange-brand" />
              <span>Add Department</span>
            </button>
          </div>
        }
      />

      {/* MAIN CATEGORIES & SUBCATEGORIES TABLE */}
      <AdminCard noPadding>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-border text-text-muted uppercase text-[11px] tracking-wider bg-surface-bg">
                <th className="py-3 px-4 w-12">Icon</th>
                <th className="py-3 px-4">Department Name</th>
                <th className="py-3 px-4">Slug</th>
                <th className="py-3 px-4">Subcategories</th>
                <th className="py-3 px-4">Total Products</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {categories.map((cat) => (
                <React.Fragment key={cat.id}>
                  {/* PARENT CATEGORY ROW */}
                  <tr className="hover:bg-slate-50/80 transition-colors h-[54px] bg-white font-medium">
                    <td className="py-2 px-4">
                      <div className="relative h-9 w-9 bg-surface-bg border border-border rounded-[6px] overflow-hidden flex-shrink-0">
                        <Image
                          src={cat.image || '/assets/categories/hardware.svg'}
                          alt={cat.name}
                          fill
                          className="object-contain p-1"
                        />
                      </div>
                    </td>
                    <td className="py-2 px-4 font-bold text-navy-900 flex items-center gap-2">
                      <span>{cat.name}</span>
                      {cat.subcategories && cat.subcategories.length > 0 && (
                        <span className="text-[10px] bg-blue-50 text-[#014A94] border border-blue-200 px-2 py-0.5 rounded-full font-bold">
                          {cat.subcategories.length} subcategories
                        </span>
                      )}
                    </td>
                    <td className="py-2 px-4 font-mono text-text-muted text-[11px]">{cat.slug}</td>
                    <td className="py-2 px-4 text-text-secondary max-w-xs truncate">
                      {cat.subcategories && cat.subcategories.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {cat.subcategories.map((sub) => (
                            <span
                              key={sub.id}
                              className={`inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded border ${
                                sub.isActive !== false
                                  ? 'bg-slate-100 text-slate-800 border-slate-200'
                                  : 'bg-red-50 text-red-600 border-red-200 opacity-60'
                              }`}
                            >
                              <Tag className="h-2.5 w-2.5 text-[#014A94]" />
                              <span>{sub.name}</span>
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-slate-400 italic">No subcategories</span>
                      )}
                    </td>
                    <td className="py-2 px-4 font-bold text-blue-brand">{cat.productCount || 0} items</td>
                    <td className="py-2 px-4">
                      <AdminBadge variant="shipped" size="sm">Active</AdminBadge>
                    </td>
                    <td className="py-2 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => handleOpenAddSub(cat.id)}
                          title="Add Subcategory under this Department"
                          className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-[#014A94] rounded text-[11px] font-semibold flex items-center gap-1 transition-colors"
                        >
                          <Plus className="h-3 w-3" />
                          <span>Add Sub</span>
                        </button>
                        <AdminActionMenu
                          items={[
                            {
                              label: 'Edit Category',
                              icon: <Edit2 className="h-3.5 w-3.5" />,
                              onClick: () => handleOpenEditCat(cat),
                            },
                            {
                              label: 'Delete Category',
                              variant: 'danger',
                              icon: <Trash2 className="h-3.5 w-3.5 text-red-600" />,
                              onClick: () => setDeleteCandidate(cat),
                            },
                          ]}
                        />
                      </div>
                    </td>
                  </tr>

                  {/* SUBCATEGORIES SUB-ROWS */}
                  {cat.subcategories && cat.subcategories.length > 0 && cat.subcategories.map((sub) => (
                    <tr key={sub.id} className="bg-slate-50/50 hover:bg-slate-100/60 transition-colors text-xs">
                      <td className="py-2.5 px-4 text-center">
                        <span className="text-slate-300 font-bold">└</span>
                      </td>
                      <td className="py-2.5 px-4 pl-6 font-semibold text-slate-800 flex items-center gap-2">
                        <Tag className="h-3.5 w-3.5 text-[#014A94]" />
                        <span>{sub.name}</span>
                      </td>
                      <td className="py-2.5 px-4 font-mono text-slate-500 text-[11px]">
                        /categories/{cat.slug}/{sub.slug}
                      </td>
                      <td className="py-2.5 px-4 text-slate-600 text-[11px]">
                        {sub.description || 'Department subcategory'}
                      </td>
                      <td className="py-2.5 px-4 font-semibold text-slate-700">{sub.productCount || 0} items</td>
                      <td className="py-2.5 px-4">
                        {sub.isActive !== false ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                            <CheckCircle2 className="h-3 w-3" />
                            Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-red-600 bg-red-50 px-2 py-0.5 rounded-full border border-red-200">
                            <XCircle className="h-3 w-3" />
                            Inactive
                          </span>
                        )}
                      </td>
                      <td className="py-2.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => handleOpenEditSub(cat.id, sub)}
                            className="p-1 hover:bg-slate-200 rounded text-slate-600 transition-colors"
                            title="Edit Subcategory"
                          >
                            <Edit2 className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => setDeleteSubCandidate({ parentId: cat.id, sub })}
                            className="p-1 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded transition-colors"
                            title="Delete Subcategory"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </AdminCard>

      {/* ADD / EDIT PARENT CATEGORY MODAL */}
      <Modal
        isOpen={catModalOpen}
        onClose={() => setCatModalOpen(false)}
        title={editCategory ? `Edit Category: ${editCategory.name}` : 'Add Department Category'}
        footer={
          <div className="flex gap-2 justify-end">
            <button
              onClick={() => setCatModalOpen(false)}
              className="px-3.5 h-9 bg-white border border-border text-navy-900 rounded-[6px] text-xs font-semibold hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleCatSubmit}
              className="px-3.5 h-9 bg-navy-900 text-white rounded-[6px] text-xs font-semibold hover:bg-navy-800 transition-colors"
            >
              {editCategory ? 'Save Changes' : 'Save Category'}
            </button>
          </div>
        }
      >
        <form onSubmit={handleCatSubmit} className="flex flex-col gap-4 text-xs">
          <Input
            label="Department Name"
            placeholder="e.g. Sanitary Items"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (!editCategory) {
                setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
              }
            }}
            required
          />
          <Input
            label="Category Slug"
            placeholder="sanitary-items"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required
          />
          <Textarea
            label="Category Description"
            placeholder="Brief description of products included in this department..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
          />
        </form>
      </Modal>

      {/* ADD / EDIT SUBCATEGORY MODAL */}
      <Modal
        isOpen={subModalOpen}
        onClose={() => setSubModalOpen(false)}
        title={editSubcategory ? `Edit Subcategory: ${editSubcategory.name}` : 'Add New Subcategory'}
        footer={
          <div className="flex gap-2 justify-end">
            <button
              onClick={() => setSubModalOpen(false)}
              className="px-3.5 h-9 bg-white border border-border text-navy-900 rounded-[6px] text-xs font-semibold hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubSubmit}
              className="px-3.5 h-9 bg-[#014A94] text-white rounded-[6px] text-xs font-semibold hover:bg-blue-800 transition-colors"
            >
              {editSubcategory ? 'Save Subcategory' : 'Add Subcategory'}
            </button>
          </div>
        }
      >
        <form onSubmit={handleSubSubmit} className="flex flex-col gap-4 text-xs">
          <div>
            <label className="block text-xs font-semibold text-navy-900 mb-1">Parent Category</label>
            <select
              value={selectedParentId}
              onChange={(e) => setSelectedParentId(e.target.value)}
              className="w-full h-9 px-3 bg-white border border-border rounded-[6px] text-xs font-semibold text-navy-900 focus:outline-none focus:border-[#014A94]"
              required
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.slug})
                </option>
              ))}
            </select>
          </div>

          <Input
            label="Subcategory Name"
            placeholder="e.g. Interior Paint"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (!editSubcategory) {
                setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
              }
            }}
            required
          />

          <Input
            label="Subcategory Slug"
            placeholder="interior"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required
          />

          <Textarea
            label="Subcategory Description"
            placeholder="Detailed overview of products in this subcategory..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
          />

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="subActiveCheck"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="rounded text-[#014A94] focus:ring-0 h-4 w-4"
            />
            <label htmlFor="subActiveCheck" className="text-xs font-semibold text-navy-900 cursor-pointer">
              Active & Visible on Storefront
            </label>
          </div>
        </form>
      </Modal>

      {/* DELETE PARENT CATEGORY MODAL */}
      <Modal
        isOpen={!!deleteCandidate}
        onClose={() => setDeleteCandidate(null)}
        title="Delete Department Category"
        footer={
          <div className="flex gap-2 justify-end">
            <button
              onClick={() => setDeleteCandidate(null)}
              className="px-3.5 h-9 bg-white border border-border text-navy-900 rounded-[6px] text-xs font-semibold hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteCatConfirm}
              className="px-3.5 h-9 bg-red-600 text-white rounded-[6px] text-xs font-semibold hover:bg-red-700 transition-colors"
            >
              Confirm Delete
            </button>
          </div>
        }
      >
        <p className="text-xs text-navy-900 leading-relaxed">
          Are you sure you want to delete category <strong className="font-bold">{deleteCandidate?.name}</strong>?
        </p>
      </Modal>

      {/* DELETE SUBCATEGORY MODAL */}
      <Modal
        isOpen={!!deleteSubCandidate}
        onClose={() => setDeleteSubCandidate(null)}
        title="Delete Subcategory"
        footer={
          <div className="flex gap-2 justify-end">
            <button
              onClick={() => setDeleteSubCandidate(null)}
              className="px-3.5 h-9 bg-white border border-border text-navy-900 rounded-[6px] text-xs font-semibold hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteSubConfirm}
              className="px-3.5 h-9 bg-red-600 text-white rounded-[6px] text-xs font-semibold hover:bg-red-700 transition-colors"
            >
              Confirm Delete
            </button>
          </div>
        }
      >
        <p className="text-xs text-navy-900 leading-relaxed">
          Are you sure you want to delete subcategory <strong className="font-bold">{deleteSubCandidate?.sub.name}</strong>?
        </p>
      </Modal>
    </div>
  );
}
