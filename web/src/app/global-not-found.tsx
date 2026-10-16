import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/models/seo.model";
import { THEME_BOOT_SCRIPT } from "@/models/theme.model";
import { anton, jakarta } from "@/views/fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "404 · Jesús Imanol",
  robots: { index: false, follow: true },
};

/** Con dos layouts raíz (es / en) no hay uno solo para armar el 404, así que este trae su propio <html>. */
export default function GlobalNotFound() {
  return (
    <html lang="es-MX" className={`${anton.variable} ${jakarta.variable} antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOT_SCRIPT }} />
      </head>
      <body className="grid min-h-dvh place-items-center px-4">
        <main className="text-center">
          <p className="display text-[clamp(7rem,30vw,16rem)] leading-none text-violeta">404</p>
          <p className="mt-4 text-2xl font-extrabold">Esta página se la comió el Pac-Man. Tilín.</p>
          <p className="mt-1 text-humo">Pac-Man ate this page. Tilín.</p>
          <div className="mt-8 flex justify-center gap-3">
            <Link href="/" className="inline-flex min-h-12 items-center rounded-full bg-violeta px-6 font-bold text-hueso">
              Volver al inicio
            </Link>
            <Link href="/en" className="inline-flex min-h-12 items-center rounded-full border-2 border-tinta px-6 font-bold">
              Go home
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
