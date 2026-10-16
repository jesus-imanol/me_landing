import type { GithubViewModel } from "@/viewmodels/githubViewModel";
import { GITHUB_URL } from "@/models/profile.model";
import { OPEN_SOURCE } from "@/models/project.model";
import { Reveal } from "@/views/motion/Reveal";

type Props = { snapshot: GithubViewModel };

/** Datos reales de GitHub (cacheados por hora) + los repos de los que estoy orgulloso. */
export function GithubSection({ snapshot }: Props) {
  return (
    <section className="bg-tinta px-4 py-[clamp(4rem,9vw,8rem)] text-papel md:px-8">
      <Reveal className="mx-auto max-w-[1400px]">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p data-reveal className="text-sm font-bold uppercase tracking-[0.2em] text-mandarina">
              Open source
            </p>
            <h2 data-reveal className="display mt-3 text-[clamp(3rem,7vw,5.8rem)]">
              Código que <span className="coqueto normal-case">se puede leer</span>
            </h2>
          </div>
          {snapshot.publicRepos !== null && (
            <p data-reveal className="text-lg text-papel/70">
              <span className="display text-5xl text-naranja">{snapshot.publicRepos}</span> repos públicos en GitHub
            </p>
          )}
        </div>

        <ul className="mt-12 grid gap-px overflow-hidden rounded-[2rem] bg-papel/10 md:grid-cols-2">
          {OPEN_SOURCE.map((r) => (
            <li key={r.name} data-reveal className="bg-tinta">
              <a
                href={`${GITHUB_URL}/${r.name}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col gap-2 p-6 transition-colors hover:bg-papel/5 md:p-8"
              >
                <span className="flex items-center justify-between gap-4">
                  <span className="font-mono text-lg font-bold text-mandarina group-hover:text-naranja">{r.name}</span>
                  <span className="shrink-0 rounded-full border border-papel/20 px-3 py-1 text-xs font-semibold text-papel/70">
                    {r.stack}
                  </span>
                </span>
                <span className="text-papel/75">{r.idea}</span>
              </a>
            </li>
          ))}
        </ul>

        {snapshot.latest.length > 0 && (
          <div data-reveal className="mt-14">
            <h3 className="text-xs font-extrabold uppercase tracking-[0.2em] text-papel/60">Lo último que pushé</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {snapshot.latest.map((r) => (
                <li key={r.name}>
                  <a
                    href={r.homepage ?? r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-2 rounded-full border border-papel/15 px-4 text-sm font-semibold transition-colors hover:border-naranja hover:text-naranja"
                  >
                    {r.name}
                    <span className="text-papel/50">
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
          className="mt-12 inline-flex min-h-12 items-center gap-2 rounded-full bg-papel px-6 font-bold text-tinta transition-transform hover:-rotate-1 active:translate-y-px"
        >
          Ver todo en GitHub
        </a>
      </Reveal>
    </section>
  );
}
