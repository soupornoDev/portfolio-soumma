import { PORTFOLIO_DATA } from "./portfolio-data";

/**
 * Centralized site configuration for technical SEO, canonical URLs,
 * OpenGraph, Twitter cards, and sitemaps.
 */
const rawSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://soumma-chakraborty.vercel.app");

// Normalize to ensure no trailing slash
export const SITE_URL = rawSiteUrl.replace(/\/+$/, "");

export const SITE_CONFIG = {
  name: PORTFOLIO_DATA.personal.name,
  title: `${PORTFOLIO_DATA.personal.name} | Mechanical Engineer — CNC Machine Design & Precision Systems`,
  titleTemplate: `%s | ${PORTFOLIO_DATA.personal.name}`,
  description: `${PORTFOLIO_DATA.personal.name} — Mechanical Engineer specializing in CNC machine design, CAD/CAM (SolidWorks, Siemens NX, Creo), precision GD&T (ASME Y14.5), press tools, injection moulds, and ANSYS FEA simulation.`,
  url: SITE_URL,
  ogImage: `${SITE_URL}/opengraph-image`,
  keywords: [
    "Mechanical Engineer",
    "Mechanical Engineer Portfolio",
    "CNC Machine Design",
    "CNC Machine Design Engineer",
    "CAD/CAM Engineer",
    "Product Design Engineer",
    "Creo Parametric Design",
    "Siemens NX Design",
    "Sheet Metal Design",
    "Surface Modeling",
    "Finite Element Analysis",
    "ANSYS Simulation",
    "SolidWorks",
    "Siemens NX",
    "PTC Creo",
    "Delcam PowerShape",
    "PowerMill",
    "Mastercam",
    "Press Tool Design",
    "Injection Mould Design",
    "Reverse Engineering",
    "GD&T",
    "ASME Y14.5",
    "ANSYS FEA Simulation",
    "Precision Machine Design",
    "Quality Assurance Engineer",
    "7 QC Tools",
    "CTTC Bhubaneswar",
    "Soumma Chakraborty",
  ],
  author: {
    name: PORTFOLIO_DATA.personal.name,
    email: PORTFOLIO_DATA.personal.email,
    linkedin: PORTFOLIO_DATA.personal.linkedin,
    url: SITE_URL,
  },
  googleVerificationToken: "LBL_tyaoM86ckPju-CvnAe-RMdoC5ViQXc06X0aRl58",
  googleVerificationFile: "googleeec2f376a6707172.html",
  lastModifiedDate: "2026-11-03",
} as const;
