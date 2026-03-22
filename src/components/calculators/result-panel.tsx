'use client';

import { Calculator } from 'lucide-react';
import type { CalculatorResult } from '@/lib/calculators/types';

const DEFAULT_COLORS = [
  { text: 'text-blue-700', bg: 'bg-blue-50' },
  { text: 'text-orange-700', bg: 'bg-orange-50' },
  { text: 'text-purple-700', bg: 'bg-purple-50' },
  { text: 'text-green-700', bg: 'bg-green-50' },
  { text: 'text-rose-700', bg: 'bg-rose-50' },
  { text: 'text-amber-700', bg: 'bg-amber-50' },
];

const COLOR_MAP: Record<string, { text: string; bg: string }> = {
  blue: { text: 'text-blue-700', bg: 'bg-blue-50' },
  orange: { text: 'text-orange-700', bg: 'bg-orange-50' },
  purple: { text: 'text-purple-700', bg: 'bg-purple-50' },
  green: { text: 'text-green-700', bg: 'bg-green-50' },
  rose: { text: 'text-rose-700', bg: 'bg-rose-50' },
  amber: { text: 'text-amber-700', bg: 'bg-amber-50' },
  red: { text: 'text-red-700', bg: 'bg-red-50' },
  teal: { text: 'text-teal-700', bg: 'bg-teal-50' },
  cyan: { text: 'text-cyan-700', bg: 'bg-cyan-50' },
};

function getColorClasses(color: string | undefined, index: number) {
  if (color && COLOR_MAP[color]) {
    return COLOR_MAP[color];
  }
  return DEFAULT_COLORS[index % DEFAULT_COLORS.length];
}

type ResultPanelProps = {
  results: CalculatorResult[] | null;
  totalLabel: string;
  totalValue: number;
  totalUnit: string;
};

export function ResultPanel({
  results,
  totalLabel,
  totalValue,
  totalUnit,
}: ResultPanelProps) {
  if (!results) {
    return (
      <div className="flex min-h-[440px] flex-col items-center justify-center rounded-xl border border-border bg-white p-8">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-accent">
          <Calculator className="h-5 w-5 text-muted" />
        </div>
        <p className="text-sm font-medium text-foreground">No results yet</p>
        <p className="mt-1 text-center text-[0.8125rem] text-muted">
          Fill in the fields and click Calculate to see results.
        </p>
      </div>
    );
  }

  const gridCols =
    results.length <= 2
      ? 'grid-cols-2'
      : results.length === 3
        ? 'grid-cols-3'
        : 'grid-cols-2 sm:grid-cols-3';

  return (
    <div className="rounded-xl border border-border bg-white">
      <div className="border-b border-border px-6 py-4">
        <h2 className="text-lg font-semibold text-foreground">Results</h2>
      </div>

      <div className="px-6 py-5">
        <div className={`grid gap-3 ${gridCols}`}>
          {results.map((result, i) => {
            const colors = getColorClasses(result.color, i);
            return (
              <div
                key={result.label}
                className={`rounded-lg p-3 ${colors.bg}`}
              >
                <p className={`text-2xs font-medium ${colors.text} opacity-70`}>
                  {result.label}
                </p>
                <p className={`mt-0.5 text-lg font-bold ${colors.text}`}>
                  {result.value.toLocaleString()}{' '}
                  <span className="text-xs font-medium">{result.unit}</span>
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-4 flex items-center justify-between rounded-lg bg-accent px-4 py-3">
          <span className="text-sm font-medium text-foreground">
            {totalLabel}
          </span>
          <span className="text-sm font-bold text-foreground">
            {totalValue.toLocaleString()} {totalUnit}
          </span>
        </div>
      </div>
    </div>
  );
}
