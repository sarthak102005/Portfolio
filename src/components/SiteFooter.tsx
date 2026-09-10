"use client";

import { profile } from "@/data/profile";
import { canonicalResume } from "@/data/resumes";

export default function SiteFooter() {
  const currentYear = 2026;

  return (
    <footer className="relative border-t border-border-subtle px-4 sm:px-6 lg:px-10 py-10">
      {/* Accent line at top */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px]"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(181,255,43,0.15) 30%, rgba(181,255,43,0.25) 50%, rgba(181,255,43,0.15) 70%, transparent)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 flex items-center justify-center border border-accent/30"
              style={{
                clipPath:
                  "polygon(0 0, calc(100% - 5px) 0, 100% 5px, 100% 100%, 5px 100%, 0 calc(100% - 5px))",
              }}
            >
              <span className="font-display text-[10px] font-bold text-accent">
                SM
              </span>
            </div>
            <span className="font-mono text-xs text-text-dim">
              © {currentYear} Sarthak Makkar
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            <a
              href={profile.github.url}
              target="_blank"
              rel="noreferrer noopener"
              className="font-mono text-xs text-text-dim hover:text-accent transition-colors duration-300"
              aria-label="GitHub"
            >
              GitHub
            </a>
            <a
              href={profile.linkedin.url}
              target="_blank"
              rel="noreferrer noopener"
              className="font-mono text-xs text-text-dim hover:text-accent transition-colors duration-300"
              aria-label="LinkedIn"
            >
              LinkedIn
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="font-mono text-xs text-text-dim hover:text-accent transition-colors duration-300"
              aria-label="Email"
            >
              Email
            </a>
            <a
              href={canonicalResume.href}
              target="_blank"
              rel="noreferrer noopener"
              className="font-mono text-xs text-text-dim hover:text-accent transition-colors duration-300"
            >
              Resume
            </a>
          </div>
        </div>

        {/* Bottom line */}
        <div className="mt-8 text-center">
          <p className="font-mono text-[10px] tracking-[0.2em] text-text-dim/40 uppercase">
            Built with Next.js · TypeScript · Tailwind · Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
}
