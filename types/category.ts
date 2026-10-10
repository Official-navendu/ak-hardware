export interface Subcategory {
  id: string;
  name: string;
  slug: string;
  parentId?: string;
  description?: string;
  image?: string;
  isActive?: boolean;
  productCount: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image?: string;
  icon?: string;
  productCount: number;
  featured?: boolean;
  subcategories?: Subcategory[];
}

