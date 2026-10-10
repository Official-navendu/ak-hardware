'use client';

import React, { useState } from 'react';
import { Search, Eye } from 'lucide-react';
import { useAdminContext } from '@/lib/context/admin-context';
import { formatDate } from '@/lib/utils';
import { AdminPageHeader } from '@/components/admin/ui/AdminPageHeader';
import { AdminCard } from '@/components/admin/ui/AdminCard';
import { AdminBadge } from '@/components/admin/ui/AdminBadge';
import { AdminActionMenu } from '@/components/admin/ui/AdminActionMenu';
import { Modal } from '@/components/ui/Modal';

export default function AdminCustomersPage() {
  const { customers, orders } = useAdminContext();
  const [search, setSearch] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<typeof customers[0] | null>(null);

  const filtered = customers.filter((usr) => {
    if (search) {
      const q = search.toLowerCase();
      return usr.name.toLowerCase().includes(q) || usr.email.toLowerCase().includes(q);
    }
    return true;
  });

  const customerOrders = selectedCustomer
    ? orders.filter((o) => o.customerEmail.toLowerCase() === selectedCustomer.email.toLowerCase())
    : [];

  return (
    <div className="flex flex-col gap-6 max-w-[1440px] mx-auto">
      {/* PAGE HEADER */}
      <AdminPageHeader
        title="Customers"
        description="Directory of verified trade contractors and retail customer accounts."
        breadcrumbs={[{ label: 'Sales', href: '/ashish/orders' }, { label: 'Customers' }]}
      />

      {/* SEARCH BAR */}
      <AdminCard noPadding>
        <div className="p-4 flex flex-wrap items-center justify-between gap-4 border-b border-border bg-white">
          <div className="flex items-center gap-3 flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search customer name or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-9 pl-9 pr-3 bg-surface-bg border border-border rounded-[7px] text-xs text-navy-900 placeholder:text-text-muted focus:outline-none focus:border-blue-brand"
              />
            </div>
          </div>
          <span className="text-xs font-mono font-medium text-text-muted">
            Total Accounts: {customers.length}
          </span>
        </div>

        {/* HIGH DENSITY CUSTOMER TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-border text-text-muted uppercase text-[11px] tracking-wider bg-surface-bg">
                <th className="py-3 px-4">Customer Name</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Phone</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Joined Date</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((usr) => (
                <tr key={usr.id} className="hover:bg-slate-50/80 transition-colors h-[54px]">
                  <td className="py-2.5 px-4 font-bold text-navy-900">{usr.name}</td>
                  <td className="py-2.5 px-4 text-text-secondary">{usr.email}</td>
                  <td className="py-2.5 px-4 font-mono text-text-muted">{usr.phone || '7484034410'}</td>
                  <td className="py-2.5 px-4">
                    <AdminBadge variant={usr.role === 'admin' ? 'navy' : 'shipped'} size="sm">
                      {usr.role.toUpperCase()}
                    </AdminBadge>
                  </td>
                  <td className="py-2.5 px-4 text-text-muted">{formatDate(usr.createdAt)}</td>
                  <td className="py-2.5 px-4 text-right">
                    <AdminActionMenu
                      items={[
                        {
                          label: 'View Profile',
                          icon: <Eye className="h-3.5 w-3.5 text-blue-brand" />,
                          onClick: () => setSelectedCustomer(usr),
                        },
                      ]}
                    />
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-text-muted text-xs">
                    No customers found matching search query.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </AdminCard>

      {/* CUSTOMER DETAIL MODAL */}
      <Modal
        isOpen={!!selectedCustomer}
        onClose={() => setSelectedCustomer(null)}
        title={`Customer Account: ${selectedCustomer?.name}`}
        footer={
          <div className="flex justify-end">
            <button
              onClick={() => setSelectedCustomer(null)}
              className="px-3.5 h-9 bg-white border border-border text-navy-900 rounded-[6px] text-xs font-semibold hover:bg-slate-50 transition-colors"
            >
              Close Profile
            </button>
          </div>
        }
      >
        <div className="flex flex-col gap-4 text-xs">
          <div className="grid grid-cols-2 gap-3 p-3 bg-surface-bg border border-border rounded-[6px]">
            <div><span className="text-text-muted">Email:</span> <p className="font-bold text-navy-900">{selectedCustomer?.email}</p></div>
            <div><span className="text-text-muted">Phone:</span> <p className="font-bold text-navy-900">{selectedCustomer?.phone || '7484034410'}</p></div>
            <div><span className="text-text-muted">Account Tier:</span> <p className="font-bold text-orange-brand">Verified Trade Partner</p></div>
            <div><span className="text-text-muted">Joined Date:</span> <p className="font-bold text-navy-900">{selectedCustomer ? formatDate(selectedCustomer.createdAt) : ''}</p></div>
          </div>

          <h4 className="font-bold text-navy-900 text-xs border-b border-border pb-2">Recent Customer Orders</h4>
          <div className="flex flex-col gap-2">
            {customerOrders.map((o) => (
              <div key={o.id} className="p-2.5 bg-white border border-border rounded flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-bold font-mono text-navy-900">{o.orderNumber}</span>
                  <span className="text-[10px] text-text-muted">{formatDate(o.createdAt)}</span>
                </div>
                <AdminBadge variant="shipped" size="sm">{o.orderStatus}</AdminBadge>
              </div>
            ))}
            {customerOrders.length === 0 && (
              <p className="text-text-muted py-2">No past orders placed by this customer yet.</p>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
}
