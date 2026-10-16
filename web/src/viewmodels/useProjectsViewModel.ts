"use client";

import { useMemo, useState } from "react";
import type { Locale } from "@/models/locale.model";
import { AREA_LABELS, projectsFor } from "@/models/project.model";
import { availableAreas, filterByArea, type AreaFilter } from "@/services/project.service";

export function useProjectsViewModel(locale: Locale) {
  const projects = useMemo(() => projectsFor(locale), [locale]);
  const [area, setArea] = useState<AreaFilter>("todo");

  const featured = useMemo(() => filterByArea(projects.filter((p) => p.image), area), [projects, area]);
  const minor = useMemo(() => filterByArea(projects.filter((p) => !p.image), area), [projects, area]);
  const filters = useMemo(() => availableAreas(projects).map((a) => ({ id: a, label: AREA_LABELS[locale][a] })), [projects, locale]);

  return { area, setArea, filters, featured, minor };
}
