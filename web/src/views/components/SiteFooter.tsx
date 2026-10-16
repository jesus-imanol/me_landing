import { PROFILE, SOCIALS } from "@/models/profile.model";
import { LogoMark } from "./LogoMark";

export function SiteFooter() {
  return (
    <footer className="border-t border-linea bg-papel px-4 py-10 md:px-8">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="display flex items-center gap-3 text-4xl">
            <LogoMark className="size-12" />
            <span>
              {PROFILE.name} <span className="text-violeta">{PROFILE.lastName}</span>
            </span>
          </p>
          <p className="mt-2 max-w-md text-sm text-humo">
            Jesús Imanol Castillo, “Chuy” (chuy7x). Desarrollador Full Stack en Chiapas, México. Hecho con Next.js, GSAP, anime.js y Motion.
          </p>
        </div>
        <ul className="flex flex-wrap gap-2">
          {SOCIALS.map((s) => (
            <li key={s.href}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center rounded-full border border-linea px-4 text-sm font-semibold transition-colors hover:border-violeta hover:text-violeta"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
