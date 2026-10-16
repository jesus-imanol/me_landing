import type { Viewport } from "next";
import type { ReactNode } from "react";
import { HTML_LANG, type Locale } from "@/models/locale.model";
import { THEME_BOOT_SCRIPT } from "@/models/theme.model";
import { siteJsonLd } from "@/services/seo.service";
import { LocaleProvider } from "@/viewmodels/LocaleProvider";
import { anton, jakarta } from "@/views/fonts";
import { CleanAnchors } from "./CleanAnchors";
import { JsonLd } from "./JsonLd";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

export const rootViewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#5b47f0" },
    { media: "(prefers-color-scheme: dark)", color: "#0e0c1d" },
  ],
  colorScheme: "light dark",
};

/** <html> compartido por los dos idiomas: cada layout raíz solo le pasa su idioma. */
export function RootDocument({ locale, children }: { locale: Locale; children: ReactNode }) {
  return (
    // El script de arranque pone data-theme antes de hidratar; por eso se ignora la diferencia en <html>
    <html lang={HTML_LANG[locale]} className={`${anton.variable} ${jakarta.variable} antialiased`} suppressHydrationWarning>
      {/* eslint-disable-next-line @next/next/no-head-element -- App Router: patrón de la guía "Preventing flash before hydration" */}
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOT_SCRIPT }} />
      </head>
      <body className="min-h-dvh overflow-x-clip">
        <JsonLd data={siteJsonLd(locale)} />
        <CleanAnchors />
        <LocaleProvider locale={locale}>
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </LocaleProvider>
      </body>
    </html>
  );
}
