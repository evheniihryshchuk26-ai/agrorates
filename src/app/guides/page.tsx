import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getAllGuides } from '@/lib/guides/registry';
import '@/lib/guides/content';

export const metadata: Metadata = {
  title: 'Farming Guides — Agricultural How-To Articles',
  description:
    'Free farming guides and articles on fertilizer rates, mulch calculations, planting dates, livestock management, and more.',
  alternates: { canonical: 'https://agrorates.com/guides/' },
  openGraph: {
    title: 'Farming Guides — Agricultural How-To Articles',
    description: 'Free farming guides on fertilizer, mulch, planting, livestock, and more.',
    url: 'https://agrorates.com/guides/',
    type: 'website',
  },
};

export default function GuidesIndexPage() {
  const guides = getAllGuides();

  return (
    <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
      <nav className="mb-8">
        <ol className="flex items-center gap-1.5 text-[0.8125rem] text-muted">
          <li><Link href="/" className="transition-colors hover:text-foreground">Home</Link></li>
          <li className="text-border">/</li>
          <li className="font-medium text-foreground">Guides</li>
        </ol>
      </nav>

      <div className="mb-10 max-w-2xl">
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Farming Guides
        </h1>
        <p className="mt-3 text-base text-muted">
          Practical how-to articles for farmers, gardeners, and ranchers. Each guide links to the relevant free calculator.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {guides.map((guide) => (
          <Link
            key={guide.slug}
            href={`/guides/${guide.slug}/`}
            className="group flex flex-col rounded-xl border border-border bg-white p-5 transition-all hover:border-primary/30 hover:shadow-sm"
          >
            <h2 className="text-[0.9375rem] font-semibold text-foreground transition-colors group-hover:text-primary">
              {guide.title}
            </h2>
            <p className="mt-2 flex-1 text-[0.8125rem] leading-relaxed text-muted">
              {guide.description}
            </p>
            <span className="mt-3 flex items-center gap-1 text-xs font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
              Read guide <ArrowRight className="h-3 w-3" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
