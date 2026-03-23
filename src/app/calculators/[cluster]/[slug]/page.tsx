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
  const { cluster, slug } = await params;
  const calc = getCalculator(slug);
  if (!calc) return {};

  const url = `https://agrorates.com/calculators/${cluster}/${slug}`;

  return {
    title: calc.seo.title,
    description: calc.seo.description,
    alternates: { canonical: url },
    openGraph: {
      title: calc.seo.title,
      description: calc.seo.description,
      url,
      type: 'website',
    },
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

  const pageUrl = `https://agrorates.com/calculators/${cluster}/${slug}/`;

  const webAppLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: calculator.title,
    description: calculator.description,
    url: pageUrl,
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };

  const howToLd =
    calculator.howToSteps && calculator.howToSteps.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'HowTo',
          name: `How to use the ${calculator.title}`,
          description: calculator.description,
          step: calculator.howToSteps.map((text, i) => ({
            '@type': 'HowToStep',
            position: i + 1,
            text,
          })),
        }
      : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppLd) }}
      />
      {faqLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
      )}
      {howToLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToLd) }}
        />
      )}
      <CalculatorShell config={calculator} clusterTitle={clusterInfo.title} />
    </>
  );
}
