'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Plus, Edit2, Trash2, Eye, Power } from 'lucide-react';
import { useAdminContext } from '@/lib/context/admin-context';
import { formatDate } from '@/lib/utils';
import { BlogPost } from '@/types/blog';
import { AdminPageHeader } from '@/components/admin/ui/AdminPageHeader';
import { AdminCard } from '@/components/admin/ui/AdminCard';
import { AdminBadge } from '@/components/admin/ui/AdminBadge';
import { AdminActionMenu } from '@/components/admin/ui/AdminActionMenu';
import { AdminToast } from '@/components/admin/ui/AdminToast';
import { Modal } from '@/components/ui/Modal';

export default function AdminBlogPage() {
  const { blogPosts, toggleBlogPostPublished, deleteBlogPost } = useAdminContext();
  const [deleteCandidate, setDeleteCandidate] = useState<BlogPost | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleDeleteConfirm = () => {
    if (deleteCandidate) {
      deleteBlogPost(deleteCandidate.id);
      setToastMessage(`Article "${deleteCandidate.title}" deleted.`);
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
        title="Blog Articles"
        description="Publish technical hardware buying advice, installation guides, and construction articles."
        breadcrumbs={[{ label: 'Content', href: '/ashish/blog' }, { label: 'Blog' }]}
        primaryAction={
          <Link href="/ashish/blog/new">
            <button className="h-9 px-3.5 bg-navy-900 text-white rounded-[7px] text-xs font-semibold hover:bg-navy-800 transition-colors flex items-center gap-1.5 shadow-xs">
              <Plus className="h-4 w-4 text-orange-brand" />
              <span>Create Article</span>
            </button>
          </Link>
        }
      />

      {/* BLOG CMS TABLE */}
      <AdminCard noPadding>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-border text-text-muted uppercase text-[11px] tracking-wider bg-surface-bg">
                <th className="py-3 px-4">Article Title</th>
                <th className="py-3 px-4">Author</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Published Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {blogPosts.map((post) => (
                <tr key={post.id} className="hover:bg-slate-50/80 transition-colors h-[54px]">
                  <td className="py-2.5 px-4 font-bold text-navy-900 max-w-sm truncate">{post.title}</td>
                  <td className="py-2.5 px-4 text-text-secondary">{post.author.name}</td>
                  <td className="py-2.5 px-4 font-semibold text-blue-brand">{post.category}</td>
                  <td className="py-2.5 px-4 text-text-muted">{formatDate(post.publishedAt)}</td>
                  <td className="py-2.5 px-4">
                    <AdminBadge variant={post.published ? 'delivered' : 'warning'} size="sm">
                      {post.published ? 'Published' : 'Draft'}
                    </AdminBadge>
                  </td>
                  <td className="py-2.5 px-4 text-right">
                    <AdminActionMenu
                      items={[
                        {
                          label: 'Preview Article',
                          icon: <Eye className="h-3.5 w-3.5 text-blue-brand" />,
                          onClick: () => {
                            window.open(`/blog/${post.slug}`, '_blank');
                          },
                        },
                        {
                          label: 'Edit Article',
                          icon: <Edit2 className="h-3.5 w-3.5" />,
                          onClick: () => {
                            window.location.href = `/ashish/blog/${post.id}`;
                          },
                        },
                        {
                          label: post.published ? 'Unpublish Draft' : 'Publish Article',
                          icon: <Power className="h-3.5 w-3.5" />,
                          onClick: () => {
                            toggleBlogPostPublished(post.id);
                            setToastMessage(`Toggled publish status for "${post.title}".`);
                          },
                        },
                        {
                          label: 'Delete Article',
                          variant: 'danger',
                          icon: <Trash2 className="h-3.5 w-3.5 text-red-600" />,
                          onClick: () => setDeleteCandidate(post),
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

      {/* DELETE MODAL */}
      <Modal
        isOpen={!!deleteCandidate}
        onClose={() => setDeleteCandidate(null)}
        title="Delete Article"
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
          Are you sure you want to delete article <strong className="font-bold">&quot;{deleteCandidate?.title}&quot;</strong>?
        </p>
      </Modal>
    </div>
  );
}
