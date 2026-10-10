'use client';

import React, { useState } from 'react';
import { Plus, Power, Trash2 } from 'lucide-react';
import { useAdminContext, Coupon } from '@/lib/context/admin-context';
import { AdminPageHeader } from '@/components/admin/ui/AdminPageHeader';
import { AdminCard } from '@/components/admin/ui/AdminCard';
import { AdminBadge } from '@/components/admin/ui/AdminBadge';
import { AdminActionMenu } from '@/components/admin/ui/AdminActionMenu';
import { AdminToast } from '@/components/admin/ui/AdminToast';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';

export default function AdminCouponsPage() {
  const { coupons, addCoupon, toggleCouponStatus, deleteCoupon } = useAdminContext();
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteCandidate, setDeleteCandidate] = useState<Coupon | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [code, setCode] = useState('');
  const [discount, setDiscount] = useState('10%');
  const [limit, setLimit] = useState('500 uses');
  const [expiry, setExpiry] = useState('2026-12-31');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;
    addCoupon({
      code,
      discount,
      limit,
      expiry,
    });
    setToastMessage(`Created coupon code: ${code.toUpperCase()}`);
    setCode('');
    setModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    if (deleteCandidate) {
      deleteCoupon(deleteCandidate.id);
      setToastMessage(`Deleted coupon ${deleteCandidate.code}.`);
      setDeleteCandidate(null);
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-[1440px] mx-auto">
      {toastMessage && (
        <AdminToast message={toastMessage} onClose={() => setToastMessage(null)} />
      )}

      {/* PAGE HEADER */}
      <AdminPageHeader
        title="Coupons &amp; Discounts"
        description="Manage promotional discount codes and trade contractor pricing rules."
        breadcrumbs={[{ label: 'Marketing', href: '/ashish/coupons' }, { label: 'Coupons' }]}
        primaryAction={
          <button
            onClick={() => setModalOpen(true)}
            className="h-9 px-3.5 bg-navy-900 text-white rounded-[7px] text-xs font-semibold hover:bg-navy-800 transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <Plus className="h-4 w-4 text-orange-brand" />
            <span>Create Coupon</span>
          </button>
        }
      />

      {/* COMPACT COUPONS TABLE */}
      <AdminCard noPadding>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-border text-text-muted uppercase text-[11px] tracking-wider bg-surface-bg">
                <th className="py-3 px-4">Coupon Code</th>
                <th className="py-3 px-4">Discount Value</th>
                <th className="py-3 px-4">Usage Limit</th>
                <th className="py-3 px-4">Expiry Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {coupons.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50/80 transition-colors h-[54px]">
                  <td className="py-2.5 px-4 font-mono font-bold text-navy-900">{c.code}</td>
                  <td className="py-2.5 px-4 font-bold text-emerald-700">{c.discount}</td>
                  <td className="py-2.5 px-4 text-text-secondary">{c.limit}</td>
                  <td className="py-2.5 px-4 text-text-muted font-mono">{c.expiry}</td>
                  <td className="py-2.5 px-4">
                    <AdminBadge variant={c.status === 'Active' ? 'delivered' : 'warning'} size="sm">
                      {c.status}
                    </AdminBadge>
                  </td>
                  <td className="py-2.5 px-4 text-right">
                    <AdminActionMenu
                      items={[
                        {
                          label: c.status === 'Active' ? 'Disable Code' : 'Enable Code',
                          icon: <Power className="h-3.5 w-3.5" />,
                          onClick: () => {
                            toggleCouponStatus(c.id);
                            setToastMessage(`Toggled ${c.code} status.`);
                          },
                        },
                        {
                          label: 'Delete Coupon',
                          variant: 'danger',
                          icon: <Trash2 className="h-3.5 w-3.5 text-red-600" />,
                          onClick: () => setDeleteCandidate(c),
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

      {/* CREATE MODAL */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Create Promotional Coupon"
        footer={
          <div className="flex gap-2 justify-end">
            <button
              onClick={() => setModalOpen(false)}
              className="px-3.5 h-9 bg-white border border-border text-navy-900 rounded-[6px] text-xs font-semibold hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-3.5 h-9 bg-navy-900 text-white rounded-[6px] text-xs font-semibold hover:bg-navy-800 transition-colors"
            >
              Save Coupon
            </button>
          </div>
        }
      >
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <Input
            label="Coupon Code"
            placeholder="e.g. SUMMER20"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
          <Input
            label="Discount Value"
            placeholder="15% or ₹500"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            required
          />
          <Input
            label="Usage Limit"
            placeholder="500 uses / Trade Only"
            value={limit}
            onChange={(e) => setLimit(e.target.value)}
          />
          <Input
            label="Expiry Date"
            type="date"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
            required
          />
        </form>
      </Modal>

      {/* DELETE MODAL */}
      <Modal
        isOpen={!!deleteCandidate}
        onClose={() => setDeleteCandidate(null)}
        title="Delete Coupon Code"
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
          Are you sure you want to delete coupon code <strong className="font-mono font-bold">{deleteCandidate?.code}</strong>?
        </p>
      </Modal>
    </div>
  );
}
