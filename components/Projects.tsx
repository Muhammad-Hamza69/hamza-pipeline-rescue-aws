"use client";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/Icons";
import type { Project } from "@/sanity/lib/types";

interface Props { projects: Project[] }

export default function Projects({ projects }: Props) {
  return (
    <section id="work" className="py-24 px-6 border-t border-[#111]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-16"
        >
          <p className="text-blue-400 text-sm font-medium uppercase tracking-widest mb-3">
            Selected Work
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Systems that shipped, and the numbers to prove it
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 48, x: i % 2 === 0 ? -24 : 24 }}
              whileInView={{ opacity: 1, y: 0, x: 0 }}
              whileHover={{ y: -8, transition: { type: "spring", stiffness: 280, damping: 18 } }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.12, ease: "easeOut" }}
              className="group border border-[#222] bg-[#111] rounded-xl p-6 flex flex-col hover:border-blue-500/40 hover:shadow-2xl hover:shadow-blue-500/10 transition-colors duration-300"
            >
              {/* Metric */}
              <div className="mb-4">
                <div className="text-blue-400 font-bold text-xl mb-0.5 group-hover:text-blue-300 transition-colors">
                  {project.metric}
                </div>
                <div className="text-zinc-500 text-xs">{project.metricDetail}</div>
              </div>

              {/* Title */}
              <h3 className="text-white font-semibold text-lg mb-3 group-hover:text-blue-50 transition-colors">
                {project.title}
              </h3>

              {/* Description */}
              <p className="text-zinc-400 text-sm leading-relaxed mb-4 flex-1">
                {project.description}
              </p>

              {/* Architecture highlight */}
              <div className="font-mono text-xs text-zinc-500 bg-[#0a0a0a] border border-[#1a1a1a] rounded-md px-3 py-2 mb-5 group-hover:border-[#2a2a2a] group-hover:text-zinc-400 transition-all">
                {project.highlight}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {project.tags.map((tag) => (
                  <motion.span
                    key={tag}
                    whileHover={{ scale: 1.08 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    className="text-xs text-zinc-400 border border-[#222] bg-[#0a0a0a] px-2 py-0.5 rounded hover:border-blue-500/40 hover:text-zinc-200 transition-colors cursor-default"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>

              {/* GitHub link */}
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors group/link w-fit"
              >
                <GithubIcon size={15} />
                View on GitHub
                <ArrowUpRight
                  size={13}
                  className="opacity-0 group-hover/link:opacity-100 -translate-x-1 group-hover/link:translate-x-0 transition-all"
                />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
