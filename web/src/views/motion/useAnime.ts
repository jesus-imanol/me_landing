"use client";

import { createScope, ScrollObserver, type Scope } from "animejs";
import { useEffect, useRef, type DependencyList, type RefObject } from "react";

/**
 * Corre animaciones de anime.js dentro de un scope ligado a `root`.
 * Todo se revierte al desmontar. Si el usuario pide menos movimiento, no anima.
 */
export function useAnime<T extends HTMLElement>(
  setup: (scope: Scope, root: T) => void | (() => void),
  deps: DependencyList = [],
): RefObject<T | null> {
  const root = useRef<T>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cleanup: void | (() => void);
    const scope = createScope({ root: el }).add((self) => {
      cleanup = setup(self!, el);
    });

    // Las animaciones ligadas al scroll guardan las medidas de la página al crearse. Si la página
    // cambia de alto después (fuentes, imágenes, barra del navegador en móvil) hay que recalcularlas,
    // o al llegar al final de la sección la animación se queda a medias.
    const relayout = new ResizeObserver(() => {
      scope.revertibles.forEach((r) => {
        if (r instanceof ScrollObserver) r.refresh();
      });
    });
    relayout.observe(document.body);

    return () => {
      relayout.disconnect();
      cleanup?.();
      scope.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return root;
}

export const SPRING = { stiffness: 100, damping: 20 } as const;
