import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { TechnicalBadge } from "@/components/ui/TechnicalBadge";
import { ProjectCardMotion } from "@/components/animations/ProjectCardMotion";
import { PORTFOLIO_DATA } from "@/lib/portfolio-data";
import { Cpu } from "lucide-react";

export function Projects() {
  return (
    <section id="projects" className="scroll-mt-20 py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-[var(--surface-border)]">
      <ScrollReveal>
        <div className="flex flex-col items-start mb-12">
          <TechnicalBadge variant="neutral" icon={<Cpu className="w-3.5 h-3.5" />}>
            03 // Engineering Projects
          </TechnicalBadge>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[var(--foreground)] mt-3">
            Featured CNC & Mechanical Systems
          </h2>
          <p className="text-sm sm:text-base text-[var(--muted-text)] max-w-2xl mt-2">
            Selected engineering designs spanning rigid machine gantries, quick-change tooling fixtures, harmonic rotary indexing units, and FEA thermal optimization.
          </p>
        </div>
      </ScrollReveal>

      {/* Grid of Projects */}
      <ScrollReveal staggerChildrenSelector=".project-card">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {PORTFOLIO_DATA.projects.map((project, idx) => (
            <ProjectCardMotion key={project.id} project={project} index={idx} />
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}
