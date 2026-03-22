import Link from 'next/link';
import { Sprout } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-border bg-white">
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-white">
              <Sprout className="h-3 w-3" />
            </div>
            <span className="text-sm font-semibold text-foreground">AgroRates</span>
          </Link>
          <p className="text-xs text-muted">
            &copy; {new Date().getFullYear()} AgroRates. Free agricultural calculators.
          </p>
        </div>
      </div>
    </footer>
  );
}
