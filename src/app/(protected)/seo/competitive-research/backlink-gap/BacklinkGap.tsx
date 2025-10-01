"use client";

import { useState } from "react";
import KeywordGapBacklinkForm from "../components/KeywordGapBacklinkForm";
import ContentSection from "../components/ContentSection";
import contentData from "../../data/backlinkContent.json";

export default function BacklinkGap() {
  const [formData, setFormData] = useState<{
    user: { url: string; domainType: string };
    competitors: Competitor[];
    country: { code: string; location_code: number };
  } | null>(null);

  const handleAnalyze = (data: typeof formData) => {
    console.log(data);
    setFormData(data);
  };

  return (
    <section className="p-4 md:p-8 max-w-6xl mx-auto">
      <div className="mb-8 text-center">
        <h2 className="text-xl md:text-2xl font-semibold mb-2">Backlink Gap</h2>
        <p className="text-gray-600">
          Find prospects for domain or URL
        </p>
      </div>

      {/* Form */}
      <KeywordGapBacklinkForm
                onCompare={(data) => {
                  console.log("Form Data:", data);
                }}

      {/* Content Section */}
      <div className="mt-12">
        <ContentSection data={contentData} />
      </div>
    </section>
  );
}
