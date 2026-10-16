import Image from "next/image";
import { ART, type ArtKey } from "@/models/art.model";

type Props = {
  art: ArtKey;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Las piezas decorativas no se anuncian al lector de pantalla */
  decorative?: boolean;
};

/** Ilustración sin fondo con sombra que sigue la silueta. */
export function Cutout({ art, className = "", sizes = "(min-width: 768px) 40vw, 80vw", priority, decorative }: Props) {
  const a = ART[art];
  return (
    <Image
      src={a.src}
      width={a.width}
      height={a.height}
      alt={decorative ? "" : a.alt}
      aria-hidden={decorative || undefined}
      sizes={sizes}
      priority={priority}
      draggable={false}
      className={`cutout h-auto w-full ${className}`}
    />
  );
}
