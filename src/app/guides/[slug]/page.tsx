import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { getGuide, getAllGuides } from '@/lib/guides/registry';
import '@/lib/guides/content';

export function generateStaticParams() {
  return getAllGuides().map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};

  const url = `https://agrorates.com/guides/${slug}/`;
  return {
    title: guide.title,
    description: guide.description,
    alternates: { canonical: url },
    openGraph: {
      title: guide.title,
      description: guide.description,
      url,
      type: 'article',
    },
  };
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agrorates.com' },
      { '@type': 'ListItem', position: 2, name: 'Guides', item: 'https://agrorates.com/guides/' },
      { '@type': 'ListItem', position: 3, name: guide.title, item: `https://agrorates.com/guides/${slug}/` },
    ],
  };

  const faqLd = guide.faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: guide.faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  } : null;

  const paragraphs = guide.content.split('\n\n').filter(Boolean);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      {faqLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />}

      <article className="mx-auto max-w-3xl px-5 py-10 sm:px-8 sm:py-14">
        <nav className="mb-8">
          <ol className="flex items-center gap-1.5 text-[0.8125rem] text-muted">
            <li><Link href="/" className="transition-colors hover:text-foreground">Home</Link></li>
            <li className="text-border">/</li>
            <li><Link href="/guides/" className="transition-colors hover:text-foreground">Guides</Link></li>
            <li className="text-border">/</li>
            <li className="font-medium text-foreground">{guide.title}</li>
          </ol>
        </nav>

        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          {guide.title}
        </h1>
        <p className="mt-3 text-base text-muted">{guide.description}</p>

        <div className="mt-8 space-y-4 text-[0.9375rem] leading-relaxed text-muted">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        {/* Related Calculators */}
        {guide.relatedCalculators.length > 0 && (
          <div className="mt-10">
            <h2 className="mb-4 text-lg font-bold text-foreground">Related Calculators</h2>
            <div className="grid gap-2 sm:grid-cols-2">
              {guide.relatedCalculators.map((calc) => (
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

        {/* FAQs */}
        {guide.faqs.length > 0 && (
          <div className="mt-10">
            <h2 className="mb-4 text-lg font-bold text-foreground">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {guide.faqs.map((faq, i) => (
                <div key={i} className="rounded-lg border border-border bg-white p-4">
                  <h3 className="text-[0.9375rem] font-semibold text-foreground">{faq.question}</h3>
                  <p className="mt-2 text-[0.8125rem] leading-relaxed text-muted">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </article>
    </>
  );
}
