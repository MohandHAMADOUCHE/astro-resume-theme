// Utility helpers to localize CV data outside of Astro frontmatter
// Keep types light to avoid heavy generic instantiation across Astro files

type Locale = 'en' | 'fr' | string;

function pickLang<T = any>(base: T | undefined, en: T | undefined, locale: Locale): T | undefined {
  return locale === 'en' ? (en ?? base) : base;
}

// One generic localizer instead of multiple specialized helpers
export function localizeList(list: any, locale: Locale, keys: string[]) {
  const arr: any[] = Array.isArray(list) ? list : [];
  return arr.map((item: any) => {
    const out: any = { ...item };
    for (const k of keys) {
      // prefer <key>_en when locale is 'en', else fallback to base
      out[k] = pickLang(item?.[k], item?.[`${k}_en`], locale);
    }
    return out;
  });
}

export function splitHeadTail<T = any>(arr: T[], headCount = 3) {
  const a = Array.isArray(arr) ? arr : [];
  const head = a.slice(0, headCount);
  const tail = a.slice(headCount);
  return { head, tail };
}

// Backward-compatible named helpers (thin wrappers) for simpler imports
export function localizeEducation(list: any, locale: Locale) {
  return localizeList(list, locale, ['title','sub_title','details']);
}

export function localizeExperiences(list: any, locale: Locale) {
  return localizeList(list, locale, ['title','sub_title','details']);
}

export function localizeProjects(list: any, locale: Locale) {
  return localizeList(list, locale, ['title','type','description']);
}

// Default export for flexible import styles in .astro files
export default {
  localizeList,
  splitHeadTail,
  localizeEducation,
  localizeExperiences,
  localizeProjects,
};
