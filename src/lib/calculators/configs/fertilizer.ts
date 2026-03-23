import type { CalculatorConfig } from '../types';

const crops = ['corn', 'wheat', 'soybeans', 'tomatoes', 'potatoes', 'cotton', 'rice', 'alfalfa', 'oats', 'barley', 'sorghum', 'sunflower', 'canola', 'peanuts', 'tobacco', 'strawberries', 'peppers', 'onions', 'lettuce', 'carrots', 'garlic', 'beans'] as const;

type CropData = {
  name: string;
  nRate: number; pRate: number; kRate: number;
  yieldUnit: string; typicalYield: string;
  tips: string[];
  faqs: [string, string][];
};

const cropData: Record<string, CropData> = {
  corn: { name: 'Corn', nRate: 1.2, pRate: 0.4, kRate: 0.6, yieldUnit: 'bu/acre', typicalYield: '180-220',
    tips: ['Split nitrogen applications: 40% at planting, 60% as sidedress at V6-V8.', 'Credit 40-50 lbs N/acre from previous soybean crop.', 'Apply starter P in-furrow for early root development.', 'Potassium is critical on sandy soils above 200 bu/acre yield goals.', 'Soil test every 2-3 years for optimal nutrient management.'],
    faqs: [['How much nitrogen does corn need per bushel?', 'Corn typically needs 1.0-1.2 lbs of nitrogen per bushel of expected yield. A 200 bu/acre yield goal requires 200-240 lbs N/acre.'], ['When should I apply fertilizer to corn?', 'Apply phosphorus and potassium in fall or spring preplant. Split nitrogen with 1/3 at planting and 2/3 as sidedress at V6-V8 growth stage.'], ['Should I use MAP or DAP for corn?', 'Both work well. DAP (18-46-0) provides more nitrogen, while MAP (11-52-0) is better for high-pH soils.']]
  },
  wheat: { name: 'Wheat', nRate: 2.5, pRate: 0.5, kRate: 0.4, yieldUnit: 'bu/acre', typicalYield: '50-80',
    tips: ['Apply nitrogen in split applications: fall and spring topdress.', 'Phosphorus placement near the seed improves early tillering.', 'Test soil sulfur levels — wheat is responsive to S on sandy soils.', 'Avoid excessive fall N to prevent winter kill.'],
    faqs: [['How much nitrogen does winter wheat need?', 'Winter wheat typically needs 2.0-2.5 lbs N per bushel of yield goal. For 70 bu/acre, plan 140-175 lbs N/acre total.'], ['When should I topdress wheat?', 'Topdress nitrogen in early spring at greenup (Feekes 3-5) for optimal uptake and tiller survival.']]
  },
  soybeans: { name: 'Soybeans', nRate: 0, pRate: 0.8, kRate: 1.0, yieldUnit: 'bu/acre', typicalYield: '45-65',
    tips: ['Soybeans fix their own nitrogen — do not apply N fertilizer.', 'Inoculate seed with Bradyrhizobium in new fields.', 'Potassium is the most yield-limiting nutrient in soybeans.', 'Maintain soil pH between 6.0-6.8 for optimal nodulation.'],
    faqs: [['Do soybeans need nitrogen fertilizer?', 'No. Soybeans fix atmospheric nitrogen through a symbiotic relationship with Bradyrhizobium bacteria. Apply N only if nodulation fails.'], ['What is the most important nutrient for soybeans?', 'Potassium (K) is typically the most yield-limiting nutrient. Soybeans remove about 1.4 lbs K₂O per bushel harvested.']]
  },
  tomatoes: { name: 'Tomatoes', nRate: 3.0, pRate: 2.0, kRate: 3.5, yieldUnit: 'tons/acre', typicalYield: '25-40',
    tips: ['Side-dress nitrogen 3-4 weeks after transplanting.', 'Calcium is critical to prevent blossom end rot.', 'Use drip fertigation for efficient nutrient delivery.', 'Maintain soil pH 6.2-6.8 for optimal nutrient availability.'],
    faqs: [['How much fertilizer do tomatoes need per acre?', 'Commercial tomatoes typically need 150-200 lbs N, 100-150 lbs P₂O₅, and 150-250 lbs K₂O per acre depending on yield goals.'], ['What causes blossom end rot in tomatoes?', 'Calcium deficiency in the fruit, often caused by inconsistent watering rather than low soil calcium.']]
  },
  potatoes: { name: 'Potatoes', nRate: 5.0, pRate: 3.0, kRate: 6.0, yieldUnit: 'cwt/acre', typicalYield: '300-450',
    tips: ['Apply nitrogen in split applications to reduce leaching.', 'Phosphorus should be banded near the seed piece.', 'High potassium rates improve tuber quality and specific gravity.', 'Maintain pH 5.0-5.5 to reduce common scab.'],
    faqs: [['How much nitrogen do potatoes need?', 'Potatoes typically need 200-250 lbs N/acre, applied in 3-4 split applications throughout the season.'], ['Why is potassium important for potatoes?', 'Potassium improves tuber size, specific gravity, and reduces bruising. Apply 200-300 lbs K₂O per acre.']]
  },
  cotton: { name: 'Cotton', nRate: 0.12, pRate: 0.04, kRate: 0.06, yieldUnit: 'lbs lint/acre', typicalYield: '800-1200',
    tips: ['Avoid excessive nitrogen which promotes rank growth.', 'Apply potassium to prevent premature cutout.', 'Side-dress nitrogen at first square to early bloom.', 'Boron is a critical micronutrient for cotton.'],
    faqs: [['How much nitrogen does cotton need?', 'Cotton typically needs 80-120 lbs N/acre. Excessive N leads to rank growth and delayed maturity.'], ['When should I apply nitrogen to cotton?', 'Apply 30% at planting and 70% at first square to early bloom stage.']]
  },
  rice: { name: 'Rice', nRate: 2.0, pRate: 0.6, kRate: 0.8, yieldUnit: 'bu/acre', typicalYield: '150-200',
    tips: ['Apply all nitrogen preflood for most varieties.', 'Maintain flood depth of 2-4 inches after N application.', 'Zinc deficiency is common in high-pH paddy soils.', 'Drain at proper time to optimize grain quality.'],
    faqs: [['How much nitrogen does rice need?', 'Rice typically needs 150-200 lbs N/acre depending on variety and soil type. Apply most N just before permanent flood.'], ['Why is zinc important for rice?', 'Zinc deficiency causes bronzing and reduced tillering, especially in high-pH alkaline soils.']]
  },
  alfalfa: { name: 'Alfalfa', nRate: 0, pRate: 0.12, kRate: 0.06, yieldUnit: 'tons/acre', typicalYield: '4-8',
    tips: ['Alfalfa fixes nitrogen — apply P and K only.', 'Test soil pH and lime to 6.8-7.0 before seeding.', 'Apply potassium in fall after last cutting.', 'Boron and sulfur are often needed on sandy soils.'],
    faqs: [['Does alfalfa need nitrogen?', 'No. Alfalfa fixes 150-200+ lbs N/acre per year through Rhizobium bacteria. Focus on P and K.'], ['How much potassium does alfalfa need?', 'Alfalfa removes about 50 lbs K₂O per ton of hay harvested. A 6-ton yield removes 300 lbs K₂O per acre.']]
  },
  oats: { name: 'Oats', nRate: 1.3, pRate: 0.5, kRate: 0.4, yieldUnit: 'bu/acre', typicalYield: '70-110',
    tips: ['Apply all nitrogen at planting or early spring.', 'Excessive N causes lodging in oats.', 'Oats are good scavengers of residual soil nutrients.', 'Use as a nurse crop for alfalfa establishment.'],
    faqs: [['How much nitrogen do oats need?', 'Oats typically need 60-80 lbs N/acre. Avoid exceeding 80 lbs to prevent lodging.'], ['Are oats good for crop rotation?', 'Yes. Oats break disease cycles and their fibrous roots improve soil structure.']]
  },
  barley: { name: 'Barley', nRate: 1.8, pRate: 0.5, kRate: 0.4, yieldUnit: 'bu/acre', typicalYield: '60-100',
    tips: ['Malting barley requires lower N rates to control protein.', 'Apply phosphorus near the seed for early vigor.', 'Avoid excessive nitrogen that increases grain protein above malt specs.', 'Test for sulfur on sandy soils.'],
    faqs: [['How much nitrogen does malting barley need?', 'Malting barley needs 60-90 lbs N/acre to keep protein below 13.5%. Feed barley can use 90-120 lbs N/acre.'], ['What is the ideal soil pH for barley?', 'Barley prefers pH 6.0-7.5 and is more sensitive to acidic soils than most small grains.']]
  },
  sorghum: { name: 'Sorghum', nRate: 1.2, pRate: 0.4, kRate: 0.4, yieldUnit: 'bu/acre', typicalYield: '80-140',
    tips: ['Apply nitrogen in split applications for best efficiency.', 'Sorghum is more drought tolerant than corn but still needs adequate P and K.', 'Band phosphorus near the seed row.', 'Iron chlorosis can occur on high-pH calcareous soils.'],
    faqs: [['How does sorghum fertilizer compare to corn?', 'Sorghum needs similar N rates per bushel as corn (1.0-1.2 lbs N/bu) but produces fewer bushels per acre.'], ['Is sorghum a good rotation crop?', 'Yes. Sorghum is drought tolerant and breaks corn rootworm and disease cycles.']]
  },
  sunflower: { name: 'Sunflower', nRate: 5.0, pRate: 2.0, kRate: 2.0, yieldUnit: 'lbs/acre', typicalYield: '1500-2200',
    tips: ['Apply nitrogen based on yield goal and residual soil N.', 'Sunflowers are efficient at extracting P and K from deeper soil layers.', 'Boron deficiency causes blank centers — apply 1-2 lbs B/acre.', 'Avoid excessive N in confection sunflowers.'],
    faqs: [['How much nitrogen do sunflowers need?', 'Sunflowers typically need 80-120 lbs N/acre. They are efficient N users with deep root systems.'], ['Do sunflowers need boron?', 'Yes. Boron deficiency is common and causes poor seed set. Apply 1-2 lbs B/acre if soil tests below 0.5 ppm.']]
  },
  canola: { name: 'Canola', nRate: 4.0, pRate: 1.5, kRate: 1.0, yieldUnit: 'lbs/acre', typicalYield: '1800-2800',
    tips: ['Apply sulfur at 15-25 lbs S/acre — canola has high S demand.', 'Split N applications for spring canola.', 'Boron is needed at 1-2 lbs/acre.', 'Fall-applied P and K are effective.'],
    faqs: [['How much nitrogen does canola need?', 'Canola needs about 100-140 lbs N/acre for optimal yield. Split applications improve efficiency.'], ['Why is sulfur important for canola?', 'Canola has a high sulfur requirement for oil and protein synthesis. Apply 15-25 lbs S/acre.']]
  },
  peanuts: { name: 'Peanuts', nRate: 0, pRate: 0.8, kRate: 0.5, yieldUnit: 'lbs/acre', typicalYield: '3500-5000',
    tips: ['Peanuts fix nitrogen — do not apply N fertilizer.', 'Gypsum application at pegging is critical for calcium uptake.', 'Maintain pH 5.8-6.2 for optimal nutrient availability.', 'Apply gypsum at 1000-1500 lbs/acre in the pegging zone.'],
    faqs: [['Do peanuts need nitrogen?', 'No. Like soybeans, peanuts fix atmospheric nitrogen through Bradyrhizobium bacteria.'], ['Why do peanuts need gypsum?', 'Gypsum provides calcium directly to developing pods in the pegging zone. Without it, pods may be empty or poorly filled.']]
  },
  tobacco: { name: 'Tobacco', nRate: 3.0, pRate: 2.0, kRate: 5.0, yieldUnit: 'lbs/acre', typicalYield: '2000-3000',
    tips: ['Avoid chloride-containing fertilizers (use K₂SO₄ not KCl).', 'Excessive N reduces leaf quality and burn characteristics.', 'Apply N based on soil type and target quality grade.', 'Maintain pH 5.8-6.5 for optimal growth.'],
    faqs: [['How much nitrogen does tobacco need?', 'Burley tobacco needs 150-200 lbs N/acre, flue-cured needs 60-80 lbs N/acre depending on quality targets.'], ['Why avoid muriate of potash on tobacco?', 'Chloride in KCl reduces burn quality and leaf taste. Use potassium sulfate (K₂SO₄) instead.']]
  },
  strawberries: { name: 'Strawberries', nRate: 10.0, pRate: 5.0, kRate: 8.0, yieldUnit: 'tons/acre', typicalYield: '8-15',
    tips: ['Fertigation through drip is the most efficient method.', 'Apply nitrogen throughout the fruiting season in small doses.', 'High K rates improve fruit quality and shelf life.', 'Maintain pH 5.5-6.5 for optimal growth.'],
    faqs: [['How much fertilizer do strawberries need?', 'Strawberries need 120-180 lbs N, 60-100 lbs P₂O₅, and 120-200 lbs K₂O per acre per season.'], ['When should I fertilize strawberries?', 'Apply preplant P and K, then fertigate N and K weekly through the drip system during the growing season.']]
  },
  peppers: { name: 'Peppers', nRate: 4.0, pRate: 2.5, kRate: 4.0, yieldUnit: 'tons/acre', typicalYield: '12-20',
    tips: ['Side-dress nitrogen 3-4 weeks after transplanting.', 'Calcium prevents blossom end rot — maintain adequate soil Ca.', 'Use plastic mulch with drip irrigation for best results.', 'Magnesium deficiency is common on sandy soils.'],
    faqs: [['How much fertilizer do peppers need?', 'Bell peppers need 150-200 lbs N, 100-150 lbs P₂O₅, and 150-200 lbs K₂O per acre.'], ['How often should I fertilize peppers?', 'Apply preplant nutrients, then side-dress or fertigate every 2-3 weeks through the growing season.']]
  },
  onions: { name: 'Onions', nRate: 6.0, pRate: 4.0, kRate: 3.0, yieldUnit: 'cwt/acre', typicalYield: '400-700',
    tips: ['Apply nitrogen in 3-4 split applications.', 'Stop N application when bulbing begins to improve storage quality.', 'Sulfur improves pungency and flavor.', 'Maintain adequate copper and zinc levels.'],
    faqs: [['How much nitrogen do onions need?', 'Onions typically need 120-180 lbs N/acre applied in splits throughout the season. Stop N at bulbing.'], ['Does sulfur affect onion flavor?', 'Yes. Sulfur increases pungency. Low-sulfur soils produce milder onions.']]
  },
  lettuce: { name: 'Lettuce', nRate: 8.0, pRate: 4.0, kRate: 6.0, yieldUnit: 'tons/acre', typicalYield: '15-25',
    tips: ['Apply nitrogen in multiple small applications to prevent leaching.', 'Lettuce has shallow roots — place nutrients in top 6 inches.', 'Calcium is critical to prevent tipburn.', 'Maintain cool soil temperatures for best quality.'],
    faqs: [['How much fertilizer does lettuce need?', 'Lettuce needs 150-200 lbs N, 80-120 lbs P₂O₅, and 100-150 lbs K₂O per acre.'], ['What causes tipburn in lettuce?', 'Tipburn is a calcium deficiency in rapidly growing inner leaves, often worsened by heat stress.']]
  },
  carrots: { name: 'Carrots', nRate: 5.0, pRate: 3.0, kRate: 5.0, yieldUnit: 'tons/acre', typicalYield: '15-30',
    tips: ['Avoid fresh manure which causes forked and hairy roots.', 'Phosphorus promotes root development and color.', 'Excessive nitrogen causes excessive top growth at the expense of roots.', 'Maintain pH 6.0-6.8 for best root quality.'],
    faqs: [['How much nitrogen do carrots need?', 'Carrots need 80-120 lbs N/acre. Apply in splits — excess N causes forked roots and poor quality.'], ['What causes forked carrots?', 'Fresh manure, rocks, compacted soil, and nematodes all cause forking. Ensure loose, deep, stone-free soil.']]
  },
  garlic: { name: 'Garlic', nRate: 8.0, pRate: 4.0, kRate: 6.0, yieldUnit: 'tons/acre', typicalYield: '5-8',
    tips: ['Apply nitrogen in early spring when growth resumes.', 'Stop nitrogen 30 days before harvest to improve curing.', 'Sulfur improves flavor and storage quality.', 'Phosphorus promotes strong root development.'],
    faqs: [['How much nitrogen does garlic need?', 'Garlic needs 100-150 lbs N/acre, applied in 2-3 splits from early spring through bulb expansion.'], ['When should I stop fertilizing garlic?', 'Stop all fertilizer 3-4 weeks before harvest to improve bulb curing and storage life.']]
  },
  beans: { name: 'Beans', nRate: 0, pRate: 0.8, kRate: 0.6, yieldUnit: 'bu/acre', typicalYield: '25-40',
    tips: ['Dry beans fix nitrogen — do not apply N fertilizer.', 'Inoculate seed in fields without recent bean history.', 'Phosphorus improves early growth and nodulation.', 'Zinc deficiency is common on high-pH soils.'],
    faqs: [['Do beans need nitrogen fertilizer?', 'No. Like soybeans, dry beans fix atmospheric nitrogen. Focus on P, K, and micronutrients.'], ['What is the ideal pH for dry beans?', 'Dry beans prefer pH 6.0-7.0. They are sensitive to both acidic and highly alkaline conditions.']]
  },
};

const cropsWithPlantingDate = new Set([
  'tomatoes', 'peppers', 'corn', 'wheat', 'soybeans', 'potatoes', 'strawberries',
  'lettuce', 'carrots', 'onions', 'garlic', 'beans', 'sunflower', 'alfalfa',
  'oats', 'barley', 'rice', 'cotton', 'sorghum', 'canola',
]);

function createCropFertConfig(slug: string, data: CropData): CalculatorConfig {
  const similarCrops = crops.filter(c => c !== slug).slice(0, 6);
  const plantingDateHref = cropsWithPlantingDate.has(slug)
    ? `/calculators/planting-date/${slug}-planting-date/`
    : '/calculators/planting-date/';
  return {
    slug,
    cluster: 'fertilizer',
    crop: slug,
    title: `${data.name} Fertilizer Calculator`,
    description: `Calculate exact NPK fertilizer rates for ${data.name.toLowerCase()}. Get nitrogen, phosphorus, and potassium recommendations based on yield goals and soil test results.`,
    fields: [
      { id: 'acres', label: 'Field Size', type: 'number', placeholder: '40', unit: 'acres', min: 0.1, step: 0.1, required: true },
      { id: 'yieldGoal', label: 'Yield Goal', type: 'number', placeholder: data.typicalYield.split('-')[1] || data.typicalYield, unit: data.yieldUnit, min: 1 },
      { id: 'soilTestN', label: 'Soil Test N', type: 'number', placeholder: '20', unit: 'ppm', min: 0, helpText: 'From your soil test report' },
      { id: 'soilTestP', label: 'Soil Test P', type: 'number', placeholder: '15', unit: 'ppm', min: 0 },
      { id: 'soilTestK', label: 'Soil Test K', type: 'number', placeholder: '120', unit: 'ppm', min: 0 },
    ],
    calculate: (inputs) => {
      const acres = Number(inputs.acres) || 0;
      const yieldGoal = Number(inputs.yieldGoal) || 0;
      const soilN = Number(inputs.soilTestN) || 0;
      const soilP = Number(inputs.soilTestP) || 0;
      const soilK = Number(inputs.soilTestK) || 0;
      const nNeeded = Math.max(0, yieldGoal * data.nRate - soilN * 2) * acres;
      const pNeeded = Math.max(0, yieldGoal * data.pRate - soilP * 2) * acres;
      const kNeeded = Math.max(0, yieldGoal * data.kRate - soilK * 0.5) * acres;
      const total = nNeeded + pNeeded + kNeeded;
      return {
        results: [
          { label: 'Nitrogen (N)', value: Math.round(nNeeded), unit: 'lbs', color: 'blue' },
          { label: 'Phosphorus (P₂O₅)', value: Math.round(pNeeded), unit: 'lbs', color: 'orange' },
          { label: 'Potassium (K₂O)', value: Math.round(kNeeded), unit: 'lbs', color: 'purple' },
        ],
        totalLabel: 'Total fertilizer needed',
        totalValue: Math.round(total),
        totalUnit: 'lbs',
      };
    },
    seo: {
      title: `${data.name} Fertilizer Calculator — NPK Rates for ${data.name} Per Acre`,
      description: `Calculate exact fertilizer rates for ${data.name.toLowerCase()}. Get nitrogen, phosphorus, and potassium recommendations based on yield goals and soil test results.`,
    },
    quickFacts: [
      { label: 'Typical N rate', value: `${Math.round(data.nRate * Number(data.typicalYield.split('-')[1] || 100))} lbs/acre` },
      { label: 'Typical P₂O₅ rate', value: `${Math.round(data.pRate * Number(data.typicalYield.split('-')[1] || 100))} lbs/acre` },
      { label: 'Typical K₂O rate', value: `${Math.round(data.kRate * Number(data.typicalYield.split('-')[1] || 100))} lbs/acre` },
      { label: 'Yield goal', value: `${data.typicalYield} ${data.yieldUnit}` },
    ],
    tips: data.tips,
    relatedCalculators: [
      { title: 'NPK Fertilizer Calculator', href: '/calculators/fertilizer/npk/' },
      { title: 'Fertilizer Cost Calculator', href: '/calculators/fertilizer/fertilizer-cost/' },
      { title: 'Nitrogen Rate Calculator', href: '/calculators/fertilizer/nitrogen/' },
      { title: 'Lime Application Rate', href: '/calculators/fertilizer/lime/' },
      { title: 'Compost Calculator', href: '/calculators/fertilizer/compost/' },
      { title: 'Corn Fertilizer Calculator', href: '/calculators/fertilizer/corn/' },
    ],
    relatedCrops: similarCrops.map(c => ({
      title: cropData[c].name,
      href: `/calculators/fertilizer/${c}/`,
    })),
    faqs: data.faqs.map(([q, a]) => ({ question: q, answer: a })),
    howToSteps: [
      `Enter your ${data.name.toLowerCase()} field size in acres.`,
      `Set your yield goal in ${data.yieldUnit} and enter soil test N, P, and K values in ppm.`,
      `Click Calculate to see the recommended nitrogen, phosphorus, and potassium rates for ${data.name.toLowerCase()}.`,
      'Review results and adjust rates based on crop history, soil conditions, or split-application plans.',
    ],
    nextSteps: [
      { title: `Calculate ${data.name} Seeding Rate`, href: `/calculators/seeding/${slug}/` },
      { title: `Find ${data.name} Planting Date`, href: plantingDateHref },
      { title: `Estimate ${data.name} Yield`, href: `/calculators/yield/${slug}/` },
    ],
    howToUse: `Enter your field size and ${data.name.toLowerCase()} yield goal. The calculator uses crop-specific nutrient uptake rates to determine how much nitrogen, phosphorus, and potassium your ${data.name.toLowerCase()} crop needs. Soil test values are subtracted to show only the supplemental fertilizer required.`,
    whyItMatters: `${data.name} has specific nutrient requirements that change with yield potential. Over-applying fertilizer to ${data.name.toLowerCase()} wastes money and can cause environmental harm, while under-applying limits yield and profit. This calculator helps you find the right balance based on proven agronomic data.`,
    methodology: `The calculator estimates nutrient needs using crop removal rates: N at ${data.nRate} lbs per unit of yield, P₂O₅ at ${data.pRate}, and K₂O at ${data.kRate}. Soil test values are credited against these needs. These rates are based on university extension guidelines and may vary by region.`,
    commonMistakes: [
      `Using generic fertilizer rates instead of ${data.name.toLowerCase()}-specific recommendations.`,
      'Ignoring soil test results and applying the same rate every year.',
      'Not accounting for nutrients already in the soil from previous crops or manure.',
      'Applying all fertilizer at planting instead of splitting applications for better uptake.',
    ],
  };
}

// General calculators
const npk: CalculatorConfig = {
  slug: 'npk',
  cluster: 'fertilizer',
  title: 'NPK Fertilizer Calculator',
  description: 'Calculate exact nitrogen, phosphorus, and potassium application rates based on soil test results and field size.',
  fields: [
    { id: 'acres', label: 'Field Size', type: 'number', placeholder: '40', unit: 'acres', min: 0.1, step: 0.1, required: true },
    { id: 'nRate', label: 'Nitrogen (N) Rate', type: 'number', placeholder: '150', unit: 'lbs/acre', min: 0, group: 'Recommended Rates (lbs/acre)' },
    { id: 'pRate', label: 'Phosphorus (P₂O₅) Rate', type: 'number', placeholder: '60', unit: 'lbs/acre', min: 0, group: 'Recommended Rates (lbs/acre)' },
    { id: 'kRate', label: 'Potassium (K₂O) Rate', type: 'number', placeholder: '80', unit: 'lbs/acre', min: 0, group: 'Recommended Rates (lbs/acre)' },
  ],
  calculate: (inputs) => {
    const acres = Number(inputs.acres) || 0;
    const n = (Number(inputs.nRate) || 0) * acres;
    const p = (Number(inputs.pRate) || 0) * acres;
    const k = (Number(inputs.kRate) || 0) * acres;
    return {
      results: [
        { label: 'Nitrogen (N)', value: Math.round(n), unit: 'lbs', color: 'blue' },
        { label: 'Phosphorus (P₂O₅)', value: Math.round(p), unit: 'lbs', color: 'orange' },
        { label: 'Potassium (K₂O)', value: Math.round(k), unit: 'lbs', color: 'purple' },
      ],
      totalLabel: 'Total fertilizer needed',
      totalValue: Math.round(n + p + k),
      totalUnit: 'lbs',
    };
  },
  seo: {
    title: 'NPK Fertilizer Calculator — Calculate Fertilizer Application Rates',
    description: 'Free NPK fertilizer calculator. Enter soil test results and target yield to get exact nitrogen, phosphorus, and potassium rates per acre.',
  },
  tips: ['Always base fertilizer rates on a current soil test (within 2-3 years).', 'Split nitrogen applications improve efficiency and reduce leaching.', 'Consider previous crop credits when calculating nitrogen needs.', 'Phosphorus and potassium can be applied in fall or spring.'],
  relatedCalculators: [
    { title: 'Fertilizer Cost Calculator', href: '/calculators/fertilizer/fertilizer-cost/' },
    { title: 'Nitrogen Rate Calculator', href: '/calculators/fertilizer/nitrogen/' },
    { title: 'Lime Application Rate', href: '/calculators/fertilizer/lime/' },
    { title: 'Compost Calculator', href: '/calculators/fertilizer/compost/' },
    { title: 'Corn Fertilizer Calculator', href: '/calculators/fertilizer/corn/' },
    { title: 'Wheat Fertilizer Calculator', href: '/calculators/fertilizer/wheat/' },
    { title: 'Soybeans Fertilizer Calculator', href: '/calculators/fertilizer/soybeans/' },
  ],
  faqs: [
    { question: 'What does NPK stand for?', answer: 'NPK stands for Nitrogen (N), Phosphorus (P₂O₅), and Potassium (K₂O) — the three primary macronutrients essential for plant growth.' },
    { question: 'How often should I soil test?', answer: 'Soil test every 2-3 years for field crops. Sample in the same season each time for consistent results.' },
    { question: 'What is a good NPK ratio for most crops?', answer: 'There is no single ideal ratio — it depends on crop needs and soil test levels. A soil test is the only reliable way to determine the right rates.' },
  ],
  howToSteps: [
    'Enter your total field size in acres.',
    'Input the recommended N, P₂O₅, and K₂O rates from your soil test report in lbs/acre.',
    'Click Calculate to see the total pounds of each nutrient needed for your field.',
    'Review results and adjust rates based on previous crop credits or soil conditions.',
  ],
  nextSteps: [
    { title: 'Calculate Seed Rate', href: '/calculators/seeding/seed-rate/' },
    { title: 'Estimate Crop Yield', href: '/calculators/yield/yield-per-acre/' },
    { title: 'Plan Farm Budget', href: '/calculators/economics/cost-per-acre/' },
  ],
  howToUse: 'Start by entering your total field size in acres. Then input the recommended nutrient rates from your soil test report for nitrogen, phosphorus, and potassium. The calculator multiplies each rate by your acreage to give total pounds needed.',
  whyItMatters: 'Applying the correct NPK rates prevents over-fertilization which wastes money and pollutes waterways, while under-fertilization limits crop yield. Accurate calculations based on soil tests are the foundation of profitable, sustainable farming.',
  methodology: 'This calculator uses a simple multiplication formula: Total nutrient (lbs) = Rate (lbs/acre) × Acres. Rates should come from a certified soil test laboratory. The calculator does not account for nutrient credits from previous crops or organic matter — use the Nitrogen Rate Calculator for that.',
  commonMistakes: [
    'Using rates from a neighbor instead of your own soil test — every field is different.',
    'Forgetting to account for nitrogen credits from previous legume crops.',
    'Applying all nitrogen at once instead of splitting applications for better efficiency.',
    'Not recalibrating your spreader when switching between fertilizer products.',
  ],
};

const fertilizerCost: CalculatorConfig = {
  slug: 'fertilizer-cost',
  cluster: 'fertilizer',
  title: 'Fertilizer Cost Calculator',
  description: 'Estimate total fertilizer cost per acre including product cost, quantity needed, and cost per acre breakdown.',
  fields: [
    { id: 'acres', label: 'Field Size', type: 'number', placeholder: '40', unit: 'acres', min: 0.1, required: true },
    { id: 'applicationRate', label: 'Application Rate', type: 'number', placeholder: '200', unit: 'lbs/acre', min: 0 },
    { id: 'bagWeight', label: 'Bag Weight', type: 'number', placeholder: '50', unit: 'lbs/bag', min: 1, defaultValue: 50 },
    { id: 'pricePerBag', label: 'Price Per Bag', type: 'number', placeholder: '28.49', unit: '$', min: 0, step: 0.01 },
  ],
  calculate: (inputs) => {
    const acres = Number(inputs.acres) || 0;
    const rate = Number(inputs.applicationRate) || 0;
    const bagWt = Number(inputs.bagWeight) || 50;
    const price = Number(inputs.pricePerBag) || 0;
    const totalLbs = rate * acres;
    const bags = Math.ceil(totalLbs / bagWt);
    const totalCost = bags * price;
    const costPerAcre = acres > 0 ? totalCost / acres : 0;
    return {
      results: [
        { label: 'Total Product Needed', value: Math.round(totalLbs), unit: 'lbs', color: 'blue' },
        { label: 'Bags Needed', value: bags, unit: 'bags', color: 'orange' },
        { label: 'Cost Per Acre', value: Math.round(costPerAcre * 100) / 100, unit: '$', color: 'green' },
      ],
      totalLabel: 'Total estimated cost',
      totalValue: Math.round(totalCost * 100) / 100,
      totalUnit: '$',
    };
  },
  seo: {
    title: 'Fertilizer Cost Calculator — Estimate Fertilizer Expenses Per Acre',
    description: 'Calculate total fertilizer cost per acre. Enter product price, bag size, and application rate to estimate your field expenses.',
  },
  tips: ['Compare bulk pricing vs bagged for large acreages — bulk is often 20-30% cheaper.', 'Factor in application costs ($5-10/acre for custom application).', 'Buy fertilizer in the off-season (summer/fall) for better prices.', 'Consider blended products to reduce application passes.'],
  faqs: [
    { question: 'How much does fertilizer cost per acre?', answer: 'Typical fertilizer costs range from $50-200 per acre depending on crop, soil test levels, and product prices.' },
    { question: 'Is bulk fertilizer cheaper than bagged?', answer: 'Yes. Bulk fertilizer is typically 20-40% cheaper per pound than bagged. It requires a spreader but saves significantly on large fields.' },
  ],
  relatedCalculators: [
    { title: 'NPK Fertilizer Calculator', href: '/calculators/fertilizer/npk/' },
    { title: 'Nitrogen Rate Calculator', href: '/calculators/fertilizer/nitrogen/' },
    { title: 'Lime Application Rate', href: '/calculators/fertilizer/lime/' },
    { title: 'Compost Calculator', href: '/calculators/fertilizer/compost/' },
    { title: 'Corn Fertilizer Calculator', href: '/calculators/fertilizer/corn/' },
    { title: 'Wheat Fertilizer Calculator', href: '/calculators/fertilizer/wheat/' },
  ],
  howToSteps: [
    'Enter your total field size in acres.',
    'Input the application rate in lbs/acre for your chosen fertilizer product.',
    'Enter the bag weight and price per bag from your supplier.',
    'Click Calculate to see total bags needed, cost per acre, and total cost.',
  ],
  nextSteps: [
    { title: 'Calculate NPK Rates', href: '/calculators/fertilizer/npk/' },
    { title: 'Estimate Seed Cost', href: '/calculators/seeding/seed-cost/' },
    { title: 'Plan Farm Budget', href: '/calculators/economics/cost-per-acre/' },
  ],
  howToUse: 'Enter your field size in acres and the application rate recommended for your fertilizer product. Then input the bag weight and price per bag from your supplier. The calculator determines how many bags you need and breaks down the cost per acre.',
  whyItMatters: 'Fertilizer is one of the largest variable costs in crop production, often 15-25% of total input costs. Accurately estimating expenses before purchasing helps you compare suppliers, negotiate bulk pricing, and build a realistic operating budget.',
  methodology: 'Total product (lbs) = Application rate (lbs/acre) × Acres. Bags needed = Total product / Bag weight, rounded up. Total cost = Bags × Price per bag. This does not include application or freight costs, which should be budgeted separately.',
  commonMistakes: [
    'Forgetting to round bags up — you cannot buy a partial bag.',
    'Not factoring in delivery or custom application costs, which can add $5-15 per acre.',
    'Comparing prices by the bag instead of by the pound or per unit of nutrient.',
    'Buying more product than needed because of minimum order requirements without adjusting the budget.',
  ],
};

const lime: CalculatorConfig = {
  slug: 'lime',
  cluster: 'fertilizer',
  title: 'Lime Application Rate Calculator',
  description: 'Calculate how much agricultural lime to apply based on current soil pH, target pH, and buffer pH from your soil test.',
  fields: [
    { id: 'acres', label: 'Field Size', type: 'number', placeholder: '40', unit: 'acres', min: 0.1, required: true },
    { id: 'currentPH', label: 'Current Soil pH', type: 'number', placeholder: '5.5', min: 3.5, max: 8.0, step: 0.1 },
    { id: 'targetPH', label: 'Target Soil pH', type: 'number', placeholder: '6.8', min: 5.0, max: 8.0, step: 0.1 },
    { id: 'bufferPH', label: 'Buffer pH', type: 'select', options: [
      { value: '6.0', label: '6.0 — Very high lime need' },
      { value: '6.2', label: '6.2 — High lime need' },
      { value: '6.4', label: '6.4 — Moderate lime need' },
      { value: '6.6', label: '6.6 — Low lime need' },
      { value: '6.8', label: '6.8 — Very low lime need' },
      { value: '7.0', label: '7.0 — No lime needed' },
    ], helpText: 'Buffer pH indicates soil resistance to pH change' },
  ],
  calculate: (inputs) => {
    const acres = Number(inputs.acres) || 0;
    const current = Number(inputs.currentPH) || 5.5;
    const target = Number(inputs.targetPH) || 6.8;
    const buffer = Number(inputs.bufferPH) || 6.6;
    const pHDiff = Math.max(0, target - current);
    const limeFactor = (7.0 - buffer) * 4;
    const tonsPerAcre = pHDiff * limeFactor;
    const totalTons = tonsPerAcre * acres;
    return {
      results: [
        { label: 'Lime Rate', value: Math.round(tonsPerAcre * 10) / 10, unit: 'tons/acre', color: 'blue' },
        { label: 'pH Change Needed', value: Math.round(pHDiff * 10) / 10, unit: 'pH units', color: 'orange' },
      ],
      totalLabel: 'Total lime needed',
      totalValue: Math.round(totalTons * 10) / 10,
      totalUnit: 'tons',
    };
  },
  seo: {
    title: 'Lime Application Rate Calculator — How Much Lime Per Acre',
    description: 'Calculate lime application rates based on soil pH and buffer pH. Determine how many tons of agricultural lime your field needs.',
  },
  tips: ['Apply lime 3-6 months before planting for best results.', 'Incorporate lime into the top 6-8 inches of soil.', 'Do not apply more than 4 tons/acre in a single application — split if needed.', 'Use ENM (Effective Neutralizing Material) to compare lime products.'],
  faqs: [
    { question: 'What is buffer pH?', answer: 'Buffer pH measures the soil\'s resistance to pH change. A lower buffer pH means more lime is needed because the soil has more acidity to neutralize.' },
    { question: 'How long does it take for lime to work?', answer: 'Finely ground lime begins working within weeks, but full reaction takes 6-12 months. Apply in fall for spring crops.' },
  ],
  relatedCalculators: [
    { title: 'NPK Fertilizer Calculator', href: '/calculators/fertilizer/npk/' },
    { title: 'Compost Calculator', href: '/calculators/fertilizer/compost/' },
    { title: 'Fertilizer Cost Calculator', href: '/calculators/fertilizer/fertilizer-cost/' },
    { title: 'Nitrogen Rate Calculator', href: '/calculators/fertilizer/nitrogen/' },
    { title: 'Corn Fertilizer Calculator', href: '/calculators/fertilizer/corn/' },
    { title: 'Wheat Fertilizer Calculator', href: '/calculators/fertilizer/wheat/' },
  ],
  howToSteps: [
    'Enter your field size in acres.',
    'Input your current soil pH and target pH from your soil test report.',
    'Select the buffer pH value from your soil test to account for soil buffering capacity.',
    'Click Calculate to see the lime rate in tons per acre and total lime needed.',
  ],
  nextSteps: [
    { title: 'Calculate NPK Rates', href: '/calculators/fertilizer/npk/' },
    { title: 'Estimate Compost Needs', href: '/calculators/fertilizer/compost/' },
    { title: 'Calculate Seed Rate', href: '/calculators/seeding/seed-rate/' },
  ],
  howToUse: 'Enter your field size in acres, then input your current soil pH and target pH from your soil test report. Select the buffer pH value to account for your soil\'s resistance to pH change. The calculator estimates the tons of agricultural lime needed per acre and for your entire field.',
  whyItMatters: 'Soil pH controls nutrient availability — most crops perform best between pH 6.0 and 7.0. Even with perfect fertilizer rates, nutrients like phosphorus and molybdenum become locked up in acidic soils, reducing uptake and wasting your fertilizer investment.',
  methodology: 'Lime requirement is calculated using the buffer pH method: the difference between target and current pH is multiplied by a lime factor derived from buffer pH. Lower buffer pH values indicate higher buffering capacity (more clay or organic matter), requiring more lime to shift pH. Results assume 100% Effective Neutralizing Material (ENM).',
  commonMistakes: [
    'Ignoring the buffer pH and basing lime rates only on the water pH — this underestimates lime needs on clay soils.',
    'Applying more than 4 tons per acre in one pass, which can over-correct surface pH before it incorporates.',
    'Using pelletized lime without adjusting for its lower ENM compared to finely ground ag lime.',
    'Not allowing 6-12 months for lime to fully react before planting pH-sensitive crops.',
  ],
};

const compost: CalculatorConfig = {
  slug: 'compost',
  cluster: 'fertilizer',
  title: 'Compost Calculator',
  description: 'Determine how much compost you need based on area, desired depth, and compost density.',
  fields: [
    { id: 'area', label: 'Area', type: 'number', placeholder: '5000', unit: 'sq ft', min: 1, required: true },
    { id: 'depth', label: 'Desired Depth', type: 'number', placeholder: '2', unit: 'inches', min: 0.25, step: 0.25 },
    { id: 'density', label: 'Compost Density', type: 'number', placeholder: '1000', unit: 'lbs/cu yd', defaultValue: 1000, helpText: 'Typical compost weighs 800-1200 lbs per cubic yard' },
  ],
  calculate: (inputs) => {
    const area = Number(inputs.area) || 0;
    const depth = Number(inputs.depth) || 0;
    const density = Number(inputs.density) || 1000;
    const cubicFt = area * (depth / 12);
    const cubicYards = cubicFt / 27;
    const totalWeight = cubicYards * density;
    return {
      results: [
        { label: 'Volume', value: Math.round(cubicYards * 10) / 10, unit: 'cu yd', color: 'green' },
        { label: 'Total Weight', value: Math.round(totalWeight), unit: 'lbs', color: 'orange' },
        { label: 'Cubic Feet', value: Math.round(cubicFt * 10) / 10, unit: 'cu ft', color: 'blue' },
      ],
      totalLabel: 'Compost needed',
      totalValue: Math.round(cubicYards * 10) / 10,
      totalUnit: 'cubic yards',
    };
  },
  seo: {
    title: 'Compost Calculator — How Much Compost Do I Need?',
    description: 'Calculate compost volume and weight needed for your garden or field. Enter area and desired depth to get cubic yards and total pounds.',
  },
  tips: ['Apply 1-3 inches of compost for garden beds, 0.25-0.5 inches for lawns.', 'Well-aged compost has a finished, earthy smell with no recognizable materials.', 'Incorporate compost into the top 6-12 inches of soil for best results.', 'Compost improves both sandy and clay soils by improving water retention and drainage.'],
  faqs: [
    { question: 'How much compost do I need per 1000 sq ft?', answer: 'For a 1-inch application depth, you need about 3 cubic yards per 1,000 sq ft. For 2 inches, double that.' },
    { question: 'How thick should compost be applied?', answer: 'For garden beds, apply 1-3 inches and incorporate. For established lawns, apply 0.25-0.5 inches as topdressing.' },
  ],
  relatedCalculators: [
    { title: 'NPK Fertilizer Calculator', href: '/calculators/fertilizer/npk/' },
    { title: 'Lime Application Rate', href: '/calculators/fertilizer/lime/' },
    { title: 'Fertilizer Cost Calculator', href: '/calculators/fertilizer/fertilizer-cost/' },
    { title: 'Nitrogen Rate Calculator', href: '/calculators/fertilizer/nitrogen/' },
    { title: 'Corn Fertilizer Calculator', href: '/calculators/fertilizer/corn/' },
    { title: 'Tomatoes Fertilizer Calculator', href: '/calculators/fertilizer/tomatoes/' },
  ],
  howToSteps: [
    'Enter the area you want to amend in square feet.',
    'Set the desired compost depth in inches (1-3 inches for garden beds).',
    'Optionally adjust the compost density based on your product.',
    'Click Calculate to see the total cubic yards and weight of compost needed.',
  ],
  nextSteps: [
    { title: 'Calculate Lime Rate', href: '/calculators/fertilizer/lime/' },
    { title: 'Calculate NPK Rates', href: '/calculators/fertilizer/npk/' },
    { title: 'Estimate Crop Yield', href: '/calculators/yield/yield-per-acre/' },
  ],
  howToUse: 'Enter the area you want to amend in square feet and the desired compost depth in inches. Optionally adjust the compost density if you know your product weight. The calculator converts your inputs into cubic yards and total pounds so you can order the right amount.',
  whyItMatters: 'Compost improves soil structure, water-holding capacity, and microbial activity while slowly releasing nutrients over time. Applying the right amount avoids both under-amendment, which limits benefits, and over-application, which can cause excess salts or nutrient imbalances.',
  methodology: 'Volume is calculated as Area (sq ft) × Depth (inches) / 12 to get cubic feet, then divided by 27 to convert to cubic yards. Weight is estimated by multiplying cubic yards by the compost density. Finished compost typically weighs 800-1,200 lbs per cubic yard depending on moisture content.',
  commonMistakes: [
    'Using unfinished compost that can tie up nitrogen and introduce weed seeds.',
    'Applying compost too thickly on lawns — more than 0.5 inches smothers turf grass.',
    'Not incorporating compost into garden beds, leaving it on the surface where it dries out.',
    'Underestimating volume needed — compost settles 10-20% after spreading and incorporation.',
  ],
};

const nitrogen: CalculatorConfig = {
  slug: 'nitrogen',
  cluster: 'fertilizer',
  title: 'Nitrogen Rate Calculator',
  description: 'Calculate nitrogen fertilizer needs based on yield goal, previous crop credits, and soil organic matter.',
  fields: [
    { id: 'acres', label: 'Field Size', type: 'number', placeholder: '40', unit: 'acres', min: 0.1, required: true },
    { id: 'yieldGoal', label: 'Yield Goal', type: 'number', placeholder: '200', unit: 'bu/acre', min: 1 },
    { id: 'nFactor', label: 'N Factor (lbs N per bushel)', type: 'number', placeholder: '1.2', defaultValue: 1.2, step: 0.1, min: 0.5, max: 3.0, helpText: 'Corn: 1.0-1.2, Wheat: 2.0-2.5' },
    { id: 'previousCrop', label: 'Previous Crop', type: 'select', options: [
      { value: '0', label: 'Corn (0 lbs N credit)' },
      { value: '40', label: 'Soybeans (40 lbs N credit)' },
      { value: '20', label: 'Wheat (20 lbs N credit)' },
      { value: '0', label: 'Fallow (0 lbs N credit)' },
      { value: '80', label: 'Alfalfa (80 lbs N credit)' },
    ] },
    { id: 'organicMatter', label: 'Soil Organic Matter', type: 'number', placeholder: '3.0', unit: '%', min: 0, max: 15, step: 0.1, helpText: 'Each 1% OM contributes ~20 lbs N/acre' },
  ],
  calculate: (inputs) => {
    const acres = Number(inputs.acres) || 0;
    const yieldGoal = Number(inputs.yieldGoal) || 0;
    const nFactor = Number(inputs.nFactor) || 1.2;
    const prevCropCredit = Number(inputs.previousCrop) || 0;
    const om = Number(inputs.organicMatter) || 0;
    const grossN = yieldGoal * nFactor;
    const omCredit = om * 20;
    const netN = Math.max(0, grossN - prevCropCredit - omCredit);
    const totalN = netN * acres;
    return {
      results: [
        { label: 'Gross N Need', value: Math.round(grossN), unit: 'lbs/acre', color: 'blue' },
        { label: 'Crop Credit', value: Math.round(prevCropCredit), unit: 'lbs/acre', color: 'green' },
        { label: 'OM Credit', value: Math.round(omCredit), unit: 'lbs/acre', color: 'orange' },
        { label: 'Net N Rate', value: Math.round(netN), unit: 'lbs/acre', color: 'purple' },
      ],
      totalLabel: 'Total nitrogen needed',
      totalValue: Math.round(totalN),
      totalUnit: 'lbs',
    };
  },
  seo: {
    title: 'Nitrogen Rate Calculator — Calculate N Fertilizer Needs',
    description: 'Calculate nitrogen fertilizer requirements based on yield goals, previous crop credits, and soil organic matter. Get accurate N rates per acre.',
  },
  tips: ['Credit nitrogen from previous legume crops to avoid over-application.', 'Each 1% soil organic matter contributes approximately 20 lbs N/acre per year.', 'Split nitrogen applications are more efficient than single pre-plant applications.', 'Use the economic optimum nitrogen rate (EONR) rather than maximum yield rate.', 'Consider in-season soil nitrate testing to adjust rates.'],
  faqs: [
    { question: 'How is nitrogen rate calculated?', answer: 'Net N rate = (Yield goal × N factor) - Previous crop credit - Organic matter credit. This gives the supplemental nitrogen needed from fertilizer.' },
    { question: 'What is the N factor for corn?', answer: 'Corn typically uses 1.0-1.2 lbs N per bushel of expected yield. Use 1.0 for high-organic-matter soils and 1.2 for low-OM soils.' },
  ],
  relatedCalculators: [
    { title: 'NPK Fertilizer Calculator', href: '/calculators/fertilizer/npk/' },
    { title: 'Fertilizer Cost Calculator', href: '/calculators/fertilizer/fertilizer-cost/' },
    { title: 'Lime Application Rate', href: '/calculators/fertilizer/lime/' },
    { title: 'Compost Calculator', href: '/calculators/fertilizer/compost/' },
    { title: 'Corn Fertilizer Calculator', href: '/calculators/fertilizer/corn/' },
    { title: 'Wheat Fertilizer Calculator', href: '/calculators/fertilizer/wheat/' },
    { title: 'Soybeans Fertilizer Calculator', href: '/calculators/fertilizer/soybeans/' },
  ],
  howToSteps: [
    'Enter your field size in acres and your yield goal in bushels per acre.',
    'Select the previous crop to apply nitrogen credits (e.g., soybeans provide 40 lbs N/acre).',
    'Enter your soil organic matter percentage from your soil test.',
    'Click Calculate to see gross N need, credits, and the net nitrogen rate to apply.',
  ],
  nextSteps: [
    { title: 'Calculate NPK Rates', href: '/calculators/fertilizer/npk/' },
    { title: 'Estimate Fertilizer Cost', href: '/calculators/fertilizer/fertilizer-cost/' },
    { title: 'Calculate Seed Rate', href: '/calculators/seeding/seed-rate/' },
    { title: 'Estimate Crop Yield', href: '/calculators/yield/yield-per-acre/' },
  ],
  howToUse: 'Enter your field size, yield goal, and the nitrogen factor for your crop (pre-filled for corn). Select the previous crop to apply nitrogen credits, and enter your soil organic matter percentage. The calculator subtracts all credits from the gross nitrogen need to show your net application rate.',
  whyItMatters: 'Nitrogen is the most expensive and environmentally sensitive nutrient in crop production. Over-applying nitrogen wastes money, increases nitrate leaching into groundwater, and can cause lodging. Under-applying limits yield potential and profit.',
  methodology: 'Net N (lbs/acre) = (Yield goal × N factor) − Previous crop credit − Organic matter credit. Each 1% organic matter is credited at 20 lbs N/acre of annual mineralization. Legume credits vary by crop: soybeans provide ~40 lbs N/acre, alfalfa ~80 lbs N/acre. These credits are based on Midwest university extension research.',
  commonMistakes: [
    'Ignoring previous crop nitrogen credits, especially after soybeans or alfalfa.',
    'Not crediting organic matter mineralization, which can contribute 40-80 lbs N/acre on high-OM soils.',
    'Using the maximum yield N rate instead of the economic optimum rate, which is typically 10-15% lower.',
    'Applying all nitrogen pre-plant instead of splitting applications to match crop uptake timing.',
  ],
};

const cropConfigs = crops.map(slug => createCropFertConfig(slug, cropData[slug]));

export const fertilizerConfigs: CalculatorConfig[] = [
  npk, fertilizerCost, lime, compost, nitrogen,
  ...cropConfigs,
];
