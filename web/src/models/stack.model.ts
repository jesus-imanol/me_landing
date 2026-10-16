import type { Localized } from "./locale.model";

export type StackGroup = { title: string; items: string[] };

const LANGUAGES = ["Go", "TypeScript", "JavaScript", "Dart", "Python", "Java", "Kotlin", "PHP", "Rust"];
const FRONTEND = ["React", "Next.js", "Vue", "Angular", "Flutter", "Android", "Ionic", "Capacitor", "PWA", "Tailwind", "Vite"];
const BACKEND = ["Node.js", "Express", "FastAPI", "Django", "Supabase", "PostgreSQL", "MySQL", "MongoDB", "RabbitMQ"];
const CLOUD = ["AWS", "GCP", "Docker", "Vercel", "GitHub Actions", "Linux", "Arduino", "Figma"];
const AI = ["Claude Code", "GitHub Copilot", "Cursor", "MCP"];
const ARCH_TAIL = ["Hexagonal", "Clean Architecture", "Offline-first", "SOLID", "TDD", "OAuth 2.0", "JWT + RLS", "WebSockets"];

export const STACK: Localized<StackGroup[]> = {
  es: [
    { title: "Lenguajes", items: LANGUAGES },
    { title: "Frontend & Mobile", items: FRONTEND },
    { title: "Backend & Datos", items: BACKEND },
    { title: "Cloud & DevOps", items: CLOUD },
    { title: "Arquitectura", items: ["Event-Driven", "Monolito modular", "Microservicios", ...ARCH_TAIL] },
    { title: "Con IA (sin dejar de pensar)", items: AI },
  ],
  en: [
    { title: "Languages", items: LANGUAGES },
    { title: "Frontend & Mobile", items: FRONTEND },
    { title: "Backend & Data", items: BACKEND },
    { title: "Cloud & DevOps", items: CLOUD },
    { title: "Architecture", items: ["Event-Driven", "Modular monolith", "Microservices", ...ARCH_TAIL] },
    { title: "With AI (still thinking)", items: AI },
  ],
};

export const CERTIFICATIONS = [
  "AWS Academy · Generative AI Foundations",
  "AWS Academy · Cloud Architecting",
  "AWS Academy · Cloud Developing",
  "AWS Academy · Cloud Operations",
  "AWS Academy · Cloud Foundations",
  "Cisco · Operating Systems Support",
  "Cisco · Operating Systems Basics",
  "Cisco · Networking Basics",
] as const;
