---
tags: [adr, datos]
estado: aceptada
fecha: 2026-10-15
---
# ADR-004 Datos de GitHub en vivo

**Decisión:** la sección Open source muestra el número real de repos públicos y los últimos 6 repos con push, leídos de la API pública de GitHub.

- `services/github.service.ts` lleva `"use cache"` + `cacheLife("hours")`. Sin token, la API permite 60 llamadas por hora; con la caché sobra.
- Si GitHub falla, se devuelve un snapshot vacío y el bloque se oculta: nunca se inventan números (regla de taste-design).
- La fecha se formatea como "oct 2026" (determinista) en lugar de "hace 3 días", porque `Date.now()` no se puede usar dentro de un render cacheado.
