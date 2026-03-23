import Link from 'next/link';
import { Sprout } from 'lucide-react';

const calculatorLinks = [
  { title: 'Fertilizer & Soil', href: '/calculators/fertilizer/' },
  { title: 'Seed & Planting', href: '/calculators/seeding/' },
  { title: 'Planting Date', href: '/calculators/planting-date/' },
  { title: 'Crop Yield', href: '/calculators/yield/' },
  { title: 'Livestock', href: '/calculators/livestock/' },
  { title: 'Irrigation & Water', href: '/calculators/irrigation/' },
  { title: 'Farm Economics', href: '/calculators/economics/' },
  { title: 'Conversions', href: '/calculators/conversions/' },
];

const popularCalcs = [
  { title: 'Mulch Calculator', href: '/calculators/conversions/mulch-calculator/' },
  { title: 'NPK Fertilizer Calculator', href: '/calculators/fertilizer/npk/' },
  { title: 'Compost Calculator', href: '/calculators/fertilizer/compost/' },
  { title: 'Cattle Weight Calculator', href: '/calculators/livestock/cattle-weight/' },
  { title: 'Soil Volume Calculator', href: '/calculators/conversions/soil-volume/' },
  { title: 'Seed Rate Calculator', href: '/calculators/seeding/seed-rate/' },
  { title: 'Farm Loan Calculator', href: '/calculators/economics/farm-loan/' },
  { title: 'Bushels to Tons', href: '/calculators/conversions/bushels-to-tons/' },
  { title: 'Hay Bale Calculator', href: '/calculators/livestock/hay-bale/' },
  { title: 'Plant Spacing Calculator', href: '/calculators/seeding/plant-spacing/' },
];

const moreCalcs = [
  { title: 'Lime Application Rate', href: '/calculators/fertilizer/lime/' },
  { title: 'Nitrogen Rate Calculator', href: '/calculators/fertilizer/nitrogen/' },
  { title: 'Irrigation Water Need', href: '/calculators/irrigation/irrigation-water-need/' },
  { title: 'Feed Cost Calculator', href: '/calculators/livestock/feed-cost/' },
  { title: 'Farm Profit & Loss', href: '/calculators/economics/farm-profit-loss/' },
  { title: 'Break-Even Price', href: '/calculators/economics/break-even-price/' },
  { title: 'Acres to Hectares', href: '/calculators/conversions/acres-to-hectares/' },
  { title: 'Grain Moisture Calculator', href: '/calculators/yield/grain-moisture/' },
  { title: 'Stocking Rate Calculator', href: '/calculators/livestock/stocking-rate/' },
  { title: 'Yield Per Acre', href: '/calculators/yield/yield-per-acre/' },
];

const cropLinks = [
  { title: 'Corn', href: '/calculators/fertilizer/corn/' },
  { title: 'Wheat', href: '/calculators/fertilizer/wheat/' },
  { title: 'Soybeans', href: '/calculators/fertilizer/soybeans/' },
  { title: 'Tomatoes', href: '/calculators/fertilizer/tomatoes/' },
  { title: 'Potatoes', href: '/calculators/fertilizer/potatoes/' },
  { title: 'Cotton', href: '/calculators/fertilizer/cotton/' },
  { title: 'Rice', href: '/calculators/fertilizer/rice/' },
  { title: 'Alfalfa', href: '/calculators/fertilizer/alfalfa/' },
];

const companyLinks = [
  { title: 'About Us', href: '/about/' },
  { title: 'All Calculators', href: '/calculators/' },
  { title: 'Contact', href: '/contact/' },
  { title: 'Privacy Policy', href: '/privacy/' },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-white">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white">
                <Sprout className="h-4 w-4" />
              </div>
              <span className="text-[0.95rem] font-semibold tracking-tight text-foreground">
                AgroRates
              </span>
            </Link>
            <p className="mt-3 text-[0.8125rem] leading-relaxed text-muted">
              184 free agricultural calculators for farmers, agronomists, and farm managers.
            </p>
            {/* By Crop */}
            <h3 className="mt-6 text-xs font-semibold uppercase tracking-widest text-foreground">
              By Crop
            </h3>
            <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1.5">
              {cropLinks.map((link) => (
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

          {/* Categories */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-foreground">
              Categories
            </h3>
            <ul className="mt-4 space-y-2.5">
              {calculatorLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[0.8125rem] text-muted transition-colors hover:text-primary">
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
                  <Link href={link.href} className="text-[0.8125rem] text-muted transition-colors hover:text-primary">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More Calculators */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-foreground">
              More Calculators
            </h3>
            <ul className="mt-4 space-y-2.5">
              {moreCalcs.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[0.8125rem] text-muted transition-colors hover:text-primary">
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
                  <Link href={link.href} className="text-[0.8125rem] text-muted transition-colors hover:text-primary">
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
