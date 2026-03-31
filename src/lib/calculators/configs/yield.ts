import type { CalculatorConfig } from '../types';

// General yield calculators
const yieldPerAcre: CalculatorConfig = {
  slug: 'yield-per-acre', cluster: 'yield',
  title: 'Yield Per Acre Calculator',
  description: 'Calculate crop yield per acre from total harvest weight. Convert between bushels, pounds, and tons per acre.',
  fields: [
    { id: 'acres', label: 'Field Size', type: 'number', placeholder: '40', unit: 'acres', min: 0.1, required: true },
    { id: 'totalHarvest', label: 'Total Harvest', type: 'number', placeholder: '200000', unit: 'lbs', min: 0 },
    { id: 'testWeight', label: 'Test Weight', type: 'select', options: [
      { value: '56', label: 'Corn — 56 lbs/bu' }, { value: '60', label: 'Wheat — 60 lbs/bu' },
      { value: '60', label: 'Soybeans — 60 lbs/bu' }, { value: '32', label: 'Oats — 32 lbs/bu' },
      { value: '48', label: 'Barley — 48 lbs/bu' }, { value: '56', label: 'Sorghum — 56 lbs/bu' },
    ] },
  ],
  calculate: (inputs) => {
    const acres = Number(inputs.acres) || 1;
    const harvest = Number(inputs.totalHarvest) || 0;
    const tw = Number(inputs.testWeight) || 56;
    const lbsPerAcre = harvest / acres;
    const buPerAcre = lbsPerAcre / tw;
    const tonsPerAcre = lbsPerAcre / 2000;
    return {
      results: [
        { label: 'Bushels/Acre', value: Math.round(buPerAcre * 10) / 10, unit: 'bu/acre', color: 'blue' },
        { label: 'Pounds/Acre', value: Math.round(lbsPerAcre), unit: 'lbs/acre', color: 'orange' },
        { label: 'Tons/Acre', value: Math.round(tonsPerAcre * 100) / 100, unit: 'tons/acre', color: 'green' },
      ],
      totalLabel: 'Yield per acre', totalValue: Math.round(buPerAcre * 10) / 10, totalUnit: 'bu/acre',
    };
  },
  seo: { title: 'Free Crop Yield Calculator — Bushels, Tons & Lbs/Acre (2026)', description: 'Free crop yield calculator. Convert total harvest to bushels, pounds, or tons per acre for corn, wheat, soybeans, and all grain crops.' },
  tips: ['Weigh grain trucks before and after unloading for accurate totals.', 'Account for moisture shrink when comparing to standard yields.', 'Use yield monitors for field-level data to optimize management zones.'],
  faqs: [
    { question: 'What is a good corn yield per acre?', answer: 'US average corn yield is about 175 bu/acre. Top producers consistently achieve 220-280 bu/acre.' },
    { question: 'How do I convert lbs to bushels?', answer: 'Divide total pounds by the test weight: corn = 56 lbs/bu, wheat/soybeans = 60 lbs/bu, oats = 32 lbs/bu.' },
  ],
  howToSteps: [
    'Enter your total field size in acres.',
    'Input the total harvest weight in pounds.',
    'Select your grain type to set the correct test weight.',
    'Click Calculate to see yield in bushels, pounds, and tons per acre.',
  ],
  nextSteps: [
    { title: 'Fertilizer Cost Calculator', href: '/calculators/fertilizer/fertilizer-cost/' },
    { title: 'Seeding Rate Calculator', href: '/calculators/seeding/seeding-rate/' },
    { title: 'Farm Profit & Loss Calculator', href: '/calculators/economics/farm-profit-loss/' },
  ],
  relatedCalculators: [
    { title: 'Harvest Loss Calculator', href: '/calculators/yield/harvest-loss/' },
    { title: 'Grain Moisture Calculator', href: '/calculators/yield/grain-moisture/' },
    { title: 'Grain Bin Storage', href: '/calculators/yield/grain-bin-storage/' },
    { title: 'Plants Per Acre', href: '/calculators/yield/plants-per-acre/' },
    { title: 'Bushels to Tons Converter', href: '/calculators/conversions/bushels-to-tons/' },
    { title: 'Break-Even Price Calculator', href: '/calculators/economics/break-even-price/' },
    { title: 'Farm Profit & Loss', href: '/calculators/economics/farm-profit-loss/' },
  ],
  howToUse: 'This crop yield calculator takes your total field size in acres and the total weight harvested in pounds. Select your grain type so the bushels per acre calculator uses the correct test weight per bushel. Results show yield in bushels, pounds, and tons per acre.',
  whyItMatters: 'Knowing your exact farm yield per acre is essential for evaluating seed performance, planning next year\'s inputs, and making marketing decisions. An accurate yield estimate also determines your Actual Production History (APH) for crop insurance.',
  methodology: 'Yield is calculated as: Bushels/acre = (Total lbs / Test weight) / Acres. Standard test weights are defined by the USDA: corn 56 lbs/bu, wheat and soybeans 60 lbs/bu, oats 32 lbs/bu.',
  commonMistakes: [
    'Not accounting for moisture shrink when comparing to standard yields.',
    'Using estimated field size instead of GPS-measured acres.',
    'Forgetting to subtract tare weight from truck scale tickets.',
    'Comparing yields across fields without accounting for different soil types.',
  ],
};

const harvestLoss: CalculatorConfig = {
  slug: 'harvest-loss', cluster: 'yield',
  title: 'Harvest Loss Calculator',
  description: 'Estimate harvest losses by comparing expected vs actual yield. Calculate bushels and dollars lost.',
  fields: [
    { id: 'acres', label: 'Field Size', type: 'number', placeholder: '40', unit: 'acres', min: 0.1, required: true },
    { id: 'expectedYield', label: 'Expected Yield', type: 'number', placeholder: '200', unit: 'bu/acre', min: 0 },
    { id: 'actualYield', label: 'Actual Yield', type: 'number', placeholder: '185', unit: 'bu/acre', min: 0 },
    { id: 'marketPrice', label: 'Market Price', type: 'number', placeholder: '4.50', unit: '$/bu', min: 0, step: 0.01 },
  ],
  calculate: (inputs) => {
    const acres = Number(inputs.acres) || 0;
    const expected = Number(inputs.expectedYield) || 0;
    const actual = Number(inputs.actualYield) || 0;
    const price = Number(inputs.marketPrice) || 0;
    const lossPerAcre = Math.max(0, expected - actual);
    const lossPct = expected > 0 ? (lossPerAcre / expected) * 100 : 0;
    const totalLoss = lossPerAcre * acres;
    const dollarLoss = totalLoss * price;
    return {
      results: [
        { label: 'Loss Per Acre', value: Math.round(lossPerAcre * 10) / 10, unit: 'bu/acre', color: 'orange' },
        { label: 'Loss Percentage', value: Math.round(lossPct * 10) / 10, unit: '%', color: 'rose' },
        { label: 'Total Bushels Lost', value: Math.round(totalLoss), unit: 'bu', color: 'blue' },
        { label: 'Dollar Loss', value: Math.round(dollarLoss * 100) / 100, unit: '$', color: 'purple' },
      ],
      totalLabel: 'Total estimated loss', totalValue: Math.round(dollarLoss * 100) / 100, totalUnit: '$',
    };
  },
  seo: { title: 'Free Harvest Loss Calculator — Bushels, Dollars & Percent (2026)', description: 'Calculate harvest losses in bushels and dollars. Compare expected vs actual yield to identify efficiency improvements.' },
  tips: ['Acceptable harvest loss is typically 1-3% of yield.', 'Check behind the combine regularly with a drop pan.', 'Slow ground speed in tough conditions to reduce losses.', 'Properly adjusted headers and sieves minimize losses.'],
  faqs: [
    { question: 'What is acceptable harvest loss?', answer: '1-3% of total yield is considered acceptable. For 200 bu/acre corn, that is 2-6 bu/acre.' },
    { question: 'How do I measure harvest loss?', answer: 'Count kernels in a 10 sq ft area behind the combine. For corn, about 2 kernels/sq ft equals 1 bu/acre loss.' },
  ],
  howToSteps: [
    'Enter your total field size in acres.',
    'Input the expected yield based on scouting or historical data.',
    'Enter the actual harvested yield in bushels per acre.',
    'Enter the current market price per bushel to calculate dollar losses.',
  ],
  nextSteps: [
    { title: 'Grain Moisture Calculator', href: '/calculators/yield/grain-moisture/' },
    { title: 'Fertilizer Cost Calculator', href: '/calculators/fertilizer/fertilizer-cost/' },
    { title: 'Farm Profit & Loss Calculator', href: '/calculators/economics/farm-profit-loss/' },
  ],
  relatedCalculators: [
    { title: 'Yield Per Acre', href: '/calculators/yield/yield-per-acre/' },
    { title: 'Grain Moisture', href: '/calculators/yield/grain-moisture/' },
    { title: 'Grain Bin Storage', href: '/calculators/yield/grain-bin-storage/' },
    { title: 'Plants Per Acre', href: '/calculators/yield/plants-per-acre/' },
    { title: 'Break-Even Price Calculator', href: '/calculators/economics/break-even-price/' },
    { title: 'Bushels to Tons Converter', href: '/calculators/conversions/bushels-to-tons/' },
  ],
  howToUse: 'Enter your field size, expected yield from scouting or historical data, and actual harvested yield in bushels per acre. Add the current market price to see the dollar value of losses.',
  whyItMatters: 'Harvest losses of 3-5% are common but often go unmeasured. Identifying where losses occur — header, threshing, or separation — lets you adjust combine settings and recover thousands of dollars per season.',
  methodology: 'Loss is calculated as: (Expected Yield - Actual Yield) × Acres × Market Price. Loss percentage is the difference divided by expected yield. Industry benchmarks target less than 3% total harvest loss.',
  commonMistakes: [
    'Overestimating expected yield, which inflates the apparent loss percentage.',
    'Not checking losses behind the combine with a drop pan at multiple locations.',
    'Blaming the combine when losses are actually pre-harvest (lodging, ear drop, shatter).',
    'Ignoring small per-acre losses that add up to significant totals on large fields.',
  ],
};

const grainMoisture: CalculatorConfig = {
  slug: 'grain-moisture', cluster: 'yield',
  title: 'Grain Moisture Calculator',
  description: 'Calculate grain moisture content and shrink factor. Determine dry weight from wet weight.',
  fields: [
    { id: 'wetWeight', label: 'Wet Weight', type: 'number', placeholder: '60000', unit: 'lbs', min: 0, required: true },
    { id: 'currentMoisture', label: 'Current Moisture', type: 'number', placeholder: '20', unit: '%', min: 0, max: 50 },
    { id: 'targetMoisture', label: 'Target Moisture', type: 'number', placeholder: '15', unit: '%', min: 0, max: 30 },
  ],
  calculate: (inputs) => {
    const wet = Number(inputs.wetWeight) || 0;
    const current = Number(inputs.currentMoisture) || 0;
    const target = Number(inputs.targetMoisture) || 15;
    const dryWeight = wet * (100 - current) / (100 - target);
    const shrink = wet - dryWeight;
    const shrinkPct = wet > 0 ? (shrink / wet) * 100 : 0;
    return {
      results: [
        { label: 'Dry Weight', value: Math.round(dryWeight), unit: 'lbs', color: 'blue' },
        { label: 'Weight Shrink', value: Math.round(shrink), unit: 'lbs', color: 'orange' },
        { label: 'Shrink Factor', value: Math.round(shrinkPct * 100) / 100, unit: '%', color: 'purple' },
      ],
      totalLabel: 'Adjusted weight', totalValue: Math.round(dryWeight), totalUnit: 'lbs',
    };
  },
  seo: { title: 'Free Grain Moisture Calculator — Shrink, Dry Weight & % (2026)', description: 'Calculate grain moisture shrink and dry weight. Convert wet weight to standard moisture for accurate yield and pricing.' },
  tips: ['Standard marketing moistures: corn 15%, wheat 13%, soybeans 13%.', 'Every 1% moisture above standard reduces bushel weight proportionally.', 'Drying costs average $0.03-0.06 per point of moisture removed per bushel.'],
  faqs: [
    { question: 'What is grain shrink?', answer: 'Shrink is the weight loss when grain is dried from harvest moisture to storage/marketing moisture. It reduces total bushels sold.' },
  ],
  howToSteps: [
    'Enter the total wet weight of your grain in pounds.',
    'Input the current moisture percentage from your moisture tester.',
    'Set the target moisture for storage or marketing.',
    'Click Calculate to see the dry weight, shrink amount, and shrink factor.',
  ],
  nextSteps: [
    { title: 'Grain Bin Storage Calculator', href: '/calculators/yield/grain-bin-storage/' },
    { title: 'Farm Profit & Loss Calculator', href: '/calculators/economics/farm-profit-loss/' },
    { title: 'Seeding Rate Calculator', href: '/calculators/seeding/seeding-rate/' },
  ],
  relatedCalculators: [
    { title: 'Grain Bin Storage', href: '/calculators/yield/grain-bin-storage/' },
    { title: 'Yield Per Acre', href: '/calculators/yield/yield-per-acre/' },
    { title: 'Harvest Loss Calculator', href: '/calculators/yield/harvest-loss/' },
    { title: 'Plants Per Acre', href: '/calculators/yield/plants-per-acre/' },
    { title: 'Grain Weight Per Bushel', href: '/calculators/conversions/grain-weight-per-bushel/' },
    { title: 'Farm Profit & Loss', href: '/calculators/economics/farm-profit-loss/' },
  ],
  howToUse: 'Enter the wet weight of your grain in pounds and the current moisture reading from your tester. Set the target moisture for storage or sale. The calculator shows the adjusted dry weight, total shrink, and shrink percentage.',
  whyItMatters: 'Grain elevators discount or reject grain above standard moisture levels. Understanding shrink helps you decide whether to dry in the field, use on-farm drying, or sell at harvest moisture and accept the dock.',
  methodology: 'Dry weight = Wet weight × (100 - Current moisture%) / (100 - Target moisture%). This formula conserves the dry matter content while accounting for the water removed during drying.',
  commonMistakes: [
    'Testing moisture on a single sample instead of averaging multiple probe readings.',
    'Not calibrating the moisture tester regularly against a known standard.',
    'Forgetting that drying costs money — sometimes selling at harvest moisture nets more.',
    'Ignoring the difference between whole-grain and ground-grain moisture readings.',
  ],
};

const grainBinStorage: CalculatorConfig = {
  slug: 'grain-bin-storage', cluster: 'yield',
  title: 'Grain Bin Storage Calculator',
  description: 'Calculate grain bin storage capacity in bushels and tons from bin dimensions.',
  fields: [
    { id: 'diameter', label: 'Bin Diameter', type: 'number', placeholder: '36', unit: 'feet', min: 1, required: true },
    { id: 'height', label: 'Eave Height', type: 'number', placeholder: '24', unit: 'feet', min: 1 },
    { id: 'grainType', label: 'Grain Type', type: 'select', options: [
      { value: '56', label: 'Corn (56 lbs/bu)' }, { value: '60', label: 'Wheat (60 lbs/bu)' },
      { value: '60', label: 'Soybeans (60 lbs/bu)' }, { value: '32', label: 'Oats (32 lbs/bu)' },
      { value: '48', label: 'Barley (48 lbs/bu)' },
    ] },
  ],
  calculate: (inputs) => {
    const d = Number(inputs.diameter) || 0;
    const h = Number(inputs.height) || 0;
    const tw = Number(inputs.grainType) || 56;
    const radius = d / 2;
    const cubicFt = Math.PI * radius * radius * h;
    const bushels = cubicFt * 0.8; // 1 bu = 1.244 cu ft, with packing ~0.8 factor
    const tons = (bushels * tw) / 2000;
    return {
      results: [
        { label: 'Storage Capacity', value: Math.round(bushels), unit: 'bushels', color: 'blue' },
        { label: 'Weight Capacity', value: Math.round(tons), unit: 'tons', color: 'orange' },
        { label: 'Volume', value: Math.round(cubicFt), unit: 'cu ft', color: 'green' },
      ],
      totalLabel: 'Bin capacity', totalValue: Math.round(bushels), totalUnit: 'bushels',
    };
  },
  seo: { title: 'Free Grain Bin Calculator — Bushels, Tons & Capacity (2026)', description: 'Calculate grain bin storage capacity from diameter and height. Get bushels, tons, and cubic feet for corn, wheat, soybeans, and all grains.' },
  tips: ['Account for the cone-shaped peak when calculating usable capacity.', 'Leave 6-12 inches of headspace for aeration and leveling.', 'Check structural integrity before filling to capacity.'],
  faqs: [
    { question: 'How many bushels in a 36-foot bin?', answer: 'A 36-foot diameter bin with 24-foot eave height holds approximately 19,500 bushels of corn.' },
  ],
  howToSteps: [
    'Enter the diameter of your grain bin in feet.',
    'Input the eave height in feet.',
    'Select the grain type to set the correct test weight.',
    'Click Calculate to see capacity in bushels, tons, and cubic feet.',
  ],
  nextSteps: [
    { title: 'Grain Moisture Calculator', href: '/calculators/yield/grain-moisture/' },
    { title: 'Fertilizer Cost Calculator', href: '/calculators/fertilizer/fertilizer-cost/' },
    { title: 'Farm Profit & Loss Calculator', href: '/calculators/economics/farm-profit-loss/' },
  ],
  relatedCalculators: [
    { title: 'Grain Moisture', href: '/calculators/yield/grain-moisture/' },
    { title: 'Bushels to Tons', href: '/calculators/conversions/bushels-to-tons/' },
    { title: 'Yield Per Acre', href: '/calculators/yield/yield-per-acre/' },
    { title: 'Harvest Loss Calculator', href: '/calculators/yield/harvest-loss/' },
    { title: 'Grain Weight Per Bushel', href: '/calculators/conversions/grain-weight-per-bushel/' },
    { title: 'Break-Even Price Calculator', href: '/calculators/economics/break-even-price/' },
  ],
  howToUse: 'Enter your grain bin diameter and eave height in feet, then select the grain type to set the correct test weight. The calculator shows capacity in bushels, tons, and cubic feet.',
  whyItMatters: 'Knowing your exact storage capacity prevents over-filling (which damages structures) and helps you plan harvest logistics. Accurate capacity figures are also needed for grain inventory and insurance purposes.',
  methodology: 'Capacity is calculated as: Volume = π × (Diameter/2)² × Height, then converted to bushels using a packing factor of 0.8 (1 bushel = 1.244 cubic feet). Tonnage uses the selected test weight per bushel.',
  commonMistakes: [
    'Not accounting for the cone-shaped peak or hopper bottom when calculating usable space.',
    'Forgetting to subtract headspace needed for aeration fans and leveling.',
    'Using inside diameter instead of outside diameter (or vice versa) for the measurement.',
    'Ignoring structural load limits — weight capacity may be lower than volume capacity.',
  ],
};

const plantsPerAcre: CalculatorConfig = {
  slug: 'plants-per-acre', cluster: 'yield',
  title: 'Plants Per Acre Calculator',
  description: 'Calculate plant population per acre from row spacing and in-row plant spacing.',
  fields: [
    { id: 'rowSpacing', label: 'Row Spacing', type: 'number', placeholder: '30', unit: 'inches', min: 1, required: true },
    { id: 'plantSpacing', label: 'Plant Spacing In-Row', type: 'number', placeholder: '8', unit: 'inches', min: 0.5 },
  ],
  calculate: (inputs) => {
    const rowSp = Number(inputs.rowSpacing) || 30;
    const plantSp = Number(inputs.plantSpacing) || 8;
    const sqFtPerPlant = (rowSp / 12) * (plantSp / 12);
    const plantsPerAcre = Math.round(43560 / sqFtPerPlant);
    const plantsPer1000ft = Math.round(1000 / (plantSp / 12));
    return {
      results: [
        { label: 'Plants Per Acre', value: plantsPerAcre, unit: 'plants', color: 'blue' },
        { label: 'Plants Per 1000 ft Row', value: plantsPer1000ft, unit: 'plants', color: 'green' },
        { label: 'Sq Ft Per Plant', value: Math.round(sqFtPerPlant * 100) / 100, unit: 'sq ft', color: 'orange' },
      ],
      totalLabel: 'Plants per acre', totalValue: plantsPerAcre, totalUnit: 'plants',
    };
  },
  seo: { title: 'Free Plants Per Acre Calculator — Population & Spacing (2026)', description: 'Calculate plants per acre from row spacing and plant spacing. Determine plant population and density for any crop.' },
  tips: ['Count plants in multiple locations to estimate actual field population.', 'Target 90-95% of planted seeds to emerge as plants.'],
  faqs: [
    { question: 'How many corn plants per acre at 30-inch rows?', answer: 'At 30-inch rows with 7-inch spacing: about 29,900 plants/acre. At 8-inch spacing: about 26,100 plants/acre.' },
  ],
  howToSteps: [
    'Enter the row spacing in inches.',
    'Input the in-row plant spacing in inches.',
    'Click Calculate to see plants per acre, plants per 1000 ft of row, and square feet per plant.',
  ],
  nextSteps: [
    { title: 'Seeding Rate Calculator', href: '/calculators/seeding/seeding-rate/' },
    { title: 'Fertilizer Rate Calculator', href: '/calculators/fertilizer/fertilizer-rate/' },
    { title: 'Farm Profit & Loss Calculator', href: '/calculators/economics/farm-profit-loss/' },
  ],
  relatedCalculators: [
    { title: 'Yield Per Acre', href: '/calculators/yield/yield-per-acre/' },
    { title: 'Plant Spacing', href: '/calculators/seeding/plant-spacing/' },
    { title: 'Harvest Loss Calculator', href: '/calculators/yield/harvest-loss/' },
    { title: 'Grain Bin Storage', href: '/calculators/yield/grain-bin-storage/' },
    { title: 'Seeding Rate Calculator', href: '/calculators/seeding/seeding-rate/' },
    { title: 'Row Spacing Converter', href: '/calculators/conversions/row-spacing-converter/' },
  ],
  howToUse: 'This plant population calculator takes row spacing in inches (e.g., 30 inches for standard corn rows) and the in-row plant spacing in inches. The plant density calculator converts these measurements into plants per acre, plants per 1000 feet of row, and square feet per plant.',
  whyItMatters: 'Plant population directly affects yield potential and competition for light, water, and nutrients. Using the right spacing calculator ensures you do not leave yield on the table with too few plants or increase lodging risk with too many.',
  methodology: 'Plants per acre = 43,560 sq ft / (Row spacing in ft × Plant spacing in ft). This formula assumes uniform spacing. Actual field stands should be verified by counting plants in measured row lengths at multiple locations.',
  commonMistakes: [
    'Confusing row spacing with plant spacing — row spacing is between rows, plant spacing is within a row.',
    'Not accounting for emergence losses — actual stand is typically 90-95% of seeds planted.',
    'Using the same population target for dryland and irrigated fields without adjusting.',
    'Measuring spacing from inconsistent points on the plant instead of stem to stem at ground level.',
  ],
};

// Crop-specific yield calculators
type CropYieldData = {
  name: string; avgYield: number; yieldUnit: string; recordYield: string; harvestWindow: string; testWeight: string;
  tips: string[]; faqs: [string, string][];
};

const cropYieldData: Record<string, CropYieldData> = {
  corn: { name: 'Corn', avgYield: 175, yieldUnit: 'bu/acre', recordYield: '616 bu/acre', harvestWindow: 'Sep-Nov', testWeight: '56 lbs/bu',
    tips: ['Begin harvest at 23-25% moisture for minimum field losses.', 'Adjust combine settings as conditions change throughout the day.', 'Monitor ear drop losses especially in dry, windy conditions.'],
    faqs: [['What is the average corn yield in the US?', 'The US average corn yield is approximately 175 bu/acre, with top producers achieving 250+ bu/acre.'], ['When should I harvest corn?', 'Begin harvest at 23-25% moisture to minimize field losses. Drying cost is less than field loss at higher moistures.']]
  },
  wheat: { name: 'Wheat', avgYield: 50, yieldUnit: 'bu/acre', recordYield: '169 bu/acre', harvestWindow: 'Jun-Aug', testWeight: '60 lbs/bu',
    tips: ['Harvest at 13-14% moisture to minimize drying costs.', 'Cutting height affects straw yield and residue management.', 'Monitor test weight as an indicator of grain quality.'],
    faqs: [['What is average wheat yield?', 'US average winter wheat yield is about 50 bu/acre. Irrigated wheat can exceed 100 bu/acre.'], ['What moisture should wheat be harvested at?', 'Ideal harvest moisture is 13-14%. Wheat dries quickly in the field once mature.']]
  },
  soybeans: { name: 'Soybeans', avgYield: 50, yieldUnit: 'bu/acre', recordYield: '190 bu/acre', harvestWindow: 'Sep-Nov', testWeight: '60 lbs/bu',
    tips: ['Harvest at 13% moisture for best quality.', 'Reduce ground speed to minimize shatter losses.', 'Flex headers reduce harvest losses in lodged soybeans.'],
    faqs: [['What is average soybean yield?', 'US average is about 50 bu/acre. Top yields exceed 80-100 bu/acre in favorable conditions.'], ['What causes soybean shatter losses?', 'Dry, brittle pods shatter easily at low moisture. Harvest promptly when mature.']]
  },
  tomatoes: { name: 'Tomatoes', avgYield: 35, yieldUnit: 'tons/acre', recordYield: '60+ tons/acre', harvestWindow: 'Jul-Oct', testWeight: 'N/A',
    tips: ['Harvest at proper maturity for best quality and shelf life.', 'Handle fruit carefully to minimize bruising.', 'Sort and grade at harvest for best market returns.'],
    faqs: [['What is average tomato yield?', 'Processing tomatoes average 35-45 tons/acre. Fresh market yields are typically 15-30 tons/acre.'], ['How many times can you harvest tomatoes?', 'Indeterminate varieties can be harvested multiple times over 4-8 weeks. Determinate types are often once-over harvested.']]
  },
  potatoes: { name: 'Potatoes', avgYield: 400, yieldUnit: 'cwt/acre', recordYield: '1,000+ cwt/acre', harvestWindow: 'Aug-Oct', testWeight: 'N/A',
    tips: ['Kill vines 2-3 weeks before harvest for proper skin set.', 'Harvest when soil is 45-65°F to minimize bruising.', 'Avoid harvesting in wet conditions.'],
    faqs: [['What is average potato yield?', 'US average is about 400 cwt/acre (20 tons). Top irrigated yields exceed 600 cwt/acre.'], ['When should potatoes be harvested?', 'After vine kill and 2-3 weeks of skin set, when soil temperatures are 45-65°F.']]
  },
  cotton: { name: 'Cotton', avgYield: 900, yieldUnit: 'lbs lint/acre', recordYield: '3,500+ lbs/acre', harvestWindow: 'Sep-Dec', testWeight: 'N/A',
    tips: ['Apply defoliant when 60-70% of bolls are open.', 'Harvest within 3-4 weeks of defoliation for best fiber quality.', 'Module builder settings affect module density and weathering.'],
    faqs: [['What is a good cotton yield?', 'US average is about 900 lbs lint/acre (2 bales). Irrigated yields commonly exceed 1,200 lbs.'], ['What is a bale of cotton?', 'A standard bale weighs approximately 480 lbs of lint cotton.']]
  },
  rice: { name: 'Rice', avgYield: 170, yieldUnit: 'bu/acre', recordYield: '300+ bu/acre', harvestWindow: 'Aug-Oct', testWeight: '45 lbs/bu',
    tips: ['Harvest at 18-22% moisture for best milling quality.', 'Drain fields 2-3 weeks before harvest.', 'Combine settings are critical for minimizing cracked kernels.'],
    faqs: [['What is average rice yield?', 'US average is about 170 bu/acre (7,600 lbs). California and Arkansas often exceed 200 bu/acre.'], ['What moisture should rice be harvested at?', '18-22% moisture. Lower moisture increases cracking; higher moisture increases drying costs.']]
  },
  alfalfa: { name: 'Alfalfa', avgYield: 4, yieldUnit: 'tons/acre', recordYield: '12+ tons/acre', harvestWindow: 'May-Oct (multiple)', testWeight: 'N/A',
    tips: ['Cut at 10% bloom for best quality-yield balance.', 'Allow 4-6 weeks of regrowth before the last fall cutting.', 'Wide swath drying preserves leaf quality.'],
    faqs: [['How many cuttings of alfalfa per year?', '3-5 cuttings per year depending on climate and irrigation. Southern regions get more cuttings.'], ['When should alfalfa be cut?', 'At 10% bloom (first flowers) for optimal balance of yield and quality.']]
  },
  oats: { name: 'Oats', avgYield: 70, yieldUnit: 'bu/acre', recordYield: '200+ bu/acre', harvestWindow: 'Jul-Aug', testWeight: '32 lbs/bu',
    tips: ['Harvest at 13-14% moisture.', 'Oats lodge easily — harvest promptly when ready.', 'Reduce cylinder speed to minimize hull damage.'],
    faqs: [['What is average oat yield?', 'US average is about 65-75 bu/acre. Top yields can exceed 150 bu/acre with good management.']]
  },
  barley: { name: 'Barley', avgYield: 75, yieldUnit: 'bu/acre', recordYield: '200+ bu/acre', harvestWindow: 'Jun-Aug', testWeight: '48 lbs/bu',
    tips: ['Malting barley must meet strict quality standards — harvest timely.', 'Maintain low moisture and avoid mechanical damage for malt grade.', 'Straight-cut or swath depending on maturity uniformity.'],
    faqs: [['What is a good barley yield?', 'US average is about 75 bu/acre. Irrigated barley can yield 120+ bu/acre.']]
  },
  sorghum: { name: 'Sorghum', avgYield: 70, yieldUnit: 'bu/acre', recordYield: '250+ bu/acre', harvestWindow: 'Sep-Nov', testWeight: '56 lbs/bu',
    tips: ['Wait for grain to dry to 13-14% moisture before harvest.', 'Bird damage increases with delayed harvest.', 'Combine at slow speed to reduce grain cracking.'],
    faqs: [['What is average sorghum yield?', 'US average is about 70 bu/acre. Irrigated sorghum can exceed 140 bu/acre.']]
  },
  sunflower: { name: 'Sunflower', avgYield: 1700, yieldUnit: 'lbs/acre', recordYield: '4,000+ lbs/acre', harvestWindow: 'Sep-Nov', testWeight: '28 lbs/bu (oil) / 24 lbs/bu (confection)',
    tips: ['Harvest at 10-12% moisture for oilseed, 9.5% for confection.', 'Bird and lodging losses increase with delayed harvest.', 'Use a sunflower header attachment for best results.'],
    faqs: [['What is average sunflower yield?', 'US average is about 1,600-1,800 lbs/acre for oilseed varieties.']]
  },
  canola: { name: 'Canola', avgYield: 2000, yieldUnit: 'lbs/acre', recordYield: '4,000+ lbs/acre', harvestWindow: 'Jul-Aug', testWeight: '50 lbs/bu',
    tips: ['Swath at 60% seed color change for uniform maturity.', 'Direct-cut canola requires a desiccant or frost.', 'Canola shatters easily — minimize handling.'],
    faqs: [['What is average canola yield?', 'US average is about 1,800-2,200 lbs/acre (36-44 bu/acre).']]
  },
  peanuts: { name: 'Peanuts', avgYield: 4200, yieldUnit: 'lbs/acre', recordYield: '8,000+ lbs/acre', harvestWindow: 'Sep-Nov', testWeight: 'N/A',
    tips: ['Dig when 70-80% of pods are mature (use hull scrape method).', 'Invert and windrow for field drying.', 'Cure to 10% moisture before combining.'],
    faqs: [['What is average peanut yield?', 'US average is about 4,000-4,500 lbs/acre. Top yields exceed 6,000 lbs/acre.']]
  },
  tobacco: { name: 'Tobacco', avgYield: 2500, yieldUnit: 'lbs/acre', recordYield: '4,000+ lbs/acre', harvestWindow: 'Jul-Sep', testWeight: 'N/A',
    tips: ['Harvest at proper ripeness for best curing quality.', 'Stalk-cut or leaf-prime depending on tobacco type.', 'Curing barn management is critical for grade and color.'],
    faqs: [['What is average tobacco yield?', 'US average is about 2,000-2,500 lbs/acre for flue-cured tobacco.']]
  },
  strawberries: { name: 'Strawberries', avgYield: 25000, yieldUnit: 'lbs/acre', recordYield: '60,000+ lbs/acre', harvestWindow: 'Apr-Jun / Sep-Nov', testWeight: 'N/A',
    tips: ['Pick every 2-3 days during peak season.', 'Harvest in morning for better shelf life.', 'Cool berries within 1 hour of picking.'],
    faqs: [['What is average strawberry yield?', 'US average is 20,000-30,000 lbs/acre. California averages higher due to longer seasons.']]
  },
  peppers: { name: 'Peppers', avgYield: 30000, yieldUnit: 'lbs/acre', recordYield: '60,000+ lbs/acre', harvestWindow: 'Jul-Oct', testWeight: 'N/A',
    tips: ['Harvest at full color for maximum flavor and nutrition.', 'Use sharp tools to cut peppers from plants.', 'Handle carefully to avoid bruising.'],
    faqs: [['What is average pepper yield?', 'Bell peppers average 25,000-40,000 lbs/acre depending on management and climate.']]
  },
  onions: { name: 'Onions', avgYield: 45000, yieldUnit: 'lbs/acre', recordYield: '80,000+ lbs/acre', harvestWindow: 'Jul-Sep', testWeight: 'N/A',
    tips: ['Harvest when 50-80% of tops have fallen.', 'Cure in field or under cover for 2-3 weeks.', 'Handle gently — bruised onions will not store well.'],
    faqs: [['What is average onion yield?', 'US average is about 40,000-50,000 lbs/acre (400-500 cwt).']]
  },
  lettuce: { name: 'Lettuce', avgYield: 35000, yieldUnit: 'lbs/acre', recordYield: '50,000+ lbs/acre', harvestWindow: 'Year-round (varies)', testWeight: 'N/A',
    tips: ['Harvest in early morning for best crispness.', 'Head lettuce is cut when firm; leaf types when desired size.', 'Rapid cooling (vacuum cooling) extends shelf life.'],
    faqs: [['What is average lettuce yield?', 'Iceberg lettuce averages 30,000-40,000 lbs/acre (700-900 cartons).']]
  },
  carrots: { name: 'Carrots', avgYield: 30000, yieldUnit: 'lbs/acre', recordYield: '50,000+ lbs/acre', harvestWindow: 'Jul-Nov', testWeight: 'N/A',
    tips: ['Harvest when roots reach desired diameter (0.75-1.5 inches).', 'Irrigate before harvest if soil is dry for easier pulling.', 'Cool rapidly after harvest for best storage.'],
    faqs: [['What is average carrot yield?', 'US average is about 25,000-35,000 lbs/acre for processing carrots.']]
  },
  garlic: { name: 'Garlic', avgYield: 12000, yieldUnit: 'lbs/acre', recordYield: '20,000+ lbs/acre', harvestWindow: 'Jun-Aug', testWeight: 'N/A',
    tips: ['Harvest when lower 3-4 leaves are brown but upper leaves still green.', 'Cure in shade with good airflow for 2-4 weeks.', 'Do not wash before curing — brush off soil gently.'],
    faqs: [['What is average garlic yield?', 'US average is about 10,000-15,000 lbs/acre for fresh market garlic.']]
  },
  beans: { name: 'Beans (Dry)', avgYield: 1800, yieldUnit: 'lbs/acre', recordYield: '4,000+ lbs/acre', harvestWindow: 'Aug-Oct', testWeight: '60 lbs/bu',
    tips: ['Direct-cut or undercut when pods are dry and stems brittle.', 'Harvest at 16-18% moisture to minimize splits.', 'Reduce cylinder speed to prevent cracking.'],
    faqs: [['What is average dry bean yield?', 'US average is about 1,700-2,000 lbs/acre (28-33 bu/acre).']]
  },
};

function createCropYieldConfig(slug: string, data: CropYieldData): CalculatorConfig {
  const others = Object.keys(cropYieldData).filter(s => s !== slug).slice(0, 6);
  return {
    slug, cluster: 'yield', crop: slug,
    title: `${data.name} Yield Calculator`,
    description: `Calculate ${data.name.toLowerCase()} yield per acre. Estimate total harvest, yield potential, and compare to averages.`,
    fields: [
      { id: 'acres', label: 'Field Size', type: 'number', placeholder: '40', unit: 'acres', min: 0.1, required: true },
      { id: 'plantsPerAcre', label: 'Plants Per Acre', type: 'number', placeholder: '30000', unit: 'plants', min: 1 },
      { id: 'yieldPerPlant', label: 'Expected Yield Per Plant', type: 'number', placeholder: '0.3', unit: data.yieldUnit === 'bu/acre' ? 'lbs' : 'lbs', min: 0, step: 0.01 },
    ],
    calculate: (inputs) => {
      const acres = Number(inputs.acres) || 0;
      const plants = Number(inputs.plantsPerAcre) || 0;
      const ypp = Number(inputs.yieldPerPlant) || 0;
      const lbsPerAcre = plants * ypp;
      const totalLbs = lbsPerAcre * acres;
      const totalTons = totalLbs / 2000;
      return {
        results: [
          { label: 'Yield Per Acre', value: Math.round(lbsPerAcre), unit: 'lbs/acre', color: 'blue' },
          { label: 'Total Harvest', value: Math.round(totalLbs), unit: 'lbs', color: 'orange' },
          { label: 'Total Tons', value: Math.round(totalTons * 10) / 10, unit: 'tons', color: 'green' },
        ],
        totalLabel: 'Total estimated harvest', totalValue: Math.round(totalLbs), totalUnit: 'lbs',
      };
    },
    seo: {
      title: `Free ${data.name} Yield Calculator — Lbs/Acre, Tons & Harvest (2026)`,
      description: `Calculate ${data.name.toLowerCase()} yield per acre. Estimate harvest totals in bushels, pounds, and tons. Compare to US average ${data.name.toLowerCase()} yields.`,
    },
    quickFacts: [
      { label: 'US Average Yield', value: `${data.avgYield.toLocaleString()} ${data.yieldUnit}` },
      { label: 'Record Yield', value: data.recordYield },
      { label: 'Harvest Window', value: data.harvestWindow },
      { label: 'Test Weight', value: data.testWeight },
    ],
    tips: data.tips,
    howToSteps: [
      `Enter the total field size planted with ${data.name.toLowerCase()} in acres.`,
      `Input the estimated plants per acre for your ${data.name.toLowerCase()} stand.`,
      `Enter the expected yield per plant in pounds.`,
      `Click Calculate to see total yield in pounds and tons per acre.`,
    ],
    nextSteps: [
      { title: `${data.name} Fertilizer Calculator`, href: `/calculators/fertilizer/${slug}/` },
      { title: `${data.name} Seeding Rate`, href: `/calculators/seeding/${slug}/` },
      { title: `${data.name} Planting Date`, href: `/calculators/planting-date/${slug}-planting-date/` },
    ],
    relatedCalculators: [
      { title: 'Yield Per Acre Calculator', href: '/calculators/yield/yield-per-acre/' },
      { title: 'Harvest Loss Calculator', href: '/calculators/yield/harvest-loss/' },
      { title: 'Grain Moisture Calculator', href: '/calculators/yield/grain-moisture/' },
      { title: 'Plants Per Acre', href: '/calculators/yield/plants-per-acre/' },
      { title: 'Break-Even Price Calculator', href: '/calculators/economics/break-even-price/' },
      { title: 'Cost Per Acre Calculator', href: '/calculators/economics/cost-per-acre/' },
    ],
    relatedCrops: others.slice(0, 6).map(s => ({ title: cropYieldData[s].name, href: `/calculators/yield/${s}/` })),
    faqs: data.faqs.map(([q, a]) => ({ question: q, answer: a })),
    howToUse: `Enter the total acres planted with ${data.name.toLowerCase()}, the estimated plants per acre, and expected yield per plant in pounds. The calculator estimates total ${data.name.toLowerCase()} yield per acre in pounds and tons so you can compare against the US average of ${data.avgYield.toLocaleString()} ${data.yieldUnit}.`,
    whyItMatters: `Accurate ${data.name.toLowerCase()} yield estimation helps with harvest planning, storage logistics, and marketing decisions. Comparing your projected ${data.name.toLowerCase()} bushels per acre to the US average of ${data.avgYield.toLocaleString()} ${data.yieldUnit} reveals whether your management practices are on track or need adjustment.`,
    methodology: `Yield is estimated as: Plants per acre × Yield per plant = Pounds per acre. Total harvest = Pounds per acre × Acres. This approach works best when combined with field scouting during the ${data.harvestWindow} harvest window to validate per-plant yield assumptions.`,
    commonMistakes: [
      `Using a single plant sample to estimate per-plant yield instead of averaging across multiple field locations.`,
      `Not adjusting plant population for actual stand count — emergence losses reduce the planted population.`,
      `Forgetting to account for harvest losses, which typically reduce recoverable yield by 1-5%.`,
      `Comparing yields without normalizing for moisture content — always convert to standard moisture before comparing.`,
    ],
  };
}

const cropConfigs = Object.entries(cropYieldData).map(([slug, data]) => createCropYieldConfig(slug, data));

export const yieldConfigs: CalculatorConfig[] = [
  yieldPerAcre, harvestLoss, grainMoisture, grainBinStorage, plantsPerAcre,
  ...cropConfigs,
];
