// src/app/sitemap.xml/route.ts
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import blogsData from "../data/pages.json"; // your JSON file

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3001";

// Recursively get all pages in src/app, excluding dynamic routes & special folders
function getAllPages(dir: string, parentPath = ""): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const pages: string[] = [];

  for (const entry of entries) {
    const entryPath = path.join(dir, entry.name);
    const routePath =
      parentPath + "/" + (entry.name === "page.tsx" ? "" : entry.name.replace(".tsx", ""));

    if (entry.isDirectory()) {
      if (!["api", "blog", "sitemap.xml"].includes(entry.name) && !entry.name.startsWith("[")) {
        pages.push(...getAllPages(entryPath, routePath));
      }
    } else if (
      entry.isFile() &&
      entry.name.endsWith(".tsx") &&
      !entry.name.startsWith("[") &&
      entry.name !== "sitemap.xml"
    ) {
      pages.push(routePath);
    }
  }

  return pages;
}

const staticPages = getAllPages(path.join(process.cwd(), "src/app"));

export async function GET() {
  // Map static pages
  const pagesXml = staticPages
    .map(
      (page) => `
    <url>
      <loc>${BASE_URL}${page}</loc>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
      <lastmod>${new Date().toISOString()}</lastmod>
    </url>
  `
    )
    .join("");

  // Map blogs — ✅ FIX: access the blogs array correctly
  const blogXml = blogsData.blogs
    .map(
      (blog) => `
    <url>
      <loc>${BASE_URL}/blog/${blog.slug}</loc>
      <lastmod>${new Date(blog.publishedAt).toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.9</priority>
      <news:news>
        <news:publication>
          <news:name>Namakwala Blog</news:name>
          <news:language>en</news:language>
        </news:publication>
        <news:publication_date>${new Date(blog.publishedAt).toISOString()}</news:publication_date>
        <news:title>${blog.title}</news:title>
      </news:news>
    </url>
  `
    )
    .join("");

  // Complete sitemap
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset 
    xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" 
    xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
    xmlns:xhtml="http://www.w3.org/1999/xhtml"
  >
    ${pagesXml}
    ${blogXml}
  </urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=0, s-maxage=3600", // refresh hourly
    },
  });
}
