import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { TechnicalBadge } from "@/components/ui/TechnicalBadge";
import { PORTFOLIO_DATA } from "@/lib/portfolio-data";
import { CheckCircle2, Cog, Cpu, Crosshair, FileCheck, Layers } from "lucide-react";

export function About() {
  const pillars = [
    {
      icon: <Layers className="w-5 h-5 text-[var(--accent)]" />,
      title: "Parametric 3D CAD Architecture",
      code: "CAD-MOD-01",
      description:
        "Developing robust, fully associative parametric models and top-down assembly skeletons in SolidWorks and Fusion 360, ensuring rapid design modifications and zero-interference fits.",
    },
    {
      icon: <Crosshair className="w-5 h-5 text-[var(--accent)]" />,
      title: "ASME Y14.5 GD&T Standards",
      code: "GDT-TOL-02",
      description:
        "Applying disciplined Geometric Dimensioning and Tolerancing with realistic datum reference frames, MMC/LMC modifiers, and runout controls to ensure repeatable interchangeability.",
    },
    {
      icon: <Cpu className="w-5 h-5 text-[var(--accent)]" />,
      title: "Rigidity & FEA Simulation",
      code: "FEA-SIM-03",
      description:
        "Analyzing structural gantry deflection, stress concentrations, and thermal gradients under continuous cutting forces to eliminate chatter and maximize surface finish quality.",
    },
    {
      icon: <Cog className="w-5 h-5 text-[var(--accent)]" />,
      title: "DFM & CAM Toolpath Synthesis",
      code: "CAM-DFM-04",
      description:
        "Designing components with manufacturing limitations in mind: tool clearance radii, standard cutter engagement, workholding fixturing, and optimized feeds/speeds.",
    },
  ];

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <ScrollReveal>
        <div className="flex flex-col items-start mb-12">
          <TechnicalBadge variant="neutral" icon={<FileCheck className="w-3.5 h-3.5" />}>
            01 // Engineering Foundation
          </TechnicalBadge>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[var(--foreground)] mt-3">
            Design Philosophy & Precision Standards
          </h2>
          <p className="text-sm sm:text-base text-[var(--muted-text)] max-w-2xl mt-2">
            Bridging theoretical mechanical design principles with physical CNC machining and precision manufacturing realities.
          </p>
        </div>
      </ScrollReveal>

      {/* Narrative Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
        <ScrollReveal className="lg:col-span-7 space-y-4 text-sm sm:text-base leading-relaxed text-[var(--muted-text)]">
          <p>
            My engineering trajectory is defined by a deep fascination with machine mechanics: how rotary stepper torques translate into micron-level linear motion, how material stiffness governs vibration dissipation, and how thoughtful tolerancing bridges the gap between digital CAD geometry and physical metal chips.
          </p>
          <p>
            Specializing in <strong className="text-[var(--foreground)]">CNC Machine Design and Mechanical Systems</strong>, I approach every project with rigorous manufacturing discipline. Whether sizing preloaded angular contact spindle bearings, calculating ball screw critical speeds, or synthesizing multi-surface CAM toolpaths, every geometric feature is purposeful and manufacturable.
          </p>
          <div className="pt-2 flex flex-wrap gap-2 text-xs font-mono">
            {PORTFOLIO_DATA.personal.standards.map((std, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded bg-[var(--surface-muted)] border border-[var(--surface-border)] text-[var(--foreground)]"
              >
                STD: {std}
              </span>
            ))}
          </div>
        </ScrollReveal>

        {/* Engineering Methodology Callout Box */}
        <ScrollReveal className="lg:col-span-5" delay={150}>
          <div className="p-6 rounded-xl border border-[var(--surface-border)] bg-[var(--surface)] shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-[var(--surface-border)] pb-3">
              <span className="text-xs font-mono font-bold uppercase text-[var(--accent)] tracking-wider">
                Specification Protocol
              </span>
              <span className="text-[11px] font-mono text-[var(--muted-text)]">ISO 9001 / DFM</span>
            </div>
            <ul className="space-y-3 text-xs sm:text-sm text-[var(--foreground)]">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[var(--accent)] mt-0.5 shrink-0" />
                <span>
                  <strong>Static Stiffness Over Raw Mass:</strong> Rib topology and box-section gantry casting to dampen harmonics.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[var(--accent)] mt-0.5 shrink-0" />
                <span>
                  <strong>Zero-Interference Kinematics:</strong> Tolerance stack-up calculations ensure frictionless guideway travel.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[var(--accent)] mt-0.5 shrink-0" />
                <span>
                  <strong>Closed-Loop Machining Feedback:</strong> Eliminating lost steps with closed-loop hybrid drive integration.
                </span>
              </li>
            </ul>
          </div>
        </ScrollReveal>
      </div>

      {/* 4 Engineering Pillars Grid */}
      <ScrollReveal staggerChildrenSelector=".pillar-card">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="pillar-card p-5 rounded-xl border border-[var(--surface-border)] bg-[var(--surface)] hover:border-[var(--accent)] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 rounded-lg bg-[var(--surface-muted)] border border-[var(--surface-border)]">
                    {pillar.icon}
                  </div>
                  <span className="text-[10px] font-mono text-[var(--muted-text)]">
                    {pillar.code}
                  </span>
                </div>
                <h3 className="font-bold text-sm text-[var(--foreground)] mb-2">
                  {pillar.title}
                </h3>
                <p className="text-xs text-[var(--muted-text)] leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}
