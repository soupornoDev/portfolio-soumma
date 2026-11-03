"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { RotateCcw, Home, Mail, AlertOctagon, Terminal } from "lucide-react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Suppress noise from Next.js DevTools synthetic error simulation
    if (error?.message?.includes("NEXT_DEVTOOLS_SIMULATED_ERROR")) return;
  }, [error]);

  return (
    <div className="min-h-[85vh] w-full flex flex-col items-center justify-center px-4 py-12 blueprint-grid relative overflow-hidden select-none">
      {/* Red Warning Ambient Glow */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-rose-500/10 blur-3xl pointer-events-none" />

      {/* Main Error Terminal Container */}
      <div className="relative z-10 w-full max-w-xl p-6 sm:p-8 rounded-2xl border border-rose-500/40 bg-[var(--surface)]/95 backdrop-blur-md shadow-2xl">
        {/* Machine Alarm Header */}
        <div className="flex items-center justify-between pb-3 mb-6 border-b border-rose-500/30 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
            <AlertOctagon className="w-4 h-4 text-rose-500" />
            <span className="font-bold text-rose-500 tracking-wider">
              ALARM CODE: 500_SYSTEM_INTERRUPT
            </span>
          </div>
          <span className="text-[11px] font-mono text-[var(--muted-text)]">
            E-STOP: ENGAGED
          </span>
        </div>

        {/* Animated Emergency Stop (E-Stop) & Mechanical Hazard SVG */}
        <div className="relative w-full aspect-[2/1] sm:h-52 flex items-center justify-center overflow-hidden rounded-xl bg-rose-950/20 border border-rose-500/20 mb-6">
          <svg
            className="w-full h-full max-w-[340px] max-h-[190px]"
            viewBox="0 0 340 190"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Caution Hatching Pattern */}
            <defs>
              <pattern
                id="hazard-stripes"
                width="20"
                height="20"
                patternTransform="rotate(45 0 0)"
                patternUnits="userSpaceOnUse"
              >
                <line x1="0" y1="0" x2="0" y2="20" stroke="#f43f5e" strokeWidth="6" opacity="0.15" />
              </pattern>
            </defs>

            <rect x="10" y="10" width="320" height="170" rx="8" fill="url(#hazard-stripes)" />

            {/* Warning Radar Pulses */}
            <circle
              cx="170"
              cy="95"
              r="70"
              stroke="#f43f5e"
              strokeWidth="1"
              strokeDasharray="4 4"
              opacity="0.3"
              style={{ transformOrigin: "170px 95px", animation: "pulse-ring 2.5s infinite" }}
            />
            <circle
              cx="170"
              cy="95"
              r="50"
              stroke="#f43f5e"
              strokeWidth="1.5"
              opacity="0.4"
            />

            {/* Industrial Emergency Stop Button (Yellow Base + Red Mushroom Cap) */}
            {/* Yellow Warning Flange Ring */}
            <circle
              cx="170"
              cy="95"
              r="40"
              fill="#fbbf24"
              stroke="#d97706"
              strokeWidth="2"
            />
            {/* Yellow Base Text Rings */}
            <circle cx="170" cy="95" r="38" fill="none" stroke="#78350f" strokeWidth="0.75" strokeDasharray="3 2" />

            {/* Red Mushroom Push Cap */}
            <g style={{ transformOrigin: "170px 95px", animation: "warning-beacon 2s ease-in-out infinite" }}>
              <circle
                cx="170"
                cy="95"
                r="30"
                fill="#e11d48"
                stroke="#9f1239"
                strokeWidth="2.5"
              />
              <circle cx="170" cy="95" r="22" fill="#f43f5e" opacity="0.8" />
              
              {/* Reset Directional Arrows (Turn to release) */}
              <path
                d="M158 84 A14 14 0 0 1 182 84"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />
              <polygon points="184,81 187,87 181,87" fill="white" />

              <path
                d="M182 106 A14 14 0 0 1 158 106"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />
              <polygon points="156,109 153,103 159,103" fill="white" />
            </g>

            {/* E-STOP Text Label */}
            <rect x="135" y="148" width="70" height="20" rx="3" fill="#11131a" stroke="#f43f5e" strokeWidth="1" />
            <text
              x="170"
              y="162"
              fill="#f43f5e"
              fontSize="10"
              fontWeight="bold"
              fontFamily="monospace"
              textAnchor="middle"
            >
              EMERGENCY STOP
            </text>

            {/* Interrupted Machine Axes Schematics */}
            <g stroke="#f43f5e" strokeWidth="1.5" opacity="0.7">
              <line x1="30" y1="95" x2="115" y2="95" strokeDasharray="4 4" />
              <line x1="225" y1="95" x2="310" y2="95" strokeDasharray="4 4" />
              <line x1="170" y1="18" x2="170" y2="45" strokeDasharray="4 4" />
            </g>

            {/* Hazard Alert Triangles */}
            <g transform="translate(45, 45)">
              <polygon points="12,2 22,20 2,20" fill="#f43f5e" opacity="0.8" />
              <text x="12" y="17" fill="#11131a" fontSize="12" fontWeight="bold" textAnchor="middle">!</text>
            </g>
            <g transform="translate(275, 45)">
              <polygon points="12,2 22,20 2,20" fill="#f43f5e" opacity="0.8" />
              <text x="12" y="17" fill="#11131a" fontSize="12" fontWeight="bold" textAnchor="middle">!</text>
            </g>
          </svg>
        </div>

        {/* Fault Diagnostics Box */}
        <div className="space-y-4 mb-6">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold font-mono tracking-tight text-[var(--foreground)]">
              CRITICAL SYSTEM FAULT
            </h1>
            <p className="text-xs sm:text-sm text-[var(--muted-text)] mt-1">
              A runtime machine exception occurred. The safety interlocking circuit halted operation to preserve system integrity.
            </p>
          </div>

          {/* Technical Diagnostics Terminal Readout */}
          <div className="p-3.5 rounded-lg bg-[var(--surface-muted)] border border-rose-500/20 font-mono text-xs space-y-1.5 text-[var(--foreground)]">
            <div className="flex items-center gap-2 text-rose-500 font-semibold border-b border-[var(--surface-border)] pb-1.5">
              <Terminal className="w-4 h-4" />
              <span>CONTROLLER DIAGNOSTIC LOG</span>
            </div>
            <div className="text-[11px] text-[var(--muted-text)] pt-1">
              <span className="text-rose-500 font-semibold">[DIGEST_ID]:</span> {error.digest || "ERR_INTERRUPT_UNSPECIFIED"}
            </div>
            <div className="text-[11px] text-[var(--muted-text)] break-words">
              <span className="text-rose-500 font-semibold">[EXCEPTION]:</span> {error.message || "An unhandled runtime exception interrupted component execution."}
            </div>
            <div className="text-[11px] text-[var(--muted-text)]">
              <span className="text-rose-500 font-semibold">[MACHINE STATUS]:</span> {"AXES LOCKED // SPINDLE INHIBIT"}
            </div>
          </div>
        </div>

        {/* Operational Recovery Actions */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-mono text-xs font-semibold shadow-md transition-all hover:scale-[1.02] cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset System & Re-Zero</span>
          </button>

          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-[var(--surface-border)] hover:bg-[var(--surface-muted)] text-[var(--foreground)] font-mono text-xs font-semibold transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Return to Datum</span>
          </Link>

          <a
            href="mailto:soummachakraborty.eng@gmail.com?subject=Portfolio%20System%20Fault%20Report"
            className="inline-flex items-center justify-center gap-2 p-2.5 rounded-lg border border-[var(--surface-border)] hover:bg-[var(--surface-muted)] text-[var(--muted-text)] hover:text-[var(--accent)] transition-colors"
            title="Dispatch Fault Report"
            aria-label="Dispatch Fault Report"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
