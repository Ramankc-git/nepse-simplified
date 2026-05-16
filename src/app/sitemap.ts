import type { MetadataRoute } from "next";
import { getAllNewsletters, getAllLearningArticles, getAllAnalysisArticles, getAllMarketEvents } from "@/lib/merged-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://nepsesimplified.com";
  const now = new Date().toISOString();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: "daily", priority: 1.0 },
    { url: `${baseUrl}/market`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/newsletters`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/learning`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/analysis`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/events`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
  ];

  // Dynamic pages — newsletters
  const newsletterPages: MetadataRoute.Sitemap = getAllNewsletters().map((n) => ({
    url: `${baseUrl}/newsletters/${n.slug}`,
    lastModified: n.asOfDate || now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // Dynamic pages — learning articles
  const learningPages: MetadataRoute.Sitemap = getAllLearningArticles().map((a) => ({
    url: `${baseUrl}/learning/${a.slug}`,
    lastModified: a.date || now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // Dynamic pages — analysis articles
  const analysisPages: MetadataRoute.Sitemap = getAllAnalysisArticles().map((a) => ({
    url: `${baseUrl}/analysis/${a.slug}`,
    lastModified: a.date || now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...newsletterPages, ...learningPages, ...analysisPages];
}
