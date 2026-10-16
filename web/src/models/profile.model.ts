import type { Localized } from "./locale.model";

export type SocialLink = { label: string; href: string };

export const PROFILE = {
  name: "Jesús Imanol",
  lastName: "Castillo",
  handle: "jesus-imanol",
  /** Como lo buscan o le dicen. Va visible en la página y en el JSON-LD (alternateName). */
  nickname: "Chuy",
  aliases: ["Chuy", "Chuy Castillo", "Jesús Castillo", "Jesus Castillo", "Jesús Imanol", "Jesus Imanol Castillo", "chuy7x", "chuysscc", "chuysszx", "jesuscast7z", "jesus-imanol"],
  avatar: "/img/frente-flat/1.webp",
} as const;

export const PROFILE_TEXT: Localized<{ role: string; school: string; pitch: string }> = {
  es: {
    role: "Desarrollador Full Stack",
    school: "Ingeniería de Software · Universidad Politécnica de Chiapas",
    pitch:
      "Construyo software como se construye algo que tiene que durar: primero la estructura, luego los detalles. Backend con Go, Node.js y Supabase; cliente con React, Next.js, Vue y Flutter.",
  },
  en: {
    role: "Full Stack Developer",
    school: "Software Engineering · Universidad Politécnica de Chiapas",
    pitch:
      "I build software the way you'd build anything meant to last: structure first, details later. Backend with Go, Node.js and Supabase; client with React, Next.js, Vue and Flutter.",
  },
};

export const SOCIALS: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/jesus-imanol" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/jesus-imanol-castillo" },
  { label: "Instagram", href: "https://www.instagram.com/chuysscc/" },
  { label: "X", href: "https://x.com/jesuscast7z" },
  { label: "TikTok", href: "https://www.tiktok.com/@chuysszx" },
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61555328035149" },
];

export const X_HANDLE = "@jesuscast7z";

export const GITHUB_URL = SOCIALS[0].href;
export const LINKEDIN_URL = SOCIALS[1].href;
