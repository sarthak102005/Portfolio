"use client";

import { motion, AnimatePresence, useScroll, useTransform, type Variants } from "framer-motion";
import { useState, useEffect, useRef, useCallback, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { canonicalResume } from "@/data/resumes";

const emptySubscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

function useIsMounted() {
  return useSyncExternalStore(emptySubscribe, getClientSnapshot, getServerSnapshot);
}

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

const mobileNavItems = [
  { num: "01", label: "HOME", href: "#home", id: "home" },
  { num: "02", label: "ABOUT", href: "#about", id: "about" },
  { num: "03", label: "PROJECTS", href: "#projects", id: "projects" },
  { num: "04", label: "EXPERIENCE", href: "#experience", id: "experience" },
  { num: "05", label: "CONTACT", href: "#contact", id: "contact" },
];

const drawerVariants: Variants = {
  closed: {
    x: "100%",
    transition: { duration: 0.3, ease: [0.32, 0, 0.67, 0] as [number, number, number, number] },
  },
  open: {
    x: "0%",
    transition: { duration: 0.38, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

const backdropVariants: Variants = {
  closed: { opacity: 0, transition: { duration: 0.25 } },
  open: { opacity: 1, transition: { duration: 0.3, ease: "easeOut" } },
};

const navContainerVariants: Variants = {
  closed: { opacity: 0 },
  open: {
    opacity: 1,
    transition: {
      staggerChildren: 0.035,
      delayChildren: 0.05,
    },
  },
};

const navItemVariants: Variants = {
  closed: { opacity: 0, x: 16 },
  open: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

export default function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const mounted = useIsMounted();

  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLElement>(null);
  const prevOpenRef = useRef(false);

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

  // Track active section for high-contrast mobile indicator
  useEffect(() => {
    const sectionIds = ["home", "about", "projects", "experience", "contact"];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 220;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile drawer is active
  useEffect(() => {
    if (mobileOpen) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [mobileOpen]);

  // Escape key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileOpen) {
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen]);

  // Focus management: focus close button when opening, restore to hamburger when closing
  useEffect(() => {
    if (mobileOpen && !prevOpenRef.current) {
      const timer = setTimeout(() => {
        closeBtnRef.current?.focus();
      }, 60);
      return () => clearTimeout(timer);
    } else if (!mobileOpen && prevOpenRef.current) {
      hamburgerRef.current?.focus();
    }
    prevOpenRef.current = mobileOpen;
  }, [mobileOpen]);

  // Trap focus inside open drawer
  const handleDrawerKeyDown = useCallback((e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key !== "Tab" || !drawerRef.current) return;
    const focusable = drawerRef.current.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length === 0) return;

    const firstEl = focusable[0];
    const lastEl = focusable[focusable.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === firstEl) {
        lastEl.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastEl) {
        firstEl.focus();
        e.preventDefault();
      }
    }
  }, []);

  // Handle smooth scroll navigation on mobile
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    const targetId = href.replace("#", "");
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
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
            <div
              className="relative w-9 h-9 flex items-center justify-center border border-accent/30 group-hover:border-accent transition-colors duration-300"
              style={{
                clipPath:
                  "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))",
              }}
            >
              <span className="font-display text-xs font-bold text-accent tracking-wider">
                SM
              </span>
            </div>
            <span className="hidden sm:block font-display text-xs tracking-[0.2em] text-text-muted group-hover:text-text transition-colors duration-300">
              SARTHAK MAKKAR
            </span>
          </a>

          {/* Desktop Nav - 100% Unchanged */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative font-mono text-xs tracking-[0.15em] text-text-muted uppercase hover:text-accent transition-colors duration-300 py-1"
              >
                {link.label}
                <span
                  className="absolute bottom-0 left-0 w-0 h-[1px] bg-accent transition-all duration-300 group-hover:w-full hover:w-full"
                  style={{ transition: "width 0.3s ease" }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLElement).style.width = "100%";
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLElement).style.width = "0";
                  }}
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

            {/* Mobile hamburger button with 44x44 touch target */}
            <button
              ref={hamburgerRef}
              className="md:hidden min-w-[44px] min-h-[44px] w-11 h-11 flex flex-col items-center justify-center gap-1.5 p-2 rounded-sm border border-accent/25 hover:border-accent/60 bg-base-card/80 hover:bg-surface transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav-drawer"
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
      </motion.header>

      {/* Cinematic Right-Side Navigation Drawer (Rendered at Body Root via Portal) */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {mobileOpen && (
              <div className="md:hidden">
                {/* 1. Full-Screen Dimmed Backdrop */}
                <motion.div
                  key="mobile-backdrop"
                  variants={backdropVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  onClick={() => setMobileOpen(false)}
                  className="fixed inset-0 z-[80] bg-black/75 backdrop-blur-[4px]"
                  aria-hidden="true"
                />

                {/* 2. Fixed Right-Side HUD Navigation Drawer */}
                <motion.aside
                  id="mobile-nav-drawer"
                  key="mobile-drawer"
                  ref={drawerRef}
                  variants={drawerVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  onKeyDown={handleDrawerKeyDown}
                  role="dialog"
                  aria-modal="true"
                  aria-label="Mobile Navigation Dashboard"
                  className="fixed top-0 right-0 z-[90] h-[100dvh] w-[82vw] max-w-[420px] bg-[#08090a] border-l border-accent/40 shadow-[-24px_0_60px_rgba(0,0,0,0.95)] flex flex-col justify-between overflow-y-auto overscroll-contain p-5 sm:p-6"
                >
                  {/* Subtle technical scanline overlay */}
                  <div
                    className="pointer-events-none absolute inset-0 opacity-[0.035]"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)",
                    }}
                    aria-hidden="true"
                  />

                  {/* Top Header */}
                  <div className="relative z-10 flex items-center justify-between pb-5 border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 flex items-center justify-center border border-accent/40 bg-[#0d0e12]"
                        style={{
                          clipPath:
                            "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))",
                        }}
                      >
                        <span className="font-display text-sm font-bold text-accent tracking-wider">
                          SM
                        </span>
                      </div>
                      <div>
                        <div className="font-display text-xs sm:text-sm font-bold tracking-[0.2em] text-white">
                          SARTHAK MAKKAR
                        </div>
                        <div className="font-mono text-[9px] tracking-[0.2em] text-cyan flex items-center gap-1.5 mt-0.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                          SYS_NAV // CONTROL_PANEL
                        </div>
                      </div>
                    </div>

                    {/* Prominent Close Button with 44x44 touch target */}
                    <button
                      ref={closeBtnRef}
                      onClick={() => setMobileOpen(false)}
                      aria-label="Close navigation"
                      className="min-w-[44px] min-h-[44px] w-11 h-11 flex items-center justify-center border border-accent/35 hover:border-accent bg-[#0d0e12] hover:bg-accent/15 active:scale-95 transition-all text-accent group rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent cursor-pointer"
                    >
                      <svg
                        className="w-5 h-5 transition-transform duration-200 group-hover:scale-110 text-accent"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  {/* Navigation Options */}
                  <motion.nav
                    variants={navContainerVariants}
                    initial="closed"
                    animate="open"
                    className="relative z-10 flex flex-col py-4 sm:py-6 space-y-1 sm:space-y-1.5 flex-1 justify-center"
                    aria-label="Navigation Links"
                  >
                    {mobileNavItems.map((item) => {
                      const isActive = activeSection === item.id;
                      return (
                        <motion.div key={item.id} variants={navItemVariants}>
                          <a
                            href={item.href}
                            onClick={(e) => handleNavClick(e, item.href)}
                            className={`group relative flex items-center justify-between py-2.5 sm:py-3 px-3 rounded-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                              isActive
                                ? "bg-accent/10 border-l-2 border-accent pl-3.5 text-accent translate-x-1"
                                : "hover:bg-white/[0.04] text-white hover:text-accent hover:translate-x-1 border-l-2 border-transparent"
                            }`}
                          >
                            <div className="flex items-baseline gap-4">
                              <span
                                className={`font-mono text-xs sm:text-sm tracking-widest font-semibold transition-colors ${
                                  isActive
                                    ? "text-accent"
                                    : "text-text-muted group-hover:text-accent"
                                }`}
                              >
                                {item.num}
                              </span>
                              <span
                                className={`font-display text-2xl sm:text-3xl font-bold tracking-wider transition-colors ${
                                  isActive
                                    ? "text-accent drop-shadow-[0_0_12px_rgba(181,255,43,0.5)]"
                                    : "text-white group-hover:text-accent"
                                }`}
                              >
                                {item.label}
                              </span>
                            </div>

                            {isActive ? (
                              <div className="flex items-center gap-1.5 font-mono text-[9px] tracking-widest text-accent font-bold px-2 py-0.5 border border-accent/40 bg-accent/15 rounded-xs">
                                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                                ACTIVE
                              </div>
                            ) : (
                              <span className="font-mono text-sm text-text-dim group-hover:text-accent group-hover:translate-x-1 transition-all">
                                →
                              </span>
                            )}
                          </a>
                          <div className="h-[1px] w-full bg-gradient-to-r from-white/10 via-white/5 to-transparent mt-1" />
                        </motion.div>
                      );
                    })}
                  </motion.nav>

                  {/* Drawer Footer with Status HUD & Canonical Resume CTA */}
                  <div className="relative z-10 pt-4 border-t border-white/10 space-y-4">
                    {/* Status HUD Block */}
                    <div className="p-3 bg-[#0d0e12] border border-white/10 rounded-sm font-mono text-[10px] tracking-wider space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-text-dim">SYSTEM STATUS</span>
                        <span className="text-accent flex items-center gap-1.5 font-bold">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                          ONLINE
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-text-dim">AVAILABLE FOR</span>
                        <span className="text-text font-medium text-right">
                          BACKEND • FULL STACK • GENAI
                        </span>
                      </div>
                    </div>

                    {/* Download Resume Button */}
                    <a
                      href={canonicalResume.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="btn-primary w-full justify-center !py-3.5 !text-xs tracking-[0.15em] flex items-center gap-2 shadow-[0_0_20px_rgba(181,255,43,0.25)]"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V3"
                        />
                      </svg>
                      DOWNLOAD RESUME
                    </a>
                  </div>
                </motion.aside>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
