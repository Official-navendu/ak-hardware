import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/ashish/', '/ashish'],
    },
    sitemap: 'https://akhardware.com/sitemap.xml',
  };
}
