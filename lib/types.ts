// lib/types.ts
export interface StructuredData {
  "@context": string;
  "@type": string;
  headline?: string;
  datePublished?: string;
  author?: { "@type": string; name: string };
  image?: string;
  publisher?: { "@type": string; name: string };
  [key: string]: string | object | undefined;
}

export interface SEOData {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  ogImage?: string;
  ogType?: "website" | "article";
  twitterCard?: "summary" | "summary_large_image";
  robots?: string;
  author?: string;
  structuredData?: StructuredData; // ✅ strong type
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt?: string;
  content: string;
  publishedAt: string;
  image?: string;
  seo?: SEOData;
}

export interface PagesData {
  marketingPage: SEOData;
  blogPage: SEOData;
  blogs: BlogPost[];
}
