import type { Metadata } from "next";
import { buildMetadata } from "@/services/seo.service";
import { RootDocument, rootViewport } from "@/views/components/RootDocument";
import "../globals.css";

export const metadata: Metadata = buildMetadata("es");
export const viewport = rootViewport;

export default function SpanishLayout({ children }: { children: React.ReactNode }) {
  return <RootDocument locale="es">{children}</RootDocument>;
}
