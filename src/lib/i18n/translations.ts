import { common } from '@/locales/en/common';
import { seo } from '@/locales/en/seo';
import type { CommonTranslations, SeoTranslations } from './types';

export function getCommonTranslations(_locale = 'en'): CommonTranslations {
  return common;
}

export function getSeoTranslations(_locale = 'en'): SeoTranslations {
  return seo;
}
