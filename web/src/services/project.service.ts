import { HTML_LANG, type Locale } from "@/models/locale.model";
import type { Project, ProjectArea } from "@/models/project.model";

export type AreaFilter = ProjectArea | "todo";

export function filterByArea(projects: Project[], area: AreaFilter): Project[] {
  return area === "todo" ? projects : projects.filter((p) => p.areas.includes(area));
}

/** Solo ofrece filtros que tienen al menos un proyecto, en el orden en que aparecen. */
export function availableAreas(projects: Project[]): AreaFilter[] {
  const seen = new Set<ProjectArea>();
  projects.forEach((p) => p.areas.forEach((a) => seen.add(a)));
  return ["todo", ...seen];
}

/** "oct 2026" / "Oct 2026": determinista, no depende de la hora del render (se puede cachear). */
export function formatMonth(iso: string, locale: Locale): string {
  const fmt = new Intl.DateTimeFormat(HTML_LANG[locale], { month: "short", year: "numeric", timeZone: "UTC" });
  return fmt.format(new Date(iso)).replace(".", "");
}
