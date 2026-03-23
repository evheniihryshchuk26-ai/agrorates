export type CropInfo = {
  slug: string;
  name: string;
  description: string;
  category: 'grain' | 'vegetable' | 'oilseed' | 'forage' | 'fiber' | 'specialty';
};

export const crops: CropInfo[] = [
  { slug: 'corn', name: 'Corn', description: 'The most widely grown crop in the US, used for grain, silage, ethanol, and livestock feed.', category: 'grain' },
  { slug: 'wheat', name: 'Wheat', description: 'A staple grain crop grown for flour, bread, pasta, and animal feed across the Great Plains and Pacific Northwest.', category: 'grain' },
  { slug: 'soybeans', name: 'Soybeans', description: 'A nitrogen-fixing legume grown for oil, meal, and livestock feed — the second most planted US crop.', category: 'oilseed' },
  { slug: 'tomatoes', name: 'Tomatoes', description: 'A high-value vegetable crop grown fresh and for processing into sauce, paste, and canned products.', category: 'vegetable' },
  { slug: 'potatoes', name: 'Potatoes', description: 'A starchy root crop grown for fresh market, chips, fries, and dehydrated products.', category: 'vegetable' },
  { slug: 'cotton', name: 'Cotton', description: 'A major fiber crop grown in the Southern US for textile production and cottonseed oil.', category: 'fiber' },
  { slug: 'rice', name: 'Rice', description: 'A paddy grain crop grown in flooded fields across Arkansas, California, Louisiana, and other southern states.', category: 'grain' },
  { slug: 'alfalfa', name: 'Alfalfa', description: 'A perennial legume forage crop prized for high-protein hay and nitrogen fixation.', category: 'forage' },
  { slug: 'oats', name: 'Oats', description: 'A cool-season grain used for feed, food products, and as a nurse crop for forage establishment.', category: 'grain' },
  { slug: 'barley', name: 'Barley', description: 'A versatile grain grown for malt, animal feed, and food products in northern climates.', category: 'grain' },
  { slug: 'sorghum', name: 'Sorghum', description: 'A drought-tolerant grain and forage crop widely grown in the southern Great Plains.', category: 'grain' },
  { slug: 'sunflower', name: 'Sunflower', description: 'An oilseed and confection crop grown for cooking oil, snack seeds, and birdseed.', category: 'oilseed' },
  { slug: 'canola', name: 'Canola', description: 'A cool-season oilseed crop grown for cooking oil and meal in northern states.', category: 'oilseed' },
  { slug: 'peanuts', name: 'Peanuts', description: 'A nitrogen-fixing legume grown for peanut butter, snacks, oil, and livestock feed.', category: 'oilseed' },
  { slug: 'tobacco', name: 'Tobacco', description: 'A specialty crop grown in the Southeast for cigarettes, cigars, and smokeless products.', category: 'specialty' },
  { slug: 'strawberries', name: 'Strawberries', description: 'A high-value berry crop grown for fresh market and processing in California and Florida.', category: 'vegetable' },
  { slug: 'peppers', name: 'Peppers', description: 'A warm-season vegetable including bell, hot, and specialty varieties for fresh and processed markets.', category: 'vegetable' },
  { slug: 'onions', name: 'Onions', description: 'A bulb crop grown for fresh, storage, and dehydrated markets across diverse US climates.', category: 'vegetable' },
  { slug: 'lettuce', name: 'Lettuce', description: 'A cool-season leafy vegetable grown for fresh salad markets, primarily in California and Arizona.', category: 'vegetable' },
  { slug: 'carrots', name: 'Carrots', description: 'A root vegetable grown for fresh market, baby carrots, and processing in deep, loose soils.', category: 'vegetable' },
  { slug: 'garlic', name: 'Garlic', description: 'A bulb crop planted in fall and harvested in summer, prized for culinary and health uses.', category: 'vegetable' },
  { slug: 'beans', name: 'Beans', description: 'A nitrogen-fixing legume including dry, snap, and lima varieties grown for food and cover cropping.', category: 'grain' },
];

export function getCrop(slug: string): CropInfo | undefined {
  return crops.find((c) => c.slug === slug);
}
