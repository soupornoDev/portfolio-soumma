import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-config";

/**
 * Dynamic Next.js Robots.txt implementation
 * Defines crawler access rules and points to dynamic sitemap.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
