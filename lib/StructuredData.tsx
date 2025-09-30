// lib/StructuredData.tsx
"use client";
import type { StructuredData } from "./types";

export default function StructuredData({ data }: { data: StructuredData }) {
  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data, null, 2) }}
    />
  );
}
