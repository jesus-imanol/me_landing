"use client";

import { animate, createTimeline, onScroll, stagger } from "animejs";
import { AnimatePresence, motion } from "motion/react";
import { useRef } from "react";
import { useTilinViewModel } from "@/viewmodels/useTilinViewModel";
import { Cutout } from "@/views/components/Cutout";
import { useAnime } from "@/views/motion/useAnime";

const WORD = Array.from("TILÍN");

export function TilinSection() {
  const vm = useTilinViewModel();
  const bell = useRef<HTMLButtonElement>(null);

  // Las letras de TILÍN caen una por una al entrar y luego se quedan "respirando"
  const root = useAnime<HTMLElement>((_, el) => {
    const letters = el.querySelectorAll("[data-letter]");
    createTimeline({ autoplay: onScroll({ target: el, enter: "bottom-=15% top", repeat: false }) })
      .add(letters, {
        y: ["-120%", "0%"],
        rotate: () => [Math.random() * 40 - 20, 0],
        opacity: [0, 1],
        delay: stagger(80),
        duration: 1100,
        ease: "outElastic(1, .5)",
      })
      .add(letters, {
        y: [0, -14, 0],
        delay: stagger(120),
        duration: 1600,
        loop: true,
        ease: "inOutSine",
      });
  });

  const onRing = () => {
    vm.ring();
    if (bell.current && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      animate(bell.current, { rotate: [0, -18, 14, -10, 6, 0], scale: [1, 1.12, 1], duration: 700, ease: "outQuad" });
      animate(document.querySelectorAll("[data-letter]"), {
        scale: [1, 1.25, 1],
        color: ["#ff6b1a", "#1f140d"],
        delay: stagger(40),
        duration: 500,
      });
    }
  };

  return (
    <section id="tilin" ref={root} className="relative overflow-hidden bg-papel px-4 py-[clamp(4rem,9vw,8rem)] md:px-8">
      <div className="mx-auto grid max-w-[1400px] items-center gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)]">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-naranja">Mi palabra favorita</p>
          <h2 className="display mt-3 flex pt-[0.12em] text-[clamp(6rem,20vw,16rem)] leading-[0.86]" aria-label="Tilín">
            {WORD.map((l, i) => (
              <span key={i} data-letter aria-hidden className="inline-block will-change-transform">
                {l}
              </span>
            ))}
          </h2>

          <div
            className="mt-6 min-h-[4.5rem] max-w-xl"
            onPointerEnter={vm.pause}
            onPointerLeave={vm.resume}
            aria-live="polite"
          >
            <AnimatePresence mode="wait">
              <motion.p
                key={vm.phraseIndex}
                initial={{ y: 24, opacity: 0, rotate: -2 }}
                animate={{ y: 0, opacity: 1, rotate: 0 }}
                exit={{ y: -18, opacity: 0 }}
                transition={{ type: "spring", stiffness: 160, damping: 18 }}
                className="text-[clamp(1.4rem,3vw,2.2rem)] font-extrabold leading-tight"
              >
                {vm.phrase}
              </motion.p>
            </AnimatePresence>
          </div>

          <p className="mt-4 max-w-[52ch] text-humo">
            Se dice cuando algo sale bien. También cuando sale tan mal que da risa. En mi código casi siempre es lo
            primero.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              ref={bell}
              type="button"
              onClick={onRing}
              className="inline-flex min-h-14 items-center gap-3 rounded-full bg-tinta px-6 text-lg font-bold text-papel transition-transform active:translate-y-px"
            >
              <svg aria-hidden viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.94 1.94 0 0 0 3.4 0" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Hazle tilín
            </button>
            <AnimatePresence>
              {vm.reaction && (
                <motion.span
                  key={vm.rings}
                  initial={{ scale: 0.3, opacity: 0, x: -10 }}
                  animate={{ scale: 1, opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 15 }}
                  className="rounded-2xl bg-durazno px-4 py-2 font-bold text-brasa"
                  role="status"
                >
                  {vm.reaction}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>

        <motion.div
          className="relative mx-auto w-full max-w-[460px]"
          whileHover={{ rotate: -3, scale: 1.03 }}
          transition={{ type: "spring", stiffness: 120, damping: 12 }}
        >
          <div className="sun absolute inset-[8%] rounded-full opacity-70" />
          <Cutout art="tilin" className="fade-bottom relative" />
        </motion.div>
      </div>
    </section>
  );
}
