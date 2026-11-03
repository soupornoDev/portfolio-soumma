"use client";

import { useState, useRef, FormEvent } from "react";
import anime from "animejs";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Mechanical / CNC Design Inquiry",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState<string>("");
  const [transmissionCode, setTransmissionCode] = useState<string>("");

  const submitBtnRef = useRef<HTMLButtonElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setFeedback("");

    if (!prefersReducedMotion && submitBtnRef.current) {
      anime({
        targets: submitBtnRef.current,
        scale: [1, 0.96, 1],
        duration: 300,
        easing: "easeOutQuad",
      });
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus("success");
        setFeedback(data.message || "Message transmitted successfully.");
        setTransmissionCode(data.transmissionId || "TX-CONFIRMED");
        setFormData({
          name: "",
          email: "",
          subject: "Mechanical / CNC Design Inquiry",
          message: "",
        });
      } else {
        setStatus("error");
        setFeedback(data.error || "Failed to transmit message. Please check required fields.");
      }
    } catch {
      setStatus("error");
      setFeedback("Network transmission failure. Please reach out directly via email.");
    }
  };

  return (
    <div className="rounded-xl border border-[var(--surface-border)] bg-[var(--surface)] p-6 sm:p-8 shadow-sm">
      <div className="flex items-center justify-between border-b border-[var(--surface-border)] pb-3 mb-6">
        <span className="text-xs font-mono font-semibold uppercase text-[var(--accent)]">
          Direct Engineering Dispatch
        </span>
        <span className="text-[11px] font-mono text-[var(--muted-text)]">PORT: HTTPS/SSL</span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Field */}
        <div>
          <label
            htmlFor="contact-name"
            className="block text-xs font-mono text-[var(--foreground)] font-semibold mb-1"
          >
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            id="contact-name"
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g. Jane Doe / Engineering Lead"
            className="w-full px-3.5 py-2.5 rounded-lg border border-[var(--surface-border)] bg-[var(--surface-muted)] text-sm text-[var(--foreground)] placeholder:text-[var(--muted-text)] focus:outline-none focus:border-[var(--accent)] transition-colors"
          />
        </div>

        {/* Email Field */}
        <div>
          <label
            htmlFor="contact-email"
            className="block text-xs font-mono text-[var(--foreground)] font-semibold mb-1"
          >
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            id="contact-email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="engineer@company.com"
            className="w-full px-3.5 py-2.5 rounded-lg border border-[var(--surface-border)] bg-[var(--surface-muted)] text-sm text-[var(--foreground)] placeholder:text-[var(--muted-text)] focus:outline-none focus:border-[var(--accent)] transition-colors"
          />
        </div>

        {/* Subject */}
        <div>
          <label
            htmlFor="contact-subject"
            className="block text-xs font-mono text-[var(--foreground)] font-semibold mb-1"
          >
            Project / Subject
          </label>
          <input
            id="contact-subject"
            type="text"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-lg border border-[var(--surface-border)] bg-[var(--surface-muted)] text-sm text-[var(--foreground)] placeholder:text-[var(--muted-text)] focus:outline-none focus:border-[var(--accent)] transition-colors"
          />
        </div>

        {/* Message Field */}
        <div>
          <label
            htmlFor="contact-message"
            className="block text-xs font-mono text-[var(--foreground)] font-semibold mb-1"
          >
            Engineering Specification / Message <span className="text-red-500">*</span>
          </label>
          <textarea
            id="contact-message"
            rows={4}
            required
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder="Detail your mechanical design requirements, CAD models, CNC inquiries, or recruitment details..."
            className="w-full px-3.5 py-2.5 rounded-lg border border-[var(--surface-border)] bg-[var(--surface-muted)] text-sm text-[var(--foreground)] placeholder:text-[var(--muted-text)] focus:outline-none focus:border-[var(--accent)] transition-colors resize-none"
          />
        </div>

        {/* Status Alerts */}
        {status === "success" && (
          <div className="p-3.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-mono flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold">{feedback}</div>
              <div className="text-[11px] opacity-90 mt-0.5">Reference ID: {transmissionCode}</div>
            </div>
          </div>
        )}

        {status === "error" && (
          <div className="p-3.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs font-mono flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{feedback}</span>
          </div>
        )}

        {/* Submit Button */}
        <button
          ref={submitBtnRef}
          type="submit"
          disabled={status === "submitting"}
          className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[var(--foreground)] text-[var(--background)] font-medium text-xs font-mono tracking-wider uppercase hover:opacity-90 disabled:opacity-50 transition-all active:scale-[0.99]"
        >
          {status === "submitting" ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Transmitting Inquiry...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Transmit Message</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
