import type { ArtKey } from "./art.model";

export type ProjectArea = "frontend" | "backend" | "iot" | "web3" | "cloud";

export type Project = {
  slug: string;
  year: number;
  name: string;
  org?: string;
  role: string;
  summary: string;
  stack: string[];
  areas: ProjectArea[];
  image?: ArtKey;
  /** Frase sarcástica que aparece al pasar el puntero */
  quip: string;
  href?: string;
};

export const AREA_LABELS: Record<ProjectArea | "todo", string> = {
  todo: "Todo",
  frontend: "Frontend",
  backend: "Backend",
  iot: "IoT",
  web3: "Web3",
  cloud: "Cloud",
};

export const PROJECTS: Project[] = [
  {
    slug: "conocemex",
    year: 2026,
    name: "ConoceMex",
    org: "Talent Land México",
    role: "Frontend / UX-UI",
    summary:
      "App en Flutter + PWA en Next.js sobre Supabase (PostGIS, Edge Functions, RLS), OAuth con Mercado Pago y recomendaciones geolocalizadas sobre un monolito modular orientado a eventos.",
    stack: ["Flutter", "Next.js", "Supabase", "PostGIS", "Mercado Pago"],
    areas: ["frontend", "backend"],
    image: "conocemex",
    quip: "Te recomienda tacos según dónde estés. De nada.",
    href: "https://conocemexweb.vercel.app",
  },
  {
    slug: "monii",
    year: 2025,
    name: "Monii",
    org: "Monilio Tech Solutions",
    role: "Frontend & Mobile",
    summary:
      "Fintech cashless: PWA en React + app en Vue/Ionic con pedido por QR, almacenamiento offline-first, capa de servicios, más de 70% de cobertura de tests y CI/CD.",
    stack: ["React", "Vue", "Ionic", "PWA", "Vitest"],
    areas: ["frontend"],
    image: "monii",
    quip: "Pagas con QR. El café no se paga solo, todavía.",
  },
  {
    slug: "cinesnacks",
    year: 2025,
    name: "CineSnacks",
    role: "Full Stack",
    summary:
      "E-commerce en Node.js con Mercado Pago y un módulo IoT que liga tarjetas NFC a un dispensador físico de snacks.",
    stack: ["Node.js", "Mercado Pago", "NFC", "IoT"],
    areas: ["backend", "iot"],
    image: "cinesnacks",
    quip: "Acercas la tarjeta y sale palomita. Ingeniería seria.",
  },
  {
    slug: "cilantro",
    year: 2025,
    name: "Cilantro App",
    role: "Backend (Go)",
    summary:
      "Monitoreo AgroTech en tiempo real: ingesta IoT concurrente con goroutines y channels, transmitida por WebSockets.",
    stack: ["Go", "Goroutines", "WebSockets", "IoT"],
    areas: ["backend", "iot"],
    image: "cilantro",
    quip: "El cilantro tiene mejor monitoreo que tu servidor.",
  },
  {
    slug: "lambi",
    year: 2024,
    name: "Lambi",
    role: "Full Stack",
    summary: "Angular + FastAPI sobre AWS RDS; despliegues 70% más rápidos con EC2 y pipelines de CI/CD.",
    stack: ["Angular", "FastAPI", "AWS", "CI/CD"],
    areas: ["frontend", "backend", "cloud"],
    image: "lambi",
    quip: "Deploy en viernes. Y no pasó nada. Tilín.",
  },
  {
    slug: "secret-event",
    year: 2024,
    name: "Secret Event",
    org: "2.º lugar · Hackathon UP Chiapas",
    role: "Full Stack (Web3)",
    summary: "Sistema de denuncias anónimas con smart contracts en Rust sobre Gear Protocol.",
    stack: ["Rust", "Gear Protocol", "Smart Contracts"],
    areas: ["web3"],
    image: "secretEvent",
    quip: "Anónimo de verdad. Ni yo sé quién fue.",
  },
  {
    slug: "blueservices",
    year: 2025,
    name: "Blueservices Software",
    role: "Full Stack",
    summary:
      "Asignación de roles para talleres mecánicos con RBAC, calendario de citas y notificaciones por polling.",
    stack: ["RBAC", "Calendario", "Polling"],
    areas: ["frontend", "backend"],
    quip: "Tu mecánico ya tiene permisos. Tú no.",
  },
];

export type OpenSourceRepo = { name: string; idea: string; stack: string };

export const OPEN_SOURCE: OpenSourceRepo[] = [
  { name: "oauth_go_hexagonal", idea: "Autenticación aislada detrás de puertos y adaptadores", stack: "Go" },
  { name: "first_api_event_driven", idea: "Servicios que se hablan por eventos, no por llamadas", stack: "Go · RabbitMQ" },
  { name: "microservicios", idea: "Un sistema partido en servicios independientes", stack: "JavaScript" },
  { name: "clean_arquitecture_vue", idea: "Clean Architecture llevada al frontend", stack: "Vue" },
  { name: "mi_ES_compiler", idea: "Un compilador para un lenguaje en español", stack: "Java" },
  { name: "di_android_hilt_ksp", idea: "Inyección de dependencias en Android con Hilt + KSP", stack: "Kotlin" },
];
