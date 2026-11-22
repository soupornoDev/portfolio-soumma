
import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-config";

/**
 * Robots.txt configuration for:
 * SEO – Search engine discoverability
 * GEO – Generative Engine Optimization
 * AEO – Answer Engine Optimization
 *
 * Next.js automatically serves this at /robots.txt
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // General search engine crawlers
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/admin/",
          "/private/",
        ],
      },

      // OpenAI ChatGPT Search
      {
        userAgent: "OAI-SearchBot",
        allow: "/",
        disallow: ["/api/", "/admin/", "/private/"],
      },

      // Google Search and AI Overviews
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/", "/admin/", "/private/"],
      },

      // Microsoft Bing and Copilot
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/api/", "/admin/", "/private/"],
      },

      // Perplexity AI
      {
        userAgent: "PerplexityBot",
        allow: "/",
        disallow: ["/api/", "/admin/", "/private/"],
      },

      // Anthropic Claude
      {
        userAgent: "ClaudeBot",
        allow: "/",
        disallow: ["/api/", "/admin/", "/private/"],
      },
      {
        userAgent: "Claude-SearchBot",
        allow: "/",
        disallow: ["/api/", "/admin/", "/private/"],
      },

      // Google Gemini training crawler (separate from Googlebot)
      {
        userAgent: "Google-Extended",
        allow: "/",
        disallow: ["/api/", "/admin/", "/private/"],
      },

      // Common AI search crawler
      {
        userAgent: "DuckAssistBot",
        allow: "/",
        disallow: ["/api/", "/admin/", "/private/"],
      },
    ],

    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
