import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { glossaryTerms, getGlossaryTerm } from '@/lib/glossary';

export function generateStaticParams() {
  return glossaryTerms.map((t) => ({ term: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ term: string }>;
}): Promise<Metadata> {
  const { term } = await params;
  const t = getGlossaryTerm(term);
  if (!t) return {};

  const url = `https://agrorates.com/glossary/${term}/`;
  return {
    title: `${t.term} — Agricultural Definition`,
    description: t.shortDef,
    alternates: { canonical: url },
    openGraph: {
      title: `${t.term} — What It Means in Agriculture`,
      description: t.shortDef,
      url,
      type: 'article',
    },
  };
}

export default async function GlossaryTermPage({
  params,
}: {
  params: Promise<{ term: string }>;
}) {
  const { term } = await params;
  const t = getGlossaryTerm(term);
  if (!t) notFound();

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agrorates.com' },
      { '@type': 'ListItem', position: 2, name: 'Glossary', item: 'https://agrorates.com/glossary/' },
      { '@type': 'ListItem', position: 3, name: t.term, item: `https://agrorates.com/glossary/${term}/` },
    ],
  };

  const definedTermLd = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    name: t.term,
    description: t.fullDef,
    inDefinedTermSet: {
      '@type': 'DefinedTermSet',
      name: 'AgroRates Agricultural Glossary',
      url: 'https://agrorates.com/glossary/',
    },
  };

  const relatedTermObjects = t.relatedTerms
    .map((slug) => glossaryTerms.find((gt) => gt.slug === slug))
    .filter(Boolean);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermLd) }} />

      <article className="mx-auto max-w-3xl px-5 py-10 sm:px-8 sm:py-14">
        <nav className="mb-8">
          <ol className="flex items-center gap-1.5 text-[0.8125rem] text-muted">
            <li><Link href="/" className="transition-colors hover:text-foreground">Home</Link></li>
            <li className="text-border">/</li>
            <li><Link href="/glossary/" className="transition-colors hover:text-foreground">Glossary</Link></li>
            <li className="text-border">/</li>
            <li className="font-medium text-foreground">{t.term}</li>
          </ol>
        </nav>

        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          {t.term}
        </h1>
        <p className="mt-2 text-lg font-medium text-primary">{t.shortDef}</p>

        <div className="mt-6 text-[0.9375rem] leading-relaxed text-muted">
          <p>{t.fullDef}</p>
        </div>

        {/* Related Calculators */}
        {t.relatedCalculators.length > 0 && (
          <div className="mt-10">
            <h2 className="mb-4 text-lg font-bold text-foreground">Related Calculators</h2>
            <div className="grid gap-2 sm:grid-cols-2">
              {t.relatedCalculators.map((calc) => (
                <Link
                  key={calc.href}
                  href={calc.href}
                  className="group flex items-center justify-between rounded-lg border border-border bg-white px-4 py-3 text-sm font-medium text-foreground transition-all hover:border-primary/30 hover:text-primary"
                >
                  {calc.title}
                  <ArrowRight className="h-3.5 w-3.5 text-muted opacity-0 transition-all group-hover:text-primary group-hover:opacity-100" />
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Related Terms */}
        {relatedTermObjects.length > 0 && (
          <div className="mt-10">
            <h2 className="mb-4 text-lg font-bold text-foreground">Related Terms</h2>
            <div className="flex flex-wrap gap-2">
              {relatedTermObjects.map((rt) => (
                <Link
                  key={rt!.slug}
                  href={`/glossary/${rt!.slug}/`}
                  className="rounded-lg border border-border bg-white px-3.5 py-2 text-[0.8125rem] font-medium text-foreground transition-all hover:border-primary/30 hover:text-primary"
                >
                  {rt!.term}
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </>
  );
}
