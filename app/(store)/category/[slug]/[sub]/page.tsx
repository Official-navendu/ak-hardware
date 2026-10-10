import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Tag } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { InnerPageHero } from '@/components/layout/InnerPageHero';
import { ProductCard } from '@/components/products/ProductCard';
import { OFFICIAL_CATEGORIES } from '@/lib/data/mock-categories';
import { MOCK_PRODUCTS } from '@/lib/data/mock-products';

export default async function SubcategoryDetailPage({
  params,
}: {
  params: Promise<{ slug: string; sub: string }>;
}) {
  const { slug, sub } = await params;

  const parentCategory = OFFICIAL_CATEGORIES.find((c) => c.slug === slug);
  const subcategory = parentCategory?.subcategories?.find((s) => s.slug === sub);

  if (!parentCategory || !subcategory) {
    const formattedSubName = sub.replace(/-/g, ' ').toUpperCase();
    return (
      <div className="bg-[#F7F8FA] min-h-screen pb-14">
        <InnerPageHero
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'Categories', href: '/categories' },
            { label: slug.toUpperCase(), href: `/categories/${slug}` },
            { label: formattedSubName },
          ]}
          eyebrow="SUBCATEGORY"
          title={formattedSubName}
          description="Specialized subcategory hardware and supply products."
          primaryCta={{
            label: 'Shop Products',
            href: '#products',
          }}
          imageSrc="/assets/categories/paints-3d.jpg"
          imageAlt={formattedSubName}
          imageObjectFit="cover"
        />

        <Container id="products" className="pt-8">
          <SectionHeading title={formattedSubName} subtitle="Subcategory selection." badge="Subcategory" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
            {MOCK_PRODUCTS.slice(0, 4).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </Container>
      </div>
    );
  }

  // Filter products by subcategory or parent category fallback
  const subcategoryProducts = MOCK_PRODUCTS.filter(
    (p) =>
      p.subcategory?.toLowerCase() === subcategory.name.toLowerCase() ||
      p.subcategory?.toLowerCase() === subcategory.slug.toLowerCase() ||
      (p.category.toLowerCase() === parentCategory.name.toLowerCase() && p.name.toLowerCase().includes(subcategory.slug.toLowerCase()))
  );

  const displayProducts = subcategoryProducts.length > 0 ? subcategoryProducts : MOCK_PRODUCTS.filter((p) => p.category.toLowerCase() === parentCategory.name.toLowerCase()).slice(0, 8);

  return (
    <div className="bg-[#F7F8FA] min-h-screen pb-14">
      {/* SUBCATEGORY HERO */}
      <InnerPageHero
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Categories', href: '/categories' },
          { label: parentCategory.name, href: `/categories/${parentCategory.slug}` },
          { label: subcategory.name },
        ]}
        eyebrow={`${parentCategory.name.toUpperCase()} / SUBCATEGORY`}
        title={subcategory.name}
        description={subcategory.description || `High-quality ${subcategory.name.toLowerCase()} for your home and project needs.`}
        primaryCta={{
          label: 'Explore Products',
          href: '#products',
        }}
        secondaryCta={{
          label: `All ${parentCategory.name}`,
          href: `/categories/${parentCategory.slug}`,
        }}
        imageSrc={subcategory.image || parentCategory.image}
        imageAlt={subcategory.name}
        imageObjectFit="cover"
      />

      <Container id="products" className="pt-8">
        <div className="flex items-center justify-between gap-4 mb-6">
          <Link
            href={`/categories/${parentCategory.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#014A94] hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to {parentCategory.name}</span>
          </Link>

          <span className="text-xs text-slate-500 font-medium">
            Showing products under <strong>{subcategory.name}</strong>
          </span>
        </div>

        <SectionHeading
          title={`${subcategory.name} Collection`}
          subtitle={subcategory.description || `Browse premium ${subcategory.name.toLowerCase()} products.`}
          badge="Subcategory"
        />

        {displayProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
            {displayProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white border border-slate-200/80 rounded-2xl p-12 text-center flex flex-col items-center gap-3 mt-6">
            <Tag className="h-10 w-10 text-slate-300" />
            <p className="text-sm font-semibold text-slate-700">No specific products found for this subcategory yet.</p>
            <p className="text-xs text-slate-500">Contact AK Hardware for custom catalog orders and bulk availability.</p>
            <Link
              href="/contact"
              className="bg-[#FA3A08] text-white font-bold text-xs px-5 py-2 rounded-md mt-2"
            >
              Contact Support
            </Link>
          </div>
        )}
      </Container>
    </div>
  );
}
