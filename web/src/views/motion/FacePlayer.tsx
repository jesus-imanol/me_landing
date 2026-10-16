"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { FRENTE } from "@/models/art.model";
import { useCopy } from "@/viewmodels/LocaleProvider";

type Step = [frame: number, ms: number];

// Frames: 0 sonrisa · 1 sonrisa abierta · 2 carcajada · 3 saludo con guiño
// Entrada: saluda dos veces
const HELLO: Step[] = [
  [3, 520],
  [1, 160],
  [3, 520],
  [1, 900],
];

// Ciclo en reposo: sonríe, se ríe de vez en cuando y vuelve a saludar
const IDLE: Step[] = [
  [0, 1800],
  [1, 1200],
  [2, 170],
  [1, 120],
  [2, 170],
  [1, 120],
  [2, 260],
  [1, 1000],
  [0, 1600],
  [3, 700],
  [1, 900],
];

// Al pasar el puntero (o tocar): carcajada y saludo
const LAUGH: Step[] = [
  [2, 140],
  [1, 90],
  [2, 140],
  [1, 90],
  [2, 260],
  [3, 650],
  [1, 400],
];

/** Jesús de frente cambiando de gesto. Cambia el cuadro visible sin re-renderizar React. */
export function FacePlayer({ className = "", priority }: { className?: string; priority?: boolean }) {
  const { t } = useCopy();
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const frames = Array.from(el.querySelectorAll<HTMLElement>("[data-frame]"));
    let current = 0;
    const show = (i: number) => {
      frames.forEach((f, k) => (f.style.opacity = k === i ? "1" : "0"));
      // Cada cambio de gesto lleva su rebote: el saludo se balancea y la risa se aplasta un poco
      if (i !== current && i === 3) el.animate([{ rotate: "0deg" }, { rotate: "-3deg" }, { rotate: "2deg" }, { rotate: "0deg" }], { duration: 520, easing: "ease-in-out" });
      if (i !== current && i === 2) el.animate([{ scale: "1 1" }, { scale: "1.03 0.97" }, { scale: "0.99 1.02" }, { scale: "1 1" }], { duration: 300, easing: "ease-out" });
      current = i;
    };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let timer = 0;
    let script = HELLO;
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
      aria-label={t.face.alt}
      style={{ aspectRatio: `${FRENTE.width} / ${FRENTE.height}` }}
      className={`pointer-events-auto relative origin-bottom ${className}`}
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
