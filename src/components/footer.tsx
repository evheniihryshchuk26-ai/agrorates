import Link from 'next/link';
import { Sprout } from 'lucide-react';

const calculatorLinks = [
  { title: 'Fertilizer & Soil', href: '/calculators/fertilizer' },
  { title: 'Seed & Planting', href: '/calculators/seeding' },
  { title: 'Planting Date', href: '/calculators/planting-date' },
  { title: 'Crop Yield', href: '/calculators/yield' },
  { title: 'Livestock', href: '/calculators/livestock' },
  { title: 'Irrigation & Water', href: '/calculators/irrigation' },
  { title: 'Farm Economics', href: '/calculators/economics' },
  { title: 'Conversions', href: '/calculators/conversions' },
];

const popularCalcs = [
  { title: 'NPK Fertilizer Calculator', href: '/calculators/fertilizer/npk' },
  { title: 'Mulch Calculator', href: '/calculators/conversions/mulch-calculator' },
  { title: 'Compost Calculator', href: '/calculators/fertilizer/compost' },
  { title: 'Cattle Weight Calculator', href: '/calculators/livestock/cattle-weight' },
  { title: 'Seed Rate Calculator', href: '/calculators/seeding/seed-rate' },
  { title: 'Soil Volume Calculator', href: '/calculators/conversions/soil-volume' },
  { title: 'Farm Loan Calculator', href: '/calculators/economics/farm-loan' },
  { title: 'Bushels to Tons', href: '/calculators/conversions/bushels-to-tons' },
];

const companyLinks = [
  { title: 'About Us', href: '/about' },
  { title: 'All Calculators', href: '/calculators' },
  { title: 'Contact', href: '/contact' },
  { title: 'Privacy Policy', href: '/privacy' },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-white">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white">
                <Sprout className="h-4 w-4" />
              </div>
              <span className="text-[0.95rem] font-semibold tracking-tight text-foreground">
                AgroRates
              </span>
            </Link>
            <p className="mt-3 text-[0.8125rem] leading-relaxed text-muted">
              184 free agricultural calculators for farmers, agronomists, and farm managers. Plan smarter, farm better.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-foreground">
              Categories
            </h3>
            <ul className="mt-4 space-y-2.5">
              {calculatorLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[0.8125rem] text-muted transition-colors hover:text-primary"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Calculators */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-foreground">
              Popular Calculators
            </h3>
            <ul className="mt-4 space-y-2.5">
              {popularCalcs.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[0.8125rem] text-muted transition-colors hover:text-primary"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-foreground">
              Company
            </h3>
            <ul className="mt-4 space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[0.8125rem] text-muted transition-colors hover:text-primary"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-xs text-muted">
            &copy; {new Date().getFullYear()} AgroRates. All rights reserved.
          </p>
          <p className="text-xs text-muted">
            Free agricultural calculators — no account required.
          </p>
        </div>
      </div>
    </footer>
  );
}
