"use client";

import { useRef } from "react";
import { MARQUEE_PHRASES } from "@/models/phrase.model";
import { gsap, prefersReducedMotion, ScrollTrigger, useGSAP } from "@/views/motion/gsap";

/** Cinta infinita de frases. El scroll la acelera y le cambia la dirección. */
export function Marquee() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const loop = gsap.to("[data-track]", { xPercent: -50, ease: "none", duration: 28, repeat: -1 });
      ScrollTrigger.create({
        trigger: root.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const dir = self.direction;
          gsap.to(loop, { timeScale: dir * (1 + Math.min(Math.abs(self.getVelocity()) / 600, 4)), duration: 0.3, overwrite: true });
          gsap.to(loop, { timeScale: dir, duration: 1.2, delay: 0.3, overwrite: false });
        },
      });
    },
    { scope: root },
  );

  const items = [...MARQUEE_PHRASES, ...MARQUEE_PHRASES];

  return (
    <div ref={root} className="relative -rotate-2 overflow-hidden bg-lima py-4 text-tinta" aria-hidden>
      <div data-track className="flex w-max gap-10 whitespace-nowrap">
        {items.map((p, i) => (
          <span key={i} className="display flex items-center gap-10 text-[clamp(2rem,5vw,3.6rem)]">
            {p}
            <svg viewBox="0 0 24 24" className="size-6 shrink-0 fill-violeta">
              <path d="M12 0l3 9h9l-7.5 5.5L19.5 24 12 18l-7.5 6 3-9.5L0 9h9z" />
            </svg>
          </span>
        ))}
      </div>
    </div>
  );
}
