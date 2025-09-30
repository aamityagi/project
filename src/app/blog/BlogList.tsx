"use client";

import Link from "next/link";
import Image from "next/image";
import type { BlogPost } from "../../../lib/types";

interface BlogListProps {
  blogs: BlogPost[];
}

export default function BlogList({ blogs }: BlogListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {blogs.map((blog) => (
        <Link
          key={blog.slug}
          href={`/blog/${blog.slug}`}
          className="group border rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
        >
          {blog.image && (
            <Image
              src={blog.image}
              alt={blog.title}
              width={500}
              height={300}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
          )}
          <div className="p-4 bg-white/80 backdrop-blur-md">
            <h2 className="font-semibold text-lg">{blog.title}</h2>
            <p className="text-gray-600 text-sm mt-2">{blog.excerpt}</p>
            <p className="text-gray-400 text-xs mt-2">
              {new Date(blog.publishedAt).toLocaleDateString()}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
