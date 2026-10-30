"use client";
import { useState, useEffect, useSyncExternalStore } from "react";
import { motion } from "framer-motion";
import { Mail, Zap } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";
import type { SiteConfig, Stat } from "@/sanity/lib/types";
import { useCountUp } from "@/hooks/useCountUp";
import NetworkBackground from "@/components/NetworkBackground";

interface Props { siteConfig: SiteConfig; stats: Stat[] }

// ─── cycling typewriter ────────────────────────────────────────────────────
const ROLES = [
  "Data Pipeline Architect",
  "AWS Cloud Builder",
  "Snowflake Engineer",
  "AI Systems Developer",
  "Cloud Data Engineer",
];

const motionQuery = "(prefers-reduced-motion: reduce)";
function subscribeToMotion(callback: () => void) {
  const query = window.matchMedia(motionQuery);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

function TypewriterCycler() {
  const prefersReducedMotion = useSyncExternalStore(subscribeToMotion, () => window.matchMedia(motionQuery).matches, () => false);
  const [displayed, setDisplayed] = useState("");
  const [roleIdx, setRoleIdx] = useState(0);
  const [phase, setPhase] = useState<"typing" | "pause" | "erasing">("typing");

  useEffect(() => {
    if (prefersReducedMotion) return;
    const target = ROLES[roleIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (displayed.length < target.length) {
        timeout = setTimeout(
          () => setDisplayed(target.slice(0, displayed.length + 1)),
          55,
        );
      } else {
        timeout = setTimeout(() => setPhase("pause"), 1600);
      }
    } else if (phase === "pause") {
      timeout = setTimeout(() => setPhase("erasing"), 0);
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(
          () => setDisplayed(displayed.slice(0, -1)),
          30,
        );
      } else {
        timeout = setTimeout(() => {
          setRoleIdx((i) => (i + 1) % ROLES.length);
          setPhase("typing");
        }, 0);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayed, phase, roleIdx, prefersReducedMotion]);

  return (
    <span className="inline-flex items-center gap-0.5">
      <span className="text-white font-medium">{prefersReducedMotion ? ROLES[0] : displayed}</span>
      {/* blinking cursor */}
      <span
        className="inline-block w-0.5 h-5 bg-blue-400 ml-0.5 align-middle"
        style={{ animation: "cursorBlink 1s step-end infinite" }}
      />
    </span>
  );
}

// ─── stat badge ───────────────────────────────────────────────────────────
function StatBadge({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { count, ref } = useCountUp(value, 1800);
  return (
    <div ref={ref} className="text-center">
      <div className="text-2xl font-bold text-white">
        {count}
        <span className="text-blue-400">{suffix}</span>
      </div>
      <div className="text-xs text-zinc-500 mt-0.5">{label}</div>
    </div>
  );
}

// ─── hero ─────────────────────────────────────────────────────────────────
export default function Hero({ siteConfig, stats }: Props) {
  return (
    <section
      id="home"
      className="min-h-screen flex flex-col items-center justify-center relative px-6 pt-16"
    >
      <NetworkBackground />

      <div className="max-w-4xl mx-auto text-center relative z-10">

        {/* Availability badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 border border-[#222] bg-[#111] rounded-full px-4 py-1.5 mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <span className="text-sm text-zinc-400">{siteConfig.availability}</span>
        </motion.div>

        {/* Headline — highlighted key words with shimmer */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight mb-6"
        >
          I turn raw{" "}
          <span className="shimmer-text">data</span>{" "}
          into intelligent,{" "}
          <br className="hidden sm:block" />
          production-ready{" "}
          <span className="shimmer-text">AI systems.</span>
        </motion.h1>

        {/* Typewriter sub-copy */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-zinc-400 text-lg max-w-2xl mx-auto mb-10 min-h-[1.75rem]"
        >
          Cloud Data &amp; AI Engineer ·{" "}
          <TypewriterCycler />
          {" "}· Karachi, Pakistan
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-5"
        >
          <a
            href="#work"
            className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-md font-medium transition-colors flex items-center gap-2"
          >
            See my work
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
          </a>
          <a
            href={`mailto:${siteConfig.email}`}
            className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-md font-medium transition-colors flex items-center gap-2"
          >
            <Mail size={16} />
            Let&apos;s talk
          </a>
        </motion.div>

        <a href="#pipeline-rescue" className="mx-auto mb-10 flex w-fit items-center justify-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-2.5 text-sm text-blue-200 transition-colors hover:border-blue-300 hover:bg-blue-500/20">
          <Zap size={15} aria-hidden="true" /> Hidden superpower? Try Pipeline Rescue <span aria-hidden="true">↗</span>
        </a>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-x-5 gap-y-6 border border-[#222] bg-[#111]/60 backdrop-blur-sm rounded-xl px-5 sm:px-8 py-5 mb-12"
        >
          {stats.map((stat, i) => (
            <div key={i}>
              <StatBadge {...stat} />
            </div>
          ))}
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="flex items-center justify-center gap-5"
        >
          <a href={siteConfig.github} target="_blank" rel="noopener noreferrer"
            className="text-zinc-500 hover:text-white transition-colors" aria-label="GitHub">
            <GithubIcon size={20} />
          </a>
          <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer"
            className="text-zinc-500 hover:text-white transition-colors" aria-label="LinkedIn">
            <LinkedinIcon size={20} />
          </a>
          <a href={`mailto:${siteConfig.email}`}
            className="text-zinc-500 hover:text-white transition-colors" aria-label="Email">
            <Mail size={20} />
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator — bouncing arrow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
      >
        <span className="text-xs text-zinc-600 tracking-widest uppercase">scroll</span>
        <svg
          width="18" height="18" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
          className="text-zinc-600"
          style={{ animation: "scrollBounce 1.6s ease-in-out infinite" }}
        >
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </motion.div>

      <style>{`
        /* shimmer gradient on headline accent words */
        .shimmer-text {
          background: linear-gradient(
            90deg,
            #3b82f6 0%,
            #93c5fd 40%,
            #3b82f6 60%,
            #60a5fa 100%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmerMove 3s linear infinite;
        }

        @keyframes shimmerMove {
          0%   { background-position: 0% center; }
          100% { background-position: 200% center; }
        }

        @keyframes cursorBlink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }

        @keyframes scrollBounce {
          0%, 100% { transform: translateY(0); opacity: 0.5; }
          50%       { transform: translateY(6px); opacity: 1; }
        }
      `}</style>
    </section>
  );
}
