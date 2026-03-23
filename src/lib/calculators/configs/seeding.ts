import type { CalculatorConfig } from '../types';

// General seeding calculators
const seedRate: CalculatorConfig = {
  slug: 'seed-rate', cluster: 'seeding',
  title: 'Seed Rate Calculator',
  description: 'Calculate how many pounds of seed you need based on desired plant population, seeds per pound, and germination rate.',
  fields: [
    { id: 'acres', label: 'Field Size', type: 'number', placeholder: '40', unit: 'acres', min: 0.1, required: true },
    { id: 'desiredPop', label: 'Desired Population', type: 'number', placeholder: '32000', unit: 'plants/acre', min: 1 },
    { id: 'seedsPerLb', label: 'Seeds Per Pound', type: 'number', placeholder: '1300', min: 1 },
    { id: 'germRate', label: 'Germination Rate', type: 'number', placeholder: '95', unit: '%', min: 1, max: 100, defaultValue: 95 },
  ],
  calculate: (inputs) => {
    const acres = Number(inputs.acres) || 0;
    const pop = Number(inputs.desiredPop) || 0;
    const spl = Number(inputs.seedsPerLb) || 1;
    const germ = (Number(inputs.germRate) || 95) / 100;
    const seedsNeeded = (pop / germ) * acres;
    const lbs = seedsNeeded / spl;
    const bags = Math.ceil(lbs / 50);
    return {
      results: [
        { label: 'Seeds Needed', value: Math.round(seedsNeeded), unit: 'seeds', color: 'blue' },
        { label: 'Seed Weight', value: Math.round(lbs * 10) / 10, unit: 'lbs', color: 'orange' },
        { label: 'Bags (50 lb)', value: bags, unit: 'bags', color: 'green' },
      ],
      totalLabel: 'Total seed needed', totalValue: Math.round(lbs), totalUnit: 'lbs',
    };
  },
  seo: { title: 'Seed Rate Calculator — How Much Seed Per Acre', description: 'Calculate seed rate per acre based on plant population, seeds per pound, and germination rate. Get exact lbs of seed needed.' },
  tips: ['Always adjust for germination rate to ensure adequate stand.', 'Increase seeding rate 10-15% for no-till conditions.', 'Seed size varies by variety — check seeds per pound for your specific lot.', 'Consider field conditions: increase rate for cloddy or wet seedbeds.'],
  faqs: [
    { question: 'How do I calculate seeding rate?', answer: 'Seeding rate (lbs/acre) = (Desired population / Germination rate) / Seeds per pound. This accounts for seeds that won\'t germinate.' },
    { question: 'What is a good germination rate?', answer: 'Certified seed typically has 85-95% germination. Always check your seed tag for the actual tested rate.' },
  ],
  relatedCalculators: [
    { title: 'Plant Spacing Calculator', href: '/calculators/seeding/plant-spacing' },
    { title: 'Seeds Per Acre', href: '/calculators/seeding/seeds-per-acre' },
    { title: 'Seed Cost Calculator', href: '/calculators/seeding/seed-cost' },
  ],
  howToSteps: [
    'Enter your total field size in acres.',
    'Input the desired plant population per acre and seeds per pound for your crop.',
    'Set the germination rate from your seed tag or test results.',
    'Click Calculate to see the total seeds and pounds of seed needed.',
  ],
  nextSteps: [
    { title: 'Calculate NPK Fertilizer Rates', href: '/calculators/fertilizer/npk/' },
    { title: 'Estimate Crop Yield', href: '/calculators/yield/yield-per-acre/' },
    { title: 'Plan Planting Date', href: '/calculators/planting-date/' },
  ],
  howToUse: 'Enter your field size in acres, then input the desired plant population per acre and the seeds per pound for your crop variety. Set the germination rate from your seed tag. The calculator adjusts for germination losses and converts to total pounds and bags needed.',
  whyItMatters: 'Planting the correct seeding rate is critical for achieving optimal plant stands. Too few plants reduce yield potential, while too many cause competition for water, light, and nutrients. Accounting for germination rate ensures you purchase enough seed to hit your target population.',
  methodology: 'Seeds needed = (Desired population / Germination rate) × Acres. Seed weight (lbs) = Seeds needed / Seeds per pound. Bags = Seed weight / 50, rounded up. This formula compensates for seeds that fail to germinate so the final stand matches your target.',
  commonMistakes: [
    'Using the germination rate from a previous year\'s seed tag instead of testing current seed viability.',
    'Not adjusting seeding rate upward for no-till or poor seedbed conditions.',
    'Confusing seeds per pound with seeds per unit — seed corn is sold by the kernel, not by weight.',
    'Forgetting to increase rate 10-15% when planting late or into cold soils.',
  ],
};

const plantSpacing: CalculatorConfig = {
  slug: 'plant-spacing', cluster: 'seeding',
  title: 'Plant Spacing Calculator',
  description: 'Calculate the number of plants needed based on row spacing, plant spacing, and total area.',
  fields: [
    { id: 'rowSpacing', label: 'Row Spacing', type: 'number', placeholder: '30', unit: 'inches', min: 1 },
    { id: 'plantSpacing', label: 'Plant Spacing In-Row', type: 'number', placeholder: '8', unit: 'inches', min: 1 },
    { id: 'area', label: 'Area', type: 'number', placeholder: '43560', unit: 'sq ft', min: 1, required: true, helpText: '1 acre = 43,560 sq ft' },
  ],
  calculate: (inputs) => {
    const rowSp = Number(inputs.rowSpacing) || 30;
    const plantSp = Number(inputs.plantSpacing) || 8;
    const area = Number(inputs.area) || 0;
    const sqFtPerPlant = (rowSp / 12) * (plantSp / 12);
    const totalPlants = Math.round(area / sqFtPerPlant);
    const plantsPerAcre = Math.round(43560 / sqFtPerPlant);
    const rowsPerAcre = Math.round(43560 / ((rowSp / 12) * 208.7));
    return {
      results: [
        { label: 'Total Plants', value: totalPlants, unit: 'plants', color: 'blue' },
        { label: 'Plants Per Acre', value: plantsPerAcre, unit: 'plants/acre', color: 'green' },
        { label: 'Sq Ft Per Plant', value: Math.round(sqFtPerPlant * 100) / 100, unit: 'sq ft', color: 'orange' },
      ],
      totalLabel: 'Total plants needed', totalValue: totalPlants, totalUnit: 'plants',
    };
  },
  seo: { title: 'Plant Spacing Calculator — Row & Plant Spacing Planner', description: 'Calculate plant population from row spacing and in-row spacing. Determine total plants needed for your field or garden.' },
  tips: ['Narrower row spacing increases light interception and can boost yields.', 'Maintain consistent in-row spacing for uniform plant development.', 'Consider equipment width when choosing row spacing.'],
  faqs: [
    { question: 'How many plants per acre at 30-inch rows, 8-inch spacing?', answer: 'At 30" rows and 8" spacing: 43,560 sq ft / (2.5 ft × 0.667 ft) = about 26,136 plants per acre.' },
  ],
  relatedCalculators: [
    { title: 'Seed Rate Calculator', href: '/calculators/seeding/seed-rate' },
    { title: 'Seeds Per Acre', href: '/calculators/seeding/seeds-per-acre' },
  ],
  howToSteps: [
    'Enter your row spacing in inches.',
    'Input the desired plant spacing within the row in inches.',
    'Enter the total area in square feet (1 acre = 43,560 sq ft).',
    'Click Calculate to see the total plants needed and plants per acre.',
  ],
  nextSteps: [
    { title: 'Calculate Seed Rate', href: '/calculators/seeding/seed-rate/' },
    { title: 'Calculate NPK Fertilizer Rates', href: '/calculators/fertilizer/npk/' },
    { title: 'Estimate Crop Yield', href: '/calculators/yield/yield-per-acre/' },
  ],
  howToUse: 'Enter your row spacing and in-row plant spacing in inches, then input the total area in square feet. The calculator determines how many plants fit in your field and the resulting plant population per acre, helping you plan transplant orders or seed purchases.',
  whyItMatters: 'Plant spacing directly affects light interception, air circulation, and competition for water and nutrients. Proper spacing maximizes yield per acre while reducing disease pressure from overcrowding. It also determines how many transplants or seeds to order.',
  methodology: 'Square feet per plant = (Row spacing / 12) × (Plant spacing / 12). Total plants = Area / Sq ft per plant. Plants per acre = 43,560 / Sq ft per plant. This assumes uniform spacing across the field with no skips or end rows.',
  commonMistakes: [
    'Forgetting to convert inches to feet when calculating area per plant manually.',
    'Not accounting for headlands, turn rows, and alleys which reduce plantable area by 3-8%.',
    'Using the same spacing for determinate and indeterminate crop varieties, which have different growth habits.',
    'Choosing row spacing that does not match available equipment widths, causing overlap or gaps.',
  ],
};

const germinationRate: CalculatorConfig = {
  slug: 'germination-rate', cluster: 'seeding',
  title: 'Germination Rate Calculator',
  description: 'Calculate germination percentage from a seed test and determine adjusted seeding rate.',
  fields: [
    { id: 'seedsTested', label: 'Seeds Tested', type: 'number', placeholder: '100', min: 1, required: true },
    { id: 'seedsGerminated', label: 'Seeds Germinated', type: 'number', placeholder: '92', min: 0 },
    { id: 'targetRate', label: 'Target Seeding Rate', type: 'number', placeholder: '32000', unit: 'seeds/acre', helpText: 'Optional: to calculate adjusted rate' },
  ],
  calculate: (inputs) => {
    const tested = Number(inputs.seedsTested) || 1;
    const germ = Number(inputs.seedsGerminated) || 0;
    const target = Number(inputs.targetRate) || 0;
    const germRate = (germ / tested) * 100;
    const adjusted = germRate > 0 && target > 0 ? Math.round(target / (germRate / 100)) : 0;
    return {
      results: [
        { label: 'Germination Rate', value: Math.round(germRate * 10) / 10, unit: '%', color: 'green' },
        { label: 'Seeds Germinated', value: germ, unit: 'of ' + tested, color: 'blue' },
        ...(adjusted > 0 ? [{ label: 'Adjusted Seeding Rate', value: adjusted, unit: 'seeds/acre', color: 'orange' }] : []),
      ],
      totalLabel: 'Germination rate', totalValue: Math.round(germRate * 10) / 10, totalUnit: '%',
    };
  },
  seo: { title: 'Germination Rate Calculator — Test Seed Viability', description: 'Calculate seed germination percentage and adjusted seeding rates. Test seed viability before planting.' },
  tips: ['Test germination 2-3 weeks before planting to allow time for adjustments.', 'Use 100 seeds for a statistically reliable test.', 'Test in moist paper towels at 70-80°F for most species.', 'Seeds below 80% germination should be replaced or rates increased.'],
  faqs: [
    { question: 'How do I do a germination test?', answer: 'Place 100 seeds between moist paper towels in a sealed bag. Keep at 70-80°F for 7-14 days. Count sprouted seeds — that number is your germination percentage.' },
  ],
  relatedCalculators: [{ title: 'Seed Rate Calculator', href: '/calculators/seeding/seed-rate' }],
  howToSteps: [
    'Count out a sample of seeds (100 is recommended for accuracy).',
    'Enter the number of seeds tested and the number that germinated.',
    'Optionally enter your target seeding rate to calculate an adjusted rate.',
    'Click Calculate to see the germination percentage and adjusted seeding rate.',
  ],
  nextSteps: [
    { title: 'Calculate Seed Rate', href: '/calculators/seeding/seed-rate/' },
    { title: 'Estimate Seed Cost', href: '/calculators/seeding/seed-cost/' },
    { title: 'Calculate NPK Fertilizer Rates', href: '/calculators/fertilizer/npk/' },
  ],
  howToUse: 'Count out a sample of seeds (100 is ideal for easy percentage conversion), place them between moist paper towels, and wait 7-14 days. Enter the number tested and the number that germinated. Optionally enter a target seeding rate to see the adjusted rate needed to achieve your desired stand.',
  whyItMatters: 'Seed germination declines with age, poor storage, and mechanical damage. Planting seed with unknown germination rates leads to either thin stands that reduce yield or over-seeding that wastes money. A simple test before planting saves both.',
  methodology: 'Germination rate (%) = (Seeds germinated / Seeds tested) × 100. Adjusted seeding rate = Target rate / (Germination rate / 100). This ensures enough viable seeds are planted to achieve the desired final population even with reduced germination.',
  commonMistakes: [
    'Testing too few seeds — fewer than 50 seeds gives unreliable results due to sampling error.',
    'Not maintaining consistent moisture and temperature during the test, which skews results.',
    'Assuming last year\'s germination rate still holds — seed viability drops significantly with improper storage.',
    'Ignoring field emergence rate, which is typically 5-15% lower than lab germination due to soil crusting and pests.',
  ],
};

const seedsPerAcre: CalculatorConfig = {
  slug: 'seeds-per-acre', cluster: 'seeding',
  title: 'Seeds Per Acre Calculator',
  description: 'Calculate how many seeds per acre based on row spacing and seed drop rate.',
  fields: [
    { id: 'rowSpacing', label: 'Row Spacing', type: 'number', placeholder: '30', unit: 'inches', min: 1, required: true },
    { id: 'seedSpacing', label: 'Seed Spacing In-Row', type: 'number', placeholder: '7', unit: 'inches', min: 0.5 },
  ],
  calculate: (inputs) => {
    const rowSp = Number(inputs.rowSpacing) || 30;
    const seedSp = Number(inputs.seedSpacing) || 7;
    const feetPerRow = 43560 / (rowSp / 12);
    const seedsPerRow = feetPerRow / (seedSp / 12);
    const seedsPer1000ft = 1000 / (seedSp / 12);
    return {
      results: [
        { label: 'Seeds Per Acre', value: Math.round(seedsPerRow), unit: 'seeds', color: 'blue' },
        { label: 'Seeds Per 1000 ft Row', value: Math.round(seedsPer1000ft), unit: 'seeds', color: 'orange' },
        { label: 'Row Feet Per Acre', value: Math.round(feetPerRow), unit: 'ft', color: 'green' },
      ],
      totalLabel: 'Seeds per acre', totalValue: Math.round(seedsPerRow), totalUnit: 'seeds',
    };
  },
  seo: { title: 'Seeds Per Acre Calculator — Calculate Plant Population', description: 'Calculate seeds per acre from row spacing and seed spacing. Determine exact plant population for your planter settings.' },
  tips: ['Check planter calibration in the field — lab settings often differ from field conditions.', 'Consider seed size when setting planter plates or discs.'],
  faqs: [
    { question: 'How many seeds per acre at 30-inch rows, 7-inch spacing?', answer: 'About 29,900 seeds per acre (43,560 / (2.5 × 0.583)).' },
  ],
  relatedCalculators: [{ title: 'Plant Spacing Calculator', href: '/calculators/seeding/plant-spacing' }, { title: 'Seed Rate Calculator', href: '/calculators/seeding/seed-rate' }],
  howToSteps: [
    'Enter your row spacing in inches.',
    'Input the seed spacing within the row in inches.',
    'Click Calculate to see the seeds per acre and seeds per 1,000 ft of row.',
    'Use results to calibrate your planter or drill settings.',
  ],
  nextSteps: [
    { title: 'Calculate Seed Rate', href: '/calculators/seeding/seed-rate/' },
    { title: 'Estimate Seed Cost', href: '/calculators/seeding/seed-cost/' },
    { title: 'Calculate NPK Fertilizer Rates', href: '/calculators/fertilizer/npk/' },
  ],
  howToUse: 'Enter your row spacing in inches and the seed spacing within the row in inches. The calculator determines the total seeds per acre and seeds per 1,000 feet of row, which you can use to calibrate your planter or drill.',
  whyItMatters: 'Knowing the exact seeds per acre from your planter settings lets you verify that your equipment is calibrated correctly before planting. Even small errors in seed spacing compound across an entire field, leading to significant population differences that affect yield.',
  methodology: 'Row feet per acre = 43,560 / (Row spacing in feet). Seeds per acre = Row feet per acre / (Seed spacing in feet). This geometric calculation assumes perfectly uniform spacing, so use it as a target for planter calibration.',
  commonMistakes: [
    'Confusing seed spacing with plant spacing — seed spacing should be tighter to account for germination losses.',
    'Not verifying planter output in the field, where ground speed and soil conditions affect actual seed drop.',
    'Using the wrong row spacing value when equipment has been modified or adjusted.',
    'Assuming the planter delivers the same population at all ground speeds — most planters lose accuracy above 5-6 mph.',
  ],
};

const seedCost: CalculatorConfig = {
  slug: 'seed-cost', cluster: 'seeding',
  title: 'Seed Cost Calculator',
  description: 'Estimate total seed cost based on acres, seeding rate, and seed price.',
  fields: [
    { id: 'acres', label: 'Field Size', type: 'number', placeholder: '40', unit: 'acres', min: 0.1, required: true },
    { id: 'seedingRate', label: 'Seeding Rate', type: 'number', placeholder: '32000', unit: 'seeds/acre', min: 1 },
    { id: 'seedsPerUnit', label: 'Seeds Per Unit', type: 'number', placeholder: '80000', min: 1, helpText: 'Seeds per bag/unit purchased' },
    { id: 'pricePerUnit', label: 'Price Per Unit', type: 'number', placeholder: '300', unit: '$', min: 0, step: 0.01 },
  ],
  calculate: (inputs) => {
    const acres = Number(inputs.acres) || 0;
    const rate = Number(inputs.seedingRate) || 0;
    const spu = Number(inputs.seedsPerUnit) || 1;
    const price = Number(inputs.pricePerUnit) || 0;
    const totalSeeds = rate * acres;
    const units = Math.ceil(totalSeeds / spu);
    const totalCost = units * price;
    const costPerAcre = acres > 0 ? totalCost / acres : 0;
    return {
      results: [
        { label: 'Units Needed', value: units, unit: 'units', color: 'blue' },
        { label: 'Cost Per Acre', value: Math.round(costPerAcre * 100) / 100, unit: '$', color: 'green' },
        { label: 'Total Seeds', value: totalSeeds, unit: 'seeds', color: 'orange' },
      ],
      totalLabel: 'Total seed cost', totalValue: Math.round(totalCost * 100) / 100, totalUnit: '$',
    };
  },
  seo: { title: 'Seed Cost Calculator — Estimate Seed Expenses Per Acre', description: 'Calculate total seed cost and cost per acre. Compare seed prices and plan your planting budget.' },
  tips: ['Compare seed costs on a per-acre basis, not per unit, since unit sizes vary.', 'Early-order discounts can save 5-15% on seed costs.', 'Consider value-added traits when comparing seed prices.'],
  faqs: [
    { question: 'How much does corn seed cost per acre?', answer: 'Corn seed typically costs $100-150 per acre at 32,000-34,000 seeds/acre depending on traits and brand.' },
  ],
  relatedCalculators: [{ title: 'Seed Rate Calculator', href: '/calculators/seeding/seed-rate' }, { title: 'Fertilizer Cost Calculator', href: '/calculators/fertilizer/fertilizer-cost' }],
  howToSteps: [
    'Enter your total field size in acres.',
    'Input the seeding rate in seeds per acre and the number of seeds per unit (bag).',
    'Enter the price per unit from your seed supplier.',
    'Click Calculate to see the total units needed, cost per acre, and total seed cost.',
  ],
  nextSteps: [
    { title: 'Calculate Seed Rate', href: '/calculators/seeding/seed-rate/' },
    { title: 'Estimate Fertilizer Cost', href: '/calculators/fertilizer/fertilizer-cost/' },
    { title: 'Plan Farm Budget', href: '/calculators/economics/cost-per-acre/' },
  ],
  howToUse: 'Enter your field size in acres, the seeding rate in seeds per acre, and the number of seeds per unit (bag) from your supplier. Then input the price per unit. The calculator shows how many units to purchase and your total seed investment broken down by acre.',
  whyItMatters: 'Seed is a major input cost that varies widely by crop, trait package, and supplier. Accurately estimating seed expenses before purchasing lets you compare options, take advantage of early-order discounts, and build a realistic planting budget.',
  methodology: 'Total seeds = Seeding rate × Acres. Units needed = Total seeds / Seeds per unit, rounded up. Total cost = Units × Price per unit. Cost per acre = Total cost / Acres. Rounding up to whole units reflects actual purchasing, so the true cost per acre accounts for partial-unit purchases.',
  commonMistakes: [
    'Not accounting for different unit sizes between suppliers — corn is typically 80,000 seeds per unit, soybeans 140,000.',
    'Forgetting to add seed treatment costs, which are often $5-15 per unit on top of the base price.',
    'Ordering exact quantities without a buffer for replanting — keep 5-10% extra seed on hand.',
    'Comparing seed prices without considering yield performance data, which affects return on investment.',
  ],
};

// Crop-specific seeding configs
type CropSeedData = {
  name: string;
  population: number;
  rowSpacing: number;
  seedsPerLb: number;
  plantingDepth: string;
  tips: string[];
  faqs: [string, string][];
};

const cropSeedData: Record<string, CropSeedData> = {
  corn: { name: 'Corn', population: 32000, rowSpacing: 30, seedsPerLb: 1300, plantingDepth: '1.5-2 inches',
    tips: ['Plant when soil temperature reaches 50°F at 2-inch depth.', 'Target 32,000-34,000 seeds/acre for most hybrids.', 'Increase population 10% in narrow rows (20-inch).', 'Check seed depth uniformity across the planter.'],
    faqs: [['What is the ideal corn seeding rate?', '32,000-34,000 seeds per acre for most hybrids. Higher populations for irrigated fields, lower for dryland.'], ['How deep should corn be planted?', 'Plant corn at 1.5-2 inches deep. In dry conditions, go slightly deeper to reach moisture.']]
  },
  wheat: { name: 'Wheat', population: 1200000, rowSpacing: 7, seedsPerLb: 15000, plantingDepth: '1-1.5 inches',
    tips: ['Drill at 7.5-inch rows for best ground cover.', 'Increase rate 10% for late planting.', 'Seed size varies — calibrate drill for each seed lot.'],
    faqs: [['What is the ideal wheat seeding rate?', '1.0-1.4 million seeds/acre depending on variety, timing, and conditions.'], ['When should winter wheat be planted?', 'Plant winter wheat after the Hessian fly-free date for your area, typically mid-September to mid-October.']]
  },
  soybeans: { name: 'Soybeans', population: 140000, rowSpacing: 15, seedsPerLb: 2500, plantingDepth: '1-1.5 inches',
    tips: ['Plant when soil is 50°F and warming.', 'Narrow rows (15") often out-yield wide rows (30").', 'Inoculate seed in new soybean fields.'],
    faqs: [['How many soybean seeds per acre?', '130,000-160,000 seeds/acre depending on row spacing and conditions.'], ['Should I plant soybeans in 15 or 30-inch rows?', '15-inch rows typically yield 5-8% more than 30-inch rows due to faster canopy closure.']]
  },
  tomatoes: { name: 'Tomatoes', population: 4000, rowSpacing: 60, seedsPerLb: 120000, plantingDepth: '0.25 inches (transplant)',
    tips: ['Start transplants 6-8 weeks before last frost.', 'Space plants 18-24 inches in-row for determinate types.', 'Use 24-36 inch spacing for indeterminate types.'],
    faqs: [['How many tomato plants per acre?', '3,000-5,000 plants depending on variety type and trellis system.'], ['When should I start tomato transplants?', 'Start seeds indoors 6-8 weeks before your last expected frost date.']]
  },
  potatoes: { name: 'Potatoes', population: 17400, rowSpacing: 36, seedsPerLb: 8, plantingDepth: '3-4 inches',
    tips: ['Use certified seed pieces weighing 1.5-2 oz each.', 'Plant 10-12 inches apart in rows 34-36 inches wide.', 'Allow cut seed to suberize 2-3 days before planting.'],
    faqs: [['How much seed potato per acre?', 'About 2,000-2,500 lbs of seed potatoes per acre at 12-inch spacing.'], ['How deep should potatoes be planted?', 'Plant seed pieces 3-4 inches deep, then hill as plants grow.']]
  },
  cotton: { name: 'Cotton', population: 38000, rowSpacing: 38, seedsPerLb: 4500, plantingDepth: '0.75-1.5 inches',
    tips: ['Plant when soil reaches 65°F at 4-inch depth for 3 consecutive days.', 'Target 2-4 plants per row foot after emergence.', 'Planting depth is critical — too deep delays emergence.'],
    faqs: [['What is the ideal cotton seeding rate?', '35,000-45,000 seeds/acre in 38-40 inch rows.'], ['What soil temperature does cotton need?', 'Plant when soil is 65°F at 4 inches for 3+ consecutive days.']]
  },
  rice: { name: 'Rice', population: 900000, rowSpacing: 7, seedsPerLb: 14000, plantingDepth: '0.5-1 inch',
    tips: ['Water-seeding requires pre-sprouted seed.', 'Drill-seeded rice needs higher rates than water-seeded.', 'Avoid deep planting in clay soils.'],
    faqs: [['How much rice seed per acre?', '60-90 lbs/acre for drill-seeded, 100-120 lbs for water-seeded.'], ['How is rice planted?', 'Rice can be drill-seeded into dry soil or water-seeded into flooded fields.']]
  },
  alfalfa: { name: 'Alfalfa', population: 900000, rowSpacing: 7, seedsPerLb: 220000, plantingDepth: '0.25-0.5 inches',
    tips: ['Seed at 15-20 lbs/acre for new stands.', 'Shallow planting (1/4 inch) is critical for small seeds.', 'Use a cultipacker or roller after seeding for seed-soil contact.'],
    faqs: [['How much alfalfa seed per acre?', '15-20 lbs/acre broadcast, 12-15 lbs/acre drilled.'], ['How deep should alfalfa be planted?', 'Plant only 1/4 to 1/2 inch deep. Alfalfa seed is small and needs light to emerge.']]
  },
  oats: { name: 'Oats', population: 1200000, rowSpacing: 7, seedsPerLb: 13000, plantingDepth: '1-2 inches',
    tips: ['Plant as early as soil can be worked in spring.', 'Drill at 2-3 bushels per acre (64-96 lbs).', 'Oats make an excellent cover crop and nurse crop.'],
    faqs: [['What is the oat seeding rate?', '2-3 bushels per acre (64-96 lbs/acre) drilled, higher if broadcast.'], ['When should oats be planted?', 'As early as possible in spring — oats prefer cool weather and tolerate light frost.']]
  },
  barley: { name: 'Barley', population: 1100000, rowSpacing: 7, seedsPerLb: 14000, plantingDepth: '1-2 inches',
    tips: ['Plant spring barley as early as possible.', 'Use 1.2-1.4 million seeds/acre for malting barley.', 'Avoid thick stands that promote lodging.'],
    faqs: [['How much barley seed per acre?', '75-100 lbs/acre drilled (1.0-1.4 million seeds/acre).'], ['How deep should barley be planted?', '1-2 inches deep into firm, moist soil.']]
  },
  sorghum: { name: 'Sorghum', population: 50000, rowSpacing: 30, seedsPerLb: 15000, plantingDepth: '1-1.5 inches',
    tips: ['Plant when soil is 60°F at 2-inch depth.', 'Grain sorghum: 50,000-70,000 plants/acre.', 'Forage sorghum: 80,000-120,000 plants/acre for leafy types.'],
    faqs: [['What is the sorghum seeding rate?', '4-6 lbs/acre for grain sorghum (50,000-70,000 seeds/acre).'], ['What is the best row spacing for sorghum?', '20-30 inch rows are most common for grain sorghum.']]
  },
  sunflower: { name: 'Sunflower', population: 22000, rowSpacing: 30, seedsPerLb: 6000, plantingDepth: '1.5-2.5 inches',
    tips: ['Plant when soil reaches 50°F.', 'Oilseed types: 22,000-25,000 plants/acre.', 'Confection types: 17,000-20,000 plants/acre.'],
    faqs: [['How many sunflower seeds per acre?', 'Oilseed: 22,000-25,000; Confection: 17,000-20,000 seeds/acre.'], ['How deep to plant sunflowers?', 'Plant 1.5-2.5 inches deep depending on soil moisture.']]
  },
  canola: { name: 'Canola', population: 300000, rowSpacing: 7, seedsPerLb: 135000, plantingDepth: '0.5-1 inch',
    tips: ['Target 5-8 plants per square foot.', 'Seed is very small — ensure shallow, uniform planting.', 'Use a press wheel for good seed-soil contact.'],
    faqs: [['How much canola seed per acre?', '3-5 lbs/acre drilled for 300,000-500,000 seeds/acre.'], ['How deep should canola be planted?', 'Only 0.5-1 inch deep. Canola seed is very small and needs shallow planting.']]
  },
  peanuts: { name: 'Peanuts', population: 72000, rowSpacing: 36, seedsPerLb: 700, plantingDepth: '1.5-2 inches',
    tips: ['Plant when soil is 65°F at 4-inch depth.', 'Do not crack seed coats during handling.', 'Treat seed with fungicide for stand protection.'],
    faqs: [['How many peanut seeds per acre?', '4-5 seeds per row foot in 36-inch rows = ~70,000-87,000 seeds/acre.'], ['How deep to plant peanuts?', 'Plant 1.5-2 inches deep in warm (65°F+), moist soil.']]
  },
  tobacco: { name: 'Tobacco', population: 7000, rowSpacing: 42, seedsPerLb: 350000, plantingDepth: 'Transplant',
    tips: ['Transplant when soil reaches 60°F.', 'Space plants 18-24 inches in 42-48 inch rows.', 'Start transplants in greenhouse 8-10 weeks before field setting.'],
    faqs: [['How many tobacco plants per acre?', '6,000-8,000 plants per acre depending on row and plant spacing.'], ['When should tobacco be transplanted?', 'After last frost when soil temperatures reach 60°F consistently.']]
  },
  strawberries: { name: 'Strawberries', population: 17000, rowSpacing: 48, seedsPerLb: 30000, plantingDepth: 'Crown at soil level',
    tips: ['Space plants 12-18 inches apart in matted rows.', 'Set crown at soil level — not too deep, not too shallow.', 'Plant in early spring for June-bearing varieties.'],
    faqs: [['How many strawberry plants per acre?', '14,000-20,000 plants depending on system (matted row vs. plasticulture).'], ['How deep to plant strawberries?', 'Set the crown at soil level. Burying it causes rot; too high causes drying.']]
  },
  peppers: { name: 'Peppers', population: 8000, rowSpacing: 36, seedsPerLb: 60000, plantingDepth: '0.25 inches (transplant)',
    tips: ['Transplant after all frost danger has passed.', 'Space 18-24 inches in rows 30-36 inches apart.', 'Use black plastic mulch to warm soil.'],
    faqs: [['How many pepper plants per acre?', '7,000-10,000 plants depending on variety and spacing.'], ['When to transplant peppers?', 'After last frost when soil is 65°F+. Peppers are very frost-sensitive.']]
  },
  onions: { name: 'Onions', population: 100000, rowSpacing: 12, seedsPerLb: 125000, plantingDepth: '0.5-0.75 inches',
    tips: ['Direct seed or transplant depending on region.', 'Space 3-4 inches apart for large bulbs.', 'Day length determines bulbing — choose correct variety for latitude.'],
    faqs: [['How many onion seeds per acre?', '90,000-130,000 seeds/acre for direct-seeded onions.'], ['How deep to plant onion seeds?', 'Sow 0.5-0.75 inches deep. Keep soil moist until emergence.']]
  },
  lettuce: { name: 'Lettuce', population: 40000, rowSpacing: 18, seedsPerLb: 400000, plantingDepth: '0.125-0.25 inches',
    tips: ['Lettuce needs light to germinate — do not bury deeply.', 'Succession plant every 2 weeks for continuous harvest.', 'Seeds go dormant above 80°F — use primed seed in warm weather.'],
    faqs: [['How many lettuce plants per acre?', '30,000-50,000 depending on head type and spacing.'], ['How deep to plant lettuce?', 'Barely cover seed (1/8 to 1/4 inch). Lettuce needs light to germinate.']]
  },
  carrots: { name: 'Carrots', population: 300000, rowSpacing: 18, seedsPerLb: 340000, plantingDepth: '0.25-0.5 inches',
    tips: ['Keep soil consistently moist for 10-14 days until emergence.', 'Thin to 2-3 inches apart for full-size roots.', 'Plant in loose, deep, stone-free soil for straight roots.'],
    faqs: [['How many carrot seeds per acre?', '250,000-350,000 seeds/acre for fresh market carrots.'], ['Why are my carrots slow to germinate?', 'Carrots take 10-21 days to germinate. Keep soil moist but not waterlogged.']]
  },
  garlic: { name: 'Garlic', population: 40000, rowSpacing: 12, seedsPerLb: 50, plantingDepth: '2-3 inches',
    tips: ['Plant individual cloves, not whole bulbs.', 'Plant in fall 4-6 weeks before ground freezes.', 'Mulch heavily after planting for winter protection.'],
    faqs: [['How much garlic seed per acre?', 'About 800-1200 lbs of seed garlic per acre.'], ['When to plant garlic?', 'Fall planting (October-November) is best for most regions.']]
  },
  beans: { name: 'Beans (Dry)', population: 75000, rowSpacing: 30, seedsPerLb: 1600, plantingDepth: '1.5-2 inches',
    tips: ['Plant when soil is 60°F and rising.', 'Do not plant too early — cold soil causes poor emergence.', 'Inoculate with Rhizobium in new bean fields.'],
    faqs: [['How many bean seeds per acre?', '65,000-85,000 seeds/acre depending on variety and row spacing.'], ['How deep to plant dry beans?', '1.5-2 inches deep into warm, moist soil.']]
  },
  'grass-seed': { name: 'Grass Seed', population: 2000000, rowSpacing: 6, seedsPerLb: 250000, plantingDepth: '0.125-0.25 inches',
    tips: ['Seed cool-season grasses in early fall for best results.', 'Use a slit seeder or broadcast with roller for good contact.', 'Keep soil moist for 2-3 weeks until establishment.'],
    faqs: [['How much grass seed per acre?', '3-8 lbs/1000 sq ft depending on species (130-350 lbs/acre).'], ['When is the best time to seed grass?', 'Early fall for cool-season grasses, late spring for warm-season types.']]
  },
  'cover-crops': { name: 'Cover Crops', population: 500000, rowSpacing: 7, seedsPerLb: 15000, plantingDepth: '0.5-1.5 inches',
    tips: ['Plant as soon as possible after cash crop harvest.', 'Mix species for multiple benefits (legume + grass + brassica).', 'Cereal rye is the most reliable fall-planted cover crop.'],
    faqs: [['What is the best cover crop mix?', 'A mix of cereal rye (30 lbs), crimson clover (10 lbs), and radish (3 lbs) per acre provides good coverage and multiple benefits.'], ['When to terminate cover crops?', 'Terminate 2-3 weeks before planting cash crop, or at flowering for legumes.']]
  },
};

const seedCropsWithPlantingDate = new Set([
  'tomatoes', 'peppers', 'corn', 'wheat', 'soybeans', 'potatoes', 'strawberries',
  'lettuce', 'carrots', 'onions', 'garlic', 'beans', 'sunflower', 'alfalfa',
  'oats', 'barley', 'rice', 'cotton', 'sorghum', 'canola',
]);

const nonCrossClusterSlugs = new Set(['grass-seed', 'cover-crops']);

function createCropSeedConfig(slug: string, data: CropSeedData): CalculatorConfig {
  const allSlugs = Object.keys(cropSeedData).filter(s => s !== slug);
  const related = allSlugs.slice(0, 4);
  const isGenericCrop = nonCrossClusterSlugs.has(slug);
  const plantingDateHref = seedCropsWithPlantingDate.has(slug)
    ? `/calculators/planting-date/${slug}-planting-date/`
    : '/calculators/planting-date/';
  return {
    slug, cluster: 'seeding', crop: slug,
    title: `${data.name} Seeding Rate Calculator`,
    description: `Calculate seeding rate and seed needs for ${data.name.toLowerCase()}. Get population, spacing, and seed quantity recommendations.`,
    fields: [
      { id: 'acres', label: 'Field Size', type: 'number', placeholder: '40', unit: 'acres', min: 0.1, required: true },
      { id: 'desiredPop', label: 'Desired Population', type: 'number', placeholder: String(data.population), unit: 'plants/acre', defaultValue: data.population },
      { id: 'rowSpacing', label: 'Row Spacing', type: 'number', placeholder: String(data.rowSpacing), unit: 'inches', defaultValue: data.rowSpacing },
      { id: 'seedsPerLb', label: 'Seeds Per Pound', type: 'number', placeholder: String(data.seedsPerLb), defaultValue: data.seedsPerLb },
      { id: 'germRate', label: 'Germination Rate', type: 'number', placeholder: '92', unit: '%', defaultValue: 92, min: 1, max: 100 },
    ],
    calculate: (inputs) => {
      const acres = Number(inputs.acres) || 0;
      const pop = Number(inputs.desiredPop) || data.population;
      const spl = Number(inputs.seedsPerLb) || data.seedsPerLb;
      const germ = (Number(inputs.germRate) || 92) / 100;
      const seedsNeeded = Math.round((pop / germ) * acres);
      const lbs = seedsNeeded / spl;
      const bags = Math.ceil(lbs / 50);
      return {
        results: [
          { label: 'Seeds Needed', value: seedsNeeded, unit: 'seeds', color: 'blue' },
          { label: 'Seed Weight', value: Math.round(lbs * 10) / 10, unit: 'lbs', color: 'orange' },
          { label: 'Bags (50 lb)', value: bags, unit: 'bags', color: 'green' },
        ],
        totalLabel: 'Total seed needed', totalValue: Math.round(lbs), totalUnit: 'lbs',
      };
    },
    seo: {
      title: `${data.name} Seeding Rate Calculator — Seeds Per Acre`,
      description: `Calculate ${data.name.toLowerCase()} seeding rate, seed quantity, and plant population per acre. Get exact seed needs for your field.`,
    },
    quickFacts: [
      { label: 'Target Population', value: `${data.population.toLocaleString()} plants/acre` },
      { label: 'Row Spacing', value: `${data.rowSpacing} inches` },
      { label: 'Seeds Per Pound', value: data.seedsPerLb.toLocaleString() },
      { label: 'Planting Depth', value: data.plantingDepth },
    ],
    tips: data.tips,
    relatedCalculators: [
      { title: 'Seed Rate Calculator', href: '/calculators/seeding/seed-rate' },
      { title: 'Plant Spacing Calculator', href: '/calculators/seeding/plant-spacing' },
    ],
    relatedCrops: related.map(s => ({ title: cropSeedData[s].name, href: `/calculators/seeding/${s}` })),
    faqs: data.faqs.map(([q, a]) => ({ question: q, answer: a })),
    howToSteps: [
      `Enter your ${data.name.toLowerCase()} field size in acres.`,
      `Adjust the desired plant population, row spacing, and seeds per pound if needed (defaults are pre-filled for ${data.name.toLowerCase()}).`,
      'Set the germination rate from your seed tag or test results.',
      `Click Calculate to see the total seeds and pounds of ${data.name.toLowerCase()} seed needed.`,
    ],
    nextSteps: isGenericCrop
      ? [
          { title: 'Calculate NPK Fertilizer Rates', href: '/calculators/fertilizer/npk/' },
          { title: 'Estimate Crop Yield', href: '/calculators/yield/yield-per-acre/' },
          { title: 'Plan Planting Date', href: '/calculators/planting-date/' },
        ]
      : [
          { title: `Calculate ${data.name} Fertilizer Rates`, href: `/calculators/fertilizer/${slug}/` },
          { title: `Find ${data.name} Planting Date`, href: plantingDateHref },
          { title: `Estimate ${data.name} Yield`, href: `/calculators/yield/${slug}/` },
        ],
    howToUse: `Enter your field size in acres and the desired ${data.name.toLowerCase()} plant population. The calculator accounts for germination rate to determine how many seeds and pounds of seed you actually need to purchase. Default values are pre-filled based on standard ${data.name.toLowerCase()} recommendations.`,
    whyItMatters: `Achieving the right plant population is essential for ${data.name.toLowerCase()} yield. Too few plants leave gaps that reduce light interception and invite weeds, while overcrowding increases competition for moisture and nutrients. This calculator ensures you order the correct amount of seed for your specific field size and conditions.`,
    methodology: `The calculator uses a target population of ${data.population.toLocaleString()} plants/acre at ${data.rowSpacing}-inch row spacing with ${data.seedsPerLb.toLocaleString()} seeds per pound. Seeds needed = (Population / Germination rate) × Acres, then converted to pounds and 50-lb bags. Planting depth for ${data.name.toLowerCase()} is ${data.plantingDepth}.`,
    commonMistakes: [
      `Using a generic seeding rate instead of adjusting for ${data.name.toLowerCase()}-specific population targets and seed size.`,
      'Not checking the seed tag for actual germination rate and seeds per pound, which vary by lot.',
      'Failing to increase seeding rate for poor seedbed conditions, late planting, or no-till fields.',
      `Planting ${data.name.toLowerCase()} at the wrong depth — target ${data.plantingDepth} for best emergence.`,
    ],
  };
}

const cropConfigs = Object.entries(cropSeedData).map(([slug, data]) => createCropSeedConfig(slug, data));

export const seedingConfigs: CalculatorConfig[] = [
  seedRate, plantSpacing, germinationRate, seedsPerAcre, seedCost,
  ...cropConfigs,
];
