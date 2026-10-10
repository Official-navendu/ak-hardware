import { Review } from '@/types/review';

export const MOCK_REVIEWS: Review[] = [
  {
    id: 'rev-101',
    productId: 'prod-001',
    productName: 'AK Industrial Heavy-Duty 20V Cordless Brushless Rotary Hammer Drill',
    userId: 'usr-001',
    userName: 'Rajesh Sharma',
    rating: 5,
    title: 'Outstanding power for concrete drilling',
    comment: 'Used this rotary hammer on a commercial site for drilling 12mm anchor holes in RCC beam. Motor didn’t even warm up after 50 holes. Exceptional battery endurance!',
    verifiedPurchase: true,
    status: 'published',
    createdAt: '2026-09-20T11:30:00Z',
  },
  {
    id: 'rev-102',
    productId: 'prod-003',
    productName: 'AK Master 108-Piece Chrome Vanadium Mechanics Tool Set',
    userId: 'usr-002',
    userName: 'Anita Verma',
    rating: 5,
    title: 'Top notch steel quality & crisp ratchet engagement',
    comment: 'The 72-tooth ratchet has very tight tolerance and close arc swing. Socket fitment on bolts is snug without slippage. The storage case is also very sturdy.',
    verifiedPurchase: true,
    status: 'published',
    createdAt: '2026-09-22T14:45:00Z',
  },
];
