import React from "react";
import Link from "next/link";
import { Compass, Home, Briefcase, Wrench, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[85vh] w-full flex flex-col items-center justify-center px-4 py-12 blueprint-grid relative overflow-hidden select-none">
      {/* Accent Background Glow */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-[var(--accent)]/10 blur-3xl pointer-events-none" />

      {/* Main Container Card */}
      <div className="relative z-10 w-full max-w-xl p-6 sm:p-8 rounded-2xl border border-[var(--surface-border)] bg-[var(--surface)]/95 backdrop-blur-md shadow-2xl">
        {/* Title Block Header */}
        <div className="flex items-center justify-between pb-3 mb-6 border-b border-[var(--surface-border)] text-xs font-mono text-[var(--muted-text)]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping" />
            <span className="font-bold text-[var(--foreground)] tracking-wider">
              {"AXIS OVERTRAVEL // STATUS 404"}
            </span>
          </div>
          <span className="text-[11px] text-[var(--accent)] font-semibold">
            DATUM: G54 UNMAPPED
          </span>
        </div>

        {/* Animated Blueprint Technical Drawing SVG */}
        <div className="relative w-full aspect-[2/1] sm:h-56 flex items-center justify-center overflow-hidden rounded-xl bg-[var(--surface-muted)]/50 border border-[var(--surface-border)] mb-6">
          <svg
            className="w-full h-full max-w-[360px] max-h-[200px]"
            viewBox="0 0 360 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern
                id="nf-grid"
                width="16"
                height="16"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 16 0 L 0 0 0 16"
                  fill="none"
                  stroke="var(--surface-border)"
                  strokeWidth="0.5"
                  opacity="0.6"
                />
              </pattern>
            </defs>

            {/* Blueprint Grid Background */}
            <rect width="360" height="200" fill="url(#nf-grid)" />

            {/* Machine Envelope Boundary Box */}
            <rect
              x="30"
              y="30"
              width="240"
              height="140"
              rx="4"
              stroke="var(--accent)"
              strokeWidth="1.5"
              strokeDasharray="6 4"
              fill="none"
              opacity="0.6"
            />
            <text
              x="36"
              y="44"
              fill="var(--accent)"
              fontSize="8"
              fontFamily="monospace"
              fontWeight="bold"
            >
              PHYSICAL WORK ENVELOPE: X[-500, +500] Y[-300, +300]
            </text>

            {/* Large Stencil "404" CAD Geometry */}
            <g opacity="0.3" stroke="var(--foreground)" strokeWidth="1.5" fill="none">
              {/* Digit 4 */}
              <path d="M70 70 L50 115 L85 115 M70 65 L70 135" />
              {/* Digit 0 */}
              <ellipse cx="115" cy="100" rx="18" ry="35" />
              {/* Digit 4 */}
              <path d="M165 70 L145 115 L180 115 M165 65 L165 135" />
            </g>

            {/* Dimension Lines with Extension Arrows */}
            <g stroke="var(--muted-text)" strokeWidth="0.75" opacity="0.7">
              {/* Horizontal Dimension */}
              <line x1="30" y1="20" x2="270" y2="20" />
              <line x1="30" y1="16" x2="30" y2="24" />
              <line x1="270" y1="16" x2="270" y2="24" />
              {/* Vertical Dimension */}
              <line x1="20" y1="30" x2="20" y2="170" />
              <line x1="16" y1="30" x2="24" y2="30" />
              <line x1="16" y1="170" x2="24" y2="170" />
            </g>
            <text
              x="150"
              y="16"
              fill="var(--muted-text)"
              fontSize="8"
              fontFamily="monospace"
              textAnchor="middle"
            >
              1000.000 mm
            </text>

            {/* Toolpath Vector That Escapes Envelope */}
            <path
              d="M 60 140 L 115 100 L 180 120 L 250 80 L 310 50"
              stroke="#fbbf24"
              strokeWidth="2"
              strokeDasharray="6 4"
              fill="none"
              style={{ animation: "toolpath-march 2s linear infinite" }}
            />

            {/* Coordinate Origin Crosshair (G54 Datum) */}
            <g transform="translate(60, 140)">
              <circle cx="0" cy="0" r="10" stroke="var(--accent)" strokeWidth="1" fill="none" />
              <line x1="-14" y1="0" x2="14" y2="0" stroke="var(--accent)" strokeWidth="1" />
              <line x1="0" y1="-14" x2="0" y2="14" stroke="var(--accent)" strokeWidth="1" />
              <circle cx="0" cy="0" r="2" fill="var(--accent)" />
              <text x="5" y="-5" fill="var(--accent)" fontSize="8" fontFamily="monospace">
                WCS (0,0)
              </text>
            </g>

            {/* Hard Limit Breach Indicator (X+ Limit Switch Tripped) */}
            <g transform="translate(270, 75)">
              <line x1="0" y1="-15" x2="0" y2="15" stroke="#f43f5e" strokeWidth="2.5" />
              <circle
                cx="0"
                cy="0"
                r="12"
                stroke="#f43f5e"
                strokeWidth="1.5"
                fill="none"
                style={{ transformOrigin: "0px 0px", animation: "pulse-ring 1.8s infinite" }}
              />
              <circle cx="0" cy="0" r="4" fill="#f43f5e" />
              <rect x="5" y="-18" width="80" height="15" rx="2" fill="#11131a" stroke="#f43f5e" strokeWidth="0.75" />
              <text x="9" y="-7" fill="#f43f5e" fontSize="7" fontWeight="bold" fontFamily="monospace">
                LIMIT TRIPPED
              </text>
            </g>

            {/* Out-of-Bounds Lost Cutter Position */}
            <g transform="translate(310, 50)">
              <circle cx="0" cy="0" r="7" fill="#fbbf24" opacity="0.8" className="animate-ping" />
              <circle cx="0" cy="0" r="5" fill="#f59e0b" stroke="#ffffff" strokeWidth="1.5" />
              <text x="-15" y="-10" fill="#f59e0b" fontSize="8" fontWeight="bold" fontFamily="monospace">
                (X: NaN, Y: NaN)
              </text>
            </g>
          </svg>
        </div>

        {/* Narrative & Machine Telemetry */}
        <div className="space-y-4 mb-6">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold font-mono tracking-tight text-[var(--foreground)]">
              COORDINATE SPECIFICATION NOT FOUND
            </h1>
            <p className="text-xs sm:text-sm text-[var(--muted-text)] mt-1">
              The requested resource or page path exceeds the machine’s programmed kinematics. The axis limit switch engaged to prevent collision.
            </p>
          </div>

          {/* Machine Parameter Block */}
          <div className="p-3.5 rounded-lg bg-[var(--surface-muted)] border border-[var(--surface-border)] font-mono text-xs space-y-1.5">
            <div className="flex items-center justify-between text-[var(--muted-text)]">
              <span>WORK COORDINATE SYSTEM:</span>
              <span className="text-[var(--foreground)] font-semibold">G54 (ABSOLUTE)</span>
            </div>
            <div className="flex items-center justify-between text-[var(--muted-text)]">
              <span>TARGET VECTOR:</span>
              <span className="text-amber-500 font-semibold">[OUT_OF_BOUNDS]</span>
            </div>
            <div className="flex items-center justify-between text-[var(--muted-text)]">
              <span>CORRECTIVE ROUTINE:</span>
              <span className="text-[var(--accent)] font-semibold">{"EXECUTE G28 // RETURN HOME"}</span>
            </div>
          </div>
        </div>

        {/* Navigation Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[var(--accent)] hover:opacity-90 text-white font-mono text-xs font-semibold shadow-sm transition-all hover:scale-[1.02]"
          >
            <Home className="w-4 h-4" />
            <span>Return to Home Datum</span>
          </Link>

          <Link
            href="/#projects"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-[var(--surface-border)] hover:bg-[var(--surface-muted)] text-[var(--foreground)] font-mono text-xs font-semibold transition-colors"
          >
            <Briefcase className="w-4 h-4" />
            <span>Inspect Projects</span>
          </Link>

          <Link
            href="/#skills"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-[var(--surface-border)] hover:bg-[var(--surface-muted)] text-[var(--foreground)] font-mono text-xs font-semibold transition-colors"
          >
            <Wrench className="w-4 h-4" />
            <span>Tooling Credentials</span>
          </Link>

          <Link
            href="/#contact"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-[var(--surface-border)] hover:bg-[var(--surface-muted)] text-[var(--accent)] font-mono text-xs font-semibold transition-colors"
          >
            <Compass className="w-4 h-4" />
            <span>Dispatch Inquiry</span>
            <ArrowRight className="w-3.5 h-3.5 ml-auto" />
          </Link>
        </div>
      </div>
    </div>
  );
}
