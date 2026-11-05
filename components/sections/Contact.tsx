import dynamic from "next/dynamic";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { TechnicalBadge } from "@/components/ui/TechnicalBadge";
import { PORTFOLIO_DATA } from "@/lib/portfolio-data";
import { LinkedinIcon } from "@/components/ui/Icons";
import { Mail, Phone, MapPin, Radio, ExternalLink } from "lucide-react";

const ContactForm = dynamic(
  () => import("@/components/sections/ContactForm").then((mod) => mod.ContactForm),
  {
    loading: () => (
      <div className="rounded-xl border border-[var(--surface-border)] bg-[var(--surface)] p-6 sm:p-8 shadow-sm flex items-center justify-center min-h-[380px]">
        <div className="text-xs font-mono text-[var(--muted-text)]">
          INITIALIZING DIRECT ENGINEERING DISPATCH...
        </div>
      </div>
    ),
  }
);

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-20 py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-[var(--surface-border)]">
      <ScrollReveal>
        <div className="flex flex-col items-start mb-12">
          <TechnicalBadge variant="neutral" icon={<Radio className="w-3.5 h-3.5" />}>
            07 // Engineering Dispatch
          </TechnicalBadge>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[var(--foreground)] mt-3">
            Initiate Contact & Collaboration
          </h2>
          <p className="text-sm sm:text-base text-[var(--muted-text)] max-w-2xl mt-2">
            Available for mechanical design engineering positions, CNC manufacturing consultations, and precision automation projects.
          </p>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Contact Info Column */}
        <ScrollReveal className="lg:col-span-5 space-y-6">
          <div className="rounded-xl border border-[var(--surface-border)] bg-[var(--surface)] p-6 space-y-4">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--accent)] border-b border-[var(--surface-border)] pb-2">
              Direct Communication Channels
            </div>

            {/* Direct Email (Redirects to Gmail Compose) */}
            <a
              href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(PORTFOLIO_DATA.personal.email)}&su=${encodeURIComponent("Mechanical / CNC Design Inquiry - Soumma Chakraborty")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 p-3 rounded-lg bg-[var(--surface-muted)]/60 border border-[var(--surface-border)] hover:border-[var(--accent)] transition-colors group"
            >
              <div className="p-2 rounded bg-[var(--surface)] text-[var(--accent)]">
                <Mail className="w-4 h-4" />
              </div>
              <div className="flex flex-col flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono text-[var(--muted-text)]">Direct Email (Gmail)</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[var(--muted-text)] group-hover:text-[var(--accent)] transition-colors" />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors break-all">
                  {PORTFOLIO_DATA.personal.email}
                </span>
              </div>
            </a>

            {/* Direct Phone / Call */}
            <a
              href={`tel:${PORTFOLIO_DATA.personal.phone}`}
              className="flex items-start gap-3 p-3 rounded-lg bg-[var(--surface-muted)]/60 border border-[var(--surface-border)] hover:border-[var(--accent)] transition-colors group"
            >
              <div className="p-2 rounded bg-[var(--surface)] text-[var(--accent)]">
                <Phone className="w-4 h-4" />
              </div>
              <div className="flex flex-col flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono text-[var(--muted-text)]">Direct Phone / Call</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[var(--muted-text)] group-hover:text-[var(--accent)] transition-colors" />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
                  +91 8617748778
                </span>
              </div>
            </a>

            {/* LinkedIn */}
            <a
              href={PORTFOLIO_DATA.personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 p-3 rounded-lg bg-[var(--surface-muted)]/60 border border-[var(--surface-border)] hover:border-[var(--accent)] transition-colors group"
            >
              <div className="p-2 rounded bg-[var(--surface)] text-[var(--accent)]">
                <LinkedinIcon className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-mono text-[var(--muted-text)]">Professional Network</span>
                <span className="text-xs sm:text-sm font-semibold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
                  LinkedIn Profile / InMail
                </span>
              </div>
            </a>

            {/* Location & Status */}
            <div className="pt-2 border-t border-[var(--surface-border)]/60 space-y-2 text-xs font-mono">
              <div className="flex items-center gap-2 text-[var(--muted-text)]">
                <MapPin className="w-3.5 h-3.5 text-[var(--accent)]" />
                <span>Location: {PORTFOLIO_DATA.personal.location} (Open to Global Relocation/Remote)</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-500 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span>{PORTFOLIO_DATA.personal.availability}</span>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Contact Form Column */}
        <ScrollReveal className="lg:col-span-7" delay={150}>
          <ContactForm />
        </ScrollReveal>
      </div>
    </section>
  );
}
