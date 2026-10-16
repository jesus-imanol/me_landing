---
tags: [adr, seo, deploy]
estado: aceptada
fecha: 2026-10-15
---
# ADR-005 SEO y despliegue en Vercel

Mismo patrón que carnitas-noyola (ADR-008 de ese vault).

**SEO**
- Dominio en `models/seo.model.ts` → `SITE_URL`: usa `NEXT_PUBLIC_SITE_URL`; si no existe, en Vercel cae a `VERCEL_PROJECT_PRODUCTION_URL`.
- Metadatos globales en `app/layout.tsx`: título "Jesús Imanol Castillo — Desarrollador Full Stack en Chiapas", descripción, keywords, canónica, Open Graph tipo `profile` (nombre, apellido, usuario), Twitter `summary_large_image`, `robots`/`googleBot` con vista previa grande, geo Chiapas y verificación de Search Console.
- `robots.txt` (`app/robots.ts`), `sitemap.xml` (`app/sitemap.ts`, incluye las imágenes) y `manifest.webmanifest` (`app/manifest.ts`).
- Imagen para redes `app/opengraph-image.tsx` (1200×630): nombre gigante en Anton SC, ticket lima y Jesús en ilustración plana. Lee `web/assets/` (fuente y PNGs); por eso `next.config.ts` tiene `outputFileTracingIncludes`.
- Íconos `app/icon.png` (512, esquinas redondeadas) y `app/apple-icon.png` (180): cabeza de perfil sobre lima.
- JSON-LD en un solo `@graph`: `Person` + `WebSite` + `ProfilePage` con cada proyecto como `CreativeWork`.

**Despliegue:** Vercel, con Root Directory `web`.

| Variable | Valor |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | dominio final, p. ej. `https://jesusimanol.dev` (sin `/` al final) |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | código de Search Console |

**Después de desplegar**
1. Google Search Console → agregar la propiedad con el dominio → verificar con la etiqueta HTML (poner el código en la variable y redeployar).
2. Enviar `https://<dominio>/sitemap.xml`.
3. Probar la vista previa en https://www.opengraph.xyz o compartiendo el link en WhatsApp/LinkedIn.
4. Probar los datos estructurados en https://search.google.com/test/rich-results.
5. Poner el dominio en el perfil de GitHub y LinkedIn (los backlinks ayudan a que Google asocie el nombre).
