import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCluster } from '@/lib/calculators/clusters';
import {
  getCalculator,
  getAllCalculators,
} from '@/lib/calculators/registry';
import { CalculatorShell } from '@/components/calculators/calculator-shell';

export function generateStaticParams() {
  const all = getAllCalculators();
  return all.map((c) => ({ cluster: c.cluster, slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ cluster: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const calc = getCalculator(slug);
  if (!calc) return {};

  return {
    title: calc.seo.title,
    description: calc.seo.description,
  };
}

export default async function CalculatorPage({
  params,
}: {
  params: Promise<{ cluster: string; slug: string }>;
}) {
  const { cluster, slug } = await params;
  const calculator = getCalculator(slug);

  if (!calculator || calculator.cluster !== cluster) {
    notFound();
  }

  const clusterInfo = getCluster(cluster);
  if (!clusterInfo) notFound();

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://agrorates.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: clusterInfo.title,
        item: `https://agrorates.com/calculators/${cluster}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: calculator.title,
        item: `https://agrorates.com/calculators/${cluster}/${slug}`,
      },
    ],
  };

  const faqLd =
    calculator.faqs && calculator.faqs.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: calculator.faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer,
            },
          })),
        }
      : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      {faqLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
      )}
      <CalculatorShell config={calculator} clusterTitle={clusterInfo.title} />
    </>
  );
}
