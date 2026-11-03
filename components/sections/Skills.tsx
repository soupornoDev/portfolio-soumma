import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { TechnicalBadge } from "@/components/ui/TechnicalBadge";
import { PORTFOLIO_DATA } from "@/lib/portfolio-data";
import { Wrench } from "lucide-react";

export function Skills() {
  return (
    <section id="skills" className="scroll-mt-20 py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-[var(--surface-border)]">
      <ScrollReveal>
        <div className="flex flex-col items-start mb-12">
          <TechnicalBadge variant="neutral" icon={<Wrench className="w-3.5 h-3.5" />}>
            02 // Technical Competencies
          </TechnicalBadge>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[var(--foreground)] mt-3">
            Engineering Skills & Tools Matrix
          </h2>
          <p className="text-sm sm:text-base text-[var(--muted-text)] max-w-2xl mt-2">
            Disciplined mechanical engineering competencies categorized across 3D modeling, CAM programming, kinematic mechanisms, and physical inspection metrology.
          </p>
        </div>
      </ScrollReveal>

      {/* Grid of Skill Categories */}
      <ScrollReveal staggerChildrenSelector=".skill-group">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PORTFOLIO_DATA.skills.map((category, idx) => (
            <div
              key={idx}
              className="skill-group rounded-xl border border-[var(--surface-border)] bg-[var(--surface)] p-6 flex flex-col justify-between hover:border-[var(--accent)] transition-all duration-300"
            >
              <div>
                {/* Header with Category Code */}
                <div className="flex items-center justify-between border-b border-[var(--surface-border)] pb-3 mb-4">
                  <h3 className="font-bold text-sm sm:text-base text-[var(--foreground)]">
                    {category.title}
                  </h3>
                  <span className="text-[11px] font-mono text-[var(--accent)] font-semibold px-2 py-0.5 rounded bg-[var(--surface-muted)]">
                    {category.categoryCode}
                  </span>
                </div>

                {/* Skills List without fake percentage bars */}
                <div className="space-y-2.5">
                  {category.skills.map((skill, sIdx) => (
                    <div
                      key={sIdx}
                      className="flex items-center justify-between p-2 rounded-lg bg-[var(--surface-muted)]/50 border border-[var(--surface-border)]/60 text-xs font-mono"
                    >
                      <span className="text-[var(--foreground)] font-medium">
                        {skill.name}
                      </span>
                      <span className="text-[10px] uppercase tracking-wider text-[var(--muted-text)] px-1.5 py-0.5 rounded bg-[var(--surface)] border border-[var(--surface-border)]">
                        {skill.tag}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Subtle Grid Line */}
              <div className="pt-4 mt-4 border-t border-[var(--surface-border)]/40 flex items-center justify-between text-[10px] font-mono text-[var(--muted-text)]">
                <span>VERIFIED WORKFLOW</span>
                <span>ASME / ISO</span>
              </div>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}
