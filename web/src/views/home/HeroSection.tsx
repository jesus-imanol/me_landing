"use client";

import { animate, stagger } from "animejs";
import { motion } from "motion/react";
import { useRef } from "react";
import { CHOMP_STRIP, CHOMP_STRIP_SHORT } from "@/models/phrase.model";
import { PROFILE } from "@/models/profile.model";
import { useHeroViewModel } from "@/viewmodels/useHeroViewModel";
import { ChompHead } from "@/views/motion/ChompHead";
import { gsap, prefersReducedMotion, useGSAP } from "@/views/motion/gsap";
import { TextChomper } from "@/views/motion/TextChomper";
import { useAnime } from "@/views/motion/useAnime";

export function HeroSection() {
  const vm = useHeroViewModel();
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.from("[data-hero-line]", { yPercent: 110, duration: 1.1, stagger: 0.09 })
        .from("[data-hero-copy]", { y: 24, opacity: 0, duration: 0.8, stagger: 0.08 }, "-=0.7")
        .from("[data-hero-head]", { x: 260, rotate: 14, opacity: 0, duration: 1.5, ease: "elastic.out(1, 0.6)" }, 0.2)
        .from("[data-hero-sun]", { scale: 0.4, opacity: 0, duration: 1.4 }, 0);

      // La cabeza flota y cabecea un poco mientras mastica
      gsap.to("[data-float]", { y: -18, rotate: -3, duration: 2.6, ease: "sine.inOut", yoyo: true, repeat: -1 });

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
      className="relative flex min-h-[100dvh] flex-col justify-center overflow-x-clip pb-12 pt-28"
    >
      <div className="mx-auto grid w-full max-w-[1400px] items-center gap-6 px-4 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:px-8">
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
              <span data-hero-line className="block">
                Jesús
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
            <a
              href="https://github.com/jesus-imanol"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-humo underline decoration-naranja decoration-2 underline-offset-4 hover:text-tinta"
            >
              github.com/jesus-imanol
            </a>
          </div>
        </div>

        <div data-hero-stage className="relative mx-auto aspect-square w-full max-w-[520px]">
          <div data-hero-sun className="sun absolute inset-[8%] rounded-full" />
          <motion.div style={vm.layers.mid} className="absolute inset-x-[16%] bottom-[2%] top-[6%]">
            <div data-float className="h-full">
              <div data-hero-head className="mx-auto h-full w-fit">
                {/* Mira hacia el nombre, mascando */}
                <ChompHead flip autoChew fps={7} priority alt="Jesús de perfil, mostrando los dientes" className="h-full" />
              </div>
            </div>
          </motion.div>
          <motion.div style={vm.layers.front} className="absolute left-[0%] top-[4%] z-10">
            <span
              ref={bubble}
              key={vm.bubbleIndex}
              aria-live="polite"
              className="display relative block whitespace-nowrap rounded-[1.6rem] bg-papel px-5 py-3 text-[clamp(1.4rem,3vw,2.2rem)] text-tinta shadow-[0_18px_40px_-18px_rgb(194_65_12/0.45)] after:absolute after:-bottom-2.5 after:right-8 after:size-5 after:rotate-45 after:bg-papel"
            >
              {Array.from(vm.bubble).map((ch, i) => (
                <span key={i} data-ch className="inline-block whitespace-pre">
                  {ch}
                </span>
              ))}
            </span>
          </motion.div>
        </div>
      </div>

      {/* Pac-Man: se come las malas prácticas, que vuelven a salir (siempre vuelven) */}
      <div data-hero-copy className="mx-auto mt-24 w-full max-w-[1400px] px-4 md:mt-28 md:px-8">
        <div className="hidden md:block">
          <TextChomper text={CHOMP_STRIP} headScale={2.4} speed={320} className="display text-[clamp(3rem,7.4vw,8rem)] text-brasa" />
        </div>
        <div className="md:hidden">
          <TextChomper text={CHOMP_STRIP_SHORT} headScale={2.2} speed={170} className="display text-[clamp(2.4rem,12vw,4rem)] text-brasa" />
        </div>
      </div>
    </section>
  );
}
