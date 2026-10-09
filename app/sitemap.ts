import type { MetadataRoute } from "next";
import { caseStudyRoutes, siteUrl } from "./site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, changeFrequency: "monthly", priority: 1 },
    ...caseStudyRoutes.map((route) => ({ url: `${siteUrl}${route}`, changeFrequency: "yearly" as const, priority: 0.8 })),
  ];
}
