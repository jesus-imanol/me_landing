import type { MetadataRoute } from "next";
import { ART, FRENTE } from "@/models/art.model";
import { PAGES, SITE_URL } from "@/models/seo.model";

export default function sitemap(): MetadataRoute.Sitemap {
  const images = [FRENTE.frames[0], ...Object.values(ART).map((a) => a.src)].map((src) => `${SITE_URL}${src}`);
  return PAGES.map((p) => ({
    url: `${SITE_URL}${p.path === "/" ? "" : p.path}`,
    lastModified: new Date(),
    changeFrequency: p.changeFrequency,
    priority: p.priority,
    images: p.path === "/" ? images : undefined,
  }));
}
