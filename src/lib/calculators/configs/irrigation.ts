import type { CalculatorConfig } from '../types';

const irrigationWaterNeed: CalculatorConfig = {
  slug: 'irrigation-water-need', cluster: 'irrigation',
  title: 'Irrigation Water Need Calculator',
  description: 'Calculate daily and weekly irrigation water needs based on crop evapotranspiration and system efficiency.',
  fields: [
    { id: 'acres', label: 'Field Size', type: 'number', placeholder: '40', unit: 'acres', min: 0.1, required: true },
    { id: 'etRate', label: 'Daily ET Rate', type: 'number', placeholder: '0.25', unit: 'inches/day', min: 0, step: 0.01, helpText: 'Evapotranspiration rate from weather station or estimate' },
    { id: 'efficiency', label: 'System Efficiency', type: 'select', options: [
      { value: '95', label: 'Drip — 90-95%' }, { value: '80', label: 'Sprinkler — 75-85%' },
      { value: '60', label: 'Flood/Furrow — 50-70%' },
    ] },
    { id: 'rainfall', label: 'Weekly Rainfall', type: 'number', placeholder: '0', unit: 'inches', min: 0, step: 0.1 },
  ],
  calculate: (inputs) => {
    const acres = Number(inputs.acres) || 0;
    const et = Number(inputs.etRate) || 0;
    const eff = (Number(inputs.efficiency) || 80) / 100;
    const rain = Number(inputs.rainfall) || 0;
    const weeklyNeedInches = Math.max(0, et * 7 - rain);
    const weeklyGross = weeklyNeedInches / eff;
    const gallonsPerAcreInch = 27154;
    const weeklyGallons = weeklyGross * acres * gallonsPerAcreInch;
    const dailyGallons = weeklyGallons / 7;
    return {
      results: [
        { label: 'Weekly Need', value: Math.round(weeklyGross * 100) / 100, unit: 'inches', color: 'blue' },
        { label: 'Daily Gallons', value: Math.round(dailyGallons), unit: 'gallons', color: 'orange' },
        { label: 'Weekly Gallons', value: Math.round(weeklyGallons), unit: 'gallons', color: 'green' },
      ],
      totalLabel: 'Weekly irrigation need', totalValue: Math.round(weeklyGross * 100) / 100, totalUnit: 'inches',
    };
  },
  seo: { title: 'Irrigation Calculator — Crop Water Needs Per Acre', description: 'Free irrigation calculator. Calculate daily and weekly water needs based on evapotranspiration, system efficiency, and rainfall. Plan irrigation scheduling.' },
  tips: ['Check local weather station data for daily ET rates.', 'Peak ET rates in summer can reach 0.3-0.4 inches/day for many crops.', 'Schedule irrigation based on soil moisture monitoring, not just calendar.', 'Deficit irrigation can save water without significant yield loss for some crops.'],
  faqs: [
    { question: 'What is evapotranspiration (ET)?', answer: 'ET is the combined water loss from soil evaporation and plant transpiration. It determines how much water crops need daily.' },
    { question: 'How much water is an acre-inch?', answer: 'One acre-inch equals 27,154 gallons — enough water to cover one acre one inch deep.' },
  ],
  relatedCalculators: [
    { title: 'Drip Irrigation', href: '/calculators/irrigation/drip-irrigation/' },
    { title: 'Water Cost', href: '/calculators/irrigation/water-cost/' },
    { title: 'Rainfall Deficit', href: '/calculators/irrigation/rainfall-deficit/' },
    { title: 'Sprinkler Coverage', href: '/calculators/irrigation/sprinkler-coverage/' },
    { title: 'Well Yield Calculator', href: '/calculators/irrigation/well-yield/' },
    { title: 'Pipe Flow Rate', href: '/calculators/irrigation/pipe-flow/' },
    { title: 'Pond Size Calculator', href: '/calculators/irrigation/pond-size/' },
  ],
  howToSteps: [
    'Enter the total field size in acres.',
    'Provide the daily evapotranspiration (ET) rate from a weather station or estimate.',
    'Select your irrigation system type to set efficiency.',
    'Click Calculate to see weekly and daily water requirements.',
  ],
  nextSteps: [
    { title: 'Drip Irrigation Calculator', href: '/calculators/irrigation/drip-irrigation' },
    { title: 'Water Cost Calculator', href: '/calculators/irrigation/water-cost' },
    { title: 'Rainfall Deficit Calculator', href: '/calculators/irrigation/rainfall-deficit' },
    { title: 'Fuel Cost Per Acre', href: '/calculators/economics/fuel-cost' },
  ],
  howToUse: 'Enter your field size in acres and the daily evapotranspiration rate from your local weather station or crop ET table. Select your irrigation system type to account for application efficiency. Subtract any recent rainfall to see net irrigation needs.',
  whyItMatters: 'Under-irrigating reduces crop yield and quality, while over-irrigating wastes water, increases pumping costs, and can cause nutrient leaching and root diseases. Matching irrigation to actual crop water demand saves 20-40% on water costs.',
  methodology: 'Net irrigation need = (ET × days) - effective rainfall. Gross need = Net / system efficiency. One acre-inch equals 27,154 gallons. Drip systems are 90-95% efficient, sprinklers 75-85%, and flood/furrow 50-70%.',
  commonMistakes: [
    'Using a fixed irrigation schedule instead of adjusting for actual ET and rainfall.',
    'Not accounting for system efficiency — sprinklers lose 15-25% to evaporation and wind.',
    'Ignoring soil type — sandy soils need more frequent, lighter irrigations than clay soils.',
    'Watering during the heat of the day when evaporation losses are highest.',
  ],
};

const dripIrrigation: CalculatorConfig = {
  slug: 'drip-irrigation', cluster: 'irrigation',
  title: 'Drip Irrigation Calculator',
  description: 'Calculate emitter count, total flow rate, and run time for drip irrigation systems.',
  fields: [
    { id: 'rowLength', label: 'Row Length', type: 'number', placeholder: '500', unit: 'feet', min: 1, required: true },
    { id: 'rows', label: 'Number of Rows', type: 'number', placeholder: '20', min: 1 },
    { id: 'emitterSpacing', label: 'Emitter Spacing', type: 'number', placeholder: '12', unit: 'inches', min: 1 },
    { id: 'flowRate', label: 'Emitter Flow Rate', type: 'number', placeholder: '0.5', unit: 'GPH', min: 0.1, step: 0.1 },
  ],
  calculate: (inputs) => {
    const rowLen = Number(inputs.rowLength) || 0;
    const rows = Number(inputs.rows) || 0;
    const spacing = Number(inputs.emitterSpacing) || 12;
    const flow = Number(inputs.flowRate) || 0.5;
    const emittersPerRow = Math.floor(rowLen / (spacing / 12));
    const totalEmitters = emittersPerRow * rows;
    const totalGPH = totalEmitters * flow;
    const totalGPM = totalGPH / 60;
    return {
      results: [
        { label: 'Total Emitters', value: totalEmitters, unit: 'emitters', color: 'blue' },
        { label: 'Total Flow', value: Math.round(totalGPH * 10) / 10, unit: 'GPH', color: 'orange' },
        { label: 'Flow Rate', value: Math.round(totalGPM * 10) / 10, unit: 'GPM', color: 'green' },
      ],
      totalLabel: 'System flow rate', totalValue: Math.round(totalGPM * 10) / 10, totalUnit: 'GPM',
    };
  },
  seo: { title: 'Drip Irrigation Calculator — Emitters, Flow Rate & Runtime', description: 'Calculate drip irrigation system requirements including emitter count, total flow, and watering time.' },
  tips: ['Maintain 10 PSI minimum pressure at the farthest emitter.', 'Install a filter to prevent clogging.', 'Flush lines regularly to remove sediment.'],
  faqs: [{ question: 'How long should I run drip irrigation?', answer: 'Typically 1-4 hours per zone depending on emitter flow rate, spacing, and crop water needs.' }],
  relatedCalculators: [
    { title: 'Irrigation Water Need', href: '/calculators/irrigation/irrigation-water-need/' },
    { title: 'Water Cost', href: '/calculators/irrigation/water-cost/' },
    { title: 'Sprinkler Coverage', href: '/calculators/irrigation/sprinkler-coverage/' },
    { title: 'Pipe Flow Rate', href: '/calculators/irrigation/pipe-flow/' },
    { title: 'Rainfall Deficit', href: '/calculators/irrigation/rainfall-deficit/' },
    { title: 'Well Yield Calculator', href: '/calculators/irrigation/well-yield/' },
  ],
  howToSteps: [
    'Enter the total row length and number of rows.',
    'Set the emitter spacing in inches.',
    'Provide the emitter flow rate in gallons per hour.',
    'Click Calculate to see total emitters, flow rate, and GPM.',
  ],
  nextSteps: [
    { title: 'Irrigation Water Need', href: '/calculators/irrigation/irrigation-water-need' },
    { title: 'Water Cost Calculator', href: '/calculators/irrigation/water-cost' },
    { title: 'Pipe Flow Rate', href: '/calculators/irrigation/pipe-flow' },
  ],
  howToUse: 'Enter the total row length and number of rows in your field. Set the emitter spacing (typically 12-18 inches for vegetables, 24-36 inches for row crops) and the emitter flow rate in gallons per hour. The calculator shows total emitters needed and system flow requirements.',
  whyItMatters: 'Drip irrigation delivers water directly to the root zone with 90-95% efficiency, reducing water use by 30-50% compared to sprinklers. Proper system sizing prevents pressure loss, uneven watering, and emitter clogging that lead to crop stress and yield loss.',
  methodology: 'Emitters per row = Row length (ft) / (Emitter spacing (in) / 12). Total emitters = Emitters per row × Number of rows. Total GPH = Total emitters × Emitter flow rate. GPM = GPH / 60. These values determine pump and mainline sizing.',
  commonMistakes: [
    'Undersizing the water supply — total GPM demand must not exceed pump or well capacity.',
    'Using emitter spacing that does not match crop root zone width.',
    'Skipping pressure regulation — pressure variations cause uneven water distribution.',
    'Not installing filters, which leads to clogged emitters and dead plants.',
  ],
};

const sprinklerCoverage: CalculatorConfig = {
  slug: 'sprinkler-coverage', cluster: 'irrigation',
  title: 'Sprinkler Coverage Calculator',
  description: 'Calculate total coverage area and flow requirements for sprinkler irrigation systems.',
  fields: [
    { id: 'sprinklerCount', label: 'Number of Sprinklers', type: 'number', placeholder: '10', min: 1, required: true },
    { id: 'radius', label: 'Sprinkler Radius', type: 'number', placeholder: '40', unit: 'feet', min: 1 },
    { id: 'flowRate', label: 'Flow Per Sprinkler', type: 'number', placeholder: '5', unit: 'GPM', min: 0.1 },
    { id: 'spacing', label: 'Sprinkler Spacing', type: 'number', placeholder: '40', unit: 'feet', min: 1 },
  ],
  calculate: (inputs) => {
    const count = Number(inputs.sprinklerCount) || 0;
    const radius = Number(inputs.radius) || 0;
    const flow = Number(inputs.flowRate) || 0;
    const spacing = Number(inputs.spacing) || 40;
    const coveragePerHead = Math.PI * radius * radius;
    const effectiveCoverage = count * spacing * spacing;
    const totalFlow = count * flow;
    return {
      results: [
        { label: 'Effective Coverage', value: Math.round(effectiveCoverage), unit: 'sq ft', color: 'blue' },
        { label: 'Total Flow', value: Math.round(totalFlow * 10) / 10, unit: 'GPM', color: 'orange' },
        { label: 'Coverage Per Head', value: Math.round(coveragePerHead), unit: 'sq ft', color: 'green' },
      ],
      totalLabel: 'Total flow requirement', totalValue: Math.round(totalFlow * 10) / 10, totalUnit: 'GPM',
    };
  },
  seo: { title: 'Sprinkler Coverage Calculator — Irrigation System Design', description: 'Calculate sprinkler coverage area and flow requirements. Design your irrigation system layout.' },
  tips: ['Overlap sprinkler patterns 50-60% for uniform coverage.', 'Wind reduces effective radius — increase spacing overlap on windy sites.'],
  faqs: [{ question: 'How far apart should sprinklers be spaced?', answer: '50-60% of the sprinkler diameter. For a 40-ft radius sprinkler, space at 40-48 feet.' }],
  relatedCalculators: [
    { title: 'Irrigation Water Need', href: '/calculators/irrigation/irrigation-water-need/' },
    { title: 'Drip Irrigation', href: '/calculators/irrigation/drip-irrigation/' },
    { title: 'Pipe Flow Rate', href: '/calculators/irrigation/pipe-flow/' },
    { title: 'Water Cost', href: '/calculators/irrigation/water-cost/' },
    { title: 'Well Yield Calculator', href: '/calculators/irrigation/well-yield/' },
    { title: 'Rainfall Deficit', href: '/calculators/irrigation/rainfall-deficit/' },
  ],
  howToSteps: [
    'Enter the number of sprinkler heads in the system.',
    'Set the sprinkler radius and spacing in feet.',
    'Provide the flow rate per sprinkler head.',
    'Click Calculate to see total coverage area and flow requirements.',
  ],
  nextSteps: [
    { title: 'Irrigation Water Need', href: '/calculators/irrigation/irrigation-water-need' },
    { title: 'Pipe Flow Rate', href: '/calculators/irrigation/pipe-flow' },
    { title: 'Water Cost Calculator', href: '/calculators/irrigation/water-cost' },
  ],
  howToUse: 'Enter the number of sprinkler heads in your system and the throw radius of each head in feet. Set the spacing between heads and the flow rate per head in GPM. The calculator shows effective coverage area and total system flow demand.',
  whyItMatters: 'Poor sprinkler layout creates dry spots that stress crops and wet spots that promote disease. Proper head spacing and overlap ensure uniform water distribution, which directly affects crop uniformity, yield consistency, and water use efficiency.',
  methodology: 'Effective coverage per head uses spacing × spacing rather than the full circular area, because heads must overlap. Total coverage = Number of heads × Spacing². Total flow = Number of heads × Flow per head (GPM). Overlap of 50-60% of diameter ensures uniform application.',
  commonMistakes: [
    'Spacing heads too far apart — gaps cause dry spots and uneven crop growth.',
    'Not accounting for wind drift, which reduces effective radius by 10-30%.',
    'Running too many heads on one zone, exceeding available water pressure and flow.',
    'Using mismatched nozzle sizes across a zone, creating uneven precipitation rates.',
  ],
};

const waterCost: CalculatorConfig = {
  slug: 'water-cost', cluster: 'irrigation',
  title: 'Water Cost Calculator',
  description: 'Calculate irrigation water costs based on volume and water price.',
  fields: [
    { id: 'gallons', label: 'Water Volume', type: 'number', placeholder: '500000', unit: 'gallons', min: 0, required: true },
    { id: 'pricePerThousand', label: 'Price Per 1000 Gallons', type: 'number', placeholder: '3.50', unit: '$', min: 0, step: 0.01 },
    { id: 'acres', label: 'Field Size (optional)', type: 'number', placeholder: '40', unit: 'acres', min: 0 },
  ],
  calculate: (inputs) => {
    const gallons = Number(inputs.gallons) || 0;
    const price = Number(inputs.pricePerThousand) || 0;
    const acres = Number(inputs.acres) || 1;
    const totalCost = (gallons / 1000) * price;
    const costPerAcre = acres > 0 ? totalCost / acres : totalCost;
    const acreInches = gallons / 27154;
    return {
      results: [
        { label: 'Total Cost', value: Math.round(totalCost * 100) / 100, unit: '$', color: 'blue' },
        { label: 'Cost Per Acre', value: Math.round(costPerAcre * 100) / 100, unit: '$', color: 'orange' },
        { label: 'Acre-Inches', value: Math.round(acreInches * 10) / 10, unit: 'ac-in', color: 'green' },
      ],
      totalLabel: 'Total water cost', totalValue: Math.round(totalCost * 100) / 100, totalUnit: '$',
    };
  },
  seo: { title: 'Irrigation Water Cost Calculator — Cost Per Acre', description: 'Calculate irrigation water costs per acre and per acre-inch. Compare municipal, well, and canal water expenses for your farm.' },
  tips: ['Municipal water costs $2-8 per 1000 gallons.', 'Well water costs $0.50-2.00 per 1000 gallons (pumping only).'],
  faqs: [{ question: 'How much does irrigation water cost?', answer: 'Costs vary widely: well water $0.50-2.00/1000 gal, municipal $2-8/1000 gal, canal water $15-100/acre-foot.' }],
  relatedCalculators: [
    { title: 'Irrigation Water Need', href: '/calculators/irrigation/irrigation-water-need/' },
    { title: 'Drip Irrigation', href: '/calculators/irrigation/drip-irrigation/' },
    { title: 'Sprinkler Coverage', href: '/calculators/irrigation/sprinkler-coverage/' },
    { title: 'Rainfall Deficit', href: '/calculators/irrigation/rainfall-deficit/' },
    { title: 'Well Yield Calculator', href: '/calculators/irrigation/well-yield/' },
    { title: 'Pond Size Calculator', href: '/calculators/irrigation/pond-size/' },
    { title: 'Farm Profit & Loss', href: '/calculators/economics/farm-profit-loss/' },
  ],
  howToSteps: [
    'Enter the total water volume in gallons.',
    'Provide the price per 1,000 gallons from your water source.',
    'Optionally enter your field size in acres for per-acre cost.',
    'Click Calculate to see total cost, cost per acre, and acre-inches.',
  ],
  nextSteps: [
    { title: 'Irrigation Water Need', href: '/calculators/irrigation/irrigation-water-need' },
    { title: 'Rainfall Deficit Calculator', href: '/calculators/irrigation/rainfall-deficit' },
    { title: 'Farm Profit & Loss', href: '/calculators/economics/farm-profit-loss' },
    { title: 'Cost Per Acre', href: '/calculators/economics/cost-per-acre' },
  ],
  howToUse: 'Enter the total water volume you plan to use in gallons and the price per 1,000 gallons from your water supplier or estimated pumping cost. Optionally enter your field size to see cost per acre. The calculator shows total cost and acre-inches applied.',
  whyItMatters: 'Water is often the second-largest variable cost in irrigated agriculture after fertilizer. Knowing your exact cost per acre-inch helps you compare irrigation methods, justify efficiency upgrades, and budget accurately for the growing season.',
  methodology: 'Total cost = (Gallons / 1,000) × Price per 1,000 gallons. Cost per acre = Total cost / Acres. Acre-inches = Gallons / 27,154. Municipal water typically costs $2-8 per 1,000 gallons, while well water pumping costs $0.50-2.00 per 1,000 gallons.',
  commonMistakes: [
    'Forgetting to include electricity or diesel pumping costs for well water.',
    'Not tracking water use by field — some fields may cost far more to irrigate than they return.',
    'Ignoring seasonal rate increases from municipal water suppliers during peak demand.',
    'Failing to factor in water cost when comparing drip vs sprinkler system investments.',
  ],
};

const pipeFlow: CalculatorConfig = {
  slug: 'pipe-flow', cluster: 'irrigation',
  title: 'Pipe Flow Rate Calculator',
  description: 'Calculate water flow rate through a pipe based on diameter and velocity.',
  fields: [
    { id: 'diameter', label: 'Pipe Diameter', type: 'number', placeholder: '4', unit: 'inches', min: 0.25, step: 0.25, required: true },
    { id: 'velocity', label: 'Water Velocity', type: 'number', placeholder: '5', unit: 'ft/sec', min: 0.1, step: 0.1 },
  ],
  calculate: (inputs) => {
    const d = Number(inputs.diameter) || 0;
    const v = Number(inputs.velocity) || 0;
    const radiusFt = (d / 2) / 12;
    const areaFt2 = Math.PI * radiusFt * radiusFt;
    const cfs = areaFt2 * v;
    const gpm = cfs * 448.83;
    const gph = gpm * 60;
    return {
      results: [
        { label: 'Flow Rate', value: Math.round(gpm * 10) / 10, unit: 'GPM', color: 'blue' },
        { label: 'Gallons Per Hour', value: Math.round(gph), unit: 'GPH', color: 'orange' },
        { label: 'Cubic Ft/Sec', value: Math.round(cfs * 1000) / 1000, unit: 'CFS', color: 'green' },
      ],
      totalLabel: 'Flow rate', totalValue: Math.round(gpm * 10) / 10, totalUnit: 'GPM',
    };
  },
  seo: { title: 'Pipe Flow Rate Calculator — GPM from Pipe Size', description: 'Calculate water flow rate (GPM) from pipe diameter and velocity. Size pipes for irrigation systems.' },
  tips: ['Keep velocity between 3-7 ft/sec to avoid erosion and excessive friction.', 'Larger pipes reduce friction loss but cost more.'],
  faqs: [{ question: 'What is a safe pipe velocity?', answer: '3-5 ft/sec for PVC, up to 7 ft/sec for metal pipe. Higher velocities increase wear and friction loss.' }],
  relatedCalculators: [
    { title: 'Well Yield', href: '/calculators/irrigation/well-yield/' },
    { title: 'Drip Irrigation', href: '/calculators/irrigation/drip-irrigation/' },
    { title: 'Sprinkler Coverage', href: '/calculators/irrigation/sprinkler-coverage/' },
    { title: 'Irrigation Water Need', href: '/calculators/irrigation/irrigation-water-need/' },
    { title: 'Water Cost', href: '/calculators/irrigation/water-cost/' },
    { title: 'Pond Size Calculator', href: '/calculators/irrigation/pond-size/' },
  ],
  howToSteps: [
    'Enter the pipe diameter in inches.',
    'Provide the water velocity in feet per second.',
    'Click Calculate to see flow rate in GPM, GPH, and CFS.',
  ],
  nextSteps: [
    { title: 'Well Yield Calculator', href: '/calculators/irrigation/well-yield' },
    { title: 'Drip Irrigation Calculator', href: '/calculators/irrigation/drip-irrigation' },
    { title: 'Sprinkler Coverage', href: '/calculators/irrigation/sprinkler-coverage' },
  ],
  howToUse: 'Enter the inside diameter of your pipe in inches and the water velocity in feet per second. If you do not know the velocity, use 5 ft/sec as a common design target. The calculator converts pipe cross-section and velocity into flow rate in GPM, GPH, and CFS.',
  whyItMatters: 'Undersized pipe creates excessive friction loss, reducing pressure at sprinklers or emitters and causing uneven irrigation. Oversized pipe wastes money on materials. Correct pipe sizing ensures adequate flow and pressure throughout the entire system.',
  methodology: 'Flow area = π × (Diameter/2)² in square feet. Flow rate (CFS) = Area × Velocity. GPM = CFS × 448.83. GPH = GPM × 60. Recommended velocity is 3-5 ft/sec for PVC to minimize friction loss and water hammer risk.',
  commonMistakes: [
    'Using nominal pipe size instead of actual inside diameter — a 4-inch PVC pipe has a 4.026-inch ID.',
    'Designing for velocity above 5 ft/sec in PVC, which increases water hammer and pipe failure risk.',
    'Not accounting for friction loss over long pipe runs — pressure drops significantly over distance.',
    'Ignoring elevation changes, which add or subtract 0.433 PSI per foot of elevation difference.',
  ],
};

const rainfallDeficit: CalculatorConfig = {
  slug: 'rainfall-deficit', cluster: 'irrigation',
  title: 'Rainfall Deficit Calculator',
  description: 'Calculate irrigation needs by comparing crop water demand to actual rainfall.',
  fields: [
    { id: 'weeklyET', label: 'Weekly Crop ET', type: 'number', placeholder: '1.5', unit: 'inches', min: 0, step: 0.1, required: true },
    { id: 'weeklyRain', label: 'Weekly Rainfall', type: 'number', placeholder: '0.5', unit: 'inches', min: 0, step: 0.1 },
    { id: 'weeks', label: 'Growing Season Length', type: 'number', placeholder: '20', unit: 'weeks', min: 1 },
  ],
  calculate: (inputs) => {
    const et = Number(inputs.weeklyET) || 0;
    const rain = Number(inputs.weeklyRain) || 0;
    const weeks = Number(inputs.weeks) || 0;
    const weeklyDeficit = Math.max(0, et - rain);
    const totalDeficit = weeklyDeficit * weeks;
    const totalGallonsPerAcre = totalDeficit * 27154;
    return {
      results: [
        { label: 'Weekly Deficit', value: Math.round(weeklyDeficit * 100) / 100, unit: 'inches', color: 'blue' },
        { label: 'Season Total Deficit', value: Math.round(totalDeficit * 10) / 10, unit: 'inches', color: 'orange' },
        { label: 'Gallons Per Acre', value: Math.round(totalGallonsPerAcre), unit: 'gal/acre', color: 'green' },
      ],
      totalLabel: 'Total irrigation needed', totalValue: Math.round(totalDeficit * 10) / 10, totalUnit: 'inches',
    };
  },
  seo: { title: 'Rainfall Deficit Calculator — Irrigation Planning', description: 'Calculate irrigation needs from rainfall deficit. Compare crop water demand to actual precipitation.' },
  tips: ['Not all rainfall is effective — heavy rains may run off without infiltrating.', 'Use soil moisture sensors for precise irrigation scheduling.'],
  faqs: [{ question: 'What is effective rainfall?', answer: 'About 75% of light-moderate rainfall is effective. Heavy rains (>1 inch) may have only 50-60% effectiveness due to runoff.' }],
  relatedCalculators: [
    { title: 'Irrigation Water Need', href: '/calculators/irrigation/irrigation-water-need/' },
    { title: 'Water Cost', href: '/calculators/irrigation/water-cost/' },
    { title: 'Drip Irrigation', href: '/calculators/irrigation/drip-irrigation/' },
    { title: 'Sprinkler Coverage', href: '/calculators/irrigation/sprinkler-coverage/' },
    { title: 'Pond Size Calculator', href: '/calculators/irrigation/pond-size/' },
    { title: 'Well Yield Calculator', href: '/calculators/irrigation/well-yield/' },
  ],
  howToSteps: [
    'Enter the weekly crop evapotranspiration (ET) in inches.',
    'Provide the average weekly rainfall in inches.',
    'Set the growing season length in weeks.',
    'Click Calculate to see the weekly deficit and total irrigation needed.',
  ],
  nextSteps: [
    { title: 'Irrigation Water Need', href: '/calculators/irrigation/irrigation-water-need' },
    { title: 'Water Cost Calculator', href: '/calculators/irrigation/water-cost' },
    { title: 'Pond Size Calculator', href: '/calculators/irrigation/pond-size' },
  ],
  howToUse: 'Enter the weekly crop evapotranspiration (ET) from your local extension office or weather station data. Enter the average weekly rainfall for the same period. Set the growing season length in weeks. The calculator shows how much supplemental irrigation you need.',
  whyItMatters: 'Rainfall rarely matches crop water demand perfectly. Knowing your seasonal deficit helps you plan water storage, well capacity, and irrigation system sizing before the growing season starts, preventing mid-season water shortages that devastate yields.',
  methodology: 'Weekly deficit = Weekly ET - Weekly rainfall (minimum 0). Season total deficit = Weekly deficit × Number of weeks. Gallons per acre = Total deficit (inches) × 27,154. Not all rainfall is effective — only 50-75% of heavy rain infiltrates the root zone.',
  commonMistakes: [
    'Assuming all rainfall is effective — heavy storms produce runoff, not root zone moisture.',
    'Using annual average rainfall instead of weekly data during the actual growing season.',
    'Not adjusting ET for crop growth stage — peak water demand occurs at reproductive stages.',
    'Ignoring that ET varies significantly by region, crop, and time of year.',
  ],
};

const pondSize: CalculatorConfig = {
  slug: 'pond-size', cluster: 'irrigation',
  title: 'Pond Size Calculator',
  description: 'Calculate pond volume in gallons and acre-feet from surface area and depth.',
  fields: [
    { id: 'surfaceArea', label: 'Surface Area', type: 'number', placeholder: '10000', unit: 'sq ft', min: 1, required: true },
    { id: 'avgDepth', label: 'Average Depth', type: 'number', placeholder: '6', unit: 'feet', min: 0.5, step: 0.5 },
  ],
  calculate: (inputs) => {
    const area = Number(inputs.surfaceArea) || 0;
    const depth = Number(inputs.avgDepth) || 0;
    const cubicFt = area * depth;
    const gallons = cubicFt * 7.481;
    const acreFeet = cubicFt / 43560;
    return {
      results: [
        { label: 'Volume', value: Math.round(gallons), unit: 'gallons', color: 'blue' },
        { label: 'Acre-Feet', value: Math.round(acreFeet * 100) / 100, unit: 'ac-ft', color: 'orange' },
        { label: 'Cubic Feet', value: Math.round(cubicFt), unit: 'cu ft', color: 'green' },
      ],
      totalLabel: 'Pond volume', totalValue: Math.round(gallons), totalUnit: 'gallons',
    };
  },
  seo: { title: 'Pond Size Calculator — Volume in Gallons & Acre-Feet', description: 'Calculate pond volume from surface area and depth. Convert to gallons and acre-feet.' },
  tips: ['Farm ponds should be at least 8 feet deep to reduce aquatic weed growth.', 'Allow for 1-2 feet of evaporation loss per year in the design.'],
  faqs: [{ question: 'How big should a farm pond be?', answer: 'For irrigation, plan 1 acre-foot (325,851 gallons) of storage per acre irrigated per application.' }],
  relatedCalculators: [
    { title: 'Water Tank', href: '/calculators/irrigation/water-tank/' },
    { title: 'Irrigation Water Need', href: '/calculators/irrigation/irrigation-water-need/' },
    { title: 'Water Cost', href: '/calculators/irrigation/water-cost/' },
    { title: 'Rainfall Deficit', href: '/calculators/irrigation/rainfall-deficit/' },
    { title: 'Well Yield Calculator', href: '/calculators/irrigation/well-yield/' },
    { title: 'Drip Irrigation', href: '/calculators/irrigation/drip-irrigation/' },
  ],
  howToSteps: [
    'Enter the pond surface area in square feet.',
    'Provide the average pond depth in feet.',
    'Click Calculate to see volume in gallons, acre-feet, and cubic feet.',
  ],
  nextSteps: [
    { title: 'Water Tank Calculator', href: '/calculators/irrigation/water-tank' },
    { title: 'Irrigation Water Need', href: '/calculators/irrigation/irrigation-water-need' },
    { title: 'Water Cost Calculator', href: '/calculators/irrigation/water-cost' },
  ],
  howToUse: 'Enter the surface area of your pond in square feet and the average depth in feet. For irregular ponds, estimate the average depth by measuring several points. The calculator converts dimensions to volume in gallons, acre-feet, and cubic feet.',
  whyItMatters: 'Farm ponds are critical for irrigation water storage, livestock watering, and fire protection. Accurate volume estimation ensures you have enough water to cover irrigation needs through dry periods and helps size pumps and delivery systems correctly.',
  methodology: 'Volume (cu ft) = Surface area (sq ft) × Average depth (ft). Gallons = Cubic feet × 7.481. Acre-feet = Cubic feet / 43,560. One acre-foot equals 325,851 gallons and can irrigate roughly 1 acre with 12 inches of water.',
  commonMistakes: [
    'Overestimating average depth — ponds are typically shallower at edges than the center.',
    'Not accounting for evaporation loss, which can be 3-6 feet per year in arid climates.',
    'Forgetting that sediment accumulation reduces usable volume by 1-3% per year.',
    'Assuming the full pond volume is available — you cannot pump below the intake level.',
  ],
};

const waterTank: CalculatorConfig = {
  slug: 'water-tank', cluster: 'irrigation',
  title: 'Water Tank Calculator',
  description: 'Calculate water tank capacity in gallons from tank dimensions.',
  fields: [
    { id: 'shape', label: 'Tank Shape', type: 'select', options: [
      { value: 'round', label: 'Round (Cylindrical)' }, { value: 'rectangular', label: 'Rectangular' },
    ] },
    { id: 'diameter', label: 'Diameter (round) or Length', type: 'number', placeholder: '10', unit: 'feet', min: 0.5, required: true },
    { id: 'width', label: 'Width (rectangular only)', type: 'number', placeholder: '8', unit: 'feet', min: 0.5 },
    { id: 'height', label: 'Height', type: 'number', placeholder: '8', unit: 'feet', min: 0.5 },
  ],
  calculate: (inputs) => {
    const shape = String(inputs.shape || 'round');
    const d = Number(inputs.diameter) || 0;
    const w = Number(inputs.width) || 0;
    const h = Number(inputs.height) || 0;
    let cubicFt = 0;
    if (shape === 'round') { cubicFt = Math.PI * (d / 2) * (d / 2) * h; }
    else { cubicFt = d * w * h; }
    const gallons = cubicFt * 7.481;
    return {
      results: [
        { label: 'Capacity', value: Math.round(gallons), unit: 'gallons', color: 'blue' },
        { label: 'Volume', value: Math.round(cubicFt * 10) / 10, unit: 'cu ft', color: 'orange' },
      ],
      totalLabel: 'Tank capacity', totalValue: Math.round(gallons), totalUnit: 'gallons',
    };
  },
  seo: { title: 'Water Tank Calculator — Tank Capacity in Gallons', description: 'Calculate water tank capacity in gallons. Round or rectangular tanks.' },
  tips: ['Allow 10-15% extra capacity for expansion and overflow.', 'Elevated tanks provide gravity-fed pressure for irrigation.'],
  faqs: [{ question: 'How many gallons in a 10-foot round tank?', answer: 'A 10-ft diameter, 8-ft tall round tank holds about 4,696 gallons.' }],
  relatedCalculators: [
    { title: 'Pond Size', href: '/calculators/irrigation/pond-size/' },
    { title: 'Well Yield Calculator', href: '/calculators/irrigation/well-yield/' },
    { title: 'Irrigation Water Need', href: '/calculators/irrigation/irrigation-water-need/' },
    { title: 'Pipe Flow Rate', href: '/calculators/irrigation/pipe-flow/' },
    { title: 'Water Cost', href: '/calculators/irrigation/water-cost/' },
    { title: 'Drip Irrigation', href: '/calculators/irrigation/drip-irrigation/' },
  ],
  howToSteps: [
    'Select the tank shape (round or rectangular).',
    'Enter the diameter (or length) and height in feet.',
    'For rectangular tanks, also enter the width.',
    'Click Calculate to see capacity in gallons and cubic feet.',
  ],
  nextSteps: [
    { title: 'Pond Size Calculator', href: '/calculators/irrigation/pond-size' },
    { title: 'Irrigation Water Need', href: '/calculators/irrigation/irrigation-water-need' },
    { title: 'Well Yield Calculator', href: '/calculators/irrigation/well-yield' },
  ],
  howToUse: 'Select the tank shape — round (cylindrical) or rectangular. For round tanks, enter the diameter and height. For rectangular tanks, enter the length, width, and height. All dimensions should be in feet. The calculator shows capacity in gallons and cubic feet.',
  whyItMatters: 'Knowing your exact tank capacity prevents overflows, ensures adequate water storage for irrigation cycles, and helps you calculate how long stored water will last at your planned application rate. Proper sizing also avoids wasting money on oversized tanks.',
  methodology: 'Round tank volume = π × (Diameter/2)² × Height in cubic feet. Rectangular tank volume = Length × Width × Height. Gallons = Cubic feet × 7.481. One cubic foot holds 7.481 gallons. A 10-ft diameter, 8-ft tall round tank holds about 4,696 gallons.',
  commonMistakes: [
    'Confusing radius and diameter — make sure you enter the full diameter, not the radius.',
    'Not allowing for 10-15% headspace to prevent overflow.',
    'Forgetting that elevated tanks lose capacity to the stand height but gain pressure.',
    'Ignoring the weight of water — water weighs 8.34 lbs/gallon, so a 5,000-gallon tank weighs over 20 tons when full.',
  ],
};

const wellYield: CalculatorConfig = {
  slug: 'well-yield', cluster: 'irrigation',
  title: 'Well Yield Calculator',
  description: 'Calculate well yield in GPM and daily capacity from a pump test.',
  fields: [
    { id: 'gallonsPumped', label: 'Gallons Pumped', type: 'number', placeholder: '500', unit: 'gallons', min: 1, required: true },
    { id: 'testMinutes', label: 'Test Duration', type: 'number', placeholder: '60', unit: 'minutes', min: 1 },
  ],
  calculate: (inputs) => {
    const gallons = Number(inputs.gallonsPumped) || 0;
    const minutes = Number(inputs.testMinutes) || 1;
    const gpm = gallons / minutes;
    const gph = gpm * 60;
    const gpd = gph * 24;
    return {
      results: [
        { label: 'Gallons Per Minute', value: Math.round(gpm * 100) / 100, unit: 'GPM', color: 'blue' },
        { label: 'Gallons Per Hour', value: Math.round(gph), unit: 'GPH', color: 'orange' },
        { label: 'Gallons Per Day', value: Math.round(gpd), unit: 'GPD', color: 'green' },
      ],
      totalLabel: 'Well yield', totalValue: Math.round(gpm * 100) / 100, totalUnit: 'GPM',
    };
  },
  seo: { title: 'Well Yield Calculator — GPM from Pump Test', description: 'Calculate well yield in gallons per minute from a pump test. Determine if your well can support irrigation or livestock water needs.' },
  tips: ['A sustained yield test should run at least 4-8 hours for accuracy.', 'Well yield may decrease during drought — test during dry periods.', 'Match pump size to actual well yield, not maximum pump capacity.'],
  faqs: [{ question: 'How many GPM do I need for irrigation?', answer: 'Rule of thumb: 5-10 GPM per acre for sprinkler irrigation, 2-5 GPM per acre for drip.' }],
  relatedCalculators: [
    { title: 'Pipe Flow', href: '/calculators/irrigation/pipe-flow/' },
    { title: 'Irrigation Water Need', href: '/calculators/irrigation/irrigation-water-need/' },
    { title: 'Water Cost', href: '/calculators/irrigation/water-cost/' },
    { title: 'Pond Size Calculator', href: '/calculators/irrigation/pond-size/' },
    { title: 'Water Tank', href: '/calculators/irrigation/water-tank/' },
    { title: 'Drip Irrigation', href: '/calculators/irrigation/drip-irrigation/' },
    { title: 'Sprinkler Coverage', href: '/calculators/irrigation/sprinkler-coverage/' },
  ],
  howToSteps: [
    'Enter the gallons pumped during a timed test.',
    'Provide the test duration in minutes.',
    'Click Calculate to see well yield in GPM, GPH, and GPD.',
  ],
  nextSteps: [
    { title: 'Pipe Flow Rate', href: '/calculators/irrigation/pipe-flow' },
    { title: 'Irrigation Water Need', href: '/calculators/irrigation/irrigation-water-need' },
    { title: 'Water Cost Calculator', href: '/calculators/irrigation/water-cost' },
    { title: 'Farm Profit & Loss', href: '/calculators/economics/farm-profit-loss' },
  ],
  howToUse: 'Run a timed pump test by pumping into a container of known volume or using a flow meter. Enter the total gallons pumped and the test duration in minutes. The calculator converts your test data into gallons per minute, per hour, and per day.',
  whyItMatters: 'Well yield determines whether your water source can support your irrigation system. A well that cannot keep up with demand causes pump cavitation, well damage, and crop stress. Testing during dry periods gives the most conservative and reliable estimate.',
  methodology: 'GPM = Gallons pumped / Test duration (minutes). GPH = GPM × 60. GPD = GPH × 24. A proper sustained yield test should run 4-8 hours to account for aquifer drawdown. Short tests overestimate actual sustainable yield.',
  commonMistakes: [
    'Running a pump test for only 15-30 minutes — short tests overestimate sustainable yield by 20-50%.',
    'Testing in spring when water tables are high instead of late summer when demand is greatest.',
    'Not monitoring drawdown — if water level drops steadily, the well may not sustain that rate.',
    'Sizing the irrigation system to maximum well yield with no safety margin for drought years.',
  ],
};

export const irrigationConfigs: CalculatorConfig[] = [
  irrigationWaterNeed, dripIrrigation, sprinklerCoverage, waterCost, pipeFlow,
  rainfallDeficit, pondSize, waterTank, wellYield,
];
