export type Guide = {
  slug: string;
  title: string;
  description: string;
  content: string;
  relatedCalculators: { title: string; href: string }[];
  faqs: { question: string; answer: string }[];
};
