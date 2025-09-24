"use client";
import React from "react";
import ComingSoon from "../components/ComingSoon";
import { useRouter } from "next/navigation";

export default function SeoPage() {
  const router = useRouter();

  return (
    <ComingSoon
      pageKey="seo" // key from comingSoonContent.json
      actionLabel="Back to Dashboard"
      onActionClick={() => router.push("/dashboard")}
    />
  );
}
