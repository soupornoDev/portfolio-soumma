
import { PORTFOLIO_DATA } from "@/lib/portfolio-data";
import { SITE_URL, SITE_CONFIG } from "@/lib/site-config";

/**
 * Schema.org JSON-LD structured data.
 *
 * Establishes a consistent identity for:
 * - Soumma Chakraborty (Person)
 * - Personal Portfolio (WebSite)
 * - Professional Profile (ProfilePage)
 * - Engineering Projects (ItemList)
 */

export function JsonLd() {
  // Normalize the canonical URL.
  const siteUrl = SITE_URL.replace(/\/+$/, "");

  // Stable entity identifiers.
  const personId = `${siteUrl}/#person`;
  const websiteId = `${siteUrl}/#website`;
  const profileId = `${siteUrl}/#profilepage`;
  const projectsId = `${siteUrl}/#projects`;

  const person = PORTFOLIO_DATA.personal;

  // --------------------------------------------------
  // Person Entity
  // --------------------------------------------------

  const personSchema = {
    "@type": "Person",
    "@id": personId,

    name: person.name,

    url: siteUrl,

    jobTitle: "Mechanical Engineer & CNC Machine Designer",

    description: person.bio,

    disambiguatingDescription: person.specialization,

    ...(person.email
      ? { email: person.email }
      : {}),

    ...(person.linkedin
      ? { sameAs: [person.linkedin] }
      : {}),

    knowsAbout: [
      "Mechanical Engineering",
      "Precision Machine Design",
      "CNC Machine Design",
      "CNC Machine Architecture",
      "CAD/CAM Integration",
      "Product Design Engineering",
      "Creo Parametric",
      "Siemens NX",
      "SolidWorks",
      "Sheet Metal Design",
      "Surface Modeling",
      "Finite Element Analysis",
      "ANSYS Simulation",
      "Geometric Dimensioning and Tolerancing",
      "GD&T",
      "ASME Y14.5",
      "ISO 1101",
      "3D Parametric Modeling",
      "Delcam PowerShape",
      "Delcam PowerMill",
      "Mastercam",
      "Press Tool and Die Design",
      "Plastic Injection Mould Design",
      "Reverse Engineering",
      "Engineering Metrology",
      "Quality Assurance",
    ],

    hasOccupation: {
      "@type": "Occupation",
      name: "Mechanical Design Engineer",
      description:
        "Mechanical engineering professional specializing in CNC machine design, CAD/CAM integration, product development, and structural analysis.",

      skills: [
        "Creo Parametric",
        "Siemens NX",
        "SolidWorks",
        "Mastercam",
        "Delcam PowerMill",
        "ANSYS FEA",
        "GD&T",
        "CNC Machine Design",
        "Sheet Metal Design",
        "Injection Mould Design",
        "Press Tool Design",
      ],
    },

    ...(PORTFOLIO_DATA.education.length > 0
      ? {
          alumniOf: PORTFOLIO_DATA.education.map((edu) => ({
            "@type": "EducationalOrganization",
            name: edu.institution,

            ...(edu.institutionUrl
              ? { url: edu.institutionUrl }
              : {}),
          })),
        }
      : {}),

    ...(PORTFOLIO_DATA.certificates.length > 0
      ? {
          hasCredential: PORTFOLIO_DATA.certificates.map(
            (cert) => ({
              "@type": "EducationalOccupationalCredential",
              name: cert.title,

              ...(cert.issuer
                ? {
                    recognizedBy: {
                      "@type": "Organization",
                      name: cert.issuer,
                    },
                  }
                : {}),

              ...(cert.category
                ? { credentialCategory: cert.category }
                : {}),
            })
          ),
        }
      : {}),
  };

  // --------------------------------------------------
  // Website Entity
  // --------------------------------------------------

  const websiteSchema = {
    "@type": "WebSite",
    "@id": websiteId,

    // Keep this exact for Google website-name recognition.
    name: person.name,

    alternateName: `${person.name}'s Portfolio`,

    url: `${siteUrl}/`,

    description: SITE_CONFIG.description,

    inLanguage: "en",

    publisher: {
      "@id": personId,
    },
  };

  // --------------------------------------------------
  // Profile Page Entity
  // --------------------------------------------------

  const profileSchema = {
    "@type": "ProfilePage",
    "@id": profileId,

    url: `${siteUrl}/`,

    name: `${person.name} | Mechanical Engineer`,

    description: SITE_CONFIG.description,

    isPartOf: {
      "@id": websiteId,
    },

    mainEntity: {
      "@id": personId,
    },

    about: {
      "@id": personId,
    },

    inLanguage: "en",
  };

  // --------------------------------------------------
  // Engineering Projects
  // --------------------------------------------------

  const projectsSchema = {
    "@type": "ItemList",
    "@id": projectsId,

    name: "Mechanical Engineering & CNC Design Projects",

    description:
      "Professional engineering projects involving CNC machine design, precision tooling, product development, and mechanical design.",

    numberOfItems: PORTFOLIO_DATA.projects.length,

    itemListOrder: "https://schema.org/ItemListOrderAscending",

    itemListElement: PORTFOLIO_DATA.projects.map(
      (project, index) => ({
        "@type": "ListItem",

        position: index + 1,

        item: {
          "@type": "CreativeWork",

          name: project.title,

          ...(project.subtitle
            ? { headline: project.subtitle }
            : {}),

          description: project.description,

          creator: {
            "@id": personId,
          },

          ...(project.tools?.length
            ? { keywords: project.tools }
            : {}),

          ...(project.materials?.length
            ? { material: project.materials }
            : {}),

          ...(project.drawingCode
            ? { identifier: project.drawingCode }
            : {}),
        },
      })
    ),
  };

  // --------------------------------------------------
  // Combined Structured Data
  // --------------------------------------------------

  const structuredData = {
    "@context": "https://schema.org",

    "@graph": [
      personSchema,
      websiteSchema,
      profileSchema,

      ...(PORTFOLIO_DATA.projects.length > 0
        ? [projectsSchema]
        : []),
    ],
  };

  // Safely serialize JSON-LD for script embedding.
  const jsonLd = JSON.stringify(structuredData).replace(
    /[<>&\u2028\u2029]/g,
    (char) =>
      `\\u${char.charCodeAt(0).toString(16).padStart(4, "0")}`
  );

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: jsonLd,
      }}
    />
  );
}
