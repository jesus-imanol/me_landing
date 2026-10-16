"use client";

import { useCallback, useEffect, useState } from "react";
import { TILIN_PHRASES } from "@/models/phrase.model";
import { nextIndex, reactionFor } from "@/services/phrase.service";

const ROTATE_MS = 2800;

export function useTilinViewModel() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [rings, setRings] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => setPhraseIndex((i) => nextIndex(i, TILIN_PHRASES.length)), ROTATE_MS);
    return () => window.clearInterval(id);
  }, [paused]);

  const ring = useCallback(() => setRings((n) => n + 1), []);

  return {
    phrase: TILIN_PHRASES[phraseIndex],
    phraseIndex,
    rings,
    reaction: rings > 0 ? reactionFor(rings) : null,
    ring,
    pause: () => setPaused(true),
    resume: () => setPaused(false),
  };
}
