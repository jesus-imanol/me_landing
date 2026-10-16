export type SocialLink = { label: string; href: string };

export const PROFILE = {
  name: "Jesús Imanol",
  lastName: "Castillo",
  handle: "jesus-imanol",
  /** Como lo buscan o le dicen. Va visible en la página y en el JSON-LD (alternateName). */
  nickname: "Chuy",
  aliases: ["Chuy", "Chuy Castillo", "Jesús Castillo", "Jesus Castillo", "Jesús Imanol", "Jesus Imanol Castillo", "chuy7x", "chuysscc", "jesus-imanol"],
  role: "Full Stack Developer",
  school: "Ingeniería de Software · Universidad Politécnica de Chiapas",
  pitch:
    "Construyo software como se construye algo que tiene que durar: primero la estructura, luego los detalles. Backend con Go, Node.js y Supabase; cliente con React, Next.js, Vue y Flutter.",
  sideNote: "Escribí un compilador por diversión. Sí, por diversión.",
  domains: ["Fintech", "E-commerce", "IoT", "Web3"],
  avatar: "/img/frente-flat/1.webp",
} as const;

export const SOCIALS: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/jesus-imanol" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/jesus-imanol-castillo" },
  { label: "Instagram", href: "https://www.instagram.com/chuysscc/" },
];

export const GITHUB_URL = SOCIALS[0].href;
export const LINKEDIN_URL = SOCIALS[1].href;
