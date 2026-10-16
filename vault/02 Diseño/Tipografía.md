---
tags: [diseño, tipografía]
---
# Tipografía

| Uso | Fuente | Notas |
|---|---|---|
| Display | **Anton SC** | Mayúsculas, interlineado 0.88. Clase `.display`. Los contenedores con `overflow-hidden` llevan `pt-[0.14em]` para no cortar los acentos (JESÚS, TILÍN). |
| Texto | **Plus Jakarta Sans** | Peso 500–800, máximo ~56 caracteres por línea. |
| Acento coqueto | Plus Jakarta Sans itálica 800 en naranja | Clase `.coqueto`: "con estructura", "con dientes", "snippets"… |

Se cargan con `next/font/google` en `app/layout.tsx` (`--font-anton-sc`, `--font-jakarta`).
