export const dynamic = 'force-dynamic'

import { client } from "@/sanity/lib/client";
import {
  siteSettingsQuery,
  howIWorkQuery,
  expertiseQuery,
  projectsQuery,
  architecturesQuery,
  certificationsQuery,
  recognitionQuery,
  experienceQuery,
} from "@/sanity/lib/queries";
import {
  siteConfig as fallbackSiteConfig,
  stats as fallbackStats,
  howIWork as fallbackHowIWork,
  expertise as fallbackExpertise,
  techStack as fallbackTechStack,
  projects as fallbackProjects,
  architectures as fallbackArchitectures,
  certifications as fallbackCertifications,
  recognition as fallbackRecognition,
  experience as fallbackExperience,
} from "@/data/content";

import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import HowIWork from "@/components/HowIWork";
import Expertise from "@/components/Expertise";
import Projects from "@/components/Projects";
import Architecture from "@/components/Architecture";
import Trust from "@/components/Trust";
import About from "@/components/About";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import PipelineRescue from "@/components/PipelineRescue";

export default async function Home() {
  // Fetch all content from Sanity in parallel; fall back to static data on error
  const [settings, howIWorkData, expertiseData, projectsData, archData, certsData, recData, expData] =
    await Promise.all([
      client.fetch(siteSettingsQuery, {}, { cache: 'no-store' }).catch(() => null),
      client.fetch(howIWorkQuery, {}, { cache: 'no-store' }).catch(() => null),
      client.fetch(expertiseQuery, {}, { cache: 'no-store' }).catch(() => null),
      client.fetch(projectsQuery, {}, { cache: 'no-store' }).catch(() => null),
      client.fetch(architecturesQuery, {}, { cache: 'no-store' }).catch(() => null),
      client.fetch(certificationsQuery, {}, { cache: 'no-store' }).catch(() => null),
      client.fetch(recognitionQuery, {}, { cache: 'no-store' }).catch(() => null),
      client.fetch(experienceQuery, {}, { cache: 'no-store' }).catch(() => null),
    ]);

  const siteConfig   = settings            ?? fallbackSiteConfig;
  const stats        = settings?.stats     ?? fallbackStats;
  const steps        = howIWorkData?.steps ?? fallbackHowIWork;
  const expertise    = expertiseData       ?? fallbackExpertise;
  const techStack    = expertiseData?.techStack ?? fallbackTechStack;
  const projects     = (projectsData as typeof fallbackProjects | null)     ?? fallbackProjects;
  const architectures = (archData as typeof fallbackArchitectures | null)   ?? fallbackArchitectures;
  const certifications = (certsData as typeof fallbackCertifications | null) ?? fallbackCertifications;
  const recognition  = (recData as typeof fallbackRecognition | null)       ?? fallbackRecognition;
  const experience   = (expData as typeof fallbackExperience | null)        ?? fallbackExperience;

  return (
    <main id="main-content" tabIndex={-1} className="bg-black min-h-screen overflow-x-clip">
      <Navigation siteConfig={siteConfig} />
      <Hero siteConfig={siteConfig} stats={stats} />
      <HowIWork steps={steps} />
      <Expertise expertise={expertise} techStack={techStack} />
      <PipelineRescue />
      <Projects projects={projects} />
      <Architecture architectures={architectures} />
      <Trust stats={stats} certifications={certifications} recognition={recognition} />
      <About experience={experience} siteConfig={siteConfig} />
      <CTA siteConfig={siteConfig} />
      <Footer siteConfig={siteConfig} />
    </main>
  );
}
