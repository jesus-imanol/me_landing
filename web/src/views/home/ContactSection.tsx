"use client";

import { motion } from "motion/react";
import { useRef } from "react";
import { LINKEDIN_URL, SOCIALS } from "@/models/profile.model";
import { useCopy } from "@/viewmodels/LocaleProvider";
import { ChompHead } from "@/views/motion/ChompHead";
import { gsap, prefersReducedMotion, useGSAP } from "@/views/motion/gsap";

export function ContactSection() {
  const { t } = useCopy();
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      // El titular crece mientras llegas al final, como si Jesús levantara la voz
      gsap.fromTo(
        "[data-shout]",
        { scale: 0.82, letterSpacing: "-0.04em" },
        {
          scale: 1,
          letterSpacing: "0em",
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top bottom", end: "center center", scrub: true },
        },
      );
      gsap.from("[data-wave]", {
        y: 200,
        rotate: 14,
        duration: 1.4,
        ease: "elastic.out(1, 0.6)",
        scrollTrigger: { trigger: root.current, start: "top 70%" },
      });
    },
    { scope: root },
  );

  return (
    <section id="contacto" ref={root} className="relative overflow-hidden px-4 pt-[clamp(4rem,9vw,8rem)] md:px-8">
      <div className="mx-auto grid max-w-[1400px] items-end gap-8 md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <div className="pb-[clamp(3rem,8vw,7rem)]">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-violeta">{t.contact.eyebrow}</p>
          <h2 data-shout className="display mt-3 origin-left text-[clamp(3.6rem,9vw,8.5rem)]">
            {t.contact.titleA} <span className="text-violeta">{t.contact.titleB}</span>
          </h2>
          <p className="mt-6 max-w-[50ch] text-lg text-humo">{t.contact.body}</p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <motion.a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, rotate: -1.5 }}
              whileTap={{ scale: 0.95, y: 2 }}
              transition={{ type: "spring", stiffness: 400, damping: 16 }}
              className="inline-flex min-h-14 items-center rounded-full bg-violeta px-8 text-lg font-bold text-papel shadow-[0_14px_30px_-12px_rgb(91_71_240/0.7)]"
            >
              {t.contact.cta}
            </motion.a>
            <ul className="flex flex-wrap gap-4">
              {SOCIALS.filter((s) => s.href !== LINKEDIN_URL).map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-humo underline decoration-violeta decoration-2 underline-offset-4 hover:text-tinta"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div data-wave className="relative mx-auto w-[70%] max-w-[380px] pb-6">
          <div className="sun absolute inset-x-[5%] bottom-0 top-[10%] rounded-t-full opacity-70" />
          <ChompHead flip autoChew fps={9} alt={t.contact.headAlt} className="relative" />
        </div>
      </div>
    </section>
  );
}
