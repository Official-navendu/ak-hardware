'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Save, Bold, Italic, Heading, Link as LinkIcon, List, ListOrdered, Quote, Image as ImageIcon } from 'lucide-react';
import { useAdminContext } from '@/lib/context/admin-context';
import { AdminPageHeader } from '@/components/admin/ui/AdminPageHeader';
import { AdminCard } from '@/components/admin/ui/AdminCard';
import { AdminToast } from '@/components/admin/ui/AdminToast';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Checkbox } from '@/components/ui/Checkbox';

export default function AdminNewBlogPostPage() {
  const router = useRouter();
  const { addBlogPost } = useAdminContext();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Buying Guide',
    authorName: 'Rohit Sharma',
    authorRole: 'Hardware Specialist',
    excerpt: '',
    content: '',
    tags: 'Sanitary, Hardware, Tools, Buying Guide',
    readTime: '5 min read',
    published: true,
    coverImage: '/assets/categories/tools-3d.jpg',
    seoTitle: '',
    seoDescription: '',
  });

  const insertFormatting = (syntax: string) => {
    setFormData((prev) => ({
      ...prev,
      content: prev.content + syntax,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    addBlogPost({
      title: formData.title,
      slug: formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      excerpt: formData.excerpt || formData.title,
      content: formData.content || formData.excerpt || 'Full hardware advice article content.',
      coverImage: formData.coverImage,
      author: {
        name: formData.authorName,
        role: formData.authorRole,
      },
      category: formData.category,
      tags: formData.tags.split(',').map((t) => t.trim()),
      readTime: formData.readTime,
      published: formData.published,
    });

    setToastMessage(`Published article "${formData.title}".`);
    setTimeout(() => {
      router.push('/ashish/blog');
    }, 1000);
  };

  return (
    <div className="flex flex-col gap-6 max-w-[1440px] mx-auto">
      {toastMessage && (
        <AdminToast message={toastMessage} onClose={() => setToastMessage(null)} />
      )}

      {/* PAGE HEADER */}
      <AdminPageHeader
        title="Create Hardware Article"
        description="Publish technical hardware guides, installation manuals, and buying advice."
        breadcrumbs={[
          { label: 'Content', href: '/ashish/blog' },
          { label: 'Blog', href: '/ashish/blog' },
          { label: 'New Article' },
        ]}
      />

      {/* 2-COLUMN EDITORIAL CMS LAYOUT: LEFT (68%) / RIGHT (32%) */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN (68%): EDITORIAL CONTENT & TOOLBAR */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <AdminCard title="Article Content &amp; Specs" description="Main article title, summary, and body text">
            <div className="flex flex-col gap-4 text-xs">
              <Input
                label="Article Title"
                placeholder="e.g. How to Select SDS-Plus Rotary Hammers for Heavy Construction"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
              <Textarea
                label="Article Excerpt"
                placeholder="Brief summary snippet displayed on homepage and search cards..."
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                rows={2}
                required
              />

              {/* EDITOR TOOLBAR & TEXTAREA */}
              <div className="flex flex-col gap-1.5 pt-2">
                <label className="font-semibold text-navy-900">Article Content Editor</label>
                <div className="border border-border rounded-[8px] overflow-hidden bg-white">
                  {/* TOOLBAR */}
                  <div className="px-3 py-2 bg-surface-bg border-b border-border flex items-center gap-1 text-slate-600 flex-wrap">
                    <button type="button" onClick={() => insertFormatting(' **bold text** ')} className="p-1.5 rounded hover:bg-slate-200" title="Bold"><Bold className="h-3.5 w-3.5" /></button>
                    <button type="button" onClick={() => insertFormatting(' *italic text* ')} className="p-1.5 rounded hover:bg-slate-200" title="Italic"><Italic className="h-3.5 w-3.5" /></button>
                    <button type="button" onClick={() => insertFormatting('\n## Heading 2\n')} className="p-1.5 rounded hover:bg-slate-200" title="Heading"><Heading className="h-3.5 w-3.5" /></button>
                    <button type="button" onClick={() => insertFormatting(' [link text](url) ')} className="p-1.5 rounded hover:bg-slate-200" title="Link"><LinkIcon className="h-3.5 w-3.5" /></button>
                    <button type="button" onClick={() => insertFormatting('\n- Item 1\n- Item 2\n')} className="p-1.5 rounded hover:bg-slate-200" title="Bulleted List"><List className="h-3.5 w-3.5" /></button>
                    <button type="button" onClick={() => insertFormatting('\n1. First step\n2. Second step\n')} className="p-1.5 rounded hover:bg-slate-200" title="Numbered List"><ListOrdered className="h-3.5 w-3.5" /></button>
                    <button type="button" onClick={() => insertFormatting('\n> Expert advice quote\n')} className="p-1.5 rounded hover:bg-slate-200" title="Quote"><Quote className="h-3.5 w-3.5" /></button>
                    <button type="button" onClick={() => insertFormatting(' ![image caption](/assets/categories/tools-3d.jpg) ')} className="p-1.5 rounded hover:bg-slate-200" title="Image"><ImageIcon className="h-3.5 w-3.5" /></button>
                  </div>
                  <textarea
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    rows={12}
                    placeholder="Write article markdown or body text content here..."
                    className="w-full p-4 text-xs font-mono text-navy-900 bg-white focus:outline-none resize-y"
                    required
                  />
                </div>
              </div>
            </div>
          </AdminCard>
        </div>

        {/* RIGHT COLUMN (32%): PUBLISHING & SEO */}
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
                <span>Publish Article</span>
              </button>
            </div>
          </AdminCard>

          <AdminCard title="Article Classification">
            <div className="flex flex-col gap-4 text-xs">
              <Input
                label="Category"
                placeholder="e.g. Buying Guide"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
              />
              <Input
                label="Author Name"
                placeholder="Rohit Sharma"
                value={formData.authorName}
                onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
                required
              />
              <Input
                label="Tags (Comma separated)"
                placeholder="Tools, Power Tools, Guide"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              />
              <Input
                label="Cover Image Path"
                placeholder="/assets/categories/tools-3d.jpg"
                value={formData.coverImage}
                onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
              />
            </div>
          </AdminCard>

          <AdminCard title="SEO Settings">
            <div className="flex flex-col gap-4 text-xs">
              <Input
                label="Meta Title"
                placeholder="Title tag for search engines..."
                value={formData.seoTitle}
                onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
              />
              <Textarea
                label="Meta Description"
                placeholder="Meta description for search engine listings..."
                value={formData.seoDescription}
                onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })}
                rows={2}
              />
            </div>
          </AdminCard>
        </div>
      </form>
    </div>
  );
}
