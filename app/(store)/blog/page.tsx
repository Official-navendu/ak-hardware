'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ChevronRight,
  ChevronLeft,
  Search,
  BookOpen,
  Wrench,
  Building,
  Star,
  ShieldCheck,
  Newspaper,
  Mail,
  ArrowRight,
  Send,
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { InnerPageHero } from '@/components/layout/InnerPageHero';
import { MOCK_BLOG_POSTS } from '@/lib/data/mock-blog';

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Posts');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('latest');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [newsletterEmail, setNewsletterEmail] = useState<string>('');
  const [subscribed, setSubscribed] = useState<boolean>(false);

  const categories = [
    { name: 'All Posts', count: 36, icon: <BookOpen className="h-4 w-4" /> },
    { name: 'Buying Guide', count: 8, icon: <BookOpen className="h-4 w-4" /> },
    { name: 'Home Improvement', count: 6, icon: <Wrench className="h-4 w-4" /> },
    { name: 'Construction Tips', count: 7, icon: <Building className="h-4 w-4" /> },
    { name: 'Product Reviews', count: 5, icon: <Star className="h-4 w-4" /> },
    { name: 'Maintenance', count: 6, icon: <ShieldCheck className="h-4 w-4" /> },
    { name: 'Industry News', count: 4, icon: <Newspaper className="h-4 w-4" /> },
  ];

  const filteredPosts = useMemo(() => {
    return MOCK_BLOG_POSTS.filter((post) => {
      if (selectedCategory !== 'All Posts' && post.category !== selectedCategory) {
        return false;
      }
      if (
        searchQuery.trim() &&
        !post.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'latest') return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
      return 0;
    });
  }, [selectedCategory, searchQuery, sortBy]);

  const popularPosts = MOCK_BLOG_POSTS.slice(0, 5);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setNewsletterEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <div className="bg-[#F7F8FA] min-h-screen pb-14">
      {/* 1. BLOG HERO HEADER (DOMINANT VISUAL, NO CARDS) */}
      <InnerPageHero
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Blog' },
        ]}
        eyebrow="AK HARDWARE JOURNAL"
        title="Ideas, Guides & Hardware Insights"
        description="Explore practical guides, product insights, project inspiration and helpful information from AK Hardware."
        imageSrc="/assets/hero/blogs.png"
        imageAlt="AK Hardware Journal & Guides"
        imageObjectFit="cover"
      />

      {/* 2. CATEGORY QUICK FILTER BAR (7 PILLS) */}
      <div className="py-6 bg-white border-b border-slate-200/80">
        <Container>
          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.name;
              return (
                <button
                  key={cat.name}
                  type="button"
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 border ${
                    isActive
                      ? 'bg-white text-[#FA3A08] border-[#FA3A08] shadow-md'
                      : 'bg-[#F4F7FB] text-slate-700 border-slate-200/80 hover:bg-slate-100'
                  }`}
                >
                  <div className={`p-1 rounded-md ${isActive ? 'bg-[#FFF0EC] text-[#FA3A08]' : 'bg-white text-[#1B4E9B]'}`}>
                    {cat.icon}
                  </div>
                  <div className="flex flex-col items-start leading-tight">
                    <span className="font-extrabold">{cat.name}</span>
                    <span className="text-[10px] text-slate-500 font-normal">{cat.count} Articles</span>
                  </div>
                </button>
              );
            })}
          </div>
        </Container>
      </div>

      {/* 3. MAIN CONTENT (BLOG GRID & SIDEBAR) */}
      <Container className="pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT MAIN COLUMN (8 COLS) */}
          <main className="lg:col-span-8 flex flex-col gap-6">
            
            {/* HEADER BAR */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="inline-flex items-center bg-[#E8F1FD] text-[#1B4E9B] text-[11px] font-semibold px-3 py-0.5 rounded-full border border-[#D0E2FB] uppercase tracking-wider mb-2">
                  OUR BLOG
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0C1E38] tracking-tight">
                  Latest Articles
                </h2>
                <p className="text-xs text-slate-500 font-normal mt-1">
                  Stay updated with the latest tips, guides and industry insights.
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs self-start sm:self-end">
                <span className="text-slate-500">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="h-8 bg-white border border-slate-200 rounded-md px-2.5 font-semibold text-[#0C1E38] focus:outline-none focus:border-[#1B4E9B]"
                >
                  <option value="latest">Latest First</option>
                  <option value="oldest">Oldest First</option>
                </select>
              </div>
            </div>

            {/* 3X3 GRID OF BLOG CARDS */}
            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredPosts.map((post) => (
                  <div
                    key={post.id}
                    className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden flex flex-col shadow-2xs hover:shadow-md transition-all duration-200 group"
                  >
                    <Link
                      href={`/blog/${post.slug}`}
                      className="relative aspect-[16/10] w-full bg-[#F4F7FB] overflow-hidden"
                    >
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        className="object-contain p-3 group-hover:scale-105 transition-transform duration-300"
                      />
                    </Link>
                    <div className="p-4 flex flex-col flex-1 justify-between">
                      <div>
                        <span className="inline-block bg-[#E8F1FD] text-[#1B4E9B] text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider mb-2">
                          {post.category}
                        </span>
                        <Link
                          href={`/blog/${post.slug}`}
                          className="font-extrabold text-[#0C1E38] text-xs sm:text-sm hover:text-[#1B4E9B] transition-colors leading-snug line-clamp-2 mb-2 block"
                        >
                          {post.title}
                        </Link>
                        <p className="text-[11px] text-slate-500 font-normal line-clamp-2 leading-relaxed mb-4">
                          {post.excerpt}
                        </p>
                      </div>

                      <div className="flex flex-col gap-2 pt-3 border-t border-slate-100">
                        <div className="flex items-center gap-2 text-[11px] text-slate-500">
                          <div className="w-5 h-5 rounded-full bg-[#1B4E9B] text-white font-bold text-[9px] flex items-center justify-center">
                            {post.author.name.split(' ').map((n) => n[0]).join('')}
                          </div>
                          <span className="font-semibold text-slate-700 truncate">By {post.author.name}</span>
                        </div>
                        <div className="flex items-center justify-between text-[10px] text-slate-400">
                          <span>{new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                          <span className="font-semibold text-[#1B4E9B] flex items-center gap-0.5 hover:underline">
                            Read More <ChevronRight className="h-3 w-3" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white border border-slate-200/80 rounded-2xl p-12 text-center">
                <p className="text-sm font-semibold text-slate-600">No articles matched your search query.</p>
                <button
                  onClick={() => { setSelectedCategory('All Posts'); setSearchQuery(''); }}
                  className="bg-[#FA3A08] text-white text-xs font-bold px-4 py-2 rounded-md mt-3"
                >
                  View All Posts
                </button>
              </div>
            )}

            {/* PAGINATION BAR */}
            <div className="bg-white border border-slate-200/80 rounded-xl p-4 flex items-center justify-center gap-1.5 shadow-2xs">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="w-8 h-8 rounded border border-slate-200 text-slate-600 flex items-center justify-center hover:bg-slate-50 disabled:opacity-40 text-xs"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setCurrentPage(1)}
                className={`w-8 h-8 rounded text-xs font-bold ${
                  currentPage === 1 ? 'bg-[#012157] text-white' : 'border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                1
              </button>
              <button
                type="button"
                onClick={() => setCurrentPage(2)}
                className={`w-8 h-8 rounded text-xs font-bold ${
                  currentPage === 2 ? 'bg-[#012157] text-white' : 'border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                2
              </button>
              <button
                type="button"
                onClick={() => setCurrentPage(3)}
                className={`w-8 h-8 rounded text-xs font-bold ${
                  currentPage === 3 ? 'bg-[#012157] text-white' : 'border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                3
              </button>
              <button
                type="button"
                onClick={() => setCurrentPage(4)}
                className={`w-8 h-8 rounded text-xs font-bold ${
                  currentPage === 4 ? 'bg-[#012157] text-white' : 'border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                4
              </button>
              <button
                type="button"
                onClick={() => setCurrentPage(5)}
                className={`w-8 h-8 rounded text-xs font-bold ${
                  currentPage === 5 ? 'bg-[#012157] text-white' : 'border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                5
              </button>
              <span className="text-xs text-slate-400 px-1">...</span>
              <button
                type="button"
                onClick={() => setCurrentPage(12)}
                className="w-8 h-8 rounded border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50"
              >
                12
              </button>
              <button
                type="button"
                onClick={() => setCurrentPage((p) => p + 1)}
                className="w-8 h-8 rounded border border-slate-200 text-slate-600 flex items-center justify-center hover:bg-slate-50 text-xs"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

          </main>

          {/* RIGHT SIDEBAR (4 COLS) */}
          <aside className="lg:col-span-4 flex flex-col gap-6">
            
            {/* SEARCH ARTICLES WIDGET */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs">
              <h3 className="font-extrabold text-[#0C1E38] text-sm mb-3">Search Articles</h3>
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="Search blogs, tips, guides..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-9 bg-slate-50 border border-slate-200 rounded-md pl-3 pr-10 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#1B4E9B]"
                />
                <button
                  type="button"
                  aria-label="Search"
                  className="absolute right-0 top-0 bottom-0 px-3 bg-[#FA3A08] text-white rounded-r-md flex items-center justify-center"
                >
                  <Search className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* CATEGORIES WIDGET */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs">
              <h3 className="font-extrabold text-[#0C1E38] text-sm mb-3 border-b border-slate-100 pb-2">Categories</h3>
              <div className="flex flex-col gap-1.5">
                {categories.map((cat) => {
                  const isActive = selectedCategory === cat.name;
                  return (
                    <button
                      key={cat.name}
                      type="button"
                      onClick={() => setSelectedCategory(cat.name)}
                      className={`flex items-center justify-between text-xs py-2 px-3 rounded-lg transition-colors text-left ${
                        isActive
                          ? 'bg-[#FFF0EC] text-[#FA3A08] font-bold border-l-4 border-[#FA3A08]'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-[#0C1E38]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {cat.icon}
                        <span>{cat.name}</span>
                      </div>
                      <span className="text-[11px] text-slate-400">({cat.count})</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* POPULAR POSTS WIDGET */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs">
              <h3 className="font-extrabold text-[#0C1E38] text-sm mb-4 border-b border-slate-100 pb-2">Popular Posts</h3>
              <div className="flex flex-col gap-3">
                {popularPosts.map((post) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="flex items-center gap-3 p-1.5 hover:bg-slate-50 rounded-lg transition-colors group"
                  >
                    <div className="relative w-14 h-12 flex-shrink-0 bg-slate-100 rounded border border-slate-200 overflow-hidden">
                      <Image src={post.coverImage} alt={post.title} fill className="object-contain p-1" />
                    </div>
                    <div className="flex-1 flex flex-col min-w-0">
                      <h4 className="font-extrabold text-[#0C1E38] text-xs leading-snug truncate group-hover:text-[#1B4E9B] transition-colors">
                        {post.title}
                      </h4>
                      <span className="text-[10px] text-slate-400 font-medium mt-0.5">
                        {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* SUBSCRIBE NEWSLETTER SIDEBAR WIDGET */}
            <div className="bg-[#012157] text-white rounded-2xl p-6 shadow-md text-center flex flex-col items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center">
                <Mail className="h-5 w-5" />
              </div>
              <h4 className="font-extrabold text-white text-base">Subscribe to Our Newsletter</h4>
              <p className="text-xs text-slate-300 font-normal leading-relaxed">
                Get the latest tips, offers and updates delivered to your inbox.
              </p>
              <form onSubmit={handleSubscribe} className="relative flex items-center w-full mt-1">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full h-9 bg-white text-[#0C1E38] rounded-md pl-3 pr-10 text-xs placeholder-slate-400 focus:outline-none"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="absolute right-0 top-0 bottom-0 px-3 bg-[#FA3A08] hover:bg-[#E03000] text-white rounded-r-md flex items-center justify-center"
                >
                  <Send className="h-3.5 w-3.5" />
                </button>
              </form>
              {subscribed && <span className="text-[11px] text-green-400 font-medium">Subscribed successfully!</span>}
            </div>

          </aside>

        </div>
      </Container>

      {/* 4. BOTTOM NEWSLETTER CTA BANNER */}
      <section className="pt-12">
        <Container>
          <div className="bg-[#0B1B36] text-white rounded-2xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg">
            <div className="flex flex-col items-start max-w-xl">
              <span className="inline-flex items-center bg-[#1D3B6A] text-blue-200 text-[11px] font-semibold px-3 py-0.5 rounded-full uppercase tracking-wider mb-2 border border-blue-400/20">
                STAY INFORMED
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
                Get Expert <span className="text-[#FA3A08]">Tips &amp; Product Updates</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 font-normal">
                Join our newsletter and never miss an update on new products, offers and home improvement guides.
              </p>
            </div>

            <Link
              href="/blog"
              className="bg-[#FA3A08] hover:bg-[#E03000] text-white font-bold text-xs px-6 py-3 rounded-md inline-flex items-center gap-2 transition-colors flex-shrink-0 shadow-2xs"
            >
              <span>Subscribe Now</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
