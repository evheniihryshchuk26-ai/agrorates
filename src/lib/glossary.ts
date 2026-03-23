export type GlossaryTerm = {
  slug: string;
  term: string;
  shortDef: string;
  fullDef: string;
  relatedTerms: string[];
  relatedCalculators: { title: string; href: string }[];
};

export const glossaryTerms: GlossaryTerm[] = [
  {
    slug: "npk",
    term: "NPK (Nitrogen, Phosphorus, Potassium)",
    shortDef:
      "NPK refers to the three primary macronutrients essential for plant growth, represented by their chemical symbols on fertilizer labels.",
    fullDef:
      "NPK stands for Nitrogen (N), Phosphorus (P), and Potassium (K) — the three macronutrients that plants need in the largest quantities. Fertilizer labels display these as a three-number ratio (e.g., 10-10-10), indicating the percentage by weight of each nutrient in the product. Nitrogen promotes leafy vegetative growth, phosphorus supports root development and flowering, and potassium strengthens overall plant health and disease resistance. Soil testing is essential to determine the correct NPK ratio for a given crop and field. Over-application of any single nutrient can cause environmental harm and reduce crop quality.",
    relatedTerms: ["soil-ph", "lime-application", "cover-crop"],
    relatedCalculators: [
      { title: "NPK Calculator", href: "/calculators/fertilizer/npk/" },
      { title: "Lime Calculator", href: "/calculators/fertilizer/lime/" },
      {
        title: "Bushels to Tons Converter",
        href: "/calculators/conversions/bushels-to-tons/",
      },
    ],
  },
  {
    slug: "bushel",
    term: "Bushel",
    shortDef:
      "A bushel is a unit of volume used to measure and trade agricultural commodities such as grain, soybeans, and corn.",
    fullDef:
      "A bushel is a traditional unit of dry volume commonly used in U.S. agriculture to measure grain and oilseed crops. One bushel equals approximately 35.24 liters or 1.244 cubic feet. However, because commodities are traded by weight, a bushel's weight varies by crop — for example, a bushel of corn weighs 56 pounds, wheat 60 pounds, and soybeans 60 pounds. These standard weights are set by the USDA and are critical for pricing, storage, and transportation calculations. Understanding bushel conversions is fundamental for grain marketing and farm record-keeping.",
    relatedTerms: ["cwt", "test-weight", "break-even-price"],
    relatedCalculators: [
      {
        title: "Bushels to Tons Converter",
        href: "/calculators/conversions/bushels-to-tons/",
      },
      {
        title: "Break-Even Price Calculator",
        href: "/calculators/economics/break-even-price/",
      },
      {
        title: "Crop Insurance Calculator",
        href: "/calculators/economics/crop-insurance/",
      },
    ],
  },
  {
    slug: "cwt",
    term: "Hundredweight (CWT)",
    shortDef:
      "Hundredweight (CWT) is a unit of weight equal to 100 pounds, commonly used for pricing livestock, feed, and certain crops.",
    fullDef:
      "Hundredweight, abbreviated CWT, is a unit of measurement equal to 100 pounds (45.36 kg) in the U.S. system. It is widely used in agriculture for pricing cattle, hogs, milk, and some specialty crops like potatoes and rice. Livestock markets quote prices per hundredweight, so understanding CWT conversions is essential for evaluating sale prices and feed costs. For example, a 1,200-pound steer priced at $150/cwt would have a total value of $1,800. The metric hundredweight (used in some countries) equals 50 kilograms, so it is important to confirm which system is being referenced.",
    relatedTerms: ["bushel", "test-weight", "feed-conversion-ratio"],
    relatedCalculators: [
      {
        title: "Bushels to Tons Converter",
        href: "/calculators/conversions/bushels-to-tons/",
      },
      {
        title: "Feed Conversion Calculator",
        href: "/calculators/livestock/feed-conversion/",
      },
      {
        title: "Stocking Rate Calculator",
        href: "/calculators/livestock/stocking-rate/",
      },
    ],
  },
  {
    slug: "test-weight",
    term: "Test Weight",
    shortDef:
      "Test weight is the weight of a volume of grain measured in pounds per bushel, used as a quality indicator at grain elevators.",
    fullDef:
      "Test weight measures the density of grain by weighing a specific volume, typically reported in pounds per bushel. It is one of the primary grading factors used at grain elevators and directly affects the price a farmer receives. Higher test weights generally indicate better grain quality, drier kernels, and more efficient storage. For example, the USDA standard test weight for No. 1 yellow corn is 56 lb/bu, but stress during the growing season can lower actual test weight. Discounts (dockage) are applied when delivered grain falls below the standard test weight for its grade.",
    relatedTerms: ["bushel", "cwt", "break-even-price"],
    relatedCalculators: [
      {
        title: "Bushels to Tons Converter",
        href: "/calculators/conversions/bushels-to-tons/",
      },
      {
        title: "Break-Even Price Calculator",
        href: "/calculators/economics/break-even-price/",
      },
    ],
  },
  {
    slug: "soil-ph",
    term: "Soil pH",
    shortDef:
      "Soil pH is a measure of the acidity or alkalinity of soil on a 0–14 scale, critically affecting nutrient availability to plants.",
    fullDef:
      "Soil pH quantifies the hydrogen ion concentration in the soil solution on a logarithmic scale from 0 (most acidic) to 14 (most alkaline), with 7 being neutral. Most crops grow best in a slightly acidic to neutral range of 6.0–7.0, where essential nutrients are most readily available. When soil pH drops too low, toxic levels of aluminum and manganese can harm roots, while high pH can lock up iron, zinc, and phosphorus. Soil pH is measured through laboratory soil tests and is the starting point for fertility recommendations. Lime application is the primary method used to raise soil pH in acidic soils.",
    relatedTerms: ["buffer-ph", "lime-application", "npk"],
    relatedCalculators: [
      { title: "Lime Calculator", href: "/calculators/fertilizer/lime/" },
      { title: "NPK Calculator", href: "/calculators/fertilizer/npk/" },
    ],
  },
  {
    slug: "buffer-ph",
    term: "Buffer pH",
    shortDef:
      "Buffer pH is a secondary soil test measurement that determines how much lime is needed to raise soil pH to the target level.",
    fullDef:
      "Buffer pH (also called lime buffer capacity) is determined by mixing soil with a buffering solution and measuring the resulting pH. While soil pH tells you how acidic the soil currently is, buffer pH reveals the soil's resistance to pH change — essentially how much lime is required to correct the acidity. Soils with high organic matter or clay content have greater buffering capacity and require more lime per unit of pH change. Common buffer methods include the SMP, Sikora, and Woodruff procedures, with the choice varying by region. Buffer pH is indispensable for making accurate lime recommendations and avoiding both under- and over-liming.",
    relatedTerms: ["soil-ph", "lime-application", "npk"],
    relatedCalculators: [
      { title: "Lime Calculator", href: "/calculators/fertilizer/lime/" },
      { title: "NPK Calculator", href: "/calculators/fertilizer/npk/" },
    ],
  },
  {
    slug: "evapotranspiration",
    term: "Evapotranspiration (ET)",
    shortDef:
      "Evapotranspiration is the combined process of water evaporating from soil and transpiring from plant leaves, used to determine irrigation needs.",
    fullDef:
      "Evapotranspiration (ET) is the total amount of water lost from a cropped area through both soil surface evaporation and plant transpiration. It is measured in inches or millimeters per day and is the primary factor used to schedule irrigation and estimate crop water demand. Reference ET (ET₀) is calculated from weather data — temperature, humidity, wind speed, and solar radiation — using equations like the Penman-Monteith method. Crop-specific ET (ETc) is then derived by multiplying ET₀ by a crop coefficient that changes with growth stage. Matching irrigation application to ET losses prevents both water stress and wasteful over-irrigation.",
    relatedTerms: ["acre-inch", "cover-crop", "days-to-maturity"],
    relatedCalculators: [
      {
        title: "Irrigation Water Need Calculator",
        href: "/calculators/irrigation/irrigation-water-need/",
      },
      {
        title: "Corn Planting Date Calculator",
        href: "/calculators/planting-date/corn-planting-date/",
      },
    ],
  },
  {
    slug: "germination-rate",
    term: "Germination Rate",
    shortDef:
      "Germination rate is the percentage of seeds in a sample that successfully sprout under standard test conditions within a specified time period.",
    fullDef:
      "Germination rate expresses the proportion of seeds that produce a normal seedling under controlled laboratory conditions, reported as a percentage on the seed tag. It is a key factor in calculating seeding rates — a lower germination rate means more seed must be planted per acre to achieve the desired plant population. Certified seed typically has germination rates above 85–95%, depending on the crop. Factors that reduce germination include seed age, improper storage (high moisture or temperature), mechanical damage during harvest, and seed-borne disease. Farmers should always check the germination date on the seed tag, as rates decline over time.",
    relatedTerms: ["seed-inoculation", "days-to-maturity", "crop-rotation"],
    relatedCalculators: [
      {
        title: "Germination Rate Calculator",
        href: "/calculators/seeding/germination-rate/",
      },
      {
        title: "Seed Rate Calculator",
        href: "/calculators/seeding/seed-rate/",
      },
    ],
  },
  {
    slug: "stocking-rate",
    term: "Stocking Rate",
    shortDef:
      "Stocking rate is the number of animal units grazed on a given area of land over a defined time period.",
    fullDef:
      "Stocking rate describes grazing intensity as the number of animals (or animal units) per unit of land area for a specific duration, commonly expressed as acres per animal unit month (AUM). One animal unit is typically defined as a 1,000-pound cow with or without a calf. Setting the correct stocking rate is critical for maintaining pasture health, preventing overgrazing, and ensuring adequate forage for livestock. Stocking rates must be adjusted based on forage production potential, which varies with rainfall, soil fertility, and grass species. Overstocking leads to soil erosion, weed invasion, and declining animal performance, while understocking wastes available forage.",
    relatedTerms: ["feed-conversion-ratio", "cover-crop", "crop-rotation"],
    relatedCalculators: [
      {
        title: "Stocking Rate Calculator",
        href: "/calculators/livestock/stocking-rate/",
      },
      {
        title: "Feed Conversion Calculator",
        href: "/calculators/livestock/feed-conversion/",
      },
    ],
  },
  {
    slug: "feed-conversion-ratio",
    term: "Feed Conversion Ratio (FCR)",
    shortDef:
      "Feed conversion ratio is the amount of feed required to produce one unit of weight gain in livestock.",
    fullDef:
      "Feed Conversion Ratio (FCR) measures the efficiency with which an animal converts feed into body mass, calculated by dividing total feed consumed by total weight gained. A lower FCR indicates greater efficiency — for example, broiler chickens typically achieve an FCR of 1.6–2.0, while beef cattle range from 5.0–8.0. FCR is one of the most important economic metrics in animal agriculture because feed represents 60–70% of production costs. Genetics, diet formulation, animal health, and environmental conditions all influence FCR. Tracking FCR helps producers identify underperforming animals and optimize feeding programs for profitability.",
    relatedTerms: ["stocking-rate", "cwt", "break-even-price"],
    relatedCalculators: [
      {
        title: "Feed Conversion Calculator",
        href: "/calculators/livestock/feed-conversion/",
      },
      {
        title: "Stocking Rate Calculator",
        href: "/calculators/livestock/stocking-rate/",
      },
      {
        title: "Break-Even Price Calculator",
        href: "/calculators/economics/break-even-price/",
      },
    ],
  },
  {
    slug: "acre-inch",
    term: "Acre-Inch",
    shortDef:
      "An acre-inch is the volume of water needed to cover one acre of land to a depth of one inch, equal to about 27,154 gallons.",
    fullDef:
      "An acre-inch is a unit of water volume commonly used in irrigation planning, representing the amount of water required to cover one acre to a uniform depth of one inch. This equals approximately 27,154 U.S. gallons or 3,630 cubic feet. Irrigation systems are rated by how many acre-inches they can deliver per hour, and crop water requirements are often stated in inches per week. For example, corn at peak water demand may need 0.30–0.35 inches per day, which translates to roughly 8,100–9,500 gallons per acre per day. Understanding acre-inch measurements is essential for sizing irrigation equipment, estimating pumping costs, and managing water rights.",
    relatedTerms: ["evapotranspiration", "crop-rotation", "cover-crop"],
    relatedCalculators: [
      {
        title: "Irrigation Water Need Calculator",
        href: "/calculators/irrigation/irrigation-water-need/",
      },
      {
        title: "Corn Planting Date Calculator",
        href: "/calculators/planting-date/corn-planting-date/",
      },
    ],
  },
  {
    slug: "crop-rotation",
    term: "Crop Rotation",
    shortDef:
      "Crop rotation is the practice of growing different crops in sequence on the same field across seasons to improve soil health and reduce pest pressure.",
    fullDef:
      "Crop rotation is a fundamental agronomic practice in which different crop species are planted in a planned sequence on the same land over successive growing seasons. A common example is a corn-soybean rotation, where nitrogen-fixing soybeans replenish soil nitrogen used by corn the previous year. Rotation breaks pest and disease cycles, reduces weed pressure, improves soil structure, and can increase yields compared to continuous monoculture. The choice of rotation depends on climate, market conditions, available equipment, and soil type. Many crop insurance programs and conservation plans factor in rotation history when determining premiums and eligibility.",
    relatedTerms: ["cover-crop", "no-till", "npk"],
    relatedCalculators: [
      {
        title: "Corn Planting Date Calculator",
        href: "/calculators/planting-date/corn-planting-date/",
      },
      {
        title: "Seed Rate Calculator",
        href: "/calculators/seeding/seed-rate/",
      },
      {
        title: "NPK Calculator",
        href: "/calculators/fertilizer/npk/" },
    ],
  },
  {
    slug: "no-till",
    term: "No-Till Farming",
    shortDef:
      "No-till farming is a conservation practice where crops are planted directly into undisturbed soil residue without plowing or tilling.",
    fullDef:
      "No-till farming eliminates conventional tillage operations by planting seeds directly into the previous crop's residue using specialized no-till planters or drills. This practice preserves soil structure, reduces erosion by up to 90%, and builds organic matter over time. No-till also improves water infiltration, reduces fuel and labor costs, and supports beneficial soil organisms like earthworms and mycorrhizal fungi. Challenges include managing increased weed pressure (often requiring herbicide programs), slower soil warming in spring, and potential compaction in heavy soils. Adoption of no-till has grown steadily, with the USDA reporting that over 100 million U.S. acres use some form of conservation tillage.",
    relatedTerms: ["cover-crop", "crop-rotation", "soil-ph"],
    relatedCalculators: [
      {
        title: "Seed Rate Calculator",
        href: "/calculators/seeding/seed-rate/",
      },
      {
        title: "NPK Calculator",
        href: "/calculators/fertilizer/npk/",
      },
      {
        title: "Corn Planting Date Calculator",
        href: "/calculators/planting-date/corn-planting-date/",
      },
    ],
  },
  {
    slug: "cover-crop",
    term: "Cover Crop",
    shortDef:
      "A cover crop is a plant grown primarily to protect and enrich the soil between cash crop seasons rather than for harvest.",
    fullDef:
      "Cover crops are species planted during fallow periods — such as after fall harvest or before spring planting — to provide ground cover that prevents erosion, suppresses weeds, and improves soil biology. Common cover crops include cereal rye, crimson clover, radishes, and hairy vetch. Leguminous cover crops fix atmospheric nitrogen, reducing fertilizer needs for the following cash crop. Deep-rooted species like radishes break up compaction layers and improve water infiltration. Cover crops also sequester carbon and are increasingly incentivized through USDA conservation programs like EQIP and CSP. Management decisions include species selection, planting date, termination timing, and how residue is handled before the next crop.",
    relatedTerms: ["crop-rotation", "no-till", "npk"],
    relatedCalculators: [
      {
        title: "Seed Rate Calculator",
        href: "/calculators/seeding/seed-rate/",
      },
      { title: "NPK Calculator", href: "/calculators/fertilizer/npk/" },
      { title: "Lime Calculator", href: "/calculators/fertilizer/lime/" },
    ],
  },
  {
    slug: "aph-yield",
    term: "APH Yield (Actual Production History)",
    shortDef:
      "APH yield is the average of a farmer's historical crop yields over 4–10 years, used as the basis for federal crop insurance coverage.",
    fullDef:
      "Actual Production History (APH) yield is the simple average of a producer's verified crop yields over a base period of four to ten consecutive years. It serves as the benchmark for federal crop insurance programs administered by the USDA Risk Management Agency (RMA). Insurance guarantees are calculated as a percentage of the APH yield multiplied by the projected price. If actual production falls below the guarantee, an indemnity is paid. Farmers can build their APH by maintaining accurate yield records and reporting them to their crop insurance agent. Years with exceptionally low yields may be replaced by a yield floor or plug yield to prevent a catastrophic event from permanently depressing the APH.",
    relatedTerms: ["break-even-price", "bushel", "test-weight"],
    relatedCalculators: [
      {
        title: "Crop Insurance Calculator",
        href: "/calculators/economics/crop-insurance/",
      },
      {
        title: "Break-Even Price Calculator",
        href: "/calculators/economics/break-even-price/",
      },
    ],
  },
  {
    slug: "break-even-price",
    term: "Break-Even Price",
    shortDef:
      "Break-even price is the minimum commodity price per unit a farmer must receive to cover all production costs without a profit or loss.",
    fullDef:
      "Break-even price is calculated by dividing total production costs (seed, fertilizer, chemicals, fuel, labor, land rent, insurance, and overhead) by the expected yield per acre. The result is the minimum price per bushel, pound, or hundredweight needed to cover expenses. This metric is essential for marketing decisions — it tells a farmer when to sell, whether to lock in a forward contract, and if a particular crop is financially viable to plant. Break-even analysis should be updated regularly as input costs and yield estimates change throughout the season. Comparing break-even price to futures market prices helps producers assess profit potential and manage risk.",
    relatedTerms: ["aph-yield", "bushel", "cwt"],
    relatedCalculators: [
      {
        title: "Break-Even Price Calculator",
        href: "/calculators/economics/break-even-price/",
      },
      {
        title: "Crop Insurance Calculator",
        href: "/calculators/economics/crop-insurance/",
      },
      {
        title: "Bushels to Tons Converter",
        href: "/calculators/conversions/bushels-to-tons/",
      },
    ],
  },
  {
    slug: "usda-hardiness-zone",
    term: "USDA Hardiness Zone",
    shortDef:
      "USDA hardiness zones divide North America into 13 zones based on average annual minimum winter temperatures, guiding plant selection.",
    fullDef:
      "The USDA Plant Hardiness Zone Map divides the United States and North America into 13 zones (1a through 13b), each representing a 10°F range of average annual extreme minimum temperatures. Zone 1 is the coldest (below -60°F) and Zone 13 the warmest (above 60°F). Gardeners and farmers use hardiness zones to select perennial plants, fruit trees, and winter crops that can survive local winter conditions. The map was most recently updated in 2023 using 30 years of weather data and reflects warming trends in many regions. While hardiness zones are valuable for cold tolerance decisions, they do not account for summer heat, rainfall, humidity, or soil conditions, so they should be used alongside other regional growing information.",
    relatedTerms: ["days-to-maturity", "evapotranspiration", "crop-rotation"],
    relatedCalculators: [
      {
        title: "Corn Planting Date Calculator",
        href: "/calculators/planting-date/corn-planting-date/",
      },
      {
        title: "Seed Rate Calculator",
        href: "/calculators/seeding/seed-rate/",
      },
    ],
  },
  {
    slug: "days-to-maturity",
    term: "Days to Maturity",
    shortDef:
      "Days to maturity is the number of days from planting (or transplanting) until a crop is ready for harvest.",
    fullDef:
      "Days to maturity (DTM) indicates how long a crop variety takes to reach harvestable condition from the time of planting or transplanting. For grain crops like corn, maturity is often measured in Growing Degree Units (GDUs) rather than calendar days, because development is driven by accumulated heat. Choosing varieties with appropriate DTM for your region ensures the crop can reach physiological maturity before the first killing frost. Short-season varieties (lower DTM) are preferred in northern latitudes or for late planting, while full-season varieties may yield more in areas with longer growing seasons. DTM information is provided on seed labels and in variety trial data from university extension programs.",
    relatedTerms: [
      "usda-hardiness-zone",
      "germination-rate",
      "crop-rotation",
    ],
    relatedCalculators: [
      {
        title: "Corn Planting Date Calculator",
        href: "/calculators/planting-date/corn-planting-date/",
      },
      {
        title: "Seed Rate Calculator",
        href: "/calculators/seeding/seed-rate/",
      },
      {
        title: "Germination Rate Calculator",
        href: "/calculators/seeding/germination-rate/",
      },
    ],
  },
  {
    slug: "seed-inoculation",
    term: "Seed Inoculation",
    shortDef:
      "Seed inoculation is the process of coating seeds with beneficial bacteria, typically rhizobia, to promote nitrogen fixation in legume crops.",
    fullDef:
      "Seed inoculation involves applying live Rhizobium or Bradyrhizobium bacteria to legume seeds (soybeans, alfalfa, clover, peas) before planting. These bacteria colonize root nodules and convert atmospheric nitrogen (N₂) into plant-available ammonium, a process called biological nitrogen fixation. A well-inoculated soybean crop can fix 100–200 pounds of nitrogen per acre, significantly reducing fertilizer costs for the following crop in a rotation. Inoculants come in peat-based, liquid, and granular formulations and should be stored in cool, dark conditions to maintain bacterial viability. Inoculation is especially important when a legume is being planted in a field for the first time or after several years without that crop, because compatible rhizobia may not be present in sufficient numbers in the soil.",
    relatedTerms: ["germination-rate", "cover-crop", "npk"],
    relatedCalculators: [
      {
        title: "Seed Rate Calculator",
        href: "/calculators/seeding/seed-rate/",
      },
      {
        title: "Germination Rate Calculator",
        href: "/calculators/seeding/germination-rate/",
      },
      { title: "NPK Calculator", href: "/calculators/fertilizer/npk/" },
    ],
  },
  {
    slug: "lime-application",
    term: "Lime Application",
    shortDef:
      "Lime application is the practice of adding calcium carbonate or similar materials to soil to raise pH and reduce acidity.",
    fullDef:
      "Lime application involves spreading ground limestone (calcium carbonate) or dolomitic lime (calcium-magnesium carbonate) on fields to neutralize soil acidity and raise the pH to optimal levels for crop growth. The amount of lime needed depends on the current soil pH, the buffer pH, target pH, soil texture, and organic matter content. Agricultural lime varies in effectiveness based on its calcium carbonate equivalent (CCE) and fineness of grind — finer particles react faster with the soil. Because lime takes several months to fully react, it is best applied well before planting, often in fall. Regular soil testing every 2–4 years ensures that lime applications maintain the correct pH range, which maximizes nutrient availability and microbial activity.",
    relatedTerms: ["soil-ph", "buffer-ph", "npk"],
    relatedCalculators: [
      { title: "Lime Calculator", href: "/calculators/fertilizer/lime/" },
      { title: "NPK Calculator", href: "/calculators/fertilizer/npk/" },
      {
        title: "Seed Rate Calculator",
        href: "/calculators/seeding/seed-rate/",
      },
    ],
  },
];

export function getGlossaryTerm(slug: string): GlossaryTerm | undefined {
  return glossaryTerms.find((t) => t.slug === slug);
}
