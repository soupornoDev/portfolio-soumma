import type { Metadata } from "next";
import Link from "next/link";
import { Download, ArrowLeft, Mail, MapPin, Compass, CheckCircle2, Award, Briefcase, GraduationCap, FileText } from "lucide-react";
import { PORTFOLIO_DATA } from "@/lib/portfolio-data";
import { SITE_URL } from "@/lib/site-config";
import { LinkedinIcon } from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: "Curriculum Vitae (CV) & Resume",
  description: `Official Curriculum Vitae and Engineering Resume of ${PORTFOLIO_DATA.personal.name} — Mechanical Engineer specializing in CNC machine design, CAD/CAM, GD&T, and FEA simulation.`,
  alternates: {
    canonical: "/cv",
  },
};

export default function CvPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] py-8 px-4 sm:px-6 lg:px-8">
      {/* Top Floating Control Bar (Hidden when printing) */}
      <div className="max-w-4xl mx-auto mb-8 print:hidden flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl border border-[var(--surface-border)] bg-[var(--surface)] shadow-sm">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono font-medium text-[var(--muted-text)] hover:text-[var(--foreground)] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Interactive Portfolio</span>
        </Link>

        <div className="flex items-center gap-3">
          <a
            href="/Soumma_Chakraborty_CV.pdf"
            download="Soumma_Chakraborty_CV.pdf"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--accent)] text-white text-xs font-mono font-semibold shadow-sm hover:opacity-95 active:scale-[0.98] transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Download Official CV (PDF)</span>
          </a>

          <a
            href="/Soumma_Chakraborty_Resume.pdf"
            download="Soumma_Chakraborty_Resume.pdf"
            className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-[var(--surface-border)] hover:bg-[var(--surface-muted)] text-[var(--foreground)] text-xs font-mono font-medium transition-colors"
          >
            <FileText className="w-3.5 h-3.5 text-[var(--accent)]" />
            <span>Resume (ATS)</span>
          </a>
        </div>
      </div>

      {/* Main Printable CV Paper Container */}
      <main className="max-w-4xl mx-auto rounded-2xl border border-[var(--surface-border)] bg-[var(--surface)] p-6 sm:p-12 shadow-md print:shadow-none print:border-none print:p-0">
        {/* Header Block */}
        <header className="border-b border-[var(--surface-border)] pb-8 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent)] font-semibold">
                CURRICULUM VITAE // ENGINEERING SPECIFICATION
              </span>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--foreground)] mt-1">
                {PORTFOLIO_DATA.personal.name}
              </h1>
              <p className="text-base sm:text-lg font-medium text-[var(--accent)] mt-1 font-mono">
                {PORTFOLIO_DATA.personal.discipline} &bull; {PORTFOLIO_DATA.personal.specialization}
              </p>
            </div>

            {/* Quick Contact Badge */}
            <div className="flex flex-col sm:items-end text-xs font-mono text-[var(--muted-text)] space-y-1">
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[var(--accent)]" />
                <a href={`mailto:${PORTFOLIO_DATA.personal.email}`} className="hover:underline">
                  {PORTFOLIO_DATA.personal.email}
                </a>
              </span>
              <span className="flex items-center gap-1.5">
                <LinkedinIcon className="w-3.5 h-3.5 text-[var(--accent)]" />
                <a href={PORTFOLIO_DATA.personal.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  linkedin.com/in/soumma-chakraborty
                </a>
              </span>
              <span className="flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-[var(--accent)]" />
                <a href={SITE_URL} target="_blank" rel="noopener noreferrer" className="hover:underline text-[var(--foreground)] font-semibold">
                  {SITE_URL.replace(/^https?:\/\//, "")}
                </a>
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[var(--accent)]" />
                <span>{PORTFOLIO_DATA.personal.location} (Open to Global Relocation/Remote)</span>
              </span>
            </div>
          </div>
        </header>

        {/* Professional Summary */}
        <section className="mb-8">
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--accent)] border-b border-[var(--surface-border)] pb-1.5 mb-3 flex items-center gap-2">
            <span>01 // Professional Summary</span>
          </h2>
          <p className="text-sm leading-relaxed text-[var(--foreground)]">
            {PORTFOLIO_DATA.personal.bio} Specializing in high-rigidity CNC machine frames, kinematic linear motion mechanics, spindle assemblies, sheet metal stamping press tools, and plastic injection moulds. Dedicated to standard-compliant engineering documentation adhering to ASME Y14.5 and ISO 2768-m.
          </p>
        </section>

        {/* Technical Competencies Matrix */}
        <section className="mb-8">
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--accent)] border-b border-[var(--surface-border)] pb-1.5 mb-4 flex items-center gap-2">
            <span>02 // Core Competencies & Tools Matrix</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
            {PORTFOLIO_DATA.skills.map((cat, idx) => (
              <div key={idx} className="p-3 rounded-lg border border-[var(--surface-border)] bg-[var(--surface-muted)]/50">
                <div className="font-bold text-[var(--foreground)] mb-2 flex items-center justify-between">
                  <span>{cat.title}</span>
                  <span className="text-[10px] text-[var(--accent)] font-semibold">{cat.categoryCode}</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {cat.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2 py-0.5 rounded bg-[var(--surface)] text-[var(--muted-text)] border border-[var(--surface-border)] text-[11px]"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Professional Experience */}
        <section className="mb-8">
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--accent)] border-b border-[var(--surface-border)] pb-1.5 mb-4 flex items-center gap-2">
            <Briefcase className="w-3.5 h-3.5" />
            <span>03 // Professional Experience & Industrial Training</span>
          </h2>
          <div className="space-y-6">
            {PORTFOLIO_DATA.experience.map((exp) => (
              <div key={exp.id} className="space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono">
                  <div>
                    <h3 className="font-bold text-sm text-[var(--foreground)] font-sans">{exp.role}</h3>
                    <span className="text-[var(--accent)] font-semibold">{exp.organization}</span>
                  </div>
                  <div className="text-[var(--muted-text)] mt-1 sm:mt-0 sm:text-right">
                    <span>{exp.period}</span> &bull; <span>{exp.location}</span>
                  </div>
                </div>
                <p className="text-xs text-[var(--muted-text)] leading-relaxed">{exp.description}</p>
                <ul className="space-y-1.5 text-xs text-[var(--foreground)] pt-1">
                  {exp.achievements.map((ach, aIdx) => (
                    <li key={aIdx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent)] mt-0.5 shrink-0" />
                      <span>{ach}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Projects */}
        <section className="mb-8">
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--accent)] border-b border-[var(--surface-border)] pb-1.5 mb-4 flex items-center gap-2">
            <span>04 // Featured Engineering & Tooling Projects</span>
          </h2>
          <div className="space-y-6">
            {PORTFOLIO_DATA.projects.map((proj) => (
              <div key={proj.id} className="p-4 rounded-xl border border-[var(--surface-border)] bg-[var(--surface-muted)]/30 space-y-2.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <span className="text-[var(--accent)] font-bold">{proj.drawingCode}</span>
                    <h3 className="font-bold text-sm text-[var(--foreground)] font-sans">{proj.title}</h3>
                  </div>
                  <span className="text-[10px] uppercase text-[var(--muted-text)] px-2 py-0.5 rounded bg-[var(--surface)] border border-[var(--surface-border)]">
                    {proj.category}
                  </span>
                </div>
                <p className="text-xs text-[var(--muted-text)] leading-relaxed">{proj.description}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono pt-1">
                  {proj.specifications.slice(0, 4).map((spec, sIdx) => (
                    <div key={sIdx} className="p-2 rounded bg-[var(--surface)] border border-[var(--surface-border)] flex justify-between">
                      <span className="text-[10px] text-[var(--muted-text)]">{spec.label}:</span>
                      <span className="font-semibold text-[var(--foreground)] ml-2 text-right">{spec.value}</span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1 text-[10px] font-mono">
                  <span className="text-[var(--accent)] font-semibold">Tools:</span>
                  {proj.tools.map((t, idx) => (
                    <span key={idx} className="px-1.5 py-0.5 rounded bg-[var(--surface)] border border-[var(--surface-border)]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section className="mb-8">
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--accent)] border-b border-[var(--surface-border)] pb-1.5 mb-4 flex items-center gap-2">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>05 // Academic & Tool Design Qualifications</span>
          </h2>
          <div className="space-y-4">
            {PORTFOLIO_DATA.education.map((edu, idx) => (
              <div key={idx} className="border-b border-[var(--surface-border)]/60 pb-3 last:border-none last:pb-0">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono">
                  <div>
                    <h3 className="font-bold text-sm text-[var(--foreground)] font-sans">{edu.degree}</h3>
                    <span className="text-[var(--accent)] font-semibold">{edu.institution}</span>
                  </div>
                  <span className="text-[var(--muted-text)]">{edu.period} &bull; {edu.location}</span>
                </div>
                <ul className="mt-2 space-y-1 text-xs text-[var(--muted-text)]">
                  {edu.highlights.map((h, hIdx) => (
                    <li key={hIdx} className="flex items-start gap-1.5">
                      <span className="text-[var(--accent)] font-mono">&bull;</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Certifications */}
        <section className="mb-4">
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--accent)] border-b border-[var(--surface-border)] pb-1.5 mb-3 flex items-center gap-2">
            <Award className="w-3.5 h-3.5" />
            <span>06 // Technical Certifications & Accreditations</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
            {PORTFOLIO_DATA.certificates.map((cert, idx) => (
              <div key={idx} className="p-2.5 rounded-lg border border-[var(--surface-border)] bg-[var(--surface-muted)]/40 flex flex-col justify-between">
                <div>
                  <div className="font-bold text-[var(--foreground)]">{cert.title}</div>
                  <div className="text-[11px] text-[var(--muted-text)] mt-0.5">Issuer: {cert.issuer}</div>
                </div>
                <div className="mt-2 text-[10px] text-emerald-500 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>AUTHENTICATED CREDENTIAL</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer Title Block */}
        <footer className="mt-10 pt-6 border-t border-[var(--surface-border)] flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-[var(--muted-text)] gap-2">
          <div>
            &copy; 2026 {PORTFOLIO_DATA.personal.name} &bull; Mechanical Engineering Portfolio
          </div>
          <div className="flex items-center gap-2">
            <span className="text-emerald-500 font-semibold">ASME Y14.5 &bull; ISO 2768-m</span>
          </div>
        </footer>
      </main>
    </div>
  );
}
