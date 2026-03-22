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
  seo: { title: 'Irrigation Water Need Calculator — Crop Water Requirements', description: 'Calculate irrigation water needs based on ET rate, system efficiency, and rainfall. Plan your water management.' },
  tips: ['Check local weather station data for daily ET rates.', 'Peak ET rates in summer can reach 0.3-0.4 inches/day for many crops.', 'Schedule irrigation based on soil moisture monitoring, not just calendar.', 'Deficit irrigation can save water without significant yield loss for some crops.'],
  faqs: [
    { question: 'What is evapotranspiration (ET)?', answer: 'ET is the combined water loss from soil evaporation and plant transpiration. It determines how much water crops need daily.' },
    { question: 'How much water is an acre-inch?', answer: 'One acre-inch equals 27,154 gallons — enough water to cover one acre one inch deep.' },
  ],
  relatedCalculators: [
    { title: 'Drip Irrigation', href: '/calculators/irrigation/drip-irrigation' },
    { title: 'Water Cost', href: '/calculators/irrigation/water-cost' },
    { title: 'Rainfall Deficit', href: '/calculators/irrigation/rainfall-deficit' },
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
  relatedCalculators: [{ title: 'Irrigation Water Need', href: '/calculators/irrigation/irrigation-water-need' }, { title: 'Water Cost', href: '/calculators/irrigation/water-cost' }],
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
  relatedCalculators: [{ title: 'Irrigation Water Need', href: '/calculators/irrigation/irrigation-water-need' }],
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
  seo: { title: 'Water Cost Calculator — Irrigation Expenses', description: 'Calculate irrigation water costs. Estimate expenses per acre and per acre-inch of water applied.' },
  tips: ['Municipal water costs $2-8 per 1000 gallons.', 'Well water costs $0.50-2.00 per 1000 gallons (pumping only).'],
  faqs: [{ question: 'How much does irrigation water cost?', answer: 'Costs vary widely: well water $0.50-2.00/1000 gal, municipal $2-8/1000 gal, canal water $15-100/acre-foot.' }],
  relatedCalculators: [{ title: 'Irrigation Water Need', href: '/calculators/irrigation/irrigation-water-need' }],
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
  relatedCalculators: [{ title: 'Well Yield', href: '/calculators/irrigation/well-yield' }],
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
  relatedCalculators: [{ title: 'Irrigation Water Need', href: '/calculators/irrigation/irrigation-water-need' }, { title: 'Water Cost', href: '/calculators/irrigation/water-cost' }],
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
  relatedCalculators: [{ title: 'Water Tank', href: '/calculators/irrigation/water-tank' }],
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
  relatedCalculators: [{ title: 'Pond Size', href: '/calculators/irrigation/pond-size' }],
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
  seo: { title: 'Well Yield Calculator — GPM Test Results', description: 'Calculate well yield in GPM from pump test. Determine if your well can support irrigation needs.' },
  tips: ['A sustained yield test should run at least 4-8 hours for accuracy.', 'Well yield may decrease during drought — test during dry periods.', 'Match pump size to actual well yield, not maximum pump capacity.'],
  faqs: [{ question: 'How many GPM do I need for irrigation?', answer: 'Rule of thumb: 5-10 GPM per acre for sprinkler irrigation, 2-5 GPM per acre for drip.' }],
  relatedCalculators: [{ title: 'Pipe Flow', href: '/calculators/irrigation/pipe-flow' }, { title: 'Irrigation Water Need', href: '/calculators/irrigation/irrigation-water-need' }],
};

export const irrigationConfigs: CalculatorConfig[] = [
  irrigationWaterNeed, dripIrrigation, sprinklerCoverage, waterCost, pipeFlow,
  rainfallDeficit, pondSize, waterTank, wellYield,
];
