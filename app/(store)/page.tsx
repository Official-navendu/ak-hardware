import React from 'react';
import { Hero } from '@/components/home/Hero';
import { CategoriesSection } from '@/components/home/CategoriesSection';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { PartnersSection } from '@/components/home/PartnersSection';
import { PromotionsSection } from '@/components/home/PromotionsSection';
import { CategoryShowcase } from '@/components/home/CategoryShowcase';
import { WhyChooseUs } from '@/components/home/WhyChooseUs';
import { Testimonials } from '@/components/home/Testimonials';
import { FAQSection } from '@/components/home/FAQSection';
import { HomeCustomizer } from '@/components/home/HomeCustomizer';
import { HomeCTA } from '@/components/home/HomeCTA';

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <Hero />
      <CategoriesSection />
      <FeaturedProducts />
      <PartnersSection />
      <PromotionsSection />
      <CategoryShowcase />
      <HomeCustomizer />
      <WhyChooseUs />
      <Testimonials />
      <FAQSection />
      <HomeCTA />
    </div>
  );
}
