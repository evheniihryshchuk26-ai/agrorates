import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us — AgroRates',
  description:
    'Get in touch with the AgroRates team. Questions, suggestions, or corrections — we would love to hear from you.',
  alternates: { canonical: 'https://agrorates.com/contact' },
  openGraph: {
    title: 'Contact Us — AgroRates',
    description: 'Get in touch with the AgroRates team.',
    url: 'https://agrorates.com/contact',
    type: 'website',
  },
};

export default function ContactPage() {
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
          <li className="font-medium text-foreground">Contact</li>
        </ol>
      </nav>

      <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
        Contact Us
      </h1>

      <div className="mt-6 space-y-5 text-[0.9375rem] leading-relaxed text-muted">
        <p>
          AgroRates is a free project and we welcome your feedback. Whether you
          have found an error in a calculator, want to suggest a new tool, or
          just have a question about how to use the site, we are happy to hear
          from you.
        </p>

        <div className="rounded-xl border border-border bg-white p-6">
          <h2 className="mb-1 text-base font-semibold text-foreground">
            Email
          </h2>
          <p>
            <a
              href="mailto:hello@agrorates.com"
              className="font-medium text-primary underline underline-offset-2 hover:text-primary-hover"
            >
              hello@agrorates.com
            </a>
          </p>
        </div>

        <p>
          We aim to respond within a few business days. Since AgroRates is a
          free resource maintained by a small team, we appreciate your patience.
        </p>
      </div>
    </section>
  );
}
