import { HeroIntro } from "@/components/animations/HeroIntro";

export function Hero() {
  return (
    <section id="home" className="relative w-full overflow-hidden blueprint-grid">
      {/* Subtle radial spotlight gradient */}
      <div className="absolute inset-0 bg-radial-gradient pointer-events-none opacity-40 dark:opacity-20" />
      <HeroIntro />
    </section>
  );
}
