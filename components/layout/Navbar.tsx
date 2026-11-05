"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  Compass,
  ArrowUpRight,
  Download,
  Layers,
  Wrench,
  Cpu,
  Briefcase,
  GraduationCap,
  Award,
  Mail,
  Cog,
} from "lucide-react";
import anime from "animejs";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { PORTFOLIO_DATA } from "@/lib/portfolio-data";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { removeAnime } from "@/lib/animations";

interface NavLinkItem {
  label: string;
  href: string;
  code: string;
  icon: typeof Compass;
}

const NAV_LINKS: NavLinkItem[] = [
  { label: "About", href: "#about", code: "01", icon: Layers },
  { label: "Services", href: "#services", code: "02", icon: Cog },
  { label: "Skills", href: "#skills", code: "03", icon: Wrench },
  { label: "Projects", href: "#projects", code: "04", icon: Cpu },
  { label: "Experience", href: "#experience", code: "05", icon: Briefcase },
  { label: "Education", href: "#education", code: "06", icon: GraduationCap },
  { label: "Certificates", href: "#certificates", code: "07", icon: Award },
  { label: "Contact", href: "#contact", code: "08", icon: Mail },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");
  const mobileDrawerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const closeMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  // Body scroll-locking when mobile menu is open
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Active section scroll spy
  useEffect(() => {
    if (typeof window === "undefined") return;

    const sectionIds = [
      "home",
      "about",
      "services",
      "skills",
      "projects",
      "experience",
      "education",
      "certificates",
      "contact",
    ];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120;
      let current = "home";

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            current = id;
            break;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle Escape key and focus management for mobile drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      window.addEventListener("keydown", handleKeyDown);
      const timer = setTimeout(() => {
        const firstLink = mobileDrawerRef.current?.querySelector<HTMLAnchorElement>("a");
        firstLink?.focus();
      }, 50);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
        clearTimeout(timer);
      };
    }
  }, [mobileMenuOpen]);

  // Animate mobile drawer items when opened
  useEffect(() => {
    if (!mobileDrawerRef.current || prefersReducedMotion) return;

    if (mobileMenuOpen) {
      const links = mobileDrawerRef.current.querySelectorAll(".mobile-nav-item");
      removeAnime(links);
      anime({
        targets: links,
        opacity: [0, 1],
        translateY: [10, 0],
        delay: anime.stagger(30, { start: 40 }),
        duration: 260,
        easing: "easeOutCubic",
      });
    }
  }, [mobileMenuOpen, prefersReducedMotion]);

  return (
    <header className="sticky top-0 left-0 right-0 z-50 w-full bg-[var(--background)]/90 backdrop-blur-md border-b border-[var(--surface-border)] shadow-xs transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between">
        {/* Brand / Engineering Monogram */}
        <Link
          href="#home"
          className="group flex items-center gap-2.5 sm:gap-3 font-mono text-[var(--foreground)] flex-shrink-0"
          aria-label="Soumma Chakraborty - Mechanical Engineer"
        >
          <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg border border-[var(--surface-border)] bg-[var(--surface)] text-[var(--accent)] group-hover:border-[var(--accent)] group-hover:scale-105 transition-all shadow-xs">
            <Compass className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
          </span>
          <div className="flex flex-col flex-shrink-0">
            <span className="leading-tight text-sm sm:text-base font-bold tracking-tight text-[var(--foreground)] whitespace-nowrap">
              {PORTFOLIO_DATA.personal.name}
            </span>
            <span className="text-[10px] text-[var(--muted-text)] font-normal tracking-tight font-mono hidden sm:block whitespace-nowrap">
              MECHANICAL &amp; CNC DESIGN
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links (with scroll-spy active indicator) */}
        <nav
          className="hidden lg:flex items-center gap-0.5 xl:gap-1 text-xs font-mono"
          aria-label="Main Navigation"
        >
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.replace("#", "");
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`px-2.5 py-1.5 rounded-md transition-all duration-150 flex items-center gap-1 ${
                  isActive
                    ? "text-[var(--accent)] bg-[var(--accent-light)] font-semibold shadow-2xs"
                    : "text-[var(--muted-text)] hover:text-[var(--foreground)] hover:bg-[var(--surface-muted)]"
                }`}
              >
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right Action Bar: Theme Toggle, CV Download & Inquire Button */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          <ThemeToggle />

          {/* Download CV CTA (Responsive Label) */}
          <a
            href="/Soumma_Chakraborty_CV.pdf"
            download="Soumma_Chakraborty_CV.pdf"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium border border-[var(--accent)]/40 bg-[var(--accent-light)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white transition-all shadow-xs cursor-pointer active:scale-95"
            title="Download Soumma Chakraborty's Official CV (PDF)"
            aria-label="Download CV (PDF)"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden xl:inline">Download</span>
            <span>CV</span>
          </a>

          {/* Direct Inquire Button */}
          <Link
            href="#contact"
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium border border-[var(--surface-border)] bg-[var(--surface)] text-[var(--foreground)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all shadow-xs active:scale-95"
          >
            <span>Inquire</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-lg border border-[var(--surface-border)] bg-[var(--surface)] text-[var(--foreground)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] cursor-pointer"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-drawer"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Backdrop */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 top-16 sm:top-18 bg-black/60 backdrop-blur-xs z-40 transition-opacity"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-drawer"
          ref={mobileDrawerRef}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          className="lg:hidden fixed top-16 sm:top-18 left-0 right-0 z-50 border-b border-[var(--surface-border)] bg-[var(--background)]/98 backdrop-blur-xl px-4 sm:px-6 py-5 shadow-2xl max-h-[calc(100dvh-4.25rem)] overflow-y-auto overscroll-contain space-y-4 animate-in fade-in slide-in-from-top-2 duration-200"
        >
          {/* Header Status Bar */}
          <div className="text-[10px] font-mono uppercase tracking-wider text-[var(--muted-text)] border-b border-[var(--surface-border)] pb-2.5 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>NAVIGATION MATRIX</span>
            </span>
            <span className="font-mono text-[10px] text-[var(--accent)] font-semibold">
              INDEX [8 SECTIONS]
            </span>
          </div>

          {/* 2-Column Responsive Section Grid */}
          <nav className="grid grid-cols-2 gap-2" aria-label="Mobile Sections">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              const IconComponent = link.icon;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={closeMenu}
                  className={`mobile-nav-item flex items-center justify-between p-3 rounded-lg border transition-all text-xs font-mono ${
                    isActive
                      ? "border-[var(--accent)] bg-[var(--accent-light)] text-[var(--accent)] font-semibold shadow-xs"
                      : "border-[var(--surface-border)] bg-[var(--surface)] text-[var(--foreground)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <IconComponent className="w-3.5 h-3.5 flex-shrink-0 opacity-70" />
                    <span className="truncate">{link.label}</span>
                  </div>
                  <span className="text-[10px] text-[var(--muted-text)] font-sans ml-1 flex-shrink-0">
                    {link.code}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs in Mobile Drawer */}
          <div className="pt-2 space-y-2 border-t border-[var(--surface-border)]">
            <a
              href="/Soumma_Chakraborty_CV.pdf"
              download="Soumma_Chakraborty_CV.pdf"
              onClick={closeMenu}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border border-[var(--accent)]/40 bg-[var(--accent-light)] text-[var(--accent)] font-semibold text-xs font-mono hover:bg-[var(--accent)] hover:text-white transition-all shadow-xs"
            >
              <Download className="w-4 h-4" />
              <span>Download Official CV (PDF)</span>
            </a>

            <Link
              href="#contact"
              onClick={closeMenu}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[var(--foreground)] text-[var(--background)] font-semibold text-xs font-mono transition-opacity hover:opacity-90 shadow-xs"
            >
              <span>Get in Touch with Soumma</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Engineering Availability Footer */}
          <div className="pt-1 text-center font-mono text-[10px] text-[var(--muted-text)]">
            <span>Mechanical Engineer // Precision CNC Machine Design</span>
          </div>
        </div>
      )}
    </header>
  );
}
