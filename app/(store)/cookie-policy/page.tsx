import React from 'react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

export default function CookiePolicyPage() {
  return (
    <Container>
      <Breadcrumb items={[{ label: 'Cookie Policy' }]} className="mb-6" />
      <SectionHeading title="Cookie Policy" subtitle="Website analytics cookies usage." />
      <div className="bg-white border border-border p-6 rounded-brand-lg text-sm text-text-secondary">
        <p>Cookie policy architectural shell.</p>
      </div>
    </Container>
  );
}
