"use client";
import { motion } from "framer-motion";
import type { ExpertiseSection, TechItem } from "@/sanity/lib/types";

interface Props { expertise: ExpertiseSection; techStack: TechItem[] }

export default function Expertise({ expertise, techStack }: Props) {
  return (
    <section id="skills" className="py-24 px-6 border-t border-[#111]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-16"
        >
          <p className="text-blue-400 text-sm font-medium uppercase tracking-widest mb-3">
            Skills &amp; Tech Superpowers
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            What I do
          </h2>
        </motion.div>

        {/* Dual columns */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {[expertise.dataEngineering, expertise.cloudAI].map((col, i) => (
            <motion.div
              key={col.title}
              initial={{ opacity: 0, x: i === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              whileHover={{ y: -6, transition: { type: "spring", stiffness: 280, damping: 18 } }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.15, ease: "easeOut" }}
              className="group border border-[#222] bg-[#111] rounded-xl p-8 hover:border-blue-500/40 hover:shadow-xl hover:shadow-blue-500/8 transition-colors duration-300"
            >
              <h3 className="text-white font-bold text-xl mb-3 group-hover:text-blue-100 transition-colors">
                {col.title}
              </h3>
              <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
                {col.description}
              </p>
              <ul className="space-y-2">
                {col.skills.map((skill, si) => (
                  <motion.li
                    key={skill}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.15 + si * 0.05 }}
                    className="flex items-center gap-2 text-sm text-zinc-300"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                    {skill}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Tech badge grid */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="text-zinc-500 text-xs uppercase tracking-widest mb-6">
            Full stack
          </p>
          <div className="flex flex-wrap gap-2">
            {techStack.map((tech, i) => (
              <motion.span
                key={tech.name}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.1, y: -3, transition: { type: "spring", stiffness: 400, damping: 15 } }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.03 }}
                className="border border-[#222] bg-[#111] hover:border-blue-500/50 hover:bg-blue-500/10 hover:shadow-lg hover:shadow-blue-500/10 text-zinc-300 hover:text-white text-sm px-3 py-1.5 rounded-md transition-colors duration-200 cursor-default"
              >
                {tech.name}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
