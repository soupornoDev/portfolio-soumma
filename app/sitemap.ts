import type { MetadataRoute } from "next";
import { SITE_URL, SITE_CONFIG } from "@/lib/site-config";

/**
 * Dynamic Next.js Sitemap implementation
 * Generates standards-compliant XML sitemap for search engines.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(SITE_CONFIG.lastModifiedDate);

  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];
}
