"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useState } from "react";
import { canonicalResume } from "@/data/resumes";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();
  const headerBg = useTransform(
    scrollY,
    [0, 100],
    ["rgba(10,10,11,0)", "rgba(10,10,11,0.92)"]
  );
  const headerBorder = useTransform(
    scrollY,
    [0, 100],
    ["rgba(181,255,43,0)", "rgba(181,255,43,0.12)"]
  );
  const headerBlur = useTransform(scrollY, [0, 100], [0, 16]);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-10"
      style={{
        backgroundColor: headerBg,
        borderBottom: useTransform(headerBorder, (v) => `1px solid ${v}`),
        backdropFilter: useTransform(headerBlur, (v) => `blur(${v}px)`),
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16 sm:h-18">
        {/* Brand */}
        <a
          href="#home"
          className="flex items-center gap-3 group"
          aria-label="Go to top"
        >
          {/* SM Monogram */}
          <div className="relative w-9 h-9 flex items-center justify-center border border-accent/30 group-hover:border-accent transition-colors duration-300"
            style={{ clipPath: "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))" }}
          >
            <span className="font-display text-xs font-bold text-accent tracking-wider">SM</span>
          </div>
          <span className="hidden sm:block font-display text-xs tracking-[0.2em] text-text-muted group-hover:text-text transition-colors duration-300">
            SARTHAK MAKKAR
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative font-mono text-xs tracking-[0.15em] text-text-muted uppercase hover:text-accent transition-colors duration-300 py-1"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-accent transition-all duration-300 group-hover:w-full hover:w-full" style={{ transition: "width 0.3s ease" }}
                onMouseEnter={(e) => { (e.target as HTMLElement).style.width = "100%"; }}
                onMouseLeave={(e) => { (e.target as HTMLElement).style.width = "0"; }}
              />
            </a>
          ))}
        </nav>

        {/* Resume CTA + Mobile Toggle */}
        <div className="flex items-center gap-3">
          <a
            href={canonicalResume.href}
            target="_blank"
            rel="noreferrer noopener"
            className="btn-primary !py-2 !px-4 !text-[10px]"
          >
            Download Resume
          </a>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            <motion.span
              className="block w-5 h-[2px] bg-accent origin-center"
              animate={mobileOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="block w-5 h-[2px] bg-accent"
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="block w-5 h-[2px] bg-accent origin-center"
              animate={mobileOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.nav
        className="md:hidden overflow-hidden"
        initial={false}
        animate={mobileOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.3 }}
        aria-label="Mobile navigation"
      >
        <div className="pb-6 pt-2 flex flex-col gap-4 border-t border-border-subtle">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="font-mono text-sm tracking-[0.15em] text-text-muted uppercase hover:text-accent transition-colors duration-300 px-2 py-1"
            >
              {link.label}
            </a>
          ))}
        </div>
      </motion.nav>
    </motion.header>
  );
}
