"use client";

import { useEffect, useRef, useState } from "react";
import anime from "animejs";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function EngineeringVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const spindleRef = useRef<SVGGElement>(null);
  const toolpathRef = useRef<SVGPathElement>(null);
  const coordinatesRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const [coords, setCoords] = useState<{ x: number; y: number; z: number }>({
    x: 120.0,
    y: 75.25,
    z: -12.5,
  });

  useEffect(() => {
    if (prefersReducedMotion) return;

    const spindleEl = spindleRef.current;
    const toolpathEl = toolpathRef.current;

    // Continuous subtle rotating tool cutter
    let spindleAnim: anime.AnimeInstance | null = null;
    if (spindleEl) {
      spindleAnim = anime({
        targets: spindleEl,
        rotate: 360,
        duration: 16000,
        easing: "linear",
        loop: true,
      });
    }

    // Toolpath stroke dash draw
    let toolpathAnim: anime.AnimeInstance | null = null;
    if (toolpathEl) {
      toolpathAnim = anime({
        targets: toolpathEl,
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: "easeInOutSine",
        duration: 3500,
        delay: 600,
        direction: "alternate",
        loop: true,
      });
    }

    return () => {
      if (spindleAnim) spindleAnim.pause();
      if (toolpathAnim) toolpathAnim.pause();
      if (spindleEl) anime.remove(spindleEl);
      if (toolpathEl) anime.remove(toolpathEl);
    };
  }, [prefersReducedMotion]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const relX = ((e.clientX - rect.left) / rect.width) * 320;
    const relY = ((e.clientY - rect.top) / rect.height) * 240;
    setCoords({
      x: parseFloat(relX.toFixed(2)),
      y: parseFloat(relY.toFixed(2)),
      z: -12.5,
    });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="hero-visual-container relative w-full aspect-square max-w-[420px] mx-auto rounded-xl border border-[var(--surface-border)] bg-[var(--surface)] shadow-lg overflow-hidden flex flex-col justify-between p-4 group select-none"
    >
      {/* CAD Header Bar */}
      <div className="flex items-center justify-between border-b border-[var(--surface-border)] pb-2.5 text-[11px] font-mono text-[var(--muted-text)]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-ping" />
          <span className="font-semibold text-[var(--foreground)]">CNC_VIEWPORT_3D</span>
          <span className="text-[10px] text-[var(--muted-text)] opacity-70">G54 WCS</span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px]">
          <span className="px-1.5 py-0.5 rounded bg-[var(--surface-muted)] text-[var(--accent)] font-semibold">
            FEED: 1200 mm/min
          </span>
          <span className="px-1.5 py-0.5 rounded bg-[var(--surface-muted)]">
            T01: ⌀6.0mm EM
          </span>
        </div>
      </div>

      {/* Interactive Blueprint SVG Display */}
      <div className="relative flex-1 flex items-center justify-center my-2">
        <svg
          viewBox="0 0 320 320"
          className="w-full h-full max-h-[300px]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Coordinate Grid Ticks */}
          <line x1="20" y1="160" x2="300" y2="160" stroke="currentColor" strokeOpacity="0.15" strokeDasharray="2 3" />
          <line x1="160" y1="20" x2="160" y2="300" stroke="currentColor" strokeOpacity="0.15" strokeDasharray="2 3" />

          {/* Reference Concentric Calibration Circles */}
          <circle cx="160" cy="160" r="130" stroke="currentColor" strokeOpacity="0.1" strokeDasharray="4 4" />
          <circle cx="160" cy="160" r="95" stroke="var(--accent)" strokeOpacity="0.25" strokeWidth="1" />
          <circle cx="160" cy="160" r="50" stroke="currentColor" strokeOpacity="0.15" strokeDasharray="3 3" />

          {/* Caliper / Dimension Indicators */}
          <line x1="65" y1="50" x2="255" y2="50" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.5" />
          <path d="M65 46 L65 54 M255 46 L255 54" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.6" />
          <text
            x="160"
            y="44"
            fill="var(--accent)"
            fontSize="9"
            fontFamily="monospace"
            textAnchor="middle"
            className="tracking-wider"
          >
            ⌀ 190.00 ±0.01 mm
          </text>

          {/* Simulated Trochoidal Milling CAM Toolpath */}
          <path
            ref={toolpathRef}
            d="M 65 240 Q 110 210, 160 235 T 255 210 Q 270 140, 220 100 T 110 90 Q 60 140, 65 240 Z"
            stroke="var(--accent)"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeOpacity="0.85"
          />

          {/* Spindle / Toolhead Assembly (Rotating Geometry) */}
          <g ref={spindleRef} style={{ transformOrigin: "160px 160px" }}>
            <circle cx="160" cy="160" r="32" stroke="var(--foreground)" strokeWidth="1.5" strokeOpacity="0.4" />
            <circle cx="160" cy="160" r="14" fill="var(--surface-muted)" stroke="var(--accent)" strokeWidth="2" />
            {/* 4-Flute Endmill Crosshair Representation */}
            <line x1="160" y1="138" x2="160" y2="182" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" />
            <line x1="138" y1="160" x2="182" y2="160" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" />
            <circle cx="160" cy="138" r="2.5" fill="var(--accent)" />
            <circle cx="160" cy="182" r="2.5" fill="var(--accent)" />
            <circle cx="138" cy="160" r="2.5" fill="var(--accent)" />
            <circle cx="182" cy="160" r="2.5" fill="var(--accent)" />
          </g>

          {/* Machine Coordinate Axis Markers */}
          <g transform="translate(30, 275)">
            <line x1="0" y1="0" x2="35" y2="0" stroke="#ef4444" strokeWidth="2" />
            <polygon points="35,-3 40,0 35,3" fill="#ef4444" />
            <text x="44" y="3" fill="#ef4444" fontSize="9" fontFamily="monospace" fontWeight="bold">+X</text>

            <line x1="0" y1="0" x2="0" y2="-35" stroke="#22c55e" strokeWidth="2" />
            <polygon points="-3,-35 0,-40 3,-35" fill="#22c55e" />
            <text x="-4" y="-44" fill="#22c55e" fontSize="9" fontFamily="monospace" fontWeight="bold">+Y</text>

            <circle cx="0" cy="0" r="3" fill="#3b82f6" />
            <text x="-12" y="12" fill="#3b82f6" fontSize="9" fontFamily="monospace" fontWeight="bold">+Z ⊙</text>
          </g>

          {/* Datum Feature Symbol [A] */}
          <g transform="translate(250, 260)">
            <rect x="0" y="0" width="36" height="18" fill="var(--surface-muted)" stroke="currentColor" strokeOpacity="0.3" rx="2" />
            <text x="18" y="13" fill="var(--foreground)" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
              -A-
            </text>
          </g>
        </svg>
      </div>

      {/* Live Digital Readout (DRO) */}
      <div
        ref={coordinatesRef}
        className="flex items-center justify-between pt-2 border-t border-[var(--surface-border)] font-mono text-[11px]"
      >
        <div className="flex items-center gap-3">
          <span className="text-[var(--muted-text)]">
            X: <strong className="text-[var(--foreground)]">{coords.x.toFixed(2)}</strong>
          </span>
          <span className="text-[var(--muted-text)]">
            Y: <strong className="text-[var(--foreground)]">{coords.y.toFixed(2)}</strong>
          </span>
          <span className="text-[var(--muted-text)]">
            Z: <strong className="text-[var(--accent)]">{coords.z.toFixed(2)}</strong>
          </span>
        </div>
        <div className="text-[10px] text-[var(--muted-text)] tracking-wider uppercase">
          TOL: <span className="text-[var(--accent)] font-semibold">±0.005mm</span>
        </div>
      </div>
    </div>
  );
}
