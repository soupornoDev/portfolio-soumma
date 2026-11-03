"use client";

import { useEffect, useRef, ReactNode } from "react";
import anime from "animejs";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { removeAnime } from "@/lib/animations";

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  distance?: number;
  className?: string;
  staggerChildrenSelector?: string;
}

export function ScrollReveal({
  children,
  delay = 0,
  direction = "up",
  distance = 24,
  className = "",
  staggerChildrenSelector,
}: ScrollRevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const el = elementRef.current;
    if (!el || prefersReducedMotion) return;

    // Calculate translation vector based on direction
    let tx = 0;
    let ty = 0;
    if (direction === "up") ty = distance;
    if (direction === "down") ty = -distance;
    if (direction === "left") tx = distance;
    if (direction === "right") tx = -distance;

    let animInstance: anime.AnimeInstance | null = null;
    let hasAnimated = false;

    // Set initial hidden state for animation
    if (!staggerChildrenSelector) {
      el.style.opacity = "0";
      el.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
    } else {
      const childTargets = el.querySelectorAll(staggerChildrenSelector);
      childTargets.forEach((child) => {
        (child as HTMLElement).style.opacity = "0";
        (child as HTMLElement).style.transform = `translate3d(0, ${distance}px, 0)`;
      });
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            hasAnimated = true;
            observer.unobserve(el);

            if (staggerChildrenSelector) {
              const targets = el.querySelectorAll(staggerChildrenSelector);
              if (targets.length) {
                removeAnime(targets);
                animInstance = anime({
                  targets,
                  opacity: [0, 1],
                  translateY: [distance, 0],
                  scale: [0.98, 1],
                  duration: 800,
                  delay: anime.stagger(100, { start: delay }),
                  easing: "cubicBezier(0.16, 1, 0.3, 1)",
                  complete: () => {
                    targets.forEach((t) => {
                      (t as HTMLElement).style.opacity = "";
                      (t as HTMLElement).style.transform = "";
                    });
                  },
                });
              }
            } else {
              removeAnime(el);
              animInstance = anime({
                targets: el,
                opacity: [0, 1],
                translateX: [tx, 0],
                translateY: [ty, 0],
                duration: 800,
                delay,
                easing: "cubicBezier(0.16, 1, 0.3, 1)",
                complete: () => {
                  if (el) {
                    el.style.opacity = "";
                    el.style.transform = "";
                  }
                },
              });
            }
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: "0px 0px 60px 0px",
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (animInstance) animInstance.pause();
      if (el) {
        removeAnime(el);
        if (staggerChildrenSelector) {
          const targets = el.querySelectorAll(staggerChildrenSelector);
          removeAnime(targets);
        }
      }
    };
  }, [delay, direction, distance, prefersReducedMotion, staggerChildrenSelector]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
}
