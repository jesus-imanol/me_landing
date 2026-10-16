"use client";

import { motion } from "motion/react";
import { useRef } from "react";
import { PRINCIPLES } from "@/models/principle.model";
import { useCopy } from "@/viewmodels/LocaleProvider";
import { Cutout } from "@/views/components/Cutout";
import { gsap, prefersReducedMotion, useGSAP } from "@/views/motion/gsap";

export function PrinciplesSection() {
  const { locale, t } = useCopy();
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
    <section id="como-pienso" ref={root} className="bg-niebla/50 px-4 py-[clamp(4rem,9vw,8rem)] md:px-8">
      <div className="mx-auto grid max-w-[1400px] gap-12 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        <div className="md:sticky md:top-24 md:self-start">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-violeta">{t.principles.eyebrow}</p>
          <h2 className="display mt-3 text-[clamp(3rem,7vw,5.8rem)]">
            {t.principles.titleA} <span className="coqueto normal-case">{t.principles.titleB}</span>
          </h2>
          <div aria-hidden className="relative mt-10 hidden h-64 md:block">
            <motion.div
              className="absolute left-[8%] top-0 w-28"
              animate={{ y: [0, -16, 0], rotate: [-8, 4, -8] }}
              transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Cutout art="pxCursor" decorative sizes="8rem" />
            </motion.div>
            <motion.div
              className="absolute left-[42%] top-[30%] w-36"
              animate={{ y: [0, 14, 0], rotate: [6, -6, 6] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Cutout art="pxCoin" decorative sizes="10rem" />
            </motion.div>
          </div>
        </div>

        <ol className="flex flex-col gap-14 md:pt-24">
          {PRINCIPLES[locale].map((p, i) => (
            <li key={p.title} data-principle className="grid grid-cols-[auto_minmax(0,1fr)] gap-4 md:gap-5">
              <span className="display outline-text text-[clamp(3rem,8vw,6.5rem)] leading-none [-webkit-text-stroke-color:var(--color-lavanda)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-[clamp(1.5rem,2.6vw,2.1rem)] font-extrabold leading-tight tracking-tight">{p.title}</h3>
                <p className="mt-2 max-w-[52ch] text-lg text-humo">{p.body}</p>
                <p data-aside className="mt-4 inline-block rounded-2xl rounded-bl-sm bg-papel px-4 py-2 text-sm font-bold text-indigo shadow-sm">
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
