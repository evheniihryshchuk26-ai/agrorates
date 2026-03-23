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
  const hasRelated = (config.relatedCalculators && config.relatedCalculators.length > 0) ||
    (config.nextSteps && config.nextSteps.length > 0);

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
            <Link href={`/calculators/${config.cluster}/`} className="transition-colors hover:text-foreground">
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

      {/* Calculator + Sidebar */}
      <div className="flex gap-8">
        {/* Main calculator area */}
        <div className="min-w-0 flex-1">
          <CalculatorForm slug={config.slug} cluster={config.cluster} fields={config.fields} />
        </div>

        {/* Desktop sidebar — related calcs + next steps */}
        {hasRelated && (
          <aside className="hidden w-64 shrink-0 xl:block">
            <div className="sticky top-20 space-y-6">
              {config.relatedCalculators && config.relatedCalculators.length > 0 && (
                <div>
                  <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted">
                    Related Calculators
                  </h3>
                  <ul className="space-y-1">
                    {config.relatedCalculators.slice(0, 6).map((calc) => (
                      <li key={calc.href}>
                        <Link
                          href={calc.href}
                          className="block rounded-lg px-3 py-2 text-[0.8125rem] text-muted transition-colors hover:bg-accent hover:text-foreground"
                        >
                          {calc.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {config.nextSteps && config.nextSteps.length > 0 && (
                <div>
                  <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">
                    Calculate Next
                  </h3>
                  <ul className="space-y-1">
                    {config.nextSteps.map((step) => (
                      <li key={step.href}>
                        <Link
                          href={step.href}
                          className="block rounded-lg px-3 py-2 text-[0.8125rem] font-medium text-foreground transition-colors hover:bg-primary-light hover:text-primary"
                        >
                          {step.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </aside>
        )}
      </div>

      {/* SEO Content Sections */}
      <div className="mt-14 max-w-3xl space-y-10">
        {config.howToUse && (
          <div>
            <h2 className="mb-3 text-xl font-bold text-foreground">How to Use This Calculator</h2>
            <p className="text-[0.9375rem] leading-relaxed text-muted">{config.howToUse}</p>
          </div>
        )}

        {config.whyItMatters && (
          <div>
            <h2 className="mb-3 text-xl font-bold text-foreground">Why This Matters</h2>
            <p className="text-[0.9375rem] leading-relaxed text-muted">{config.whyItMatters}</p>
          </div>
        )}

        {config.methodology && (
          <div>
            <h2 className="mb-3 text-xl font-bold text-foreground">Methodology</h2>
            <p className="text-[0.9375rem] leading-relaxed text-muted">{config.methodology}</p>
          </div>
        )}

        {config.commonMistakes && config.commonMistakes.length > 0 && (
          <div>
            <h2 className="mb-3 text-xl font-bold text-foreground">Common Mistakes to Avoid</h2>
            <ul className="space-y-2">
              {config.commonMistakes.map((mistake, i) => (
                <li key={i} className="flex items-start gap-2.5 text-[0.9375rem] text-muted">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-400" />
                  {mistake}
                </li>
              ))}
            </ul>
          </div>
        )}

        {config.tips && config.tips.length > 0 && (
          <TipsList tips={config.tips} />
        )}

        {/* Related sections — visible on mobile, hidden on XL where sidebar shows */}
        <div className="xl:hidden">
          {config.relatedCalculators && config.relatedCalculators.length > 0 && (
            <RelatedGrid title="Related Calculators" items={config.relatedCalculators} />
          )}
        </div>

        {config.relatedCrops && config.relatedCrops.length > 0 && (
          <RelatedGrid title="Related Crops" items={config.relatedCrops} compact />
        )}

        {config.faqs && config.faqs.length > 0 && (
          <FaqSection faqs={config.faqs} />
        )}

        {/* nextSteps — visible on mobile, hidden on XL */}
        {config.nextSteps && config.nextSteps.length > 0 && (
          <div className="xl:hidden">
            <h2 className="mb-4 text-lg font-bold text-foreground">What to Calculate Next</h2>
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
