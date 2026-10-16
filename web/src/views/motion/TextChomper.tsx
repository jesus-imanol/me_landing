"use client";

import { animate } from "animejs";
import { useRef } from "react";
import { CHOMP } from "@/models/art.model";
import { ChompHead, type ChompHeadHandle } from "./ChompHead";
import { gsap, prefersReducedMotion, ScrollTrigger, useGSAP } from "./gsap";

type Props = {
  text: string;
  /** Clases del texto (tamaño, color, fuente) */
  className?: string;
  /** "loop": se lo come solo y vuelve a crecer · "scroll": avanza con el scroll y lo devuelve al subir */
  mode?: "loop" | "scroll";
  /** Alto de la cabeza en múltiplos del alto de la línea */
  headScale?: number;
  /** Píxeles por segundo en modo loop */
  speed?: number;
  /** Etiqueta del contenedor (p. ej. h2 cuando el texto es un título) */
  as?: "div" | "h2" | "p";
};

/**
 * La cabeza de Jesús recorre el texto real de la página y se come las letras como Pac-Man.
 * Las letras son HTML (se pueden seleccionar y leer); el lector de pantalla recibe el texto completo.
 */
export function TextChomper({ text, className = "", mode = "loop", headScale = 1.7, speed = 260, as: Tag = "div" }: Props) {
  const root = useRef<HTMLElement>(null);
  const head = useRef<ChompHeadHandle>(null);

  useGSAP(
    () => {
      const el = root.current;
      const headEl = head.current?.el;
      if (!el || !headEl) return;

      const line = el.querySelector<HTMLElement>("[data-line]")!;
      const letters = Array.from(el.querySelectorAll<HTMLElement>("[data-l]"));
      const crumbs = el.querySelector<HTMLElement>("[data-crumbs]")!;
      const eaten = new Set<HTMLElement>();

      // Cabeza dimensionada a la línea y con la boca a la altura del centro del texto
      const layout = () => {
        const lineH = line.offsetHeight;
        const h = lineH * headScale;
        const w = h * (CHOMP.width / CHOMP.height);
        gsap.set(headEl, { height: h, width: w, top: line.offsetTop + lineH * 0.52 - h * CHOMP.mouthY });
        return { w, end: line.offsetLeft + line.offsetWidth + 12 };
      };
      let { w, end } = layout();
      const start = () => line.offsetLeft - w * 1.05;

      if (prefersReducedMotion()) {
        gsap.set(headEl, { x: start() });
        return;
      }

      const spit = (l: HTMLElement) => {
        const color = getComputedStyle(l).color;
        const cx = l.offsetLeft + l.offsetWidth / 2;
        const cy = l.offsetTop + l.offsetHeight / 2;
        for (let i = 0; i < 4; i++) {
          const c = document.createElement("span");
          const size = 4 + Math.random() * 7;
          c.style.cssText = `position:absolute;left:${cx}px;top:${cy}px;width:${size}px;height:${size}px;border-radius:2px;background:${color};pointer-events:none`;
          crumbs.appendChild(c);
          animate(c, {
            x: (Math.random() - 0.2) * 70,
            y: [0, -30 - Math.random() * 30, 40 + Math.random() * 40],
            rotate: Math.random() * 360,
            opacity: [1, 0],
            duration: 700 + Math.random() * 300,
            ease: "outQuad",
            onComplete: () => c.remove(),
          });
        }
      };

      // Se come lo que quedó detrás de la boca; si la cabeza retrocede, las letras regresan
      const bite = () => {
        const mouth = (gsap.getProperty(headEl, "x") as number) + w * CHOMP.mouthX;
        for (const l of letters) {
          const center = l.offsetLeft + l.offsetWidth * 0.5;
          if (center < mouth && !eaten.has(l)) {
            eaten.add(l);
            if (l.textContent?.trim()) spit(l);
            animate(l, { scale: 0, rotate: -25, y: -8, opacity: 0, duration: 180, ease: "inQuad" });
          } else if (center >= mouth && eaten.has(l)) {
            eaten.delete(l);
            animate(l, { scale: [0, 1], rotate: 0, y: 0, opacity: 1, duration: 650, ease: "outElastic(1, .55)" });
          }
        }
      };

      gsap.set(headEl, { x: start() });

      if (mode === "loop") {
        head.current?.chew(true);
        const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.4 });
        tl.to(headEl, { x: end, duration: (end - start()) / speed, ease: "none", onUpdate: bite })
          .to(headEl, { opacity: 0, duration: 0.25 })
          .set(headEl, { x: start() })
          .add(() => bite())
          .to(headEl, { opacity: 1, duration: 0.25 });
        const onResize = () => ({ w, end } = layout());
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
      }

      let idle: number | undefined;
      ScrollTrigger.create({
        trigger: el,
        start: "top 85%",
        end: "top 15%",
        scrub: 0.4,
        onRefresh: () => ({ w, end } = layout()),
        onUpdate: (self) => {
          gsap.set(headEl, { x: gsap.utils.interpolate(start(), end, self.progress) });
          bite();
          head.current?.chew(true);
          window.clearTimeout(idle);
          idle = window.setTimeout(() => head.current?.chew(false), 160);
        },
      });
      return () => window.clearTimeout(idle);
    },
    { scope: root, dependencies: [text, mode] },
  );

  return (
    <Tag ref={root as React.RefObject<never>} className="relative block">
      <span className="sr-only">{text}</span>
      <span data-line aria-hidden className={`inline-block whitespace-nowrap ${className}`}>
        {Array.from(text).map((ch, i) => (
          <span key={i} data-l aria-hidden className="inline-block whitespace-pre will-change-transform">
            {ch}
          </span>
        ))}
      </span>
      <span data-crumbs aria-hidden className="pointer-events-none absolute inset-0 block overflow-visible" />
      <ChompHead ref={head} className="pointer-events-none !absolute left-0 top-0 z-10" />
    </Tag>
  );
}
