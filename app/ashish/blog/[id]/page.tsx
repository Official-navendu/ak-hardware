'use client';

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Save, Trash2, Eye, Bold, Italic, Heading, Link as LinkIcon, List, ListOrdered, Quote, Image as ImageIcon } from 'lucide-react';
import { useAdminContext } from '@/lib/context/admin-context';
import { AdminPageHeader } from '@/components/admin/ui/AdminPageHeader';
import { AdminCard } from '@/components/admin/ui/AdminCard';
import { AdminToast } from '@/components/admin/ui/AdminToast';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Modal } from '@/components/ui/Modal';

export default function AdminEditBlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { blogPosts, updateBlogPost, deleteBlogPost } = useAdminContext();
  const post = blogPosts.find((p) => p.id === id) || blogPosts[0];

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: post?.title || '',
    category: post?.category || 'Buying Guide',
    authorName: post?.author?.name || 'Rohit Sharma',
    authorRole: post?.author?.role || 'Hardware Specialist',
    excerpt: post?.excerpt || '',
    content: post?.content || '',
    tags: post?.tags?.join(', ') || 'Sanitary, Hardware',
    readTime: post?.readTime || '5 min read',
    published: post?.published ?? true,
    coverImage: post?.coverImage || '/assets/categories/tools-3d.jpg',
  });

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title,
        category: post.category,
        authorName: post.author.name,
        authorRole: post.author.role,
        excerpt: post.excerpt,
        content: post.content,
        tags: post.tags ? post.tags.join(', ') : '',
        readTime: post.readTime || '5 min read',
        published: post.published,
        coverImage: post.coverImage || '/assets/categories/tools-3d.jpg',
      });
    }
  }, [post]);

  const insertFormatting = (syntax: string) => {
    setFormData((prev) => ({
      ...prev,
      content: prev.content + syntax,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (post) {
      updateBlogPost(post.id, {
        title: formData.title,
        category: formData.category,
        author: {
          name: formData.authorName,
          role: formData.authorRole,
        },
        excerpt: formData.excerpt,
        content: formData.content,
        tags: formData.tags.split(',').map((t) => t.trim()),
        published: formData.published,
        coverImage: formData.coverImage,
      });

      setToastMessage(`Updated article "${formData.title}".`);
      setTimeout(() => {
        router.push('/ashish/blog');
      }, 1000);
    }
  };

  const handleDelete = () => {
    if (post) {
      deleteBlogPost(post.id);
      setToastMessage(`Deleted article "${post.title}".`);
      setTimeout(() => {
        router.push('/ashish/blog');
      }, 1000);
    }
  };

  if (!post) {
    return (
      <div className="p-12 text-center text-xs text-text-muted max-w-[1440px] mx-auto">
        Article not found in CMS. <Link href="/ashish/blog" className="text-blue-brand font-bold underline">Return to blog</Link>
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
        title={`Edit Article: ${post.title}`}
        description={`CMS ID: ${post.id}`}
        breadcrumbs={[
          { label: 'Content', href: '/ashish/blog' },
          { label: 'Blog', href: '/ashish/blog' },
          { label: post.title },
        ]}
        secondaryActions={
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => window.open(`/blog/${post.slug}`, '_blank')}
              className="h-9 px-3 bg-white border border-border text-navy-900 rounded-[7px] text-xs font-semibold hover:bg-slate-50 transition-colors flex items-center gap-1.5"
            >
              <Eye className="h-3.5 w-3.5 text-blue-brand" />
              <span>Preview Live</span>
            </button>
            <button
              type="button"
              onClick={() => setDeleteModalOpen(true)}
              className="h-9 px-3 bg-white border border-red-200 text-red-600 rounded-[7px] text-xs font-semibold hover:bg-red-50 transition-colors flex items-center gap-1.5"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span>Delete</span>
            </button>
          </div>
        }
      />

      {/* 2-COLUMN EDITORIAL CMS LAYOUT */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 flex flex-col gap-6">
          <AdminCard title="Article Content &amp; Specs" description="Main article title, summary, and body text">
            <div className="flex flex-col gap-4 text-xs">
              <Input
                label="Article Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
              <Textarea
                label="Article Excerpt"
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                rows={2}
                required
              />

              {/* TOOLBAR */}
              <div className="flex flex-col gap-1.5 pt-2">
                <label className="font-semibold text-navy-900">Article Content Editor</label>
                <div className="border border-border rounded-[8px] overflow-hidden bg-white">
                  <div className="px-3 py-2 bg-surface-bg border-b border-border flex items-center gap-1 text-slate-600 flex-wrap">
                    <button type="button" onClick={() => insertFormatting(' **bold text** ')} className="p-1.5 rounded hover:bg-slate-200" title="Bold"><Bold className="h-3.5 w-3.5" /></button>
                    <button type="button" onClick={() => insertFormatting(' *italic text* ')} className="p-1.5 rounded hover:bg-slate-200" title="Italic"><Italic className="h-3.5 w-3.5" /></button>
                    <button type="button" onClick={() => insertFormatting('\n## Heading 2\n')} className="p-1.5 rounded hover:bg-slate-200" title="Heading"><Heading className="h-3.5 w-3.5" /></button>
                    <button type="button" onClick={() => insertFormatting(' [link text](url) ')} className="p-1.5 rounded hover:bg-slate-200" title="Link"><LinkIcon className="h-3.5 w-3.5" /></button>
                    <button type="button" onClick={() => insertFormatting('\n- Item 1\n- Item 2\n')} className="p-1.5 rounded hover:bg-slate-200" title="Bulleted List"><List className="h-3.5 w-3.5" /></button>
                    <button type="button" onClick={() => insertFormatting('\n1. First step\n2. Second step\n')} className="p-1.5 rounded hover:bg-slate-200" title="Numbered List"><ListOrdered className="h-3.5 w-3.5" /></button>
                    <button type="button" onClick={() => insertFormatting('\n> Expert advice quote\n')} className="p-1.5 rounded hover:bg-slate-200" title="Quote"><Quote className="h-3.5 w-3.5" /></button>
                  </div>
                  <textarea
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    rows={12}
                    className="w-full p-4 text-xs font-mono text-navy-900 bg-white focus:outline-none resize-y"
                    required
                  />
                </div>
              </div>
            </div>
          </AdminCard>
        </div>

        <div className="lg:col-span-4 flex flex-col gap-6">
          <AdminCard title="Publishing">
            <div className="flex flex-col gap-4 text-xs">
              <div className="flex flex-col gap-1.5">
                <label className="font-semibold text-navy-900">Status</label>
                <select
                  value={formData.published ? 'published' : 'draft'}
                  onChange={(e) => setFormData({ ...formData, published: e.target.value === 'published' })}
                  className="h-9 px-3 bg-surface-bg border border-border rounded-[7px] font-semibold text-navy-900 focus:outline-none focus:border-blue-brand"
                >
                  <option value="published">Published (Visible Live)</option>
                  <option value="draft">Draft (Hidden)</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full h-10 bg-navy-900 text-white rounded-[7px] font-semibold hover:bg-navy-800 transition-colors flex items-center justify-center gap-2 shadow-xs mt-2"
              >
                <Save className="h-4 w-4 text-orange-brand" />
                <span>Save Article Changes</span>
              </button>
            </div>
          </AdminCard>

          <AdminCard title="Classification">
            <div className="flex flex-col gap-4 text-xs">
              <Input
                label="Category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
              />
              <Input
                label="Author Name"
                value={formData.authorName}
                onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
                required
              />
              <Input
                label="Tags"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              />
              <Input
                label="Cover Image"
                value={formData.coverImage}
                onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
              />
            </div>
          </AdminCard>
        </div>
      </form>

      {/* DELETE MODAL */}
      <Modal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Delete Article"
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
          Are you sure you want to delete article <strong className="font-bold">&quot;{post.title}&quot;</strong>?
        </p>
      </Modal>
    </div>
  );
}
