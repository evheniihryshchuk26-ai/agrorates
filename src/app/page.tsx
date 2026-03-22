import Link from 'next/link';
import {
  Sprout,
  Wheat,
  Droplets,
  DollarSign,
  ArrowRight,
  Calculator,
  Beef,
  CalendarDays,
  ArrowRightLeft,
} from 'lucide-react';
import { HeroAnimation } from '@/components/hero-animation';

const clusters = [
  {
    title: 'Fertilizer & Soil',
    desc: 'NPK rates, lime, compost, and nutrient calculators for 22 crops.',
    icon: Sprout,
    count: 27,
    href: '/calculators/fertilizer',
    color: 'bg-green-50 text-green-700',
  },
  {
    title: 'Seed & Planting',
    desc: 'Seed rates, plant spacing, germination, and cost per acre.',
    icon: Wheat,
    count: 29,
    href: '/calculators/seeding',
    color: 'bg-amber-50 text-amber-700',
  },
  {
    title: 'Planting Date',
    desc: 'When to plant 44 crops by USDA hardiness zone.',
    icon: CalendarDays,
    count: 44,
    href: '/calculators/planting-date',
    color: 'bg-sky-50 text-sky-700',
  },
  {
    title: 'Crop Yield',
    desc: 'Yield per acre, harvest loss, grain moisture, and storage.',
    icon: Calculator,
    count: 27,
    href: '/calculators/yield',
    color: 'bg-orange-50 text-orange-700',
  },
  {
    title: 'Livestock',
    desc: 'Feed conversion, weight, stocking rate, hay, and gestation.',
    icon: Beef,
    count: 23,
    href: '/calculators/livestock',
    color: 'bg-rose-50 text-rose-700',
  },
  {
    title: 'Irrigation & Water',
    desc: 'Drip, sprinkler, water cost, pond sizing, and well yield.',
    icon: Droplets,
    count: 9,
    href: '/calculators/irrigation',
    color: 'bg-blue-50 text-blue-700',
  },
  {
    title: 'Farm Economics',
    desc: 'Profit/loss, break-even, land value, loans, and ROI.',
    icon: DollarSign,
    count: 11,
    href: '/calculators/economics',
    color: 'bg-emerald-50 text-emerald-700',
  },
  {
    title: 'Conversions',
    desc: 'Bushels to tons, acres to hectares, lbs/acre to kg/ha.',
    icon: ArrowRightLeft,
    count: 14,
    href: '/calculators/conversions',
    color: 'bg-stone-100 text-stone-700',
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Text — left */}
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">
                Free Agricultural Calculators
              </p>
              <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                Plan smarter.{' '}
                <span className="text-primary">Farm better.</span>
              </h1>
              <p className="mt-4 max-w-lg text-base leading-relaxed text-muted sm:text-lg">
                184 free calculators for fertilizer rates, seed rates, crop yields,
                livestock management, irrigation, and farm economics.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/calculators"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
                >
                  Browse Calculators
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Animation — right */}
            <div className="mx-auto w-full max-w-sm">
              <HeroAnimation />
            </div>
          </div>
        </div>
      </section>

      {/* Clusters grid */}
      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Calculator categories
          </h2>
          <p className="mt-2 text-base text-muted">
            Choose a category to find the right calculator for your operation.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {clusters.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="group flex flex-col rounded-xl border border-border bg-white p-5 transition-all hover:border-primary/30 hover:shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-lg ${c.color}`}
                >
                  <c.icon className="h-5 w-5" />
                </div>
                <span className="rounded-md bg-accent px-2 py-0.5 text-xs font-medium text-muted">
                  {c.count}
                </span>
              </div>
              <h3 className="mt-3 text-[0.9375rem] font-semibold text-foreground">
                {c.title}
              </h3>
              <p className="mt-1.5 flex-1 text-[0.8125rem] leading-relaxed text-muted">
                {c.desc}
              </p>
              <span className="mt-3 flex items-center gap-1 text-xs font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                View calculators <ArrowRight className="h-3 w-3" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
