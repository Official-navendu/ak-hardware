'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  ChevronRight,
  Calendar,
  Clock,
  User,
  Facebook,
  Twitter,
  Linkedin,
  Share2,
  CheckCircle2,
  Lightbulb,
  Search,
  BookOpen,
  Wrench,
  Building,
  Star,
  ShieldCheck,
  Newspaper,
  Mail,
  Send,
  ArrowRight,
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { AnimatedHeroImage } from '@/components/ui/AnimatedHeroImage';
import { MOCK_BLOG_POSTS } from '@/lib/data/mock-blog';
import { MOCK_PRODUCTS } from '@/lib/data/mock-products';
import { useCart } from '@/lib/context/cart-context';
import { formatPrice } from '@/lib/utils';

export default function BlogDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const post = MOCK_BLOG_POSTS.find((p) => p.slug === slug) || MOCK_BLOG_POSTS[0];
  const { addToCart } = useCart();

  const [searchQuery, setSearchQuery] = useState('');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const popularProducts = MOCK_PRODUCTS.slice(0, 5);
  const relatedArticles = MOCK_BLOG_POSTS.filter((p) => p.id !== post.id).slice(0, 4);

  const categories = [
    { name: 'All Posts', count: 36 },
    { name: 'Buying Guide', count: 8 },
    { name: 'Home Improvement', count: 6 },
    { name: 'Construction Tips', count: 7 },
    { name: 'Product Reviews', count: 5 },
    { name: 'Maintenance', count: 6 },
    { name: 'Industry News', count: 4 },
  ];

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
      {/* 1. BREADCRUMB */}
      <div className="bg-white border-b border-slate-200/80 py-3">
        <Container>
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Link href="/" className="hover:text-[#1B4E9B]">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/blog" className="hover:text-[#1B4E9B]">Blogs</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-[#1B4E9B] font-medium">{post.category}</span>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="font-semibold text-[#0C1E38] truncate max-w-xs">{post.title}</span>
          </div>
        </Container>
      </div>

      {/* 2. HERO ARTICLE HEADER & HERO IMAGE */}
      <section className="bg-white py-8 border-b border-slate-200/80">
        <Container>
          <div className="flex flex-col items-start gap-4 max-w-4xl">
            <div className="flex items-center gap-3">
              <span className="bg-[#E8F1FD] text-[#1B4E9B] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {post.category}
              </span>
              <span className="text-xs text-slate-500 font-medium">
                {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} • {post.readTime}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-[#0C1E38] tracking-tight leading-[1.2]">
              {post.title}
            </h1>

            <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
              {post.excerpt}
            </p>

            {/* AUTHOR ROW & SOCIAL SHARE */}
            <div className="flex flex-wrap items-center justify-between gap-4 w-full pt-4 border-t border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#1B4E9B] text-white font-bold text-xs flex items-center justify-center">
                  {post.author.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div className="flex flex-col">
                  <span className="font-extrabold text-[#0C1E38] text-xs">By {post.author.name}</span>
                  <span className="text-[11px] text-slate-500 font-normal">{post.author.role}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                <span>Share:</span>
                <button type="button" onClick={() => alert('Article link copied!')} className="w-7 h-7 rounded-full bg-slate-100 hover:bg-[#1B4E9B] hover:text-white flex items-center justify-center transition-colors">
                  <Facebook className="h-3.5 w-3.5" />
                </button>
                <button type="button" onClick={() => alert('Article link copied!')} className="w-7 h-7 rounded-full bg-slate-100 hover:bg-[#1B4E9B] hover:text-white flex items-center justify-center transition-colors">
                  <Twitter className="h-3.5 w-3.5" />
                </button>
                <button type="button" onClick={() => alert('Article link copied!')} className="w-7 h-7 rounded-full bg-slate-100 hover:bg-[#1B4E9B] hover:text-white flex items-center justify-center transition-colors">
                  <Linkedin className="h-3.5 w-3.5" />
                </button>
                <button type="button" onClick={() => alert('Article link copied!')} className="w-7 h-7 rounded-full bg-slate-100 hover:bg-[#1B4E9B] hover:text-white flex items-center justify-center transition-colors">
                  <Share2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* HERO WIDE FEATURED IMAGE WITH STYLISH ROUNDED CORNERS & ANIMATED BRAND BORDER */}
          <div className="w-full mt-8">
            <AnimatedHeroImage className="w-full aspect-[21/9]">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover"
              />
            </AnimatedHeroImage>
          </div>
        </Container>
      </section>

      {/* 3. ARTICLE CONTENT & SIDEBAR */}
      <Container className="pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT MAIN ARTICLE COLUMN (8 COLS) */}
          <main className="lg:col-span-8 flex flex-col gap-8 bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-10 shadow-2xs">
            
            {/* TABLE OF CONTENTS BOX */}
            <div className="bg-[#F4F7FB] border border-slate-200/80 rounded-xl p-5">
              <h3 className="font-extrabold text-[#0C1E38] text-sm mb-3 flex items-center gap-2">
                <span>📋</span> Table of Contents
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 font-medium">
                <span>1. Understand Your Needs</span>
                <span>2. Types of Sanitary Ware</span>
                <span>3. Material and Build Quality</span>
                <span>4. Water Efficiency</span>
                <span>5. Design and Style</span>
                <span>6. Budget Considerations</span>
                <span>7. Top Brands in India</span>
                <span>8. Final Tips</span>
              </div>
            </div>

            {/* SECTION 1 */}
            <div className="flex flex-col gap-3">
              <h2 className="text-xl font-extrabold text-[#0C1E38] border-l-4 border-[#FA3A08] pl-3">
                1. Understand Your Needs
              </h2>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                Before buying sanitary ware, consider the size of your bathroom, the number of users and your specific requirements. Whether it&apos;s a compact setup for a small bathroom or a luxurious design for a master bathroom, understanding your needs helps you choose the right products.
              </p>
            </div>

            {/* SECTION 2 WITH IMAGE GALLERY */}
            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-extrabold text-[#0C1E38] border-l-4 border-[#FA3A08] pl-3">
                2. Types of Sanitary Ware
              </h2>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                There are various types of sanitary ware products available, each serving a different purpose:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                <div className="flex flex-col gap-2.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#0C1E38]">
                    <CheckCircle2 className="h-4 w-4 text-[#FA3A08]" />
                    <span>Wash Basins – Wall hung, countertop, pedestal, under counter</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-[#0C1E38]">
                    <CheckCircle2 className="h-4 w-4 text-[#FA3A08]" />
                    <span>Toilets – One-piece, two-piece, wall hung</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-[#0C1E38]">
                    <CheckCircle2 className="h-4 w-4 text-[#FA3A08]" />
                    <span>Urinals – For residential and commercial spaces</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-[#0C1E38]">
                    <CheckCircle2 className="h-4 w-4 text-[#FA3A08]" />
                    <span>Bathtubs – For a luxurious bathing experience</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-[#0C1E38]">
                    <CheckCircle2 className="h-4 w-4 text-[#FA3A08]" />
                    <span>Shower Enclosures – Modern and space-saving</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  <div className="relative aspect-[16/10] rounded-xl overflow-hidden border border-slate-200">
                    <Image src="/assets/categories/sanitary-3d.jpg" alt="Washbasin" fill className="object-cover" />
                  </div>
                  <div className="relative aspect-[16/10] rounded-xl overflow-hidden border border-slate-200">
                    <Image src="/assets/products/prod-sanitary-toilet.svg" alt="Toilet" fill className="object-contain p-2" />
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION 3 */}
            <div className="flex flex-col gap-3">
              <h2 className="text-xl font-extrabold text-[#0C1E38] border-l-4 border-[#FA3A08] pl-3">
                3. Material and Build Quality
              </h2>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                Most sanitary ware is made from high-quality ceramic, which is durable, easy to clean and resistant to stains. Look for products with a smooth finish and good glaze quality to ensure long-lasting performance.
              </p>
            </div>

            {/* SECTION 4 */}
            <div className="flex flex-col gap-3">
              <h2 className="text-xl font-extrabold text-[#0C1E38] border-l-4 border-[#FA3A08] pl-3">
                4. Water Efficiency
              </h2>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                Choose water-efficient products like dual-flush toilets and low-flow faucets. These not only help conserve water but also reduce your monthly water bills.
              </p>
            </div>

            {/* SECTION 5 */}
            <div className="flex flex-col gap-3">
              <h2 className="text-xl font-extrabold text-[#0C1E38] border-l-4 border-[#FA3A08] pl-3">
                5. Design and Style
              </h2>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                Sanitary ware comes in a wide range of modern designs, colours and finishes. Choose a style that complements your bathroom interiors. Minimalist and wall-hung designs are popular for a clean and modern look.
              </p>
            </div>

            {/* SECTION 6 */}
            <div className="flex flex-col gap-3">
              <h2 className="text-xl font-extrabold text-[#0C1E38] border-l-4 border-[#FA3A08] pl-3">
                6. Budget Considerations
              </h2>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                Set a budget and compare products from different brands. Focus on value for money, quality and warranty rather than just the price.
              </p>
            </div>

            {/* SECTION 7 */}
            <div className="flex flex-col gap-3">
              <h2 className="text-xl font-extrabold text-[#0C1E38] border-l-4 border-[#FA3A08] pl-3">
                7. Top Brands in India
              </h2>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                Some of the most trusted sanitary ware brands in India include <strong>Jaquar, Hindware, Cera, Kohler and Roca</strong>. These brands offer a wide range of products with excellent quality and after-sales support.
              </p>
            </div>

            {/* SECTION 8 & KEY TAKEAWAY */}
            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-extrabold text-[#0C1E38] border-l-4 border-[#FA3A08] pl-3">
                8. Final Tips
              </h2>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#0C1E38]">
                  <CheckCircle2 className="h-4 w-4 text-[#FA3A08]" />
                  <span>Always check product warranty</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-[#0C1E38]">
                  <CheckCircle2 className="h-4 w-4 text-[#FA3A08]" />
                  <span>Choose from authorized dealers</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-[#0C1E38]">
                  <CheckCircle2 className="h-4 w-4 text-[#FA3A08]" />
                  <span>Read customer reviews</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-[#0C1E38]">
                  <CheckCircle2 className="h-4 w-4 text-[#FA3A08]" />
                  <span>Consider professional installation</span>
                </div>
              </div>

              {/* KEY TAKEAWAY BOX */}
              <div className="bg-[#E8F1FD] border border-[#D0E2FB] rounded-xl p-5 flex items-start gap-3 mt-3">
                <div className="w-10 h-10 rounded-full bg-[#1B4E9B] text-white flex items-center justify-center flex-shrink-0">
                  <Lightbulb className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-[#0C1E38] text-sm mb-1">Key Takeaway</h4>
                  <p className="text-xs text-slate-700 leading-relaxed font-normal">
                    Investing in the right sanitary ware enhances your bathroom&apos;s functionality, aesthetics and long-term value. Choose quality, design and water efficiency for a better and more comfortable home.
                  </p>
                </div>
              </div>
            </div>

            {/* TAGS ROW */}
            <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-slate-100 text-xs">
              <span className="font-bold text-slate-500">Tags:</span>
              {post.tags.map((tag) => (
                <span key={tag} className="bg-slate-100 text-slate-700 px-3 py-1 rounded-md text-[11px] font-medium hover:bg-slate-200 cursor-pointer">
                  {tag}
                </span>
              ))}
            </div>

            {/* AUTHOR BIO CARD */}
            <div className="bg-[#FAFCFF] border border-slate-200/80 rounded-2xl p-6 flex flex-col sm:flex-row items-start gap-4">
              <div className="w-16 h-16 rounded-full bg-[#1B4E9B] text-white font-bold text-lg flex items-center justify-center flex-shrink-0">
                {post.author.name.split(' ').map((n) => n[0]).join('')}
              </div>
              <div className="flex-1 flex flex-col gap-1">
                <h4 className="font-extrabold text-[#0C1E38] text-sm">{post.author.name}</h4>
                <span className="text-xs text-slate-500 font-medium mb-1">{post.author.role}</span>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  Rohit is a home improvement specialist with over 8 years of experience in the hardware and construction industry. He writes about building materials, home design and practical tips for modern homes.
                </p>
              </div>
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
                  className="w-full h-9 bg-slate-50 border border-slate-200 rounded-md pl-3 pr-10 text-xs text-slate-800 placeholder-slate-400 focus:outline-none"
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
              <div className="flex flex-col gap-1.5 text-xs text-slate-600">
                {categories.map((c) => (
                  <Link key={c.name} href="/blog" className="flex items-center justify-between py-1.5 px-2 hover:bg-slate-50 rounded">
                    <span>{c.name}</span>
                    <span className="text-[11px] text-slate-400">({c.count})</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* POPULAR PRODUCTS WIDGET */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-4">
                <h3 className="font-extrabold text-[#0C1E38] text-sm">Popular Products</h3>
                <Link href="/shop" className="text-[11px] text-[#1B4E9B] font-semibold hover:underline">View All →</Link>
              </div>
              <div className="flex flex-col gap-3">
                {popularProducts.map((p) => (
                  <div key={p.id} className="flex items-center justify-between gap-3 bg-white p-2 rounded-lg border border-slate-100">
                    <div className="relative w-10 h-10 flex-shrink-0 bg-slate-50 rounded p-1">
                      <Image src={p.images[0]} alt={p.name} fill className="object-contain" />
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col text-xs">
                      <span className="font-bold text-[#0C1E38] truncate">{p.name}</span>
                      <span className="font-extrabold text-[#FA3A08]">{formatPrice(p.salePrice ?? p.price)}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => addToCart(p)}
                      className="bg-[#FA3A08] text-white font-bold text-[10px] px-2.5 py-1 rounded"
                    >
                      Add
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* SUBSCRIBE NEWSLETTER WIDGET */}
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
                  className="absolute right-0 top-0 bottom-0 px-3 bg-[#FA3A08] text-white rounded-r-md flex items-center justify-center"
                >
                  <Send className="h-3.5 w-3.5" />
                </button>
              </form>
              {subscribed && <span className="text-[11px] text-green-400 font-medium">Subscribed successfully!</span>}
            </div>

          </aside>

        </div>
      </Container>

      {/* 4. RELATED ARTICLES SECTION */}
      <section className="py-12 bg-white border-t border-slate-200/80 mt-12">
        <Container>
          <div className="flex items-center justify-between gap-4 mb-8">
            <h2 className="text-2xl font-extrabold text-[#0C1E38]">Related Articles</h2>
            <Link href="/blog" className="text-xs font-semibold text-[#1B4E9B] hover:underline flex items-center gap-1">
              <span>View All Articles</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {relatedArticles.map((rel) => (
              <div key={rel.id} className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden flex flex-col shadow-2xs hover:shadow-md transition-all group">
                <Link href={`/blog/${rel.slug}`} className="relative aspect-[16/10] w-full bg-[#F4F7FB] overflow-hidden">
                  <Image src={rel.coverImage} alt={rel.title} fill className="object-contain p-3 group-hover:scale-105 transition-transform" />
                </Link>
                <div className="p-4 flex flex-col flex-1 justify-between">
                  <div>
                    <span className="bg-[#E8F1FD] text-[#1B4E9B] text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider mb-2 inline-block">
                      {rel.category}
                    </span>
                    <Link href={`/blog/${rel.slug}`} className="font-extrabold text-[#0C1E38] text-xs hover:text-[#1B4E9B] transition-colors leading-snug line-clamp-2 mb-2 block">
                      {rel.title}
                    </Link>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 pt-2 border-t border-slate-100">
                    <span>{new Date(rel.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    <span className="font-semibold text-[#1B4E9B] flex items-center gap-0.5">Read More <ChevronRight className="h-3 w-3" /></span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
