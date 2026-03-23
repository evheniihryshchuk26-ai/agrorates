import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { crops } from '@/lib/crops';

export const metadata: Metadata = {
  title: 'Calculators by Crop — All Farming Tools by Crop Type',
  description:
    'Find free agricultural calculators organized by crop. Corn, wheat, soybeans, tomatoes, potatoes, and 17 more crops with fertilizer, seeding, yield, and planting date tools.',
  alternates: { canonical: 'https://agrorates.com/crops/' },
  openGraph: {
    title: 'Calculators by Crop — All Farming Tools by Crop Type',
    description: 'Find free agricultural calculators organized by crop.',
    url: 'https://agrorates.com/crops/',
    type: 'website',
  },
};

export default function CropsIndexPage() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
      <nav className="mb-8">
        <ol className="flex items-center gap-1.5 text-[0.8125rem] text-muted">
          <li><Link href="/" className="transition-colors hover:text-foreground">Home</Link></li>
          <li className="text-border">/</li>
          <li className="font-medium text-foreground">Crops</li>
        </ol>
      </nav>

      <div className="mb-10 max-w-2xl">
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Calculators by Crop
        </h1>
        <p className="mt-3 text-base text-muted">
          Choose a crop to see all available calculators — fertilizer rates, seeding rates, planting dates, yield estimates, and more.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {crops.map((c) => (
          <Link
            key={c.slug}
            href={`/crops/${c.slug}/`}
            className="group flex items-center justify-between rounded-xl border border-border bg-white px-5 py-4 transition-all hover:border-primary/30 hover:shadow-sm"
          >
            <div>
              <p className="text-[0.9375rem] font-semibold text-foreground transition-colors group-hover:text-primary">
                {c.name}
              </p>
              <p className="mt-0.5 text-[0.8125rem] text-muted line-clamp-1">{c.description}</p>
            </div>
            <ArrowRight className="h-4 w-4 shrink-0 text-muted opacity-0 transition-all group-hover:text-primary group-hover:opacity-100" />
          </Link>
        ))}
      </div>
    </section>
  );
}
