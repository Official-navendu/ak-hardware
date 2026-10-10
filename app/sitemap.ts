import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://akhardware.com';

  const routes = [
    '',
    '/shop',
    '/categories',
    '/categories/sanitary-items',
    '/categories/pipes-fittings',
    '/categories/hardware-tools',
    '/categories/tiles',
    '/categories/paint',
    '/categories/electrical-items',
    '/about',
    '/contact',
    '/blogs',
    '/catalogue',
    '/our-partners',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));
}
