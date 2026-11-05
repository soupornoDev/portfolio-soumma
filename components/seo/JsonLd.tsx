import { PORTFOLIO_DATA } from "@/lib/portfolio-data";
import { SITE_URL, SITE_CONFIG } from "@/lib/site-config";

/**
 * Compact, standards-compliant Schema.org JSON-LD structured data.
 * Optimized for rich search snippets while preserving a high text-to-code ratio.
 */
export function JsonLd() {
  const siteUrl = SITE_URL.replace(/\/+$/, "");
  const personId = `${siteUrl}/#person`;
  const websiteId = `${siteUrl}/#website`;

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: PORTFOLIO_DATA.personal.name,
        url: siteUrl,
        jobTitle: "Mechanical Engineer & CNC Machine Designer",
        disambiguatingDescription: "CNC Machine Design & Mechanical Engineering",
        sameAs: [PORTFOLIO_DATA.personal.linkedin],
        knowsAbout: [
          "Mechanical Engineering",
          "CNC Machine Design",
          "CAD/CAM Integration",
          "SolidWorks",
          "Siemens NX",
          "PTC Creo",
          "Mastercam",
          "GD&T (ASME Y14.5)",
          "FEA Simulation (ANSYS)",
          "Press Tool Design",
          "Plastic Injection Mould Design",
          "Engineering Metrology",
        ],
        alumniOf: PORTFOLIO_DATA.education.map((edu) => ({
          "@type": "EducationalOrganization",
          name: edu.institution,
        })),
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        name: PORTFOLIO_DATA.personal.name,
        url: `${siteUrl}/`,
        description: SITE_CONFIG.description,
        inLanguage: "en",
        publisher: { "@id": personId },
      },
      {
        "@type": "ProfilePage",
        "@id": `${siteUrl}/#profilepage`,
        url: `${siteUrl}/`,
        name: `${PORTFOLIO_DATA.personal.name} | Mechanical Engineer`,
        isPartOf: { "@id": websiteId },
        mainEntity: { "@id": personId },
      },
      {
        "@type": "ItemList",
        "@id": `${siteUrl}/#projects`,
        name: "Mechanical Engineering & Tool Design Projects",
        numberOfItems: PORTFOLIO_DATA.projects.length,
        itemListElement: PORTFOLIO_DATA.projects.map((proj, idx) => ({
          "@type": "ListItem",
          position: idx + 1,
          item: {
            "@type": "CreativeWork",
            name: proj.title,
            headline: proj.subtitle,
            identifier: proj.drawingCode,
            creator: { "@id": personId },
          },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  );
}
