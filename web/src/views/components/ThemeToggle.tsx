"use client";

import { AnimatePresence, motion } from "motion/react";
import { useCopy } from "@/viewmodels/LocaleProvider";
import { useThemeViewModel } from "@/viewmodels/useThemeViewModel";

export function ThemeToggle() {
  const { t } = useCopy();
  const vm = useThemeViewModel();
  const label = vm.isDark ? t.theme.toLight : t.theme.toDark;

  return (
    <button
      type="button"
      onClick={vm.toggle}
      aria-label={label}
      title={label}
      aria-pressed={vm.isDark}
      className="relative grid size-11 place-items-center overflow-hidden rounded-[6px] border-2 border-tinta bg-papel text-tinta shadow-[3px_3px_0_var(--color-violeta)] transition-[transform,box-shadow] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.svg
          key={vm.theme}
          viewBox="0 0 24 24"
          aria-hidden
          className="size-5"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.2}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ y: 18, rotate: -90, opacity: 0 }}
          animate={{ y: 0, rotate: 0, opacity: 1 }}
          exit={{ y: -18, rotate: 90, opacity: 0 }}
          transition={{ type: "spring", stiffness: 420, damping: 22 }}
        >
          {vm.isDark ? (
            // Luna: estás en oscuro
            <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" fill="var(--color-lima)" stroke="currentColor" />
          ) : (
            // Sol: estás en claro
            <>
              <circle cx="12" cy="12" r="4.2" fill="var(--color-lima)" />
              <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
            </>
          )}
        </motion.svg>
      </AnimatePresence>
    </button>
  );
}
