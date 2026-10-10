export interface Review {
  id: string;
  productId: string;
  productName?: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
  status: 'published' | 'pending' | 'rejected';
  createdAt: string;
}
