import React from "react";

interface CoordinateStampProps {
  label: string;
  value: string;
  className?: string;
}

export function CoordinateStamp({ label, value, className = "" }: CoordinateStampProps) {
  return (
    <div
      className={`inline-flex items-center gap-2 px-2 py-0.5 font-mono text-[11px] text-[var(--muted-text)] bg-[var(--surface-muted)] border border-[var(--surface-border)] rounded select-none ${className}`}
    >
      <span className="text-[var(--accent)] font-semibold">{label}:</span>
      <span className="tracking-tight">{value}</span>
    </div>
  );
}
