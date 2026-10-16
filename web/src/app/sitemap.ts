import type { MetadataRoute } from "next";
import { ART, FRENTE } from "@/models/art.model";
import { HTML_LANG, LOCALES } from "@/models/locale.model";
import { HOME_SEO, SITE_URL } from "@/models/seo.model";
import { absoluteUrl } from "@/services/seo.service";

export default function sitemap(): MetadataRoute.Sitemap {
  const images = [FRENTE.frames[0], ...Object.values(ART).map((a) => a.src)].map((src) => `${SITE_URL}${src}`);
  // Cada idioma declara a todos sus hermanos (hreflang dentro del sitemap)
  const languages = Object.fromEntries(LOCALES.map((l) => [HTML_LANG[l], absoluteUrl(l)]));

  return LOCALES.map((locale) => ({
    url: absoluteUrl(locale),
    lastModified: new Date(),
    changeFrequency: HOME_SEO[locale].changeFrequency,
    priority: HOME_SEO[locale].priority,
    alternates: { languages },
    images,
  }));
}
