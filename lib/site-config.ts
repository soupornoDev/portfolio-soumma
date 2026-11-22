import type { Metadata, MetadataRoute } from "next";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://portfolio-soumma.vercel.app"
).replace(/\/$/, "");

type SitemapFrequency = NonNullable<
  MetadataRoute.Sitemap[number]["changeFrequency"]
>;

export interface SiteRoute {
  path: string;
  changeFrequency: SitemapFrequency;
  priority: number;
  images?: string[];
}

export const SITE_CONFIG = {
  // Brand & Site Name (Google Search-e raw URL-er bodole ei text dekhate help kore)
  siteName: "Soumma Chakraborty",
  alternateNames: [
    "Soumma Chakraborty Portfolio",
    "Soumma Chakraborty Mechanical Engineer",
    "Soumma Chakraborty CNC Machine Design",
  ],

  // Core SEO Metadata (Title 60 char & Description 160 char limit-er moddhe)
  title: "Soumma Chakraborty | Mechanical & CNC Design Engineer",
  titleTemplate: "%s | Soumma Chakraborty",
  description:
    "Mechanical Engineer specializing in CNC machine design, tool design (press tools & injection moulds), CAD/CAM (SolidWorks, NX, Creo, Mastercam), GD&T, and ANSYS FEA.",

  // Sync Dates & Locale
  lastModifiedDate: "2026-11-22",
  locale: "en_IN",
  language: "en-IN",

  // public/ folder-e OG image thakle exact path dao (na thakle empty string "" rekho)
  ogImage: "/og-image.png",

  // Author & Contact Entity (GEO / Knowledge Graph)
  author: {
    name: "Soumma Chakraborty",
    jobTitle: "Mechanical Engineer — CNC Machine & Tool Design",
    email: "soummachakraborty1999@gmail.com",
    location: {
      city: "Kolkata",
      region: "West Bengal",
      country: "IN",
      label: "Kolkata, West Bengal, India",
    },
    // Tomar exact LinkedIn / GitHub profile URL gulo ekhane bosiye dio
    sameAs: [
      // "https://www.linkedin.com/in/your-exact-handle",
    ] as string[],
  },

  // Sitemap Routes (notun kono page banale sudhu ekhane add korlei hobe)
  routes: [
    {
      path: "",
      changeFrequency: "weekly",
      priority: 1.0,
      images: ["/og-image.png"],
    },
    {
      path: "/cv",
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ] satisfies SiteRoute[],

  // GEO & AEO AI Crawlers
  aiCrawlers: [
    "Googlebot",
    "Google-Extended",
    "GPTBot",
    "OAI-SearchBot",
    "ChatGPT-User",
    "PerplexityBot",
    "ClaudeBot",
    "Applebot-Extended",
  ],

  // Targeted Keywords
  keywords: [
    "Soumma Chakraborty",
    "CNC Machine Design Engineer",
    "Mechanical Design Engineer Kolkata",
    "Tool Design Engineer",
    "Press Tool Design",
    "Plastic Injection Mould Design",
    "SolidWorks Designer",
    "Siemens NX CAD CAM",
    "PTC Creo",
    "Mastercam Programming",
    "GD&T ASME Y14.5",
    "ANSYS FEA",
  ],

  // Entity Knowledge Graph Signals (GEO)
  knowsAbout: [
    "CNC Machine Design",
    "Precision Mechanical Systems",
    "SolidWorks",
    "Siemens NX",
    "PTC Creo",
    "Autodesk Fusion 360",
    "AutoCAD",
    "Mastercam",
    "Delcam PowerShape",
    "PowerMill",
    "ANSYS FEA",
    "GD&T (ASME Y14.5 / ISO 1101)",
    "Plastic Injection Mould Design",
    "Sheet Metal Press Tool Design",
    "Reverse Engineering",
    "DFM and DFA",
    "7 QC Tools & Engineering Metrology",
  ],

  alumniOf: [
    "Central Tool Room and Training Centre (CTTC), Bhubaneswar",
    "MSME Technology Centre, Kolkata",
    "Future Institute of Technology, Kolkata",
  ],

  // Answer Engine Optimization (AEO) — Direct Q&A for AI & Featured Snippets
  faqs: [
    {
      question: "Who is Soumma Chakraborty?",
      answer:
        "Soumma Chakraborty is a Mechanical Engineer from Kolkata, West Bengal, specializing in CNC machine architecture, tool design (press tools and plastic injection moulds), CAD/CAM (SolidWorks, Siemens NX, PTC Creo, Mastercam), GD&T (ASME Y14.5), and ANSYS FEA, with prior experience as a Quality Assurance Engineer at Jyoti CNC Automation Ltd.",
    },
    {
      question: "What engineering projects has Soumma Chakraborty completed?",
      answer:
        "Key engineering projects include a Key Ring Sheet Metal Press Tool (±0.008 mm clearance), a Reverse-Engineered Hand Injection Moulding Machine (H7/g6 fit), a Multi-Rotor Drone Prototype using Delcam PowerShape and PowerMill, and an ANSYS-validated Marker Stand Plastic Injection Mould.",
    },
    {
      question: "What CAD, CAM, and CAE tools does Soumma Chakraborty specialize in?",
      answer:
        "Core software competencies include SolidWorks, Siemens NX, Autodesk Fusion 360, AutoCAD, PTC Creo, Mastercam, Delcam PowerShape, PowerMill, and ANSYS for static stress, modal, and deflection validation.",
    },
    {
      question: "What qualifications and certifications does Soumma Chakraborty hold?",
      answer:
        "He holds a B.Tech in Mechanical Engineering from Future Institute of Technology, Kolkata, a Post Graduate Diploma in Tool Design and CAD/CAM from CTTC Bhubaneswar, an Advance Certificate in CNC Machining from MSME Kolkata, and IIT NPTEL certifications from IIT Roorkee, IIT Kanpur, and IIT Kharagpur.",
    },
  ],
} as const;

/**
 * Validated Date helper for sitemap & metadata
 */
export function getLastModifiedDate(): Date {
  const parsed = new Date(SITE_CONFIG.lastModifiedDate);
  return Number.isNaN(parsed.getTime()) ? new Date() : parsed;
}

/**
 * Next.js Metadata builder for app/layout.tsx
 */
export function buildSiteMetadata(): Metadata {
  const ogImageUrl = SITE_CONFIG.ogImage
    ? `${SITE_URL}${SITE_CONFIG.ogImage}`
    : undefined;

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: SITE_CONFIG.title,
      template: SITE_CONFIG.titleTemplate,
    },
    description: SITE_CONFIG.description,
    applicationName: SITE_CONFIG.siteName,
    keywords: [...SITE_CONFIG.keywords],
    authors: [{ name: SITE_CONFIG.author.name, url: SITE_URL }],
    creator: SITE_CONFIG.author.name,
    publisher: SITE_CONFIG.author.name,
    alternates: {
      canonical: SITE_URL,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
        "max-video-preview": -1,
      },
    },
    openGraph: {
      type: "profile",
      url: SITE_URL,
      siteName: SITE_CONFIG.siteName,
      title: SITE_CONFIG.title,
      description: SITE_CONFIG.description,
      locale: SITE_CONFIG.locale,
      ...(ogImageUrl
        ? {
            images: [
              {
                url: ogImageUrl,
                width: 1200,
                height: 630,
                alt: SITE_CONFIG.title,
              },
            ],
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: SITE_CONFIG.title,
      description: SITE_CONFIG.description,
      ...(ogImageUrl ? { images: [ogImageUrl] } : {}),
    },
  };
}

/**
 * Structured Data (JSON-LD) builder for SEO + GEO + AEO
 */
export function buildStructuredData() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_CONFIG.siteName,
        alternateName: [...SITE_CONFIG.alternateNames],
        description: SITE_CONFIG.description,
        inLanguage: SITE_CONFIG.language,
      },
      {
        "@type": "ProfilePage",
        "@id": `${SITE_URL}/#profilepage`,
        url: SITE_URL,
        name: SITE_CONFIG.title,
        dateModified: SITE_CONFIG.lastModifiedDate,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        mainEntity: { "@id": `${SITE_URL}/#person` },
      },
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: SITE_CONFIG.author.name,
        url: SITE_URL,
        email: `mailto:${SITE_CONFIG.author.email}`,
        jobTitle: SITE_CONFIG.author.jobTitle,
        description: SITE_CONFIG.description,
        address: {
          "@type": "PostalAddress",
          addressLocality: SITE_CONFIG.author.location.city,
          addressRegion: SITE_CONFIG.author.location.region,
          addressCountry: SITE_CONFIG.author.location.country,
        },
        alumniOf: SITE_CONFIG.alumniOf.map((institution) => ({
          "@type": "EducationalOrganization",
          name: institution,
        })),
        knowsAbout: [...SITE_CONFIG.knowsAbout],
        ...(SITE_CONFIG.author.sameAs.length > 0
          ? { sameAs: [...SITE_CONFIG.author.sameAs] }
          : {}),
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/#faq`,
        mainEntity: SITE_CONFIG.faqs.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
    ],
  };
}
