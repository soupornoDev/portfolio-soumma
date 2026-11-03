"use client";

import { useTheme } from "next-themes";
import { useRef, useSyncExternalStore } from "react";
import { Sun, Moon } from "lucide-react";
import anime from "animejs";

const emptySubscribe = () => () => {};

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    const nextTheme = resolvedTheme === "dark" ? "light" : "dark";

    if (buttonRef.current) {
      anime({
        targets: buttonRef.current,
        rotate: [0, 180],
        scale: [0.9, 1],
        duration: 400,
        easing: "easeOutCubic",
        complete: () => {
          if (buttonRef.current) {
            buttonRef.current.style.transform = "";
          }
        },
      });
    }

    setTheme(nextTheme);
  };

  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-md border border-[var(--surface-border)] bg-[var(--surface)] opacity-0" />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      ref={buttonRef}
      onClick={handleToggle}
      type="button"
      className="relative flex items-center justify-center w-9 h-9 rounded-md border border-[var(--surface-border)] bg-[var(--surface)] hover:border-[var(--accent)] text-[var(--foreground)] transition-colors focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
      aria-label={isDark ? "Switch to light engineering theme" : "Switch to dark engineering theme"}
      title={isDark ? "Switch to light theme" : "Switch to dark theme"}
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-[var(--accent)]" />
      ) : (
        <Moon className="w-4 h-4 text-[var(--foreground)]" />
      )}
    </button>
  );
}
