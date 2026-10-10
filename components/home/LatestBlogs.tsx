'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';

export const LatestBlogs: React.FC = () => {
  const blogs = [
    {
      id: 'blog-1',
      title: 'How to Choose the Right Pipes for Your Home',
      slug: 'how-to-choose-the-right-pipes-for-your-home',
      date: 'Jan 15, 2026',
      readTime: '5 min read',
      image: '/assets/categories/pipes-3d.jpg',
    },
    {
      id: 'blog-2',
      title: 'Essential Tools Every Homeowner Should Have',
      slug: 'essential-tools-every-homeowner-should-have',
      date: 'Jan 10, 2026',
      readTime: '4 min read',
      image: '/assets/categories/tools-3d.jpg',
    },
    {
      id: 'blog-3',
      title: 'Top Paint Colors for Modern Homes',
      slug: 'top-paint-colors-for-modern-homes',
      date: 'Jan 5, 2026',
      readTime: '6 min read',
      image: '/assets/categories/paints-3d.jpg',
    },
  ];

  return (
    <section className="py-10 sm:py-14 bg-white border-b border-slate-100">
      <Container>
        {/* HEADER ROW */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="inline-flex items-center bg-[#E8F1FD] text-[#1B4E9B] text-[11px] font-semibold px-3 py-0.5 rounded-full border border-[#D0E2FB] uppercase tracking-wider mb-2">
              OUR BLOG
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0C1E38] tracking-tight">
              Latest From Our Blog
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-normal mt-1">
              Tips, guides and latest updates from the world of hardware and construction.
            </p>
          </div>

          <Link
            href="/blog"
            className="text-xs font-semibold text-[#1B4E9B] hover:text-[#10346B] inline-flex items-center gap-1 hover:underline self-start sm:self-end"
          >
            <span>View All Posts</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        {/* 3 BLOG CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogs.map((post) => (
            <div
              key={post.id}
              className="bg-white border border-slate-100 rounded-2xl overflow-hidden flex flex-col shadow-2xs hover:shadow-md transition-all duration-200 group"
            >
              <Link
                href={`/blog/${post.slug}`}
                className="relative aspect-[16/9] w-full bg-[#F4F7FB] overflow-hidden"
              >
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                />
              </Link>
              <div className="p-5 flex flex-col flex-1 justify-between">
                <div>
                  <div className="text-[11px] text-slate-400 font-medium mb-2">
                    <span>{post.date}</span>
                    <span className="mx-1 font-bold">•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="font-extrabold text-[#0C1E38] text-sm sm:text-base hover:text-[#1B4E9B] transition-colors leading-snug line-clamp-2 mb-4 block"
                  >
                    {post.title}
                  </Link>
                </div>

                <Link
                  href={`/blog/${post.slug}`}
                  className="text-xs font-semibold text-[#1B4E9B] inline-flex items-center gap-1 hover:underline"
                >
                  <span>Read More</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
