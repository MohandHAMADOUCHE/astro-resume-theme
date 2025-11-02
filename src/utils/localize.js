// Lightweight localization helpers in plain JS to avoid TS module resolution quirks in .astro files

/**
 * @typedef {('en'|'fr'|string)} Locale
 */

/**
 * @template T
 * @param {T|undefined} base
 * @param {T|undefined} en
 * @param {Locale} locale
 * @returns {T|undefined}
 */
function pickLang(base, en, locale) {
  return locale === 'en' ? (en ?? base) : base;
}

/**
 * Generic localizer for lists with bilingual keys
 * @param {any[]} list
 * @param {Locale} locale
 * @param {string[]} keys
 */
export function localizeList(list, locale, keys) {
  const arr = Array.isArray(list) ? list : [];
  return arr.map((item) => {
    const out = { ...item };
    for (const k of keys) {
      out[k] = pickLang(item?.[k], item?.[`${k}_en`], locale);
    }
    return out;
  });
}

/**
 * @template T
 * @param {T[]} arr
 * @param {number} [headCount=3]
 */
export function splitHeadTail(arr, headCount = 3) {
  const a = Array.isArray(arr) ? arr : [];
  const head = a.slice(0, headCount);
  const tail = a.slice(headCount);
  return { head, tail };
}

// Backward-compatible named helpers
export function localizeEducation(list, locale) {
  return localizeList(list, locale, ['title','sub_title','details']);
}

export function localizeExperiences(list, locale) {
  return localizeList(list, locale, ['title','sub_title','details']);
}

export function localizeProjects(list, locale) {
  return localizeList(list, locale, ['title','type','description']);
}

export default {
  localizeList,
  splitHeadTail,
  localizeEducation,
  localizeExperiences,
  localizeProjects,
};
