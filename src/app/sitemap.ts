import { MetadataRoute } from "next";
import { portfolioData } from "@/data/portfolio";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = portfolioData.metadata.siteUrl;

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
    },
  ];
}
