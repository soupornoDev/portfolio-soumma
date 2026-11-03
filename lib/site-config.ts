
import { PORTFOLIO_DATA } from "./portfolio-data";

/**
 * ============================================================
 * CENTRALIZED WEBSITE CONFIGURATION
 * ============================================================
 *
 * Purpose:
 * - Production website identity
 * - Canonical URL management
 * - Google SEO
 * - Open Graph / Social Sharing
 * - Sitemap configuration
 * - Google Search Console verification
 *
 * IMPORTANT:
 * Set NEXT_PUBLIC_SITE_URL in Vercel Production Environment.
 * Never use VERCEL_URL as your canonical production domain.
 */

// ------------------------------------------------------------
// 1. Production Website URL
// ------------------------------------------------------------

// This fallback matches the domain shown in your screenshot.
// Replace it if you have connected a different production domain.

const DEFAULT_SITE_URL =
  "https://portfolio-soumma.vercel.app";

const configuredSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
  DEFAULT_SITE_URL;

// Validate and normalize the URL.
function normalizeSiteUrl(value: string): string {
  let parsedUrl: URL;

  try {
    parsedUrl = new URL(value);
  } catch {
    throw new Error(
      `[SEO Configuration] Invalid NEXT_PUBLIC_SITE_URL: ${value}`
    );
  }

  if (
    parsedUrl.protocol !== "https:" &&
    parsedUrl.hostname !== "localhost"
  ) {
    throw new Error(
      "[SEO Configuration] Production website must use HTTPS."
    );
  }

  if (parsedUrl.username || parsedUrl.password) {
    throw new Error(
      "[SEO Configuration] Website URL cannot contain credentials."
    );
  }

  if (
    parsedUrl.pathname !== "/" ||
    parsedUrl.search ||
    parsedUrl.hash
  ) {
    throw new Error(
      "[SEO Configuration] NEXT_PUBLIC_SITE_URL must contain only the website origin."
    );
  }

  return parsedUrl.origin;
}

export const SITE_URL = normalizeSiteUrl(configuredSiteUrl);

// ------------------------------------------------------------
// 2. Website Identity
// ------------------------------------------------------------

const PERSON_NAME = PORTFOLIO_DATA.personal.name;

const SITE_NAME = PERSON_NAME;

const SITE_DESCRIPTION =
  `${PERSON_NAME} — Mechanical Engineer specializing in ` +
  "precision machine design, CNC machine architecture, CAD/CAM " +
  "(SolidWorks, Siemens NX, Creo), GD&T, press tool design, " +
  "injection mould design, and ANSYS FEA simulation.";

// ------------------------------------------------------------
// 3. SEO Configuration
// ------------------------------------------------------------

export const SITE_CONFIG = {
  // Website identity
  name: SITE_NAME,

  // Page titles
  title:
    `${PERSON_NAME} | Mechanical Engineer — ` +
    "CNC Machine Design & Precision Systems",

  titleTemplate: `%s | ${PERSON_NAME}`,

  // Search engine description
  description: SITE_DESCRIPTION,

  // Canonical website URL
  url: SITE_URL,

  // Social sharing image
  ogImage: `${SITE_URL}/opengraph-image`,

  // Website language
  language: "en",

  // Search keywords
  keywords: [
    "Soumma Chakraborty",
    "Mechanical Engineer",
    "Mechanical Engineering Portfolio",
    "CNC Machine Design",
    "CNC Machine Design Engineer",
    "Precision Machine Design",
    "CAD CAM Engineer",
    "Product Design Engineering",
    "Mechanical Product Development",
    "Creo Parametric",
    "Siemens NX",
    "SolidWorks",
    "Sheet Metal Design",
    "Surface Modeling",
    "ANSYS FEA",
    "Finite Element Analysis",
    "GD&T",
    "ASME Y14.5",
    "Press Tool Design",
    "Injection Mould Design",
    "Mastercam",
    "Delcam PowerMill",
    "Reverse Engineering",
    "Engineering Metrology",
  ],

  // ----------------------------------------------------------
  // 4. Author Information
  // ----------------------------------------------------------

  author: {
    name: PERSON_NAME,

    email: PORTFOLIO_DATA.personal.email,

    linkedin: PORTFOLIO_DATA.personal.linkedin,

    url: SITE_URL,
  },

  // ----------------------------------------------------------
  // 5. Google Search Console
  // ----------------------------------------------------------

  googleVerificationToken:
    "LBL_tyaoM86ckPju-CvnAe-RMdoC5ViQXc06X0aRl58",

  // Place the verification HTML file inside /public.
  googleVerificationFile:
    "googleeec2f376a6707172.html",

  // ----------------------------------------------------------
  // 6. Sitemap / Content Information
  // ----------------------------------------------------------

  // Update when your homepage content is materially modified.
  lastModifiedDate: "2026-11-03",

} as const;

// ------------------------------------------------------------
// 7. Reusable SEO Constants
// ------------------------------------------------------------

export const SITE_SEO = {
  siteName: SITE_NAME,

  siteUrl: SITE_URL,

  personName: PERSON_NAME,

  canonicalUrl: `${SITE_URL}/`,

  openGraphImage: SITE_CONFIG.ogImage,

  description: SITE_DESCRIPTION,

  language: SITE_CONFIG.language,
} as const;
