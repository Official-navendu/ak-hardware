'use client';

import React, { useState } from 'react';
import { Mail, Trash2, Search } from 'lucide-react';
import { useAdminContext, Subscriber } from '@/lib/context/admin-context';
import { AdminPageHeader } from '@/components/admin/ui/AdminPageHeader';
import { AdminCard } from '@/components/admin/ui/AdminCard';
import { AdminBadge } from '@/components/admin/ui/AdminBadge';
import { AdminActionMenu } from '@/components/admin/ui/AdminActionMenu';
import { AdminToast } from '@/components/admin/ui/AdminToast';
import { Modal } from '@/components/ui/Modal';

export default function AdminNewsletterPage() {
  const { subscribers, removeSubscriber } = useAdminContext();
  const [search, setSearch] = useState('');
  const [deleteCandidate, setDeleteCandidate] = useState<Subscriber | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const filtered = subscribers.filter((sub) => {
    if (search) {
      return sub.email.toLowerCase().includes(search.toLowerCase());
    }
    return true;
  });

  const handleDeleteConfirm = () => {
    if (deleteCandidate) {
      removeSubscriber(deleteCandidate.email);
      setToastMessage(`Removed ${deleteCandidate.email} from mailing list.`);
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
        title="Newsletter Subscribers"
        description="Mailing list directory of contractor and trade accounts subscribed to hardware announcements."
        breadcrumbs={[{ label: 'Marketing', href: '/ashish/coupons' }, { label: 'Newsletter' }]}
      />

      {/* SEARCH BAR */}
      <AdminCard noPadding>
        <div className="p-4 flex flex-wrap items-center justify-between gap-4 border-b border-border bg-white">
          <div className="flex items-center gap-3 flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search subscriber email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-9 pl-9 pr-3 bg-surface-bg border border-border rounded-[7px] text-xs text-navy-900 placeholder:text-text-muted focus:outline-none focus:border-blue-brand"
              />
            </div>
          </div>
          <span className="text-xs font-mono font-medium text-text-muted">Total Subscribers: {subscribers.length}</span>
        </div>

        {/* SUBSCRIBERS TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-border text-text-muted uppercase text-[11px] tracking-wider bg-surface-bg">
                <th className="py-3 px-4">Subscriber Email</th>
                <th className="py-3 px-4">Subscription Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((sub, i) => (
                <tr key={i} className="hover:bg-slate-50/80 transition-colors h-[54px]">
                  <td className="py-2.5 px-4 font-bold text-navy-900">{sub.email}</td>
                  <td className="py-2.5 px-4 text-text-muted font-mono">{sub.date}</td>
                  <td className="py-2.5 px-4">
                    <AdminBadge variant="delivered" size="sm">{sub.status}</AdminBadge>
                  </td>
                  <td className="py-2.5 px-4 text-right">
                    <AdminActionMenu
                      items={[
                        {
                          label: 'Remove Subscriber',
                          variant: 'danger',
                          icon: <Trash2 className="h-3.5 w-3.5 text-red-600" />,
                          onClick: () => setDeleteCandidate(sub),
                        },
                      ]}
                    />
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-12 text-center text-text-muted text-xs">
                    No subscribers match search query.
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
        title="Remove Subscriber"
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
              Confirm Remove
            </button>
          </div>
        }
      >
        <p className="text-xs text-navy-900 leading-relaxed">
          Are you sure you want to remove <strong className="font-bold">{deleteCandidate?.email}</strong> from the newsletter subscriber list?
        </p>
      </Modal>
    </div>
  );
}
