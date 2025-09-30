// src/app/blog/[slug]/page.tsx
import StructuredData from "../../../../lib/StructuredData";
import pageData from "../../data/pages.json";
import { notFound } from "next/navigation";

interface BlogPageProps {
  params: { slug: string };
}

export default function BlogDetailPage({ params }: BlogPageProps) {
  const post = pageData.blogs.find((b) => b.slug === params.slug);
  if (!post) return notFound();

  return (
    <>
      <h1>{post.title}</h1>
      <p>{post.publishedAt}</p>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />

      {/* Structured Data */}
      {post.seo?.structuredData && (
        <StructuredData data={post.seo.structuredData} />
      )}
    </>
  );
}
