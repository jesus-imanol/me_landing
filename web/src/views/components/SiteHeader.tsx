"use client";

import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { useCopy } from "@/viewmodels/LocaleProvider";
import { useQuoteViewModel } from "@/viewmodels/useQuoteViewModel";
import { LangSwitch } from "./LangSwitch";
import { LogoMark } from "./LogoMark";
import { ThemeToggle } from "./ThemeToggle";

export function SiteHeader() {
  const { t } = useCopy();
  const quote = useQuoteViewModel();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);

  // Se esconde al bajar y regresa al subir: el contenido manda, el menú estorba lo menos posible
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 240);
    setSolid(y > 24);
  });

  return (
    <motion.header
      animate={{ y: hidden ? "-110%" : "0%" }}
      transition={{ type: "spring", stiffness: 260, damping: 30 }}
      className="fixed inset-x-0 top-0 z-50 px-4 pt-3 md:px-8"
    >
      <nav
        className={`mx-auto flex max-w-[1400px] items-center justify-between gap-3 rounded-full px-3 py-2 transition-[background-color,box-shadow] duration-300 md:px-6 ${
          solid ? "bg-papel/85 shadow-[0_10px_30px_-12px_rgb(58_43_184/0.25)] backdrop-blur-md" : "bg-transparent"
        }`}
        aria-label={t.nav.main}
      >
        <a href="#inicio" className="group flex items-center gap-2.5" aria-label={t.nav.home}>
          <LogoMark className="size-10 transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110" />
          <span className="display hidden text-2xl tracking-wide sm:inline">
            Jesús<span className="text-violeta">.</span>dev
          </span>
        </a>
        <ul className="hidden items-center gap-1 lg:flex">
          {t.nav.links.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="rounded-full px-4 py-2.5 text-sm font-semibold text-humo transition-colors hover:bg-niebla hover:text-tinta"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <LangSwitch />
          <motion.a
            href={quote.general}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96, y: 1 }}
            className="inline-flex min-h-11 items-center rounded-full bg-tinta px-5 text-sm font-bold text-papel"
          >
            {t.nav.talk}
          </motion.a>
        </div>
      </nav>
    </motion.header>
  );
}
