import Link from 'next/link';
import type { CalculatorConfig } from '@/lib/calculators/types';
import { CalculatorForm } from './calculator-form';
import { QuickFacts } from './quick-facts';
import { TipsList } from './tips-list';
import { RelatedGrid } from './related-grid';
import { FaqSection } from './faq-section';

type CalculatorShellProps = {
  config: CalculatorConfig;
  clusterTitle: string;
};

export function CalculatorShell({ config, clusterTitle }: CalculatorShellProps) {
  return (
    <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <ol className="flex items-center gap-1.5 text-[0.8125rem] text-muted">
          <li>
            <Link href="/" className="transition-colors hover:text-foreground">Home</Link>
          </li>
          <li className="text-border">/</li>
          <li>
            <Link href={`/calculators/${config.cluster}`} className="transition-colors hover:text-foreground">
              {clusterTitle}
            </Link>
          </li>
          <li className="text-border">/</li>
          <li className="font-medium text-foreground">{config.title}</li>
        </ol>
      </nav>

      {/* Header */}
      <div className="mb-8 max-w-2xl">
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">
          {clusterTitle}{config.crop ? ` · ${config.crop.charAt(0).toUpperCase() + config.crop.slice(1).replace(/-/g, ' ')}` : ''}
        </p>
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          {config.title}
        </h1>
        <p className="mt-3 text-base text-muted">
          {config.description}
        </p>
      </div>

      {/* Quick Facts */}
      {config.quickFacts && config.quickFacts.length > 0 && (
        <div className="mb-8">
          <QuickFacts facts={config.quickFacts} />
        </div>
      )}

      {/* Calculator */}
      <CalculatorForm slug={config.slug} cluster={config.cluster} fields={config.fields} />

      {/* SEO Content Sections */}
      <div className="mt-14 max-w-3xl space-y-10">
        {config.tips && config.tips.length > 0 && (
          <TipsList tips={config.tips} />
        )}

        {config.relatedCalculators && config.relatedCalculators.length > 0 && (
          <RelatedGrid title="Related Calculators" items={config.relatedCalculators} />
        )}

        {config.relatedCrops && config.relatedCrops.length > 0 && (
          <RelatedGrid title="Related Crops" items={config.relatedCrops} compact />
        )}

        {config.faqs && config.faqs.length > 0 && (
          <FaqSection faqs={config.faqs} />
        )}

        {config.nextSteps && config.nextSteps.length > 0 && (
          <div>
            <h2 className="mb-4 text-lg font-bold text-foreground">
              What to Calculate Next
            </h2>
            <div className="grid gap-2 sm:grid-cols-2">
              {config.nextSteps.map((step) => (
                <Link
                  key={step.href}
                  href={step.href}
                  className="group flex items-center justify-between rounded-lg border border-border bg-white px-4 py-3 text-sm font-medium text-foreground transition-all hover:border-primary/30 hover:text-primary"
                >
                  {step.title}
                  <svg className="h-4 w-4 text-muted transition-colors group-hover:text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
