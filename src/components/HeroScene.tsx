"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { Variants } from "framer-motion";
import Image from "next/image";
import { profile } from "@/data/profile";
import { canonicalResume } from "@/data/resumes";

/* ─── Layer 3: Deterministic Road Light Streaks (Hydration-safe) ─── */
const ROAD_STREAKS = [
  { id: "s1", top: "60%", height: 1.5, opacity: 0.32, duration: 1.2, delay: 0.1, color: "rgba(181,255,43,0.4)" },
  { id: "s2", top: "65%", height: 2, opacity: 0.38, duration: 1.0, delay: 0.35, color: "rgba(0,240,255,0.35)" },
  { id: "s3", top: "71%", height: 2.5, opacity: 0.45, duration: 0.85, delay: 0.2, color: "rgba(181,255,43,0.5)" },
  { id: "s4", top: "77%", height: 1.5, opacity: 0.35, duration: 1.1, delay: 0.45, color: "rgba(0,240,255,0.4)" },
  { id: "s5", top: "83%", height: 3, opacity: 0.48, duration: 0.8, delay: 0.25, color: "rgba(181,255,43,0.45)" },
  { id: "s6", top: "88%", height: 2, opacity: 0.32, duration: 0.95, delay: 0.5, color: "rgba(0,240,255,0.3)" },
  { id: "s7", top: "68%", height: 1.5, opacity: 0.25, duration: 1.3, delay: 0.65, color: "rgba(181,255,43,0.35)" },
  { id: "s8", top: "79%", height: 2, opacity: 0.42, duration: 0.9, delay: 0.15, color: "rgba(0,240,255,0.45)" },
] as const;

const ROAD_LANES = [
  { id: "l1", top: "62%", height: 1, opacity: 0.15, duration: 3.0, delay: 0.1 },
  { id: "l2", top: "70%", height: 1.5, opacity: 0.22, duration: 2.5, delay: 0.3 },
  { id: "l3", top: "80%", height: 2, opacity: 0.26, duration: 2.2, delay: 0.15 },
  { id: "l4", top: "91%", height: 1.5, opacity: 0.18, duration: 2.8, delay: 0.5 },
] as const;

function RoadStreaks() {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[3]" aria-hidden="true">
      {/* High-speed road light streaks */}
      {ROAD_STREAKS.map((s) => (
        <motion.div
          key={s.id}
          className="absolute left-0 w-full"
          style={{
            top: s.top,
            height: `${s.height}px`,
            background: `linear-gradient(90deg, transparent 0%, ${s.color} 50%, transparent 100%)`,
          }}
          initial={{ x: "100vw", opacity: 0 }}
          animate={{ x: "-100vw", opacity: [0, s.opacity, s.opacity, 0] }}
          transition={{
            duration: s.duration,
            delay: 0.2 + s.delay,
            ease: "linear",
            repeat: Infinity,
            repeatDelay: 1.8 + s.delay,
          }}
        />
      ))}

      {/* Continuous highway lane dividers */}
      {ROAD_LANES.map((lane) => (
        <motion.div
          key={lane.id}
          className="absolute left-0"
          style={{
            top: lane.top,
            width: "200%",
            height: `${lane.height}px`,
            background: `linear-gradient(90deg, transparent 0%, rgba(181,255,43,${lane.opacity}) 25%, rgba(0,240,255,${lane.opacity}) 50%, rgba(181,255,43,${lane.opacity}) 75%, transparent 100%)`,
          }}
          initial={{ x: "0%" }}
          animate={{ x: "-50%" }}
          transition={{
            duration: lane.duration,
            delay: lane.delay,
            ease: "linear",
            repeat: Infinity,
          }}
        />
      ))}
    </div>
  );
}

/* ─── Layer 4: Cinematic Multi-Phase Driving Sequence ─── */
function CarMotionLayer({ onTrigger }: { onTrigger: () => void }) {
  const prefersReduced = useReducedMotion();
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    // Orchestrated reveal: start revealing text as the car crosses the focal acceleration zone (1.25s)
    const timer = setTimeout(() => {
      onTrigger();
    }, 1250);
    return () => clearTimeout(timer);
  }, [onTrigger]);

  return (
    <div
      className="absolute inset-x-0 bottom-0 top-0 overflow-hidden pointer-events-none z-[5] flex items-end justify-center lg:justify-end lg:pr-[6vw] pb-3 sm:pb-5 lg:pb-8"
      aria-hidden="true"
    >
      <motion.div
        className="relative w-[86vw] max-w-[380px] sm:max-w-[440px] md:max-w-[490px] lg:max-w-[620px] xl:max-w-[700px]"
        initial={
          prefersReduced
            ? { opacity: 0, scale: 0.98 }
            : {
                x: "-35vw",
                y: "-75px",
                scale: 0.38,
                rotate: -3.5,
                opacity: 0,
                filter: "blur(4px) brightness(0.6)",
              }
        }
        animate={
          prefersReduced
            ? { opacity: 1, scale: 1 }
            : settled
            ? {
                x: [0, 1.8, -1.2, 0],
                y: [0, -3.0, 1.2, 0],
                scale: 1.0,
                rotate: 0,
                opacity: 1.0,
                filter: "blur(0px) brightness(1.0)",
              }
            : {
                x: ["-35vw", "-18vw", "6vw", "0vw"],
                y: ["-75px", "-32px", "4px", "0px"],
                scale: [0.38, 0.68, 0.96, 1.0],
                rotate: [-3.5, -1.8, 0, 0],
                opacity: [0, 0.85, 1.0, 1.0],
                filter: [
                  "blur(4px) brightness(0.6)",
                  "blur(2px) brightness(0.85)",
                  "blur(0.5px) brightness(1.08)",
                  "blur(0px) brightness(1.0)",
                ],
              }
        }
        transition={
          prefersReduced
            ? { duration: 0.6, delay: 0.2 }
            : settled
            ? {
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }
            : {
                duration: 2.2,
                delay: 0.25,
                times: [0, 0.32, 0.72, 1.0],
                ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
              }
        }
        onAnimationComplete={() => {
          if (!settled) {
            setSettled(true);
          }
        }}
      >
        {/* Dynamic Inverted Wet Road Reflection directly touching tire contact line */}
        <motion.div
          className="absolute top-[97%] left-0 right-0 h-full pointer-events-none opacity-25 overflow-hidden"
          style={{
            transform: "scaleY(-0.35)",
            filter: "blur(6px)",
            maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, transparent 65%)",
            WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, transparent 65%)",
          }}
        >
          <Image
            src="/assets/hero-car-aligned.png"
            alt=""
            width={752}
            height={281}
            className="w-full h-auto select-none"
          />
        </motion.div>

        {/* Dynamic Underbody Neon Glow onto wet asphalt */}
        <motion.div
          className="absolute -bottom-2 left-[16%] right-[14%] h-7 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at center, rgba(181,255,43,0.55) 0%, rgba(0,240,255,0.25) 50%, transparent 75%)",
            filter: "blur(12px)",
          }}
          animate={settled ? { opacity: [0.65, 0.9, 0.65], scaleX: [0.96, 1.02, 0.96] } : { opacity: [0, 0.7, 1.0] }}
          transition={settled ? { duration: 2.4, repeat: Infinity, ease: "easeInOut" } : { duration: 1.8, delay: 0.3 }}
        />

        {/* Taillight Velocity Speed Trail behind the rear spoiler */}
        <motion.div
          className="absolute -left-28 sm:-left-44 top-[25%] w-32 sm:w-48 h-12 pointer-events-none"
          style={{
            background: "linear-gradient(90deg, transparent 0%, rgba(255,45,85,0.02) 20%, rgba(255,45,85,0.4) 70%, rgba(181,255,43,0.3) 100%)",
            filter: "blur(7px)",
            transformOrigin: "right center",
          }}
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: [0, 0.9, 0.35], scaleX: [0, 1.4, 0.8] }}
          transition={{ duration: 1.8, delay: 0.4 }}
        />

        {/* Ground Contact Shadows directly seated beneath rear and front tires */}
        <div
          className="absolute -bottom-1 left-[12%] w-[26%] h-3 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at center, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.6) 60%, transparent 85%)",
            filter: "blur(3px)",
          }}
        />
        <div
          className="absolute -bottom-1 right-[10%] w-[22%] h-3 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at center, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.5) 60%, transparent 85%)",
            filter: "blur(3px)",
          }}
        />
        <div
          className="absolute -bottom-1 left-[8%] right-[6%] h-3.5 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at center, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.4) 70%, transparent 90%)",
            filter: "blur(4px)",
          }}
        />

        {/* The Cyber Supercar — Aligned to Road Perspective */}
        <Image
          src="/assets/hero-car-aligned.png"
          alt=""
          width={752}
          height={281}
          priority
          sizes="(max-width: 640px) 86vw, (max-width: 1024px) 490px, 700px"
          className="relative z-10 w-full h-auto drop-shadow-2xl select-none pointer-events-none"
          style={{
            filter: "drop-shadow(0 15px 30px rgba(0,0,0,0.85)) drop-shadow(0 0 25px rgba(181,255,43,0.2))",
          }}
        />
      </motion.div>
    </div>
  );
}

/* ─── Layer 5: Foreground Speed Streaks (Fastest layer for extreme depth) ─── */
function ForegroundSpeedEffects() {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[6]" aria-hidden="true">
      {/* High-speed foreground light streaks rushing past the camera */}
      <motion.div
        className="absolute left-0 w-full h-[2px]"
        style={{
          top: "69%",
          background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.75) 50%, rgba(181,255,43,0.85) 80%, transparent 100%)",
          filter: "blur(1px)",
        }}
        initial={{ x: "100vw", opacity: 0 }}
        animate={{ x: "-100vw", opacity: [0, 1, 1, 0] }}
        transition={{ duration: 0.75, delay: 0.5, ease: "linear", repeat: Infinity, repeatDelay: 3.5 }}
      />
      <motion.div
        className="absolute left-0 w-full h-[3px]"
        style={{
          top: "84%",
          background: "linear-gradient(90deg, transparent 0%, rgba(0,240,255,0.7) 40%, rgba(181,255,43,0.95) 70%, transparent 100%)",
          filter: "blur(1px)",
        }}
        initial={{ x: "100vw", opacity: 0 }}
        animate={{ x: "-100vw", opacity: [0, 1, 1, 0] }}
        transition={{ duration: 0.65, delay: 0.8, ease: "linear", repeat: Infinity, repeatDelay: 4.2 }}
      />
    </div>
  );
}

/* ─── Layer 7 & 8: Hero Typography, Protected HUD Panel & High-Contrast CTAs ─── */
function HeroContent({ triggered }: { triggered: boolean }) {
  const prefersReduced = useReducedMotion();

  const easeTuple: [number, number, number, number] = [0.22, 1, 0.36, 1];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: prefersReduced ? 0.06 : 0.12,
        delayChildren: prefersReduced ? 0.05 : 0.65,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: prefersReduced
      ? { opacity: 0 }
      : { opacity: 0, y: 24 },
    visible: prefersReduced
      ? { opacity: 1, transition: { duration: 0.3 } }
      : {
          opacity: 1,
          y: 0,
          transition: { duration: 0.65, ease: easeTuple },
        },
  };

  return (
    <motion.div
      className="relative z-[20] w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-16 sm:pt-20 lg:pt-24 flex flex-col items-start text-left pointer-events-auto"
      variants={containerVariants}
      initial="hidden"
      animate={triggered ? "visible" : "hidden"}
    >
      {/* 1. Top HUD Eyebrow */}
      <motion.div
        variants={itemVariants}
        className="flex items-center gap-3 mb-3 sm:mb-5"
      >
        <span className="inline-flex items-center gap-1.5 font-mono text-[11px] sm:text-xs tracking-[0.25em] text-accent uppercase px-3 py-1 border border-accent/40 bg-black/70 backdrop-blur-md shadow-[0_0_15px_rgba(181,255,43,0.15)]">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          PORTFOLIO // 2026
        </span>
        <span className="hidden sm:inline-block font-mono text-[10px] tracking-[0.2em] text-text-dim uppercase">
          SYS.ONLINE // READY
        </span>
      </motion.div>

      {/* Dominant Gaming Title: 2. SARTHAK reveals -> 3. MAKKAR reveals */}
      <div className="mb-4 sm:mb-6">
        <h1 className="leading-[0.88] tracking-tight select-none">
          <motion.span
            variants={itemVariants}
            className="block font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-text tracking-tighter drop-shadow-lg"
          >
            {profile.name.first}
          </motion.span>
          <motion.span
            variants={itemVariants}
            className="block font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-accent text-glow tracking-tighter drop-shadow-xl mt-0.5 sm:mt-1"
          >
            {profile.name.last}
          </motion.span>
        </h1>
      </div>

      {/* Protected Readability Region — Cyber Glass HUD Panel */}
      <motion.div
        variants={itemVariants}
        className="relative w-full max-w-xl lg:max-w-2xl p-5 sm:p-6 md:p-7 border border-accent/30 bg-[#0a0a0c]/90 backdrop-blur-md mb-6 sm:mb-8"
        style={{
          clipPath:
            "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))",
          boxShadow: "0 20px 40px -10px rgba(0,0,0,0.9), inset 0 1px 0 rgba(181,255,43,0.3)",
        }}
      >
        {/* Accent corner bracket indicators */}
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-accent pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-accent pointer-events-none" />

        {/* 4. Role line */}
        <motion.p
          variants={itemVariants}
          className="font-mono text-xs sm:text-sm tracking-[0.25em] text-accent font-semibold uppercase mb-2.5 flex items-center gap-2"
        >
          <span className="text-text-dim">{"//"}</span>
          <span>{profile.tagline}</span>
        </motion.p>

        {/* 5. Value proposition — pure white with explicit color for 100% WCAG AAA contrast */}
        <motion.p
          variants={itemVariants}
          className="font-sans text-sm sm:text-base md:text-lg font-medium leading-relaxed"
          style={{ color: "#ffffff" }}
        >
          {profile.valueProp}
        </motion.p>
      </motion.div>

      {/* 6. High-Contrast CTA Controls (Positioned at z-[25] above all decorative visual layers) */}
      <motion.div
        variants={itemVariants}
        className="relative z-[25] flex flex-wrap items-center gap-3.5 sm:gap-5"
      >
        <a
          href="#projects"
          className="font-display text-xs sm:text-sm font-bold tracking-wider px-6 py-3.5 bg-accent text-black hover:bg-accent/90 shadow-[0_0_20px_rgba(181,255,43,0.4)] flex items-center gap-2 transition-all duration-200"
          style={{
            clipPath:
              "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))",
          }}
        >
          VIEW PROJECTS
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <path d="M7 17l9.2-9.2M17 17V7H7" />
          </svg>
        </a>

        <a
          href={canonicalResume.href}
          target="_blank"
          rel="noreferrer noopener"
          className="font-display text-xs sm:text-sm font-bold tracking-wider px-6 py-3.5 border-2 border-accent text-accent bg-black/70 hover:bg-accent hover:text-black shadow-[0_0_15px_rgba(181,255,43,0.25)] backdrop-blur-md flex items-center gap-2 transition-all duration-200"
          style={{
            clipPath:
              "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))",
          }}
        >
          RESUME
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M10 14L21 3" />
          </svg>
        </a>

        <a
          href={profile.github.url}
          target="_blank"
          rel="noreferrer noopener"
          className="font-display text-xs sm:text-sm font-bold tracking-wider px-6 py-3.5 border-2 border-white/35 text-white bg-black/70 hover:border-accent hover:text-accent hover:shadow-[0_0_15px_rgba(181,255,43,0.25)] backdrop-blur-md flex items-center gap-2 transition-all duration-200"
          style={{
            clipPath:
              "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))",
          }}
        >
          GITHUB
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M10 14L21 3" />
          </svg>
        </a>
      </motion.div>
    </motion.div>
  );
}

/* ─── Layer 9: Fully Clickable & Accessible Scroll Indicator ─── */
function ScrollPrompt({ visible }: { visible: boolean }) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById("about");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.a
      href="#about"
      onClick={handleClick}
      aria-label="Scroll to About section"
      className="group absolute bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 z-[30] flex flex-col items-center gap-1.5 pointer-events-auto focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm px-3 py-1 cursor-pointer transition-all"
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.3em] text-text-dim uppercase group-hover:text-accent transition-colors">
        Scroll to Explore
      </span>
      <motion.svg
        width="14"
        height="18"
        viewBox="0 0 16 24"
        fill="none"
        className="text-accent group-hover:drop-shadow-[0_0_8px_rgba(181,255,43,0.8)] transition-all"
        animate={{ y: [0, 5, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      >
        <path
          d="M7.3 17.3l-5.6-5.6a1 1 0 011.4-1.4L8 15.2l4.9-4.9a1 1 0 011.4 1.4l-5.6 5.6a1 1 0 01-1.4 0z"
          fill="currentColor"
        />
      </motion.svg>
    </motion.a>
  );
}

/* ─── Main Hero Scene ─── */
export default function HeroScene() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  // Trigger content reveal once after mount / car movement
  const [triggered, setTriggered] = useState(false);

  return (
    <section
      ref={ref}
      id="home"
      className="relative h-screen min-h-[640px] max-h-[1200px] overflow-hidden flex flex-col justify-between"
      aria-label="Hero introduction"
    >
      {/* ─── Layer 1: Dark city night environment with subtle camera pan & scroll parallax ─── */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ scale: 1.05, x: "1.2%" }}
        animate={{ scale: 1.0, x: "0%" }}
        transition={{ duration: 3.5, ease: "easeOut" }}
        style={{ y: bgY, opacity: heroOpacity }}
      >
        <Image
          src="/assets/hero-bg-v2.jpg"
          alt=""
          fill
          priority
          className="object-cover object-bottom sm:object-center"
          sizes="100vw"
          quality={75}
        />
        {/* Night atmosphere grading */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 32%, rgba(10,10,11,0.1) 0%, rgba(10,10,11,0.5) 60%, rgba(10,10,11,0.85) 100%)",
          }}
        />
      </motion.div>

      {/* ─── Layer 2: Distant Horizon Atmospheric Light Bloom ─── */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse at 50% 65%, rgba(181,255,43,0.05) 0%, rgba(0,240,255,0.04) 35%, transparent 70%)",
        }}
      />

      {/* ─── Layer 3: Road surface sheen ─── */}
      <div
        className="absolute inset-x-0 bottom-0 h-[38%] z-[2] pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(10,10,11,0.1) 40%, rgba(10,10,11,0.45) 100%)",
        }}
      />

      {/* ─── Layer 3: Moving road/light streaks (Deterministic) ─── */}
      <RoadStreaks />

      {/* ─── Layer 4: Car with cinematic perspective driving entrance ─── */}
      <CarMotionLayer onTrigger={() => setTriggered(true)} />

      {/* ─── Layer 5: Foreground speed motion effects ─── */}
      <ForegroundSpeedEffects />

      {/* ─── Layer 6: Atmosphere vignettes (Placed at z-[7], strictly BELOW text & CTAs) ─── */}
      <div
        className="absolute top-0 inset-x-0 h-24 z-[7] pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, rgba(10,10,11,0.8), transparent)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 inset-x-0 h-28 z-[7] pointer-events-none"
        style={{
          background: "linear-gradient(to top, var(--color-base), transparent)",
        }}
        aria-hidden="true"
      />

      {/* ─── Layer 7 & 8: Hero typography, clean readable panel & CTA controls (z-[20] and z-[25]) ─── */}
      <HeroContent triggered={triggered} />

      {/* ─── Layer 9: HUD / Scroll indicator (z-[30]) ─── */}
      <ScrollPrompt visible={triggered} />
    </section>
  );
}
