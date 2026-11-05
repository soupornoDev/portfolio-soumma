
import type { Metadata } from "next";
import type { ReactNode } from "react";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ToastContainer } from "@/components/ui/Toast";
import { JsonLd } from "@/components/seo/JsonLd";

import { PORTFOLIO_DATA } from "@/lib/portfolio-data";
import { SITE_URL, SITE_CONFIG } from "@/lib/site-config";

// --------------------------------------------------
// Fonts
// --------------------------------------------------

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// --------------------------------------------------
// Site identity
// --------------------------------------------------

const siteName = PORTFOLIO_DATA.personal.name;
const siteUrl = SITE_URL.replace(/\/+$/, "");

const siteDescription = SITE_CONFIG.description;

// --------------------------------------------------
// SEO Metadata
// --------------------------------------------------

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  applicationName: siteName,

  title: {
    default: SITE_CONFIG.title,
    template: SITE_CONFIG.titleTemplate,
  },

  description: siteDescription,

  keywords: [...SITE_CONFIG.keywords],

  authors: [
    {
      name: siteName,
      url: siteUrl,
    },
  ],

  creator: siteName,
  publisher: siteName,

  category: "Mechanical Engineering & CNC Machine Design",

  alternates: {
    canonical: "/",
  },

  // Search engine indexing
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  // Browser behavior
  referrer: "strict-origin-when-cross-origin",

  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },

  // Google Search Console verification
  verification: {
    google: SITE_CONFIG.googleVerificationToken,
  },

  // Open Graph / Facebook / LinkedIn
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName,
    title: SITE_CONFIG.title,
    description: siteDescription,

    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${siteName} | CNC Machine Design Engineer`,
        type: "image/png",
      },
    ],
  },

  // Twitter / X
  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.title,
    description: siteDescription,
    images: ["/opengraph-image"],
  },
};

// --------------------------------------------------
// Root Layout
// --------------------------------------------------

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`
        ${geistSans.variable}
        ${geistMono.variable}
        font-sans
        scroll-smooth
        h-full
        antialiased
      `}
    >
      <body
        className="
          min-h-full
          flex
          flex-col
          font-sans
          bg-[var(--background)]
          text-[var(--foreground)]
          selection:bg-[var(--accent)]
          selection:text-white
        "
      >
        {/* Structured Data: Website + Person */}
        <JsonLd />

        {/* Accessibility: Skip Navigation */}
        <a
          href="#main-content"
          className="
            sr-only
            focus:not-sr-only
            focus:fixed
            focus:top-4
            focus:left-4
            focus:z-[100]
            focus:px-4
            focus:py-2
            focus:bg-[var(--foreground)]
            focus:text-[var(--background)]
            focus:rounded-md
            focus:shadow-lg
            focus:outline-none
            focus:ring-2
            focus:ring-[var(--accent)]
            font-mono
            text-xs
          "
        >
          Skip to main engineering content
        </a>

        <ThemeProvider>
          <Navbar />

          <main
            id="main-content"
            tabIndex={-1}
            className="
              flex-1
              flex
              flex-col
              focus:outline-none
            "
          >
            {children}
          </main>

          <Footer />

          <ToastContainer />
        </ThemeProvider>
      </body>
    </html>
  );
}
