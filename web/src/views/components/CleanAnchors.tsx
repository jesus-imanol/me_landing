"use client";

import { useEffect } from "react";

const prefersReduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Quita el "#seccion" de la barra de direcciones sin recargar ni mover la página. */
function stripHash() {
  if (window.location.hash) history.replaceState(history.state, "", window.location.pathname + window.location.search);
}

function scrollToSection(id: string, smooth: boolean) {
  const target = document.getElementById(id);
  if (!target) return false;
  target.scrollIntoView({ behavior: smooth && !prefersReduced() ? "smooth" : "auto", block: "start" });
  // Para teclado y lectores de pantalla: el foco se mueve a la sección a la que se saltó
  if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
  target.focus({ preventScroll: true });
  return true;
}

/**
 * Los links del menú (#proyectos, #stack…) siguen siendo anclas normales (funcionan sin JavaScript),
 * pero con JavaScript se desplaza suave hasta la sección y la URL se queda limpia: www.chuy7x.space.
 */
export function CleanAnchors() {
  useEffect(() => {
    // Si alguien entra con un link viejo (…/#proyectos), lo lleva a la sección y limpia la URL
    const timers: number[] = [];
    if (window.location.hash) {
      const id = decodeURIComponent(window.location.hash.slice(1));
      stripHash();
      // Las imágenes y animaciones cambian el alto de la página mientras carga: se vuelve a apuntar
      // a la sección hasta que la página se asienta (o hasta que la persona haga scroll por su cuenta)
      let userScrolled = false;
      const stop = () => (userScrolled = true);
      window.addEventListener("wheel", stop, { once: true, passive: true });
      window.addEventListener("touchmove", stop, { once: true, passive: true });
      for (const ms of [0, 300, 900, 1800]) {
        timers.push(window.setTimeout(() => !userScrolled && scrollToSection(id, false), ms));
      }
    }

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.('a[href^="#"]');
      if (!a) return;
      const id = decodeURIComponent(a.getAttribute("href")!.slice(1));
      if (!id) return;
      if (scrollToSection(id, true)) {
        e.preventDefault();
        stripHash();
      }
    };
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, []);

  return null;
}
