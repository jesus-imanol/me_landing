import type { Localized } from "./locale.model";

/** Frases de Jesús. "Tilín" es la firma: se dice cuando algo sale bien… o cuando sale tan mal que da risa. */
export const TILIN_PHRASES: Localized<string[]> = {
  es: [
    "¿Deploy en viernes? Tilín.",
    "¿Bug en producción? Ya lo vi. Tilín.",
    "¿Tests? Más de 70% de cobertura. Tilín.",
    "¿Microservicios para un CRUD? No. Tilín.",
    "¿Que si sé Go? Goroutines y channels. Tilín.",
    "¿Contratarme? Tilín, tilín.",
  ],
  en: [
    "Friday deploy? Tilín.",
    "Bug in production? Already on it. Tilín.",
    "Tests? Over 70% coverage. Tilín.",
    "Microservices for a CRUD? Nope. Tilín.",
    "Do I know Go? Goroutines and channels. Tilín.",
    "Hire me? Tilín, tilín.",
  ],
};

/** Lo que Jesús se come en el hero: las malas prácticas */
export const CHOMP_STRIP: Localized<{ long: string; short: string }> = {
  es: { long: "bugs · espagueti · deadlines", short: "bugs · espagueti" },
  en: { long: "bugs · spaghetti · deadlines", short: "bugs · spaghetti" },
};

export const HERO_BUBBLES: Localized<string[]> = {
  es: ["tilín", "¿contratas o qué?", "arquitectura primero", "tilín después"],
  en: ["tilín", "hiring or what?", "architecture first", "tilín after"],
};

export const MARQUEE_PHRASES: Localized<string[]> = {
  es: [
    "Tilín",
    "Architecture first. Code second.",
    "Lo simple le gana a lo ingenioso",
    "Systems over snippets",
    "Tilín",
    "Understand first. Automate second.",
    "Offline-first",
    "Event-driven",
  ],
  en: [
    "Tilín",
    "Architecture first. Code second.",
    "Simple beats clever",
    "Systems over snippets",
    "Tilín",
    "Understand first. Automate second.",
    "Offline-first",
    "Event-driven",
  ],
};

/** Mensajes que aparecen según cuántas veces le das al botón de "tilín" */
export const TILIN_REACTIONS: Localized<string[]> = {
  es: ["tilín", "tilín tilín", "ya, ya entendí", "¿no tienes código que revisar?", "ok, contrátame y seguimos"],
  en: ["tilín", "tilín tilín", "ok, ok, I get it", "don't you have code to review?", "fine, hire me and keep going"],
};
