import React from 'react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

export default function PrivacyPolicyPage() {
  return (
    <Container>
      <Breadcrumb items={[{ label: 'Privacy Policy' }]} className="mb-6" />
      <SectionHeading
        title="Privacy Policy"
        subtitle="Information handling practices for AK Hardware customers."
      />
      <div className="bg-white border border-border p-6 rounded-brand-lg text-sm text-text-secondary leading-relaxed">
        <p>AK Hardware respects your privacy. Official legal policy documentation shell for Phase 1.</p>
      </div>
    </Container>
  );
}
