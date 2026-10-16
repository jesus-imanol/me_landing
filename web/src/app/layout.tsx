import type { Metadata, Viewport } from "next";
import { Anton_SC, Plus_Jakarta_Sans } from "next/font/google";
import { PROFILE } from "@/models/profile.model";
import { SITE_DESCRIPTION, SITE_KEYWORDS, SITE_TITLE, SITE_URL } from "@/models/seo.model";
import { personJsonLd } from "@/services/seo.service";
import { JsonLd } from "@/views/components/JsonLd";
import { SiteFooter } from "@/views/components/SiteFooter";
import { SiteHeader } from "@/views/components/SiteHeader";
import "./globals.css";

const anton = Anton_SC({ variable: "--font-anton-sc", weight: "400", subsets: ["latin"] });
const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_TITLE, template: `%s · ${PROFILE.name}` },
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  authors: [{ name: `${PROFILE.name} ${PROFILE.lastName}`, url: SITE_URL }],
  creator: `${PROFILE.name} ${PROFILE.lastName}`,
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    locale: "es_MX",
    url: "/",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [{ url: PROFILE.avatar, width: 398, height: 520, alt: "Jesús Imanol de perfil" }],
  },
  twitter: { card: "summary", title: SITE_TITLE, description: SITE_DESCRIPTION, images: [PROFILE.avatar] },
};

export const viewport: Viewport = {
  themeColor: "#5b47f0",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-MX" className={`${anton.variable} ${jakarta.variable} antialiased`}>
      <body className="min-h-dvh overflow-x-clip">
        <JsonLd data={personJsonLd()} />
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
