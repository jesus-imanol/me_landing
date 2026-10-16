import type { Metadata } from "next";
import { buildMetadata } from "@/services/seo.service";
import { RootDocument, rootViewport } from "@/views/components/RootDocument";
import "../globals.css";

export const metadata: Metadata = buildMetadata("en");
export const viewport = rootViewport;

export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  return <RootDocument locale="en">{children}</RootDocument>;
}
