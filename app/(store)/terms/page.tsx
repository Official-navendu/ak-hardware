import React from 'react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

export default function TermsPage() {
  return (
    <Container>
      <Breadcrumb items={[{ label: 'Terms & Conditions' }]} className="mb-6" />
      <SectionHeading title="Terms & Conditions" subtitle="Store usage and order terms." />
      <div className="bg-white border border-border p-6 rounded-brand-lg text-sm text-text-secondary">
        <p>AK Hardware terms of service architectural document shell.</p>
      </div>
    </Container>
  );
}
