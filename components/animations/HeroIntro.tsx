"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowDownRight, Compass, Send, Wrench } from "lucide-react";
import { PORTFOLIO_DATA } from "@/lib/portfolio-data";
import { createHeroAnimation, removeAnime } from "@/lib/animations";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { TechnicalBadge } from "@/components/ui/TechnicalBadge";
import { EngineeringVisual } from "@/components/animations/EngineeringVisual";

export function HeroIntro() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const containerEl = containerRef.current;
    if (!containerEl) return;

    if (prefersReducedMotion) {
      const targets = containerEl.querySelectorAll(
        ".hero-badge, .hero-heading-line, .hero-subtitle, .hero-description, .hero-cta-btn, .hero-metric-item, .hero-visual-container"
      );
      targets.forEach((t) => {
        (t as HTMLElement).style.opacity = "";
        (t as HTMLElement).style.transform = "";
      });
      return;
    }

    const timeline = createHeroAnimation(containerEl);

    return () => {
      if (timeline) timeline.pause();
      if (containerEl) {
        removeAnime(containerEl);
        const targets = containerEl.querySelectorAll(
          ".hero-badge, .hero-heading-line, .hero-subtitle, .hero-description, .hero-cta-btn, .hero-metric-item, .hero-visual-container"
        );
        targets.forEach((t) => {
          (t as HTMLElement).style.opacity = "";
          (t as HTMLElement).style.transform = "";
        });
      }
    };
  }, [prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 md:pt-36 md:pb-28"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column: Technical Intro */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          {/* Status Badge */}
          <div className="hero-badge mb-5 flex flex-wrap items-center gap-2">
            <TechnicalBadge variant="accent" icon={<Compass className="w-3.5 h-3.5" />}>
              Precision Mechanical Design
            </TechnicalBadge>
            <span className="font-mono text-xs text-[var(--muted-text)] px-2 py-0.5 rounded border border-[var(--surface-border)] bg-[var(--surface-muted)]">
              CNC Machine Architecture
            </span>
          </div>

          {/* Heading */}
          <div className="space-y-2 mb-6">
            <p className="hero-heading-line font-mono text-sm md:text-base font-semibold tracking-wider text-[var(--accent)] uppercase">
              {PORTFOLIO_DATA.personal.name} — Mechanical Engineer
            </p>
            <h1 className="hero-heading-line text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--foreground)] leading-[1.15]">
              Engineered for <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--foreground)] via-[var(--accent)] to-[var(--foreground)]">
                Micron Precision
              </span>
            </h1>
          </div>

          {/* Subtitle & Focus */}
          <p className="hero-subtitle text-base sm:text-lg font-medium text-[var(--muted-text)] mb-4 max-w-xl">
            {PORTFOLIO_DATA.personal.tagline}
          </p>

          {/* Technical Bio Description */}
          <p className="hero-description text-sm sm:text-base leading-relaxed text-[var(--muted-text)] mb-8 max-w-xl">
            {PORTFOLIO_DATA.personal.bio}
          </p>

          {/* CTA Buttons */}
          <div className="hero-cta-btn flex flex-wrap items-center gap-3.5 w-full sm:w-auto mb-10">
            <Link
              href="#projects"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[var(--foreground)] text-[var(--background)] font-medium text-sm transition-all hover:opacity-90 active:scale-[0.98] shadow-sm cursor-pointer"
            >
              <span>Explore Projects</span>
              <ArrowDownRight className="w-4 h-4" />
            </Link>

            <Link
              href="#contact"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg border border-[var(--surface-border)] bg-[var(--surface)] text-[var(--foreground)] font-medium text-sm hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors active:scale-[0.98] cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Contact Engineer</span>
            </Link>

            <a
              href="#skills"
              className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-xs font-mono text-[var(--muted-text)] hover:text-[var(--foreground)] transition-colors cursor-pointer"
            >
              <Wrench className="w-3.5 h-3.5" />
              <span>Technical Standards</span>
            </a>
          </div>

          {/* Precision Metrics Row */}
          <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-[var(--surface-border)]">
            {PORTFOLIO_DATA.technicalMetrics.map((metric, idx) => (
              <div
                key={idx}
                className="hero-metric-item p-2.5 rounded-lg border border-[var(--surface-border)] bg-[var(--surface-muted)]/50"
              >
                <div className="text-base sm:text-lg font-bold font-mono text-[var(--foreground)] tracking-tight">
                  {metric.value}
                </div>
                <div className="text-[11px] font-semibold text-[var(--accent)] uppercase font-mono mt-0.5">
                  {metric.label}
                </div>
                <div className="text-[10px] text-[var(--muted-text)] mt-0.5 line-clamp-1">
                  {metric.caption}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Interactive Mechanical CAD Visual */}
        <div className="lg:col-span-5 flex items-center justify-center">
          <EngineeringVisual />
        </div>
      </div>
    </div>
  );
}
