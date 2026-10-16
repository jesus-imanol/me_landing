import type { ArtKey } from "./art.model";
import type { Locale, Localized } from "./locale.model";

export type ProjectArea = "frontend" | "backend" | "iot" | "web3" | "cloud";

/** Lo que se traduce de cada proyecto */
type ProjectText = {
  role: string;
  summary: string;
  /** Frase sarcástica que aparece al pasar el puntero */
  quip: string;
  org?: string;
};

type ProjectBase = {
  slug: string;
  year: number;
  name: string;
  stack: string[];
  areas: ProjectArea[];
  image?: ArtKey;
  href?: string;
  text: Localized<ProjectText>;
};

export type Project = Omit<ProjectBase, "text"> & ProjectText;

export const AREA_LABELS: Localized<Record<ProjectArea | "todo", string>> = {
  es: { todo: "Todo", frontend: "Frontend", backend: "Backend", iot: "IoT", web3: "Web3", cloud: "Cloud" },
  en: { todo: "All", frontend: "Frontend", backend: "Backend", iot: "IoT", web3: "Web3", cloud: "Cloud" },
};

const PROJECT_BASE: ProjectBase[] = [
  {
    slug: "conocemex",
    year: 2026,
    name: "ConoceMex",
    stack: ["Flutter", "Next.js", "Supabase", "PostGIS", "Mercado Pago"],
    areas: ["frontend", "backend"],
    image: "conocemex",
    href: "https://conocemexweb.vercel.app",
    text: {
      es: {
        org: "Talent Land México",
        role: "Frontend / UX-UI",
        summary:
          "App en Flutter + PWA en Next.js sobre Supabase (PostGIS, Edge Functions, RLS), OAuth con Mercado Pago y recomendaciones geolocalizadas sobre un monolito modular orientado a eventos.",
        quip: "Te recomienda tacos según dónde estés. De nada.",
      },
      en: {
        org: "Talent Land México",
        role: "Frontend / UX-UI",
        summary:
          "Flutter app + Next.js PWA on Supabase (PostGIS, Edge Functions, RLS), Mercado Pago OAuth and geolocated recommendations over an event-driven modular monolith.",
        quip: "It recommends tacos based on where you are. You're welcome.",
      },
    },
  },
  {
    slug: "monii",
    year: 2025,
    name: "Monii",
    stack: ["React", "Vue", "Ionic", "PWA", "Vitest"],
    areas: ["frontend"],
    image: "monii",
    text: {
      es: {
        org: "Monilio Tech Solutions",
        role: "Frontend & Mobile",
        summary:
          "Fintech cashless: PWA en React + app en Vue/Ionic con pedido por QR, almacenamiento offline-first, capa de servicios, más de 70% de cobertura de tests y CI/CD.",
        quip: "Pagas con QR. El café no se paga solo, todavía.",
      },
      en: {
        org: "Monilio Tech Solutions",
        role: "Frontend & Mobile",
        summary:
          "Cashless fintech: React PWA + Vue/Ionic app with QR scan-to-order, offline-first storage, a service layer, over 70% test coverage and CI/CD.",
        quip: "You pay with a QR. The coffee doesn't pay for itself. Yet.",
      },
    },
  },
  {
    slug: "cinesnacks",
    year: 2025,
    name: "CineSnacks",
    stack: ["Node.js", "Mercado Pago", "NFC", "IoT"],
    areas: ["backend", "iot"],
    image: "cinesnacks",
    text: {
      es: {
        role: "Full Stack",
        summary: "E-commerce en Node.js con Mercado Pago y un módulo IoT que liga tarjetas NFC a un dispensador físico de snacks.",
        quip: "Acercas la tarjeta y sale palomita. Ingeniería seria.",
      },
      en: {
        role: "Full Stack",
        summary: "Node.js e-commerce with Mercado Pago and an IoT module that links NFC cards to a physical snack dispenser.",
        quip: "Tap the card, popcorn comes out. Serious engineering.",
      },
    },
  },
  {
    slug: "cilantro",
    year: 2025,
    name: "Cilantro App",
    stack: ["Go", "Goroutines", "WebSockets", "IoT"],
    areas: ["backend", "iot"],
    image: "cilantro",
    text: {
      es: {
        role: "Backend (Go)",
        summary: "Monitoreo AgroTech en tiempo real: ingesta IoT concurrente con goroutines y channels, transmitida por WebSockets.",
        quip: "El cilantro tiene mejor monitoreo que tu servidor.",
      },
      en: {
        role: "Backend (Go)",
        summary: "Real-time AgroTech monitoring: concurrent IoT ingestion with goroutines and channels, streamed over WebSockets.",
        quip: "This cilantro has better monitoring than your server.",
      },
    },
  },
  {
    slug: "lambi",
    year: 2024,
    name: "Lambi",
    stack: ["Angular", "FastAPI", "AWS", "CI/CD"],
    areas: ["frontend", "backend", "cloud"],
    image: "lambi",
    text: {
      es: {
        role: "Full Stack",
        summary: "Angular + FastAPI sobre AWS RDS; despliegues 70% más rápidos con EC2 y pipelines de CI/CD.",
        quip: "Deploy en viernes. Y no pasó nada. Tilín.",
      },
      en: {
        role: "Full Stack",
        summary: "Angular + FastAPI on AWS RDS; 70% faster deployments with EC2 and CI/CD pipelines.",
        quip: "Friday deploy. Nothing broke. Tilín.",
      },
    },
  },
  {
    slug: "secret-event",
    year: 2024,
    name: "Secret Event",
    stack: ["Rust", "Gear Protocol", "Smart Contracts"],
    areas: ["web3"],
    image: "secretEvent",
    text: {
      es: {
        org: "2.º lugar · Hackathon UP Chiapas",
        role: "Full Stack (Web3)",
        summary: "Sistema de denuncias anónimas con smart contracts en Rust sobre Gear Protocol.",
        quip: "Anónimo de verdad. Ni yo sé quién fue.",
      },
      en: {
        org: "2nd place · UP Chiapas Hackathon",
        role: "Full Stack (Web3)",
        summary: "Anonymous reporting system with Rust smart contracts on Gear Protocol.",
        quip: "Truly anonymous. Even I don't know who did it.",
      },
    },
  },
  {
    slug: "blueservices",
    year: 2025,
    name: "Blueservices Software",
    stack: ["RBAC", "Calendar", "Polling"],
    areas: ["frontend", "backend"],
    text: {
      es: {
        role: "Full Stack",
        summary: "Asignación de roles para talleres mecánicos con RBAC, calendario de citas y notificaciones por polling.",
        quip: "Tu mecánico ya tiene permisos. Tú no.",
      },
      en: {
        role: "Full Stack",
        summary: "Role assignment for auto repair shops with RBAC, an appointment calendar and polling notifications.",
        quip: "Your mechanic has permissions now. You don't.",
      },
    },
  },
];

export function projectsFor(locale: Locale): Project[] {
  return PROJECT_BASE.map(({ text, ...p }) => ({ ...p, ...text[locale] }));
}

export type OpenSourceRepo = { name: string; idea: string; stack: string };

export const OPEN_SOURCE: Localized<OpenSourceRepo[]> = {
  es: [
    { name: "oauth_go_hexagonal", idea: "Autenticación aislada detrás de puertos y adaptadores", stack: "Go" },
    { name: "first_api_event_driven", idea: "Servicios que se hablan por eventos, no por llamadas", stack: "Go · RabbitMQ" },
    { name: "microservicios", idea: "Un sistema partido en servicios independientes", stack: "JavaScript" },
    { name: "clean_arquitecture_vue", idea: "Clean Architecture llevada al frontend", stack: "Vue" },
    { name: "mi_ES_compiler", idea: "Un compilador para un lenguaje en español", stack: "Java" },
    { name: "di_android_hilt_ksp", idea: "Inyección de dependencias en Android con Hilt + KSP", stack: "Kotlin" },
  ],
  en: [
    { name: "oauth_go_hexagonal", idea: "Authentication isolated behind ports and adapters", stack: "Go" },
    { name: "first_api_event_driven", idea: "Services that talk through events, not calls", stack: "Go · RabbitMQ" },
    { name: "microservicios", idea: "A system split into independent services", stack: "JavaScript" },
    { name: "clean_arquitecture_vue", idea: "Clean Architecture brought to the frontend", stack: "Vue" },
    { name: "mi_ES_compiler", idea: "A compiler for a Spanish-based language", stack: "Java" },
    { name: "di_android_hilt_ksp", idea: "Dependency injection on Android with Hilt + KSP", stack: "Kotlin" },
  ],
};
