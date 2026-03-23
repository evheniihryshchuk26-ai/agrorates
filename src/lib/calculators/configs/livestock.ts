import type { CalculatorConfig } from '../types';

// General livestock calculators
const cattleWeight: CalculatorConfig = {
  slug: 'cattle-weight', cluster: 'livestock',
  title: 'Cattle Weight Calculator',
  description: 'Estimate cattle weight from heart girth and body length measurements without a scale.',
  fields: [
    { id: 'heartGirth', label: 'Heart Girth', type: 'number', placeholder: '76', unit: 'inches', min: 1, required: true, helpText: 'Circumference behind front legs' },
    { id: 'bodyLength', label: 'Body Length', type: 'number', placeholder: '60', unit: 'inches', min: 1, helpText: 'Point of shoulder to pin bone' },
  ],
  calculate: (inputs) => {
    const girth = Number(inputs.heartGirth) || 0;
    const length = Number(inputs.bodyLength) || 0;
    const weight = (girth * girth * length) / 300;
    return {
      results: [
        { label: 'Estimated Weight', value: Math.round(weight), unit: 'lbs', color: 'blue' },
        { label: 'Weight in kg', value: Math.round(weight * 0.4536), unit: 'kg', color: 'orange' },
      ],
      totalLabel: 'Estimated live weight', totalValue: Math.round(weight), totalUnit: 'lbs',
    };
  },
  seo: { title: 'Cattle Weight Calculator — Estimate Weight Without a Scale', description: 'Estimate cattle weight from heart girth and body length. No scale needed — use a tape measure.' },
  tips: ['Measure heart girth snugly behind the front legs.', 'Body length runs from point of shoulder to pin bone.', 'This formula is most accurate for mature cattle 400-1400 lbs.', 'Take measurements when the animal is standing squarely on level ground.'],
  faqs: [
    { question: 'How accurate is the weight tape method?', answer: 'Within 3-5% for mature cattle. Less accurate for young calves and very fat or thin animals.' },
    { question: 'What is heart girth?', answer: 'Heart girth is the circumference of the animal measured just behind the front legs and over the withers.' },
  ],
  howToSteps: [
    'Measure the heart girth (circumference behind front legs) in inches.',
    'Measure the body length from point of shoulder to pin bone in inches.',
    'Enter both measurements into the calculator.',
    'Click Calculate to see the estimated live weight in pounds and kilograms.',
  ],
  nextSteps: [
    { title: 'Feed Conversion Calculator', href: '/calculators/livestock/feed-conversion/' },
    { title: 'Feed Cost Calculator', href: '/calculators/livestock/feed-cost/' },
    { title: 'Farm Profit & Loss Calculator', href: '/calculators/economics/farm-profit-loss/' },
  ],
  relatedCalculators: [
    { title: 'Feed Conversion', href: '/calculators/livestock/feed-conversion/' },
    { title: 'Stocking Rate', href: '/calculators/livestock/stocking-rate/' },
    { title: 'Feed Cost Calculator', href: '/calculators/livestock/feed-cost/' },
    { title: 'Gestation Calculator', href: '/calculators/livestock/gestation/' },
    { title: 'Hay Bale Calculator', href: '/calculators/livestock/hay-bale/' },
    { title: 'Livestock Weight Converter', href: '/calculators/conversions/livestock-weight-converter/' },
  ],
  howToUse: 'Measure the heart girth by wrapping a tape measure around the animal just behind the front legs. Then measure body length from the point of shoulder to the pin bone. Enter both measurements in inches.',
  whyItMatters: 'Accurate weight estimation is essential for calculating feed rations, medication dosages, and market readiness. A scale is ideal but not always available — the heart girth method provides estimates within 3-5% accuracy for mature cattle.',
  methodology: 'Weight (lbs) = (Heart Girth² × Body Length) / 300. This formula, known as the Schaeffer formula, is widely used by veterinarians and livestock producers. It is most accurate for mature cattle between 400-1400 lbs.',
  commonMistakes: [
    'Measuring heart girth too loosely — pull the tape snug but not tight.',
    'Taking measurements while the animal is moving or not standing squarely.',
    'Using this formula for very young calves or extremely fat/thin animals where accuracy drops.',
    'Not measuring at the same time of day — gut fill changes weight by 3-5%.',
  ],
};

const feedConversion: CalculatorConfig = {
  slug: 'feed-conversion', cluster: 'livestock',
  title: 'Feed Conversion Ratio Calculator',
  description: 'Calculate feed conversion ratio (FCR) — pounds of feed per pound of weight gain.',
  fields: [
    { id: 'feedConsumed', label: 'Total Feed Consumed', type: 'number', placeholder: '2000', unit: 'lbs', min: 0, required: true },
    { id: 'weightGain', label: 'Total Weight Gain', type: 'number', placeholder: '350', unit: 'lbs', min: 0.1 },
  ],
  calculate: (inputs) => {
    const feed = Number(inputs.feedConsumed) || 0;
    const gain = Number(inputs.weightGain) || 1;
    const fcr = feed / gain;
    const feedEfficiency = (gain / feed) * 100;
    return {
      results: [
        { label: 'Feed Conversion Ratio', value: Math.round(fcr * 100) / 100, unit: ':1', color: 'blue' },
        { label: 'Feed Efficiency', value: Math.round(feedEfficiency * 10) / 10, unit: '%', color: 'green' },
      ],
      totalLabel: 'FCR', totalValue: Math.round(fcr * 100) / 100, totalUnit: 'lbs feed per lb gain',
    };
  },
  seo: { title: 'Feed Conversion Ratio Calculator — FCR for Livestock', description: 'Calculate feed conversion ratio for cattle, pigs, poultry, and other livestock.' },
  tips: ['Lower FCR means more efficient feed conversion.', 'Typical FCR: beef cattle 6-8:1, pigs 3-4:1, broilers 1.6-2.0:1.', 'Genetics, nutrition, and management all affect FCR.'],
  faqs: [{ question: 'What is a good FCR for beef cattle?', answer: '6:1 to 8:1 is typical for feedlot cattle. Lower is better.' }],
  howToSteps: [
    'Enter the total amount of feed consumed in pounds.',
    'Input the total weight gain over the same period.',
    'Click Calculate to see the feed conversion ratio and feed efficiency percentage.',
  ],
  nextSteps: [
    { title: 'Feed Cost Calculator', href: '/calculators/livestock/feed-cost/' },
    { title: 'Cattle Weight Calculator', href: '/calculators/livestock/cattle-weight/' },
    { title: 'Farm Profit & Loss Calculator', href: '/calculators/economics/farm-profit-loss/' },
  ],
  relatedCalculators: [
    { title: 'Feed Cost', href: '/calculators/livestock/feed-cost/' },
    { title: 'Cattle Weight', href: '/calculators/livestock/cattle-weight/' },
    { title: 'Stocking Rate', href: '/calculators/livestock/stocking-rate/' },
    { title: 'Hay Bale Calculator', href: '/calculators/livestock/hay-bale/' },
    { title: 'Gestation Calculator', href: '/calculators/livestock/gestation/' },
    { title: 'Farm Profit & Loss', href: '/calculators/economics/farm-profit-loss/' },
  ],
  howToUse: 'Enter the total pounds of feed consumed over a period and the total weight gained by the animal or group during that same period. The calculator returns the feed conversion ratio and feed efficiency percentage.',
  whyItMatters: 'Feed conversion ratio is the single most important metric for profitability in livestock finishing operations. Feed typically represents 60-70% of production costs, so even small FCR improvements translate to significant savings.',
  methodology: 'FCR = Total Feed Consumed (lbs) / Total Weight Gain (lbs). Feed Efficiency = (Weight Gain / Feed Consumed) × 100. Lower FCR means better efficiency. Typical benchmarks: beef cattle 6-8:1, pigs 3-4:1, broilers 1.6-2.0:1.',
  commonMistakes: [
    'Not accounting for feed waste — spilled or refused feed inflates the FCR.',
    'Comparing FCR across species without understanding that each has different biological efficiency.',
    'Measuring over too short a period, which gives unreliable results due to gut fill variation.',
    'Ignoring feed quality differences — a lower FCR on expensive feed may not improve profitability.',
  ],
};

const stockingRate: CalculatorConfig = {
  slug: 'stocking-rate', cluster: 'livestock',
  title: 'Stocking Rate Calculator',
  description: 'Calculate how many animals your pasture can support based on forage production and animal consumption.',
  fields: [
    { id: 'acres', label: 'Pasture Size', type: 'number', placeholder: '100', unit: 'acres', min: 0.1, required: true },
    { id: 'forageYield', label: 'Annual Forage Yield', type: 'number', placeholder: '4000', unit: 'lbs DM/acre', min: 0 },
    { id: 'utilizationRate', label: 'Utilization Rate', type: 'number', placeholder: '50', unit: '%', min: 10, max: 80, defaultValue: 50 },
    { id: 'dailyIntake', label: 'Daily Intake Per Animal', type: 'number', placeholder: '26', unit: 'lbs DM/day', min: 1 },
    { id: 'grazingDays', label: 'Grazing Season', type: 'number', placeholder: '180', unit: 'days', min: 1 },
  ],
  calculate: (inputs) => {
    const acres = Number(inputs.acres) || 0;
    const forage = Number(inputs.forageYield) || 0;
    const util = (Number(inputs.utilizationRate) || 50) / 100;
    const daily = Number(inputs.dailyIntake) || 26;
    const days = Number(inputs.grazingDays) || 180;
    const availableForage = forage * acres * util;
    const headDays = availableForage / daily;
    const head = Math.floor(headDays / days);
    const acresPerHead = head > 0 ? acres / head : 0;
    return {
      results: [
        { label: 'Head Supported', value: head, unit: 'head', color: 'blue' },
        { label: 'Acres Per Head', value: Math.round(acresPerHead * 10) / 10, unit: 'acres', color: 'orange' },
        { label: 'Total Forage Available', value: Math.round(availableForage), unit: 'lbs DM', color: 'green' },
      ],
      totalLabel: 'Carrying capacity', totalValue: head, totalUnit: 'head',
    };
  },
  seo: { title: 'Stocking Rate Calculator — Pasture Carrying Capacity', description: 'Calculate pasture stocking rate and carrying capacity. Determine head per acre based on forage production.' },
  tips: ['Never utilize more than 50-60% of forage to maintain pasture health.', 'Rotational grazing allows higher stocking rates than continuous grazing.', 'Account for drought years by keeping 20% buffer capacity.'],
  faqs: [{ question: 'What is a typical stocking rate for beef cattle?', answer: '1.5-3.0 acres per cow-calf pair depending on rainfall and forage type. Arid regions may need 20+ acres.' }],
  howToSteps: [
    'Enter your total pasture size in acres.',
    'Input the annual forage yield in pounds of dry matter per acre.',
    'Set the utilization rate (typically 50% for continuous grazing).',
    'Enter daily intake per animal and grazing season length to see carrying capacity.',
  ],
  nextSteps: [
    { title: 'Hay Bale Calculator', href: '/calculators/livestock/hay-bale/' },
    { title: 'Feed Cost Calculator', href: '/calculators/livestock/feed-cost/' },
    { title: 'Farm Profit & Loss Calculator', href: '/calculators/economics/farm-profit-loss/' },
  ],
  relatedCalculators: [
    { title: 'Hay Bale Calculator', href: '/calculators/livestock/hay-bale/' },
    { title: 'Feed Cost', href: '/calculators/livestock/feed-cost/' },
    { title: 'Cattle Weight', href: '/calculators/livestock/cattle-weight/' },
    { title: 'Feed Conversion', href: '/calculators/livestock/feed-conversion/' },
    { title: 'Hay Storage', href: '/calculators/livestock/hay-storage/' },
    { title: 'Bales Per Acre', href: '/calculators/conversions/bales-per-acre/' },
  ],
  howToUse: 'Enter your total pasture acreage, estimated annual forage yield in pounds of dry matter per acre, and the utilization rate (typically 50% for continuous grazing). Then enter daily intake per animal and the length of your grazing season.',
  whyItMatters: 'Overstocking degrades pastures, reduces forage productivity, and increases supplemental feed costs. Understocking leaves forage unused and reduces revenue. Calculating the correct stocking rate balances animal performance with long-term pasture health.',
  methodology: 'Carrying capacity = (Forage yield × Acres × Utilization rate) / (Daily intake × Grazing days). Utilization rate accounts for trampling, fouling, and the need to leave residual forage for plant recovery and soil protection.',
  commonMistakes: [
    'Using 100% utilization rate — never graze more than 50-60% of available forage to maintain pasture health.',
    'Not adjusting stocking rate for drought years when forage production drops significantly.',
    'Treating all acres equally when forage production varies by soil type, slope, and moisture.',
    'Forgetting that animal daily intake increases during lactation and cold weather.',
  ],
};

const hayBale: CalculatorConfig = {
  slug: 'hay-bale', cluster: 'livestock',
  title: 'Hay Bale Calculator',
  description: 'Calculate hay needs based on bale size, animal count, and feeding period.',
  fields: [
    { id: 'headCount', label: 'Number of Animals', type: 'number', placeholder: '20', min: 1, required: true },
    { id: 'dailyHay', label: 'Daily Hay Per Animal', type: 'number', placeholder: '25', unit: 'lbs/day', min: 1 },
    { id: 'feedingDays', label: 'Feeding Period', type: 'number', placeholder: '150', unit: 'days', min: 1 },
    { id: 'baleWeight', label: 'Bale Weight', type: 'number', placeholder: '1200', unit: 'lbs', min: 1, helpText: 'Round bale ~1200 lbs, small square ~50 lbs' },
    { id: 'wastePercent', label: 'Feeding Waste', type: 'number', placeholder: '15', unit: '%', min: 0, max: 50, defaultValue: 15 },
  ],
  calculate: (inputs) => {
    const head = Number(inputs.headCount) || 0;
    const daily = Number(inputs.dailyHay) || 0;
    const days = Number(inputs.feedingDays) || 0;
    const baleWt = Number(inputs.baleWeight) || 1200;
    const waste = (Number(inputs.wastePercent) || 15) / 100;
    const totalHay = head * daily * days / (1 - waste);
    const bales = Math.ceil(totalHay / baleWt);
    const tons = totalHay / 2000;
    return {
      results: [
        { label: 'Bales Needed', value: bales, unit: 'bales', color: 'blue' },
        { label: 'Total Hay', value: Math.round(tons * 10) / 10, unit: 'tons', color: 'orange' },
        { label: 'Daily Consumption', value: Math.round(head * daily), unit: 'lbs/day', color: 'green' },
      ],
      totalLabel: 'Total bales needed', totalValue: bales, totalUnit: 'bales',
    };
  },
  seo: { title: 'Hay Bale Calculator — How Many Bales Do I Need?', description: 'Calculate how many hay bales you need for winter feeding. Account for waste and bale size.' },
  tips: ['Round bales have 15-35% waste depending on feeder type.', 'Small square bales have 5-10% waste when fed in a rack.', 'Use hay rings or feeders to minimize waste from round bales.', 'Test hay quality to balance rations properly.'],
  faqs: [{ question: 'How many round bales per cow for winter?', answer: 'A 1200-lb cow eating 25 lbs/day for 150 days needs about 4-5 large round bales (accounting for 15% waste).' }],
  howToSteps: [
    'Enter the number of animals to feed.',
    'Input daily hay consumption per animal in pounds.',
    'Set the feeding period in days and the bale weight.',
    'Adjust the waste percentage and click Calculate to see total bales needed.',
  ],
  nextSteps: [
    { title: 'Hay Storage Calculator', href: '/calculators/livestock/hay-storage/' },
    { title: 'Feed Cost Calculator', href: '/calculators/livestock/feed-cost/' },
    { title: 'Stocking Rate Calculator', href: '/calculators/livestock/stocking-rate/' },
    { title: 'Farm Profit & Loss Calculator', href: '/calculators/economics/farm-profit-loss/' },
  ],
  relatedCalculators: [
    { title: 'Hay Storage', href: '/calculators/livestock/hay-storage/' },
    { title: 'Feed Cost', href: '/calculators/livestock/feed-cost/' },
    { title: 'Stocking Rate', href: '/calculators/livestock/stocking-rate/' },
    { title: 'Feed Conversion', href: '/calculators/livestock/feed-conversion/' },
    { title: 'Cattle Weight', href: '/calculators/livestock/cattle-weight/' },
    { title: 'Bales Per Acre', href: '/calculators/conversions/bales-per-acre/' },
    { title: 'Farm Profit & Loss', href: '/calculators/economics/farm-profit-loss/' },
  ],
  howToUse: 'Enter the number of animals, daily hay consumption per animal in pounds, and the feeding period length in days. Set the bale weight for your bale type and adjust the waste percentage based on your feeding method.',
  whyItMatters: 'Running out of hay mid-winter forces emergency purchases at premium prices. Overbuying ties up capital and risks spoilage. Accurate hay budgeting ensures you have enough feed while minimizing waste and storage costs.',
  methodology: 'Total hay needed = (Animals × Daily intake × Days) / (1 - Waste%). Bales needed = Total hay / Bale weight. Waste percentages vary by feeder type: hay rings 15-20%, unprotected ground feeding 30-40%, rack feeders 5-10%.',
  commonMistakes: [
    'Underestimating waste — round bales fed on the ground without a ring can lose 30-40%.',
    'Not testing hay quality and assuming all bales have the same nutritional value.',
    'Forgetting to account for animals that eat more in cold weather (intake increases 10-20%).',
    'Using last year\'s bale weights without re-weighing — bale weight varies with moisture and density.',
  ],
};

const hayStorage: CalculatorConfig = {
  slug: 'hay-storage', cluster: 'livestock',
  title: 'Hay Storage Calculator',
  description: 'Calculate hay barn storage capacity based on dimensions and bale type.',
  fields: [
    { id: 'length', label: 'Barn Length', type: 'number', placeholder: '60', unit: 'feet', min: 1, required: true },
    { id: 'width', label: 'Barn Width', type: 'number', placeholder: '40', unit: 'feet', min: 1 },
    { id: 'height', label: 'Stacking Height', type: 'number', placeholder: '16', unit: 'feet', min: 1 },
    { id: 'baleType', label: 'Bale Type', type: 'select', options: [
      { value: 'round-5x5', label: 'Round 5×5 ft (~1200 lbs)' },
      { value: 'round-4x5', label: 'Round 4×5 ft (~800 lbs)' },
      { value: 'small-square', label: 'Small Square 14×18×36 in (~50 lbs)' },
      { value: 'large-square', label: 'Large Square 3×3×8 ft (~1000 lbs)' },
    ] },
  ],
  calculate: (inputs) => {
    const l = Number(inputs.length) || 0;
    const w = Number(inputs.width) || 0;
    const h = Number(inputs.height) || 0;
    const baleType = String(inputs.baleType || 'round-5x5');
    const volume = l * w * h;
    let bales = 0; let weightPerBale = 0;
    if (baleType === 'round-5x5') { bales = Math.floor(l / 5) * Math.floor(w / 5) * Math.floor(h / 5); weightPerBale = 1200; }
    else if (baleType === 'round-4x5') { bales = Math.floor(l / 5) * Math.floor(w / 4) * Math.floor(h / 4); weightPerBale = 800; }
    else if (baleType === 'small-square') { bales = Math.floor(l / 3) * Math.floor(w / 1.5) * Math.floor(h / 1.17); weightPerBale = 50; }
    else { bales = Math.floor(l / 8) * Math.floor(w / 3) * Math.floor(h / 3); weightPerBale = 1000; }
    const totalTons = (bales * weightPerBale) / 2000;
    return {
      results: [
        { label: 'Bale Capacity', value: bales, unit: 'bales', color: 'blue' },
        { label: 'Total Weight', value: Math.round(totalTons * 10) / 10, unit: 'tons', color: 'orange' },
        { label: 'Barn Volume', value: Math.round(volume), unit: 'cu ft', color: 'green' },
      ],
      totalLabel: 'Storage capacity', totalValue: bales, totalUnit: 'bales',
    };
  },
  seo: { title: 'Hay Storage Calculator — Barn Capacity', description: 'Calculate hay barn storage capacity. Determine how many bales fit in your barn.' },
  tips: ['Store hay under cover to prevent weather losses (20-30% loss outdoors).', 'Allow airflow around bales to prevent mold.', 'Stack round bales in a pyramid or rows, never more than 3 high.'],
  faqs: [{ question: 'How do I store hay to prevent loss?', answer: 'Store under cover on pallets or gravel. Allow airflow and keep away from walls. Covered hay retains 95%+ of quality vs 70-80% uncovered.' }],
  howToSteps: [
    'Enter your barn length, width, and stacking height in feet.',
    'Select the bale type (round, small square, or large square).',
    'Click Calculate to see how many bales fit and the total weight capacity.',
  ],
  nextSteps: [
    { title: 'Hay Bale Calculator', href: '/calculators/livestock/hay-bale/' },
    { title: 'Stocking Rate Calculator', href: '/calculators/livestock/stocking-rate/' },
    { title: 'Feed Cost Calculator', href: '/calculators/livestock/feed-cost/' },
  ],
  relatedCalculators: [
    { title: 'Hay Bale Calculator', href: '/calculators/livestock/hay-bale/' },
    { title: 'Stocking Rate', href: '/calculators/livestock/stocking-rate/' },
    { title: 'Feed Cost', href: '/calculators/livestock/feed-cost/' },
    { title: 'Feed Conversion', href: '/calculators/livestock/feed-conversion/' },
    { title: 'Cattle Weight', href: '/calculators/livestock/cattle-weight/' },
    { title: 'Bales Per Acre', href: '/calculators/conversions/bales-per-acre/' },
  ],
  howToUse: 'Enter your barn or storage structure dimensions — length, width, and stacking height in feet. Select the bale type to match your operation. The calculator shows how many bales fit and the total weight capacity.',
  whyItMatters: 'Knowing your storage capacity helps you plan hay purchases, schedule deliveries, and decide whether you need additional storage before buying season. Proper storage under cover prevents 20-30% dry matter losses compared to outdoor storage.',
  methodology: 'Bale capacity is calculated by dividing barn dimensions by individual bale dimensions for each bale type. Round 5×5 bales occupy a 5×5×5 ft space, large square bales occupy 8×3×3 ft, and small squares occupy 3×1.5×1.17 ft.',
  commonMistakes: [
    'Not leaving space for airflow between bales and walls, which leads to mold and spoilage.',
    'Stacking round bales more than 3 high, which creates safety hazards and structural stress.',
    'Forgetting to account for access aisles needed to retrieve bales during feeding.',
    'Ignoring floor load capacity — hay weight can exceed what some barn floors support.',
  ],
};

const feedCost: CalculatorConfig = {
  slug: 'feed-cost', cluster: 'livestock',
  title: 'Feed Cost Calculator',
  description: 'Calculate daily, monthly, and annual feed costs for your livestock operation.',
  fields: [
    { id: 'headCount', label: 'Number of Animals', type: 'number', placeholder: '50', min: 1, required: true },
    { id: 'dailyFeed', label: 'Daily Feed Per Animal', type: 'number', placeholder: '25', unit: 'lbs/day', min: 0.1 },
    { id: 'feedPrice', label: 'Feed Price', type: 'number', placeholder: '250', unit: '$/ton', min: 0, step: 1 },
  ],
  calculate: (inputs) => {
    const head = Number(inputs.headCount) || 0;
    const daily = Number(inputs.dailyFeed) || 0;
    const price = Number(inputs.feedPrice) || 0;
    const dailyLbs = head * daily;
    const dailyCost = (dailyLbs / 2000) * price;
    const monthlyCost = dailyCost * 30;
    const annualCost = dailyCost * 365;
    return {
      results: [
        { label: 'Daily Cost', value: Math.round(dailyCost * 100) / 100, unit: '$', color: 'blue' },
        { label: 'Monthly Cost', value: Math.round(monthlyCost * 100) / 100, unit: '$', color: 'orange' },
        { label: 'Annual Cost', value: Math.round(annualCost), unit: '$', color: 'purple' },
        { label: 'Daily Feed Total', value: Math.round(dailyLbs), unit: 'lbs', color: 'green' },
      ],
      totalLabel: 'Annual feed cost', totalValue: Math.round(annualCost), totalUnit: '$',
    };
  },
  seo: { title: 'Feed Cost Calculator — Livestock Feeding Expenses', description: 'Calculate daily, monthly, and annual feed costs for your livestock operation.' },
  tips: ['Feed costs are typically 60-70% of total livestock production costs.', 'Buy feed in bulk when prices are low to reduce costs.', 'Test feed quality to avoid over- or under-supplementing.'],
  faqs: [{ question: 'What is the average feed cost per cow per day?', answer: 'Feed costs $2-5 per cow per day depending on feed type, quality, and local prices.' }],
  howToSteps: [
    'Enter the number of animals in your operation.',
    'Input the daily feed amount per animal in pounds.',
    'Enter the feed price per ton.',
    'Click Calculate to see daily, monthly, and annual feed costs.',
  ],
  nextSteps: [
    { title: 'Feed Conversion Calculator', href: '/calculators/livestock/feed-conversion/' },
    { title: 'Hay Bale Calculator', href: '/calculators/livestock/hay-bale/' },
    { title: 'Farm Profit & Loss Calculator', href: '/calculators/economics/farm-profit-loss/' },
  ],
  relatedCalculators: [
    { title: 'Feed Conversion', href: '/calculators/livestock/feed-conversion/' },
    { title: 'Hay Bale', href: '/calculators/livestock/hay-bale/' },
    { title: 'Cattle Weight', href: '/calculators/livestock/cattle-weight/' },
    { title: 'Stocking Rate', href: '/calculators/livestock/stocking-rate/' },
    { title: 'Hay Storage', href: '/calculators/livestock/hay-storage/' },
    { title: 'Gestation Calculator', href: '/calculators/livestock/gestation/' },
    { title: 'Farm Profit & Loss', href: '/calculators/economics/farm-profit-loss/' },
  ],
  howToUse: 'Enter the number of animals, daily feed consumption per animal in pounds, and the feed price per ton. The calculator projects daily, monthly, and annual feed expenses for your entire operation.',
  whyItMatters: 'Feed is the largest single expense in most livestock operations, typically 60-70% of total production costs. Projecting feed costs accurately helps with cash flow planning, loan applications, and deciding when to buy or sell feed.',
  methodology: 'Daily cost = (Head × Daily feed lbs) / 2000 × Price per ton. Monthly and annual costs are extrapolated from daily cost. This gives a baseline estimate — actual costs vary with seasonal feed price fluctuations and changing animal needs.',
  commonMistakes: [
    'Using as-fed weight instead of dry matter weight, which overstates actual nutrient delivery.',
    'Not updating feed prices seasonally — grain and hay prices can swing 30-50% through the year.',
    'Forgetting supplemental costs like minerals, salt, and protein blocks that add 5-10% to total feed cost.',
    'Assuming all animals eat the same amount regardless of age, weight, and production stage.',
  ],
};

const gestation: CalculatorConfig = {
  slug: 'gestation', cluster: 'livestock',
  title: 'Gestation Calculator',
  description: 'Calculate due date based on breeding date and species gestation period.',
  fields: [
    { id: 'breedingMonth', label: 'Breeding Month', type: 'select', options: [
      { value: '1', label: 'January' }, { value: '2', label: 'February' }, { value: '3', label: 'March' },
      { value: '4', label: 'April' }, { value: '5', label: 'May' }, { value: '6', label: 'June' },
      { value: '7', label: 'July' }, { value: '8', label: 'August' }, { value: '9', label: 'September' },
      { value: '10', label: 'October' }, { value: '11', label: 'November' }, { value: '12', label: 'December' },
    ] },
    { id: 'breedingDay', label: 'Breeding Day', type: 'number', placeholder: '15', min: 1, max: 31 },
    { id: 'species', label: 'Species', type: 'select', options: [
      { value: '283', label: 'Cattle — 283 days' }, { value: '150', label: 'Sheep — 150 days' },
      { value: '150', label: 'Goats — 150 days' }, { value: '114', label: 'Pigs — 114 days' },
      { value: '340', label: 'Horses — 340 days' }, { value: '365', label: 'Donkeys — 365 days' },
      { value: '31', label: 'Rabbits — 31 days' },
    ] },
  ],
  calculate: (inputs) => {
    const month = Number(inputs.breedingMonth) || 1;
    const day = Number(inputs.breedingDay) || 15;
    const gestationDays = Number(inputs.species) || 283;
    const breedDate = new Date(2025, month - 1, day);
    const dueDate = new Date(breedDate.getTime() + gestationDays * 86400000);
    const dueMonth = dueDate.getMonth() + 1;
    const dueDay = dueDate.getDate();
    return {
      results: [
        { label: 'Due Month', value: dueMonth, unit: 'month', color: 'blue' },
        { label: 'Due Day', value: dueDay, unit: 'day', color: 'orange' },
        { label: 'Gestation Length', value: gestationDays, unit: 'days', color: 'green' },
      ],
      totalLabel: 'Gestation period', totalValue: gestationDays, totalUnit: 'days',
    };
  },
  seo: { title: 'Gestation Calculator — Livestock Due Date', description: 'Calculate livestock due dates. Enter breeding date and species for expected birth date.' },
  tips: ['Mark breeding dates accurately for each animal.', 'Watch for signs of labor 1-2 weeks before due date.', 'Provide a clean, dry calving/lambing area.'],
  faqs: [{ question: 'What is the gestation period for cattle?', answer: 'Cattle gestation is approximately 283 days (about 9.5 months), ranging from 275-295 days.' }],
  howToSteps: [
    'Select the breeding month and enter the breeding day.',
    'Choose the species to set the correct gestation period.',
    'Click Calculate to see the estimated due date and gestation length.',
  ],
  nextSteps: [
    { title: 'Cattle Weight Calculator', href: '/calculators/livestock/cattle-weight/' },
    { title: 'Feed Cost Calculator', href: '/calculators/livestock/feed-cost/' },
    { title: 'Stocking Rate Calculator', href: '/calculators/livestock/stocking-rate/' },
  ],
  relatedCalculators: [
    { title: 'Cattle Weight', href: '/calculators/livestock/cattle-weight/' },
    { title: 'Feed Cost', href: '/calculators/livestock/feed-cost/' },
    { title: 'Feed Conversion', href: '/calculators/livestock/feed-conversion/' },
    { title: 'Stocking Rate', href: '/calculators/livestock/stocking-rate/' },
    { title: 'Hay Bale Calculator', href: '/calculators/livestock/hay-bale/' },
    { title: 'Livestock Weight Converter', href: '/calculators/conversions/livestock-weight-converter/' },
  ],
  howToUse: 'Select the breeding month and enter the breeding day. Choose the species to set the correct gestation period. The calculator adds the gestation days to the breeding date and shows the estimated due month and day.',
  whyItMatters: 'Knowing the expected due date lets you prepare birthing facilities, schedule veterinary checks, and adjust nutrition during the critical late-gestation period. Proper preparation reduces dystocia and neonatal mortality.',
  methodology: 'Due date = Breeding date + Gestation days. Standard gestation periods: cattle 283 days, sheep/goats 150 days, pigs 114 days, horses 340 days. Individual animals may vary by 1-2 weeks from the average.',
  commonMistakes: [
    'Not recording the exact breeding date — even a few days of uncertainty shifts the due window.',
    'Assuming the first breeding attempt was successful without confirming pregnancy.',
    'Using average gestation length without knowing that breed and individual variation can shift it by 1-2 weeks.',
    'Not preparing the birthing area until after the due date, leaving no margin for early deliveries.',
  ],
};

// Animal-specific calculators
type AnimalData = {
  name: string; avgWeight: number; feedPct: number; fcr: string; gestationOrIncubation: string; marketAge: string;
  tips: string[]; faqs: [string, string][];
};

const animalData: Record<string, AnimalData> = {
  'beef-cattle': { name: 'Beef Cattle', avgWeight: 1200, feedPct: 2.5, fcr: '6-8:1', gestationOrIncubation: '283 days', marketAge: '18-24 months',
    tips: ['Provide 2-2.5% of body weight in dry matter daily.', 'Supplemental minerals are essential on most forages.', 'Backgrounding calves on pasture before feedlot reduces costs.'],
    faqs: [['How much does it cost to feed a beef cow?', 'Annual feed cost per cow averages $800-1,200 depending on region, feed prices, and management.']]
  },
  'dairy-cows': { name: 'Dairy Cows', avgWeight: 1400, feedPct: 3.5, fcr: '1.4-1.6:1 (lbs milk/lb feed)', gestationOrIncubation: '283 days', marketAge: 'N/A (productive life)',
    tips: ['High-producing cows need 3.5-4% of body weight in dry matter.', 'TMR (total mixed ration) ensures consistent nutrition.', 'Fresh, clean water intake directly correlates with milk production.'],
    faqs: [['How much does a dairy cow eat per day?', 'A high-producing dairy cow eats 50-55 lbs of dry matter per day (about 100+ lbs as-fed).']]
  },
  'pigs': { name: 'Pigs', avgWeight: 280, feedPct: 4.0, fcr: '3-4:1', gestationOrIncubation: '114 days', marketAge: '5-6 months',
    tips: ['Feed efficiency improves with pelleted feeds vs meal.', 'Temperature control is critical — heat stress reduces feed intake.', 'Phase feeding (changing diet with growth stage) optimizes efficiency.'],
    faqs: [['How much feed does a pig need to reach market weight?', 'About 800-900 lbs of feed to reach 280 lbs market weight (3.0-3.2 FCR).']]
  },
  'chickens-layers': { name: 'Laying Hens', avgWeight: 5, feedPct: 5.0, fcr: '4:1 (lbs feed/dozen eggs)', gestationOrIncubation: '21 days incubation', marketAge: '18-20 weeks to lay',
    tips: ['Layers need 16-18% protein feed.', 'Provide calcium supplement (oyster shell) free choice.', 'Light management (14-16 hours) maintains egg production.'],
    faqs: [['How much feed does a laying hen eat per day?', 'About 0.25-0.30 lbs (4-5 oz) of feed per day.']]
  },
  'chickens-broilers': { name: 'Broiler Chickens', avgWeight: 6, feedPct: 8.0, fcr: '1.6-2.0:1', gestationOrIncubation: '21 days incubation', marketAge: '6-8 weeks',
    tips: ['Modern broilers reach 6 lbs in 42 days.', 'Feed conversion is best with controlled environment housing.', 'Starter, grower, and finisher diets optimize growth.'],
    faqs: [['How long does it take to raise a broiler?', '6-8 weeks to reach 5-7 lbs live weight, depending on genetics and management.']]
  },
  'turkeys': { name: 'Turkeys', avgWeight: 35, feedPct: 5.0, fcr: '2.5-3.0:1', gestationOrIncubation: '28 days incubation', marketAge: '14-20 weeks',
    tips: ['Turkeys need higher protein than chickens (28% starter, 20% grower).', 'Provide adequate space — turkeys are more susceptible to crowding stress.', 'Blackhead disease prevention is critical if near chickens.'],
    faqs: [['How much feed does a turkey need?', 'About 70-85 lbs of feed to reach 35 lbs live weight at 18-20 weeks.']]
  },
  'sheep': { name: 'Sheep', avgWeight: 175, feedPct: 3.0, fcr: '5-7:1', gestationOrIncubation: '150 days', marketAge: '4-8 months (lambs)',
    tips: ['Sheep are efficient grazers on marginal land.', 'Guard against copper toxicity — sheep are very sensitive.', 'Parasite management is the #1 health challenge.'],
    faqs: [['How much does it cost to feed a sheep?', 'Annual feed cost is $150-300 per ewe depending on pasture availability and supplemental feed needs.']]
  },
  'goats': { name: 'Goats', avgWeight: 150, feedPct: 3.5, fcr: '5-7:1', gestationOrIncubation: '150 days', marketAge: '4-8 months (meat)',
    tips: ['Goats are browsers, not grazers — they prefer shrubs and weeds.', 'Copper supplementation is needed (unlike sheep).', 'Fencing must be goat-proof — 4-foot woven wire minimum.'],
    faqs: [['How much do goats eat per day?', 'About 3-5 lbs of dry matter per day (3-4% of body weight for lactating does).']]
  },
  'horses': { name: 'Horses', avgWeight: 1100, feedPct: 2.0, fcr: 'N/A (maintenance)', gestationOrIncubation: '340 days', marketAge: 'N/A',
    tips: ['Feed 1.5-2% of body weight in forage per day minimum.', 'Grain should supplement, not replace, forage.', 'Feed small, frequent meals to match natural grazing behavior.'],
    faqs: [['How much hay does a horse eat per day?', 'About 15-25 lbs of hay per day (1.5-2.5% of body weight in forage).']]
  },
  'donkeys': { name: 'Donkeys', avgWeight: 800, feedPct: 1.5, fcr: 'N/A (maintenance)', gestationOrIncubation: '365 days', marketAge: 'N/A',
    tips: ['Donkeys are easy keepers — prone to obesity on rich pasture.', 'Limit lush grass access to prevent laminitis.', 'Straw can replace part of the hay ration for overweight donkeys.'],
    faqs: [['How much do donkeys eat?', 'Donkeys need only 1.3-1.8% of body weight in dry matter daily — much less than horses.']]
  },
  'rabbits': { name: 'Rabbits', avgWeight: 10, feedPct: 5.0, fcr: '3-4:1', gestationOrIncubation: '31 days', marketAge: '8-12 weeks',
    tips: ['Provide unlimited hay (timothy or grass hay) for gut health.', 'Commercial pellets should be 16-18% protein.', 'Fresh water is critical — rabbits drink 50-100 mL per kg body weight daily.'],
    faqs: [['How much do rabbits eat?', 'About 0.5 lbs of pellets per day for fryer-sized rabbits, plus unlimited hay.']]
  },
  'ducks': { name: 'Ducks', avgWeight: 8, feedPct: 6.0, fcr: '2.5-3.0:1', gestationOrIncubation: '28 days incubation', marketAge: '7-8 weeks',
    tips: ['Ducks need niacin supplementation if fed chicken feed.', 'Provide water deep enough to submerge their heads.', 'Pekin ducks reach market weight in 7 weeks.'],
    faqs: [['How fast do ducks grow?', 'Pekin ducks reach 7-8 lbs in 7-8 weeks with proper nutrition.']]
  },
  'geese': { name: 'Geese', avgWeight: 14, feedPct: 4.0, fcr: '3-4:1', gestationOrIncubation: '28-32 days incubation', marketAge: '14-20 weeks',
    tips: ['Geese are excellent grazers and can get 80% of nutrition from pasture.', 'Supplement with grain only in winter or for finishing.', 'Geese are excellent guard animals for other poultry.'],
    faqs: [['Are geese good for pasture management?', 'Yes. Geese are efficient grazers and can maintain grass in orchards and vineyards without herbicides.']]
  },
  'bees': { name: 'Bees (Honey)', avgWeight: 0, feedPct: 0, fcr: 'N/A', gestationOrIncubation: '16-24 days (egg to adult)', marketAge: 'N/A',
    tips: ['A healthy hive needs 60-90 lbs of honey to overwinter.', 'Feed 2:1 sugar syrup in fall if stores are low.', 'Inspect hives every 7-10 days during active season.'],
    faqs: [['How much honey does a hive produce?', 'A healthy hive produces 30-60 lbs of surplus honey per year in most regions.']]
  },
  'fish-aquaculture': { name: 'Fish (Aquaculture)', avgWeight: 2, feedPct: 3.0, fcr: '1.2-1.8:1', gestationOrIncubation: 'Varies by species', marketAge: '6-18 months',
    tips: ['Water quality is the #1 factor in fish health and growth.', 'Feed 1-3% of body weight daily, adjusted for temperature.', 'Monitor dissolved oxygen — minimum 5 ppm for most species.'],
    faqs: [['What is a good FCR for tilapia?', 'Tilapia FCR is typically 1.4-1.8:1 under good management conditions.']]
  },
  'quail': { name: 'Quail', avgWeight: 0.5, feedPct: 8.0, fcr: '2.5-3.5:1', gestationOrIncubation: '17-18 days incubation', marketAge: '6-8 weeks',
    tips: ['Coturnix quail reach maturity in 6-8 weeks.', 'High-protein (24-28%) game bird feed for best growth.', 'Quail need small wire mesh (0.5 inch) to prevent escape.'],
    faqs: [['How fast do quail grow?', 'Coturnix quail reach market size (6-8 oz) in 6-8 weeks and begin laying eggs at 6 weeks.']]
  },
};

function createAnimalConfig(slug: string, data: AnimalData): CalculatorConfig {
  const others = Object.keys(animalData).filter(s => s !== slug).slice(0, 6);
  const isBees = slug === 'bees';
  return {
    slug, cluster: 'livestock', crop: slug,
    title: `${data.name} Feed Calculator`,
    description: isBees
      ? `Calculate honey bee colony management estimates including feed requirements and honey production.`
      : `Calculate feed requirements and costs for ${data.name.toLowerCase()}. Estimate daily, monthly, and annual feed needs.`,
    fields: isBees ? [
      { id: 'hiveCount', label: 'Number of Hives', type: 'number', placeholder: '10', min: 1, required: true },
      { id: 'sugarPrice', label: 'Sugar Price', type: 'number', placeholder: '0.50', unit: '$/lb', min: 0, step: 0.01 },
      { id: 'feedLbsPerHive', label: 'Fall Feed Per Hive', type: 'number', placeholder: '50', unit: 'lbs sugar', defaultValue: 50 },
    ] : [
      { id: 'headCount', label: 'Number of Animals', type: 'number', placeholder: '20', min: 1, required: true },
      { id: 'avgWeight', label: 'Average Weight', type: 'number', placeholder: String(data.avgWeight), unit: 'lbs', defaultValue: data.avgWeight },
      { id: 'feedPct', label: 'Daily Feed (% Body Weight)', type: 'number', placeholder: String(data.feedPct), unit: '%', defaultValue: data.feedPct, step: 0.1 },
      { id: 'feedPrice', label: 'Feed Price', type: 'number', placeholder: '250', unit: '$/ton', min: 0 },
    ],
    calculate: isBees ? (inputs) => {
      const hives = Number(inputs.hiveCount) || 0;
      const price = Number(inputs.sugarPrice) || 0;
      const lbs = Number(inputs.feedLbsPerHive) || 50;
      const totalSugar = hives * lbs;
      const totalCost = totalSugar * price;
      return {
        results: [
          { label: 'Total Sugar Needed', value: Math.round(totalSugar), unit: 'lbs', color: 'blue' },
          { label: 'Fall Feeding Cost', value: Math.round(totalCost * 100) / 100, unit: '$', color: 'orange' },
          { label: 'Estimated Honey/Year', value: hives * 45, unit: 'lbs', color: 'green' },
        ],
        totalLabel: 'Annual estimated honey', totalValue: hives * 45, totalUnit: 'lbs',
      };
    } : (inputs) => {
      const head = Number(inputs.headCount) || 0;
      const weight = Number(inputs.avgWeight) || data.avgWeight;
      const pct = (Number(inputs.feedPct) || data.feedPct) / 100;
      const price = Number(inputs.feedPrice) || 0;
      const dailyPerHead = weight * pct;
      const dailyTotal = head * dailyPerHead;
      const monthlyTotal = dailyTotal * 30;
      const annualTotal = dailyTotal * 365;
      const annualCost = (annualTotal / 2000) * price;
      return {
        results: [
          { label: 'Daily Feed (Total)', value: Math.round(dailyTotal), unit: 'lbs/day', color: 'blue' },
          { label: 'Monthly Feed', value: Math.round(monthlyTotal), unit: 'lbs', color: 'orange' },
          { label: 'Annual Feed', value: Math.round(annualTotal), unit: 'lbs', color: 'green' },
          { label: 'Annual Feed Cost', value: Math.round(annualCost), unit: '$', color: 'purple' },
        ],
        totalLabel: 'Annual feed cost', totalValue: Math.round(annualCost), totalUnit: '$',
      };
    },
    seo: {
      title: `${data.name} Feed Calculator — Feed Requirements & Cost`,
      description: `Calculate ${data.name.toLowerCase()} feed requirements and costs. Estimate daily intake, monthly feed needs, and annual expenses.`,
    },
    quickFacts: [
      { label: 'Average Weight', value: isBees ? 'N/A' : `${data.avgWeight} lbs` },
      { label: 'Feed Conversion', value: data.fcr },
      { label: 'Gestation/Incubation', value: data.gestationOrIncubation },
      { label: 'Market Age', value: data.marketAge },
    ],
    tips: data.tips,
    howToSteps: isBees ? [
      'Enter the number of hives in your operation.',
      'Input the sugar price per pound for fall feeding.',
      'Set the estimated fall feed amount per hive in pounds.',
      'Click Calculate to see total sugar needed, feeding cost, and estimated honey production.',
    ] : [
      `Enter the number of ${data.name.toLowerCase()} in your operation.`,
      `Input the average weight per animal (default: ${data.avgWeight} lbs).`,
      `Adjust the daily feed percentage of body weight if needed.`,
      `Enter the feed price per ton and click Calculate to see daily, monthly, and annual feed costs.`,
    ],
    nextSteps: [
      { title: 'Feed Cost Calculator', href: '/calculators/livestock/feed-cost/' },
      { title: 'Stocking Rate Calculator', href: '/calculators/livestock/stocking-rate/' },
      { title: 'Farm Profit & Loss Calculator', href: '/calculators/economics/farm-profit-loss/' },
      { title: 'Hay Bale Calculator', href: '/calculators/livestock/hay-bale/' },
    ],
    relatedCalculators: [
      { title: 'Feed Cost Calculator', href: '/calculators/livestock/feed-cost/' },
      { title: 'Feed Conversion', href: '/calculators/livestock/feed-conversion/' },
      { title: 'Cattle Weight', href: '/calculators/livestock/cattle-weight/' },
      { title: 'Stocking Rate', href: '/calculators/livestock/stocking-rate/' },
      { title: 'Hay Bale Calculator', href: '/calculators/livestock/hay-bale/' },
      { title: 'Gestation Calculator', href: '/calculators/livestock/gestation/' },
    ],
    relatedCrops: others.map(s => ({ title: animalData[s].name, href: `/calculators/livestock/${s}/` })),
    faqs: data.faqs.map(([q, a]) => ({ question: q, answer: a })),
    howToUse: isBees
      ? 'Enter the number of hives in your operation, the current sugar price per pound, and the estimated fall feed amount per hive. The calculator shows total sugar needed, feeding cost, and projected annual honey production.'
      : `Enter the number of ${data.name.toLowerCase()} in your operation and their average weight (default: ${data.avgWeight} lbs). Adjust the daily feed percentage of body weight if needed, then enter the feed price per ton to see daily, monthly, and annual feed costs.`,
    whyItMatters: isBees
      ? 'Adequate fall feeding ensures colonies have enough stores to survive winter. Underfed colonies starve or emerge weak in spring, reducing honey production and pollination capacity the following season.'
      : `Feed is the largest ongoing expense for ${data.name.toLowerCase()} operations. Accurately projecting feed requirements prevents both shortages that hurt animal performance and overbuying that wastes capital. With a typical FCR of ${data.fcr}, every improvement in feed efficiency directly boosts profitability.`,
    methodology: isBees
      ? 'Total sugar = Hives × Pounds per hive. Cost = Total sugar × Price per pound. Honey estimate uses 45 lbs per hive per year as a conservative average for managed colonies in most US regions.'
      : `Daily feed = Average weight × Feed percentage (${data.feedPct}% of body weight). Annual feed = Daily feed × 365 days. Annual cost = (Annual feed / 2000) × Price per ton. The ${data.feedPct}% default is a standard guideline for ${data.name.toLowerCase()} and should be adjusted for production stage and environment.`,
    commonMistakes: isBees ? [
      'Feeding too late in fall when bees cannot process syrup before cold weather arrives.',
      'Using thin syrup (1:1) for fall feeding instead of thick syrup (2:1) which bees store faster.',
      'Not checking stored honey frames before deciding how much supplemental feed is needed.',
      'Ignoring regional differences — northern hives need significantly more winter stores than southern hives.',
    ] : [
      `Using a single average weight for all ${data.name.toLowerCase()} when weights vary significantly by age and condition.`,
      `Not adjusting feed percentage for production stage — lactating, growing, and finishing animals have different needs.`,
      `Forgetting that feed wastage (typically 5-15%) adds to the actual amount you need to purchase.`,
      `Projecting annual costs from a single month without accounting for seasonal price and consumption changes.`,
    ],
  };
}

const animalConfigs = Object.entries(animalData).map(([slug, data]) => createAnimalConfig(slug, data));

export const livestockConfigs: CalculatorConfig[] = [
  cattleWeight, feedConversion, stockingRate, hayBale, hayStorage, feedCost, gestation,
  ...animalConfigs,
];
