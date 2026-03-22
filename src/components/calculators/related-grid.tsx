import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

type RelatedGridProps = {
  title: string;
  items: { title: string; href: string }[];
  compact?: boolean;
};

export function RelatedGrid({ title, items, compact }: RelatedGridProps) {
  if (items.length === 0) return null;

  if (compact) {
    return (
      <section>
        <h2 className="mb-4 text-xl font-semibold text-foreground">{title}</h2>
        <div className="flex flex-wrap gap-2">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="inline-flex items-center gap-1 rounded-full border border-border bg-white px-3.5 py-1.5 text-sm font-medium text-foreground transition-colors hover:border-primary/30 hover:bg-primary-light hover:text-primary"
            >
              {item.title}
            </Link>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section>
      <h2 className="mb-4 text-xl font-semibold text-foreground">{title}</h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group flex items-center justify-between rounded-lg border border-border bg-white px-4 py-3 transition-colors hover:border-primary/30 hover:bg-primary-light/50"
          >
            <span className="text-sm font-medium text-foreground group-hover:text-primary">
              {item.title}
            </span>
            <ArrowRight className="h-4 w-4 text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
          </Link>
        ))}
      </div>
    </section>
  );
}
