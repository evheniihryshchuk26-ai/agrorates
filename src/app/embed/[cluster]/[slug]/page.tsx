import { notFound } from 'next/navigation';
import { getCalculator, getAllCalculators } from '@/lib/calculators/registry';
import { CalculatorForm } from '@/components/calculators/calculator-form';

export function generateStaticParams() {
  return getAllCalculators().map((c) => ({ cluster: c.cluster, slug: c.slug }));
}

export default async function EmbedCalculatorPage({
  params,
}: {
  params: Promise<{ cluster: string; slug: string }>;
}) {
  const { cluster, slug } = await params;
  const calculator = getCalculator(slug);
  if (!calculator || calculator.cluster !== cluster) notFound();

  return (
    <div className="p-4">
      <div className="mb-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">
          AgroRates
        </p>
        <h1 className="text-lg font-bold text-foreground">{calculator.title}</h1>
        <p className="mt-1 text-[0.8125rem] text-muted">{calculator.description}</p>
      </div>
      <CalculatorForm slug={slug} cluster={cluster} fields={calculator.fields} />
      <p className="mt-4 text-center text-2xs text-muted">
        Powered by{' '}
        <a
          href={`https://agrorates.com/calculators/${cluster}/${slug}/`}
          target="_blank"
          rel="noopener"
          className="font-medium text-primary hover:underline"
        >
          AgroRates
        </a>
        {' '}— Free Agricultural Calculators
      </p>
    </div>
  );
}
