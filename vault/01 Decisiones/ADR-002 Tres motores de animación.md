---
tags: [adr, animación]
estado: aceptada
fecha: 2026-10-15
---
# ADR-002 GSAP + anime.js + Motion

**Contexto:** Jesús pidió usar las tres librerías. Usarlas todas para lo mismo daría un sitio inconsistente y pesado, así que cada una tiene su terreno.

| Librería | Para qué | Dónde |
|---|---|---|
| **GSAP** + ScrollTrigger | Timelines y todo lo ligado al scroll | Intro del hero, flotado perpetuo, marquee con velocidad, filas de proyectos, principios, contacto |
| **anime.js** v4 | Letras y textos con resorte | Burbuja del hero, letras de TILÍN, botón "Hazle tilín", fichas del stack |
| **Motion** | Interacción con puntero y estado de React | Parallax del hero, header que se esconde, píldora de filtros (`layoutId`), frases con `AnimatePresence`, hover con resorte |

**Reglas:**
- Solo `transform` y `opacity`.
- Todo respeta `prefers-reduced-motion` (`prefersReducedMotion()` en GSAP, `useAnime` no anima).
- No mezclar dos librerías sobre el mismo nodo: el parallax de Motion va en un wrapper, el flotado de GSAP en el hijo y la entrada en el nieto.
- Resorte por defecto: `stiffness 100, damping 20` (skill taste-design).
