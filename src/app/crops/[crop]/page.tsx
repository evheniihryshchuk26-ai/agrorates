import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { crops, getCrop } from '@/lib/crops';
import { getAllCalculators } from '@/lib/calculators/registry';
import { clusters } from '@/lib/calculators/clusters';

export function generateStaticParams() {
  return crops.map((c) => ({ crop: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ crop: string }>;
}): Promise<Metadata> {
  const { crop } = await params;
  const info = getCrop(crop);
  if (!info) return {};

  const url = `https://agrorates.com/crops/${crop}/`;
  return {
    title: `${info.name} Calculators — Free Farming Tools for ${info.name}`,
    description: `All free ${info.name.toLowerCase()} calculators in one place: fertilizer rates, seeding rates, planting dates, yield estimates, and more. Plan your ${info.name.toLowerCase()} operation with accurate tools.`,
    alternates: { canonical: url },
    openGraph: {
      title: `${info.name} Calculators — Free Farming Tools`,
      description: `All free ${info.name.toLowerCase()} calculators: fertilizer, seeding, planting dates, yield, and economics.`,
      url,
      type: 'website',
    },
  };
}

export default async function CropHubPage({
  params,
}: {
  params: Promise<{ crop: string }>;
}) {
  const { crop } = await params;
  const info = getCrop(crop);
  if (!info) notFound();

  const allCalcs = getAllCalculators();

  // Find all calculators for this crop across all clusters
  const cropCalcs = allCalcs.filter(
    (c) => c.crop === crop || c.slug === crop || c.slug === `${crop}-planting-date`
  );

  // Group by cluster
  const byCluster = new Map<string, typeof cropCalcs>();
  for (const calc of cropCalcs) {
    const list = byCluster.get(calc.cluster) || [];
    list.push(calc);
    byCluster.set(calc.cluster, list);
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agrorates.com' },
      { '@type': 'ListItem', position: 2, name: 'Crops', item: 'https://agrorates.com/crops/' },
      { '@type': 'ListItem', position: 3, name: info.name, item: `https://agrorates.com/crops/${crop}/` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center gap-1.5 text-[0.8125rem] text-muted">
            <li><Link href="/" className="transition-colors hover:text-foreground">Home</Link></li>
            <li className="text-border">/</li>
            <li><Link href="/crops/" className="transition-colors hover:text-foreground">Crops</Link></li>
            <li className="text-border">/</li>
            <li className="font-medium text-foreground">{info.name}</li>
          </ol>
        </nav>

        {/* Header */}
        <div className="mb-10 max-w-3xl">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">
            {info.category}
          </p>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
            {info.name} Calculators
          </h1>
          <p className="mt-3 text-base leading-relaxed text-muted sm:text-lg">
            {info.description} Use the free tools below to plan fertilizer rates, seeding rates, planting dates, yield estimates, and costs for your {info.name.toLowerCase()} operation.
          </p>
        </div>

        {/* Calculator count */}
        <div className="mb-8 rounded-xl border border-border bg-white px-5 py-4">
          <p className="text-sm text-muted">
            <span className="font-bold text-foreground">{cropCalcs.length} free calculators</span> for {info.name.toLowerCase()} across {byCluster.size} categories
          </p>
        </div>

        {/* Calculators by cluster */}
        <div className="space-y-10">
          {Array.from(byCluster.entries()).map(([clusterSlug, calcs]) => {
            const cluster = clusters.find((c) => c.slug === clusterSlug);
            return (
              <div key={clusterSlug}>
                <h2 className="mb-4 text-lg font-bold text-foreground">
                  {cluster?.title || clusterSlug}
                </h2>
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {calcs.map((calc) => (
                    <Link
                      key={calc.slug}
                      href={`/calculators/${calc.cluster}/${calc.slug}/`}
                      className="group flex items-center justify-between rounded-xl border border-border bg-white px-4 py-3.5 transition-all hover:border-primary/30 hover:shadow-sm"
                    >
                      <div>
                        <p className="text-[0.9375rem] font-semibold text-foreground transition-colors group-hover:text-primary">
                          {calc.title}
                        </p>
                        <p className="mt-0.5 text-[0.8125rem] text-muted line-clamp-1">
                          {calc.description}
                        </p>
                      </div>
                      <ArrowRight className="h-4 w-4 shrink-0 text-muted opacity-0 transition-all group-hover:text-primary group-hover:opacity-100" />
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Related crops */}
        <div className="mt-14">
          <h2 className="mb-4 text-lg font-bold text-foreground">Other Crops</h2>
          <div className="flex flex-wrap gap-2">
            {crops
              .filter((c) => c.slug !== crop)
              .slice(0, 12)
              .map((c) => (
                <Link
                  key={c.slug}
                  href={`/crops/${c.slug}/`}
                  className="rounded-lg border border-border bg-white px-3.5 py-2 text-[0.8125rem] font-medium text-foreground transition-all hover:border-primary/30 hover:text-primary"
                >
                  {c.name}
                </Link>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
