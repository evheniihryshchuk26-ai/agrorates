import type { Metadata } from 'next';
import Link from 'next/link';
import { glossaryTerms } from '@/lib/glossary';

export const metadata: Metadata = {
  title: 'Agricultural Glossary — Farming Terms & Definitions',
  description:
    'Learn key agricultural terms: NPK, bushel, test weight, evapotranspiration, stocking rate, and more. Clear definitions for farmers and students.',
  alternates: { canonical: 'https://agrorates.com/glossary/' },
  openGraph: {
    title: 'Agricultural Glossary — Farming Terms & Definitions',
    description: 'Learn key agricultural terms with clear definitions for farmers.',
    url: 'https://agrorates.com/glossary/',
    type: 'website',
  },
};

export default function GlossaryIndexPage() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
      <nav className="mb-8">
        <ol className="flex items-center gap-1.5 text-[0.8125rem] text-muted">
          <li><Link href="/" className="transition-colors hover:text-foreground">Home</Link></li>
          <li className="text-border">/</li>
          <li className="font-medium text-foreground">Glossary</li>
        </ol>
      </nav>

      <div className="mb-10 max-w-2xl">
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Agricultural Glossary
        </h1>
        <p className="mt-3 text-base text-muted">
          Key farming terms and definitions every farmer, agronomist, and agricultural student should know.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {glossaryTerms.map((t) => (
          <Link
            key={t.slug}
            href={`/glossary/${t.slug}/`}
            className="group rounded-xl border border-border bg-white p-4 transition-all hover:border-primary/30 hover:shadow-sm"
          >
            <h2 className="text-[0.9375rem] font-semibold text-foreground transition-colors group-hover:text-primary">
              {t.term}
            </h2>
            <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-muted line-clamp-2">
              {t.shortDef}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
