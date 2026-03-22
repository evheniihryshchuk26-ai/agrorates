type QuickFactsProps = {
  facts: { label: string; value: string }[];
};

export function QuickFacts({ facts }: QuickFactsProps) {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {facts.map((fact) => (
        <div
          key={fact.label}
          className="rounded-lg border border-border bg-white px-4 py-3"
        >
          <p className="text-2xs font-medium uppercase tracking-wide text-muted">
            {fact.label}
          </p>
          <p className="mt-0.5 text-sm font-bold text-foreground">
            {fact.value}
          </p>
        </div>
      ))}
    </div>
  );
}
