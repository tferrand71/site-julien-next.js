import type { MetadataRoute } from 'next';

const SITE_URL = 'https://julienjacquemart.com';
const locales = ['fr', 'en', 'de', 'es'];
const pages = [
  '',
  '/biography',
  '/events',
  '/media',
  '/repertoire',
  '/projects',
  '/seasons',
  '/contact',
  '/legal',
  '/privacy',
  '/terms',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const page of pages) {
    const alternates: Record<string, string> = {};
    for (const locale of locales) {
      alternates[locale] = `${SITE_URL}/${locale}${page}`;
    }

    entries.push({
      url: `${SITE_URL}/fr${page}`,
      lastModified: new Date(),
      changeFrequency: page === '' ? 'weekly' : 'monthly',
      priority: page === '' ? 1.0 : page === '/biography' ? 0.9 : 0.7,
      alternates: {
        languages: alternates,
      },
    });
  }

  return entries;
}
