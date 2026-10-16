/** Idiomas del sitio. El español vive en "/" (ya indexado) y el inglés en "/en". */
export const LOCALES = ["es", "en"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "es";

export const LOCALE_PATH: Record<Locale, string> = { es: "/", en: "/en" };
export const HTML_LANG: Record<Locale, string> = { es: "es-MX", en: "en" };
export const OG_LOCALE: Record<Locale, string> = { es: "es_MX", en: "en_US" };
export const LOCALE_LABEL: Record<Locale, string> = { es: "Español", en: "English" };

/** Un valor por idioma. */
export type Localized<T> = Record<Locale, T>;
