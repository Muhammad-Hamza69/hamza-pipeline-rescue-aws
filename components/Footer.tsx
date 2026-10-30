"use client";
import { Mail, ArrowUp } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";
import type { SiteConfig } from "@/sanity/lib/types";

interface Props { siteConfig: SiteConfig }

export default function Footer({ siteConfig }: Props) {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="border-t border-[#111] px-6 py-8">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Name */}
        <div className="text-zinc-500 text-sm">
          {siteConfig.name}
        </div>

        {/* Social icons */}
        <div className="flex items-center gap-5">
          <a
            href={siteConfig.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-600 hover:text-white transition-colors"
            aria-label="GitHub"
          >
            <GithubIcon size={17} />
          </a>
          <a
            href={siteConfig.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-600 hover:text-white transition-colors"
            aria-label="LinkedIn"
          >
            <LinkedinIcon size={17} />
          </a>
          <a
            href={`mailto:${siteConfig.email}`}
            className="text-zinc-600 hover:text-white transition-colors"
            aria-label="Email"
          >
            <Mail size={17} />
          </a>
        </div>

        {/* Back to top */}
        <button
          onClick={scrollToTop}
          className="flex items-center gap-1.5 text-zinc-500 hover:text-white transition-colors text-sm"
          aria-label="Back to top"
        >
          <ArrowUp size={14} />
          Back to top
        </button>
      </div>
      <div className="mx-auto mt-6 flex max-w-6xl flex-wrap items-center justify-center gap-x-5 gap-y-3 border-t border-white/5 pt-5 text-xs text-zinc-400">
        <a href="https://github.com/Muhammad-Hamza69/hamza-pipeline-rescue-aws" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-white">Portfolio source on GitHub</a>
        <a href="#pipeline-rescue" className="underline underline-offset-4 hover:text-white">Try Pipeline Rescue</a>
      </div>
    </footer>
  );
}
