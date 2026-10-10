import { SITE_CONFIG } from './constants';

export const STORE_CONFIG = {
  currencySymbol: '₹',
  currencyCode: 'INR',
  freeShippingThreshold: 2499, // Centralized demo free shipping threshold
  defaultShippingCharge: 150, // Centralized demo flat shipping fee
  estimatedTaxRate: 0.18, // 18% GST demo tax calculation
  announcementText: 'AK Hardware • Har Kaam, Ek Hi Naam — Quality Hardware & Home Improvement Supplies',
  storeName: SITE_CONFIG.name,
  storeTagline: SITE_CONFIG.tagline,
  contactPhone: SITE_CONFIG.phone,
  contactEmail: SITE_CONFIG.email,
  contactAddress: SITE_CONFIG.address,
};

export const config = {
  appName: process.env.NEXT_PUBLIC_APP_NAME || STORE_CONFIG.storeName,
  appUrl: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  isDev: process.env.NODE_ENV === 'development',
  isProd: process.env.NODE_ENV === 'production',
};

export function getSEOMetadata(title?: string, description?: string) {
  const metaTitle = title ? `${title} | ${STORE_CONFIG.storeName}` : STORE_CONFIG.storeName;
  const metaDescription = description || SITE_CONFIG.description;

  return {
    title: metaTitle,
    description: metaDescription,
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      siteName: STORE_CONFIG.storeName,
    },
  };
}
