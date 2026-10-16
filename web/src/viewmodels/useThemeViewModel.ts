"use client";

import { useCallback, useSyncExternalStore } from "react";
import { THEME_STORAGE_KEY, type Theme } from "@/models/theme.model";

// El tema vive en <html data-theme>; lo pone el script de arranque antes de hidratar.
const read = (): Theme => (document.documentElement.dataset.theme === "dark" ? "dark" : "light");

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

export function useThemeViewModel() {
  // En el servidor no hay tema elegido; el botón se dibuja como "claro" y se corrige al hidratar
  const theme = useSyncExternalStore<Theme>(subscribe, read, () => "light");

  const toggle = useCallback(() => {
    const next: Theme = read() === "dark" ? "light" : "dark";
    const root = document.documentElement;
    // Desactiva transiciones un instante para que el cambio sea limpio y no "barra" colores
    root.classList.add("theme-switching");
    root.dataset.theme = next;
    root.style.colorScheme = next;
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {}
    requestAnimationFrame(() => requestAnimationFrame(() => root.classList.remove("theme-switching")));
  }, []);

  return { theme, isDark: theme === "dark", toggle };
}
