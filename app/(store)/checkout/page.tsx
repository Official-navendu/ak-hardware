import React from 'react';
import { Container } from '@/components/ui/Container';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { CheckoutContent } from '@/components/checkout/CheckoutContent';

export default function CheckoutPage() {
  return (
    <Container className="py-6">
      <Breadcrumb
        items={[
          { label: 'Cart', href: '/cart' },
          { label: 'Checkout' },
        ]}
        className="mb-6"
      />
      <CheckoutContent />
    </Container>
  );
}
