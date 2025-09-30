// lib/seoServer.ts
import type { Metadata } from "next";
import type { SEOData } from "./types";

export function generateSEOServer(data: SEOData): Metadata {
  const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3001";

  const canonicalUrl = data.canonical ? new URL(data.canonical, siteUrl).toString() : undefined;
  const ogImageUrl = data.ogImage ? new URL(data.ogImage, siteUrl).toString() : undefined;

  return {
    title: data.title,
    description: data.description,
    keywords: data.keywords,
    robots: data.robots,
    authors: data.author ? [{ name: data.author }] : undefined,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: data.title,
      description: data.description,
      type: data.ogType === "article" ? "article" : "website",
      url: canonicalUrl,
      images: ogImageUrl ? [{ url: ogImageUrl }] : undefined,
    },
    twitter: {
      card: data.twitterCard === "summary" ? "summary" : "summary_large_image",
      title: data.title,
      description: data.description,
      images: ogImageUrl ? [ogImageUrl] : undefined,
    },
    metadataBase: new URL(siteUrl),
  };
}
