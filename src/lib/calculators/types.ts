export type FieldType = 'number' | 'select' | 'radio';

export type FieldOption = {
  value: string;
  label: string;
};

export type CalculatorField = {
  id: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  unit?: string;
  options?: FieldOption[];
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: string | number;
  required?: boolean;
  helpText?: string;
  group?: string;
};

export type CalculatorResult = {
  label: string;
  value: number;
  unit: string;
  color?: string;
};

export type CalculatorConfig = {
  slug: string;
  cluster: string;
  crop?: string;
  title: string;
  description: string;
  icon?: string;
  fields: CalculatorField[];
  calculate: (inputs: Record<string, number | string>) => {
    results: CalculatorResult[];
    totalLabel: string;
    totalValue: number;
    totalUnit: string;
  };
  seo: {
    title: string;
    description: string;
  };
  quickFacts?: { label: string; value: string }[];
  tips?: string[];
  relatedCalculators?: { title: string; href: string }[];
  relatedCrops?: { title: string; href: string }[];
  faqs?: { question: string; answer: string }[];
};
