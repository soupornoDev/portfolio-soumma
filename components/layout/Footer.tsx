"use client";

import { ArrowUp, Compass, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { PORTFOLIO_DATA } from "@/lib/portfolio-data";

export function Footer() {
  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="w-full border-t border-[var(--surface-border)] bg-[var(--surface)] text-[var(--muted-text)] py-12 px-4 sm:px-6 lg:px-8 mt-24">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-[var(--surface-border)]">
          {/* Engineering Monogram & Identity */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2 font-mono text-sm font-bold text-[var(--foreground)]">
              <span className="p-1 rounded bg-[var(--surface-muted)] text-[var(--accent)] border border-[var(--surface-border)]">
                <Compass className="w-4 h-4" />
              </span>
              <span>{PORTFOLIO_DATA.personal.name}</span>
            </div>
            <p className="text-xs leading-relaxed max-w-sm">
              {PORTFOLIO_DATA.personal.specialization}. Focused on rigid structural design,
              kinematic accuracy, and production manufacturing standards.
            </p>
            <div className="font-mono text-[11px] text-[var(--accent)] flex items-center gap-2 pt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>{PORTFOLIO_DATA.personal.availability}</span>
            </div>
          </div>

          {/* Technical Drawing Legend / Sheet Spec */}
          <div className="md:col-span-4 space-y-2 font-mono text-xs">
            <div className="text-[10px] uppercase tracking-wider text-[var(--foreground)] font-semibold pb-1 border-b border-[var(--surface-border)]">
              Engineering Drawing Title Block
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div>
                <span className="text-[10px] text-[var(--muted-text)] block">TOLERANCE SPEC:</span>
                <span className="font-semibold text-[var(--foreground)]">ISO 2768-m</span>
              </div>
              <div>
                <span className="text-[10px] text-[var(--muted-text)] block">SYSTEM UNITS:</span>
                <span className="font-semibold text-[var(--foreground)]">Metric (mm / rad)</span>
              </div>
              <div>
                <span className="text-[10px] text-[var(--muted-text)] block">PROJECTION:</span>
                <span className="font-semibold text-[var(--foreground)]">Third Angle (3rd)</span>
              </div>
              <div>
                <span className="text-[10px] text-[var(--muted-text)] block">STATUS:</span>
                <span className="font-semibold text-emerald-500">PRODUCTION VERIFIED</span>
              </div>
            </div>
          </div>

          {/* Social Channels & Back to Top */}
          <div className="md:col-span-3 flex flex-col justify-between items-start md:items-end space-y-4">
            <div className="flex items-center gap-3">
              <a
                href={PORTFOLIO_DATA.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-md border border-[var(--surface-border)] bg-[var(--surface-muted)] flex items-center justify-center text-[var(--foreground)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
                aria-label="GitHub Profile"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={PORTFOLIO_DATA.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-md border border-[var(--surface-border)] bg-[var(--surface-muted)] flex items-center justify-center text-[var(--foreground)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${PORTFOLIO_DATA.personal.email}`}
                className="w-8 h-8 rounded-md border border-[var(--surface-border)] bg-[var(--surface-muted)] flex items-center justify-center text-[var(--foreground)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
                aria-label="Email Soumma Chakraborty"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>

            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-[var(--surface-border)] bg-[var(--surface-muted)] text-xs font-mono hover:text-[var(--foreground)] hover:border-[var(--accent)] transition-colors"
            >
              <span>TOP OF SPEC</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Repository */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-[var(--muted-text)] gap-2">
          <div>
            © 2026 {PORTFOLIO_DATA.personal.name}. All Mechanical & CNC Design Rights Reserved.
          </div>
          <div className="flex items-center gap-3">
            <span>Next.js 16 + Anime.js</span>
            <span>•</span>
            <a
              href={PORTFOLIO_DATA.personal.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--accent)] hover:underline"
            >
              soupornoDev/potfolio-soumma
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
