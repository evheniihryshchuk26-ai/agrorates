import type { MetadataRoute } from 'next';
import { clusters } from '@/lib/calculators/clusters';
import { getAllCalculators } from '@/lib/calculators/registry';
import { crops } from '@/lib/crops';
import { glossaryTerms } from '@/lib/glossary';
import { getAllGuides } from '@/lib/guides/registry';
import '@/lib/guides/content';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://agrorates.com';

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: new Date('2026-03-23'), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${base}/calculators/`, lastModified: new Date('2026-03-23'), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/crops/`, lastModified: new Date('2026-03-23'), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/guides/`, lastModified: new Date('2026-03-23'), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/glossary/`, lastModified: new Date('2026-03-23'), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/about/`, lastModified: new Date('2026-03-23'), changeFrequency: 'monthly', priority: 0.3 },
    { url: `${base}/privacy/`, lastModified: new Date('2026-03-23'), changeFrequency: 'monthly', priority: 0.3 },
    { url: `${base}/contact/`, lastModified: new Date('2026-03-23'), changeFrequency: 'monthly', priority: 0.3 },
  ];

  const clusterPages: MetadataRoute.Sitemap = clusters.map((c) => ({
    url: `${base}/calculators/${c.slug}/`,
    lastModified: new Date('2026-03-23'),
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  const allCalcs = getAllCalculators();
  const calculatorPages: MetadataRoute.Sitemap = allCalcs.map((calc) => ({
    url: `${base}/calculators/${calc.cluster}/${calc.slug}/`,
    lastModified: new Date('2026-03-23'),
    changeFrequency: 'monthly',
    priority: calc.crop ? 0.7 : 0.8,
  }));

  const cropPages: MetadataRoute.Sitemap = crops.map((c) => ({
    url: `${base}/crops/${c.slug}/`,
    lastModified: new Date('2026-03-23'),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const guidePages: MetadataRoute.Sitemap = getAllGuides().map((g) => ({
    url: `${base}/guides/${g.slug}/`,
    lastModified: new Date('2026-03-23'),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const glossaryPages: MetadataRoute.Sitemap = glossaryTerms.map((t) => ({
    url: `${base}/glossary/${t.slug}/`,
    lastModified: new Date('2026-03-23'),
    changeFrequency: 'monthly',
    priority: 0.5,
  }));

  return [
    ...staticPages,
    ...clusterPages,
    ...calculatorPages,
    ...cropPages,
    ...guidePages,
    ...glossaryPages,
  ];
}
