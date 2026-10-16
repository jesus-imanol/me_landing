/** Renders 3D de Higgsfield (PNG sin fondo → WebP recortado). Ver vault: ADR-003. */
export type Art = { src: string; width: number; height: number; alt: string };

export const ART = {
  conocemex: { src: "/img/conocemex-3d.webp", width: 900, height: 687, alt: "Celular con mapa, pin pixelado y pirámide de cubos" },
  monii: { src: "/img/monii-3d.webp", width: 853, height: 877, alt: "Terminal de pago con código QR y monedas pixeladas" },
  cinesnacks: { src: "/img/cinesnacks-3d.webp", width: 691, height: 900, alt: "Máquina de palomitas con lector de tarjeta sin contacto" },
  cilantro: { src: "/img/cilantro-3d.webp", width: 563, height: 900, alt: "Maceta con cilantro pixelado y un sensor IoT" },
  lambi: { src: "/img/lambi-3d.webp", width: 787, height: 900, alt: "Nube con servidor y un cursor pixelado despegando" },
  secretEvent: { src: "/img/secret-event-3d.webp", width: 782, height: 871, alt: "Cubo con candado pixelado y una máscara anónima" },
  pxBug: { src: "/img/px-bug.webp", width: 480, height: 451, alt: "Bicho pixelado" },
  pxCoin: { src: "/img/px-coin.webp", width: 411, height: 480, alt: "Moneda pixelada con carita feliz" },
  pxCursor: { src: "/img/px-cursor.webp", width: 311, height: 480, alt: "Cursor pixelado" },
  pxBrace: { src: "/img/px-brace.webp", width: 210, height: 480, alt: "Llave de código pixelada" },
} satisfies Record<string, Art>;

export type ArtKey = keyof typeof ART;

/** Cuadros de la mordida (cabeza de perfil mirando a la derecha). La boca queda en ~95% x, ~64% y. */
export const CHOMP = {
  frames: ["/img/chomp/0.webp", "/img/chomp/1.webp", "/img/chomp/2.webp", "/img/chomp/3.webp"],
  width: 398,
  height: 520,
  mouthX: 0.95,
  mouthY: 0.64,
} as const;

/** Gestos de Jesús de frente: 0 sonrisa, 1 dientes, 2 carcajada, 3 guiño (alineados abajo al centro). */
export const FRENTE = {
  frames: ["/img/frente/0.webp", "/img/frente/1.webp", "/img/frente/2.webp", "/img/frente/3.webp"],
  width: 720,
  height: 882,
} as const;
