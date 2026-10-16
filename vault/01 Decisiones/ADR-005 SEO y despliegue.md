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
- Logo: `web/public/logo.svg` ("J." en cuadro lima con borde, sombra violeta y una mordida en la esquina), hecho a mano en SVG. El componente `LogoMark` lo dibuja en header y footer. `app/icon.png` (512) y `app/apple-icon.png` (180) se generan desde ese SVG con sharp.
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

## Nombres con los que lo buscan (2026-10-16)
- Ya aparece en Google. Ahora quiere salir también por **"Chuy"**, **"Jesús Castillo"** y **"chuy7x"**.
- `PROFILE.aliases` en `models/profile.model.ts` alimenta `alternateName` del JSON-LD (Person). El título, la descripción y las keywords incluyen "Chuy".
- Texto **visible**: "Me dicen Chuy" en la tarjeta del hero y el nombre completo con apodo en el footer. Lo visible pesa más que los metadatos.

## Otros buscadores
- **Brave Search** tiene índice propio y **no tiene consola para enviar sitios**: rastrea solo y se guía por los enlaces que llegan al dominio. Lo que más ayuda es poner `https://www.chuy7x.space` en GitHub, LinkedIn, Instagram, dev.to, etc.
- **Bing Webmaster Tools** (alimenta Bing, DuckDuckGo, Yahoo, Ecosia y el buscador de ChatGPT): se puede importar el sitio directo desde Search Console. Si pide meta, va en `NEXT_PUBLIC_BING_SITE_VERIFICATION`.
- **IndexNow**: llave en `web/public/19ed98dad4de0daaf13c17f8c3b38a4a.txt`. Después de cada deploy: `npm --prefix web run indexnow`.
