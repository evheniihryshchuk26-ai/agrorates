import type { CalculatorConfig } from '../types';

const bushelsToTons: CalculatorConfig = {
  slug: 'bushels-to-tons', cluster: 'conversions',
  title: 'Bushels to Tons Converter',
  description: 'Convert bushels to tons and pounds for common grains using standard test weights.',
  fields: [
    { id: 'bushels', label: 'Bushels', type: 'number', placeholder: '5000', min: 0, required: true },
    { id: 'grainType', label: 'Grain Type', type: 'select', options: [
      { value: '56', label: 'Corn — 56 lbs/bu' }, { value: '60', label: 'Wheat — 60 lbs/bu' },
      { value: '60', label: 'Soybeans — 60 lbs/bu' }, { value: '32', label: 'Oats — 32 lbs/bu' },
      { value: '48', label: 'Barley — 48 lbs/bu' }, { value: '56', label: 'Sorghum — 56 lbs/bu' },
      { value: '45', label: 'Rice (rough) — 45 lbs/bu' },
    ] },
  ],
  calculate: (inputs) => {
    const bu = Number(inputs.bushels) || 0;
    const tw = Number(inputs.grainType) || 56;
    const lbs = bu * tw;
    const tons = lbs / 2000;
    const metricTons = lbs / 2204.6;
    return {
      results: [
        { label: 'Short Tons', value: Math.round(tons * 100) / 100, unit: 'tons', color: 'blue' },
        { label: 'Metric Tons', value: Math.round(metricTons * 100) / 100, unit: 'MT', color: 'orange' },
        { label: 'Pounds', value: Math.round(lbs), unit: 'lbs', color: 'green' },
      ],
      totalLabel: 'Weight', totalValue: Math.round(tons * 100) / 100, totalUnit: 'short tons',
    };
  },
  seo: { title: 'Free Bushels to Tons Converter — Corn, Wheat & Grain (2026)', description: 'Convert bushels to tons and pounds for corn, wheat, soybeans, oats, barley, and sorghum. Free grain weight calculator with standard test weights.' },
  tips: ['Standard test weights: corn 56, wheat 60, soybeans 60, oats 32, barley 48 lbs/bu.', 'Actual test weight may vary — heavier grain yields more weight per bushel.'],
  faqs: [{ question: 'How many bushels in a ton of corn?', answer: '1 ton = 2000 lbs / 56 lbs per bushel = 35.7 bushels of corn.' }],
  relatedCalculators: [
    { title: 'Grain Weight Per Bushel', href: '/calculators/conversions/grain-weight-per-bushel/' },
    { title: 'Acres to Hectares', href: '/calculators/conversions/acres-to-hectares/' },
    { title: 'Lbs/Acre to Kg/Hectare', href: '/calculators/conversions/lbs-per-acre-to-kg-per-hectare/' },
    { title: 'Yield Per Acre Calculator', href: '/calculators/yield/yield-per-acre/' },
    { title: 'Grain Bin Storage', href: '/calculators/yield/grain-bin-storage/' },
    { title: 'Break-Even Price Calculator', href: '/calculators/economics/break-even-price/' },
  ],
  howToSteps: [
    'Enter the number of bushels to convert.',
    'Select the grain type to apply the correct test weight.',
    'Click Calculate to see weight in short tons, metric tons, and pounds.',
  ],
  nextSteps: [
    { title: 'Grain Weight Per Bushel', href: '/calculators/conversions/grain-weight-per-bushel' },
    { title: 'Yield Per Acre Calculator', href: '/calculators/yield/yield-per-acre/' },
    { title: 'Break-Even Price Calculator', href: '/calculators/economics/break-even-price' },
  ],
  howToUse: 'Enter the number of bushels you want to convert and select the grain type from the dropdown. Each grain has a standard test weight (pounds per bushel) set by the USDA. The calculator converts bushels to short tons, metric tons, and total pounds.',
  whyItMatters: 'Grain is traded in bushels domestically but in metric tons internationally. Accurate conversion is essential for export contracts, trucking logistics (weight limits), and storage planning. Using the wrong test weight can cause significant errors in large quantities.',
  methodology: 'Pounds = Bushels × Test weight (lbs/bu). Short tons = Pounds / 2,000. Metric tons = Pounds / 2,204.6. Standard test weights: corn 56, wheat 60, soybeans 60, oats 32, barley 48, sorghum 56, rice 45 lbs/bu.',
  commonMistakes: [
    'Using the wrong test weight — soybeans are 60 lbs/bu, not 56 like corn.',
    'Confusing short tons (2,000 lbs) with metric tons (2,204.6 lbs) on export contracts.',
    'Not adjusting for actual test weight — high-test-weight grain yields more tons per bushel.',
    'Forgetting that moisture content affects weight — wet grain weighs more but is docked at the elevator.',
  ],
};

const acresToHectares: CalculatorConfig = {
  slug: 'acres-to-hectares', cluster: 'conversions',
  title: 'Acres to Hectares Converter',
  description: 'Convert between acres and hectares.',
  fields: [
    { id: 'acres', label: 'Acres', type: 'number', placeholder: '100', min: 0, required: true },
  ],
  calculate: (inputs) => {
    const acres = Number(inputs.acres) || 0;
    const hectares = acres * 0.4047;
    const sqMeters = hectares * 10000;
    return {
      results: [
        { label: 'Hectares', value: Math.round(hectares * 1000) / 1000, unit: 'ha', color: 'blue' },
        { label: 'Square Meters', value: Math.round(sqMeters), unit: 'm²', color: 'orange' },
        { label: 'Square Feet', value: Math.round(acres * 43560), unit: 'sq ft', color: 'green' },
      ],
      totalLabel: 'Hectares', totalValue: Math.round(hectares * 1000) / 1000, totalUnit: 'ha',
    };
  },
  seo: { title: 'Free Acreage Calculator — Acres, Hectares & Sq Feet (2026)', description: 'Free acreage calculator. Measure land area in acres, convert acres to hectares and square feet. Essential tool for farmers and landowners.' },
  tips: ['1 acre = 0.4047 hectares, 1 hectare = 2.471 acres.', '1 acre = 43,560 sq ft, 1 hectare = 10,000 sq meters.'],
  faqs: [{ question: 'How many acres in a hectare?', answer: '1 hectare = 2.471 acres. 1 acre = 0.4047 hectares.' }],
  relatedCalculators: [
    { title: 'Lbs/Acre to Kg/Hectare', href: '/calculators/conversions/lbs-per-acre-to-kg-per-hectare/' },
    { title: 'Gallons/Acre to Liters/Hectare', href: '/calculators/conversions/gallons-per-acre-to-liters-per-hectare/' },
    { title: 'Bushels to Tons', href: '/calculators/conversions/bushels-to-tons/' },
    { title: 'Row Spacing Converter', href: '/calculators/conversions/row-spacing-converter/' },
    { title: 'Soil Volume', href: '/calculators/conversions/soil-volume/' },
    { title: 'Yield Per Acre Calculator', href: '/calculators/yield/yield-per-acre/' },
  ],
  howToSteps: [
    'Enter the number of acres to convert.',
    'Click Calculate to see the equivalent in hectares, square meters, and square feet.',
  ],
  nextSteps: [
    { title: 'Lbs/Acre to Kg/Hectare', href: '/calculators/conversions/lbs-per-acre-to-kg-per-hectare' },
    { title: 'Gallons/Acre to Liters/Hectare', href: '/calculators/conversions/gallons-per-acre-to-liters-per-hectare' },
    { title: 'Yield Per Acre Calculator', href: '/calculators/yield/yield-per-acre/' },
  ],
  howToUse: 'Use this acreage calculator to measure acres and convert instantly. Enter the number of acres you want to convert, and it shows the equivalent in hectares, square meters, and square feet. Use this to measure acres for international reporting, metric-based input recommendations, or comparing farm sizes across countries.',
  whyItMatters: 'Most of the world uses hectares, while the US uses acres. This acreage estimator ensures you convert land area accurately — essential when reading international research, applying metric-labeled products, or communicating farm size to international buyers and partners.',
  methodology: '1 acre = 0.4047 hectares = 4,047 square meters = 43,560 square feet. 1 hectare = 2.471 acres = 10,000 square meters. The conversion factor 0.4047 is exact and based on the international definition of the acre.',
  commonMistakes: [
    'Multiplying by 2.471 when you should divide by 2.471 (or multiply by 0.4047) to go from acres to hectares.',
    'Confusing hectares with acres when reading product labels — applying at the acre rate on a hectare-sized field underdoses by 60%.',
    'Forgetting that yield per hectare is always a larger number than yield per acre for the same field.',
    'Not converting application rates (lbs/acre vs kg/ha) when switching between unit systems.',
  ],
};

const lbsPerAcreToKgPerHectare: CalculatorConfig = {
  slug: 'lbs-per-acre-to-kg-per-hectare', cluster: 'conversions',
  title: 'Lbs/Acre to Kg/Hectare Converter',
  description: 'Convert application rates between lbs/acre and kg/hectare.',
  fields: [
    { id: 'lbsPerAcre', label: 'Pounds Per Acre', type: 'number', placeholder: '150', unit: 'lbs/acre', min: 0, required: true },
  ],
  calculate: (inputs) => {
    const lpa = Number(inputs.lbsPerAcre) || 0;
    const kph = lpa * 1.1209;
    const gpa = lpa / 43560;
    return {
      results: [
        { label: 'Kg Per Hectare', value: Math.round(kph * 100) / 100, unit: 'kg/ha', color: 'blue' },
        { label: 'Lbs Per Acre', value: lpa, unit: 'lbs/acre', color: 'orange' },
        { label: 'Lbs Per 1000 Sq Ft', value: Math.round(gpa * 1000 * 1000) / 1000, unit: 'lbs', color: 'green' },
      ],
      totalLabel: 'Rate conversion', totalValue: Math.round(kph * 100) / 100, totalUnit: 'kg/ha',
    };
  },
  seo: { title: 'Free Lbs/Acre to Kg/Ha Converter — Rate Conversion (2026)', description: 'Convert fertilizer and application rates from lbs/acre to kg/hectare.' },
  tips: ['Multiply lbs/acre by 1.1209 to get kg/ha.', 'Multiply kg/ha by 0.8922 to get lbs/acre.'],
  faqs: [{ question: 'How do I convert lbs/acre to kg/ha?', answer: 'Multiply lbs/acre by 1.1209. Example: 150 lbs/acre × 1.1209 = 168.1 kg/ha.' }],
  relatedCalculators: [
    { title: 'Acres to Hectares', href: '/calculators/conversions/acres-to-hectares/' },
    { title: 'Gallons/Acre to Liters/Hectare', href: '/calculators/conversions/gallons-per-acre-to-liters-per-hectare/' },
    { title: 'Fertilizer Spreader Calibration', href: '/calculators/conversions/fertilizer-spreader-calibration/' },
    { title: 'Bushels to Tons', href: '/calculators/conversions/bushels-to-tons/' },
    { title: 'Row Spacing Converter', href: '/calculators/conversions/row-spacing-converter/' },
    { title: 'NPK Fertilizer Calculator', href: '/calculators/fertilizer/npk/' },
  ],
  howToSteps: [
    'Enter the application rate in pounds per acre.',
    'Click Calculate to see the equivalent in kg/ha and lbs per 1,000 sq ft.',
  ],
  nextSteps: [
    { title: 'Acres to Hectares Converter', href: '/calculators/conversions/acres-to-hectares' },
    { title: 'NPK Fertilizer Calculator', href: '/calculators/fertilizer/npk/' },
    { title: 'Fertilizer Spreader Calibration', href: '/calculators/conversions/fertilizer-spreader-calibration' },
  ],
  howToUse: 'Enter the application rate in pounds per acre from your soil test or product label. The calculator converts it to kilograms per hectare and also shows the rate per 1,000 square feet for smaller applications like lawns and gardens.',
  whyItMatters: 'Fertilizer and chemical labels from international manufacturers use kg/ha, while US soil test recommendations use lbs/acre. Incorrect conversion leads to over- or under-application, wasting money or damaging crops and the environment.',
  methodology: 'Kg per hectare = Lbs per acre × 1.1209. The factor 1.1209 accounts for both the weight conversion (lbs to kg) and the area conversion (acres to hectares). Reverse: Lbs per acre = Kg per hectare × 0.8922.',
  commonMistakes: [
    'Applying the conversion factor backwards — multiplying kg/ha by 1.1209 instead of 0.8922 to get lbs/acre.',
    'Not converting when switching between US and imported products with metric labels.',
    'Confusing lbs of product per acre with lbs of active ingredient per acre.',
    'Forgetting to adjust for product concentration when converting between formulations.',
  ],
};

const balesPerAcre: CalculatorConfig = {
  slug: 'bales-per-acre', cluster: 'conversions',
  title: 'Bales Per Acre Calculator',
  description: 'Calculate hay bales per acre based on yield and bale weight.',
  fields: [
    { id: 'yieldTons', label: 'Hay Yield', type: 'number', placeholder: '3', unit: 'tons/acre', min: 0, step: 0.1, required: true },
    { id: 'baleWeight', label: 'Bale Weight', type: 'number', placeholder: '50', unit: 'lbs', min: 1 },
    { id: 'acres', label: 'Total Acres', type: 'number', placeholder: '20', unit: 'acres', min: 0.1 },
  ],
  calculate: (inputs) => {
    const yieldTons = Number(inputs.yieldTons) || 0;
    const baleWt = Number(inputs.baleWeight) || 50;
    const acres = Number(inputs.acres) || 1;
    const lbsPerAcre = yieldTons * 2000;
    const balesPerAcre = lbsPerAcre / baleWt;
    const totalBales = balesPerAcre * acres;
    return {
      results: [
        { label: 'Bales Per Acre', value: Math.round(balesPerAcre * 10) / 10, unit: 'bales', color: 'blue' },
        { label: 'Total Bales', value: Math.round(totalBales), unit: 'bales', color: 'orange' },
        { label: 'Lbs Per Acre', value: Math.round(lbsPerAcre), unit: 'lbs', color: 'green' },
      ],
      totalLabel: 'Total bales', totalValue: Math.round(totalBales), totalUnit: 'bales',
    };
  },
  seo: { title: 'Free Bales Per Acre Calculator — Hay Yield & Count (2026)', description: 'Calculate hay bales per acre from yield and bale size.' },
  tips: ['Small square bales: 40-60 lbs. Large round: 800-1500 lbs. Large square: 800-1200 lbs.'],
  faqs: [{ question: 'How many small bales per acre?', answer: 'At 3 tons/acre yield with 50-lb bales: 120 bales per acre.' }],
  relatedCalculators: [
    { title: 'Hay Bale Calculator', href: '/calculators/livestock/hay-bale/' },
    { title: 'Hay Storage', href: '/calculators/livestock/hay-storage/' },
    { title: 'Bushels to Tons', href: '/calculators/conversions/bushels-to-tons/' },
    { title: 'Stocking Rate', href: '/calculators/livestock/stocking-rate/' },
    { title: 'Feed Cost Calculator', href: '/calculators/livestock/feed-cost/' },
    { title: 'Cost Per Acre', href: '/calculators/economics/cost-per-acre/' },
  ],
  howToSteps: [
    'Enter the hay yield in tons per acre.',
    'Provide the average bale weight in pounds.',
    'Enter the total acres to calculate total bales.',
    'Click Calculate to see bales per acre and total bale count.',
  ],
  nextSteps: [
    { title: 'Bushels to Tons Converter', href: '/calculators/conversions/bushels-to-tons' },
    { title: 'Alfalfa Yield Calculator', href: '/calculators/yield/alfalfa/' },
    { title: 'Cost Per Acre Calculator', href: '/calculators/economics/cost-per-acre' },
  ],
  howToUse: 'Enter the hay yield in tons per acre (check your area average or past records). Enter the average bale weight in pounds — small squares are typically 40-60 lbs, large rounds 800-1,500 lbs. Enter total acres to see the full bale count for your operation.',
  whyItMatters: 'Accurate bale counts are essential for planning hay sales, storage space, and livestock feed budgets. Underestimating means running short of feed mid-winter; overestimating means wasted barn space or buying hay you did not need.',
  methodology: 'Pounds per acre = Yield (tons/acre) × 2,000. Bales per acre = Pounds per acre / Bale weight. Total bales = Bales per acre × Total acres. Typical alfalfa yields 3-6 tons/acre per year across multiple cuttings; grass hay yields 1.5-3 tons/acre.',
  commonMistakes: [
    'Assuming all bales weigh the same — moisture content at baling causes significant weight variation.',
    'Not accounting for harvest losses, which typically reduce yield by 10-20% from standing crop to baled hay.',
    'Using per-cutting yield instead of total annual yield when estimating storage needs.',
    'Forgetting that large round bales lose 5-25% of feed value from weathering if stored outside without cover.',
  ],
};

const seedsPerPound: CalculatorConfig = {
  slug: 'seeds-per-pound', cluster: 'conversions',
  title: 'Seeds Per Pound Calculator',
  description: 'Calculate total seeds from weight and seeds per pound.',
  fields: [
    { id: 'weight', label: 'Seed Weight', type: 'number', placeholder: '50', unit: 'lbs', min: 0, required: true },
    { id: 'seedsPerLb', label: 'Seeds Per Pound', type: 'number', placeholder: '15000', min: 1 },
  ],
  calculate: (inputs) => {
    const wt = Number(inputs.weight) || 0;
    const spl = Number(inputs.seedsPerLb) || 1;
    const total = wt * spl;
    return {
      results: [
        { label: 'Total Seeds', value: Math.round(total), unit: 'seeds', color: 'blue' },
        { label: 'Seeds Per Ounce', value: Math.round(spl / 16), unit: 'seeds', color: 'orange' },
      ],
      totalLabel: 'Total seeds', totalValue: Math.round(total), totalUnit: 'seeds',
    };
  },
  seo: { title: 'Free Seeds Per Pound Calculator — Total Seed Count (2026)', description: 'Calculate total seed count from weight and seeds per pound.' },
  tips: ['Seed size varies by variety — always check your seed lot analysis.'],
  faqs: [{ question: 'How many wheat seeds per pound?', answer: 'About 15,000 seeds per pound for average-sized wheat seed.' }],
  relatedCalculators: [
    { title: 'Seed Rate Calculator', href: '/calculators/seeding/seed-rate/' },
    { title: 'Row Spacing Converter', href: '/calculators/conversions/row-spacing-converter/' },
    { title: 'Plants Per Acre', href: '/calculators/yield/plants-per-acre/' },
    { title: 'Bushels to Tons', href: '/calculators/conversions/bushels-to-tons/' },
    { title: 'Lbs/Acre to Kg/Hectare', href: '/calculators/conversions/lbs-per-acre-to-kg-per-hectare/' },
    { title: 'Acres to Hectares', href: '/calculators/conversions/acres-to-hectares/' },
  ],
  howToSteps: [
    'Enter the seed weight in pounds.',
    'Provide the seeds per pound for your variety.',
    'Click Calculate to see total seed count and seeds per ounce.',
  ],
  nextSteps: [
    { title: 'Seed Rate Calculator', href: '/calculators/seeding/seed-rate/' },
    { title: 'Row Spacing Converter', href: '/calculators/conversions/row-spacing-converter' },
    { title: 'Cost Per Acre Calculator', href: '/calculators/economics/cost-per-acre' },
  ],
  howToUse: 'Enter the total weight of seed in pounds and the seeds per pound for your specific crop variety (found on the seed tag or seed company data sheet). The calculator multiplies weight by seed count to give you total seeds and seeds per ounce.',
  whyItMatters: 'Seeding rate recommendations are often given in seeds per acre, but seed is sold by weight. Knowing your seeds per pound lets you convert between the two, ensuring you buy the right amount and plant at the correct population for maximum yield.',
  methodology: 'Total seeds = Seed weight (lbs) × Seeds per pound. Seeds per ounce = Seeds per pound / 16. Seed count per pound varies by crop and variety: wheat ~15,000, corn ~1,200-1,500, soybeans ~2,500-3,000, alfalfa ~220,000 seeds per pound.',
  commonMistakes: [
    'Using a generic seeds-per-pound figure instead of the actual value from your seed lot tag.',
    'Not adjusting for germination rate — if germination is 90%, you need 10% more seed.',
    'Confusing seeds per pound with seeds per unit (corn is sold in 80,000-seed units, not by weight).',
    'Forgetting that seed size varies between varieties and crop years, changing the seeds-per-pound count.',
  ],
};

const cubicYardsToTons: CalculatorConfig = {
  slug: 'cubic-yards-to-tons', cluster: 'conversions',
  title: 'Cubic Yards to Tons Converter',
  description: 'Convert cubic yards to tons for common bulk materials.',
  fields: [
    { id: 'cubicYards', label: 'Cubic Yards', type: 'number', placeholder: '10', min: 0, required: true },
    { id: 'material', label: 'Material', type: 'select', options: [
      { value: '2200', label: 'Topsoil — ~2,200 lbs/cu yd' }, { value: '2800', label: 'Gravel — ~2,800 lbs/cu yd' },
      { value: '2700', label: 'Sand — ~2,700 lbs/cu yd' }, { value: '1000', label: 'Compost — ~1,000 lbs/cu yd' },
      { value: '800', label: 'Mulch — ~800 lbs/cu yd' }, { value: '2400', label: 'Crushed Stone — ~2,400 lbs/cu yd' },
    ] },
  ],
  calculate: (inputs) => {
    const cy = Number(inputs.cubicYards) || 0;
    const density = Number(inputs.material) || 2200;
    const lbs = cy * density;
    const tons = lbs / 2000;
    return {
      results: [
        { label: 'Tons', value: Math.round(tons * 100) / 100, unit: 'tons', color: 'blue' },
        { label: 'Pounds', value: Math.round(lbs), unit: 'lbs', color: 'orange' },
      ],
      totalLabel: 'Weight', totalValue: Math.round(tons * 100) / 100, totalUnit: 'tons',
    };
  },
  seo: { title: 'Free Cubic Yards to Tons Calculator — Dirt, Gravel & Sand (2026)', description: 'Convert cubic yards to tons for dirt, gravel, sand, topsoil, compost, and mulch. Free bulk material weight calculator.' },
  tips: ['Wet material weighs significantly more than dry — these are average dry weights.'],
  faqs: [{ question: 'How much does a cubic yard of topsoil weigh?', answer: 'About 2,000-2,400 lbs (1.0-1.2 tons) depending on moisture content.' }],
  relatedCalculators: [
    { title: 'Soil Volume', href: '/calculators/conversions/soil-volume/' },
    { title: 'Mulch Calculator', href: '/calculators/conversions/mulch-calculator/' },
    { title: 'Bushels to Tons', href: '/calculators/conversions/bushels-to-tons/' },
    { title: 'Bales Per Acre', href: '/calculators/conversions/bales-per-acre/' },
    { title: 'Acres to Hectares', href: '/calculators/conversions/acres-to-hectares/' },
    { title: 'Lbs/Acre to Kg/Hectare', href: '/calculators/conversions/lbs-per-acre-to-kg-per-hectare/' },
  ],
  howToSteps: [
    'Enter the volume in cubic yards.',
    'Select the material type from the dropdown.',
    'Click Calculate to see the weight in tons and pounds.',
  ],
  nextSteps: [
    { title: 'Soil Volume Calculator', href: '/calculators/conversions/soil-volume' },
    { title: 'Mulch Calculator', href: '/calculators/conversions/mulch-calculator' },
    { title: 'Compost Calculator', href: '/calculators/fertilizer/compost/' },
  ],
  howToUse: 'Enter the volume in cubic yards and select the bulk material type from the dropdown. Each material has a different density. The calculator converts volume to weight in tons and pounds so you can match delivery truck capacity and weight limits.',
  whyItMatters: 'Bulk materials like topsoil, gravel, and compost are sold by volume (cubic yards) but trucking is limited by weight (tons). Knowing the weight prevents overloading trucks, helps estimate delivery costs, and ensures you order the right amount for your project.',
  methodology: 'Weight (lbs) = Cubic yards × Material density (lbs/cu yd). Tons = Pounds / 2,000. Typical densities: topsoil ~2,200, gravel ~2,800, sand ~2,700, compost ~1,000, mulch ~800, crushed stone ~2,400 lbs per cubic yard.',
  commonMistakes: [
    'Assuming all materials weigh the same — gravel weighs 3.5 times more than mulch per cubic yard.',
    'Not accounting for moisture content, which can increase weight by 20-40% for soil and compost.',
    'Exceeding truck weight limits — a standard dump truck holds 10-14 cubic yards but may only carry 20 tons.',
    'Ordering by volume alone without checking if the delivery truck can legally haul that weight.',
  ],
};

const fertilizerSpreaderCalibration: CalculatorConfig = {
  slug: 'fertilizer-spreader-calibration', cluster: 'conversions',
  title: 'Fertilizer Spreader Calibration',
  description: 'Calculate actual application rate from a spreader calibration test.',
  fields: [
    { id: 'swathWidth', label: 'Swath Width', type: 'number', placeholder: '40', unit: 'feet', min: 1, required: true },
    { id: 'distance', label: 'Test Distance', type: 'number', placeholder: '100', unit: 'feet', min: 1 },
    { id: 'collected', label: 'Weight Collected', type: 'number', placeholder: '5', unit: 'lbs', min: 0, step: 0.1 },
  ],
  calculate: (inputs) => {
    const swath = Number(inputs.swathWidth) || 1;
    const dist = Number(inputs.distance) || 1;
    const collected = Number(inputs.collected) || 0;
    const testArea = (swath * dist) / 43560;
    const lbsPerAcre = testArea > 0 ? collected / testArea : 0;
    return {
      results: [
        { label: 'Application Rate', value: Math.round(lbsPerAcre * 10) / 10, unit: 'lbs/acre', color: 'blue' },
        { label: 'Test Area', value: Math.round(testArea * 10000) / 10000, unit: 'acres', color: 'orange' },
      ],
      totalLabel: 'Application rate', totalValue: Math.round(lbsPerAcre * 10) / 10, totalUnit: 'lbs/acre',
    };
  },
  seo: { title: 'Free Spreader Calibration Calculator — Lbs Per Acre (2026)', description: 'Calibrate your fertilizer spreader to ensure accurate application rates. Calculate actual lbs per acre from a calibration test run.' },
  tips: ['Calibrate before each season and when switching products.', 'Use catch pans placed across the full swath width for accuracy.'],
  faqs: [{ question: 'How do I calibrate a broadcast spreader?', answer: 'Spread over a measured area, collect material in catch pans, weigh it, and calculate lbs/acre.' }],
  relatedCalculators: [
    { title: 'NPK Calculator', href: '/calculators/fertilizer/npk/' },
    { title: 'Lbs/Acre to Kg/Hectare', href: '/calculators/conversions/lbs-per-acre-to-kg-per-hectare/' },
    { title: 'Gallons/Acre to Liters/Hectare', href: '/calculators/conversions/gallons-per-acre-to-liters-per-hectare/' },
    { title: 'Acres to Hectares', href: '/calculators/conversions/acres-to-hectares/' },
    { title: 'Row Spacing Converter', href: '/calculators/conversions/row-spacing-converter/' },
    { title: 'Cost Per Acre', href: '/calculators/economics/cost-per-acre/' },
  ],
  howToSteps: [
    'Enter the swath width and test distance in feet.',
    'Weigh the material collected from catch pans.',
    'Click Calculate to see the actual application rate in lbs/acre.',
  ],
  nextSteps: [
    { title: 'NPK Fertilizer Calculator', href: '/calculators/fertilizer/npk/' },
    { title: 'Lbs/Acre to Kg/Hectare', href: '/calculators/conversions/lbs-per-acre-to-kg-per-hectare' },
    { title: 'Cost Per Acre Calculator', href: '/calculators/economics/cost-per-acre' },
  ],
  howToUse: 'Run a calibration test by driving your spreader over a measured distance while collecting material in catch pans placed across the swath width. Enter the swath width, test distance, and total weight collected. The calculator shows your actual application rate in lbs/acre.',
  whyItMatters: 'Spreader calibration is the only way to verify you are applying the correct rate. Even small errors compound over large acreages — a 10% over-application on 500 acres wastes thousands of dollars in fertilizer and can cause crop burn or environmental damage.',
  methodology: 'Test area (acres) = (Swath width × Test distance) / 43,560. Application rate (lbs/acre) = Weight collected / Test area. Calibrate at your planned ground speed and PTO speed, as both affect delivery rate.',
  commonMistakes: [
    'Not placing catch pans across the full swath width, which misses uneven distribution patterns.',
    'Calibrating at a different ground speed than you will use in the field.',
    'Testing with a nearly empty hopper — application rate changes as hopper weight decreases.',
    'Forgetting to recalibrate when switching to a different fertilizer product with a different particle size or density.',
  ],
};

const gallonsPerAcreToLitersPerHectare: CalculatorConfig = {
  slug: 'gallons-per-acre-to-liters-per-hectare', cluster: 'conversions',
  title: 'Gallons/Acre to Liters/Hectare',
  description: 'Convert spray and irrigation rates between gallons/acre and liters/hectare.',
  fields: [
    { id: 'gallonsPerAcre', label: 'Gallons Per Acre', type: 'number', placeholder: '15', unit: 'gal/acre', min: 0, required: true },
  ],
  calculate: (inputs) => {
    const gpa = Number(inputs.gallonsPerAcre) || 0;
    const lph = gpa * 9.354;
    return {
      results: [
        { label: 'Liters Per Hectare', value: Math.round(lph * 100) / 100, unit: 'L/ha', color: 'blue' },
        { label: 'Gallons Per Acre', value: gpa, unit: 'gal/acre', color: 'orange' },
      ],
      totalLabel: 'Rate conversion', totalValue: Math.round(lph * 100) / 100, totalUnit: 'L/ha',
    };
  },
  seo: { title: 'Free Gallons/Acre to Liters/Ha Converter (2026)', description: 'Convert spray rates from gallons per acre to liters per hectare.' },
  tips: ['Multiply gal/acre by 9.354 to get L/ha.', 'Multiply L/ha by 0.1069 to get gal/acre.'],
  faqs: [{ question: 'How to convert GPA to L/ha?', answer: 'Multiply gallons per acre by 9.354. Example: 15 GPA × 9.354 = 140.3 L/ha.' }],
  relatedCalculators: [
    { title: 'Lbs/Acre to Kg/Ha', href: '/calculators/conversions/lbs-per-acre-to-kg-per-hectare/' },
    { title: 'Acres to Hectares', href: '/calculators/conversions/acres-to-hectares/' },
    { title: 'Fertilizer Spreader Calibration', href: '/calculators/conversions/fertilizer-spreader-calibration/' },
    { title: 'Row Spacing Converter', href: '/calculators/conversions/row-spacing-converter/' },
    { title: 'Irrigation Water Need', href: '/calculators/irrigation/irrigation-water-need/' },
    { title: 'Drip Irrigation', href: '/calculators/irrigation/drip-irrigation/' },
  ],
  howToSteps: [
    'Enter the application rate in gallons per acre.',
    'Click Calculate to see the equivalent in liters per hectare.',
  ],
  nextSteps: [
    { title: 'Lbs/Acre to Kg/Hectare', href: '/calculators/conversions/lbs-per-acre-to-kg-per-hectare' },
    { title: 'Acres to Hectares Converter', href: '/calculators/conversions/acres-to-hectares' },
    { title: 'Irrigation Water Need', href: '/calculators/irrigation/irrigation-water-need' },
  ],
  howToUse: 'Enter the spray or irrigation application rate in gallons per acre. The calculator converts it to liters per hectare. Use this when applying products with metric-labeled rates on US acreage, or when converting US rates for international reporting.',
  whyItMatters: 'Spray application rates must be exact to ensure proper pest and weed control. Converting incorrectly between gallons per acre and liters per hectare leads to under-dosing (poor control) or over-dosing (crop damage, illegal residues, and wasted product).',
  methodology: 'Liters per hectare = Gallons per acre × 9.354. The factor combines the gallon-to-liter conversion (3.785) with the acre-to-hectare conversion (2.471). Reverse: Gallons per acre = Liters per hectare × 0.1069.',
  commonMistakes: [
    'Applying the conversion in the wrong direction — GPA to L/ha multiplies, L/ha to GPA divides.',
    'Confusing spray volume rate with product rate — you may apply 15 GPA of water but only 1 qt/acre of chemical.',
    'Not recalibrating spray nozzles after changing between US and metric rate settings.',
    'Forgetting that carrier volume (water) and product rate must be converted separately.',
  ],
};

const rowSpacingConverter: CalculatorConfig = {
  slug: 'row-spacing-converter', cluster: 'conversions',
  title: 'Row Spacing Converter',
  description: 'Convert row spacing between inches and centimeters. Calculate rows per acre.',
  fields: [
    { id: 'spacingInches', label: 'Row Spacing', type: 'number', placeholder: '30', unit: 'inches', min: 1, required: true },
  ],
  calculate: (inputs) => {
    const inches = Number(inputs.spacingInches) || 1;
    const cm = inches * 2.54;
    const rowsPerAcre = 43560 / (inches / 12);
    const rowFeetPerAcre = rowsPerAcre;
    return {
      results: [
        { label: 'Centimeters', value: Math.round(cm * 10) / 10, unit: 'cm', color: 'blue' },
        { label: 'Row Feet Per Acre', value: Math.round(rowFeetPerAcre), unit: 'ft', color: 'orange' },
      ],
      totalLabel: 'Row spacing', totalValue: Math.round(cm * 10) / 10, totalUnit: 'cm',
    };
  },
  seo: { title: 'Free Row Spacing Converter — Inches, CM & Rows/Acre (2026)', description: 'Convert row spacing from inches to centimeters. Calculate row feet per acre.' },
  tips: ['30-inch rows = 17,424 row feet per acre.', '15-inch rows = 34,848 row feet per acre.'],
  faqs: [{ question: 'How many row feet in an acre at 30-inch rows?', answer: '43,560 sq ft / 2.5 ft = 17,424 row feet per acre.' }],
  relatedCalculators: [
    { title: 'Plant Spacing', href: '/calculators/seeding/plant-spacing/' },
    { title: 'Seeds Per Pound', href: '/calculators/conversions/seeds-per-pound/' },
    { title: 'Acres to Hectares', href: '/calculators/conversions/acres-to-hectares/' },
    { title: 'Plants Per Acre', href: '/calculators/yield/plants-per-acre/' },
    { title: 'Lbs/Acre to Kg/Hectare', href: '/calculators/conversions/lbs-per-acre-to-kg-per-hectare/' },
    { title: 'Seeding Rate Calculator', href: '/calculators/seeding/seeding-rate/' },
  ],
  howToSteps: [
    'Enter the row spacing in inches.',
    'Click Calculate to see the equivalent in centimeters and row feet per acre.',
  ],
  nextSteps: [
    { title: 'Seed Rate Calculator', href: '/calculators/seeding/seed-rate/' },
    { title: 'Seeds Per Pound Calculator', href: '/calculators/conversions/seeds-per-pound' },
    { title: 'Acres to Hectares Converter', href: '/calculators/conversions/acres-to-hectares' },
  ],
  howToUse: 'Enter the row spacing in inches used by your planter or drill. The calculator converts to centimeters for metric reference and calculates the total linear row feet per acre. Use this to plan seed, fertilizer, and chemical needs on a per-row-foot basis.',
  whyItMatters: 'Row spacing directly affects plant population, light interception, weed competition, and equipment compatibility. Narrower rows increase yield potential for many crops but require specific planter and harvester configurations.',
  methodology: 'Centimeters = Inches × 2.54. Row feet per acre = 43,560 sq ft / (Row spacing in inches / 12). At 30-inch rows, there are 17,424 row feet per acre. At 15-inch rows, there are 34,848 row feet per acre — double the row feet.',
  commonMistakes: [
    'Changing row spacing without adjusting seeding rate — narrower rows need proportionally more seed per acre.',
    'Not verifying that harvest equipment header matches the planter row spacing.',
    'Assuming narrower rows always increase yield — the benefit depends on crop, region, and planting date.',
    'Forgetting that row spacing affects in-row seed spacing needed to achieve the target plant population.',
  ],
};

const grainWeightPerBushel: CalculatorConfig = {
  slug: 'grain-weight-per-bushel', cluster: 'conversions',
  title: 'Grain Weight Per Bushel Reference',
  description: 'Standard test weights per bushel for common grains.',
  fields: [
    { id: 'grain', label: 'Grain Type', type: 'select', options: [
      { value: '56', label: 'Corn' }, { value: '60', label: 'Wheat' }, { value: '60', label: 'Soybeans' },
      { value: '32', label: 'Oats' }, { value: '48', label: 'Barley' }, { value: '56', label: 'Grain Sorghum' },
      { value: '45', label: 'Rice (rough)' }, { value: '50', label: 'Canola' }, { value: '60', label: 'Rye' },
      { value: '56', label: 'Flaxseed' }, { value: '30', label: 'Sunflower (oil)' }, { value: '24', label: 'Sunflower (confection)' },
    ], required: true },
    { id: 'bushels', label: 'Number of Bushels', type: 'number', placeholder: '1000', min: 0 },
  ],
  calculate: (inputs) => {
    const tw = Number(inputs.grain) || 56;
    const bu = Number(inputs.bushels) || 1;
    const lbs = tw * bu;
    const tons = lbs / 2000;
    return {
      results: [
        { label: 'Test Weight', value: tw, unit: 'lbs/bu', color: 'blue' },
        { label: 'Total Pounds', value: Math.round(lbs), unit: 'lbs', color: 'orange' },
        { label: 'Total Tons', value: Math.round(tons * 100) / 100, unit: 'tons', color: 'green' },
      ],
      totalLabel: 'Standard test weight', totalValue: tw, totalUnit: 'lbs/bu',
    };
  },
  seo: { title: 'Free Grain Weight Per Bushel — Test Weights Reference (2026)', description: 'Standard test weights for all common grains. Quick reference for bushel-to-weight conversions.' },
  tips: ['Test weight above standard indicates higher quality grain.', 'Low test weight may result in dockage at the elevator.'],
  faqs: [{ question: 'What is test weight?', answer: 'Test weight is the weight of grain per bushel (1.244 cubic feet). It indicates grain density and quality.' }],
  relatedCalculators: [
    { title: 'Bushels to Tons', href: '/calculators/conversions/bushels-to-tons/' },
    { title: 'Lbs/Acre to Kg/Hectare', href: '/calculators/conversions/lbs-per-acre-to-kg-per-hectare/' },
    { title: 'Acres to Hectares', href: '/calculators/conversions/acres-to-hectares/' },
    { title: 'Yield Per Acre Calculator', href: '/calculators/yield/yield-per-acre/' },
    { title: 'Grain Moisture Calculator', href: '/calculators/yield/grain-moisture/' },
    { title: 'Break-Even Price Calculator', href: '/calculators/economics/break-even-price/' },
  ],
  howToSteps: [
    'Select the grain type from the dropdown.',
    'Optionally enter the number of bushels for weight calculation.',
    'Click Calculate to see the standard test weight and total weight.',
  ],
  nextSteps: [
    { title: 'Bushels to Tons Converter', href: '/calculators/conversions/bushels-to-tons' },
    { title: 'Yield Per Acre Calculator', href: '/calculators/yield/yield-per-acre/' },
    { title: 'Break-Even Price Calculator', href: '/calculators/economics/break-even-price' },
  ],
  howToUse: 'Select a grain type from the dropdown to see its USDA standard test weight. Optionally enter a number of bushels to calculate total weight in pounds and tons. Use this as a quick reference when you need to know the standard weight for any common grain.',
  whyItMatters: 'Test weight is the official measure of grain density and quality. Grain elevators use it to determine dockage — grain below standard test weight receives a price discount. Understanding test weight helps you evaluate grain quality and estimate storage and trucking capacity.',
  methodology: 'Test weight = Standard pounds per bushel (1.244 cubic feet) as defined by USDA. Total pounds = Test weight × Bushels. Total tons = Pounds / 2,000. Actual test weight varies by growing conditions, hybrid, and moisture at harvest.',
  commonMistakes: [
    'Assuming actual test weight equals the standard — drought stress and early frost lower test weight significantly.',
    'Not knowing that soybeans and wheat share the same 60 lb/bu standard despite being very different grains.',
    'Ignoring test weight premiums and discounts when making marketing decisions.',
    'Confusing test weight (density) with moisture content — they are related but separate quality factors.',
  ],
};

const livestockWeightConverter: CalculatorConfig = {
  slug: 'livestock-weight-converter', cluster: 'conversions',
  title: 'Livestock Weight Converter',
  description: 'Convert animal weight between pounds and kilograms.',
  fields: [
    { id: 'lbs', label: 'Weight in Pounds', type: 'number', placeholder: '1200', unit: 'lbs', min: 0, required: true },
  ],
  calculate: (inputs) => {
    const lbs = Number(inputs.lbs) || 0;
    const kg = lbs * 0.4536;
    return {
      results: [
        { label: 'Kilograms', value: Math.round(kg * 10) / 10, unit: 'kg', color: 'blue' },
        { label: 'Pounds', value: lbs, unit: 'lbs', color: 'orange' },
      ],
      totalLabel: 'Weight', totalValue: Math.round(kg * 10) / 10, totalUnit: 'kg',
    };
  },
  seo: { title: 'Free Livestock Weight Converter — Lbs to Kg (2026)', description: 'Convert livestock weight between pounds and kilograms.' },
  tips: ['Multiply lbs by 0.4536 to get kg.', 'Multiply kg by 2.2046 to get lbs.'],
  faqs: [{ question: 'How do I convert animal weight to kg?', answer: 'Multiply pounds by 0.4536. Example: 1200 lbs × 0.4536 = 544 kg.' }],
  relatedCalculators: [
    { title: 'Cattle Weight', href: '/calculators/livestock/cattle-weight/' },
    { title: 'Feed Conversion', href: '/calculators/livestock/feed-conversion/' },
    { title: 'Feed Cost Calculator', href: '/calculators/livestock/feed-cost/' },
    { title: 'Temperature Converter', href: '/calculators/conversions/temperature-converter/' },
    { title: 'Bushels to Tons', href: '/calculators/conversions/bushels-to-tons/' },
    { title: 'Acres to Hectares', href: '/calculators/conversions/acres-to-hectares/' },
  ],
  howToSteps: [
    'Enter the animal weight in pounds.',
    'Click Calculate to see the equivalent weight in kilograms.',
  ],
  nextSteps: [
    { title: 'Bales Per Acre Calculator', href: '/calculators/conversions/bales-per-acre' },
    { title: 'Temperature Converter', href: '/calculators/conversions/temperature-converter' },
    { title: 'Bushels to Tons Converter', href: '/calculators/conversions/bushels-to-tons' },
  ],
  howToUse: 'Enter the animal weight in pounds. The calculator instantly converts to kilograms. Use this for international livestock trade, veterinary dosage calculations, or when reading research published in metric units.',
  whyItMatters: 'Veterinary medications, feed supplements, and international livestock markets all use kilograms. Incorrect weight conversion leads to dangerous over- or under-dosing of medications and inaccurate pricing for export sales.',
  methodology: 'Kilograms = Pounds × 0.4536. Pounds = Kilograms × 2.2046. These are exact conversion factors based on the international pound definition. One kilogram equals exactly 2.20462 pounds.',
  commonMistakes: [
    'Multiplying by 2.2 when converting lbs to kg instead of dividing — this gives a number 4.8x too large.',
    'Using estimated live weight instead of actual scale weight for medication dosing.',
    'Confusing live weight with carcass weight — dressing percentage is typically 60-65% for cattle.',
    'Not accounting for gut fill — cattle can weigh 30-50 lbs more after feeding and watering.',
  ],
};

const temperatureConverter: CalculatorConfig = {
  slug: 'temperature-converter', cluster: 'conversions',
  title: 'Temperature Converter',
  description: 'Convert between Fahrenheit and Celsius for agricultural applications.',
  fields: [
    { id: 'fahrenheit', label: 'Fahrenheit', type: 'number', placeholder: '50', unit: '°F', required: true },
  ],
  calculate: (inputs) => {
    const f = Number(inputs.fahrenheit) || 0;
    const c = (f - 32) * 5 / 9;
    return {
      results: [
        { label: 'Celsius', value: Math.round(c * 10) / 10, unit: '°C', color: 'blue' },
        { label: 'Fahrenheit', value: f, unit: '°F', color: 'orange' },
      ],
      totalLabel: 'Temperature', totalValue: Math.round(c * 10) / 10, totalUnit: '°C',
    };
  },
  seo: { title: 'Free Temperature Converter — Fahrenheit to Celsius (2026)', description: 'Convert temperatures between Fahrenheit and Celsius for farming applications.' },
  tips: ['Key soil temps: 50°F (10°C) = corn planting, 60°F (15.5°C) = beans, 65°F (18°C) = cotton.', 'Freezing point: 32°F = 0°C.'],
  faqs: [{ question: 'How do I convert F to C?', answer: 'Subtract 32, then multiply by 5/9. Example: 77°F → (77-32) × 5/9 = 25°C.' }],
  relatedCalculators: [
    { title: 'Acres to Hectares', href: '/calculators/conversions/acres-to-hectares/' },
    { title: 'Livestock Weight Converter', href: '/calculators/conversions/livestock-weight-converter/' },
    { title: 'Lbs/Acre to Kg/Hectare', href: '/calculators/conversions/lbs-per-acre-to-kg-per-hectare/' },
    { title: 'Gallons/Acre to Liters/Hectare', href: '/calculators/conversions/gallons-per-acre-to-liters-per-hectare/' },
    { title: 'Bushels to Tons', href: '/calculators/conversions/bushels-to-tons/' },
    { title: 'Grain Weight Per Bushel', href: '/calculators/conversions/grain-weight-per-bushel/' },
  ],
  howToSteps: [
    'Enter the temperature in Fahrenheit.',
    'Click Calculate to see the equivalent in Celsius.',
  ],
  nextSteps: [
    { title: 'Acres to Hectares Converter', href: '/calculators/conversions/acres-to-hectares' },
    { title: 'Lbs/Acre to Kg/Hectare', href: '/calculators/conversions/lbs-per-acre-to-kg-per-hectare' },
    { title: 'Livestock Weight Converter', href: '/calculators/conversions/livestock-weight-converter' },
  ],
  howToUse: 'Enter a temperature in Fahrenheit. The calculator converts it to Celsius. Use this for interpreting soil temperature data, understanding cold storage requirements, or converting between weather forecast formats used in different countries.',
  whyItMatters: 'Soil temperature determines planting timing — corn needs 50°F (10°C), soybeans need 60°F (15.5°C). Understanding temperature in both scales helps you interpret international research, set greenhouse controls, and make accurate planting decisions.',
  methodology: 'Celsius = (Fahrenheit - 32) × 5/9. Fahrenheit = (Celsius × 9/5) + 32. Key agricultural reference points: 32°F = 0°C (freezing), 50°F = 10°C (cool-season planting), 86°F = 30°C (heat stress threshold for many crops).',
  commonMistakes: [
    'Forgetting to subtract 32 first before multiplying by 5/9.',
    'Using soil temperature at the wrong depth — planting-depth temperature matters, not surface temperature.',
    'Not checking soil temperature at planting time — morning soil temps can be 10-15°F cooler than afternoon.',
    'Confusing air temperature with soil temperature, which lags air temp by several days.',
  ],
};

const soilVolume: CalculatorConfig = {
  slug: 'soil-volume', cluster: 'conversions',
  title: 'Soil Volume Calculator',
  description: 'Calculate soil volume needed for raised beds, gardens, or fill projects.',
  fields: [
    { id: 'length', label: 'Length', type: 'number', placeholder: '20', unit: 'feet', min: 0.1, required: true },
    { id: 'width', label: 'Width', type: 'number', placeholder: '4', unit: 'feet', min: 0.1 },
    { id: 'depth', label: 'Depth', type: 'number', placeholder: '12', unit: 'inches', min: 0.5, step: 0.5 },
  ],
  calculate: (inputs) => {
    const l = Number(inputs.length) || 0;
    const w = Number(inputs.width) || 0;
    const d = Number(inputs.depth) || 0;
    const cubicFt = l * w * (d / 12);
    const cubicYards = cubicFt / 27;
    const tons = cubicYards * 1.1;
    return {
      results: [
        { label: 'Cubic Yards', value: Math.round(cubicYards * 100) / 100, unit: 'cu yd', color: 'blue' },
        { label: 'Cubic Feet', value: Math.round(cubicFt * 10) / 10, unit: 'cu ft', color: 'orange' },
        { label: 'Estimated Tons', value: Math.round(tons * 100) / 100, unit: 'tons', color: 'green' },
      ],
      totalLabel: 'Volume needed', totalValue: Math.round(cubicYards * 100) / 100, totalUnit: 'cubic yards',
    };
  },
  seo: { title: 'Free Dirt & Soil Calculator — Cubic Yards, Tons & Volume (2026)', description: 'Free dirt and soil calculator. Calculate cubic yards, cubic feet, and tons needed for raised beds, gardens, fill projects, and landscaping.' },
  tips: ['Most bulk soil is sold by the cubic yard.', 'Plan for 10-15% extra to account for settling.', 'A standard pickup truck holds about 1-2 cubic yards.'],
  faqs: [{ question: 'How much soil for a 4x8 raised bed?', answer: 'A 4×8 foot bed, 12 inches deep needs about 1.2 cubic yards of soil.' }],
  relatedCalculators: [
    { title: 'Cubic Yards to Tons', href: '/calculators/conversions/cubic-yards-to-tons/' },
    { title: 'Mulch Calculator', href: '/calculators/conversions/mulch-calculator/' },
    { title: 'Acres to Hectares', href: '/calculators/conversions/acres-to-hectares/' },
    { title: 'Bales Per Acre', href: '/calculators/conversions/bales-per-acre/' },
    { title: 'Lbs/Acre to Kg/Hectare', href: '/calculators/conversions/lbs-per-acre-to-kg-per-hectare/' },
    { title: 'Irrigation Water Need', href: '/calculators/irrigation/irrigation-water-need/' },
  ],
  howToSteps: [
    'Enter the length and width of the area in feet.',
    'Provide the desired soil depth in inches.',
    'Click Calculate to see volume in cubic yards, cubic feet, and estimated tons.',
  ],
  nextSteps: [
    { title: 'Cubic Yards to Tons', href: '/calculators/conversions/cubic-yards-to-tons' },
    { title: 'Mulch Calculator', href: '/calculators/conversions/mulch-calculator' },
    { title: 'Compost Calculator', href: '/calculators/fertilizer/compost/' },
  ],
  howToUse: 'This soil calculator makes it easy to estimate volume for any project. Enter the length and width of the area in feet, and the desired soil depth in inches. This dirt calculator shows the total volume needed in cubic yards (for bulk delivery), cubic feet, and estimated weight in tons for planning delivery logistics.',
  whyItMatters: 'Raised beds, garden fill, and landscaping projects require precise soil volumes. A reliable soil estimator prevents costly mistakes — ordering too little means a second delivery charge; ordering too much wastes money and leaves excess material with no place to put it. Accurate calculation saves both time and money.',
  methodology: 'This soil measurement calculator uses: Cubic feet = Length (ft) × Width (ft) × Depth (in) / 12. Cubic yards = Cubic feet / 27. Estimated tons = Cubic yards × 1.1 (average dry topsoil density). One cubic yard of topsoil weighs approximately 2,000-2,400 lbs depending on moisture.',
  commonMistakes: [
    'Forgetting to convert depth from inches to feet before calculating volume.',
    'Not adding 10-15% extra for settling — fresh fill settles 10-15% over the first year.',
    'Estimating area by eye instead of measuring, which leads to ordering errors.',
    'Not checking that the delivery truck can access your site — a loaded dump truck weighs 25-30 tons.',
  ],
};

const mulchCalculator: CalculatorConfig = {
  slug: 'mulch-calculator', cluster: 'conversions',
  title: 'Mulch Calculator',
  description: 'Calculate how much mulch you need in cubic yards and bags.',
  fields: [
    { id: 'area', label: 'Area', type: 'number', placeholder: '500', unit: 'sq ft', min: 1, required: true },
    { id: 'depth', label: 'Desired Depth', type: 'number', placeholder: '3', unit: 'inches', min: 0.5, step: 0.5 },
    { id: 'bagSize', label: 'Bag Size', type: 'number', placeholder: '2', unit: 'cu ft/bag', defaultValue: 2 },
  ],
  calculate: (inputs) => {
    const area = Number(inputs.area) || 0;
    const depth = Number(inputs.depth) || 0;
    const bagSize = Number(inputs.bagSize) || 2;
    const cubicFt = area * (depth / 12);
    const cubicYards = cubicFt / 27;
    const bags = Math.ceil(cubicFt / bagSize);
    return {
      results: [
        { label: 'Cubic Yards', value: Math.round(cubicYards * 100) / 100, unit: 'cu yd', color: 'blue' },
        { label: 'Bags Needed', value: bags, unit: 'bags', color: 'orange' },
        { label: 'Cubic Feet', value: Math.round(cubicFt * 10) / 10, unit: 'cu ft', color: 'green' },
      ],
      totalLabel: 'Mulch needed', totalValue: Math.round(cubicYards * 100) / 100, totalUnit: 'cubic yards',
    };
  },
  seo: { title: 'Free Mulch Calculator — Cubic Yards, Bags & Coverage (2026)', description: 'Free mulch calculator. Enter area and depth to get cubic yards and bags needed. Works for bark mulch, wood chips, rubber mulch, and straw.' },
  tips: ['Apply 2-4 inches of mulch for weed suppression.', 'Keep mulch 2-3 inches away from plant stems and tree trunks.', 'Bulk mulch is cheaper than bagged for areas over 50 sq ft.'],
  faqs: [{ question: 'How much mulch do I need?', answer: 'For 3 inches deep: multiply area (sq ft) by 0.25, then divide by 27 for cubic yards. 100 sq ft needs about 1 cubic yard.' }],
  relatedCalculators: [
    { title: 'Soil Volume', href: '/calculators/conversions/soil-volume/' },
    { title: 'Compost Calculator', href: '/calculators/fertilizer/compost/' },
    { title: 'Cubic Yards to Tons', href: '/calculators/conversions/cubic-yards-to-tons/' },
    { title: 'Acres to Hectares', href: '/calculators/conversions/acres-to-hectares/' },
    { title: 'Bales Per Acre', href: '/calculators/conversions/bales-per-acre/' },
    { title: 'Lbs/Acre to Kg/Hectare', href: '/calculators/conversions/lbs-per-acre-to-kg-per-hectare/' },
  ],
  howToSteps: [
    'Enter the total area to cover in square feet.',
    'Set the desired mulch depth in inches.',
    'Optionally adjust the bag size in cubic feet.',
    'Click Calculate to see cubic yards needed and number of bags.',
  ],
  nextSteps: [
    { title: 'Soil Volume Calculator', href: '/calculators/conversions/soil-volume' },
    { title: 'Cubic Yards to Tons', href: '/calculators/conversions/cubic-yards-to-tons' },
    { title: 'Compost Calculator', href: '/calculators/fertilizer/compost/' },
  ],
  howToUse: 'Use this mulch estimator to find out how much mulch you need. Measure the total area in square feet (length times width). Choose your desired mulch depth — typically 2-3 inches for garden beds and 3-4 inches for new plantings. The mulch coverage calculator shows cubic yards for bulk delivery and number of bags for retail purchase.',
  whyItMatters: 'Buying too little mulch means a second trip and inconsistent mulch coverage. Buying too much wastes money and leaves unused material. Accurate calculation saves time and ensures proper weed suppression and moisture retention across your entire garden or landscape.',
  methodology: 'Volume = Area (sq ft) × Depth (inches) / 12 = cubic feet. Cubic yards = cubic feet / 27. Bags = cubic feet / bag size (typically 2 cu ft). One cubic yard covers approximately 162 sq ft at 2 inches deep.',
  commonMistakes: [
    'Measuring area by eyeball instead of actual measurements — errors compound over large areas.',
    'Not adding 10-15% extra for settling, curves, and edges.',
    'Applying mulch too deep (over 4 inches) which can suffocate plant roots.',
    'Piling mulch against tree trunks and plant stems — keep 2-3 inches away to prevent rot.',
  ],
};

const dirtCalculator: CalculatorConfig = {
  slug: 'dirt-calculator', cluster: 'conversions',
  title: 'Dirt & Fill Calculator',
  description: 'Calculate how much dirt or fill you need in cubic yards, tons, and truckloads for grading, backfill, raised beds, and landscaping projects.',
  fields: [
    { id: 'length', label: 'Length', type: 'number', placeholder: '50', unit: 'feet', min: 0.1, required: true },
    { id: 'width', label: 'Width', type: 'number', placeholder: '20', unit: 'feet', min: 0.1 },
    { id: 'depth', label: 'Depth', type: 'number', placeholder: '6', unit: 'inches', min: 0.5, step: 0.5 },
    { id: 'material', label: 'Material Type', type: 'select', options: [
      { value: '2200', label: 'Fill Dirt — ~2,200 lbs/cu yd' },
      { value: '2000', label: 'Topsoil — ~2,000 lbs/cu yd' },
      { value: '2800', label: 'Gravel — ~2,800 lbs/cu yd' },
      { value: '2700', label: 'Sand — ~2,700 lbs/cu yd' },
      { value: '3000', label: 'Crushed Stone — ~3,000 lbs/cu yd' },
      { value: '1800', label: 'Clay — ~1,800 lbs/cu yd' },
      { value: '1000', label: 'Compost — ~1,000 lbs/cu yd' },
    ] },
  ],
  calculate: (inputs) => {
    const l = Number(inputs.length) || 0;
    const w = Number(inputs.width) || 0;
    const d = Number(inputs.depth) || 0;
    const density = Number(inputs.material) || 2200;
    const cubicFt = l * w * (d / 12);
    const cubicYards = cubicFt / 27;
    const tons = (cubicYards * density) / 2000;
    const truckloads = Math.ceil(cubicYards / 10);
    return {
      results: [
        { label: 'Cubic Yards', value: Math.round(cubicYards * 100) / 100, unit: 'cu yd', color: 'blue' },
        { label: 'Tons', value: Math.round(tons * 100) / 100, unit: 'tons', color: 'orange' },
        { label: 'Cubic Feet', value: Math.round(cubicFt * 10) / 10, unit: 'cu ft', color: 'green' },
        { label: 'Truckloads (10 yd)', value: truckloads, unit: 'loads', color: 'purple' },
      ],
      totalLabel: 'Material needed', totalValue: Math.round(cubicYards * 100) / 100, totalUnit: 'cubic yards',
    };
  },
  seo: {
    title: 'Free Dirt Calculator — Cubic Yards, Tons & Truckloads (2026)',
    description: 'Free dirt calculator. Calculate how much fill dirt, topsoil, gravel, or sand you need in cubic yards, tons, and truckloads for any project.',
  },
  quickFacts: [
    { label: 'Fill Dirt Weight', value: '~2,200 lbs/cu yd' },
    { label: 'Topsoil Weight', value: '~2,000 lbs/cu yd' },
    { label: 'Dump Truck Capacity', value: '10-14 cu yd' },
    { label: '1 Cubic Yard', value: '27 cu ft' },
  ],
  tips: [
    'Order 10-15% more than calculated to account for compaction, settling, and uneven ground.',
    'Fill dirt is cheaper than topsoil — use fill for grading and topsoil only for the top 4-6 inches.',
    'Compact fill dirt in 6-inch lifts for structural stability around foundations.',
    'Wet dirt weighs significantly more — plan deliveries for dry weather.',
    'Ask your supplier about delivery fees — they often charge per mile beyond a set radius.',
  ],
  faqs: [
    { question: 'How much does a cubic yard of dirt weigh?', answer: 'Fill dirt weighs approximately 2,000-2,400 lbs per cubic yard depending on moisture content and composition. Topsoil is slightly lighter at 1,800-2,200 lbs per cubic yard.' },
    { question: 'How many cubic yards in a dump truck?', answer: 'A standard single-axle dump truck holds 10-14 cubic yards. A tandem axle truck holds 14-18 cubic yards. Always confirm capacity with your supplier.' },
    { question: 'What is the difference between fill dirt and topsoil?', answer: 'Fill dirt is subsoil with no organic matter — used for grading, backfill, and structural fill. Topsoil contains organic matter and nutrients — used for gardens, lawns, and planting beds. Fill dirt is typically half the cost of topsoil.' },
  ],
  howToSteps: [
    'Enter the length and width of the area in feet.',
    'Set the desired depth in inches.',
    'Select the material type (fill dirt, topsoil, gravel, sand, etc.).',
    'Click Calculate to see cubic yards, tons, and truckloads needed.',
  ],
  nextSteps: [
    { title: 'Soil Volume Calculator', href: '/calculators/conversions/soil-volume/' },
    { title: 'Cubic Yards to Tons', href: '/calculators/conversions/cubic-yards-to-tons/' },
    { title: 'Mulch Calculator', href: '/calculators/conversions/mulch-calculator/' },
    { title: 'Compost Calculator', href: '/calculators/fertilizer/compost/' },
  ],
  howToUse: 'This fill dirt calculator and topsoil calculator helps you measure the length and width of the area you need to fill in feet. Determine the depth of material needed in inches — typically 4-6 inches for topsoil, 6-12 inches for grading, or as specified by your project plan. Select the material type to get an accurate weight estimate, since dirt, gravel, and sand have very different densities.',
  whyItMatters: 'Wondering how much dirt do I need? Ordering too little means delays and extra delivery charges. Ordering too much wastes money and leaves excess material to deal with. For large projects, the difference between an accurate estimate and a guess can be thousands of dollars. This calculator eliminates guesswork by accounting for material density and giving you cubic yards (how suppliers sell) and tons (how they weigh).',
  methodology: 'Volume = Length (ft) × Width (ft) × Depth (in) / 12 = cubic feet. Cubic yards = cubic feet / 27. Weight (tons) = cubic yards × material density (lbs/cu yd) / 2000. Truckloads assume a standard 10 cubic yard dump truck. Material densities are industry averages for dry material — wet conditions increase weight by 20-30%.',
  commonMistakes: [
    'Not accounting for compaction — loose fill dirt compacts 10-20% after placement and settling.',
    'Confusing cubic yards (volume) with tons (weight) when ordering — suppliers may sell by either unit.',
    'Using fill dirt where topsoil is needed — fill dirt has no nutrients and will not support plant growth.',
    'Forgetting to check local grading codes — some jurisdictions require permits for fill over 12 inches.',
  ],
  relatedCalculators: [
    { title: 'Soil Volume Calculator', href: '/calculators/conversions/soil-volume/' },
    { title: 'Cubic Yards to Tons', href: '/calculators/conversions/cubic-yards-to-tons/' },
    { title: 'Mulch Calculator', href: '/calculators/conversions/mulch-calculator/' },
    { title: 'Compost Calculator', href: '/calculators/fertilizer/compost/' },
    { title: 'Acres to Hectares', href: '/calculators/conversions/acres-to-hectares/' },
    { title: 'Fertilizer Spreader Calibration', href: '/calculators/conversions/fertilizer-spreader-calibration/' },
  ],
};

const acreageCalculator: CalculatorConfig = {
  slug: 'acreage-calculator', cluster: 'conversions',
  title: 'Acreage Calculator',
  description: 'Calculate the acreage of any land area from length and width measurements. Convert between acres, hectares, square feet, and square meters.',
  fields: [
    { id: 'shape', label: 'Area Shape', type: 'select', options: [
      { value: 'rectangle', label: 'Rectangle / Square' },
      { value: 'circle', label: 'Circle' },
      { value: 'triangle', label: 'Triangle' },
    ] },
    { id: 'length', label: 'Length (or Diameter)', type: 'number', placeholder: '1000', unit: 'feet', min: 0.1, required: true },
    { id: 'width', label: 'Width (rectangle only)', type: 'number', placeholder: '500', unit: 'feet', min: 0.1, helpText: 'Leave blank for circle/triangle' },
    { id: 'height', label: 'Height (triangle only)', type: 'number', placeholder: '400', unit: 'feet', min: 0.1, helpText: 'Perpendicular height for triangle' },
  ],
  calculate: (inputs) => {
    const shape = String(inputs.shape || 'rectangle');
    const length = Number(inputs.length) || 0;
    const width = Number(inputs.width) || 0;
    const height = Number(inputs.height) || 0;
    let sqFt = 0;
    if (shape === 'rectangle') { sqFt = length * width; }
    else if (shape === 'circle') { sqFt = Math.PI * (length / 2) * (length / 2); }
    else if (shape === 'triangle') { sqFt = (length * height) / 2; }
    const acres = sqFt / 43560;
    const hectares = acres * 0.4047;
    const sqMeters = sqFt * 0.0929;
    return {
      results: [
        { label: 'Acres', value: Math.round(acres * 1000) / 1000, unit: 'acres', color: 'blue' },
        { label: 'Hectares', value: Math.round(hectares * 1000) / 1000, unit: 'ha', color: 'green' },
        { label: 'Square Feet', value: Math.round(sqFt), unit: 'sq ft', color: 'orange' },
        { label: 'Square Meters', value: Math.round(sqMeters), unit: 'm²', color: 'purple' },
      ],
      totalLabel: 'Total area', totalValue: Math.round(acres * 1000) / 1000, totalUnit: 'acres',
    };
  },
  seo: {
    title: 'Free Acreage Calculator — Acres, Hectares & Sq Feet (2026)',
    description: 'Free acreage calculator. Measure land area in acres from length and width. Convert to hectares, square feet, and square meters. Works for any shape.',
  },
  quickFacts: [
    { label: '1 Acre', value: '43,560 sq ft' },
    { label: '1 Acre', value: '0.4047 hectares' },
    { label: '1 Acre', value: '208.7 × 208.7 ft' },
    { label: '1 Hectare', value: '2.471 acres' },
  ],
  tips: [
    'One acre is approximately the size of a football field without the end zones (90% of a football field).',
    'For irregular shapes, divide the area into rectangles and triangles, calculate each separately, and add them together.',
    'GPS-based measurements from your phone or tractor are more accurate than tape measures for large fields.',
    'County tax records and USDA FSA maps provide official acreage figures for farm fields.',
    'When buying land, always verify acreage with a licensed surveyor — fence lines are not legal boundaries.',
  ],
  faqs: [
    { question: 'How do I calculate acreage from feet?', answer: 'Multiply length by width in feet to get square feet, then divide by 43,560. For example, a 200 × 200 foot lot = 40,000 sq ft / 43,560 = 0.918 acres.' },
    { question: 'How many acres is a football field?', answer: 'A standard football field (including end zones) is 1.32 acres. Without end zones, it is 1.10 acres.' },
    { question: 'How do I measure irregular land?', answer: 'Break the area into simple shapes (rectangles, triangles), measure each, calculate their areas separately, and add them together. For very irregular shapes, use a GPS walking tool or satellite mapping service.' },
  ],
  howToSteps: [
    'Select the shape of your land area (rectangle, circle, or triangle).',
    'Enter the length (or diameter for circles) in feet.',
    'For rectangles, enter the width. For triangles, enter the perpendicular height.',
    'Click Calculate to see the area in acres, hectares, square feet, and square meters.',
  ],
  nextSteps: [
    { title: 'Acres to Hectares Converter', href: '/calculators/conversions/acres-to-hectares/' },
    { title: 'Land Value Calculator', href: '/calculators/economics/land-value/' },
    { title: 'Cash Rent Calculator', href: '/calculators/economics/cash-rent/' },
    { title: 'Cost Per Acre Calculator', href: '/calculators/economics/cost-per-acre/' },
  ],
  howToUse: 'This land measurement tool simplifies figuring acres for any shape. Select the shape that best matches your land area. For rectangular or square plots, enter the length and width in feet. For circular areas (like pivot irrigated fields), enter the diameter. For triangular parcels, enter the base length and perpendicular height. The calculator instantly converts to acres, hectares, and square feet.',
  whyItMatters: 'Accurate acreage measure is the foundation of every farm decision — from seed and fertilizer purchases to crop insurance, cash rent negotiations, and land sales. A 5% error on a 500-acre farm means 25 acres of miscalculated inputs, costing thousands of dollars per year. This calculator gives you precise figures for any land shape.',
  methodology: 'Rectangle area = Length × Width. Circle area = π × (Diameter/2)². Triangle area = (Base × Height) / 2. All results in square feet are divided by 43,560 to convert to acres (the USDA standard). Hectare conversion uses the factor 1 acre = 0.4047 hectares. Square meters = square feet × 0.0929.',
  commonMistakes: [
    'Measuring along fence lines instead of property boundaries — fences are rarely on exact property lines.',
    'Forgetting to subtract non-farmable areas (waterways, ditches, tree lines, buildings) from total acreage.',
    'Confusing gross acres (total land) with net tillable acres (actual farmable area) — typically 5-15% difference.',
    'Using road frontage × depth for irregularly shaped parcels — this only works for perfect rectangles.',
  ],
  relatedCalculators: [
    { title: 'Acres to Hectares', href: '/calculators/conversions/acres-to-hectares/' },
    { title: 'Dirt Calculator', href: '/calculators/conversions/dirt-calculator/' },
    { title: 'Soil Volume Calculator', href: '/calculators/conversions/soil-volume/' },
    { title: 'Land Value Calculator', href: '/calculators/economics/land-value/' },
    { title: 'Cash Rent Calculator', href: '/calculators/economics/cash-rent/' },
    { title: 'Cost Per Acre Calculator', href: '/calculators/economics/cost-per-acre/' },
  ],
};

const landAreaCalculator: CalculatorConfig = {
  slug: 'land-area-calculator', cluster: 'conversions',
  title: 'Land Area Calculator',
  description: 'Calculate land area in acres, hectares, and square feet from GPS coordinates, dimensions, or known measurements. Convert between all land measurement units.',
  fields: [
    { id: 'inputType', label: 'Measurement Type', type: 'select', options: [
      { value: 'dimensions', label: 'Length × Width (feet)' },
      { value: 'sqft', label: 'I know Square Feet' },
      { value: 'sqmeters', label: 'I know Square Meters' },
      { value: 'hectares', label: 'I know Hectares' },
    ] },
    { id: 'value1', label: 'Length / Value', type: 'number', placeholder: '1320', unit: 'feet or units', min: 0.01, required: true, helpText: 'Length in feet, or total area in selected units' },
    { id: 'value2', label: 'Width (for Length × Width only)', type: 'number', placeholder: '660', unit: 'feet', min: 0.01, helpText: 'Leave blank if entering a known area' },
  ],
  calculate: (inputs) => {
    const type = String(inputs.inputType || 'dimensions');
    const v1 = Number(inputs.value1) || 0;
    const v2 = Number(inputs.value2) || 0;
    let sqFt = 0;
    if (type === 'dimensions') { sqFt = v1 * v2; }
    else if (type === 'sqft') { sqFt = v1; }
    else if (type === 'sqmeters') { sqFt = v1 * 10.7639; }
    else if (type === 'hectares') { sqFt = v1 * 107639; }
    const acres = sqFt / 43560;
    const hectares = acres * 0.4047;
    const sqMeters = sqFt * 0.0929;
    const sections = acres / 640;
    return {
      results: [
        { label: 'Acres', value: Math.round(acres * 1000) / 1000, unit: 'acres', color: 'blue' },
        { label: 'Hectares', value: Math.round(hectares * 1000) / 1000, unit: 'ha', color: 'green' },
        { label: 'Square Feet', value: Math.round(sqFt), unit: 'sq ft', color: 'orange' },
        { label: 'Square Meters', value: Math.round(sqMeters), unit: 'm²', color: 'purple' },
      ],
      totalLabel: 'Land area', totalValue: Math.round(acres * 1000) / 1000, totalUnit: 'acres',
    };
  },
  seo: {
    title: 'Free Land Area Calculator — Acres, Hectares & Sq Feet (2026)',
    description: 'Free land area calculator. Measure land in acres from dimensions or convert between square feet, square meters, hectares, and acres instantly.',
  },
  quickFacts: [
    { label: '1 Acre', value: '43,560 sq ft' },
    { label: '1 Acre', value: '4,047 sq meters' },
    { label: '1 Section', value: '640 acres (1 sq mile)' },
    { label: '1 Hectare', value: '10,000 sq meters' },
  ],
  tips: [
    'A standard city lot is typically 0.1-0.25 acres (50×100 ft to 100×100 ft).',
    'One section of land (1 square mile) equals 640 acres — a common reference in the western US.',
    'For farm fields, use FSA maps or GPS boundaries for the most accurate acreage measurements.',
    'Subtract non-tillable areas (waterways, roads, tree lines) to get net farmable acres.',
    'When converting international measurements, remember: 1 hectare = 2.471 acres.',
  ],
  faqs: [
    { question: 'How do I calculate land area in acres?', answer: 'For rectangular land: multiply length × width in feet, then divide by 43,560. For example, a parcel 1,320 ft × 660 ft = 871,200 sq ft / 43,560 = 20 acres.' },
    { question: 'What is the difference between gross and net acres?', answer: 'Gross acres is the total land area. Net acres (or tillable acres) subtracts roads, waterways, buildings, and other non-usable areas. Farmland typically has 85-95% net tillable acres.' },
    { question: 'How do I convert square meters to acres?', answer: 'Divide square meters by 4,047. For example, 10,000 square meters (1 hectare) = 2.471 acres.' },
  ],
  howToSteps: [
    'Select your measurement type — dimensions in feet, or a known area in sq ft, sq meters, or hectares.',
    'Enter the value — length and width for dimensions, or the total area for known units.',
    'Click Calculate to see the land area in acres, hectares, square feet, and square meters.',
  ],
  nextSteps: [
    { title: 'Acreage Calculator', href: '/calculators/conversions/acreage-calculator/' },
    { title: 'Acres to Hectares Converter', href: '/calculators/conversions/acres-to-hectares/' },
    { title: 'Land Value Calculator', href: '/calculators/economics/land-value/' },
    { title: 'Cost Per Acre Calculator', href: '/calculators/economics/cost-per-acre/' },
  ],
  howToUse: 'This land measurement calculator makes it simple to determine property size. Choose how you want to input your measurement — if you have length and width in feet, select "Length × Width" and enter both dimensions. If you already know the area in square feet, square meters, or hectares, select that option and enter the value. The calculator converts between all common land measurement units instantly.',
  whyItMatters: 'Accurate land size calculations affect every financial decision in farming and real estate — from property taxes and cash rent to seed purchases, fertilizer budgets, and crop insurance coverage. Using the wrong property area figure cascades into errors across your entire operation. This calculator ensures accurate conversions between all measurement systems used in US and international agriculture.',
  methodology: 'For dimensions: Area (sq ft) = Length × Width. Conversion factors: 1 acre = 43,560 sq ft = 4,047 m² = 0.4047 ha. 1 hectare = 10,000 m² = 2.471 acres = 107,639 sq ft. These are exact conversion factors used by the USDA, NRCS, and international land registries.',
  commonMistakes: [
    'Measuring the perimeter instead of the area — area requires length × width, not the sum of all sides.',
    'Forgetting that not all land in a parcel is usable — always distinguish gross acres from net tillable acres.',
    'Mixing up square feet and linear feet — 100 linear feet of road is not 100 square feet of area.',
    'Using approximate conversions instead of exact factors — small rounding errors compound on large parcels.',
  ],
  relatedCalculators: [
    { title: 'Acreage Calculator', href: '/calculators/conversions/acreage-calculator/' },
    { title: 'Acres to Hectares', href: '/calculators/conversions/acres-to-hectares/' },
    { title: 'Dirt Calculator', href: '/calculators/conversions/dirt-calculator/' },
    { title: 'Soil Volume Calculator', href: '/calculators/conversions/soil-volume/' },
    { title: 'Land Value Calculator', href: '/calculators/economics/land-value/' },
    { title: 'Cash Rent Calculator', href: '/calculators/economics/cash-rent/' },
  ],
};

const densityCalculator: CalculatorConfig = {
  slug: 'density-calculator', cluster: 'conversions',
  title: 'Soil Density Calculator',
  description: 'Calculate soil bulk density, porosity, and weight from volume and mass measurements. Essential for compaction assessment, engineering, and soil health evaluation.',
  fields: [
    { id: 'method', label: 'Calculation Method', type: 'select', options: [
      { value: 'mass-volume', label: 'I know Mass & Volume' },
      { value: 'weight-area', label: 'I know Weight & Area × Depth' },
    ] },
    { id: 'mass', label: 'Dry Soil Mass', type: 'number', placeholder: '250', unit: 'lbs', min: 0.01, required: true, helpText: 'Oven-dry weight for mass-volume; total weight for weight-area' },
    { id: 'volume', label: 'Sample Volume', type: 'number', placeholder: '2', unit: 'cu ft', min: 0.01, helpText: 'For mass-volume method' },
    { id: 'area', label: 'Area (for weight-area method)', type: 'number', placeholder: '1', unit: 'sq ft', min: 0.01 },
    { id: 'depth', label: 'Depth (for weight-area method)', type: 'number', placeholder: '6', unit: 'inches', min: 0.5, step: 0.5 },
    { id: 'particleDensity', label: 'Particle Density', type: 'number', placeholder: '165', unit: 'lbs/cu ft', defaultValue: 165, helpText: 'Mineral soil default: 165 lbs/cu ft (2.65 g/cm³)' },
  ],
  calculate: (inputs) => {
    const method = String(inputs.method || 'mass-volume');
    const mass = Number(inputs.mass) || 0;
    const volume = Number(inputs.volume) || 1;
    const area = Number(inputs.area) || 1;
    const depth = Number(inputs.depth) || 6;
    const particleDensity = Number(inputs.particleDensity) || 165;

    let bulkDensityLbsCuFt: number;
    if (method === 'mass-volume') {
      bulkDensityLbsCuFt = mass / volume;
    } else {
      const vol = area * (depth / 12);
      bulkDensityLbsCuFt = mass / vol;
    }

    const bulkDensityGCm3 = bulkDensityLbsCuFt / 62.43;
    const porosity = (1 - bulkDensityLbsCuFt / particleDensity) * 100;
    const tonsPerAcreInch = (bulkDensityLbsCuFt * 43560 / 12) / 2000;

    return {
      results: [
        { label: 'Bulk Density', value: Math.round(bulkDensityLbsCuFt * 100) / 100, unit: 'lbs/cu ft', color: 'blue' },
        { label: 'Bulk Density', value: Math.round(bulkDensityGCm3 * 100) / 100, unit: 'g/cm³', color: 'orange' },
        { label: 'Porosity', value: Math.round(porosity * 10) / 10, unit: '%', color: 'green' },
        { label: 'Weight Per Acre-Inch', value: Math.round(tonsPerAcreInch), unit: 'tons', color: 'purple' },
      ],
      totalLabel: 'Bulk density', totalValue: Math.round(bulkDensityGCm3 * 100) / 100, totalUnit: 'g/cm³',
    };
  },
  seo: {
    title: 'Free Soil Density Calculator — Bulk Density, Porosity & Weight (2026)',
    description: 'Free soil density calculator. Calculate bulk density in lbs/cu ft and g/cm³, porosity percentage, and weight per acre-inch from soil samples.',
  },
  quickFacts: [
    { label: 'Ideal Bulk Density', value: '1.1-1.4 g/cm³ (most crops)' },
    { label: 'Compaction Threshold', value: '>1.6 g/cm³ (root-limiting)' },
    { label: 'Sandy Soil Density', value: '1.5-1.7 g/cm³ typical' },
    { label: 'Clay Soil Density', value: '1.0-1.3 g/cm³ typical' },
  ],
  tips: [
    'Bulk density above 1.6 g/cm³ restricts root growth for most crops — consider deep tillage or cover crops.',
    'Sandy soils naturally have higher bulk density than clay soils but compact less under traffic.',
    'Take bulk density samples from undisturbed soil using a core sampler for accurate results.',
    'Increasing soil organic matter by 1% can reduce bulk density by 0.05-0.10 g/cm³ over time.',
    'No-till farming may increase surface density initially but improves deeper soil structure over 3-5 years.',
  ],
  faqs: [
    { question: 'What is soil bulk density?', answer: 'Bulk density is the dry weight of soil per unit volume, including pore spaces. It indicates how compacted a soil is. Lower bulk density generally means better structure, more pore space for air and water, and easier root penetration.' },
    { question: 'What is a good bulk density for farming?', answer: 'For most crops, ideal bulk density is 1.1-1.4 g/cm³ (69-87 lbs/cu ft). Sandy soils are naturally higher (1.5-1.7) and clay soils lower (1.0-1.3). Root growth becomes restricted above 1.6 g/cm³ for clay and 1.8 g/cm³ for sand.' },
    { question: 'How do I measure soil bulk density?', answer: 'Use a soil core sampler to collect an undisturbed sample of known volume. Dry the sample in an oven at 105°C (221°F) for 24 hours, then weigh it. Bulk density = dry weight / core volume.' },
  ],
  howToSteps: [
    'Select your calculation method — mass & volume, or weight & area with depth.',
    'Enter the dry soil mass (weight after oven drying) in pounds.',
    'Enter the sample volume in cubic feet, or the area and depth for the weight-area method.',
    'Click Calculate to see bulk density, porosity, and weight per acre-inch.',
  ],
  nextSteps: [
    { title: 'Soil Volume Calculator', href: '/calculators/conversions/soil-volume/' },
    { title: 'Dirt Calculator', href: '/calculators/conversions/dirt-calculator/' },
    { title: 'Compost Calculator', href: '/calculators/fertilizer/compost/' },
    { title: 'Lime Calculator', href: '/calculators/fertilizer/lime/' },
  ],
  howToUse: 'This bulk density calculator helps you assess soil compaction. Choose your measurement method — the mass-volume method requires weighing an oven-dried soil core of known volume (the standard lab method). The weight-area method estimates density from the weight of soil excavated from a known area and depth. Enter the particle density (default 165 lbs/cu ft for mineral soil) to calculate porosity. Results show both US (lbs/cu ft) and metric (g/cm³) units.',
  whyItMatters: 'Soil bulk density directly affects root growth, water infiltration, and crop productivity. Compacted soil restricts roots, reduces water movement, and limits nutrient uptake — leading to yield losses of 10-30%. Knowing the soil weight per volume helps you identify compaction problems, evaluate the effectiveness of tillage practices, and track soil health improvements from cover cropping and organic matter additions.',
  methodology: 'Bulk density = Dry soil mass / Total volume (including pore space). Porosity (%) = (1 - Bulk density / Particle density) × 100. Standard particle density for mineral soil is 2.65 g/cm³ (165 lbs/cu ft). Weight per acre-inch = Bulk density × 43,560 sq ft / 12 inches / 2,000 lbs per ton. The mass-volume method (USDA standard) uses a core sampler to collect undisturbed soil of precisely known volume.',
  commonMistakes: [
    'Using field-moist weight instead of oven-dry weight — moisture inflates the density reading significantly.',
    'Disturbing the soil core during sampling — compressing or loosening the sample gives inaccurate volume.',
    'Taking only one sample per field — bulk density varies with depth, traffic patterns, and soil type. Take 5-10 samples.',
    'Comparing sandy and clay soil densities directly — different soil textures have different ideal density ranges.',
  ],
  relatedCalculators: [
    { title: 'Soil Volume Calculator', href: '/calculators/conversions/soil-volume/' },
    { title: 'Dirt Calculator', href: '/calculators/conversions/dirt-calculator/' },
    { title: 'Cubic Yards to Tons', href: '/calculators/conversions/cubic-yards-to-tons/' },
    { title: 'Compost Calculator', href: '/calculators/fertilizer/compost/' },
    { title: 'Lime Calculator', href: '/calculators/fertilizer/lime/' },
    { title: 'NPK Fertilizer Calculator', href: '/calculators/fertilizer/npk/' },
  ],
};

export const conversionConfigs: CalculatorConfig[] = [
  bushelsToTons, acresToHectares, lbsPerAcreToKgPerHectare, balesPerAcre, seedsPerPound,
  cubicYardsToTons, fertilizerSpreaderCalibration, gallonsPerAcreToLitersPerHectare,
  rowSpacingConverter, grainWeightPerBushel, livestockWeightConverter, temperatureConverter,
  soilVolume, mulchCalculator, dirtCalculator, acreageCalculator, landAreaCalculator, densityCalculator,
];
