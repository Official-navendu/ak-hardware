export {
  SITE_CONFIG,
  COLOR_TOKENS,
  NAV_LINKS,
  FOOTER_QUICK_LINKS,
  FOOTER_POLICY_LINKS,
  SOCIAL_LINKS,
  PAYMENT_METHODS,
} from '@/lib/data/site-config';

export { CATEGORIES_DATA, type CategoryItem } from '@/lib/data/categories';

export const CATEGORY_NAVIGATION = [
  { name: 'Sanitary Items', slug: 'sanitary-items', subtitle: 'Bathroom & sanitary products' },
  { name: 'Pipes & Fittings', slug: 'pipes-fittings', subtitle: 'Pipes, connectors & fittings' },
  { name: 'Hardware Tools', slug: 'hardware-tools', subtitle: 'Professional hardware tools' },
  { name: 'Tiles', slug: 'tiles', subtitle: 'Floor & wall tiles' },
  { name: 'Paint', slug: 'paint', subtitle: 'Interior & exterior paints' },
  { name: 'Electrical Items', slug: 'electrical-items', subtitle: 'Electrical accessories & products' },
];

export const FOOTER_SECTIONS = {
  quickLinks: [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Blogs', href: '/blog' },
    { label: 'Shop', href: '/shop' },
    { label: 'Contact', href: '/contact' },
  ],
  policies: [
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms & Conditions', href: '/terms' },
    { label: 'Shipping Policy', href: '/shipping-policy' },
    { label: 'Return & Refund Policy', href: '/refund-policy' },
    { label: 'Cookie Policy', href: '/cookie-policy' },
  ],
};
