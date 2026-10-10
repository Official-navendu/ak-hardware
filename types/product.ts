export interface ProductAttribute {
  name: string;
  value: string;
}

export interface ProductVariant {
  id: string;
  name: string; // e.g., "1 LTR", "4 LTR", "10 LTR", "20 LTR", "500 ML", "40 KG"
  sku: string;
  price: number;
  salePrice?: number;
  stock: number;
  isDefault?: boolean;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  sku: string;
  description: string;
  shortDescription: string;
  price: number;
  salePrice?: number;
  category: string;
  subcategory?: string;
  brand: string;
  images: string[];
  stock: number;
  lowStockThreshold: number;
  status: 'active' | 'draft' | 'archived' | 'out_of_stock';
  featured?: boolean;
  popular?: boolean;
  trending?: boolean;
  rating: number;
  reviewCount: number;
  attributes?: ProductAttribute[];
  variants?: ProductVariant[];
  seoTitle?: string;
  seoDescription?: string;
  createdAt: string;
  updatedAt: string;
}
