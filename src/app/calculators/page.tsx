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
import { clusters } from '@/lib/calculators/clusters';

export const metadata: Metadata = {
  title: 'All Agricultural Calculators — 184 Free Tools',
  description:
    'Browse 184 free agricultural calculators across 8 categories: fertilizer, seeding, planting dates, crop yield, livestock, irrigation, farm economics, and unit conversions.',
  alternates: { canonical: 'https://agrorates.com/calculators' },
  openGraph: {
    title: 'All Agricultural Calculators — 184 Free Farming Tools',
    description: 'Browse 184 free agricultural calculators across 8 categories.',
    url: 'https://agrorates.com/calculators',
    type: 'website',
  },
};

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

export default function AllCalculatorsPage() {
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
          <li className="font-medium text-foreground">All Calculators</li>
        </ol>
      </nav>

      {/* Header */}
      <div className="mb-10 max-w-2xl">
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          All Calculators
          <span className="ml-2 inline-flex translate-y-[-2px] items-center rounded-md bg-accent px-2 py-0.5 align-middle text-sm font-medium text-muted">
            184
          </span>
        </h1>
        <p className="mt-3 text-base text-muted">
          Browse every free agricultural calculator on AgroRates. Choose a
          category below to find fertilizer rates, seed rates, planting dates,
          crop yields, livestock tools, irrigation planners, farm economics, and
          unit conversions.
        </p>
      </div>

      {/* Cluster grid */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {clusters.map((c) => {
          const Icon = iconMap[c.icon];
          return (
            <Link
              key={c.slug}
              href={`/calculators/${c.slug}`}
              className="group flex flex-col rounded-xl border border-border bg-white p-5 transition-all hover:border-primary/30 hover:shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-lg ${c.color}`}
                >
                  {Icon && <Icon className="h-5 w-5" />}
                </div>
                <span className="rounded-md bg-accent px-2 py-0.5 text-xs font-medium text-muted">
                  {c.count}
                </span>
              </div>
              <h2 className="mt-3 text-[0.9375rem] font-semibold text-foreground">
                {c.title}
              </h2>
              <p className="mt-1.5 flex-1 text-[0.8125rem] leading-relaxed text-muted">
                {c.description}
              </p>
              <span className="mt-3 flex items-center gap-1 text-xs font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                View calculators <ArrowRight className="h-3 w-3" />
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
