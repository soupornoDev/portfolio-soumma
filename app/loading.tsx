import React from "react";

export default function Loading() {
  return (
    <div className="min-h-[85vh] w-full flex flex-col items-center justify-center px-4 py-12 blueprint-grid relative overflow-hidden select-none">
      {/* Background Ambient Glow */}
      <div className="absolute w-96 h-96 rounded-full bg-[var(--accent)]/10 blur-3xl pointer-events-none" />

      {/* Main Engineering Loader Container */}
      <div className="relative z-10 w-full max-w-lg p-6 sm:p-8 rounded-2xl border border-[var(--surface-border)] bg-[var(--surface)]/90 backdrop-blur-md shadow-2xl">
        {/* ISO Standard Blueprint Header */}
        <div className="flex items-center justify-between pb-3 mb-6 border-b border-[var(--surface-border)] text-xs font-mono text-[var(--muted-text)]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-ping" />
            <span className="font-semibold text-[var(--foreground)]">SYSTEM CALIBRATION</span>
          </div>
          <span className="text-[11px] text-[var(--accent)] font-semibold">
            TOLERANCE: ±0.005mm
          </span>
        </div>

        {/* Animated Mechanical Machinery SVG */}
        <div className="relative w-full aspect-[2/1] sm:h-52 flex items-center justify-center overflow-hidden rounded-xl bg-[var(--surface-muted)]/50 border border-[var(--surface-border)]/70 mb-6">
          <svg
            className="w-full h-full max-w-[360px] max-h-[190px]"
            viewBox="0 0 360 190"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Radial Glow */}
              <radialGradient id="spindle-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.4" />
                <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="laser-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.8" />
                <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Precision Grid Backdrop Lines */}
            <g stroke="var(--surface-border)" strokeWidth="0.75" strokeDasharray="3 3">
              <line x1="20" y1="95" x2="340" y2="95" />
              <line x1="180" y1="15" x2="180" y2="175" />
              <circle cx="180" cy="95" r="75" />
              <circle cx="180" cy="95" r="50" />
              <circle cx="180" cy="95" r="25" />
            </g>

            {/* Radar Sweep Ray */}
            <g
              style={{
                transformOrigin: "180px 95px",
                animation: "radar-sweep 3s linear infinite",
              }}
            >
              <polygon
                points="180,95 255,50 255,95"
                fill="url(#spindle-glow)"
                opacity="0.6"
              />
              <line
                x1="180"
                y1="95"
                x2="255"
                y2="95"
                stroke="var(--accent)"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </g>

            {/* Rotating Gear 1 (Clockwise, 180, 95) */}
            <g
              style={{
                transformOrigin: "180px 95px",
                animation: "gear-rotate-cw 8s linear infinite",
              }}
            >
              <circle
                cx="180"
                cy="95"
                r="44"
                stroke="var(--accent)"
                strokeWidth="1.5"
                strokeDasharray="6 4"
                className="opacity-60"
              />
              {/* Gear Teeth */}
              {[...Array(12)].map((_, i) => {
                const angle = (i * 360) / 12;
                return (
                  <rect
                    key={i}
                    x="176"
                    y="45"
                    width="8"
                    height="10"
                    rx="1.5"
                    fill="var(--accent)"
                    opacity="0.85"
                    transform={`rotate(${angle} 180 95)`}
                  />
                );
              })}
              <circle cx="180" cy="95" r="32" stroke="var(--foreground)" strokeWidth="1.5" fill="none" opacity="0.3" />
              {/* Keyway and Spindle Core */}
              <circle cx="180" cy="95" r="14" fill="var(--surface)" stroke="var(--accent)" strokeWidth="2" />
              <rect x="178" y="85" width="4" height="6" fill="var(--accent)" />
            </g>

            {/* Rotating Small Intermeshing Pinion Gear (Counter-Clockwise, 115, 95) */}
            <g
              style={{
                transformOrigin: "115px 95px",
                animation: "gear-rotate-ccw 5.33s linear infinite",
              }}
            >
              <circle
                cx="115"
                cy="95"
                r="25"
                stroke="var(--accent)"
                strokeWidth="1.2"
                strokeDasharray="4 3"
                opacity="0.5"
              />
              {[...Array(8)].map((_, i) => {
                const angle = (i * 360) / 8;
                return (
                  <rect
                    key={i}
                    x="112"
                    y="66"
                    width="6"
                    height="7"
                    rx="1"
                    fill="var(--accent)"
                    opacity="0.75"
                    transform={`rotate(${angle} 115 95)`}
                  />
                );
              })}
              <circle cx="115" cy="95" r="18" stroke="var(--foreground)" strokeWidth="1" fill="none" opacity="0.25" />
              <circle cx="115" cy="95" r="8" fill="var(--surface)" stroke="var(--accent)" strokeWidth="1.5" />
            </g>

            {/* Rotating Small Idler Gear (Counter-Clockwise, 245, 95) */}
            <g
              style={{
                transformOrigin: "245px 95px",
                animation: "gear-rotate-ccw 5.33s linear infinite",
              }}
            >
              <circle
                cx="245"
                cy="95"
                r="25"
                stroke="var(--accent)"
                strokeWidth="1.2"
                strokeDasharray="4 3"
                opacity="0.5"
              />
              {[...Array(8)].map((_, i) => {
                const angle = (i * 360) / 8;
                return (
                  <rect
                    key={i}
                    x="242"
                    y="66"
                    width="6"
                    height="7"
                    rx="1"
                    fill="var(--accent)"
                    opacity="0.75"
                    transform={`rotate(${angle} 245 95)`}
                  />
                );
              })}
              <circle cx="245" cy="95" r="18" stroke="var(--foreground)" strokeWidth="1" fill="none" opacity="0.25" />
              <circle cx="245" cy="95" r="8" fill="var(--surface)" stroke="var(--accent)" strokeWidth="1.5" />
            </g>

            {/* Center Datum Crosshairs and Coordinates */}
            <circle cx="180" cy="95" r="4" fill="var(--accent)" className="animate-ping" style={{ transformOrigin: "180px 95px" }} />
            <circle cx="180" cy="95" r="2" fill="white" />

            {/* Toolpath laser traverse dots */}
            <circle cx="70" cy="30" r="3" fill="var(--accent)" opacity="0.6" />
            <line x1="70" y1="30" x2="115" y2="70" stroke="var(--accent)" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
            <circle cx="290" cy="160" r="3" fill="var(--accent)" opacity="0.6" />
            <line x1="245" y1="120" x2="290" y2="160" stroke="var(--accent)" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
          </svg>
        </div>

        {/* Status Text & Progress */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <span className="text-sm font-bold tracking-tight text-[var(--foreground)] font-mono">
              INITIALIZING CAD / CNC ENGINE
            </span>
            <span className="text-xs font-mono text-[var(--accent)] animate-pulse">
              [HOMING G28 AXES...]
            </span>
          </div>

          {/* Calibrated Vernier Scale Progress Bar */}
          <div className="space-y-1.5">
            <div className="relative h-2 w-full rounded-full bg-[var(--surface-muted)] border border-[var(--surface-border)] overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[var(--accent)] via-sky-400 to-[var(--accent)] rounded-full animate-pulse"
                style={{
                  width: "100%",
                  animation: "pulse 1.8s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                }}
              />
            </div>

            {/* Micro Scale Graduations */}
            <div className="flex justify-between items-center text-[9px] font-mono text-[var(--muted-text)] px-0.5">
              <span>0.000mm</span>
              <span>25.000</span>
              <span className="text-[var(--accent)] font-semibold">DATUM (0,0)</span>
              <span>75.000</span>
              <span>100.000mm</span>
            </div>
          </div>

          {/* Machine Telemetry Readout */}
          <div className="p-3 rounded-lg bg-[var(--surface-muted)]/70 border border-[var(--surface-border)] font-mono text-[11px] space-y-1">
            <div className="flex items-center justify-between text-[var(--muted-text)]">
              <span>ACTIVE G-CODES:</span>
              <span className="text-[var(--foreground)] font-semibold">G21 G90 G40 G80 G54</span>
            </div>
            <div className="flex items-center justify-between text-[var(--muted-text)]">
              <span>SPINDLE STATE:</span>
              <span className="text-emerald-500 font-semibold">{"READY // 12,000 RPM"}</span>
            </div>
            <div className="flex items-center justify-between text-[var(--muted-text)]">
              <span>KINEMATIC MATRIX:</span>
              <span className="text-[var(--accent)]">3-AXIS XYZ SYNCHRONIZED</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
