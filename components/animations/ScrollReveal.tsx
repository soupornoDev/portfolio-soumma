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
    if (!el) return;

    if (prefersReducedMotion) {
      el.style.opacity = "";
      el.style.transform = "";
      return;
    }

    // Calculate translation vector based on direction
    let tx = 0;
    let ty = 0;
    if (direction === "up") ty = distance;
    if (direction === "down") ty = -distance;
    if (direction === "left") tx = distance;
    if (direction === "right") tx = -distance;

    let animInstance: anime.AnimeInstance | null = null;
    let hasAnimated = false;

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
                  duration: 650,
                  delay: anime.stagger(80, { start: delay }),
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
                duration: 650,
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
        rootMargin: "0px 0px 80px 0px",
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (animInstance) animInstance.pause();
      if (el) {
        removeAnime(el);
        el.style.opacity = "";
        el.style.transform = "";
        if (staggerChildrenSelector) {
          const targets = el.querySelectorAll(staggerChildrenSelector);
          removeAnime(targets);
          targets.forEach((t) => {
            (t as HTMLElement).style.opacity = "";
            (t as HTMLElement).style.transform = "";
          });
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
