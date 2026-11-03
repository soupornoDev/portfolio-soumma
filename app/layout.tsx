import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ToastContainer } from "@/components/ui/Toast";
import { PORTFOLIO_DATA } from "@/lib/portfolio-data";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${PORTFOLIO_DATA.personal.name} | Mechanical Engineer — CNC Machine Design`,
  description: `${PORTFOLIO_DATA.personal.name} — ${PORTFOLIO_DATA.personal.bio}`,
  keywords: [
    "Mechanical Engineering",
    "CNC Machine Design",
    "SolidWorks",
    "Precision Machine Design",
    "CAD/CAM",
    "GD&T",
    "FEA Simulation",
    "Toolpath Optimization",
    "Soumma Chakraborty",
  ],
  authors: [{ name: PORTFOLIO_DATA.personal.name, url: PORTFOLIO_DATA.personal.linkedin }],
  openGraph: {
    title: `${PORTFOLIO_DATA.personal.name} | Mechanical Engineer`,
    description: PORTFOLIO_DATA.personal.tagline,
    type: "website",
    url: PORTFOLIO_DATA.personal.linkedin,
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
      <body className="min-h-full flex flex-col bg-[var(--background)] text-[var(--foreground)] selection:bg-[var(--accent)] selection:text-white">
        <ThemeProvider>
          <Navbar />
          <main className="flex-1 flex flex-col">{children}</main>
          <Footer />
          <ToastContainer />
        </ThemeProvider>
      </body>
    </html>
  );
}
