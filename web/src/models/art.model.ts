/** Ilustraciones de Higgsfield (PNG sin fondo → WebP recortado). Ver vault: ADR-003. */
export type Art = { src: string; width: number; height: number; alt: string };

export const ART = {
  conocemex: { src: "/img/conocemex.webp", width: 900, height: 900, alt: "Celular con mapa, pin naranja y pirámide" },
  monii: { src: "/img/monii.webp", width: 882, height: 855, alt: "Celular con código QR, monedas y café" },
  cinesnacks: { src: "/img/cinesnacks.webp", width: 584, height: 900, alt: "Dispensador de palomitas con tarjeta NFC" },
  cilantro: { src: "/img/cilantro.webp", width: 653, height: 900, alt: "Maceta de cilantro con sensor IoT" },
  lambi: { src: "/img/lambi.webp", width: 867, height: 900, alt: "Nube con servidor y cohete despegando" },
  secretEvent: { src: "/img/secret-event.webp", width: 900, height: 684, alt: "Cubos de blockchain con una máscara anónima" },
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
