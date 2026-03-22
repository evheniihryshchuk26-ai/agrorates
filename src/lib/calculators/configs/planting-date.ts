import type { CalculatorConfig } from '../types';

/* ------------------------------------------------------------------ */
/*  Shared field definitions                                          */
/* ------------------------------------------------------------------ */

const usdaZoneField = {
  id: 'usdaZone',
  label: 'USDA Hardiness Zone',
  type: 'select' as const,
  required: true,
  helpText: 'Select your USDA plant hardiness zone (3–10).',
  options: [
    { value: '3', label: 'Zone 3' },
    { value: '4', label: 'Zone 4' },
    { value: '5', label: 'Zone 5' },
    { value: '6', label: 'Zone 6' },
    { value: '7', label: 'Zone 7' },
    { value: '8', label: 'Zone 8' },
    { value: '9', label: 'Zone 9' },
    { value: '10', label: 'Zone 10' },
  ],
  defaultValue: '6',
};

const lastFrostDateField = {
  id: 'lastFrostDate',
  label: 'Last Spring Frost Month',
  type: 'select' as const,
  required: true,
  helpText: 'Approximate month of your last spring frost.',
  options: [
    { value: '1', label: 'January' },
    { value: '2', label: 'February' },
    { value: '3', label: 'March' },
    { value: '4', label: 'April' },
    { value: '5', label: 'May' },
    { value: '6', label: 'June' },
    { value: '7', label: 'July' },
    { value: '8', label: 'August' },
    { value: '9', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' },
  ],
  defaultValue: '4',
};

const startMethodField = {
  id: 'startMethod',
  label: 'Start Method',
  type: 'select' as const,
  required: true,
  helpText: 'How you plan to start the crop.',
  options: [
    { value: 'direct-sow', label: 'Direct Sow' },
    { value: 'transplant', label: 'Transplant' },
    { value: 'both', label: 'Both' },
  ],
  defaultValue: 'both',
};

/* ------------------------------------------------------------------ */
/*  Frost-date look-up by USDA zone (approximate day-of-year)         */
/* ------------------------------------------------------------------ */

const lastFrostDOY: Record<string, number> = {
  '3': 140, // ~May 20
  '4': 130, // ~May 10
  '5': 120, // ~Apr 30
  '6': 110, // ~Apr 20
  '7': 100, // ~Apr 10
  '8': 80,  // ~Mar 21
  '9': 60,  // ~Mar 1
  '10': 30, // ~Jan 30
};

const firstFallFrostDOY: Record<string, number> = {
  '3': 250,  // ~Sep 7
  '4': 265,  // ~Sep 22
  '5': 280,  // ~Oct 7
  '6': 290,  // ~Oct 17
  '7': 300,  // ~Oct 27
  '8': 320,  // ~Nov 16
  '9': 340,  // ~Dec 6
  '10': 360, // ~Dec 26
};

/* ------------------------------------------------------------------ */
/*  Factory                                                           */
/* ------------------------------------------------------------------ */

type FrostTolerance = 'hardy' | 'semi-hardy' | 'tender' | 'very-tender';

interface PlantingDateParams {
  slug: string;
  cropName: string;
  frostTolerance: FrostTolerance;
  daysBeforeLastFrost: number;
  daysToMaturity: number;
  optimalSoilTemp: number;
  indoorStartWeeks?: number;
  plantingDepth?: string;
  quickFacts?: { label: string; value: string }[];
  tips: string[];
  relatedCrops: { title: string; href: string }[];
  faqs: { question: string; answer: string }[];
}

function frostToleranceOffset(ft: FrostTolerance): number {
  switch (ft) {
    case 'hardy': return -28;
    case 'semi-hardy': return -14;
    case 'tender': return 0;
    case 'very-tender': return 14;
  }
}

function clampDOY(d: number): number {
  if (d < 1) return d + 365;
  if (d > 365) return d - 365;
  return Math.round(d);
}

function createPlantingDateConfig(p: PlantingDateParams): CalculatorConfig {
  const indoorWeeks = p.indoorStartWeeks ?? (p.frostTolerance === 'tender' || p.frostTolerance === 'very-tender' ? 6 : 4);
  const depth = p.plantingDepth ?? '1/2 inch';

  const baseQuickFacts: { label: string; value: string }[] = [
    { label: 'Optimal Soil Temp', value: `${p.optimalSoilTemp}°F` },
    { label: 'Days to Maturity', value: `${p.daysToMaturity} days` },
    { label: 'Frost Tolerance', value: p.frostTolerance.replace('-', ' ') },
    { label: 'Planting Depth', value: depth },
  ];

  return {
    slug: p.slug,
    cluster: 'planting-date',
    crop: p.cropName.toLowerCase(),
    title: `${p.cropName} Planting Date Calculator`,
    description: `Calculate the optimal planting dates for ${p.cropName.toLowerCase()} based on your USDA zone, last frost date, and preferred start method.`,
    fields: [usdaZoneField, lastFrostDateField, startMethodField],
    calculate(inputs) {
      const zone = String(inputs.usdaZone || '6');
      const monthNum = Number(inputs.lastFrostDate) || 4;
      const method = String(inputs.startMethod || 'both');

      // Use zone-based frost date, adjusted by user-selected month
      const zoneLF = lastFrostDOY[zone] ?? 110;
      const monthMid = (monthNum - 1) * 30 + 15; // rough mid-month DOY
      const effectiveLF = Math.round((zoneLF + monthMid) / 2);

      const fallFrost = firstFallFrostDOY[zone] ?? 290;
      const ftOffset = frostToleranceOffset(p.frostTolerance);

      const indoorStartDOY = clampDOY(effectiveLF - indoorWeeks * 7 + ftOffset);
      const transplantDOY = clampDOY(effectiveLF + ftOffset + 7);
      const directSowDOY = clampDOY(effectiveLF - p.daysBeforeLastFrost + ftOffset);
      const fallPlantingDOY = clampDOY(fallFrost - p.daysToMaturity - 14);
      const seasonLength = p.daysToMaturity;

      const results: { label: string; value: number; unit: string; color?: string }[] = [];

      if (method === 'transplant' || method === 'both') {
        results.push(
          { label: 'Start Seeds Indoors', value: indoorStartDOY, unit: 'day of year', color: '#8b5cf6' },
          { label: 'Transplant Outdoors', value: transplantDOY, unit: 'day of year', color: '#22c55e' },
        );
      }

      if (method === 'direct-sow' || method === 'both') {
        results.push(
          { label: 'Direct Sow Date', value: directSowDOY, unit: 'day of year', color: '#f59e0b' },
        );
      }

      results.push(
        { label: 'Fall Planting Date', value: fallPlantingDOY, unit: 'day of year', color: '#ef4444' },
        { label: 'Growing Season Needed', value: seasonLength, unit: 'days', color: '#3b82f6' },
      );

      return {
        results,
        totalLabel: 'Days to maturity',
        totalValue: p.daysToMaturity,
        totalUnit: 'days',
      };
    },
    seo: {
      title: `${p.cropName} Planting Date Calculator | When to Plant ${p.cropName}`,
      description: `Find the best planting dates for ${p.cropName.toLowerCase()} in your USDA zone. Calculate indoor start, transplant, direct sow, and fall planting dates.`,
    },
    quickFacts: p.quickFacts ?? baseQuickFacts,
    tips: p.tips,
    relatedCrops: p.relatedCrops,
    relatedCalculators: [
      { title: 'Seed Spacing Calculator', href: '/calculators/seed-spacing' },
      { title: 'Harvest Date Calculator', href: '/calculators/harvest-date' },
      { title: 'Frost Date Calculator', href: '/calculators/frost-date' },
    ],
    faqs: p.faqs,
  };
}

/* ------------------------------------------------------------------ */
/*  44 Crop Configs                                                   */
/* ------------------------------------------------------------------ */

export const plantingDateConfigs: CalculatorConfig[] = [
  // 1 — Tomatoes
  createPlantingDateConfig({
    slug: 'tomatoes-planting-date',
    cropName: 'Tomatoes',
    frostTolerance: 'very-tender',
    daysBeforeLastFrost: -14,
    daysToMaturity: 75,
    optimalSoilTemp: 65,
    indoorStartWeeks: 6,
    plantingDepth: '1/4 inch',
    tips: [
      'Start seeds indoors 6–8 weeks before your last frost date.',
      'Wait until nighttime temps stay above 50°F before transplanting.',
      'Harden off seedlings for 7–10 days before moving them outside.',
      'Plant deeply — bury 2/3 of the stem to encourage strong root growth.',
    ],
    relatedCrops: [
      { title: 'Peppers', href: '/calculators/planting-date/peppers-planting-date' },
      { title: 'Eggplant', href: '/calculators/planting-date/eggplant-planting-date' },
      { title: 'Basil', href: '/calculators/planting-date/basil-planting-date' },
    ],
    faqs: [
      { question: 'When should I start tomato seeds indoors?', answer: 'Start tomato seeds indoors 6–8 weeks before your last expected frost date. In most zones this means late February to early April.' },
      { question: 'Can I direct sow tomatoes?', answer: 'Tomatoes are almost always started indoors or purchased as transplants. Direct sowing is only practical in zones 9–10 with long, warm growing seasons.' },
      { question: 'What is the minimum soil temperature for tomatoes?', answer: 'Tomato seeds germinate best at 65–85°F soil temperature. Below 50°F germination is very slow or fails entirely.' },
    ],
  }),

  // 2 — Peppers
  createPlantingDateConfig({
    slug: 'peppers-planting-date',
    cropName: 'Peppers',
    frostTolerance: 'very-tender',
    daysBeforeLastFrost: -14,
    daysToMaturity: 70,
    optimalSoilTemp: 70,
    indoorStartWeeks: 8,
    plantingDepth: '1/4 inch',
    tips: [
      'Start pepper seeds indoors 8–10 weeks before the last frost.',
      'Peppers need warm soil — wait until soil is at least 65°F.',
      'Use a heat mat to speed germination; peppers are slow starters.',
      'Harden off seedlings gradually over 10–14 days.',
    ],
    relatedCrops: [
      { title: 'Tomatoes', href: '/calculators/planting-date/tomatoes-planting-date' },
      { title: 'Eggplant', href: '/calculators/planting-date/eggplant-planting-date' },
      { title: 'Okra', href: '/calculators/planting-date/okra-planting-date' },
    ],
    faqs: [
      { question: 'How early should I start peppers indoors?', answer: 'Peppers should be started indoors 8–10 weeks before the last frost. They are slow to germinate and grow, so an early start is key.' },
      { question: 'What temperature do peppers need to germinate?', answer: 'Pepper seeds germinate best at 70–85°F. Below 60°F, germination is extremely slow.' },
      { question: 'Can I plant peppers outside before the last frost?', answer: 'No. Peppers are very frost-sensitive and should only go outside after all danger of frost has passed and nighttime temps stay above 55°F.' },
    ],
  }),

  // 3 — Corn
  createPlantingDateConfig({
    slug: 'corn-planting-date',
    cropName: 'Corn',
    frostTolerance: 'tender',
    daysBeforeLastFrost: 0,
    daysToMaturity: 80,
    optimalSoilTemp: 60,
    plantingDepth: '1–2 inches',
    tips: [
      'Direct sow corn after the last frost when soil reaches 60°F.',
      'Plant in blocks of at least 4 rows for good wind pollination.',
      'Successive plantings every 2 weeks extend the harvest window.',
      'Corn is a heavy feeder — amend soil with compost or balanced fertilizer.',
    ],
    relatedCrops: [
      { title: 'Beans', href: '/calculators/planting-date/beans-planting-date' },
      { title: 'Squash', href: '/calculators/planting-date/squash-planting-date' },
      { title: 'Sunflower', href: '/calculators/planting-date/sunflower-planting-date' },
    ],
    faqs: [
      { question: 'When is the best time to plant corn?', answer: 'Plant corn after all danger of frost has passed and soil temperatures reach at least 60°F consistently. In most areas this is mid-April to late May.' },
      { question: 'Can I start corn indoors?', answer: 'Corn does not transplant well due to its taproot. Direct sowing is strongly recommended.' },
      { question: 'How long does corn take to mature?', answer: 'Sweet corn typically takes 60–100 days depending on variety. Early varieties mature in about 60–70 days, while main-season types need 80–100 days.' },
    ],
  }),

  // 4 — Wheat
  createPlantingDateConfig({
    slug: 'wheat-planting-date',
    cropName: 'Wheat',
    frostTolerance: 'hardy',
    daysBeforeLastFrost: 42,
    daysToMaturity: 120,
    optimalSoilTemp: 54,
    plantingDepth: '1–1.5 inches',
    tips: [
      'Winter wheat is planted in fall, 6–8 weeks before the first hard freeze.',
      'Spring wheat should be sown as early as the soil can be worked.',
      'Wheat needs vernalization (cold period) to produce grain.',
      'Broadcast seed and rake in lightly, or use a drill seeder for rows.',
    ],
    relatedCrops: [
      { title: 'Barley', href: '/calculators/planting-date/barley-planting-date' },
      { title: 'Oats', href: '/calculators/planting-date/oats-planting-date' },
      { title: 'Canola', href: '/calculators/planting-date/canola-planting-date' },
    ],
    faqs: [
      { question: 'When should I plant winter wheat?', answer: 'Plant winter wheat in fall, typically 6–8 weeks before the first expected hard freeze. This gives the plants time to establish before winter dormancy.' },
      { question: 'What is the difference between winter and spring wheat?', answer: 'Winter wheat is planted in fall, overwinters, and is harvested the following summer. Spring wheat is planted in early spring and harvested in late summer.' },
    ],
  }),

  // 5 — Soybeans
  createPlantingDateConfig({
    slug: 'soybeans-planting-date',
    cropName: 'Soybeans',
    frostTolerance: 'tender',
    daysBeforeLastFrost: -7,
    daysToMaturity: 100,
    optimalSoilTemp: 60,
    plantingDepth: '1–1.5 inches',
    tips: [
      'Plant soybeans after the last frost when soil is consistently above 60°F.',
      'Inoculate seeds with rhizobium bacteria for better nitrogen fixation.',
      'Soybeans are photoperiod-sensitive — choose varieties suited to your latitude.',
      'Avoid planting too early in cold, wet soil which causes poor stands.',
    ],
    relatedCrops: [
      { title: 'Beans', href: '/calculators/planting-date/beans-planting-date' },
      { title: 'Corn', href: '/calculators/planting-date/corn-planting-date' },
      { title: 'Alfalfa', href: '/calculators/planting-date/alfalfa-planting-date' },
    ],
    faqs: [
      { question: 'When is the ideal time to plant soybeans?', answer: 'Soybeans should be planted after the last frost when soil temperatures reach 60°F. In the Midwest, this is typically mid-May to early June.' },
      { question: 'How deep should soybeans be planted?', answer: 'Plant soybeans 1 to 1.5 inches deep in moist soil. In drier conditions, plant up to 2 inches deep to reach moisture.' },
    ],
  }),

  // 6 — Potatoes
  createPlantingDateConfig({
    slug: 'potatoes-planting-date',
    cropName: 'Potatoes',
    frostTolerance: 'semi-hardy',
    daysBeforeLastFrost: 14,
    daysToMaturity: 90,
    optimalSoilTemp: 45,
    plantingDepth: '4 inches',
    tips: [
      'Plant seed potatoes 2–4 weeks before the last frost date.',
      'Cut seed potatoes into pieces with 2–3 eyes each; let cuts dry for 1–2 days.',
      'Hill soil around the stems as plants grow to prevent greening.',
      'Potatoes prefer cool weather and stop tuber growth when soil exceeds 80°F.',
    ],
    relatedCrops: [
      { title: 'Sweet Potatoes', href: '/calculators/planting-date/sweet-potatoes-planting-date' },
      { title: 'Carrots', href: '/calculators/planting-date/carrots-planting-date' },
      { title: 'Onions', href: '/calculators/planting-date/onions-planting-date' },
    ],
    faqs: [
      { question: 'Can I plant potatoes before the last frost?', answer: 'Yes. Potatoes are semi-hardy and can go in the ground 2–4 weeks before the last expected frost, once soil temperature is at least 45°F.' },
      { question: 'How do I know when potatoes are ready to harvest?', answer: 'New potatoes can be harvested when plants flower (about 60–70 days). For full-size storage potatoes, wait until the tops die back (90–120 days).' },
      { question: 'Can I plant grocery store potatoes?', answer: 'It is best to use certified seed potatoes. Grocery store potatoes may carry diseases and are often treated to inhibit sprouting.' },
    ],
  }),

  // 7 — Strawberries
  createPlantingDateConfig({
    slug: 'strawberries-planting-date',
    cropName: 'Strawberries',
    frostTolerance: 'semi-hardy',
    daysBeforeLastFrost: 21,
    daysToMaturity: 90,
    optimalSoilTemp: 50,
    plantingDepth: 'Crown at soil level',
    tips: [
      'Plant bare-root strawberries 3–4 weeks before the last frost.',
      'Set the crown exactly at soil level — too deep or shallow causes problems.',
      'Pinch off first-year flowers on June-bearing varieties to strengthen plants.',
      'Mulch with straw to keep berries clean and soil cool.',
    ],
    relatedCrops: [
      { title: 'Lettuce', href: '/calculators/planting-date/lettuce-planting-date' },
      { title: 'Spinach', href: '/calculators/planting-date/spinach-planting-date' },
      { title: 'Peas', href: '/calculators/planting-date/peas-planting-date' },
    ],
    faqs: [
      { question: 'When should I plant strawberries?', answer: 'Plant strawberries in early spring, 3–4 weeks before the last frost. In warmer zones (8–10), fall planting is also an option.' },
      { question: 'Do strawberries produce the first year?', answer: 'June-bearing varieties are best if you pinch flowers the first year for a larger second-year crop. Everbearing and day-neutral types produce some fruit the first season.' },
    ],
  }),

  // 8 — Lettuce
  createPlantingDateConfig({
    slug: 'lettuce-planting-date',
    cropName: 'Lettuce',
    frostTolerance: 'semi-hardy',
    daysBeforeLastFrost: 28,
    daysToMaturity: 50,
    optimalSoilTemp: 45,
    plantingDepth: '1/8 inch',
    tips: [
      'Direct sow lettuce 4–6 weeks before the last frost — it tolerates light frosts.',
      'Lettuce germinates poorly above 80°F; in summer, start seeds in a cool spot.',
      'Succession plant every 2 weeks for a continuous harvest.',
      'Provide afternoon shade in warm climates to delay bolting.',
    ],
    relatedCrops: [
      { title: 'Spinach', href: '/calculators/planting-date/spinach-planting-date' },
      { title: 'Kale', href: '/calculators/planting-date/kale-planting-date' },
      { title: 'Radishes', href: '/calculators/planting-date/radishes-planting-date' },
    ],
    faqs: [
      { question: 'Can lettuce survive a frost?', answer: 'Yes. Lettuce is semi-hardy and can handle light frosts down to about 28°F. Use row cover for additional protection in very cold snaps.' },
      { question: 'Why does my lettuce bolt?', answer: 'Lettuce bolts (flowers and turns bitter) in response to long days and high temperatures. Plant early, choose slow-bolt varieties, and provide shade.' },
      { question: 'Can I grow lettuce in summer?', answer: 'It is challenging in hot climates. Use heat-tolerant varieties, provide shade, and keep soil moist. Starting seeds indoors in cool conditions helps.' },
    ],
  }),

  // 9 — Carrots
  createPlantingDateConfig({
    slug: 'carrots-planting-date',
    cropName: 'Carrots',
    frostTolerance: 'semi-hardy',
    daysBeforeLastFrost: 21,
    daysToMaturity: 70,
    optimalSoilTemp: 50,
    plantingDepth: '1/4 inch',
    tips: [
      'Direct sow carrots 3–5 weeks before the last frost.',
      'Keep the soil surface moist until germination (10–21 days).',
      'Thin seedlings to 2–3 inches apart for proper root development.',
      'Loose, sandy soil produces the straightest roots — avoid rocky or clay soils.',
    ],
    relatedCrops: [
      { title: 'Beets', href: '/calculators/planting-date/beets-planting-date' },
      { title: 'Radishes', href: '/calculators/planting-date/radishes-planting-date' },
      { title: 'Parsley', href: '/calculators/planting-date/parsley-planting-date' },
    ],
    faqs: [
      { question: 'Why are my carrots forked or misshapen?', answer: 'Forking is usually caused by rocky or compacted soil. Prepare beds with deep, loose, stone-free soil for straight roots.' },
      { question: 'How long do carrots take to germinate?', answer: 'Carrot seeds are slow to germinate — typically 10–21 days. Keep the soil consistently moist and be patient.' },
    ],
  }),

  // 10 — Onions
  createPlantingDateConfig({
    slug: 'onions-planting-date',
    cropName: 'Onions',
    frostTolerance: 'hardy',
    daysBeforeLastFrost: 42,
    daysToMaturity: 100,
    optimalSoilTemp: 50,
    plantingDepth: '1/2 inch (seeds) or 1 inch (sets)',
    tips: [
      'Start onion seeds indoors 8–10 weeks before the last frost.',
      'Transplant seedlings or plant sets 4–6 weeks before the last frost.',
      'Choose the right day-length variety for your latitude (short, intermediate, or long day).',
      'Stop watering when tops begin to fall over to encourage curing.',
    ],
    relatedCrops: [
      { title: 'Garlic', href: '/calculators/planting-date/garlic-planting-date' },
      { title: 'Potatoes', href: '/calculators/planting-date/potatoes-planting-date' },
      { title: 'Celery', href: '/calculators/planting-date/celery-planting-date' },
    ],
    faqs: [
      { question: 'What are long-day vs short-day onions?', answer: 'Long-day onions need 14–16 hours of daylight to form bulbs and are best for northern latitudes. Short-day onions need 10–12 hours and suit southern regions.' },
      { question: 'Can I plant onion sets in fall?', answer: 'In zones 7–10, you can plant short-day onion sets in fall for an early spring harvest. In colder zones, spring planting is standard.' },
    ],
  }),

  // 11 — Garlic
  createPlantingDateConfig({
    slug: 'garlic-planting-date',
    cropName: 'Garlic',
    frostTolerance: 'hardy',
    daysBeforeLastFrost: 56,
    daysToMaturity: 240,
    optimalSoilTemp: 50,
    plantingDepth: '2 inches',
    tips: [
      'Plant garlic in fall, 4–6 weeks before the ground freezes.',
      'In zones 3–6, plant mid-October; in zones 7–10, November through December.',
      'Separate cloves from the bulb just before planting; use the largest cloves.',
      'Mulch heavily with straw after planting to insulate over winter.',
    ],
    relatedCrops: [
      { title: 'Onions', href: '/calculators/planting-date/onions-planting-date' },
      { title: 'Potatoes', href: '/calculators/planting-date/potatoes-planting-date' },
      { title: 'Spinach', href: '/calculators/planting-date/spinach-planting-date' },
    ],
    faqs: [
      { question: 'Should I plant garlic in spring or fall?', answer: 'Fall planting is preferred in most climates. Garlic needs a cold period (vernalization) to develop into full bulbs. Spring-planted garlic often produces smaller bulbs.' },
      { question: 'How do I know when garlic is ready to harvest?', answer: 'Harvest when the lower 3–4 leaves have turned brown but 4–5 green leaves remain, usually in mid-summer. Cure in a dry, shaded spot for 2–3 weeks.' },
      { question: 'What is the difference between hardneck and softneck garlic?', answer: 'Hardneck garlic produces scapes, has fewer but larger cloves, and is better for cold climates. Softneck garlic stores longer and is better for mild climates.' },
    ],
  }),

  // 12 — Beans
  createPlantingDateConfig({
    slug: 'beans-planting-date',
    cropName: 'Beans',
    frostTolerance: 'tender',
    daysBeforeLastFrost: -7,
    daysToMaturity: 55,
    optimalSoilTemp: 60,
    plantingDepth: '1–1.5 inches',
    tips: [
      'Direct sow beans after the last frost when soil is at least 60°F.',
      'Beans do not transplant well — always direct sow.',
      'Inoculate with rhizobium for improved nitrogen fixation.',
      'Pick bush beans frequently to encourage continued production.',
    ],
    relatedCrops: [
      { title: 'Peas', href: '/calculators/planting-date/peas-planting-date' },
      { title: 'Corn', href: '/calculators/planting-date/corn-planting-date' },
      { title: 'Cucumbers', href: '/calculators/planting-date/cucumbers-planting-date' },
    ],
    faqs: [
      { question: 'Can I start beans indoors?', answer: 'Beans generally do not transplant well. Direct sowing after the last frost is strongly recommended.' },
      { question: 'What is the difference between bush and pole beans?', answer: 'Bush beans are compact, produce all at once (55–65 days), and need no support. Pole beans grow on vines, need trellising, and produce over a longer period.' },
    ],
  }),

  // 13 — Peas
  createPlantingDateConfig({
    slug: 'peas-planting-date',
    cropName: 'Peas',
    frostTolerance: 'hardy',
    daysBeforeLastFrost: 42,
    daysToMaturity: 60,
    optimalSoilTemp: 45,
    plantingDepth: '1–2 inches',
    tips: [
      'Peas thrive in cool weather — plant as soon as the soil can be worked in spring.',
      'Sow 4–6 weeks before the last frost date.',
      'Provide a trellis or netting for climbing varieties.',
      'Peas stop producing when temperatures consistently exceed 80°F.',
    ],
    relatedCrops: [
      { title: 'Beans', href: '/calculators/planting-date/beans-planting-date' },
      { title: 'Spinach', href: '/calculators/planting-date/spinach-planting-date' },
      { title: 'Lettuce', href: '/calculators/planting-date/lettuce-planting-date' },
    ],
    faqs: [
      { question: 'How early can I plant peas?', answer: 'Peas can be planted as soon as the ground thaws and can be worked, typically 4–6 weeks before the last frost. They tolerate frost well.' },
      { question: 'Can I plant peas in the fall?', answer: 'Yes, fall peas are excellent in zones 7–10. Plant 8–10 weeks before the first fall frost for a late-season harvest.' },
    ],
  }),

  // 14 — Cucumbers
  createPlantingDateConfig({
    slug: 'cucumbers-planting-date',
    cropName: 'Cucumbers',
    frostTolerance: 'very-tender',
    daysBeforeLastFrost: -14,
    daysToMaturity: 55,
    optimalSoilTemp: 65,
    indoorStartWeeks: 3,
    plantingDepth: '1/2 inch',
    tips: [
      'Direct sow 1–2 weeks after the last frost when soil is at least 65°F.',
      'If starting indoors, sow only 3 weeks before transplanting — cucumbers dislike root disturbance.',
      'Use trellises for better air circulation and straighter fruit.',
      'Harvest frequently to keep plants producing.',
    ],
    relatedCrops: [
      { title: 'Squash', href: '/calculators/planting-date/squash-planting-date' },
      { title: 'Zucchini', href: '/calculators/planting-date/zucchini-planting-date' },
      { title: 'Watermelon', href: '/calculators/planting-date/watermelon-planting-date' },
    ],
    faqs: [
      { question: 'Can cucumbers tolerate frost?', answer: 'No. Cucumbers are very tender and will die at the slightest frost. Wait until all danger has passed and soil is warm before planting.' },
      { question: 'How often should I pick cucumbers?', answer: 'Harvest every 1–2 days once production begins. Overripe cucumbers signal the plant to stop producing.' },
    ],
  }),

  // 15 — Squash
  createPlantingDateConfig({
    slug: 'squash-planting-date',
    cropName: 'Squash',
    frostTolerance: 'very-tender',
    daysBeforeLastFrost: -14,
    daysToMaturity: 90,
    optimalSoilTemp: 65,
    indoorStartWeeks: 3,
    plantingDepth: '1 inch',
    tips: [
      'Direct sow squash 1–2 weeks after the last frost date.',
      'Winter squash needs a long season — start early in short-season areas.',
      'Give squash plenty of space — bush types need 4 feet, vining types 8+ feet.',
      'Mulch heavily to retain moisture and suppress weeds.',
    ],
    relatedCrops: [
      { title: 'Zucchini', href: '/calculators/planting-date/zucchini-planting-date' },
      { title: 'Pumpkins', href: '/calculators/planting-date/pumpkins-planting-date' },
      { title: 'Cucumbers', href: '/calculators/planting-date/cucumbers-planting-date' },
    ],
    faqs: [
      { question: 'What is the difference between summer and winter squash?', answer: 'Summer squash (zucchini, yellow squash) is harvested immature at 50–65 days. Winter squash (butternut, acorn) is harvested mature at 80–110 days and stores well.' },
      { question: 'Can I start squash indoors?', answer: 'Yes, but only 2–3 weeks before transplanting. Squash does not like root disturbance so use peat pots or soil blocks.' },
    ],
  }),

  // 16 — Zucchini
  createPlantingDateConfig({
    slug: 'zucchini-planting-date',
    cropName: 'Zucchini',
    frostTolerance: 'very-tender',
    daysBeforeLastFrost: -14,
    daysToMaturity: 50,
    optimalSoilTemp: 65,
    indoorStartWeeks: 3,
    plantingDepth: '1 inch',
    tips: [
      'Direct sow after the last frost when soil reaches 65°F.',
      'One or two plants are usually enough for a family — zucchini is very productive.',
      'Harvest at 6–8 inches for best flavor and texture.',
      'Watch for squash vine borers — a common pest in eastern states.',
    ],
    relatedCrops: [
      { title: 'Squash', href: '/calculators/planting-date/squash-planting-date' },
      { title: 'Cucumbers', href: '/calculators/planting-date/cucumbers-planting-date' },
      { title: 'Pumpkins', href: '/calculators/planting-date/pumpkins-planting-date' },
    ],
    faqs: [
      { question: 'How many zucchini plants do I need?', answer: 'Most families need only 1–3 plants. Each plant can produce 6–10 pounds of fruit over the season.' },
      { question: 'Why are my zucchini rotting on the end?', answer: 'Blossom end rot is caused by inconsistent watering and calcium deficiency. Maintain even soil moisture and amend with gypsum if needed.' },
    ],
  }),

  // 17 — Pumpkins
  createPlantingDateConfig({
    slug: 'pumpkins-planting-date',
    cropName: 'Pumpkins',
    frostTolerance: 'very-tender',
    daysBeforeLastFrost: -14,
    daysToMaturity: 100,
    optimalSoilTemp: 65,
    indoorStartWeeks: 3,
    plantingDepth: '1 inch',
    tips: [
      'Count back from your desired harvest (usually October) to determine planting date.',
      'Direct sow 1–2 weeks after the last frost, or start indoors 2–3 weeks before transplanting.',
      'Pumpkins need lots of space — vines can spread 20+ feet.',
      'Reduce watering as fruit ripens to concentrate sugars and toughen the rind.',
    ],
    relatedCrops: [
      { title: 'Squash', href: '/calculators/planting-date/squash-planting-date' },
      { title: 'Watermelon', href: '/calculators/planting-date/watermelon-planting-date' },
      { title: 'Corn', href: '/calculators/planting-date/corn-planting-date' },
    ],
    faqs: [
      { question: 'When should I plant pumpkins for Halloween?', answer: 'Count back 100–120 days from early October. In most zones this means planting in late May to mid-June.' },
      { question: 'How much space do pumpkins need?', answer: 'Standard pumpkins need 50–100 square feet per hill. Compact bush varieties can be grown in 20–30 square feet.' },
    ],
  }),

  // 18 — Watermelon
  createPlantingDateConfig({
    slug: 'watermelon-planting-date',
    cropName: 'Watermelon',
    frostTolerance: 'very-tender',
    daysBeforeLastFrost: -21,
    daysToMaturity: 85,
    optimalSoilTemp: 70,
    indoorStartWeeks: 4,
    plantingDepth: '1 inch',
    tips: [
      'Watermelons need a long, hot growing season — start indoors in short-season zones.',
      'Wait until soil is at least 70°F before transplanting or direct sowing.',
      'Use black plastic mulch to warm soil and conserve moisture.',
      'Reduce watering in the last week before harvest for sweeter fruit.',
    ],
    relatedCrops: [
      { title: 'Cantaloupe', href: '/calculators/planting-date/cantaloupe-planting-date' },
      { title: 'Cucumbers', href: '/calculators/planting-date/cucumbers-planting-date' },
      { title: 'Pumpkins', href: '/calculators/planting-date/pumpkins-planting-date' },
    ],
    faqs: [
      { question: 'Can I grow watermelon in a northern climate?', answer: 'Yes, choose short-season varieties (70–80 days) and start seeds indoors 3–4 weeks early. Use black plastic mulch and row covers to boost heat.' },
      { question: 'How do I know when a watermelon is ripe?', answer: 'Look for a yellow ground spot, a dry tendril nearest the fruit, and a hollow sound when thumped. The rind surface also becomes duller when ripe.' },
    ],
  }),

  // 19 — Cantaloupe
  createPlantingDateConfig({
    slug: 'cantaloupe-planting-date',
    cropName: 'Cantaloupe',
    frostTolerance: 'very-tender',
    daysBeforeLastFrost: -21,
    daysToMaturity: 80,
    optimalSoilTemp: 70,
    indoorStartWeeks: 4,
    plantingDepth: '1/2 inch',
    tips: [
      'Start indoors 3–4 weeks before transplanting, or direct sow 2–3 weeks after the last frost.',
      'Cantaloupes need warm soil (70°F+) and hot days (80°F+) for good sweetness.',
      'Use row covers early in the season to boost warmth, removing at flowering for pollination.',
      'Harvest when the stem slips easily from the fruit with gentle pressure.',
    ],
    relatedCrops: [
      { title: 'Watermelon', href: '/calculators/planting-date/watermelon-planting-date' },
      { title: 'Cucumbers', href: '/calculators/planting-date/cucumbers-planting-date' },
      { title: 'Squash', href: '/calculators/planting-date/squash-planting-date' },
    ],
    faqs: [
      { question: 'How do I know when cantaloupe is ready to pick?', answer: 'Ripe cantaloupes "slip" from the vine — the stem separates easily with light pressure. The skin color changes from green to tan, and the blossom end softens slightly.' },
      { question: 'Why are my cantaloupes not sweet?', answer: 'Lack of sweetness is usually caused by insufficient heat, too much water near harvest, or harvesting too early. Reduce watering in the final week.' },
    ],
  }),

  // 20 — Broccoli
  createPlantingDateConfig({
    slug: 'broccoli-planting-date',
    cropName: 'Broccoli',
    frostTolerance: 'semi-hardy',
    daysBeforeLastFrost: 21,
    daysToMaturity: 65,
    optimalSoilTemp: 50,
    indoorStartWeeks: 6,
    plantingDepth: '1/4 inch',
    tips: [
      'Start seeds indoors 6–8 weeks before the last frost for a spring crop.',
      'Transplant seedlings 2–3 weeks before the last frost.',
      'Broccoli bolts in hot weather — time your crop to mature before summer heat.',
      'After harvesting the main head, many varieties produce smaller side shoots for weeks.',
    ],
    relatedCrops: [
      { title: 'Cabbage', href: '/calculators/planting-date/cabbage-planting-date' },
      { title: 'Cauliflower', href: '/calculators/planting-date/cauliflower-planting-date' },
      { title: 'Kale', href: '/calculators/planting-date/kale-planting-date' },
    ],
    faqs: [
      { question: 'Can broccoli survive a frost?', answer: 'Yes. Broccoli is semi-hardy and can tolerate light frosts down to about 26°F. Frost can actually improve flavor by converting starches to sugars.' },
      { question: 'Why did my broccoli bolt without forming a head?', answer: 'Bolting happens when plants are exposed to temperatures above 80°F or experience transplant stress. Plant early and keep plants well-watered during warm spells.' },
    ],
  }),

  // 21 — Cabbage
  createPlantingDateConfig({
    slug: 'cabbage-planting-date',
    cropName: 'Cabbage',
    frostTolerance: 'semi-hardy',
    daysBeforeLastFrost: 21,
    daysToMaturity: 70,
    optimalSoilTemp: 50,
    indoorStartWeeks: 6,
    plantingDepth: '1/4 inch',
    tips: [
      'Start indoors 6–8 weeks before the last frost, transplant 2–3 weeks before.',
      'Cabbage is a heavy feeder — amend soil with compost and provide steady nitrogen.',
      'Consistent watering prevents heads from splitting.',
      'A fall crop often produces larger, sweeter heads than spring plantings.',
    ],
    relatedCrops: [
      { title: 'Broccoli', href: '/calculators/planting-date/broccoli-planting-date' },
      { title: 'Cauliflower', href: '/calculators/planting-date/cauliflower-planting-date' },
      { title: 'Kale', href: '/calculators/planting-date/kale-planting-date' },
    ],
    faqs: [
      { question: 'When should I plant cabbage?', answer: 'For a spring crop, start indoors 6–8 weeks before the last frost. For a fall crop, direct sow or transplant 12–14 weeks before the first fall frost.' },
      { question: 'Why are my cabbage heads splitting?', answer: 'Splitting is caused by uneven watering — heavy rain or irrigation after a dry spell causes rapid growth that splits the head. Water consistently.' },
    ],
  }),

  // 22 — Cauliflower
  createPlantingDateConfig({
    slug: 'cauliflower-planting-date',
    cropName: 'Cauliflower',
    frostTolerance: 'semi-hardy',
    daysBeforeLastFrost: 21,
    daysToMaturity: 75,
    optimalSoilTemp: 50,
    indoorStartWeeks: 6,
    plantingDepth: '1/4 inch',
    tips: [
      'Cauliflower is more temperamental than broccoli — it needs consistently cool temps (60–70°F).',
      'Start indoors 6 weeks before the last frost; transplant 2 weeks before.',
      'Blanch white varieties by tying leaves over the developing head when it is 2–3 inches.',
      'Fall crops are often more successful because temperatures trend cooler during head formation.',
    ],
    relatedCrops: [
      { title: 'Broccoli', href: '/calculators/planting-date/broccoli-planting-date' },
      { title: 'Cabbage', href: '/calculators/planting-date/cabbage-planting-date' },
      { title: 'Kale', href: '/calculators/planting-date/kale-planting-date' },
    ],
    faqs: [
      { question: 'Why did my cauliflower form a tiny head?', answer: 'Small or "buttoned" heads are caused by stress — temperature swings, transplant shock, or drought. Keep conditions consistent and avoid planting too late in spring.' },
      { question: 'What does blanching cauliflower mean?', answer: 'Blanching means tying or folding the outer leaves over the developing head to shield it from sunlight. This keeps white varieties white and prevents bitter flavors.' },
    ],
  }),

  // 23 — Spinach
  createPlantingDateConfig({
    slug: 'spinach-planting-date',
    cropName: 'Spinach',
    frostTolerance: 'hardy',
    daysBeforeLastFrost: 42,
    daysToMaturity: 40,
    optimalSoilTemp: 45,
    plantingDepth: '1/2 inch',
    tips: [
      'Spinach is very cold-hardy — sow as early as 6 weeks before the last frost.',
      'It bolts quickly in warm weather; plant early and harvest young.',
      'Fall plantings are often superior — sow 6–8 weeks before the first fall frost.',
      'In zones 7–10, spinach can overwinter with light mulch.',
    ],
    relatedCrops: [
      { title: 'Lettuce', href: '/calculators/planting-date/lettuce-planting-date' },
      { title: 'Kale', href: '/calculators/planting-date/kale-planting-date' },
      { title: 'Peas', href: '/calculators/planting-date/peas-planting-date' },
    ],
    faqs: [
      { question: 'How cold can spinach tolerate?', answer: 'Spinach can survive temperatures as low as 15–20°F and even lower with row cover. It is one of the hardiest garden greens.' },
      { question: 'Why does my spinach bolt so fast?', answer: 'Spinach bolts in response to lengthening days and warm temperatures (above 75°F). Plant early, choose slow-bolt varieties, and harvest before summer heat arrives.' },
    ],
  }),

  // 24 — Kale
  createPlantingDateConfig({
    slug: 'kale-planting-date',
    cropName: 'Kale',
    frostTolerance: 'hardy',
    daysBeforeLastFrost: 35,
    daysToMaturity: 55,
    optimalSoilTemp: 45,
    plantingDepth: '1/2 inch',
    tips: [
      'Direct sow 4–6 weeks before the last frost or start indoors 6 weeks early.',
      'Kale flavor actually improves after a light frost.',
      'Harvest outer leaves first, leaving the center to continue producing.',
      'Kale can produce well into winter in zones 7+ with minimal protection.',
    ],
    relatedCrops: [
      { title: 'Spinach', href: '/calculators/planting-date/spinach-planting-date' },
      { title: 'Cabbage', href: '/calculators/planting-date/cabbage-planting-date' },
      { title: 'Broccoli', href: '/calculators/planting-date/broccoli-planting-date' },
    ],
    faqs: [
      { question: 'Does kale taste better after frost?', answer: 'Yes. Cold temperatures cause kale to convert starches to sugars, resulting in sweeter, less bitter leaves.' },
      { question: 'Can kale survive winter?', answer: 'In zones 7–10, kale can survive winter with light mulch or row cover. In colder zones, it may survive with a cold frame or heavy mulch.' },
    ],
  }),

  // 25 — Radishes
  createPlantingDateConfig({
    slug: 'radishes-planting-date',
    cropName: 'Radishes',
    frostTolerance: 'hardy',
    daysBeforeLastFrost: 35,
    daysToMaturity: 25,
    optimalSoilTemp: 45,
    plantingDepth: '1/2 inch',
    tips: [
      'Radishes are one of the fastest crops — ready in 25–35 days.',
      'Direct sow 4–5 weeks before the last frost.',
      'Succession plant every 10 days for a continuous harvest.',
      'Radishes become pithy and hot in warm weather; grow them in spring and fall.',
    ],
    relatedCrops: [
      { title: 'Carrots', href: '/calculators/planting-date/carrots-planting-date' },
      { title: 'Beets', href: '/calculators/planting-date/beets-planting-date' },
      { title: 'Turnips', href: '/calculators/planting-date/turnips-planting-date' },
    ],
    faqs: [
      { question: 'How fast do radishes grow?', answer: 'Spring radishes mature in 20–35 days, making them one of the fastest garden vegetables. Winter radishes like daikon take 50–70 days.' },
      { question: 'Why are my radishes all tops and no roots?', answer: 'This is usually caused by too much nitrogen fertilizer, overcrowding, or too little sunlight. Thin to 2 inches apart and ensure full sun.' },
    ],
  }),

  // 26 — Beets
  createPlantingDateConfig({
    slug: 'beets-planting-date',
    cropName: 'Beets',
    frostTolerance: 'semi-hardy',
    daysBeforeLastFrost: 28,
    daysToMaturity: 55,
    optimalSoilTemp: 50,
    plantingDepth: '1/2 inch',
    tips: [
      'Direct sow 3–4 weeks before the last frost.',
      'Beet "seeds" are actually clusters — thin to 3–4 inches apart after germination.',
      'Soak seeds overnight to speed germination.',
      'Both roots and greens are edible — harvest greens when 4–6 inches tall.',
    ],
    relatedCrops: [
      { title: 'Carrots', href: '/calculators/planting-date/carrots-planting-date' },
      { title: 'Radishes', href: '/calculators/planting-date/radishes-planting-date' },
      { title: 'Turnips', href: '/calculators/planting-date/turnips-planting-date' },
    ],
    faqs: [
      { question: 'Can I eat beet greens?', answer: 'Absolutely. Beet greens are nutritious and delicious sauteed, steamed, or added to salads when young. You can harvest some greens without pulling the whole plant.' },
      { question: 'Why are my beets woody?', answer: 'Woody, tough beets are usually overgrown. Harvest most varieties at 2–3 inches in diameter for the best texture.' },
    ],
  }),

  // 27 — Turnips
  createPlantingDateConfig({
    slug: 'turnips-planting-date',
    cropName: 'Turnips',
    frostTolerance: 'semi-hardy',
    daysBeforeLastFrost: 28,
    daysToMaturity: 50,
    optimalSoilTemp: 50,
    plantingDepth: '1/4 inch',
    tips: [
      'Direct sow 3–4 weeks before the last frost for a spring crop.',
      'Fall turnips are often sweeter — sow 6–8 weeks before the first fall frost.',
      'Harvest spring turnips small (2–3 inches) before hot weather sets in.',
      'Turnip greens are harvestable before the roots are mature.',
    ],
    relatedCrops: [
      { title: 'Radishes', href: '/calculators/planting-date/radishes-planting-date' },
      { title: 'Beets', href: '/calculators/planting-date/beets-planting-date' },
      { title: 'Carrots', href: '/calculators/planting-date/carrots-planting-date' },
    ],
    faqs: [
      { question: 'When should I plant turnips?', answer: 'For spring: sow 3–4 weeks before the last frost. For fall (often preferred): sow 6–8 weeks before the first fall frost. Fall turnips are sweeter due to cool weather.' },
      { question: 'Can I eat turnip greens?', answer: 'Yes. Turnip greens are a nutritious southern staple. They are best harvested young (4–6 inches) and can be cooked or eaten raw in salads.' },
    ],
  }),

  // 28 — Sweet Potatoes
  createPlantingDateConfig({
    slug: 'sweet-potatoes-planting-date',
    cropName: 'Sweet Potatoes',
    frostTolerance: 'very-tender',
    daysBeforeLastFrost: -21,
    daysToMaturity: 100,
    optimalSoilTemp: 70,
    plantingDepth: '4 inches (slips)',
    tips: [
      'Plant slips (rooted sprouts) 3–4 weeks after the last frost when soil is 70°F+.',
      'Sweet potatoes need a long, hot season — at least 100 warm days.',
      'Grow in raised beds or mounds for best drainage and warmth.',
      'Cure harvested sweet potatoes at 80–85°F for 10 days before storing.',
    ],
    relatedCrops: [
      { title: 'Potatoes', href: '/calculators/planting-date/potatoes-planting-date' },
      { title: 'Okra', href: '/calculators/planting-date/okra-planting-date' },
      { title: 'Watermelon', href: '/calculators/planting-date/watermelon-planting-date' },
    ],
    faqs: [
      { question: 'Can I grow sweet potatoes in the north?', answer: 'Yes, with short-season varieties (90 days) and raised beds or black plastic mulch to warm the soil. Start slips early indoors.' },
      { question: 'What are sweet potato slips?', answer: 'Slips are rooted sprouts grown from a mature sweet potato. You can buy them from nurseries or grow your own by suspending a sweet potato in water about 6 weeks before planting time.' },
    ],
  }),

  // 29 — Okra
  createPlantingDateConfig({
    slug: 'okra-planting-date',
    cropName: 'Okra',
    frostTolerance: 'very-tender',
    daysBeforeLastFrost: -21,
    daysToMaturity: 55,
    optimalSoilTemp: 70,
    indoorStartWeeks: 4,
    plantingDepth: '1 inch',
    tips: [
      'Okra loves heat — wait until soil is at least 70°F before planting.',
      'Soak seeds overnight to speed germination of the hard seed coat.',
      'Harvest pods when 2–4 inches long — larger pods become tough and fibrous.',
      'Okra produces more in hot weather; it thrives where other crops struggle.',
    ],
    relatedCrops: [
      { title: 'Peppers', href: '/calculators/planting-date/peppers-planting-date' },
      { title: 'Sweet Potatoes', href: '/calculators/planting-date/sweet-potatoes-planting-date' },
      { title: 'Eggplant', href: '/calculators/planting-date/eggplant-planting-date' },
    ],
    faqs: [
      { question: 'Can I grow okra in the north?', answer: 'Yes, but choose early varieties (50–55 days) and start indoors 4 weeks before transplanting. Use black plastic mulch to warm the soil.' },
      { question: 'How often should I harvest okra?', answer: 'Harvest every 1–2 days once production begins. Pods grow fast in hot weather and become tough if left too long.' },
    ],
  }),

  // 30 — Eggplant
  createPlantingDateConfig({
    slug: 'eggplant-planting-date',
    cropName: 'Eggplant',
    frostTolerance: 'very-tender',
    daysBeforeLastFrost: -21,
    daysToMaturity: 70,
    optimalSoilTemp: 70,
    indoorStartWeeks: 8,
    plantingDepth: '1/4 inch',
    tips: [
      'Start seeds indoors 8–10 weeks before the last frost — eggplant is slow to grow.',
      'Do not transplant until nighttime temps are consistently above 55°F.',
      'Use black plastic mulch and row covers to boost soil and air temperature.',
      'Harvest when skin is glossy; dull skin indicates overripe, seedy fruit.',
    ],
    relatedCrops: [
      { title: 'Tomatoes', href: '/calculators/planting-date/tomatoes-planting-date' },
      { title: 'Peppers', href: '/calculators/planting-date/peppers-planting-date' },
      { title: 'Okra', href: '/calculators/planting-date/okra-planting-date' },
    ],
    faqs: [
      { question: 'Why is my eggplant not producing fruit?', answer: 'Common causes are temperatures too cool (below 60°F at night), not enough sun, or flower drop from heat stress (above 95°F). Eggplant needs 6–8 hours of full sun.' },
      { question: 'How do I know when eggplant is ripe?', answer: 'Harvest when the skin is glossy and firm, and the flesh springs back when pressed. Once the skin turns dull, the seeds inside have matured and the fruit may be bitter.' },
    ],
  }),

  // 31 — Basil
  createPlantingDateConfig({
    slug: 'basil-planting-date',
    cropName: 'Basil',
    frostTolerance: 'very-tender',
    daysBeforeLastFrost: -14,
    daysToMaturity: 60,
    optimalSoilTemp: 65,
    indoorStartWeeks: 6,
    plantingDepth: '1/4 inch',
    tips: [
      'Start basil indoors 6 weeks before the last frost, or direct sow 2 weeks after.',
      'Basil is extremely cold-sensitive — even temps below 50°F stunt growth.',
      'Pinch off flower buds to keep plants bushy and productive.',
      'Harvest frequently from the top, cutting just above a leaf pair to encourage branching.',
    ],
    relatedCrops: [
      { title: 'Tomatoes', href: '/calculators/planting-date/tomatoes-planting-date' },
      { title: 'Cilantro', href: '/calculators/planting-date/cilantro-planting-date' },
      { title: 'Parsley', href: '/calculators/planting-date/parsley-planting-date' },
    ],
    faqs: [
      { question: 'Can I plant basil with tomatoes?', answer: 'Yes. Basil and tomatoes are classic companions. They share similar growing requirements and many gardeners believe basil improves tomato flavor.' },
      { question: 'How do I keep basil from flowering?', answer: 'Pinch off flower buds as soon as they appear. Regular harvesting from the growing tips also delays flowering and keeps plants bushy.' },
    ],
  }),

  // 32 — Cilantro
  createPlantingDateConfig({
    slug: 'cilantro-planting-date',
    cropName: 'Cilantro',
    frostTolerance: 'semi-hardy',
    daysBeforeLastFrost: 21,
    daysToMaturity: 45,
    optimalSoilTemp: 55,
    plantingDepth: '1/4 inch',
    tips: [
      'Direct sow cilantro 2–3 weeks before the last frost — it prefers cool weather.',
      'Cilantro bolts quickly in heat; succession plant every 2–3 weeks.',
      'Let some plants go to seed to harvest coriander and encourage self-seeding.',
      'Slow-bolt varieties like "Calypso" or "Santo" last longer in warm weather.',
    ],
    relatedCrops: [
      { title: 'Dill', href: '/calculators/planting-date/dill-planting-date' },
      { title: 'Parsley', href: '/calculators/planting-date/parsley-planting-date' },
      { title: 'Basil', href: '/calculators/planting-date/basil-planting-date' },
    ],
    faqs: [
      { question: 'Why does my cilantro bolt so fast?', answer: 'Cilantro bolts in response to heat and long days. It grows best in cool weather (50–70°F). Use slow-bolt varieties and succession plant for continuous supply.' },
      { question: 'Is coriander the same as cilantro?', answer: 'Yes — cilantro refers to the leaves and stems, while coriander refers to the dried seeds of the same plant (Coriandrum sativum).' },
    ],
  }),

  // 33 — Dill
  createPlantingDateConfig({
    slug: 'dill-planting-date',
    cropName: 'Dill',
    frostTolerance: 'semi-hardy',
    daysBeforeLastFrost: 21,
    daysToMaturity: 50,
    optimalSoilTemp: 55,
    plantingDepth: '1/4 inch',
    tips: [
      'Direct sow dill 2–3 weeks before the last frost.',
      'Dill has a taproot and does not transplant well — always direct sow.',
      'Succession plant every 3 weeks for a steady supply of fresh fronds.',
      'Let some plants flower and go to seed for pickling and self-seeding.',
    ],
    relatedCrops: [
      { title: 'Cilantro', href: '/calculators/planting-date/cilantro-planting-date' },
      { title: 'Parsley', href: '/calculators/planting-date/parsley-planting-date' },
      { title: 'Basil', href: '/calculators/planting-date/basil-planting-date' },
    ],
    faqs: [
      { question: 'Can I transplant dill?', answer: 'Dill has a sensitive taproot and generally does not transplant well. Direct sowing is recommended. If you must start indoors, use peat pots to avoid disturbing roots.' },
      { question: 'When should I harvest dill for pickling?', answer: 'Harvest dill flower heads for pickling when the flowers are open but before the seeds have set. This is the "dill head" stage used in pickle recipes.' },
    ],
  }),

  // 34 — Parsley
  createPlantingDateConfig({
    slug: 'parsley-planting-date',
    cropName: 'Parsley',
    frostTolerance: 'semi-hardy',
    daysBeforeLastFrost: 28,
    daysToMaturity: 70,
    optimalSoilTemp: 50,
    indoorStartWeeks: 8,
    plantingDepth: '1/4 inch',
    tips: [
      'Start parsley indoors 8–10 weeks early — it is notoriously slow to germinate (2–4 weeks).',
      'Soak seeds overnight to speed germination.',
      'Parsley is biennial: it produces leaves the first year and flowers the second.',
      'Harvest outer stems first, leaving the center to continue growing.',
    ],
    relatedCrops: [
      { title: 'Cilantro', href: '/calculators/planting-date/cilantro-planting-date' },
      { title: 'Dill', href: '/calculators/planting-date/dill-planting-date' },
      { title: 'Celery', href: '/calculators/planting-date/celery-planting-date' },
    ],
    faqs: [
      { question: 'Why is my parsley so slow to germinate?', answer: 'Parsley seeds have a hard coat and naturally take 2–4 weeks to germinate. Soaking in warm water overnight and keeping soil consistently moist speeds the process.' },
      { question: 'Is parsley an annual or perennial?', answer: 'Parsley is biennial — it grows leaves the first year, then flowers and goes to seed the second year. Most gardeners replant annually for the best leaf production.' },
    ],
  }),

  // 35 — Asparagus
  createPlantingDateConfig({
    slug: 'asparagus-planting-date',
    cropName: 'Asparagus',
    frostTolerance: 'hardy',
    daysBeforeLastFrost: 28,
    daysToMaturity: 730,
    optimalSoilTemp: 50,
    plantingDepth: '6–8 inches (crowns)',
    tips: [
      'Plant 1-year-old crowns in spring, 4 weeks before the last frost.',
      'Dig a trench 6–8 inches deep and gradually fill as spears emerge.',
      'Do not harvest for the first 2 years to allow the root system to establish.',
      'Asparagus beds can produce for 15–20+ years with proper care.',
    ],
    relatedCrops: [
      { title: 'Garlic', href: '/calculators/planting-date/garlic-planting-date' },
      { title: 'Onions', href: '/calculators/planting-date/onions-planting-date' },
      { title: 'Celery', href: '/calculators/planting-date/celery-planting-date' },
    ],
    faqs: [
      { question: 'How long until asparagus produces?', answer: 'Asparagus planted from crowns typically needs 2 years before the first light harvest and 3 years for a full harvest. It is a long-term investment but produces for 15–20+ years.' },
      { question: 'Should I plant asparagus from seeds or crowns?', answer: 'Crowns (1-year-old roots) are recommended for most gardeners, as they produce harvests 1–2 years sooner than seed-grown plants.' },
      { question: 'When should I stop harvesting asparagus?', answer: 'Stop harvesting in early summer (about 6–8 weeks after the first spear appears) to allow the plants to grow fern-like foliage that feeds the roots for next year.' },
    ],
  }),

  // 36 — Celery
  createPlantingDateConfig({
    slug: 'celery-planting-date',
    cropName: 'Celery',
    frostTolerance: 'semi-hardy',
    daysBeforeLastFrost: 14,
    daysToMaturity: 120,
    optimalSoilTemp: 60,
    indoorStartWeeks: 10,
    plantingDepth: 'Surface sow (needs light)',
    tips: [
      'Start celery indoors 10–12 weeks before the last frost — it grows very slowly.',
      'Celery needs consistent moisture and rich soil. It is a heavy feeder.',
      'Transplant 1–2 weeks before the last frost; celery tolerates light frosts.',
      'Blanch stalks by wrapping with paper or hilling soil around the base for milder flavor.',
    ],
    relatedCrops: [
      { title: 'Parsley', href: '/calculators/planting-date/parsley-planting-date' },
      { title: 'Onions', href: '/calculators/planting-date/onions-planting-date' },
      { title: 'Cabbage', href: '/calculators/planting-date/cabbage-planting-date' },
    ],
    faqs: [
      { question: 'Is celery hard to grow?', answer: 'Celery is more demanding than most vegetables. It needs a long cool growing season (120+ days), consistent moisture, and rich soil. It does best in climates with mild summers.' },
      { question: 'Can I regrow celery from the base?', answer: 'You can regrow celery stalks from a cut base in water, but the regrown stalks are usually thin. For full-size celery, grow from seed or transplants.' },
    ],
  }),

  // 37 — Sunflower
  createPlantingDateConfig({
    slug: 'sunflower-planting-date',
    cropName: 'Sunflower',
    frostTolerance: 'tender',
    daysBeforeLastFrost: -7,
    daysToMaturity: 80,
    optimalSoilTemp: 60,
    plantingDepth: '1 inch',
    tips: [
      'Direct sow sunflowers 1 week after the last frost when soil is 60°F+.',
      'Sunflowers have deep taproots — do not transplant.',
      'Stagger planting every 2 weeks for blooms from summer through fall.',
      'Tall varieties may need staking in windy areas.',
    ],
    relatedCrops: [
      { title: 'Corn', href: '/calculators/planting-date/corn-planting-date' },
      { title: 'Sorghum', href: '/calculators/planting-date/sorghum-planting-date' },
      { title: 'Beans', href: '/calculators/planting-date/beans-planting-date' },
    ],
    faqs: [
      { question: 'When should I plant sunflowers?', answer: 'Plant sunflowers after the last frost when soil is at least 60°F. For fall blooms, you can plant as late as mid-summer in most zones.' },
      { question: 'Do sunflowers really follow the sun?', answer: 'Young sunflowers exhibit heliotropism — they track the sun from east to west. Once the flower matures, it typically faces east permanently.' },
    ],
  }),

  // 38 — Alfalfa
  createPlantingDateConfig({
    slug: 'alfalfa-planting-date',
    cropName: 'Alfalfa',
    frostTolerance: 'hardy',
    daysBeforeLastFrost: 28,
    daysToMaturity: 60,
    optimalSoilTemp: 50,
    plantingDepth: '1/4 inch',
    tips: [
      'Spring seeding: plant 4 weeks before the last frost when soil is workable.',
      'Fall seeding (preferred in many areas): plant 6–8 weeks before the first fall frost.',
      'Inoculate with proper Rhizobium strain for nitrogen fixation.',
      'Alfalfa needs well-drained soil with pH 6.5–7.5 — it will not tolerate acidic soils.',
    ],
    relatedCrops: [
      { title: 'Oats', href: '/calculators/planting-date/oats-planting-date' },
      { title: 'Soybeans', href: '/calculators/planting-date/soybeans-planting-date' },
      { title: 'Canola', href: '/calculators/planting-date/canola-planting-date' },
    ],
    faqs: [
      { question: 'How long does an alfalfa stand last?', answer: 'A well-managed alfalfa stand can produce for 3–7 years, with the highest yields in years 2–4. After that, replanting is usually necessary.' },
      { question: 'Is spring or fall seeding better for alfalfa?', answer: 'Both work. Fall seeding avoids spring weed competition and is often preferred. Spring seeding works well in northern regions where winter kill is a concern for young stands.' },
    ],
  }),

  // 39 — Oats
  createPlantingDateConfig({
    slug: 'oats-planting-date',
    cropName: 'Oats',
    frostTolerance: 'hardy',
    daysBeforeLastFrost: 42,
    daysToMaturity: 90,
    optimalSoilTemp: 45,
    plantingDepth: '1–2 inches',
    tips: [
      'Sow oats in early spring as soon as the soil can be worked.',
      'Oats do best in cool, moist conditions and suffer in summer heat.',
      'As a cover crop, oats can be fall-sown to winter-kill and leave a soil-protecting mulch.',
      'Broadcast at 3–4 lbs per 1,000 sq ft for grain or 2 lbs per 1,000 sq ft as cover crop.',
    ],
    relatedCrops: [
      { title: 'Barley', href: '/calculators/planting-date/barley-planting-date' },
      { title: 'Wheat', href: '/calculators/planting-date/wheat-planting-date' },
      { title: 'Alfalfa', href: '/calculators/planting-date/alfalfa-planting-date' },
    ],
    faqs: [
      { question: 'When should I plant oats?', answer: 'Plant oats in early spring, 4–6 weeks before the last frost. They prefer cool temperatures and should mature before summer heat arrives.' },
      { question: 'Can oats be used as a cover crop?', answer: 'Yes, oats are an excellent cover crop. Fall-sown oats winter-kill in zones 3–7, leaving a natural mulch. Spring-sown oats suppress weeds and add organic matter.' },
    ],
  }),

  // 40 — Barley
  createPlantingDateConfig({
    slug: 'barley-planting-date',
    cropName: 'Barley',
    frostTolerance: 'hardy',
    daysBeforeLastFrost: 42,
    daysToMaturity: 90,
    optimalSoilTemp: 45,
    plantingDepth: '1–1.5 inches',
    tips: [
      'Spring barley should be sown as early as the ground can be worked.',
      'Winter barley is planted in fall, 6–8 weeks before the first hard freeze.',
      'Barley matures faster than wheat and can be harvested in early summer.',
      'It tolerates saline and alkaline soils better than most small grains.',
    ],
    relatedCrops: [
      { title: 'Wheat', href: '/calculators/planting-date/wheat-planting-date' },
      { title: 'Oats', href: '/calculators/planting-date/oats-planting-date' },
      { title: 'Canola', href: '/calculators/planting-date/canola-planting-date' },
    ],
    faqs: [
      { question: 'What is the difference between spring and winter barley?', answer: 'Spring barley is planted in spring and harvested in summer. Winter barley is planted in fall, overwinters, and is harvested in early summer. Winter barley generally yields more but is less winter-hardy than wheat.' },
      { question: 'Can I grow barley at home?', answer: 'Yes. Barley grows well in home gardens and small plots. A 10x10 foot plot can yield about 5–8 pounds of grain — enough for homebrewing or adding to soups.' },
    ],
  }),

  // 41 — Rice
  createPlantingDateConfig({
    slug: 'rice-planting-date',
    cropName: 'Rice',
    frostTolerance: 'very-tender',
    daysBeforeLastFrost: -21,
    daysToMaturity: 120,
    optimalSoilTemp: 68,
    indoorStartWeeks: 6,
    plantingDepth: '1/4 inch',
    tips: [
      'Rice needs consistently warm temperatures (70°F+) and a long growing season.',
      'Upland rice varieties can be grown without standing water, similar to other grains.',
      'Paddy rice needs 4–6 inches of standing water for most of the growing season.',
      'In northern zones, start indoors 6 weeks early and transplant after the last frost.',
    ],
    relatedCrops: [
      { title: 'Sorghum', href: '/calculators/planting-date/sorghum-planting-date' },
      { title: 'Corn', href: '/calculators/planting-date/corn-planting-date' },
      { title: 'Cotton', href: '/calculators/planting-date/cotton-planting-date' },
    ],
    faqs: [
      { question: 'Can I grow rice without a paddy?', answer: 'Yes. Upland rice varieties grow in ordinary garden conditions without flooding. They need consistent moisture but not standing water. Yields are lower than paddy rice.' },
      { question: 'What zones can grow rice?', answer: 'Rice is commercially grown in zones 8–10 (southern US). With upland varieties and indoor starts, home growers in zones 6–7 can have success in warm, wet summers.' },
    ],
  }),

  // 42 — Cotton
  createPlantingDateConfig({
    slug: 'cotton-planting-date',
    cropName: 'Cotton',
    frostTolerance: 'very-tender',
    daysBeforeLastFrost: -21,
    daysToMaturity: 150,
    optimalSoilTemp: 65,
    plantingDepth: '1 inch',
    tips: [
      'Cotton needs a very long, warm season — 150+ frost-free days.',
      'Plant when soil temperature at 4-inch depth is 65°F for 3 consecutive days.',
      'Cotton is typically grown in zones 7–10 in the US.',
      'Adequate moisture at planting is critical, but reduce irrigation as bolls open.',
    ],
    relatedCrops: [
      { title: 'Sorghum', href: '/calculators/planting-date/sorghum-planting-date' },
      { title: 'Okra', href: '/calculators/planting-date/okra-planting-date' },
      { title: 'Rice', href: '/calculators/planting-date/rice-planting-date' },
    ],
    faqs: [
      { question: 'Can I grow cotton in my garden?', answer: 'If you are in zones 8–10 with 150+ frost-free days, cotton grows well as an ornamental or educational crop. It produces attractive flowers before forming bolls.' },
      { question: 'How long does cotton take to mature?', answer: 'Cotton needs 150–180 days from planting to harvest, making it one of the longest-season crops. It requires consistent warmth throughout the growing period.' },
    ],
  }),

  // 43 — Sorghum
  createPlantingDateConfig({
    slug: 'sorghum-planting-date',
    cropName: 'Sorghum',
    frostTolerance: 'tender',
    daysBeforeLastFrost: -14,
    daysToMaturity: 100,
    optimalSoilTemp: 65,
    plantingDepth: '1–1.5 inches',
    tips: [
      'Plant sorghum 1–2 weeks after the last frost when soil is at least 65°F.',
      'Sorghum is more drought-tolerant than corn and a good alternative in dry areas.',
      'For grain, plant in rows 30 inches apart; for syrup, closer spacing works.',
      'Sweet sorghum can be pressed for syrup when the seeds are in the dough stage.',
    ],
    relatedCrops: [
      { title: 'Corn', href: '/calculators/planting-date/corn-planting-date' },
      { title: 'Sunflower', href: '/calculators/planting-date/sunflower-planting-date' },
      { title: 'Cotton', href: '/calculators/planting-date/cotton-planting-date' },
    ],
    faqs: [
      { question: 'What is the difference between grain sorghum and sweet sorghum?', answer: 'Grain sorghum is grown for its seed heads (used as feed, flour, or in gluten-free products). Sweet sorghum is grown for its juice, which is pressed and boiled into sorghum syrup.' },
      { question: 'Is sorghum more drought-tolerant than corn?', answer: 'Yes, significantly. Sorghum uses about 1/3 less water than corn and can go dormant during drought, resuming growth when moisture returns.' },
    ],
  }),

  // 44 — Canola
  createPlantingDateConfig({
    slug: 'canola-planting-date',
    cropName: 'Canola',
    frostTolerance: 'semi-hardy',
    daysBeforeLastFrost: 28,
    daysToMaturity: 90,
    optimalSoilTemp: 50,
    plantingDepth: '1/2 inch',
    tips: [
      'Spring canola: sow as early as the soil can be worked, 3–4 weeks before the last frost.',
      'Winter canola: plant in early fall, 4–6 weeks before the first hard freeze.',
      'Canola prefers cool conditions during flowering for best seed set.',
      'It is an excellent rotation crop that breaks disease cycles for cereals.',
    ],
    relatedCrops: [
      { title: 'Wheat', href: '/calculators/planting-date/wheat-planting-date' },
      { title: 'Barley', href: '/calculators/planting-date/barley-planting-date' },
      { title: 'Alfalfa', href: '/calculators/planting-date/alfalfa-planting-date' },
    ],
    faqs: [
      { question: 'Is canola the same as rapeseed?', answer: 'Canola is a specific cultivar of rapeseed bred to have low erucic acid and low glucosinolates, making it safe for human consumption. "Canola" stands for "Canadian oil, low acid."' },
      { question: 'Can I grow canola at home?', answer: 'Yes. Canola produces pretty yellow flowers and is easy to grow. A small patch is useful as a cover crop or pollinator resource, though extracting oil requires a press.' },
    ],
  }),
];
