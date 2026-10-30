"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PageLoader() {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const duration = 1400; // ms to go 0→100
    const interval = 16;   // ~60fps
    const steps = duration / interval;
    let current = 0;

    const timer = setInterval(() => {
      current += 1;
      // Ease-out: fast start, slow finish
      const progress = 1 - Math.pow(1 - current / steps, 2);
      const value = Math.min(Math.floor(progress * 100), 100);
      setCount(value);

      if (current >= steps) {
        clearInterval(timer);
        setCount(100);
        // Small pause at 100 before fade-out
        setTimeout(() => setDone(true), 350);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const pad = (n: number) => String(n).padStart(3, "0");

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black"
        >
          {/* Initials logo */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-6 select-none"
          >
            <span
              className="text-4xl font-bold tracking-tight"
              style={{
                background: "linear-gradient(135deg, #3b82f6, #60a5fa)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontFamily: "var(--font-inter), sans-serif",
                letterSpacing: "-0.03em",
              }}
            >
              HS
            </span>
          </motion.div>

          {/* Progress bar track */}
          <div className="relative w-64 h-px bg-zinc-800 mb-4">
            <motion.div
              className="absolute left-0 top-0 h-full"
              style={{
                width: `${count}%`,
                background: "linear-gradient(90deg, #1d4ed8, #3b82f6, #60a5fa)",
                boxShadow: "0 0 8px rgba(59,130,246,0.6)",
              }}
            />
          </div>

          {/* Counter text */}
          <p
            className="text-zinc-500 text-xs tracking-[0.25em] uppercase"
            style={{ fontFamily: "monospace" }}
          >
            Loading {pad(count)}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
