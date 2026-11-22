import type { MetadataRoute } from "next";
import { SITE_URL, SITE_CONFIG } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL.replace(/\/$/, "");
  const parsedDate = new Date(SITE_CONFIG.lastModifiedDate);
  const lastModified = Number.isNaN(parsedDate.getTime())
    ? new Date()
    : parsedDate;

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0,
      // public/ folder-e OG image thakle exact filename dao (na thakle ei images line-ta remove koro)
      images: [`${baseUrl}/og-image.png`],
    },
    {
      url: `${baseUrl}/cv`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];
}
