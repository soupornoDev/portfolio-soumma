"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, X, Compass, ArrowUpRight, Download } from "lucide-react";
import anime from "animejs";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { PORTFOLIO_DATA } from "@/lib/portfolio-data";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { removeAnime } from "@/lib/animations";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Certificates", href: "#certificates" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileDrawerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Handle Escape key and focus management for mobile drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      window.addEventListener("keydown", handleKeyDown);
      // Move focus to first nav item when mobile menu opens
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

  // Animate mobile drawer when opened
  useEffect(() => {
    if (!mobileDrawerRef.current || prefersReducedMotion) return;

    if (mobileMenuOpen) {
      const links = mobileDrawerRef.current.querySelectorAll(".mobile-nav-link");
      removeAnime(links);
      anime({
        targets: links,
        opacity: [0, 1],
        translateX: [-12, 0],
        delay: anime.stagger(40, { start: 50 }),
        duration: 300,
        easing: "easeOutCubic",
      });
    }
  }, [mobileMenuOpen, prefersReducedMotion]);

  const closeMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 left-0 right-0 z-50 w-full bg-[var(--background)]/90 backdrop-blur-md border-b border-[var(--surface-border)] shadow-xs transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        {/* Brand / Engineering Monogram */}
        <Link
          href="#home"
          className="group flex items-center gap-2.5 text-sm font-mono font-semibold tracking-wider text-[var(--foreground)]"
          aria-label="Soumma Chakraborty - Mechanical Engineer"
        >
          <span className="flex items-center justify-center w-8 h-8 rounded border border-[var(--surface-border)] bg-[var(--surface)] text-[var(--accent)] group-hover:border-[var(--accent)] transition-colors">
            <Compass className="w-4 h-4" />
          </span>
          <div className="flex flex-col">
            <span className="leading-tight text-xs uppercase tracking-wider font-bold whitespace-nowrap">
              {PORTFOLIO_DATA.personal.name}
            </span>
            <span className="text-[10px] text-[var(--muted-text)] font-normal tracking-tight">
              MECHANICAL &amp; CNC DESIGN
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav
          className="hidden lg:flex items-center gap-1 text-xs font-mono text-[var(--muted-text)]"
          aria-label="Main Navigation"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="px-2.5 py-1.5 rounded-md hover:text-[var(--foreground)] hover:bg-[var(--surface-muted)] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Action: Theme Toggle, CV Download & Inquire Button */}
        <div className="flex items-center gap-2">
          <ThemeToggle />

          <a
            href="/Soumma_Chakraborty_CV.pdf"
            download="Soumma_Chakraborty_CV.pdf"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono font-medium border border-[var(--accent)]/40 bg-[var(--accent-light)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white transition-all shadow-xs cursor-pointer"
            title="Download Soumma Chakraborty's Official CV (PDF)"
            aria-label="Download CV (PDF)"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download CV</span>
          </a>

          <Link
            href="#contact"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono font-medium border border-[var(--surface-border)] bg-[var(--surface)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
          >
            <span>Inquire</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden flex items-center justify-center w-9 h-9 rounded-md border border-[var(--surface-border)] bg-[var(--surface)] text-[var(--foreground)] hover:border-[var(--accent)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
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
          className="lg:hidden fixed inset-0 top-[57px] bg-black/40 backdrop-blur-xs z-40"
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
          className="lg:hidden relative z-50 border-t border-[var(--surface-border)] bg-[var(--background)] px-6 py-5 shadow-2xl space-y-4 animate-in fade-in slide-in-from-top-2 duration-200"
        >
          {/* Header: Original clean design with INDEX replaced by a subtle animated indicator */}
          <div className="text-[10px] font-mono uppercase tracking-wider text-[var(--muted-text)] border-b border-[var(--surface-border)] pb-2 flex items-center justify-between">
            <span>Portfolio Sections</span>
            <span className="inline-flex items-center gap-1.5 text-[var(--accent)] font-mono text-[10px]">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-ping" />
              <span className="text-[var(--foreground)] font-semibold tracking-wider">NAV</span>
            </span>
          </div>

          <nav className="flex flex-col space-y-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={closeMenu}
                className="mobile-nav-link text-sm font-mono py-2 text-[var(--foreground)] hover:text-[var(--accent)] flex items-center justify-between border-b border-[var(--surface-border)]/40 transition-colors"
              >
                <span>{link.label}</span>
                <span className="text-xs text-[var(--muted-text)] font-sans">→</span>
              </Link>
            ))}
          </nav>

          <div className="pt-2 space-y-2">
            <a
              href="/Soumma_Chakraborty_CV.pdf"
              download="Soumma_Chakraborty_CV.pdf"
              onClick={closeMenu}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border border-[var(--surface-border)] bg-[var(--surface-muted)] text-[var(--foreground)] hover:border-[var(--accent)] hover:text-[var(--accent)] font-medium text-xs font-mono transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-[var(--accent)]" />
              <span>Download CV (PDF)</span>
            </a>

            <Link
              href="#contact"
              onClick={closeMenu}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[var(--foreground)] text-[var(--background)] font-medium text-xs font-mono transition-opacity hover:opacity-90"
            >
              <span>Get in Touch with Soumma</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
