import { TechnicalBadge } from "@/components/ui/TechnicalBadge";
import { Wrench, Cog, Compass, ShieldCheck, CheckCircle2 } from "lucide-react";

/**
 * Pure Server Component: High-value crawlable semantic text
 * Elevates text-to-code ratio with comprehensive mechanical engineering copy.
 */
export function EngineeringServices() {
  return (
    <section
      id="services"
      className="scroll-mt-20 py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-[var(--surface-border)]"
    >
      <div className="flex flex-col items-start mb-12">
        <TechnicalBadge variant="neutral" icon={<Wrench className="w-3.5 h-3.5" />}>
          Engineering Capabilities &amp; Services
        </TechnicalBadge>
        <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[var(--foreground)] mt-3">
          Specialized Mechanical Design &amp; Precision Tooling Expertise
        </h2>
        <p className="text-sm sm:text-base text-[var(--muted-text)] max-w-3xl mt-3 leading-relaxed">
          Delivering production-ready mechanical engineering solutions from concept modeling to shopfloor fabrication.
          My practice synthesizes rigorous kinematic design, finite element validation, advanced multi-axis CAM programming,
          and disciplined geometric tolerancing to achieve repeatable micron-level manufacturing accuracy.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Capability 1: CNC Machine Architecture */}
        <div className="rounded-xl border border-[var(--surface-border)] bg-[var(--surface)] p-6 sm:p-8 flex flex-col justify-between hover:border-[var(--accent)] transition-colors">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="p-2 rounded-lg bg-[var(--surface-muted)] text-[var(--accent)] border border-[var(--surface-border)]">
                <Cog className="w-5 h-5" />
              </span>
              <div>
                <h3 className="text-lg font-bold text-[var(--foreground)]">
                  Precision CNC Machine Architecture &amp; Kinematics
                </h3>
                <span className="text-xs font-mono text-[var(--muted-text)]">
                  Structural Rigidity // Linear Motion Dynamics
                </span>
              </div>
            </div>
            <p className="text-sm text-[var(--muted-text)] leading-relaxed mb-4">
              Designing high-performance multi-axis CNC machine structures engineered for sustained cutting loads and harmonic stability.
              Expertise encompasses FEA-guided box-section gantry design, preloaded precision ball screw selection with critical speed verification,
              and linear recirculating roller guideway layouts. Spindle integration accounts for thermal displacement, dynamic balancing up to
              24,000 RPM, and bearing preload arrangements that maintain sub-micron repeatability under aggressive milling conditions.
            </p>
            <ul className="space-y-2 text-xs text-[var(--foreground)] font-mono">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[var(--accent)] mt-0.5 shrink-0" />
                <span>Structural deflection minimization under continuous cutting forces</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[var(--accent)] mt-0.5 shrink-0" />
                <span>Kinematic tolerance stackup ensuring zero-binding axis motion</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Capability 2: Press Tool & Mould Design */}
        <div className="rounded-xl border border-[var(--surface-border)] bg-[var(--surface)] p-6 sm:p-8 flex flex-col justify-between hover:border-[var(--accent)] transition-colors">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="p-2 rounded-lg bg-[var(--surface-muted)] text-[var(--accent)] border border-[var(--surface-border)]">
                <Compass className="w-5 h-5" />
              </span>
              <div>
                <h3 className="text-lg font-bold text-[var(--foreground)]">
                  Tool &amp; Die Design: Press Tools &amp; Injection Moulds
                </h3>
                <span className="text-xs font-mono text-[var(--muted-text)]">
                  Toolroom Fabrication // DFM Optimization
                </span>
              </div>
            </div>
            <p className="text-sm text-[var(--muted-text)] leading-relaxed mb-4">
              Complete engineering design and shopfloor realization of sheet metal blanking, piercing, and progressive press tools, alongside
              plastic injection mould assemblies. Focus areas include economic strip layout optimization in AutoCAD to maximize sheet stock utilization,
              punch-to-die clearance calculation based on material shear properties, core and cavity extraction in SolidWorks and Siemens NX,
              balanced runner and gate placement, and conformal cooling channel routing for flash-free injection cycles.
            </p>
            <ul className="space-y-2 text-xs text-[var(--foreground)] font-mono">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[var(--accent)] mt-0.5 shrink-0" />
                <span>Hardened D2, OHNS, and P20 tool steel selection for wear life</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[var(--accent)] mt-0.5 shrink-0" />
                <span>ANSYS mould plate deflection validation under injection pressures</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Capability 3: CAD/CAM & Machining */}
        <div className="rounded-xl border border-[var(--surface-border)] bg-[var(--surface)] p-6 sm:p-8 flex flex-col justify-between hover:border-[var(--accent)] transition-colors">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="p-2 rounded-lg bg-[var(--surface-muted)] text-[var(--accent)] border border-[var(--surface-border)]">
                <Wrench className="w-5 h-5" />
              </span>
              <div>
                <h3 className="text-lg font-bold text-[var(--foreground)]">
                  CAD/CAM Synthesis &amp; Multi-Axis CNC Machining
                </h3>
                <span className="text-xs font-mono text-[var(--muted-text)]">
                  SolidWorks // Siemens NX // Mastercam // PowerMill
                </span>
              </div>
            </div>
            <p className="text-sm text-[var(--muted-text)] leading-relaxed mb-4">
              Bridging the gap between 3D parametric CAD geometry and physical metal chips through advanced CAM post-processing.
              Proficient in generating optimized multi-axis milling and turning toolpaths using Mastercam and Delcam PowerMill.
              Workflows prioritize constant tool engagement angles, trochoidal roughing to extend cutter longevity, high-speed contour finishing,
              and Wire EDM profiling for complex apertures without residual thermal stress or workpiece distortion.
            </p>
            <ul className="space-y-2 text-xs text-[var(--foreground)] font-mono">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[var(--accent)] mt-0.5 shrink-0" />
                <span>G-code simulation and virtual collision avoidance verification</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[var(--accent)] mt-0.5 shrink-0" />
                <span>Custom workholding fixture design and datum alignment setup</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Capability 4: GD&T & Quality Assurance */}
        <div className="rounded-xl border border-[var(--surface-border)] bg-[var(--surface)] p-6 sm:p-8 flex flex-col justify-between hover:border-[var(--accent)] transition-colors">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="p-2 rounded-lg bg-[var(--surface-muted)] text-[var(--accent)] border border-[var(--surface-border)]">
                <ShieldCheck className="w-5 h-5" />
              </span>
              <div>
                <h3 className="text-lg font-bold text-[var(--foreground)]">
                  ASME Y14.5 GD&amp;T &amp; 7 QC Quality Assurance
                </h3>
                <span className="text-xs font-mono text-[var(--muted-text)]">
                  Metrology Verification // Statistical Process Control
                </span>
              </div>
            </div>
            <p className="text-sm text-[var(--muted-text)] leading-relaxed mb-4">
              Executing thorough quality audits and geometric compliance inspections across machine tool components, precision castings,
              and sub-assemblies. Applied industry experience at Jyoti CNC Automation Ltd. encompasses complete GD&amp;T drafting per ASME Y14.5
              and ISO 1101, definition of functional datum reference frames, maximum material condition (MMC) modifiers, and systematic root-cause
              defect prevention utilizing the 7 QC tools (Pareto, Ishikawa, Control Charts) to sustain tight manufacturing tolerances.
            </p>
            <ul className="space-y-2 text-xs text-[var(--foreground)] font-mono">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[var(--accent)] mt-0.5 shrink-0" />
                <span>Spindle runout, axis squareness, and backlash geometric audits</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[var(--accent)] mt-0.5 shrink-0" />
                <span>Micrometer, dial test indicator, and CMM inspection protocols</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
