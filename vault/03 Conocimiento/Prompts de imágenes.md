---
tags: [assets, prompts]
fecha: 2026-10-21
---
# Prompts para las imágenes de proyectos (estilo plano)

Las imágenes de "Proyectos" eran renders 3D y no combinaban con el personaje en ilustración plana. Estos prompts las rehacen en el mismo estilo 2D.

## Cómo generarlas en Higgsfield
- **Modelo:** GPT Image 2.5 · **Calidad:** high · **Resolución:** 1K · **Formato:** 1:1 · **Fondo:** transparente.
- **Referencia de estilo (importante):** sube `raw/flat/frente.png` (la hoja de Jesús en ilustración plana) en cada generación. Es lo que hace que el trazo, la sombra violeta y los colores salgan iguales.
- Costo aprox.: 1.5 créditos por imagen → 10 imágenes ≈ 15 créditos.
- Guárdalas como PNG con estos nombres y pásaselas a Claude: `conocemex.png`, `monii.png`, `cinesnacks.png`, `cilantro.png`, `lambi.png`, `secret-event.png`, `px-bug.png`, `px-coin.png`, `px-cursor.png`, `px-brace.png`.

## Bloque de estilo (va al final de cada prompt)
```
Style: FLAT VECTOR ILLUSTRATION matching the reference image exactly — same clean flat color fills, same crisp uniform dark charcoal outlines (#16132B), one flat violet shadow tone (#5B47F0) on the shadow side, no gradients, no 3D render, no glossy plastic, no texture, no realistic lighting. Limited palette: violet #5B47F0, lavender #B9AFFF, pale lilac #E6E1FF, white, charcoal #16132B and one neon lime accent #D7F23A. Single isolated object, centered, generous padding, fully transparent background. No text, no letters, no logos, no brands.
```

## Proyectos
1. **conocemex.png**
```
A chunky smartphone standing slightly tilted, its screen shows a simple flat map with light roads, a lime park block and a big violet location pin with a lime dot in the center, and a small stepped Mayan pyramid made of three flat blocks next to the pin. [BLOQUE DE ESTILO]
```
2. **monii.png**
```
A handheld card payment terminal in charcoal, its screen shows a QR code, a rounded lime tap-to-pay button with contactless waves, a small lavender keypad, and two lime coins floating to its right. [BLOQUE DE ESTILO]
```
3. **cinesnacks.png**
```
A cute retro snack vending machine in violet, a glass window with four striped popcorn boxes, a lime contactless card reader on the side and a white card tapping it, a dispenser slot at the bottom. [BLOQUE DE ESTILO]
```
4. **cilantro.png**
```
A lavender plant pot with a fresh cilantro plant with lime leaves, and a small charcoal IoT sensor chip on a stick in the soil showing a lime wave line, with two violet wifi arcs above it. [BLOQUE DE ESTILO]
```
5. **lambi.png**
```
A puffy white cloud with a small charcoal server rack inside it (three violet drawers with lime lights), and a big white arrow mouse cursor launching upward out of the cloud like a rocket with a small lime flame. [BLOQUE DE ESTILO]
```
6. **secret-event.png**
```
An isometric cube made of white, lavender and violet faces with a small padlock icon on one face and a lime block popping out of the top, and a plain white anonymous theater mask leaning against the cube. [BLOQUE DE ESTILO]
```

## Piezas sueltas (flotan alrededor del personaje)
7. **px-bug.png**
```
A small pixel-art style bug made of square pixels, violet body with white pixel eyes. [BLOQUE DE ESTILO]
```
8. **px-coin.png**
```
A round pixel-art style coin with stepped pixel edges in lavender, with a simple charcoal pixel smiley face. [BLOQUE DE ESTILO]
```
9. **px-cursor.png**
```
A pixel-art style arrow mouse cursor made of square pixels, white fill with a lavender side. [BLOQUE DE ESTILO]
```
10. **px-brace.png**
```
A pixel-art style curly brace code symbol { made of square pixels, lime fill. [BLOQUE DE ESTILO]
```

## Si algo no sale bien
- **Sale en 3D o con brillo:** agrega al inicio `2D flat vector illustration, NOT 3D, NOT a render.`
- **No respeta el fondo transparente:** agrega `isolated sticker on a transparent background, no background color`.
- **Los colores no combinan:** repite la paleta y vuelve a subir la referencia.

Bocetos SVG hechos a mano como respaldo: `raw/flat-svg/` (no se usan en el sitio).

## Resultado (2026-10-21)
- Jesús generó las 10 con estos prompts y las dejó en `web/assets/`. Originales respaldados en `raw/flat-v4/`.
- **El fondo "transparente" venía pintado** (cuadriculado gris dentro de la imagen, todas opacas). Se quitó con `raw/tools/remove-checker.mjs`, que rellena desde las orillas los píxeles gris/blanco sin color y se detiene en el contorno oscuro, así que conserva los blancos de adentro (máscara, nube, cursor). Limpias en `raw/flat-v4/limpias/`.
- En el sitio: `web/public/img/*-flat.webp` (reemplazan a los `*-3d.webp`). También se regeneraron `web/assets/og-bug.png` y `og-coin.png` para la imagen de redes.
- `ProjectsSection` limita cada ilustración a 400 px de alto según su proporción, para que las altas (ConoceMex) no crezcan de más.
