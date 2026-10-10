export interface PaintCatalogueItem {
  id: string;
  title: string;
  brand: string;
  description: string;
  fileSize?: string;
  coverImage: string;
  pdfUrl: string;
  year?: string;
  category: 'paint';
}

/**
 * Centralized Paint Catalogues Data Structure.
 * Add new paint catalogue items here when PDFs are provided.
 */
export const PAINT_CATALOGUES: PaintCatalogueItem[] = [];
