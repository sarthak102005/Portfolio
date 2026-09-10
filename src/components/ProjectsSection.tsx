"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { projects, type Project } from "@/data/projects";

/* ─── Category badge colors ─── */
const categoryStyles: Record<string, string> = {
  backend: "text-accent border-accent/30",
  fullstack: "text-accent border-accent/30",
  ai: "text-cyan border-cyan/30",
};

const categoryLabels: Record<string, string> = {
  backend: "BACKEND",
  fullstack: "FULL STACK",
  ai: "AI / GENAI",
};

const priorityLabels: Record<string, string> = {
  primary: "PRIMARY BUILD",
  featured: "AI BUILD",
  secondary: "BUILD",
};

/* ─── Project Modal ─── */
function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  // Focus trap
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'button, a, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    // Focus first focusable element
    const timer = setTimeout(() => {
      const first = modalRef.current?.querySelector<HTMLElement>(
        'button, a, [tabindex]:not([tabindex="-1"])'
      );
      first?.focus();
    }, 100);
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
      clearTimeout(timer);
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <motion.div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-label={`${project.name} — Architecture Details`}
        className="relative z-10 w-full max-w-2xl max-h-[85vh] overflow-y-auto card-glass p-6 sm:p-8"
        style={{ clipPath: "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))" }}
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        transition={{ duration: 0.2 }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-text-muted hover:text-accent transition-colors"
          aria-label="Close details"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className={`font-mono text-[10px] tracking-[0.2em] uppercase px-2 py-0.5 border ${categoryStyles[project.category]}`}>
              {categoryLabels[project.category]}
            </span>
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-text-dim">
              {priorityLabels[project.priority]}
            </span>
          </div>
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-text mb-1">
            {project.name}
          </h3>
          <p className="font-mono text-sm text-text-muted">{project.subtitle}</p>
        </div>

        {/* Summary */}
        <p className="text-text-muted text-sm leading-relaxed mb-6">
          {project.summary}
        </p>

        {/* Architecture Notes */}
        <div className="mb-6">
          <h4 className="font-display text-sm font-bold text-accent tracking-[0.1em] uppercase mb-3">
            Architecture & Engineering Decisions
          </h4>
          <ul className="space-y-3">
            {project.architectureNotes.map((note, i) => (
              <li key={i} className="flex gap-3 text-sm text-text-muted">
                <span className="text-accent mt-0.5 shrink-0">▸</span>
                <span className="leading-relaxed">{note}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Metric */}
        {project.metric && (
          <div className="mb-6 p-4 border border-accent/20 bg-accent-dim/10"
            style={{ clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))" }}
          >
            <p className="font-mono text-[10px] tracking-[0.2em] text-text-dim uppercase mb-1">
              {project.metric.label}
            </p>
            <p className="font-display text-2xl font-bold text-accent">
              {project.metric.value}
            </p>
          </div>
        )}

        {/* Tech Stack */}
        <div className="mb-6">
          <h4 className="font-display text-sm font-bold text-text-muted tracking-[0.1em] uppercase mb-3">
            Stack
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className={`font-mono text-[10px] tracking-wider px-2 py-1 border bg-white/[0.02] ${categoryStyles[project.category]}`}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noreferrer noopener"
          className="btn-primary inline-flex"
        >
          View Live
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
          </svg>
        </a>
      </motion.div>
    </motion.div>
  );
}

/* ─── Project Card ─── */
function ProjectCard({
  project,
  index,
  onDetails,
}: {
  project: Project;
  index: number;
  onDetails: (p: Project) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const isPrimary = project.priority === "primary";

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`group relative card-glass overflow-hidden transition-all duration-300 hover:border-accent/30 ${
        isPrimary ? "border-accent/20 glow-accent" : ""
      }`}
      style={{ clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))" }}
    >
      {/* Diagonal scan on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="absolute w-[200%] h-[1px] bg-gradient-to-r from-transparent via-accent/20 to-transparent"
          style={{
            top: "50%",
            left: "-50%",
            transform: "rotate(-45deg)",
            animation: "diagonal-scan 3s linear infinite",
          }}
        />
      </div>

      <div className="relative z-10 p-5 sm:p-6">
        {/* Header row */}
        <div className="flex items-start justify-between mb-3">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className={`font-mono text-[10px] tracking-[0.2em] uppercase px-2 py-0.5 border ${categoryStyles[project.category]}`}>
                {categoryLabels[project.category]}
              </span>
              {isPrimary && (
                <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-accent bg-accent/10 px-1.5 py-0.5">
                  PRIMARY
                </span>
              )}
            </div>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-text group-hover:text-accent transition-colors duration-300">
              {project.name}
            </h3>
            <p className="font-mono text-xs text-text-dim mt-0.5">
              {project.subtitle}
            </p>
          </div>

          {/* Metric badge */}
          {project.metric && (
            <div className="text-right shrink-0 ml-4">
              <p className="font-mono text-[9px] tracking-[0.2em] text-text-dim uppercase">
                {project.metric.label}
              </p>
              <p className="font-display text-lg font-bold text-accent">
                {project.metric.value}
              </p>
            </div>
          )}
        </div>

        {/* Summary */}
        <p className="text-text-muted text-sm leading-relaxed mb-4">
          {project.summary}
        </p>

        {/* Proof points */}
        <ul className="space-y-2 mb-4">
          {project.proofPoints.map((point, i) => (
            <li key={i} className="flex gap-2 text-xs text-text-muted">
              <span className="text-accent mt-0.5 shrink-0">▸</span>
              <span className="leading-relaxed">{point}</span>
            </li>
          ))}
        </ul>

        {/* Tech chips */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.stack.slice(0, 6).map((tech) => (
            <span
              key={tech}
              className="font-mono text-[9px] tracking-wider text-text-dim px-2 py-0.5 border border-border-subtle bg-white/[0.01]"
            >
              {tech}
            </span>
          ))}
          {project.stack.length > 6 && (
            <span className="font-mono text-[9px] tracking-wider text-text-dim px-2 py-0.5">
              +{project.stack.length - 6}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="btn-primary !py-2 !px-4 !text-[10px]"
          >
            LIVE ↗
          </a>
          <button
            onClick={() => onDetails(project)}
            className="btn-secondary !py-2 !px-4 !text-[10px]"
          >
            DETAILS →
          </button>
        </div>
      </div>
    </motion.article>
  );
}

/* ─── Projects Section ─── */
export default function ProjectsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleClose = useCallback(() => setSelectedProject(null), []);

  const primary = projects.filter((p) => p.priority === "primary");
  const featured = projects.filter((p) => p.priority === "featured");
  const secondary = projects.filter((p) => p.priority === "secondary");

  return (
    <section
      id="projects"
      ref={ref}
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-10"
      aria-labelledby="projects-heading"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="font-mono text-xs tracking-[0.3em] text-accent uppercase mb-3">
            {"// PROJECTS"}
          </p>
          <h2
            id="projects-heading"
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-text tracking-tight mb-2"
          >
            Deployed Builds
          </h2>
          <p className="text-text-muted text-sm max-w-xl">
            Production systems with live deployments. Every project has real users, real metrics, and real engineering decisions.
          </p>
        </motion.div>

        {/* PRIMARY BUILDS */}
        <div className="mb-6">
          <p className="font-mono text-[10px] tracking-[0.3em] text-accent/60 uppercase mb-4">
            ── Primary Builds
          </p>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            {primary.map((p, i) => (
              <ProjectCard
                key={p.slug}
                project={p}
                index={i}
                onDetails={setSelectedProject}
              />
            ))}
          </div>
        </div>

        {/* AI / ADVANCED BUILDS */}
        <div className="mb-6 mt-10">
          <p className="font-mono text-[10px] tracking-[0.3em] text-cyan/60 uppercase mb-4">
            ── AI / Advanced Builds
          </p>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            {featured.map((p, i) => (
              <ProjectCard
                key={p.slug}
                project={p}
                index={i + 2}
                onDetails={setSelectedProject}
              />
            ))}
          </div>
        </div>

        {/* ADDITIONAL BUILDS */}
        <div className="mt-10">
          <p className="font-mono text-[10px] tracking-[0.3em] text-text-dim/60 uppercase mb-4">
            ── Additional Builds
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {secondary.map((p, i) => (
              <ProjectCard
                key={p.slug}
                project={p}
                index={i + 4}
                onDetails={setSelectedProject}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={handleClose}
          />
        )}
      </AnimatePresence>

      {/* Section divider */}
      <div className="section-divider mt-24 sm:mt-32" />
    </section>
  );
}
