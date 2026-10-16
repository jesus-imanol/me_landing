---
tags: [adr, arquitectura]
estado: aceptada
fecha: 2026-10-15
---
# ADR-001 Stack Next.js + MVVM

**Contexto:** Jesús pidió Next.js con arquitectura MVVM, igual que en carnitas-noyola.

**Decisión:**

| Capa | Carpeta | Responsabilidad |
|---|---|---|
| Model | `src/models` | Datos y tipos puros: perfil, proyectos, stack, principios, frases, arte. Sin React. |
| Service | `src/services` | GitHub API, SEO (JSON-LD), filtros y formato. Funciones puras. |
| ViewModel | `src/viewmodels` | Hooks `use*ViewModel` (cliente) y `get*ViewModel` (servidor) con estado y comandos. |
| View | `src/views` + `src/app` | Componentes de presentación y animación. Sin lógica de negocio. |

**Regla:** una View nunca importa de `services`; pasa por su ViewModel. Excepción aceptada: `app/layout.tsx` arma el JSON-LD, igual que en carnitas.

**Consecuencias:** la página es estática (prerender) y se revalida cada hora por los datos de GitHub. Cada sección animada es una isla de cliente.
