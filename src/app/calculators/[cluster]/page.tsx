import Link from 'next/link';
import {
  Sprout,
  Wheat,
  CalendarDays,
  BarChart3,
  Beef,
  Droplets,
  DollarSign,
  ArrowRightLeft,
  ArrowRight,
} from 'lucide-react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { clusters, getCluster } from '@/lib/calculators/clusters';
import { getCalculatorsByCluster } from '@/lib/calculators/registry';

const iconMap: Record<string, any> = {
  Sprout,
  Wheat,
  CalendarDays,
  BarChart3,
  Beef,
  Droplets,
  DollarSign,
  ArrowRightLeft,
};

export function generateStaticParams() {
  return clusters.map((c) => ({ cluster: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ cluster: string }>;
}): Promise<Metadata> {
  const { cluster } = await params;
  const clusterInfo = getCluster(cluster);
  if (!clusterInfo) return {};

  return {
    title: `${clusterInfo.title} Calculators — ${clusterInfo.count} Free Tools`,
    description: clusterInfo.description,
  };
}

export default async function ClusterPage({
  params,
}: {
  params: Promise<{ cluster: string }>;
}) {
  const { cluster } = await params;
  const clusterInfo = getCluster(cluster);
  if (!clusterInfo) notFound();

  const calculators = getCalculatorsByCluster(clusterInfo.slug);
  const Icon = iconMap[clusterInfo.icon];

  const general = calculators.filter((c) => !c.crop);
  const cropSpecific = calculators.filter((c) => !!c.crop);

  const cropLabel = clusterInfo.slug === 'livestock' ? 'By Animal' : 'By Crop';

  return (
    <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <ol className="flex items-center gap-1.5 text-[0.8125rem] text-muted">
          <li>
            <Link href="/" className="transition-colors hover:text-foreground">
              Home
            </Link>
          </li>
          <li className="text-border">/</li>
          <li>
            <Link
              href="/calculators"
              className="transition-colors hover:text-foreground"
            >
              All Calculators
            </Link>
          </li>
          <li className="text-border">/</li>
          <li className="font-medium text-foreground">{clusterInfo.title}</li>
        </ol>
      </nav>

      {/* Header */}
      <div className="mb-10 max-w-2xl">
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">
          {clusterInfo.title}
        </p>
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          {clusterInfo.title} Calculators
          <span className="ml-2 inline-flex translate-y-[-2px] items-center rounded-md bg-accent px-2 py-0.5 align-middle text-sm font-medium text-muted">
            {clusterInfo.count}
          </span>
        </h1>
        <p className="mt-3 text-base text-muted">{clusterInfo.description}</p>
      </div>

      {/* General calculators */}
      {general.length > 0 && (
        <div className="mb-12">
          <h2 className="mb-4 text-lg font-bold text-foreground">
            General Calculators
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {general.map((calc) => (
              <Link
                key={calc.slug}
                href={`/calculators/${clusterInfo.slug}/${calc.slug}`}
                className="group flex flex-col rounded-xl border border-border bg-white p-5 transition-all hover:border-primary/30 hover:shadow-sm"
              >
                <div
                  className={`mb-3 flex h-9 w-9 items-center justify-center rounded-lg ${clusterInfo.color}`}
                >
                  {Icon && <Icon className="h-[18px] w-[18px]" />}
                </div>
                <h3 className="text-[0.9375rem] font-semibold text-foreground transition-colors group-hover:text-primary">
                  {calc.title}
                </h3>
                <p className="mt-1.5 flex-1 text-[0.8125rem] leading-relaxed text-muted">
                  {calc.description}
                </p>
                <span className="mt-3 flex items-center gap-1 text-xs font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                  Open calculator <ArrowRight className="h-3 w-3" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Crop-specific / animal-specific calculators */}
      {cropSpecific.length > 0 && (
        <div>
          <h2 className="mb-4 text-lg font-bold text-foreground">
            {cropLabel}
          </h2>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {cropSpecific.map((calc) => (
              <Link
                key={calc.slug}
                href={`/calculators/${clusterInfo.slug}/${calc.slug}`}
                className="group flex items-center gap-2 rounded-lg border border-border bg-white px-3.5 py-2.5 text-[0.8125rem] font-medium text-foreground transition-all hover:border-primary/30 hover:bg-primary-light hover:text-primary"
              >
                {Icon && (
                  <Icon className="h-3.5 w-3.5 text-muted transition-colors group-hover:text-primary" />
                )}
                {calc.crop ?? calc.title}
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
