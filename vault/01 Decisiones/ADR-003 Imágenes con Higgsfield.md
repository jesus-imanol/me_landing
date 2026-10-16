---
tags: [adr, assets]
estado: aceptada (revisada)
fecha: 2026-10-15
---
# ADR-003 Imágenes con Higgsfield

## v2: cabeza Pac-Man que se come el texto (vigente)
**Feedback de Jesús:** las caricaturas aerografiadas se veían genéricas y "muy IA". Las letras 3D generadas tenían contornos de IA. Quería **comerse el texto real de la página**, como Pac-Man, y que se jugara con los dientes.

**Decisión:**
- Una sola hoja de 4 cuadros (2×2) generada en una sola imagen para que la cara sea idéntica en todos: cabeza **fotorrealista**, de perfil mirando a la derecha, con dientes de castor exagerados. Boca: cerrada, entreabierta, media y bien abierta. Sin fondo y sin letras en la imagen.
- `sharp` corta los cuadrantes, recorta lo transparente y los alinea por la esquina superior izquierda. Salen en `web/public/img/chomp/0..3.webp` (398×520).
- Las letras son **HTML real** (`TextChomper`): la cabeza avanza con GSAP y cada letra que queda detrás de la boca se encoge con anime.js y suelta migajas de su mismo color.
  - `mode="loop"`: hero, "bugs · espagueti · deadlines"; se lo come y vuelve a crecer.
  - `mode="scroll"`: sección TILÍN; al bajar se come la palabra y al subir la devuelve.
- `ChompHead` cambia de cuadro sin re-render de React (secuencia 0-1-2-3-2-1).

Hoja original: `raw/chomp/sheet-b.png` (job `de66ef23…`). La alternativa A (`c660c7d3…`) quedó en `raw/chomp/sheet-a.png`.

## Hero: Jesús de frente, animado (vigente)
Jesús pidió estar de frente, delante de "JESÚS IMANOL" en gigante, y animado.
- Hoja 2×2 de gestos con la misma pose (brazos cruzados, polo negra): 0 sonrisa, 1 dientes de castor, 2 carcajada, 3 guiño. Job `d7e94cc7…`, original en `raw/frente/sheet-2.png`.
- Recortados y alineados abajo al centro sin reescalar: `web/public/img/frente/0..3.webp` (720×882).
- `FacePlayer` reproduce un guion en bucle (sonríe, enseña dientes, guiña y a veces se ríe); al pasar el puntero o tocarlo suelta una carcajada. GSAP le agrega una respiración leve.
- La píldora "Disponible" se cambió por una etiqueta rectangular tipo ticket (lima, borde tinta, sombra dura) junto a su hombro. Lo que dice va en una tarjeta tinta/lima, también rectangular.

## Objetos de proyectos: renders 3D estilo "tech toy" (vigente)
Referencia de Jesús: renders 3D mate con piezas pixeladas (cursor, monedas, cubo), morado con lima.
- Prompt base: plástico mate y arcilla, bordes redondeados, piezas voxel/pixel-art, luz de estudio suave. Paleta estricta #5B47F0, lavanda, blanco roto, carbón y lima #D7F23A. Sin texto, sin logos, sin fondo.
- Proyectos: `*-3d.webp` (el sufijo rompe la caché de imágenes de Next con respecto a la tanda anterior).
- Piezas sueltas `px-bug`, `px-coin`, `px-cursor`, `px-brace`: flotan alrededor de la cabeza en el hero (el bicho queda frente a la boca) y en "Cómo pienso".
- Originales en `raw/v3/`.

## v1: caricaturas (descartada)
Jesús flotando, con laptop, con plano, saludando, sarcástico y el avatar de GitHub. Se quitaron del sitio. Siguen en `raw/` y en `04 Assets/`.

> [!done] Resuelto
> Los objetos de los proyectos ya se rehicieron en estilo 3D (ver arriba).
