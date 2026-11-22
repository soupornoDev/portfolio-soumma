import type { MetadataRoute } from "next";
import {
  SITE_URL,
  SITE_CONFIG,
  getLastModifiedDate,
} from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = getLastModifiedDate();

  return SITE_CONFIG.routes.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
    ...(route.images?.length
      ? { images: route.images.map((img) => `${SITE_URL}${img}`) }
      : {}),
  }));
}
