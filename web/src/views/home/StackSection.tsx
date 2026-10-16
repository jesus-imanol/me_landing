"use client";

import { animate, onScroll, stagger } from "animejs";
import { CERTIFICATIONS, STACK } from "@/models/stack.model";
import { useCopy } from "@/viewmodels/LocaleProvider";
import { useAnime } from "@/views/motion/useAnime";

export function StackSection() {
  const { locale, t } = useCopy();
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
      <div className="grid grid-cols-1 gap-12 md:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)]">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-violeta">{t.stack.eyebrow}</p>
          <h2 className="display mt-3 text-[clamp(3rem,7vw,5.8rem)]">
            {t.stack.titleA} <span className="coqueto normal-case">{t.stack.titleB}</span>
          </h2>
          <p className="mt-4 max-w-[56ch] text-lg text-humo">{t.stack.body}</p>

          <div className="mt-10 flex flex-col gap-8">
            {STACK[locale].map((g) => (
              <div key={g.title} data-group>
                <h3 className="mb-3 text-xs font-extrabold uppercase tracking-[0.2em] text-humo">{g.title}</h3>
                <ul className="flex flex-wrap gap-2">
                  {g.items.map((it) => (
                    <li
                      key={it}
                      data-chip
                      className="cursor-default rounded-[4px] border-2 border-tinta bg-papel px-4 py-2 font-bold shadow-[4px_4px_0_var(--color-tinta)] transition-[background-color,box-shadow,color] hover:bg-lima hover:text-carbon hover:shadow-[4px_4px_0_var(--color-violeta)]"
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
          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-[0.2em] text-humo">{t.stack.certifications}</h3>
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
