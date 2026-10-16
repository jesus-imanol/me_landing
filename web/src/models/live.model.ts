import type { Locale, Localized } from "./locale.model";

/** Proyectos en producción que hoy usan clientes reales. Las capturas son de los sitios en vivo (raw/shots). */
type LiveText = { kind: string; summary: string; highlights: string[] };

type LiveBase = {
  slug: string;
  name: string;
  /** Sitio público; si no hay (app móvil), se enlaza el repo */
  url?: string;
  repo?: string;
  stack: string[];
  /** Captura de escritorio (1200×750) y de celular real, emulando un iPhone (390×844) */
  shot?: { desktop: string; mobile: string };
  text: Localized<LiveText>;
};

export type LiveProject = Omit<LiveBase, "text"> & LiveText;

const LIVE_BASE: LiveBase[] = [
  {
    slug: "alwayswithyou",
    name: "AlwaysWithYou",
    url: "https://alwayswithyou.online/",
    stack: ["Next.js 16", "Supabase", "RLS", "Cloudflare Workers", "TanStack Query", "Vitest"],
    shot: { desktop: "/img/live/alwayswithyou.webp", mobile: "/img/live/alwayswithyou-movil.webp" },
    text: {
      es: {
        kind: "Plataforma SaaS · Invitaciones digitales",
        summary:
          "Invitaciones digitales para bodas y XV años: cada evento tiene su página en subdominio, link personal y QR por familia, confirmación (RSVP), check-in en la puerta y álbum de fotos de los invitados.",
        highlights: ["Panel para la agencia y para los novios", "Subdominio por evento", "QR + check-in en la entrada"],
      },
      en: {
        kind: "SaaS platform · Digital invitations",
        summary:
          "Digital invitations for weddings and quinceañeras: every event gets its own subdomain, a personal link and QR per family, RSVP, door check-in and a guest photo album.",
        highlights: ["Dashboard for the agency and the couple", "One subdomain per event", "QR + door check-in"],
      },
    },
  },
  {
    slug: "carnitas-noyola",
    name: "Carnitas Noyola",
    url: "https://carnitasnoyola.chuy7x.space/",
    stack: ["Next.js 16", "MVVM", "anime.js", "SEO local", "WhatsApp"],
    shot: { desktop: "/img/live/carnitas.webp", mobile: "/img/live/carnitas-movil.webp" },
    text: {
      es: {
        kind: "Sitio para negocio · Restaurante",
        summary:
          "Sitio para una carnicería de carnitas de Chiapas que llega a Los Cabos: menú, armado de pedido que se envía por WhatsApp, recorrido de la tienda, reseñas y SEO local en español e inglés.",
        highlights: ["Pedidos por WhatsApp", "Español e inglés", "SEO local para Los Cabos"],
      },
      en: {
        kind: "Business website · Restaurant",
        summary:
          "Website for a carnitas shop from Chiapas expanding to Los Cabos: menu, an order builder that sends to WhatsApp, a store tour, reviews and local SEO in Spanish and English.",
        highlights: ["WhatsApp ordering", "Spanish and English", "Local SEO for Los Cabos"],
      },
    },
  },
  {
    slug: "emilia-bonita",
    name: "Emilia Bonita",
    url: "https://emilia-bonita-coffee.jaguarmind.network/",
    stack: ["Next.js 16", "Motion", "Zustand", "Tailwind 4", "WhatsApp"],
    shot: { desktop: "/img/live/emilia.webp", mobile: "/img/live/emilia-movil.webp" },
    text: {
      es: {
        kind: "Sitio para negocio · Cafetería",
        summary:
          "Landing para una cafetería en Huixtla, Chiapas: carta completa con opciones (sabor, tamaño, ingredientes), carrito y pedido que se arma solo y se manda por WhatsApp. Sin backend ni comisiones.",
        highlights: ["Carta con opciones y carrito", "Pedido directo a WhatsApp", "Sin comisiones por venta"],
      },
      en: {
        kind: "Business website · Coffee shop",
        summary:
          "Landing for a coffee shop in Huixtla, Chiapas: full menu with options (flavor, size, toppings), a cart and an order that writes itself and goes straight to WhatsApp. No backend, no fees.",
        highlights: ["Menu with options and cart", "Orders straight to WhatsApp", "No per-sale fees"],
      },
    },
  },
  {
    slug: "fiadoma",
    name: "Fiadoma",
    repo: "https://github.com/jesus-imanol/fiadoma",
    stack: ["Flutter", "Supabase", "Clean Architecture", "Provider"],
    text: {
      es: {
        kind: "App móvil · Tiendas de barrio",
        summary:
          "App para que las tiendas lleven sus fiados sin libreta: clientes, deudas, abonos y movimientos, con inicio de sesión por negocio. Hecha en Flutter con Clean Architecture sobre Supabase.",
        highlights: ["Fiados y abonos por cliente", "Un negocio, varios usuarios", "Android, iOS y web"],
      },
      en: {
        kind: "Mobile app · Corner stores",
        summary:
          "An app for corner stores to track customer credit without a notebook: customers, debts, payments and history, with per-business login. Built with Flutter and Clean Architecture on Supabase.",
        highlights: ["Credit and payments per customer", "One business, many users", "Android, iOS and web"],
      },
    },
  },
];

export function liveProjectsFor(locale: Locale): LiveProject[] {
  return LIVE_BASE.map(({ text, ...p }) => ({ ...p, ...text[locale] }));
}
