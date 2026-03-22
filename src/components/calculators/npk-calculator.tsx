'use client';

import { useState } from 'react';
import {
  Calculator,
  RotateCcw,
  ExternalLink,
  ShoppingCart,
  Check,
  Info,
} from 'lucide-react';

type Results = {
  totalN: number;
  totalP: number;
  totalK: number;
  totalLbs: number;
  costN: number;
  costP: number;
  costK: number;
  totalCost: number;
  costPerAcre: number;
};

const PRODUCTS = [
  {
    nutrient: 'Nitrogen',
    product: 'Urea (46-0-0)',
    analysis: '46% N',
    pricePerBag: 28.49,
    bagWeight: 50,
    store: 'Amazon',
    url: '#',
  },
  {
    nutrient: 'Phosphorus',
    product: 'DAP (18-46-0)',
    analysis: '46% P₂O₅',
    pricePerBag: 45.0,
    bagWeight: 50,
    store: 'Tractor Supply',
    url: '#',
  },
  {
    nutrient: 'Potassium',
    product: 'Muriate of Potash (0-0-60)',
    analysis: '60% K₂O',
    pricePerBag: 35.99,
    bagWeight: 50,
    store: 'Amazon',
    url: '#',
  },
];

export function NPKCalculator() {
  const [acres, setAcres] = useState('');
  const [nRate, setNRate] = useState('');
  const [pRate, setPRate] = useState('');
  const [kRate, setKRate] = useState('');
  const [results, setResults] = useState<Results | null>(null);

  const handleCalculate = () => {
    const a = parseFloat(acres) || 0;
    const n = parseFloat(nRate) || 0;
    const p = parseFloat(pRate) || 0;
    const k = parseFloat(kRate) || 0;

    if (a <= 0) return;

    const totalN = n * a;
    const totalP = p * a;
    const totalK = k * a;
    const totalLbs = totalN + totalP + totalK;

    // Cost based on product prices
    const ureaBags = Math.ceil(totalN / (50 * 0.46));
    const dapBags = Math.ceil(totalP / (50 * 0.46));
    const mopBags = Math.ceil(totalK / (50 * 0.6));

    const costN = ureaBags * 28.49;
    const costP = dapBags * 45.0;
    const costK = mopBags * 35.99;
    const totalCost = costN + costP + costK;

    setResults({
      totalN,
      totalP,
      totalK,
      totalLbs,
      costN,
      costP,
      costK,
      totalCost,
      costPerAcre: a > 0 ? totalCost / a : 0,
    });
  };

  const handleReset = () => {
    setAcres('');
    setNRate('');
    setPRate('');
    setKRate('');
    setResults(null);
  };

  const inputClass =
    'w-full rounded-lg border border-border bg-white px-3.5 py-2.5 text-sm text-foreground transition-colors placeholder:text-stone-400 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/10';
  const labelClass = 'block text-[0.8125rem] font-medium text-foreground mb-1.5';

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr,1.15fr]">
      {/* Input Panel */}
      <div className="rounded-xl border border-border bg-white p-6">
        <div className="mb-5">
          <h2 className="text-lg font-semibold text-foreground">Input</h2>
          <p className="mt-1 text-[0.8125rem] text-muted">
            Enter your field size and recommended nutrient rates from your soil test.
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="acres" className={labelClass}>
              Field Size (acres)
            </label>
            <input
              id="acres"
              type="number"
              placeholder="e.g. 40"
              value={acres}
              onChange={(e) => setAcres(e.target.value)}
              className={inputClass}
            />
          </div>

          <div className="rounded-lg border border-border bg-accent/50 p-4">
            <p className="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-muted">
              <Info className="h-3.5 w-3.5" />
              Recommended rates (lbs/acre)
            </p>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label htmlFor="n-rate" className={labelClass}>
                  N (Nitrogen)
                </label>
                <input
                  id="n-rate"
                  type="number"
                  placeholder="150"
                  value={nRate}
                  onChange={(e) => setNRate(e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="p-rate" className={labelClass}>
                  P₂O₅
                </label>
                <input
                  id="p-rate"
                  type="number"
                  placeholder="60"
                  value={pRate}
                  onChange={(e) => setPRate(e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="k-rate" className={labelClass}>
                  K₂O
                </label>
                <input
                  id="k-rate"
                  type="number"
                  placeholder="80"
                  value={kRate}
                  onChange={(e) => setKRate(e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleCalculate}
              disabled={!acres}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Calculator className="h-4 w-4" />
              Calculate
            </button>
            {results && (
              <button
                type="button"
                onClick={handleReset}
                className="flex items-center gap-1.5 rounded-lg border border-border bg-white px-3 py-2.5 text-sm font-medium text-muted transition-colors hover:bg-accent hover:text-foreground"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Reset
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Results Panel */}
      <div className="rounded-xl border border-border bg-white">
        {results ? (
          <>
            {/* Results header */}
            <div className="border-b border-border px-6 py-4">
              <h2 className="text-lg font-semibold text-foreground">Results</h2>
              <p className="mt-0.5 text-[0.8125rem] text-muted">
                For {acres} acres at {nRate}-{pRate}-{kRate} lbs/acre
              </p>
            </div>

            {/* Nutrient summary */}
            <div className="border-b border-border px-6 py-5">
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: 'Nitrogen (N)', value: results.totalN, color: 'text-blue-700 bg-blue-50' },
                  { label: 'Phosphorus (P₂O₅)', value: results.totalP, color: 'text-orange-700 bg-orange-50' },
                  { label: 'Potassium (K₂O)', value: results.totalK, color: 'text-purple-700 bg-purple-50' },
                ].map((item) => (
                  <div key={item.label} className={`rounded-lg p-3 ${item.color}`}>
                    <p className="text-2xs font-medium opacity-70">{item.label}</p>
                    <p className="mt-0.5 text-lg font-bold">
                      {item.value.toLocaleString()} <span className="text-xs font-medium">lbs</span>
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-3 flex items-center justify-between rounded-lg bg-accent px-4 py-2.5">
                <span className="text-sm font-medium text-foreground">Total fertilizer needed</span>
                <span className="text-sm font-bold text-foreground">{results.totalLbs.toLocaleString()} lbs</span>
              </div>
            </div>

            {/* Cost breakdown with affiliate */}
            <div className="px-6 py-5">
              <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
                <ShoppingCart className="h-4 w-4 text-primary" />
                Estimated Cost & Where to Buy
              </h3>
              <div className="space-y-2.5">
                {PRODUCTS.map((product, i) => {
                  const cost = i === 0 ? results.costN : i === 1 ? results.costP : results.costK;
                  const total = i === 0 ? results.totalN : i === 1 ? results.totalP : results.totalK;
                  const bags = Math.ceil(
                    total / (product.bagWeight * (i === 0 ? 0.46 : i === 1 ? 0.46 : 0.6))
                  );

                  return (
                    <div
                      key={product.product}
                      className="flex items-center gap-3 rounded-lg border border-border p-3 transition-colors hover:border-primary/20 hover:bg-primary-light/50"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-[0.8125rem] font-semibold text-foreground">
                          {product.product}
                        </p>
                        <p className="text-xs text-muted">
                          {bags} bags × ${product.pricePerBag.toFixed(2)} ({product.analysis})
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-sm font-bold text-foreground">
                          ${cost.toFixed(2)}
                        </p>
                      </div>
                      <a
                        href={product.url}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="flex shrink-0 items-center gap-1 rounded-md bg-primary px-2.5 py-1.5 text-2xs font-medium text-white transition-colors hover:bg-primary-hover"
                      >
                        {product.store}
                        <ExternalLink className="h-2.5 w-2.5" />
                      </a>
                    </div>
                  );
                })}
              </div>

              {/* Total */}
              <div className="mt-4 flex items-center justify-between rounded-lg bg-foreground px-4 py-3 text-white">
                <div>
                  <p className="text-sm font-semibold">Total estimated cost</p>
                  <p className="text-xs text-stone-400">
                    ${results.costPerAcre.toFixed(2)} per acre
                  </p>
                </div>
                <p className="text-xl font-bold">
                  ${results.totalCost.toFixed(2)}
                </p>
              </div>

              <p className="mt-3 text-2xs text-muted">
                Prices are approximate and may vary. We may earn a commission from purchases made through these links.
              </p>
            </div>
          </>
        ) : (
          <div className="flex min-h-[440px] flex-col items-center justify-center p-8">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-accent">
              <Calculator className="h-5 w-5 text-muted" />
            </div>
            <p className="text-sm font-medium text-foreground">
              No results yet
            </p>
            <p className="mt-1 text-center text-[0.8125rem] text-muted">
              Enter your field size and nutrient rates, then click Calculate.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
