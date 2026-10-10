import React from 'react';
import { Container } from '@/components/ui/Container';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { OrderSuccessContent } from '@/components/order-success/OrderSuccessContent';

export default function OrderSuccessPage() {
  return (
    <Container className="py-6">
      <Breadcrumb
        items={[
          { label: 'Checkout', href: '/checkout' },
          { label: 'Order Success' },
        ]}
        className="mb-6"
      />
      <OrderSuccessContent />
    </Container>
  );
}
