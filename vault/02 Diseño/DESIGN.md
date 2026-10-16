---
tags: [diseño]
---
# Design System: Jesús Dev

Generado siguiendo la skill **taste-design** (Creatividad 9, Variance 8, Motion 8, Density 4).

## 1. Atmósfera
Alegre, cálido y un poco sarcástico. Mucho aire, layouts asimétricos y una caricatura que siempre se mueve. Como un estudio lleno de luz naranja donde el dev se ríe de sus propios bugs, pero su código está en orden.

## 2. Paleta
Ver [[Paleta]]. Un solo acento (naranja); el resto son cremas y una tinta café muy oscura (nunca negro puro).

## 3. Tipografía
Ver [[Tipografía]].

## 4. Componentes
- **Botones:** píldora, sin brillo neón. Al presionar bajan 1–2px. Primario naranja; el de "Hablemos" va en tinta.
- **Fichas (chips):** borde `linea`, fondo papel; al pasar el puntero se ponen naranjas.
- **Burbujas de diálogo:** papel, esquinas de 1.6rem, colita; para las frases sarcásticas.
- **Sin tarjetas de 3 columnas iguales:** los proyectos van en zig-zag de 2 columnas.

## 5. Layout
- Contenedor `max-w-[1400px]`, gutter de 16px en móvil.
- Hero partido (texto a la izquierda, escenario a la derecha): nunca centrado.
- Todo colapsa a una columna debajo de 768px. Los grids usan `minmax(0, …)` para que el texto gigante no aplaste las imágenes.
- Alturas completas con `min-h-[100dvh]`.

## 6. Movimiento
Ver [[ADR-002 Tres motores de animación]]. Siempre hay algo flotando (micro-loop perpetuo).

## 7. Prohibido
Emojis, Inter, negro puro, brillos neón, morado de IA, métricas inventadas, "Scroll to explore", flechas que rebotan, clichés como "Elevate" o "Seamless".

## Navegación sin "#" en la URL (2026-10-16)
- Los links del menú siguen siendo anclas (`href="#proyectos"`) para que funcionen sin JavaScript, pero `views/components/CleanAnchors.tsx` intercepta el clic, desplaza suave hasta la sección y deja la URL limpia (`www.chuy7x.space`).
- Si alguien entra con un link viejo (`/#proyectos`), lo lleva a la sección, quita el `#` y vuelve a apuntar mientras la página termina de cargar (deja de hacerlo si la persona hace scroll).
- `section[id] { scroll-margin-top: 5.5rem }` para que el título no quede debajo del header fijo.
- Test: `raw/tools/check-anchors.mjs`. Cada sección llega a 88 px del borde de arriba, con la URL sin `#`.
