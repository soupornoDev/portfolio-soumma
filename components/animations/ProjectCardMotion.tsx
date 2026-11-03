"use client";

import { useRef, useState } from "react";
import anime from "animejs";
import { CheckCircle2, ChevronDown, Cpu, Layers, ShieldCheck } from "lucide-react";
import { Project } from "@/lib/portfolio-data";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { CoordinateStamp } from "@/components/ui/CoordinateStamp";

interface ProjectCardMotionProps {
  project: Project;
  index?: number;
}

export function ProjectCardMotion({ project }: ProjectCardMotionProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<SVGSVGElement>(null);
  const [expanded, setExpanded] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const handleMouseEnter = () => {
    if (prefersReducedMotion || !cardRef.current) return;

    if (arrowRef.current) {
      anime({
        targets: arrowRef.current,
        translateX: [0, 3],
        translateY: [0, -3],
        duration: 300,
        easing: "easeOutQuad",
      });
    }
  };

  const handleMouseLeave = () => {
    if (prefersReducedMotion || !cardRef.current) return;

    if (arrowRef.current) {
      anime({
        targets: arrowRef.current,
        translateX: 0,
        translateY: 0,
        duration: 300,
        easing: "easeOutQuad",
      });
    }
  };

  const toggleExpand = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="project-card group relative flex flex-col justify-between rounded-xl border border-[var(--surface-border)] bg-[var(--surface)] p-6 transition-all duration-300 hover:border-[var(--accent)] hover:shadow-md"
    >
      {/* Top Header: Drawing Code & Category */}
      <div>
        <div className="flex items-center justify-between gap-2 border-b border-[var(--surface-border)] pb-3 mb-4 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
            <span className="text-[var(--accent)] font-semibold">{project.drawingCode}</span>
          </div>
          <span className="text-[var(--muted-text)] px-2 py-0.5 rounded bg-[var(--surface-muted)] text-[11px]">
            {project.category}
          </span>
        </div>

        {/* Title & Subtitle */}
        <h3 className="text-xl font-bold tracking-tight text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors mb-2">
          {project.title}
        </h3>
        <p className="text-xs font-mono text-[var(--muted-text)] mb-3 uppercase tracking-wide">
          {project.subtitle}
        </p>

        {/* Summary Description */}
        <p className="text-sm text-[var(--muted-text)] leading-relaxed mb-6">
          {project.description}
        </p>

        {/* Key Engineering Specifications Matrix */}
        <div className="space-y-2 mb-6">
          <div className="text-[11px] font-mono uppercase tracking-wider text-[var(--muted-text)] font-semibold flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-[var(--accent)]" />
            <span>Design Parameters & Tolerances</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
            {project.specifications.slice(0, 4).map((spec, sIdx) => (
              <div
                key={sIdx}
                className="p-2 rounded bg-[var(--surface-muted)]/60 border border-[var(--surface-border)] flex flex-col justify-between"
              >
                <span className="text-[10px] text-[var(--muted-text)]">{spec.label}</span>
                <span className="font-semibold text-[var(--foreground)] mt-0.5">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tolerance & Materials Tags */}
        <div className="flex flex-wrap items-center gap-2 mb-6 text-xs">
          <CoordinateStamp label="TOL" value={project.tolerances} />
          {project.materials.map((mat, mIdx) => (
            <span
              key={mIdx}
              className="px-2 py-0.5 rounded text-[11px] font-mono bg-[var(--surface-muted)] text-[var(--muted-text)] border border-[var(--surface-border)]"
            >
              {mat}
            </span>
          ))}
        </div>

        {/* Expandable Technical Analysis Drawer */}
        {expanded && (
          <div className="pt-4 mt-4 border-t border-[var(--surface-border)] space-y-4">
            <div>
              <div className="text-xs font-mono font-semibold uppercase text-[var(--accent)] mb-2 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Engineering Highlights & FEA Validation</span>
              </div>
              <ul className="space-y-2">
                {project.highlights.map((highlight, hIdx) => (
                  <li
                    key={hIdx}
                    className="text-xs text-[var(--muted-text)] flex items-start gap-2"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent)] mt-0.5 shrink-0" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {project.specifications.length > 4 && (
              <div>
                <div className="text-xs font-mono font-semibold uppercase text-[var(--muted-text)] mb-2 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5" />
                  <span>Additional Sizing Specifications</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                  {project.specifications.slice(4).map((spec, extraIdx) => (
                    <div
                      key={extraIdx}
                      className="p-2 rounded bg-[var(--surface-muted)]/60 border border-[var(--surface-border)]"
                    >
                      <span className="text-[10px] text-[var(--muted-text)]">{spec.label}</span>
                      <div className="font-semibold text-[var(--foreground)] mt-0.5">{spec.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Card Footer: Tools & Expand Action */}
      <div className="pt-4 border-t border-[var(--surface-border)] flex items-center justify-between gap-4 mt-6">
        <div className="flex flex-wrap items-center gap-1.5">
          {project.tools.map((tool, tIdx) => (
            <span
              key={tIdx}
              className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--surface-muted)] text-[var(--foreground)] border border-[var(--surface-border)]"
            >
              {tool}
            </span>
          ))}
        </div>

        <button
          type="button"
          onClick={toggleExpand}
          className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-[var(--accent)] hover:underline shrink-0"
        >
          <span>{expanded ? "Collapse Spec" : "Technical Spec"}</span>
          <ChevronDown
            className={`w-3.5 h-3.5 transition-transform duration-200 ${
              expanded ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>
    </div>
  );
}
