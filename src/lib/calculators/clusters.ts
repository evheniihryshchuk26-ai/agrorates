export type ClusterMeta = {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  icon: string;
  color: string;
  count: number;
};

export const clusters: ClusterMeta[] = [
  {
    slug: 'fertilizer',
    title: 'Fertilizer & Soil',
    shortTitle: 'Fertilizer',
    description: 'NPK rates, lime, compost, and nutrient calculators for 22 crops.',
    icon: 'Sprout',
    color: 'bg-green-50 text-green-700',
    count: 27,
  },
  {
    slug: 'seeding',
    title: 'Seed & Planting',
    shortTitle: 'Seeding',
    description: 'Seed rates, plant spacing, germination, and cost per acre.',
    icon: 'Wheat',
    color: 'bg-amber-50 text-amber-700',
    count: 29,
  },
  {
    slug: 'planting-date',
    title: 'Planting Date',
    shortTitle: 'Planting Date',
    description: 'When to plant 44 crops by USDA hardiness zone.',
    icon: 'CalendarDays',
    color: 'bg-sky-50 text-sky-700',
    count: 44,
  },
  {
    slug: 'yield',
    title: 'Crop Yield & Harvest',
    shortTitle: 'Yield',
    description: 'Yield per acre, harvest loss, grain moisture, and storage.',
    icon: 'BarChart3',
    color: 'bg-orange-50 text-orange-700',
    count: 27,
  },
  {
    slug: 'livestock',
    title: 'Livestock',
    shortTitle: 'Livestock',
    description: 'Feed conversion, weight, stocking rate, hay, and gestation.',
    icon: 'Beef',
    color: 'bg-rose-50 text-rose-700',
    count: 23,
  },
  {
    slug: 'irrigation',
    title: 'Irrigation & Water',
    shortTitle: 'Irrigation',
    description: 'Drip, sprinkler, water cost, pond sizing, and well yield.',
    icon: 'Droplets',
    color: 'bg-blue-50 text-blue-700',
    count: 9,
  },
  {
    slug: 'economics',
    title: 'Farm Economics',
    shortTitle: 'Economics',
    description: 'Profit/loss, break-even, land value, loans, and ROI.',
    icon: 'DollarSign',
    color: 'bg-emerald-50 text-emerald-700',
    count: 11,
  },
  {
    slug: 'conversions',
    title: 'Conversions & Reference',
    shortTitle: 'Conversions',
    description: 'Bushels to tons, acres to hectares, lbs/acre to kg/ha.',
    icon: 'ArrowRightLeft',
    color: 'bg-stone-100 text-stone-700',
    count: 14,
  },
];

export function getCluster(slug: string): ClusterMeta | undefined {
  return clusters.find((c) => c.slug === slug);
}
