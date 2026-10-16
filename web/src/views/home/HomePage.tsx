import { Suspense } from "react";
import type { Locale } from "@/models/locale.model";
import { getGithubViewModel } from "@/viewmodels/githubViewModel";
import { ContactSection } from "./ContactSection";
import { GithubSection } from "./GithubSection";
import { HeroSection } from "./HeroSection";
import { LiveSection } from "./LiveSection";
import { Marquee } from "./Marquee";
import { PrinciplesSection } from "./PrinciplesSection";
import { ProjectsSection } from "./ProjectsSection";
import { StackSection } from "./StackSection";
import { TilinSection } from "./TilinSection";

async function Github({ locale }: { locale: Locale }) {
  return <GithubSection locale={locale} snapshot={await getGithubViewModel(locale)} />;
}

/** La misma página para los dos idiomas; los textos salen del idioma del layout. */
export function HomePage({ locale }: { locale: Locale }) {
  return (
    <>
      <HeroSection />
      <Marquee />
      <LiveSection />
      <ProjectsSection />
      <TilinSection />
      <PrinciplesSection />
      <StackSection />
      <Suspense fallback={<GithubSection locale={locale} snapshot={{ publicRepos: null, latest: [] }} />}>
        <Github locale={locale} />
      </Suspense>
      <ContactSection />
    </>
  );
}
