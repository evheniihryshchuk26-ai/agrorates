import Link from 'next/link';
import { Sprout } from 'lucide-react';

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white">
            <Sprout className="h-4 w-4" />
          </div>
          <span className="text-[0.95rem] font-semibold tracking-tight text-foreground">
            AgroRates
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          <Link
            href="/calculators"
            className="rounded-lg px-3.5 py-2 text-[0.8125rem] font-medium text-muted transition-colors hover:bg-accent hover:text-foreground"
          >
            All Calculators
          </Link>
          <Link
            href="/calculators/fertilizer"
            className="rounded-lg px-3.5 py-2 text-[0.8125rem] font-medium text-muted transition-colors hover:bg-accent hover:text-foreground"
          >
            Fertilizer
          </Link>
          <Link
            href="/calculators/seeding"
            className="rounded-lg px-3.5 py-2 text-[0.8125rem] font-medium text-muted transition-colors hover:bg-accent hover:text-foreground"
          >
            Seeding
          </Link>
          <Link
            href="/calculators/yield"
            className="rounded-lg px-3.5 py-2 text-[0.8125rem] font-medium text-muted transition-colors hover:bg-accent hover:text-foreground"
          >
            Yield
          </Link>
          <Link
            href="/calculators/livestock"
            className="rounded-lg px-3.5 py-2 text-[0.8125rem] font-medium text-muted transition-colors hover:bg-accent hover:text-foreground"
          >
            Livestock
          </Link>
        </nav>

        <Link
          href="/calculators"
          className="hidden items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-[0.8125rem] font-medium text-white transition-colors hover:bg-primary-hover md:inline-flex"
        >
          Get Started
        </Link>
      </div>
    </header>
  );
}
