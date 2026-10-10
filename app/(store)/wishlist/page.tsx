import React from 'react';
import { Container } from '@/components/ui/Container';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { WishlistContent } from '@/components/wishlist/WishlistContent';

export default function StoreWishlistPage() {
  return (
    <Container className="py-6">
      <Breadcrumb items={[{ label: 'Saved Wishlist' }]} className="mb-6" />
      <WishlistContent />
    </Container>
  );
}
