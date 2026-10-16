export type GithubRepo = {
  name: string;
  language: string | null;
  url: string;
  homepage: string | null;
  pushedAt: string;
};

export type GithubSnapshot = {
  publicRepos: number | null;
  latest: GithubRepo[];
};
