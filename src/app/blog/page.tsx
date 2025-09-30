import pageData from "../data/pages.json"; // Correct relative path
import type { Metadata } from "next";
import BlogList from "./BlogList"; // Client component
import { generateSEOServer } from "../../../lib/seoServer";
import type { PagesData } from "../../../lib/types";

// Type cast the JSON
const data = pageData as PagesData;

// ✅ Server Component: export metadata
export const metadata: Metadata = generateSEOServer(data.blogPage);

export default function BlogPage() {
  return <BlogList blogs={data.blogs} />;
}
