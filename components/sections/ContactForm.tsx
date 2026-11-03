"use client";

import { useState, useRef, FormEvent } from "react";
import { Send, CheckCircle2, AlertCircle, Loader2, RotateCcw } from "lucide-react";
import { toast } from "@/components/ui/Toast";

interface FieldErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Mechanical / CNC Design Inquiry",
    message: "",
  });
  const [honeypot, setHoneypot] = useState<string>("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState<string>("");
  const [transmissionCode, setTransmissionCode] = useState<string>("");

  const submitBtnRef = useRef<HTMLButtonElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const messageInputRef = useRef<HTMLTextAreaElement>(null);
  const isSubmittingRef = useRef<boolean>(false);

  const handleFieldChange = (field: "name" | "email" | "subject" | "message", value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (fieldErrors[field]) {
      setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    if (status === "error") {
      setStatus("idle");
      setFeedback("");
    }
  };

  const validateForm = (): boolean => {
    const errors: FieldErrors = {};

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errors.name = "Full name is required (minimum 2 characters)";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errors.email = "Please enter a valid corporate or personal email";
    }

    if (!formData.message.trim() || formData.message.trim().length < 5) {
      errors.message = "Message specification is required (minimum 5 characters)";
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setStatus("error");
      setFeedback("Please complete the required engineering specification fields.");
      toast.warning("Specification Incomplete", "Please complete all highlighted mandatory fields.");

      if (errors.name) {
        nameInputRef.current?.focus();
      } else if (errors.email) {
        emailInputRef.current?.focus();
      } else if (errors.message) {
        messageInputRef.current?.focus();
      }

      return false;
    }

    setFieldErrors({});
    return true;
  };

  const handleSubmit = async (e?: FormEvent | React.MouseEvent) => {
    if (e) {
      e.preventDefault();
    }

    if (isSubmittingRef.current || status === "submitting") {
      return;
    }

    if (!validateForm()) {
      return;
    }

    isSubmittingRef.current = true;
    setStatus("submitting");
    setFeedback("");

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          _gotcha: honeypot,
        }),
        signal: controller.signal,
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus("success");
        setFeedback(data.message || "Message transmitted successfully.");
        setTransmissionCode(data.transmissionId || "TX-CONFIRMED");
        toast.success(
          "Dispatch Transmitted",
          `Ref: ${data.transmissionId || "TX-CONFIRMED"} — Dispatch logged and delivered.`
        );
        setFormData({
          name: "",
          email: "",
          subject: "Mechanical / CNC Design Inquiry",
          message: "",
        });
        setFieldErrors({});
      } else {
        setStatus("error");
        setFeedback(data.error || "Failed to transmit message. Please review the highlighted fields.");
        toast.error("Transmission Rejected", data.error || "Please verify credentials and fields.");
      }
    } catch (err: unknown) {
      setStatus("error");
      const isAbort = err instanceof Error && err.name === "AbortError";
      const errMsg = isAbort
        ? "Transmission request timed out. Please send directly via Gmail below."
        : "Network transmission error. Please reach out directly via Gmail below.";
      setFeedback(errMsg);
      toast.error(isAbort ? "Request Timed Out" : "Network Error", errMsg);
    } finally {
      clearTimeout(timeoutId);
      isSubmittingRef.current = false;
    }
  };

  const resetForm = () => {
    setStatus("idle");
    setFeedback("");
    setFieldErrors({});
    nameInputRef.current?.focus();
  };

  return (
    <div className="rounded-xl border border-[var(--surface-border)] bg-[var(--surface)] p-6 sm:p-8 shadow-sm">
      <div className="flex items-center justify-between border-b border-[var(--surface-border)] pb-3 mb-6">
        <span className="text-xs font-mono font-semibold uppercase text-[var(--accent)]">
          Direct Engineering Dispatch
        </span>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {/* Anti-spam Honeypot Field */}
        <div className="hidden" aria-hidden="true" style={{ display: "none" }}>
          <label htmlFor="contact-gotcha">Do not fill this field</label>
          <input
            id="contact-gotcha"
            type="text"
            name="_gotcha"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </div>

        {/* Name Field */}
        <div>
          <label
            htmlFor="contact-name"
            className="block text-xs font-mono text-[var(--foreground)] font-semibold mb-1"
          >
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            ref={nameInputRef}
            id="contact-name"
            type="text"
            required
            maxLength={100}
            aria-required="true"
            aria-invalid={!!fieldErrors.name}
            aria-describedby={fieldErrors.name ? "contact-name-error" : undefined}
            value={formData.name}
            onChange={(e) => handleFieldChange("name", e.target.value)}
            placeholder="e.g. Jane Doe / Engineering Lead"
            className={`w-full px-3.5 py-2.5 rounded-lg border bg-[var(--surface-muted)] text-sm text-[var(--foreground)] placeholder:text-[var(--muted-text)] focus:outline-none transition-colors ${
              fieldErrors.name
                ? "border-red-500 focus:border-red-500"
                : "border-[var(--surface-border)] focus:border-[var(--accent)]"
            }`}
          />
          {fieldErrors.name && (
            <p id="contact-name-error" role="alert" className="text-[11px] font-mono text-red-500 mt-1">{fieldErrors.name}</p>
          )}
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
            ref={emailInputRef}
            id="contact-email"
            type="email"
            required
            maxLength={100}
            aria-required="true"
            aria-invalid={!!fieldErrors.email}
            aria-describedby={fieldErrors.email ? "contact-email-error" : undefined}
            value={formData.email}
            onChange={(e) => handleFieldChange("email", e.target.value)}
            placeholder="engineer@company.com"
            className={`w-full px-3.5 py-2.5 rounded-lg border bg-[var(--surface-muted)] text-sm text-[var(--foreground)] placeholder:text-[var(--muted-text)] focus:outline-none transition-colors ${
              fieldErrors.email
                ? "border-red-500 focus:border-red-500"
                : "border-[var(--surface-border)] focus:border-[var(--accent)]"
            }`}
          />
          {fieldErrors.email && (
            <p id="contact-email-error" role="alert" className="text-[11px] font-mono text-red-500 mt-1">{fieldErrors.email}</p>
          )}
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
            maxLength={150}
            value={formData.subject}
            onChange={(e) => handleFieldChange("subject", e.target.value)}
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
            ref={messageInputRef}
            id="contact-message"
            rows={4}
            required
            maxLength={5000}
            aria-required="true"
            aria-invalid={!!fieldErrors.message}
            aria-describedby={fieldErrors.message ? "contact-message-error" : undefined}
            value={formData.message}
            onChange={(e) => handleFieldChange("message", e.target.value)}
            placeholder="Detail your mechanical design requirements, CAD models, CNC inquiries, or recruitment details..."
            className={`w-full px-3.5 py-2.5 rounded-lg border bg-[var(--surface-muted)] text-sm text-[var(--foreground)] placeholder:text-[var(--muted-text)] focus:outline-none transition-colors resize-none ${
              fieldErrors.message
                ? "border-red-500 focus:border-red-500"
                : "border-[var(--surface-border)] focus:border-[var(--accent)]"
            }`}
          />
          {fieldErrors.message && (
            <p id="contact-message-error" role="alert" className="text-[11px] font-mono text-red-500 mt-1">{fieldErrors.message}</p>
          )}
        </div>

        {/* Status Alerts */}
        {status === "success" && (
          <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-mono space-y-2">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
              <div>
                <div className="font-bold">{feedback}</div>
                <div className="text-[11px] opacity-90 mt-0.5">Reference ID: {transmissionCode}</div>
              </div>
            </div>
            <div className="pt-2 border-t border-emerald-500/20 flex items-center justify-between">
              <span className="text-[11px] opacity-80">Thank you for reaching out.</span>
              <button
                type="button"
                onClick={resetForm}
                className="inline-flex items-center gap-1 font-bold underline hover:opacity-80 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Send another message</span>
              </button>
            </div>
          </div>
        )}

        {status === "error" && (
          <div className="p-3.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs font-mono space-y-2">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{feedback}</span>
            </div>
            <div className="pt-1.5 border-t border-red-500/20 text-[11px] flex items-center justify-between">
              <span>Direct fallback:</span>
              <a
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=soummachakraborty.eng@gmail.com&su=${encodeURIComponent(formData.subject || "Mechanical / CNC Design Inquiry")}&body=${encodeURIComponent(formData.message || "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-red-700 dark:hover:text-red-300 font-semibold"
              >
                Send via Gmail Web &rarr;
              </a>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          ref={submitBtnRef}
          type="submit"
          disabled={status === "submitting"}
          className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[var(--foreground)] text-[var(--background)] font-medium text-xs font-mono tracking-wider uppercase hover:opacity-90 disabled:opacity-50 transition-all active:scale-[0.98] cursor-pointer shadow-sm select-none"
        >
          {status === "submitting" ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Transmitting Inquiry to Soumma...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Initiate Transmission / Send Message</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
