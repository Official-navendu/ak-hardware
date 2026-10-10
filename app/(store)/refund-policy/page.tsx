import React from 'react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

export default function RefundPolicyPage() {
  return (
    <Container>
      <Breadcrumb items={[{ label: 'Refund & Returns Policy' }]} className="mb-6" />
      <SectionHeading title="Refund & Returns Policy" subtitle="Hassle-free replacement policies." />
      <div className="bg-white border border-border p-6 rounded-brand-lg text-sm text-text-secondary">
        <p>Return policy details architectural shell.</p>
      </div>
    </Container>
  );
}
