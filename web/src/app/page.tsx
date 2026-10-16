import { Suspense } from "react";
import { getGithubViewModel } from "@/viewmodels/githubViewModel";
import { ContactSection } from "@/views/home/ContactSection";
import { GithubSection } from "@/views/home/GithubSection";
import { HeroSection } from "@/views/home/HeroSection";
import { Marquee } from "@/views/home/Marquee";
import { PrinciplesSection } from "@/views/home/PrinciplesSection";
import { ProjectsSection } from "@/views/home/ProjectsSection";
import { StackSection } from "@/views/home/StackSection";
import { TilinSection } from "@/views/home/TilinSection";

async function Github() {
  return <GithubSection snapshot={await getGithubViewModel()} />;
}

export default function Home() {
  return (
    <>
      <HeroSection />
      <Marquee />
      <ProjectsSection />
      <TilinSection />
      <PrinciplesSection />
      <StackSection />
      <Suspense fallback={<GithubSection snapshot={{ publicRepos: null, latest: [] }} />}>
        <Github />
      </Suspense>
      <ContactSection />
    </>
  );
}
