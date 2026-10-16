import type { Localized } from "./locale.model";

/** Textos fijos de la interfaz, por sección. Los datos (proyectos, stack…) viven en sus propios modelos. */
export type Copy = {
  nav: { home: string; main: string; links: { href: string; label: string }[]; talk: string };
  theme: { toDark: string; toLight: string };
  lang: { switchTo: string; short: string };
  hero: {
    srName: string;
    taglineA: string;
    taglineStrong1: string;
    taglineB: string;
    taglineStrong2: string;
    taglineC: string;
    nicknameA: string;
    tagAvailable: string;
    tagForProjects: string;
    cta: string;
  };
  projects: {
    eyebrow: string;
    titleA: string;
    titleB: string;
    filterLabel: string;
    live: string;
  };
  live: {
    eyebrow: string;
    titleA: string;
    titleB: string;
    body: string;
    badge: string;
    visit: string;
    code: string;
    quote: string;
    ctaTitle: string;
    ctaBody: string;
  };
  tilin: { eyebrow: string; ring: string; body: string };
  principles: { eyebrow: string; titleA: string; titleB: string };
  stack: { eyebrow: string; titleA: string; titleB: string; body: string; certifications: string };
  github: { eyebrow: string; titleA: string; titleB: string; repos: string; latest: string; all: string };
  contact: { eyebrow: string; titleA: string; titleB: string; body: string; cta: string; headAlt: string };
  footer: { line: string };
  face: { alt: string };
};

export const COPY: Localized<Copy> = {
  es: {
    nav: {
      home: "Inicio",
      main: "Principal",
      links: [
        { href: "#proyectos", label: "Proyectos" },
        { href: "#en-produccion", label: "En producción" },
        { href: "#tilin", label: "Tilín" },
        { href: "#como-pienso", label: "Cómo pienso" },
        { href: "#stack", label: "Stack" },
      ],
      talk: "Hablemos",
    },
    theme: { toDark: "Activar modo oscuro", toLight: "Activar modo claro" },
    lang: { switchTo: "Ver en inglés", short: "EN" },
    hero: {
      srName: "Jesús Imanol Castillo, Chuy",
      taglineA: "Full stack que construye ",
      taglineStrong1: "con estructura",
      taglineB: " primero… y ",
      taglineStrong2: "con estilo",
      taglineC: " después.",
      nicknameA: "Me dicen",
      tagAvailable: "Disponible",
      tagForProjects: "Para proyectos",
      cta: "Ver lo que he construido",
    },
    projects: {
      eyebrow: "Lo que he construido",
      titleA: "Proyectos",
      titleB: "con tilín",
      filterLabel: "Filtrar por área",
      live: "Verlo en vivo",
    },
    live: {
      eyebrow: "En producción",
      titleA: "Proyectos que",
      titleB: "ya se usan",
      body: "Negocios y personas reales los usan todos los días. Si quieres algo así para tu negocio, te paso una cotización sin compromiso.",
      badge: "En vivo",
      visit: "Ver sitio",
      code: "Ver código",
      quote: "Quiero algo así",
      ctaTitle: "¿Tienes un negocio o una idea?",
      ctaBody:
        "Sitios que venden por WhatsApp, plataformas con panel para tus clientes o apps móviles. Cuéntame qué necesitas y te cotizo.",
    },
    tilin: {
      eyebrow: "Mi palabra favorita (y mi comida favorita)",
      ring: "Hazle tilín",
      body: "Se dice cuando algo sale bien. También cuando sale tan mal que da risa. En mi código casi siempre es lo primero. Sube y baja la página: me la como y te la regreso.",
    },
    principles: { eyebrow: "Cómo pienso el software", titleA: "Systems over", titleB: "snippets" },
    stack: {
      eyebrow: "Con qué trabajo",
      titleA: "Mi",
      titleB: "caja de herramientas",
      body: "Dos frentes: backend con Go, Node.js y Supabase; cliente con React, Next.js, Vue y Flutter. Los frameworks cambian; los fundamentos se quedan.",
      certifications: "Certificaciones",
    },
    github: {
      eyebrow: "Open source",
      titleA: "Código que",
      titleB: "se puede leer",
      repos: "repos públicos en GitHub",
      latest: "Lo último que pushé",
      all: "Ver todo en GitHub",
    },
    contact: {
      eyebrow: "¿Y ahora qué?",
      titleA: "¿Lo",
      titleB: "construimos?",
      body: "Si buscas a alguien que diseñe los límites antes de escribir la primera línea, y que además se ría mientras lo hace, mándame mensaje. Respondo rápido. Tilín.",
      cta: "Escríbeme por LinkedIn",
      headAlt: "Jesús de perfil, mordiendo el aire",
    },
    footer: {
      line: "Jesús Imanol Castillo, “Chuy” (chuy7x). Desarrollador Full Stack en Chiapas, México. Hecho con Next.js, GSAP, anime.js y Motion.",
    },
    face: { alt: "Ilustración de Jesús Imanol saludando y riéndose" },
  },
  en: {
    nav: {
      home: "Home",
      main: "Main",
      links: [
        { href: "#proyectos", label: "Projects" },
        { href: "#en-produccion", label: "Live work" },
        { href: "#tilin", label: "Tilín" },
        { href: "#como-pienso", label: "How I think" },
        { href: "#stack", label: "Stack" },
      ],
      talk: "Let's talk",
    },
    theme: { toDark: "Switch to dark mode", toLight: "Switch to light mode" },
    lang: { switchTo: "Ver en español", short: "ES" },
    hero: {
      srName: "Jesús Imanol Castillo, Chuy",
      taglineA: "Full stack developer who builds ",
      taglineStrong1: "with structure",
      taglineB: " first… and ",
      taglineStrong2: "with style",
      taglineC: " after.",
      nicknameA: "Friends call me",
      tagAvailable: "Available",
      tagForProjects: "For projects",
      cta: "See what I've built",
    },
    projects: {
      eyebrow: "What I've built",
      titleA: "Projects",
      titleB: "with tilín",
      filterLabel: "Filter by area",
      live: "See it live",
    },
    live: {
      eyebrow: "In production",
      titleA: "Projects people",
      titleB: "actually use",
      body: "Real businesses and people use them every day. If you want something like this for your business, I'll send you a no-strings quote.",
      badge: "Live",
      visit: "Visit site",
      code: "See the code",
      quote: "I want one like this",
      ctaTitle: "Got a business or an idea?",
      ctaBody:
        "Websites that sell through WhatsApp, platforms with a dashboard for your clients, or mobile apps. Tell me what you need and I'll quote it.",
    },
    tilin: {
      eyebrow: "My favorite word (and my favorite snack)",
      ring: "Ring the tilín",
      body: "It's what you say when something works. Also when it breaks so badly it's funny. In my code it's usually the first one. Scroll up and down: I eat it and give it back.",
    },
    principles: { eyebrow: "How I think about software", titleA: "Systems over", titleB: "snippets" },
    stack: {
      eyebrow: "What I work with",
      titleA: "My",
      titleB: "toolbox",
      body: "Two fronts: backend with Go, Node.js and Supabase; client with React, Next.js, Vue and Flutter. Frameworks change; fundamentals stay.",
      certifications: "Certifications",
    },
    github: {
      eyebrow: "Open source",
      titleA: "Code you",
      titleB: "can actually read",
      repos: "public repos on GitHub",
      latest: "What I pushed lately",
      all: "See everything on GitHub",
    },
    contact: {
      eyebrow: "So, what's next?",
      titleA: "Shall we",
      titleB: "build it?",
      body: "If you're looking for someone who designs the boundaries before writing the first line, and laughs while doing it, send me a message. I reply fast. Tilín.",
      cta: "Message me on LinkedIn",
      headAlt: "Jesús in profile, biting the air",
    },
    footer: {
      line: "Jesús Imanol Castillo, “Chuy” (chuy7x). Full Stack Developer in Chiapas, Mexico. Built with Next.js, GSAP, anime.js and Motion.",
    },
    face: { alt: "Illustration of Jesús Imanol waving and laughing" },
  },
};
