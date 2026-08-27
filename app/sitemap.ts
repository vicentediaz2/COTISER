import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    { path: "", priority: 1, changeFrequency: "weekly" as const },
    { path: "/legal", priority: 0.4, changeFrequency: "monthly" as const },
    {
      path: "/legal/terminos",
      priority: 0.3,
      changeFrequency: "monthly" as const,
    },
    {
      path: "/legal/privacidad",
      priority: 0.3,
      changeFrequency: "monthly" as const,
    },
    {
      path: "/legal/cookies",
      priority: 0.2,
      changeFrequency: "monthly" as const,
    },
  ];

  return pages.map((page) => ({
    url: `${siteUrl}${page.path}`,
    lastModified: new Date(),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
