import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Embed Our Calculators — Free Widget for Your Website',
  description:
    'Add free AgroRates calculators to your website with a simple embed code. No cost, no account, just copy and paste.',
  alternates: { canonical: 'https://agrorates.com/embed/' },
};

const examples = [
  { name: 'Mulch Calculator', cluster: 'conversions', slug: 'mulch-calculator' },
  { name: 'NPK Fertilizer', cluster: 'fertilizer', slug: 'npk' },
  { name: 'Cattle Weight', cluster: 'livestock', slug: 'cattle-weight' },
  { name: 'Seed Rate', cluster: 'seeding', slug: 'seed-rate' },
  { name: 'Farm Loan', cluster: 'economics', slug: 'farm-loan' },
  { name: 'Compost Calculator', cluster: 'fertilizer', slug: 'compost' },
];

export default function EmbedInfoPage() {
  return (
    <section className="mx-auto max-w-3xl px-5 py-10 sm:px-8 sm:py-14">
      <nav className="mb-8">
        <ol className="flex items-center gap-1.5 text-[0.8125rem] text-muted">
          <li><Link href="/" className="transition-colors hover:text-foreground">Home</Link></li>
          <li className="text-border">/</li>
          <li className="font-medium text-foreground">Embed</li>
        </ol>
      </nav>

      <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
        Embed Our Calculators on Your Website
      </h1>
      <p className="mt-3 text-base leading-relaxed text-muted">
        Add any AgroRates calculator to your website, blog, or educational platform for free.
        Your visitors get a fully functional tool, and a small "Powered by AgroRates" link
        appears at the bottom. No account or API key needed — just copy and paste.
      </p>

      <h2 className="mt-10 text-xl font-bold text-foreground">How to Embed</h2>
      <p className="mt-3 text-[0.9375rem] text-muted">
        Copy this iframe code and paste it into your HTML where you want the calculator to appear.
        Replace the URL with any calculator you want to embed.
      </p>

      <div className="mt-4 rounded-lg border border-border bg-accent/50 p-4">
        <code className="block whitespace-pre-wrap text-[0.8125rem] text-foreground">
{`<iframe
  src="https://agrorates.com/embed/conversions/mulch-calculator/"
  width="100%"
  height="600"
  frameborder="0"
  style="border: 1px solid #e7e5e4; border-radius: 12px;"
  title="Mulch Calculator — AgroRates"
></iframe>`}
        </code>
      </div>

      <h2 className="mt-10 text-xl font-bold text-foreground">Embed URL Pattern</h2>
      <div className="mt-3 rounded-lg border border-border bg-accent/50 p-4">
        <code className="text-[0.8125rem] text-foreground">
          https://agrorates.com/embed/{'[cluster]'}/{'[calculator-slug]'}/
        </code>
      </div>

      <h2 className="mt-10 text-xl font-bold text-foreground">Popular Embeds</h2>
      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        {examples.map((ex) => (
          <div key={ex.slug} className="rounded-lg border border-border bg-white p-4">
            <p className="text-sm font-semibold text-foreground">{ex.name}</p>
            <code className="mt-1 block truncate text-2xs text-muted">
              /embed/{ex.cluster}/{ex.slug}/
            </code>
          </div>
        ))}
      </div>

      <h2 className="mt-10 text-xl font-bold text-foreground">Terms of Use</h2>
      <ul className="mt-3 space-y-2 text-[0.9375rem] text-muted">
        <li className="flex items-start gap-2">
          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
          Free for any website — commercial, educational, personal, or non-profit.
        </li>
        <li className="flex items-start gap-2">
          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
          The "Powered by AgroRates" link must remain visible.
        </li>
        <li className="flex items-start gap-2">
          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
          Do not modify the calculator content or remove attribution.
        </li>
      </ul>

      <p className="mt-10 text-[0.9375rem] text-muted">
        Questions about embedding?{' '}
        <Link href="/contact/" className="font-medium text-primary underline underline-offset-2 hover:text-primary-hover">
          Contact us
        </Link>.
      </p>
    </section>
  );
}
