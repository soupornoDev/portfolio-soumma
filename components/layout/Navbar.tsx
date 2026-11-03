"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, X, Compass, ArrowUpRight } from "lucide-react";
import anime from "animejs";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { PORTFOLIO_DATA } from "@/lib/portfolio-data";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { removeAnime } from "@/lib/animations";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Certificates", href: "#certificates" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const mobileDrawerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animate mobile drawer when opened
  useEffect(() => {
    if (!mobileDrawerRef.current || prefersReducedMotion) return;

    if (mobileMenuOpen) {
      const links = mobileDrawerRef.current.querySelectorAll(".mobile-nav-link");
      removeAnime(links);
      anime({
        targets: links,
        opacity: [0, 1],
        translateX: [-16, 0],
        delay: anime.stagger(60, { start: 100 }),
        duration: 400,
        easing: "easeOutCubic",
      });
    }
  }, [mobileMenuOpen, prefersReducedMotion]);

  const closeMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[var(--background)]/85 backdrop-blur-md border-b border-[var(--surface-border)] shadow-sm py-3"
          : "bg-transparent py-4 border-b border-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand / Engineering Monogram */}
        <Link
          href="#home"
          className="group flex items-center gap-2 text-sm font-mono font-semibold tracking-wider text-[var(--foreground)]"
          aria-label="Soumma Chakraborty - Mechanical Engineer"
        >
          <span className="flex items-center justify-center w-7 h-7 rounded border border-[var(--surface-border)] bg-[var(--surface)] text-[var(--accent)] group-hover:border-[var(--accent)] transition-colors">
            <Compass className="w-4 h-4" />
          </span>
          <div className="flex flex-col">
            <span className="leading-tight text-xs uppercase tracking-widest font-bold">
              {PORTFOLIO_DATA.personal.shortName}
            </span>
            <span className="text-[10px] text-[var(--muted-text)] font-normal tracking-tight">
              MECH // CNC.DESIGN
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav
          className="hidden md:flex items-center gap-1 text-xs font-mono text-[var(--muted-text)]"
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

        {/* Right Action: Theme Toggle & Contact Pill */}
        <div className="flex items-center gap-2">
          <ThemeToggle />

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
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-md border border-[var(--surface-border)] bg-[var(--surface)] text-[var(--foreground)] hover:border-[var(--accent)] transition-colors"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div
          ref={mobileDrawerRef}
          className="md:hidden fixed inset-x-0 top-[61px] bg-[var(--background)] border-b border-[var(--surface-border)] p-6 shadow-xl space-y-4"
        >
          <div className="text-[10px] font-mono uppercase tracking-wider text-[var(--muted-text)] border-b border-[var(--surface-border)] pb-2 flex items-center justify-between">
            <span>Portfolio Sections</span>
            <span className="text-[var(--accent)]">INDEX</span>
          </div>
          <nav className="flex flex-col space-y-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={closeMenu}
                className="mobile-nav-link text-sm font-mono py-2 text-[var(--foreground)] hover:text-[var(--accent)] flex items-center justify-between border-b border-[var(--surface-border)]/40"
              >
                <span>{link.label}</span>
                <span className="text-xs text-[var(--muted-text)] font-sans">→</span>
              </Link>
            ))}
          </nav>
          <div className="pt-2">
            <Link
              href="#contact"
              onClick={closeMenu}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[var(--foreground)] text-[var(--background)] font-medium text-xs font-mono"
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
