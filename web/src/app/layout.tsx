import type { Metadata, Viewport } from "next";
import { Anton_SC, Plus_Jakarta_Sans } from "next/font/google";
import { PROFILE, X_HANDLE } from "@/models/profile.model";
import { SITE_DESCRIPTION, SITE_KEYWORDS, SITE_NAME, SITE_TITLE, SITE_URL } from "@/models/seo.model";
import { siteJsonLd } from "@/services/seo.service";
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

const FULL_NAME = `${PROFILE.name} ${PROFILE.lastName}`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_TITLE, template: `%s · ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: SITE_KEYWORDS,
  authors: [{ name: FULL_NAME, url: SITE_URL }],
  creator: FULL_NAME,
  publisher: FULL_NAME,
  category: "technology",
  alternates: { canonical: "/" },
  formatDetection: { telephone: false, address: false, email: false },
  // La imagen de redes la genera app/opengraph-image.tsx; Next la agrega sola a og:image y twitter:image
  openGraph: {
    type: "profile",
    locale: "es_MX",
    siteName: SITE_NAME,
    url: "/",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    firstName: PROFILE.name,
    lastName: PROFILE.lastName,
    username: PROFILE.handle,
  },
  twitter: {
    card: "summary_large_image",
    creator: X_HANDLE,
    site: X_HANDLE,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
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

export const viewport: Viewport = {
  themeColor: "#5b47f0",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-MX" className={`${anton.variable} ${jakarta.variable} antialiased`}>
      <body className="min-h-dvh overflow-x-clip">
        <JsonLd data={siteJsonLd()} />
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
