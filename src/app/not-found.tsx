import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-xl flex-col items-center px-5 py-24 text-center sm:px-8 sm:py-32">
      <p className="mb-3 text-6xl font-bold text-primary">404</p>
      <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
        Page not found
      </h1>
      <p className="mt-3 text-base text-muted">
        The page you are looking for does not exist or has been moved.
      </p>
      <div className="mt-8 flex items-center gap-3">
        <Link
          href="/"
          className="rounded-lg border border-border bg-white px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent"
        >
          Go Home
        </Link>
        <Link
          href="/calculators"
          className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
        >
          Browse Calculators
        </Link>
      </div>
    </section>
  );
}
