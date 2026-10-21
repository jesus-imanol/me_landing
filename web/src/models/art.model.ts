/**
 * Ilustraciones planas de los proyectos (mismo estilo que el personaje), generadas por Jesús con los prompts del vault.
 * El cuadriculado "transparente" venía pintado; se quita con raw/tools/remove-checker.mjs. Ver vault: Prompts de imágenes.
 */
export type Art = { src: string; width: number; height: number; alt: string };

export const ART = {
  conocemex: { src: "/img/conocemex-flat.webp", width: 412, height: 820, alt: "Celular con un mapa, un pin y una pirámide" },
  monii: { src: "/img/monii-flat.webp", width: 627, height: 773, alt: "Terminal de pago con código QR y monedas" },
  cinesnacks: { src: "/img/cinesnacks-flat.webp", width: 638, height: 780, alt: "Máquina de palomitas con lector de tarjeta sin contacto" },
  cilantro: { src: "/img/cilantro-flat.webp", width: 537, height: 814, alt: "Maceta con cilantro y un sensor IoT" },
  lambi: { src: "/img/lambi-flat.webp", width: 718, height: 615, alt: "Nube con un servidor y un cursor despegando" },
  secretEvent: { src: "/img/secret-event-flat.webp", width: 575, height: 642, alt: "Cubo con candado y una máscara anónima" },
  pxBug: { src: "/img/px-bug-flat.webp", width: 408, height: 480, alt: "Bicho pixelado" },
  pxCoin: { src: "/img/px-coin-flat.webp", width: 414, height: 480, alt: "Moneda pixelada con carita feliz" },
  pxCursor: { src: "/img/px-cursor-flat.webp", width: 334, height: 480, alt: "Cursor pixelado" },
  pxBrace: { src: "/img/px-brace-flat.webp", width: 232, height: 480, alt: "Llave de código pixelada" },
} satisfies Record<string, Art>;

export type ArtKey = keyof typeof ART;

/** Cuadros de la mordida (cabeza de perfil mirando a la derecha). La boca queda en ~93% x, ~60% y. */
export const CHOMP = {
  frames: ["/img/chomp-flat/0.webp", "/img/chomp-flat/1.webp", "/img/chomp-flat/2.webp", "/img/chomp-flat/3.webp"],
  width: 400,
  height: 509,
  mouthX: 0.93,
  mouthY: 0.6,
} as const;

/** Gestos de Jesús de frente: 0 sonrisa, 1 sonrisa abierta, 2 carcajada, 3 saludo con guiño (alineados abajo al centro). */
export const FRENTE = {
  frames: ["/img/frente-flat/0.webp", "/img/frente-flat/1.webp", "/img/frente-flat/2.webp", "/img/frente-flat/3.webp"],
  width: 760,
  height: 809,
} as const;
