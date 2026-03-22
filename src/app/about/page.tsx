import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About AgroRates',
  description:
    'Learn about AgroRates — a free platform offering 184 agricultural calculators to help farmers plan fertilizer rates, seed rates, crop yields, and more.',
};

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-3xl px-5 py-10 sm:px-8 sm:py-14">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <ol className="flex items-center gap-1.5 text-[0.8125rem] text-muted">
          <li>
            <Link href="/" className="transition-colors hover:text-foreground">
              Home
            </Link>
          </li>
          <li className="text-border">/</li>
          <li className="font-medium text-foreground">About</li>
        </ol>
      </nav>

      <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
        About AgroRates
      </h1>

      <div className="mt-6 space-y-5 text-[0.9375rem] leading-relaxed text-muted">
        <p>
          AgroRates is a free online platform built for farmers, agronomists,
          ranchers, and agricultural students. Our goal is simple: give you
          accurate, easy-to-use calculators so you can make better decisions in
          the field without paying for expensive software or subscriptions.
        </p>

        <p>
          We currently offer <strong className="text-foreground">184 calculators</strong> across{' '}
          <strong className="text-foreground">8 categories</strong> — fertilizer
          and soil, seed and planting, planting dates, crop yield and harvest,
          livestock management, irrigation and water, farm economics, and unit
          conversions. Every tool runs entirely in your browser; we never store
          your data or require an account.
        </p>

        <p>
          The calculators are built on widely accepted agronomic formulas,
          university extension guidelines, and USDA reference data. While they
          provide solid starting points for planning, they are not a replacement
          for professional soil testing, local extension advice, or
          crop-consultant recommendations. Always verify results against your
          specific conditions.
        </p>

        <p>
          AgroRates is and will remain free. If you find the tools helpful,
          share them with a fellow farmer — that is the best way to support the
          project. For questions, suggestions, or corrections, reach out on our{' '}
          <Link
            href="/contact"
            className="font-medium text-primary underline underline-offset-2 hover:text-primary-hover"
          >
            contact page
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
