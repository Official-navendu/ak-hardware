'use client';

import React, { useState } from 'react';
import { Star, Check, X, Trash2 } from 'lucide-react';
import { useAdminContext } from '@/lib/context/admin-context';
import { Review } from '@/types/review';
import { AdminPageHeader } from '@/components/admin/ui/AdminPageHeader';
import { AdminCard } from '@/components/admin/ui/AdminCard';
import { AdminBadge } from '@/components/admin/ui/AdminBadge';
import { AdminActionMenu } from '@/components/admin/ui/AdminActionMenu';
import { AdminToast } from '@/components/admin/ui/AdminToast';
import { Modal } from '@/components/ui/Modal';

export default function AdminReviewsPage() {
  const { reviews, updateReviewStatus, deleteReview } = useAdminContext();
  const [filterStatus, setFilterStatus] = useState<'all' | 'published' | 'pending' | 'rejected'>('all');
  const [deleteCandidate, setDeleteCandidate] = useState<Review | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const filtered = reviews.filter((r) => {
    if (filterStatus !== 'all' && r.status !== filterStatus) return false;
    return true;
  });

  const handleDeleteConfirm = () => {
    if (deleteCandidate) {
      deleteReview(deleteCandidate.id);
      setToastMessage(`Deleted review by ${deleteCandidate.userName}.`);
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
        title="Customer Reviews"
        description="Operational moderation queue for customer submitted product feedback."
        breadcrumbs={[{ label: 'Marketing', href: '/ashish/coupons' }, { label: 'Reviews' }]}
      />

      {/* FILTER TABS */}
      <AdminCard noPadding>
        <div className="p-4 flex items-center justify-between gap-4 border-b border-border bg-white">
          <div className="flex items-center gap-1.5">
            {(['all', 'published', 'pending', 'rejected'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setFilterStatus(tab)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-[6px] capitalize transition-colors ${
                  filterStatus === tab
                    ? 'bg-navy-900 text-white'
                    : 'bg-surface-bg text-text-secondary border border-border hover:bg-slate-100'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <span className="text-xs font-mono font-medium text-text-muted">Total Reviews: {reviews.length}</span>
        </div>

        {/* REVIEWS TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-border text-text-muted uppercase text-[11px] tracking-wider bg-surface-bg">
                <th className="py-3 px-4">Reviewer</th>
                <th className="py-3 px-4">Product Name</th>
                <th className="py-3 px-4">Rating</th>
                <th className="py-3 px-4">Comment Snippet</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Moderation Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((rev) => (
                <tr key={rev.id} className="hover:bg-slate-50/80 transition-colors h-[54px]">
                  <td className="py-2.5 px-4 font-bold text-navy-900">{rev.userName}</td>
                  <td className="py-2.5 px-4 font-medium text-text-secondary max-w-xs truncate">{rev.productName}</td>
                  <td className="py-2.5 px-4">
                    <div className="flex text-amber-500 gap-0.5">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-current" />
                      ))}
                    </div>
                  </td>
                  <td className="py-2.5 px-4 max-w-sm truncate">
                    <span className="font-semibold text-navy-900">{rev.title}: </span>
                    <span className="text-text-muted">{rev.comment}</span>
                  </td>
                  <td className="py-2.5 px-4">
                    <AdminBadge
                      variant={
                        rev.status === 'published'
                          ? 'delivered'
                          : rev.status === 'pending'
                          ? 'warning'
                          : 'cancelled'
                      }
                      size="sm"
                    >
                      {rev.status.toUpperCase()}
                    </AdminBadge>
                  </td>
                  <td className="py-2.5 px-4 text-right">
                    <AdminActionMenu
                      items={[
                        {
                          label: 'Approve & Publish',
                          icon: <Check className="h-3.5 w-3.5 text-emerald-600" />,
                          onClick: () => {
                            updateReviewStatus(rev.id, 'published');
                            setToastMessage(`Approved review by ${rev.userName}.`);
                          },
                        },
                        {
                          label: 'Reject Review',
                          icon: <X className="h-3.5 w-3.5 text-amber-600" />,
                          onClick: () => {
                            updateReviewStatus(rev.id, 'rejected');
                            setToastMessage(`Rejected review by ${rev.userName}.`);
                          },
                        },
                        {
                          label: 'Delete Review',
                          variant: 'danger',
                          icon: <Trash2 className="h-3.5 w-3.5 text-red-600" />,
                          onClick: () => setDeleteCandidate(rev),
                        },
                      ]}
                    />
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-text-muted text-xs">
                    No reviews match current moderation filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </AdminCard>

      {/* DELETE MODAL */}
      <Modal
        isOpen={!!deleteCandidate}
        onClose={() => setDeleteCandidate(null)}
        title="Delete Review"
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
          Are you sure you want to permanently delete this review submitted by <strong className="font-bold">{deleteCandidate?.userName}</strong>?
        </p>
      </Modal>
    </div>
  );
}
