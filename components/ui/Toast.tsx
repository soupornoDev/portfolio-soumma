"use client";

import React, { useSyncExternalStore, useEffect, useState, useRef } from "react";
import { CheckCircle2, AlertOctagon, AlertTriangle, X, Compass } from "lucide-react";

export type ToastType = "success" | "error" | "warning" | "info";

export interface ToastItem {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
  duration?: number; // milliseconds
  timestamp: string;
}

let toasts: ToastItem[] = [];
let listeners: Array<() => void> = [];

function emitChange() {
  for (const listener of listeners) {
    listener();
  }
}

export const toastStore = {
  add(type: ToastType, title: string, description?: string, duration = 4500): string {
    const id = Math.random().toString(36).substring(2, 9) + Date.now().toString(36);
    const timestamp = new Date().toLocaleTimeString("en-GB", { hour12: false });
    const item: ToastItem = { id, type, title, description, duration, timestamp };
    toasts = [...toasts, item];
    emitChange();
    return id;
  },
  remove(id: string) {
    toasts = toasts.filter((t) => t.id !== id);
    emitChange();
  },
  clear() {
    toasts = [];
    emitChange();
  },
  subscribe(listener: () => void) {
    listeners = [...listeners, listener];
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  },
  getSnapshot(): ToastItem[] {
    return toasts;
  },
};

// Imperative toast dispatcher
export const toast = {
  success: (title: string, description?: string, duration?: number) =>
    toastStore.add("success", title, description, duration),
  error: (title: string, description?: string, duration?: number) =>
    toastStore.add("error", title, description, duration),
  warning: (title: string, description?: string, duration?: number) =>
    toastStore.add("warning", title, description, duration),
  info: (title: string, description?: string, duration?: number) =>
    toastStore.add("info", title, description, duration),
  dismiss: (id: string) => toastStore.remove(id),
  clear: () => toastStore.clear(),
};

export function useToast() {
  return toast;
}

interface ToastCardProps {
  toast: ToastItem;
  onDismiss: (id: string) => void;
}

function ToastCard({ toast: item, onDismiss }: ToastCardProps) {
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const remainingRef = useRef<number>(item.duration || 4500);
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    if (startTimeRef.current === 0) {
      startTimeRef.current = Date.now();
    }

    if (isPaused) {
      if (timerRef.current) clearTimeout(timerRef.current);
      remainingRef.current = Math.max(0, remainingRef.current - (Date.now() - startTimeRef.current));
      return;
    }

    startTimeRef.current = Date.now();
    timerRef.current = setTimeout(() => {
      onDismiss(item.id);
    }, remainingRef.current);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isPaused, item.id, onDismiss]);

  const config = {
    success: {
      badge: "TX_CONFIRMED",
      border: "border-emerald-500/50 dark:border-emerald-500/40",
      bg: "bg-[var(--surface)]",
      glow: "shadow-[0_8px_30px_rgba(16,185,129,0.12)]",
      bar: "bg-emerald-500",
      accentText: "text-emerald-600 dark:text-emerald-400",
      icon: (
        <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shrink-0 border border-emerald-500/20">
          <CheckCircle2 className="w-5 h-5 animate-pulse" />
        </div>
      ),
    },
    error: {
      badge: "FAULT_DETECTED",
      border: "border-rose-500/60 dark:border-rose-500/40",
      bg: "bg-[var(--surface)]",
      glow: "shadow-[0_8px_30px_rgba(244,63,94,0.15)]",
      bar: "bg-rose-500",
      accentText: "text-rose-600 dark:text-rose-400",
      icon: (
        <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 text-rose-600 dark:text-rose-400 shrink-0 border border-rose-500/20">
          <AlertOctagon className="w-5 h-5 animate-bounce" />
        </div>
      ),
    },
    warning: {
      badge: "LIMIT_WARN",
      border: "border-amber-500/60 dark:border-amber-500/40",
      bg: "bg-[var(--surface)]",
      glow: "shadow-[0_8px_30px_rgba(245,158,11,0.12)]",
      bar: "bg-amber-500",
      accentText: "text-amber-600 dark:text-amber-400",
      icon: (
        <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 shrink-0 border border-amber-500/20">
          <AlertTriangle className="w-5 h-5" />
        </div>
      ),
    },
    info: {
      badge: "TELEMETRY",
      border: "border-[var(--accent)]/50 dark:border-[var(--accent)]/40",
      bg: "bg-[var(--surface)]",
      glow: "shadow-[0_8px_30px_var(--accent-glow)]",
      bar: "bg-[var(--accent)]",
      accentText: "text-[var(--accent)]",
      icon: (
        <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-[var(--accent)]/10 text-[var(--accent)] shrink-0 border border-[var(--accent)]/20">
          <Compass className="w-5 h-5 animate-spin [animation-duration:8s]" />
        </div>
      ),
    },
  }[item.type];

  return (
    <div
      role={item.type === "error" ? "alert" : "status"}
      aria-live="polite"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className={`pointer-events-auto relative overflow-hidden rounded-xl border ${config.border} ${config.bg} ${config.glow} p-4 backdrop-blur-md transition-all duration-300 hover:scale-[1.01]`}
      style={{
        animation: "toast-slide-in 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      }}
    >
      {/* Top Technical Metadata Header */}
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-[var(--surface-border)] text-[10px] font-mono tracking-wider text-[var(--muted-text)]">
        <div className="flex items-center gap-2">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-ping" />
          <span className={`font-semibold ${config.accentText}`}>[{config.badge}]</span>
          <span>{"// CH-01"}</span>
        </div>
        <div className="flex items-center gap-2">
          <span>{item.timestamp} UTC</span>
          <button
            type="button"
            onClick={() => onDismiss(item.id)}
            className="p-1 rounded hover:bg-[var(--surface-muted)] text-[var(--muted-text)] hover:text-[var(--foreground)] transition-colors"
            aria-label="Dismiss notification"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Content Body */}
      <div className="flex items-start gap-3">
        {config.icon}
        <div className="flex-1 min-w-0 pr-2">
          <h4 className="text-sm font-semibold text-[var(--foreground)] leading-tight">
            {item.title}
          </h4>
          {item.description && (
            <p className="mt-1 text-xs text-[var(--muted-text)] leading-relaxed break-words font-mono">
              {item.description}
            </p>
          )}
        </div>
      </div>

      {/* Animated countdown progress gauge */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-[var(--surface-border)] overflow-hidden">
        <div
          className={`h-full ${config.bar} transition-all`}
          style={{
            animation: `toast-progress ${item.duration || 4500}ms linear forwards`,
            animationPlayState: isPaused ? "paused" : "running",
          }}
        />
      </div>
    </div>
  );
}

const EMPTY_TOASTS: ToastItem[] = [];

function getServerSnapshot(): ToastItem[] {
  return EMPTY_TOASTS;
}

export function ToastContainer() {
  const activeToasts = useSyncExternalStore(
    toastStore.subscribe,
    toastStore.getSnapshot,
    getServerSnapshot
  );

  if (activeToasts.length === 0) return null;

  return (
    <div
      aria-label="Notifications"
      className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm sm:max-w-md w-[calc(100vw-2.5rem)] pointer-events-none"
    >
      {activeToasts.map((item) => (
        <ToastCard
          key={item.id}
          toast={item}
          onDismiss={(id) => toastStore.remove(id)}
        />
      ))}
    </div>
  );
}
