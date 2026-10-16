import type { GithubRepo } from "@/models/github.model";
import { getGithubSnapshot } from "@/services/github.service";
import { formatMonth } from "@/services/project.service";

export type GithubViewModel = {
  publicRepos: number | null;
  latest: (GithubRepo & { pushedLabel: string })[];
};

/** ViewModel de servidor: la vista recibe los datos ya listos para pintar. */
export async function getGithubViewModel(): Promise<GithubViewModel> {
  const snapshot = await getGithubSnapshot();
  return {
    publicRepos: snapshot.publicRepos,
    latest: snapshot.latest.map((r) => ({ ...r, pushedLabel: formatMonth(r.pushedAt) })),
  };
}
