"use client";

import { animate, stagger } from "animejs";
import { motion } from "motion/react";
import { useRef } from "react";
import type { ArtKey } from "@/models/art.model";
import { CHOMP_STRIP } from "@/models/phrase.model";
import { PROFILE_TEXT } from "@/models/profile.model";
import { useCopy } from "@/viewmodels/LocaleProvider";
import { useHeroViewModel } from "@/viewmodels/useHeroViewModel";
import { Cutout } from "@/views/components/Cutout";
import { FacePlayer } from "@/views/motion/FacePlayer";
import { gsap, prefersReducedMotion, useGSAP } from "@/views/motion/gsap";
import { TextChomper } from "@/views/motion/TextChomper";
import { useAnime } from "@/views/motion/useAnime";

/** Piezas pixeladas alrededor de Jesús */
const PIXELS: { art: ArtKey; className: string }[] = [
  { art: "pxBug", className: "left-[6%] top-[58%] w-[9%] md:left-[22%] md:w-[6%]" },
  { art: "pxCoin", className: "right-[4%] top-[30%] w-[11%] md:right-[20%] md:w-[6%]" },
  { art: "pxCursor", className: "right-[10%] bottom-[8%] w-[7%] md:right-[26%] md:w-[4%]" },
  { art: "pxBrace", className: "left-[14%] bottom-[12%] w-[5%] md:left-[30%] md:w-[3%]" },
];

export function HeroSection() {
  const { locale, t } = useCopy();
  const vm = useHeroViewModel(locale);
  const strip = CHOMP_STRIP[locale];
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      // Las letras caen una por una y rebotan; Jesús sube con un estirón y se asienta
      tl.from("[data-letter]", { yPercent: -160, rotate: () => gsap.utils.random(-30, 30), opacity: 0, duration: 1.1, stagger: 0.05, ease: "bounce.out" })
        .from("[data-hero-photo]", { yPercent: 50, scaleY: 0.82, scaleX: 1.08, opacity: 0, duration: 1.3, ease: "elastic.out(1, 0.55)", transformOrigin: "50% 100%" }, 0.35)
        .from("[data-hero-tag]", { y: -120, rotate: 25, opacity: 0, duration: 1.2, ease: "elastic.out(1, 0.6)" }, 0.8)
        .from("[data-hero-copy]", { y: 24, opacity: 0, duration: 0.8, stagger: 0.08 }, 0.7)
        .from("[data-px]", { scale: 0, rotate: -40, duration: 0.9, stagger: 0.1, ease: "back.out(2.4)" }, 0.9);

      gsap.utils.toArray<HTMLElement>("[data-px]").forEach((el, i) => {
        gsap.to(el.parentElement, {
          y: gsap.utils.random(-24, -10),
          rotate: gsap.utils.random(-12, 12),
          duration: gsap.utils.random(1.8, 3),
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: i * 0.2,
        });
      });

      // Cada tanto el nombre hace "la ola"
      gsap.to("[data-letter]", {
        keyframes: { y: [0, -28, 0], scaleY: [1, 1.08, 1] },
        duration: 0.7,
        ease: "sine.inOut",
        stagger: { each: 0.06 },
        repeat: -1,
        repeatDelay: 3.2,
        delay: 2.4,
      });

      // Respira: un leve vaivén que lo hace sentir vivo entre gesto y gesto
      gsap.to("[data-breathe]", { scaleY: 1.012, y: -4, rotate: 0.6, duration: 2.4, ease: "sine.inOut", yoyo: true, repeat: -1 });

      // Al bajar: el nombre se aleja más lento que Jesús (profundidad)
      gsap.to("[data-hero-name]", {
        yPercent: 18,
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
    <section id="inicio" ref={root} onPointerMove={vm.onPointerMove} onPointerLeave={vm.onPointerLeave} className="relative overflow-x-clip">
      <div className="relative mx-auto min-h-[100dvh] max-w-[1600px] pt-24">
        {/* Nombre gigante, detrás */}
        <motion.h1 style={vm.layers.back} className="relative z-0 px-2 text-center">
          <span data-hero-name className="display block text-[clamp(5.5rem,23vw,24rem)] leading-[0.8]">
            <span className="sr-only">{t.hero.srName}</span>
            {["Jesús", "Imanol"].map((word, w) => (
              <span key={word} aria-hidden className={`block pt-[0.12em] ${w === 1 ? "text-violeta" : ""}`}>
                {Array.from(word).map((ch, i) => (
                  <span key={i} data-letter className="inline-block origin-bottom will-change-transform">
                    {ch}
                  </span>
                ))}
              </span>
            ))}
          </span>
        </motion.h1>

        {/* Jesús de frente, encima del nombre */}
        <div className="pointer-events-none relative z-10 -mt-[30vw] flex justify-center md:absolute md:inset-x-0 md:bottom-0 md:mt-0">
          <motion.div style={vm.layers.mid} className="relative w-[min(88vw,560px)] md:w-[min(42vw,620px)]">
            <div data-hero-photo>
              <div data-breathe className="origin-bottom">
                <FacePlayer priority />
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div style={vm.layers.front} aria-hidden className="pointer-events-none absolute inset-0 z-20">
          {PIXELS.map((p) => (
            <div key={p.art} className={`absolute ${p.className}`}>
              <div data-px>
                <Cutout art={p.art} decorative sizes="10vw" />
              </div>
            </div>
          ))}
        </motion.div>

        {/* Lo que dice: tarjeta rectangular junto a su cabeza */}
        <motion.div style={vm.layers.front} className="absolute left-[3%] top-[36%] z-30 md:left-[18%] md:top-[44%]">
          <span
            ref={bubble}
            key={vm.bubbleIndex}
            aria-live="polite"
            className="display relative block whitespace-nowrap rounded-md bg-carbon px-4 py-2 text-[clamp(1.1rem,2.2vw,1.9rem)] text-lima shadow-[6px_6px_0_var(--color-violeta)] after:absolute after:-right-2 after:top-1/2 after:size-4 after:-translate-y-1/2 after:rotate-45 after:bg-carbon"
          >
            {Array.from(vm.bubble).map((ch, i) => (
              <span key={i} data-ch className="inline-block whitespace-pre">
                {ch}
              </span>
            ))}
          </span>
        </motion.div>

        {/* Etiqueta de disponibilidad: rectángulo tipo ticket, del otro lado */}
        <div data-hero-tag className="absolute right-[3%] top-[44%] z-30 origin-right -rotate-6 scale-[0.8] md:right-[14%] md:top-[50%] md:rotate-3 md:scale-100">
          <div className="border-2 border-carbon bg-lima px-4 py-3 text-carbon shadow-[6px_6px_0_var(--color-violeta)]">
            <p className="flex items-center gap-2 text-[0.7rem] font-extrabold uppercase tracking-[0.18em]">
              <span className="size-2.5 animate-pulse bg-violeta" />
              {t.hero.tagAvailable}
            </p>
            <p className="display mt-1 text-[clamp(1.2rem,2vw,1.7rem)] leading-none">{t.hero.tagForProjects}</p>
            <p className="mt-1 border-t-2 border-dashed border-carbon/40 pt-1 text-[0.7rem] font-bold uppercase tracking-[0.14em] text-carbon/70">
              Chiapas, MX · 2026
            </p>
          </div>
        </div>

        {/* Texto y CTA en los costados, abajo */}
        <div className="relative z-30 mx-auto grid max-w-[1400px] grid-cols-1 gap-6 px-4 -mt-10 pb-10 pt-0 md:absolute md:inset-x-0 md:bottom-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:items-end md:px-8 md:pt-0">
          <div className="md:max-w-[21rem] md:rounded-md md:border-2 md:border-tinta md:bg-papel md:p-4 md:shadow-[6px_6px_0_var(--color-violeta)]">
            <p data-hero-copy className="text-[clamp(1.15rem,1.6vw,1.4rem)] font-semibold leading-snug">
              {t.hero.taglineA}
              <span className="coqueto">{t.hero.taglineStrong1}</span>
              {t.hero.taglineB}
              <span className="coqueto">{t.hero.taglineStrong2}</span>
              {t.hero.taglineC}
            </p>
            <p data-hero-copy className="mt-3 text-sm leading-relaxed text-humo">
              {t.hero.nicknameA} <strong className="font-bold text-tinta">Chuy</strong> · {PROFILE_TEXT[locale].school}
            </p>
          </div>
          <div data-hero-copy className="flex flex-col items-start gap-3 md:items-end">
            <motion.a
              href="#proyectos"
              whileHover={{ scale: 1.04, rotate: -1 }}
              whileTap={{ scale: 0.96, y: 2 }}
              transition={{ type: "spring", stiffness: 400, damping: 18 }}
              className="pointer-events-auto inline-flex min-h-14 items-center gap-3 rounded-full bg-violeta px-7 text-lg font-bold text-papel shadow-[0_14px_30px_-12px_rgb(91_71_240/0.7)]"
            >
              {t.hero.cta}
              <svg aria-hidden viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth={2.4}>
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.a>
            <a
              href="https://github.com/jesus-imanol"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-humo underline decoration-violeta decoration-2 underline-offset-4 hover:text-tinta"
            >
              github.com/jesus-imanol
            </a>
          </div>
        </div>
      </div>

      {/* Pac-Man: se come las malas prácticas, que vuelven a salir (siempre vuelven) */}
      <div className="mx-auto mt-20 w-full max-w-[1400px] px-4 md:mt-24 md:px-8">
        <div className="hidden md:block">
          <TextChomper text={strip.long} headScale={2.4} speed={320} className="display text-[clamp(3rem,7.4vw,8rem)] text-indigo" />
        </div>
        <div className="md:hidden">
          <TextChomper text={strip.short} headScale={2.2} speed={170} className="display text-[clamp(2.4rem,12vw,4rem)] text-indigo" />
        </div>
      </div>
    </section>
  );
}
