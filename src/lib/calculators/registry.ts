import type { CalculatorConfig } from './types';
import { fertilizerConfigs } from './configs/fertilizer';
import { seedingConfigs } from './configs/seeding';
import { plantingDateConfigs } from './configs/planting-date';
import { yieldConfigs } from './configs/yield';
import { livestockConfigs } from './configs/livestock';
import { irrigationConfigs } from './configs/irrigation';
import { economicsConfigs } from './configs/economics';
import { conversionConfigs } from './configs/conversions';

const allConfigs: CalculatorConfig[] = [
  ...fertilizerConfigs,
  ...seedingConfigs,
  ...plantingDateConfigs,
  ...yieldConfigs,
  ...livestockConfigs,
  ...irrigationConfigs,
  ...economicsConfigs,
  ...conversionConfigs,
];

const configMap = new Map<string, CalculatorConfig>();
for (const config of allConfigs) {
  configMap.set(config.slug, config);
}

export function getCalculator(slug: string): CalculatorConfig | undefined {
  return configMap.get(slug);
}

export function getCalculatorsByCluster(cluster: string): CalculatorConfig[] {
  return allConfigs.filter((c) => c.cluster === cluster);
}

export function getAllCalculators(): CalculatorConfig[] {
  return allConfigs;
}
