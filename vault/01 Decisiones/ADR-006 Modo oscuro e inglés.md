---
tags: [adr, i18n, tema]
estado: aceptada
fecha: 2026-10-16
---
# ADR-006 Modo oscuro e inglés

## Modo oscuro
- Los colores son los mismos tokens con otro valor bajo `:root[data-theme="dark"]` en `globals.css`. El lima no cambia.
- Tokens **fijos** que no cambian con el tema: `carbon` (#16132B), `hueso` (#FFF) y `lila`. Se usan para texto sobre lima (cinta, años, ticket, logo, LangSwitch) y para la sección de GitHub, que es oscura en los dos temas.
- `THEME_BOOT_SCRIPT` (`models/theme.model.ts`) corre inline en `<head>` antes de pintar: lee `localStorage` y, si no hay nada guardado, usa la preferencia del sistema. Es el patrón de la guía de Next "Preventing flash before hydration".
- `useThemeViewModel` lee y escribe `<html data-theme>`; `ThemeToggle` es el botón sol/luna del header.

## Inglés
- El español se queda en `/` (ya indexado) y el inglés en `/en`. Hay **dos layouts raíz**: `app/(es)/layout.tsx` y `app/en/layout.tsx`, para que cada página tenga su `html lang`. Los dos usan `RootDocument` y `HomePage`.
- Como no hay un layout raíz único, el 404 es `app/global-not-found.tsx` (`experimental.globalNotFound`).
- Textos de la interfaz en `models/copy.model.ts`. Los datos se traducen en su modelo: `projectsFor(locale)`, `PRINCIPLES[locale]`, `STACK[locale]`, `TILIN_PHRASES[locale]`, etc.
- `LocaleProvider` / `useCopy()` dan el idioma a las vistas de cliente; `GithubSection` (servidor) lo recibe por prop.
- SEO: `buildMetadata(locale)` arma canónica, **hreflang** (`es-MX`, `en`, `x-default` → `/`), `og:locale` y su alterno. El sitemap lista las dos URLs, cada una con sus hreflang.
- `LangSwitch` (botón ES/EN) es un enlace normal porque cambiar de layout raíz recarga la página.
