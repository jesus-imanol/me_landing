import type { MetadataRoute } from "next";
import { SITE_DESCRIPTION, SITE_NAME } from "@/models/seo.model";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} — Full Stack Developer`,
    short_name: "Jesús.dev",
    description: SITE_DESCRIPTION,
    lang: "es-MX",
    start_url: "/",
    display: "standalone",
    background_color: "#f5f3ff",
    theme_color: "#5b47f0",
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
