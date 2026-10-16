"use client";

import { animate, onScroll, stagger } from "animejs";
import { motion } from "motion/react";
import { CERTIFICATIONS, STACK } from "@/models/stack.model";
import { Cutout } from "@/views/components/Cutout";
import { useAnime } from "@/views/motion/useAnime";

export function StackSection() {
  // Las fichas del stack caen en cascada por grupo (anime.js)
  const root = useAnime<HTMLElement>((_, el) => {
    el.querySelectorAll<HTMLElement>("[data-group]").forEach((group) => {
      animate(group.querySelectorAll("[data-chip]"), {
        y: [30, 0],
        scale: [0.6, 1],
        opacity: [0, 1],
        rotate: () => [Math.random() * 16 - 8, 0],
        delay: stagger(35),
        duration: 800,
        ease: "outElastic(1, .7)",
        autoplay: onScroll({ target: group, enter: "bottom-=10% top", repeat: false }),
      });
    });
  });

  return (
    <section id="stack" ref={root} className="mx-auto max-w-[1400px] px-4 py-[clamp(4rem,9vw,8rem)] md:px-8">
      <div className="grid gap-12 md:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)]">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-naranja">Con qué trabajo</p>
          <h2 className="display mt-3 text-[clamp(3rem,7vw,5.8rem)]">
            Mi <span className="coqueto normal-case">caja de herramientas</span>
          </h2>
          <p className="mt-4 max-w-[56ch] text-lg text-humo">
            Dos frentes: backend con Go, Node.js y Supabase; cliente con React, Next.js, Vue y Flutter. Los frameworks
            cambian; los fundamentos se quedan.
          </p>

          <div className="mt-10 flex flex-col gap-8">
            {STACK.map((g) => (
              <div key={g.title} data-group>
                <h3 className="mb-3 text-xs font-extrabold uppercase tracking-[0.2em] text-humo">{g.title}</h3>
                <ul className="flex flex-wrap gap-2">
                  {g.items.map((it) => (
                    <li
                      key={it}
                      data-chip
                      className="cursor-default rounded-full border border-linea bg-papel px-4 py-2 font-semibold transition-colors hover:border-naranja hover:bg-naranja hover:text-papel"
                    >
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-10 md:pt-20">
          <motion.div
            className="relative mx-auto w-[75%] max-w-[360px]"
            animate={{ y: [0, -18, 0], rotate: [0, 1.5, 0] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="sun absolute inset-[6%] rounded-full opacity-60" />
            <Cutout art="laptop" className="relative" />
          </motion.div>

          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-[0.2em] text-humo">Certificaciones</h3>
            <ul className="mt-3 divide-y divide-linea border-y border-linea">
              {CERTIFICATIONS.map((c) => (
                <li key={c} className="py-3 text-sm font-semibold">
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
