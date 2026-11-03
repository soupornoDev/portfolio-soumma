import type { MetadataRoute } from "next";
import { PORTFOLIO_DATA } from "@/lib/portfolio-data";
import { SITE_CONFIG } from "@/lib/site-config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${PORTFOLIO_DATA.personal.name} — Mechanical Engineering Portfolio`,
    short_name: "Soumma Chakraborty",
    description: SITE_CONFIG.description,
    start_url: "/",
    display: "standalone",
    background_color: "#090a0f",
    theme_color: "#0284c7",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
