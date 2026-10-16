import type { Locale, Localized } from "@/models/locale.model";
import { WHATSAPP_NUMBER } from "@/models/profile.model";

/** Mensajes que llegan ya escritos al WhatsApp de Jesús, según desde dónde le escriben. */
const MESSAGES: Localized<{ general: string; project: (name: string) => string }> = {
  es: {
    general: "Hola Chuy, vi tu portafolio y quiero cotizar un proyecto.",
    project: (name) => `Hola Chuy, vi tu proyecto ${name} y quiero cotizar algo así.`,
  },
  en: {
    general: "Hi Chuy, I saw your portfolio and I'd like a quote for a project.",
    project: (name) => `Hi Chuy, I saw your project ${name} and I'd like a quote for something similar.`,
  },
};

export function whatsappLink(text: string): string {
  // encodeURIComponent deja pasar el apóstrofo; se codifica aparte para que "I'd" no rompa el link
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text).replace(/'/g, "%27")}`;
}

/** Link de cotización: general o sobre un proyecto en particular. */
export function quoteLink(locale: Locale, projectName?: string): string {
  const m = MESSAGES[locale];
  return whatsappLink(projectName ? m.project(projectName) : m.general);
}
