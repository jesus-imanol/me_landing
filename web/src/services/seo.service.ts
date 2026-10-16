import type { Metadata } from "next";
import { HTML_LANG, LOCALE_PATH, LOCALES, OG_LOCALE, type Locale } from "@/models/locale.model";
import { PROFILE, PROFILE_TEXT, SOCIALS, X_HANDLE } from "@/models/profile.model";
import { liveProjectsFor } from "@/models/live.model";
import { projectsFor } from "@/models/project.model";
import { SITE_DESCRIPTION, SITE_KEYWORDS, SITE_NAME, SITE_TITLE, SITE_URL } from "@/models/seo.model";
import { STACK } from "@/models/stack.model";

const FULL_NAME = `${PROFILE.name} ${PROFILE.lastName}`;

/** Serializa JSON-LD escapando `<` para que ningún texto pueda cerrar la etiqueta <script>. */
export function jsonLdScript(data: object): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export const absoluteUrl = (locale: Locale) => `${SITE_URL}${LOCALE_PATH[locale] === "/" ? "" : LOCALE_PATH[locale]}`;

/** hreflang: cada idioma apunta al otro, y el español es el de por defecto. */
export function languageAlternates(): Record<string, string> {
  const map: Record<string, string> = Object.fromEntries(LOCALES.map((l) => [HTML_LANG[l], LOCALE_PATH[l]]));
  map["x-default"] = LOCALE_PATH.es;
  return map;
}

export function buildMetadata(locale: Locale): Metadata {
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: SITE_TITLE[locale], template: `%s · ${SITE_NAME}` },
    description: SITE_DESCRIPTION[locale],
    applicationName: SITE_NAME,
    keywords: SITE_KEYWORDS[locale],
    authors: [{ name: FULL_NAME, url: SITE_URL }],
    creator: FULL_NAME,
    publisher: FULL_NAME,
    category: "technology",
    alternates: { canonical: LOCALE_PATH[locale], languages: languageAlternates() },
    formatDetection: { telephone: false, address: false, email: false },
    // La imagen de redes la genera app/opengraph-image.tsx; Next la agrega sola a og:image y twitter:image
    openGraph: {
      type: "profile",
      locale: OG_LOCALE[locale],
      alternateLocale: LOCALES.filter((l) => l !== locale).map((l) => OG_LOCALE[l]),
      siteName: SITE_NAME,
      url: LOCALE_PATH[locale],
      title: SITE_TITLE[locale],
      description: SITE_DESCRIPTION[locale],
      firstName: PROFILE.name,
      lastName: PROFILE.lastName,
      username: PROFILE.handle,
    },
    twitter: {
      card: "summary_large_image",
      creator: X_HANDLE,
      site: X_HANDLE,
      title: SITE_TITLE[locale],
      description: SITE_DESCRIPTION[locale],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
    },
    // Google Search Console y Bing Webmaster Tools (Bing también alimenta a DuckDuckGo, Yahoo y Ecosia)
    verification: {
      ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } : {}),
      ...(process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
        ? { other: { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION } }
        : {}),
    },
    other: {
      "geo.region": "MX-CHP",
      "geo.placename": "Chiapas",
    },
  };
}

const PERSON_ID = `${SITE_URL}/#person`;
const WEBSITE_ID = `${SITE_URL}/#website`;

/** Person + WebSite + ProfilePage en un solo @graph: es lo que Google usa para el panel de persona. */
export function siteJsonLd(locale: Locale) {
  const url = absoluteUrl(locale);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": PERSON_ID,
        name: FULL_NAME,
        givenName: "Jesús",
        additionalName: "Imanol",
        familyName: PROFILE.lastName,
        alternateName: [...PROFILE.aliases],
        jobTitle: PROFILE_TEXT[locale].role,
        description: SITE_DESCRIPTION[locale],
        url: SITE_URL,
        image: `${SITE_URL}${PROFILE.avatar}`,
        address: { "@type": "PostalAddress", addressRegion: "Chiapas", addressCountry: "MX" },
        alumniOf: { "@type": "CollegeOrUniversity", name: "Universidad Politécnica de Chiapas" },
        knowsAbout: STACK[locale].flatMap((g) => g.items),
        knowsLanguage: ["es", "en"],
        sameAs: SOCIALS.map((s) => s.href),
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: SITE_URL,
        name: SITE_NAME,
        alternateName: ["Chuy", "Jesús Castillo", "chuy7x"],
        description: SITE_DESCRIPTION.es,
        inLanguage: LOCALES.map((l) => HTML_LANG[l]),
        publisher: { "@id": PERSON_ID },
      },
      {
        "@type": "ProfilePage",
        "@id": `${url}/#profile`,
        url,
        name: SITE_TITLE[locale],
        isPartOf: { "@id": WEBSITE_ID },
        mainEntity: { "@id": PERSON_ID },
        inLanguage: HTML_LANG[locale],
        hasPart: [
          ...liveProjectsFor(locale).map((p) => ({
            "@type": p.url ? "WebSite" : "SoftwareApplication",
            name: p.name,
            description: p.summary,
            url: p.url ?? p.repo,
            creator: { "@id": PERSON_ID },
            keywords: p.stack.join(", "),
            ...(p.shot ? { image: `${SITE_URL}${p.shot.desktop}` } : {}),
          })),
          ...projectsFor(locale).map((p) => ({
          "@type": "CreativeWork",
          name: p.name,
          description: p.summary,
          dateCreated: String(p.year),
          creator: { "@id": PERSON_ID },
          keywords: p.stack.join(", "),
          ...(p.href ? { url: p.href } : {}),
        })),
        ],
      },
    ],
  };
}
