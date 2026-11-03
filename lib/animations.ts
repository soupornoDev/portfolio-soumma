import anime from "animejs";

/**
 * Safely pause and remove any active Anime.js instances on targets
 */
export function removeAnime(
  targets:
    | Parameters<typeof anime.remove>[0]
    | HTMLElement
    | SVGElement
    | NodeList
    | NodeListOf<Element>
    | Element[]
    | null
    | undefined
): void {
  if (typeof window === "undefined" || !targets) return;
  try {
    anime.remove(targets as Parameters<typeof anime.remove>[0]);
  } catch {
    // Graceful fallback
  }
}

/**
 * Hero Section Staggered Entrance Sequence
 */
export function createHeroAnimation(container: HTMLElement): anime.AnimeTimelineInstance | null {
  if (typeof window === "undefined" || !container) return null;

  removeAnime(container);

  const timeline = anime.timeline({
    easing: "cubicBezier(0.16, 1, 0.3, 1)", // Apple-like smooth decel
  });

  // Staggered reveal of badge, headline, subtitle, buttons, and metrics
  timeline
    .add({
      targets: container.querySelectorAll(".hero-badge"),
      opacity: [0, 1],
      translateY: [16, 0],
      duration: 700,
      delay: 100,
    })
    .add(
      {
        targets: container.querySelectorAll(".hero-heading-line"),
        opacity: [0, 1],
        translateY: [32, 0],
        duration: 900,
        delay: anime.stagger(120),
      },
      "-=500"
    )
    .add(
      {
        targets: container.querySelectorAll(".hero-subtitle"),
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 800,
      },
      "-=600"
    )
    .add(
      {
        targets: container.querySelectorAll(".hero-description"),
        opacity: [0, 1],
        translateY: [16, 0],
        duration: 800,
      },
      "-=600"
    )
    .add(
      {
        targets: container.querySelectorAll(".hero-cta-btn"),
        opacity: [0, 1],
        translateY: [16, 0],
        scale: [0.96, 1],
        duration: 700,
        delay: anime.stagger(90),
      },
      "-=550"
    )
    .add(
      {
        targets: container.querySelectorAll(".hero-metric-item"),
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 750,
        delay: anime.stagger(80),
      },
      "-=500"
    )
    .add(
      {
        targets: container.querySelectorAll(".hero-visual-container"),
        opacity: [0, 1],
        scale: [0.94, 1],
        duration: 1000,
      },
      "-=800"
    );

  return timeline;
}

/**
 * Scroll Reveal Animation for generic section containers
 */
export function animateScrollItem(element: HTMLElement, delay = 0): anime.AnimeInstance | null {
  if (typeof window === "undefined" || !element) return null;

  removeAnime(element);

  return anime({
    targets: element,
    opacity: [0, 1],
    translateY: [24, 0],
    duration: 800,
    delay,
    easing: "cubicBezier(0.16, 1, 0.3, 1)",
  });
}

/**
 * Staggered Card Reveal Animation
 */
export function animateCardGrid(container: HTMLElement, cardSelector: string): anime.AnimeInstance | null {
  if (typeof window === "undefined" || !container) return null;

  const cards = container.querySelectorAll(cardSelector);
  if (!cards.length) return null;

  removeAnime(cards);

  return anime({
    targets: cards,
    opacity: [0, 1],
    translateY: [30, 0],
    scale: [0.98, 1],
    duration: 850,
    delay: anime.stagger(100),
    easing: "cubicBezier(0.16, 1, 0.3, 1)",
  });
}

/**
 * Precision Line / Technical Drawing Animation
 */
export function animateSvgDrawing(svgElement: SVGElement): anime.AnimeInstance | null {
  if (typeof window === "undefined" || !svgElement) return null;

  const paths = svgElement.querySelectorAll("path, line, circle, rect");
  if (!paths.length) return null;

  removeAnime(paths);

  return anime({
    targets: paths,
    strokeDashoffset: [anime.setDashoffset, 0],
    easing: "easeInOutSine",
    duration: 1600,
    delay: anime.stagger(120),
  });
}
