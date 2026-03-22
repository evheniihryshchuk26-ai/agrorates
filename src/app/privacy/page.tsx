import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'AgroRates privacy policy — how we handle your data, cookies, and third-party services.',
};

export default function PrivacyPage() {
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
          <li className="font-medium text-foreground">Privacy Policy</li>
        </ol>
      </nav>

      <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
        Privacy Policy
      </h1>

      <div className="mt-6 space-y-8 text-[0.9375rem] leading-relaxed text-muted">
        <div>
          <h2 className="mb-2 text-base font-semibold text-foreground">
            Information We Collect
          </h2>
          <p>
            AgroRates does not require registration or collect personal
            information. All calculations run entirely in your browser. We do
            not store any inputs you enter into our calculators.
          </p>
        </div>

        <div>
          <h2 className="mb-2 text-base font-semibold text-foreground">
            How We Use Information
          </h2>
          <p>
            We collect anonymous usage data through standard web analytics to
            understand which pages are visited and how the site performs. This
            data helps us improve calculator accuracy and user experience. No
            personally identifiable information is tracked.
          </p>
        </div>

        <div>
          <h2 className="mb-2 text-base font-semibold text-foreground">
            Cookies
          </h2>
          <p>
            AgroRates may use essential cookies and third-party analytics
            cookies. Essential cookies are required for the site to function
            properly. Analytics cookies help us measure traffic and usage
            patterns. You can disable cookies in your browser settings at any
            time.
          </p>
        </div>

        <div>
          <h2 className="mb-2 text-base font-semibold text-foreground">
            Third-Party Services
          </h2>
          <p>
            We may use third-party services such as web analytics providers and
            content delivery networks. These services have their own privacy
            policies and may collect anonymous data about your visit.
          </p>
        </div>

        <div>
          <h2 className="mb-2 text-base font-semibold text-foreground">
            Contact
          </h2>
          <p>
            If you have questions about this privacy policy, please reach out
            via our{' '}
            <Link
              href="/contact"
              className="font-medium text-primary underline underline-offset-2 hover:text-primary-hover"
            >
              contact page
            </Link>
            .
          </p>
        </div>

        <p className="text-xs text-muted">
          Last updated: March 2026
        </p>
      </div>
    </section>
  );
}
