import { Address } from './order';

export type UserRole = 'customer' | 'admin' | 'staff';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  role: UserRole;
  addresses?: Address[];
  wishlistProductIds?: string[];
  createdAt: string;
  updatedAt: string;
}
