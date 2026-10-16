import type { Locale } from "@/models/locale.model";
import { TILIN_REACTIONS } from "@/models/phrase.model";

/** Siguiente índice en una lista circular. */
export function nextIndex(current: number, length: number): number {
  return length === 0 ? 0 : (current + 1) % length;
}

/** La reacción se va poniendo más sarcástica entre más veces le picas; se queda en la última. */
export function reactionFor(count: number, locale: Locale): string {
  const list = TILIN_REACTIONS[locale];
  return list[Math.min(Math.max(count - 1, 0), list.length - 1)];
}

/** Parte un texto en letras conservando espacios, para animarlas una por una. */
export function splitLetters(text: string): string[] {
  return Array.from(text);
}
