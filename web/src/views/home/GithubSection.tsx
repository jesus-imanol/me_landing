import type { GithubViewModel } from "@/viewmodels/githubViewModel";
import { GITHUB_URL } from "@/models/profile.model";
import { COPY } from "@/models/copy.model";
import type { Locale } from "@/models/locale.model";
import { OPEN_SOURCE } from "@/models/project.model";
import { Reveal } from "@/views/motion/Reveal";

type Props = { snapshot: GithubViewModel; locale: Locale };

/** Datos reales de GitHub (cacheados por hora) + los repos de los que estoy orgulloso. */
export function GithubSection({ snapshot, locale }: Props) {
  const t = COPY[locale].github;
  return (
    <section className="bg-carbon px-4 py-[clamp(4rem,9vw,8rem)] text-hueso md:px-8">
      <Reveal className="mx-auto max-w-[1400px]">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p data-reveal className="text-sm font-bold uppercase tracking-[0.2em] text-lila">
              {t.eyebrow}
            </p>
            <h2 data-reveal className="display mt-3 text-[clamp(3rem,7vw,5.8rem)]">
              {t.titleA} <span className="coqueto normal-case">{t.titleB}</span>
            </h2>
          </div>
          {snapshot.publicRepos !== null && (
            <p data-reveal className="text-lg text-hueso/70">
              <span className="display text-5xl text-lima">{snapshot.publicRepos}</span> {t.repos}
            </p>
          )}
        </div>

        <ul className="mt-12 grid gap-px overflow-hidden rounded-[2rem] bg-hueso/10 md:grid-cols-2">
          {OPEN_SOURCE[locale].map((r) => (
            <li key={r.name} data-reveal className="bg-carbon">
              <a
                href={`${GITHUB_URL}/${r.name}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col gap-2 p-6 transition-colors hover:bg-hueso/5 md:p-8"
              >
                <span className="flex items-center justify-between gap-4">
                  <span className="font-mono text-lg font-bold text-lila group-hover:text-lima">{r.name}</span>
                  <span className="shrink-0 rounded-full border border-hueso/20 px-3 py-1 text-xs font-semibold text-hueso/70">
                    {r.stack}
                  </span>
                </span>
                <span className="text-hueso/75">{r.idea}</span>
              </a>
            </li>
          ))}
        </ul>

        {snapshot.latest.length > 0 && (
          <div data-reveal className="mt-14">
            <h3 className="text-xs font-extrabold uppercase tracking-[0.2em] text-hueso/60">{t.latest}</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {snapshot.latest.map((r) => (
                <li key={r.name}>
                  <a
                    href={r.homepage ?? r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-2 rounded-full border border-hueso/15 px-4 text-sm font-semibold transition-colors hover:border-lima hover:text-lima"
                  >
                    {r.name}
                    <span className="text-hueso/50">
                      {r.language ? `${r.language} · ` : ""}
                      {r.pushedLabel}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        <a
          data-reveal
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-12 inline-flex min-h-12 items-center gap-2 rounded-full bg-hueso px-6 font-bold text-carbon transition-transform hover:-rotate-1 active:translate-y-px"
        >
          {t.all}
        </a>
      </Reveal>
    </section>
  );
}
