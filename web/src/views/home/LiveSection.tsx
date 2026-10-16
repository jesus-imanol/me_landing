"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { useMemo, useRef } from "react";
import { liveProjectsFor, type LiveProject } from "@/models/live.model";
import { LINKEDIN_URL } from "@/models/profile.model";
import { useCopy } from "@/viewmodels/LocaleProvider";
import { gsap, prefersReducedMotion, useGSAP } from "@/views/motion/gsap";

const host = (url: string) => new URL(url).host;

export function LiveSection() {
  const { locale, t } = useCopy();
  const projects = useMemo(() => liveProjectsFor(locale), [locale]);
  const [featured, ...rest] = projects;
  const sites = rest.filter((p) => p.shot);
  const apps = rest.filter((p) => !p.shot);
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.utils.toArray<HTMLElement>("[data-live]").forEach((card) => {
        gsap.from(card, {
          y: 70,
          rotate: gsap.utils.random(-3, 3),
          opacity: 0,
          duration: 1,
          ease: "back.out(1.4)",
          scrollTrigger: { trigger: card, start: "top 85%" },
        });
        // El celular entra un poco después y desde abajo, como si lo pusieran sobre la compu
        const phone = card.querySelector("[data-phone]");
        if (phone)
          gsap.from(phone, {
            y: 90,
            rotate: 8,
            opacity: 0,
            duration: 1.1,
            ease: "back.out(1.8)",
            scrollTrigger: { trigger: card, start: "top 70%" },
          });
      });
    },
    { scope: root, dependencies: [locale] },
  );

  return (
    <section id="en-produccion" ref={root} className="mx-auto max-w-[1400px] px-4 py-[clamp(4rem,9vw,8rem)] md:px-8">
      <div className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-violeta">{t.live.eyebrow}</p>
        <h2 className="display mt-3 text-[clamp(3.2rem,8vw,6.5rem)]">
          {t.live.titleA} <span className="coqueto normal-case">{t.live.titleB}</span>
        </h2>
        <p className="mt-4 max-w-[60ch] text-lg text-humo">{t.live.body}</p>
      </div>

      <div className="mt-14 grid gap-10 md:grid-cols-6 md:gap-8">
        {featured && <SiteCard project={featured} wide className="md:col-span-6" />}
        {sites.map((p) => (
          <SiteCard key={p.slug} project={p} className="md:col-span-3" />
        ))}
        {apps.map((p) => (
          <AppCard key={p.slug} project={p} className="md:col-span-3" />
        ))}

        <motion.div
          data-live
          className="flex flex-col justify-between gap-6 rounded-md border-2 border-carbon bg-lima p-6 text-carbon shadow-[8px_8px_0_var(--color-violeta)] md:col-span-3 md:p-8"
        >
          <div>
            <p className="display text-[clamp(2.2rem,4vw,3.4rem)] leading-[0.9]">{t.live.ctaTitle}</p>
            <p className="mt-4 max-w-[46ch] font-medium">{t.live.ctaBody}</p>
          </div>
          <motion.a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04, rotate: -1 }}
            whileTap={{ scale: 0.96, y: 2 }}
            className="inline-flex min-h-14 w-fit items-center gap-3 rounded-full bg-carbon px-7 text-lg font-bold text-hueso"
          >
            {t.contact.cta}
            <Arrow />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

function SiteCard({ project: p, wide, className = "" }: { project: LiveProject; wide?: boolean; className?: string }) {
  const { t } = useCopy();
  return (
    <article data-live className={`group grid gap-6 ${wide ? "md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] md:items-center md:gap-10" : ""} ${className}`}>
      {/* Marco de navegador con la captura real + celular encima */}
      <a href={p.url} target="_blank" rel="noopener noreferrer" className="relative block pb-[8%] pr-[6%]" aria-label={`${t.live.visit}: ${p.name}`}>
        <div className="overflow-hidden rounded-md border-2 border-tinta bg-papel shadow-[8px_8px_0_var(--color-tinta)] transition-transform duration-500 group-hover:-translate-y-1 group-hover:-rotate-[0.6deg]">
          <div className="flex items-center gap-2 border-b-2 border-tinta bg-niebla px-3 py-2">
            <span className="size-2.5 rounded-full bg-[#ff5f57]" />
            <span className="size-2.5 rounded-full bg-[#febc2e]" />
            <span className="size-2.5 rounded-full bg-[#28c840]" />
            <span className="ml-2 truncate rounded-[4px] bg-papel px-2 py-0.5 font-mono text-xs text-humo">{p.url && host(p.url)}</span>
          </div>
          {p.shot && (
            <Image
              src={p.shot.desktop}
              width={1200}
              height={750}
              alt={`${p.name} — ${p.kind}`}
              sizes={wide ? "(min-width: 768px) 55vw, 92vw" : "(min-width: 768px) 45vw, 92vw"}
              className="h-auto w-full"
            />
          )}
        </div>
        {p.shot && (
          <div
            data-phone
            className="absolute bottom-0 right-0 w-[24%] overflow-hidden rounded-[1.1rem] border-[5px] border-carbon bg-carbon shadow-[6px_6px_0_var(--color-violeta)] transition-transform duration-500 group-hover:-translate-y-2 group-hover:rotate-3"
          >
            <Image src={p.shot.mobile} width={360} height={779} alt="" aria-hidden sizes="20vw" className="h-auto w-full rounded-[0.7rem]" />
          </div>
        )}
      </a>

      <ProjectInfo project={p} />
    </article>
  );
}

function AppCard({ project: p, className = "" }: { project: LiveProject; className?: string }) {
  return (
    <article data-live className={`group grid gap-6 ${className}`}>
      {/* Fiadoma no tiene sitio público: su marca, tal cual la usa la app */}
      <div className="grid aspect-[16/10] place-items-center rounded-md border-2 border-tinta bg-[#fff3e8] shadow-[8px_8px_0_var(--color-tinta)]">
        <div className="flex flex-col items-center gap-3 transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-2">
          <span className="grid size-24 place-items-center rounded-[30%] bg-[#ff6b1a] shadow-[0_12px_26px_rgb(255_107_26/0.38)]">
            <svg viewBox="0 0 24 24" aria-hidden className="size-12" fill="none" stroke="#fff" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9.5 4.5 4h15L21 9.5M3 9.5h18M3 9.5a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0M5 12.5V20h14v-7.5M10 20v-4.5h4V20" />
            </svg>
          </span>
          <span className="text-3xl font-extrabold tracking-tight text-[#1a1208]">{p.name.toLowerCase()}</span>
        </div>
      </div>
      <ProjectInfo project={p} />
    </article>
  );
}

function ProjectInfo({ project: p }: { project: LiveProject }) {
  const { t } = useCopy();
  return (
    <div>
      <p className="flex flex-wrap items-center gap-3 text-sm font-bold">
        <span className="inline-flex items-center gap-2 rounded-[4px] border-2 border-carbon bg-lima px-2.5 py-0.5 text-carbon">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-violeta opacity-70" />
            <span className="relative inline-flex size-2 rounded-full bg-violeta" />
          </span>
          {t.live.badge}
        </span>
        <span className="text-humo">{p.kind}</span>
      </p>
      <h3 className="display mt-3 text-[clamp(2.4rem,5vw,4rem)]">{p.name}</h3>
      <p className="mt-3 max-w-[58ch] leading-relaxed text-humo">{p.summary}</p>
      <ul className="mt-4 flex flex-col gap-1.5">
        {p.highlights.map((h) => (
          <li key={h} className="flex items-center gap-2 font-semibold">
            <span aria-hidden className="size-2 bg-violeta" />
            {h}
          </li>
        ))}
      </ul>
      <ul className="mt-5 flex flex-wrap gap-2">
        {p.stack.map((s) => (
          <li
            key={s}
            className="rounded-[4px] border-2 border-tinta bg-papel px-3 py-1 text-sm font-bold shadow-[3px_3px_0_var(--color-tinta)] transition-colors hover:bg-lima hover:text-carbon"
          >
            {s}
          </li>
        ))}
      </ul>
      <div className="mt-6 flex flex-wrap items-center gap-4">
        <a
          href={p.url ?? p.repo}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center gap-2 rounded-full bg-violeta px-5 font-bold text-hueso transition-transform active:translate-y-px"
        >
          {p.url ? t.live.visit : t.live.code}
          <Arrow />
        </a>
        <a
          href={LINKEDIN_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center font-bold text-tinta underline decoration-violeta decoration-2 underline-offset-4 hover:text-violeta"
        >
          {t.live.quote}
        </a>
      </div>
    </div>
  );
}

function Arrow() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth={2.4}>
      <path d="M7 17 17 7M8 7h9v9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
