"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { FRENTE } from "@/models/art.model";

type Step = [frame: number, ms: number];

// Ciclo en reposo: sonríe, enseña los dientes, guiña, y de vez en cuando se ríe
const IDLE: Step[] = [
  [0, 2000],
  [1, 1300],
  [3, 550],
  [1, 700],
  [0, 1600],
  [2, 160],
  [1, 110],
  [2, 160],
  [1, 110],
  [2, 220],
  [1, 1100],
];

// Al pasar el puntero (o tocar): carcajada y guiño
const LAUGH: Step[] = [
  [2, 140],
  [1, 90],
  [2, 140],
  [1, 90],
  [2, 140],
  [1, 90],
  [2, 260],
  [3, 700],
];

/** Jesús de frente cambiando de gesto. Cambia el cuadro visible sin re-renderizar React. */
export function FacePlayer({ className = "", priority }: { className?: string; priority?: boolean }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const frames = Array.from(el.querySelectorAll<HTMLElement>("[data-frame]"));
    const show = (i: number) => frames.forEach((f, k) => (f.style.opacity = k === i ? "1" : "0"));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let timer = 0;
    let script = IDLE;
    let step = 0;

    const play = () => {
      const [frame, ms] = script[step];
      show(frame);
      step++;
      if (step >= script.length) {
        script = IDLE;
        step = 0;
      }
      timer = window.setTimeout(play, ms);
    };

    const laugh = () => {
      window.clearTimeout(timer);
      script = LAUGH;
      step = 0;
      play();
    };

    play();
    el.addEventListener("pointerenter", laugh);
    el.addEventListener("click", laugh);
    return () => {
      window.clearTimeout(timer);
      el.removeEventListener("pointerenter", laugh);
      el.removeEventListener("click", laugh);
    };
  }, []);

  return (
    <div
      ref={root}
      role="img"
      aria-label="Jesús Imanol de frente, con los brazos cruzados, sonriendo y guiñando"
      className={`pointer-events-auto relative aspect-[720/882] ${className}`}
    >
      {FRENTE.frames.map((src, i) => (
        <Image
          key={src}
          data-frame
          src={src}
          width={FRENTE.width}
          height={FRENTE.height}
          alt=""
          priority={priority}
          draggable={false}
          sizes="(min-width: 768px) 42vw, 88vw"
          style={{ opacity: i === 0 ? 1 : 0 }}
          className="cutout fade-bottom absolute inset-0 h-full w-full select-none"
        />
      ))}
    </div>
  );
}
