/** Dominio público. En Vercel cae solo al dominio de producción si no se define. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000")
).replace(/\/$/, "");

export const SITE_NAME = "Jesús Imanol";
export const SITE_TITLE = "Jesús Imanol Castillo — Desarrollador Full Stack en Chiapas";
export const SITE_DESCRIPTION =
  "Portafolio de Jesús Imanol Castillo, desarrollador Full Stack de Chiapas, México. Backend con Go, Node.js y Supabase; frontend y móvil con React, Next.js, Vue y Flutter. Proyectos en fintech, e-commerce, IoT y Web3.";

export const SITE_KEYWORDS = [
  "Jesús Imanol Castillo",
  "Jesús Imanol",
  "jesus-imanol",
  "desarrollador full stack",
  "desarrollador web Chiapas",
  "programador Tuxtla Gutiérrez",
  "full stack developer México",
  "desarrollador Go",
  "desarrollador Next.js",
  "desarrollador React",
  "desarrollador Flutter",
  "Supabase",
  "arquitectura hexagonal",
  "event-driven",
  "portafolio desarrollador",
  "Universidad Politécnica de Chiapas",
];

export interface PageSeo {
  path: string;
  priority: number;
  changeFrequency: "daily" | "weekly" | "monthly" | "yearly";
}

/** Por ahora es una sola página; las secciones son anclas (#proyectos, #stack…) y no van al sitemap. */
export const PAGES: PageSeo[] = [{ path: "/", priority: 1, changeFrequency: "monthly" }];
