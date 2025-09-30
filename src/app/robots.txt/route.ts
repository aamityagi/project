import { NextResponse } from "next/server";

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_APP_URL;

  const content = `
# Allow all crawlers
User-agent: *
Disallow:

# Sitemap location
Sitemap: ${siteUrl}/sitemap.xml

# Crawl delay to prevent server overload
Crawl-delay: 10

# Block common sensitive paths
Disallow: /api/
Disallow: /admin/
Disallow: /login/
Disallow: /register/

# Additional SEO directives
Host: ${siteUrl}
`;

  return new NextResponse(content.trim(), {
    headers: { "Content-Type": "text/plain" },
  });
}
