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
  seo: { title: 'Bushels to Tons Converter — Grain Weight Calculator', description: 'Convert bushels to tons, metric tons, and pounds for corn, wheat, soybeans, and other grains.' },
  tips: ['Standard test weights: corn 56, wheat 60, soybeans 60, oats 32, barley 48 lbs/bu.', 'Actual test weight may vary — heavier grain yields more weight per bushel.'],
  faqs: [{ question: 'How many bushels in a ton of corn?', answer: '1 ton = 2000 lbs / 56 lbs per bushel = 35.7 bushels of corn.' }],
  relatedCalculators: [{ title: 'Grain Weight Per Bushel', href: '/calculators/conversions/grain-weight-per-bushel' }, { title: 'Acres to Hectares', href: '/calculators/conversions/acres-to-hectares' }],
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
  seo: { title: 'Acres to Hectares Converter — Land Area Conversion', description: 'Convert acres to hectares and back. Quick land area conversion for farming.' },
  tips: ['1 acre = 0.4047 hectares, 1 hectare = 2.471 acres.', '1 acre = 43,560 sq ft, 1 hectare = 10,000 sq meters.'],
  faqs: [{ question: 'How many acres in a hectare?', answer: '1 hectare = 2.471 acres. 1 acre = 0.4047 hectares.' }],
  relatedCalculators: [{ title: 'Lbs/Acre to Kg/Hectare', href: '/calculators/conversions/lbs-per-acre-to-kg-per-hectare' }],
  howToSteps: [
    'Enter the number of acres to convert.',
    'Click Calculate to see the equivalent in hectares, square meters, and square feet.',
  ],
  nextSteps: [
    { title: 'Lbs/Acre to Kg/Hectare', href: '/calculators/conversions/lbs-per-acre-to-kg-per-hectare' },
    { title: 'Gallons/Acre to Liters/Hectare', href: '/calculators/conversions/gallons-per-acre-to-liters-per-hectare' },
    { title: 'Yield Per Acre Calculator', href: '/calculators/yield/yield-per-acre/' },
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
  seo: { title: 'Lbs/Acre to Kg/Hectare — Rate Conversion', description: 'Convert fertilizer and application rates from lbs/acre to kg/hectare.' },
  tips: ['Multiply lbs/acre by 1.1209 to get kg/ha.', 'Multiply kg/ha by 0.8922 to get lbs/acre.'],
  faqs: [{ question: 'How do I convert lbs/acre to kg/ha?', answer: 'Multiply lbs/acre by 1.1209. Example: 150 lbs/acre × 1.1209 = 168.1 kg/ha.' }],
  relatedCalculators: [{ title: 'Acres to Hectares', href: '/calculators/conversions/acres-to-hectares' }],
  howToSteps: [
    'Enter the application rate in pounds per acre.',
    'Click Calculate to see the equivalent in kg/ha and lbs per 1,000 sq ft.',
  ],
  nextSteps: [
    { title: 'Acres to Hectares Converter', href: '/calculators/conversions/acres-to-hectares' },
    { title: 'NPK Fertilizer Calculator', href: '/calculators/fertilizer/npk/' },
    { title: 'Fertilizer Spreader Calibration', href: '/calculators/conversions/fertilizer-spreader-calibration' },
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
  seo: { title: 'Bales Per Acre Calculator — Hay Bale Count', description: 'Calculate hay bales per acre from yield and bale size.' },
  tips: ['Small square bales: 40-60 lbs. Large round: 800-1500 lbs. Large square: 800-1200 lbs.'],
  faqs: [{ question: 'How many small bales per acre?', answer: 'At 3 tons/acre yield with 50-lb bales: 120 bales per acre.' }],
  relatedCalculators: [{ title: 'Hay Bale Calculator', href: '/calculators/livestock/hay-bale' }],
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
  seo: { title: 'Seeds Per Pound Calculator — Seed Count', description: 'Calculate total seed count from weight and seeds per pound.' },
  tips: ['Seed size varies by variety — always check your seed lot analysis.'],
  faqs: [{ question: 'How many wheat seeds per pound?', answer: 'About 15,000 seeds per pound for average-sized wheat seed.' }],
  relatedCalculators: [{ title: 'Seed Rate Calculator', href: '/calculators/seeding/seed-rate' }],
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
  seo: { title: 'Cubic Yards to Tons — Bulk Material Weight', description: 'Convert cubic yards to tons for topsoil, gravel, sand, compost, and mulch.' },
  tips: ['Wet material weighs significantly more than dry — these are average dry weights.'],
  faqs: [{ question: 'How much does a cubic yard of topsoil weigh?', answer: 'About 2,000-2,400 lbs (1.0-1.2 tons) depending on moisture content.' }],
  relatedCalculators: [{ title: 'Soil Volume', href: '/calculators/conversions/soil-volume' }, { title: 'Mulch Calculator', href: '/calculators/conversions/mulch-calculator' }],
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
  seo: { title: 'Fertilizer Spreader Calibration — Application Rate Check', description: 'Calibrate your fertilizer spreader. Calculate actual application rate from a test run.' },
  tips: ['Calibrate before each season and when switching products.', 'Use catch pans placed across the full swath width for accuracy.'],
  faqs: [{ question: 'How do I calibrate a broadcast spreader?', answer: 'Spread over a measured area, collect material in catch pans, weigh it, and calculate lbs/acre.' }],
  relatedCalculators: [{ title: 'NPK Calculator', href: '/calculators/fertilizer/npk' }],
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
  seo: { title: 'Gallons/Acre to Liters/Hectare — Spray Rate Conversion', description: 'Convert spray rates from gallons per acre to liters per hectare.' },
  tips: ['Multiply gal/acre by 9.354 to get L/ha.', 'Multiply L/ha by 0.1069 to get gal/acre.'],
  faqs: [{ question: 'How to convert GPA to L/ha?', answer: 'Multiply gallons per acre by 9.354. Example: 15 GPA × 9.354 = 140.3 L/ha.' }],
  relatedCalculators: [{ title: 'Lbs/Acre to Kg/Ha', href: '/calculators/conversions/lbs-per-acre-to-kg-per-hectare' }],
  howToSteps: [
    'Enter the application rate in gallons per acre.',
    'Click Calculate to see the equivalent in liters per hectare.',
  ],
  nextSteps: [
    { title: 'Lbs/Acre to Kg/Hectare', href: '/calculators/conversions/lbs-per-acre-to-kg-per-hectare' },
    { title: 'Acres to Hectares Converter', href: '/calculators/conversions/acres-to-hectares' },
    { title: 'Irrigation Water Need', href: '/calculators/irrigation/irrigation-water-need' },
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
  seo: { title: 'Row Spacing Converter — Inches to CM & Rows Per Acre', description: 'Convert row spacing from inches to centimeters. Calculate row feet per acre.' },
  tips: ['30-inch rows = 17,424 row feet per acre.', '15-inch rows = 34,848 row feet per acre.'],
  faqs: [{ question: 'How many row feet in an acre at 30-inch rows?', answer: '43,560 sq ft / 2.5 ft = 17,424 row feet per acre.' }],
  relatedCalculators: [{ title: 'Plant Spacing', href: '/calculators/seeding/plant-spacing' }],
  howToSteps: [
    'Enter the row spacing in inches.',
    'Click Calculate to see the equivalent in centimeters and row feet per acre.',
  ],
  nextSteps: [
    { title: 'Seed Rate Calculator', href: '/calculators/seeding/seed-rate/' },
    { title: 'Seeds Per Pound Calculator', href: '/calculators/conversions/seeds-per-pound' },
    { title: 'Acres to Hectares Converter', href: '/calculators/conversions/acres-to-hectares' },
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
  seo: { title: 'Grain Weight Per Bushel — Standard Test Weights', description: 'Standard test weights for all common grains. Quick reference for bushel-to-weight conversions.' },
  tips: ['Test weight above standard indicates higher quality grain.', 'Low test weight may result in dockage at the elevator.'],
  faqs: [{ question: 'What is test weight?', answer: 'Test weight is the weight of grain per bushel (1.244 cubic feet). It indicates grain density and quality.' }],
  relatedCalculators: [{ title: 'Bushels to Tons', href: '/calculators/conversions/bushels-to-tons' }],
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
  seo: { title: 'Livestock Weight Converter — Lbs to Kg', description: 'Convert livestock weight between pounds and kilograms.' },
  tips: ['Multiply lbs by 0.4536 to get kg.', 'Multiply kg by 2.2046 to get lbs.'],
  faqs: [{ question: 'How do I convert animal weight to kg?', answer: 'Multiply pounds by 0.4536. Example: 1200 lbs × 0.4536 = 544 kg.' }],
  relatedCalculators: [{ title: 'Cattle Weight', href: '/calculators/livestock/cattle-weight' }],
  howToSteps: [
    'Enter the animal weight in pounds.',
    'Click Calculate to see the equivalent weight in kilograms.',
  ],
  nextSteps: [
    { title: 'Bales Per Acre Calculator', href: '/calculators/conversions/bales-per-acre' },
    { title: 'Temperature Converter', href: '/calculators/conversions/temperature-converter' },
    { title: 'Bushels to Tons Converter', href: '/calculators/conversions/bushels-to-tons' },
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
  seo: { title: 'Temperature Converter — Fahrenheit to Celsius', description: 'Convert temperatures between Fahrenheit and Celsius for farming applications.' },
  tips: ['Key soil temps: 50°F (10°C) = corn planting, 60°F (15.5°C) = beans, 65°F (18°C) = cotton.', 'Freezing point: 32°F = 0°C.'],
  faqs: [{ question: 'How do I convert F to C?', answer: 'Subtract 32, then multiply by 5/9. Example: 77°F → (77-32) × 5/9 = 25°C.' }],
  relatedCalculators: [],
  howToSteps: [
    'Enter the temperature in Fahrenheit.',
    'Click Calculate to see the equivalent in Celsius.',
  ],
  nextSteps: [
    { title: 'Acres to Hectares Converter', href: '/calculators/conversions/acres-to-hectares' },
    { title: 'Lbs/Acre to Kg/Hectare', href: '/calculators/conversions/lbs-per-acre-to-kg-per-hectare' },
    { title: 'Livestock Weight Converter', href: '/calculators/conversions/livestock-weight-converter' },
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
  seo: { title: 'Soil Volume Calculator — Raised Bed & Garden Fill', description: 'Calculate soil volume for raised beds, gardens, and fill projects. Get cubic yards and estimated tons.' },
  tips: ['Most bulk soil is sold by the cubic yard.', 'Plan for 10-15% extra to account for settling.', 'A standard pickup truck holds about 1-2 cubic yards.'],
  faqs: [{ question: 'How much soil for a 4x8 raised bed?', answer: 'A 4×8 foot bed, 12 inches deep needs about 1.2 cubic yards of soil.' }],
  relatedCalculators: [{ title: 'Cubic Yards to Tons', href: '/calculators/conversions/cubic-yards-to-tons' }, { title: 'Mulch Calculator', href: '/calculators/conversions/mulch-calculator' }],
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
  seo: { title: 'Mulch Calculator — How Many Bags or Yards of Mulch', description: 'Calculate mulch needed in cubic yards and bags. Enter area and depth for instant results.' },
  tips: ['Apply 2-4 inches of mulch for weed suppression.', 'Keep mulch 2-3 inches away from plant stems and tree trunks.', 'Bulk mulch is cheaper than bagged for areas over 50 sq ft.'],
  faqs: [{ question: 'How much mulch do I need?', answer: 'For 3 inches deep: multiply area (sq ft) by 0.25, then divide by 27 for cubic yards. 100 sq ft needs about 1 cubic yard.' }],
  relatedCalculators: [{ title: 'Soil Volume', href: '/calculators/conversions/soil-volume' }, { title: 'Compost Calculator', href: '/calculators/fertilizer/compost' }],
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
};

export const conversionConfigs: CalculatorConfig[] = [
  bushelsToTons, acresToHectares, lbsPerAcreToKgPerHectare, balesPerAcre, seedsPerPound,
  cubicYardsToTons, fertilizerSpreaderCalibration, gallonsPerAcreToLitersPerHectare,
  rowSpacingConverter, grainWeightPerBushel, livestockWeightConverter, temperatureConverter,
  soilVolume, mulchCalculator,
];
