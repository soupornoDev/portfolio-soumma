import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { TechnicalBadge } from "@/components/ui/TechnicalBadge";
import { PORTFOLIO_DATA } from "@/lib/portfolio-data";
import { BookOpen, ExternalLink, GraduationCap, MapPin } from "lucide-react";

export function Education() {
  return (
    <section id="education" className="scroll-mt-20 py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-[var(--surface-border)]">
      <ScrollReveal>
        <div className="flex flex-col items-start mb-12">
          <TechnicalBadge variant="neutral" icon={<GraduationCap className="w-3.5 h-3.5" />}>
            05 // Academic & Technical Qualifications
          </TechnicalBadge>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[var(--foreground)] mt-3">
            Tool Design & Mechanical Engineering Education
          </h2>
          <p className="text-sm sm:text-base text-[var(--muted-text)] max-w-2xl mt-2">
            Formal engineering qualifications from undergraduate mechanical engineering through advanced post-graduate tool design and CNC manufacturing.
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal staggerChildrenSelector=".education-card">
        <div className="space-y-6">
          {PORTFOLIO_DATA.education.map((edu, idx) => (
            <div
              key={idx}
              className="education-card rounded-xl border border-[var(--surface-border)] bg-[var(--surface)] p-6 sm:p-8 shadow-sm space-y-6 hover:border-[var(--accent)] transition-colors"
            >
              {/* Degree & Institution */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--surface-border)] pb-4">
                <div>
                  <span className="text-xs font-mono font-semibold uppercase text-[var(--accent)] tracking-wider">
                    {edu.field}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-[var(--foreground)] mt-1">
                    {edu.degree}
                  </h3>
                  <div className="text-xs font-mono text-[var(--muted-text)] mt-1 flex items-center gap-1.5">
                    <span>{edu.institution}</span>
                    {edu.institutionUrl && (
                      <a
                        href={edu.institutionUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--accent)] hover:underline inline-flex items-center gap-0.5"
                        aria-label={`${edu.institution} link`}
                      >
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>

                <div className="flex flex-col sm:items-end text-xs font-mono text-[var(--muted-text)]">
                  <span className="font-semibold text-[var(--foreground)]">{edu.period}</span>
                  <span className="flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3" />
                    {edu.location}
                  </span>
                </div>
              </div>

              {/* Academic Highlights */}
              <div className="space-y-2">
                <div className="text-xs font-mono uppercase tracking-wider text-[var(--muted-text)] font-semibold">
                  Program Highlights:
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-[var(--foreground)]">
                  {edu.highlights.map((item, hIdx) => (
                    <li key={hIdx} className="flex items-start gap-2">
                      <span className="text-[var(--accent)] mt-1">▸</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Core Coursework Grid (rendered if present) */}
              {edu.coreSubjects && edu.coreSubjects.length > 0 && (
                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-[var(--muted-text)] font-semibold mb-3 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-[var(--accent)]" />
                    <span>Specialized Skills & Coursework</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
                    {edu.coreSubjects.map((sub, sIdx) => (
                      <div
                        key={sIdx}
                        className="p-2.5 rounded bg-[var(--surface-muted)]/70 border border-[var(--surface-border)] text-[var(--foreground)]"
                      >
                        {sub}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}
