"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { skillGroups } from "@/data/skills";

const groupAccents: Record<string, { badge: string; border: string; glow: string; bar: string }> = {
  Backend: {
    badge: "border-accent/40 text-accent bg-accent/10",
    border: "hover:border-accent/50",
    glow: "rgba(181,255,43,0.15)",
    bar: "bg-accent",
  },
  Frontend: {
    badge: "border-cyan/40 text-cyan bg-cyan/10",
    border: "hover:border-cyan/50",
    glow: "rgba(56,189,248,0.15)",
    bar: "bg-cyan",
  },
  "Core CS": {
    badge: "border-accent/40 text-accent bg-accent/10",
    border: "hover:border-accent/50",
    glow: "rgba(181,255,43,0.15)",
    bar: "bg-accent",
  },
  "Applied AI / GenAI": {
    badge: "border-cyan/40 text-cyan bg-cyan/10",
    border: "hover:border-cyan/50",
    glow: "rgba(56,189,248,0.15)",
    bar: "bg-cyan",
  },
};

const groupIcons: Record<string, string> = {
  Backend: "⚙",
  Frontend: "◧",
  "Core CS": "△",
  "Applied AI / GenAI": "◆",
};

const groupSubtitles: Record<string, string> = {
  Backend: "Distributed Systems & APIs",
  Frontend: "Interactive Interfaces & UX",
  "Core CS": "Foundations & Architecture",
  "Applied AI / GenAI": "Pipelines & Evaluation",
};

export default function SkillsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="skills"
      ref={ref}
      className="relative py-28 sm:py-36 px-4 sm:px-6 lg:px-10"
      aria-labelledby="skills-heading"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header with cyber telemetry */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14 sm:mb-16 flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/[0.06] pb-6"
        >
          <div>
            <p className="font-mono text-xs tracking-[0.3em] text-accent uppercase mb-3">
              {"// SKILLS"}
            </p>
            <h2
              id="skills-heading"
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-text tracking-tight"
            >
              Tech Stack
            </h2>
          </div>
          <div className="font-mono text-xs text-text-dim tracking-widest uppercase flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span>4 CLUSTERS {"//"} PRODUCTION-GRADE ARCHITECTURE</span>
          </div>
        </motion.div>

        {/* Large, Substantial Tech Stack Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {skillGroups.map((group, gi) => {
            const config = groupAccents[group.title] || groupAccents.Backend;

            return (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 35 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: gi * 0.12 }}
                className={`card-glass relative flex flex-col justify-between p-7 sm:p-8 lg:p-9 min-h-[380px] sm:min-h-[420px] lg:min-h-[450px] border border-white/[0.08] ${config.border} transition-all duration-300 group`}
                style={{
                  clipPath:
                    "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))",
                  boxShadow: `0 20px 40px -15px rgba(0,0,0,0.7)`,
                }}
              >
                {/* Decorative Chamfered Corner Accent */}
                <div
                  className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 pointer-events-none transition-colors duration-300"
                  style={{ borderColor: "rgba(181,255,43,0.3)" }}
                />
                <div
                  className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 pointer-events-none transition-colors duration-300"
                  style={{ borderColor: "rgba(181,255,43,0.3)" }}
                />

                {/* Card Top: Cluster Index & Title with generous whitespace */}
                <div>
                  <div className="flex items-center justify-between gap-3 mb-6">
                    <span className="font-mono text-xs tracking-[0.25em] text-text-dim uppercase font-semibold">
                      0{gi + 1} {"//"} DOMAIN
                    </span>
                    <div
                      className={`w-9 h-9 rounded-none border flex items-center justify-center text-sm font-bold shadow-sm ${config.badge}`}
                      style={{
                        clipPath:
                          "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))",
                      }}
                    >
                      {groupIcons[group.title]}
                    </div>
                  </div>

                  <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-text uppercase mb-2">
                    {group.title}
                  </h3>

                  <p className="font-mono text-xs tracking-wider text-text-dim mb-6">
                    {groupSubtitles[group.title]}
                  </p>

                  <div className={`w-12 h-[2px] ${config.bar} mb-8 opacity-60 group-hover:w-20 group-hover:opacity-100 transition-all duration-300`} />

                  {/* Skills Chips with increased dimensions, padding & spacing */}
                  <div className="flex flex-wrap gap-2.5 sm:gap-3">
                    {group.skills.map((skill) => (
                      <span
                        key={skill}
                        className={`font-mono text-xs sm:text-[13px] tracking-wider px-3.5 py-1.5 border bg-white/[0.02] hover:bg-white/[0.07] hover:scale-105 transition-all duration-200 cursor-default ${config.badge}`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Bottom: Module Status Telemetry */}
                <div className="border-t border-white/[0.06] pt-4 mt-8 flex items-center justify-between text-[11px] font-mono text-text-dim tracking-widest uppercase">
                  <span>{group.skills.length} MODULES</span>
                  <span className="text-accent flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                    ONLINE
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Section divider */}
      <div className="section-divider mt-28 sm:mt-36" />
    </section>
  );
}
