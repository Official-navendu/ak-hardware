import React from 'react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

export default function ShippingPolicyPage() {
  return (
    <Container>
      <Breadcrumb items={[{ label: 'Shipping Policy' }]} className="mb-6" />
      <SectionHeading title="Shipping & Dispatch Policy" subtitle="Freight and delivery terms." />
      <div className="bg-white border border-border p-6 rounded-brand-lg text-sm text-text-secondary">
        <p>Shipping guidelines architectural shell.</p>
      </div>
    </Container>
  );
}
