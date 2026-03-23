'use client';

import { useState, useCallback } from 'react';
import { Calculator, RotateCcw } from 'lucide-react';
import type { CalculatorField } from '@/lib/calculators/types';
import { ResultPanel } from './result-panel';

type CalculatorFormProps = {
  slug: string;
  cluster: string;
  fields: CalculatorField[];
};

const inputClass =
  'w-full rounded-lg border border-border bg-white px-3.5 py-2.5 text-sm text-foreground transition-colors placeholder:text-stone-400 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/10';
const labelClass = 'block text-[0.8125rem] font-medium text-foreground mb-1.5';

export function CalculatorForm({ slug, cluster, fields }: CalculatorFormProps) {
  const initialValues: Record<string, string> = {};
  for (const field of fields) {
    initialValues[field.id] =
      field.defaultValue !== undefined ? String(field.defaultValue) : '';
  }

  const [values, setValues] = useState<Record<string, string>>(initialValues);
  const [calculationResult, setCalculationResult] = useState<{
    results: { label: string; value: number; unit: string; color?: string }[];
    totalLabel: string;
    totalValue: number;
    totalUnit: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = useCallback((id: string, value: string) => {
    setValues((prev) => ({ ...prev, [id]: value }));
  }, []);

  const handleCalculate = async () => {
    setLoading(true);
    try {
      const { getCalculateFunction } = await import(
        '@/lib/calculators/getCalculateFunction'
      );
      const calculateFn = await getCalculateFunction(cluster, slug);
      if (!calculateFn) return;

      const parsed: Record<string, number | string> = {};
      for (const field of fields) {
        const raw = values[field.id] ?? '';
        if (field.type === 'number') {
          parsed[field.id] = parseFloat(raw) || 0;
        } else {
          parsed[field.id] = raw;
        }
      }
      const result = calculateFn(parsed);
      setCalculationResult(result);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setValues(initialValues);
    setCalculationResult(null);
  };

  const groupedFields = groupFields(fields);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Input Panel */}
      <div className="rounded-xl border border-border bg-white p-6">
        <div className="mb-5">
          <h2 className="text-lg font-semibold text-foreground">Input</h2>
          <p className="mt-1 text-[0.8125rem] text-muted">
            Fill in the fields below, then click Calculate.
          </p>
        </div>

        <div className="space-y-4">
          {groupedFields.map((group) => {
            if (group.groupLabel) {
              return (
                <div
                  key={group.groupLabel}
                  className="rounded-lg border border-border bg-accent/50 p-4"
                >
                  <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted">
                    {group.groupLabel}
                  </p>
                  <div className="space-y-4">
                    {group.fields.map((field) => (
                      <FieldRenderer
                        key={field.id}
                        field={field}
                        value={values[field.id] ?? ''}
                        onChange={handleChange}
                      />
                    ))}
                  </div>
                </div>
              );
            }
            return group.fields.map((field) => (
              <FieldRenderer
                key={field.id}
                field={field}
                value={values[field.id] ?? ''}
                onChange={handleChange}
              />
            ));
          })}

          <div className="flex gap-2 pt-1">
            <button
              type="button"
              onClick={handleCalculate}
              disabled={loading}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Calculator className="h-4 w-4" />
              {loading ? 'Calculating...' : 'Calculate'}
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center gap-1.5 rounded-lg border border-border bg-white px-3 py-2.5 text-sm font-medium text-muted transition-colors hover:bg-accent hover:text-foreground"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Results Panel */}
      <ResultPanel
        results={calculationResult?.results ?? null}
        totalLabel={calculationResult?.totalLabel ?? ''}
        totalValue={calculationResult?.totalValue ?? 0}
        totalUnit={calculationResult?.totalUnit ?? ''}
      />
    </div>
  );
}

// --- Field Renderer ---

type FieldRendererProps = {
  field: CalculatorField;
  value: string;
  onChange: (id: string, value: string) => void;
};

function FieldRenderer({ field, value, onChange }: FieldRendererProps) {
  if (field.type === 'select' && field.options) {
    return (
      <div>
        <label htmlFor={field.id} className={labelClass}>
          {field.label}
        </label>
        <div className="relative">
          <select
            id={field.id}
            value={value}
            onChange={(e) => onChange(field.id, e.target.value)}
            className={`${inputClass} appearance-none pr-8`}
          >
            <option value="">
              {field.placeholder ?? 'Select...'}
            </option>
            {field.options.map((opt, i) => (
              <option key={`${opt.value}-${i}`} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <svg
              className="h-4 w-4 text-muted"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
        {field.helpText && (
          <p className="mt-1 text-2xs text-muted">{field.helpText}</p>
        )}
      </div>
    );
  }

  if (field.type === 'radio' && field.options) {
    return (
      <div>
        <span className={labelClass}>{field.label}</span>
        <div className="flex flex-wrap gap-2">
          {field.options.map((opt) => (
            <label
              key={opt.value}
              className={`flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-colors ${
                value === opt.value
                  ? 'border-primary bg-primary-light text-primary font-medium'
                  : 'border-border bg-white text-foreground hover:border-primary/30'
              }`}
            >
              <input
                type="radio"
                name={field.id}
                value={opt.value}
                checked={value === opt.value}
                onChange={(e) => onChange(field.id, e.target.value)}
                className="sr-only"
              />
              {opt.label}
            </label>
          ))}
        </div>
        {field.helpText && (
          <p className="mt-1 text-2xs text-muted">{field.helpText}</p>
        )}
      </div>
    );
  }

  return (
    <div>
      <label htmlFor={field.id} className={labelClass}>
        {field.label}
      </label>
      <div className="relative">
        <input
          id={field.id}
          type="number"
          placeholder={field.placeholder}
          min={field.min}
          max={field.max}
          step={field.step}
          value={value}
          onChange={(e) => onChange(field.id, e.target.value)}
          className={`${inputClass} ${field.unit ? 'pr-14' : ''}`}
          required={field.required}
        />
        {field.unit && (
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-xs text-muted">
            {field.unit}
          </span>
        )}
      </div>
      {field.helpText && (
        <p className="mt-1 text-2xs text-muted">{field.helpText}</p>
      )}
    </div>
  );
}

// --- Grouping helper ---

type FieldGroup = {
  groupLabel: string | null;
  fields: CalculatorField[];
};

function groupFields(fields: CalculatorField[]): FieldGroup[] {
  const groups: FieldGroup[] = [];
  let currentGroup: FieldGroup | null = null;

  for (const field of fields) {
    const groupLabel = field.group ?? null;

    if (!currentGroup || groupLabel !== currentGroup.groupLabel) {
      currentGroup = { groupLabel, fields: [] };
      groups.push(currentGroup);
    }

    currentGroup.fields.push(field);
  }

  return groups;
}
