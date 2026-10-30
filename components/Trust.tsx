"use client";
import { motion } from "framer-motion";
import { Award, Star } from "lucide-react";
import type { Stat, Certification, Recognition } from "@/sanity/lib/types";
import { useCountUp } from "@/hooks/useCountUp";

interface Props { stats: Stat[]; certifications: Certification[]; recognition: Recognition[] }

function CountStat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { count, ref } = useCountUp(value, 2000);
  return (
    <div ref={ref} className="text-center p-6">
      <div className="text-4xl font-bold text-white mb-1">
        {count}
        <span className="text-blue-400">{suffix}</span>
      </div>
      <div className="text-zinc-500 text-sm">{label}</div>
    </div>
  );
}

export default function Trust({ stats, certifications, recognition }: Props) {
  return (
    <section className="py-24 px-6 border-t border-[#111]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-16"
        >
          <p className="text-blue-400 text-sm font-medium uppercase tracking-widest mb-3">
            Results
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Backed by results and credentials
          </h2>
        </motion.div>

        {/* Animated counters */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="border border-[#222] bg-[#111] rounded-xl mb-12 grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-[#222]"
        >
          {stats.map((s) => (
            <CountStat key={s.label} {...s} />
          ))}
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <h3 className="text-white font-semibold mb-5 flex items-center gap-2">
              <Award size={16} className="text-blue-400" />
              Certifications
            </h3>
            <div className="space-y-2">
              {certifications.map((cert, i) => (
                <motion.div
                  key={cert.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  whileHover={{ x: 6, transition: { type: "spring", stiffness: 350, damping: 20 } }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  className="flex items-center justify-between border border-[#222] bg-[#111] rounded-lg px-4 py-3 hover:border-blue-500/30 hover:bg-[#161616] transition-colors cursor-default"
                >
                  <span className="text-zinc-300 text-sm">{cert.name}</span>
                  <span className="text-xs text-zinc-500 border border-[#222] px-2 py-0.5 rounded">
                    {cert.issuer}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Recognition */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1, ease: "easeOut" }}
          >
            <h3 className="text-white font-semibold mb-5 flex items-center gap-2">
              <Star size={16} className="text-blue-400" />
              Recognition
            </h3>
            <div className="space-y-4">
              {recognition.map((item) => (
                <motion.div
                  key={item.title}
                  whileHover={{ y: -4, scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="border border-blue-500/20 bg-blue-500/5 rounded-xl p-6 hover:border-blue-500/40 hover:bg-blue-500/8 transition-colors cursor-default"
                >
                  <div className="text-white font-semibold mb-2">{item.title}</div>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}

              {/* Metrics callout */}
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="border border-[#222] bg-[#111] rounded-xl p-6 space-y-3 hover:border-blue-500/20 transition-colors cursor-default"
              >
                <div className="text-zinc-400 text-sm font-medium mb-3">Key outcomes across roles</div>
                {[
                  "65% latency reduction at Virtuosoft",
                  "35% faster nightly processing at Saylani Mass IT",
                  "50% dashboard query improvement at Aptech",
                ].map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.1 }}
                    className="flex items-center gap-2 text-sm text-zinc-300"
                  >
                    <span className="w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    {item}
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
