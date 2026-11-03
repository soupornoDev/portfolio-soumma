import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { TechnicalBadge } from "@/components/ui/TechnicalBadge";
import { PORTFOLIO_DATA } from "@/lib/portfolio-data";
import { Briefcase, CheckCircle2, MapPin } from "lucide-react";

export function Experience() {
  return (
    <section id="experience" className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-[var(--surface-border)]">
      <ScrollReveal>
        <div className="flex flex-col items-start mb-12">
          <TechnicalBadge variant="neutral" icon={<Briefcase className="w-3.5 h-3.5" />}>
            04 // Engineering Trajectory
          </TechnicalBadge>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[var(--foreground)] mt-3">
            Practical Experience & Laboratory Projects
          </h2>
          <p className="text-sm sm:text-base text-[var(--muted-text)] max-w-2xl mt-2">
            Applied mechanical engineering project delivery, CNC machining setup, precision CAD modeling, and fabrication drawings.
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal staggerChildrenSelector=".experience-item">
        <div className="space-y-8 relative before:absolute before:inset-0 before:left-3 sm:before:left-5 before:w-0.5 before:bg-[var(--surface-border)]">
          {PORTFOLIO_DATA.experience.map((item) => (
            <div
              key={item.id}
              className="experience-item relative pl-8 sm:pl-12 flex flex-col items-start"
            >
              {/* Timeline Indicator Dot */}
              <div className="absolute left-1.5 sm:left-3.5 top-1.5 w-3.5 h-3.5 rounded-full border-2 border-[var(--background)] bg-[var(--accent)] ring-4 ring-[var(--surface)]" />

              <div className="w-full rounded-xl border border-[var(--surface-border)] bg-[var(--surface)] p-6 shadow-sm hover:border-[var(--accent)] transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--surface-border)] pb-3 mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-[var(--foreground)]">
                      {item.role}
                    </h3>
                    <div className="text-xs font-mono text-[var(--accent)] font-semibold mt-0.5">
                      {item.organization}
                    </div>
                  </div>
                  <div className="flex flex-col sm:items-end text-xs font-mono text-[var(--muted-text)]">
                    <span className="font-medium text-[var(--foreground)]">{item.period}</span>
                    <span className="flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3" />
                      {item.location}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-[var(--muted-text)] leading-relaxed mb-4">
                  {item.description}
                </p>

                <div className="space-y-2 mb-6">
                  {item.achievements.map((ach, aIdx) => (
                    <div key={aIdx} className="flex items-start gap-2.5 text-xs text-[var(--foreground)]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent)] mt-0.5 shrink-0" />
                      <span>{ach}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-[var(--surface-border)]/60">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--muted-text)]">
                    Environment:
                  </span>
                  {item.techStack.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 rounded text-[11px] font-mono bg-[var(--surface-muted)] text-[var(--muted-text)] border border-[var(--surface-border)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}
