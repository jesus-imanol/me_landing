"use client";

import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { useRef } from "react";
import type { Project } from "@/models/project.model";
import { useCopy } from "@/viewmodels/LocaleProvider";
import { useProjectsViewModel } from "@/viewmodels/useProjectsViewModel";
import { Cutout } from "@/views/components/Cutout";
import { gsap, prefersReducedMotion, useGSAP } from "@/views/motion/gsap";

export function ProjectsSection() {
  const { locale, t } = useCopy();
  const vm = useProjectsViewModel(locale);
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.utils.toArray<HTMLElement>("[data-project]").forEach((row) => {
        const flip = row.dataset.side === "right" ? 1 : -1;
        const tl = gsap.timeline({ scrollTrigger: { trigger: row, start: "top 78%" } });
        tl.from(row.querySelector("[data-art]"), { xPercent: 30 * flip, rotate: 12 * flip, scale: 0.7, opacity: 0, duration: 1.2, ease: "back.out(1.6)" })
          .from(row.querySelectorAll("[data-copy]"), { y: 40, opacity: 0, duration: 0.8, stagger: 0.07, ease: "expo.out" }, "-=0.9");
        // El objeto se mueve un poco más rápido que la página mientras pasa
        gsap.to(row.querySelector("[data-art]"), {
          yPercent: -12,
          ease: "none",
          scrollTrigger: { trigger: row, start: "top bottom", end: "bottom top", scrub: true },
        });
      });
    },
    { scope: root, dependencies: [vm.area], revertOnUpdate: true },
  );

  return (
    <section id="proyectos" ref={root} className="mx-auto max-w-[1400px] px-4 py-[clamp(4rem,9vw,8rem)] md:px-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-violeta">{t.projects.eyebrow}</p>
          <h2 className="display mt-3 text-[clamp(3.2rem,8vw,6.5rem)]">
            {t.projects.titleA} <span className="coqueto normal-case">{t.projects.titleB}</span>
          </h2>
        </div>

        <LayoutGroup>
          <div role="tablist" aria-label={t.projects.filterLabel} className="flex flex-wrap gap-1 rounded-md border-2 border-tinta bg-papel p-1 shadow-[4px_4px_0_var(--color-tinta)]">
            {vm.filters.map((f) => {
              const active = vm.area === f.id;
              return (
                <button
                  key={f.id}
                  role="tab"
                  aria-selected={active}
                  onClick={() => vm.setArea(f.id)}
                  className={`relative min-h-11 rounded-[4px] px-4 text-sm font-bold transition-colors ${active ? "text-papel" : "text-humo hover:text-tinta"}`}
                >
                  {active && (
                    <motion.span
                      layoutId="area-pill"
                      className="absolute inset-0 rounded-[4px] bg-violeta"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative">{f.label}</span>
                </button>
              );
            })}
          </div>
        </LayoutGroup>
      </div>

      <div className="mt-16 flex flex-col gap-[clamp(4rem,10vw,8rem)]">
        {vm.featured.map((p, i) => (
          <ProjectRow key={p.slug} project={p} side={i % 2 === 0 ? "right" : "left"} liveLabel={t.projects.live} />
        ))}
      </div>

      <AnimatePresence>
        {vm.minor.length > 0 && (
          <motion.ul
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-20 divide-y divide-linea border-y border-linea"
          >
            {vm.minor.map((p) => (
              <li key={p.slug} className="grid gap-2 py-6 md:grid-cols-[6rem_1fr_1.4fr] md:items-baseline md:gap-8">
                <span className="font-bold text-violeta">{p.year}</span>
                <span className="display text-3xl">{p.name}</span>
                <span className="text-humo">
                  {p.summary} <em className="font-semibold not-italic text-tinta">{p.quip}</em>
                </span>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </section>
  );
}

function ProjectRow({ project: p, side, liveLabel }: { project: Project; side: "left" | "right"; liveLabel: string }) {
  return (
    <article data-project data-side={side} className="group grid items-center gap-8 md:grid-cols-2 md:gap-16">
      <div className={`relative ${side === "left" ? "md:order-2" : ""}`}>
        <div className="absolute inset-[10%] rounded-full bg-niebla transition-transform duration-700 group-hover:scale-110" />
        <motion.div
          data-art
          className="relative mx-auto w-[78%] max-w-[440px]"
          whileHover={{ rotate: side === "left" ? 4 : -4, scale: 1.05 }}
          transition={{ type: "spring", stiffness: 120, damping: 12 }}
        >
          {p.image && <Cutout art={p.image} sizes="(min-width: 768px) 35vw, 75vw" />}
        </motion.div>
        <span className="pointer-events-none absolute bottom-[6%] left-1/2 w-max max-w-[90%] -translate-x-1/2 translate-y-3 rounded-2xl bg-tinta px-4 py-2 text-sm font-bold text-papel opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          {p.quip}
        </span>
      </div>

      <div>
        <p data-copy className="flex flex-wrap items-center gap-3 text-sm font-bold">
          <span className="rounded-[4px] border-2 border-carbon bg-lima px-2.5 py-0.5 text-carbon shadow-[3px_3px_0_var(--color-violeta)]">{p.year}</span>
          <span className="text-humo">{p.role}</span>
        </p>
        <h3 data-copy className="display mt-4 text-[clamp(3rem,7vw,5.5rem)]">
          {p.name}
        </h3>
        {p.org && (
          <p data-copy className="mt-1 font-semibold text-indigo">
            {p.org}
          </p>
        )}
        <p data-copy className="mt-4 max-w-[58ch] text-lg leading-relaxed text-humo">
          {p.summary}
        </p>
        <ul data-copy className="mt-6 flex flex-wrap gap-2">
          {p.stack.map((s) => (
            <li key={s} className="rounded-[4px] border-2 border-tinta bg-papel px-3 py-1 text-sm font-bold shadow-[3px_3px_0_var(--color-tinta)] transition-colors hover:bg-lima hover:text-carbon">
              {s}
            </li>
          ))}
        </ul>
        {p.href && (
          <a
            data-copy
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex min-h-11 items-center gap-2 font-bold text-violeta underline decoration-2 underline-offset-4 hover:text-indigo"
          >
            {liveLabel}
            <svg aria-hidden viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth={2.4}>
              <path d="M7 17 17 7M8 7h9v9" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        )}
      </div>
    </article>
  );
}
