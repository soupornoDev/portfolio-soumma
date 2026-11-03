import React from "react";

interface TechnicalBadgeProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  variant?: "accent" | "neutral" | "warning";
  className?: string;
}

export function TechnicalBadge({
  children,
  icon,
  variant = "accent",
  className = "",
}: TechnicalBadgeProps) {
  const variantStyles = {
    accent:
      "border-[var(--accent)]/30 bg-[var(--accent-light)] text-[var(--foreground)] dark:text-[var(--accent)]",
    neutral:
      "border-[var(--surface-border)] bg-[var(--surface-muted)] text-[var(--muted-text)]",
    warning:
      "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono tracking-wider uppercase rounded border font-medium transition-colors ${variantStyles[variant]} ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] inline-block animate-pulse" />
      {icon && <span className="opacity-80">{icon}</span>}
      {children}
    </span>
  );
}
