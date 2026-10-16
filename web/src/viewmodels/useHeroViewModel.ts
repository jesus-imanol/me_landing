"use client";

import { useMotionValue, useSpring, useTransform, type MotionValue } from "motion/react";
import { useCallback, useEffect, useState, type PointerEvent } from "react";
import { HERO_BUBBLES } from "@/models/phrase.model";
import { nextIndex } from "@/services/phrase.service";

const SPRING = { stiffness: 100, damping: 20 };

/** Capa con profundidad: entre más alta, más se mueve con el puntero. */
export type ParallaxLayer = { x: MotionValue<number>; y: MotionValue<number> };

export function useHeroViewModel() {
  const [bubbleIndex, setBubbleIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setBubbleIndex((i) => nextIndex(i, HERO_BUBBLES.length)), 2600);
    return () => window.clearInterval(id);
  }, []);

  // -0.5…0.5 según dónde esté el puntero dentro del hero
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, SPRING);
  const sy = useSpring(py, SPRING);

  const onPointerMove = useCallback(
    (e: PointerEvent<HTMLElement>) => {
      if (e.pointerType !== "mouse") return;
      const r = e.currentTarget.getBoundingClientRect();
      px.set((e.clientX - r.left) / r.width - 0.5);
      py.set((e.clientY - r.top) / r.height - 0.5);
    },
    [px, py],
  );
  const onPointerLeave = useCallback(() => {
    px.set(0);
    py.set(0);
  }, [px, py]);

  // Tres planos: los proyectos de atrás se mueven poco, Jesús en medio, las burbujas al frente
  const layers = {
    back: { x: useTransform(sx, (v) => v * -28), y: useTransform(sy, (v) => v * -20) },
    mid: { x: useTransform(sx, (v) => v * 18), y: useTransform(sy, (v) => v * 14) },
    front: { x: useTransform(sx, (v) => v * 46), y: useTransform(sy, (v) => v * 32) },
  } satisfies Record<string, ParallaxLayer>;

  return {
    bubble: HERO_BUBBLES[bubbleIndex],
    bubbleIndex,
    onPointerMove,
    onPointerLeave,
    layers,
  };
}
