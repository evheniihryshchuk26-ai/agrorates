import type { CalculatorConfig } from '../types';

const farmProfitLoss: CalculatorConfig = {
  slug: 'farm-profit-loss', cluster: 'economics',
  title: 'Farm Profit & Loss Calculator',
  description: 'Calculate farm net profit, profit margin, and break-even analysis from revenue and expenses.',
  fields: [
    { id: 'grossRevenue', label: 'Gross Revenue', type: 'number', placeholder: '250000', unit: '$', min: 0, required: true },
    { id: 'variableCosts', label: 'Variable Costs', type: 'number', placeholder: '120000', unit: '$', min: 0, helpText: 'Seed, fertilizer, fuel, labor, etc.' },
    { id: 'fixedCosts', label: 'Fixed Costs', type: 'number', placeholder: '50000', unit: '$', min: 0, helpText: 'Land rent, insurance, depreciation, etc.' },
  ],
  calculate: (inputs) => {
    const revenue = Number(inputs.grossRevenue) || 0;
    const variable = Number(inputs.variableCosts) || 0;
    const fixed = Number(inputs.fixedCosts) || 0;
    const totalExpenses = variable + fixed;
    const netProfit = revenue - totalExpenses;
    const margin = revenue > 0 ? (netProfit / revenue) * 100 : 0;
    return {
      results: [
        { label: 'Net Profit', value: Math.round(netProfit), unit: '$', color: netProfit >= 0 ? 'green' : 'rose' },
        { label: 'Profit Margin', value: Math.round(margin * 10) / 10, unit: '%', color: 'blue' },
        { label: 'Total Expenses', value: Math.round(totalExpenses), unit: '$', color: 'orange' },
      ],
      totalLabel: 'Net farm income', totalValue: Math.round(netProfit), totalUnit: '$',
    };
  },
  seo: { title: 'Farm Profit & Loss Calculator — Net Farm Income', description: 'Calculate farm profit, loss, and profit margin. Analyze revenue vs expenses for your farm operation.' },
  tips: ['Track variable and fixed costs separately for better management decisions.', 'Aim for a 15-25% profit margin in crop farming.', 'Review P&L monthly during the growing season, not just at year-end.'],
  faqs: [
    { question: 'What is a good profit margin for farming?', answer: '10-25% net profit margin is considered good for crop farming. Livestock operations may be lower (5-15%) but more consistent.' },
  ],
  relatedCalculators: [
    { title: 'Cost Per Acre', href: '/calculators/economics/cost-per-acre' },
    { title: 'Break-Even Price', href: '/calculators/economics/break-even-price' },
    { title: 'Farm ROI', href: '/calculators/economics/farm-roi' },
  ],
  howToSteps: [
    'Enter your total gross revenue from crop and livestock sales.',
    'Provide variable costs (seed, fertilizer, fuel, labor, etc.).',
    'Enter fixed costs (land rent, insurance, depreciation, etc.).',
    'Click Calculate to see net profit, profit margin, and total expenses.',
  ],
  nextSteps: [
    { title: 'Cost Per Acre Calculator', href: '/calculators/economics/cost-per-acre' },
    { title: 'Break-Even Price Calculator', href: '/calculators/economics/break-even-price' },
    { title: 'Farm ROI Calculator', href: '/calculators/economics/farm-roi' },
    { title: 'Yield Per Acre Calculator', href: '/calculators/yield/yield-per-acre/' },
  ],
  howToUse: 'Enter your total gross revenue from all farm sales. Then break down your costs into variable costs (inputs that change with production) and fixed costs (expenses you pay regardless of production level). The calculator shows net profit, margin, and total expenses.',
  whyItMatters: 'Most farm failures are financial, not agronomic. Knowing your true profit margin helps you make better decisions about land expansion, equipment purchases, and crop selection. A 15-25% margin is considered healthy for crop farming.',
  methodology: 'Net profit = Gross revenue - (Variable costs + Fixed costs). Profit margin = Net profit / Gross revenue × 100. Variable costs include seed, fertilizer, chemicals, fuel, and hired labor. Fixed costs include land rent, insurance, depreciation, and interest.',
  commonMistakes: [
    'Forgetting to include depreciation as a real cost — equipment wears out.',
    'Not separating family living expenses from farm expenses.',
    'Counting government payments as operating revenue without tracking them separately.',
    'Ignoring opportunity cost — what your land and labor could earn elsewhere.',
  ],
};

const costPerAcre: CalculatorConfig = {
  slug: 'cost-per-acre', cluster: 'economics',
  title: 'Cost Per Acre Calculator',
  description: 'Calculate total production cost per acre from all input costs.',
  fields: [
    { id: 'acres', label: 'Total Acres', type: 'number', placeholder: '500', unit: 'acres', min: 0.1, required: true },
    { id: 'seedCost', label: 'Seed Cost', type: 'number', placeholder: '15000', unit: '$', min: 0 },
    { id: 'fertilizerCost', label: 'Fertilizer Cost', type: 'number', placeholder: '25000', unit: '$', min: 0 },
    { id: 'chemicalCost', label: 'Chemical/Spray Cost', type: 'number', placeholder: '8000', unit: '$', min: 0 },
    { id: 'fuelCost', label: 'Fuel & Machinery', type: 'number', placeholder: '12000', unit: '$', min: 0 },
    { id: 'laborCost', label: 'Labor', type: 'number', placeholder: '10000', unit: '$', min: 0 },
    { id: 'landCost', label: 'Land Cost (rent/mortgage)', type: 'number', placeholder: '50000', unit: '$', min: 0 },
    { id: 'otherCost', label: 'Other Costs', type: 'number', placeholder: '5000', unit: '$', min: 0 },
  ],
  calculate: (inputs) => {
    const acres = Number(inputs.acres) || 1;
    const costs = ['seedCost', 'fertilizerCost', 'chemicalCost', 'fuelCost', 'laborCost', 'landCost', 'otherCost']
      .reduce((sum, key) => sum + (Number(inputs[key]) || 0), 0);
    const perAcre = costs / acres;
    return {
      results: [
        { label: 'Total Costs', value: Math.round(costs), unit: '$', color: 'blue' },
        { label: 'Cost Per Acre', value: Math.round(perAcre * 100) / 100, unit: '$/acre', color: 'orange' },
      ],
      totalLabel: 'Cost per acre', totalValue: Math.round(perAcre * 100) / 100, totalUnit: '$/acre',
    };
  },
  seo: { title: 'Cost Per Acre Calculator — Farm Production Costs', description: 'Calculate total cost per acre for crop production. Break down seed, fertilizer, chemical, fuel, labor, and land costs.' },
  tips: ['Typical corn production costs are $400-700 per acre.', 'Land cost is usually the largest single expense.', 'Track costs by field to identify your most and least profitable areas.'],
  faqs: [{ question: 'What does it cost to farm an acre of corn?', answer: 'Total costs range from $400-700/acre including land, seed ($100-150), fertilizer ($80-150), chemicals ($30-60), and machinery ($60-100).' }],
  relatedCalculators: [{ title: 'Farm Profit/Loss', href: '/calculators/economics/farm-profit-loss' }, { title: 'Break-Even Price', href: '/calculators/economics/break-even-price' }],
  howToSteps: [
    'Enter the total number of acres farmed.',
    'Fill in each cost category: seed, fertilizer, chemicals, fuel, labor, land, and other.',
    'Click Calculate to see total costs and cost per acre.',
  ],
  nextSteps: [
    { title: 'Farm Profit & Loss', href: '/calculators/economics/farm-profit-loss' },
    { title: 'Break-Even Price Calculator', href: '/calculators/economics/break-even-price' },
    { title: 'Fuel Cost Per Acre', href: '/calculators/economics/fuel-cost' },
    { title: 'NPK Fertilizer Calculator', href: '/calculators/fertilizer/npk/' },
  ],
  howToUse: 'Enter the total number of acres you farm. Then fill in each cost category: seed, fertilizer, chemicals, fuel and machinery, labor, land cost, and any other expenses. The calculator totals everything and divides by acres to show your per-acre production cost.',
  whyItMatters: 'Knowing your cost per acre is the foundation of every farm financial decision. It determines your break-even price, helps you compare profitability across fields, and reveals which input categories are consuming the most money.',
  methodology: 'Total costs = Seed + Fertilizer + Chemicals + Fuel + Labor + Land + Other. Cost per acre = Total costs / Total acres. Tracking each category separately helps identify where cost reductions will have the biggest impact on profitability.',
  commonMistakes: [
    'Leaving out overhead costs like insurance, accounting fees, and farm shop expenses.',
    'Not including the cost of unpaid family labor at market rates.',
    'Using last year\'s input prices instead of current-season costs.',
    'Averaging costs across all fields instead of tracking per-field profitability.',
  ],
};

const breakEvenPrice: CalculatorConfig = {
  slug: 'break-even-price', cluster: 'economics',
  title: 'Break-Even Price Calculator',
  description: 'Calculate the minimum price per bushel needed to cover production costs.',
  fields: [
    { id: 'totalCosts', label: 'Total Production Costs', type: 'number', placeholder: '200000', unit: '$', min: 0, required: true },
    { id: 'acres', label: 'Total Acres', type: 'number', placeholder: '500', unit: 'acres', min: 0.1 },
    { id: 'expectedYield', label: 'Expected Yield', type: 'number', placeholder: '200', unit: 'bu/acre', min: 0.1 },
  ],
  calculate: (inputs) => {
    const costs = Number(inputs.totalCosts) || 0;
    const acres = Number(inputs.acres) || 1;
    const yield_ = Number(inputs.expectedYield) || 1;
    const totalBushels = acres * yield_;
    const breakEven = costs / totalBushels;
    const costPerAcre = costs / acres;
    return {
      results: [
        { label: 'Break-Even Price', value: Math.round(breakEven * 100) / 100, unit: '$/bu', color: 'orange' },
        { label: 'Total Bushels', value: Math.round(totalBushels), unit: 'bu', color: 'blue' },
        { label: 'Cost Per Acre', value: Math.round(costPerAcre * 100) / 100, unit: '$/acre', color: 'green' },
      ],
      totalLabel: 'Break-even price', totalValue: Math.round(breakEven * 100) / 100, totalUnit: '$/bu',
    };
  },
  seo: { title: 'Break-Even Price Calculator — Minimum Crop Price', description: 'Calculate the minimum price per bushel to cover production costs. Essential for marketing decisions.' },
  tips: ['Know your break-even before making forward contracting decisions.', 'Calculate break-even for each field individually — they may differ significantly.'],
  faqs: [{ question: 'What is break-even price?', answer: 'The minimum price per unit (bushel, ton, etc.) at which revenue equals total production costs. Selling above break-even generates profit.' }],
  relatedCalculators: [{ title: 'Farm Profit/Loss', href: '/calculators/economics/farm-profit-loss' }, { title: 'Cost Per Acre', href: '/calculators/economics/cost-per-acre' }],
  howToSteps: [
    'Enter your total production costs for the season.',
    'Provide the total acres planted.',
    'Enter the expected yield per acre in bushels.',
    'Click Calculate to see the minimum price needed to break even.',
  ],
  nextSteps: [
    { title: 'Farm Profit & Loss', href: '/calculators/economics/farm-profit-loss' },
    { title: 'Cost Per Acre Calculator', href: '/calculators/economics/cost-per-acre' },
    { title: 'Crop Insurance Estimator', href: '/calculators/economics/crop-insurance' },
    { title: 'Yield Per Acre Calculator', href: '/calculators/yield/yield-per-acre/' },
  ],
  howToUse: 'Enter your total production costs for the season and the total acres planted. Then enter your expected yield per acre in bushels (or other units). The calculator divides total costs by total production to show the minimum price you must receive to cover expenses.',
  whyItMatters: 'Break-even price is the single most important number for grain marketing decisions. If the market price is above your break-even, you are profitable. Knowing this number before harvest helps you set forward contract prices, evaluate hedging strategies, and avoid selling at a loss.',
  methodology: 'Total bushels = Acres × Expected yield per acre. Break-even price = Total production costs / Total bushels. Cost per acre = Total costs / Acres. This gives the minimum selling price where revenue exactly equals expenses with zero profit.',
  commonMistakes: [
    'Using optimistic yield estimates — calculate break-even at both average and below-average yields.',
    'Not including marketing, storage, and transportation costs in total production costs.',
    'Forgetting to recalculate break-even as input costs change during the season.',
    'Comparing break-even to cash price without accounting for basis (local price difference from futures).',
  ],
};

const cashRent: CalculatorConfig = {
  slug: 'cash-rent', cluster: 'economics',
  title: 'Cash Rent Calculator',
  description: 'Estimate fair cash rent based on land value, expected returns, and property taxes.',
  fields: [
    { id: 'landValue', label: 'Land Value', type: 'number', placeholder: '10000', unit: '$/acre', min: 0, required: true },
    { id: 'returnRate', label: 'Expected Return Rate', type: 'number', placeholder: '3', unit: '%', min: 0, max: 20, step: 0.1 },
    { id: 'propertyTax', label: 'Property Tax', type: 'number', placeholder: '20', unit: '$/acre', min: 0 },
    { id: 'acres', label: 'Total Acres', type: 'number', placeholder: '100', unit: 'acres', min: 0.1 },
  ],
  calculate: (inputs) => {
    const value = Number(inputs.landValue) || 0;
    const rate = (Number(inputs.returnRate) || 3) / 100;
    const tax = Number(inputs.propertyTax) || 0;
    const acres = Number(inputs.acres) || 1;
    const rentPerAcre = (value * rate) + tax;
    const totalRent = rentPerAcre * acres;
    return {
      results: [
        { label: 'Fair Cash Rent', value: Math.round(rentPerAcre * 100) / 100, unit: '$/acre', color: 'blue' },
        { label: 'Total Annual Rent', value: Math.round(totalRent), unit: '$', color: 'orange' },
        { label: 'Return on Land', value: Math.round(value * rate * 100) / 100, unit: '$/acre', color: 'green' },
      ],
      totalLabel: 'Fair cash rent', totalValue: Math.round(rentPerAcre * 100) / 100, totalUnit: '$/acre',
    };
  },
  seo: { title: 'Cash Rent Calculator — Fair Farm Land Rent', description: 'Calculate fair cash rent for farm land based on land value, return rate, and property taxes.' },
  tips: ['Cash rent typically equals 2-4% of land value plus taxes.', 'Compare to local cash rent surveys from your university extension.', 'Consider soil productivity and drainage quality in negotiations.'],
  faqs: [{ question: 'What is fair cash rent for farm land?', answer: 'Fair cash rent is typically 2-4% of land value plus property taxes. For $10,000/acre land, that is $200-400/acre plus taxes.' }],
  relatedCalculators: [{ title: 'Land Value', href: '/calculators/economics/land-value' }, { title: 'Farm Profit/Loss', href: '/calculators/economics/farm-profit-loss' }],
  howToSteps: [
    'Enter the land value per acre from recent comparable sales.',
    'Set the expected return rate (typically 2-4%).',
    'Provide the annual property tax per acre.',
    'Click Calculate to see the fair cash rent and total annual rent.',
  ],
  nextSteps: [
    { title: 'Land Value Estimator', href: '/calculators/economics/land-value' },
    { title: 'Farm Profit & Loss', href: '/calculators/economics/farm-profit-loss' },
    { title: 'Farm ROI Calculator', href: '/calculators/economics/farm-roi' },
  ],
  howToUse: 'Enter the land value per acre from recent comparable sales in your area. Set the expected return rate (typically 2-4% for farmland) and the annual property tax per acre. Enter total acres to see the full annual rent amount. Compare results to local rent surveys.',
  whyItMatters: 'Fair cash rent balances the landowner\'s need for return on investment with the tenant\'s need for affordable costs. Overpaying rent is the fastest way to make a farm unprofitable, while underpaying leads to losing lease agreements to competing tenants.',
  methodology: 'Fair cash rent = (Land value per acre × Return rate) + Property tax per acre. Total annual rent = Rent per acre × Total acres. The return rate represents the landowner\'s expected yield on their capital investment, comparable to other investment alternatives.',
  commonMistakes: [
    'Using outdated land values — farmland prices can change 5-15% per year.',
    'Not comparing your calculated rent to actual local cash rent surveys from university extension.',
    'Ignoring soil quality differences between fields — a high-CSR field commands more rent.',
    'Forgetting that the tenant typically pays for all inputs, repairs, and crop insurance on top of rent.',
  ],
};

const landValue: CalculatorConfig = {
  slug: 'land-value', cluster: 'economics',
  title: 'Land Value Estimator',
  description: 'Estimate farm land value based on comparable sales and productivity.',
  fields: [
    { id: 'comparablePrice', label: 'Comparable Sale Price', type: 'number', placeholder: '10000', unit: '$/acre', min: 0, required: true },
    { id: 'productivityIndex', label: 'Productivity Index (CSR/PI)', type: 'number', placeholder: '85', min: 0, max: 150, helpText: 'Your field vs comparable (higher = better soil)' },
    { id: 'compProductivity', label: 'Comparable Productivity Index', type: 'number', placeholder: '80', min: 0, max: 150 },
    { id: 'acres', label: 'Your Parcel Size', type: 'number', placeholder: '80', unit: 'acres', min: 0.1 },
  ],
  calculate: (inputs) => {
    const compPrice = Number(inputs.comparablePrice) || 0;
    const myPI = Number(inputs.productivityIndex) || 85;
    const compPI = Number(inputs.compProductivity) || 80;
    const acres = Number(inputs.acres) || 1;
    const adjustedPrice = compPI > 0 ? compPrice * (myPI / compPI) : compPrice;
    const totalValue = adjustedPrice * acres;
    return {
      results: [
        { label: 'Estimated Value/Acre', value: Math.round(adjustedPrice), unit: '$/acre', color: 'blue' },
        { label: 'Total Parcel Value', value: Math.round(totalValue), unit: '$', color: 'orange' },
        { label: 'Productivity Adjustment', value: Math.round(((myPI / compPI) - 1) * 10000) / 100, unit: '%', color: 'green' },
      ],
      totalLabel: 'Estimated land value', totalValue: Math.round(adjustedPrice), totalUnit: '$/acre',
    };
  },
  seo: { title: 'Land Value Estimator — Farm Land Appraisal', description: 'Estimate farm land value based on comparable sales and soil productivity index.' },
  tips: ['Always use recent comparable sales within 5 miles if possible.', 'Soil quality (CSR/PI) is the strongest predictor of farm land value.', 'Drainage, road access, and field shape also affect value.'],
  faqs: [{ question: 'What determines farm land value?', answer: 'Soil productivity, location, drainage, field size/shape, and comparable sales are the primary factors.' }],
  relatedCalculators: [{ title: 'Cash Rent', href: '/calculators/economics/cash-rent' }],
  howToSteps: [
    'Enter a comparable sale price per acre from a recent transaction.',
    'Provide the productivity index (CSR/PI) for your field and the comparable field.',
    'Enter your parcel size in acres.',
    'Click Calculate to see the adjusted per-acre value and total parcel value.',
  ],
  nextSteps: [
    { title: 'Cash Rent Calculator', href: '/calculators/economics/cash-rent' },
    { title: 'Farm Loan Payment Calculator', href: '/calculators/economics/farm-loan' },
    { title: 'Farm ROI Calculator', href: '/calculators/economics/farm-roi' },
  ],
  howToUse: 'Enter a comparable sale price per acre from a recent nearby transaction. Provide the soil productivity index (CSR or PI) for both your field and the comparable sale. Enter your parcel size in acres. The calculator adjusts the sale price based on relative soil quality.',
  whyItMatters: 'Accurate land valuation is essential for buying, selling, estate planning, and securing farm loans. Soil productivity is the strongest predictor of farmland value, so adjusting for it gives a more reliable estimate than using raw comparable sales alone.',
  methodology: 'Adjusted value = Comparable sale price × (Your productivity index / Comparable productivity index). Total parcel value = Adjusted value per acre × Acres. The productivity adjustment accounts for yield potential differences between your field and the comparable sale.',
  commonMistakes: [
    'Using comparables from too far away — land values vary significantly even within a county.',
    'Ignoring non-soil factors like drainage quality, field shape, road access, and buildings.',
    'Using a single comparable sale instead of averaging 3-5 recent transactions.',
    'Not adjusting for market timing — a sale from 2 years ago may not reflect current values.',
  ],
};

const cropInsurance: CalculatorConfig = {
  slug: 'crop-insurance', cluster: 'economics',
  title: 'Crop Insurance Estimator',
  description: 'Estimate crop insurance premium and revenue guarantee based on coverage level and price.',
  fields: [
    { id: 'acres', label: 'Acres', type: 'number', placeholder: '500', unit: 'acres', min: 0.1, required: true },
    { id: 'aphYield', label: 'APH Yield', type: 'number', placeholder: '180', unit: 'bu/acre', min: 1 },
    { id: 'projectedPrice', label: 'Projected Price', type: 'number', placeholder: '5.50', unit: '$/bu', min: 0, step: 0.01 },
    { id: 'coverageLevel', label: 'Coverage Level', type: 'select', options: [
      { value: '0.85', label: '85%' }, { value: '0.80', label: '80%' }, { value: '0.75', label: '75%' }, { value: '0.70', label: '70%' },
    ] },
    { id: 'premiumRate', label: 'Premium Rate', type: 'number', placeholder: '5', unit: '%', min: 0, max: 30, step: 0.1 },
  ],
  calculate: (inputs) => {
    const acres = Number(inputs.acres) || 0;
    const aph = Number(inputs.aphYield) || 0;
    const price = Number(inputs.projectedPrice) || 0;
    const coverage = Number(inputs.coverageLevel) || 0.80;
    const rate = (Number(inputs.premiumRate) || 5) / 100;
    const guarantee = aph * coverage * price;
    const totalGuarantee = guarantee * acres;
    const premium = totalGuarantee * rate;
    const premiumPerAcre = acres > 0 ? premium / acres : 0;
    return {
      results: [
        { label: 'Revenue Guarantee', value: Math.round(guarantee * 100) / 100, unit: '$/acre', color: 'blue' },
        { label: 'Premium Per Acre', value: Math.round(premiumPerAcre * 100) / 100, unit: '$/acre', color: 'orange' },
        { label: 'Total Premium', value: Math.round(premium), unit: '$', color: 'purple' },
        { label: 'Total Guarantee', value: Math.round(totalGuarantee), unit: '$', color: 'green' },
      ],
      totalLabel: 'Revenue guarantee per acre', totalValue: Math.round(guarantee * 100) / 100, totalUnit: '$/acre',
    };
  },
  seo: { title: 'Crop Insurance Estimator — Premium & Guarantee', description: 'Estimate crop insurance premium and revenue guarantee. Compare coverage levels for your farm.' },
  tips: ['Higher coverage levels cost more but provide better protection.', 'Revenue Protection (RP) is the most popular policy — it covers both price and yield.', 'Sign up by the March 15 deadline for spring crops.'],
  faqs: [{ question: 'What is APH yield?', answer: 'Actual Production History — the average of your proven yields over 4-10 years, used to set your coverage level.' }],
  relatedCalculators: [{ title: 'Farm Profit/Loss', href: '/calculators/economics/farm-profit-loss' }, { title: 'Break-Even Price', href: '/calculators/economics/break-even-price' }],
  howToSteps: [
    'Enter the total acres to insure.',
    'Provide your APH (Actual Production History) yield and projected price.',
    'Select a coverage level (70-85%) and enter the premium rate.',
    'Click Calculate to see your revenue guarantee and estimated premium.',
  ],
  nextSteps: [
    { title: 'Farm Profit & Loss', href: '/calculators/economics/farm-profit-loss' },
    { title: 'Break-Even Price Calculator', href: '/calculators/economics/break-even-price' },
    { title: 'Cost Per Acre Calculator', href: '/calculators/economics/cost-per-acre' },
  ],
  howToUse: 'Enter the total acres you want to insure and your APH (Actual Production History) yield. Provide the projected price from RMA (set each February for spring crops). Select your coverage level and enter the premium rate from your crop insurance agent.',
  whyItMatters: 'Crop insurance is the primary risk management tool for American farmers, protecting against both yield loss and price declines. Choosing the right coverage level balances premium cost against protection — too little coverage leaves you exposed, while too much erodes profit margins.',
  methodology: 'Revenue guarantee per acre = APH yield × Coverage level × Projected price. Total guarantee = Per-acre guarantee × Acres. Estimated premium = Total guarantee × Premium rate. Actual premiums are subsidized 50-65% by USDA depending on coverage level.',
  commonMistakes: [
    'Waiting too long to sign up — the deadline is March 15 for spring crops in most states.',
    'Not updating APH records with actual yields each year, which can lower your guarantee.',
    'Choosing the cheapest coverage without analyzing whether it actually covers your costs.',
    'Forgetting that prevented planting coverage pays only 55-60% of your full guarantee.',
  ],
};

const farmLoan: CalculatorConfig = {
  slug: 'farm-loan', cluster: 'economics',
  title: 'Farm Loan Payment Calculator',
  description: 'Calculate monthly payment, total interest, and total cost of a farm loan.',
  fields: [
    { id: 'loanAmount', label: 'Loan Amount', type: 'number', placeholder: '500000', unit: '$', min: 0, required: true },
    { id: 'interestRate', label: 'Interest Rate', type: 'number', placeholder: '6.5', unit: '%', min: 0, max: 30, step: 0.1 },
    { id: 'termYears', label: 'Loan Term', type: 'number', placeholder: '20', unit: 'years', min: 1, max: 40 },
  ],
  calculate: (inputs) => {
    const principal = Number(inputs.loanAmount) || 0;
    const rate = (Number(inputs.interestRate) || 0) / 100 / 12;
    const months = (Number(inputs.termYears) || 1) * 12;
    const monthly = rate > 0 ? principal * (rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1) : principal / months;
    const totalPaid = monthly * months;
    const totalInterest = totalPaid - principal;
    return {
      results: [
        { label: 'Monthly Payment', value: Math.round(monthly * 100) / 100, unit: '$', color: 'blue' },
        { label: 'Total Interest', value: Math.round(totalInterest), unit: '$', color: 'orange' },
        { label: 'Total Paid', value: Math.round(totalPaid), unit: '$', color: 'purple' },
      ],
      totalLabel: 'Monthly payment', totalValue: Math.round(monthly * 100) / 100, totalUnit: '$',
    };
  },
  seo: { title: 'Farm Loan Payment Calculator — Monthly Payment & Interest', description: 'Calculate farm loan monthly payments, total interest, and total cost. Plan your agricultural financing.' },
  tips: ['FSA loans offer lower interest rates for beginning farmers.', 'Consider variable vs fixed rate based on your risk tolerance.', 'Shorter terms save significantly on total interest paid.'],
  faqs: [{ question: 'What interest rate can I get on a farm loan?', answer: 'Farm loan rates range from 5-8% for real estate and 6-10% for operating loans (2024 rates). FSA rates may be lower.' }],
  relatedCalculators: [{ title: 'Farm ROI', href: '/calculators/economics/farm-roi' }, { title: 'Land Value', href: '/calculators/economics/land-value' }],
  howToSteps: [
    'Enter the total loan amount in dollars.',
    'Provide the annual interest rate.',
    'Set the loan term in years.',
    'Click Calculate to see monthly payment, total interest, and total cost.',
  ],
  nextSteps: [
    { title: 'Farm ROI Calculator', href: '/calculators/economics/farm-roi' },
    { title: 'Land Value Estimator', href: '/calculators/economics/land-value' },
    { title: 'Equipment Depreciation', href: '/calculators/economics/equipment-depreciation' },
    { title: 'Farm Profit & Loss', href: '/calculators/economics/farm-profit-loss' },
  ],
  howToUse: 'Enter the total loan amount, the annual interest rate from your lender, and the loan term in years. The calculator uses standard amortization to show your monthly payment, total interest paid over the life of the loan, and total amount paid.',
  whyItMatters: 'Farm debt is a major factor in cash flow planning. Understanding your monthly payment obligation helps you ensure operating income covers debt service. Comparing different terms and rates reveals how much interest you save with shorter loans or better rates.',
  methodology: 'Monthly payment = P × [r(1+r)^n] / [(1+r)^n - 1], where P = principal, r = monthly interest rate, n = total months. Total interest = (Monthly payment × Total months) - Principal. This is standard fixed-rate amortization used by most agricultural lenders.',
  commonMistakes: [
    'Not comparing FSA loan rates, which are often 1-2% lower than commercial lenders.',
    'Choosing a longer term to reduce monthly payment without calculating the extra interest cost.',
    'Forgetting to include loan payments in your annual cash flow budget.',
    'Taking variable-rate loans without a plan for how to handle rate increases.',
  ],
};

const equipmentDepreciation: CalculatorConfig = {
  slug: 'equipment-depreciation', cluster: 'economics',
  title: 'Equipment Depreciation Calculator',
  description: 'Calculate annual depreciation and current book value for farm equipment.',
  fields: [
    { id: 'purchasePrice', label: 'Purchase Price', type: 'number', placeholder: '150000', unit: '$', min: 0, required: true },
    { id: 'salvageValue', label: 'Salvage Value', type: 'number', placeholder: '30000', unit: '$', min: 0 },
    { id: 'usefulLife', label: 'Useful Life', type: 'number', placeholder: '10', unit: 'years', min: 1 },
    { id: 'currentAge', label: 'Current Age', type: 'number', placeholder: '3', unit: 'years', min: 0 },
  ],
  calculate: (inputs) => {
    const price = Number(inputs.purchasePrice) || 0;
    const salvage = Number(inputs.salvageValue) || 0;
    const life = Number(inputs.usefulLife) || 1;
    const age = Number(inputs.currentAge) || 0;
    const annualDepr = (price - salvage) / life;
    const totalDepr = Math.min(annualDepr * age, price - salvage);
    const bookValue = price - totalDepr;
    return {
      results: [
        { label: 'Annual Depreciation', value: Math.round(annualDepr), unit: '$', color: 'blue' },
        { label: 'Current Book Value', value: Math.round(bookValue), unit: '$', color: 'green' },
        { label: 'Total Depreciation', value: Math.round(totalDepr), unit: '$', color: 'orange' },
      ],
      totalLabel: 'Annual depreciation', totalValue: Math.round(annualDepr), totalUnit: '$',
    };
  },
  seo: { title: 'Equipment Depreciation Calculator — Farm Machinery Book Value', description: 'Calculate farm equipment depreciation and book value using straight-line method.' },
  tips: ['Use MACRS depreciation for tax purposes — it allows faster write-offs.', 'Section 179 allows full expensing of equipment in the purchase year.', 'Track actual hours to estimate remaining useful life.'],
  faqs: [{ question: 'How fast does farm equipment depreciate?', answer: 'Farm equipment typically has a 5-7 year MACRS tax life. Economic useful life is often 10-20 years with proper maintenance.' }],
  relatedCalculators: [{ title: 'Farm Profit/Loss', href: '/calculators/economics/farm-profit-loss' }],
  howToSteps: [
    'Enter the original purchase price of the equipment.',
    'Provide the estimated salvage value and useful life in years.',
    'Enter the current age of the equipment.',
    'Click Calculate to see annual depreciation and current book value.',
  ],
  nextSteps: [
    { title: 'Farm Profit & Loss', href: '/calculators/economics/farm-profit-loss' },
    { title: 'Farm ROI Calculator', href: '/calculators/economics/farm-roi' },
    { title: 'Farm Loan Payment Calculator', href: '/calculators/economics/farm-loan' },
  ],
  howToUse: 'Enter the original purchase price and estimated salvage value (what the equipment will be worth at the end of its useful life). Set the useful life in years and the current age. The calculator shows annual straight-line depreciation and current book value.',
  whyItMatters: 'Depreciation is a real cost that many farmers overlook because it does not require a cash outlay each year. Tracking it accurately ensures your profit and loss statement reflects the true cost of equipment ownership and helps plan for replacement timing.',
  methodology: 'Annual depreciation = (Purchase price - Salvage value) / Useful life. Total depreciation = Annual depreciation × Current age (capped at depreciable amount). Book value = Purchase price - Total depreciation. This is straight-line depreciation, the simplest and most common method.',
  commonMistakes: [
    'Setting salvage value at zero — most farm equipment retains 10-30% of its original value.',
    'Using tax depreciation (MACRS 5-7 years) for economic analysis instead of actual useful life (10-20 years).',
    'Not tracking depreciation per machine, which hides the true cost of older equipment.',
    'Ignoring that actual market value often differs significantly from calculated book value.',
  ],
};

const fuelCost: CalculatorConfig = {
  slug: 'fuel-cost', cluster: 'economics',
  title: 'Fuel Cost Per Acre Calculator',
  description: 'Calculate fuel expenses per acre for field operations.',
  fields: [
    { id: 'acres', label: 'Total Acres', type: 'number', placeholder: '500', unit: 'acres', min: 0.1, required: true },
    { id: 'gallonsPerAcre', label: 'Fuel Use', type: 'number', placeholder: '3.5', unit: 'gal/acre', min: 0, step: 0.1 },
    { id: 'fuelPrice', label: 'Fuel Price', type: 'number', placeholder: '3.50', unit: '$/gallon', min: 0, step: 0.01 },
    { id: 'passes', label: 'Number of Passes', type: 'number', placeholder: '5', min: 1, defaultValue: 1 },
  ],
  calculate: (inputs) => {
    const acres = Number(inputs.acres) || 0;
    const gpa = Number(inputs.gallonsPerAcre) || 0;
    const price = Number(inputs.fuelPrice) || 0;
    const passes = Number(inputs.passes) || 1;
    const totalGallons = gpa * acres * passes;
    const totalCost = totalGallons * price;
    const costPerAcre = acres > 0 ? totalCost / acres : 0;
    return {
      results: [
        { label: 'Total Gallons', value: Math.round(totalGallons), unit: 'gallons', color: 'blue' },
        { label: 'Cost Per Acre', value: Math.round(costPerAcre * 100) / 100, unit: '$/acre', color: 'orange' },
        { label: 'Total Fuel Cost', value: Math.round(totalCost * 100) / 100, unit: '$', color: 'green' },
      ],
      totalLabel: 'Total fuel cost', totalValue: Math.round(totalCost * 100) / 100, totalUnit: '$',
    };
  },
  seo: { title: 'Fuel Cost Per Acre Calculator — Farm Fuel Expenses', description: 'Calculate fuel cost per acre for farm operations. Estimate total gallons and dollars for the season.' },
  tips: ['Typical fuel use: tillage 2-3 gal/acre, planting 0.5-1 gal/acre, spraying 0.3-0.5 gal/acre, harvest 1-2 gal/acre.', 'No-till reduces fuel costs by 50-70% compared to conventional tillage.'],
  faqs: [{ question: 'How much fuel does farming use per acre?', answer: 'Total season fuel use is typically 8-15 gallons per acre for conventional row crops, 4-8 gallons for no-till.' }],
  relatedCalculators: [{ title: 'Cost Per Acre', href: '/calculators/economics/cost-per-acre' }],
  howToSteps: [
    'Enter the total acres for the operation.',
    'Provide fuel consumption in gallons per acre.',
    'Enter the fuel price per gallon and number of passes.',
    'Click Calculate to see total gallons, cost per acre, and total fuel cost.',
  ],
  nextSteps: [
    { title: 'Cost Per Acre Calculator', href: '/calculators/economics/cost-per-acre' },
    { title: 'Custom Hire Rate Calculator', href: '/calculators/economics/custom-hire-rate' },
    { title: 'Farm Profit & Loss', href: '/calculators/economics/farm-profit-loss' },
  ],
  howToUse: 'Enter the total acres for the operation. Provide the fuel consumption rate in gallons per acre for each pass (tillage, planting, spraying, etc.). Enter the current fuel price per gallon and the number of passes over the field. The calculator totals your fuel cost.',
  whyItMatters: 'Fuel is typically 5-10% of total crop production costs and is one of the most volatile input prices. Tracking fuel cost per acre helps you evaluate whether conservation tillage, precision agriculture, or custom hiring would save money compared to owning equipment.',
  methodology: 'Total gallons = Fuel use per acre × Total acres × Number of passes. Total cost = Total gallons × Fuel price. Cost per acre = Total cost / Acres. Typical fuel use ranges from 0.3 gal/acre for spraying to 3 gal/acre for deep tillage.',
  commonMistakes: [
    'Forgetting to count all passes — a corn crop may require 5-8 separate field operations.',
    'Using average fuel consumption instead of measuring actual use per operation.',
    'Not including road travel between fields in fuel estimates for scattered acreage.',
    'Ignoring that larger, more efficient tractors often use less fuel per acre despite higher GPH.',
  ],
};

const customHireRate: CalculatorConfig = {
  slug: 'custom-hire-rate', cluster: 'economics',
  title: 'Custom Hire Rate Calculator',
  description: 'Calculate custom farm operation costs by acres and rate.',
  fields: [
    { id: 'operation', label: 'Operation', type: 'select', options: [
      { value: '18', label: 'Tillage — ~$18/acre' }, { value: '22', label: 'Planting — ~$22/acre' },
      { value: '10', label: 'Spraying — ~$10/acre' }, { value: '38', label: 'Combining — ~$38/acre' },
      { value: '6', label: 'Hauling — ~$6/acre' }, { value: '15', label: 'Fertilizer Application — ~$15/acre' },
    ] },
    { id: 'acres', label: 'Total Acres', type: 'number', placeholder: '500', unit: 'acres', min: 0.1, required: true },
    { id: 'customRate', label: 'Custom Rate (override)', type: 'number', placeholder: '', unit: '$/acre', min: 0, step: 0.5, helpText: 'Leave blank to use typical rate' },
  ],
  calculate: (inputs) => {
    const defaultRate = Number(inputs.operation) || 0;
    const acres = Number(inputs.acres) || 0;
    const customRate = Number(inputs.customRate) || defaultRate;
    const totalCost = customRate * acres;
    return {
      results: [
        { label: 'Rate Per Acre', value: customRate, unit: '$/acre', color: 'blue' },
        { label: 'Total Cost', value: Math.round(totalCost * 100) / 100, unit: '$', color: 'orange' },
      ],
      totalLabel: 'Total custom hire cost', totalValue: Math.round(totalCost * 100) / 100, totalUnit: '$',
    };
  },
  seo: { title: 'Custom Hire Rate Calculator — Farm Operation Costs', description: 'Calculate custom hire costs for farm operations including tillage, planting, spraying, and combining.' },
  tips: ['Custom rates vary significantly by region and equipment size.', 'Check your state university extension for current custom rate surveys.', 'Negotiate multi-operation discounts with custom operators.'],
  faqs: [{ question: 'What is custom hire?', answer: 'Hiring a contractor with their own equipment to perform field operations like planting, spraying, or harvesting on your land.' }],
  relatedCalculators: [{ title: 'Cost Per Acre', href: '/calculators/economics/cost-per-acre' }, { title: 'Fuel Cost', href: '/calculators/economics/fuel-cost' }],
  howToSteps: [
    'Select the type of field operation from the dropdown.',
    'Enter the total acres for the job.',
    'Optionally override the typical rate with a custom rate.',
    'Click Calculate to see rate per acre and total cost.',
  ],
  nextSteps: [
    { title: 'Cost Per Acre Calculator', href: '/calculators/economics/cost-per-acre' },
    { title: 'Fuel Cost Per Acre', href: '/calculators/economics/fuel-cost' },
    { title: 'Farm Profit & Loss', href: '/calculators/economics/farm-profit-loss' },
    { title: 'Equipment Depreciation', href: '/calculators/economics/equipment-depreciation' },
  ],
  howToUse: 'Select the field operation type from the dropdown to use a typical rate, or enter a custom rate from your local contractor. Enter the total acres for the job. The calculator shows rate per acre and total cost for the operation.',
  whyItMatters: 'Custom hiring can be cheaper than owning equipment for small acreages or infrequent operations. Knowing exact custom hire costs helps you decide whether to buy equipment, hire a contractor, or trade work with a neighbor — a decision worth thousands of dollars annually.',
  methodology: 'Total cost = Rate per acre × Total acres. Typical rates are based on state university extension surveys and vary by region, equipment size, and fuel prices. Custom rates generally include the operator, equipment, fuel, and basic repairs.',
  commonMistakes: [
    'Comparing custom hire rates only to fuel cost instead of the full cost of ownership (depreciation, repairs, insurance).',
    'Not locking in rates early in the season — custom operators book up fast.',
    'Forgetting that timeliness matters — late planting or harvest from waiting for a custom operator costs yield.',
    'Not clarifying what is included in the rate — some charge extra for fuel, setup, or travel.',
  ],
};

const farmROI: CalculatorConfig = {
  slug: 'farm-roi', cluster: 'economics',
  title: 'Farm ROI Calculator',
  description: 'Calculate return on investment for farm operations or capital investments.',
  fields: [
    { id: 'investment', label: 'Total Investment', type: 'number', placeholder: '500000', unit: '$', min: 0, required: true },
    { id: 'annualReturn', label: 'Annual Net Return', type: 'number', placeholder: '50000', unit: '$', min: 0 },
  ],
  calculate: (inputs) => {
    const investment = Number(inputs.investment) || 1;
    const annual = Number(inputs.annualReturn) || 0;
    const roi = (annual / investment) * 100;
    const payback = annual > 0 ? investment / annual : 0;
    return {
      results: [
        { label: 'ROI', value: Math.round(roi * 10) / 10, unit: '%', color: 'blue' },
        { label: 'Payback Period', value: Math.round(payback * 10) / 10, unit: 'years', color: 'orange' },
        { label: 'Annual Return', value: Math.round(annual), unit: '$', color: 'green' },
      ],
      totalLabel: 'Return on investment', totalValue: Math.round(roi * 10) / 10, totalUnit: '%',
    };
  },
  seo: { title: 'Farm ROI Calculator — Return on Investment', description: 'Calculate farm return on investment and payback period for capital investments.' },
  tips: ['Target 10-15% ROI on farm equipment investments.', 'Include all costs (maintenance, insurance, depreciation) in your return calculation.', 'Compare ROI across investment options before committing capital.'],
  faqs: [{ question: 'What is a good ROI for farming?', answer: '8-15% ROI is considered good for farm operations. Land investments may return 3-5% annually but appreciate over time.' }],
  relatedCalculators: [{ title: 'Farm Profit/Loss', href: '/calculators/economics/farm-profit-loss' }, { title: 'Farm Loan', href: '/calculators/economics/farm-loan' }],
  howToSteps: [
    'Enter the total investment amount in dollars.',
    'Provide the expected annual net return.',
    'Click Calculate to see ROI percentage and payback period.',
  ],
  nextSteps: [
    { title: 'Farm Profit & Loss', href: '/calculators/economics/farm-profit-loss' },
    { title: 'Farm Loan Payment Calculator', href: '/calculators/economics/farm-loan' },
    { title: 'Land Value Estimator', href: '/calculators/economics/land-value' },
    { title: 'Yield Per Acre Calculator', href: '/calculators/yield/yield-per-acre/' },
  ],
  howToUse: 'Enter the total investment amount — this could be the cost of new equipment, a land purchase, or a facility improvement. Then enter the expected annual net return (revenue generated minus operating costs attributable to that investment). The calculator shows ROI percentage and payback period.',
  whyItMatters: 'Capital is limited on every farm. Calculating ROI before making major purchases helps you prioritize investments that generate the highest returns. A grain bin that pays for itself in 3 years is a better use of capital than one that takes 15 years.',
  methodology: 'ROI = (Annual net return / Total investment) × 100. Payback period = Total investment / Annual net return (in years). This is a simplified ROI that does not account for the time value of money. For large investments, also consider net present value (NPV).',
  commonMistakes: [
    'Overestimating annual returns by using best-case scenarios instead of realistic averages.',
    'Not including all costs — maintenance, insurance, and taxes reduce net return.',
    'Ignoring the payback period — a 10% ROI sounds good until you realize the investment takes 10 years to recoup.',
    'Comparing farm ROI to stock market returns without accounting for the tax advantages of farm asset depreciation.',
  ],
};

export const economicsConfigs: CalculatorConfig[] = [
  farmProfitLoss, costPerAcre, breakEvenPrice, cashRent, landValue,
  cropInsurance, farmLoan, equipmentDepreciation, fuelCost, customHireRate, farmROI,
];
