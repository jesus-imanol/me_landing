"use client";

import { animate, stagger } from "animejs";
import { motion } from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import type { ArtKey } from "@/models/art.model";
import { PROFILE } from "@/models/profile.model";
import { useHeroViewModel } from "@/viewmodels/useHeroViewModel";
import { Cutout } from "@/views/components/Cutout";
import { gsap, prefersReducedMotion, useGSAP } from "@/views/motion/gsap";
import { useAnime } from "@/views/motion/useAnime";

/** Proyectos que flotan detrás de Jesús: posición dentro del escenario y tamaño relativo */
const ORBIT: { art: ArtKey; className: string }[] = [
  { art: "monii", className: "left-[0%] top-[6%] w-[26%]" },
  { art: "conocemex", className: "right-[0%] top-[18%] w-[28%]" },
  { art: "lambi", className: "left-[2%] bottom-[16%] w-[27%]" },
  { art: "cilantro", className: "right-[6%] bottom-[4%] w-[20%]" },
  { art: "cinesnacks", className: "left-[18%] top-[44%] w-[14%]" },
];

export function HeroSection() {
  const vm = useHeroViewModel();
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.from("[data-hero-line]", { yPercent: 110, duration: 1.1, stagger: 0.09 })
        .from("[data-hero-copy]", { y: 24, opacity: 0, duration: 0.8, stagger: 0.08 }, "-=0.7")
        .from("[data-hero-jesus]", { y: 220, rotate: -10, opacity: 0, duration: 1.6, ease: "elastic.out(1, 0.55)" }, 0.15)
        .from("[data-hero-orbit]", { scale: 0, rotate: -25, opacity: 0, duration: 1, stagger: 0.09, ease: "back.out(2.2)" }, 0.45)
        .from("[data-hero-sun]", { scale: 0.4, opacity: 0, duration: 1.4 }, 0);

      // Flotar perpetuo: cada pieza a su ritmo
      gsap.utils.toArray<HTMLElement>("[data-float]").forEach((el, i) => {
        gsap.to(el, {
          y: i === 0 ? -26 : gsap.utils.random(-22, -10),
          rotate: gsap.utils.random(-4, 4),
          duration: gsap.utils.random(2.2, 3.4),
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: i * 0.15,
        });
      });

      // Al bajar, el escenario sube un poco más lento que la página (profundidad)
      gsap.to("[data-hero-stage]", {
        yPercent: -10,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
    },
    { scope: root },
  );

  // Cada cambio de burbuja: las letras brincan con resorte (anime.js)
  const bubble = useAnime<HTMLSpanElement>(
    (_, el) => {
      animate(el.querySelectorAll("[data-ch]"), {
        y: [18, 0],
        scale: [0.4, 1],
        opacity: [0, 1],
        delay: stagger(28),
        duration: 650,
        ease: "outElastic(1, .6)",
      });
    },
    [vm.bubbleIndex],
  );

  return (
    <section
      id="inicio"
      ref={root}
      onPointerMove={vm.onPointerMove}
      onPointerLeave={vm.onPointerLeave}
      className="relative mx-auto grid min-h-[100dvh] max-w-[1400px] items-center gap-6 px-4 pb-16 pt-28 md:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] md:px-8"
    >
      <div className="relative z-10">
        <p data-hero-copy className="mb-6 inline-flex items-center gap-2 rounded-full bg-papel px-4 py-2 text-sm font-semibold text-humo shadow-sm">
          <span className="relative flex size-2.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-naranja opacity-60" />
            <span className="relative inline-flex size-2.5 rounded-full bg-naranja" />
          </span>
          Disponible para proyectos · Chiapas, MX
        </p>

        <h1 className="display text-[clamp(4.2rem,13vw,10.5rem)]">
          <span className="block overflow-hidden pb-1 pt-[0.14em]">
            <span data-hero-line className="flex items-center gap-[0.12em]">
              Jesús
              <Image
                src={PROFILE.avatar}
                width={160}
                height={160}
                alt=""
                aria-hidden
                priority
                className="inline-block size-[0.78em] rounded-full border-4 border-papel object-cover shadow-lg animate-wiggle"
              />
            </span>
          </span>
          <span className="block overflow-hidden pb-1 pt-[0.14em]">
            <span data-hero-line className="block text-naranja">
              Imanol
            </span>
          </span>
        </h1>

        <p data-hero-copy className="mt-6 max-w-xl text-[clamp(1.15rem,2vw,1.45rem)] font-medium leading-snug">
          Full stack que construye <span className="coqueto">con estructura</span> primero… y{" "}
          <span className="coqueto">con dientes</span> después.
        </p>
        <p data-hero-copy className="mt-3 max-w-[56ch] text-base leading-relaxed text-humo">
          {PROFILE.pitch}
        </p>

        <ul data-hero-copy className="mt-6 flex flex-wrap gap-2" aria-label="Industrias">
          {PROFILE.domains.map((d) => (
            <li key={d} className="rounded-full border border-linea bg-papel px-3 py-1 text-sm font-semibold">
              {d}
            </li>
          ))}
        </ul>

        <div data-hero-copy className="mt-8 flex flex-wrap items-center gap-5">
          <motion.a
            href="#proyectos"
            whileHover={{ scale: 1.04, rotate: -1 }}
            whileTap={{ scale: 0.96, y: 2 }}
            transition={{ type: "spring", stiffness: 400, damping: 18 }}
            className="inline-flex min-h-14 items-center gap-3 rounded-full bg-naranja px-7 text-lg font-bold text-papel shadow-[0_14px_30px_-12px_rgb(255_107_26/0.7)]"
          >
            Ver lo que he construido
            <svg aria-hidden viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth={2.4}>
              <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.a>
          <a href="https://github.com/jesus-imanol" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-humo underline decoration-naranja decoration-2 underline-offset-4 hover:text-tinta">
            github.com/jesus-imanol
          </a>
        </div>
      </div>

      <div data-hero-stage className="relative mx-auto aspect-[4/5] w-full max-w-[600px]" aria-label="Jesús flotando entre sus proyectos" role="img">
        <div data-hero-sun className="sun absolute left-1/2 top-1/2 aspect-square w-[82%] -translate-x-1/2 -translate-y-1/2 rounded-full" />

        <motion.div style={vm.layers.back} className="absolute inset-0">
          {ORBIT.map((o) => (
            <div key={o.art} className={`absolute ${o.className}`}>
              <div data-float>
                <div data-hero-orbit>
                  <Cutout art={o.art} decorative sizes="15vw" />
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        <motion.div style={vm.layers.mid} className="absolute inset-x-[22%] top-[4%]">
          <div data-float>
            <div data-hero-jesus>
              <Cutout art="flotando" priority sizes="(min-width: 768px) 30vw, 60vw" decorative />
            </div>
          </div>
        </motion.div>

        <motion.div style={vm.layers.front} className="absolute right-[2%] top-[2%] z-10">
          <span
            ref={bubble}
            key={vm.bubbleIndex}
            aria-live="polite"
            className="display relative block whitespace-nowrap rounded-[1.6rem] bg-papel px-5 py-3 text-[clamp(1.4rem,3vw,2.2rem)] text-tinta shadow-[0_18px_40px_-18px_rgb(194_65_12/0.45)] after:absolute after:-bottom-2.5 after:left-6 after:size-5 after:rotate-45 after:bg-papel"
          >
            {Array.from(vm.bubble).map((ch, i) => (
              <span key={i} data-ch className="inline-block whitespace-pre">
                {ch}
              </span>
            ))}
          </span>
        </motion.div>
      </div>
    </section>
  );
}
