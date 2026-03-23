import type { Guide } from './types';
import { registerGuide } from './registry';

const howMuchMulch: Guide = {
  slug: 'how-much-mulch-do-i-need',
  title: 'How Much Mulch Do I Need? Calculate Yards & Cost',
  description:
    'Learn how to calculate exactly how much mulch you need for any garden bed or landscape. Covers depth, square footage, cubic yards, and cost estimates.',
  content: `Figuring out how much mulch you need comes down to three measurements: length, width, and desired depth. Multiply length by width to get square footage, then multiply by depth in feet to get cubic feet. Divide cubic feet by 27 to convert to cubic yards, which is how mulch is sold in bulk.

For most garden beds, apply 2-3 inches of mulch. Use 2 inches for fine-textured mulch like shredded hardwood, and 3-4 inches for coarser materials like wood chips or pine bark nuggets. Vegetable gardens typically need only 2 inches to suppress weeds while allowing water penetration.

A single cubic yard of mulch covers approximately 162 square feet at 2 inches deep, 108 square feet at 3 inches, or 81 square feet at 4 inches. Bagged mulch is sold in 2-cubic-foot bags, so one cubic yard equals about 13.5 bags. Bulk delivery is significantly cheaper for areas over 200 square feet, typically running $25-$50 per cubic yard versus $4-$7 per bag.

When calculating, add 5-10% extra to account for irregular bed shapes and settling. Organic mulches decompose over time and need annual top-ups of 1-2 inches. For a 500-square-foot bed at 3 inches deep, you need roughly 4.6 cubic yards or about 62 bags.

Timing matters for mulch application. Apply mulch in late spring after soil has warmed, or in fall to insulate perennials for winter. Avoid piling mulch against tree trunks or plant stems, which traps moisture and promotes rot. Leave a 3-6 inch gap around trunks, creating a donut shape rather than a volcano.

Landscape fabric under mulch is optional but extends weed suppression. However, it can prevent organic mulch from breaking down and enriching the soil beneath it. For most homeowners, a thick layer of quality mulch applied annually provides adequate weed control without fabric.

Different mulch types serve different purposes. Hardwood mulch decomposes slowly and is best for permanent landscapes. Pine straw works well on slopes because it interlocks and resists washing. Rubber mulch does not decompose but is only appropriate for playgrounds, not gardens. For vegetable beds, straw or shredded leaves are inexpensive and break down to improve soil structure over a single growing season.`,
  relatedCalculators: [
    { title: 'Mulch Calculator', href: '/calculators/conversions/mulch-calculator/' },
    { title: 'Soil Volume Calculator', href: '/calculators/conversions/soil-volume/' },
    { title: 'Cubic Yards to Tons', href: '/calculators/conversions/cubic-yards-to-tons/' },
    { title: 'Compost Calculator', href: '/calculators/fertilizer/compost/' },
    { title: 'Cost Per Acre Calculator', href: '/calculators/economics/cost-per-acre/' },
  ],
  faqs: [
    {
      question: 'How many bags of mulch do I need for a 10x10 area?',
      answer:
        'For a 10x10 foot area (100 sq ft) at 3 inches deep, you need about 25 cubic feet of mulch, which equals roughly 13 standard 2-cubic-foot bags or just under 1 cubic yard of bulk mulch.',
    },
    {
      question: 'Is it cheaper to buy mulch in bulk or by the bag?',
      answer:
        'Bulk mulch is almost always cheaper for larger areas. Bulk runs $25-$50 per cubic yard, while bagged mulch costs $54-$95 per cubic yard equivalent. The break-even point is usually around 2-3 cubic yards, factoring in delivery fees.',
    },
    {
      question: 'How deep should mulch be?',
      answer:
        'Apply 2-3 inches for most landscape beds. Use 2 inches for fine mulch and 3-4 inches for coarse materials. Never exceed 4 inches, as overly thick mulch can suffocate roots and repel water.',
    },
    {
      question: 'How often should I replace mulch?',
      answer:
        'Organic mulch should be refreshed annually by adding 1-2 inches on top of the decomposed layer. A full replacement every 2-3 years prevents buildup of fungi and pests. Pine bark lasts longest (2-3 years), while shredded hardwood decomposes in about 1 year.',
    },
  ],
};

const fertilizerPerAcre: Guide = {
  slug: 'how-much-fertilizer-per-acre',
  title: 'How Much Fertilizer Per Acre? Rates by Crop',
  description:
    'Determine the right fertilizer application rate per acre for corn, wheat, soybeans, and more. Includes NPK recommendations and soil test guidance.',
  content: `The amount of fertilizer per acre depends on the crop, soil test results, yield goal, and previous crop history. Without a soil test, you are guessing, and guessing usually means wasting money or leaving yield on the table. A basic soil test costs $15-$30 and pays for itself many times over.

For corn targeting 180 bushels per acre, a general starting point is 180-200 lbs of nitrogen (N), 50-80 lbs of P2O5, and 40-60 lbs of K2O per acre. Nitrogen is the primary driver of corn yield, and the rule of thumb is 1.0-1.2 lbs of N per bushel of expected yield. Split applications, with some N at planting and the rest as sidedress at V6-V8, improve efficiency by 10-15% compared to a single preplant application.

Wheat requires 60-120 lbs of N per acre depending on yield goal and variety. Soft red winter wheat typically needs 80-100 lbs N for a 60-70 bushel goal. Hard red winter wheat may need 100-120 lbs N for milling quality protein. Topdress nitrogen in early spring when wheat breaks dormancy.

Soybeans generally do not need nitrogen fertilizer because they fix their own through Rhizobium bacteria. However, they are heavy users of phosphorus (40-60 lbs P2O5 per acre) and potassium (80-120 lbs K2O per acre), especially at high yield levels above 50 bushels per acre.

To convert nutrient recommendations to actual product, divide the nutrient pounds by the analysis percentage. For example, if you need 150 lbs of N and are using urea (46-0-0), divide 150 by 0.46 to get 326 lbs of urea per acre. For DAP (18-46-0), 100 lbs of product supplies 18 lbs N and 46 lbs P2O5.

Soil pH affects nutrient availability more than any other factor. At a pH below 6.0, phosphorus and several micronutrients become locked up regardless of how much fertilizer you apply. Always correct pH with lime before investing heavily in fertilizer. The most expensive fertilizer in the world cannot overcome poor soil pH.

Manure and compost provide significant nutrients but require testing to know exact content. Dairy manure typically supplies 10-15 lbs N, 5-8 lbs P2O5, and 10-15 lbs K2O per ton. Credit these nutrients against your fertilizer recommendation to avoid over-application, particularly of phosphorus.`,
  relatedCalculators: [
    { title: 'NPK Calculator', href: '/calculators/fertilizer/npk/' },
    { title: 'Fertilizer Cost Calculator', href: '/calculators/fertilizer/fertilizer-cost/' },
    { title: 'Nitrogen Calculator', href: '/calculators/fertilizer/nitrogen/' },
    { title: 'Compost Calculator', href: '/calculators/fertilizer/compost/' },
    { title: 'Lime Calculator', href: '/calculators/fertilizer/lime/' },
    { title: 'Corn Seeding Rate', href: '/calculators/seeding/corn/' },
  ],
  faqs: [
    {
      question: 'How much 10-10-10 fertilizer per acre?',
      answer:
        'It depends on your soil test. If you need 50 lbs each of N, P2O5, and K2O, you would apply 500 lbs of 10-10-10 per acre (50 / 0.10 = 500). However, balanced fertilizers rarely match actual soil needs, so a custom blend based on soil testing is more cost-effective.',
    },
    {
      question: 'How much urea per acre for corn?',
      answer:
        'For corn at a 180 bu/acre yield goal needing 180 lbs of N, you would apply approximately 391 lbs of urea per acre (180 / 0.46 = 391). Split into a preplant application and sidedress for best efficiency.',
    },
    {
      question: 'Can you apply too much fertilizer?',
      answer:
        'Yes. Excess nitrogen can burn crops, delay maturity, promote lodging, and contaminate groundwater. Excess phosphorus accumulates in soil and runs off into waterways. Always follow soil test recommendations and never exceed university guidelines for your crop.',
    },
  ],
};

const whenToPlantTomatoes: Guide = {
  slug: 'when-to-plant-tomatoes',
  title: 'When to Plant Tomatoes by Zone (2024 Guide)',
  description:
    'Find the best time to plant tomatoes based on your USDA hardiness zone. Covers transplant dates, soil temperature, and frost protection for all 50 states.',
  content: `Tomatoes are warm-season crops that cannot tolerate frost. The safe planting date depends on your USDA hardiness zone, specifically your last expected spring frost date. Transplant tomatoes outdoors 1-2 weeks after the last frost date, when nighttime temperatures consistently stay above 50F and soil has warmed to at least 60F at 4-inch depth.

Zone 3 (northern Minnesota, Montana): Transplant late May to early June. The short growing season of 90-100 frost-free days demands early-maturing varieties like Early Girl (50 days) or Stupice (55 days). Use black plastic mulch and row covers to gain an extra 2-3 weeks.

Zone 4-5 (upper Midwest, New England): Transplant mid-May to late May. Most standard varieties (70-80 days) perform well. Start transplants indoors 6-8 weeks before your target outdoor date.

Zone 6 (mid-Atlantic, central Midwest): Transplant early May to mid-May. This zone offers enough season length for even long-season heirloom varieties like Brandywine (80-90 days). A second planting in early June extends harvest into October.

Zone 7 (Southeast, lower Midwest): Transplant mid-April to early May. In this zone, the challenge shifts from frost to heat. Tomatoes drop blossoms when temperatures exceed 90F consistently, so early planting maximizes fruit set before summer heat arrives.

Zone 8-9 (Deep South, Gulf Coast, Texas): Transplant late February to mid-March for a spring crop. Plant again in late July or August for a fall crop. The mid-summer heat gap between 95-100F makes a fall planting essential for continuous production.

Zone 10 (southern Florida, southern California): Tomatoes can be grown nearly year-round but perform best from October through April when heat and humidity are lower. Avoid planting during the rainy season when disease pressure is highest.

Soil temperature is more reliable than calendar dates. Use a soil thermometer and wait for 60F at 4-inch depth for three consecutive mornings. Cold soil stunts root growth and invites disease even if the transplant survives. Planting into warm soil produces faster growth than setting out transplants two weeks earlier into cold ground.

Start transplants indoors 6-8 weeks before your target outdoor date. Harden off seedlings by gradually exposing them to outdoor conditions over 7-10 days before planting. Set transplants deep, burying 2/3 of the stem, as tomatoes root along buried stems and develop stronger root systems.`,
  relatedCalculators: [
    { title: 'Tomato Planting Date Calculator', href: '/calculators/planting-date/tomatoes-planting-date/' },
    { title: 'Tomato Seeding Rate', href: '/calculators/seeding/tomatoes/' },
    { title: 'Pepper Planting Date', href: '/calculators/planting-date/peppers-planting-date/' },
    { title: 'Plant Spacing Calculator', href: '/calculators/seeding/plant-spacing/' },
    { title: 'NPK Calculator', href: '/calculators/fertilizer/npk/' },
  ],
  faqs: [
    {
      question: 'Can I plant tomatoes before the last frost?',
      answer:
        'You can plant 1-2 weeks early if you use frost protection such as Wall O\' Waters, row covers, or cold frames. Unprotected tomatoes will die at 32F. Even temperatures below 50F can cause chilling injury that stunts growth for weeks.',
    },
    {
      question: 'What soil temperature do tomatoes need?',
      answer:
        'Tomatoes need soil temperature of at least 60F at 4-inch depth, with 65-70F being ideal. Cold soil slows root development and increases susceptibility to soil-borne diseases like Pythium and Fusarium.',
    },
    {
      question: 'When should I start tomato seeds indoors?',
      answer:
        'Start seeds 6-8 weeks before your planned transplant date. For Zone 6, that means starting seeds in mid-March for a mid-May transplant. Use a heat mat to maintain 75-85F soil temperature for fastest germination (5-7 days).',
    },
    {
      question: 'Is it too late to plant tomatoes in July?',
      answer:
        'In Zones 7-10, a July planting can produce a fall crop if you choose early-maturing varieties (55-65 days). In Zones 3-6, July is generally too late for a meaningful harvest before the first fall frost.',
    },
  ],
};

const hayBalesPerCow: Guide = {
  slug: 'how-many-bales-of-hay-per-cow',
  title: 'How Many Bales of Hay Per Cow? (Feeding Guide)',
  description:
    'Calculate how many bales of hay you need per cow for winter feeding. Covers round bales, square bales, daily intake, and storage waste factors.',
  content: `A mature beef cow weighing 1,200 lbs eats approximately 2-2.5% of her body weight in dry matter per day, which equals 24-30 lbs of hay daily. Over a typical 120-day winter feeding period, that is 2,880-3,600 lbs of hay per cow. With 15-25% waste from feeding and storage, plan on 3,300-4,500 lbs per cow per winter.

A standard large round bale weighing 1,000-1,200 lbs provides about 800-1,000 lbs of usable feed after waste. That means you need approximately 3-5 round bales per cow for a 120-day feeding season. Extend to a 150-day season, and the number jumps to 4-6 bales per cow.

Small square bales weigh 40-60 lbs each and are easier to handle but more expensive per ton. At 50 lbs per bale, a cow consuming 30 lbs per day goes through roughly one bale every 1.5 days, or about 80 small square bales over 120 days.

Waste is the single biggest variable in hay feeding costs. Feeding round bales on the ground without a ring or rack results in 25-45% waste as cows trample, soil, and bed on the hay. A simple hay ring reduces waste to 5-15%. Cone-type feeders with sheeted bottoms can cut waste below 5%. At $60 per round bale, reducing waste from 30% to 10% saves approximately $36 per cow per winter.

Hay quality matters as much as quantity. Test your hay for crude protein and total digestible nutrients (TDN). Good-quality grass hay runs 8-12% protein and 55-60% TDN. Cows in late gestation or early lactation need hay with at least 10% crude protein or supplementation with range cubes or protein tubs.

For a 50-cow herd over a 150-day winter, you need 200-300 round bales of good-quality hay, assuming a hay ring is used and bales average 1,100 lbs. Always carry a 10-15% reserve above calculated needs to account for an extended winter, late spring, or a failed hay cutting.

Storage conditions directly impact how much hay you actually get to feed. Hay stored outside on the ground can lose 25-35% of its value to spoilage. Simply placing bales on pallets or gravel and wrapping the top with net wrap reduces loss to 5-10%. Barn-stored hay has under 5% loss but requires significant infrastructure investment.`,
  relatedCalculators: [
    { title: 'Hay Bale Calculator', href: '/calculators/livestock/hay-bale/' },
    { title: 'Hay Storage Calculator', href: '/calculators/livestock/hay-storage/' },
    { title: 'Feed Cost Calculator', href: '/calculators/livestock/feed-cost/' },
    { title: 'Cattle Weight Calculator', href: '/calculators/livestock/cattle-weight/' },
    { title: 'Stocking Rate Calculator', href: '/calculators/livestock/stocking-rate/' },
    { title: 'Bales Per Acre Calculator', href: '/calculators/conversions/bales-per-acre/' },
  ],
  faqs: [
    {
      question: 'How many round bales per cow for winter?',
      answer:
        'Plan on 3-5 round bales (1,000-1,200 lbs each) per cow for a 120-day feeding period. For a 150-day season, budget 4-6 bales. This assumes 10-15% waste with a hay ring feeder.',
    },
    {
      question: 'How much hay does a cow eat per day?',
      answer:
        'A 1,200-lb beef cow eats 24-30 lbs of hay per day (2-2.5% of body weight). Lactating cows eat at the higher end. In very cold weather, intake can increase by 10-15% as cows burn more energy to stay warm.',
    },
    {
      question: 'Is it cheaper to buy hay or grow your own?',
      answer:
        'Growing your own hay costs $30-$60 per ton in production costs but requires equipment investment. Purchased hay runs $80-$200 per ton depending on quality and region. If you have the land and equipment, growing is typically cheaper above 30-40 acres of hayground.',
    },
  ],
};

const cornSeedingRate: Guide = {
  slug: 'corn-seeding-rate-per-acre',
  title: 'Corn Seeding Rate Per Acre: Planting Guide',
  description:
    'Learn the optimal corn seeding rate per acre based on soil type, irrigation, and yield goal. Includes population targets and seed cost considerations.',
  content: `The standard corn seeding rate for most of the Corn Belt is 32,000-34,000 seeds per acre in 30-inch rows. This target has increased steadily over decades as modern hybrids tolerate higher populations better than older genetics. However, the optimal rate depends on your specific field conditions, hybrid characteristics, and yield environment.

Irrigated fields with high yield potential (220+ bu/acre) can support populations of 34,000-36,000 seeds per acre. The additional plants capture more sunlight and justify the extra seed cost when moisture is not limiting. Some growers in high-yield contests push to 38,000-40,000, but diminishing returns set in quickly for most commercial operations.

Dryland fields in the western Corn Belt with 15-20 inches of annual rainfall should target 24,000-28,000 seeds per acre. Higher populations in moisture-limited environments create excessive competition that reduces ear size and increases barren stalks. In drought-prone areas, every 1,000 seeds above the optimum can cost 2-4 bushels per acre.

Sandy soils with lower water-holding capacity warrant 2,000-4,000 fewer seeds per acre than heavy silt loams in the same area. Conversely, high-organic-matter prairie soils can support the highest populations due to superior water and nutrient supply.

Narrow rows (20-inch) allow 5-10% higher populations than 30-inch rows because plants are spaced more equidistantly, reducing plant-to-plant competition. At 34,000 seeds per acre in 20-inch rows, each plant has roughly the same space in all directions, improving light capture.

Corn seed is sold in units of 80,000 seeds. At 32,000 seeds per acre, one unit plants 2.5 acres. Seed costs $200-$350 per unit for name-brand traited hybrids, making each 1,000-seed increase in population cost about $2.50-$4.40 per acre. The yield response to that extra investment determines the optimal economic rate.

A simple way to determine your optimal population is to run on-farm trials. Plant strips at 28,000, 32,000, and 36,000 seeds per acre in representative fields and measure yield at harvest. Many precision planting monitors make variable-rate population prescriptions possible, allowing you to plant higher populations on the best soils and back off on lighter ground within the same field.`,
  relatedCalculators: [
    { title: 'Corn Seeding Rate Calculator', href: '/calculators/seeding/corn/' },
    { title: 'Seeds Per Acre Calculator', href: '/calculators/seeding/seeds-per-acre/' },
    { title: 'Seed Cost Calculator', href: '/calculators/seeding/seed-cost/' },
    { title: 'Corn Planting Date', href: '/calculators/planting-date/corn-planting-date/' },
    { title: 'Yield Per Acre Calculator', href: '/calculators/yield/yield-per-acre/' },
    { title: 'Cost Per Acre Calculator', href: '/calculators/economics/cost-per-acre/' },
  ],
  faqs: [
    {
      question: 'What is the recommended corn seeding rate?',
      answer:
        '32,000-34,000 seeds per acre is standard for most Corn Belt fields in 30-inch rows. Adjust down to 24,000-28,000 for dryland western fields and up to 34,000-36,000 for irrigated high-yield environments.',
    },
    {
      question: 'How many bags of corn seed per acre?',
      answer:
        'Corn seed comes in 80,000-seed units. At 32,000 seeds/acre, one unit covers 2.5 acres. For a 160-acre field, you need 64 units (or 32 bags if sold as 2-unit bags).',
    },
    {
      question: 'Does higher corn population always mean higher yield?',
      answer:
        'No. There is a point of diminishing returns that depends on water availability, soil quality, and hybrid tolerance. In moisture-limited environments, excessive population actually reduces yield by increasing drought stress. On-farm trials are the best way to find your optimum.',
    },
  ],
};

const npkRatioExplained: Guide = {
  slug: 'npk-ratio-explained',
  title: 'NPK Ratio Explained: What Do the Numbers Mean?',
  description:
    'Understand what NPK numbers on fertilizer bags mean and how to choose the right ratio for your crops, lawn, or garden. Includes common formulations and rates.',
  content: `The three numbers on every fertilizer bag represent the percentage by weight of nitrogen (N), phosphorus (as P2O5), and potassium (as K2O). A 50-lb bag of 10-10-10 contains 5 lbs of nitrogen, 5 lbs of phosphorus (as P2O5), and 5 lbs of potassium (as K2O). The remaining 35 lbs is filler material that helps distribute the nutrients evenly.

Nitrogen drives vegetative growth, leaf development, and green color. It is the nutrient crops use in the largest quantity and the one most often deficient. Corn needs 1.0-1.2 lbs of N per bushel of yield goal. Lawns need 2-4 lbs of N per 1,000 sq ft per year. Excess nitrogen causes rank growth, delayed maturity, and environmental pollution through leaching and runoff.

Phosphorus supports root development, flowering, fruiting, and energy transfer within the plant. It is critical at planting for seedling establishment. Unlike nitrogen, phosphorus does not move in the soil and must be placed near the root zone to be effective. Starter fertilizer placed 2 inches below and 2 inches beside the seed row is a common practice for corn and other row crops.

Potassium regulates water balance, disease resistance, and stalk strength. Crops remove large amounts of K in harvested grain and forage. Alfalfa hay removes 50-60 lbs of K2O per ton of hay, making it one of the most potassium-demanding crops. Adequate potassium reduces stalk lodging in corn and improves winter hardiness in perennial crops.

Common fertilizer formulations and their uses include: urea (46-0-0) for pure nitrogen, DAP (18-46-0) for phosphorus with some nitrogen, MAP (11-52-0) for high phosphorus, potash (0-0-60) for potassium, and triple-13 (13-13-13) as a general-purpose blend. For most agricultural fields, a custom blend based on soil test results is more cost-effective than a standard ratio.

A soil test tells you exactly what your field needs. Without one, you risk applying nutrients already in excess while ignoring deficiencies. For example, many Midwestern fields have built up phosphorus to high levels from decades of manure and fertilizer, meaning P application can be skipped entirely while savings are redirected to other inputs.

Secondary nutrients (sulfur, calcium, magnesium) and micronutrients (zinc, boron, manganese) do not appear in the NPK ratio but are increasingly important. Sulfur deficiency in corn has become more common as industrial emissions have declined, reducing atmospheric deposition. A soil test plus tissue testing during the season catches deficiencies that NPK alone cannot address.`,
  relatedCalculators: [
    { title: 'NPK Calculator', href: '/calculators/fertilizer/npk/' },
    { title: 'Nitrogen Calculator', href: '/calculators/fertilizer/nitrogen/' },
    { title: 'Fertilizer Cost Calculator', href: '/calculators/fertilizer/fertilizer-cost/' },
    { title: 'Lime Calculator', href: '/calculators/fertilizer/lime/' },
    { title: 'Compost Calculator', href: '/calculators/fertilizer/compost/' },
    { title: 'Fertilizer Spreader Calibration', href: '/calculators/conversions/fertilizer-spreader-calibration/' },
  ],
  faqs: [
    {
      question: 'What does 10-10-10 fertilizer mean?',
      answer:
        'The numbers represent the percentage by weight of nitrogen (N), phosphorus (P2O5), and potassium (K2O). A 50-lb bag of 10-10-10 contains 5 lbs of each nutrient. The remaining 35 lbs is carrier/filler material.',
    },
    {
      question: 'Which NPK ratio is best for vegetables?',
      answer:
        'Most vegetables do well with a balanced or slightly nitrogen-heavy fertilizer like 10-10-10 or 12-12-12 at planting. Side-dress with nitrogen (urea or ammonium sulfate) during the growing season. A soil test is the best way to determine the exact ratio your garden needs.',
    },
    {
      question: 'What is the difference between P2O5 and actual phosphorus?',
      answer:
        'Fertilizer labels report phosphorus as P2O5 (phosphate), not elemental P. To convert P2O5 to elemental P, multiply by 0.44. So 46 lbs of P2O5 contains about 20 lbs of actual phosphorus. This convention dates to early fertilizer chemistry and remains the industry standard.',
    },
    {
      question: 'Do I need all three nutrients every year?',
      answer:
        'Not necessarily. Soil testing may show adequate P and K levels, meaning you only need nitrogen. Applying unneeded nutrients wastes money and can harm the environment. Nitrogen is needed annually for most crops, but P and K can be drawn down from soil reserves when levels are high.',
    },
  ],
};

const howMuchCompost: Guide = {
  slug: 'how-much-compost-do-i-need',
  title: 'How Much Compost Do I Need? Calculator & Tips',
  description:
    'Calculate how much compost you need for garden beds, raised beds, and farm fields. Covers application rates in cubic yards, tons per acre, and cost estimates.',
  content: `The amount of compost you need depends on whether you are amending an existing garden, filling raised beds, or topdressing a farm field. For existing garden beds, apply 1-3 inches of compost and mix into the top 6-8 inches of soil. For new raised beds, use a mix of 30-50% compost blended with native soil or a quality topsoil.

To calculate cubic yards, measure length and width in feet, multiply to get square footage, multiply by depth in feet, then divide by 27. A 4x8 raised bed filled 12 inches deep needs 4 x 8 x 1 = 32 cubic feet, or about 1.2 cubic yards. Compost weighs approximately 1,000-1,600 lbs per cubic yard depending on moisture content.

For farm-scale application, rates range from 2-10 tons per acre depending on crop needs and soil condition. A common rate for vegetable production is 4-6 tons per acre incorporated before planting. Cover crop fields transitioning to organic may receive 8-10 tons per acre to build organic matter. At 4 tons per acre, a 10-acre field needs 40 tons of compost, or roughly 50-60 cubic yards.

Compost quality varies enormously. Request a lab analysis showing C:N ratio, nutrient content, and maturity testing. Finished compost should have a C:N ratio below 20:1 and pass a germination test above 80%. Immature compost with a high C:N ratio can tie up nitrogen in your soil and actually hurt crop growth for several weeks.

Typical compost nutrient content runs 1-2% nitrogen, 0.5-1% phosphorus, and 0.5-1.5% potassium. A 4-ton-per-acre application of compost testing 1.5% N supplies approximately 120 lbs of total nitrogen, but only 10-20% is available the first year. The rest releases slowly over 3-5 years, building long-term soil fertility.

Bulk compost costs $20-$50 per cubic yard at the source, plus delivery. Bagged compost runs $5-$10 per cubic foot, which translates to $135-$270 per cubic yard. For anything larger than a few garden beds, bulk delivery is far more economical. Some municipalities offer free or low-cost compost made from yard waste and food scraps.

Application timing matters. Incorporate compost in fall so nutrients are available by spring planting. For topdressing established perennials, lawns, or orchards, apply in early spring. Avoid applying compost to frozen or saturated ground where runoff could carry nutrients into waterways.`,
  relatedCalculators: [
    { title: 'Compost Calculator', href: '/calculators/fertilizer/compost/' },
    { title: 'Soil Volume Calculator', href: '/calculators/conversions/soil-volume/' },
    { title: 'NPK Calculator', href: '/calculators/fertilizer/npk/' },
    { title: 'Mulch Calculator', href: '/calculators/conversions/mulch-calculator/' },
    { title: 'Cubic Yards to Tons', href: '/calculators/conversions/cubic-yards-to-tons/' },
  ],
  faqs: [
    {
      question: 'How many cubic yards of compost per 1,000 sq ft?',
      answer:
        'At a 2-inch depth, you need about 6.2 cubic feet or 0.23 cubic yards per 1,000 sq ft. At 3 inches deep, that increases to 9.3 cubic feet or 0.34 cubic yards. Multiply by the number of thousands of square feet for your total.',
    },
    {
      question: 'Can you add too much compost?',
      answer:
        'Yes. Excessive compost can overload soil with phosphorus, raise salt levels, and create nutrient imbalances. Do not exceed 3 inches per year in garden beds or 10 tons per acre on farm fields. Annual soil testing helps avoid over-application.',
    },
    {
      question: 'How much does a cubic yard of compost weigh?',
      answer:
        'Finished compost weighs 1,000-1,600 lbs per cubic yard depending on moisture content. Dry compost is closer to 1,000 lbs, while fresh or wet compost can reach 1,600 lbs. Most suppliers estimate 1,200 lbs per cubic yard for delivery weight calculations.',
    },
  ],
};

const cattleWeightByAge: Guide = {
  slug: 'cattle-weight-by-age',
  title: 'Cattle Weight by Age: Growth Chart & Estimates',
  description:
    'Reference chart for cattle weight by age from birth to maturity. Covers beef and dairy breeds, average daily gain, and weight estimation methods.',
  content: `Cattle weight varies significantly by breed, nutrition, and management, but general benchmarks help producers track whether calves and growing cattle are on target. A beef calf typically weighs 70-90 lbs at birth, 400-500 lbs at weaning (6-7 months), and reaches a market finish weight of 1,250-1,400 lbs at 15-18 months in a feedlot setting.

Birth to weaning is the period of fastest relative growth. Calves gain 2.0-2.5 lbs per day on their mothers, reaching 450-550 lbs by 205 days of age. Adjusted 205-day weaning weight is a standard performance metric used to compare genetics. Calves gaining less than 1.8 lbs per day may indicate inadequate milk production or forage quality.

After weaning, stocker cattle on grass typically gain 1.5-2.0 lbs per day depending on forage quality. On high-quality pasture or winter wheat grazing, gains can reach 2.5 lbs per day. Backgrounding on hay and supplement yields 1.0-1.5 lbs per day, which is more economical per pound of gain but extends the time to market weight.

Feedlot cattle on a finishing ration of corn and distillers grains gain 3.0-4.0 lbs per day. A typical feeding period is 120-180 days, adding 400-600 lbs to reach a finish weight of 1,250-1,400 lbs. Feed conversion in the feedlot averages 6:1, meaning 6 lbs of dry matter intake produces 1 lb of gain.

Dairy breed calves follow different trajectories. Holstein bull calves weigh 80-100 lbs at birth and grow rapidly, reaching 500 lbs by 6 months and a fed weight of 1,350-1,500 lbs at 14-16 months. Holstein steers finish at heavier weights than beef breeds due to their larger frame size.

Estimated breed-specific mature cow weights include: Angus 1,100-1,300 lbs, Hereford 1,200-1,400 lbs, Simmental 1,300-1,500 lbs, Charolais 1,400-1,600 lbs, and Brahman 1,100-1,400 lbs. Mature bulls typically weigh 30-50% more than cows of the same breed.

To estimate live weight without a scale, measure heart girth (circumference just behind the front legs) in inches and use the formula: Weight = (Heart Girth x Heart Girth x Body Length) / 300, where body length is measured from the point of the shoulder to the pin bone. This formula is accurate within 3-5% for cattle in average body condition.`,
  relatedCalculators: [
    { title: 'Cattle Weight Calculator', href: '/calculators/livestock/cattle-weight/' },
    { title: 'Feed Conversion Calculator', href: '/calculators/livestock/feed-conversion/' },
    { title: 'Stocking Rate Calculator', href: '/calculators/livestock/stocking-rate/' },
    { title: 'Hay Bale Calculator', href: '/calculators/livestock/hay-bale/' },
    { title: 'Feed Cost Calculator', href: '/calculators/livestock/feed-cost/' },
    { title: 'Livestock Weight Converter', href: '/calculators/conversions/livestock-weight-converter/' },
  ],
  faqs: [
    {
      question: 'How much should a 6-month-old calf weigh?',
      answer:
        'A 6-month-old beef calf should weigh 400-550 lbs depending on breed, sex, and milk production of the dam. Steers and bulls typically weigh 20-40 lbs more than heifers at the same age. An adjusted 205-day weight below 400 lbs may indicate nutritional or health issues.',
    },
    {
      question: 'How fast do cattle gain weight in a feedlot?',
      answer:
        'Feedlot cattle on a finishing ration gain 3.0-4.0 lbs per day. Yearling steers entering at 800 lbs can reach 1,300 lbs in 130-160 days. Calves entering at 600 lbs take 180-210 days due to a longer transition onto the finishing diet.',
    },
    {
      question: 'How do you estimate cattle weight without a scale?',
      answer:
        'Measure heart girth in inches (circumference behind front legs) and body length in inches (shoulder point to pin bone). Use the formula: Weight = (Heart Girth x Heart Girth x Body Length) / 300. This is accurate within 3-5% for most cattle.',
    },
    {
      question: 'At what age do cattle stop growing?',
      answer:
        'Beef cattle reach approximately 85% of mature weight by 2 years of age and full maturity by 3-4 years. Frame growth (skeletal) is largely complete by 18-20 months, while muscle and fat deposition continue beyond that. Dairy breeds mature slightly later.',
    },
  ],
};

const costToPlantCorn: Guide = {
  slug: 'cost-to-plant-corn-per-acre',
  title: 'Cost to Plant Corn Per Acre (2024 Breakdown)',
  description:
    'Detailed breakdown of corn production costs per acre including seed, fertilizer, chemicals, equipment, and land rent. Updated for current input prices.',
  content: `The total cost to plant and grow corn ranges from $600 to $900 per acre in the Corn Belt, depending on land costs, input prices, and management intensity. Understanding the cost breakdown helps identify where savings are possible and what yield is needed to break even.

Seed is one of the largest variable costs. At $280-$350 per 80,000-seed unit and a seeding rate of 32,000 seeds per acre, seed cost runs $112-$140 per acre. Traited hybrids with insect and herbicide tolerance are at the high end. Conventional seed or generic traited options can save $30-$50 per acre without significant yield penalty in low-pest environments.

Fertilizer typically costs $150-$250 per acre for corn. Nitrogen is the largest component at 180-200 lbs N per acre. At $0.45-$0.65 per lb of N (anhydrous ammonia), nitrogen alone runs $80-$130 per acre. Phosphorus and potassium add $40-$80 depending on soil test levels. MAP or DAP at $550-$700 per ton and potash at $400-$500 per ton are the most common sources.

Crop protection (herbicides, insecticides, fungicides) costs $40-$80 per acre. A pre-emerge plus post-emerge herbicide program runs $30-$50 per acre. Fungicide application at VT/R1 adds $20-$30 per acre and returns a yield benefit of 5-12 bushels in disease-prone environments. Insecticide is situation-dependent and may not be needed every year.

Equipment and machinery costs, including fuel, repairs, and depreciation, average $80-$120 per acre for planting, spraying, and harvest operations. Custom-hire rates for a planter pass run $18-$25 per acre, spraying $8-$14, and combining $35-$50, providing useful benchmarks even for those owning equipment.

Land cost is the largest single expense for most operations. Cash rent in central Iowa averages $250-$300 per acre, while marginal ground in western Kansas may rent for $50-$80. Land cost is often the difference between profit and loss in moderate-yield environments.

Crop insurance premiums add $15-$40 per acre depending on coverage level and county. Revenue Protection (RP) at 80% coverage is the most popular option, protecting against both yield loss and price declines.

At a total cost of $750 per acre and corn at $4.50 per bushel, you need 167 bushels per acre to break even. At $5.00 corn, break-even drops to 150 bushels. Tracking costs per acre and per bushel helps you make informed decisions about input intensity, land rental, and marketing strategy.`,
  relatedCalculators: [
    { title: 'Cost Per Acre Calculator', href: '/calculators/economics/cost-per-acre/' },
    { title: 'Farm Profit/Loss Calculator', href: '/calculators/economics/farm-profit-loss/' },
    { title: 'Break-Even Price Calculator', href: '/calculators/economics/break-even-price/' },
    { title: 'Seed Cost Calculator', href: '/calculators/seeding/seed-cost/' },
    { title: 'Fertilizer Cost Calculator', href: '/calculators/fertilizer/fertilizer-cost/' },
    { title: 'Corn Seeding Rate Calculator', href: '/calculators/seeding/corn/' },
  ],
  faqs: [
    {
      question: 'What is the average cost to grow an acre of corn?',
      answer:
        'Total costs range from $600 to $900 per acre in the Corn Belt, including seed ($112-$140), fertilizer ($150-$250), chemicals ($40-$80), equipment ($80-$120), land ($50-$300), and insurance/misc ($30-$60). Actual costs vary widely by region and management.',
    },
    {
      question: 'How many bushels per acre to break even on corn?',
      answer:
        'At a total cost of $750/acre and $4.50/bushel corn, break-even is 167 bu/acre. At $5.00/bushel, it drops to 150 bu/acre. Low-cost operators on owned land can break even at 120-130 bu/acre, while high-rent operations may need 180+ bu/acre.',
    },
    {
      question: 'What is the biggest cost in corn production?',
      answer:
        'Land rent or ownership cost is typically the largest single expense ($50-$300/acre), followed by fertilizer ($150-$250/acre) and seed ($112-$140/acre). Together, these three items account for roughly 70% of total production costs.',
    },
  ],
};

const soilPhAndLime: Guide = {
  slug: 'soil-ph-and-lime-application',
  title: 'Soil pH and Lime Application: Complete Guide',
  description:
    'Learn how soil pH affects crop growth and how to calculate lime application rates. Covers buffer pH, lime types, ENM, and application timing for farm fields.',
  content: `Soil pH measures acidity on a scale from 0 to 14, with 7 being neutral. Most crops perform best in a pH range of 6.0-7.0, where essential nutrients are most available. Below 5.5, aluminum toxicity can damage roots, and phosphorus, calcium, and magnesium become increasingly unavailable. Correcting low pH with agricultural lime is one of the highest-return investments a farmer can make.

A soil test reports two pH values: water pH (the actual pH) and buffer pH (used to calculate lime requirement). Water pH tells you the current acidity level. Buffer pH indicates how resistant the soil is to pH change, which depends on clay content and organic matter. Sandy soils with low buffer capacity need less lime to raise pH than heavy clay soils at the same starting pH.

Lime requirement is expressed in tons of effective neutralizing material (ENM) per acre. A typical recommendation to raise pH from 5.5 to 6.5 is 2-4 tons of ENM per acre on medium-textured soils. Sandy soils may need only 1-2 tons, while heavy clays could require 4-6 tons for the same pH change.

Agricultural limestone (calcitic or dolomitic) is the most common liming material. Calcitic lime is primarily calcium carbonate (CaCO3), while dolomitic lime contains both calcium and magnesium carbonates. Use dolomitic lime when soil tests show magnesium below 50 ppm. Otherwise, calcitic lime is typically cheaper and equally effective.

Lime quality is measured by calcium carbonate equivalent (CCE) and fineness. A high-quality ag lime has a CCE of 90-100% and is ground fine enough that 50% passes a 60-mesh screen. Coarser lime reacts more slowly, taking 2-3 years for full effect. Pelletized lime is more expensive per ton of ENM but easier to spread uniformly.

Apply lime 6-12 months before you need the pH correction, because lime reacts slowly with the soil. Fall application before spring crops is ideal. Incorporate lime into the top 6 inches of soil for fastest reaction. Surface-applied lime without incorporation takes 2-3 years to affect soil pH below the top inch, except in no-till systems where surface reactions are acceptable.

For fields needing more than 4 tons per acre, split the application over two years. Applying excessive lime in a single pass can temporarily raise surface pH too high, reducing availability of zinc, manganese, and iron. Overliming is difficult and expensive to correct, so always follow soil test recommendations rather than guessing.

Lime costs $30-$60 per ton spread, making a 3-ton application $90-$180 per acre. At the typical response of 10-20 bushels of corn per acre from correcting pH 5.5 to 6.5, the return on investment exceeds 300% over the 3-4 year effective period of the lime application.`,
  relatedCalculators: [
    { title: 'Lime Calculator', href: '/calculators/fertilizer/lime/' },
    { title: 'NPK Calculator', href: '/calculators/fertilizer/npk/' },
    { title: 'Fertilizer Cost Calculator', href: '/calculators/fertilizer/fertilizer-cost/' },
    { title: 'Compost Calculator', href: '/calculators/fertilizer/compost/' },
    { title: 'Nitrogen Calculator', href: '/calculators/fertilizer/nitrogen/' },
  ],
  faqs: [
    {
      question: 'How much lime per acre do I need?',
      answer:
        'It depends on your current pH, target pH, and soil type. A typical recommendation to raise pH from 5.5 to 6.5 is 2-4 tons of ENM per acre on loam soils. Always base lime rates on a soil test that includes buffer pH, not on water pH alone.',
    },
    {
      question: 'How long does lime take to work?',
      answer:
        'Finely ground lime begins reacting within weeks, but full pH correction takes 6-18 months depending on particle size, incorporation, and moisture. Apply lime at least 6 months before you need the pH change. Coarser lime takes 2-3 years for complete reaction.',
    },
    {
      question: 'What is the difference between calcitic and dolomitic lime?',
      answer:
        'Calcitic lime is calcium carbonate (CaCO3). Dolomitic lime contains both calcium and magnesium carbonates. Use dolomitic lime when soil magnesium is low (below 50 ppm). If magnesium is adequate, calcitic lime is preferred and usually cheaper.',
    },
    {
      question: 'Can you apply too much lime?',
      answer:
        'Yes. Overliming raises pH above 7.0-7.5, which locks out micronutrients like zinc, manganese, iron, and boron. This is especially problematic in sandy soils with low buffering capacity. Correcting overlimed soil requires sulfur applications and takes years. Always follow soil test recommendations.',
    },
  ],
};

const allGuides: Guide[] = [
  howMuchMulch,
  fertilizerPerAcre,
  whenToPlantTomatoes,
  hayBalesPerCow,
  cornSeedingRate,
  npkRatioExplained,
  howMuchCompost,
  cattleWeightByAge,
  costToPlantCorn,
  soilPhAndLime,
];

allGuides.forEach(registerGuide);

export { allGuides };
