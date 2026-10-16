"use client";

import { useRef } from "react";
import { PRINCIPLES } from "@/models/principle.model";
import { gsap, prefersReducedMotion, useGSAP } from "@/views/motion/gsap";

export function PrinciplesSection() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      // Cada principio se "enciende" al pasar por el centro de la pantalla
      gsap.utils.toArray<HTMLElement>("[data-principle]").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0.25, y: 40 },
          {
            opacity: 1,
            y: 0,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 85%", end: "top 45%", scrub: true },
          },
        );
        gsap.from(el.querySelector("[data-aside]"), {
          scale: 0,
          rotate: -8,
          transformOrigin: "left center",
          duration: 0.7,
          ease: "back.out(2.5)",
          scrollTrigger: { trigger: el, start: "top 55%" },
        });
      });
    },
    { scope: root },
  );

  return (
    <section id="como-pienso" ref={root} className="bg-durazno/50 px-4 py-[clamp(4rem,9vw,8rem)] md:px-8">
      <div className="mx-auto grid max-w-[1400px] gap-12 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        <div className="md:sticky md:top-24 md:self-start">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-naranja">Cómo pienso el software</p>
          <h2 className="display mt-3 text-[clamp(3rem,7vw,5.8rem)]">
            Systems over <span className="coqueto normal-case">snippets</span>
          </h2>
        </div>

        <ol className="flex flex-col gap-14 md:pt-24">
          {PRINCIPLES.map((p, i) => (
            <li key={p.title} data-principle className="grid grid-cols-[auto_minmax(0,1fr)] gap-4 md:gap-5">
              <span className="display outline-text text-[clamp(3rem,8vw,6.5rem)] leading-none [-webkit-text-stroke-color:var(--color-mandarina)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-[clamp(1.5rem,2.6vw,2.1rem)] font-extrabold leading-tight tracking-tight">{p.title}</h3>
                <p className="mt-2 max-w-[52ch] text-lg text-humo">{p.body}</p>
                <p data-aside className="mt-4 inline-block rounded-2xl rounded-bl-sm bg-papel px-4 py-2 text-sm font-bold text-brasa shadow-sm">
                  {p.aside}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
