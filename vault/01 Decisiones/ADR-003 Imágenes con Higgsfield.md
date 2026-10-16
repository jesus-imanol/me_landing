---
tags: [adr, assets]
estado: aceptada
fecha: 2026-10-15
---
# ADR-003 Imágenes con Higgsfield

**Decisión:** todas las ilustraciones van **sin fondo** (`gpt_image_2_5`, `background: transparent`, calidad high), en el mismo estilo de caricatura aerografiada que el avatar original. Jesús siempre con **polo negra**.

Referencias para mantener el parecido: la selfie original y la primera caricatura (job `a391b7c8…`).

Proceso: PNG en `raw/` → `sharp` recorta los bordes transparentes (`trim`), redimensiona a 900px y exporta a WebP en `web/public/img`. Hoja de contacto: [[hoja-de-contacto.jpg]].

| Archivo | Uso |
|---|---|
| `jesus-flotando` | Hero, al centro, con los proyectos flotando alrededor |
| `jesus-tilin` | Sección TILÍN (cara sarcástica, finger-guns) |
| `jesus-blueprint` | "Cómo pienso", con el plano de arquitectura |
| `jesus-laptop` | Stack |
| `jesus-saludo` | Contacto |
| `conocemex`, `monii`, `cinesnacks`, `cilantro`, `lambi`, `secret-event` | Un objeto por proyecto |
| `avatar-github` | Foto de perfil: fondo naranja y polo negra (este sí lleva fondo, a propósito) |

Los bustos usan la clase `.fade-bottom` para que no terminen en un corte recto.

Las medidas y los textos `alt` viven en `src/models/art.model.ts`.
