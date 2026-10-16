export type StackGroup = { title: string; items: string[] };

export const STACK: StackGroup[] = [
  { title: "Lenguajes", items: ["Go", "TypeScript", "JavaScript", "Dart", "Python", "Java", "Kotlin", "PHP", "Rust"] },
  {
    title: "Frontend & Mobile",
    items: ["React", "Next.js", "Vue", "Angular", "Flutter", "Android", "Ionic", "Capacitor", "PWA", "Tailwind", "Vite"],
  },
  {
    title: "Backend & Datos",
    items: ["Node.js", "Express", "FastAPI", "Django", "Supabase", "PostgreSQL", "MySQL", "MongoDB", "RabbitMQ"],
  },
  { title: "Cloud & DevOps", items: ["AWS", "GCP", "Docker", "Vercel", "GitHub Actions", "Linux", "Arduino", "Figma"] },
  {
    title: "Arquitectura",
    items: [
      "Event-Driven",
      "Monolito modular",
      "Hexagonal",
      "Clean Architecture",
      "Microservicios",
      "Offline-first",
      "SOLID",
      "TDD",
      "OAuth 2.0",
      "JWT + RLS",
      "WebSockets",
    ],
  },
  { title: "Con IA (sin dejar de pensar)", items: ["Claude Code", "GitHub Copilot", "Cursor", "MCP"] },
];

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
