import type { Localized } from "./locale.model";

/** Dominio público. En Vercel cae solo al dominio de producción si no se define. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000")
).replace(/\/$/, "");

export const SITE_NAME = "Jesús Imanol";

export const SITE_TITLE: Localized<string> = {
  es: "Jesús Imanol Castillo (Chuy) — Desarrollador Full Stack en Chiapas",
  en: "Jesús Imanol Castillo (Chuy) — Full Stack Developer from Chiapas, Mexico",
};

export const SITE_DESCRIPTION: Localized<string> = {
  es: "Portafolio de Jesús Imanol Castillo (Chuy), desarrollador Full Stack de Chiapas, México. Backend con Go, Node.js y Supabase; frontend y móvil con React, Next.js, Vue y Flutter. Proyectos en fintech, e-commerce, IoT y Web3.",
  en: "Portfolio of Jesús Imanol Castillo (Chuy), Full Stack Developer from Chiapas, Mexico. Backend with Go, Node.js and Supabase; frontend and mobile with React, Next.js, Vue and Flutter. Projects in fintech, e-commerce, IoT and Web3.",
};

const NAME_KEYWORDS = [
  "Jesús Imanol Castillo",
  "Jesús Imanol",
  "jesus-imanol",
  "Jesús Castillo",
  "Jesus Castillo",
  "Chuy",
  "Chuy Castillo",
  "chuy7x",
];

export const SITE_KEYWORDS: Localized<string[]> = {
  es: [
    ...NAME_KEYWORDS,
    "Jesus Castillo desarrollador",
    "Jesús Castillo programador",
    "Chuy desarrollador",
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
  ],
  en: [
    ...NAME_KEYWORDS,
    "Jesus Castillo developer",
    "full stack developer Mexico",
    "full stack developer Chiapas",
    "remote full stack developer",
    "Go developer",
    "Next.js developer",
    "React developer",
    "Flutter developer",
    "Supabase",
    "hexagonal architecture",
    "event-driven architecture",
    "developer portfolio",
  ],
};

export interface PageSeo {
  priority: number;
  changeFrequency: "daily" | "weekly" | "monthly" | "yearly";
}

/** Una sola página por idioma; las secciones son anclas (#proyectos, #stack…) y no van al sitemap. */
export const HOME_SEO: Localized<PageSeo> = {
  es: { priority: 1, changeFrequency: "monthly" },
  en: { priority: 0.9, changeFrequency: "monthly" },
};
