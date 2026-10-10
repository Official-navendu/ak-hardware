import { Product, ProductVariant } from './product';

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  selectedVariant?: ProductVariant;
}

export interface CartSummary {
  items: CartItem[];
  subtotal: number;
  discount: number;
  estimatedShipping: number;
  estimatedTax: number;
  total: number;
  itemCount: number;
}
