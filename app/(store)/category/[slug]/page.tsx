import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight, ArrowRight, Tag, Paintbrush } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { InnerPageHero } from '@/components/layout/InnerPageHero';
import { ProductCard } from '@/components/products/ProductCard';
import { OFFICIAL_CATEGORIES, MOCK_CATEGORIES } from '@/lib/data/mock-categories';
import { MOCK_PRODUCTS } from '@/lib/data/mock-products';

export default async function CategoryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const category = OFFICIAL_CATEGORIES.find((c) => c.slug === slug) || MOCK_CATEGORIES.find((c) => c.slug === slug);
  
  if (!category) {
    const fallbackName = slug.replace(/-/g, ' ').toUpperCase();
    return (
      <div className="bg-[#F7F8FA] min-h-screen pb-14">
        <InnerPageHero
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'Categories', href: '/categories' },
            { label: fallbackName },
          ]}
          eyebrow="DEPARTMENT CATEGORY"
          title={fallbackName}
          description="Department products and supplies."
          primaryCta={{
            label: 'Shop Products',
            href: '#products',
          }}
          imageSrc="/assets/categories/hardware.svg"
          imageAlt={fallbackName}
          imageObjectFit="cover"
        />

        <Container id="products" className="pt-8">
          <SectionHeading title={fallbackName} subtitle="Department products and supplies." badge="Department" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
            {MOCK_PRODUCTS.slice(0, 4).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </Container>
      </div>
    );
  }

  // Filter products by category name or category slug matching
  const categoryProducts = MOCK_PRODUCTS.filter(
    (p) => p.category.toLowerCase() === category.name.toLowerCase() || p.category.toLowerCase().includes(category.slug.toLowerCase())
  );

  const displayProducts = categoryProducts.length > 0 ? categoryProducts : MOCK_PRODUCTS.slice(0, 8);

  const subcategories = category.subcategories || [];

  return (
    <div className="bg-[#F7F8FA] min-h-screen pb-14">
      {/* CATEGORY HERO */}
      <InnerPageHero
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Categories', href: '/categories' },
          { label: category.name },
        ]}
        eyebrow={`DEPARTMENT CATEGORY (${category.productCount} PRODUCTS)`}
        title={category.name}
        description={category.description}
        primaryCta={{
          label: 'Shop Products',
          href: '#products',
        }}
        secondaryCta={{
          label: 'Explore Catalog',
          href: '/catalogue',
        }}
        imageSrc={category.image || '/assets/categories/hardware.svg'}
        imageAlt={category.name}
        imageObjectFit="cover"
      />

      {/* SUBCATEGORIES SECTION IF PRESENT */}
      {subcategories.length > 0 && (
        <section className="py-10 bg-white border-b border-slate-200/80">
          <Container>
            <div className="flex flex-col gap-1 mb-6">
              <span className="text-[11px] font-extrabold text-[#014A94] uppercase tracking-wider">
                EXPLORE SUBCATEGORIES
              </span>
              <h2 className="text-2xl font-extrabold text-[#0C1E38] tracking-tight">
                {category.name} Subcategories
              </h2>
              <p className="text-xs text-slate-500">
                Browse specialized collections under {category.name}.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {subcategories.map((sub) => (
                <Link
                  key={sub.slug}
                  href={`/categories/${category.slug}/${sub.slug}`}
                  className="group bg-[#F4F7FB] hover:bg-white border border-slate-200/80 hover:border-[#014A94] rounded-2xl p-6 flex flex-col justify-between transition-all duration-200 hover:shadow-md"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-200/80 text-[#014A94] flex items-center justify-center mb-4 shadow-2xs group-hover:bg-[#014A94] group-hover:text-white transition-colors">
                      <Tag className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-extrabold text-[#0C1E38] group-hover:text-[#014A94] transition-colors mb-2">
                      {sub.name}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal mb-4">
                      {sub.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-200/60 text-xs font-bold text-[#014A94]">
                    <span>View {sub.name}</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* PRODUCTS SECTION */}
      <Container id="products" className="pt-8">
        <SectionHeading
          title={`${category.name} Products`}
          subtitle={`Explore high-quality ${category.name.toLowerCase()} supplies available at AK Hardware.`}
          badge="Products"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          {displayProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Container>
    </div>
  );
}
