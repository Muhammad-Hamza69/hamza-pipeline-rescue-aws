"use client";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { LinkedinIcon } from "@/components/Icons";
import type { SiteConfig } from "@/sanity/lib/types";

interface Props { siteConfig: SiteConfig }

export default function CTA({ siteConfig }: Props) {
  return (
    <section className="py-32 px-6 border-t border-[#111]">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          {/* Glow */}
          <div
            className="absolute left-1/2 -translate-x-1/2 w-96 h-32 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(59,130,246,0.12) 0%, transparent 70%)",
            }}
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-blue-400 text-sm font-medium uppercase tracking-widest mb-6"
          >
            Let&apos;s build
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight"
          >
            Let&apos;s build something that ships.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-zinc-400 text-lg mb-10 max-w-xl mx-auto"
          >
            Open to senior Data & AI roles and select consulting projects.
            If you&apos;re building a data platform that needs to hold up in production,
            I&apos;d like to hear about it.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <motion.a
              href={`mailto:${siteConfig.email}`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 350, damping: 18 }}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-7 py-3.5 rounded-md font-medium transition-colors shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40"
            >
              <Mail size={16} />
              Send an email
            </motion.a>
            <motion.a
              href={siteConfig.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 350, damping: 18 }}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-7 py-3.5 rounded-md font-medium transition-colors shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40"
            >
              <LinkedinIcon size={16} />
              Connect on LinkedIn
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
