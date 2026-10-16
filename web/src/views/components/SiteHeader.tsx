"use client";

import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { LINKEDIN_URL } from "@/models/profile.model";

const NAV = [
  { href: "#proyectos", label: "Proyectos" },
  { href: "#tilin", label: "Tilín" },
  { href: "#como-pienso", label: "Cómo pienso" },
  { href: "#stack", label: "Stack" },
];

export function SiteHeader() {
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
        className={`mx-auto flex max-w-[1400px] items-center justify-between rounded-full px-4 py-2 transition-[background-color,box-shadow] duration-300 md:px-6 ${
          solid ? "bg-papel/85 shadow-[0_10px_30px_-12px_rgb(194_65_12/0.25)] backdrop-blur-md" : "bg-transparent"
        }`}
        aria-label="Principal"
      >
        <a href="#inicio" className="display text-2xl tracking-wide" aria-label="Inicio">
          Jesús<span className="text-naranja">.</span>dev
        </a>
        <ul className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="rounded-full px-4 py-2.5 text-sm font-semibold text-humo transition-colors hover:bg-durazno hover:text-tinta"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <motion.a
          href={LINKEDIN_URL}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96, y: 1 }}
          className="inline-flex min-h-11 items-center rounded-full bg-tinta px-5 text-sm font-bold text-papel"
        >
          Hablemos
        </motion.a>
      </nav>
    </motion.header>
  );
}
