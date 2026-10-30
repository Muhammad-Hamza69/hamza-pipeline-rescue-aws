"use client";
import { motion } from "framer-motion";
import type { HowIWorkStep } from "@/sanity/lib/types";

interface Props { steps: HowIWorkStep[] }

export default function HowIWork({ steps }: Props) {
  return (
    <section className="py-24 px-6 border-t border-[#111]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-16"
        >
          <p className="text-blue-400 text-sm font-medium uppercase tracking-widest mb-3">
            Process
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            From raw data to shipped intelligence
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 48 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8, scale: 1.03, transition: { type: "spring", stiffness: 300, damping: 20 } }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12, ease: "easeOut" }}
              className="group cursor-default"
            >
              <div className="border border-[#222] bg-[#111] rounded-xl p-6 h-full group-hover:border-blue-500/40 group-hover:shadow-xl group-hover:shadow-blue-500/10 transition-all duration-300">
                <div className="text-blue-400 text-xs font-mono font-bold mb-4 tracking-widest">
                  {step.step}
                </div>
                <h3 className="text-white font-semibold text-lg mb-3 group-hover:text-blue-100 transition-colors">
                  {step.title}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
