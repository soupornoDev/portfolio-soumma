import { PORTFOLIO_DATA } from "@/lib/portfolio-data";
import { SITE_URL, SITE_CONFIG } from "@/lib/site-config";

/**
 * Validated Schema.org structured data (JSON-LD) for Google Search Console and SEO
 */
export function JsonLd() {
  const personId = `${SITE_URL}/#person`;
  const websiteId = `${SITE_URL}/#website`;

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: PORTFOLIO_DATA.personal.name,
        jobTitle: "Mechanical Engineer & CNC Machine Designer",
        disambiguatingDescription: PORTFOLIO_DATA.personal.specialization,
        description: PORTFOLIO_DATA.personal.bio,
        url: SITE_URL,
        email: PORTFOLIO_DATA.personal.email,
        sameAs: [PORTFOLIO_DATA.personal.linkedin],
        knowsAbout: [
          "Mechanical Engineering",
          "CAD/CAM Engineering",
          "CNC Machine Design",
          "Product Design Engineering",
          "Creo Parametric Design",
          "Siemens NX Design",
          "Sheet Metal Design",
          "Surface Modeling",
          "Finite Element Analysis",
          "ANSYS Simulation",
          "GD&T (ASME Y14.5 / ISO 1101)",
          "Precision Machine Design",
          "3D Parametric Modeling",
          "SolidWorks",
          "Delcam PowerShape",
          "Delcam PowerMill",
          "Mastercam",
          "Press Tool & Die Design",
          "Plastic Injection Mould Design",
          "Reverse Engineering",
          "Quality Assurance & 7 QC Tools",
          "Engineering Metrology",
        ],
        hasOccupation: {
          "@type": "Occupation",
          name: "Mechanical Design Engineer",
          description: "Specializing in CAD/CAM, CNC Machine Design, Sheet Metal Design, Surface Modeling, and ANSYS FEA Simulation.",
          skills: "SolidWorks, Siemens NX, Creo Parametric, Mastercam, Delcam PowerMill, ANSYS FEA, GD&T, CNC Machining, Injection Mould Design, Press Tool Design",
        },
        alumniOf: PORTFOLIO_DATA.education.map((edu) => ({
          "@type": "EducationalOrganization",
          name: edu.institution,
          ...(edu.institutionUrl ? { url: edu.institutionUrl } : {}),
        })),
        hasCredential: PORTFOLIO_DATA.certificates.map((cert) => ({
          "@type": "EducationalOccupationalCredential",
          name: cert.title,
          recognizedBy: {
            "@type": "Organization",
            name: cert.issuer,
          },
          credentialCategory: cert.category,
        })),
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: SITE_URL,
        name: `${PORTFOLIO_DATA.personal.name} | Mechanical Engineering Portfolio`,
        description: SITE_CONFIG.description,
        inLanguage: "en-US",
        publisher: {
          "@id": personId,
        },
      },
      {
        "@type": "ProfilePage",
        "@id": `${SITE_URL}/#profilepage`,
        url: SITE_URL,
        name: `${PORTFOLIO_DATA.personal.name} - Professional Mechanical Engineering Portfolio`,
        isPartOf: {
          "@id": websiteId,
        },
        about: {
          "@id": personId,
        },
        mainEntity: {
          "@id": personId,
        },
      },
      {
        "@type": "ItemList",
        "@id": `${SITE_URL}/#projects-list`,
        name: "Mechanical Engineering & Tool Design Projects",
        description: "Portfolio of CNC machines, press tools, injection moulds, and aerospace prototypes",
        itemListElement: PORTFOLIO_DATA.projects.map((proj, idx) => ({
          "@type": "ListItem",
          position: idx + 1,
          item: {
            "@type": "CreativeWork",
            name: proj.title,
            headline: proj.subtitle,
            description: proj.description,
            creator: {
              "@id": personId,
            },
            keywords: proj.tools.join(", "),
            material: proj.materials.join(", "),
            identifier: proj.drawingCode,
          },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
      }}
    />
  );
}
