import type { Guide } from './types';

const guides: Guide[] = [];

export function getGuide(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}

export function getAllGuides(): Guide[] {
  return guides;
}

export function registerGuide(guide: Guide) {
  guides.push(guide);
}
