import Link from 'next/link';
import type { Metadata } from 'next';
import { Calculator, Sprout, Shield, Zap } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About AgroRates — Free Agricultural Calculator Platform',
  description:
    'AgroRates offers 184 free agricultural calculators for farmers, agronomists, and farm managers across 8 categories including fertilizer, seeding, crop yield, livestock, irrigation, and farm economics.',
  alternates: { canonical: 'https://agrorates.com/about' },
  openGraph: {
    title: 'About AgroRates — Free Agricultural Calculator Platform',
    description:
      'AgroRates offers 184 free agricultural calculators for farmers, agronomists, and farm managers.',
    url: 'https://agrorates.com/about',
    type: 'website',
  },
};

const features = [
  {
    icon: Calculator,
    title: '184 Free Calculators',
    desc: 'Covering fertilizer rates, seed rates, planting dates, crop yield, livestock management, irrigation, farm economics, and unit conversions.',
  },
  {
    icon: Zap,
    title: 'Instant Results',
    desc: 'All calculators run in your browser. No account needed, no data stored, no downloads. Enter your values and get answers immediately.',
  },
  {
    icon: Sprout,
    title: 'Agronomic Accuracy',
    desc: 'Built on university extension guidelines, USDA reference data, and widely accepted agronomic formulas used by professionals.',
  },
  {
    icon: Shield,
    title: '100% Free, No Ads',
    desc: 'AgroRates is free to use with no hidden costs, no subscriptions, and no intrusive advertising. Just tools that work.',
  },
];

const categories = [
  { name: 'Fertilizer & Soil', count: 27, href: '/calculators/fertilizer' },
  { name: 'Seed & Planting', count: 29, href: '/calculators/seeding' },
  { name: 'Planting Date', count: 44, href: '/calculators/planting-date' },
  { name: 'Crop Yield & Harvest', count: 27, href: '/calculators/yield' },
  { name: 'Livestock', count: 23, href: '/calculators/livestock' },
  { name: 'Irrigation & Water', count: 9, href: '/calculators/irrigation' },
  { name: 'Farm Economics', count: 11, href: '/calculators/economics' },
  { name: 'Conversions & Reference', count: 14, href: '/calculators/conversions' },
];

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'AgroRates',
            url: 'https://agrorates.com',
            logo: 'https://agrorates.com/og.png',
            description:
              'Free agricultural calculator platform offering 184 calculators for farmers, agronomists, and farm managers.',
            foundingDate: '2026',
          }),
        }}
      />

      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center gap-1.5 text-[0.8125rem] text-muted">
            <li>
              <Link href="/" className="transition-colors hover:text-foreground">Home</Link>
            </li>
            <li className="text-border">/</li>
            <li className="font-medium text-foreground">About</li>
          </ol>
        </nav>

        {/* Header */}
        <div className="mb-12 max-w-3xl">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">
            About Us
          </p>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
            Free Agricultural Calculators for Every Farmer
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
            AgroRates is a free online platform built for farmers, agronomists,
            ranchers, and agricultural students. We provide accurate, easy-to-use
            calculators so you can make better decisions in the field — without
            expensive software or subscriptions.
          </p>
        </div>

        {/* Features grid */}
        <div className="mb-16 grid gap-4 sm:grid-cols-2">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-xl border border-border bg-white p-6"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary-light text-primary">
                <f.icon className="h-5 w-5" />
              </div>
              <h2 className="text-[0.9375rem] font-semibold text-foreground">
                {f.title}
              </h2>
              <p className="mt-2 text-[0.8125rem] leading-relaxed text-muted">
                {f.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Categories */}
        <div className="mb-16">
          <h2 className="mb-6 text-xl font-bold tracking-tight text-foreground">
            8 Calculator Categories
          </h2>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                className="flex items-center justify-between rounded-lg border border-border bg-white px-4 py-3 text-sm transition-all hover:border-primary/30 hover:text-primary"
              >
                <span className="font-medium text-foreground">{cat.name}</span>
                <span className="rounded-md bg-accent px-2 py-0.5 text-xs font-medium text-muted">
                  {cat.count}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Mission */}
        <div className="max-w-3xl">
          <h2 className="mb-4 text-xl font-bold tracking-tight text-foreground">
            Our Mission
          </h2>
          <div className="space-y-4 text-[0.9375rem] leading-relaxed text-muted">
            <p>
              Agriculture is the backbone of our food supply, yet many farmers
              still rely on guesswork for critical calculations. Over-applying
              fertilizer wastes money and harms the environment.
              Under-seeding reduces yields. Miscalculating feed costs can make
              the difference between profit and loss.
            </p>
            <p>
              AgroRates exists to put professional-grade planning tools in the
              hands of every farmer — from small-scale market gardeners to
              large commercial operations. Our calculators cover the full
              spectrum of farm management: from NPK fertilizer rates and seed
              spacing to livestock feed costs, irrigation planning, and
              financial analysis.
            </p>
            <p>
              Every calculator is built on widely accepted agronomic formulas,
              university extension guidelines, and USDA reference data. While
              they provide solid starting points, they are not a replacement for
              professional soil testing, local extension advice, or
              crop-consultant recommendations. Always verify results against
              your specific conditions.
            </p>
          </div>

          <h2 className="mb-4 mt-10 text-xl font-bold tracking-tight text-foreground">
            Who Uses AgroRates?
          </h2>
          <ul className="space-y-2 text-[0.9375rem] text-muted">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <span><strong className="text-foreground">Row crop farmers</strong> calculating fertilizer rates and break-even prices for corn, wheat, soybeans, and more</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <span><strong className="text-foreground">Livestock producers</strong> estimating feed costs, hay requirements, and stocking rates</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <span><strong className="text-foreground">Market gardeners</strong> planning mulch, compost, and soil volumes for beds and greenhouses</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <span><strong className="text-foreground">Ag students</strong> learning agronomic calculations and farm financial planning</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <span><strong className="text-foreground">Farm managers</strong> running quick cost analyses, ROI estimates, and loan calculations</span>
            </li>
          </ul>

          <div className="mt-10">
            <p className="text-[0.9375rem] text-muted">
              Have a question or suggestion?{' '}
              <Link
                href="/contact"
                className="font-medium text-primary underline underline-offset-2 hover:text-primary-hover"
              >
                Contact us
              </Link>
              . We read every message.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
