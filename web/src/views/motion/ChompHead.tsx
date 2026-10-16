"use client";

import Image from "next/image";
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { CHOMP } from "@/models/art.model";

export type ChompHeadHandle = {
  /** Activa o pausa el ciclo de mordida */
  chew: (on: boolean) => void;
  el: HTMLSpanElement | null;
};

type Props = {
  className?: string;
  /** Mira a la izquierda en lugar de a la derecha */
  flip?: boolean;
  /** Mordidas por segundo × 6 cuadros */
  fps?: number;
  autoChew?: boolean;
  priority?: boolean;
  alt?: string;
};

// Ciclo tipo Pac-Man: cerrada → abre → bien abierta → cierra
const SEQUENCE = [0, 1, 2, 3, 2, 1];

/** Cabeza de Jesús en cuadros: se cambia el cuadro visible sin re-renderizar React. */
export const ChompHead = forwardRef<ChompHeadHandle, Props>(function ChompHead(
  { className = "", flip, fps = 14, autoChew = false, priority, alt = "" },
  ref,
) {
  const root = useRef<HTMLSpanElement>(null);
  const chewing = useRef(autoChew);

  useImperativeHandle(ref, () => ({
    chew: (on) => {
      chewing.current = on;
    },
    get el() {
      return root.current;
    },
  }));

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const frames = Array.from(el.querySelectorAll<HTMLElement>("[data-frame]"));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let step = 0;
    let last = 0;
    let raf = 0;

    const show = (i: number) => frames.forEach((f, k) => (f.style.opacity = k === i ? "1" : "0"));

    const loop = (t: number) => {
      raf = requestAnimationFrame(loop);
      if (t - last < 1000 / fps) return;
      last = t;
      if (chewing.current && !reduce) {
        step = (step + 1) % SEQUENCE.length;
        show(SEQUENCE[step]);
      } else if (step !== 0) {
        step = 0;
        show(0);
      }
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [fps]);

  return (
    <span
      ref={root}
      role={alt ? "img" : undefined}
      aria-label={alt || undefined}
      aria-hidden={alt ? undefined : true}
      className={`relative block aspect-[398/520] ${flip ? "-scale-x-100" : ""} ${className}`}
    >
      {CHOMP.frames.map((src, i) => (
        <Image
          key={src}
          data-frame
          src={src}
          width={CHOMP.width}
          height={CHOMP.height}
          alt=""
          priority={priority}
          draggable={false}
          sizes="(min-width: 768px) 30vw, 50vw"
          style={{ opacity: i === 0 ? 1 : 0 }}
          className="cutout absolute inset-0 h-full w-full select-none"
        />
      ))}
    </span>
  );
});
