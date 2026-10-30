"use client";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import type { SiteConfig } from "@/sanity/lib/types";

interface Props { siteConfig: SiteConfig }

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Skills", href: "#skills" },
  { label: "Work", href: "#work" },
  { label: "Play", href: "#pipeline-rescue" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
];

export default function Navigation({ siteConfig }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-[#222] backdrop-blur-md bg-black/80"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#home"
          className="flex items-center gap-2.5 group"
        >
          {/* HS monogram */}
          <span
            className="flex items-center justify-center w-8 h-8 rounded-lg text-sm font-bold tracking-tight select-none"
            style={{
              background: "linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 100%)",
              boxShadow: "0 0 0 1px rgba(59,130,246,0.3)",
              color: "#93c5fd",
            }}
          >
            HS
          </span>
          <span className="text-white font-semibold text-base tracking-tight group-hover:text-blue-400 transition-colors">
            {siteConfig.shortName}
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-5">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-zinc-400 hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href={siteConfig.resumeUrl || `mailto:${siteConfig.email}`}
            target={siteConfig.resumeUrl ? "_blank" : undefined}
            rel="noopener noreferrer"
            className="text-sm bg-blue-600 hover:bg-blue-500 text-white px-4 py-1.5 rounded-md transition-colors font-medium"
          >
            {siteConfig.resumeUrl ? "Résumé" : "Contact me"}
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-zinc-400 hover:text-white transition-colors"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div id="mobile-navigation" className="md:hidden bg-black/95 backdrop-blur-md border-b border-[#222]">
          <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="text-zinc-300 hover:text-white transition-colors text-lg"
              >
                {link.label}
              </a>
            ))}
            <div className="border-t border-[#222] pt-4">
              <a
                href={siteConfig.resumeUrl || `mailto:${siteConfig.email}`}
                target={siteConfig.resumeUrl ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md transition-colors font-medium text-center block"
              >
                {siteConfig.resumeUrl ? "Résumé" : "Contact me"}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
