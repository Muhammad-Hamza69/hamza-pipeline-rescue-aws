"use client";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import type { Experience, SiteConfig } from "@/sanity/lib/types";

interface Props { experience: Experience[]; siteConfig: SiteConfig }

export default function About({ experience, siteConfig }: Props) {
  return (
    <section id="about" className="py-24 px-6 border-t border-[#111]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-16"
        >
          <p className="text-blue-400 text-sm font-medium uppercase tracking-widest mb-3">
            About
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            The engineer behind the pipelines
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Narrative */}
          <motion.div
            initial={{ opacity: 0, x: -48 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="space-y-5"
          >
            <p className="text-zinc-300 leading-relaxed">
              I&apos;m a Cloud Data & AI Engineer with 2+ years of hands-on experience
              designing and shipping real-time data pipelines and analytics platforms on
              AWS and Snowflake. I don&apos;t just build pipelines — I own them from
              raw ingestion to the dashboard a stakeholder refreshes every morning.
            </p>
            <p className="text-zinc-400 leading-relaxed">
              My edge is full-stack ownership: I understand the data source, the
              transformation logic, the warehouse modeling, and the downstream
              consumer. That means fewer handoffs, faster delivery, and systems that
              actually hold up in production. I&apos;ve cut processing latency by 65%,
              slashed nightly batch times by 35%, and improved query performance by 50%
              — not in demos, but in real production environments.
            </p>
            <p className="text-zinc-400 leading-relaxed">
              Outside of engineering, I lead the AWS Student Builder Group at the
              University of Karachi — because explaining complex systems clearly is a
              senior skill, and I practice it intentionally.
            </p>

            <div className="flex items-center gap-2 text-zinc-500 text-sm pt-2">
              <MapPin size={14} />
              {siteConfig.location}
            </div>
          </motion.div>

          {/* Experience timeline */}
          <div id="experience" className="min-w-0">
            <motion.p
              initial={{ opacity: 0, y: -12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-zinc-500 text-xs uppercase tracking-widest mb-8"
            >
              Experience
            </motion.p>

            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-4 top-0 bottom-0 w-px bg-[#222]" />

              <div className="space-y-8">
                {experience.map((job, i) => (
                  <motion.div
                    key={job.company}
                    initial={{ opacity: 0, x: 48 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    whileHover={{ x: 4, transition: { type: "spring", stiffness: 350, damping: 22 } }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.12, ease: "easeOut" }}
                    className="relative min-w-0 pl-8 sm:pl-12"
                  >
                    {/* Dot */}
                    <motion.div
                      whileHover={{ scale: 1.4 }}
                      transition={{ type: "spring", stiffness: 400 }}
                      className="absolute left-2.5 top-1.5 w-3 h-3 rounded-full border-2 border-blue-500 bg-black"
                    />

                    <div className="border border-[#222] bg-[#111] rounded-xl p-5 hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/8 transition-all duration-300">
                      <div className="flex flex-col sm:flex-row items-start justify-between gap-2 sm:gap-4 mb-2">
                        <div>
                          <div className="text-white font-semibold">{job.company}</div>
                          <div className="text-blue-400 text-sm">{job.role}</div>
                        </div>
                        <span className="text-zinc-500 text-xs whitespace-nowrap font-mono">
                          {job.period}
                        </span>
                      </div>
                      <p className="text-zinc-400 text-sm leading-relaxed mb-3">
                        {job.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {job.tags.map((tag) => (
                          <motion.span
                            key={tag}
                            whileHover={{ scale: 1.08 }}
                            transition={{ type: "spring", stiffness: 400, damping: 15 }}
                            className="text-xs text-zinc-500 border border-[#222] px-2 py-0.5 rounded hover:border-blue-500/30 hover:text-zinc-300 transition-colors cursor-default"
                          >
                            {tag}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
