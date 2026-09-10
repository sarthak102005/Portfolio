"use client";

import { motion, useInView } from "framer-motion";
import type { Variants } from "framer-motion";
import { useRef } from "react";
import { profile } from "@/data/profile";

const stats = [
  { label: "Degree", value: "B.Tech IT", sub: "BPIT" },
  { label: "Period", value: "2023–2027", sub: "Graduating Jul 2027" },
  { label: "CGPA", value: profile.education.cgpa, sub: "/ 10.0" },
  { label: "Hackhazards '24", value: "Top 15", sub: "National Hackathon" },
];

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.12 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
    },
  };

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-10"
      aria-labelledby="about-heading"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Section Label */}
          <motion.div variants={itemVariants} className="mb-12">
            <p className="font-mono text-xs tracking-[0.3em] text-accent uppercase mb-3">
              {"// ABOUT"}
            </p>
            <h2
              id="about-heading"
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-text tracking-tight"
            >
              Who I Am
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Text */}
            <motion.div variants={itemVariants} className="lg:col-span-3">
              <p className="text-text-muted text-base sm:text-lg leading-relaxed mb-6">
                {profile.about}
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="font-mono text-xs tracking-wider text-accent px-3 py-1.5 border border-accent/20 bg-accent-dim/30"
                  style={{ clipPath: "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))" }}
                >
                  {profile.location}
                </span>
                <span className="font-mono text-xs tracking-wider text-cyan px-3 py-1.5 border border-cyan/20 bg-cyan-dim/30"
                  style={{ clipPath: "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))" }}
                >
                  {profile.education.institution}
                </span>
              </div>
            </motion.div>

            {/* Stat Grid */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-2 grid grid-cols-2 gap-3"
            >
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="card-glass p-4 sm:p-5 flex flex-col justify-between"
                  style={{ clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))" }}
                >
                  <p className="font-mono text-[10px] tracking-[0.2em] text-text-dim uppercase mb-2">
                    {stat.label}
                  </p>
                  <p className="font-display text-xl sm:text-2xl font-bold text-accent mb-0.5">
                    {stat.value}
                  </p>
                  <p className="font-mono text-[10px] text-text-muted">
                    {stat.sub}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Section divider */}
      <div className="section-divider mt-24 sm:mt-32" />
    </section>
  );
}
