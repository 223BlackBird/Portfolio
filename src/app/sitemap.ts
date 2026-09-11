import { MetadataRoute } from "next";
import { portfolioData } from "@/data/portfolio";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = portfolioData.metadata.siteUrl;

  const routes = [
    { path: "", priority: 1.0, changeFrequency: "weekly" as const },
    { path: "/work", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/work/truewill", priority: 0.95, changeFrequency: "monthly" as const },
    { path: "/experience", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/about", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/terminal", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/contact", priority: 0.85, changeFrequency: "monthly" as const },
  ];

  return routes.map((r) => ({
    url: `${baseUrl}${r.path}`,
    lastModified: new Date(),
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
