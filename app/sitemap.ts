import type { MetadataRoute } from "next";
import { artworks } from "@/data/artworks";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://timatimone.art";

  const staticPages = [
    { url: base, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 1 },
    { url: `${base}/work`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${base}/commissions`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
  ];

  const artworkPages = artworks.map((artwork) => ({
    url: `${base}/work/${artwork.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...artworkPages];
}
