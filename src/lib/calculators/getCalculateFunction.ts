import type { CalculatorConfig } from './types';

type CalculateResult = ReturnType<CalculatorConfig['calculate']>;
type CalculateFn = (inputs: Record<string, number | string>) => CalculateResult;

const cache = new Map<string, CalculateFn>();

export async function getCalculateFunction(
  cluster: string,
  slug: string
): Promise<CalculateFn | null> {
  const key = `${cluster}/${slug}`;
  if (cache.has(key)) return cache.get(key)!;

  let configs: CalculatorConfig[];
  switch (cluster) {
    case 'fertilizer':
      configs = (await import('./configs/fertilizer')).fertilizerConfigs;
      break;
    case 'seeding':
      configs = (await import('./configs/seeding')).seedingConfigs;
      break;
    case 'planting-date':
      configs = (await import('./configs/planting-date')).plantingDateConfigs;
      break;
    case 'yield':
      configs = (await import('./configs/yield')).yieldConfigs;
      break;
    case 'livestock':
      configs = (await import('./configs/livestock')).livestockConfigs;
      break;
    case 'irrigation':
      configs = (await import('./configs/irrigation')).irrigationConfigs;
      break;
    case 'economics':
      configs = (await import('./configs/economics')).economicsConfigs;
      break;
    case 'conversions':
      configs = (await import('./configs/conversions')).conversionConfigs;
      break;
    default:
      return null;
  }

  // Cache all functions from this cluster since we already loaded it
  for (const c of configs) {
    cache.set(`${c.cluster}/${c.slug}`, c.calculate);
  }

  return cache.get(key) ?? null;
}
