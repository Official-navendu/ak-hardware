import React from 'react';
import { discoverPDFs } from '@/lib/utils/pdf-discovery';
import { CatalogueContent } from '@/components/catalogue/CatalogueContent';

export const revalidate = 60; // Revalidate every 60 seconds

export default function CataloguePage() {
  const discoveredPdfs = discoverPDFs();

  return <CatalogueContent discoveredPdfs={discoveredPdfs} />;
}
