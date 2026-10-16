"use client";

import { LOCALE_PATH, LOCALES } from "@/models/locale.model";
import { useCopy } from "@/viewmodels/LocaleProvider";

/** Cambia entre /  y /en. Cada idioma es su propia página (y su propio html lang), por eso es un enlace normal. */
export function LangSwitch() {
  const { locale, t } = useCopy();
  const other = LOCALES.find((l) => l !== locale)!;

  return (
    <a
      href={LOCALE_PATH[other]}
      hrefLang={other}
      lang={other}
      aria-label={t.lang.switchTo}
      title={t.lang.switchTo}
      className="display grid h-11 min-w-11 place-items-center rounded-[6px] border-2 border-tinta bg-lima px-2 text-lg leading-none text-carbon shadow-[3px_3px_0_var(--color-violeta)] transition-[transform,box-shadow] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
    >
      {t.lang.short}
    </a>
  );
}
