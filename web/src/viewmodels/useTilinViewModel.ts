"use client";

import { useCallback, useEffect, useState } from "react";
import type { Locale } from "@/models/locale.model";
import { TILIN_PHRASES } from "@/models/phrase.model";
import { nextIndex, reactionFor } from "@/services/phrase.service";

const ROTATE_MS = 2800;

export function useTilinViewModel(locale: Locale) {
  const phrases = TILIN_PHRASES[locale];
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [rings, setRings] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => setPhraseIndex((i) => nextIndex(i, phrases.length)), ROTATE_MS);
    return () => window.clearInterval(id);
  }, [paused, phrases.length]);

  const ring = useCallback(() => setRings((n) => n + 1), []);

  return {
    phrase: phrases[phraseIndex % phrases.length],
    phraseIndex,
    rings,
    reaction: rings > 0 ? reactionFor(rings, locale) : null,
    ring,
    pause: () => setPaused(true),
    resume: () => setPaused(false),
  };
}
