"use client";

import { useCallback } from "react";
import { quoteLink } from "@/services/whatsapp.service";
import { useLocale } from "./LocaleProvider";

/** Links de WhatsApp para cotizar, ya en el idioma de la página. */
export function useQuoteViewModel() {
  const locale = useLocale();
  const forProject = useCallback((name: string) => quoteLink(locale, name), [locale]);
  return { general: quoteLink(locale), forProject };
}
