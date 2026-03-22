import { Check } from 'lucide-react';

type TipsListProps = {
  tips: string[];
};

export function TipsList({ tips }: TipsListProps) {
  return (
    <section>
      <h2 className="mb-4 text-xl font-semibold text-foreground">
        Tips & Best Practices
      </h2>
      <ul className="space-y-3">
        {tips.map((tip) => (
          <li key={tip} className="flex gap-3">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
              <Check className="h-3 w-3 text-primary" />
            </span>
            <span className="text-sm leading-relaxed text-foreground/80">
              {tip}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
