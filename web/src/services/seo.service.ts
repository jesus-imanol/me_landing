import { PROFILE, SOCIALS } from "@/models/profile.model";
import { PROJECTS } from "@/models/project.model";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from "@/models/seo.model";
import { STACK } from "@/models/stack.model";

/** Serializa JSON-LD escapando `<` para que ningún texto pueda cerrar la etiqueta <script>. */
export function jsonLdScript(data: object): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

const PERSON_ID = `${SITE_URL}/#person`;
const WEBSITE_ID = `${SITE_URL}/#website`;

/** Person + WebSite + ProfilePage en un solo @graph: es lo que Google usa para el panel de persona. */
export function siteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": PERSON_ID,
        name: `${PROFILE.name} ${PROFILE.lastName}`,
        givenName: PROFILE.name,
        familyName: PROFILE.lastName,
        alternateName: PROFILE.handle,
        jobTitle: PROFILE.role,
        description: SITE_DESCRIPTION,
        url: SITE_URL,
        image: `${SITE_URL}${PROFILE.avatar}`,
        address: { "@type": "PostalAddress", addressRegion: "Chiapas", addressCountry: "MX" },
        alumniOf: { "@type": "CollegeOrUniversity", name: "Universidad Politécnica de Chiapas" },
        knowsAbout: STACK.flatMap((g) => g.items),
        knowsLanguage: ["es", "en"],
        sameAs: SOCIALS.map((s) => s.href),
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: SITE_URL,
        name: SITE_NAME,
        description: SITE_DESCRIPTION,
        inLanguage: "es-MX",
        publisher: { "@id": PERSON_ID },
      },
      {
        "@type": "ProfilePage",
        "@id": `${SITE_URL}/#profile`,
        url: SITE_URL,
        name: SITE_TITLE,
        isPartOf: { "@id": WEBSITE_ID },
        mainEntity: { "@id": PERSON_ID },
        inLanguage: "es-MX",
        hasPart: PROJECTS.map((p) => ({
          "@type": "CreativeWork",
          name: p.name,
          description: p.summary,
          dateCreated: String(p.year),
          creator: { "@id": PERSON_ID },
          keywords: p.stack.join(", "),
          ...(p.href ? { url: p.href } : {}),
        })),
      },
    ],
  };
}
