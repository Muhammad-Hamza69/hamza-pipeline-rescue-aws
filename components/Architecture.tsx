"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { Architecture as ArchType } from "@/sanity/lib/types";

interface Props { architectures: ArchType[] }

export default function Architecture({ architectures }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section id="architecture" className="py-24 px-6 border-t border-[#111]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-16"
        >
          <p className="text-blue-400 text-sm font-medium uppercase tracking-widest mb-3">
            Architecture
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            I think in systems, not scripts
          </h2>
          <p className="text-zinc-400 max-w-2xl">
            Every pipeline I build starts with a whiteboard, not a keyboard. Click any
            architecture below to see how I reason about the system end-to-end.
          </p>
        </motion.div>

        <div className="space-y-3">
          {architectures.map((arch, i) => (
            <motion.div
              key={arch.title}
              initial={{ opacity: 0, y: 24, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, y: 0, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.1, ease: "easeOut" }}
              className="border border-[#222] rounded-xl overflow-hidden hover:border-blue-500/30 transition-colors duration-300"
            >
              {/* Header */}
              <motion.button
                whileHover={{ backgroundColor: "rgba(30,30,30,1)" }}
                onClick={() => toggle(i)}
                aria-expanded={openIndex === i}
                aria-controls={`architecture-panel-${i}`}
                className="w-full flex items-center justify-between px-6 py-5 bg-[#111] transition-colors text-left"
              >
                <div>
                  <div className="text-white font-semibold group-hover:text-blue-100">
                    {arch.title}
                  </div>
                  <div className="text-zinc-500 text-sm font-mono mt-0.5">
                    {arch.subtitle}
                  </div>
                </div>
                <motion.div
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <ChevronDown size={18} className="text-zinc-400 flex-shrink-0 ml-4" />
                </motion.div>
              </motion.button>

              {/* Expandable content */}
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    id={`architecture-panel-${i}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <motion.div
                      initial={{ y: -8 }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="bg-[#0a0a0a] border-t border-[#1a1a1a] px-6 py-6"
                    >
                      <p className="text-zinc-400 text-sm mb-6">
                        {arch.description}
                      </p>
                      {arch.imageUrl ? (
                        <div className="w-full rounded-lg overflow-hidden border border-[#222]">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={arch.imageUrl}
                            alt={`${arch.title} architecture diagram`}
                            className="w-full h-auto object-contain bg-white"
                          />
                        </div>
                      ) : arch.diagram ? (
                        <pre className="font-mono text-xs text-green-400/80 leading-relaxed overflow-x-auto whitespace-pre-wrap">
                          {arch.diagram}
                        </pre>
                      ) : null}
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
