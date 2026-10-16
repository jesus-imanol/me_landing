import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // La imagen Open Graph lee la fuente y los recortes desde assets/ en tiempo de ejecución
  outputFileTracingIncludes: { "/opengraph-image": ["./assets/**"] },
  cacheComponents: true,
  // Hay dos layouts raíz (español e inglés); el 404 global trae su propio <html>
  experimental: { globalNotFound: true },
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
