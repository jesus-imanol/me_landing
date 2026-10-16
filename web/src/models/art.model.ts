/** Ilustraciones de Higgsfield (PNG sin fondo → WebP recortado). Ver vault: ADR-003. */
export type Art = { src: string; width: number; height: number; alt: string };

export const ART = {
  flotando: { src: "/img/jesus-flotando.webp", width: 578, height: 900, alt: "Caricatura de Jesús flotando con los brazos abiertos" },
  laptop: { src: "/img/jesus-laptop.webp", width: 559, height: 900, alt: "Jesús flotando con su laptop" },
  tilin: { src: "/img/jesus-tilin.webp", width: 819, height: 900, alt: "Jesús con cara sarcástica apuntando con el dedo" },
  blueprint: { src: "/img/jesus-blueprint.webp", width: 800, height: 900, alt: "Jesús mostrando un plano de arquitectura" },
  saludo: { src: "/img/jesus-saludo.webp", width: 863, height: 900, alt: "Jesús riéndose y saludando con las dos manos" },
  conocemex: { src: "/img/conocemex.webp", width: 900, height: 900, alt: "Celular con mapa, pin naranja y pirámide" },
  monii: { src: "/img/monii.webp", width: 882, height: 855, alt: "Celular con código QR, monedas y café" },
  cinesnacks: { src: "/img/cinesnacks.webp", width: 584, height: 900, alt: "Dispensador de palomitas con tarjeta NFC" },
  cilantro: { src: "/img/cilantro.webp", width: 653, height: 900, alt: "Maceta de cilantro con sensor IoT" },
  lambi: { src: "/img/lambi.webp", width: 867, height: 900, alt: "Nube con servidor y cohete despegando" },
  secretEvent: { src: "/img/secret-event.webp", width: 900, height: 684, alt: "Cubos de blockchain con una máscara anónima" },
} satisfies Record<string, Art>;

export type ArtKey = keyof typeof ART;
