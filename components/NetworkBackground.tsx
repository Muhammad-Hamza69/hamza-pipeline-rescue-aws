"use client";
import { useEffect, useRef } from "react";

const FLOATING_BADGES = [
  { label: "AWS",        top: "12%",  left: "6%",   dur: 3.8 },
  { label: "PySpark",    top: "8%",   left: "28%",  dur: 5.1 },
  { label: "LangChain",  top: "6%",   left: "52%",  dur: 4.4 },
  { label: "Snowflake",  top: "14%",  right: "10%", dur: 3.4 },
  { label: "Airflow",    top: "35%",  right: "6%",  dur: 5.6 },
  { label: "Databricks", top: "55%",  right: "8%",  dur: 4.2 },
  { label: "Kafka",      top: "72%",  right: "12%", dur: 3.5 },
  { label: "RAG",        top: "82%",  right: "5%",  dur: 4.9 },
  { label: "dbt",        top: "78%",  left: "8%",   dur: 3.2 },
  { label: "Docker",     top: "60%",  left: "5%",   dur: 5.3 },
  { label: "OpenAI",     top: "42%",  left: "4%",   dur: 4.7 },
  { label: "Terraform",  top: "88%",  left: "30%",  dur: 3.9 },
];

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  r: number;
  large: boolean;
  baseVx: number; baseVy: number; // restore speed after mouse passes
}

export default function NetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf: number;
    let particles: Particle[] = [];

    const setSize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const spawn = () => {
      const count = Math.max(40, Math.min(Math.floor((canvas.width * canvas.height) / 10000), 70));
      particles = Array.from({ length: count }, (_, i) => {
        const large = i < Math.floor(count * 0.18);
        const vx = (Math.random() - 0.5) * 0.22;
        const vy = (Math.random() - 0.5) * 0.22;
        return {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx, vy,
          baseVx: vx, baseVy: vy,
          r: large ? Math.random() * 1.5 + 2.5 : Math.random() * 1.0 + 1.0,
          large,
        };
      });
    };

    // ── mouse tracking ──────────────────────────────────────────────────
    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onMouseLeave = () => { mouse.current = null; };
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);

    // ── render loop ─────────────────────────────────────────────────────
    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const m = mouse.current;

      // Move & apply mouse attraction
      for (const p of particles) {
        if (m) {
          const dx = m.x - p.x;
          const dy = m.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const ATTRACT_R = 240;
          if (dist < ATTRACT_R && dist > 0) {
            const force = (1 - dist / ATTRACT_R) * 0.032;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
            // cap speed so it doesn't go wild
            const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
            if (speed > 1.8) { p.vx *= 1.8 / speed; p.vy *= 1.8 / speed; }
          } else {
            // gradually restore natural velocity when far from mouse
            p.vx += (p.baseVx - p.vx) * 0.02;
            p.vy += (p.baseVy - p.vy) * 0.02;
          }
        }

        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      }

      // Particle ↔ particle edges
      const MAX_DIST = 190;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            const t = 1 - dist / MAX_DIST;
            const boost = (particles[i].large || particles[j].large) ? 1.6 : 1;
            const alpha = Math.min(t * t * 0.42 * boost, 0.55);
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(59,130,246,${alpha})`;
            ctx.lineWidth = particles[i].large || particles[j].large ? 0.9 : 0.55;
            ctx.stroke();
          }
        }
      }

      // Mouse ↔ particle edges + cursor glow
      if (m) {
        const MOUSE_R = 210;
        for (const p of particles) {
          const dx = p.x - m.x;
          const dy = p.y - m.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MOUSE_R) {
            const t = 1 - dist / MOUSE_R;
            ctx.beginPath();
            ctx.moveTo(m.x, m.y);
            ctx.lineTo(p.x, p.y);
            ctx.strokeStyle = `rgba(96,165,250,${t * t * 0.7})`;
            ctx.lineWidth = t * 1.4;
            ctx.stroke();
          }
        }

        // Outer halo at cursor
        const halo = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, 35);
        halo.addColorStop(0,   "rgba(147,197,253,0.28)");
        halo.addColorStop(0.5, "rgba(96,165,250,0.10)");
        halo.addColorStop(1,   "rgba(59,130,246,0)");
        ctx.beginPath();
        ctx.arc(m.x, m.y, 35, 0, Math.PI * 2);
        ctx.fillStyle = halo;
        ctx.fill();

        // Cursor core dot
        ctx.beginPath();
        ctx.arc(m.x, m.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(147,197,253,0.92)";
        ctx.fill();
      }

      // Particle nodes
      for (const p of particles) {
        const glowR = p.large ? p.r * 14 : p.r * 9;
        const glowA = p.large ? 0.35 : 0.22;

        const halo = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowR);
        halo.addColorStop(0,   `rgba(59,130,246,${glowA})`);
        halo.addColorStop(0.4, `rgba(59,130,246,${glowA * 0.4})`);
        halo.addColorStop(1,   "rgba(59,130,246,0)");
        ctx.beginPath();
        ctx.arc(p.x, p.y, glowR, 0, Math.PI * 2);
        ctx.fillStyle = halo;
        ctx.fill();

        if (p.large) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r + 1.2, 0, Math.PI * 2);
          ctx.strokeStyle = "rgba(147,197,253,0.35)";
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.large ? "rgba(147,197,253,0.95)" : "rgba(96,165,250,0.88)";
        ctx.fill();
      }

      raf = requestAnimationFrame(tick);
    };

    setSize();
    spawn();
    tick();

    const ro = new ResizeObserver(() => { setSize(); spawn(); });
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">

      {/* Ambient depth */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 20% 80%, rgba(29,78,216,0.18) 0%, transparent 70%)," +
            "radial-gradient(ellipse 55% 50% at 80% 20%, rgba(99,102,241,0.12) 0%, transparent 65%)",
        }}
      />

      {/* Floating blob glows */}
      <div className="absolute rounded-full blur-3xl" style={{
        width:"52vw", height:"52vw", top:"-18%", left:"-12%",
        background:"radial-gradient(circle, rgba(59,130,246,0.22) 0%, transparent 70%)",
        animation:"blobFloat1 14s ease-in-out infinite alternate", opacity:0.85,
      }} />
      <div className="absolute rounded-full blur-3xl" style={{
        width:"42vw", height:"42vw", top:"28%", right:"-12%",
        background:"radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)",
        animation:"blobFloat2 18s ease-in-out infinite alternate", opacity:0.75,
      }} />

      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.035]" style={{
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.9) 1px, transparent 1px)," +
          "linear-gradient(90deg, rgba(255,255,255,0.9) 1px, transparent 1px)",
        backgroundSize:"60px 60px",
        maskImage:"linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
        WebkitMaskImage:"linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
      }} />

      {/* Canvas — pointer-events-auto so it receives mouse events */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ pointerEvents: "auto" }}
      />

      {/* Floating tech badges */}
      {FLOATING_BADGES.map((badge) => (
        <div
          key={badge.label}
          className="absolute hidden md:flex items-center gap-2 border border-blue-500/25 bg-black/55 backdrop-blur-sm text-zinc-300 text-xs px-3 py-1.5 rounded-lg select-none"
          style={{
            top: badge.top,
            left: "left" in badge ? badge.left : undefined,
            right: "right" in badge ? badge.right : undefined,
            animation: `badgeFloat ${badge.dur}s ease-in-out infinite alternate`,
            boxShadow: "0 0 12px rgba(59,130,246,0.08)",
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400/80" />
          {badge.label}
        </div>
      ))}

      <style>{`
        @keyframes blobFloat1 {
          0%   { transform: translate(0,0) scale(1); }
          100% { transform: translate(6%,8%) scale(1.12); }
        }
        @keyframes blobFloat2 {
          0%   { transform: translate(0,0) scale(1); }
          100% { transform: translate(-6%,-8%) scale(1.1); }
        }
        @keyframes badgeFloat {
          0%   { transform: translateY(0px); }
          100% { transform: translateY(-9px); }
        }
      `}</style>
    </div>
  );
}
