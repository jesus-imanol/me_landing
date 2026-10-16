import { cacheLife } from "next/cache";
import type { GithubRepo, GithubSnapshot } from "@/models/github.model";
import { PROFILE } from "@/models/profile.model";

const API = "https://api.github.com";

type ApiRepo = {
  name: string;
  language: string | null;
  html_url: string;
  homepage: string | null;
  pushed_at: string;
  fork: boolean;
};

/**
 * Lee el perfil público de GitHub. Se cachea por horas: la API sin token permite 60 llamadas por hora.
 * Si GitHub falla, devuelve un snapshot vacío y la vista simplemente no muestra el bloque.
 */
export async function getGithubSnapshot(): Promise<GithubSnapshot> {
  "use cache";
  cacheLife("hours");

  const headers = { Accept: "application/vnd.github+json" };
  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`${API}/users/${PROFILE.handle}`, { headers }),
      fetch(`${API}/users/${PROFILE.handle}/repos?per_page=30&sort=pushed`, { headers }),
    ]);
    if (!userRes.ok || !reposRes.ok) return { publicRepos: null, latest: [] };

    const user = (await userRes.json()) as { public_repos: number };
    const repos = (await reposRes.json()) as ApiRepo[];

    const latest: GithubRepo[] = repos
      .filter((r) => !r.fork && r.name !== PROFILE.handle)
      .slice(0, 6)
      .map((r) => ({
        name: r.name,
        language: r.language,
        url: r.html_url,
        homepage: r.homepage || null,
        pushedAt: r.pushed_at,
      }));

    return { publicRepos: user.public_repos, latest };
  } catch {
    return { publicRepos: null, latest: [] };
  }
}
