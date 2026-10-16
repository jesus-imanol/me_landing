import { PROFILE, SOCIALS } from "@/models/profile.model";
import { SITE_DESCRIPTION, SITE_URL } from "@/models/seo.model";
import { STACK } from "@/models/stack.model";

/** Serializa JSON-LD escapando `<` para que ningún texto pueda cerrar la etiqueta <script>. */
export function jsonLdScript(data: object): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: `${PROFILE.name} ${PROFILE.lastName}`,
    jobTitle: PROFILE.role,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    image: `${SITE_URL}${PROFILE.avatar}`,
    alumniOf: { "@type": "CollegeOrUniversity", name: "Universidad Politécnica de Chiapas" },
    knowsAbout: STACK.flatMap((g) => g.items).slice(0, 30),
    sameAs: SOCIALS.map((s) => s.href),
  };
}
