# me_landing

Portafolio de **Jesús Imanol Castillo** — dev full stack, versión caricatura dentuda.

## Estructura
- `web/` — Next.js 16 (App Router, TypeScript, Tailwind v4) con arquitectura **MVVM**:
  - `src/models` datos y tipos · `src/services` GitHub, SEO, frases · `src/viewmodels` hooks `use*ViewModel` · `src/views` componentes
- `vault/` — Vault de Obsidian: memoria del proyecto (ADR, diseño, base de conocimiento sobre Jesús).
- `.agents/skills` — Skills `taste-design` y `ui-ux-pro-max` (las mismas de carnitas-noyola).
- `raw/` — Originales PNG de Higgsfield (ignorados por git).

## Desarrollo
```bash
npm --prefix web install
npm run dev
```

## Animación
GSAP (scroll y timelines) · anime.js (letras y textos de "tilín") · Motion (parallax con el puntero y resortes en hover).
