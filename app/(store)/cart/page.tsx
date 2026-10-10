import React from 'react';
import { Container } from '@/components/ui/Container';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { CartContent } from '@/components/cart/CartContent';

export default function CartPage() {
  return (
    <Container className="py-6">
      <Breadcrumb items={[{ label: 'Shopping Cart' }]} className="mb-6" />
      <CartContent />
    </Container>
  );
}
