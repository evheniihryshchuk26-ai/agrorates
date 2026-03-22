import type { MetadataRoute } from 'next';
import { clusters } from '@/lib/calculators/clusters';
import { getAllCalculators } from '@/lib/calculators/registry';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://agrorates.com';

  const staticPages: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${base}/calculators`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
    { url: `${base}/privacy`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
  ];

  const clusterPages: MetadataRoute.Sitemap = clusters.map((c) => ({
    url: `${base}/calculators/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  const allCalcs = getAllCalculators();
  const calculatorPages: MetadataRoute.Sitemap = allCalcs.map((calc) => ({
    url: `${base}/calculators/${calc.cluster}/${calc.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: calc.crop ? 0.7 : 0.8,
  }));

  return [...staticPages, ...clusterPages, ...calculatorPages];
}
