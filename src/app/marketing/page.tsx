// src/app/marketing/page.tsx
import { generateSEOServer } from "../../../lib/seoServer";
import pageData from "../data/pages.json";
import type { Metadata } from "next";
import MarketingContent from "./MarketingContent";


// ✅ Typecast JSON if needed
interface PagesJSON {
  marketingPage: any;
}
const pageDataTyped = pageData as PagesJSON;

// ✅ Export metadata safely
export const metadata: Metadata = generateSEOServer(pageDataTyped.marketingPage);

export default function MarketingPage() {
  return <MarketingContent />;
}
