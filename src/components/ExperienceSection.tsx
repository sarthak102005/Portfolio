"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { experience } from "@/data/experience";

export default function ExperienceSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="experience"
      ref={ref}
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-10"
      aria-labelledby="experience-heading"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="font-mono text-xs tracking-[0.3em] text-accent uppercase mb-3">
            {"// EXPERIENCE"}
          </p>
          <h2
            id="experience-heading"
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-text tracking-tight"
          >
            Work History
          </h2>
        </motion.div>

        {experience.map((exp, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative"
          >
            {/* Timeline line */}
            <div className="absolute left-4 sm:left-6 top-0 bottom-0 w-[1px] bg-gradient-to-b from-accent/40 via-accent/20 to-transparent" aria-hidden="true" />

            <div className="flex gap-6 sm:gap-8">
              {/* Timeline dot */}
              <div className="relative shrink-0 mt-1">
                <div className="w-8 sm:w-12 h-8 sm:h-12 border border-accent/40 bg-accent/10 flex items-center justify-center"
                  style={{ clipPath: "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))" }}
                >
                  <div className="w-2 h-2 bg-accent rounded-full" />
                </div>
              </div>

              {/* Content */}
              <div className="pb-8 flex-1">
                {/* Header */}
                <div className="flex flex-wrap items-start justify-between gap-3 mb-5">
                  <div>
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-text tracking-tight uppercase">
                      {exp.role}
                    </h3>
                    <p className="font-display text-lg sm:text-xl font-extrabold text-accent tracking-wider uppercase mt-0.5 flex items-center gap-2">
                      <span className="text-text-dim text-sm font-mono lowercase">@</span>
                      <span>{exp.company}</span>
                    </p>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="font-mono text-xs sm:text-sm font-semibold tracking-wider text-text-muted">
                      {exp.period}
                    </p>
                    <p className="font-mono text-xs tracking-wider text-text-dim mt-0.5">
                      {exp.location}
                    </p>
                  </div>
                </div>

                {/* Proof Points */}
                <ul className="space-y-3 mb-5">
                  {exp.proofPoints.map((point, pi) => (
                    <motion.li
                      key={pi}
                      initial={{ opacity: 0, x: -10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.3 + pi * 0.1 }}
                      className="flex gap-3 text-sm text-text-muted"
                    >
                      <span className="text-accent mt-0.5 shrink-0">▸</span>
                      <span className="leading-relaxed">{point}</span>
                    </motion.li>
                  ))}
                </ul>

                {/* Technologies */}
                <div className="flex flex-wrap gap-1.5">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-[10px] tracking-wider text-accent px-2 py-0.5 border border-accent/20 bg-accent/5"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Section divider */}
      <div className="section-divider mt-24 sm:mt-32" />
    </section>
  );
}
