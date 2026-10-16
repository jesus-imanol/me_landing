"use client";

import { animate } from "animejs";
import { AnimatePresence, motion } from "motion/react";
import { useRef } from "react";
import { useTilinViewModel } from "@/viewmodels/useTilinViewModel";
import { TextChomper } from "@/views/motion/TextChomper";

export function TilinSection() {
  const vm = useTilinViewModel();
  const bell = useRef<HTMLButtonElement>(null);

  const onRing = () => {
    vm.ring();
    if (bell.current && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      animate(bell.current, { rotate: [0, -18, 14, -10, 6, 0], scale: [1, 1.12, 1], duration: 700, ease: "outQuad" });
    }
  };

  return (
    <section id="tilin" className="relative overflow-x-clip bg-papel px-4 py-[clamp(4rem,9vw,8rem)] md:px-8">
      <div className="mx-auto max-w-[1400px]">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-naranja">Mi palabra favorita (y mi comida favorita)</p>
        <div className="mt-3">
          {/* Al bajar, Jesús se come TILÍN letra por letra; al subir, la devuelve */}
          <TextChomper
            as="h2"
            text="TILÍN"
            mode="scroll"
            headScale={1.25}
            className="display pt-[0.12em] text-[clamp(6rem,24vw,19rem)] leading-[0.86]"
          />
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] md:items-end">
          <div>
            <div className="min-h-[4.5rem] max-w-xl" onPointerEnter={vm.pause} onPointerLeave={vm.resume} aria-live="polite">
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

          <p className="max-w-[52ch] text-lg text-humo">
            Se dice cuando algo sale bien. También cuando sale tan mal que da risa. En mi código casi siempre es lo
            primero. Sube y baja la página: me la como y te la regreso.
          </p>
        </div>
      </div>
    </section>
  );
}
