import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ToastContainer } from "@/components/ui/Toast";
import { JsonLd } from "@/components/seo/JsonLd";
import { PORTFOLIO_DATA } from "@/lib/portfolio-data";
import { SITE_URL, SITE_CONFIG } from "@/lib/site-config";

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

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_CONFIG.title,
    template: SITE_CONFIG.titleTemplate,
  },
  description: SITE_CONFIG.description,
  keywords: [...SITE_CONFIG.keywords],
  authors: [
    {
      name: PORTFOLIO_DATA.personal.name,
      url: SITE_URL,
    },
  ],
  creator: PORTFOLIO_DATA.personal.name,
  publisher: PORTFOLIO_DATA.personal.name,
  category: "Mechanical Engineering & CNC Machine Design",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: `${PORTFOLIO_DATA.personal.name} - Mechanical Engineering Portfolio`,
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${PORTFOLIO_DATA.personal.name} | Mechanical Engineer — CNC Machine Design`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    images: ["/opengraph-image"],
    creator: PORTFOLIO_DATA.personal.name,
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: SITE_CONFIG.googleVerificationToken,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth h-full antialiased`}
    >
      <head>
        <JsonLd />
      </head>
      <body className="min-h-full flex flex-col bg-[var(--background)] text-[var(--foreground)] selection:bg-[var(--accent)] selection:text-white">
        {/* Accessible Skip Link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[var(--foreground)] focus:text-[var(--background)] focus:rounded-md focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent)] font-mono text-xs"
        >
          Skip to main engineering content
        </a>
        <ThemeProvider>
          <Navbar />
          <main id="main-content" tabIndex={-1} className="flex-1 flex flex-col focus:outline-none">
            {children}
          </main>
          <Footer />
          <ToastContainer />
        </ThemeProvider>
      </body>
    </html>
  );
}
