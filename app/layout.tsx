import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { SITE_URL } from "@/lib/site-config";

const baseUrl = SITE_URL.replace(/\/$/, "");

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Soumma Chakraborty | Mechanical & CNC Design Engineer",
    template: "%s | Soumma Chakraborty",
  },
  description:
    "Mechanical Engineer specializing in CNC machine design, CAD/CAM (SolidWorks, Siemens NX, Creo, Mastercam), GD&T (ASME Y14.5), ANSYS FEA, and tool design.",
  applicationName: "Soumma Chakraborty",
  authors: [{ name: "Soumma Chakraborty", url: baseUrl }],
  alternates: {
    canonical: baseUrl,
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
    url: baseUrl,
    siteName: "Soumma Chakraborty",
    title: "Soumma Chakraborty | Mechanical & CNC Design Engineer",
    description:
      "CNC Machine Architecture, Tool Design (Press Tool & Injection Mould), CAD/CAM, and Precision Manufacturing Engineering Portfolio.",
    locale: "en_IN",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${baseUrl}/#website`,
      url: baseUrl,
      name: "Soumma Chakraborty",
      alternateName: [
        "Soumma Chakraborty Portfolio",
        "Soumma Chakraborty Mechanical Engineer",
      ],
      inLanguage: "en-IN",
    },
    {
      "@type": "ProfilePage",
      "@id": `${baseUrl}/#profilepage`,
      url: baseUrl,
      name: "Soumma Chakraborty — Mechanical & CNC Machine Design Portfolio",
      isPartOf: { "@id": `${baseUrl}/#website` },
      mainEntity: { "@id": `${baseUrl}/#person` },
    },
    {
      "@type": "Person",
      "@id": `${baseUrl}/#person`,
      name: "Soumma Chakraborty",
      url: baseUrl,
      email: "mailto:soummachakraborty1999@gmail.com",
      jobTitle: "Mechanical Engineer — CNC Machine & Tool Design",
      description:
        "Mechanical Engineer specializing in CNC machine architecture, press tools, plastic injection moulds, GD&T (ASME Y14.5), ANSYS FEA, and CAD/CAM.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Kolkata",
        addressRegion: "West Bengal",
        addressCountry: "IN",
      },
      alumniOf: [
        {
          "@type": "EducationalOrganization",
          name: "Central Tool Room and Training Centre (CTTC), Bhubaneswar",
        },
        {
          "@type": "EducationalOrganization",
          name: "Future Institute of Technology, Kolkata",
        },
        {
          "@type": "EducationalOrganization",
          name: "MSME Technology Centre, Kolkata",
        },
      ],
      worksFor: {
        "@type": "Organization",
        name: "Jyoti CNC Automation Ltd. (Former QA Engineer, 2023–2025)",
      },
      knowsAbout: [
        "CNC Machine Design",
        "SolidWorks",
        "Siemens NX",
        "PTC Creo",
        "Autodesk Fusion 360",
        "AutoCAD",
        "Mastercam",
        "PowerShape",
        "PowerMill",
        "ANSYS FEA",
        "GD&T ASME Y14.5",
        "Plastic Injection Mould Design",
        "Sheet Metal Press Tool Design",
        "DFM and DFA",
      ],
    },
    {
      "@type": "FAQPage",
      "@id": `${baseUrl}/#faq`,
      mainEntity: [
        {
          "@type": "Question",
          name: "Who is Soumma Chakraborty?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Soumma Chakraborty is a Mechanical Engineer from Kolkata specializing in CNC machine design, precision mechanical systems, CAD/CAM (SolidWorks, Siemens NX, PTC Creo, Mastercam), GD&T (ASME Y14.5), and tool design, with prior experience as a Quality Assurance Engineer at Jyoti CNC Automation Ltd.",
          },
        },
        {
          "@type": "Question",
          name: "What engineering projects has Soumma Chakraborty designed?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Key projects include a Key Ring Sheet Metal Press Tool, Reverse-Engineered Hand Injection Moulding Machine, Multi-Rotor Drone Prototype using PowerShape and PowerMill, and an ANSYS-validated Marker Stand Plastic Injection Mould.",
          },
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
