"use client";

import { animate, onScroll, stagger } from "animejs";
import type { ReactNode } from "react";
import { useAnime } from "./useAnime";

/** Revela en cascada los hijos marcados con `data-reveal` cuando la sección entra en pantalla. */
export function Reveal({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useAnime<HTMLDivElement>((_, root) => {
    animate(root.querySelectorAll("[data-reveal]"), {
      opacity: [0, 1],
      y: [48, 0],
      duration: 900,
      delay: stagger(90),
      ease: "outExpo",
      autoplay: onScroll({ target: root, enter: "bottom-=10% top", repeat: false }),
    });
  });

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
