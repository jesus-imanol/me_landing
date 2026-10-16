"use client";

import { useMemo, useState } from "react";
import { AREA_LABELS, PROJECTS } from "@/models/project.model";
import { availableAreas, filterByArea, type AreaFilter } from "@/services/project.service";

export function useProjectsViewModel() {
  const [area, setArea] = useState<AreaFilter>("todo");

  const featured = useMemo(() => filterByArea(PROJECTS.filter((p) => p.image), area), [area]);
  const minor = useMemo(() => filterByArea(PROJECTS.filter((p) => !p.image), area), [area]);
  const filters = useMemo(() => availableAreas(PROJECTS).map((a) => ({ id: a, label: AREA_LABELS[a] })), []);

  return { area, setArea, filters, featured, minor };
}
