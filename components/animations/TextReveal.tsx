"use client";

import { useEffect, useRef } from "react";
import anime from "animejs";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { removeAnime } from "@/lib/animations";

interface TextRevealProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "span" | "p";
  delay?: number;
}

export function TextReveal({
  text,
  className = "",
  as: Component = "h2",
  delay = 0,
}: TextRevealProps) {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    const words = containerRef.current.querySelectorAll(".reveal-word");
    if (!words.length) return;

    removeAnime(words);

    const anim = anime({
      targets: words,
      opacity: [0, 1],
      translateY: [16, 0],
      duration: 650,
      delay: anime.stagger(50, { start: delay }),
      easing: "cubicBezier(0.16, 1, 0.3, 1)",
      complete: () => {
        words.forEach((w) => {
          (w as HTMLElement).style.opacity = "";
          (w as HTMLElement).style.transform = "";
        });
      },
    });

    return () => {
      anim.pause();
      if (words.length) removeAnime(words);
    };
  }, [delay, prefersReducedMotion, text]);

  const words = text.split(" ");

  const Tag = Component as React.ElementType;

  return (
    <Tag ref={containerRef} className={className} aria-label={text}>
      {words.map((word, idx) => (
        <span
          key={idx}
          className="reveal-word inline-block mr-[0.28em] last:mr-0 transition-opacity"
        >
          {word}
        </span>
      ))}
    </Tag>
  );
}
