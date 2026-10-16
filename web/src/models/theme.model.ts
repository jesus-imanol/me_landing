export type Theme = "light" | "dark";

/** Clave en localStorage. Si no existe, se sigue la preferencia del sistema. */
export const THEME_STORAGE_KEY = "jesus-dev-theme";

/**
 * Corre antes de pintar (va inline en <head>) para que no haya destello de tema equivocado.
 * Lee la elección guardada; si no hay, usa la del sistema operativo.
 */
export const THEME_BOOT_SCRIPT = `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");if(t!=="light"&&t!=="dark"){t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.dataset.theme=t;document.documentElement.style.colorScheme=t}catch(e){}})();`;
