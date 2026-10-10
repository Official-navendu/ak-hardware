import { User } from '@/types/user';

export const MOCK_USERS: User[] = [
  {
    id: 'usr-001',
    name: 'Rajesh Sharma',
    email: 'rajesh.sharma@example.com',
    phone: '+91 98765 12345',
    role: 'customer',
    wishlistProductIds: ['prod-001', 'prod-003'],
    createdAt: '2026-01-10T09:00:00Z',
    updatedAt: '2026-09-24T10:15:00Z',
  },
  {
    id: 'usr-002',
    name: 'Anita Verma',
    email: 'anita.v@example.com',
    phone: '+91 99887 76655',
    role: 'customer',
    wishlistProductIds: ['prod-002'],
    createdAt: '2026-03-15T14:20:00Z',
    updatedAt: '2026-09-25T16:45:00Z',
  },
  {
    id: 'usr-000',
    name: 'AK Admin',
    email: 'admin@akhardware.com',
    phone: '+91 74840 34410',
    role: 'admin',
    createdAt: '2025-12-01T00:00:00Z',
    updatedAt: '2026-09-26T00:00:00Z',
  },
];
