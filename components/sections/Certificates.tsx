import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { TechnicalBadge } from "@/components/ui/TechnicalBadge";
import { PORTFOLIO_DATA } from "@/lib/portfolio-data";
import { Award, CheckCircle } from "lucide-react";

export function Certificates() {
  return (
    <section id="certificates" className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-[var(--surface-border)]">
      <ScrollReveal>
        <div className="flex flex-col items-start mb-12">
          <TechnicalBadge variant="neutral" icon={<Award className="w-3.5 h-3.5" />}>
            06 // Verified Credentials
          </TechnicalBadge>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[var(--foreground)] mt-3">
            Certifications & Technical Accreditations
          </h2>
          <p className="text-sm sm:text-base text-[var(--muted-text)] max-w-2xl mt-2">
            Formal mechanical engineering qualifications, advanced post-graduate tool design diplomas, and specialized technical certifications from IIT Roorkee, IIT Kanpur, and IIT Kharagpur.
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal staggerChildrenSelector=".cert-card">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PORTFOLIO_DATA.certificates.map((cert, idx) => (
            <div
              key={idx}
              className="cert-card rounded-xl border border-[var(--surface-border)] bg-[var(--surface)] p-6 flex flex-col justify-between hover:border-[var(--accent)] transition-all"
            >
              <div>
                <div className="flex items-center justify-between border-b border-[var(--surface-border)] pb-3 mb-4">
                  <span className="text-[11px] font-mono font-semibold uppercase text-[var(--accent)] px-2 py-0.5 rounded bg-[var(--surface-muted)]">
                    {cert.category} CREDENTIAL
                  </span>
                  <span className="text-xs font-mono text-[var(--muted-text)]">
                    {cert.year}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-[var(--foreground)] mb-1">
                  {cert.title}
                </h3>
                <div className="text-xs font-mono text-[var(--muted-text)] mb-4">
                  Issued by: <strong className="text-[var(--foreground)]">{cert.issuer}</strong>
                  {cert.credentialId && (
                    <span className="block text-[11px] text-[var(--accent)] mt-0.5">
                      Credential: {cert.credentialId}
                    </span>
                  )}
                </div>

                <div className="space-y-1.5 mb-6">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-[var(--muted-text)]">
                    Core Competencies Tested:
                  </div>
                  <div className="grid grid-cols-2 gap-1.5 text-xs font-mono">
                    {cert.skillsCovered.map((skill, sIdx) => (
                      <div
                        key={sIdx}
                        className="flex items-center gap-1.5 text-[var(--muted-text)]"
                      >
                        <CheckCircle className="w-3 h-3 text-[var(--accent)] shrink-0" />
                        <span className="truncate">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-[var(--surface-border)]/60 flex items-center justify-between text-xs font-mono text-[var(--muted-text)]">
                <span>VERIFICATION STATUS</span>
                <span className="text-emerald-500 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  AUTHENTICATED
                </span>
              </div>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}
