"use client";

import { createContext, useContext, type ReactNode } from "react";
import { COPY } from "@/models/copy.model";
import { DEFAULT_LOCALE, type Locale } from "@/models/locale.model";

const LocaleContext = createContext<Locale>(DEFAULT_LOCALE);

export function LocaleProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>;
}

export const useLocale = () => useContext(LocaleContext);

/** Idioma actual + textos de la interfaz en ese idioma. */
export function useCopy() {
  const locale = useLocale();
  return { locale, t: COPY[locale] };
}
